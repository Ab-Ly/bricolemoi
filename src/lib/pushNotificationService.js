/**
 * Service de gestion des Push Notifications Web & Arrière-plan pour BricoleMoi (Artisans & Clients)
 */
import { supabase } from './supabaseClient';
import { playNotificationSound, triggerVibration } from './audioNotifier';

// Clé publique VAPID standard pour BricoleMoi
export const VAPID_PUBLIC_KEY = 
  import.meta.env.VITE_VAPID_PUBLIC_KEY || 
  "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIhbQFLXYp5Nksh8U";

/**
 * Convertit une clé publique VAPID base64 en Uint8Array pour PushManager
 */
export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Vérifie si les notifications push sont supportées par le navigateur
 */
export const isPushSupported = () => {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
};

/**
 * Obtient l'état actuel de la permission de notification ('granted', 'denied', 'default', 'unsupported')
 */
export const getNotificationPermissionState = () => {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
};

/**
 * Demande la permission et abonne l'utilisateur au Web Push d'urgence
 * @param {object} user - Objet utilisateur actuel
 */
export const subscribeUserToPush = async (user = null) => {
  if (!isPushSupported()) {
    throw new Error('Les notifications push ne sont pas supportées sur ce navigateur.');
  }

  try {
    // 1. Demande de permission native au navigateur
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return { success: false, permission, message: 'Permission refusée par l\'utilisateur.' };
    }

    // 2. Récupérer l'enregistrement du Service Worker
    const registration = await navigator.serviceWorker.ready;
    if (!registration) {
      throw new Error('Service Worker non disponible.');
    }

    // 3. Obtenir ou créer la souscription PushManager
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
    }

    // 4. Extraire les clés de chiffrement p256dh et auth
    const subJSON = subscription.toJSON();
    const endpoint = subJSON.endpoint;
    const p256dh = subJSON.keys?.p256dh;
    const auth = subJSON.keys?.auth;

    if (!endpoint || !p256dh || !auth) {
      throw new Error('Clés de souscription incomplètes.');
    }

    // 5. Sauvegarder dans la table Supabase `push_subscriptions`
    const subscriptionData = {
      profile_id: user?.id || null,
      endpoint,
      p256dh,
      auth,
      role: user?.role || 'MAALEM',
      city_zone: user?.city_zone || user?.city || 'Casablanca',
      specialty: user?.maalem_details?.specialty || user?.specialty || 'PLUMBING',
      is_active: true,
      user_agent: navigator.userAgent,
      updated_at: new Date().toISOString()
    };

    try {
      await supabase
        .from('push_subscriptions')
        .upsert(subscriptionData, { onConflict: 'endpoint' });
    } catch (dbErr) {
      console.warn('[Push DB Sync Warning]:', dbErr);
    }

    // Sauvegarder localement l'état actif
    try {
      localStorage.setItem('bricolemoi_push_subscribed', 'true');
    } catch (e) {}

    return {
      success: true,
      permission: 'granted',
      subscription,
      message: 'Alertes d\'urgence push activées avec succès !'
    };
  } catch (error) {
    console.error('[Push Subscription Error]:', error);
    return {
      success: false,
      error: error.message || 'Échec de l\'activation des notifications push.'
    };
  }
};

/**
 * Désabonne l'utilisateur des notifications push
 */
export const unsubscribeUserFromPush = async (user = null) => {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();

      try {
        await supabase
          .from('push_subscriptions')
          .update({ is_active: false })
          .eq('endpoint', endpoint);
      } catch (e) {}
    }

    localStorage.removeItem('bricolemoi_push_subscribed');
    return true;
  } catch (err) {
    console.warn('[Push Unsubscribe Error]:', err);
    return false;
  }
};

/**
 * Affiche une notification locale au niveau de l'OS (utile quand l'onglet est en arrière-plan)
 */
export const showLocalPushNotification = async (title, options = {}) => {
  if (typeof window === 'undefined' || !isPushSupported()) return null;
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return null;

  try {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await Promise.race([
          navigator.serviceWorker.ready,
          new Promise((_, reject) => setTimeout(() => reject(new Error('SW ready timeout')), 1000))
        ]);

        if (reg && typeof reg.showNotification === 'function') {
          return await reg.showNotification(title, {
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            vibrate: [500, 150, 500, 150, 500, 200, 700],
            requireInteraction: true,
            ...options
          });
        }
      } catch (swErr) {
        console.debug('[Push] SW showNotification bypass:', swErr);
      }
    }

    // Sur mobile (Android Chrome, iOS Safari), `new Notification()` lance TypeError: Illegal constructor.
    // On l'exécute uniquement si le constructeur est supporté en toute sécurité.
    try {
      if (typeof window.Notification === 'function') {
        return new window.Notification(title, {
          icon: '/favicon.svg',
          ...options
        });
      }
    } catch (constructErr) {
      console.debug('[Push] Desktop Notification constructor unavailable on mobile:', constructErr);
    }
    return null;
  } catch (err) {
    console.debug('[Push] Notice notification non critique:', err);
    return null;
  }
};

/**
 * Déclenche une notification test immédiate pour vérifier la sonnerie et les vibrations
 */
export const testPushNotification = async () => {
  playNotificationSound();
  triggerVibration([300, 100, 300, 100, 500]);

  return showLocalPushNotification('🔔 Test d\'Alerte BricoleMoi 🇲🇦', {
    body: 'Votre téléphone est prêt à recevoir les missions d\'urgence en direct !',
    tag: 'test-push-notification'
  });
};
