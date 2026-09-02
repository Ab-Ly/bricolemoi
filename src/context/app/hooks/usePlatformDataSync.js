import { useEffect, useRef, useCallback } from 'react';
import { db, isDbConfigured, supabase, isSupabaseConfigured } from '../../../lib/dbClient';
import { REALTIME_CHANNELS, isRealtimeConfigured, ABLY_CHANNELS, isAblyConfigured } from '../../../lib/realtimeClient';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../../../lib/realtimeBroadcastService';
import { useRealtimePresence, useAblyPresence } from '../../../hooks/useRealtimePresence';
import { playNotificationSound } from '../../../lib/audioNotifier';
import {
  normalizeIntervention,
  normalizeMaalemProfile,
  normalizeReviewRecord
} from '../../../utils/dataNormalizer';
import {
  mergeInterventions,
  mergeTransactions,
  mergeMaalems,
  isEntityInGracePeriod,
  saveCache
} from '../../../services/dataReconciliationService';
import {
  updateOnlineMaalemInStorage,
  getOnlineMaalemsFromStorage,
  safeSupabaseBroadcast,
  broadcastSync,
  isCurrentUserClientOf,
  isCurrentUserAssignedMaalemOf,
  isCurrentUserEligibleMaalemForNewJob,
  isCurrentUserAdmin,
  isCurrentUserMaalemOfTransaction,
  isMatchingInterventionId
} from '../helpers/appSyncHelpers';

export const usePlatformDataSync = ({
  user,
  setUser,
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
  setAdminAlerts,
  isMaalemOnline,
  setIsMaalemOnline,
  showToast,
  loyaltyRewardsHistory,
  setLoyaltyRewardsHistory
}) => {
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const interventionsRef = useRef(interventions);
  useEffect(() => {
    interventionsRef.current = interventions;
  }, [interventions]);

  const maalemsRef = useRef(maalems);
  useEffect(() => {
    maalemsRef.current = maalems;
  }, [maalems]);

  const isMaalemOnlineRef = useRef(isMaalemOnline);
  useEffect(() => {
    isMaalemOnlineRef.current = isMaalemOnline;
  }, [isMaalemOnline]);

  const latestPresenceCoordsRef = useRef(new Map());

  const handleAblyPresenceUpdate = useCallback((presenceMap) => {
    setMaalems((prev) => {
      const maalemMap = new Map(prev.map((m) => [String(m.id).trim(), { ...m }]));
      const onlineIds = new Set(Object.keys(presenceMap).map((k) => String(k).trim()));

      Object.entries(presenceMap).forEach(([id, member]) => {
        const cleanId = String(id).trim();
        if (member && member.lat !== undefined && member.lng !== undefined) {
          const pLat = parseFloat(member.lat);
          const pLng = parseFloat(member.lng);
          if (!isNaN(pLat) && !isNaN(pLng) && pLat > 20 && pLat < 38 && pLng < 0) {
            const existingLive = latestPresenceCoordsRef.current.get(cleanId);
            // Vérifier si la coordonnée entrante est un fallback statique de ville (ex: centre Casa ou Fès)
            const isCityFallback =
              (pLat === 33.5883 && pLng === -7.6328) ||
              (pLat === 34.0331 && pLng === -5.0003) ||
              (pLat === 34.0209 && pLng === -6.8416) ||
              (pLat === 31.6295 && pLng === -7.9811);

            // Ne JAMAIS écraser un vrai point GPS mobile par un fallback statique de ville !
            if (!existingLive || !isCityFallback) {
              latestPresenceCoordsRef.current.set(cleanId, { lat: pLat, lng: pLng });
            }
          }
        }
        const existing = maalemMap.get(cleanId);
        const resolvedLivePos = latestPresenceCoordsRef.current.get(cleanId);

        if (existing) {
          maalemMap.set(cleanId, {
            ...existing,
            is_online: true,
            is_available: true,
            lat: resolvedLivePos ? resolvedLivePos.lat : (member.lat !== undefined ? member.lat : existing.lat),
            lng: resolvedLivePos ? resolvedLivePos.lng : (member.lng !== undefined ? member.lng : existing.lng),
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
  }, [setMaalems]);

  const {
    isAblyConnected,
    connectionState: ablyConnectionState,
    onlineMaalemsCount: ablyOnlineMaalemsCount,
    onlineMaalems: ablyOnlineMaalems
  } = useRealtimePresence({
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

    setMaalems((prev) =>
      prev.map((m) =>
        m.id === user?.id ? { ...m, is_online: nextStatus, is_available: nextStatus } : m
      )
    );

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

  // Heartbeat Maalem
  useEffect(() => {
    if (!user || String(user.role || '').toUpperCase() !== 'MAALEM' || !isMaalemOnline) return;

    const sendHeartbeat = async () => {
      let mLat = parseFloat(user.lat);
      let mLng = parseFloat(user.lng);
      if (isNaN(mLat) || isNaN(mLng) || mLng >= 0) {
        const zone = (user.city_zone || '').toLowerCase();
        if (zone.includes('fès') || zone.includes('fes')) {
          mLat = 34.0331;
          mLng = -5.0003;
        } else if (zone.includes('rabat')) {
          mLat = 34.0209;
          mLng = -6.8416;
        } else if (zone.includes('marrakech')) {
          mLat = 31.6295;
          mLng = -7.9811;
        } else if (zone.includes('tanger')) {
          mLat = 35.7595;
          mLng = -5.834;
        } else if (zone.includes('agadir')) {
          mLat = 30.4278;
          mLng = -9.5981;
        } else {
          mLat = 33.5883;
          mLng = -7.6328;
        }
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

      try {
        const bc = new BroadcastChannel('bricolemoi_intertab_sync');
        bc.postMessage(hbPayload);
        bc.close();
      } catch (e) {}

      if (isSupabaseConfigured && user?.id) {
        try {
          safeSupabaseBroadcast('public:jobs', 'maalem_heartbeat', hbPayload);
          // Persistance autonome dans PocketBase pour synchronisation inter-appareils
          supabase
            .from('maalem_details')
            .update({
              last_seen_at: new Date().toISOString(),
              is_online: true,
              is_available: true,
              lat: mLat,
              lng: mLng
            })
            .eq('id', user.id)
            .catch(() => {});
        } catch (e) {}
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 30000); // Heartbeat toutes les 30 secondes
    return () => clearInterval(interval);
  }, [user, isMaalemOnline]);

  // Chargement Supabase
  const fetchRealSupabaseData = async () => {
    if (!isSupabaseConfigured) return;

    let rawProfiles = [];
    let rawDetails = [];

    try {
      let pRes = await supabase
        .from('profiles')
        .select('id, phone, role, full_name, city_zone, created_at');
      if (pRes.error) {
        const fb = await supabase.from('profiles').select('*');
        rawProfiles = fb.data || [];
      } else {
        rawProfiles = pRes.data || [];
      }
    } catch (e) {
      console.warn('[Supabase] profiles fetch error:', e?.message);
    }

    try {
      let dRes = await supabase
        .from('maalem_details')
        .select(
          'id, specialty, cin_number, cin_photo_url, portfolio_urls, status, credit_balance, is_verified, rating_avg, consecutive_five_stars, hundred_dh_recharges_count'
        );
      if (dRes.error) {
        const fb = await supabase.from('maalem_details').select('*');
        rawDetails = fb.data || [];
      } else {
        rawDetails = dRes.data || [];
      }
    } catch (e) {
      console.warn('[Supabase] maalem_details fetch error:', e?.message);
    }

    const detailsMap = new Map((rawDetails || []).map((d) => [String(d.id).trim(), d]));
    const onlineMapFromStorage = getOnlineMaalemsFromStorage();
    const profilesMap = new Map((rawProfiles || []).map((p) => [String(p.id).trim(), p]));

    const maalemProfiles = (rawProfiles || []).filter((m) => {
      const r = String(m.role || '').toLowerCase();
      return r === 'maalem';
    });

    const maalemMapFromPrev = new Map((maalemsRef.current || []).map((m) => [String(m.id).trim(), m]));

    const formattedMaalems = maalemProfiles.map((m) => {
      const cleanId = String(m.id).trim();
      const details = detailsMap.get(cleanId) || {};
      const zone = (m.city_zone || '').toLowerCase();

      // 1. Priorité absolue : Position GPS en direct reçue par Centrifugo / WebSocket
      const livePresence = latestPresenceCoordsRef.current?.get(cleanId);
      // 2. Position existante déjà en mémoire si elle était valide
      const existingMaalem = maalemMapFromPrev.get(cleanId);

      let mLat = livePresence && !isNaN(livePresence.lat)
        ? livePresence.lat
        : parseFloat(m.lat || details.lat);
      let mLng = livePresence && !isNaN(livePresence.lng)
        ? livePresence.lng
        : parseFloat(m.lng || details.lng);

      if (isNaN(mLat) || isNaN(mLng) || mLng >= 0 || mLat < 20 || mLat > 38 || (mLat === 33.5883 && !zone.includes('casablanca'))) {
        if (existingMaalem && !isNaN(existingMaalem.lat) && existingMaalem.lat !== 33.5883 && existingMaalem.lat !== 34.0331) {
          mLat = existingMaalem.lat;
          mLng = existingMaalem.lng;
        } else if (zone.includes('fès') || zone.includes('fes')) {
          mLat = 34.0331;
          mLng = -5.0003;
        } else if (zone.includes('rabat')) {
          mLat = 34.0209;
          mLng = -6.8416;
        } else if (zone.includes('marrakech')) {
          mLat = 31.6295;
          mLng = -7.9811;
        } else if (zone.includes('tanger')) {
          mLat = 35.7595;
          mLng = -5.834;
        } else if (zone.includes('agadir')) {
          mLat = 30.4278;
          mLng = -9.5981;
        } else {
          mLat = 33.5883;
          mLng = -7.6328;
        }
      }

      const isThisSelf = user && String(user.id).trim() === String(m.id).trim();
      const storageEntry = onlineMapFromStorage[m.id];
      const isOnline = isThisSelf
        ? Boolean(isMaalemOnline)
        : (details.is_online !== undefined ? Boolean(details.is_online) : Boolean(storageEntry));

      const directDbCredit = details.credit_balance !== undefined && details.credit_balance !== null
        ? Number(details.credit_balance)
        : (m.credits !== undefined && m.credits !== null ? Number(m.credits) : 15.0);

      const isBalanceProtected = isThisSelf && user && (
        isEntityInGracePeriod('BALANCE', user.id) ||
        isEntityInGracePeriod('MAALEM', user.id)
      );

      if (isThisSelf && user && !isBalanceProtected && (user.credits === undefined || Number(user.credits) !== directDbCredit)) {
        const updatedSelf = {
          ...user,
          credits: directDbCredit,
          maalem_details: {
            ...(user.maalem_details || {}),
            credit_balance: directDbCredit
          }
        };
        setUser(updatedSelf);
        try {
          sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedSelf));
          localStorage.setItem('bricolemoi_session', JSON.stringify(updatedSelf));
        } catch (e) {}
      }

      return {
        id: m.id,
        full_name: m.full_name || 'Artisan Maalem',
        phone: m.phone || '',
        specialty: details.specialty || m.specialty || 'PLUMBING',
        rating_avg: details.rating_avg || 5.0,
        is_verified: details.is_verified ?? true,
        cin_verified: details.is_verified ?? true,
        status: details.status || m.status || 'active',
        portfolio_urls: details.portfolio_urls || m.portfolio_urls || [],
        is_online: isOnline,
        is_available: isOnline,
        lat: mLat,
        lng: mLng,
        credit_balance: directDbCredit,
        district: m.city_zone || 'Casablanca'
      };
    });

    const clientProfiles = (rawProfiles || [])
      .filter((p) => String(p.role || '').toLowerCase() !== 'maalem')
      .map((c) => ({
        id: c.id,
        full_name: c.full_name || 'Client BricoleMoi',
        phone: c.phone || 'Non renseigné',
        city_zone: c.city_zone || 'Casablanca',
        district: c.city_zone || 'Casablanca',
        created_at: c.created_at || new Date().toISOString(),
        is_suspended: false,
        role: c.role || 'client'
      }));

    if (user && String(user.role || '').toUpperCase() === 'CLIENT') {
      const alreadyInList = clientProfiles.some(
        (c) => String(c.id).trim() === String(user.id).trim()
      );
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

    const clientMap = new Map(clientProfiles.map((c) => [String(c.id).trim(), c]));
    const maalemMap = new Map(formattedMaalems.map((m) => [String(m.id).trim(), m]));

    let reviewsMap = new Map();
    try {
      const { data: realReviews } = await supabase
        .from('reviews')
        .select('id, intervention_id, maalem_id, client_id, rating, comment, badges, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (realReviews) {
        const enrichedReviews = realReviews.map((r) => {
          const clientP =
            profilesMap.get(String(r.client_id).trim()) || clientMap.get(String(r.client_id).trim());
          return normalizeReviewRecord({
            ...r,
            client_name: clientP?.full_name || 'Client BricoleMoi'
          });
        }).filter(Boolean);

        setReviews(enrichedReviews);
        try {
          localStorage.setItem('bricolemoi_reviews_cache', JSON.stringify(enrichedReviews));
        } catch (e) {}
        reviewsMap = new Map(enrichedReviews.map((r) => [String(r.intervention_id).trim(), r]));
      }
    } catch (e) {}

    try {
      let intvData = null;
      const { data: realInterventions, error: intvErr } = await supabase
        .from('interventions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (intvErr) {
        const fb = await supabase
          .from('interventions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        intvData = fb.data;
      } else {
        intvData = realInterventions;
      }

      if (intvData) {
        let myUnlocked = [];
        try {
          myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
        } catch (e) {}

        intvData.forEach((intv) => {
          const cId = String(intv.client_id || '').trim();
          const cPhone = intv.client_phone ? String(intv.client_phone).trim() : '';
          if (cId && !clientMap.has(cId)) {
            const clientProf = profilesMap.get(cId);
            clientMap.set(cId, {
              id: cId,
              full_name:
                clientProf?.full_name || intv.client_name || `Client #${cId.slice(0, 6)}`,
              phone: clientProf?.phone || cPhone || 'Non renseigné',
              city_zone: clientProf?.city_zone || intv.district || 'Casablanca',
              district: clientProf?.city_zone || intv.district || 'Casablanca',
              created_at: intv.created_at || new Date().toISOString(),
              is_suspended: false,
              role: 'CLIENT'
            });
          }

          const mId = String(intv.maalem_id || '').trim();
          if (mId && !maalemMap.has(mId)) {
            const maalemProf = profilesMap.get(mId);
            const details = detailsMap.get(mId) || {};
            maalemMap.set(mId, normalizeMaalemProfile({
              id: mId,
              full_name:
                maalemProf?.full_name || intv.maalem_name || `Artisan Maâlem #${mId.slice(0, 6)}`,
              phone: maalemProf?.phone || intv.maalem_phone || '',
              specialty: details.specialty || intv.service_type || 'PLUMBING',
              is_verified: true,
              cin_verified: true,
              portfolio_urls: details.portfolio_urls || [],
              is_online: false,
              is_available: false,
              lat: intv.lat,
              lng: intv.lng,
              credit_balance: 15.0,
              district: intv.district || 'Casablanca'
            }));
          }
        });

        const normContext = {
          clientsMap: clientMap,
          maalemsMap: maalemMap,
          profilesMap,
          reviewsMap
        };

        const enrichedInterventions = intvData.map((intv) => {
          return normalizeIntervention(intv, normContext);
        }).filter(Boolean);

        setInterventions((prev) => {
          const merged = mergeInterventions(prev, enrichedInterventions);
          saveCache('bricolemoi_interventions_cache', merged);
          return merged;
        });
      }
    } catch (e) {}

    const finalClients = Array.from(clientMap.values());
    const finalMaalems = Array.from(maalemMap.values()).map(normalizeMaalemProfile).filter(Boolean);

    setClients((prev) => {
      const clientMapMerged = new Map((prev || []).map((c) => [String(c.id).trim(), c]));
      finalClients.forEach((c) => {
        const existing = clientMapMerged.get(String(c.id).trim());
        clientMapMerged.set(String(c.id).trim(), { ...existing, ...c });
      });
      const merged = Array.from(clientMapMerged.values());
      saveCache('bricolemoi_clients_cache', merged);
      return merged;
    });

    setMaalems((prev) => {
      const merged = mergeMaalems(prev, finalMaalems, userRef.current);
      saveCache('bricolemoi_maalems_cache', merged);
      return merged;
    });

    try {
      const { data: realTransactions } = await supabase
        .from('transactions')
        .select(
          'id, maalem_id, maalem_name, maalem_phone, amount_dh, type, payment_method, reference_ref, status, created_at, admin_notes'
        )
        .order('created_at', { ascending: false })
        .limit(50);

      if (realTransactions) {
        const enrichedTx = realTransactions.map((tx) => {
          const p =
            profilesMap.get(String(tx.maalem_id).trim()) ||
            maalemMap.get(String(tx.maalem_id).trim());

          const isUser =
            user &&
            (String(user.id).trim() === String(tx.maalem_id).trim() ||
              (tx.maalem_phone && user.phone && String(tx.maalem_phone).replace(/\D/g, '').slice(-9) === String(user.phone).replace(/\D/g, '').slice(-9)));

          return {
            ...tx,
            status: tx.status,
            admin_notes: tx.admin_notes,
            maalem_name:
              tx.maalem_name ||
              p?.full_name ||
              (isUser ? user?.full_name : 'Artisan Maalem'),
            maalem_phone:
              tx.maalem_phone ||
              p?.phone ||
              (isUser ? user?.phone : '')
          };
        });

        setTransactions((prev) => {
          const merged = mergeTransactions(prev, enrichedTx);
          saveCache('bricolemoi_transactions_cache', merged);
          return merged;
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchRealSupabaseData();

    const onFocusOrVisible = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchRealSupabaseData();
      }
    };

    const onOnline = () => fetchRealSupabaseData();

    window.addEventListener('focus', onFocusOrVisible);
    window.addEventListener('online', onOnline);
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onFocusOrVisible);
    }

    // Polling doux de sécurité (5s si une mission est active/en attente, sinon 30s)
    const pollInterval = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;

      const hasActiveMission = (interventionsRef.current || []).some((i) =>
        [
          'PENDING',
          'ACCEPTED',
          'ON_THE_WAY',
          'ARRIVED',
          'IN_PROGRESS',
          'PENDING_COMPLETION'
        ].includes(i.status)
      );

      if (hasActiveMission) {
        fetchRealSupabaseData();
      }
    }, 5000);

    // Écouteur de synchronisation multi-onglets & multi-appareils
    let bc = null;
    try {
      bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.onmessage = (e) => {
        const payload = e.data;
        if (!payload) return;

        if (payload.type === 'INTERVENTION_ACCEPTED' || payload.type === 'SOS_CLAIMED') {
          const acceptedIntv = payload.intervention || {};
          const intId = String(acceptedIntv.id || payload.intervention_id || '').trim();
          const targetMaalemId = String(acceptedIntv.maalem_id || payload.maalem_id || '').trim();
          const newBal = payload.new_balance;

          setInterventions((prev) => {
            const next = prev.map((item) =>
              isMatchingInterventionId(item.id, intId) || (acceptedIntv.uuid && isMatchingInterventionId(item.id, acceptedIntv.uuid))
                ? {
                    ...item,
                    status: 'ACCEPTED',
                    progress_step: acceptedIntv.progress_step || 'ON_THE_WAY',
                    maalem_id: acceptedIntv.maalem_id || payload.maalem_id || item.maalem_id,
                    maalem_name: acceptedIntv.maalem_name || payload.maalem_name || item.maalem_name,
                    maalem_phone: acceptedIntv.maalem_phone || payload.maalem_phone || item.maalem_phone,
                    accepted_at: acceptedIntv.accepted_at || new Date().toISOString()
                  }
                : item
            );
            return next;
          });

          if (payload.transaction) {
            setTransactions((prev) => {
              const alreadyExists = prev.some((t) => String(t.id).trim() === String(payload.transaction.id).trim());
              if (alreadyExists) return prev;
              const nextTxs = [payload.transaction, ...prev];
              return nextTxs;
            });
          }

          if (targetMaalemId && newBal !== undefined) {
            setMaalems((prev) =>
              prev.map((m) =>
                String(m.id).trim() === targetMaalemId
                  ? { ...m, credit_balance: newBal }
                  : m
              )
            );
          }
        }

        if (payload.type === 'INTERVENTION_PROGRESS_UPDATED') {
          const intId = String(payload.intervention_id || '').trim();
          const pStep = payload.progress_step;
          setInterventions((prev) => {
            const next = prev.map((item) =>
              String(item.id).trim() === intId
                ? {
                    ...item,
                    progress_step: pStep,
                    status: item.status === 'PENDING' || !item.status ? 'ACCEPTED' : item.status,
                    maalem_id: payload.maalem_id || item.maalem_id,
                    maalem_name: payload.maalem_name || item.maalem_name,
                    maalem_phone: payload.maalem_phone || item.maalem_phone
                  }
                : item
            );
            try {
              localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
            } catch (err) {}
            return next;
          });
        }

        if (payload.type === 'ON_SITE_REVIEW_REQUESTED' || payload.type === 'WORK_COMPLETION_REQUESTED') {
          const intId = String(payload.intervention_id || '').trim();
          setInterventions((prev) => {
            const next = prev.map((item) =>
              String(item.id).trim() === intId
                ? {
                    ...item,
                    status: 'PENDING_COMPLETION',
                    on_site_review_requested: true,
                    maalem_id: payload.maalem_id || item.maalem_id,
                    maalem_name: payload.maalem_name || item.maalem_name,
                    maalem_phone: payload.maalem_phone || item.maalem_phone,
                    final_agreed_price: payload.final_agreed_price || item.final_agreed_price
                  }
                : item
            );
            try {
              localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
            } catch (err) {}
            return next;
          });
        }

        if (payload.type === 'MAALEM_BALANCE_UPDATED') {
          const mId = String(payload.maalemId || payload.maalem_id || '').trim();
          const newBal = Number(payload.newBalance ?? payload.new_balance);
          if (mId && !isNaN(newBal)) {
            setMaalems((prev) =>
              prev.map((m) =>
                String(m.id).trim() === mId ? { ...m, credit_balance: newBal } : m
              )
            );
            const curr = userRef.current;
            if (curr && String(curr.id).trim() === mId) {
              const updatedSelf = {
                ...curr,
                credits: newBal,
                maalem_details: {
                  ...(curr.maalem_details || {}),
                  credit_balance: newBal
                }
              };
              setUser(updatedSelf);
              try {
                sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedSelf));
              } catch (e) {}
            }
          }
          fetchRealSupabaseData();
        }

        if (payload.type === 'INTERVENTION_CANCELLED') {
          const intId = String(payload.intervention_id || '').trim();
          if (intId) {
            setInterventions((prev) => {
              const next = prev.map((item) =>
                String(item.id).trim() === intId
                  ? {
                      ...item,
                      status: 'CANCELLED',
                      cancelled_by: payload.cancelled_by || 'CLIENT',
                      cancelled_at: payload.cancelled_at || new Date().toISOString()
                    }
                  : item
              );
              try {
                localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
              } catch (e) {}
              return next;
            });
          }
        }

        if (payload.type === 'INTERVENTION_UNFEASIBLE') {
          const intId = String(payload.intervention_id || '').trim();
          if (intId) {
            setInterventions((prev) => {
              const next = prev.map((item) =>
                String(item.id).trim() === intId
                  ? {
                      ...item,
                      status: 'UNFEASIBLE',
                      unfeasible_reason: payload.reason || item.unfeasible_reason,
                      unfeasible_notes: payload.notes || item.unfeasible_notes,
                      unfeasible_reported_at: new Date().toISOString()
                    }
                  : item
              );
              try {
                localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
              } catch (e) {}
              return next;
            });
          }
        }

        if (payload.type === 'INTERVENTION_COMPLETED_WITH_REVIEW' || payload.type === 'INTERVENTION_COMPLETED') {
          const intId = String(payload.intervention_id || '').trim();
          const rRating = payload.rating !== undefined && payload.rating !== null ? Number(payload.rating) : null;
          const rComment = payload.comment || null;

          setInterventions((prev) => {
            const next = prev.map((item) =>
              String(item.id).trim() === intId
                ? {
                    ...item,
                    status: 'COMPLETED',
                    progress_step: 'COMPLETED',
                    rating: rRating ?? item.rating,
                    comment: rComment || item.comment
                  }
                : item
            );
            try {
              localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
            } catch (err) {}
            return next;
          });

          if (rRating !== null) {
            setReviews((prev) => {
              const next = [
                {
                  id: 'rev-' + Date.now(),
                  intervention_id: intId,
                  rating: rRating,
                  comment: rComment,
                  badges: payload.badges || [],
                  created_at: new Date().toISOString()
                },
                ...prev.filter((r) => String(r.intervention_id).trim() !== intId)
              ];
              try {
                localStorage.setItem('bricolemoi_reviews_cache', JSON.stringify(next));
              } catch (err) {}
              return next;
            });
          }
        }
      };
    } catch (e) {}

    // Écoute Ably universelle JOBS_STREAM pour diffusion instantanée cross-devices
    let ablyUnsubJobs = null;
    let ablyUnsubUser = null;
    try {
      ablyUnsubJobs = subscribeToRealtimeChannel(
        ABLY_CHANNELS.JOBS_STREAM,
        ({ event, payload }) => {
          if (!payload) return;
          const intId = String(payload.intervention_id || payload.intervention?.id || '').trim();

          if (event === 'job_accepted' || event === 'job:accepted' || event === 'sos:claimed') {
            if (intId) {
              const currentUserId = String(userRef?.current?.id || user?.id || '').trim();
              const claimerId = String(payload.maalem_id || '').trim();

              if (userRef?.current?.role === 'MAALEM' && claimerId && claimerId !== currentUserId) {
                const cityName = payload.district || payload.city || 'votre secteur';
                const sType = payload.service_type || 'SOS';
                showToast(`⚡ Un confrère vient de débloquer la mission ${sType} à ${cityName}.`, 'info');
              }

              setInterventions((prev) => {
                const next = prev.map((item) =>
                  isMatchingInterventionId(item.id, intId) || (payload.uuid && isMatchingInterventionId(item.id, payload.uuid))
                    ? {
                        ...item,
                        status: 'ACCEPTED',
                        progress_step: 'ON_THE_WAY',
                        escrow_status: 'DEBITED',
                        maalem_id: payload.maalem_id || item.maalem_id,
                        maalem_name: payload.maalem_name || item.maalem_name,
                        maalem_phone: payload.maalem_phone || item.maalem_phone
                      }
                    : item
                );
                try {
                  localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
                } catch (e) {}
                return next;
              });
            }
          } else if (event === 'job_progress' || event === 'job:progress') {
            if (intId) {
              setInterventions((prev) => {
                const next = prev.map((item) =>
                  isMatchingInterventionId(item.id, intId) || (payload.uuid && isMatchingInterventionId(item.id, payload.uuid))
                    ? { ...item, progress_step: payload.progress_step || payload.step || item.progress_step }
                    : item
                );
                try {
                  localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
                } catch (e) {}
                return next;
              });
            }
          } else if (event === 'job_cancelled' || event === 'job:cancelled' || event === 'sos:cancelled') {
            if (intId) {
              setInterventions((prev) => {
                const next = prev.map((item) =>
                  isMatchingInterventionId(item.id, intId) || (payload.uuid && isMatchingInterventionId(item.id, payload.uuid))
                    ? {
                        ...item,
                        status: 'CANCELLED',
                        cancelled_by: payload.cancelled_by || 'CLIENT',
                        cancelled_at: payload.cancelled_at || new Date().toISOString()
                      }
                    : item
                );
                try {
                  localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
                } catch (e) {}
                return next;
              });
            }
          } else if (event === 'job_unfeasible' || event === 'job:unfeasible') {
            if (intId) {
              setInterventions((prev) => {
                const next = prev.map((item) =>
                  isMatchingInterventionId(item.id, intId) || (payload.uuid && isMatchingInterventionId(item.id, payload.uuid))
                    ? {
                        ...item,
                        status: 'UNFEASIBLE',
                        unfeasible_reason: payload.reason || item.unfeasible_reason,
                        unfeasible_notes: payload.notes || item.unfeasible_notes,
                        unfeasible_reported_at: payload.unfeasible_reported_at || new Date().toISOString()
                      }
                    : item
                );
                try {
                  localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(next));
                } catch (e) {}
                return next;
              });
            }
          }
        },
        user?.id || 'sync-client'
      );

      // Écoute des notifications personnelles Maâlem (crédits / cadeaux / recharges)
      if (user?.id) {
        ablyUnsubUser = subscribeToRealtimeChannel(
          ABLY_CHANNELS.getUserChannel(user.id),
          ({ event, payload }) => {
            if (!payload) return;
            if (event === 'credit:added' || event === 'recharge:approved') {
              const newBal = Number(payload.new_balance ?? payload.newBalance);
              if (!isNaN(newBal)) {
                setMaalems((prev) =>
                  prev.map((m) =>
                    String(m.id).trim() === String(user.id).trim()
                      ? { ...m, credit_balance: newBal }
                      : m
                  )
                );
                setUser((prev) => ({
                  ...prev,
                  credits: newBal,
                  maalem_details: {
                    ...(prev?.maalem_details || {}),
                    credit_balance: newBal
                  }
                }));
              }
              playNotificationSound('SUCCESS');
              showToast(
                `🎁 Crédit actualisé : +${payload.amount || 15} DH (${payload.reason || "Crédit Admin"})`,
                'success'
              );
              fetchRealSupabaseData();
            }
          },
          user.id
        );
      }
    } catch (e) {}

    let supabaseChannel = null;
    if (isSupabaseConfigured) {
      try {
        supabaseChannel = supabase
          .channel('public:platform_realtime_sync')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'interventions' },
            (payload) => {
              if (payload.new) {
                const item = payload.new;
                setInterventions((prev) => {
                  const existing = prev.find(
                    (i) => isMatchingInterventionId(i.id, item.id) || (item.uuid && isMatchingInterventionId(i.id, item.uuid))
                  );
                  const enriched = {
                    ...(existing || {}),
                    ...item,
                    maalem_name: item.maalem_name || existing?.maalem_name,
                    maalem_phone: item.maalem_phone || existing?.maalem_phone,
                    client_name: item.client_name || existing?.client_name,
                    client_phone: item.client_phone || existing?.client_phone
                  };
                  const next = existing
                    ? prev.map((i) =>
                        isMatchingInterventionId(i.id, item.id) || (item.uuid && isMatchingInterventionId(i.id, item.uuid)) ? enriched : i
                      )
                    : [enriched, ...prev];
                  try {
                    localStorage.setItem(
                      'bricolemoi_interventions_cache',
                      JSON.stringify(next)
                    );
                  } catch (e) {}
                  return next;
                });
              }
            }
          )
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'maalem_details' },
            (payload) => {
              if (payload.new) {
                const mDetail = payload.new;
                const mId = String(mDetail.id || '').trim();
                const newBal = Number(mDetail.credit_balance);
                if (mId && !isNaN(newBal)) {
                  setMaalems((prev) =>
                    prev.map((m) =>
                      String(m.id).trim() === mId
                        ? { ...m, credit_balance: newBal }
                        : m
                    )
                  );
                  const curr = userRef.current;
                  if (curr && String(curr.id).trim() === mId) {
                    setUser((prev) => ({
                      ...prev,
                      credits: newBal,
                      maalem_details: {
                        ...(prev?.maalem_details || {}),
                        credit_balance: newBal
                      }
                    }));
                  }
                }
              }
            }
          )
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'transactions' },
            () => {
              fetchRealSupabaseData();
            }
          )
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'reviews' },
            () => {
              fetchRealSupabaseData();
            }
          )
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'profiles' },
            () => {
              fetchRealSupabaseData();
            }
          )
          .subscribe();
      } catch (e) {
        console.warn('[Supabase Realtime Sync Warning]:', e);
      }
    }

    return () => {
      window.removeEventListener('focus', onFocusOrVisible);
      window.removeEventListener('online', onOnline);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onFocusOrVisible);
      }
      clearInterval(pollInterval);
      if (ablyUnsubJobs) {
        try {
          ablyUnsubJobs();
        } catch (e) {}
      }
      if (ablyUnsubUser) {
        try {
          ablyUnsubUser();
        } catch (e) {}
      }
      if (supabaseChannel) {
        try {
          supabase.removeChannel(supabaseChannel);
        } catch (e) {}
      }
    };
  }, [isAblyConnected]);

  return {
    isAblyConnected,
    ablyConnectionState,
    ablyOnlineMaalemsCount,
    ablyOnlineMaalems,
    isAblyConfigured,
    toggleMaalemOnlineStatus,
    fetchRealSupabaseData
  };
};

export const useAblySupabaseSync = usePlatformDataSync;
