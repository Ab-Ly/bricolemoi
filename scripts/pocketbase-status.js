#!/usr/bin/env node
import PocketBase from 'pocketbase';
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
      envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  });
}

const POCKETBASE_URL = envVars.VITE_POCKETBASE_URL || 'https://pocketbase.51.255.46.206.sslip.io';
const pb = new PocketBase(POCKETBASE_URL);

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' ⚡ BRICOLEMOI — ÉTAT & SANTÉ POCKETBASE VPS EN DIRECT (CLI)');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 URL PocketBase VPS : \x1b[33m${POCKETBASE_URL}\x1b[0m`);
console.log(`⏱️  Horodatage         : \x1b[90m${new Date().toLocaleString('fr-FR')}\x1b[0m\n`);

async function checkStatus() {
  const t0 = Date.now();

  try {
    const [
      profiles,
      maalems,
      interventions,
      transactions,
      reviews,
      notifs
    ] = await Promise.all([
      pb.collection('profiles').getFullList(),
      pb.collection('maalem_details').getFullList(),
      pb.collection('interventions').getFullList(),
      pb.collection('transactions').getFullList(),
      pb.collection('reviews').getFullList(),
      pb.collection('admin_notifications').getFullList()
    ]);

    const ping = Date.now() - t0;

    console.log(`🟢 \x1b[1m\x1b[32mCONNEXION POCKETBASE OPÉRATIONNELLE\x1b[0m (Latence : \x1b[33m${ping}ms\x1b[0m)\n`);

    console.log('\x1b[1m📊 STATISTIQUES DES TABLES EN DIRECT :\x1b[0m');
    console.log('─────────────────────────────────────────────────────────────────────────────');
    console.log(`👤 Comptes Utilisateurs (profiles)      : \x1b[1m\x1b[36m${profiles.length}\x1b[0m`);
    console.log(`🛠️ Profils Maâlems (maalem_details)     : \x1b[1m\x1b[33m${maalems.length}\x1b[0m`);
    console.log(`🚨 Missions SOS (interventions)         : \x1b[1m\x1b[35m${interventions.length}\x1b[0m`);
    console.log(`💳 Transactions & Leads (transactions)  : \x1b[1m\x1b[32m${transactions.length}\x1b[0m`);
    console.log(`⭐ Avis & Évaluations (reviews)         : \x1b[1m\x1b[33m${reviews.length}\x1b[0m`);
    console.log(`🔔 Notifications Admin                  : \x1b[1m\x1b[90m${notifs.length}\x1b[0m`);
    console.log('─────────────────────────────────────────────────────────────────────────────\n');

    // Récupérer les 3 dernières interventions
    const latestInterventions = interventions.slice(0, 3);

    if (latestInterventions.length > 0) {
      console.log('\x1b[1m🕒 DERNIÈRES DEMANDES SOS ENREGISTRÉES :\x1b[0m');
      latestInterventions.forEach((item, idx) => {
        console.log(`  ${idx + 1}. [${item.service_type || item.category || 'SOS'}] Statut: \x1b[33m${item.status}\x1b[0m | Quartier: ${item.district || item.location_address || 'Non spécifié'}`);
      });
      console.log('');
    }

    console.log('\x1b[32m✔ Santé PocketBase VPS 100% Validée.\x1b[0m');
    console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
  } catch (err) {
    console.error('\x1b[31m❌ Erreur de communication avec PocketBase :\x1b[0m', err.message);
  }
}

checkStatus();
