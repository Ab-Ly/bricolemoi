import { execSync } from 'child_process';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const clearScreen = () => {
  process.stdout.write('\x1b[2J\x1b[0f');
};

async function watchLiveDeployments() {
  let isWatching = true;
  let counter = 0;

  process.on('SIGINT', () => {
    console.log('\n\x1b[33m👋 Arrêt du moniteur de déploiement.\x1b[0m\n');
    process.exit(0);
  });

  while (isWatching) {
    clearScreen();
    counter++;

    console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
    console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛰️  BRICOLEMOI — RADAR DE DÉPLOIEMENT VERCEL EN DIRECT (LIVE STREAM)');
    console.log('\x1b[36m%s\x1b[0m', '    [ Actualisation automatique en continu • Appuyez sur Ctrl+C pour quitter ]');
    console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');

    try {
      const currentCommit = execSync('git log -1 --format="%h - %s"', { encoding: 'utf8' }).trim();
      console.log(`📌 \x1b[1mDernier Commit Local :\x1b[0m \x1b[33m${currentCommit}\x1b[0m`);
      console.log(`⏱️  Horodatage du contrôle : \x1b[90m${new Date().toLocaleTimeString('fr-FR')} (Cycle #${counter})\x1b[0m\n`);

      const rawList = execSync('npx -y vercel list 2>&1', { encoding: 'utf8' });
      const lines = rawList.split('\n').filter(l => l.includes('https://') && l.includes('bricolemoi'));

      if (lines.length > 0) {
        console.log('\x1b[1m\x1b[34m📋 ÉTAT DES DERNIERS DÉPLOIEMENTS SUR VERCEL :\x1b[0m\n');

        lines.slice(0, 6).forEach((line, idx) => {
          const isLatest = idx === 0;
          const prefix = isLatest ? '\x1b[1m➔ (DERNIER DÉPLOIEMENT)\x1b[0m ' : '  ';

          if (line.includes('Ready')) {
            console.log(`${prefix}\x1b[32m● PRÊT & ACTIF (En Ligne)\x1b[0m ➔ ${line.trim()}`);
          } else if (line.includes('Building') || line.includes('Queued') || line.includes('Initializing')) {
            console.log(`${prefix}\x1b[33m● ⏳ EN COURS DE CONSTRUCTION SUR VERCEL...\x1b[0m ➔ ${line.trim()}`);
          } else if (line.includes('Error') || line.includes('Canceled')) {
            console.log(`${prefix}\x1b[31m● ❌ ERREUR DE BUILD\x1b[0m ➔ ${line.trim()}`);
          } else {
            console.log(`${prefix}• ${line.trim()}`);
          }
        });

        console.log('\n\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
        console.log('🌍 \x1b[1mURL Principale de Production :\x1b[0m \x1b[32mhttps://bricolemoi.vercel.app\x1b[0m');
        console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
        console.log('\x1b[90m📡 En attente du prochain cycle d\'écoute (3s)... Appuyez sur Ctrl+C pour quitter.\x1b[0m');
      } else {
        console.log(rawList);
      }
    } catch (err) {
      console.error('\x1b[31m⚠️ Erreur de liaison Vercel :\x1b[0m', err.message);
    }

    await sleep(3000);
  }
}

watchLiveDeployments().catch(console.error);
