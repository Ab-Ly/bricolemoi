import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { notify } from '../lib/notify';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { playNotificationSound } from '../lib/audioNotifier';
import { getAblyClient, ABLY_CHANNELS, isAblyConfigured } from '../lib/ablyClient';
import { publishRealtimeEvent, subscribeToRealtimeChannel } from '../lib/ablyRealtimeService';
import { useAblyPresence } from '../hooks/useAblyPresence';
import { getAppSubdomain } from '../lib/subdomain';
import { generateReceiptPDF } from '../lib/pdfReceiptGenerator';

const AppContext = createContext();

// Haversine formula — distance en km (équivalent PostGIS ST_DistanceSphere)
const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
};

export const AppProvider = ({ children }) => {
  const { user, setUser } = useAuth();

  // Ref toujours synchronisée pour éviter les closures périmées dans les WebSockets et Broadcast
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // État global — initialisé avec cache local et synchronisé Supabase / multi-onglets
  const [interventions, setInterventions] = useState(() => {
    try {
      const cached = localStorage.getItem('bricolemoi_interventions_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [maalems, setMaalems] = useState([]);
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState(() => {
    try {
      const cached = localStorage.getItem('bricolemoi_transactions_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [reviews, setReviews] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [whatsappMsg, setWhatsappMsg] = useState(null);
  const [adminAlerts, setAdminAlerts] = useState(() => {
    try {
      const cached = localStorage.getItem('bricolemoi_admin_alerts');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  // État de Disponibilité En Ligne / Hors Ligne pour le Maâlem
  const [isMaalemOnline, setIsMaalemOnline] = useState(() => {
    try {
      const saved = localStorage.getItem('bricolemoi_maalem_online');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const isMaalemOnlineRef = useRef(isMaalemOnline);
  useEffect(() => {
    isMaalemOnlineRef.current = isMaalemOnline;
  }, [isMaalemOnline]);

  // === HELPERS DE CIBLAGE STRICT DES NOTIFICATIONS & SONS ===
  // Empêche le mélange de notifications entre différents appareils connectés

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';

  const isCurrentUserClientOf = (intv) => {
    if (!intv) return false;

    // Règle d'étanchéité absolue : Si l'utilisateur est actuellement sur l'Espace Admin ou Maâlem,
    // il ne doit JAMAIS recevoir les notifications réservées aux clients demandeurs.
    const currentApp = getAppSubdomain();
    if (currentApp === 'ADMIN' || currentApp === 'MAALEM') {
      return false;
    }

    const curr = userRef.current;
    const currentRole = String(curr?.role || '').toUpperCase();
    if (currentRole === 'ADMIN' || currentRole === 'MAALEM') {
      return false;
    }

    const intvId = String(intv.id || intv.intervention_id || '').trim();

    // 1. Vérifier si cet appareil précis a créé cette demande (uniquement pour un client)
    try {
      const myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
      if (intvId && myCreated.includes(intvId)) {
        return true;
      }
    } catch (e) {}

    if (!curr) return false;

    // 2. Vérifier par ID utilisateur authentifié réel (exclure le dummy ID générique 11111111-...)
    if (
      curr.id &&
      curr.id !== DUMMY_CLIENT_ID &&
      intv.client_id &&
      intv.client_id !== DUMMY_CLIENT_ID &&
      String(intv.client_id).trim() === String(curr.id).trim()
    ) {
      return true;
    }

    // 3. Vérifier par Numéro de téléphone réel (> 8 chiffres, pas de placeholder)
    if (curr.phone && intv.client_phone) {
      const cp = String(curr.phone).replace(/\D/g, '');
      const ip = String(intv.client_phone).replace(/\D/g, '');
      if (cp.length >= 8 && ip.length >= 8 && cp === ip && cp !== '0661234567') {
        return true;
      }
    }

    return false;
  };

  const isCurrentUserAssignedMaalemOf = (intv) => {
    if (!intv) return false;
    const currentApp = getAppSubdomain();
    if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

    const curr = userRef.current;
    if (!curr) return false;
    const role = String(curr.role || '').toUpperCase();
    if (role !== 'MAALEM') return false;
    const maalemId = intv.maalem_id || intv.maalemId;
    return Boolean(maalemId && String(maalemId).trim() === String(curr.id).trim());
  };

  const isCurrentUserEligibleMaalemForNewJob = (intv) => {
    if (!intv) return false;
    const currentApp = getAppSubdomain();
    if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

    const curr = userRef.current;
    if (!curr) return false;
    const role = String(curr.role || '').toUpperCase();
    if (role !== 'MAALEM') return false;

    if (isMaalemOnlineRef.current === false) return false;

    const maalemSpecialty = curr.maalem_details?.specialty || curr.specialty;
    if (maalemSpecialty && maalemSpecialty !== 'ALL' && maalemSpecialty !== 'BOTH' && intv.service_type) {
      if (String(maalemSpecialty).toUpperCase() !== String(intv.service_type).toUpperCase()) {
        return false;
      }
    }

    if (isCurrentUserClientOf(intv)) return false;

    return true;
  };

  const isCurrentUserAdmin = () => {
    const currentApp = getAppSubdomain();
    if (currentApp !== 'ADMIN') return false;
    const curr = userRef.current;
    return Boolean(curr && String(curr.role || '').toUpperCase() === 'ADMIN');
  };

  const isCurrentUserMaalemOfTransaction = (txOrMaalemId) => {
    const currentApp = getAppSubdomain();
    if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

    const curr = userRef.current;
    if (!curr) return false;
    const role = String(curr.role || '').toUpperCase();
    if (role !== 'MAALEM') return false;
    const maalemId = typeof txOrMaalemId === 'object' ? (txOrMaalemId?.maalem_id || txOrMaalemId?.maalemId) : txOrMaalemId;
    return Boolean(maalemId && String(maalemId).trim() === String(curr.id).trim());
  };

  const updateOnlineMaalemInStorage = (maalemId, status, extraData = {}) => {
    if (!maalemId) return;
    try {
      const saved = JSON.parse(localStorage.getItem('bricolemoi_online_maalems_map') || '{}');
      if (status) {
        saved[maalemId] = { ...extraData, is_online: true, is_available: true, last_seen_at: Date.now() };
      } else {
        delete saved[maalemId];
      }
      localStorage.setItem('bricolemoi_online_maalems_map', JSON.stringify(saved));
    } catch (e) {}
  };

  const getOnlineMaalemsFromStorage = () => {
    try {
      const raw = JSON.parse(localStorage.getItem('bricolemoi_online_maalems_map') || '{}');
      const now = Date.now();
      const activeOnly = {};
      let changed = false;
      Object.entries(raw).forEach(([id, data]) => {
        // Expiration stricte après 90 secondes sans battement de cœur
        if (data && data.last_seen_at && (now - data.last_seen_at < 90000)) {
          activeOnly[id] = data;
        } else {
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('bricolemoi_online_maalems_map', JSON.stringify(activeOnly));
      }
      return activeOnly;
    } catch (e) {
      return {};
    }
  };

  const getTabId = () => {
    if (typeof window === 'undefined') return 'server';
    if (!window.__bricolemoi_tab_id) {
      window.__bricolemoi_tab_id = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    }
    return window.__bricolemoi_tab_id;
  };

  // Helper Multi-Canaux Infaillible (BroadcastChannel + LocalStorage Event)
  const broadcastSync = (payload) => {
    const originTab = getTabId();
    const enrichedPayload = {
      ...payload,
      _origin_tab: originTab,
      _sync_time: Date.now()
    };

    try {
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(enrichedPayload);
      bc.close();
    } catch (e) { }

    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify({
        ...enrichedPayload,
        _sync_time: Date.now() + Math.random()
      }));
    } catch (e) { }
  };

  // Helper Supabase Broadcast sécurisé (sans warning console)
  const safeSupabaseBroadcast = async (channelName, eventName, payload) => {
    if (!isSupabaseConfigured) return;
    try {
      const channel = supabase.channel(channelName);
      if (typeof channel.httpSend === 'function') {
        await channel.httpSend({
          type: 'broadcast',
          event: eventName,
          payload
        });
      } else if (typeof channel.send === 'function') {
        await channel.send({
          type: 'broadcast',
          event: eventName,
          payload
        });
      }
    } catch (e) { }
  };

  // Intégration Ably Presence pour le Maâlem connecté et synchronisation globale
  const handleAblyPresenceUpdate = useCallback((presenceMap) => {
    setMaalems((prev) => {
      const maalemMap = new Map(prev.map((m) => [String(m.id).trim(), { ...m }]));
      const onlineIds = new Set(Object.keys(presenceMap).map((k) => String(k).trim()));

      // 1. Mettre à jour ou insérer les artisans actifs dans Ably Presence
      Object.entries(presenceMap).forEach(([id, member]) => {
        const cleanId = String(id).trim();
        const existing = maalemMap.get(cleanId);

        if (existing) {
          maalemMap.set(cleanId, {
            ...existing,
            is_online: true,
            is_available: true,
            lat: member.lat !== undefined ? member.lat : existing.lat,
            lng: member.lng !== undefined ? member.lng : existing.lng,
            last_seen_at: member.last_seen_at || Date.now(),
            full_name: member.full_name || existing.full_name,
            specialty: member.specialty || existing.specialty,
            credit_balance: member.credit_balance ?? existing.credit_balance,
            rating_avg: member.rating_avg ?? existing.rating_avg,
            is_verified: member.is_verified ?? existing.is_verified ?? true,
            cin_verified: member.cin_verified ?? existing.cin_verified ?? true,
            status: member.status || existing.status || 'active',
            portfolio_urls: member.portfolio_urls || existing.portfolio_urls || []
          });
        } else if (member) {
          maalemMap.set(cleanId, {
            id: cleanId,
            full_name: member.full_name || 'Artisan Maalem',
            phone: member.phone || '',
            specialty: member.specialty || 'PLUMBING',
            rating_avg: member.rating_avg ?? 5.0,
            is_verified: member.is_verified ?? true,
            cin_verified: member.cin_verified ?? true,
            status: member.status || 'active',
            portfolio_urls: member.portfolio_urls || [],
            is_online: true,
            is_available: true,
            lat: member.lat || 33.5883,
            lng: member.lng || -7.6328,
            credit_balance: member.credit_balance ?? 0,
            district: member.district || 'Casablanca',
            last_seen_at: member.last_seen_at || Date.now()
          });
        }
      });

      // 2. Si Ably est actif et qu'un artisan n'est plus présent dans le canal, le passer offline
      if (isAblyConfigured && Object.keys(presenceMap).length > 0) {
        maalemMap.forEach((m, mId) => {
          if (!onlineIds.has(mId)) {
            const isSelf = userRef.current && String(userRef.current.id).trim() === mId;
            if (!isSelf) {
              m.is_online = false;
              m.is_available = false;
            }
          }
        });
      }

      return Array.from(maalemMap.values());
    });
  }, []);

  const {
    isAblyConnected,
    connectionState: ablyConnectionState,
    onlineMaalemsCount: ablyOnlineMaalemsCount,
    onlineMaalems: ablyOnlineMaalems
  } = useAblyPresence({
    user,
    isOnline: isMaalemOnline,
    onPresenceChange: handleAblyPresenceUpdate
  });

  const toggleMaalemOnlineStatus = async (overrideStatus) => {
    const nextStatus = typeof overrideStatus === 'boolean' ? overrideStatus : !isMaalemOnline;
    setIsMaalemOnline(nextStatus);
    try {
      localStorage.setItem('bricolemoi_maalem_online', JSON.stringify(nextStatus));
      updateOnlineMaalemInStorage(user?.id, nextStatus, {
        full_name: user?.full_name,
        specialty: user?.maalem_details?.specialty || 'PLUMBING',
        lat: user?.lat,
        lng: user?.lng
      });
      broadcastSync({
        type: 'MAALEM_STATUS_CHANGED',
        maalem_id: user?.id,
        is_online: nextStatus,
        is_available: nextStatus,
        _ts: Date.now()
      });
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // Mise à jour locale immédiate pour le Maâlem connecté
    setMaalems((prev) =>
      prev.map((m) => (m.id === user?.id ? { ...m, is_online: nextStatus, is_available: nextStatus } : m))
    );

    // Publication instantanée sur Ably Realtime (zéro écriture lourde en BDD)
    if (user?.id) {
      publishRealtimeEvent('maalem_status_changed', {
        maalem_id: user.id,
        is_online: nextStatus,
        is_available: nextStatus
      });
    }

    if (nextStatus) {
      showToast('🟢 Vous êtes maintenant EN LIGNE. Prêt à recevoir les alertes SOS.', 'success');
    } else {
      showToast('⏸️ Vous êtes maintenant HORS LIGNE. Réception des alertes SOS en pause.', 'info');
    }
  };

  // Auto-Sync du Maalem connecté dans la liste globale (uniquement si son rôle réel est MAALEM)
  useEffect(() => {
    if (user && String(user.role || '').toUpperCase() === 'MAALEM') {
      const isVerified = Boolean(
        user.is_verified !== false &&
        user.maalem_details?.is_verified !== false &&
        !user.is_suspended &&
        user.status !== 'suspended'
      );
      setMaalems((prev) => {
        // Détermination des coordonnées GPS selon la ville/zone du Maâlem
        let mLat = parseFloat(user.lat);
        let mLng = parseFloat(user.lng);

        if (isNaN(mLat) || isNaN(mLng)) {
          const zone = (user.city_zone || '').toLowerCase();
          if (zone.includes('fès') || zone.includes('fes')) {
            mLat = 34.0331; mLng = -5.0003;
          } else if (zone.includes('rabat')) {
            mLat = 34.0209; mLng = -6.8416;
          } else if (zone.includes('marrakech')) {
            mLat = 31.6295; mLng = -7.9811;
          } else if (zone.includes('tanger')) {
            mLat = 35.7595; mLng = -5.8340;
          } else if (zone.includes('agadir')) {
            mLat = 30.4278; mLng = -9.5981;
          } else {
            mLat = 33.5883; mLng = -7.6328;
          }
        }

        const newMaalem = {
          id: user.id,
          full_name: user.full_name || 'Artisan Maâlem',
          phone: user.phone || '',
          specialty: user.maalem_details?.specialty || user.specialty || 'PLUMBING',
          rating_avg: user.maalem_details?.rating_avg ?? 5.0,
          is_verified: isVerified,
          cin_verified: isVerified,
          status: user.status || user.maalem_details?.status || 'active',
          portfolio_urls: user.maalem_details?.portfolio_urls || user.portfolio_urls || [],
          is_online: isMaalemOnline,
          is_available: isMaalemOnline,
          lat: mLat,
          lng: mLng,
          credit_balance: user.credits !== undefined && user.credits !== null
            ? Number(user.credits)
            : (user.maalem_details?.credit_balance !== undefined && user.maalem_details?.credit_balance !== null
              ? Number(user.maalem_details.credit_balance)
              : 15.00),
          district: user.city_zone || 'Casablanca'
        };
        const filtered = prev.filter((m) => m.id !== user.id);
        return [newMaalem, ...filtered];
      });
    }
  }, [user, isMaalemOnline]);

  // 💓 Heartbeat Automatique (Toutes les 45 secondes) — Modèle Uber / Glovo
  useEffect(() => {
      if (!user || String(user.role || '').toUpperCase() !== 'MAALEM' || !isMaalemOnline) return;

      const sendHeartbeat = async () => {
        let mLat = parseFloat(user.lat);
        let mLng = parseFloat(user.lng);
        if (isNaN(mLat) || isNaN(mLng) || mLng >= 0) {
          const zone = (user.city_zone || '').toLowerCase();
          if (zone.includes('fès') || zone.includes('fes')) { mLat = 34.0331; mLng = -5.0003; }
          else if (zone.includes('rabat')) { mLat = 34.0209; mLng = -6.8416; }
          else if (zone.includes('marrakech')) { mLat = 31.6295; mLng = -7.9811; }
          else if (zone.includes('tanger')) { mLat = 35.7595; mLng = -5.8340; }
          else if (zone.includes('agadir')) { mLat = 30.4278; mLng = -9.5981; }
          else { mLat = 33.5883; mLng = -7.6328; }
        }

        const hbPayload = {
          type: 'MAALEM_HEARTBEAT',
          maalem_id: user.id,
          full_name: user.full_name,
          specialty: user.maalem_details?.specialty || 'PLUMBING',
          is_online: true,
          is_available: true,
          lat: mLat,
          lng: mLng,
          last_seen_at: Date.now()
        };

        updateOnlineMaalemInStorage(user.id, true, {
          full_name: user.full_name,
          specialty: user.maalem_details?.specialty || 'PLUMBING',
          lat: mLat,
          lng: mLng
        });

        // 1. BroadcastChannel inter-onglets (< 1ms)
        try {
          const bc = new BroadcastChannel('bricolemoi_intertab_sync');
          bc.postMessage(hbPayload);
        } catch (e) { }

        // 2. Supabase Realtime WebSocket Broadcast
        if (isSupabaseConfigured) {
          try {
            safeSupabaseBroadcast('public:jobs', 'maalem_heartbeat', hbPayload);
          } catch (e) { }
        }
      };

      sendHeartbeat();
      const interval = setInterval(sendHeartbeat, 45000);
      return () => clearInterval(interval);
    }, [user, isMaalemOnline]);

    const showToast = (msg, type = 'success') => {
      setToastMessage({ msg, type });
      if (type === 'error') notify.error('Attention', msg);
      else if (type === 'info') notify.info('Information', msg);
      else if (type === 'warning') notify.warning('Alerte', msg);
      else notify.success('Succès', msg);
    };

    // Chargement des données réelles depuis Supabase — appelé au mount et sur refresh manuel
    const fetchRealSupabaseData = async () => {
      if (!isSupabaseConfigured) return;
      // 1. Profils + maalem_details
      try {
        const { data: rawProfiles, error: pErr } = await supabase.from('profiles').select('*');
        if (pErr) console.warn('[Supabase] profiles read error:', pErr.message);

        const { data: rawDetails, error: dErr } = await supabase.from('maalem_details').select('*');
        if (dErr) console.warn('[Supabase] maalem_details read error:', dErr.message);

        if (rawProfiles) {
          const detailsMap = new Map((rawDetails || []).map(d => [d.id, d]));
          const onlineMapFromStorage = getOnlineMaalemsFromStorage();
          const profilesMap = new Map(rawProfiles.map(p => [p.id, p]));

          const maalemProfiles = rawProfiles.filter(m => {
            const r = String(m.role || '').toLowerCase();
            return r === 'maalem';
          });

          const formattedMaalems = maalemProfiles.map((m) => {
            const details = detailsMap.get(m.id) || {};
            const zone = (m.city_zone || '').toLowerCase();
            let mLat = parseFloat(m.lat || details.lat);
            let mLng = parseFloat(m.lng || details.lng);

            if (isNaN(mLat) || isNaN(mLng) || mLng >= 0 || mLat < 20 || mLat > 38) {
              if (zone.includes('fès') || zone.includes('fes')) {
                mLat = 34.0331 + (Math.random() - 0.5) * 0.015; mLng = -5.0003 + (Math.random() - 0.5) * 0.015;
              } else if (zone.includes('rabat')) {
                mLat = 34.0209 + (Math.random() - 0.5) * 0.015; mLng = -6.8416 + (Math.random() - 0.5) * 0.015;
              } else if (zone.includes('marrakech')) {
                mLat = 31.6295 + (Math.random() - 0.5) * 0.015; mLng = -7.9811 + (Math.random() - 0.5) * 0.015;
              } else if (zone.includes('tanger')) {
                mLat = 35.7595 + (Math.random() - 0.5) * 0.015; mLng = -5.8340 + (Math.random() - 0.5) * 0.015;
              } else if (zone.includes('agadir')) {
                mLat = 30.4278 + (Math.random() - 0.5) * 0.015; mLng = -9.5981 + (Math.random() - 0.5) * 0.015;
              } else {
                mLat = 33.5883 + (Math.random() - 0.5) * 0.015; mLng = -7.6328 + (Math.random() - 0.5) * 0.015;
              }
            }

            const isThisSelf = user && String(user.id).trim() === String(m.id).trim();
            const storageEntry = onlineMapFromStorage[m.id];
            const isFreshHeartbeat = Boolean(storageEntry && storageEntry.last_seen_at && (Date.now() - storageEntry.last_seen_at < 90000));
            const onlineStatus = isThisSelf ? Boolean(isMaalemOnline) : isFreshHeartbeat;

            return {
              id: m.id,
              full_name: m.full_name || 'Artisan Maalem',
              phone: m.phone || '',
              specialty: details.specialty || m.specialty || 'PLUMBING',
              rating_avg: details.rating_avg || 5.0,
              is_verified: details.is_verified ?? details.cin_verified ?? true,
              cin_verified: details.cin_verified ?? details.is_verified ?? true,
              status: details.status || m.status || 'active',
              portfolio_urls: details.portfolio_urls || m.portfolio_urls || [],
              is_online: onlineStatus,
              is_available: onlineStatus,
              lat: mLat,
              lng: mLng,
              credit_balance: isThisSelf
                ? (user.credits !== undefined && user.credits !== null
                  ? Number(user.credits)
                  : (user.maalem_details?.credit_balance !== undefined && user.maalem_details?.credit_balance !== null
                    ? Number(user.maalem_details.credit_balance)
                    : (details.credit_balance ?? m.credits ?? 15.00)))
                : (details.credit_balance !== undefined && details.credit_balance !== null
                  ? Number(details.credit_balance)
                  : (m.credits !== undefined && m.credits !== null
                    ? Number(m.credits)
                    : 15.00)),
              district: m.city_zone || 'Casablanca'
            };
          });

          setMaalems(formattedMaalems);

          const clientProfiles = rawProfiles
            .filter((p) => String(p.role || '').toLowerCase() !== 'maalem')
            .map((c) => ({
              id: c.id,
              full_name: c.full_name || 'Client BricoleMoi',
              phone: c.phone || 'Non renseigné',
              city_zone: c.city_zone || 'Casablanca',
              district: c.city_zone || 'Casablanca',
              created_at: c.created_at || new Date().toISOString(),
              is_suspended: Boolean(c.is_suspended),
              role: c.role || 'client'
            }));

          // Inclure le client connecté en local s'il n'est pas encore propagé
          if (user && String(user.role || '').toUpperCase() === 'CLIENT') {
            const alreadyInList = clientProfiles.some(c => String(c.id).trim() === String(user.id).trim());
            if (!alreadyInList) {
              clientProfiles.unshift({
                id: user.id,
                full_name: user.full_name || 'Client BricoleMoi',
                phone: user.phone || 'En attente',
                city_zone: user.city_zone || 'Casablanca',
                district: user.city_zone || 'Casablanca',
                created_at: new Date().toISOString(),
                is_suspended: false,
                role: 'CLIENT'
              });
            }
          }

          setClients(clientProfiles);

          // 2. Reviews (limitées aux 100 dernières)
          let reviewsMap = new Map();
          try {
            const { data: realReviews } = await supabase
              .from('reviews')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(100);
            if (realReviews) {
              setReviews(realReviews);
              reviewsMap = new Map(realReviews.map((r) => [String(r.intervention_id).trim(), r]));
            }
          } catch (e) { }

          // 3. Interventions (limitées aux 100 dernières, sans doublon d'appel profiles)
          try {
            const { data: realInterventions } = await supabase
              .from('interventions')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(100);

            if (realInterventions) {
              const enrichedInterventions = realInterventions.map((intv) => {
                const clientProf = profilesMap.get(intv.client_id);
                const maalemProf = profilesMap.get(intv.maalem_id);
                const rev = reviewsMap.get(String(intv.id).trim());

                return {
                  ...intv,
                  rating: intv.rating ?? rev?.rating ?? null,
                  comment: intv.comment || rev?.comment || null,
                  client_name: clientProf?.full_name || intv.client_name || 'Client BricoleMoi',
                  client_phone: clientProf?.phone || intv.client_phone || '0661-234567',
                  maalem_name: maalemProf?.full_name || intv.maalem_name || (intv.maalem_id ? 'Artisan Maalem' : null),
                  maalem_phone: maalemProf?.phone || intv.maalem_phone || ''
                };
              });
              setInterventions(enrichedInterventions);
            }
          } catch (e) { }

          // 4. Transactions (limitées aux 150 dernières, sans doublon d'appel profiles)
          try {
            const { data: realTransactions } = await supabase
              .from('transactions')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(150);

            if (realTransactions) {
              let cachedMap = new Map();
              try {
                const cachedRaw = localStorage.getItem('bricolemoi_transactions_cache');
                if (cachedRaw) {
                  const parsed = JSON.parse(cachedRaw);
                  (parsed || []).forEach((c) => {
                    if (c.id) cachedMap.set(String(c.id).trim(), c);
                    if (c.reference_ref) cachedMap.set(String(c.reference_ref).trim().toLowerCase(), c);
                  });
                }
              } catch (e) { }

              const enrichedTx = realTransactions.map((tx) => {
                const p = profilesMap.get(tx.maalem_id);
                const cachedMatch = cachedMap.get(String(tx.id).trim()) || (tx.reference_ref && cachedMap.get(String(tx.reference_ref).trim().toLowerCase()));
                const effectiveStatus = (cachedMatch && cachedMatch.status !== 'PENDING') ? cachedMatch.status : tx.status;
                const effectiveNotes = cachedMatch?.admin_notes || tx.admin_notes;

                return {
                  ...tx,
                  status: effectiveStatus,
                  admin_notes: effectiveNotes,
                  maalem_name: p?.full_name || tx.maalem_name || (user?.id === tx.maalem_id ? user?.full_name : 'Artisan Maalem'),
                  maalem_phone: p?.phone || tx.maalem_phone || (user?.id === tx.maalem_id ? user?.phone : '')
                };
              });
              setTransactions(enrichedTx);
              try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(enrichedTx)); } catch (e) { }
            }
          } catch (e) { }
        }
      } catch (err) {
        console.warn('[Supabase] Exception chargement profils:', err.message);
      }
    };

    // Mount initial + auto-refresh au focus de l'onglet
    useEffect(() => {
      fetchRealSupabaseData();

      const onFocus = () => fetchRealSupabaseData();
      window.addEventListener('focus', onFocus);
      return () => window.removeEventListener('focus', onFocus);
    }, []);

    // Synchronisation automatique des avis insatisfaisants (<= 3 étoiles) vers le tableau de bord Admin Litiges
    useEffect(() => {
      if (!interventions || interventions.length === 0) return;
      const lowRatingItems = interventions.filter(
        (i) => i.rating && Number(i.rating) <= 3
      );

      if (lowRatingItems.length > 0) {
        let resolvedMap = {};
        try {
          resolvedMap = JSON.parse(localStorage.getItem('bricolemoi_resolved_disputes') || '{}');
        } catch (e) {}

        setAdminAlerts((prev) => {
          let hasChange = false;
          const existingMap = new Map(prev.map((a) => [String(a.intervention_id || a.id).trim(), a]));
          const merged = [...prev];

          lowRatingItems.forEach((item) => {
            const cleanId = String(item.id).trim();
            const alertKey = `alert-review-${cleanId}`;
            const existingAlert = existingMap.get(cleanId) || existingMap.get(alertKey);

            // Statut persistant si déjà arbitré / résolu / rejeté
            const persistentStatus = resolvedMap[cleanId] || resolvedMap[alertKey] || item.dispute_status;

            if (!existingAlert) {
              hasChange = true;
              merged.unshift({
                id: alertKey,
                intervention_id: cleanId,
                maalem_id: item.maalem_id || '22222222-2222-2222-2222-222222222222',
                maalem_name: item.maalem_name || 'Artisan Maâlem',
                maalem_phone: item.maalem_phone || '',
                client_name: item.client_name || 'Client BricoleMoi',
                client_phone: item.client_phone || '',
                district: item.district || 'Casablanca',
                rating: Number(item.rating),
                comment: item.comment || `Avis ${item.rating}★ laissé par le client.`,
                reason_label: `Avis Insatisfaisant (${item.rating}⭐)`,
                status: persistentStatus || 'PENDING',
                created_at: item.created_at || new Date().toISOString()
              });
            } else if (persistentStatus && existingAlert.status !== persistentStatus) {
              existingAlert.status = persistentStatus;
              hasChange = true;
            }
          });

          if (hasChange) {
            try {
              localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(merged));
            } catch (e) { }
            return merged;
          }
          return prev;
        });
      }
    }, [interventions]);

    // Alias public pour refresh manuel depuis l'UI
    const refreshData = () => fetchRealSupabaseData();

    // Multi-Channel Realtime Sync Handler (BroadcastChannel + LocalStorage Event + Polling)
    useEffect(() => {
      if (typeof window === 'undefined') return;

      const handleSyncPayload = (data) => {
        if (!data || !data.type) return;

        // Évite le double traitement dans l'onglet émetteur
        if (data._origin_tab && data._origin_tab === getTabId()) {
          return;
        }

        if (data.type === 'PROFILE_UPDATED' || data.type === 'NEW_CLIENT_REGISTERED') {
          fetchRealSupabaseData();
        } else if (data.type === 'NEW_MAALEM_REGISTERED' && data.maalem) {
          const newM = data.maalem;
          setMaalems((prev) => [newM, ...prev.filter((m) => m.id !== newM.id)]);
          if (isCurrentUserAdmin()) {
            notify.info('Nouveau Maâlem Inscrit 🎉', `${newM.full_name} (${newM.district || 'Maroc'}) a rejoint le réseau.`, { id: `new-maalem-${newM.id}` });
          }
        } else if (data.type === 'NEW_INTERVENTION_CREATED' && data.intervention) {
          const item = data.intervention;
          setInterventions((prev) => [item, ...prev.filter((i) => i.id !== item.id)]);
          if (isCurrentUserEligibleMaalemForNewJob(item)) {
            notify.sos(
              `🚨 URGENCE SOS : ${item.subcategory || item.service_type}`,
              `Nouvelle demande à ${item.district || 'Proximité'}. Touchez pour consulter le chantier.`,
              { id: `sos-${item.id}` }
            );
          }
        } else if (data.type === 'INTERVENTION_ACCEPTED' && data.intervention) {
          const item = data.intervention;
          setInterventions((prev) => {
            const updated = prev.map((i) => (String(i.id).trim() === String(item.id).trim() ? { ...i, ...item } : i));
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserClientOf(item)) {
            notify.success(
              'Artisan en Route 🛠️',
              `L'artisan ${item.maalem_name || 'Maâlem'} a pris en charge votre demande de dépannage !`,
              { id: `job-accepted-${item.id}`, badge: 'Confirmé' }
            );
          }
        } else if (data.type === 'INTERVENTION_PROGRESS_UPDATED') {
          const { intervention_id, progress_step } = data;
          let targetIntv = null;
          setInterventions((prev) => {
            const updated = prev.map((i) => {
              if (String(i.id).trim() === String(intervention_id).trim()) {
                targetIntv = { ...i, progress_step };
                return targetIntv;
              }
              return i;
            });
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserClientOf(targetIntv || { id: intervention_id })) {
            if (progress_step === 'ON_THE_WAY') {
              notify.progress('ON_THE_WAY', 'Maâlem en route', 'Votre Maâlem est en route vers votre domicile.', { id: `progress-ontheway-${intervention_id}` });
            } else if (progress_step === 'ARRIVED') {
              notify.progress('ARRIVED', 'Maâlem arrivé sur place', 'Votre Maâlem est arrivé pour effectuer le diagnostic.', { id: `progress-arrived-${intervention_id}` });
            }
          }
        } else if (data.type === 'WORK_COMPLETION_REQUESTED') {
          const id = data.intervention_id;
          const finalPrice = data.final_agreed_price;
          let targetIntv = null;
          setInterventions((prev) => {
            const updated = prev.map((i) => {
              if (String(i.id).trim() === String(id).trim()) {
                targetIntv = { ...i, status: 'PENDING_COMPLETION', final_agreed_price: finalPrice || i.final_agreed_price };
                return targetIntv;
              }
              return i;
            });
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserClientOf(targetIntv || { id })) {
            notify.info(
              'Fin de Travaux Signalée ✨',
              `L'artisan a terminé l'intervention (${finalPrice ? `${finalPrice} DH` : 'devis convenu'}). Veuillez confirmer.`,
              { id: `work-completion-${id}`, badge: 'Validation Requise' }
            );
          }
        } else if (data.type === 'INTERVENTION_COMPLETED_WITH_REVIEW') {
          const { intervention_id, rating, comment } = data;
          let targetIntv = null;
          setInterventions((prev) => {
            const updated = prev.map((i) => {
              if (String(i.id).trim() === String(intervention_id).trim()) {
                targetIntv = { ...i, status: 'COMPLETED', rating, comment };
                return targetIntv;
              }
              return i;
            });
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserAssignedMaalemOf(targetIntv || { id: intervention_id })) {
            const rScore = Number(rating) || 5;
            const emoji = rScore >= 5 ? '🏆' : rScore >= 4 ? '⭐' : rScore === 3 ? '👍' : '💬';
            notify.success(
              `Avis ${rScore}★ Client Reçu ${emoji}`,
              `Le client a validé les travaux et laissé une note de ${rScore} étoile${rScore > 1 ? 's' : ''} !`,
              { badge: `+1 Job (${rScore}/5 ⭐)` }
            );
          }
        } else if (data.type === 'INTERVENTION_UNFEASIBLE') {
          const { intervention_id, reason, notes, client_id } = data;
          let targetIntv = null;
          setInterventions((prev) => {
            const updated = prev.map((i) => {
              if (String(i.id).trim() === String(intervention_id).trim()) {
                targetIntv = { ...i, status: 'UNFEASIBLE', unfeasible_reason: reason, unfeasible_notes: notes, escrow_status: 'RELEASED' };
                return targetIntv;
              }
              return i;
            });
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserClientOf(targetIntv || { id: intervention_id, client_id })) {
            notify.warning(
              'Mission Non Réalisée ℹ️',
              `L'artisan a signalé une impossibilité (${reason || 'imprévu'}). Vous pouvez relancer un SOS immédiatement.`,
              { id: `job-unfeasible-${intervention_id}`, duration: 7000 }
            );
          }
        } else if (data.type === 'INTERVENTION_RELAUNCHED' && data.intervention) {
          const item = data.intervention;
          setInterventions((prev) => {
            const updated = prev.map((i) => (String(i.id).trim() === String(item.id).trim() ? { ...i, ...item } : i));
            try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserEligibleMaalemForNewJob(item)) {
            notify.sos(
              `🚨 URGENCE SOS RELANCÉE : ${item.subcategory || item.service_type}`,
              `Nouvelle demande disponible à ${item.district || 'Proximité'}. Touchez pour consulter le chantier.`,
              { id: `sos-${item.id}` }
            );
          }
        } else if (data.type === 'RECHARGE_SUBMITTED') {
          const { transaction, rechargeAmount, maalemName, paymentMethod } = data;
          setTransactions((prev) => [transaction, ...prev.filter((t) => t.id !== transaction.id)]);
          if (isCurrentUserAdmin()) {
            const notif = {
              id: 'notif-' + Date.now(),
              type: 'RECHARGE',
              title: `💳 Demande de Recharge (${rechargeAmount} DH)`,
              message: `L'artisan ${maalemName} a rechargé ${rechargeAmount} DH (${paymentMethod}).`,
              created_at: new Date().toISOString()
            };
            setAdminNotifications((prev) => [notif, ...prev]);
            notify.info(
              'Demande de Recharge 💳',
              `${maalemName} (+${rechargeAmount} DH via ${paymentMethod})`,
              { badge: 'Admin Notification' }
            );
          }
        } else if (data.type === 'RECHARGE_APPROVED') {
          const { transactionId, maalemId, amountDh } = data;
          setTransactions((prev) =>
            prev.map((t) => (t.id === transactionId ? { ...t, status: 'VALIDATED' } : t))
          );
          setMaalems((prev) =>
            prev.map((m) =>
              m.id === maalemId ? { ...m, credit_balance: (parseFloat(m.credit_balance) || 0) + amountDh } : m
            )
          );
          if (isCurrentUserMaalemOfTransaction(maalemId)) {
            const currUser = userRef.current;
            const currentBal = (parseFloat(currUser?.maalem_details?.credit_balance || currUser?.credits || 0)) + amountDh;
            const updatedUser = {
              ...currUser,
              credits: currentBal,
              maalem_details: {
                ...(currUser?.maalem_details || {}),
                credit_balance: currentBal
              }
            };
            setUser(updatedUser);
            try {
              sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
            } catch (e) { }
            notify.credit(amountDh, currentBal, 'Recharge Validée par l\'Admin');
          }
        } else if (data.type === 'RECHARGE_REJECTED') {
          const { transactionId, reference_ref, maalemId, reason } = data;
          setTransactions((prev) => {
            const updated = prev.map((t) =>
              (String(t.id).trim() === String(transactionId).trim() || (reference_ref && String(t.reference_ref).trim().toLowerCase() === String(reference_ref).trim().toLowerCase()))
                ? { ...t, status: 'REJECTED', admin_notes: reason }
                : t
            );
            try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
            return updated;
          });
          if (isCurrentUserMaalemOfTransaction(maalemId)) {
            notify.error(
              'Recharge Non Validée ❌',
              `Votre demande de recharge a été refusée par l'Admin (Motif : ${reason})`
            );
          }
        } else if (data.type === 'CIN_REJECTED') {
          const { maalemId, reason } = data;
          setMaalems((prev) =>
            prev.map((m) => (m.id === maalemId ? { ...m, is_verified: false, cin_verified: false, cin_rejection_reason: reason } : m))
          );
          if (isCurrentUserMaalemOfTransaction(maalemId)) {
            const currUser = userRef.current;
            setUser((prev) => ({
              ...prev,
              maalem_details: { ...(prev?.maalem_details || {}), is_verified: false, cin_verified: false, cin_rejection_reason: reason }
            }));
            notify.error(
              'Dossier CIN Refusé ❌',
              `Motif : ${reason}. Veuillez re-soumettre des photos lisibles et nettes.`
            );
          }
        } else if (data.type === 'MAALEM_BALANCE_UPDATED') {
          const { maalemId, newBalance, amount, txType, notes } = data;
          const cleanMId = String(maalemId || '').trim();
          setMaalems((prev) =>
            prev.map((m) => (String(m.id).trim() === cleanMId ? { ...m, credit_balance: newBalance } : m))
          );
          const currUser = userRef.current;
          if (currUser && (String(currUser.id).trim() === cleanMId || isCurrentUserMaalemOfTransaction(cleanMId))) {
            const updatedUser = {
              ...currUser,
              credits: newBalance,
              maalem_details: {
                ...(currUser?.maalem_details || {}),
                credit_balance: newBalance
              }
            };
            setUser(updatedUser);
            try {
              sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
            } catch (e) { }
            notify.credit(amount || 15, newBalance, notes || (txType === 'DEBIT' ? 'Débit Lead SOS' : 'Crédit Solde 🎁'), { id: `balance-update-${cleanMId}` });
          }
        } else if (data.type === 'NEW_DISPUTE_REPORTED' && data.alert) {
          const { alert } = data;
          setAdminAlerts((prev) => {
            const next = [alert, ...prev.filter(a => a.id !== alert.id)];
            try { localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next)); } catch (e) {}
            return next;
          });
          if (isCurrentUserAdmin()) {
            notify.warning(
              'Signalement / Litige Reçu ⚠️',
              alert.reason_label || `Alerte transmise pour l'intervention de ${alert.client_name || 'Client'}`
            );
          }
        } else if (data.type === 'DISPUTE_RESOLVED') {
          const { alertId, interventionId, status } = data;
          setAdminAlerts((prev) => {
            const next = prev.map((a) =>
              (String(a.id).trim() === String(alertId).trim() || String(a.intervention_id).trim() === String(interventionId).trim())
                ? { ...a, status, resolved_at: new Date().toISOString() }
                : a
            );
            try { localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next)); } catch (e) {}
            return next;
          });
        } else if (data.type === 'MAALEM_HEARTBEAT' && data.maalem_id) {
          updateOnlineMaalemInStorage(data.maalem_id, true, {
            full_name: data.full_name,
            specialty: data.specialty,
            lat: data.lat,
            lng: data.lng
          });
          setMaalems((prev) => {
            const exists = prev.some((m) => String(m.id).trim() === String(data.maalem_id).trim());
            if (exists) {
              return prev.map((m) =>
                String(m.id).trim() === String(data.maalem_id).trim()
                  ? {
                    ...m,
                    is_online: true,
                    is_available: true,
                    lat: data.lat || m.lat,
                    lng: data.lng || m.lng,
                    last_seen_at: data.last_seen_at || Date.now()
                  }
                  : m
              );
            } else {
              return [
                {
                  id: data.maalem_id,
                  full_name: data.full_name || 'Artisan Maalem',
                  specialty: data.specialty || 'PLUMBING',
                  rating_avg: 5.0,
                  is_verified: true,
                  is_online: true,
                  is_available: true,
                  lat: data.lat,
                  lng: data.lng,
                  last_seen_at: data.last_seen_at || Date.now()
                },
                ...prev
              ];
            }
          });
        } else if (data.type === 'MAALEM_STATUS_CHANGED' && data.maalem_id) {
          updateOnlineMaalemInStorage(data.maalem_id, data.is_online);
          setMaalems((prev) =>
            prev.map((m) =>
              String(m.id).trim() === String(data.maalem_id).trim()
                ? { ...m, is_online: data.is_online, is_available: data.is_available, last_seen_at: Date.now() }
                : m
            )
          );
        } else if (data.type === 'PURGE_ALL_DATA') {
          setMaalems([]);
          setInterventions([]);
          setTransactions([]);
          try { 
            localStorage.removeItem('bricolemoi_interventions_cache'); 
            localStorage.removeItem('bricolemoi_transactions_cache');
          } catch (e) { }
        }
      };

      // Canal 1 : BroadcastChannel
      let bc;
      try {
        bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.onmessage = (event) => handleSyncPayload(event.data);
      } catch (e) { }

      // Canal 2 : Native Storage Event (Infaillible inter-onglets & iframes)
      const onStorageChange = (e) => {
        if (e.key === 'bricolemoi_sync_payload' && e.newValue) {
          try {
            const payload = JSON.parse(e.newValue);
            handleSyncPayload(payload);
          } catch (err) { }
        }
      };
      window.addEventListener('storage', onStorageChange);

      return () => {
        if (bc) bc.close();
        window.removeEventListener('storage', onStorageChange);
      };
    }, []);

    // Ably Realtime — Stream d'interventions, progression live & alertes SOS ultra-rapides (<50ms)
    useEffect(() => {
      const unsubscribeAblyStream = subscribeToRealtimeChannel(
        ABLY_CHANNELS.JOBS_STREAM,
        ({ event, payload }) => {
          if (!payload) return;

          if (event === 'new_job') {
            setInterventions((prev) => {
              const updated = [payload, ...prev.filter((i) => String(i.id).trim() !== String(payload.id).trim())];
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserEligibleMaalemForNewJob(payload)) {
              playNotificationSound('emergency');
              const specialtyName =
                payload.service_type === 'PLUMBING' ? 'Plomberie 🚰' :
                  payload.service_type === 'AUTO_MECHANIC' ? 'Mécanique Auto 🚗' : 'Urgence 🛠️';
              toast.error(`🚨 Nouvelle urgence ${specialtyName} en direct (Ably) ! (${payload.district || 'Proximité'})`, {
                duration: 6000,
                icon: '🚨'
              });
            }
          } else if (event === 'job_accepted' && payload.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = {
                    ...i,
                    status: 'ACCEPTED',
                    maalem_id: payload.maalem_id,
                    maalem_name: payload.maalem_name,
                    maalem_phone: payload.maalem_phone,
                    accepted_at: payload.accepted_at || new Date().toISOString(),
                    progress_step: payload.progress_step || 'ON_THE_WAY'
                  };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserClientOf(targetIntv || { id: payload.intervention_id, client_id: payload.client_id })) {
              notify.success(
                'Artisan en Route 🛠️',
                `Un artisan Maâlem (${payload.maalem_name || 'Artisan'}) a pris en charge votre urgence !`,
                { id: `job-accepted-${payload.intervention_id}`, badge: 'Confirmé' }
              );
            }
          } else if (event === 'job_progress_updated' && payload.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, progress_step: payload.progress_step };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserClientOf(targetIntv || { id: payload.intervention_id })) {
              if (payload.progress_step === 'ON_THE_WAY') {
                notify.progress('ON_THE_WAY', 'Maâlem en route', 'Votre Maâlem est en route vers votre domicile.', { id: `progress-ontheway-${payload.intervention_id}` });
              } else if (payload.progress_step === 'ARRIVED') {
                notify.progress('ARRIVED', 'Maâlem arrivé sur place', 'Votre Maâlem est arrivé pour effectuer le diagnostic.', { id: `progress-arrived-${payload.intervention_id}` });
              }
            }
          } else if (event === 'work_completion_requested' && payload.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, status: 'PENDING_COMPLETION', final_agreed_price: payload.final_agreed_price || i.final_agreed_price };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserClientOf(targetIntv || { id: payload.intervention_id })) {
              notify.info(
                'Travaux Terminés ✨',
                `L'artisan a terminé l'intervention (${payload.final_agreed_price ? `${payload.final_agreed_price} DH` : 'devis convenu'}). Veuillez confirmer.`,
                { id: `work-completion-${payload.intervention_id}`, badge: 'Validation Requise' }
              );
            }
          } else if (event === 'job_completed' && payload.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, status: 'COMPLETED' };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserAssignedMaalemOf(targetIntv || { id: payload.intervention_id })) {
              notify.success(
                'Travaux Validés 🏆',
                'Accomplissement des travaux validé par le client !',
                { id: `job-completed-${payload.intervention_id}`, badge: 'Succès' }
              );
            }
          } else if (event === 'maalem_status_changed' && payload.maalem_id) {
            setMaalems((prev) =>
              prev.map((m) =>
                String(m.id).trim() === String(payload.maalem_id).trim()
                  ? { ...m, is_online: payload.is_online, is_available: payload.is_available, last_seen_at: Date.now() }
                  : m
              )
            );
          }
        },
        user?.id
      );

      return () => {
        unsubscribeAblyStream();
      };
    }, [user?.id]);

    // Supabase REST Changes — synchronisation des données persistées (profiles, transactions)
    useEffect(() => {
      if (!isSupabaseConfigured) return;

      // 1. Interventions (radar temps réel & progression live)
      const jobsChannel = supabase
        .channel('public:jobs')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'interventions' },
          (payload) => {
            if (payload.eventType === 'INSERT' && payload.new) {
              setInterventions((prev) => {
                const updated = [payload.new, ...prev.filter((i) => String(i.id).trim() !== String(payload.new.id).trim())];
                try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
                return updated;
              });
              if (isCurrentUserEligibleMaalemForNewJob(payload.new)) {
                const specialtyName =
                  payload.new.service_type === 'PLUMBING' ? 'Plomberie 🚰' :
                    payload.new.service_type === 'AUTO_MECHANIC' ? 'Mécanique Auto 🚗' : 'Urgence 🛠️';
                notify.sos(
                  `🚨 Nouvelle urgence ${specialtyName}`,
                  `Nouvelle demande à ${payload.new.district || 'Proximité'}. Touchez pour consulter le chantier.`,
                  { id: `sos-${payload.new.id}` }
                );
              }
            } else if (payload.eventType === 'UPDATE' && payload.new) {
              setInterventions((prev) => {
                const updated = prev.map((item) => {
                  if (String(item.id).trim() === String(payload.new.id).trim()) {
                    return {
                      ...item,
                      ...payload.new,
                      maalem_name: payload.new.maalem_name || item.maalem_name,
                      maalem_phone: payload.new.maalem_phone || item.maalem_phone
                    };
                  }
                  return item;
                });
                try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
                return updated;
              });

              if (payload.new.status === 'ACCEPTED') {
                if (isCurrentUserClientOf(payload.new)) {
                  notify.success(
                    'Artisan en Route 🛠️',
                    `Un artisan (${payload.new.maalem_name || 'Maâlem'}) a pris en charge votre demande !`,
                    { id: `job-accepted-${payload.new.id}`, badge: 'Confirmé' }
                  );
                }
              } else if (payload.new.progress_step === 'ON_THE_WAY') {
                if (isCurrentUserClientOf(payload.new)) {
                  notify.progress('ON_THE_WAY', 'Maâlem en route', 'Votre Maâlem est en route vers votre domicile.', { id: `progress-ontheway-${payload.new.id}` });
                }
              } else if (payload.new.progress_step === 'ARRIVED') {
                if (isCurrentUserClientOf(payload.new)) {
                  notify.progress('ARRIVED', 'Maâlem arrivé sur place', 'Votre Maâlem est arrivé pour effectuer le diagnostic.', { id: `progress-arrived-${payload.new.id}` });
                }
              } else if (payload.new.status === 'PENDING_COMPLETION') {
                if (isCurrentUserClientOf(payload.new)) {
                  notify.info(
                    'Travaux Terminés ✨',
                    `Travaux terminés (${payload.new.final_agreed_price ? `${payload.new.final_agreed_price} DH` : 'devis convenu'}). Veuillez confirmer.`,
                    { id: `work-completion-${payload.new.id}`, badge: 'Validation Requise' }
                  );
                }
              } else if (payload.new.status === 'COMPLETED') {
                if (isCurrentUserAssignedMaalemOf(payload.new)) {
                  notify.success(
                    'Travaux Validés 🏆',
                    'Accomplissement des travaux validé par le client !',
                    { id: `job-completed-${payload.new.id}`, badge: 'Succès' }
                  );
                }
              }
            } else if (payload.eventType === 'DELETE' && payload.old) {
              setInterventions((prev) => {
                const updated = prev.filter((item) => String(item.id).trim() !== String(payload.old.id).trim());
                try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
                return updated;
              });
            }
          }
        )
        .on('broadcast', { event: 'new_job' }, ({ payload }) => {
          if (payload) {
            setInterventions((prev) => {
              const updated = [payload, ...prev.filter((i) => String(i.id).trim() !== String(payload.id).trim())];
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserEligibleMaalemForNewJob(payload)) {
              notify.sos(
                '🚨 Nouvelle urgence SOS reçue en direct !',
                `Nouvelle demande à ${payload.district || 'Proximité'}.`,
                { id: `sos-${payload.id}` }
              );
            }
          }
        })
        .on('broadcast', { event: 'job_progress_updated' }, ({ payload }) => {
          if (payload?.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, progress_step: payload.progress_step };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserClientOf(targetIntv || { id: payload.intervention_id })) {
              if (payload.progress_step === 'ON_THE_WAY') {
                notify.progress('ON_THE_WAY', 'Maâlem en route', 'Votre Maâlem est en route vers votre domicile.', { id: `progress-ontheway-${payload.intervention_id}` });
              } else if (payload.progress_step === 'ARRIVED') {
                notify.progress('ARRIVED', 'Maâlem arrivé sur place', 'Votre Maâlem est arrivé pour effectuer le diagnostic.', { id: `progress-arrived-${payload.intervention_id}` });
              }
            }
          }
        })
        .on('broadcast', { event: 'work_completion_requested' }, ({ payload }) => {
          if (payload?.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, status: 'PENDING_COMPLETION', final_agreed_price: payload.final_agreed_price || i.final_agreed_price };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserClientOf(targetIntv || { id: payload.intervention_id })) {
              notify.info(
                'Travaux Terminés ✨',
                `Travaux terminés (${payload.final_agreed_price ? `${payload.final_agreed_price} DH` : 'devis convenu'}). Veuillez confirmer.`,
                { id: `work-completion-${payload.intervention_id}`, badge: 'Validation Requise' }
              );
            }
          }
        })
        .on('broadcast', { event: 'job_completed' }, ({ payload }) => {
          if (payload?.intervention_id) {
            let targetIntv = null;
            setInterventions((prev) => {
              const updated = prev.map((i) => {
                if (String(i.id).trim() === String(payload.intervention_id).trim()) {
                  targetIntv = { ...i, status: 'COMPLETED' };
                  return targetIntv;
                }
                return i;
              });
              try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
              return updated;
            });
            if (isCurrentUserAssignedMaalemOf(targetIntv || { id: payload.intervention_id })) {
              notify.success(
                'Travaux Validés 🏆',
                'Accomplissement des travaux validé par le client !',
                { id: `job-completed-${payload.intervention_id}`, badge: 'Succès' }
              );
            }
          }
        })
        .on('broadcast', { event: 'maalem_heartbeat' }, ({ payload }) => {
          if (payload?.maalem_id) {
            setMaalems((prev) => {
              const exists = prev.some((m) => String(m.id).trim() === String(payload.maalem_id).trim());
              if (exists) {
                return prev.map((m) =>
                  String(m.id).trim() === String(payload.maalem_id).trim()
                    ? {
                      ...m,
                      is_online: true,
                      is_available: true,
                      lat: payload.lat || m.lat,
                      lng: payload.lng || m.lng,
                      last_seen_at: payload.last_seen_at || Date.now()
                    }
                    : m
                );
              } else {
                return [
                  {
                    id: payload.maalem_id,
                    full_name: payload.full_name || 'Artisan Maalem',
                    specialty: payload.specialty || 'PLUMBING',
                    rating_avg: 5.0,
                    is_verified: true,
                    is_online: true,
                    is_available: true,
                    lat: payload.lat,
                    lng: payload.lng,
                    last_seen_at: payload.last_seen_at || Date.now()
                  },
                  ...prev
                ];
              }
            });
          }
        })
        .on('broadcast', { event: 'maalem_status_changed' }, ({ payload }) => {
          if (payload?.maalem_id) {
            setMaalems((prev) =>
              prev.map((m) =>
                String(m.id).trim() === String(payload.maalem_id).trim()
                  ? { ...m, is_online: payload.is_online, is_available: payload.is_available, last_seen_at: Date.now() }
                  : m
              )
            );
          }
        })
        .subscribe();

      // 2. Profiles & maalem_details (sync solde, vérification CIN)
      const profilesChannel = supabase
        .channel('public:profiles')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'profiles' },
          (payload) => {
            if (!payload.new) return;
            const isMaalem = String(payload.new.role || '').toUpperCase() === 'MAALEM';

            if (isMaalem) {
              setMaalems((prev) => {
                const exists = prev.some((m) => m.id === payload.new.id);
                if (exists) {
                  return prev.map((m) =>
                    m.id === payload.new.id
                      ? {
                        ...m,
                        full_name: payload.new.full_name || m.full_name,
                        phone: payload.new.phone || m.phone,
                        credit_balance: payload.new.credits ?? m.credit_balance,
                        district: payload.new.city_zone || m.district
                      }
                      : m
                  );
                }
                return [
                  {
                    id: payload.new.id,
                    full_name: payload.new.full_name || 'Artisan Maalem',
                    phone: payload.new.phone || '',
                    specialty: 'PLUMBING',
                    rating_avg: 5.0,
                    is_verified: false,
                    cin_verified: false,
                    credit_balance: payload.new.credits ?? 0,
                    district: payload.new.city_zone || 'Casablanca'
                  },
                  ...prev
                ];
              });
              if (payload.eventType === 'INSERT' && isCurrentUserAdmin()) {
                notify.info('Nouveau Maâlem Inscrit 🎉', `${payload.new.full_name} (${payload.new.city_zone || 'Maroc'}) a rejoint le réseau.`, { id: `new-maalem-${payload.new.id}` });
              }
            }

            // Sync solde de l'utilisateur connecté
            const currUser = userRef.current;
            if (currUser && currUser.id === payload.new.id) {
              setUser((prevUser) => ({
                ...prevUser,
                credits: payload.new.credits ?? prevUser?.credits,
                maalem_details: prevUser?.maalem_details
                  ? {
                    ...prevUser.maalem_details,
                    credit_balance: payload.new.credits ?? prevUser.maalem_details.credit_balance
                  }
                  : undefined
              }));
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'maalem_details' },
          (payload) => {
            if (!payload.new) return;

            // Sync liste maalems
            setMaalems((prev) =>
              prev.map((m) =>
                m.id === payload.new.id
                  ? {
                    ...m,
                    specialty: payload.new.specialty || m.specialty,
                    credit_balance: payload.new.credit_balance ?? m.credit_balance,
                    is_verified: payload.new.is_verified ?? payload.new.cin_verified ?? m.is_verified ?? true,
                    cin_verified: payload.new.cin_verified ?? payload.new.is_verified ?? m.cin_verified ?? true,
                    status: payload.new.status || m.status || 'active',
                    portfolio_urls: payload.new.portfolio_urls || m.portfolio_urls || []
                  }
                  : m
              )
            );

            // Sync utilisateur connecté — le trigger DB a déjà mis à jour le solde
            const currUser = userRef.current;
            if (currUser && currUser.id === payload.new.id) {
              const updatedUser = {
                ...currUser,
                maalem_details: {
                  ...(currUser.maalem_details || {}),
                  ...payload.new,
                  cin_verified: payload.new.cin_verified ?? payload.new.is_verified ?? true,
                  is_verified: payload.new.is_verified ?? payload.new.cin_verified ?? true,
                  status: payload.new.status || currUser.maalem_details?.status || 'active',
                  portfolio_urls: payload.new.portfolio_urls || currUser.maalem_details?.portfolio_urls || []
                }
              };
              setUser(updatedUser);
              // Notifier si le solde a été mis à jour par le trigger (acceptLead)
              if (payload.new.credit_balance !== undefined &&
                payload.new.credit_balance !== currUser.maalem_details?.credit_balance) {
                notify.credit(payload.new.credit_balance, payload.new.credit_balance, 'Solde mis à jour', { id: `credit-update-${payload.new.id}` });
              }
            }
          }
        )
        .subscribe();

      // 3. Transactions (sync des recharges, rejets et validations en temps réel)
      const transactionsChannel = supabase
        .channel('public:transactions')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'transactions' },
          (payload) => {
            if (payload.eventType === 'INSERT' && payload.new) {
              setTransactions((prev) => {
                const updated = [payload.new, ...prev.filter((t) => String(t.id).trim() !== String(payload.new.id).trim())];
                try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
                return updated;
              });
              if (isCurrentUserAdmin()) {
                const notif = {
                  id: 'notif-' + Date.now(),
                  type: 'RECHARGE',
                  title: `💳 Demande de Recharge (${payload.new.amount_dh} DH)`,
                  message: `Nouvelle transaction enregistrée (${payload.new.payment_method || 'Virement'}).`,
                  created_at: new Date().toISOString()
                };
                setAdminNotifications((prev) => [notif, ...prev]);
                notify.info('💳 Demande de Recharge', `Nouvelle demande reçue (${payload.new.amount_dh} DH)`, { id: `admin-recharge-${payload.new.id}` });
              }
            } else if (payload.eventType === 'UPDATE' && payload.new) {
              setTransactions((prev) => {
                const updated = prev.map((t) =>
                  (String(t.id).trim() === String(payload.new.id).trim() || (payload.new.reference_ref && String(t.reference_ref).trim().toLowerCase() === String(payload.new.reference_ref).trim().toLowerCase()))
                    ? { ...t, ...payload.new }
                    : t
                );
                try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
                return updated;
              });

              if (isCurrentUserMaalemOfTransaction(payload.new)) {
                if (String(payload.new.status).toUpperCase() === 'REJECTED') {
                  notify.error('❌ Recharge Refusée', `Réf: ${payload.new.reference_ref} (${payload.new.admin_notes || 'Non conforme'})`, { id: `tx-rej-${payload.new.id}` });
                } else if (String(payload.new.status).toUpperCase() === 'VALIDATED') {
                  notify.credit(payload.new.amount_dh, null, 'Recharge validée et créditée', { id: `tx-val-${payload.new.id}` });
                }
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(jobsChannel);
        supabase.removeChannel(profilesChannel);
        supabase.removeChannel(transactionsChannel);
      };
    }, []);

    // Vérification CIN via Edge Function Supabase (Gemini 1.5 Flash Vision côté serveur)
    const verifyMaalemCINWithGemini = async ({ maalem_id, cin_photo_url, cin_photo_verso_url, full_name, phone, cin_number_hint }) => {
      const maalemId = maalem_id || user?.id;
      const maalemName = full_name || user?.full_name;

      if (!isSupabaseConfigured || !maalemId) {
        showToast('⚠️ Supabase requis pour la vérification CIN.', 'error');
        return { success: false, error: 'Supabase non configuré' };
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-maalem-cin', {
          body: { maalem_id: maalemId, cin_photo_url, cin_photo_verso_url, full_name: maalemName, phone: phone || user?.phone, cin_number_hint }
        });

        if (error || !data?.success) {
          const errMsg = data?.error || error?.message || 'Erreur vérification CIN';
          showToast(`⚠️ ${errMsg}`, 'error');
          return data || { success: false, error: errMsg };
        }

        const newBalance = (user?.maalem_details?.credit_balance || 0) + (data.bonus_added_dh || 15.0);

        // 1. Mise à jour explicite dans Supabase maalem_details & profiles (garantie de persistance BDD)
        if (isSupabaseConfigured) {
          try {
            // Filtrer les data: URLs (base64 volumineux) pour ne garder que les vraies URLs HTTP
            const httpRectoUrl = (cin_photo_url && typeof cin_photo_url === 'string' && cin_photo_url.startsWith('http'))
              ? cin_photo_url
              : null;
            const httpVersoUrl = (cin_photo_verso_url && typeof cin_photo_verso_url === 'string' && cin_photo_verso_url.startsWith('http'))
              ? cin_photo_verso_url
              : null;

            const finalCinNumber = (cin_number_hint && String(cin_number_hint).trim())
              ? String(cin_number_hint).trim().toUpperCase()
              : data?.cin_number;

            const detailsUpdate = {
              is_verified: true,
              cin_number: finalCinNumber,
              credit_balance: newBalance
            };
            if (httpRectoUrl) {
              detailsUpdate.cin_photo_url = httpRectoUrl;
              detailsUpdate.cin_photo_recto_url = httpRectoUrl;
            }
            if (httpVersoUrl) {
              detailsUpdate.cin_photo_verso_url = httpVersoUrl;
            }

            let { error: mdErr } = await supabase.from('maalem_details').update({
              ...detailsUpdate,
              cin_verified: true
            }).eq('id', maalemId);

            // Fallback si cin_verified n'est pas dans le schéma
            if (mdErr && mdErr.message?.includes('cin_verified')) {
              const fbRes = await supabase.from('maalem_details').update(detailsUpdate).eq('id', maalemId);
              mdErr = fbRes.error;
            }
            if (mdErr) console.warn('[Supabase] maalem_details update warning:', mdErr.message);

            // Log transaction
            await supabase.from('transactions').upsert([{
              maalem_id: maalemId,
              amount_dh: data.bonus_added_dh || 15.0,
              type: 'BONUS',
              payment_method: 'WELCOME_BONUS_15DH',
              reference_ref: 'GEMINI_VISION_OCR_' + finalCinNumber,
              status: 'VALIDATED'
            }]);
          } catch (dbErr) {
            console.warn('[Supabase] verifyMaalemCIN DB update warning:', dbErr.message);
          }
        }

        const finalCinNumber = (cin_number_hint && String(cin_number_hint).trim())
          ? String(cin_number_hint).trim().toUpperCase()
          : data?.cin_number;

        // 2. Mise à jour de l'état local React (avec URLs distinctes Recto / Verso)
        const updatedUser = {
          ...user,
          cin_verified: true,
          is_verified: true,
          cin_number: finalCinNumber,
          maalem_details: {
            ...(user?.maalem_details || {}),
            cin_verified: true,
            is_verified: true,
            cin_number: finalCinNumber,
            cin_photo_url: cin_photo_url,
            cin_photo_recto_url: cin_photo_url,
            cin_photo_verso_url: cin_photo_verso_url,
            credit_balance: newBalance
          }
        };
        setUser(updatedUser);

        setMaalems((prev) =>
          prev.map((m) =>
            m.id === maalemId
              ? {
                ...m,
                cin_verified: true,
                is_verified: true,
                cin_number: finalCinNumber,
                cin_photo_url: cin_photo_url,
                cin_photo_recto_url: cin_photo_url,
                cin_photo_verso_url: cin_photo_verso_url,
                credit_balance: newBalance
              }
              : m
          )
        );

        setTransactions((prev) => [
          {
            id: 'tx-welcome-' + Date.now(),
            maalem_id: maalemId,
            maalem_name: maalemName,
            amount_dh: data.bonus_added_dh || 15.0,
            type: 'BONUS',
            payment_method: 'WELCOME_BONUS_15DH',
            reference_ref: 'GEMINI_VISION_OCR_' + data.cin_number,
            status: 'VALIDATED',
            created_at: new Date().toISOString()
          },
          ...prev
        ]);

        setWhatsappMsg(data.whatsapp_message);
        showToast(`🤖 CIN ${data.cin_number} vérifiée ! +${data.bonus_added_dh || 15} DH offerts 🎁`, 'success');

        return data;
      } catch (err) {
        console.warn('[Supabase] Edge Function verify-maalem-cin error:', err.message);
        showToast('⚠️ Erreur lors de l\'appel à l\'Edge Function.', 'error');
        return { success: false, error: err.message };
      }
    };

    // Création d'une intervention SOS avec fourchette de prix
    const createIntervention = async ({
      service_type = 'PLUMBING',
      subcategory = '',
      district = 'Casablanca - Maarif',
      lat,
      lng,
      description_photo,
      audio_note_url
    }) => {
      const defaultLat = lat || 33.5883;
      const defaultLng = lng || -7.6328;

      const priceRanges = {
        PLUMBING: [120, 180],
        AUTO_MECHANIC: [180, 300],
        ELECTRICIAN: [150, 250],
        JARDINAGE: [140, 220],
        NETTOYAGE: [100, 200],
        SERRURERIE: [150, 280],
        CLIMATISATION: [180, 320]
      };
      const [minPrice, maxPrice] = priceRanges[service_type] || [120, 180];

      const defaultPhotosByService = {
        ELECTRICIAN: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        PLUMBING: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
        AUTO_MECHANIC: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
        CLIMATISATION: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80'
      };

      const finalPhoto = description_photo || defaultPhotosByService[service_type] || defaultPhotosByService.PLUMBING;

      const validUuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const generatedId = crypto?.randomUUID?.() || ('10000000-0000-0000-0000-' + Date.now());
      const validClientId = user?.id && validUuidPattern.test(user.id) ? user.id : '11111111-1111-1111-1111-111111111111';

      const dbPayload = {
        id: generatedId,
        client_id: validClientId,
        service_type: (service_type || 'PLUMBING').toUpperCase(),
        subcategory: subcategory,
        district: district || 'Casablanca - Maarif',
        lat: defaultLat,
        lng: defaultLng,
        description_photo: finalPhoto,
        audio_note_url: audio_note_url || null,
        estimated_price_min: minPrice,
        estimated_price_max: maxPrice,
        devis_confirmed: false,
        status: 'PENDING',
        cost_lead: 15.00
      };

      const newIntervention = {
        ...dbPayload,
        subcategory,
        client_name: user?.full_name || 'Client Maroc',
        client_phone: user?.phone || '',
        lat: defaultLat,
        lng: defaultLng,
        created_at: new Date().toISOString()
      };

      // Mise à jour optimiste immédiate de l'état local + cache (remplace tout ancien SOS en attente de ce client)
      setInterventions((prev) => {
        const filtered = prev.filter((i) => !(String(i.client_id || '').trim() === String(validClientId).trim() && i.status === 'PENDING'));
        const updated = [newIntervention, ...filtered.filter((i) => String(i.id).trim() !== String(newIntervention.id).trim())];
        try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // Mémoriser sur cet appareil que cette intervention a été créée par ce client
      try {
        const myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
        if (!myCreated.includes(String(generatedId).trim())) {
          myCreated.push(String(generatedId).trim());
          localStorage.setItem('bricolemoi_my_created_leads', JSON.stringify(myCreated));
        }
      } catch (e) { }

      const payload = { type: 'NEW_INTERVENTION_CREATED', intervention: newIntervention, _ts: Date.now() };
      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          let { data, error } = await supabase.from('interventions').insert([dbPayload]).select();

          // Fallback si subcategory ou une colonne n'existe pas encore dans la table BDD
          if (error && (error.message?.includes('subcategory') || error.message?.includes('column') || error.message?.includes('check constraint'))) {
            const minimalPayload = {
              id: generatedId,
              client_id: validClientId,
              service_type: ['PLUMBING', 'AUTO_MECHANIC'].includes(dbPayload.service_type) ? dbPayload.service_type : 'PLUMBING',
              district: dbPayload.district,
              description_photo: dbPayload.description_photo,
              audio_note_url: dbPayload.audio_note_url,
              estimated_price_min: minPrice,
              estimated_price_max: maxPrice,
              status: 'PENDING',
              cost_lead: 15.00
            };
            const fb = await supabase.from('interventions').insert([minimalPayload]).select();
            data = fb.data;
            error = fb.error;
          }

          if (error) {
            console.warn('[Supabase] Intervention insert warning:', error.message);
          } else if (data?.[0]) {
            const inserted = { ...newIntervention, ...data[0] };
            setInterventions((prev) => [inserted, ...prev.filter(i => i.id !== inserted.id)]);
          }

          // Broadcast Ably Realtime : JOBS_STREAM + Canaux SOS Géographiques ciblés (<50ms)
          const cityName = String(district || '').split('-')[0]?.trim() || 'Casablanca';
          publishRealtimeEvent('new_job', newIntervention);
          publishRealtimeEvent('sos:alert', { intervention: newIntervention }, ABLY_CHANNELS.getSosChannel(cityName, newIntervention.service_type));
          publishRealtimeEvent('sos:alert', { intervention: newIntervention }, ABLY_CHANNELS.getSosCityChannel(cityName));
        } catch (err) {
          console.warn('[Supabase] Intervention insert exception:', err.message);
        }
      }

      showToast('🚨 SOS Dépannage envoyé ! Les Maalems sont notifiés en direct sur la carte radar.', 'success');
      return newIntervention;
    };

    // Client confirme le devis avant démarrage des travaux
    const confirmFinalDevis = (interventionId, finalPrice) => {
      setInterventions((prev) =>
        prev.map((item) =>
          item.id === interventionId
            ? { ...item, final_agreed_price: finalPrice, devis_confirmed: true }
            : item
        )
      );

      if (finalPrice > 300) {
        showToast(`⚠️ Devis de ${finalPrice} DH confirmé avec avertissement de sécurité (> 300 DH).`, 'warning');
      } else {
        showToast(`✅ Devis final de ${finalPrice} DH confirmé ! Les travaux peuvent commencer.`, 'success');
      }
    };

    // ==============================================================================
    // SYSTÈME DE LEAD EN INSTANCE (LEAD ESCROW) — ZÉRO RISQUE ARTISANS
    // ==============================================================================

    // 1. Réserver 15 DH en Escrow pour un Lead (statut RESERVED)
    const reserveLeadCredit = async (interventionId, customMaalemId = null, amount = 15.00) => {
      const maalemId = customMaalemId || user?.id;
      const maalemName = user?.full_name || 'Artisan Maalem';
      const cleanIntId = String(interventionId).trim();
      const ref = `ESCROW_INT_${cleanIntId}`;

      const newTx = {
        id: `tx-escrow-${cleanIntId}-${Date.now()}`,
        maalem_id: maalemId,
        maalem_name: maalemName,
        maalem_phone: user?.phone || '',
        amount_dh: -Math.abs(amount),
        type: 'LEAD_ESCROW',
        payment_method: 'SYSTEM_ESCROW',
        reference_ref: ref,
        status: 'RESERVED',
        admin_notes: `Garantie 15 DH en attente pour mission #${cleanIntId}`,
        created_at: new Date().toISOString()
      };

      setTransactions((prev) => [newTx, ...prev.filter((t) => t.reference_ref !== ref)]);

      if (isSupabaseConfigured && maalemId) {
        try {
          const { error: insErr } = await supabase.from('transactions').insert([{
            maalem_id: maalemId,
            amount_dh: -Math.abs(amount),
            type: 'LEAD_ESCROW',
            payment_method: 'SYSTEM_ESCROW',
            reference_ref: ref,
            status: 'RESERVED',
            admin_notes: `Garantie 15 DH en attente pour mission #${cleanIntId}`
          }]);
          if (insErr) {
            await supabase.from('transactions').update({
              status: 'RESERVED',
              amount_dh: -Math.abs(amount),
              admin_notes: `Garantie 15 DH en attente pour mission #${cleanIntId}`
            }).eq('reference_ref', ref);
          }
        } catch (e) {
          console.warn('[Supabase] reserveLeadCredit warning:', e?.message);
        }
      }
    };

    // 2. Confirmer le débit définitif de 15 DH (sur fin de travaux / review validée)
    const confirmLeadDebit = async (interventionId, customMaalemId = null, amount = 15.00) => {
      const cleanIntId = String(interventionId).trim();
      const ref = `ESCROW_INT_${cleanIntId}`;

      setTransactions((prev) =>
        prev.map((t) => {
          if (t.reference_ref === ref || (t.type === 'LEAD_ESCROW' && t.reference_ref?.includes(cleanIntId))) {
            return {
              ...t,
              status: 'VALIDATED',
              type: 'LEAD_DEDUCTION',
              admin_notes: `Débit confirmé après réalisation des travaux #${cleanIntId}`
            };
          }
          return t;
        })
      );

      // Mettre à jour credit_balance du Maâlem en local si connecté
      if (user?.role === 'MAALEM' && user?.maalem_details) {
        const currentBal = Number(user.maalem_details.credit_balance || user.credits || 0);
        const newBal = Math.max(0, currentBal - amount);
        setUser({
          ...user,
          credits: newBal,
          maalem_details: {
            ...user.maalem_details,
            credit_balance: newBal
          }
        });
      }

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('transactions')
            .update({
              status: 'VALIDATED',
              type: 'LEAD_DEDUCTION',
              admin_notes: `Débit confirmé après réalisation des travaux #${cleanIntId}`
            })
            .ilike('reference_ref', ref);
        } catch (e) {
          console.warn('[Supabase] confirmLeadDebit warning:', e?.message);
        }
      }
    };

    // 3. Libérer la réservation Escrow (0.00 DH débité, transaction passe à CANCELLED)
    const releaseLeadCredit = async (interventionId, reason = 'Mission non réalisable') => {
      const cleanIntId = String(interventionId).trim();
      const ref = `ESCROW_INT_${cleanIntId}`;

      setTransactions((prev) =>
        prev.map((t) => {
          if (t.reference_ref === ref || (t.type === 'LEAD_ESCROW' && t.reference_ref?.includes(cleanIntId))) {
            return {
              ...t,
              status: 'CANCELLED',
              admin_notes: `Garantie libérée (0 DH débité) - Motif: ${reason}`
            };
          }
          return t;
        })
      );

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('transactions')
            .update({
              status: 'CANCELLED',
              admin_notes: `Garantie libérée (0 DH débité) - Motif: ${reason}`
            })
            .ilike('reference_ref', ref);
        } catch (e) {
          console.warn('[Supabase] releaseLeadCredit warning:', e?.message);
        }
      }
    };

    // 4. Déclarer une mission non réalisable / abandonner (Escrow libéré immédiatement)
    const declareMissionUnfeasible = async (interventionId, reason = 'Mission non réalisable', notes = '') => {
      const cleanIntId = String(interventionId).trim();
      const targetIntv = interventions.find((i) => String(i.id).trim() === cleanIntId);
      const nowIso = new Date().toISOString();

      // 1. Libérer l'escrow (15 DH retournent dans le solde disponible)
      await releaseLeadCredit(cleanIntId, reason);

      // 2. Mettre à jour l'intervention
      const updatedIntv = {
        status: 'UNFEASIBLE',
        unfeasible_reason: reason,
        unfeasible_notes: notes,
        unfeasible_reported_at: nowIso,
        escrow_status: 'RELEASED'
      };

      setInterventions((prev) => {
        const updated = prev.map((item) =>
          String(item.id).trim() === cleanIntId
            ? { ...item, ...updatedIntv }
            : item
        );
        try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // 3. Notifier en temps réel via BroadcastChannel & Ably
      publishIntertabSync('INTERVENTION_UNFEASIBLE', {
        intervention_id: cleanIntId,
        reason,
        notes,
        client_id: targetIntv?.client_id
      });

      publishRealtimeEvent('job_unfeasible', {
        intervention_id: cleanIntId,
        reason,
        notes,
        timestamp: Date.now()
      });

      if (targetIntv?.client_id) {
        publishRealtimeEvent('job:unfeasible', {
          intervention_id: cleanIntId,
          reason,
          notes,
          timestamp: Date.now()
        }, ABLY_CHANNELS.getUserChannel(targetIntv.client_id));
      }

      // 4. Persistance Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('interventions')
            .update({
              status: 'UNFEASIBLE',
              unfeasible_reason: reason,
              unfeasible_reported_at: nowIso,
              escrow_status: 'RELEASED'
            })
            .eq('id', cleanIntId);
        } catch (e) {
          console.warn('[Supabase] declareMissionUnfeasible warning:', e?.message);
        }
      }

      showToast('🛡️ Mission clôturée sans frais. Vos 15 DH de garantie ont été restitués immédiatement sur votre solde disponible !', 'success');
      return true;
    };

    // 5. Client relance la recherche SOS d'un autre Maâlem en 1 clic
    const relaunchEmergencyRequest = async (interventionId) => {
      const cleanIntId = String(interventionId).trim();
      const targetIntv = interventions.find((i) => String(i.id).trim() === cleanIntId);

      const resetFields = {
        status: 'PENDING',
        maalem_id: null,
        maalem_name: null,
        maalem_phone: null,
        accepted_at: null,
        progress_step: 'SEARCHING',
        escrow_status: null,
        unfeasible_reason: null,
        unfeasible_notes: null
      };

      let updatedJob = null;
      setInterventions((prev) => {
        const updated = prev.map((item) => {
          if (String(item.id).trim() === cleanIntId) {
            updatedJob = { ...item, ...resetFields };
            return updatedJob;
          }
          return item;
        });
        try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      const finalJob = updatedJob || { ...targetIntv, ...resetFields };
      const cityName = String(finalJob?.district || user?.city_zone || 'Casablanca').split('-')[0]?.trim() || 'Casablanca';
      const serviceType = finalJob?.service_type || 'all';

      publishRealtimeEvent('new_emergency_job', {
        ...finalJob,
        timestamp: Date.now()
      }, ABLY_CHANNELS.getCityChannel(cityName, serviceType));

      publishIntertabSync('INTERVENTION_RELAUNCHED', {
        intervention: finalJob
      });

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('interventions')
            .update(resetFields)
            .eq('id', cleanIntId);
        } catch (e) {
          console.warn('[Supabase] relaunchEmergencyRequest warning:', e?.message);
        }
      }

      showToast('🚀 Alerte SOS relancée ! Recherche active des artisans disponibles en cours...', 'success');
      return true;
    };

    // Maalem accepte un lead — déblocage 15 DH en Escrow, diffusion Ably (<50ms)
    const acceptLead = async (interventionId) => {
      // 1. Règle anti-accumulation : 1 seule mission active en cours autorisée à la fois
      const activeMissions = interventions.filter((i) => {
        const isMine = user?.id && String(i.maalem_id || '').trim() === String(user.id).trim();
        const isFallbackMine = (!user?.id || user.id === 'maalem-1' || user.id === '22222222-2222-2222-2222-222222222222') && 
                               (i.maalem_id === 'maalem-1' || i.maalem_id === '22222222-2222-2222-2222-222222222222');
        const isActiveStatus = ['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status);
        return (isMine || isFallbackMine) && isActiveStatus && String(i.id).trim() !== String(interventionId).trim();
      });

      if (activeMissions.length >= 1) {
        notify.warning(
          'Mission Déjà en Cours ⚠️',
          'Vous avez déjà 1 mission active en cours d\'exécution. Terminez-la ou clôturez-la avant de pouvoir accepter une nouvelle mission.',
          { id: `active-mission-limit-${interventionId}`, duration: 6000 }
        );
        return false;
      }

      // 2. Calcul du solde disponible du grand livre (Solde total - Escrow réservé)
      const maalemId = user?.id;
      const myTxs = (transactions || []).filter((t) => {
        const matchId = maalemId && String(t.maalem_id || '').trim() === String(maalemId).trim();
        const isFallback = (!maalemId || maalemId === 'maalem-1' || maalemId === '22222222-2222-2222-2222-222222222222');
        return matchId || isFallback;
      });

      const totalRecharges = myTxs
        .filter((t) => t.status === 'VALIDATED' && (t.type === 'RECHARGE' || t.type === 'CREDIT'))
        .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);
      const totalBonus = myTxs
        .filter((t) => (t.status === 'VALIDATED' || !t.status) && (t.type === 'BONUS' || String(t.payment_method || '').includes('BONUS')))
        .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);
      const totalValidatedLeads = myTxs
        .filter((t) => t.status === 'VALIDATED' && (t.type === 'LEAD_DEDUCTION' || Number(t.amount_dh) < 0))
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount_dh) || 0), 0);
      const reservedEscrow = myTxs
        .filter((t) => t.status === 'RESERVED')
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount_dh) || 0), 0);

      const computedLedgerBalance = totalRecharges + totalBonus - totalValidatedLeads;
      const totalBalance = myTxs.length > 0
        ? Math.max(0, computedLedgerBalance)
        : Number(user?.maalem_details?.credit_balance ?? user?.credits ?? 15.00);

      const availableBalance = Math.max(0, totalBalance - reservedEscrow);

      if (availableBalance < 15) {
        notify.error(
          'Solde Disponible Insuffisant 💳',
          `Votre solde disponible est de ${availableBalance.toFixed(2)} DH (15.00 DH requis en garantie temporaire). Veuillez recharger votre compte.`,
          { id: `insufficient-credit-${interventionId}` }
        );
        return false;
      }

      const targetIntv = interventions.find((i) => String(i.id).trim() === String(interventionId).trim());
      
      // Vérification de compatibilité de métier / spécialité (Maâlem vs Demande client)
      const maalemSpec = String(user?.maalem_details?.specialty || user?.specialty || '').toUpperCase();
      const jobSpec = String(targetIntv?.service_type || '').toUpperCase();

      const getSpecialtyLabelFr = (spec) => {
        if (!spec) return 'Tous corps d\'état';
        if (spec.includes('PLUMB') || spec.includes('PLOMB')) return 'Plomberie & Sanitaire 🚰';
        if (spec.includes('ELEC')) return 'Électricité & Éclairage ⚡';
        if (spec.includes('AUTO') || spec.includes('MECAN')) return 'Mécanique Auto 🚗';
        if (spec.includes('CLIM') || spec.includes('FROID')) return 'Climatisation & Froid ❄️';
        if (spec.includes('SERRUR')) return 'Serrurerie 🔑';
        if (spec.includes('PEINT')) return 'Peinture & Décoration 🎨';
        if (spec.includes('MACON')) return 'Maçonnerie & Gros Œuvre 🧱';
        if (spec.includes('MENUIS')) return 'Menuiserie 🪚';
        return spec;
      };

      const isCompatible = 
        !jobSpec ||
        !maalemSpec ||
        maalemSpec === 'ALL' ||
        maalemSpec === 'BOTH' ||
        maalemSpec === 'POLYVALENT' ||
        maalemSpec === jobSpec ||
        (maalemSpec.includes('PLUMB') && jobSpec.includes('PLOMB')) ||
        (maalemSpec.includes('PLOMB') && jobSpec.includes('PLUMB')) ||
        (maalemSpec.includes('ELEC') && jobSpec.includes('ELEC')) ||
        (maalemSpec.includes('AUTO') && jobSpec.includes('AUTO')) ||
        (maalemSpec.includes('CLIM') && jobSpec.includes('CLIM'));

      if (!isCompatible) {
        notify.warning(
          'Spécialité Non Compatible ⚠️',
          `Cette mission nécessite un artisan en "${getSpecialtyLabelFr(jobSpec)}", alors que votre profil est configuré pour "${getSpecialtyLabelFr(maalemSpec)}". Rendez-vous sur votre profil pour ajouter cette spécialité.`,
          { id: `incompatible-specialty-${interventionId}`, duration: 7000 }
        );
        return false;
      }

      const cityName = String(targetIntv?.district || user?.city_zone || 'Casablanca').split('-')[0]?.trim() || 'Casablanca';
      const serviceType = targetIntv?.service_type || user?.specialty || 'all';

      const nowIso = new Date().toISOString();
      const acceptedItem = {
        id: interventionId,
        status: 'ACCEPTED',
        escrow_status: 'RESERVED',
        maalem_id: user?.id,
        maalem_name: user?.full_name,
        maalem_phone: user?.phone,
        accepted_at: nowIso,
        progress_step: 'ON_THE_WAY'
      };

      // Réservation de l'Escrow 15 DH en transaction temporaire
      await reserveLeadCredit(interventionId, user?.id, 15.00);

      // 1. Mise à jour optimiste du statut intervention (retire le lead des flux ouverts)
      setInterventions((prev) => {
        const updated = prev.map((item) =>
          String(item.id).trim() === String(interventionId).trim()
            ? { ...item, ...acceptedItem }
            : item
        );
        try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // 2. Publication Ably Realtime immédiate (<50ms) :
      publishRealtimeEvent('job_accepted', {
        intervention_id: interventionId,
        maalem_id: user?.id,
        maalem_name: user?.full_name,
        maalem_phone: user?.phone,
        accepted_at: nowIso,
        progress_step: 'ON_THE_WAY'
      });

      // - Canal SOS géographique (ferme la modale pour les autres Maâlems du secteur)
      publishRealtimeEvent('sos:claimed', {
        intervention_id: interventionId,
        maalem_id: user?.id
      }, ABLY_CHANNELS.getSosChannel(cityName, serviceType));
      publishRealtimeEvent('sos:claimed', {
        intervention_id: interventionId,
        maalem_id: user?.id
      }, ABLY_CHANNELS.getSosCityChannel(cityName));

      // - Canal Personnel du Client (notifie le client sur son canal dédié)
      if (targetIntv?.client_id) {
        publishRealtimeEvent('job:accepted', {
          intervention_id: interventionId,
          maalem_id: user?.id,
          maalem_name: user?.full_name,
          maalem_phone: user?.phone,
          accepted_at: nowIso
        }, ABLY_CHANNELS.getUserChannel(targetIntv.client_id));
      }

      const payload = { type: 'INTERVENTION_ACCEPTED', intervention: acceptedItem, _ts: Date.now() };
      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      // 3. Sync Supabase
      if (isSupabaseConfigured && user?.id) {
        try {
          const { error } = await supabase.from('interventions').update({
            status: 'ACCEPTED',
            maalem_id: user.id
          }).eq('id', interventionId);

          if (error) {
            console.warn('[Supabase] acceptLead warning:', error.message);
          }
        } catch (dbErr) {
          console.warn('[Supabase] acceptLead exception:', dbErr.message);
        }
      }

      showToast('🛡️ Mission acceptée ! 15 DH placés en garantie (débités uniquement une fois validé).', 'success');
      return true;
    };

    // Maalem met à jour l'étape d'avancement (En route, Sur place, etc.)
    const updateInterventionProgress = async (interventionId, progressStep) => {
      setInterventions((prev) => {
        const updated = prev.map((item) =>
          item.id === interventionId
            ? { ...item, progress_step: progressStep }
            : item
        );
        try {
          localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
        } catch (e) { }
        return updated;
      });

      const stepLabels = {
        ON_THE_WAY: '🚗 Notification transmise : Vous êtes en route vers le client !',
        ARRIVED: '📍 Notification transmise : Vous êtes arrivé sur place pour le diagnostic.',
        IN_PROGRESS: '🛠️ Chantier en cours d\'exécution.'
      };

      if (stepLabels[progressStep]) {
        showToast(stepLabels[progressStep], 'info');
      }

      const payload = {
        type: 'INTERVENTION_PROGRESS_UPDATED',
        intervention_id: interventionId,
        progress_step: progressStep,
        _ts: Date.now()
      };

      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          const targetIntv = interventions.find((i) => String(i.id).trim() === String(interventionId).trim());

          // 1. Ably Realtime Broadcast : JOBS_STREAM + Canal Personnel Client (<50ms)
          publishRealtimeEvent('job_progress_updated', { intervention_id: interventionId, progress_step: progressStep });
          if (targetIntv?.client_id) {
            publishRealtimeEvent('job:progress', { intervention_id: interventionId, progress_step: progressStep }, ABLY_CHANNELS.getUserChannel(targetIntv.client_id));
          }

          // 2. Persistance PostgreSQL
          await supabase
            .from('interventions')
            .update({ progress_step: progressStep })
            .eq('id', interventionId);
        } catch (e) {
          console.warn('[Supabase] updateInterventionProgress error:', e.message);
        }
      }
    };

    // Maalem demande la confirmation d'accomplissement au client avec montant convenu
    const requestWorkCompletion = async (interventionId, finalAgreedPrice) => {
      const parsedPrice = finalAgreedPrice ? parseFloat(finalAgreedPrice) : undefined;
      const targetIntv = interventions.find((i) => String(i.id).trim() === String(interventionId).trim());

      setInterventions((prev) => {
        const updated = prev.map((item) =>
          String(item.id).trim() === String(interventionId).trim()
            ? {
              ...item,
              status: 'PENDING_COMPLETION',
              final_agreed_price: parsedPrice || item.final_agreed_price || item.estimated_price_min,
              devis_confirmed: true
            }
            : item
        );
        try {
          localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
        } catch (e) { }
        return updated;
      });

      const payload = {
        type: 'WORK_COMPLETION_REQUESTED',
        intervention_id: interventionId,
        final_agreed_price: parsedPrice,
        _ts: Date.now()
      };

      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          // 1. Ably Realtime Broadcast : JOBS_STREAM + Canal Personnel Client (<50ms)
          publishRealtimeEvent('work_completion_requested', { intervention_id: interventionId, final_agreed_price: parsedPrice });
          if (targetIntv?.client_id) {
            publishRealtimeEvent('work:completion_requested', { intervention_id: interventionId, final_agreed_price: parsedPrice }, ABLY_CHANNELS.getUserChannel(targetIntv.client_id));
          }

          // 2. Persistance PostgreSQL avec fallback
          let { error } = await supabase
            .from('interventions')
            .update({
              status: 'PENDING_COMPLETION',
              final_agreed_price: parsedPrice
            })
            .eq('id', String(interventionId).trim());

          if (error && (error.message?.includes('column') || error.message?.includes('schema'))) {
            await supabase
              .from('interventions')
              .update({ status: 'PENDING_COMPLETION' })
              .eq('id', String(interventionId).trim());
          }
        } catch (e) {
          console.warn('[Supabase] requestWorkCompletion warning:', e.message);
        }
      }

      showToast(`🛠️ Demande de fin de chantier transmise au client (${parsedPrice ? `${parsedPrice} DH` : 'Montant convenu'}) !`, 'success');
    };

    // Signalement Litige / Client injoignable avec Règles Métier & Anti-Abus strictes
    const reportDisputeIssue = async ({
      interventionId,
      maalemId,
      reason = 'CLIENT_UNREACHABLE',
      notes = ''
    }) => {
      const targetMaalemId = maalemId || user?.id || 'maalem-1';
      const targetIntv = interventions.find((i) => String(i.id).trim() === String(interventionId).trim());
      const targetMaalem = maalems.find((m) => String(m.id).trim() === String(targetMaalemId).trim());

      // Règle 1 : Anti-Abus — Si l'intervention a déjà été réalisée ou payée, aucun remboursement/annulation n'est accordé
      if (targetIntv?.status === 'COMPLETED' || (targetIntv?.final_agreed_price && targetIntv?.devis_confirmed)) {
        showToast('⚠️ Règle stricte anti-abus : aucun remboursement ni contestation n\'est accordé pour une intervention déjà réalisée et validée.', 'error');
        return false;
      }

      // Règle 2 : Fenêtre temporelle limitée à 30 minutes maximum après acceptation du lead
      const acceptedTime = targetIntv?.accepted_at
        ? new Date(targetIntv.accepted_at).getTime()
        : (targetIntv?.created_at ? new Date(targetIntv.created_at).getTime() : Date.now());
      const elapsedMinutes = (Date.now() - acceptedTime) / (60 * 1000);

      if (elapsedMinutes > 30) {
        showToast('⚠️ Délai anti-abus dépassé : le signalement de faux numéro ou client injoignable doit obligatoirement être effectué dans les 30 minutes suivant l\'acceptation.', 'error');
        return false;
      }

      const reasonLabels = {
        CLIENT_UNREACHABLE: '📵 Client Injoignable (Ne décroche pas / Téléphone éteint)',
        CLIENT_CANCELLED: '❌ Client a déjà trouvé / Annulé son besoin',
        WRONG_NUMBER: '📍 Faux Numéro / Adresse Introuvable',
        PRICE_DISAGREEMENT: '💸 Désaccord Devis / Refus de Déplacement'
      };

      // 1. Compensation exclusive sous forme de "Crédit de remplacement" (1 lead offert = +15 DH sur solde, 0 remboursement cash)
      await quickCreditMaalem(targetMaalemId, 15.0);

      // 2. Créer une alerte prioritaire archivée pour l'Admin
      const newAlert = {
        id: 'alert-' + Date.now(),
        intervention_id: interventionId,
        maalem_id: targetMaalemId,
        maalem_name: targetMaalem?.full_name || user?.full_name || 'Artisan Maâlem',
        maalem_phone: targetMaalem?.phone || user?.phone || '',
        client_name: targetIntv?.client_name || 'Client BricoleMoi',
        client_phone: targetIntv?.client_phone || '',
        district: targetIntv?.district || 'Casablanca',
        service_type: targetIntv?.service_type || 'PLUMBING',
        reason_code: reason,
        reason_label: reasonLabels[reason] || reason,
        comment: notes ? `${reasonLabels[reason] || reason} - Notes: ${notes}` : (reasonLabels[reason] || reason),
        rating: 1,
        status: 'REFUNDED_RESOLVED',
        compensation_type: 'REPLACEMENT_CREDIT_LEAD',
        created_at: new Date().toISOString()
      };

      setAdminAlerts((prev) => [newAlert, ...prev]);

      // 3. Mettre à jour l'intervention
      setInterventions((prev) =>
        prev.map((item) =>
          String(item.id).trim() === String(interventionId).trim()
            ? {
              ...item,
              status: 'UNREACHABLE_REFUNDED',
              unreachable_reason: reasonLabels[reason] || reason,
              refunded_at: new Date().toISOString()
            }
            : item
        )
      );

      // 4. Sync Multi-tab
      const payload = { type: 'NEW_DISPUTE_REPORTED', alert: newAlert, _ts: Date.now() };
      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      // 5. Sync Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase.from('interventions').update({
            status: 'UNREACHABLE_REFUNDED'
          }).eq('id', interventionId);
        } catch (e) { }
      }

      showToast('🛡️ Garantie Anti-Abus BricoleMoi : 1 Crédit de remplacement (+15.00 DH) accordé sur votre solde !', 'success');
      return true;
    };

    // Alias rétrocompatible
    const reportUnreachableClient = (interventionId, reason) =>
      reportDisputeIssue({ interventionId, reason: 'CLIENT_UNREACHABLE', notes: reason });

    // Résolution d'un litige côté Admin (Rejet ou Accord de crédit de remplacement)
    const resolveDisputeAndRefund = async ({ alertId, maalemId, amount = 15, shouldRefund = true }) => {
      const statusToSet = shouldRefund ? 'REFUNDED_RESOLVED' : 'REJECTED';
      const cleanAlertId = String(alertId || '').trim();

      // 1. Si crédit accordé, créditer le Maâlem (+15 DH)
      if (shouldRefund && maalemId) {
        await quickCreditMaalem(maalemId, amount);
      }

      // 2. Mettre à jour et persister le statut de l'alerte
      let targetInterventionId = null;
      setAdminAlerts((prev) => {
        const next = prev.map((a) => {
          if (String(a.id).trim() === cleanAlertId || String(a.intervention_id).trim() === cleanAlertId) {
            targetInterventionId = a.intervention_id || a.id;
            return {
              ...a,
              status: statusToSet,
              resolved_at: new Date().toISOString(),
              resolution_type: statusToSet
            };
          }
          return a;
        });
        try {
          localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next));
        } catch (e) {}
        return next;
      });

      // 3. Enregistrer l'arbitrage dans les litiges résolus permanents (évite réapparition au refresh)
      try {
        const resolvedMap = JSON.parse(localStorage.getItem('bricolemoi_resolved_disputes') || '{}');
        resolvedMap[cleanAlertId] = statusToSet;
        if (targetInterventionId) {
          resolvedMap[String(targetInterventionId).trim()] = statusToSet;
        }
        localStorage.setItem('bricolemoi_resolved_disputes', JSON.stringify(resolvedMap));
      } catch (e) {}

      // 4. Mettre à jour l'intervention associée
      if (targetInterventionId) {
        setInterventions((prev) => {
          const next = prev.map((item) =>
            String(item.id).trim() === String(targetInterventionId).trim()
              ? { ...item, dispute_status: statusToSet, dispute_resolved_at: new Date().toISOString() }
              : item
          );
          try {
            localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
          } catch (e) {}
          return next;
        });
      }

      // 5. Broadcast sync multi-onglets
      broadcastSync({
        type: 'DISPUTE_RESOLVED',
        alertId: cleanAlertId,
        interventionId: targetInterventionId,
        status: statusToSet,
        _ts: Date.now()
      });

      showToast(
        shouldRefund
          ? '✅ Crédit de remplacement (+15 DH) accordé et dossier clôturé !'
          : '❌ Réclamation de litige rejetée et dossier clôturé !',
        'success'
      );
    };

    // Annuler / Supprimer une intervention par le client
    const cancelIntervention = async (interventionId) => {
      const cleanId = String(interventionId).trim();

      // Libérer l'escrow de l'artisan si un lead était en réserve
      await releaseLeadCredit(cleanId, 'Annulation par le client');

      // 1. Mise à jour instantanée de l'état local React
      setInterventions((prev) =>
        prev.filter((item) => String(item.id).trim() !== cleanId)
      );

      // 2. Suppression propre en BDD Supabase (0 erreur de contrainte REST)
      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('interventions')
            .delete()
            .eq('id', cleanId);
        } catch (e) {
          console.warn('[Supabase] cancelIntervention error:', e.message);
        }
      }

      showToast('Demande SOS annulée et retirée des radars des Maâlems.', 'info');
    };

    // Purge automatique des médias volumineux pour garantir 0 saturation BDD et 0 coût
    const purgeInterventionMedia = async (interventionId) => {
      // 1. Purge locale React
      setInterventions((prev) =>
        prev.map((item) =>
          item.id === interventionId
            ? {
              ...item,
              media_purged: true,
              audio_note_url: null
            }
            : item
        )
      );

      // 2. Purge Supabase Database
      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('interventions')
            .update({
              audio_note_url: null
            })
            .eq('id', String(interventionId).trim());
        } catch (e) {
          console.warn('[Storage] Purge error:', e.message);
        }
      }
    };

    // Marquer une intervention comme terminée (Déclenche la validation définitive de l'escrow -15 DH)
    const completeIntervention = async (interventionId, finalPrice) => {
      const cleanId = String(interventionId).trim();

      // Confirmer le débit définitif de 15 DH sur l'escrow
      await confirmLeadDebit(cleanId);

      setInterventions((prev) => {
        const updated = prev.map((item) =>
          String(item.id).trim() === cleanId
            ? { ...item, status: 'COMPLETED', escrow_status: 'DEBITED', final_agreed_price: finalPrice || item.final_agreed_price || item.estimated_price_min }
            : item
        );
        try { localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      const payload = {
        type: 'INTERVENTION_COMPLETED',
        intervention_id: cleanId,
        _ts: Date.now()
      };

      try {
        localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(payload);
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          publishRealtimeEvent('job_completed', { intervention_id: cleanId });
          await supabase
            .from('interventions')
            .update({ status: 'COMPLETED', escrow_status: 'DEBITED' })
            .eq('id', cleanId);
        } catch (e) {
          console.warn('[Supabase] completeIntervention warning:', e.message);
        }
      }

      // Déclenchement de la purge des médias lourds
      purgeInterventionMedia(cleanId);
      showToast('✅ Intervention marquée comme terminée ! Modale d\'évaluation ouverte.', 'success');
    };

    // Soumission d'avis + gamification (alerte admin si ≤ 3 ⭐, bonus +100 DH après 5×5⭐)
    const submitReview = async ({ intervention_id, maalem_id, rating, comment, badges }) => {
      const currentInt = interventions.find((i) => i.id === intervention_id);
      const targetMaalemId = maalem_id || currentInt?.maalem_id || '22222222-2222-2222-2222-222222222222';
      const targetMaalemName = currentInt?.maalem_name || 'Maalem';

      // S'assurer que le débit de 15 DH est bien confirmé lors de la notation
      await confirmLeadDebit(intervention_id, targetMaalemId);

      const fullComment = badges && badges.length > 0
        ? (comment ? `"${comment}" [Badges: ${badges.join(', ')}]` : `[Badges: ${badges.join(', ')}]`)
        : String(comment || '');

      const newReview = {
        id: 'rev-' + Date.now(),
        intervention_id,
        maalem_id: targetMaalemId,
        client_name: user?.full_name || currentInt?.client_name || 'Client Maroc',
        client_phone: user?.phone || currentInt?.client_phone || '',
        rating: Number(rating),
        comment: fullComment,
        badges: badges || [],
        created_at: new Date().toISOString()
      };

      setReviews((prev) => [newReview, ...prev.filter((r) => r.intervention_id !== intervention_id)]);

      // Marquer l'intervention comme terminée avec sa note & commentaire
      setInterventions((prev) =>
        prev.map((item) =>
          item.id === intervention_id
            ? { ...item, status: 'COMPLETED', rating: Number(rating), comment: fullComment }
            : item
        )
      );

      // Mettre à jour l'artisan Maalem dans l'état local
      setMaalems((prev) =>
        prev.map((m) => {
          if (m.id === targetMaalemId) {
            const newAvg = m.rating_avg ? Number(((m.rating_avg + rating) / 2).toFixed(1)) : rating;
            return {
              ...m,
              rating_avg: newAvg,
              last_review_comment: fullComment,
              last_review_rating: rating
            };
          }
          return m;
        })
      );

      // Sync BroadcastChannel
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({
          type: 'INTERVENTION_COMPLETED_WITH_REVIEW',
          intervention_id,
          rating: Number(rating),
          comment: fullComment
        });
      } catch (e) { }

      // BDD Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('interventions')
            .update({ 
              status: 'COMPLETED',
              rating: Number(rating),
              comment: fullComment
            })
            .eq('id', String(intervention_id).trim());

          await supabase.from('reviews').insert([{
            intervention_id,
            maalem_id: targetMaalemId,
            client_id: user?.id,
            client_name: user?.full_name || currentInt?.client_name || 'Client Maroc',
            rating: Number(rating),
            comment: fullComment
          }]).catch(() => { });
        } catch (e) {
          console.warn('[Supabase] submitReview BDD warning:', e.message);
        }
      }

      if (Number(rating) <= 3) {
        const alertItem = {
          id: 'alert-' + Date.now(),
          intervention_id,
          maalem_id: targetMaalemId,
          maalem_name: targetMaalemName,
          maalem_phone: currentInt?.maalem_phone || '',
          client_name: user?.full_name || currentInt?.client_name || 'Client Maroc',
          client_phone: user?.phone || currentInt?.client_phone || '',
          district: currentInt?.district || 'Maroc',
          rating: Number(rating),
          comment: fullComment,
          reason_label: `Avis Insatisfaisant (${rating}⭐)`,
          status: 'PENDING',
          badges: badges || [],
          created_at: new Date().toISOString()
        };
        setAdminAlerts((prev) => {
          const next = [alertItem, ...prev.filter((a) => a.intervention_id !== intervention_id)];
          try { localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next)); } catch (e) {}
          return next;
        });
        broadcastSync({
          type: 'NEW_DISPUTE_REPORTED',
          alert: alertItem
        });
        showToast(`⚠️ Note de ${rating}★ transmise à l'équipe Admin pour litige/arbitrage !`, 'error');
      } else {
        showToast('⭐ Évaluation & Confirmation d\'accomplissement enregistrées ! Merci.', 'success');
      }

      if (user?.role === 'MAALEM' && user?.maalem_details) {
        let streak = user.maalem_details.consecutive_five_stars || 0;
        let balance = user.maalem_details.credit_balance || 0;

        if (rating === 5) {
          streak += 1;
          if (streak >= 5) {
            // Aligné sur le trigger SQL : bonus +100 DH après 5 avis 5⭐ consécutifs
            balance += 100.00;
            streak = 0;
            showToast('🎉 FÉLICITATIONS ! 5 avis 5★ consécutifs : +100 DH (valeur 6-7 leads) crédités ! 🎁', 'success');

            setTransactions((prev) => [
              {
                id: 'tx-bonus-' + Date.now(),
                maalem_id: user.id,
                maalem_name: user.full_name,
                amount_dh: 100.00,
                type: 'BONUS',
                payment_method: 'FIVE_STAR_BONUS',
                reference_ref: 'BONUS-STREAK-5STAR-100DH',
                status: 'VALIDATED',
                created_at: new Date().toISOString()
              },
              ...prev
            ]);
          }
        } else {
          streak = 0;
        }

        setUser({
          ...user,
          maalem_details: {
            ...user.maalem_details,
            consecutive_five_stars: streak,
            credit_balance: balance
          }
        });
      }
    };

    // Demande de recharge crédit Maalem avec justificatif de paiement
    const submitRechargeRequest = async ({ amount_dh, payment_method, reference_ref, receipt_photo_url = null, instant = false }) => {
      const rechargeAmount = parseFloat(amount_dh);
      const maalemId = user?.id;
      const maalemName = user?.full_name || 'Artisan Maalem';
      const status = instant ? 'VALIDATED' : 'PENDING';

      if (!maalemId) {
        showToast('⚠️ Utilisateur non connecté.', 'error');
        return;
      }

      const newTx = {
        id: 'tx-' + Date.now(),
        maalem_id: maalemId,
        maalem_name: maalemName,
        amount_dh: rechargeAmount,
        type: 'RECHARGE',
        payment_method,
        reference_ref: reference_ref || 'REF-PACK-' + Date.now(),
        receipt_photo_url: receipt_photo_url || null,
        status,
        created_at: new Date().toISOString()
      };

      setTransactions((prev) => [newTx, ...prev]);

      if (instant) {
        const currentBalance = (parseFloat(user?.maalem_details?.credit_balance || user?.credits || 0)) + rechargeAmount;
        const updatedUser = {
          ...user,
          credits: currentBalance,
          maalem_details: {
            ...(user?.maalem_details || {}),
            credit_balance: currentBalance
          }
        };
        setUser(updatedUser);
        try {
          sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
        } catch (e) { }

        setMaalems((prev) =>
          prev.map((m) => (m.id === maalemId ? { ...m, credit_balance: currentBalance } : m))
        );
      }

      // Broadcast across tabs so Admin tab immediately sees the new transaction & notification!
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({
          type: 'RECHARGE_SUBMITTED',
          transaction: newTx,
          instant,
          maalemId,
          maalemName,
          rechargeAmount,
          paymentMethod: payment_method,
          receipt_photo_url
        });
        bc.close();
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          const { data: insertedTx, error: insErr } = await supabase.from('transactions').insert([{
            maalem_id: maalemId,
            amount_dh: rechargeAmount,
            type: 'RECHARGE',
            payment_method,
            reference_ref: newTx.reference_ref,
            receipt_photo_url: receipt_photo_url || null,
            status
          }]).select().maybeSingle();

          if (insertedTx) {
            setTransactions((prev) =>
              prev.map((t) => (t.id === newTx.id ? { ...t, id: insertedTx.id } : t))
            );
          }

          if (instant) {
            await supabase.from('maalem_details').update({
              credit_balance: (user?.maalem_details?.credit_balance || 0) + rechargeAmount
            }).eq('id', maalemId);
            await supabase.from('profiles').update({
              credits: (user?.credits || 0) + rechargeAmount
            }).eq('id', maalemId);
          }

          await supabase.from('admin_notifications').insert([{
            type: 'RECHARGE',
            title: `💳 Demande de Recharge (${rechargeAmount} DH)`,
            message: `L'artisan ${maalemName} a demandé une recharge de ${rechargeAmount} DH via ${payment_method} (Réf: ${newTx.reference_ref}).`,
            data: { maalem_id: maalemId, amount_dh: rechargeAmount, payment_method, reference_ref: newTx.reference_ref }
          }]);
        } catch (err) {
          console.warn('[Supabase] Recharge insert warning:', err.message);
        }
      }

      showToast(
        instant
          ? `💳 Recharge de ${rechargeAmount} DH effectuée et créditée instantanément !`
          : '📋 Demande de recharge envoyée à l\'Admin pour validation !',
        'success'
      );
    };

    // Admin approuve une recharge + synchronisation BDD & State Maalems
    const approveRecharge = async (transactionId, notes = '') => {
      const tx = transactions.find((t) => String(t.id).trim() === String(transactionId).trim() || (t.reference_ref && String(t.reference_ref).trim().toLowerCase() === String(transactionId).trim().toLowerCase()));
      const targetId = tx?.id || transactionId;
      const cleanRef = tx?.reference_ref;
      const targetMaalemId = tx?.maalem_id;
      const amountDh = parseFloat(tx?.amount_dh || 0);
      const targetMaalem = maalems.find((m) => String(m.id).trim() === String(targetMaalemId).trim());

      // 1. Mise à jour immédiate de la transaction locale & cache
      setTransactions((prev) => {
        const updated = prev.map((t) =>
          (String(t.id).trim() === String(targetId).trim() || (cleanRef && String(t.reference_ref).trim().toLowerCase() === String(cleanRef).trim().toLowerCase()))
            ? { ...t, status: 'VALIDATED', admin_notes: notes || t.admin_notes, reconciled_at: new Date().toISOString() }
            : t
        );
        try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // 2. Mise à jour du solde dans le state des Maâlems (Admin View)
      if (targetMaalemId) {
        setMaalems((prev) =>
          prev.map((m) => {
            if (String(m.id).trim() === String(targetMaalemId).trim()) {
              const newBal = (parseFloat(m.credit_balance) || 0) + amountDh;
              return { ...m, credit_balance: newBal };
            }
            return m;
          })
        );
      }

      // 3. Mise à jour si l'utilisateur courant est le Maâlem concerné
      const curr = userRef.current;
      if (curr && (String(curr.id).trim() === String(targetMaalemId).trim() || isCurrentUserMaalemOfTransaction(targetMaalemId))) {
        const currentBalance = (parseFloat(curr.maalem_details?.credit_balance || curr.credits || 0)) + amountDh;
        const updatedUser = {
          ...curr,
          credits: currentBalance,
          maalem_details: {
            ...(curr?.maalem_details || {}),
            credit_balance: currentBalance
          }
        };
        setUser(updatedUser);
        try {
          sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
        } catch (e) { }
        notify.credit(amountDh, currentBalance, 'Recharge Validée par l\'Admin 💳', { id: `recharge-ok-${targetId}` });
      }

      // 4. Diffusion Multi-Canaux Infaillible (BroadcastChannel + LocalStorage Event)
      broadcastSync({
        type: 'MAALEM_BALANCE_UPDATED',
        transactionId: targetId,
        reference_ref: cleanRef,
        maalemId: targetMaalemId,
        amount: amountDh,
        newBalance: (parseFloat(targetMaalem?.credit_balance || 0)) + amountDh,
        txType: 'RECHARGE',
        notes: 'Recharge validée par l\'administrateur'
      });

      // 5. Diffusion Ably Realtime sur le canal personnel (<50ms pour cross-device / mobile)
      if (targetMaalemId) {
        publishRealtimeEvent('credit:added', {
          maalem_id: targetMaalemId,
          amount: amountDh,
          new_balance: (parseFloat(targetMaalem?.credit_balance || 0)) + amountDh,
          reason: 'Recharge validée par l\'Admin 💳',
          timestamp: Date.now()
        }, ABLY_CHANNELS.getUserChannel(targetMaalemId));
      }

      // 6. Synchronisation Supabase robuste
      if (isSupabaseConfigured) {
        try {
          const updateData = {
            status: 'VALIDATED',
            admin_notes: notes || 'Validé par l\'administrateur',
            reconciled_at: new Date().toISOString(),
            reconciled_by: user?.id
          };

          let updateErr = null;
          if (cleanRef) {
            const { error: err1 } = await supabase.from('transactions').update(updateData).ilike('reference_ref', cleanRef);
            updateErr = err1;
          }
          if (!cleanRef || updateErr) {
            const { error: err2 } = await supabase.from('transactions').update(updateData).eq('id', targetId);
            updateErr = err2;
          }

          if (updateErr) {
            // Fallback si colonnes supplémentaires absentes
            if (cleanRef) {
              await supabase.from('transactions').update({ status: 'VALIDATED' }).ilike('reference_ref', cleanRef);
            } else {
              await supabase.from('transactions').update({ status: 'VALIDATED' }).eq('id', targetId);
            }
          }

          if (targetMaalemId) {
            const { data: mData } = await supabase
              .from('maalem_details')
              .select('credit_balance')
              .eq('id', targetMaalemId)
              .maybeSingle();

            const newBal = (parseFloat(mData?.credit_balance) || 0) + amountDh;

            await supabase.from('maalem_details').update({ credit_balance: newBal }).eq('id', targetMaalemId);
            await supabase.from('profiles').update({ credits: newBal }).eq('id', targetMaalemId);
          }
        } catch (err) {
          console.warn('[Supabase] approveRecharge sync warning:', err.message);
        }
      }

      notify.success('Recharge Approuvée ✅', `La recharge de ${amountDh.toFixed(2)} DH a été créditée avec succès.`, { id: `approved-${targetId}` });
    };

    // Admin rejette une recharge avec motif et synchronisation infaillible
    const rejectRecharge = async (transactionId, reason = 'Bordereau ou référence introuvable') => {
      const tx = transactions.find((t) => String(t.id).trim() === String(transactionId).trim() || (t.reference_ref && String(t.reference_ref).trim().toLowerCase() === String(transactionId).trim().toLowerCase()));
      const targetId = tx?.id || transactionId;
      const cleanRef = tx?.reference_ref;
      const targetMaalemId = tx?.maalem_id;

      // 1. Mise à jour immédiate dans le state React & cache (disparaît tout de suite des PENDING)
      setTransactions((prev) => {
        const updated = prev.map((t) =>
          (String(t.id).trim() === String(targetId).trim() || (cleanRef && String(t.reference_ref).trim().toLowerCase() === String(cleanRef).trim().toLowerCase()))
            ? { ...t, status: 'REJECTED', admin_notes: reason, reconciled_at: new Date().toISOString() }
            : t
        );
        try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // 2. Diffusion Multi-Canaux Infaillible (BroadcastChannel + LocalStorage Event)
      broadcastSync({
        type: 'RECHARGE_REJECTED',
        transactionId: targetId,
        reference_ref: cleanRef,
        maalemId: targetMaalemId,
        reason
      });

      // 3. Mise à jour Supabase avec fallback automatique
      if (isSupabaseConfigured) {
        try {
          const updateData = {
            status: 'REJECTED',
            admin_notes: reason,
            reconciled_at: new Date().toISOString(),
            reconciled_by: user?.id
          };

          let updateErr = null;
          if (cleanRef) {
            const { error: err1 } = await supabase.from('transactions').update(updateData).ilike('reference_ref', cleanRef);
            updateErr = err1;
          }
          if (!cleanRef || updateErr) {
            const { error: err2 } = await supabase.from('transactions').update(updateData).eq('id', targetId);
            updateErr = err2;
          }

          // Fallback minimaliste si la table n'a pas encore toutes les colonnes
          if (updateErr) {
            if (cleanRef) {
              await supabase.from('transactions').update({ status: 'REJECTED' }).ilike('reference_ref', cleanRef);
            } else {
              await supabase.from('transactions').update({ status: 'REJECTED' }).eq('id', targetId);
            }
          }
        } catch (err) {
          console.warn('[Supabase] rejectRecharge sync warning:', err.message);
        }
      }

      notify.info('Recharge Refusée ❌', `La recharge a été rejetée (Motif : ${reason}).`, { id: `rejected-${targetId}` });
    };

    // Admin enregistre un paiement manuel (crédit ou débit) avec synchro BDD
    const recordAdminPayment = async ({ maalemId, amount_dh, payment_method, reference_ref, type = 'RECHARGE', notes = '' }) => {
      const cleanMaalemId = String(maalemId || '').trim();
      const targetMaalem = maalems.find((m) => String(m.id).trim() === cleanMaalemId) || { id: cleanMaalemId, full_name: 'Artisan Maalem' };

      const parsedAmount = parseFloat(amount_dh);
      const finalAmount = type === 'DEBIT' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

      const newTx = {
        id: 'tx-admin-' + Date.now(),
        maalem_id: cleanMaalemId,
        maalem_name: targetMaalem.full_name,
        amount_dh: finalAmount,
        type,
        payment_method: payment_method || 'Offert Admin 🎁',
        reference_ref: reference_ref || 'REF-ADMIN-' + Date.now(),
        status: 'VALIDATED',
        admin_notes: notes || (type === 'DEBIT' ? 'Débit / Remboursement manuel' : 'Crédit manuel admin 🎁'),
        reconciled_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      setTransactions((prev) => {
        const updated = [newTx, ...prev];
        try { localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated)); } catch (e) { }
        return updated;
      });

      // 1. Calcul du nouveau solde local
      const currentMaalemBal = parseFloat(targetMaalem.credit_balance ?? 0);
      const calculatedNewBal = Math.max(0, currentMaalemBal + finalAmount);

      // 2. Mettre à jour la liste des Maâlems locale
      setMaalems((prev) =>
        prev.map((m) => {
          if (String(m.id).trim() === cleanMaalemId) {
            return { ...m, credit_balance: calculatedNewBal };
          }
          return m;
        })
      );

      // 3. Mettre à jour l'utilisateur connecté s'il s'agit de ce Maâlem
      const curr = userRef.current;
      if (curr && (String(curr.id).trim() === cleanMaalemId || isCurrentUserMaalemOfTransaction(cleanMaalemId))) {
        const currentBal = parseFloat(curr?.credits ?? curr?.maalem_details?.credit_balance ?? 0);
        const newBal = Math.max(0, currentBal + finalAmount);
        const updatedUser = {
          ...curr,
          credits: newBal,
          maalem_details: {
            ...(curr?.maalem_details || {}),
            credit_balance: newBal
          }
        };
        setUser(updatedUser);
        try {
          sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
        } catch (e) { }
        notify.credit(finalAmount, newBal, notes || 'Crédit accordé par l\'Admin 🎁', { id: `admin-credit-${newTx.id}` });
      }

      // 4. Diffusion Multi-Canaux Infaillible (BroadcastChannel + LocalStorage Event)
      broadcastSync({
        type: 'MAALEM_BALANCE_UPDATED',
        maalemId: cleanMaalemId,
        newBalance: calculatedNewBal,
        amount: finalAmount,
        txType: type,
        notes: notes || 'Crédit accordé par l\'Admin 🎁'
      });

      // 5. Diffusion Ably Realtime sur le canal personnel (<50ms pour synchro mobile/cross-device)
      publishRealtimeEvent('credit:added', {
        maalem_id: cleanMaalemId,
        amount: finalAmount,
        new_balance: calculatedNewBal,
        reason: notes || 'Crédit accordé par l\'Admin 🎁',
        timestamp: Date.now()
      }, ABLY_CHANNELS.getUserChannel(cleanMaalemId));

      // 6. Synchronisation Supabase robuste
      if (isSupabaseConfigured) {
        try {
          await supabase.from('transactions').insert([{
            maalem_id: cleanMaalemId,
            amount_dh: finalAmount,
            type,
            payment_method: newTx.payment_method,
            reference_ref: newTx.reference_ref,
            status: 'VALIDATED',
            admin_notes: newTx.admin_notes,
            reconciled_at: newTx.reconciled_at
          }]);

          const { data: mData } = await supabase
            .from('maalem_details')
            .select('credit_balance')
            .eq('id', cleanMaalemId)
            .maybeSingle();

          const dbBal = mData?.credit_balance !== undefined
            ? Math.max(0, (parseFloat(mData.credit_balance) || 0) + finalAmount)
            : calculatedNewBal;

          await supabase.from('maalem_details').update({ credit_balance: dbBal }).eq('id', cleanMaalemId);
          await supabase.from('profiles').update({ credits: dbBal }).eq('id', cleanMaalemId);
        } catch (err) {
          console.warn('[Supabase] recordAdminPayment DB warning:', err.message);
        }
      }

      showToast(
        type === 'DEBIT'
          ? `🔴 Débit de ${Math.abs(finalAmount).toFixed(2)} DH effectué sur le compte de ${targetMaalem.full_name}.`
          : `🟢 Paiement de ${finalAmount.toFixed(2)} DH enregistré et crédité à ${targetMaalem.full_name} !`,
        'success'
      );

      return newTx;
    };

    // Admin — approbation manuelle CIN
    const manualApproveCIN = async (maalemId) => {
      setMaalems((prev) =>
        prev.map((m) => {
          if (m.id === maalemId) {
            const newBal = (m.credit_balance || 0) > 0 ? m.credit_balance : 15.0;
            return { ...m, is_verified: true, cin_verified: true, credit_balance: newBal };
          }
          return m;
        })
      );

      if (user?.role === 'MAALEM' && user?.id === maalemId) {
        const newBal = (user.maalem_details?.credit_balance || 0) > 0 ? user.maalem_details.credit_balance : 15.0;
        setUser({
          ...user,
          maalem_details: { ...user.maalem_details, is_verified: true, cin_verified: true, credit_balance: newBal }
        });
      }

      if (isSupabaseConfigured) {
        try {
          const { data: currentDetails } = await supabase
            .from('maalem_details')
            .select('credit_balance')
            .eq('id', maalemId)
            .maybeSingle();

          const newBal = (currentDetails?.credit_balance || 0) > 0 ? currentDetails.credit_balance : 15.0;

          const updatePayload = { is_verified: true, cin_verified: true, credit_balance: newBal };
          let { error: uErr } = await supabase.from('maalem_details').update(updatePayload).eq('id', maalemId);
          if (uErr && uErr.message?.includes('cin_verified')) {
            delete updatePayload.cin_verified;
            await supabase.from('maalem_details').update(updatePayload).eq('id', maalemId);
          }

          const profileUpdatePayload = { credits: newBal };
          let { error: prErr } = await supabase.from('profiles').update(profileUpdatePayload).eq('id', maalemId);
          if (prErr && prErr.message?.includes('credits')) {
            delete profileUpdatePayload.credits;
          }
        } catch (err) {
          console.warn('[Supabase] manualApproveCIN warning:', err.message);
        }
      }

      showToast('✅ Validation CIN manuelle approuvée (+15 DH crédités si solde nul) !', 'success');
    };

    // Admin — rejet CIN avec motif précis et diffusion
    const manualRejectCIN = async (maalemId, reason = 'Document CIN non conforme ou illisible') => {
      setMaalems((prev) =>
        prev.map((m) => (m.id === maalemId ? { ...m, is_verified: false, cin_verified: false, cin_rejection_reason: reason } : m))
      );

      if (user?.role === 'MAALEM' && user?.id === maalemId) {
        setUser({
          ...user,
          maalem_details: { ...user.maalem_details, is_verified: false, cin_verified: false, cin_rejection_reason: reason }
        });
      }

      // Broadcast across tabs
      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({
          type: 'CIN_REJECTED',
          maalemId,
          reason
        });
        bc.close();
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          await supabase.from('maalem_details')
            .update({ is_verified: false, cin_verified: false, cin_rejection_reason: reason })
            .eq('id', maalemId);
        } catch (err) {
          console.warn('[Supabase] manualRejectCIN warning:', err.message);
        }
      }

      showToast(`🔴 Dossier CIN rejeté pour l'artisan (Motif : ${reason}) !`, 'error');
    };

    // Mise à jour / Correction du numéro CIN d'un Maalem
    const updateMaalemCIN = async (maalemId, newCinNumber) => {
      const cleanCin = String(newCinNumber || '').trim().toUpperCase();
      if (!cleanCin) return;

      setMaalems((prev) =>
        prev.map((m) => (m.id === maalemId ? { ...m, cin_number: cleanCin } : m))
      );

      if (user && user.id === maalemId) {
        setUser((prev) => ({
          ...prev,
          cin_number: cleanCin,
          maalem_details: prev?.maalem_details
            ? { ...prev.maalem_details, cin_number: cleanCin }
            : undefined
        }));
      }

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('maalem_details')
            .update({ cin_number: cleanCin })
            .eq('id', maalemId);
        } catch (err) {
          console.warn('[Supabase] updateMaalemCIN warning:', err.message);
        }
      }

      showToast(`✅ N° CIN mis à jour : ${cleanCin}`, 'success');
    };

    // Admin — crédit rapide (+15 DH ou +50 DH)
    const quickCreditMaalem = (maalemId, amount) => {
      return recordAdminPayment({
        maalemId,
        amount_dh: amount,
        payment_method: 'Offert Admin 🎁',
        reference_ref: 'QUICK-BONUS-' + amount + 'DH-' + Date.now(),
        type: 'RECHARGE'
      });
    };

    // Admin — suspension/réactivation d'un Maalem
    const toggleMaalemSuspension = (maalemId) => {
      setMaalems((prev) =>
        prev.map((m) => {
          if (m.id === maalemId) {
            const nextState = !m.is_suspended;
            showToast(
              nextState ? `🔴 Compte Maalem ${m.full_name} SUSPENDU !` : `🟢 Compte Maalem ${m.full_name} RÉACTIVÉ !`,
              nextState ? 'error' : 'success'
            );
            return { ...m, is_suspended: nextState };
          }
          return m;
        })
      );
    };

    // Génère un reçu PDF imprimable
    const handleGenerateReceiptPDF = (tx) => {
      generateReceiptPDF(tx, maalems, user);
    };

    // Admin — purge toutes les données de test
    const clearAllTestData = async () => {
      setInterventions([]);
      setTransactions([]);
      setAdminNotifications([]);
      setReviews([]);
      setAdminAlerts([]);

      if (user?.role?.toUpperCase() === 'MAALEM') {
        setMaalems([{
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
          specialty: user.maalem_details?.specialty || 'PLUMBING',
          rating_avg: 5.0,
          is_verified: user.maalem_details?.is_verified || false,
          cin_verified: user.maalem_details?.cin_verified || false,
          credit_balance: user.maalem_details?.credit_balance || 0,
          district: user.city_zone || 'Casablanca'
        }]);
      } else {
        setMaalems([]);
      }

      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage({ type: 'PURGE_ALL_DATA' });
        bc.close();
      } catch (e) { }

      if (isSupabaseConfigured) {
        try {
          const isValidUUID = (str) => typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
          await supabase.from('interventions').delete().not('id', 'is', null);
          await supabase.from('transactions').delete().not('id', 'is', null);
          if (user?.id && isValidUUID(user.id)) {
            await supabase.from('maalem_details').delete().neq('id', user.id);
            await supabase.from('profiles').delete().eq('role', 'maalem').neq('id', user.id);
          }
        } catch (err) {
          console.warn('[Supabase] Erreur lors de la purge:', err.message);
        }
      }
      showToast('🧹 Toutes les données de test ont été réinitialisées !', 'success');
    };

    // Admin — suspension/réactivation d'un compte client
    const toggleClientSuspension = async (clientId) => {
      let nextState = false;
      setClients((prev) =>
        prev.map((c) => {
          if (String(c.id).trim() === String(clientId).trim()) {
            nextState = !c.is_suspended;
            showToast(
              nextState ? `🔴 Compte Client ${c.full_name} SUSPENDU !` : `🟢 Compte Client ${c.full_name} RÉACTIVÉ !`,
              nextState ? 'error' : 'success'
            );
            return { ...c, is_suspended: nextState };
          }
          return c;
        })
      );
      if (isSupabaseConfigured) {
        try {
          await supabase.from('profiles').update({ is_suspended: nextState }).eq('id', clientId);
        } catch (e) { }
      }
    };

    return (
      <AppContext.Provider
        value={{
          interventions,
          setInterventions,
          maalems,
          setMaalems,
          clients,
          setClients,
          transactions,
          setTransactions,
          reviews,
          setReviews,
          adminAlerts,
          adminNotifications,
          toastMessage,
          whatsappMsg,
          setWhatsappMsg,
          showToast,
          verifyMaalemCINWithGemini,
          createIntervention,
          confirmFinalDevis,
          acceptLead,
          completeIntervention,
          requestWorkCompletion,
          submitReview,
          submitRechargeRequest,
          approveRecharge,
          rejectRecharge,
          recordAdminPayment,
          manualApproveCIN,
          manualRejectCIN,
          updateMaalemCIN,
          quickCreditMaalem,
          toggleMaalemSuspension,
          toggleClientSuspension,
          generateReceiptPDF: handleGenerateReceiptPDF,
          calculateDistanceInKm,
          clearAllTestData,
          refreshData,
          isMaalemOnline,
          toggleMaalemOnlineStatus,
          isAblyConnected,
          ablyConnectionState,
          ablyOnlineMaalemsCount,
          ablyOnlineMaalems,
          isAblyConfigured,
          cancelIntervention,
          updateInterventionProgress,
          reportUnreachableClient,
          reportDisputeIssue,
          resolveDisputeAndRefund,
          reserveLeadCredit,
          confirmLeadDebit,
          releaseLeadCredit,
          declareMissionUnfeasible,
          relaunchEmergencyRequest
        }}
      >
        {children}
      </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
