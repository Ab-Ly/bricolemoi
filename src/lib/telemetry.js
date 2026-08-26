/**
 * Telemetry Stub (Désactivé pour préserver 100% des ressources CPU et Mémoire)
 */

export const telemetry = {
  recordEvent: () => {},
  recordNotification: () => {},
  safeAsync: async (fn, fallback = null) => {
    try { return await fn(); } catch (e) { return fallback; }
  },
  safeSync: (fn, fallback = null) => {
    try { return fn(); } catch (e) { return fallback; }
  },
  getLogs: () => [],
  clearLogs: () => {},
  subscribe: () => () => {},
  selfRepair: () => true
};
