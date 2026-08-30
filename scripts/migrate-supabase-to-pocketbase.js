import { createClient } from '@supabase/supabase-js';
import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Chargement des variables d'environnement
const envPath = path.resolve(__dirname, '../.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  });
}

const SUPABASE_URL = envVars.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY;
const POCKETBASE_URL = 'https://pocketbase.51.255.46.206.sslip.io';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const pb = new PocketBase(POCKETBASE_URL);

// Helper : Convertir UUID en ID PocketBase 15 chars déterministe
export function toPbId(uuid) {
  if (!uuid) return undefined;
  const clean = String(uuid).toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean.slice(0, 15).padEnd(15, '0');
}

// Schémas des collections
const COLLECTIONS_SCHEMA = [
  {
    name: 'profiles',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'phone', type: 'text' },
      { name: 'role', type: 'text' },
      { name: 'full_name', type: 'text' },
      { name: 'city_zone', type: 'text' },
      { name: 'district', type: 'text' },
      { name: 'credits', type: 'number' },
      { name: 'pin_hash', type: 'text' },
      { name: 'is_suspended', type: 'bool' },
      { name: 'avatar_url', type: 'text' },
      { name: 'created_at_original', type: 'text' },
      { name: 'updated_at_original', type: 'text' }
    ]
  },
  {
    name: 'maalem_details',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'specialty', type: 'text' },
      { name: 'specialties', type: 'json' },
      { name: 'cin_number', type: 'text' },
      { name: 'cin_photo_url', type: 'text' },
      { name: 'cin_photo_recto_url', type: 'text' },
      { name: 'cin_photo_verso_url', type: 'text' },
      { name: 'cin_verified', type: 'bool' },
      { name: 'cin_rejection_reason', type: 'text' },
      { name: 'credit_balance', type: 'number' },
      { name: 'is_verified', type: 'bool' },
      { name: 'rating_avg', type: 'number' },
      { name: 'total_reviews', type: 'number' },
      { name: 'consecutive_five_stars', type: 'number' },
      { name: 'hundred_dh_recharges_count', type: 'number' },
      { name: 'lat', type: 'number' },
      { name: 'lng', type: 'number' },
      { name: 'is_online', type: 'bool' },
      { name: 'is_available', type: 'bool' },
      { name: 'status', type: 'text' },
      { name: 'bio', type: 'text' },
      { name: 'portfolio_urls', type: 'json' },
      { name: 'last_seen_at', type: 'text' },
      { name: 'created_at_original', type: 'text' }
    ]
  },
  {
    name: 'interventions',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'client_id', type: 'text' },
      { name: 'maalem_id', type: 'text' },
      { name: 'service_type', type: 'text' },
      { name: 'subcategory', type: 'text' },
      { name: 'district', type: 'text' },
      { name: 'location_address', type: 'text' },
      { name: 'lat', type: 'number' },
      { name: 'lng', type: 'number' },
      { name: 'status', type: 'text' },
      { name: 'cost_lead', type: 'number' },
      { name: 'estimated_price_min', type: 'number' },
      { name: 'estimated_price_max', type: 'number' },
      { name: 'final_agreed_price', type: 'number' },
      { name: 'devis_confirmed', type: 'bool' },
      { name: 'client_name', type: 'text' },
      { name: 'client_phone', type: 'text' },
      { name: 'maalem_name', type: 'text' },
      { name: 'maalem_phone', type: 'text' },
      { name: 'rating', type: 'number' },
      { name: 'comment', type: 'text' },
      { name: 'badges', type: 'json' },
      { name: 'photos_list', type: 'json' },
      { name: 'audio_note_url', type: 'text' },
      { name: 'progress_step', type: 'text' },
      { name: 'urgency_level', type: 'text' },
      { name: 'escrow_status', type: 'text' },
      { name: 'accepted_at', type: 'text' },
      { name: 'completed_at', type: 'text' },
      { name: 'unfeasible_reason', type: 'text' },
      { name: 'unreachable_reason', type: 'text' },
      { name: 'created_at_original', type: 'text' }
    ]
  },
  {
    name: 'transactions',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'maalem_id', type: 'text' },
      { name: 'amount_dh', type: 'number' },
      { name: 'type', type: 'text' },
      { name: 'payment_method', type: 'text' },
      { name: 'reference_ref', type: 'text' },
      { name: 'status', type: 'text' },
      { name: 'admin_notes', type: 'text' },
      { name: 'receipt_photo_url', type: 'text' },
      { name: 'receipt_url', type: 'text' },
      { name: 'reconciled_at', type: 'text' },
      { name: 'created_at_original', type: 'text' }
    ]
  },
  {
    name: 'reviews',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'intervention_id', type: 'text' },
      { name: 'maalem_id', type: 'text' },
      { name: 'client_id', type: 'text' },
      { name: 'rating', type: 'number' },
      { name: 'comment', type: 'text' },
      { name: 'badges', type: 'json' },
      { name: 'client_name', type: 'text' },
      { name: 'created_at_original', type: 'text' }
    ]
  },
  {
    name: 'admin_notifications',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      { name: 'uuid', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'message', type: 'text' },
      { name: 'type', type: 'text' },
      { name: 'read', type: 'bool' },
      { name: 'target_id', type: 'text' },
      { name: 'created_at_original', type: 'text' }
    ]
  }
];

async function runMigration() {
  console.log('🚀 Démarrage de la migration intégrale Supabase -> PocketBase...');

  // 1. Connexion Superuser PocketBase
  await pb.collection('_superusers').authWithPassword('admin@bricolemoi.ma', 'BricoleMoi2026!Securise');
  console.log('✔ Authentification Superuser PocketBase réussie');

  // 2. Création ou mise à jour des collections
  const existingCollections = await pb.collections.getFullList();
  const existingNames = new Set(existingCollections.map(c => c.name));

  for (const colSchema of COLLECTIONS_SCHEMA) {
    if (!existingNames.has(colSchema.name)) {
      console.log(`📦 Création de la collection "${colSchema.name}"...`);
      await pb.collections.create(colSchema);
    } else {
      console.log(`ℹ️ Collection "${colSchema.name}" déjà existante.`);
    }
  }

  // 3. Récupération des données Supabase
  console.log('\n📥 Extraction des données de Supabase...');
  const [
    { data: profiles, error: pErr },
    { data: maalemDetails, error: mErr },
    { data: interventions, error: iErr },
    { data: transactions, error: tErr },
    { data: reviews, error: rErr },
    { data: adminNotifs, error: nErr }
  ] = await Promise.all([
    supabase.from('profiles').select('*'),
    supabase.from('maalem_details').select('*'),
    supabase.from('interventions').select('*'),
    supabase.from('transactions').select('*'),
    supabase.from('reviews').select('*'),
    supabase.from('admin_notifications').select('*')
  ]);

  if (pErr || mErr || iErr || tErr || rErr) {
    console.error('❌ Erreur lors de la lecture de Supabase:', pErr || mErr || iErr || tErr || rErr);
    process.exit(1);
  }

  console.log(`  - Profiles         : ${profiles?.length || 0}`);
  console.log(`  - Maalem Details   : ${maalemDetails?.length || 0}`);
  console.log(`  - Interventions    : ${interventions?.length || 0}`);
  console.log(`  - Transactions     : ${transactions?.length || 0}`);
  console.log(`  - Reviews          : ${reviews?.length || 0}`);
  console.log(`  - Notifications    : ${adminNotifs?.length || 0}`);

  // 4. Injection dans PocketBase (avec upsert / vérification d'existence)

  // 4.1 Profiles
  console.log('\n⏳ Migration des Profiles...');
  for (const item of (profiles || [])) {
    const pbId = toPbId(item.id);
    const payload = {
      id: pbId,
      uuid: item.id,
      phone: item.phone,
      role: item.role,
      full_name: item.full_name,
      city_zone: item.city_zone,
      district: item.district,
      credits: Number(item.credits || 0),
      pin_hash: item.pin_hash,
      is_suspended: Boolean(item.is_suspended),
      avatar_url: item.avatar_url,
      created_at_original: item.created_at,
      updated_at_original: item.updated_at
    };
    try {
      await pb.collection('profiles').create(payload);
    } catch (e) {
      await pb.collection('profiles').update(pbId, payload);
    }
  }
  console.log('✔ Profiles migrés avec succès');

  // 4.2 Maalem Details
  console.log('⏳ Migration des Maalem Details...');
  for (const item of (maalemDetails || [])) {
    const pbId = toPbId(item.id);
    const payload = {
      id: pbId,
      uuid: item.id,
      specialty: item.specialty,
      specialties: item.specialties || [],
      cin_number: item.cin_number,
      cin_photo_url: item.cin_photo_url,
      cin_photo_recto_url: item.cin_photo_recto_url,
      cin_photo_verso_url: item.cin_photo_verso_url,
      cin_verified: Boolean(item.cin_verified),
      cin_rejection_reason: item.cin_rejection_reason,
      credit_balance: Number(item.credit_balance || 0),
      is_verified: Boolean(item.is_verified),
      rating_avg: Number(item.rating_avg || 0),
      total_reviews: Number(item.total_reviews || 0),
      consecutive_five_stars: Number(item.consecutive_five_stars || 0),
      hundred_dh_recharges_count: Number(item.hundred_dh_recharges_count || 0),
      lat: item.lat ? Number(item.lat) : undefined,
      lng: item.lng ? Number(item.lng) : undefined,
      is_online: Boolean(item.is_online),
      is_available: Boolean(item.is_available),
      status: item.status,
      bio: item.bio,
      portfolio_urls: item.portfolio_urls || [],
      last_seen_at: item.last_seen_at,
      created_at_original: item.created_at
    };
    try {
      await pb.collection('maalem_details').create(payload);
    } catch (e) {
      await pb.collection('maalem_details').update(pbId, payload);
    }
  }
  console.log('✔ Maalem Details migrés avec succès');

  // 4.3 Interventions
  console.log('⏳ Migration des Interventions...');
  for (const item of (interventions || [])) {
    const pbId = toPbId(item.id);
    const payload = {
      id: pbId,
      uuid: item.id,
      client_id: item.client_id,
      maalem_id: item.maalem_id,
      service_type: item.service_type,
      subcategory: item.subcategory,
      district: item.district,
      location_address: item.location_address,
      lat: item.lat ? Number(item.lat) : undefined,
      lng: item.lng ? Number(item.lng) : undefined,
      status: item.status,
      cost_lead: Number(item.cost_lead || 15),
      estimated_price_min: item.estimated_price_min ? Number(item.estimated_price_min) : undefined,
      estimated_price_max: item.estimated_price_max ? Number(item.estimated_price_max) : undefined,
      final_agreed_price: item.final_agreed_price ? Number(item.final_agreed_price) : undefined,
      devis_confirmed: Boolean(item.devis_confirmed),
      client_name: item.client_name,
      client_phone: item.client_phone,
      maalem_name: item.maalem_name,
      maalem_phone: item.maalem_phone,
      rating: item.rating ? Number(item.rating) : undefined,
      comment: item.comment,
      badges: item.badges || [],
      photos_list: item.photos_list || [],
      audio_note_url: item.audio_note_url,
      progress_step: item.progress_step,
      urgency_level: item.urgency_level,
      escrow_status: item.escrow_status,
      accepted_at: item.accepted_at,
      completed_at: item.completed_at,
      unfeasible_reason: item.unfeasible_reason,
      unreachable_reason: item.unreachable_reason,
      created_at_original: item.created_at
    };
    try {
      await pb.collection('interventions').create(payload);
    } catch (e) {
      await pb.collection('interventions').update(pbId, payload);
    }
  }
  console.log('✔ Interventions migrées avec succès');

  // 4.4 Transactions
  console.log('⏳ Migration des Transactions...');
  for (const item of (transactions || [])) {
    const pbId = toPbId(item.id);
    const payload = {
      id: pbId,
      uuid: item.id,
      maalem_id: item.maalem_id,
      amount_dh: Number(item.amount_dh || 0),
      type: item.type,
      payment_method: item.payment_method,
      reference_ref: item.reference_ref,
      status: item.status,
      admin_notes: item.admin_notes,
      receipt_photo_url: item.receipt_photo_url,
      receipt_url: item.receipt_url,
      reconciled_at: item.reconciled_at,
      created_at_original: item.created_at
    };
    try {
      await pb.collection('transactions').create(payload);
    } catch (e) {
      await pb.collection('transactions').update(pbId, payload);
    }
  }
  console.log('✔ Transactions migrées avec succès');

  // 4.5 Reviews
  console.log('⏳ Migration des Reviews...');
  for (const item of (reviews || [])) {
    const pbId = toPbId(item.id);
    const payload = {
      id: pbId,
      uuid: item.id,
      intervention_id: item.intervention_id,
      maalem_id: item.maalem_id,
      client_id: item.client_id,
      rating: Number(item.rating || 5),
      comment: item.comment,
      badges: item.badges || [],
      client_name: item.client_name,
      created_at_original: item.created_at
    };
    try {
      await pb.collection('reviews').create(payload);
    } catch (e) {
      await pb.collection('reviews').update(pbId, payload);
    }
  }
  console.log('✔ Reviews migrées avec succès');

  // 4.6 Notifications
  if (adminNotifs && adminNotifs.length > 0) {
    console.log('⏳ Migration des Notifications...');
    for (const item of adminNotifs) {
      const pbId = toPbId(item.id);
      const payload = {
        id: pbId,
        uuid: item.id,
        title: item.title,
        message: item.message,
        type: item.type,
        read: Boolean(item.read),
        target_id: item.target_id,
        created_at_original: item.created_at
      };
      try {
        await pb.collection('admin_notifications').create(payload);
      } catch (e) {
        await pb.collection('admin_notifications').update(pbId, payload);
      }
    }
    console.log('✔ Notifications migrées avec succès');
  }

  // 5. Rapport d'Audit et de Réconciliation
  console.log('\n📊 AUDIT DE RÉCONCILIATION COMPTABLE EN DIRECT :');
  console.log('─────────────────────────────────────────────────────────────────────────────');

  const [pbProfiles, pbMaalems, pbInterventions, pbTransactions, pbReviews] = await Promise.all([
    pb.collection('profiles').getFullList(),
    pb.collection('maalem_details').getFullList(),
    pb.collection('interventions').getFullList(),
    pb.collection('transactions').getFullList(),
    pb.collection('reviews').getFullList()
  ]);

  console.log(`Profiles       -> Supabase: ${profiles?.length} | PocketBase: ${pbProfiles.length}  ${profiles?.length === pbProfiles.length ? '✅ 100% CONFORME' : '❌ ÉCART'}`);
  console.log(`Maâlems        -> Supabase: ${maalemDetails?.length} | PocketBase: ${pbMaalems.length}  ${maalemDetails?.length === pbMaalems.length ? '✅ 100% CONFORME' : '❌ ÉCART'}`);
  console.log(`Interventions  -> Supabase: ${interventions?.length} | PocketBase: ${pbInterventions.length}  ${interventions?.length === pbInterventions.length ? '✅ 100% CONFORME' : '❌ ÉCART'}`);
  console.log(`Transactions   -> Supabase: ${transactions?.length} | PocketBase: ${pbTransactions.length}  ${transactions?.length === pbTransactions.length ? '✅ 100% CONFORME' : '❌ ÉCART'}`);
  console.log(`Reviews        -> Supabase: ${reviews?.length} | PocketBase: ${pbReviews.length}  ${reviews?.length === pbReviews.length ? '✅ 100% CONFORME' : '❌ ÉCART'}`);

  const totalSupaDH = (transactions || []).reduce((acc, t) => acc + Number(t.amount_dh || 0), 0);
  const totalPbDH = pbTransactions.reduce((acc, t) => acc + Number(t.amount_dh || 0), 0);

  console.log(`Trésorerie DH  -> Supabase: ${totalSupaDH} DH | PocketBase: ${totalPbDH} DH  ${totalSupaDH === totalPbDH ? '✅ INTÉGRITÉ FINANCIÈRE TOTALE' : '❌ ERREUR COMPTABLE'}`);
  console.log('─────────────────────────────────────────────────────────────────────────────\n');
  console.log('🎉 Migration et réconciliation terminées avec succès !');
}

runMigration().catch((err) => {
  console.error('Fatal Migration Error:', err);
  process.exit(1);
});
