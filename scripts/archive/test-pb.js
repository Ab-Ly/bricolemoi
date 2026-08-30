import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.51.255.46.206.sslip.io');

async function testPocketBase() {
  try {
    const authData = await pb.collection('_superusers').authWithPassword('admin@bricolemoi.ma', 'BricoleMoi2026!Securise');
    console.log('Superuser Auth OK! Token:', Boolean(authData.token));

    const collections = await pb.collections.getFullList();
    console.log('Collections existantes:', collections.map(c => c.name));
  } catch (err) {
    console.error('PB Error:', err.message, err.response);
  }
}

testPocketBase();
