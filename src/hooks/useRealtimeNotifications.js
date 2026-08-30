import { useState, useEffect, useCallback, useRef } from 'react';
import { REALTIME_CHANNELS } from '../lib/realtimeClient';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../lib/realtimeBroadcastService';
import { startEmergencySiren, stopEmergencySiren, playNotificationSound, triggerVibration } from '../lib/audioNotifier';
import { showLocalPushNotification } from '../lib/pushNotificationService';
import { notify } from '../lib/notify';
import { getAppSubdomain } from '../lib/subdomain';

/**
 * Hook centralisé unifié pour les notifications temps réel (In-app, Sons/Vibrations, Push)
 *
 * @param {object} params
 * @param {object} params.user - Profil utilisateur connecté (Client, Maalem, Admin)
 * @param {Function} [params.onSosAlert] - Callback optionnel lors d'une alerte SOS
 * @param {Function} [params.onSosClaimed] - Callback optionnel lors de l'acceptation d'un SOS
 * @param {Function} [params.onUserMessage] - Callback pour messages personnels
 */
export const useRealtimeNotifications = ({ user, onSosAlert, onSosClaimed, onUserMessage }) => {
  const [activeSosAlert, setActiveSosAlert] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const dismissSosAlert = useCallback(() => {
    stopEmergencySiren();
    setActiveSosAlert(null);
  }, []);

  // 1. Abonnement au Canal Personnel Utilisateur : notifications:user:[userId]
  useEffect(() => {
    if (!user?.id) return;

    const userChannelName = REALTIME_CHANNELS.getUserChannel(user.id);

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
            `L'artisan a terminé l'intervention${payload.final_agreed_price ? ` (${payload.final_agreed_price} DH)` : ''}. Veuillez confirmer.`,
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

    const rawCity = user?.city_zone || user?.city || 'casablanca';
    const rootCity = String(rawCity).split('-')[0].trim() || 'casablanca';
    const userSpecialty = user?.maalem_details?.specialty || user?.specialty || 'all';

    const specialtySosChannel = REALTIME_CHANNELS.getSosChannel(rootCity, userSpecialty);
    const citySosChannel = REALTIME_CHANNELS.getSosCityChannel(rootCity);
    const globalJobsChannel = REALTIME_CHANNELS.JOBS_STREAM;

    const handleSosMessage = ({ event, payload }) => {
      if (!payload) return;

      if (event === 'sos:alert' || event === 'new_job') {
        const lead = payload.intervention || payload;

        startEmergencySiren();
        setActiveSosAlert(lead);

        if (document.hidden) {
          showLocalPushNotification(`🚨 URGENCE SOS : ${lead.subcategory || lead.service_type || 'Dépannage'}`, {
            body: `Nouvelle alerte à ${lead.district || rootCity}. Touchez pour débloquer le lead.`,
            tag: `sos-${lead.id}`
          });
        }

        if (typeof onSosAlert === 'function') {
          onSosAlert(lead);
        }
      } else if (event === 'sos:claimed' || event === 'job_accepted') {
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
    const unsubGlobal = subscribeToRealtimeChannel(globalJobsChannel, handleSosMessage, user?.id);

    return () => {
      unsubSpecialty();
      unsubCity();
      unsubGlobal();
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

export const useAblyNotifications = useRealtimeNotifications;
