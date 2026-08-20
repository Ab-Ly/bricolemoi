import { useState, useEffect, useCallback, useRef } from 'react';
import { ABLY_CHANNELS } from '../lib/ablyClient';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../lib/ablyRealtimeService';
import { startEmergencySiren, stopEmergencySiren, playNotificationSound, triggerVibration } from '../lib/audioNotifier';
import { showLocalPushNotification } from '../lib/pushNotificationService';
import { notify } from '../lib/notify';
import { getAppSubdomain } from '../lib/subdomain';

/**
 * Hook centralisé unifié pour les notifications Ably (In-app, Sons/Vibrations, Push)
 *
 * @param {object} params
 * @param {object} params.user - Profil utilisateur connecté (Client, Maalem, Admin)
 * @param {Function} [params.onSosAlert] - Callback optionnel lors d'une alerte SOS
 * @param {Function} [params.onSosClaimed] - Callback optionnel lors de l'acceptation d'un SOS
 * @param {Function} [params.onUserMessage] - Callback pour messages personnels
 */
export const useAblyNotifications = ({ user, onSosAlert, onSosClaimed, onUserMessage }) => {
  // Alerte SOS active bloquante pour l'artisan (affichée en modale plein écran)
  const [activeSosAlert, setActiveSosAlert] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Fermeture / Ignorer une alerte SOS
  const dismissSosAlert = useCallback(() => {
    stopEmergencySiren();
    setActiveSosAlert(null);
  }, []);

  // 1. Abonnement au Canal Personnel Utilisateur : notifications:user:[userId]
  useEffect(() => {
    if (!user?.id) return;

    const userChannelName = ABLY_CHANNELS.getUserChannel(user.id);

    const unsubscribeUserChannel = subscribeToRealtimeChannel(
      userChannelName,
      ({ event, payload }) => {
        if (!payload) return;

        const currentApp = getAppSubdomain();
        const currentRole = (userRef.current?.role || user?.role || '').toUpperCase();
        const isClient = currentApp === 'CLIENT' && currentRole !== 'ADMIN' && currentRole !== 'MAALEM';
        const isMaalem = currentApp === 'MAALEM' && currentRole === 'MAALEM';

        const intvId = payload.intervention_id || payload.id || 'current';
        if ((event === 'job:accepted' || event === 'sos:claimed') && isClient) {
          notify.success(
            'Artisan en Route 🛠️',
            `Votre intervention a été prise en charge par ${payload.maalem_name || 'un artisan'} !`,
            { id: `job-accepted-${intvId}`, badge: 'Temps réel' }
          );
          if (document.hidden) {
            showLocalPushNotification('⚡ Artisan en Route - BricoleMoi', {
              body: `${payload.maalem_name || 'Votre Maâlem'} a pris en charge votre demande.`,
              tag: `job-accepted-${intvId}`
            });
          }
        } else if (event === 'job:progress' && isClient) {
          if (payload.progress_step === 'ON_THE_WAY') {
            notify.progress('ON_THE_WAY', 'Maâlem en route', 'Votre Maâlem se déplace actuellement vers votre adresse.', { id: `progress-ontheway-${intvId}` });
          } else if (payload.progress_step === 'ARRIVED') {
            notify.progress('ARRIVED', 'Maâlem arrivé sur place', 'Votre artisan est arrivé pour le diagnostic.', { id: `progress-arrived-${intvId}` });
          }
        } else if (event === 'work:completion_requested' && isClient) {
          notify.info(
            'Travaux Finalisés ✨',
            `L'artisan a terminé l'intervention (${payload.final_agreed_price || 150} DH). Veuillez confirmer.`,
            { id: `work-completion-${intvId}`, badge: 'Confirmation Requise' }
          );
        } else if ((event === 'credit:added' || event === 'recharge:approved') && isMaalem) {
          notify.credit(payload.amount || 15, payload.new_balance, payload.reason || 'Recharge / Remplacement validé', { id: `credit-${payload.new_balance}` });
          try {
            const bc = new BroadcastChannel('bricolemoi_intertab_sync');
            bc.postMessage({
              type: 'MAALEM_BALANCE_UPDATED',
              maalemId: payload.maalem_id || user?.id,
              newBalance: payload.new_balance,
              amount: payload.amount,
              notes: payload.reason
            });
            bc.close();
          } catch (e) { }
        }

        if (typeof onUserMessage === 'function') {
          onUserMessage({ event, payload });
        }
      },
      user.id
    );

    return () => {
      unsubscribeUserChannel();
    };
  }, [user?.id, onUserMessage]);

  // 2. Abonnement aux Canaux SOS Géographiques / Métiers (Réservé aux Maâlems connectés)
  useEffect(() => {
    const isMaalem = user?.role?.toUpperCase() === 'MAALEM';
    if (!isMaalem) return;

    const userCity = user?.city_zone || user?.city || 'casablanca';
    const userSpecialty = user?.maalem_details?.specialty || user?.specialty || 'all';

    const specialtySosChannel = ABLY_CHANNELS.getSosChannel(userCity, userSpecialty);
    const citySosChannel = ABLY_CHANNELS.getSosCityChannel(userCity);

    const handleSosMessage = ({ event, payload }) => {
      if (!payload) return;

      // Réception d'une nouvelle alerte SOS d'urgence
      if (event === 'sos:alert' || event === 'new_job') {
        const lead = payload.intervention || payload;

        // Déclencher la sonnerie d'urgence continue et les vibrations
        startEmergencySiren();

        // Afficher la modale bloquante plein écran
        setActiveSosAlert(lead);

        // Si l'application est en arrière-plan, déclencher la notification OS
        if (document.hidden) {
          showLocalPushNotification(`🚨 URGENCE SOS : ${lead.subcategory || lead.service_type || 'Dépannage'}`, {
            body: `Nouvelle alerte à ${lead.district || userCity}. Touchez pour débloquer le lead.`,
            tag: `sos-${lead.id}`
          });
        }

        if (typeof onSosAlert === 'function') {
          onSosAlert(lead);
        }
      }

      // Dès qu'un artisan accepte le lead, fermer instantanément la modale pour les autres
      else if (event === 'sos:claimed' || event === 'job_accepted') {
        const claimedId = payload.intervention_id || payload.id;
        setActiveSosAlert((current) => {
          if (current && String(current.id).trim() === String(claimedId).trim()) {
            stopEmergencySiren();
            notify.info(
              'Urgence Prise en Charge',
              `L'intervention SOS (${current.subcategory || 'Dépannage'}) a été acceptée par un autre artisan.`,
              { duration: 4000 }
            );
            return null;
          }
          return current;
        });

        if (typeof onSosClaimed === 'function') {
          onSosClaimed(payload);
        }
      }
    };

    const unsubSpecialty = subscribeToRealtimeChannel(specialtySosChannel, handleSosMessage, user?.id);
    const unsubCity = specialtySosChannel !== citySosChannel 
      ? subscribeToRealtimeChannel(citySosChannel, handleSosMessage, user?.id) 
      : () => {};

    return () => {
      unsubSpecialty();
      unsubCity();
      stopEmergencySiren();
    };
  }, [user?.role, user?.city_zone, user?.city, user?.specialty, user?.maalem_details?.specialty, user?.id, onSosAlert, onSosClaimed]);

  return {
    activeSosAlert,
    dismissSosAlert,
    unreadNotifications,
    triggerVibration,
    playNotificationSound
  };
};
