import WebSocket from 'ws';

const wsSubscriber = new WebSocket('ws://51.255.46.206:8800/connection/websocket');

wsSubscriber.on('open', () => {
  console.log('1. Subscriber WS Open. Sending connect...');
  wsSubscriber.send(JSON.stringify({ id: 1, connect: { token: '' } }));
});

wsSubscriber.on('message', (raw) => {
  const msg = JSON.parse(raw.toString());
  console.log('Subscriber received msg:', JSON.stringify(msg));

  if (msg.id === 1) {
    console.log('2. Connected! Subscribing to jobs:stream...');
    wsSubscriber.send(JSON.stringify({ id: 2, subscribe: { channel: 'jobs:stream' } }));
  }

  if (msg.id === 2 && !msg.error) {
    console.log('3. Subscribed successfully! Now publishing a test message...');
    const wsPublisher = new WebSocket('ws://51.255.46.206:8800/connection/websocket');
    wsPublisher.on('open', () => {
      wsPublisher.send(JSON.stringify({ id: 1, connect: { token: '' } }));
    });
    wsPublisher.on('message', (pRaw) => {
      const pMsg = JSON.parse(pRaw.toString());
      if (pMsg.id === 1) {
        console.log('4. Publisher connected! Publishing event...');
        wsPublisher.send(JSON.stringify({
          id: 100,
          publish: {
            channel: 'jobs:stream',
            data: {
              event: 'test_event',
              payload: { text: 'HELLO CENTRIFUGO FROM BRICOLEMOI' }
            }
          }
        }));
      }
    });
  }

  if (msg.pub) {
    console.log('🎉 SUCCESS! Realtime publication received via WebSocket:', JSON.stringify(msg.pub));
    setTimeout(() => {
      console.log('Test completed successfully!');
      process.exit(0);
    }, 500);
  }
});
