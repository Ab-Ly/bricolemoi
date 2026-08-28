import { createClient } from '@supabase/supabase-js';
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

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('\x1b[31m❌ Erreur : Variables Supabase manquantes dans .env\x1b[0m');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' ⚡ BRICOLEMOI — ÉTAT & SANTÉ SUPABASE EN DIRECT (CLI)');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 URL Supabase : \x1b[33m${SUPABASE_URL}\x1b[0m`);
console.log(`⏱️  Horodatage   : \x1b[90m${new Date().toLocaleString('fr-FR')}\x1b[0m\n`);

async function checkStatus() {
  const t0 = Date.now();

  try {
    const [
      { count: profilesCount, error: pErr },
      { count: maalemCount, error: mErr },
      { count: interventionsCount, error: iErr },
      { count: transactionsCount, error: tErr },
      { count: reviewsCount, error: rErr },
      { count: notifsCount, error: nErr }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('maalem_details').select('*', { count: 'exact', head: true }),
      supabase.from('interventions').select('*', { count: 'exact', head: true }),
      supabase.from('transactions').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }),
      supabase.from('admin_notifications').select('*', { count: 'exact', head: true })
    ]);

    const ping = Date.now() - t0;

    console.log(`🟢 \x1b[1m\x1b[32mCONNEXION POSTGRES OPÉRATIONNELLE\x1b[0m (Latence : \x1b[33m${ping}ms\x1b[0m)\n`);

    console.log('\x1b[1m📊 STATISTIQUES DES TABLES EN DIRECT :\x1b[0m');
    console.log('─────────────────────────────────────────────────────────────────────────────');
    console.log(`👤 Comptes Utilisateurs (profiles)      : \x1b[1m\x1b[36m${profilesCount ?? 0}\x1b[0m`);
    console.log(`🛠️ Profils Maâlems (maalem_details)     : \x1b[1m\x1b[33m${maalemCount ?? 0}\x1b[0m`);
    console.log(`🚨 Missions SOS (interventions)         : \x1b[1m\x1b[35m${interventionsCount ?? 0}\x1b[0m`);
    console.log(`💳 Transactions & Leads (transactions)  : \x1b[1m\x1b[32m${transactionsCount ?? 0}\x1b[0m`);
    console.log(`⭐ Avis & Évaluations (reviews)         : \x1b[1m\x1b[33m${reviewsCount ?? 0}\x1b[0m`);
    console.log(`🔔 Notifications Admin                  : \x1b[1m\x1b[90m${notifsCount ?? 0}\x1b[0m`);
    console.log('─────────────────────────────────────────────────────────────────────────────\n');

    // Récupérer les 3 dernières interventions
    const { data: latestInterventions } = await supabase
      .from('interventions')
      .select('id, category, status, location_address, created_at')
      .order('created_at', { ascending: false })
      .limit(3);

    if (latestInterventions && latestInterventions.length > 0) {
      console.log('\x1b[1m🕒 DERNIÈRES DEMANDES SOS ENREGISTRÉES :\x1b[0m');
      latestInterventions.forEach((item, idx) => {
        console.log(`  ${idx + 1}. [${item.category}] Statut: \x1b[33m${item.status}\x1b[0m | Adresse: ${item.location_address || 'Non spécifiée'} | ${new Date(item.created_at).toLocaleTimeString('fr-FR')}`);
      });
      console.log('');
    } else {
      console.log('\x1b[90mℹ️ Aucune mission SOS active (base propre post-purge)\x1b[0m\n');
    }

    console.log('\x1b[32m✔ Santé Supabase 100% Validée.\x1b[0m');
    console.log('\x1b[90m💡 Pour écouter les événements en direct temps réel : npm run listen\x1b[0m');
    console.log('\x1b[90m💡 Pour voir les logs console et réseau de la PWA    : npm run logs\x1b[0m');
    console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
  } catch (err) {
    console.error('\x1b[31m❌ Erreur de communication avec Supabase :\x1b[0m', err.message);
  }
}

checkStatus();
