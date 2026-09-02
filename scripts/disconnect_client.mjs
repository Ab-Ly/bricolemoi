
const CENTRIFUGO_HTTP_URL = 'http://51.255.46.206:8800/api/disconnect';
const TARGET_CLIENT = '2a485273-7fd5-4906-999c-35263ecd7f79';

console.log(`🔌 [Centrifugo] Tentative d'expulsion forcée du client fantôme : ${TARGET_CLIENT}...`);

try {
  const res = await fetch(CENTRIFUGO_HTTP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client: TARGET_CLIENT
    })
  });

  const data = await res.json();
  console.log('Réponse Centrifugo API :', JSON.stringify(data, null, 2));
} catch (e) {
  console.error('Erreur API :', e.message);
}
