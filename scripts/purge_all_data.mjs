const PB_URL = 'https://pocketbase.51.255.46.206.sslip.io';

async function purgeCollection(name, filter = null) {
  try {
    let url = `${PB_URL}/api/collections/${name}/records?perPage=200`;
    if (filter) {
      url += `&filter=${encodeURIComponent(filter)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    const items = data.items || [];
    console.log(`[${name}] Items to delete: ${items.length}`);
    for (const item of items) {
      const delRes = await fetch(`${PB_URL}/api/collections/${name}/records/${item.id}`, {
        method: 'DELETE'
      });
      console.log(`  Deleted from ${name}: ${item.id} (${item.full_name || item.reference_ref || item.service_type || item.comment || ''}) -> status ${delRes.status}`);
    }
  } catch (e) {
    console.error(`Error purging ${name}:`, e.message);
  }
}

async function runPurge() {
  console.log('--- PURGE TOTALE EN COURS SUR POCKETBASE VPS ---');
  await purgeCollection('interventions');
  await purgeCollection('transactions');
  await purgeCollection('reviews');
  await purgeCollection('maalem_details');
  await purgeCollection('admin_notifications');
  
  // Récupérer et supprimer tous les profils non-admin
  const profRes = await fetch(`${PB_URL}/api/collections/profiles/records?perPage=200`);
  const profData = await profRes.json();
  const nonAdminProfiles = (profData.items || []).filter(p => String(p.role || '').toUpperCase() !== 'ADMIN');
  console.log(`[profiles] Non-admin profiles to delete: ${nonAdminProfiles.length}`);
  for (const p of nonAdminProfiles) {
    const delRes = await fetch(`${PB_URL}/api/collections/profiles/records/${p.id}`, { method: 'DELETE' });
    console.log(`  Deleted profile: ${p.id} (${p.full_name}, ${p.phone}, role: ${p.role}) -> status ${delRes.status}`);
  }

  console.log('--- VÉRIFICATION FINALE DE LA BASE ---');
  const collections = ['interventions', 'transactions', 'reviews', 'maalem_details', 'admin_notifications', 'profiles'];
  for (const col of collections) {
    const cRes = await fetch(`${PB_URL}/api/collections/${col}/records?perPage=50`);
    const cData = await cRes.json();
    console.log(`  -> Collection [${col}] contient désormais : ${cData.items?.length || 0} enregistrement(s)`);
  }
}

runPurge();
