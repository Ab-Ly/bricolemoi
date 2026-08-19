import { useEffect, useRef, useState, useCallback } from 'react';
import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from '../lib/ablyClient';

/**
 * Hook React personnalisé pour la gestion de Présence Temps Réel Ably
 *
 * Fonctionnalités clés :
 * - Bascule En Ligne / Hors Ligne instantanée pour les Maâlems sans solliciter la BDD
 * - Streaming de la géolocalisation GPS en direct (watchPosition + presence.update)
 * - Résilience aux micro-coupures réseau & reconnexion automatique
 * - Synchronisation en temps réel de tous les artisans connectés pour les Clients & Cartes
 *
 * @param {object} options
 * @param {object} options.user - Profil utilisateur actuel
 * @param {boolean} options.isOnline - Statut En Ligne souhaité pour le Maalem
 * @param {Function} [options.onPresenceChange] - Callback notifiant des changements de présence
 */
export const useAblyPresence = ({ user, isOnline, onPresenceChange } = {}) => {
  const [onlineMaalemsMap, setOnlineMaalemsMap] = useState({});
  const [connectionState, setConnectionState] = useState('initialized');
  const [isAblyConnected, setIsAblyConnected] = useState(false);
  const [presenceError, setPresenceError] = useState(null);

  const geoWatchIdRef = useRef(null);
  const lastLocationUpdateRef = useRef({ lat: null, lng: null, timestamp: 0 });
  const presenceChannelRef = useRef(null);
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

  // Synchronisation de la présence Maalem (Enter / Update / Leave)
  const syncSelfPresence = useCallback(async () => {
    const currUser = userRef.current;
    const isUserMaalem = Boolean(currUser && String(currUser.role || '').toUpperCase() === 'MAALEM');
    const channel = presenceChannelRef.current;

    if (!channel || !isAblyConfigured) return;

    try {
      if (isUserMaalem && isOnlineRef.current) {
        const payload = buildMaalemPresencePayload();
        if (payload) {
          // Entrée ou mise à jour automatique sur le canal de présence Ably
          await channel.presence.update(payload).catch(async () => {
            await channel.presence.enter(payload);
          });
        }
      } else if (isUserMaalem && !isOnlineRef.current) {
        await channel.presence.leave();
      }
    } catch (err) {
      console.warn('[Ably Presence] Erreur de synchronisation présence:', err);
    }
  }, [buildMaalemPresencePayload]);

  // 1. Initialisation de la connexion Ably et abonnement au canal de présence
  useEffect(() => {
    if (!isAblyConfigured) {
      setIsAblyConnected(false);
      setConnectionState('disabled_no_key');
      return;
    }

    const clientId = user?.id || null;
    const client = getAblyClient(clientId);
    if (!client) return;

    // Suivi de l'état de la connexion
    const onStateChange = (stateChange) => {
      const current = stateChange.current;
      setConnectionState(current);
      setIsAblyConnected(current === 'connected');

      // En cas de reconnexion après coupure, ré-inscrire la présence
      if (current === 'connected') {
        syncSelfPresence();
      }
    };

    client.connection.on(onStateChange);
    setIsAblyConnected(client.connection.state === 'connected');
    setConnectionState(client.connection.state);

    const channel = client.channels.get(ABLY_CHANNELS.PRESENCE_MAALEMS);
    presenceChannelRef.current = channel;

    // Fonction de rafraîchissement global de la map de présence
    const refreshPresenceSnapshot = async () => {
      try {
        const presenceMembers = await channel.presence.get();
        const map = {};
        presenceMembers.forEach((member) => {
          if (member.data && member.data.id) {
            map[member.data.id] = {
              ...member.data,
              clientId: member.clientId,
              last_seen_at: member.data.last_seen_at || Date.now()
            };
          }
        });
        setOnlineMaalemsMap(map);
        if (typeof onPresenceChange === 'function') {
          onPresenceChange(map);
        }
      } catch (e) {
        console.warn('[Ably Presence] Impossible de récupérer le snapshot:', e);
      }
    };

    // Écouteurs d'événements de présence Ably (Enter, Update, Leave, Present)
    const handlePresenceMessage = (presenceMsg) => {
      const { action, data, clientId: memberClientId } = presenceMsg;
      if (!data && action !== 'leave') return;

      setOnlineMaalemsMap((prev) => {
        const updated = { ...prev };
        const memberId = data?.id || memberClientId;

        if (action === 'leave') {
          delete updated[memberId];
        } else if (data) {
          updated[memberId] = {
            ...data,
            clientId: memberClientId,
            last_seen_at: Date.now()
          };
        }

        if (typeof onPresenceChange === 'function') {
          onPresenceChange(updated);
        }
        return updated;
      });
    };

    channel.presence.subscribe(handlePresenceMessage);

    // Récupérer la liste des personnes déjà présentes au moment de la connexion
    channel.attach((err) => {
      if (err) {
        setPresenceError(err.message);
        return;
      }
      refreshPresenceSnapshot();
      syncSelfPresence();
    });

    return () => {
      try {
        channel.presence.unsubscribe(handlePresenceMessage);
      } catch (e) {}
      try {
        client.connection.off(onStateChange);
      } catch (e) {}
    };
  }, [user?.id, syncSelfPresence, onPresenceChange]);

  // 2. Gestion de la bascule En Ligne / Hors Ligne
  useEffect(() => {
    syncSelfPresence();
  }, [isOnline, syncSelfPresence]);

  // 3. Suivi de la géolocalisation live en continu (GPS Watcher avec throttling)
  useEffect(() => {
    const isUserMaalem = Boolean(user && String(user.role || '').toUpperCase() === 'MAALEM');

    // On active le tracking GPS temps réel uniquement si le Maalem est En Ligne
    if (isUserMaalem && isOnline && typeof window !== 'undefined' && 'geolocation' in navigator) {
      const handlePositionSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        const last = lastLocationUpdateRef.current;

        // Seuil d'optimisation : au moins 5 secondes d'intervalle ou déplacement notable (~15m)
        const timeDiff = now - last.timestamp;
        const latDiff = Math.abs((last.lat || 0) - latitude);
        const lngDiff = Math.abs((last.lng || 0) - longitude);
        const hasMoved = latDiff > 0.00015 || lngDiff > 0.00015;

        if (timeDiff >= 5000 || hasMoved) {
          lastLocationUpdateRef.current = { lat: latitude, lng: longitude, timestamp: now };

          const channel = presenceChannelRef.current;
          if (channel && isAblyConfigured) {
            const updatedPayload = buildMaalemPresencePayload({ lat: latitude, lng: longitude });
            if (updatedPayload) {
              channel.presence.update(updatedPayload).catch(() => {});
            }
          }
        }
      };

      const handlePositionError = (err) => {
        console.warn('[Ably GPS Watcher] Erreur géolocalisation:', err.message);
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
    } else {
      if (geoWatchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
    }

    return () => {
      if (geoWatchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
    };
  }, [user, isOnline, buildMaalemPresencePayload]);

  // 4. Gestion de la visibilité & réveil de l'écran (retour d'arrière-plan mobile)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAblyConfigured) {
        syncSelfPresence();
      }
    };

    const handleWindowOnline = () => {
      if (isAblyConfigured) {
        syncSelfPresence();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleWindowOnline);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleWindowOnline);
    };
  }, [syncSelfPresence]);

  const onlineMaalemsList = Object.values(onlineMaalemsMap);

  return {
    isAblyConnected,
    connectionState,
    presenceError,
    onlineMaalemsMap,
    onlineMaalems: onlineMaalemsList,
    onlineMaalemsCount: onlineMaalemsList.length,
    syncSelfPresence
  };
};
