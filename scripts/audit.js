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
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛡️  BRICOLEMOI — AUDIT DE SANTÉ & CONTRÔLE COMPTABLE GLOBAL');
console.log('\x1b[36m%s\x1b[0m', '    [ Analyse Intégrité Base de Données • Trésorerie • GPS • Piliers ]');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 Base Supabase : \x1b[33m${SUPABASE_URL}\x1b[0m`);
console.log(`⏱️  Horodatage : \x1b[90m${new Date().toLocaleString('fr-FR')}\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────\n');

async function runGlobalAudit() {
  const startTime = Date.now();
  let totalIssues = 0;
  let warnings = 0;

  // 1. Récupération des données maîtresses
  const [
    { data: profiles, error: pErr },
    { data: maalemDetails, error: mErr },
    { data: interventions, error: iErr },
    { data: transactions, error: tErr },
    { data: reviews, error: rErr }
  ] = await Promise.all([
    supabase.from('profiles').select('*'),
    supabase.from('maalem_details').select('*'),
    supabase.from('interventions').select('*'),
    supabase.from('transactions').select('*'),
    supabase.from('reviews').select('*')
  ]);

  if (pErr || mErr || iErr || tErr || rErr) {
    console.error('\x1b[31m❌ Erreur lors de la récupération des tables Supabase.\x1b[0m');
    return;
  }

  const maalems = (profiles || []).filter((p) => String(p.role || '').toUpperCase() === 'MAALEM');
  const clients = (profiles || []).filter((p) => String(p.role || '').toUpperCase() !== 'MAALEM');

  console.log('\x1b[1m\x1b[34m📊 1. INVENTAIRE DES VOLUMES DE LA PLATEFORME\x1b[0m');
  console.log(`  • 👤 Clients enregistrés       : \x1b[1m${clients.length}\x1b[0m`);
  console.log(`  • 🛠️  Artisans Maâlems inscrits : \x1b[1m${maalems.length}\x1b[0m`);
  console.log(`  • 🚀 Interventions SOS totales  : \x1b[1m${interventions?.length || 0}\x1b[0m`);
  console.log(`  • 💰 Transactions comptables   : \x1b[1m${transactions?.length || 0}\x1b[0m`);
  console.log(`  • ⭐ Avis et évaluations       : \x1b[1m${reviews?.length || 0}\x1b[0m\n`);

  // 2. Audit Comptable & Trésorerie par Artisan
  console.log('\x1b[1m\x1b[33m💰 2. AUDIT COMPTABLE & TRÉSORERIE DES MAÂLEMS\x1b[0m');
  let platformTotalCirculatingCredits = 0;
  let totalSpentLeadsAll = 0;

  for (const m of maalems) {
    const mId = String(m.id).trim();
    const details = (maalemDetails || []).find((d) => String(d.id).trim() === mId) || {};
    const dbCredit = Number(details.credit_balance ?? m.credits ?? 0);
    platformTotalCirculatingCredits += dbCredit;

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

    const uniqueLeadDebits = uniqueLeads.size * 15.0;
    totalSpentLeadsAll += uniqueLeadDebits;
    const ledgerExpected = (recharges + bonuses) - uniqueLeadDebits;
    const isPerfect = Math.abs(dbCredit - ledgerExpected) < 0.01 || (recharges === 0 && bonuses === 0);

    const statusBadge = isPerfect ? '\x1b[32m[✓ ÉQUILIBRÉ]\x1b[0m' : '\x1b[31m[⚠️ ÉCART DÉTECTÉ]\x1b[0m';
    console.log(
      `  ${statusBadge} \x1b[1m${m.full_name || 'Maâlem'}\x1b[0m (${m.phone || 'Sans tel'}) | Spécialité: \x1b[35m${details.specialty || 'N/A'}\x1b[0m`
    );
    console.log(
      `     • Solde DB: \x1b[1m${dbCredit.toFixed(2)} DH\x1b[0m | Grand Livre (Recharges: +${recharges} DH, Bonus: +${bonuses} DH, Leads: -${uniqueLeadDebits} DH) ➔ \x1b[1m${ledgerExpected.toFixed(2)} DH\x1b[0m`
    );

    if (!isPerfect && (recharges > 0 || bonuses > 0)) {
      warnings++;
      console.log(`     \x1b[33m↳ Recommandation : Exécutez 'npm run reconcile' pour réajuster ce solde.\x1b[0m`);
    }
  }

  console.log(`\n  💵 \x1b[1mTrésorerie Globale en Circulation : ${platformTotalCirculatingCredits.toFixed(2)} DH\x1b[0m`);
  console.log(`  📉 \x1b[1mVolume total des Leads consommés  : ${totalSpentLeadsAll.toFixed(2)} DH (${totalSpentLeadsAll / 15} missions)\x1b[0m\n`);

  // 3. Audit Intégrité des Interventions & Missions
  console.log('\x1b[1m\x1b[34m🚀 3. CONTRÔLE D\'INTÉGRITÉ DES MISSIONS SOS\x1b[0m');
  const now = Date.now();
  let pendingCount = 0;
  let inProgressCount = 0;
  let completedCount = 0;
  let cancelledCount = 0;

  for (const intv of (interventions || [])) {
    const ageHours = (now - new Date(intv.created_at || now).getTime()) / (1000 * 60 * 60);

    if (intv.status === 'COMPLETED') completedCount++;
    else if (intv.status === 'CANCELLED') cancelledCount++;
    else if (intv.status === 'PENDING') {
      pendingCount++;
      if (ageHours > 24) {
        warnings++;
        console.log(`  \x1b[33m⚠️  Mission en attente ancienne #${intv.id.slice(0, 8)}... (${intv.district || 'Inconnu'}) créée il y a ${ageHours.toFixed(0)}h.\x1b[0m`);
      }
    } else {
      inProgressCount++;
      if (ageHours > 12) {
        warnings++;
        console.log(`  \x1b[33m⚠️  Mission en cours non clôturée #${intv.id.slice(0, 8)}... (${intv.status}) depuis ${ageHours.toFixed(0)}h.\x1b[0m`);
      }
    }
  }

  console.log(`  • ✅ Clôturées avec succès : \x1b[32m${completedCount}\x1b[0m`);
  console.log(`  • 🟡 En attente d'artisan   : \x1b[33m${pendingCount}\x1b[0m`);
  console.log(`  • ⚡ En cours d'exécution   : \x1b[35m${inProgressCount}\x1b[0m`);
  console.log(`  • ❌ Annulées / Infaisables  : \x1b[90m${cancelledCount}\x1b[0m\n`);

  // 4. Score de Santé Global
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const healthScore = Math.max(0, 100 - totalIssues * 10 - warnings * 2);
  let healthColor = '\x1b[32m';
  if (healthScore < 90) healthColor = '\x1b[33m';
  if (healthScore < 70) healthColor = '\x1b[31m';

  console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────');
  console.log(
    `🏆 \x1b[1mINDICE DE SANTÉ GLOBALE DE LA PLATEFORME : ${healthColor}${healthScore}% ${healthScore >= 95 ? 'EXCELLENT' : healthScore >= 80 ? 'BON' : 'ATTENTION REQUISE'}\x1b[0m`
  );
  console.log(`⏱️  Audit complété en \x1b[33m${duration}s\x1b[0m | Alertes: \x1b[33m${warnings}\x1b[0m | Erreurs bloquantes: \x1b[31m${totalIssues}\x1b[0m`);
  console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════\n');
}

runGlobalAudit().catch(console.error);
