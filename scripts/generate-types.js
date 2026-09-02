#!/usr/bin/env node
/**
 * Générateur de types TypeScript pour PocketBase (BricoleMoi)
 * Inspecte les collections et génère un fichier de typage strict src/types/pocketbase-types.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PocketBase from 'pocketbase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POCKETBASE_URL = process.env.VITE_POCKETBASE_URL || 'https://pocketbase.51.255.46.206.sslip.io';
const pb = new PocketBase(POCKETBASE_URL);

const KNOWN_COLLECTIONS = [
  'profiles',
  'maalem_details',
  'interventions',
  'transactions',
  'reviews',
  'admin_notifications'
];

function inferType(val) {
  if (val === null || val === undefined) return 'any';
  if (typeof val === 'boolean') return 'boolean';
  if (typeof val === 'number') return 'number';
  if (typeof val === 'string') return 'string';
  if (Array.isArray(val)) {
    if (val.length === 0) return 'any[]';
    return `${inferType(val[0])}[]`;
  }
  if (typeof val === 'object') return 'Record<string, any>';
  return 'any';
}

function toPascalCase(str) {
  return str
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

async function generate() {
  console.log('⚡ Connexion à PocketBase VPS :', POCKETBASE_URL);
  const outDir = path.resolve(__dirname, '../src/types');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let code = `/**
 * Ce fichier a été généré automatiquement par pocketbase-typegen / scripts/generate-types.js
 * standard BricoleMoi (PocketBase 15 chars ID natif)
 */

export interface BaseRecord {
  id: string; // Identifiant natif PocketBase (exactement 15 caractères alphanumériques)
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

`;

  const collectionNames = [];

  for (const colName of KNOWN_COLLECTIONS) {
    try {
      const list = await pb.collection(colName).getList(1, 5);
      const fields = new Map();

      // Toujours inclure l'id PocketBase
      fields.set('id', 'string');

      for (const item of list.items) {
        for (const [k, v] of Object.entries(item)) {
          if (['id', 'created', 'updated', 'collectionId', 'collectionName', 'expand'].includes(k)) continue;
          if (!fields.has(k) || fields.get(k) === 'any') {
            fields.set(k, inferType(v));
          }
        }
      }

      const typeName = `${toPascalCase(colName)}Record`;
      collectionNames.push({ name: colName, type: typeName });

      code += `export interface ${typeName} extends BaseRecord {\n`;
      for (const [k, t] of fields.entries()) {
        if (k === 'id') continue;
        code += `  ${k}?: ${t};\n`;
      }
      code += `}\n\n`;
      console.log(`✔ Types générés pour la collection "${colName}" (${fields.size} champs)`);
    } catch (err) {
      console.warn(`⚠️ Avertissement collection "${colName}":`, err.message);
    }
  }

  code += `export type Collections = {\n`;
  for (const col of collectionNames) {
    code += `  ${col.name}: ${col.type};\n`;
  }
  code += `};\n`;

  const outFile = path.join(outDir, 'pocketbase-types.ts');
  fs.writeFileSync(outFile, code, 'utf8');
  console.log(`\n🎉 Typages enregistrés avec succès dans : ${outFile}`);
}

generate().catch(err => {
  console.error('Erreur génération types:', err);
  process.exit(1);
});
