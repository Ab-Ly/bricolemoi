import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from './ablyClient';

/**
 * Service de messagerie et d'événements temps réel Ably pour BricoleMoi
 * Remplace Supabase Realtime Broadcast pour les alertes SOS et le suivi de mission.
 */

// Cache des canaux actifs
const activeChannels = new Map();

const getOrCreateChannel = (channelName, clientId = null) => {
  const client = getAblyClient(clientId);
  if (!client) return null;

  if (!activeChannels.has(channelName)) {
    const channel = client.channels.get(channelName);
    activeChannels.set(channelName, channel);
  }
  return activeChannels.get(channelName);
};

/**
 * Diffuse un événement temps réel sur un canal Ably (ultra basse latence < 50ms)
 *
 * @param {string} eventName - Nom de l'événement ('new_job', 'job_progress_updated', 'work_completion_requested', etc.)
 * @param {object} payload - Données de l'événement
 * @param {string} [channelName=ABLY_CHANNELS.JOBS_STREAM] - Canal cible
 * @param {string} [clientId=null] - Identifiant de l'émetteur
 */
export const publishRealtimeEvent = async (eventName, payload, channelName = ABLY_CHANNELS.JOBS_STREAM, clientId = null) => {
  try {
    const channel = getOrCreateChannel(channelName, clientId);
    if (channel) {
      await channel.publish(eventName, payload);
      return true;
    }
  } catch (error) {
    console.warn(`[Ably] Erreur de publication de l’événement ${eventName}:`, error);
  }
  return false;
};

/**
 * S'abonne aux événements d'un canal Ably
 *
 * @param {string} channelName - Nom du canal Ably
 * @param {Function} onMessage - Callback déclenché à la réception d'un message ({ name, data })
 * @param {string} [clientId=null] - Identifiant utilisateur
 * @returns {Function} - Fonction d'annulation d'abonnement (unsubscribe)
 */
export const subscribeToRealtimeChannel = (channelName, onMessage, clientId = null) => {
  const channel = getOrCreateChannel(channelName, clientId);
  if (!channel) return () => {};

  const handler = (message) => {
    if (typeof onMessage === 'function') {
      onMessage({
        event: message.name,
        payload: message.data,
        clientId: message.clientId,
        timestamp: message.timestamp
      });
    }
  };

  channel.subscribe(handler);

  return () => {
    try {
      channel.unsubscribe(handler);
    } catch (e) {}
  };
};
