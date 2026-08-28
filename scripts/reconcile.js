#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
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

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('\x1b[31m❌ Erreur : Variables Supabase manquantes dans .env\x1b[0m');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' ⚖️  BRICOLEMOI — RÉCONCILIATION COMPTABLE & AUTO-RÉPARATION');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');

async function reconcileBalances() {
  const [
    { data: profiles },
    { data: maalemDetails },
    { data: transactions }
  ] = await Promise.all([
    supabase.from('profiles').select('*'),
    supabase.from('maalem_details').select('*'),
    supabase.from('transactions').select('*')
  ]);

  const maalems = (profiles || []).filter((p) => String(p.role || '').toUpperCase() === 'MAALEM');
  let adjustedCount = 0;

  for (const m of maalems) {
    const mId = String(m.id).trim();
    const myTxs = (transactions || []).filter((t) => String(t.maalem_id || '').trim() === mId && t.status === 'VALIDATED');
    
    let recharges = 0;
    let bonuses = 0;
    const uniqueLeads = new Map();

    for (const t of myTxs) {
      const amt = parseFloat(t.amount_dh) || 0;
      if (t.payment_method?.includes('Offert') || t.type === 'BONUS' || String(t.reference_ref || '').includes('BONUS')) {
        bonuses += amt;
      } else if (amt > 0) {
        recharges += amt;
      } else {
        const ref = String(t.reference_ref || '');
        const uuidMatch = ref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        const key = uuidMatch ? uuidMatch[0].toLowerCase() : t.id;
        uniqueLeads.set(key, 15);
      }
    }

    if (recharges === 0 && bonuses === 0 && uniqueLeads.size === 0) {
      continue;
    }

    const uniqueLeadDebits = uniqueLeads.size * 15.0;
    const exactBalance = Math.max(0, (recharges + bonuses) - uniqueLeadDebits);

    const details = (maalemDetails || []).find((d) => String(d.id).trim() === mId) || {};
    const currentDb = Number(details.credit_balance ?? m.credits ?? 0);

    if (Math.abs(currentDb - exactBalance) > 0.01) {
      console.log(`🔧 \x1b[33mAjustement pour ${m.full_name || 'Maâlem'}\x1b[0m : ${currentDb.toFixed(2)} DH ➔ \x1b[32m${exactBalance.toFixed(2)} DH\x1b[0m`);
      await Promise.all([
        supabase.from('maalem_details').update({ credit_balance: exactBalance }).eq('id', mId),
        supabase.from('profiles').update({ credits: exactBalance }).eq('id', mId)
      ]);
      adjustedCount++;
    }
  }

  if (adjustedCount === 0) {
    console.log('\x1b[32m✓ Tous les soldes sont déjà parfaitement équilibrés avec le grand livre !\x1b[0m\n');
  } else {
    console.log(`\n\x1b[32m✓ ${adjustedCount} solde(s) artisan(s) réajusté(s) avec succès.\x1b[0m\n`);
  }
}

reconcileBalances().catch(console.error);
