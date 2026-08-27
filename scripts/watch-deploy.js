import { execSync } from 'child_process';

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛰️  BRICOLEMOI — CONTRÔLE & SUIVI DU DÉPLOIEMENT VERCEL EN DIRECT');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');

try {
  const currentCommit = execSync('git log -1 --format="%h - %s"', { encoding: 'utf8' }).trim();
  console.log(`📌 \x1b[1mDernier Commit Git :\x1b[0m \x1b[33m${currentCommit}\x1b[0m\n`);

  console.log('📡 Récupération de l\'état de déploiement sur Vercel...\n');
  
  const rawList = execSync('npx -y vercel list 2>&1', { encoding: 'utf8' });
  const lines = rawList.split('\n').filter(l => l.includes('https://') && l.includes('bricolemoi'));

  if (lines.length > 0) {
    console.log('\x1b[1m\x1b[34m📋 DERNIERS DÉPLOIEMENTS ENREGISTRÉS :\x1b[0m');
    lines.slice(0, 5).forEach((line, idx) => {
      if (line.includes('Ready')) {
        console.log(`  \x1b[32m● PRÊT (En Ligne)\x1b[0m ➔ ${line.trim()}`);
      } else if (line.includes('Building')) {
        console.log(`  \x1b[33m● EN CONSTRUCTION...\x1b[0m ➔ ${line.trim()}`);
      } else if (line.includes('Error')) {
        console.log(`  \x1b[31m● ERREUR\x1b[0m ➔ ${line.trim()}`);
      } else {
        console.log(`  • ${line.trim()}`);
      }
    });

    console.log('\n\x1b[32m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
    console.log('🌍 \x1b[1mURL Principale de Production :\x1b[0m \x1b[36mhttps://bricolemoi.vercel.app\x1b[0m');
    console.log('\x1b[32m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────\n');
  } else {
    console.log(rawList);
  }
} catch (err) {
  console.error('\x1b[31m❌ Impossible de récupérer les déploiements Vercel :\x1b[0m', err.message);
}
