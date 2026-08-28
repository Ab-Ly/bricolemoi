import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables .env manuellement
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

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const CENTRIFUGO_WS_URL = envVars.VITE_CENTRIFUGO_WS_URL || process.env.VITE_CENTRIFUGO_WS_URL || 'ws://51.255.46.206:8800/connection/websocket';

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛰️  BRICOLEMOI GLOBAL 360° TRI-PILLARS OBSERVER CLI');
console.log('\x1b[36m%s\x1b[0m', '    [ 👤 CLIENT  •  🛠️ MAÂLEM  •  🛡️ ADMIN SUPERVISION  •  🚀 CENTRIFUGO VPS ]');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 Supabase Endpoint   : \x1b[33m${SUPABASE_URL || 'Non configuré'}\x1b[0m`);
console.log(`⚡ Centrifugo VPS (WS) : \x1b[32m${CENTRIFUGO_WS_URL}\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
console.log('\x1b[90m%s\x1b[0m', '🎧 Écoute active multi-canaux (SOS, Leads, Présence, Admin & Base Postgres)...');
console.log('');

const formatTime = () => {
  const now = new Date();
  return `\x1b[90m[${now.toLocaleTimeString('fr-FR')}]\x1b[0m`;
};

// 1. Écoute Supabase Realtime (Postgres Changes)
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  supabase
    .channel('global_cli_tri_pillars')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const role = String(d.role || 'CLIENT').toUpperCase();
      const roleBadge = role === 'ADMIN' ? '\x1b[45m\x1b[37m ADMIN \x1b[0m' : role === 'MAALEM' ? '\x1b[43m\x1b[30m MAÂLEM \x1b[0m' : '\x1b[44m\x1b[37m CLIENT \x1b[0m';
      console.log(
        `${formatTime()} \x1b[36m[SUPABASE:PROFILES]\x1b[0m ${roleBadge} \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Nom: \x1b[1m${d.full_name || 'N/A'}\x1b[0m | Tél: ${d.phone || 'N/A'}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'interventions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const statusBadge = d.status === 'COMPLETED' ? '\x1b[42m\x1b[30m TERMINÉ \x1b[0m' : d.status === 'ACCEPTED' ? '\x1b[43m\x1b[30m ACCEPTÉ \x1b[0m' : '\x1b[41m\x1b[37m PENDING \x1b[0m';
      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:INTERVENTIONS]\x1b[0m ${statusBadge} \x1b[1m${type}\x1b[0m #${d.id?.slice(0, 8)} | Service: \x1b[1m${d.service_type || 'N/A'}\x1b[0m | Quartier: ${d.district || 'N/A'}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const isPositive = Number(d.amount_dh) > 0;
      const color = isPositive ? '\x1b[32m' : '\x1b[31m';
      const sign = isPositive ? '+' : '';
      console.log(
        `${formatTime()} \x1b[33m[SUPABASE:TRANSACTIONS]\x1b[0m \x1b[1m${type}\x1b[0m Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Montant: ${color}${sign}${d.amount_dh} DH\x1b[0m | Type: ${d.type}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'maalem_details' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[33m[SUPABASE:MAALEM_DETAILS]\x1b[0m \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Métier: \x1b[1m${d.specialty || 'N/A'}\x1b[0m | Solde: \x1b[32m${d.credit_balance} DH\x1b[0m | En ligne: ${d.is_online ? '🟢' : '⚪'}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[35m[SUPABASE:REVIEWS]\x1b[0m \x1b[1m${type}\x1b[0m Client: \x1b[34m${d.client_id?.slice(0, 8)}...\x1b[0m ➔ Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Note: \x1b[33m${'★'.repeat(d.rating || 5)}\x1b[0m (${d.rating}/5)`
      );
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`${formatTime()} \x1b[32m✓ Connecté au flux Postgres Realtime Supabase\x1b[0m`);
      }
    });
}

// 2. Écoute Centrifugo WebSocket VPS (Haute Performance)
const directWsUrl = CENTRIFUGO_WS_URL.startsWith('wss://')
  ? 'ws://51.255.46.206:8800/connection/websocket'
  : CENTRIFUGO_WS_URL;

try {
  const ws = new WebSocket(directWsUrl);

  ws.on('open', () => {
    // Connexion Centrifugo v5
    ws.send(JSON.stringify({ id: 1, connect: { token: '' } }));
  });

  ws.on('message', (raw) => {
    try {
      const lines = raw.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        const msg = JSON.parse(line);

        // Connexion réussie
        if (msg.id === 1 || msg.connect || msg.result?.client) {
          const clientId = msg.result?.client || msg.connect?.client || 'Connecté';
          console.log(`${formatTime()} \x1b[32m✓ Connecté à Centrifugo v5 sur le VPS (${directWsUrl}) [Client ID: ${clientId}]\x1b[0m`);
          
          // Souscription aux canaux BricoleMoi
          const channels = ['jobs:stream', 'admin:alerts', 'tracking:all'];
          channels.forEach((ch, idx) => {
            ws.send(JSON.stringify({ id: 10 + idx, subscribe: { channel: ch } }));
          });
        }

        if (msg.pub) {
          const ch = msg.channel;
          const data = msg.pub.data || {};
          const event = data.event || data.name || 'UPDATE';
          console.log(
            `${formatTime()} \x1b[32m[CENTRIFUGO_VPS:${ch}]\x1b[0m \x1b[1m⚡ ${event}\x1b[0m :`,
            typeof data.payload === 'object' ? JSON.stringify(data.payload) : JSON.stringify(data)
          );
        }
      }
    } catch (e) {}
  });

  ws.on('error', (err) => {
    console.warn(`${formatTime()} \x1b[33m[Centrifugo Warning] Erreur WebSocket :\x1b[0m`, err.message);
  });
} catch (err) {
  console.warn('[Centrifugo] Erreur initialisation WebSocket:', err);
}

// Maintenir le process ouvert
process.on('SIGINT', () => {
  console.log('\n\x1b[33mArrêt du CLI d\'écoute BricoleMoi.\x1b[0m');
  process.exit(0);
});
