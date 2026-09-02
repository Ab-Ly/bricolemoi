import WebSocket from 'ws';

const CENTRIFUGO_URL = 'ws://51.255.46.206:8800/connection/websocket';

console.log('📡 [Test] Connexion au WebSocket Centrifugo VPS :', CENTRIFUGO_URL);

const ws = new WebSocket(CENTRIFUGO_URL);
let eventCount = 0;
const eventsReceived = [];

ws.on('open', () => {
  console.log('🟢 [Test] Connecté avec succès. Authentification et souscription à presence:maalems...');
  ws.send(JSON.stringify({ id: 1, connect: { token: '' } }));
});

ws.on('message', (raw) => {
  try {
    const lines = raw.toString().split('\n').filter(Boolean);
    for (const line of lines) {
      const msg = JSON.parse(line);

      // Connexion réussie
      if (msg.id === 1 || msg.connect || msg.result?.client) {
        console.log('✓ [Test] Authentifié. Souscription à presence:maalems...');
        ws.send(JSON.stringify({
          id: 2,
          subscribe: { channel: 'presence:maalems' }
        }));
        console.log('⏳ [Test] Surveillance active pendant 10 secondes pour mesurer la cadence des événements...');
      }

      // Message reçu sur un canal
      const pub = msg.pub || msg.push?.pub;
      const channel = msg.channel || msg.push?.channel;

      if (pub && channel === 'presence:maalems') {
        eventCount++;
        const now = new Date().toISOString().slice(11, 23);
        const data = pub.data || {};
        eventsReceived.push({
          time: now,
          type: data.type,
          maalem: data.maalem?.full_name || 'N/A',
          phone: data.maalem?.phone || 'N/A'
        });
        console.log(`  [${now}] Événement #${eventCount}: type=${data.type || 'unknown'} maalem=${data.maalem?.full_name || 'N/A'}`);
      }
    }
  } catch (err) {
    console.error('[Test] Erreur message:', err.message);
  }
});

ws.on('error', (err) => {
  console.error('❌ [Test] Erreur WebSocket:', err.message);
});

// Évaluation après 10 secondes
setTimeout(() => {
  console.log('\n=============================================================');
  console.log(`📊 [RÉSULTAT TEST 10 SECONDES SUR presence:maalems]`);
  console.log(`Total messages reçus en 10s : ${eventCount}`);
  
  if (eventCount > 20) {
    console.log(`❌ ALERTE : Cadence anormale (${eventCount} msg en 10s = boucle active !)`);
  } else if (eventCount === 0) {
    console.log(`✅ EXCELLENT : 0 message en boucle. Le canal est calme et stable.`);
  } else {
    console.log(`✅ NORMAL : ${eventCount} message(s) légitime(s) espacé(s) (pas de flood).`);
  }
  console.log('=============================================================');

  ws.close();
  process.exit(0);
}, 10000);
