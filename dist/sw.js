/**
 * BricoleMoi Service Worker v3 — PWA & Emergency Push Notifications
 * Système de mise en cache résilient et réveil haptique d'urgence pour Artisans Maâlems au Maroc
 */

const CACHE_NAME = 'bricolemoi-v5';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// 1. Installation
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. Activation & Purge All Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// 3. Fetch Strategy: Direct Network for code & data, minimal caching for static fonts/icons
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // Ignorer les requêtes d'API temps réel
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('ably.io') ||
    url.hostname.includes('infobip.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('localhost') ||
    url.hostname.includes('127.0.0.1')
  ) {
    return;
  }

  // Ne pas intercepter le code JS, CSS ou la navigation HTML : toujours réseau direct frais
  if (
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.includes('/assets/')
  ) {
    return;
  }

  // Polices Google Fonts uniquement : Cache-First
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }
});

// 3.5 Écouteur de message pour forcer l'activation immédiate sans attendre
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 4. 🔔 Web Push Notifications d'Urgence SOS (Réveil sonore & haptique)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '🚨 BricoleMoi - Urgence SOS', body: event.data.text() };
    }
  }

  const title = data.title || '🚨 BricoleMoi - Urgence SOS Maroc';
  const options = {
    body: data.body || 'Une nouvelle intervention d\'urgence est disponible dans votre secteur !',
    icon: data.icon || '/favicon.svg',
    badge: '/favicon.svg',
    tag: data.tag || 'sos-alert-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    vibrate: [500, 150, 500, 150, 500, 200, 700],
    data: {
      url: data.url || '/?app=maalem',
      intervention_id: data.intervention_id || null
    },
    actions: [
      { action: 'accept', title: '⚡ Accepter la mission' },
      { action: 'explore', title: '🗺️ Voir la carte' },
      { action: 'close', title: 'Ignorer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 5. 📲 Notification Click Handler (Navigation instantanée vers la mission)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/?app=maalem';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({
            type: 'NOTIFICATION_OPEN_SOS',
            intervention_id: event.notification.data?.intervention_id
          });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
