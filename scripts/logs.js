#!/usr/bin/env node

/**
 * 📟 BricoleMoi Live Console & Telemetry CLI
 * Version 3.0 : Centrifugo v5 VPS Native WebSocket & Resilient Keep-Alive
 *
 * Usage :
 *   npm run logs
 *   node scripts/logs.js
 */

import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables .env
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

const CENTRIFUGO_WS_URL = envVars.VITE_CENTRIFUGO_WS_URL || 'ws://51.255.46.206:8800/connection/websocket';
const directWsUrl = CENTRIFUGO_WS_URL.startsWith('wss://')
  ? 'ws://51.255.46.206:8800/connection/websocket'
  : CENTRIFUGO_WS_URL;

// Couleurs ANSI
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[90m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  bgBlue: '\x1b[44m\x1b[37m',
  bgAmber: '\x1b[43m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgPurple: '\x1b[45m\x1b[37m',
  bgGray: '\x1b[100m\x1b[37m'
};

console.clear();
console.log(`${C.cyan}╔════════════════════════════════════════════════════════════════════════════╗${C.reset}`);
console.log(`${C.cyan}║${C.reset}  ${C.bold}${C.green}📟 BRICOLEMOI LIVE CONSOLE & TELEMETRY STREAM 3.0 (CENTRIFUGO VPS)${C.reset}       ${C.cyan}║${C.reset}`);
console.log(`${C.cyan}║${C.reset}  ${C.dim}Flux temps réel & télémétrie souveraine sur VPS 51.255.46.206 🇲🇦${C.reset}           ${C.cyan}║${C.reset}`);
console.log(`${C.cyan}╚════════════════════════════════════════════════════════════════════════════╝${C.reset}`);
console.log(`${C.dim}📡 Canaux actifs : jobs:stream | admin:alerts | tracking:all | presence:maalems${C.reset}`);
console.log(`${C.green}✓ Connecté à Centrifugo v5 VPS Gateway. Écoute permanente active...${C.reset}\n`);

const formatTime = (isoString) => {
  const date = isoString ? new Date(isoString) : new Date();
  return `${C.dim}[${date.toLocaleTimeString('fr-FR')}.${String(date.getMilliseconds()).padStart(3, '0')}]${C.reset}`;
};

const getRoleBadge = (role, user) => {
  const name = user?.name || user?.full_name || 'Anonyme';
  const phone = user?.phone ? ` (${user.phone})` : '';

  switch (role) {
    case 'CLIENT':
      return `${C.bgBlue} 👤 CLIENT ${C.reset}  ${C.bold}${name}${C.reset}${C.dim}${phone}${C.reset}`;
    case 'MAALEM':
      return `${C.bgAmber} 🛠️ MAÂLEM ${C.reset}  ${C.bold}${name}${C.reset}${C.dim}${phone}${C.reset}`;
    case 'ADMIN':
      return `${C.bgPurple} 🛡️ ADMIN ${C.reset}  ${C.bold}${name}${C.reset}${C.dim}${phone}${C.reset}`;
    default:
      return `${C.bgGray} ⚙️ SYSTÈME ${C.reset}  ${C.bold}${name}${C.reset}`;
  }
};

const getLevelBadge = (level) => {
  switch (level) {
    case 'ERROR':
      return `${C.bgRed} ERROR ${C.reset}`;
    case 'WARN':
      return `${C.yellow}⚠ WARN ${C.reset}`;
    case 'ACTION':
      return `${C.cyan}⚡ ACTION${C.reset}`;
    case 'GPS':
      return `${C.blue}🚗 GPS   ${C.reset}`;
    case 'SOS':
      return `${C.red}🚨 SOS   ${C.reset}`;
    case 'INFO':
    default:
      return `${C.green}ℹ INFO  ${C.reset}`;
  }
};

const getSpecialtyLabel = (spec) => {
  const map = {
    PLUMBING: 'Plomberie & Sanitaire',
    ELECTRICITY: 'Électricité Générale',
    HVAC: 'Climatisation & Froid',
    LOCKSMITH: 'Serrurerie & Métal',
    PAINTING: 'Peinture & Finition',
    CARPENTRY: 'Menuiserie & Bois',
    MASONRY: 'Maçonnerie & Gros Œuvre',
    APPLIANCE: 'Électroménager'
  };
  return map[spec] || spec || 'Bricolage Pro';
};

const formatCentrifugoEvent = (ch, data) => {
  const time = formatTime(data?.timestamp || data?.created_at);
  const cleanCh = String(ch || '').replace(/^bricolemoi:/, '');

  // 1. Présence Maâlem (Heartbeat GPS / Statut En ligne)
  if (cleanCh === 'presence:maalems' || data?.type === 'PRESENCE_HEARTBEAT' || data?.type === 'PRESENCE_UPDATE') {
    const m = data?.maalem || data?.payload?.maalem || data || {};
    const name = m.full_name || 'Artisan Maâlem';
    const phone = m.phone ? ` (${m.phone})` : '';
    const isOnline = m.is_online !== false;
    const statusBadge = isOnline
      ? `${C.bgGreen} 🟢 EN SERVICE ${C.reset}`
      : `${C.bgGray} ⚪ HORS LIGNE ${C.reset}`;
    const availBadge = m.is_available
      ? `${C.green}✓ Disponible Radar${C.reset}`
      : `${C.yellow}⏳ Occupé sur chantier${C.reset}`;

    const spec = getSpecialtyLabel(m.specialty);
    const zone = m.district || m.city_zone || 'Maroc';
    const solde = m.credit_balance !== undefined ? `${C.bold}${m.credit_balance} DH${C.reset}` : null;
    const reviewsCount = Number(m.total_reviews ?? 0);
    const rating = reviewsCount > 0
      ? `⭐ ${Number(m.rating_avg || 5).toFixed(1)}/5 (${reviewsCount} avis)`
      : `✨ Nouveau profil (0 avis)`;
    const gps = (m.lat && m.lng) ? `${C.cyan}🌐 GPS : ${Number(m.lat).toFixed(6)}, ${Number(m.lng).toFixed(6)}${C.reset}` : null;

    console.log(`${time} ${statusBadge}  ${C.bold}${name}${C.reset}${C.dim}${phone}${C.reset}  ${availBadge}`);

    const details = [
      spec ? `🛠️  ${spec}` : null,
      zone ? `📍 ${zone}` : null,
      solde ? `💰 Solde : ${solde}` : null,
      rating
    ].filter(Boolean).join(` ${C.dim}•${C.reset} `);

    if (details) console.log(`   ${details}`);
    if (gps) console.log(`   ${gps}`);
    console.log('');
    return;
  }

  // 2. Flux des Chantiers & Urgences SOS (jobs:stream)
  if (cleanCh === 'jobs:stream') {
    const event = data.event || data.type || 'MISSION';
    const p = data.payload || data.intervention || data || {};

    if (event === 'new_job' || event === 'SOS_CREATED') {
      const clientName = p.client_name || 'Client BricoleMoi';
      const clientPhone = p.client_phone ? ` (${p.client_phone})` : '';
      console.log(`${time} ${C.bgRed} 🚨 NOUVELLE DEMANDE SOS DÉTECTÉE ${C.reset}  ${C.bold}${clientName}${C.reset}${C.dim}${clientPhone}${C.reset}`);
      console.log(`   🛠️  ${p.subcategory || p.service_type || 'Dépannage d\'urgence'}`);
      console.log(`   📍 ${p.district || p.city_zone || 'Casablanca'} ${C.dim}• Tarification Accord Direct (Déblocage: 15 DH)${C.reset}`);
      console.log('');
      return;
    }

    if (event === 'job_accepted' || event === 'LEAD_UNLOCKED') {
      const maalemName = p.maalem_name || 'Artisan Maâlem';
      console.log(`${time} ${C.bgAmber} ⚡ LEAD DÉBLOQUÉ PAR UN MAÂLEM ${C.reset}  ${C.bold}${maalemName}${C.reset}`);
      console.log(`   📋 Intervention ID : #${p.intervention_id || p.id || 'N/A'} ${C.dim}• Étape : ${p.progress_step || 'ON_THE_WAY'}${C.reset}`);
      console.log('');
      return;
    }

    if (event === 'job_progress_updated') {
      console.log(`${time} ${C.bgBlue} 📍 AVANCEMENT MISSION ${C.reset}  ${C.bold}Étape : ${p.progress_step || 'EN COURS'}${C.reset}`);
      console.log(`   📋 Intervention ID : #${p.intervention_id || p.id || 'N/A'}`);
      console.log('');
      return;
    }

    if (event === 'job_completed') {
      console.log(`${time} ${C.bgGreen} ✅ CHANTIER CLÔTURÉ AVEC SUCCÈS ${C.reset}  ${C.bold}Fin de travaux${C.reset}`);
      if (p.rating) console.log(`   ⭐ Note client reçue : ${p.rating}/5 ★`);
      console.log('');
      return;
    }

    // Événement job générique
    console.log(`${time} ${C.bgBlue} ⚡ CHANTIER [${event}] ${C.reset}`);
    console.log(`   ↳ ${C.dim}${JSON.stringify(p, null, 2).replace(/\n/g, '\n   ')}${C.reset}\n`);
    return;
  }

  // 3. Suivi GPS Temps Réel (tracking:all)
  if (cleanCh === 'tracking:all') {
    const lat = data.lat || data.latitude;
    const lng = data.lng || data.longitude;
    const name = data.maalem_name || data.name || 'Artisan';
    console.log(`${time} ${C.cyan}🚗 GUIDAGE GPS${C.reset}  ${C.bold}${name}${C.reset} ➔ Coordonnées : ${lat}, ${lng}\n`);
    return;
  }

  // 4. Alertes Système & Administrateur (admin:alerts)
  if (cleanCh === 'admin:alerts') {
    console.log(`${time} ${C.bgPurple} 🛡️ ALERTE ADMIN ${C.reset}  ${C.bold}${data.message || data.title || 'Alerte Centrale'}${C.reset}`);
    if (data.details || data.data) {
      console.log(`   ↳ ${C.dim}${JSON.stringify(data.details || data.data, null, 2).replace(/\n/g, '\n   ')}${C.reset}`);
    }
    console.log('');
    return;
  }

  // 5. Cas par défaut : Affichage structuré et lisible
  const eventName = data?.event || data?.type || data?.name || 'UPDATE';
  console.log(`${time} ${C.cyan}[${cleanCh}]${C.reset} ${C.bold}⚡ ${eventName}${C.reset}`);
  const payload = data?.payload || data;
  if (typeof payload === 'object' && payload !== null) {
    const pretty = JSON.stringify(payload, null, 2)
      .split('\n')
      .map(line => `   ${C.dim}${line}${C.reset}`)
      .join('\n');
    console.log(pretty);
  } else {
    console.log(`   ${C.dim}${payload}${C.reset}`);
  }
  console.log('');
};

let ws = null;
let pingTimer = null;

function startConnection() {
  try {
    ws = new WebSocket(directWsUrl);

    ws.on('open', () => {
      ws.send(JSON.stringify({ id: 1, connect: { token: '' } }));

      if (pingTimer) clearInterval(pingTimer);
      pingTimer = setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send('{}');
        }
      }, 25000);
    });

    ws.on('message', (raw) => {
      try {
        const lines = raw.toString().split('\n').filter(Boolean);
        for (const line of lines) {
          const msg = JSON.parse(line);

          if (msg.id === 1 || msg.connect || msg.result?.client) {
            const channels = [
              'jobs:stream',
              'bricolemoi:jobs:stream',
              'admin:alerts',
              'bricolemoi:admin:alerts',
              'tracking:all',
              'bricolemoi:tracking:all',
              'presence:maalems',
              'bricolemoi:presence:maalems',
              'terminal:logs',
              'bricolemoi:terminal:logs'
            ];
            channels.forEach((ch, idx) => {
              ws.send(JSON.stringify({ id: 10 + idx, subscribe: { channel: ch } }));
            });
          }

          const pub = msg.pub || msg.push?.pub;
          const ch = msg.channel || msg.push?.channel;

          if (pub && ch) {
            const data = pub.data || {};
            const isTeleLog = Boolean(data.level && (data.message || data.category));

            if (isTeleLog) {
              const time = formatTime(data.timestamp);
              const levelBadge = getLevelBadge(data.level);
              const roleBadge = getRoleBadge(data.user?.role || 'ANONYMOUS', data.user);
              const queuedBadge = data.isQueued ? ` ${C.yellow}[RATTRAPÉ HORS-LIGNE]${C.reset}` : '';
              const deviceSummary = data.device?.summary ? ` ${C.dim}• ${data.device.summary}${C.reset}` : '';
              const catBadge = data.category ? ` ${C.dim}• [${data.category}]${C.reset}` : '';

              console.log(`${time} ${levelBadge}  ${roleBadge}${queuedBadge}`);
              console.log(`   » ${C.bold}${data.message}${C.reset}${deviceSummary}${catBadge}`);

              if (data.data && Object.keys(data.data).length > 0) {
                const details = JSON.stringify(data.data);
                if (details !== '{}') {
                  console.log(`   ↳ ${C.dim}Détails : ${details}${C.reset}`);
                }
              }
              console.log('');
            } else {
              formatCentrifugoEvent(ch, data);
            }
          }
        }
      } catch (e) {}
    });

    ws.on('close', () => {
      if (pingTimer) clearInterval(pingTimer);
      setTimeout(startConnection, 2000);
    });

    ws.on('error', () => {
      // Reconnexion gérée par onclose
    });
  } catch (err) {
    setTimeout(startConnection, 3000);
  }
}

startConnection();

// Maintenir le process indéfiniment en vie
const keepAliveInterval = setInterval(() => {}, 1000 * 60 * 60);

process.on('SIGINT', () => {
  clearInterval(keepAliveInterval);
  if (pingTimer) clearInterval(pingTimer);
  if (ws) ws.close();
  console.log(`\n${C.yellow}Fermeture de la Console Live BricoleMoi.${C.reset}`);
  process.exit(0);
});
