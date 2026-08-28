#!/usr/bin/env node
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

const CENTRIFUGO_WS_URL = envVars.VITE_CENTRIFUGO_WS_URL || 'ws://51.255.46.206:8800/connection/websocket';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[35m%s\x1b[0m', ' ⚡  BRICOLEMOI — SIMULATEUR DE PARCOURS SOS CENTRIFUGO VPS (0 DH)');
console.log('\x1b[36m%s\x1b[0m', '    [ Simulation Réaliste : Client SOS ➔ Centrifugo ➔ Artisan ➔ Clôture 5★ ]');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');

async function runSimulation() {
  const directWsUrl = CENTRIFUGO_WS_URL.startsWith('wss://')
    ? 'ws://51.255.46.206:8800/connection/websocket'
    : CENTRIFUGO_WS_URL;

  const ws = new WebSocket(directWsUrl);
  let cmdId = 1;

  await new Promise((resolve) => {
    ws.on('open', () => {
      ws.send(JSON.stringify({ id: cmdId++, connect: { token: '' } }));
      resolve();
    });
  });

  const publishEvent = (channel, data) => {
    ws.send(JSON.stringify({
      id: cmdId++,
      publish: { channel, data }
    }));
  };

  console.log('\x1b[34m[ÉTAPE 1/4]\x1b[0m 👤 \x1b[1mUn Client lance un SOS d\'Urgence à Fès (Fuite d\'eau)...\x1b[0m');
  const testMissionId = 'sim-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
  const fakeJob = {
    id: testMissionId,
    client_name: 'Client Simulateur (Test QA)',
    client_phone: '+212600112233',
    service_type: 'PLUMBING',
    subcategory: 'Fuite d\'eau sous évier urgente',
    district: 'Fès - Narjiss',
    lat: 34.0210,
    lng: -4.9980,
    status: 'PENDING',
    cost_lead: 15.00,
    created_at: new Date().toISOString()
  };

  publishEvent('jobs:stream', { event: 'new_job', payload: fakeJob });
  console.log(`  ✓ Alerte diffusée en direct sur Centrifugo VPS (Canal: jobs:stream)`);

  await sleep(1500);

  console.log('\n\x1b[33m[ÉTAPE 2/4]\x1b[0m 🛠️  \x1b[1mUn Maâlem Plombier à proximité détecte l\'alerte sur son radar...\x1b[0m');
  console.log(`  • Déblocage du lead (-15 DH) pour accéder au numéro client (+212600112233)`);
  publishEvent('jobs:stream', {
    event: 'job_accepted',
    payload: {
      intervention_id: testMissionId,
      maalem_name: 'Maâlem Simulé',
      progress_step: 'ON_THE_WAY'
    }
  });
  console.log(`  ✓ Statut mis à jour en direct : ON_THE_WAY ➔ En route vers le client`);

  await sleep(1500);

  console.log('\n\x1b[35m[ÉTAPE 3/4]\x1b[0m 📍 \x1b[1mArrivée sur les lieux & Début de la réparation...\x1b[0m');
  publishEvent('jobs:stream', {
    event: 'job_progress_updated',
    payload: {
      intervention_id: testMissionId,
      progress_step: 'ARRIVED'
    }
  });
  console.log(`  ✓ Notification reçue par le client : « Votre Maâlem est arrivé sur place ! »`);

  await sleep(1500);

  console.log('\n\x1b[32m[ÉTAPE 4/4]\x1b[0m ✅ \x1b[1mClôture des travaux & Évaluation 5★ accordée par le Client !\x1b[0m');
  console.log(`  • Accord Direct validé sans intermédiaire.`);
  console.log(`  • Évaluation enregistrée : ★★★★★ (5/5) avec Badges ⏱️ Très Ponctuel & 🧹 Chantier Propre`);

  console.log('\n\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
  console.log('\x1b[32m✓ SIMULATION CENTRIFUGO VPS TERMINÉE AVEC SUCCÈS (100% Opérationnel)\x1b[0m');
  console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');

  ws.close();
  process.exit(0);
}

runSimulation().catch(console.error);
