import { useEffect, useRef, useState, useCallback } from 'react';
import { centrifugo, isCentrifugoConfigured } from '../lib/centrifugoClient';
import { REALTIME_CHANNELS } from '../lib/ablyClient';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook React pour la gestion de Présence & Tracking GPS Temps Réel
 * 100% propulsé par Centrifugo v5 (Open Source sur VPS).
 *
 * @param {object} options
 * @param {object} options.user - Profil utilisateur actuel
 * @param {boolean} options.isOnline - Statut En Ligne souhaité pour le Maalem
 * @param {Function} [options.onPresenceChange] - Callback notifiant des changements de présence
 */
export const useAblyPresence = ({ user, isOnline, onPresenceChange } = {}) => {
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

  // Calcul des coordonnées par défaut ou existantes
  const getUserCoordinates = useCallback(() => {
    const currUser = userRef.current;
    if (!currUser) return { lat: 33.5883, lng: -7.6328 };

    let mLat = parseFloat(currUser.lat);
    let mLng = parseFloat(currUser.lng);

    if (isNaN(mLat) || isNaN(mLng) || mLng >= 0 || mLat < 20 || mLat > 38) {
      const zone = (currUser.city_zone || currUser.city || '').toLowerCase();
      if (zone.includes('fès') || zone.includes('fes')) { mLat = 34.0331; mLng = -5.0003; }
      else if (zone.includes('rabat')) { mLat = 34.0209; mLng = -6.8416; }
      else if (zone.includes('marrakech')) { mLat = 31.6295; mLng = -7.9811; }
      else if (zone.includes('tanger')) { mLat = 35.7595; mLng = -5.8340; }
      else if (zone.includes('agadir')) { mLat = 30.4278; mLng = -9.5981; }
      else { mLat = 33.5883; mLng = -7.6328; }
    }

    return { lat: mLat, lng: mLng };
  }, []);

  // Construction du payload de présence pour l'artisan
  const buildMaalemPresencePayload = useCallback((customCoords = null) => {
    const currUser = userRef.current;
    if (!currUser) return null;

    const coords = customCoords || getUserCoordinates();
    const isVerified = Boolean(
      currUser.is_verified !== false &&
      currUser.maalem_details?.is_verified !== false &&
      !currUser.is_suspended &&
      currUser.status !== 'suspended'
    );

    return {
      id: currUser.id,
      clientId: currUser.id,
      full_name: currUser.full_name || 'Artisan Maalem',
      phone: currUser.phone || '',
      specialty: currUser.maalem_details?.specialty || currUser.specialty || 'PLUMBING',
      rating_avg: currUser.maalem_details?.rating_avg ?? currUser.rating_avg ?? 5.0,
      is_verified: isVerified,
      cin_verified: isVerified,
      status: currUser.status || currUser.maalem_details?.status || 'active',
      portfolio_urls: currUser.maalem_details?.portfolio_urls || currUser.portfolio_urls || [],
      is_online: true,
      is_available: true,
      lat: coords.lat,
      lng: coords.lng,
      district: currUser.city_zone || currUser.city || 'Casablanca',
      credit_balance: currUser.maalem_details?.credit_balance ?? currUser.credits ?? 0,
      last_seen_at: Date.now()
    };
  }, [getUserCoordinates]);

  // Diffusion de la présence sur le canal Centrifugo
  const broadcastSelfPresence = useCallback(async (customCoords = null, action = 'update') => {
    const currUser = userRef.current;
    const isUserMaalem = Boolean(currUser && String(currUser.role || '').toUpperCase() === 'MAALEM');

    if (!isUserMaalem || !isCentrifugoConfigured) return;

    try {
      if (isOnlineRef.current && action !== 'leave') {
        const payload = buildMaalemPresencePayload(customCoords);
        if (payload) {
          await centrifugo.publish(REALTIME_CHANNELS.PRESENCE_MAALEMS, {
            action: 'update',
            maalem: payload,
            timestamp: Date.now()
          });
        }
      } else if (!isOnlineRef.current || action === 'leave') {
        await centrifugo.publish(REALTIME_CHANNELS.PRESENCE_MAALEMS, {
          action: 'leave',
          maalemId: currUser.id,
          timestamp: Date.now()
        });
      }
    } catch (err) {
      console.warn('[Centrifugo Presence] Erreur publication présence:', err);
    }
  }, [buildMaalemPresencePayload]);

  // 1. Souscription au canal de présence Centrifugo
  useEffect(() => {
    if (!isCentrifugoConfigured) return;

    setIsCentrifugoConnected(true);
    setConnectionState('connected');

    const unsubscribe = centrifugo.subscribe(REALTIME_CHANNELS.PRESENCE_MAALEMS, (data) => {
      if (!data) return;

      setOnlineMaalemsMap((prev) => {
        const updated = { ...prev };
        const { action, maalem, maalemId } = data;

        if (action === 'leave' && maalemId) {
          delete updated[maalemId];
        } else if (maalem && maalem.id) {
          updated[maalem.id] = {
            ...maalem,
            last_seen_at: Date.now()
          };
        }

        if (typeof onPresenceChange === 'function') {
          onPresenceChange(updated);
        }
        return updated;
      });
    });

    // Nettoyage régulier des artisans inactifs (> 60s sans heartbeat)
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setOnlineMaalemsMap((prev) => {
        let changed = false;
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (now - (updated[id].last_seen_at || 0) > 60000 && id !== userRef.current?.id) {
            delete updated[id];
            changed = true;
          }
        });
        if (changed && typeof onPresenceChange === 'function') {
          onPresenceChange(updated);
        }
        return changed ? updated : prev;
      });
    }, 20000);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      clearInterval(cleanupInterval);
    };
  }, [onPresenceChange]);

  // 2. Gestion du Heartbeat de présence et de la bascule En Ligne / Hors Ligne
  useEffect(() => {
    broadcastSelfPresence();

    if (isOnline) {
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = setInterval(() => {
        broadcastSelfPresence();
      }, 25000);
    } else {
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
      broadcastSelfPresence(null, 'leave');
    }

    return () => {
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
    };
  }, [isOnline, broadcastSelfPresence]);

  // 3. Suivi de la géolocalisation live en continu (GPS Watcher)
  useEffect(() => {
    const isUserMaalem = Boolean(user && String(user.role || '').toUpperCase() === 'MAALEM');

    if (isUserMaalem && isOnline && typeof window !== 'undefined' && 'geolocation' in navigator) {
      const handlePositionSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        const last = lastLocationUpdateRef.current;

        const timeDiff = now - last.timestamp;
        const latDiff = Math.abs((last.lat || 0) - latitude);
        const lngDiff = Math.abs((last.lng || 0) - longitude);
        const hasMoved = latDiff > 0.00015 || lngDiff > 0.00015;

        if (timeDiff >= 5000 || hasMoved) {
          lastLocationUpdateRef.current = { lat: latitude, lng: longitude, timestamp: now };
          broadcastSelfPresence({ lat: latitude, lng: longitude });

          if (user?.id && String(user.role || '').toUpperCase() === 'MAALEM') {
            try {
              supabase
                .from('maalem_details')
                .update({ lat: latitude, lng: longitude })
                .eq('id', user.id)
                .then(() => {});
            } catch (e) {}
          }
        }
      };

      const handlePositionError = (err) => {
        console.warn('[Centrifugo GPS Watcher] Erreur géolocalisation:', err.message);
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
    isAblyConnected: isCentrifugoConnected,
    isCentrifugoConnected,
    presenceError,
    refreshPresence: broadcastSelfPresence
  };
};

export const useCentrifugoPresence = useAblyPresence;
