import Ably from 'ably';

// Clé API Ably depuis les variables d'environnement Vite
const ABLY_API_KEY = import.meta.env.VITE_ABLY_API_KEY || '';

export const isAblyConfigured = Boolean(ABLY_API_KEY && ABLY_API_KEY.includes(':'));

// Constantes des Canaux Ably Haute Performance pour BricoleMoi
export const ABLY_CHANNELS = {
  PRESENCE_MAALEMS: 'bricolemoi:presence:maalems',
  JOBS_STREAM: 'bricolemoi:jobs:stream',
  ADMIN_ALERTS: 'bricolemoi:admin:alerts',

  /**
   * Canal individuel par utilisateur pour les statuts d'intervention,
   * validations de devis, déblocages et recharges de solde.
   * @param {string} userId
   */
  getUserChannel: (userId) => `notifications:user:${String(userId || '').trim()}`,

  /**
   * Canal géographique et métier pour les diffusions SOS en temps réel
   * aux Maâlems éligibles du secteur.
   * @param {string} city
   * @param {string} specialty
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
   * @param {string} city
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

// Singleton Ably Realtime Client
let ablyInstance = null;
let currentClientId = null;

const getStableAnonymousClientId = () => {
  try {
    let id = sessionStorage.getItem('bricolemoi_anon_client_id');
    if (!id) {
      id = 'anon-' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('bricolemoi_anon_client_id', id);
    }
    return id;
  } catch (e) {
    return 'anon-user';
  }
};

/**
 * Initialise ou retourne l'instance unique du client Ably Realtime
 * avec gestion de la persistance de session et récupération de connexion.
 *
 * @param {string} clientId - Identifiant unique de l'utilisateur (Maalem ou Client)
 * @returns {Ably.Realtime | null}
 */
export const getAblyClient = (clientId = null) => {
  if (!isAblyConfigured) {
    if (import.meta.env.DEV) {
      console.info('[Ably] ℹ️ VITE_ABLY_API_KEY non configurée. Le mode temps réel bascule sur le broadcast local.');
    }
    return null;
  }

  const targetClientId = clientId || currentClientId || getStableAnonymousClientId();

  // Si l'instance existe déjà et est active, la réutiliser
  if (ablyInstance) {
    if (currentClientId === targetClientId || (targetClientId.startsWith('anon-') && currentClientId?.startsWith('anon-'))) {
      return ablyInstance;
    }
    try {
      ablyInstance.close();
    } catch (e) {}
  }

  currentClientId = targetClientId;

  try {
    const clientOptions = {
      key: ABLY_API_KEY,
      clientId: targetClientId,
      autoConnect: true,
      // Récupération de connexion intelligente pour micro-coupures réseau (3G/4G Maroc)
      recover: (lastConnectionDetails, cb) => {
        try {
          const savedRecoveryKey = sessionStorage.getItem('bricolemoi_ably_recovery_key');
          cb(savedRecoveryKey || null);
        } catch (e) {
          cb(null);
        }
      },
      // Timeout optimisé pour mobile
      disconnectedRetryTimeout: 3000,
      suspendedRetryTimeout: 10000,
      transportParams: {
        heartbeatInterval: 15000
      }
    };

    ablyInstance = new Ably.Realtime(clientOptions);

    // Sauvegarde de la clé de récupération lors des transitions d'état
    ablyInstance.connection.on('connected', (stateChange) => {
      try {
        const key = typeof ablyInstance.connection.createRecoveryKey === 'function'
          ? ablyInstance.connection.createRecoveryKey()
          : ablyInstance.connection.recoveryKey;
        if (key) {
          sessionStorage.setItem('bricolemoi_ably_recovery_key', key);
        }
      } catch (e) {}
    });

    ablyInstance.connection.on('failed', (stateChange) => {
      console.error('[Ably] ❌ Connexion échouée:', stateChange.reason);
    });

    return ablyInstance;
  } catch (error) {
    console.error('[Ably] ❌ Erreur d’initialisation:', error);
    return null;
  }
};

/**
 * Ferme et nettoie la connexion Ably Realtime
 */
export const disconnectAbly = () => {
  if (ablyInstance) {
    try {
      ablyInstance.close();
    } catch (e) {}
    ablyInstance = null;
    currentClientId = null;
  }
};
