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
              const time = formatTime();
              const eventName = data.event || data.name || 'UPDATE';
              console.log(`${time} ${C.green}[${ch}]${C.reset} ${C.bold}⚡ ${eventName}${C.reset} :`, typeof data.payload === 'object' ? JSON.stringify(data.payload) : JSON.stringify(data));
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
