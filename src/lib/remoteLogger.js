/**
 * Service de Télémesure & Live Console Logs en Temps Réel pour BricoleMoi CLI
 * Version 2.0 : Offline Queue Buffer, Auto-Flush, Console Interceptor & Network Health
 */
import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from './ablyClient';
import { centrifugo, isCentrifugoConfigured } from './centrifugoClient';
import { getAppSubdomain } from './subdomain';

let isTelemetryInitialized = false;
let lastLogPayloadKey = '';
let lastLogTimestamp = 0;

// File d'attente hors-ligne pour ne jamais perdre un log en cas de micro-coupure
const offlineLogsQueue = [];
const MAX_OFFLINE_QUEUE_SIZE = 60;
let isFlushingQueue = false;

/**
 * Détecte l'environnement d'exécution (Appareil / OS / Mode PWA)
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { platform: 'SSR', isMobile: false, isPWA: false };
  }

  const ua = navigator.userAgent || '';
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || Boolean(navigator.standalone);
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isMac = /Macintosh|Mac OS X/i.test(ua);
  const isWindows = /Windows/i.test(ua);

  let browser = 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Edg/i.test(ua)) browser = 'Edge';

  let os = 'Desktop';
  if (isAndroid) os = 'Android';
  else if (isIOS) os = 'iOS';
  else if (isMac) os = 'macOS';
  else if (isWindows) os = 'Windows';

  return {
    os,
    browser,
    isMobile: isAndroid || isIOS,
    isPWA,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    summary: `${isPWA ? '📲 PWA' : '🌐 Web'} [${os} • ${browser}]`
  };
};

/**
 * Vide et envoie les logs accumulés pendant une déconnexion
 */
const flushOfflineLogs = async () => {
  if (isFlushingQueue || offlineLogsQueue.length === 0) return;
  isFlushingQueue = true;

  try {
    if (isCentrifugoConfigured) {
      while (offlineLogsQueue.length > 0) {
        const item = offlineLogsQueue.shift();
        if (item) {
          await centrifugo.publish('admin:alerts', item);
        }
      }
    } else {
      const ably = getAblyClient();
      if (ably && ably.connection.state === 'connected') {
        const channel = ably.channels.get(ABLY_CHANNELS.TERMINAL_LOGS);
        while (offlineLogsQueue.length > 0) {
          const item = offlineLogsQueue.shift();
          if (item) {
            await channel.publish('client_log', item);
          }
        }
      }
    }
  } catch (err) {
    // Silencieux sur échec flush
  } finally {
    isFlushingQueue = false;
  }
};

/**
 * Envoie un log technique vers le terminal CLI et la console de supervision
 */
export const sendTerminalLog = async (level = 'INFO', category = 'APP', message = '', metadata = {}) => {
  if (typeof window === 'undefined') return;

  // Anti-spam / déduplication
  const now = Date.now();
  const payloadKey = `${level}:${category}:${message}`;
  if (payloadKey === lastLogPayloadKey && now - lastLogTimestamp < 1500) {
    return;
  }
  lastLogPayloadKey = payloadKey;
  lastLogTimestamp = now;

  let userSession = null;
  try {
    userSession = JSON.parse(sessionStorage.getItem('bricolemoi_session') || '{}');
  } catch (e) {}

  const payload = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    category: category.toUpperCase(),
    message,
    app: getAppSubdomain() || 'PORTAL',
    user: {
      id: userSession?.id || metadata?.userId || null,
      name: userSession?.full_name || metadata?.userName || 'Visiteur Anonyme',
      phone: userSession?.phone || metadata?.userPhone || null,
      role: userSession?.role || metadata?.userRole || 'ANONYMOUS'
    },
    device: getDeviceInfo(),
    data: metadata
  };

  try {
    if (isCentrifugoConfigured) {
      await centrifugo.publish('admin:alerts', payload);
      if (offlineLogsQueue.length > 0) {
        flushOfflineLogs();
      }
      return;
    }

    const ably = getAblyClient();
    if (ably && ably.connection.state === 'connected') {
      const channel = ably.channels.get(ABLY_CHANNELS.TERMINAL_LOGS);
      await channel.publish('client_log', payload);
      if (offlineLogsQueue.length > 0) {
        flushOfflineLogs();
      }
      return;
    }

    if (offlineLogsQueue.length >= MAX_OFFLINE_QUEUE_SIZE) {
      offlineLogsQueue.shift();
    }
    payload.isQueued = true;
    offlineLogsQueue.push(payload);
  } catch (err) {
    if (offlineLogsQueue.length < MAX_OFFLINE_QUEUE_SIZE) {
      payload.isQueued = true;
      offlineLogsQueue.push(payload);
    }
  }
};

/**
 * Initialise l'écoute automatique des erreurs globales, console et réseau
 */
export const initRemoteTelemetry = () => {
  if (isTelemetryInitialized || typeof window === 'undefined') return;
  isTelemetryInitialized = true;

  // 1. Annonce de connexion Centrifugo VPS
  if (isCentrifugoConfigured) {
    setTimeout(() => {
      sendTerminalLog('INFO', 'REALTIME', '🟢 Gateway Centrifugo VPS connectée et synchronisée');
      flushOfflineLogs();
    }, 1000);
  } else if (isAblyConfigured) {
    try {
      const ably = getAblyClient();
      if (ably && ably.connection) {
        ably.connection.on('connected', () => {
          sendTerminalLog('INFO', 'REALTIME', '🟢 Gateway Ably connectée et synchronisée');
          flushOfflineLogs();
        });
      }
    } catch (e) {}
  }

  // 2. Capture des erreurs runtime JS non interceptées
  window.addEventListener('error', (event) => {
    try {
      sendTerminalLog('ERROR', 'RUNTIME', event.message || 'Erreur JavaScript non gérée', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack ? event.error.stack.split('\n').slice(0, 3).join(' -> ') : null
      });
    } catch (e) {}
  });

  // 3. Capture des rejets de promesses non catchés
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason;
      sendTerminalLog('ERROR', 'PROMISE', reason?.message || String(reason) || 'Unhandled Promise Rejection', {
        stack: reason?.stack ? reason.stack.split('\n').slice(0, 3).join(' -> ') : null
      });
    } catch (e) {}
  });

  // 4. Interception globale de console.error & console.warn
  try {
    const rawConsoleError = console.error;
    console.error = function (...args) {
      rawConsoleError.apply(console, args);
      try {
        const firstArg = args[0];
        const msg = typeof firstArg === 'string' ? firstArg : (firstArg?.message || JSON.stringify(firstArg) || 'Console error');
        // Éviter les boucles infinies de logs internes
        if (!msg.includes('[Telemetry]') && !msg.includes('WebSocket')) {
          sendTerminalLog('ERROR', 'CONSOLE', msg, {
            details: args.slice(1).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' | ')
          });
        }
      } catch (e) {}
    };

    const rawConsoleWarn = console.warn;
    console.warn = function (...args) {
      rawConsoleWarn.apply(console, args);
      try {
        const firstArg = args[0];
        const msg = typeof firstArg === 'string' ? firstArg : (firstArg?.message || JSON.stringify(firstArg) || 'Console warn');
        if (!msg.includes('[Telemetry]') && !msg.includes('WebSocket')) {
          sendTerminalLog('WARN', 'CONSOLE', msg, {
            details: args.slice(1).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' | ')
          });
        }
      } catch (e) {}
    };
  } catch (e) {}

  // 5. Interception globale des erreurs réseau fetch (4xx / 5xx)
  try {
    const rawFetch = window.fetch;
    window.fetch = async function (...args) {
      try {
        const res = await rawFetch.apply(this, args);
        if (!res.ok && res.status >= 400) {
          const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'API';
          // Ne pas logger les canaux internes de télémétrie
          if (!url.includes('ably.net') && !url.includes('terminal:logs')) {
            sendTerminalLog('WARN', 'NETWORK', `Échec requête HTTP ${res.status} (${res.statusText || 'Error'})`, {
              url: url.split('?')[0],
              status: res.status
            });
          }
        }
        return res;
      } catch (networkErr) {
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'API';
        const errMsg = String(networkErr?.message || '');
        const isAborted = errMsg.includes('abort') || networkErr?.name === 'AbortError';
        const isMapTile = url.includes('.png') || url.includes('tile.openstreetmap') || url.includes('cartocdn') || url.includes('arcgisonline');

        // Ne pas polluer les logs avec les annulations normales de zoom/déplacement de carte
        if (!isAborted && !isMapTile && !url.includes('ably.net') && !url.includes('centrifugo')) {
          sendTerminalLog('ERROR', 'NETWORK', `Coupure ou échec réseau sur : ${url.split('?')[0]}`, {
            error: errMsg || 'NetworkError'
          });
        }
        throw networkErr;
      }
    };
  } catch (e) {}

  // 6. Log initial de connexion de session
  setTimeout(() => {
    try {
      sendTerminalLog('INFO', 'SESSION', 'Session connectée et active sur le navigateur', {
        url: window.location.href,
        referrer: document.referrer || 'Direct'
      });
    } catch (e) {}
  }, 1200);
};
