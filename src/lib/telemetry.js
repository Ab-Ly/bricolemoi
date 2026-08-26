/**
 * Superviseur Global d'Événements & Télémétrie d'Erreurs (BricoleMoi)
 * Capture et journalise automatiquement TOUS les événements :
 * - Exceptions Sync & Async (unhandledrejection, runtime errors, resource errors)
 * - Navigation & Routes SPA (pushState, replaceState, popstate, hashchange)
 * - Cycle de vie & Visibilité de l'application (visibilitychange, online/offline, pagehide)
 * - Requêtes Réseau (Fetch / API / HTTP errors & latences)
 * - Interactions Utilisateur (Clics sur boutons/liens, soumission de formulaires)
 * - Événements Métier & Custom Events (bricolemoi_*, storage cross-tab)
 * - Toasts & Notifications (SOS, Crédits, Succès, Alertes)
 * - Console Errors & Warnings interceptés
 */

const MAX_LOGS = 200;
const TELEMETRY_KEY = 'bricolemoi_telemetry_logs';

class TelemetrySupervisor {
  constructor() {
    this.logs = this.loadLogs();
    this.listeners = new Set();
    this.isLoggingInternal = false;
    this.initialized = false;
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
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;

    // =========================================================================
    // 1. Capture des Erreurs JavaScript Synchrones & Ressources Défaillantes
    // =========================================================================
    window.addEventListener(
      'error',
      (event) => {
        // Détecter si c'est une erreur de chargement de ressource (img, script, link)
        const target = event.target;
        if (target && target !== window && (target.tagName || target.nodeName)) {
          const tagName = (target.tagName || target.nodeName).toLowerCase();
          const src = target.src || target.href || 'inconnu';
          this.recordEvent({
            type: 'RESOURCE_ERROR',
            category: 'NETWORK',
            message: `Échec de chargement ressource <${tagName}> : ${src}`,
            source: tagName,
            severity: 'WARNING',
            metadata: { tagName, src }
          });
          return;
        }

        this.recordEvent({
          type: 'UNCAUGHT_ERROR',
          category: 'SYSTEM',
          message: event.message || 'Erreur JavaScript non interceptée',
          source: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : 'window',
          stack: event.error?.stack || null,
          severity: 'CRITICAL'
        });
      },
      true // Capture phase pour attraper aussi les erreurs de ressources
    );

    // =========================================================================
    // 2. Capture des Promesses Asynchrones Rejetées
    // =========================================================================
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const message =
        typeof reason === 'string'
          ? reason
          : reason?.message || JSON.stringify(reason || 'Promesse rejetée sans gestionnaire');

      this.recordEvent({
        type: 'UNHANDLED_PROMISE',
        category: 'SYSTEM',
        message: `Unhandled Rejection: ${message}`,
        stack: reason?.stack || null,
        severity: 'WARNING'
      });
    });

    // =========================================================================
    // 3. Connectivité Réseau (Online / Offline)
    // =========================================================================
    window.addEventListener('online', () => {
      this.recordEvent({
        type: 'NETWORK_STATUS',
        category: 'NETWORK',
        message: 'Connexion Internet rétablie (En ligne)',
        severity: 'SUCCESS'
      });
    });

    window.addEventListener('offline', () => {
      this.recordEvent({
        type: 'NETWORK_STATUS',
        category: 'NETWORK',
        message: 'Connexion Internet perdue (Mode hors-ligne)',
        severity: 'WARNING'
      });
    });

    // =========================================================================
    // 4. Interception Intelligente des Requêtes Fetch (API & HTTP)
    // =========================================================================
    this.hookFetch();

    // =========================================================================
    // 5. Navigation & Changements de Routes SPA
    // =========================================================================
    this.hookNavigation();

    // =========================================================================
    // 6. Cycle de Vie de la Page & Visibilité (Onglet en arrière-plan)
    // =========================================================================
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState;
        this.recordEvent({
          type: 'PAGE_VISIBILITY',
          category: 'SYSTEM',
          message: state === 'visible' ? 'Application revenue au premier plan' : 'Application passée en arrière-plan',
          severity: 'INFO',
          metadata: { visibilityState: state }
        });
      });
    }

    window.addEventListener('pagehide', () => {
      this.recordEvent({
        type: 'PAGE_LIFECYCLE',
        category: 'SYSTEM',
        message: 'Fermeture ou mise en veille de la page (pagehide)',
        severity: 'INFO'
      });
    });

    // =========================================================================
    // 7. Interactions Utilisateur Globales (Clics & Soumissions)
    // =========================================================================
    this.hookUserInteractions();

    // =========================================================================
    // 8. Événements Métier Personnalisés & Storage Cross-Tab
    // =========================================================================
    this.hookCustomEvents();

    // =========================================================================
    // 9. Interception des Logs Console (console.error & console.warn)
    // =========================================================================
    this.hookConsole();

    // =========================================================================
    // 10. Gestion des erreurs de builds Vite
    // =========================================================================
    window.addEventListener('vite:preloadError', () => {
      this.recordEvent({
        type: 'VITE_CHUNK_ERROR',
        category: 'SYSTEM',
        message: 'Nouveau déploiement détecté (rechargement de chunk nécessaire)',
        severity: 'INFO'
      });
    });
  }

  hookFetch() {
    if (typeof window === 'undefined' || !window.fetch) return;
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const startTime = performance.now();
      let resource = args[0];
      const config = args[1] || {};
      const method = (config.method || 'GET').toUpperCase();
      const url = typeof resource === 'string' ? resource : resource?.url || 'unknown';

      // Ne pas tracer les requêtes internes très fréquentes si besoin (ex: ping)
      const isInternalTracking = url.includes('/telemetry') || url.includes('/analytics-ingest');

      try {
        const response = await originalFetch.apply(window, args);
        const duration = Math.round(performance.now() - startTime);

        if (!isInternalTracking) {
          if (!response.ok) {
            // Erreur HTTP 4xx ou 5xx
            this.recordEvent({
              type: 'HTTP_ERROR',
              category: 'NETWORK',
              message: `HTTP ${response.status} sur [${method}] ${url} (${duration}ms)`,
              severity: response.status >= 500 ? 'CRITICAL' : 'WARNING',
              metadata: { url, method, status: response.status, duration }
            });
          } else if (duration > 3000) {
            // Requête anormalement lente (> 3s)
            this.recordEvent({
              type: 'SLOW_REQUEST',
              category: 'NETWORK',
              message: `Requête lente détectée : [${method}] ${url} (${duration}ms)`,
              severity: 'WARNING',
              metadata: { url, method, duration, status: response.status }
            });
          }
        }

        return response;
      } catch (error) {
        const duration = Math.round(performance.now() - startTime);
        if (!isInternalTracking) {
          const isAbort = error?.name === 'AbortError' || String(error?.message || '').toLowerCase().includes('aborted');
          const isMapTile =
            url.includes('tile.openstreetmap') ||
            url.includes('cartocdn.com') ||
            url.includes('basemaps') ||
            url.includes('/tiles/') ||
            (url.endsWith('.png') && url.includes('/osm'));

          // Annulation normale de tuiles cartographiques MapLibre lors du déplacement/zoom
          if (isAbort && isMapTile) {
            throw error;
          }

          if (isAbort) {
            this.recordEvent({
              type: 'FETCH_ABORTED',
              category: 'NETWORK',
              message: `Requête interrompue/annulée [${method}] ${url}`,
              severity: 'INFO',
              metadata: { url, method, duration }
            });
            throw error;
          }

          this.recordEvent({
            type: 'FETCH_FAILED',
            category: 'NETWORK',
            message: `Échec réseau Fetch [${method}] ${url} : ${error?.message || error}`,
            severity: 'CRITICAL',
            stack: error?.stack || null,
            metadata: { url, method, duration }
          });
        }
        throw error;
      }
    };
  }

  hookNavigation() {
    if (typeof window === 'undefined') return;

    const recordNav = (type, path) => {
      this.recordEvent({
        type: 'NAVIGATION',
        category: 'NAVIGATION',
        message: `Navigation vers : ${path}`,
        severity: 'INFO',
        metadata: { path, navType: type }
      });
    };

    window.addEventListener('popstate', () => {
      recordNav('POPSTATE', window.location.pathname + window.location.search);
    });

    window.addEventListener('hashchange', () => {
      recordNav('HASHCHANGE', window.location.hash || window.location.pathname);
    });

    // Patch pushState et replaceState pour attraper les transitions du routeur SPA
    if (window.history) {
      const origPushState = window.history.pushState;
      if (origPushState) {
        window.history.pushState = (...args) => {
          origPushState.apply(window.history, args);
          const targetUrl = args[2] ? String(args[2]) : window.location.pathname;
          recordNav('PUSH_STATE', targetUrl);
        };
      }

      const origReplaceState = window.history.replaceState;
      if (origReplaceState) {
        window.history.replaceState = (...args) => {
          origReplaceState.apply(window.history, args);
          const targetUrl = args[2] ? String(args[2]) : window.location.pathname;
          recordNav('REPLACE_STATE', targetUrl);
        };
      }
    }
  }

  hookUserInteractions() {
    if (typeof window === 'undefined') return;

    // Détection des clics sur éléments interactifs pertinents
    window.addEventListener(
      'click',
      (e) => {
        try {
          const target = e.target;
          if (!target || !target.closest) return;

          const interactiveEl = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
          if (interactiveEl) {
            // Récupérer un libellé textuel propre sans fuiter de données sensibles
            const label = (
              interactiveEl.getAttribute('aria-label') ||
              interactiveEl.getAttribute('title') ||
              interactiveEl.innerText ||
              interactiveEl.id ||
              interactiveEl.className ||
              'Élément Interactif'
            )
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 45);

            const tagName = interactiveEl.tagName.toLowerCase();
            const actionId = interactiveEl.id ? `#${interactiveEl.id}` : '';

            this.recordEvent({
              type: 'UI_CLICK',
              category: 'UI',
              message: `Clic sur <${tagName}${actionId}> : "${label}"`,
              severity: 'INFO',
              metadata: {
                tag: tagName,
                id: interactiveEl.id || null,
                label: label
              }
            });
          }
        } catch (err) {}
      },
      { passive: true }
    );

    // Détection des soumissions de formulaires
    window.addEventListener(
      'submit',
      (e) => {
        try {
          const form = e.target;
          const formId = form.id || form.name || form.getAttribute('action') || 'Formulaire';
          this.recordEvent({
            type: 'FORM_SUBMIT',
            category: 'UI',
            message: `Soumission formulaire : ${formId}`,
            severity: 'INFO',
            metadata: { formId }
          });
        } catch (err) {}
      },
      { passive: true }
    );
  }

  hookCustomEvents() {
    if (typeof window === 'undefined') return;

    // Storage cross-tab
    window.addEventListener('storage', (event) => {
      if (!event.key || event.key === TELEMETRY_KEY) return;
      this.recordEvent({
        type: 'STORAGE_SYNC',
        category: 'SYSTEM',
        message: `Mise à jour localStorage (autre onglet) : ${event.key}`,
        severity: 'INFO',
        metadata: { key: event.key }
      });
    });

    // Liste des événements métiers custom de BricoleMoi
    const customEvents = [
      'bricolemoi_open_recharge_modal',
      'bricolemoi_user_logged_out',
      'bricolemoi_user_logged_in',
      'bricolemoi_subdomain_changed',
      'bricolemoi_sync',
      'bricolemoi_new_mission',
      'bricolemoi_emergency_alert',
      'bricolemoi_geo_update'
    ];

    customEvents.forEach((evtName) => {
      window.addEventListener(evtName, (event) => {
        this.recordEvent({
          type: 'APP_CUSTOM_EVENT',
          category: 'APP_EVENT',
          message: `Événement BricoleMoi : ${evtName}`,
          severity: 'INFO',
          metadata: { eventName: evtName, detail: event.detail || null }
        });
      });
    });
  }

  hookConsole() {
    if (typeof window === 'undefined' || typeof console === 'undefined') return;

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      try {
        if (!this.isLoggingInternal) {
          const msg = args
            .map((a) => (typeof a === 'object' ? (a?.message ? a.message : JSON.stringify(a)) : String(a)))
            .join(' ');

          // Éviter les boucles si console.error est déclenché par telemetry
          if (!msg.includes('[Telemetry Supervisor')) {
            this.recordEvent({
              type: 'CONSOLE_ERROR',
              category: 'SYSTEM',
              message: msg.slice(0, 300),
              severity: 'CRITICAL',
              source: 'console.error'
            });
          }
        }
      } catch (e) {}
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      try {
        if (!this.isLoggingInternal) {
          const msg = args
            .map((a) => (typeof a === 'object' ? (a?.message ? a.message : JSON.stringify(a)) : String(a)))
            .join(' ');

          if (!msg.includes('[Telemetry Supervisor')) {
            this.recordEvent({
              type: 'CONSOLE_WARN',
              category: 'SYSTEM',
              message: msg.slice(0, 300),
              severity: 'WARNING',
              source: 'console.warn'
            });
          }
        }
      } catch (e) {}
      originalWarn.apply(console, args);
    };
  }

  recordEvent({
    type = 'INFO',
    category = 'SYSTEM', // 'SYSTEM' | 'NETWORK' | 'NAVIGATION' | 'UI' | 'APP_EVENT' | 'NOTIFICATION'
    message = '',
    source = 'app',
    stack = null,
    severity = 'INFO', // 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS'
    metadata = {}
  }) {
    if (this.isLoggingInternal) return;

    try {
      this.isLoggingInternal = true;
      const entry = {
        id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        type,
        category,
        message: String(message),
        source,
        stack,
        severity,
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
        // Utiliser direct stderr sans boucle
        // console.error est intercepté mais le flag isLoggingInternal protège
      }
    } finally {
      this.isLoggingInternal = false;
    }
  }

  /**
   * Enregistrement direct pour les notifications Toast
   */
  recordNotification(type, title, description = '') {
    this.recordEvent({
      type: `NOTIFICATION_${type.toUpperCase()}`,
      category: 'NOTIFICATION',
      message: `[Notification ${type}] ${title}${description ? ' - ' + description : ''}`,
      severity: type === 'error' || type === 'sos' ? 'CRITICAL' : type === 'warning' ? 'WARNING' : 'INFO',
      metadata: { notifType: type, title, description }
    });
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
        category: 'SYSTEM',
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
        category: 'SYSTEM',
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
      const keysToClean = [
        'bricolemoi_sync_payload',
        'bricolemoi_dismissed_reviews',
        'bricolemoi_dismissed_completions'
      ];
      keysToClean.forEach((k) => localStorage.removeItem(k));

      this.recordEvent({
        type: 'SELF_REPAIR',
        category: 'SYSTEM',
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
