/**
 * Service de gestion des Push Notifications Web & Arrière-plan pour BricoleMoi
 */

/**
 * Vérifie si les notifications push sont supportées par le navigateur
 */
export const isPushSupported = () => {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
};

/**
 * Obtient l'état actuel de la permission de notification ('granted', 'denied', 'default')
 */
export const getNotificationPermissionState = () => {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
};

/**
 * Demande la permission à l'artisan / client pour activer les alertes
 */
export const requestPushPermission = async () => {
  if (!isPushSupported()) return false;

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.warn('[Push] Erreur lors de la demande de permission:', error);
    return false;
  }
};

/**
 * Affiche une notification locale au niveau de l'OS (utile quand l'onglet est en arrière-plan)
 * @param {string} title
 * @param {object} options
 */
export const showLocalPushNotification = async (title, options = {}) => {
  if (!isPushSupported() || Notification.permission !== 'granted') return null;

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        return reg.showNotification(title, {
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          vibrate: [400, 200, 400, 200, 600],
          requireInteraction: true,
          ...options
        });
      }
    }

    // Fallback notification standard
    return new Notification(title, {
      icon: '/favicon.svg',
      ...options
    });
  } catch (err) {
    console.warn('[Push] Erreur lors de l’affichage de la notification:', err);
    return null;
  }
};
