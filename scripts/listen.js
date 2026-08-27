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

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛰️  BRICOLEMOI GLOBAL 360° TRI-PILLARS OBSERVER CLI');
console.log('\x1b[36m%s\x1b[0m', '    [ 👤 CLIENT  •  🛠️ MAÂLEM  •  🛡️ ADMIN SUPERVISION  •  🗄️ SUPABASE DB ]');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 Supabase Endpoint : \x1b[33m${SUPABASE_URL || 'Non configuré'}\x1b[0m`);
console.log(`⚡ Ably Realtime Key : \x1b[33m${ABLY_API_KEY ? ABLY_API_KEY.split(':')[0] + ':***' : 'Non configurée'}\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
console.log('\x1b[90m%s\x1b[0m', '🎧 Écoute active multi-canaux (SOS, Leads, Présence, Admin & Base Postgres)...');
console.log('');

const formatTime = () => {
  const now = new Date();
  return `\x1b[90m[${now.toLocaleTimeString('fr-FR')}]\x1b[0m`;
};

// 1. Écoute Supabase Realtime (Postgres Changes sur toutes les tables piliers)
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  supabase
    .channel('global_cli_tri_pillars')
    // 👤 Table PROFILES (Clients, Artisans, Admins)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const role = String(d.role || 'CLIENT').toUpperCase();
      const roleBadge = role === 'ADMIN' ? '\x1b[45m\x1b[37m ADMIN \x1b[0m' : role === 'MAALEM' ? '\x1b[43m\x1b[30m MAÂLEM \x1b[0m' : '\x1b[44m\x1b[37m CLIENT \x1b[0m';
      console.log(
        `${formatTime()} \x1b[36m[SUPABASE:PROFILES]\x1b[0m ${roleBadge} \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Nom: \x1b[1m${d.full_name || 'N/A'}\x1b[0m | Tél: ${d.phone || 'N/A'} | Zone: ${d.city_zone || 'Maroc'}`
      );
    })
    // 🚀 Table INTERVENTIONS (Demandes SOS, Chantiers & Arbitrage)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'interventions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      let statusColor = '\x1b[33m';
      if (d.status === 'COMPLETED') statusColor = '\x1b[32m';
      if (d.status === 'CANCELLED') statusColor = '\x1b[31m';
      if (d.status === 'ACCEPTED' || d.status === 'ON_THE_WAY' || d.status === 'ARRIVED' || d.status === 'IN_PROGRESS') statusColor = '\x1b[35m';

      console.log(
        `${formatTime()} \x1b[34m[SUPABASE:INTERVENTIONS]\x1b[0m \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Statut: ${statusColor}${d.status || 'N/A'}\x1b[0m | Métier: ${d.service_type || 'N/A'} | Quartier: ${d.district || 'N/A'}`
      );
    })
    // 💰 Table TRANSACTIONS (Recharges, Débits de Leads, Bonus & Remboursements)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      const isPositive = Number(d.amount_dh) > 0;
      const color = isPositive ? '\x1b[32m' : '\x1b[31m';
      const sign = isPositive ? '+' : '';
      console.log(
        `${formatTime()} \x1b[33m[SUPABASE:TRANSACTIONS]\x1b[0m \x1b[1m${type}\x1b[0m Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Montant: ${color}${sign}${d.amount_dh} DH\x1b[0m | Type: ${d.type} | Moyen: ${d.payment_method} | Statut: \x1b[1m${d.status}\x1b[0m`
      );
    })
    // 🛠️ Table MAALEM_DETAILS (Soldes, Spécialités & CIN Vérifiées)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'maalem_details' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[33m[SUPABASE:MAALEM_DETAILS]\x1b[0m \x1b[1m${type}\x1b[0m ID: \x1b[33m${d.id?.slice(0, 8)}...\x1b[0m | Métier: \x1b[1m${d.specialty || 'N/A'}\x1b[0m | Solde: \x1b[32m${d.credit_balance} DH\x1b[0m | En ligne: ${d.is_online ? '🟢' : '⚪'} | CIN: ${d.cin_verified ? '🛡️ Vérifiée' : 'En attente'}`
      );
    })
    // ⭐ Table REVIEWS (Avis Clients, Évaluations 1-5★ & Badges)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (p) => {
      const type = p.eventType;
      const d = p.new || p.old || {};
      console.log(
        `${formatTime()} \x1b[35m[SUPABASE:REVIEWS]\x1b[0m \x1b[1m${type}\x1b[0m Client: \x1b[34m${d.client_id?.slice(0, 8)}...\x1b[0m ➔ Maâlem: \x1b[33m${d.maalem_id?.slice(0, 8)}...\x1b[0m | Note: \x1b[33m${'★'.repeat(d.rating || 5)}\x1b[0m (${d.rating}/5) | Badges: ${JSON.stringify(d.badges || [])}`
      );
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`${formatTime()} \x1b[32m✓ Connecté au flux Postgres Realtime Supabase (Profiles, Interventions, Transactions, MaalemDetails, Reviews)\x1b[0m`);
      }
    });
}

// 2. Écoute Ably Realtime (Flux Client, Maâlem & Supervision Admin)
if (ABLY_API_KEY) {
  const ably = new Ably.Realtime({ key: ABLY_API_KEY, clientId: 'cli-global-tri-pillars' });

  // 📡 Canal Stream Global des Missions (Client & Maâlem)
  const jobsChannel = ably.channels.get('bricolemoi:jobs:stream');
  jobsChannel.subscribe((msg) => {
    console.log(
      `${formatTime()} \x1b[36m[ABLY:JOBS_STREAM]\x1b[0m \x1b[1m${msg.name}\x1b[0m :`,
      typeof msg.data === 'object' ? JSON.stringify(msg.data) : msg.data
    );
  });

  // 🛠️ Canal Présence Radar des Maâlems
  const presenceChannel = ably.channels.get('bricolemoi:presence:maalems');
  presenceChannel.presence.subscribe((presenceMsg) => {
    const actionColor = presenceMsg.action === 'enter' ? '\x1b[32m' : presenceMsg.action === 'leave' ? '\x1b[31m' : '\x1b[33m';
    console.log(
      `${formatTime()} \x1b[33m[ABLY:MAÂLEM_RADAR]\x1b[0m ${actionColor}${presenceMsg.action.toUpperCase()}\x1b[0m ID: \x1b[33m${presenceMsg.clientId}\x1b[0m | Nom: ${presenceMsg.data?.full_name || 'N/A'} | Métier: \x1b[1m${presenceMsg.data?.specialty || 'N/A'}\x1b[0m`
    );
  });

  // 🛡️ Canal Alertes Supervision Admin (Recharges à valider, Litiges, Urgences)
  const adminChannel = ably.channels.get('bricolemoi:admin:alerts');
  adminChannel.subscribe((msg) => {
    console.log(
      `${formatTime()} \x1b[41m\x1b[37m [ABLY:ADMIN_ALERT] \x1b[0m \x1b[1m${msg.name}\x1b[0m :`,
      typeof msg.data === 'object' ? JSON.stringify(msg.data) : msg.data
    );
  });

  // 🏙️ Canaux SOS Régionaux des grandes villes marocaines
  const cities = ['casablanca', 'fes', 'rabat', 'marrakech', 'tanger', 'agadir', 'meknes', 'oujda'];
  cities.forEach((city) => {
    const citySosChannel = ably.channels.get(`notifications:sos:${city}:all`);
    citySosChannel.subscribe('new_emergency_job', (msg) => {
      const job = msg.data || {};
      console.log(
        `${formatTime()} \x1b[34m[ABLY:CLIENT_SOS]\x1b[0m 🚨 \x1b[1mNOUVELLE DEMANDE SOS (${city.toUpperCase()})\x1b[0m | Métier: ${job.service_type || 'N/A'} | Quartier: ${job.district || city} | Client: ${job.client_name || 'Anonyme'}`
      );
    });
  });

  ably.connection.on('connected', () => {
    console.log(`${formatTime()} \x1b[32m✓ Connecté au réseau Ably Realtime (JOBS, RADAR, ADMIN_ALERTS & SOS MULTI-VILLES)\x1b[0m`);
  });
}

// Maintenir le process ouvert
process.on('SIGINT', () => {
  console.log('\n\x1b[33mArrêt du CLI d\'écoute BricoleMoi.\x1b[0m');
  process.exit(0);
});
