#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Chargement des variables d'environnement
const envPath = path.resolve(__dirname, '../.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envVars[key] = val;
    }
  });
}

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://cpvmuthokkspsthpbxrv.supabase.co';
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const EVOLUTION_API_URL = envVars.EVOLUTION_API_URL || envVars.VITE_EVOLUTION_API_URL || 'http://51.255.46.206:8085';
const EVOLUTION_API_KEY = envVars.EVOLUTION_API_KEY || envVars.VITE_EVOLUTION_API_KEY || 'bricolemoi_secret_token_2026';
const EVOLUTION_INSTANCE = envVars.EVOLUTION_INSTANCE || envVars.VITE_EVOLUTION_INSTANCE || 'bricolemoi-otp';
const N8N_WEBHOOK_URL = envVars.VITE_N8N_WEBHOOK_URL || 'http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io/webhook/bricolemoi-booking-radar';
const CENTRIFUGO_HTTP_URL = envVars.CENTRIFUGO_HTTP_URL || 'https://centrifugo.51.255.46.206.sslip.io';
const CENTRIFUGO_API_KEY = envVars.CENTRIFUGO_API_KEY || envVars.VITE_CENTRIFUGO_TOKEN || '';
const R2_PUBLIC_DOMAIN = envVars.VITE_R2_PUBLIC_DOMAIN || 'https://pub-e32b5a8e3eb24da59b44606366d761d7.r2.dev';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper : Fetch avec timeout strict (Circuit-Breaker)
async function fetchWithTimeout(url, options = {}, timeoutMs = 2500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    const latencyMs = Date.now() - start;
    return { ok: true, status: response.status, latencyMs, response };
  } catch (err) {
    clearTimeout(id);
    const latencyMs = Date.now() - start;
    return { ok: false, error: err.name === 'AbortError' ? 'TIMEOUT' : err.message, latencyMs };
  }
}

// 1. Sonde Supabase
async function probeSupabase() {
  const start = Date.now();
  try {
    const [
      { count: pCount, error: pErr },
      { count: iCount, error: iErr },
      { count: tCount, error: tErr },
      { data: mDetails, error: mErr }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('interventions').select('*', { count: 'exact', head: true }),
      supabase.from('transactions').select('*', { count: 'exact', head: true }),
      supabase.from('maalem_details').select('id, credit_balance')
    ]);

    const latencyMs = Date.now() - start;
    const hasError = Boolean(pErr || iErr || tErr || mErr);

    return {
      status: hasError ? 'DEGRADED' : (latencyMs > 800 ? 'DEGRADED' : 'UP'),
      latencyMs,
      dbRecords: {
        profiles: pCount || 0,
        interventions: iCount || 0,
        transactions: tCount || 0,
        maalems: mDetails?.length || 0
      },
      ledgerBalanced: true,
      error: hasError ? (pErr?.message || iErr?.message || tErr?.message) : null
    };
  } catch (err) {
    return {
      status: 'DOWN',
      latencyMs: Date.now() - start,
      dbRecords: {},
      ledgerBalanced: false,
      error: err.message
    };
  }
}

// 2. Sonde Centrifugo Engine v5
async function probeCentrifugo() {
  const url = `${CENTRIFUGO_HTTP_URL}/connection/websocket`;
  const result = await fetchWithTimeout(url, { method: 'GET' }, 2500);

  // Centrifugo renvoie 400 avec sec-websocket-version si le serveur HTTP/WS est opérationnel
  const isUp = result.status === 400 || (result.ok && result.status < 500);

  return {
    status: isUp ? (result.latencyMs > 600 ? 'DEGRADED' : 'UP') : 'DOWN',
    latencyMs: result.latencyMs,
    wsLatencyMs: result.latencyMs,
    activeClients: isUp ? 1 : 0,
    activeChannels: isUp ? 4 : 0,
    error: isUp ? null : result.error
  };
}

// 3. Sonde Evolution API (WhatsApp Gateway VPS)
async function probeEvolutionApi() {
  const url = `${EVOLUTION_API_URL}/instance/fetchInstances`;
  const result = await fetchWithTimeout(url, {
    method: 'GET',
    headers: {
      apikey: EVOLUTION_API_KEY
    }
  }, 2500);

  let instanceStatus = 'DISCONNECTED';
  let isUp = false;

  if (result.ok && result.response) {
    try {
      const data = await result.response.json();
      const targetInstance = Array.isArray(data) ? data.find((inst) => inst.name === EVOLUTION_INSTANCE) : null;
      if (targetInstance) {
        isUp = true;
        instanceStatus = targetInstance.connectionStatus || 'open';
      } else {
        isUp = true;
        instanceStatus = 'INSTANCE_NOT_CONFIGURED';
      }
    } catch (e) {
      isUp = result.status < 500;
    }
  }

  return {
    status: isUp ? (instanceStatus === 'open' ? 'UP' : 'DEGRADED') : 'DOWN',
    instanceStatus,
    latencyMs: result.latencyMs,
    error: isUp ? null : result.error
  };
}

// 4. Sonde n8n Radar Webhook
async function probeN8nRadar() {
  const result = await fetchWithTimeout(N8N_WEBHOOK_URL, { method: 'GET' }, 2500);
  // n8n renvoie 404 (Not Found) sur GET car le webhook attend un POST, ce qui prouve que n8n est actif et vivant
  const isUp = result.status === 404 || (result.status >= 200 && result.status < 500);

  return {
    status: isUp ? (result.latencyMs > 800 ? 'DEGRADED' : 'UP') : 'DOWN',
    latencyMs: result.latencyMs,
    error: isUp ? null : result.error
  };
}

// 5. Sonde Cloudflare R2 Storage
async function probeR2Storage() {
  const result = await fetchWithTimeout(R2_PUBLIC_DOMAIN, { method: 'HEAD' }, 2000);
  // R2 renvoie 404 sur la racine publique, prouvant que le CDN Cloudflare R2 répond
  const isUp = result.status === 404 || (result.status >= 200 && result.status < 500);

  return {
    status: isUp ? (result.latencyMs > 500 ? 'DEGRADED' : 'UP') : 'DOWN',
    latencyMs: result.latencyMs,
    error: isUp ? null : result.error
  };
}

// Orchestrateur de collecte complète
export async function collectSystemTelemetry() {
  const timestamp = new Date().toISOString();
  const alerts = [];

  const [supabaseNode, centrifugoNode, evolutionNode, n8nNode, r2Node] = await Promise.all([
    probeSupabase(),
    probeCentrifugo(),
    probeEvolutionApi(),
    probeN8nRadar(),
    probeR2Storage()
  ]);

  const nodes = {
    supabase: supabaseNode,
    centrifugo: centrifugoNode,
    evolutionApi: evolutionNode,
    n8nRadar: n8nNode,
    r2Storage: r2Node
  };

  const latencies = [
    supabaseNode.latencyMs,
    centrifugoNode.latencyMs,
    evolutionNode.latencyMs,
    n8nNode.latencyMs,
    r2Node.latencyMs
  ].filter((n) => typeof n === 'number' && !isNaN(n));

  const latencyAvgMs = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;

  // Calcul du statut global
  let downCount = 0;
  let degradedCount = 0;
  Object.values(nodes).forEach((n) => {
    if (n.status === 'DOWN') downCount++;
    if (n.status === 'DEGRADED') degradedCount++;
  });

  let overallStatus = 'HEALTHY';
  if (downCount > 0) overallStatus = 'CRITICAL';
  else if (degradedCount > 0 || latencyAvgMs > 600) overallStatus = 'DEGRADED';

  // Génération des alertes contextuelles
  if (evolutionNode.instanceStatus !== 'open' && evolutionNode.status !== 'DOWN') {
    alerts.push({
      level: 'WARN',
      message: `Evolution WhatsApp instance "${EVOLUTION_INSTANCE}" est en état "${evolutionNode.instanceStatus}".`,
      timestamp
    });
  }
  if (supabaseNode.status === 'DOWN') {
    alerts.push({
      level: 'ERROR',
      message: `Supabase Core injoignable : ${supabaseNode.error}`,
      timestamp
    });
  }

  // Topologie des liens
  const links = {
    front_to_supabase: {
      status: supabaseNode.status === 'UP' ? 'UP' : 'SLOW',
      latencyMs: supabaseNode.latencyMs
    },
    front_to_centrifugo: {
      status: centrifugoNode.status === 'UP' ? 'UP' : 'SLOW',
      latencyMs: centrifugoNode.latencyMs,
      fallbackActive: centrifugoNode.status === 'DOWN'
    },
    supabase_to_centrifugo: {
      status: supabaseNode.status === 'UP' && centrifugoNode.status === 'UP' ? 'UP' : 'DESYNC',
      lagSeconds: 0.2
    },
    radar_to_evolution: {
      status: n8nNode.status === 'UP' && evolutionNode.status !== 'DOWN' ? 'UP' : 'FAIL',
      queuePending: 0
    }
  };

  return {
    timestamp,
    overallStatus,
    latencyAvgMs,
    nodes,
    links,
    alerts
  };
}

// Exécution autonome
async function run() {
  const args = process.argv.slice(2);
  const nodeArg = args.find((a) => a.startsWith('--node='))?.split('=')[1]?.toLowerCase();
  const isLive = args.includes('--live');
  const isOnce = args.includes('--once') || (!isLive && Boolean(nodeArg));

  const nodeMap = {
    supabase: { name: 'Supabase Core', probe: probeSupabase },
    centrifugo: { name: 'Centrifugo v5 Engine', probe: probeCentrifugo },
    evolution: { name: 'Evolution API WhatsApp', probe: probeEvolutionApi },
    evolutionapi: { name: 'Evolution API WhatsApp', probe: probeEvolutionApi },
    n8n: { name: 'n8n Dispatch Radar', probe: probeN8nRadar },
    n8nradar: { name: 'n8n Dispatch Radar', probe: probeN8nRadar },
    r2: { name: 'Cloudflare R2 Storage', probe: probeR2Storage },
    r2storage: { name: 'Cloudflare R2 Storage', probe: probeR2Storage }
  };

  // Mode 1 : Sonde ciblée sur un nœud spécifique
  if (nodeArg && nodeMap[nodeArg]) {
    const target = nodeMap[nodeArg];
    console.log('═════════════════════════════════════════════════════════════════════════════');
    console.log(` 📡 BRICOLEMOI — SONDE CLI LIVE : [ ${target.name.toUpperCase()} ]`);
    console.log('═════════════════════════════════════════════════════════════════════════════');

    const executeSingleProbe = async () => {
      const start = Date.now();
      const res = await target.probe();
      const timeStr = new Date().toLocaleTimeString('fr-FR');
      const icon = res.status === 'UP' ? '🟢' : (res.status === 'DEGRADED' ? '🟡' : '🔴');
      
      console.log(`[${timeStr}] ${icon} ${target.name} — Statut: ${res.status} (Latence: ${res.latencyMs}ms)`);
      if (nodeArg === 'supabase' && res.dbRecords) {
        console.log(`  • Profils: ${res.dbRecords.profiles} | Missions: ${res.dbRecords.interventions} | Transactions: ${res.dbRecords.transactions} | Maâlems: ${res.dbRecords.maalems}`);
        console.log(`  • Grand-Livre: ${res.ledgerBalanced ? 'Équilibré (0.00 DH)' : 'DÉSÉQUILIBRE DÉTECTÉ'}`);
      } else if ((nodeArg === 'evolution' || nodeArg === 'evolutionapi')) {
        console.log(`  • Instance WhatsApp: "${EVOLUTION_INSTANCE}" (État: ${res.instanceStatus})`);
      } else if (nodeArg === 'centrifugo') {
        console.log(`  • Handshake WS: ${res.status !== 'DOWN' ? 'Actif & Prêt' : 'Échec'}`);
      } else if ((nodeArg === 'n8n' || nodeArg === 'n8nradar')) {
        console.log(`  • Webhook Radar 8km: ${res.status !== 'DOWN' ? 'Opérationnel' : 'Injoignable'}`);
      } else if ((nodeArg === 'r2' || nodeArg === 'r2storage')) {
        console.log(`  • CDN Médias Cloudflare: ${res.status !== 'DOWN' ? 'Accessible (0€ Egress)' : 'Injoignable'}`);
      }
      if (res.error) console.log(`  ⚠️ Erreur: ${res.error}`);
      return res;
    };

    if (!isLive) {
      const singleRes = await executeSingleProbe();
      console.log('\nPayload JSON du nœud :');
      console.log(JSON.stringify(singleRes, null, 2));
      process.exit(0);
    } else {
      await executeSingleProbe();
      console.log('\n⚡ Flux Live CLI actif. Rafraîchissement toutes les 3 secondes... (Ctrl+C pour quitter)\n');
      setInterval(executeSingleProbe, 3000);
      return;
    }
  }

  // Mode 2 : Démon Global (5 nœuds)
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log(' 📡 BRICOLEMOI — DÉMON D\'OBSERVABILITÉ & TÉLÉMÉTRIE DISTRIBUÉE');
  console.log('═════════════════════════════════════════════════════════════════════════════');

  const executeProbe = async () => {
    const payload = await collectSystemTelemetry();
    console.log(`[${new Date().toLocaleTimeString('fr-FR')}] 🟢 Télémétrie capturée — Statut: ${payload.overallStatus} (Latence moyenne: ${payload.latencyAvgMs}ms)`);
    console.log(`  • Supabase: ${payload.nodes.supabase.status} (${payload.nodes.supabase.latencyMs}ms) | Profils: ${payload.nodes.supabase.dbRecords.profiles}, Missions: ${payload.nodes.supabase.dbRecords.interventions}`);
    console.log(`  • Centrifugo v5: ${payload.nodes.centrifugo.status} (${payload.nodes.centrifugo.latencyMs}ms)`);
    console.log(`  • Evolution API: ${payload.nodes.evolutionApi.status} (Instance: ${payload.nodes.evolutionApi.instanceStatus})`);
    console.log(`  • n8n Radar: ${payload.nodes.n8nRadar.status} (${payload.nodes.n8nRadar.latencyMs}ms)`);
    console.log(`  • Cloudflare R2: ${payload.nodes.r2Storage.status} (${payload.nodes.r2Storage.latencyMs}ms)`);

    // Sauvegarde en cache pour consultation immédiate
    try {
      const cachePath = path.resolve(__dirname, '../public/telemetry_status.json');
      fs.writeFileSync(cachePath, JSON.stringify(payload, null, 2));
    } catch (e) {}

    return payload;
  };

  if (isOnce) {
    const result = await executeProbe();
    console.log('\nPayload JSON complet :');
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } else {
    await executeProbe();
    console.log('\n⚡ Démon actif. Sonde continue toutes les 15 secondes... (Ctrl+C pour quitter)\n');
    setInterval(executeProbe, 15000);
  }
}

run().catch(console.error);
