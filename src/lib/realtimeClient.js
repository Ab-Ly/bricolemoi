/**
 * Client & Canaux Temps Réel BricoleMoi (Centrifugo v5 VPS & SSE)
 * Gestionnaire unifié de la diffusion des événements SOS, présence et alertes.
 */

// Constantes des Canaux Temps Réel pour BricoleMoi
export const REALTIME_CHANNELS = {
  PRESENCE_MAALEMS: 'presence:maalems',
  JOBS_STREAM: 'jobs:stream',
  ADMIN_ALERTS: 'admin:alerts',
  TERMINAL_LOGS: 'terminal:logs',
  TRACKING_ALL: 'tracking:all',

  /**
   * Canal individuel par utilisateur pour les statuts d'intervention,
   * validations de devis, déblocages et recharges de solde.
   */
  getUserChannel: (userId) => `notifications:user:${String(userId || '').trim()}`,

  /**
   * Canal géographique et métier pour les diffusions SOS en temps réel
   * aux Maâlems éligibles du secteur.
   */
  getSosChannel: (city = 'casablanca', specialty = 'all') => {
    const c = String(city || 'casablanca')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const s = String(specialty || 'all')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    return `notifications:sos:${c}:${s}`;
  },

  /**
   * Canal SOS global pour toute une ville (tous métiers confondus)
   */
  getSosCityChannel: (city = 'casablanca') => {
    const c = String(city || 'casablanca')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    return `notifications:sos:${c}:all`;
  }
};

// Alias de rétrocompatibilité
export const ABLY_CHANNELS = REALTIME_CHANNELS;
export const isAblyConfigured = false;
export const isRealtimeConfigured = true;
export const getRealtimeClient = () => null;
export const getAblyClient = getRealtimeClient;
