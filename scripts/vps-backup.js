#!/usr/bin/env node
/**
 * BRICOLEMOI — Gestionnaire de Sauvegardes & Santé VPS
 * 
 * Usage :
 *   npm run vps:backup      (Déclenche un snapshot SQLite sécurisé immédiat sur le VPS)
 *   npm run vps:backups     (Liste les sauvegardes disponibles sur le VPS)
 *   npm run vps:status      (Affiche l'état de santé et la dernière sauvegarde)
 *   npm run vps:download    (Télécharge la dernière sauvegarde sur votre machine locale)
 */

import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VPS_CONFIG = {
  host: process.env.VPS_HOST || '51.255.46.206',
  port: parseInt(process.env.VPS_PORT || '22', 10),
  username: process.env.VPS_USER || 'debian',
  password: process.env.VPS_PASSWORD || 'Ali15091985@@'
};

const action = process.argv[2] || 'status';

function executeSSHCommand(cmd, withSudo = false) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let stdout = '';
    let stderr = '';

    conn.on('ready', () => {
      const fullCmd = withSudo ? `echo ${VPS_CONFIG.password} | sudo -S ${cmd}` : cmd;
      conn.exec(fullCmd, (err, stream) => {
        if (err) {
          conn.end();
          return reject(err);
        }

        stream.on('close', (code) => {
          conn.end();
          resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
        });

        stream.on('data', (d) => { stdout += d.toString(); });
        stream.stderr.on('data', (d) => { stderr += d.toString(); });
      });
    }).on('error', (err) => {
      reject(err);
    }).connect(VPS_CONFIG);
  });
}

function sftpDownload(remotePath, localPath) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => {
      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          return reject(err);
        }

        sftp.fastGet(remotePath, localPath, (getErr) => {
          conn.end();
          if (getErr) return reject(getErr);
          resolve();
        });
      });
    }).on('error', reject).connect(VPS_CONFIG);
  });
}

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛡️  BRICOLEMOI — SÉCURITÉ OPÉRATIONNELLE & BACKUPS DU VPS OVH');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 Hôte VPS : \x1b[33m${VPS_CONFIG.host}\x1b[0m | Action : \x1b[1m\x1b[35m${action.toUpperCase()}\x1b[0m\n`);

async function main() {
  try {
    switch (action) {
      case 'backup':
      case 'run': {
        console.log('⏳ Déclenchement du snapshot SQLite sécurisé sur le serveur...');
        const res = await executeSSHCommand('/opt/bricolemoi/scripts/backup.sh', true);
        if (res.code === 0) {
          console.log('\x1b[32m%s\x1b[0m', res.stdout);
          console.log('\n✔ Sauvegarde exécutée avec succès.');
        } else {
          console.error('\x1b[31m❌ Échec de la sauvegarde :\x1b[0m', res.stderr || res.stdout);
          process.exit(1);
        }
        break;
      }

      case 'list':
      case 'backups': {
        console.log('📂 Récupération de la liste des archives sur le VPS...');
        const res = await executeSSHCommand('ls -lh /var/backups/bricolemoi/bricolemoi_backup_*.tar.gz 2>/dev/null || echo "Aucune sauvegarde."', true);
        console.log('\n' + res.stdout + '\n');
        break;
      }

      case 'download': {
        const targetFilename = process.argv[3];
        let remoteFile = '';

        if (!targetFilename) {
          const latestRes = await executeSSHCommand('cat /var/backups/bricolemoi/latest.json 2>/dev/null', true);
          if (latestRes.code === 0 && latestRes.stdout) {
            const meta = JSON.parse(latestRes.stdout);
            remoteFile = `/var/backups/bricolemoi/${meta.filename}`;
          } else {
            console.error('❌ Impossible de trouver la dernière sauvegarde.');
            process.exit(1);
          }
        } else {
          remoteFile = `/var/backups/bricolemoi/${targetFilename}`;
        }

        const localDir = path.resolve(__dirname, '../backups');
        if (!fs.existsSync(localDir)) {
          fs.mkdirSync(localDir, { recursive: true });
        }

        const localDest = path.join(localDir, path.basename(remoteFile));
        console.log(`⬇️  Téléchargement de \x1b[33m${remoteFile}\x1b[0m vers \x1b[32m${localDest}\x1b[0m...`);

        // Sudo copy to /tmp and change owner to debian so sftp can read it
        const tmpCopy = `/tmp/${path.basename(remoteFile)}`;
        await executeSSHCommand(`sh -c 'cp "${remoteFile}" "${tmpCopy}" && chown debian:debian "${tmpCopy}" && chmod 644 "${tmpCopy}"'`, true);

        await sftpDownload(tmpCopy, localDest);
        await executeSSHCommand(`rm -f "${tmpCopy}"`, true);

        const stats = fs.statSync(localDest);
        console.log(`✔ Téléchargement terminé : ${(stats.size / 1024).toFixed(1)} Ko reçus dans ./backups/\n`);
        break;
      }

      case 'status':
      default: {
        console.log('🔍 Interrogation des sondes de santé et du dernier backup...');
        const [healthRes, latestRes, crontabRes] = await Promise.all([
          executeSSHCommand('cat /var/backups/bricolemoi/health-status.json 2>/dev/null', true),
          executeSSHCommand('cat /var/backups/bricolemoi/latest.json 2>/dev/null', true),
          executeSSHCommand('cat /etc/cron.d/bricolemoi 2>/dev/null', false)
        ]);

        console.log('\x1b[1m📊 STATUT DES SERVICES VPS :\x1b[0m');
        console.log('─────────────────────────────────────────────────────────────────────────────');
        if (healthRes.code === 0 && healthRes.stdout) {
          try {
            const h = JSON.parse(healthRes.stdout);
            const statusColor = h.status === 'HEALTHY' ? '\x1b[32m' : '\x1b[31m';
            console.log(`  • Santé Globale      : ${statusColor}\x1b[1m${h.status}\x1b[0m (Dernière vérif : ${h.timestamp})`);
            console.log(`  • PocketBase Core    : ${h.pocketbase_http === '200' ? '🟢 En ligne (HTTP 200)' : '🔴 Injoignable'}`);
            console.log(`  • Centrifugo WS      : ${h.centrifugo_http === '200' ? '🟢 En ligne (HTTP 200)' : '🔴 Injoignable'}`);
            console.log(`  • Disque Système (/) : \x1b[33m${h.disk_usage_pct}%\x1b[0m utilisé`);
            console.log(`  • Mémoire RAM        : \x1b[33m${h.ram_usage_pct}%\x1b[0m utilisée`);
          } catch {
            console.log(healthRes.stdout);
          }
        } else {
          console.log('  ⚠️ Sonde de santé non encore initialisée.');
        }

        console.log('\n\x1b[1m💾 DERNIÈRE SAUVEGARDE AUTOMATIQUE :\x1b[0m');
        console.log('─────────────────────────────────────────────────────────────────────────────');
        if (latestRes.code === 0 && latestRes.stdout) {
          try {
            const b = JSON.parse(latestRes.stdout);
            console.log(`  • Fichier    : \x1b[36m${b.filename}\x1b[0m`);
            console.log(`  • Taille     : \x1b[32m${b.size_human}\x1b[0m (${b.size_bytes} octets)`);
            console.log(`  • Horodatage : ${b.timestamp}`);
            console.log(`  • Intégrité  : SHA256 \x1b[90m${b.sha256}\x1b[0m`);
          } catch {
            console.log(latestRes.stdout);
          }
        } else {
          console.log('  ⚠️ Aucune sauvegarde enregistrée.');
        }

        console.log('\n\x1b[1m⏰ PLANIFICATION CRON DÉTECTÉE :\x1b[0m');
        console.log('─────────────────────────────────────────────────────────────────────────────');
        if (crontabRes.code === 0 && crontabRes.stdout) {
          const activeLines = crontabRes.stdout.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('SHELL') && !l.startsWith('PATH'));
          activeLines.forEach(l => console.log(`  • ${l}`));
        } else {
          console.log('  ⚠️ Tâche cron absente.');
        }
        console.log('─────────────────────────────────────────────────────────────────────────────\n');
        break;
      }
    }
  } catch (err) {
    console.error('\x1b[31m❌ Erreur de communication SSH avec le VPS :\x1b[0m', err.message);
    process.exit(1);
  }
}

main();
