/**
 * Service de Télémesure & Live Console Logs en Temps Réel pour BricoleMoi CLI
 * Permet de diffuser les logs, actions utilisateurs, GPS et erreurs frontend
 * directement dans le terminal développeur via Ably.
 */
import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from './ablyClient';
import { getAppSubdomain } from './subdomain';

let isTelemetryInitialized = false;
let lastLogPayloadKey = '';
let lastLogTimestamp = 0;

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
 * Diffuse un événement de log ou télémétrie vers le terminal développeur
 * @param {'INFO' | 'ACTION' | 'GPS' | 'SOS' | 'WARN' | 'ERROR' | 'AUTH' | 'STATE'} level
 * @param {string} category 
 * @param {string} message 
 * @param {object} metadata 
 */
export const sendTerminalLog = async (level = 'INFO', category = 'APP', message = '', metadata = {}) => {
  if (!isAblyConfigured || typeof window === 'undefined') return;

  // Déduplication anti-spam (max 1 log identique par seconde)
  const logKey = `${level}:${category}:${message}`;
  const now = Date.now();
  if (logKey === lastLogPayloadKey && now - lastLogTimestamp < 800) {
    return;
  }
  lastLogPayloadKey = logKey;
  lastLogTimestamp = now;

  try {
    const ably = getAblyClient();
    if (!ably || ably.connection.state !== 'connected') return;

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

    const channel = ably.channels.get(ABLY_CHANNELS.TERMINAL_LOGS);
    await channel.publish('client_log', payload);
  } catch (err) {
    // Les logs de télémétrie ne doivent jamais faire planter l'application
    console.debug('[Telemetry] log non critique:', err);
  }
};

/**
 * Initialise l'écoute automatique des erreurs globales et clics clés
 */
export const initRemoteTelemetry = () => {
  if (isTelemetryInitialized || typeof window === 'undefined') return;
  isTelemetryInitialized = true;

  // 1. Capture des erreurs runtime JS non interceptées
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

  // 2. Capture des rejets de promesses non catchés
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason;
      sendTerminalLog('ERROR', 'PROMISE', reason?.message || String(reason) || 'Unhandled Promise Rejection', {
        stack: reason?.stack ? reason.stack.split('\n').slice(0, 3).join(' -> ') : null
      });
    } catch (e) {}
  });

  // 3. Log initial de connexion de session
  setTimeout(() => {
    try {
      sendTerminalLog('INFO', 'SESSION', 'Session connectée et active sur le navigateur', {
        url: window.location.href,
        referrer: document.referrer || 'Direct'
      });
    } catch (e) {}
  }, 1200);
};
