import { useEffect, useRef, useState, useCallback } from 'react';
import { centrifugo, isCentrifugoConfigured } from '../lib/centrifugoClient';
import { REALTIME_CHANNELS } from '../lib/realtimeClient';
import { db } from '../lib/dbClient';

/**
 * Hook React pour la gestion de Présence & Tracking GPS Temps Réel
 * 100% propulsé par Centrifugo v5 (Open Source sur VPS) et Heartbeat Dynamique.
 *
 * @param {object} options
 * @param {object} options.user - Profil utilisateur actuel
 * @param {boolean} options.isOnline - Statut En Ligne souhaité pour le Maalem
 * @param {Function} [options.onPresenceChange] - Callback notifiant des changements de présence
 */
export const useRealtimePresence = ({ user, isOnline, onPresenceChange } = {}) => {
  const [onlineMaalemsMap, setOnlineMaalemsMap] = useState({});
  const [connectionState, setConnectionState] = useState('connected');
  const [isCentrifugoConnected, setIsCentrifugoConnected] = useState(isCentrifugoConfigured);
  const [presenceError, setPresenceError] = useState(null);

  const geoWatchIdRef = useRef(null);
  const heartbeatTimerRef = useRef(null);
  const lastLocationUpdateRef = useRef({ lat: null, lng: null, timestamp: 0 });
  const isOnlineRef = useRef(isOnline);
  const userRef = useRef(user);

  isOnlineRef.current = isOnline;
  userRef.current = user;

  // Calcul des coordonnées par défaut ou existantes (avec priorité absolue au GPS réel)
  const getUserCoordinates = useCallback(() => {
    // 1. Priorité absolue : dernière position GPS en direct enregistrée dans le hook
    if (
      lastLocationUpdateRef.current?.lat &&
      lastLocationUpdateRef.current?.lng &&
      !isNaN(lastLocationUpdateRef.current.lat) &&
      !isNaN(lastLocationUpdateRef.current.lng)
    ) {
      return { lat: lastLocationUpdateRef.current.lat, lng: lastLocationUpdateRef.current.lng };
    }

    // 2. Vérifier si une position récente a été enregistrée en cache local
    try {
      const saved = JSON.parse(
        localStorage.getItem('bricolemoi_maalem_gps') ||
        localStorage.getItem('bricolemoi_client_gps') ||
        'null'
      );
      if (saved?.lat && saved?.lng && !isNaN(Number(saved.lat)) && !isNaN(Number(saved.lng))) {
        const sLat = Number(saved.lat);
        const sLng = Number(saved.lng);
        if (sLat > 20 && sLat < 38 && sLng < 0) {
          lastLocationUpdateRef.current = { lat: sLat, lng: sLng, timestamp: saved.updated_at || Date.now() };
          return { lat: sLat, lng: sLng };
        }
      }
    } catch (e) {}

    const currUser = userRef.current;
    if (!currUser) return { lat: 33.5883, lng: -7.6328 };

    let lat = parseFloat(currUser.lat);
    let lng = parseFloat(currUser.lng);

    if (isNaN(lat) || isNaN(lng) || lng >= 0 || lat < 20 || lat > 38) {
      const zone = (currUser.city_zone || currUser.district || '').toLowerCase();
      if (zone.includes('fès') || zone.includes('fes')) {
        lat = 34.0331;
        lng = -5.0003;
      } else if (zone.includes('rabat')) {
        lat = 34.0209;
        lng = -6.8416;
      } else if (zone.includes('marrakech')) {
        lat = 31.6295;
        lng = -7.9811;
      } else if (zone.includes('tanger')) {
        lat = 35.7595;
        lng = -5.8340;
      } else if (zone.includes('agadir')) {
        lat = 30.4278;
        lng = -9.5981;
      } else {
        lat = 33.5883;
        lng = -7.6328;
      }
    }

    return { lat, lng };
  }, []);

  // Émettre son propre heartbeat / mise à jour de présence
  const broadcastSelfPresence = useCallback(
    async (customData = {}) => {
      const currUser = userRef.current;
      const currOnline = isOnlineRef.current;
      if (!currUser || currUser.role !== 'MAALEM') return;

      const coords = getUserCoordinates();

      const presenceData = {
        id: currUser.id,
        user_id: currUser.id,
        full_name: currUser.full_name,
        specialty: currUser.maalem_details?.specialty || currUser.specialty || 'PLUMBING',
        city_zone: currUser.city_zone || currUser.district || 'Casablanca',
        lat: coords.lat,
        lng: coords.lng,
        is_online: currOnline,
        is_available: currOnline,
        credit_balance: currUser.maalem_details?.credit_balance ?? currUser.credits ?? 0,
        rating_avg: currUser.maalem_details?.rating_avg || 0,
        total_reviews: currUser.maalem_details?.total_reviews || 0,
        last_seen_at: Date.now(),
        ...customData
      };

      // 1. Diffusion sur Centrifugo VPS
      if (isCentrifugoConfigured) {
        try {
          await centrifugo.publish(REALTIME_CHANNELS.PRESENCE_MAALEMS, {
            type: currOnline ? 'PRESENCE_HEARTBEAT' : 'PRESENCE_LEAVE',
            maalem: presenceData,
            timestamp: Date.now()
          });
        } catch (e) {}
      }

      // 2. BroadcastChannel pour onglets locaux
      try {
        const bc = new BroadcastChannel('bricolemoi_presence_sync');
        bc.postMessage({
          type: currOnline ? 'PRESENCE_HEARTBEAT' : 'PRESENCE_LEAVE',
          maalem: presenceData,
          timestamp: Date.now()
        });
        bc.close();
      } catch (e) {}

      // 3. Mise à jour de maalem_details dans la base de données
      if (currUser.id) {
        try {
          db
            .from('maalem_details')
            .update({
              is_online: currOnline,
              is_available: currOnline,
              lat: coords.lat,
              lng: coords.lng,
              last_seen_at: new Date().toISOString()
            })
            .eq('id', currUser.id)
            .then(() => {});
        } catch (e) {}
      }
    },
    [getUserCoordinates]
  );

  // Souscription aux heartbeats et notifications de présence des autres Maâlems
  useEffect(() => {
    const handlePresenceMessage = (message) => {
      if (!message || !message.maalem) return;
      const m = message.maalem;
      const maalemId = m.id || m.user_id;
      if (!maalemId) return;

      setOnlineMaalemsMap((prev) => {
        const updated = { ...prev };
        if (message.type === 'PRESENCE_LEAVE' || !m.is_online) {
          delete updated[maalemId];
        } else {
          updated[maalemId] = {
            ...m,
            last_seen_at: message.timestamp || Date.now()
          };
        }

        if (typeof onPresenceChange === 'function') {
          onPresenceChange(Object.values(updated));
        }

        return updated;
      });
    };

    // Abonnement Centrifugo VPS
    let unsubCentrifugo = null;
    if (isCentrifugoConfigured) {
      unsubCentrifugo = centrifugo.subscribe(REALTIME_CHANNELS.PRESENCE_MAALEMS, (data) => {
        handlePresenceMessage(data);
      });
    }

    // Écouteur BroadcastChannel local
    let bc = null;
    try {
      bc = new BroadcastChannel('bricolemoi_presence_sync');
      bc.onmessage = (e) => {
        handlePresenceMessage(e.data);
      };
    } catch (e) {}

    // Nettoyage régulier des entrées expirées (TTL 90 secondes)
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setOnlineMaalemsMap((prev) => {
        let changed = false;
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (now - (updated[id].last_seen_at || 0) > 90000 && id !== userRef.current?.id) {
            delete updated[id];
            changed = true;
          }
        });
        if (changed && typeof onPresenceChange === 'function') {
          onPresenceChange(Object.values(updated));
        }
        return changed ? updated : prev;
      });
    }, 30000);

    return () => {
      if (unsubCentrifugo) unsubCentrifugo();
      if (bc) bc.close();
      clearInterval(cleanupInterval);
    };
  }, [onPresenceChange]);

  // Boucle de Heartbeat pour le Maâlem connecté
  useEffect(() => {
    if (!user || user.role !== 'MAALEM') return;

    broadcastSelfPresence();

    heartbeatTimerRef.current = setInterval(() => {
      broadcastSelfPresence();
    }, 30000);

    return () => {
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
    };
  }, [user, isOnline, broadcastSelfPresence]);

  // Watcher GPS continu pour le Maâlem en service
  useEffect(() => {
    if (!user || user.role !== 'MAALEM' || !isOnline) {
      if (geoWatchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
      return;
    }

    if (typeof window !== 'undefined' && navigator.geolocation) {
      const handlePositionSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        if (latitude > 20 && latitude < 38 && longitude < 0) {
          lastLocationUpdateRef.current = {
            lat: latitude,
            lng: longitude,
            timestamp: Date.now()
          };

          try {
            localStorage.setItem(
              'bricolemoi_maalem_gps',
              JSON.stringify({
                lat: latitude,
                lng: longitude,
                updated_at: Date.now()
              })
            );
          } catch (e) {}

          broadcastSelfPresence({ lat: latitude, lng: longitude });

          if (user?.id) {
            try {
              db
                .from('maalem_details')
                .update({ lat: latitude, lng: longitude })
                .eq('id', user.id)
                .then(() => {});
            } catch (e) {}
          }
        }
      };

      const handlePositionError = (err) => {
        console.warn('[GPS Watcher] Erreur géolocalisation:', err.message);
      };

      geoWatchIdRef.current = navigator.geolocation.watchPosition(
        handlePositionSuccess,
        handlePositionError,
        {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 5000
        }
      );

      return () => {
        if (geoWatchIdRef.current !== null) {
          navigator.geolocation.clearWatch(geoWatchIdRef.current);
          geoWatchIdRef.current = null;
        }
      };
    }
  }, [user, isOnline, broadcastSelfPresence]);

  return {
    onlineMaalemsMap,
    onlineMaalemsList: Object.values(onlineMaalemsMap),
    onlineMaalemsCount: Object.keys(onlineMaalemsMap).length,
    connectionState,
    isRealtimeConnected: isCentrifugoConnected,
    isAblyConnected: isCentrifugoConnected,
    isCentrifugoConnected,
    presenceError,
    refreshPresence: broadcastSelfPresence
  };
};

export const useAblyPresence = useRealtimePresence;
export const useCentrifugoPresence = useRealtimePresence;
