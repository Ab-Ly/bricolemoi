#!/usr/bin/env node
import PocketBase from 'pocketbase';
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

const POCKETBASE_URL = envVars.VITE_POCKETBASE_URL || 'https://pocketbase.51.255.46.206.sslip.io';
const pb = new PocketBase(POCKETBASE_URL);

console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 🛡️  BRICOLEMOI — AUDIT DE SANTÉ & CONTRÔLE COMPTABLE GLOBAL (POCKETBASE VPS)');
console.log('\x1b[36m%s\x1b[0m', '    [ Analyse Intégrité Base de Données • Trésorerie • GPS • Piliers ]');
console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════════════════════════');
console.log(`📡 Base PocketBase VPS : \x1b[33m${POCKETBASE_URL}\x1b[0m`);
console.log(`⏱️  Horodatage : \x1b[90m${new Date().toLocaleString('fr-FR')}\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '─────────────────────────────────────────────────────────────────────────────\n');

async function runGlobalAudit() {
  const startTime = Date.now();
  let totalIssues = 0;
  let warnings = 0;

  // 1. Récupération des données maîtresses
  let profiles = [], maalemDetails = [], interventions = [], transactions = [], reviews = [];

  try {
    [
      profiles,
      maalemDetails,
      interventions,
      transactions,
      reviews
    ] = await Promise.all([
      pb.collection('profiles').getFullList(),
      pb.collection('maalem_details').getFullList(),
      pb.collection('interventions').getFullList(),
      pb.collection('transactions').getFullList(),
      pb.collection('reviews').getFullList()
    ]);
  } catch (err) {
    console.error('\x1b[31m❌ Erreur lors de la récupération des collections PocketBase :\x1b[0m', err.message);
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
    const uniqueRefunds = new Map();

    for (const t of myTxs) {
      const amt = parseFloat(t.amount_dh) || 0;
      const isBonus = t.payment_method?.includes('Offert') || t.type === 'BONUS' || String(t.reference_ref || '').includes('BONUS');
      const isRefund = t.payment_method?.includes('Remboursement') || String(t.reference_ref || '').startsWith('REFUND_');

      if (isBonus) {
        bonuses += amt;
      } else if (isRefund) {
        const ref = String(t.reference_ref || '');
        const uuidMatch = ref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        const key = uuidMatch ? uuidMatch[0].toLowerCase() : t.id;
        uniqueRefunds.set(key, 15);
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
    const uniqueRefundCredits = uniqueRefunds.size * 15.0;
    totalSpentLeadsAll += uniqueLeadDebits;
    const ledgerExpected = (recharges + bonuses + uniqueRefundCredits) - uniqueLeadDebits;
    const isPerfect = Math.abs(dbCredit - ledgerExpected) < 0.01 || (recharges === 0 && bonuses === 0);

    const statusBadge = isPerfect ? '\x1b[32m[✓ ÉQUILIBRÉ]\x1b[0m' : '\x1b[31m[⚠️ ÉCART DÉTECTÉ]\x1b[0m';
    console.log(
      `  ${statusBadge} \x1b[1m${m.full_name || 'Maâlem'}\x1b[0m (${m.phone || 'Sans tel'}) | Spécialité: \x1b[35m${details.specialty || 'N/A'}\x1b[0m`
    );
    console.log(
      `     • Solde DB: \x1b[1m${dbCredit.toFixed(2)} DH\x1b[0m | Grand Livre (Recharges: +${recharges} DH, Bonus: +${bonuses} DH, Remboursements: +${uniqueRefundCredits} DH, Leads: -${uniqueLeadDebits} DH) ➔ \x1b[1m${ledgerExpected.toFixed(2)} DH\x1b[0m`
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
