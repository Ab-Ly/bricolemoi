import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.51.255.46.206.sslip.io');

try {
  const profiles = await pb.collection('profiles').getFullList();
  console.log('--- ALL PROFILES IN POCKETBASE ---');
  for (const p of profiles) {
    console.log(`[${p.role}] id: ${p.id} | name: ${p.full_name} | email: ${p.email} | phone: ${p.phone}`);
  }
} catch (e) {
  console.error('Error:', e.message);
}
