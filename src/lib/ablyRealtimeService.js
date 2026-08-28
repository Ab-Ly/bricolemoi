import { REALTIME_CHANNELS } from './ablyClient';
import { centrifugo, isCentrifugoConfigured } from './centrifugoClient';

/**
 * Service Universel de Messagerie et d'Événements Temps Réel pour BricoleMoi
 * 100% propulsé par Centrifugo v5 (Open Source sur VPS) avec fallback BroadcastChannel local.
 */

/**
 * Diffuse un événement temps réel sur Centrifugo VPS
 *
 * @param {string} eventName - Nom de l'événement ('new_job', 'job_progress_updated', etc.)
 * @param {object} payload - Données de l'événement
 * @param {string} [channelName=REALTIME_CHANNELS.JOBS_STREAM] - Canal cible
 * @param {string} [clientId=null] - Identifiant de l'émetteur
 */
export const publishRealtimeEvent = async (eventName, payload, channelName = REALTIME_CHANNELS.JOBS_STREAM, clientId = null) => {
  const fullMessage = {
    event: eventName,
    payload,
    clientId,
    timestamp: Date.now()
  };

  // 1. Centrifugo VPS (Open Source Principal)
  if (isCentrifugoConfigured) {
    try {
      const ok = await centrifugo.publish(channelName, fullMessage);
      if (ok) return true;
    } catch (err) {
      console.warn('[Centrifugo] Erreur publication, bascule BroadcastChannel local:', err);
    }
  }

  // 2. BroadcastChannel Local Multi-onglets
  try {
    const bc = new BroadcastChannel(`bricolemoi_rt_${channelName}`);
    bc.postMessage(fullMessage);
    bc.close();
    return true;
  } catch (e) {}

  return false;
};

/**
 * S'abonne aux événements d'un canal temps réel Centrifugo VPS
 *
 * @param {string} channelName - Nom du canal
 * @param {Function} onMessage - Callback déclenché à la réception d'un message ({ event, payload, timestamp })
 * @param {string} [_clientId=null] - Identifiant utilisateur optionnel
 * @returns {Function} - Fonction d'annulation d'abonnement (unsubscribe)
 */
export const subscribeToRealtimeChannel = (channelName, onMessage, _clientId = null) => {
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

  // 2. Écouteur BroadcastChannel local
  try {
    const bc = new BroadcastChannel(`bricolemoi_rt_${channelName}`);
    bc.onmessage = (e) => {
      if (typeof onMessage === 'function' && e.data) {
        onMessage(e.data);
      }
    };
    unsubs.push(() => {
      try {
        bc.close();
      } catch (e) {}
    });
  } catch (e) {}

  return () => {
    unsubs.forEach((fn) => {
      try {
        fn();
      } catch (e) {}
    });
  };
};
