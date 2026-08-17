const CACHE_NAME = 'bricolemoi-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// 🔔 Web Push Notifications Handler (Réveil en arrière-plan)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'BricoleMoi', body: event.data.text() };
    }
  }

  const title = data.title || '🚨 BricoleMoi - Urgence SOS';
  const options = {
    body: data.body || 'Une nouvelle demande de dépannage est disponible dans votre secteur !',
    icon: data.icon || '/favicon.svg',
    badge: '/favicon.svg',
    tag: data.tag || 'sos-alert',
    renotify: true,
    requireInteraction: true,
    vibrate: [400, 200, 400, 200, 600],
    data: {
      url: data.url || '/',
      intervention_id: data.intervention_id || null
    },
    actions: [
      { action: 'open', title: '⚡ Voir l\'Urgence' },
      { action: 'close', title: 'Ignorer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 📲 Notification Click Handler (Ouvrir ou focaliser l'onglet)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
