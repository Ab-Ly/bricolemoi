/**
 * BricoleMoi Service Worker v3 — PWA & Emergency Push Notifications
 * Système de mise en cache résilient et réveil haptique d'urgence pour Artisans Maâlems au Maroc
 */

const CACHE_NAME = 'bricolemoi-v4';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// 1. Installation & Pre-caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache non-fatal warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. Activation & Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Strategy: Network-First for HTML/Navigation, Cache-First for Fonts, SWR for Assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // Ignorer les requêtes vers les backends API temps-réel (Supabase, Ably, Infobip, Google)
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('ably.io') ||
    url.hostname.includes('infobip.com') ||
    url.hostname.includes('googleapis.com')
  ) {
    return;
  }

  // Polices Google Fonts : Cache-First
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation HTML (SPA) : NETWORK-FIRST absolu pour toujours charger les derniers hashes JS Vite
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = (await caches.match('/index.html')) || (await caches.match('/'));
          if (fallback) return fallback;
          return new Response('Mode hors-ligne BricoleMoi actif.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Assets JS / CSS / Images statiques : Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
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
