/**
 * Service de Télémesure & Live Console Logs en Temps Réel pour BricoleMoi CLI
 * Version 2.0 : Offline Queue Buffer, Auto-Flush, Console Interceptor & Network Health
 */
import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from './ablyClient';
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
    const ably = getAblyClient();
    if (!ably || ably.connection.state !== 'connected') {
      isFlushingQueue = false;
      return;
    }

    const channel = ably.channels.get(ABLY_CHANNELS.TERMINAL_LOGS);
    while (offlineLogsQueue.length > 0) {
      const item = offlineLogsQueue.shift();
      if (item) {
        await channel.publish('client_log', item);
      }
    }
  } catch (err) {
    // Si échec pendant le flush, on arrête
  } finally {
    isFlushingQueue = false;
  }
};

/**
 * Diffuse un événement de log ou télémétrie vers le terminal développeur
 * @param {'INFO' | 'ACTION' | 'GPS' | 'SOS' | 'WARN' | 'ERROR' | 'AUTH' | 'STATE' | 'NETWORK'} level
 * @param {string} category 
 * @param {string} message 
 * @param {object} metadata 
 */
export const sendTerminalLog = async (level = 'INFO', category = 'APP', message = '', metadata = {}) => {
  if (!isAblyConfigured || typeof window === 'undefined') return;

  // Déduplication anti-spam (max 1 log identique par 800ms)
  const logKey = `${level}:${category}:${message}`;
  const now = Date.now();
  if (logKey === lastLogPayloadKey && now - lastLogTimestamp < 800) {
    return;
  }
  lastLogPayloadKey = logKey;
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
    const ably = getAblyClient();
    
    // Si la connexion Ably est active, envoyer immédiatement
    if (ably && ably.connection.state === 'connected') {
      const channel = ably.channels.get(ABLY_CHANNELS.TERMINAL_LOGS);
      await channel.publish('client_log', payload);
      // Flush toute file d'attente résiduelle
      if (offlineLogsQueue.length > 0) {
        flushOfflineLogs();
      }
      return;
    }

    // Sinon, stocker dans la file d'attente pour envoi différé dès reconnexion
    if (offlineLogsQueue.length >= MAX_OFFLINE_QUEUE_SIZE) {
      offlineLogsQueue.shift(); // Éviter la saturation mémoire
    }
    payload.isQueued = true;
    offlineLogsQueue.push(payload);
  } catch (err) {
    // Les logs de télémétrie ne doivent jamais faire planter l'application
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

  // 1. Surveillance des états de connexion Ably & flush automatique
  try {
    const ably = getAblyClient();
    if (ably && ably.connection) {
      ably.connection.on('connected', () => {
        sendTerminalLog('INFO', 'REALTIME', '🟢 Gateway Ably connectée et synchronisée');
        flushOfflineLogs();
      });

      ably.connection.on('disconnected', () => {
        // Enregistré dans le buffer hors-ligne
        offlineLogsQueue.push({
          timestamp: new Date().toISOString(),
          level: 'WARN',
          category: 'REALTIME',
          message: '⚠️ Déconnexion temporaire du flux temps réel (tentative de reconnexion...)',
          app: getAppSubdomain() || 'PORTAL',
          user: { role: 'SYSTEM' },
          device: getDeviceInfo(),
          isQueued: true
        });
      });

      ably.connection.on('failed', (err) => {
        offlineLogsQueue.push({
          timestamp: new Date().toISOString(),
          level: 'ERROR',
          category: 'REALTIME',
          message: `❌ Échec de connexion temps réel : ${err?.reason?.message || 'Erreur inconnue'}`,
          app: getAppSubdomain() || 'PORTAL',
          user: { role: 'SYSTEM' },
          device: getDeviceInfo(),
          isQueued: true
        });
      });
    }
  } catch (e) {}

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
        if (!url.includes('ably.net')) {
          sendTerminalLog('ERROR', 'NETWORK', `Coupure ou échec réseau sur : ${url.split('?')[0]}`, {
            error: networkErr?.message || 'NetworkError'
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
