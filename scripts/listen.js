import { createClient } from '@supabase/supabase-js';
import Ably from 'ably';
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
const ABLY_API_KEY = envVars.VITE_ABLY_API_KEY || process.env.VITE_ABLY_API_KEY;

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛰️  BRICOLEMOI GLOBAL REALTIME MONITOR & OBSERVER CLI');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
console.log(`📡 Supabase Endpoint : \x1b[33m${SUPABASE_URL || 'Non configuré'}\x1b[0m`);
console.log(`⚡ Ably Realtime Key : \x1b[33m${ABLY_API_KEY ? ABLY_API_KEY.split(':')[0] + ':***' : 'Non configurée'}\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '───────────────────────────────────────────────────────────────────');
console.log('\x1b[90m%s\x1b[0m', 'En attente des événements en direct (SOS, Leads, Présence, DB)...');
console.log('');

const formatTime = () => {
  const now = new Date();
  return `\x1b[90m[${now.toLocaleTimeString('fr-FR')}]\x1b[0m`;
};

// 1. Écoute Supabase Realtime (Postgres Changes)
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  supabase
    .channel('global_cli_observer')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'interventions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:INTERVENTIONS]\x1b[0m \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Statut: \x1b[35m${d.status || 'N/A'}\x1b[0m | Quartier: ${d.district || 'N/A'}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const color = Number(d.amount_dh) > 0 ? '\x1b[32m' : '\x1b[31m';
      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:TRANSACTIONS]\x1b[0m \x1b[1m${type}\x1b[0m Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Montant: ${color}${d.amount_dh} DH\x1b[0m | Type: ${d.type} | Statut: ${d.status}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'maalem_details' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:MAALEM_DETAILS]\x1b[0m \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Nouveau Solde: \x1b[32m${d.credit_balance} DH\x1b[0m | En ligne: ${d.is_online ? '🟢' : '⚪'}`
      );
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:REVIEWS]\x1b[0m \x1b[1m${type}\x1b[0m Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Note: \x1b[33m${'★'.repeat(d.rating || 5)}\x1b[0m | Badges: ${JSON.stringify(d.badges || [])}`
      );
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`${formatTime()} \x1b[32m✓ Connecté au flux Postgres Realtime Supabase\x1b[0m`);
      }
    });
}

// 2. Écoute Ably Realtime (Canaux SOS, JOBS_STREAM, Présence)
if (ABLY_API_KEY) {
  const ably = new Ably.Realtime({ key: ABLY_API_KEY, clientId: 'cli-global-observer' });

  // Canal Stream Global
  const jobsChannel = ably.channels.get('bricolemoi:jobs:stream');
  jobsChannel.subscribe((msg) => {
    console.log(
      `${formatTime()} \x1b[36m[ABLY:JOBS_STREAM]\x1b[0m \x1b[1m${msg.name}\x1b[0m :`,
      typeof msg.data === 'object' ? JSON.stringify(msg.data) : msg.data
    );
  });

  // Canal Présence Maâlems
  const presenceChannel = ably.channels.get('bricolemoi:presence:maalems');
  presenceChannel.presence.subscribe((presenceMsg) => {
    const actionColor = presenceMsg.action === 'enter' ? '\x1b[32m' : presenceMsg.action === 'leave' ? '\x1b[31m' : '\x1b[33m';
    console.log(
      `${formatTime()} \x1b[35m[ABLY:PRESENCE]\x1b[0m ${actionColor}${presenceMsg.action.toUpperCase()}\x1b[0m Maâlem ID: \x1b[33m${presenceMsg.clientId}\x1b[0m (Nom: ${presenceMsg.data?.full_name || 'N/A'}, Métier: ${presenceMsg.data?.specialty || 'N/A'})`
    );
  });

  // Canal Alertes Admin
  const adminChannel = ably.channels.get('bricolemoi:admin:alerts');
  adminChannel.subscribe((msg) => {
    console.log(
      `${formatTime()} \x1b[31m[ABLY:ADMIN_ALERTS]\x1b[0m \x1b[1m${msg.name}\x1b[0m :`,
      msg.data
    );
  });

  ably.connection.on('connected', () => {
    console.log(`${formatTime()} \x1b[32m✓ Connecté au réseau Ably Realtime (Canaux: JOBS_STREAM, PRESENCE, ADMIN)\x1b[0m`);
  });
}

// Maintenir le process ouvert
process.on('SIGINT', () => {
  console.log('\n\x1b[33mArrêt du CLI d\'écoute BricoleMoi.\x1b[0m');
  process.exit(0);
});
