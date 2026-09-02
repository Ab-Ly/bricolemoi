#!/usr/bin/env node
/**
 * BRICOLEMOI — Inspecteur CLI des Schémas PocketBase VPS
 * Permet de visualiser instantanément tous les champs et types de vos collections en ligne de commande.
 * 
 * Usage :
 *   npm run schema                  (affiche toutes les collections)
 *   npm run schema interventions    (affiche uniquement la collection interventions)
 */

import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger .env si présent
const envPath = path.resolve(__dirname, '../.env');
let pocketbaseUrl = 'https://pocketbase.51.255.46.206.sslip.io';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_POCKETBASE_URL=')) {
      pocketbaseUrl = trimmed.split('=')[1].trim();
    }
  });
}

const pb = new PocketBase(pocketbaseUrl);

const ALL_COLLECTIONS = [
  'profiles',
  'maalem_details',
  'interventions',
  'transactions',
  'reviews',
  'admin_notifications'
];

// Récupérer argument éventuel (ex: node scripts/pocketbase-schema.js interventions)
const filterArg = process.argv[2]?.trim().toLowerCase();
const targetCollections = filterArg
  ? ALL_COLLECTIONS.filter((c) => c.includes(filterArg))
  : ALL_COLLECTIONS;

function formatType(val) {
  if (val === null || val === undefined) return '\x1b[90mnull\x1b[0m';
  if (typeof val === 'boolean') return '\x1b[33mboolean\x1b[0m';
  if (typeof val === 'number') return '\x1b[36mnumber\x1b[0m';
  if (typeof val === 'string') {
    if (/^[a-z0-9]{15}$/.test(val)) return '\x1b[32mstring (id 15ch)\x1b[0m';
    if (val.length > 30) return '\x1b[32mstring (text)\x1b[0m';
    return '\x1b[32mstring\x1b[0m';
  }
  if (Array.isArray(val)) return '\x1b[35marray/json\x1b[0m';
  if (typeof val === 'object') return '\x1b[35mjson/object\x1b[0m';
  return typeof val;
}

function truncateVal(val) {
  if (val === null || val === undefined) return '-';
  if (typeof val === 'object') return JSON.stringify(val).slice(0, 35) + '...';
  const str = String(val);
  return str.length > 35 ? str.slice(0, 32) + '...' : str;
}

async function inspect() {
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════════════════════');
  console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 📋 BRICOLEMOI — INSPECTEUR DE SCHÉMAS POCKETBASE VPS (CLI)');
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════════════════════');
  console.log(`📡 URL PocketBase VPS : \x1b[33m${pocketbaseUrl}\x1b[0m\n`);

  if (targetCollections.length === 0) {
    console.log(`\x1b[31m❌ Aucune collection trouvée correspondant à "${filterArg}".\x1b[0m`);
    console.log(`Collections disponibles : ${ALL_COLLECTIONS.join(', ')}\n`);
    return;
  }

  for (const colName of targetCollections) {
    try {
      const records = await pb.collection(colName).getList(1, 10);
      const totalCount = records.totalItems;

      console.log(`\x1b[1m📦 COLLECTION :\x1b[0m \x1b[1m\x1b[34m${colName}\x1b[0m \x1b[90m(${totalCount} enregistrement(s))\x1b[0m`);
      console.log('┌──────────────────────────────┬──────────────────────┬──────────────────────────────────────┐');
      console.log('│ \x1b[1mNom du Champ\x1b[0m                 │ \x1b[1mType Détecté\x1b[0m         │ \x1b[1mExemple de Valeur\x1b[0m                    │');
      console.log('├──────────────────────────────┼──────────────────────┼──────────────────────────────────────┤');

      // Clés système PocketBase
      const fieldMap = new Map();
      fieldMap.set('id', { type: '\x1b[32mstring (id 15ch)\x1b[0m', example: records.items[0]?.id || 'k0n9h7r3f123456' });
      fieldMap.set('created', { type: '\x1b[32mstring (date)\x1b[0m', example: records.items[0]?.created || '2026-09-02 12:00:00.000Z' });
      fieldMap.set('updated', { type: '\x1b[32mstring (date)\x1b[0m', example: records.items[0]?.updated || '2026-09-02 12:00:00.000Z' });

      // Parcourir tous les items récupérés pour trouver l'union de tous les champs
      for (const item of records.items) {
        for (const [key, val] of Object.entries(item)) {
          if (['id', 'created', 'updated', 'collectionId', 'collectionName', 'expand'].includes(key)) continue;
          if (!fieldMap.has(key) || (val !== null && val !== undefined && val !== '')) {
            fieldMap.set(key, {
              type: formatType(val),
              example: truncateVal(val)
            });
          }
        }
      }

      // Trier par ordre alphabétique (sauf id, created, updated)
      const sortedKeys = Array.from(fieldMap.keys()).sort((a, b) => {
        if (a === 'id') return -1;
        if (b === 'id') return 1;
        return a.localeCompare(b);
      });

      for (const key of sortedKeys) {
        const { type, example } = fieldMap.get(key);
        const paddedKey = key.padEnd(28, ' ');
        // strip ansi pour padding type
        const strippedType = type.replace(/\x1b\[[0-9;]*m/g, '');
        const paddedType = type + ' '.repeat(Math.max(0, 20 - strippedType.length));
        const paddedEx = String(example).slice(0, 36).padEnd(36, ' ');
        console.log(`│ ${paddedKey} │ ${paddedType} │ ${paddedEx} │`);
      }

      console.log('└──────────────────────────────┴──────────────────────┴──────────────────────────────────────┘\n');
    } catch (err) {
      console.warn(`\x1b[31m⚠️ Impossible d'inspecter "${colName}":\x1b[0m ${err.message}\n`);
    }
  }

  console.log('\x1b[90m💡 Astuce : Tapez "npm run schema <nom>" pour filtrer une seule collection (ex: npm run schema interventions)\x1b[0m\n');
}

inspect();
