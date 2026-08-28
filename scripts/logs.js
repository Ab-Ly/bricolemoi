#!/usr/bin/env node

/**
 * 📟 BricoleMoi Live Console & Telemetry CLI
 * Version 2.0 : Offline Queue Catch-up, Network Health & Deep Error Monitoring
 *
 * Usage :
 *   npm run logs
 *   node scripts/logs.js
 */

import Ably from 'ably';
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

const ABLY_API_KEY = envVars.VITE_ABLY_API_KEY || process.env.VITE_ABLY_API_KEY;

if (!ABLY_API_KEY) {
  console.error('\x1b[31m%s\x1b[0m', '❌ ERREUR: VITE_ABLY_API_KEY absente du fichier .env');
  process.exit(1);
}

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
console.log(`${C.cyan}║${C.reset}  ${C.bold}${C.green}📟 BRICOLEMOI LIVE CONSOLE & TELEMETRY STREAM 2.0${C.reset}                         ${C.cyan}║${C.reset}`);
console.log(`${C.cyan}║${C.reset}  ${C.dim}Flux temps réel & rattrapage hors-ligne des téléphones & navigateurs 🇲🇦${C.reset}    ${C.cyan}║${C.reset}`);
console.log(`${C.cyan}╚════════════════════════════════════════════════════════════════════════════╝${C.reset}`);
console.log(`${C.dim}📡 Canaux actifs : bricolemoi:terminal:logs | bricolemoi:jobs:stream | bricolemoi:admin:alerts${C.reset}`);
console.log(`${C.green}✓ Connecté à Ably Realtime Gateway. En attente d'événements...${C.reset}\n`);

const ably = new Ably.Realtime({
  key: ABLY_API_KEY,
  clientId: 'cli-live-logger'
});

const formatTime = (isoString) => {
  const date = isoString ? new Date(isoString) : new Date();
  return `${C.dim}[${date.toLocaleTimeString('fr-FR')}.${String(date.getMilliseconds()).padStart(3, '0')}]${C.reset}`;
};

const getRoleBadge = (role) => {
  switch (String(role || '').toUpperCase()) {
    case 'MAALEM':
      return `${C.bgAmber} 🛠️ MAÂLEM ${C.reset}`;
    case 'CLIENT':
      return `${C.bgBlue} 👤 CLIENT ${C.reset}`;
    case 'ADMIN':
      return `${C.bgPurple} 🛡️ ADMIN ${C.reset}`;
    case 'SYSTEM':
      return `${C.bgGray} ⚙️ SYSTÈME ${C.reset}`;
    default:
      return `${C.dim}[VISITEUR]${C.reset}`;
  }
};

const getLevelBadge = (level) => {
  switch (String(level || '').toUpperCase()) {
    case 'ERROR':
      return `${C.bgRed} ERROR ${C.reset}`;
    case 'WARN':
      return `${C.yellow}${C.bold}⚠ WARN${C.reset}`;
    case 'ACTION':
      return `${C.cyan}${C.bold}⚡ ACTION${C.reset}`;
    case 'GPS':
      return `${C.green}${C.bold}📍 GPS${C.reset}`;
    case 'SOS':
      return `${C.red}${C.bold}🚨 SOS${C.reset}`;
    case 'NETWORK':
      return `${C.magenta}${C.bold}🌐 RÉSEAU${C.reset}`;
    default:
      return `${C.blue}${C.bold}ℹ INFO${C.reset}`;
  }
};

// 1. Écoute du canal Télémesure / Logs Frontend
const logsChannel = ably.channels.get('bricolemoi:terminal:logs');
logsChannel.subscribe('client_log', (message) => {
  const p = message.data || {};
  const time = formatTime(p.timestamp);
  const roleBadge = getRoleBadge(p.user?.role);
  const levelBadge = getLevelBadge(p.level);
  const userLabel = p.user?.name ? `${C.bold}${p.user.name}${C.reset}` : `${C.dim}Anonyme${C.reset}`;
  const phoneLabel = p.user?.phone ? `${C.dim}(${p.user.phone})${C.reset}` : '';
  const device = p.device?.summary || `${C.dim}Web Browser${C.reset}`;
  const queuedBadge = p.isQueued ? ` ${C.yellow}[RATTRAPÉ HORS-LIGNE]${C.reset}` : '';

  console.log(`${time} ${levelBadge} ${roleBadge} ${userLabel} ${phoneLabel}${queuedBadge}`);
  console.log(`   ${C.bold}» ${p.message}${C.reset} ${C.dim}• ${device} • [${p.category || 'APP'}]${C.reset}`);

  if (p.data && Object.keys(p.data).length > 0) {
    const serialized = JSON.stringify(p.data);
    if (serialized !== '{}') {
      console.log(`   ${C.dim}↳ Détails : ${serialized}${C.reset}`);
    }
  }
  console.log('');
});

// 2. Écoute des SOS et Chantiers en Direct
const jobsChannel = ably.channels.get('bricolemoi:jobs:stream');
jobsChannel.subscribe((msg) => {
  const time = formatTime();
  const lead = msg.data?.intervention || msg.data || {};
  const eventName = msg.name || 'job_event';

  console.log(`${time} ${C.bgRed} 🚨 FLUX SOS ${C.reset} ${C.bold}${eventName.toUpperCase()}${C.reset}`);
  console.log(`   ${C.bold}Service : ${lead.service_type || lead.subcategory || 'Dépannage'}${C.reset} à ${C.yellow}${lead.district || lead.city || 'Maroc'}${C.reset} (ID: ${lead.id || 'N/A'})`);
  if (lead.client_name) {
    console.log(`   ${C.dim}Client : ${lead.client_name} (${lead.client_phone || 'N/A'})${C.reset}`);
  }
  console.log('');
});

// 3. Écoute des alertes Admin
const adminChannel = ably.channels.get('bricolemoi:admin:alerts');
adminChannel.subscribe((msg) => {
  const time = formatTime();
  console.log(`${time} ${C.bgPurple} 🛡️ ADMIN EVENT ${C.reset} ${C.bold}${msg.name}${C.reset}`);
  console.log(`   ${C.dim}${JSON.stringify(msg.data)}${C.reset}\n`);
});

// Gestion propre de l'arrêt (Ctrl + C)
process.on('SIGINT', () => {
  console.log(`\n${C.yellow}🛑 Fermeture de la console de logs BricoleMoi...${C.reset}`);
  ably.close();
  process.exit(0);
});
