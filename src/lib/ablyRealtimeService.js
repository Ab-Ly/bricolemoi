import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from './ablyClient';
import { centrifugo, isCentrifugoConfigured } from './centrifugoClient';

/**
 * Service Universel de Messagerie et d'Événements Temps Réel pour BricoleMoi
 * Supporte : Centrifugo (VPS Open Source) > Ably (SaaS) > Local BroadcastChannel
 */

// Cache des canaux Ably actifs
let lastClientInstance = null;
const activeChannels = new Map();

const getOrCreateAblyChannel = (channelName, clientId = null) => {
  const client = getAblyClient(clientId);
  if (!client) return null;

  if (client !== lastClientInstance) {
    activeChannels.clear();
    lastClientInstance = client;
  }

  if (!activeChannels.has(channelName)) {
    try {
      const channel = client.channels.get(channelName);
      activeChannels.set(channelName, channel);
    } catch (err) {
      console.warn(`[Realtime] Erreur accès canal Ably ${channelName}:`, err);
      return null;
    }
  }
  return activeChannels.get(channelName);
};

/**
 * Diffuse un événement temps réel (Centrifugo VPS en priorité ou Ably)
 *
 * @param {string} eventName - Nom de l'événement ('new_job', 'job_progress_updated', etc.)
 * @param {object} payload - Données de l'événement
 * @param {string} [channelName=ABLY_CHANNELS.JOBS_STREAM] - Canal cible
 * @param {string} [clientId=null] - Identifiant de l'émetteur
 */
export const publishRealtimeEvent = async (eventName, payload, channelName = ABLY_CHANNELS.JOBS_STREAM, clientId = null) => {
  const fullMessage = {
    event: eventName,
    payload,
    clientId,
    timestamp: Date.now()
  };

  // 1. Centrifugo VPS (Open Source Prioritaire)
  if (isCentrifugoConfigured) {
    try {
      const ok = await centrifugo.publish(channelName, fullMessage);
      if (ok) return true;
    } catch (err) {
      console.warn('[Centrifugo] Erreur publication, bascule Ably/Broadcast:', err);
    }
  }

  // 2. Ably Realtime Fallback
  if (isAblyConfigured) {
    try {
      const channel = getOrCreateAblyChannel(channelName, clientId);
      if (channel) {
        await channel.publish(eventName, payload);
        return true;
      }
    } catch (error) {
      console.warn(`[Ably] Erreur de publication de l’événement ${eventName}:`, error);
    }
  }

  // 3. BroadcastChannel Local Multi-onglets
  try {
    const bc = new BroadcastChannel(`bricolemoi_rt_${channelName}`);
    bc.postMessage(fullMessage);
    bc.close();
  } catch (e) {}

  return false;
};

/**
 * S'abonne aux événements d'un canal temps réel (Centrifugo VPS ou Ably)
 *
 * @param {string} channelName - Nom du canal
 * @param {Function} onMessage - Callback déclenché à la réception d'un message ({ event, payload, timestamp })
 * @param {string} [clientId=null] - Identifiant utilisateur
 * @returns {Function} - Fonction d'annulation d'abonnement (unsubscribe)
 */
export const subscribeToRealtimeChannel = (channelName, onMessage, clientId = null) => {
  const unsubs = [];

  // 1. Souscription Centrifugo VPS
  if (isCentrifugoConfigured) {
    const unsubCentrifugo = centrifugo.subscribe(channelName, (data) => {
      if (typeof onMessage === 'function' && data) {
        onMessage({
          event: data.event || data.name || 'message',
          payload: data.payload !== undefined ? data.payload : data,
          clientId: data.clientId,
          timestamp: data.timestamp || Date.now()
        });
      }
    });
    unsubs.push(unsubCentrifugo);
  }

  // 2. Souscription Ably
  if (isAblyConfigured) {
    try {
      const channel = getOrCreateAblyChannel(channelName, clientId);
      if (channel) {
        const handler = (message) => {
          if (typeof onMessage === 'function') {
            try {
              onMessage({
                event: message.name,
                payload: message.data,
                clientId: message.clientId,
                timestamp: message.timestamp
              });
            } catch (handlerErr) {
              console.warn('[Ably Handler Error]:', handlerErr);
            }
          }
        };

        channel.subscribe(handler);
        unsubs.push(() => {
          try {
            channel.unsubscribe(handler);
          } catch (e) {}
        });
      }
    } catch (err) {
      console.warn(`[Ably] Exception abonnement ${channelName}:`, err);
    }
  }

  // 3. Écouteur BroadcastChannel local
  try {
    const bc = new BroadcastChannel(`bricolemoi_rt_${channelName}`);
    bc.onmessage = (e) => {
      if (typeof onMessage === 'function' && e.data) {
        onMessage(e.data);
      }
    };
    unsubs.push(() => bc.close());
  } catch (e) {}

  return () => {
    unsubs.forEach((fn) => {
      try {
        fn();
      } catch (e) {}
    });
  };
};
