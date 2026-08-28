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
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function cleanTestData() {
  console.log('🚀 Début du nettoyage définitif des données de test...\n');

  // 1. Supprimer les avis (reviews)
  const { data: delReviews, error: revErr } = await supabase
    .from('reviews')
    .delete()
    .not('id', 'is', null)
    .select();
  if (revErr) {
    console.error('❌ Erreur suppression reviews:', revErr.message);
  } else {
    console.log(`✅ Avis supprimés : ${delReviews?.length || 0}`);
  }

  // 2. Supprimer les notifications admin
  const { data: delNotifs, error: notifErr } = await supabase
    .from('admin_notifications')
    .delete()
    .not('id', 'is', null)
    .select();
  if (notifErr) {
    console.error('❌ Erreur suppression notifications:', notifErr.message);
  } else {
    console.log(`✅ Notifications admin supprimées : ${delNotifs?.length || 0}`);
  }

  // 3. Supprimer les transactions
  const { data: delTx, error: txErr } = await supabase
    .from('transactions')
    .delete()
    .not('id', 'is', null)
    .select();
  if (txErr) {
    console.error('❌ Erreur suppression transactions:', txErr.message);
  } else {
    console.log(`✅ Transactions supprimées : ${delTx?.length || 0}`);
  }

  // 4. Supprimer les interventions
  const { data: delIntv, error: intvErr } = await supabase
    .from('interventions')
    .delete()
    .not('id', 'is', null)
    .select();
  if (intvErr) {
    console.error('❌ Erreur suppression interventions:', intvErr.message);
  } else {
    console.log(`✅ Interventions supprimées : ${delIntv?.length || 0}`);
  }

  // 5. Vérification finale des tables
  console.log('\n📊 État final des tables :');
  const [
    { count: countIntv },
    { count: countTx },
    { count: countRev },
    { count: countNotif },
    { count: countProf }
  ] = await Promise.all([
    supabase.from('interventions').select('*', { count: 'exact', head: true }),
    supabase.from('transactions').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
    supabase.from('admin_notifications').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
  ]);

  console.log(`- Interventions restantes : ${countIntv ?? 0}`);
  console.log(`- Transactions restantes : ${countTx ?? 0}`);
  console.log(`- Avis restants : ${countRev ?? 0}`);
  console.log(`- Notifications restantes : ${countNotif ?? 0}`);
  console.log(`- Profils conservés : ${countProf ?? 0}`);

  console.log('\n🎉 Nettoyage terminé avec succès !');
}

cleanTestData().catch(console.error);
