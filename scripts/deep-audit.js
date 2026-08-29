import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runDeepAudit() {
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log(' 🔬 AUDIT APPROFONDI DE TOUTES LES TABLES SUPABASE ET DE LEUR INTERACTION');
  console.log('═════════════════════════════════════════════════════════════════════════════\n');

  const tables = ['profiles', 'maalem_details', 'interventions', 'transactions', 'reviews', 'admin_notifications'];
  const tableData = {};
  const tableErrors = {};

  for (const table of tables) {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact' });
    if (error) {
      tableErrors[table] = error;
      console.log(`❌ Table [${table}] : ERREUR (${error.message} - code ${error.code})`);
    } else {
      tableData[table] = data || [];
      console.log(`✅ Table [${table}] : ${data.length} enregistrements.`);
      if (data.length > 0) {
        console.log(`   Colonnes détectées : ${Object.keys(data[0]).join(', ')}`);
      }
    }
  }

  console.log('\n─────────────────────────────────────────────────────────────────────────────');
  console.log(' 🔗 1. CONTRÔLE DE LIAISON ET INTÉGRITÉ RÉFÉRENTIELLE');
  console.log('─────────────────────────────────────────────────────────────────────────────\n');

  const profiles = tableData.profiles || [];
  const maalemDetails = tableData.maalem_details || [];
  const interventions = tableData.interventions || [];
  const transactions = tableData.transactions || [];
  const reviews = tableData.reviews || [];

  const profileIds = new Set(profiles.map((p) => String(p.id).trim()));
  const maalemDetailIds = new Set(maalemDetails.map((d) => String(d.id).trim()));
  const interventionIds = new Set(interventions.map((i) => String(i.id).trim()));

  // A. maalem_details <-> profiles
  console.log('📌 A. Relation [profiles] <-> [maalem_details] (1:1 pour les artisans) :');
  const maalemProfiles = profiles.filter((p) => String(p.role || '').toUpperCase() === 'MAALEM');
  for (const mp of maalemProfiles) {
    const hasDetail = maalemDetailIds.has(String(mp.id).trim());
    if (!hasDetail) {
      console.log(`   ⚠️ ALERTE : Le maâlem "${mp.full_name}" (id: ${mp.id}) n'a AUCUNE fiche dans maalem_details !`);
    } else {
      console.log(`   ✓ Maâlem "${mp.full_name}" (id: ${mp.id}) a bien sa fiche maalem_details correspondante.`);
    }
  }
  for (const md of maalemDetails) {
    const hasProfile = profileIds.has(String(md.id).trim());
    if (!hasProfile) {
      console.log(`   ⚠️ ORPHELIN : maalem_details (id: ${md.id}) n'a pas de profil correspondant dans profiles !`);
    }
  }

  // B. interventions -> profiles (client_id et maalem_id)
  console.log('\n📌 B. Relation [interventions] -> [profiles] :');
  for (const intv of interventions) {
    const cId = intv.client_id ? String(intv.client_id).trim() : null;
    const mId = intv.maalem_id ? String(intv.maalem_id).trim() : null;

    const clientExists = cId ? profileIds.has(cId) : false;
    const maalemExists = mId ? profileIds.has(mId) : false;

    console.log(`   • Mission #${String(intv.id).slice(0, 8)} (${intv.status}) :`);
    console.log(`     - client_id: ${cId || 'NULL'} ➔ ${clientExists ? '✓ Existe dans profiles' : (cId ? '⚠️ Inexistant dans profiles' : 'Client Anonyme')}`);
    console.log(`     - client_phone: ${intv.client_phone || 'Non renseigné'}`);
    console.log(`     - maalem_id: ${mId || 'NULL'} ➔ ${maalemExists ? '✓ Existe dans profiles' : (mId ? '⚠️ Inexistant dans profiles' : 'Non assigné')}`);
    console.log(`     - maalem_phone: ${intv.maalem_phone || 'Non renseigné'}`);
  }

  // C. transactions -> maalem_id / client_id / intervention_id
  console.log('\n📌 C. Relation [transactions] -> [profiles & interventions] :');
  let orphanTxCount = 0;
  for (const tx of transactions) {
    const mId = tx.maalem_id ? String(tx.maalem_id).trim() : null;
    const maalemExists = mId ? profileIds.has(mId) : false;
    const ref = String(tx.reference_ref || '');
    const uuidMatch = ref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const intvId = uuidMatch ? uuidMatch[0].toLowerCase() : null;
    const intvExists = intvId ? interventionIds.has(intvId) : null;

    if (!maalemExists && mId) {
      orphanTxCount++;
      console.log(`   ⚠️ Transaction #${String(tx.id).slice(0, 8)} (${tx.type}, ${tx.amount_dh} DH) : maalem_id "${mId}" inexistant dans profiles !`);
    }
  }
  if (orphanTxCount === 0) {
    console.log(`   ✓ Toutes les ${transactions.length} transactions sont reliées à un maâlem valide.`);
  }

  // D. reviews -> interventions & profiles
  console.log('\n📌 D. Relation [reviews] -> [interventions & profiles] :');
  for (const rev of reviews) {
    const iId = rev.intervention_id ? String(rev.intervention_id).trim() : null;
    const intvExists = iId ? interventionIds.has(iId) : false;
    const mId = rev.maalem_id ? String(rev.maalem_id).trim() : null;
    const maalemExists = mId ? profileIds.has(mId) : false;

    console.log(`   • Avis #${String(rev.id).slice(0, 8)} (${rev.rating}★) :`);
    console.log(`     - intervention_id: ${iId} ➔ ${intvExists ? '✓ Existe' : '⚠️ INTROUVABLE DANS INTERVENTIONS'}`);
    console.log(`     - maalem_id: ${mId} ➔ ${maalemExists ? '✓ Existe' : (mId ? '⚠️ INTROUVABLE DANS PROFILES' : 'Non spécifié')}`);
  }

  // E. Vérification cohérence métier
  console.log('\n─────────────────────────────────────────────────────────────────────────────');
  console.log(' ⚖️ 2. CONTRÔLE DE COHÉRENCE MÉTIER (Soldes, Notes, Statuts)');
  console.log('─────────────────────────────────────────────────────────────────────────────\n');

  // Notes moyennes
  for (const m of maalemProfiles) {
    const mId = String(m.id).trim();
    const details = maalemDetails.find((d) => String(d.id).trim() === mId);
    const mReviews = reviews.filter((r) => String(r.maalem_id || '').trim() === mId);
    const calculatedAvg = mReviews.length > 0 
      ? mReviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / mReviews.length 
      : null;

    console.log(`   Artisan "${m.full_name}" :`);
    console.log(`     - Avis en base pour cet artisan : ${mReviews.length}`);
    console.log(`     - Note moyenne calculée : ${calculatedAvg !== null ? calculatedAvg.toFixed(1) + '★' : 'Aucun avis'}`);
    console.log(`     - Note enregistrée dans maalem_details : ${details?.rating_avg ?? 'NULL'}`);
    console.log(`     - Solde de crédits (maalem_details) : ${details?.credit_balance ?? 'NULL'} DH`);
    console.log(`     - Solde de crédits (profiles) : ${m.credits ?? 'NULL'} DH`);
    if (details?.credit_balance !== undefined && m.credits !== undefined && Number(details.credit_balance) !== Number(m.credits)) {
      console.log(`     ⚠️ DIVERGENCE : credit_balance dans maalem_details (${details.credit_balance}) != credits dans profiles (${m.credits}) !`);
    }
  }

  // Interventions en cours
  console.log('\n📌 Missions en cours et champs critiques :');
  for (const intv of interventions) {
    if (['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(intv.status)) {
      console.log(`   ⚡ Mission ACTIVE #${intv.id} :`);
      console.log(`     - Statut : ${intv.status}`);
      console.log(`     - Progress Step : ${intv.progress_step || 'NULL'}`);
      console.log(`     - Service : ${intv.service_type || 'NULL'}`);
      console.log(`     - Quartier : ${intv.district || 'NULL'}`);
      console.log(`     - Coordonnées : lat=${intv.lat}, lng=${intv.lng}`);
      console.log(`     - Prix convenu : ${intv.final_agreed_price || 'En négociation directe'}`);
      console.log(`     - Escrow status : ${intv.escrow_status || 'NULL'}`);
    }
  }
  
  console.log('\n═════════════════════════════════════════════════════════════════════════════');
}

runDeepAudit().catch(console.error);
