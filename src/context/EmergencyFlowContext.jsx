import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useApp } from './AppContext';
import { ABLY_CHANNELS } from '../lib/ablyClient';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../lib/ablyRealtimeService';
import { startEmergencySiren, stopEmergencySiren, playNotificationSound, triggerVibration } from '../lib/audioNotifier';
import { notify } from '../lib/notify';
import { showLocalPushNotification } from '../lib/pushNotificationService';
import { getAppSubdomain } from '../lib/subdomain';
import { EMERGENCY_STATES } from '../constants/emergencyStates';

// Types d'actions du Reducer
const ACTIONS = {
  TRIGGER_SOS: 'TRIGGER_SOS',
  RECEIVE_ALERT: 'RECEIVE_ALERT',
  DISMISS_ALERT: 'DISMISS_ALERT',
  MATCH_SOS: 'MATCH_SOS',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  COMPLETE_MISSION: 'COMPLETE_MISSION',
  RESET_TO_IDLE: 'RESET_TO_IDLE'
};

const initialState = {
  state: EMERGENCY_STATES.IDLE,
  activeEmergency: null,   // Données de l'intervention active
  matchedMaalem: null,     // Coordonnées et profil du Maâlem assigné
  incomingAlert: null,     // Alerte SOS entrante pour le Maâlem (modale plein écran)
  progressStep: 'ASSIGNED',// 'ASSIGNED' | 'ON_THE_WAY' | 'ARRIVED' | 'IN_PROGRESS' | 'DONE'
  finalPrice: null,
  reviewSubmitted: false
};

function emergencyFlowReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TRIGGER_SOS:
      return {
        ...state,
        state: EMERGENCY_STATES.SEARCHING,
        activeEmergency: action.payload.emergency,
        matchedMaalem: null,
        incomingAlert: null,
        progressStep: 'ASSIGNED',
        finalPrice: null,
        reviewSubmitted: false
      };

    case ACTIONS.RECEIVE_ALERT:
      // Réception d'une alerte SOS par un Maâlem en ligne
      if (state.state === EMERGENCY_STATES.MATCHED) return state; // Déjà en mission
      return {
        ...state,
        state: EMERGENCY_STATES.SEARCHING,
        incomingAlert: action.payload.alert
      };

    case ACTIONS.DISMISS_ALERT:
      return {
        ...state,
        state: state.state === EMERGENCY_STATES.SEARCHING && !state.activeEmergency 
          ? EMERGENCY_STATES.IDLE 
          : state.state,
        incomingAlert: null
      };

    case ACTIONS.MATCH_SOS:
      return {
        ...state,
        state: EMERGENCY_STATES.MATCHED,
        activeEmergency: action.payload.emergency || state.activeEmergency,
        matchedMaalem: action.payload.maalem || state.matchedMaalem,
        incomingAlert: null,
        progressStep: action.payload.progressStep || state.progressStep || 'ON_THE_WAY'
      };

    case ACTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        state: EMERGENCY_STATES.MATCHED,
        progressStep: action.payload.step || state.progressStep || 'ON_THE_WAY',
        activeEmergency: state.activeEmergency 
          ? { 
              ...state.activeEmergency, 
              progress_step: action.payload.step,
              status: state.activeEmergency.status === 'PENDING' ? 'ACCEPTED' : state.activeEmergency.status 
            }
          : { id: action.payload.intervention_id || 'active', progress_step: action.payload.step, status: 'ACCEPTED' }
      };

    case ACTIONS.COMPLETE_MISSION:
      return {
        ...state,
        state: EMERGENCY_STATES.COMPLETED,
        finalPrice: action.payload.finalPrice || state.activeEmergency?.final_agreed_price,
        progressStep: 'DONE'
      };

    case ACTIONS.RESET_TO_IDLE:
      return {
        ...initialState,
        state: EMERGENCY_STATES.IDLE
      };

    default:
      return state;
  }
}

const EmergencyFlowContext = createContext(null);

export const EmergencyFlowProvider = ({ children }) => {
  const { user } = useAuth();
  const { 
    interventions, 
    maalems, 
    acceptLead, 
    requestWorkCompletion, 
    updateInterventionProgress, 
    submitReview,
    declareMissionUnfeasible 
  } = useApp();

  const [flowState, dispatch] = useReducer(emergencyFlowReducer, initialState);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Synchronisation avec les interventions existantes au montage ou changement d'interventions/utilisateur
  useEffect(() => {
    const isMaalem = user?.role?.toUpperCase() === 'MAALEM';

    if (isMaalem && user?.id) {
      // Trouver si le Maâlem a une intervention en cours
      const activeJob = interventions?.find(
        (i) => String(i.maalem_id || '').trim() === String(user.id).trim() && 
               ['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status)
      );
      if (activeJob) {
        if (flowState.state === EMERGENCY_STATES.IDLE || flowState.progressStep !== activeJob.progress_step) {
          dispatch({
            type: ACTIONS.MATCH_SOS,
            payload: {
              emergency: activeJob,
              progressStep: activeJob.progress_step || 'ON_THE_WAY'
            }
          });
        }
      } else if (flowState.state === EMERGENCY_STATES.MATCHED) {
        // La mission précédente a été clôturée, annulée ou déclarée non réalisable -> Débloquer le Maâlem
        dispatch({ type: ACTIONS.RESET_TO_IDLE });
      }
    } else {
      // Côté Client : identifier ses interventions créées localement ou via compte
      let myCreated = [];
      try {
        myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
      } catch (e) {}

      const isMyIntv = (i) => {
        if (!i) return false;
        if (flowState.activeEmergency?.id && String(i.id).trim() === String(flowState.activeEmergency.id).trim()) return true;
        if (myCreated.includes(String(i.id).trim())) return true;
        if (user?.id && String(i.client_id || '').trim() === String(user.id).trim()) return true;
        const userPhoneDigits = String(user?.phone || '').replace(/\D/g, '');
        const clientPhoneDigits = String(i.client_phone || '').replace(/\D/g, '');
        if (userPhoneDigits.length >= 8 && clientPhoneDigits.length >= 8 && userPhoneDigits === clientPhoneDigits && userPhoneDigits !== '0661234567') {
          return true;
        }
        return false;
      };

      const myMatched = interventions?.find(
        (i) => isMyIntv(i) && 
               (['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status) ||
                ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS'].includes(i.progress_step) ||
                Boolean(i.maalem_id && i.status !== 'CANCELLED' && i.status !== 'COMPLETED'))
      );

      const myPending = interventions?.find(
        (i) => isMyIntv(i) && i.status === 'PENDING' && !myMatched
      );

      if (myMatched && (flowState.state !== EMERGENCY_STATES.MATCHED || flowState.progressStep !== myMatched.progress_step)) {
        const maalemInfo = maalems?.find((m) => String(m.id).trim() === String(myMatched.maalem_id).trim()) || {
          id: myMatched.maalem_id,
          full_name: myMatched.maalem_name || 'Artisan Maâlem',
          phone: myMatched.maalem_phone || '',
          specialty: myMatched.service_type || 'PLUMBING',
          rating_avg: myMatched.maalem_rating ?? 5.0
        };
        dispatch({
          type: ACTIONS.MATCH_SOS,
          payload: {
            emergency: myMatched,
            maalem: maalemInfo,
            progressStep: myMatched.progress_step || 'ON_THE_WAY'
          }
        });
      } else if (myPending && flowState.state === EMERGENCY_STATES.IDLE) {
        dispatch({
          type: ACTIONS.TRIGGER_SOS,
          payload: { emergency: myPending }
        });
      }
    }
  }, [user?.id, user?.role, user?.phone, interventions, maalems, flowState.state, flowState.progressStep]);

  // =========================================================================
  // 2. SOUSCRIPTIONS TEMPS RÉEL ABLY SELON LE RÔLE (CLIENT / MAÂLEM)
  // =========================================================================

  // Écoute universelle (canal utilisateur ET flux global de jobs) pour synchronisation instantanée cross-devices
  useEffect(() => {
    const handleEmergencyEvent = ({ event, payload }) => {
      if (!payload) return;

      const currentApp = getAppSubdomain();
      const currentRole = (user?.role || 'CLIENT').toUpperCase();
      if (currentApp !== 'CLIENT' || currentRole === 'ADMIN' || currentRole === 'MAALEM') {
        return;
      }

      // Vérifier si cet événement concerne l'urgence active du client
      let myCreated = [];
      try {
        myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
      } catch (e) {}

      const intId = String(payload.intervention_id || payload.intervention?.id || '').trim();
      const currentEmergencyId = String(flowState.emergency?.id || '').trim();
      const isTargetingMyEmergency =
        (currentEmergencyId && intId === currentEmergencyId) ||
        (intId && myCreated.includes(intId)) ||
        (payload.client_id && user?.id && String(payload.client_id).trim() === String(user.id).trim());

      if (!isTargetingMyEmergency && event !== 'job:accepted' && event !== 'job_accepted' && event !== 'sos:claimed') {
        return;
      }

      if (event === 'job:accepted' || event === 'job_accepted' || event === 'sos:claimed') {
        if (!isTargetingMyEmergency && currentEmergencyId && intId && intId !== currentEmergencyId) {
          return;
        }

        const maalemDetails = {
          id: payload.maalem_id,
          full_name: payload.maalem_name || 'Artisan Maâlem',
          phone: payload.maalem_phone || '',
          rating_avg: payload.maalem_rating !== undefined && payload.maalem_rating !== null ? Number(payload.maalem_rating) : 5.0,
          specialty: payload.specialty || 'PLUMBING',
          lat: payload.maalem_lat,
          lng: payload.maalem_lng,
          eta_minutes: payload.eta_minutes || 15
        };

        dispatch({
          type: ACTIONS.MATCH_SOS,
          payload: {
            emergency: payload.intervention || { id: payload.intervention_id || currentEmergencyId },
            maalem: maalemDetails,
            progressStep: 'ON_THE_WAY'
          }
        });

        notify.success(
          'Artisan en Route 🛠️',
          `${maalemDetails.full_name} a pris en charge votre urgence ! Arrivée estimée : ~15 min.`,
          { id: `job-accepted-${intId || 'active'}`, badge: 'Match Confirmé' }
        );
      } else if (event === 'job:progress') {
        dispatch({
          type: ACTIONS.UPDATE_PROGRESS,
          payload: { step: payload.progress_step }
        });
      } else if (event === 'work:completion_requested' || event === 'job:review_requested' || event === 'on_site_review_requested') {
        dispatch({
          type: ACTIONS.COMPLETE_MISSION,
          payload: { finalPrice: payload.final_agreed_price }
        });
      } else if (event === 'job:completed') {
        dispatch({ type: ACTIONS.RESET_TO_IDLE });
      } else if (event === 'job:unfeasible' || event === 'job:cancelled') {
        dispatch({ type: ACTIONS.RESET_TO_IDLE });
        notify.warning(
          'Mission Non Réalisée ℹ️',
          `L'artisan a signalé une impossibilité (${payload.reason || 'imprévu'}). Vous pouvez relancer un SOS immédiatement.`,
          { id: `job-unfeasible-${intId || 'done'}`, duration: 7000 }
        );
      }
    };

    const unsubs = [];
    if (user?.id) {
      const userChannel = ABLY_CHANNELS.getUserChannel(user.id);
      unsubs.push(subscribeToRealtimeChannel(userChannel, handleEmergencyEvent, user.id));
    }
    unsubs.push(subscribeToRealtimeChannel(ABLY_CHANNELS.JOBS_STREAM, handleEmergencyEvent, user?.id || 'client-anon'));

    return () => {
      unsubs.forEach((unsub) => {
        try {
          unsub();
        } catch (e) {}
      });
    };
  }, [user?.id, user?.role, flowState.emergency?.id]);

  // Écoute des alertes SOS géographiques pour les Maâlems en ligne
  useEffect(() => {
    const isMaalem = user?.role?.toUpperCase() === 'MAALEM';
    if (!isMaalem || !user?.id) return;

    const rawCity = user?.city_zone || user?.city || 'casablanca';
    const rootCity = String(rawCity).split('-')[0].trim() || 'casablanca';
    const userSpecialty = user?.maalem_details?.specialty || user?.specialty || 'all';

    const specialtySosChannel = ABLY_CHANNELS.getSosChannel(rootCity, userSpecialty);
    const citySosChannel = ABLY_CHANNELS.getSosCityChannel(rootCity);
    const globalJobsChannel = ABLY_CHANNELS.JOBS_STREAM;

    const handleSosBroadcast = ({ event, payload }) => {
      if (!payload) return;

      if (event === 'sos:alert' || event === 'new_job') {
        const alertData = payload.intervention || payload;
        // Si l'alerte n'est pas la sienne et qu'il n'est pas déjà en mission
        if (flowState.state !== EMERGENCY_STATES.MATCHED) {
          startEmergencySiren();
          triggerVibration([200, 100, 200, 100]);
          dispatch({
            type: ACTIONS.RECEIVE_ALERT,
            payload: { alert: alertData }
          });

          if (document.hidden) {
            showLocalPushNotification(`🚨 URGENCE SOS : ${alertData.subcategory || alertData.service_type || 'Dépannage'}`, {
              body: `Nouvelle demande à ${alertData.district || rootCity}. Touchez pour intervenir.`,
              tag: `sos-${alertData.id}`
            });
          }
        }
      } else if (event === 'sos:claimed') {
        // Un autre Maâlem a pris le lead avant nous -> fermer l'alerte
        if (flowState.incomingAlert?.id === payload.intervention_id) {
          stopEmergencySiren();
          dispatch({ type: ACTIONS.DISMISS_ALERT });
          notify.info('Lead Attribué', 'Une autre équipe a déjà pris en charge cette intervention.', { id: `claimed-${payload.intervention_id}` });
        }
      }
    };

    const unsubSpecialty = subscribeToRealtimeChannel(specialtySosChannel, handleSosBroadcast, user.id);
    const unsubCity = subscribeToRealtimeChannel(citySosChannel, handleSosBroadcast, user.id);
    const unsubGlobal = subscribeToRealtimeChannel(globalJobsChannel, handleSosBroadcast, user.id);

    return () => {
      unsubSpecialty();
      unsubCity();
      unsubGlobal();
      stopEmergencySiren();
    };
  }, [user?.id, user?.role, user?.city_zone, user?.specialty, flowState.state, flowState.incomingAlert?.id]);

  // =========================================================================
  // 3. ACTIONS DE L'ORCHESTRATEUR DE FLUX
  // =========================================================================

  /**
   * VUE 2 -> Déclenchement d'un SOS par le client
   */
  const triggerSOS = useCallback((emergencyData) => {
    dispatch({
      type: ACTIONS.TRIGGER_SOS,
      payload: { emergency: emergencyData }
    });
    notify.sos('🚨 Radar SOS Activé', 'Diffusion en direct aux artisans disponibles...', { id: `sos-active-${emergencyData.id || Date.now()}` });

    // 1. Envoi de l'alerte WhatsApp Radar via le Backend /api/dispatch-sos (Filtre 8km & Métier)
    try {
      const clientLat = Number(emergencyData.lat || emergencyData.client_lat || 33.5898);
      const clientLng = Number(emergencyData.lng || emergencyData.client_lng || -7.6038);
      const targetCat = (emergencyData.service_type || emergencyData.category || 'PLUMBING').toUpperCase();

      let candidates = (maalems || []).map((m) => ({
        name: m.full_name || 'Artisan Maâlem',
        phone: m.phone || '',
        specialty: (m.specialty || m.service_type || targetCat).toUpperCase(),
        lat: Number(m.latitude || m.lat || (clientLat + 0.012)),
        lng: Number(m.longitude || m.lng || (clientLng + 0.010)),
        isAvailable: m.is_available !== false
      })).filter((m) => Boolean(m.phone));

      fetch('/api/dispatch-sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: userRef.current?.full_name || emergencyData.client_name || 'Client BricoleMoi',
          clientPhone: userRef.current?.phone || emergencyData.client_phone || '',
          category: targetCat,
          district: emergencyData.district || 'Maârif',
          city: emergencyData.city || 'Casablanca',
          budget: String(emergencyData.price_dh || emergencyData.budget || '250'),
          description: emergencyData.subcategory || emergencyData.description || 'Intervention Urgente SOS 🚨',
          clientLat,
          clientLng,
          candidateMaalems: candidates
        })
      }).catch((dispatchErr) => console.warn('[/api/dispatch-sos notice]:', dispatchErr));
    } catch (e) {
      console.warn('[SOS Dispatch Error]:', e);
    }

    // 2. Envoi de la notification Web Push d'urgence en arrière-plan vers tous les artisans
    try {
      fetch('/api/send-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `🚨 URGENCE SOS : ${emergencyData.subcategory || emergencyData.service_type || 'Dépannage'}`,
          body: `Nouvelle mission urgente à ${emergencyData.district || 'votre secteur'} !`,
          city: emergencyData.city || 'Casablanca',
          specialty: emergencyData.service_type || 'PLUMBING',
          district: emergencyData.district || 'Centre',
          intervention_id: emergencyData.id || null
        })
      }).catch((err) => console.warn('[Push Dispatch Non-blocking Error]:', err));
    } catch (e) {}
  }, [maalems]);

  /**
   * VUE 3 -> Acceptation de la mission par le Maâlem (15 DH)
   */
  const acceptSOS = useCallback(async (alertId) => {
    stopEmergencySiren();
    try {
      const result = await acceptLead(alertId);
      if (result === false) {
        return false;
      }
      
      // Diffusion immédiate de l'événement sos:claimed pour fermer l'alerte chez tous les autres
      const userCity = userRef.current?.city_zone || 'casablanca';
      const userSpecialty = userRef.current?.maalem_details?.specialty || 'all';
      
      const claimPayload = {
        intervention_id: alertId,
        maalem_id: userRef.current?.id,
        maalem_name: userRef.current?.full_name || 'Artisan Maâlem',
        maalem_phone: userRef.current?.phone || '',
        maalem_rating: userRef.current?.maalem_details?.rating_avg ?? userRef.current?.rating_avg ?? 5.0,
        timestamp: Date.now()
      };

      publishRealtimeEvent('sos:claimed', claimPayload, ABLY_CHANNELS.getSosChannel(userCity, userSpecialty));
      publishRealtimeEvent('sos:claimed', claimPayload, ABLY_CHANNELS.getSosCityChannel(userCity));

      dispatch({
        type: ACTIONS.MATCH_SOS,
        payload: {
          emergency: result || flowState.incomingAlert || { id: alertId },
          progressStep: 'ON_THE_WAY'
        }
      });

      notify.success('Mission Acceptée ! 🛠️', 'Coordonnées client débloquées. Déplacement en cours.', { id: `accept-ok-${alertId}` });
      return result;
    } catch (err) {
      console.warn('acceptSOS error:', err);
      return false;
    }
  }, [acceptLead, flowState.incomingAlert]);

  /**
   * Progression de l'intervention (Maâlem)
   */
  const setProgressStep = useCallback(async (step, optionalIntvId) => {
    const intvId = optionalIntvId || flowState.activeEmergency?.id;
    if (intvId) {
      await updateInterventionProgress(intvId, step);
    }
    dispatch({
      type: ACTIONS.UPDATE_PROGRESS,
      payload: { step, intervention_id: intvId }
    });

    if (step === 'ON_THE_WAY') {
      notify.progress('ON_THE_WAY', 'En Route', 'Votre statut est désormais : En déplacement vers le client.', { id: `prog-${intvId || 'now'}` });
    } else if (step === 'ARRIVED') {
      notify.progress('ARRIVED', 'Arrivé sur Place', 'Statut : Diagnostic en cours chez le client.', { id: `prog-${intvId || 'now'}` });
    }
  }, [flowState.activeEmergency?.id, updateInterventionProgress]);

  /**
   * VUE 4 -> Terminer la mission (Maâlem)
   */
  const finishMission = useCallback(async (finalAgreedPrice) => {
    const intvId = flowState.activeEmergency?.id;
    if (!intvId) return;

    await requestWorkCompletion(intvId, finalAgreedPrice);
    dispatch({
      type: ACTIONS.COMPLETE_MISSION,
      payload: { finalPrice: finalAgreedPrice }
    });
    notify.success('Mission Terminée ✨', 'Demande de validation transmise au client avec succès.', { id: `finish-${intvId}` });
  }, [flowState.activeEmergency?.id, requestWorkCompletion]);

  /**
   * VUE 4 -> Soumission du feedback / avis 5★ (Client) & Retour automatique à IDLE
   */
  const submitClientFeedback = useCallback(async ({ intervention_id, rating, comment, badges, tipDh }) => {
    const intvId = intervention_id || flowState.activeEmergency?.id;
    if (intvId) {
      await submitReview({
        intervention_id: intvId,
        rating,
        comment,
        badges,
        tip_dh: tipDh
      });
    }

    dispatch({ type: ACTIONS.RESET_TO_IDLE });
    notify.success('Merci pour votre avis ! ⭐', 'Votre retour aide notre communauté d\'artisans.', { id: `review-${intvId || 'done'}` });
  }, [flowState.activeEmergency?.id, submitReview]);

  /**
   * Annuler l'alerte SOS et revenir à IDLE
   */
  const cancelSOS = useCallback(() => {
    stopEmergencySiren();
    dispatch({ type: ACTIONS.RESET_TO_IDLE });
  }, []);

  /**
   * Fermer la modale d'alerte SOS reçue sans accepter
   */
  const dismissAlert = useCallback(() => {
    stopEmergencySiren();
    dispatch({ type: ACTIONS.DISMISS_ALERT });
  }, []);

  /**
   * Abandonner / Déclarer la mission active non réalisable (Maâlem) — Restitution 15 DH garantie
   */
  const abandonActiveMission = useCallback(async (reason, notes) => {
    const intvId = flowState.activeEmergency?.id;
    if (intvId) {
      await declareMissionUnfeasible(intvId, reason, notes);
    }
    dispatch({ type: ACTIONS.RESET_TO_IDLE });
  }, [flowState.activeEmergency?.id, declareMissionUnfeasible]);

  return (
    <EmergencyFlowContext.Provider
      value={{
        // États de la Machine d'États
        state: flowState.state,
        isIdle: flowState.state === EMERGENCY_STATES.IDLE,
        isSearching: flowState.state === EMERGENCY_STATES.SEARCHING,
        isMatched: flowState.state === EMERGENCY_STATES.MATCHED,
        isCompleted: flowState.state === EMERGENCY_STATES.COMPLETED,
        
        // Données du contexte
        activeEmergency: flowState.activeEmergency,
        matchedMaalem: flowState.matchedMaalem,
        incomingAlert: flowState.incomingAlert,
        progressStep: flowState.progressStep,
        finalPrice: flowState.finalPrice,

        // Actions du cycle de vie
        triggerSOS,
        acceptSOS,
        setProgressStep,
        finishMission,
        abandonActiveMission,
        submitClientFeedback,
        cancelSOS,
        dismissAlert
      }}
    >
      {children}
    </EmergencyFlowContext.Provider>
  );
};

export const useEmergencyFlow = () => {
  const context = useContext(EmergencyFlowContext);
  if (!context) {
    throw new Error('useEmergencyFlow must be used within an EmergencyFlowProvider');
  }
  return context;
};
