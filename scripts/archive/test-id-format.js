import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.51.255.46.206.sslip.io');

async function testIdFormat() {
  await pb.collection('_superusers').authWithPassword('admin@bricolemoi.ma', 'BricoleMoi2026!Securise');

  // Créer une collection de test
  try {
    await pb.collections.create({
      name: 'test_ids',
      type: 'base',
      fields: [
        { name: 'title', type: 'text' }
      ]
    });
  } catch (e) {}

  try {
    const res = await pb.collection('test_ids').create({
      id: '24edc1ef-e212-4191-8409-800000000000',
      title: 'Test UUID'
    });
    console.log('UUID directly accepted as ID:', res.id);
  } catch (err) {
    console.log('UUID not accepted directly as ID, error:', err.response?.data);
  } finally {
    try { await pb.collections.delete('test_ids'); } catch (e) {}
  }
}

testIdFormat();
