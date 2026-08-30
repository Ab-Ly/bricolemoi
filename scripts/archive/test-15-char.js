import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.51.255.46.206.sslip.io');

async function test15CharId() {
  await pb.collection('_superusers').authWithPassword('admin@bricolemoi.ma', 'BricoleMoi2026!Securise');

  try {
    await pb.collections.create({
      name: 'test_15',
      type: 'base',
      fields: [{ name: 'title', type: 'text' }]
    });
  } catch (e) {}

  try {
    const custom15 = '24edc1efe212419';
    const res = await pb.collection('test_15').create({
      id: custom15,
      title: 'Custom 15 Char ID'
    });
    console.log('15 char ID accepted:', res.id);
  } catch (err) {
    console.log('15 char ID error:', err.response?.data);
  } finally {
    try { await pb.collections.delete('test_15'); } catch (e) {}
  }
}

test15CharId();
