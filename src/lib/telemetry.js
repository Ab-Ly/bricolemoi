/**
 * Superviseur Global d'Événements & Télémétrie d'Erreurs (BricoleMoi)
 * Capture et journalise automatiquement toute exception (Sync, Async, WebSockets, Storage, Audio)
 */

const MAX_LOGS = 60;
const TELEMETRY_KEY = 'bricolemoi_telemetry_logs';

class TelemetrySupervisor {
  constructor() {
    this.logs = this.loadLogs();
    this.listeners = new Set();
    this.initGlobalHandlers();
  }

  loadLogs() {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(TELEMETRY_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {}
    return [];
  }

  saveLogs() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(TELEMETRY_KEY, JSON.stringify(this.logs.slice(0, MAX_LOGS)));
      }
    } catch (e) {}
  }

  initGlobalHandlers() {
    if (typeof window === 'undefined') return;

    // 1. Capture des erreurs synchrones globales
    window.addEventListener('error', (event) => {
      this.recordEvent({
        type: 'UNCAUGHT_ERROR',
        message: event.message || 'Erreur JavaScript non interceptée',
        source: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : 'window',
        stack: event.error?.stack || null,
        severity: 'CRITICAL'
      });
    });

    // 2. Capture des promesses asynchrones rejetées
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const message = typeof reason === 'string' 
        ? reason 
        : reason?.message || JSON.stringify(reason || 'Promesse rejetée sans gestionnaire');

      this.recordEvent({
        type: 'UNHANDLED_PROMISE',
        message: `Unhandled Rejection: ${message}`,
        stack: reason?.stack || null,
        severity: 'WARNING'
      });
    });

    // 3. Capture des erreurs réseau / chargement de ressources Vite
    window.addEventListener('vite:preloadError', (event) => {
      this.recordEvent({
        type: 'VITE_CHUNK_ERROR',
        message: 'Erreur de préchargement de chunk Vite (nouveau déploiement détecté)',
        severity: 'INFO'
      });
    });
  }

  recordEvent({ type = 'INFO', message = '', source = 'app', stack = null, severity = 'INFO', metadata = {} }) {
    const entry = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      type,
      message: String(message),
      source,
      stack,
      severity, // 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS'
      url: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
      metadata
    };

    this.logs.unshift(entry);
    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(0, MAX_LOGS);
    }
    this.saveLogs();
    this.notifyListeners(entry);

    if (severity === 'CRITICAL') {
      console.error(`[Telemetry Supervisor 🚨]`, entry);
    } else if (severity === 'WARNING') {
      console.warn(`[Telemetry Supervisor ⚠️]`, entry);
    }
  }

  /**
   * Helper d'exécution sécurisée pour envelopper n'importe quel callback sensible
   */
  async safeAsync(fn, fallback = null, contextName = 'SafeOperation') {
    try {
      return await fn();
    } catch (err) {
      this.recordEvent({
        type: 'SAFE_ASYNC_CAUGHT',
        message: `Erreur capturée dans ${contextName}: ${err?.message || err}`,
        source: contextName,
        stack: err?.stack || null,
        severity: 'WARNING'
      });
      return fallback;
    }
  }

  /**
   * Helper synchrone sécurisé
   */
  safeSync(fn, fallback = null, contextName = 'SafeSyncOperation') {
    try {
      return fn();
    } catch (err) {
      this.recordEvent({
        type: 'SAFE_SYNC_CAUGHT',
        message: `Erreur capturée dans ${contextName}: ${err?.message || err}`,
        source: contextName,
        stack: err?.stack || null,
        severity: 'WARNING'
      });
      return fallback;
    }
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
    this.saveLogs();
    this.notifyListeners(null);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners(entry) {
    for (const listener of this.listeners) {
      try {
        listener(entry, this.logs);
      } catch (e) {}
    }
  }

  /**
   * Auto-réparation 1-Clic : purge les caches corrompus et répare l'état local
   */
  selfRepair() {
    try {
      // 1. Nettoyer les doublons de synchronisation
      const keysToClean = [
        'bricolemoi_sync_payload',
        'bricolemoi_dismissed_reviews',
        'bricolemoi_dismissed_completions'
      ];
      keysToClean.forEach((k) => localStorage.removeItem(k));

      this.recordEvent({
        type: 'SELF_REPAIR',
        message: 'Auto-réparation exécutée avec succès (Caches de synchronisation purgés)',
        severity: 'SUCCESS'
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const telemetry = new TelemetrySupervisor();
