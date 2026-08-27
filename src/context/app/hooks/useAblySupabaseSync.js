import { useEffect, useRef, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient';
import { isAblyConfigured, ABLY_CHANNELS } from '../../../lib/ablyClient';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../../../lib/ablyRealtimeService';
import { useAblyPresence } from '../../../hooks/useAblyPresence';
import { playNotificationSound } from '../../../lib/audioNotifier';
import {
  updateOnlineMaalemInStorage,
  getOnlineMaalemsFromStorage,
  safeSupabaseBroadcast,
  broadcastSync,
  isCurrentUserClientOf,
  isCurrentUserAssignedMaalemOf,
  isCurrentUserEligibleMaalemForNewJob,
  isCurrentUserAdmin,
  isCurrentUserMaalemOfTransaction
} from '../helpers/appSyncHelpers';

export const useAblySupabaseSync = ({
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

  const isMaalemOnlineRef = useRef(isMaalemOnline);
  useEffect(() => {
    isMaalemOnlineRef.current = isMaalemOnline;
  }, [isMaalemOnline]);

  const handleAblyPresenceUpdate = useCallback((presenceMap) => {
    setMaalems((prev) => {
      const maalemMap = new Map(prev.map((m) => [String(m.id).trim(), { ...m }]));
      const onlineIds = new Set(Object.keys(presenceMap).map((k) => String(k).trim()));

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

      if (isSupabaseConfigured) {
        try {
          safeSupabaseBroadcast('public:jobs', 'maalem_heartbeat', hbPayload);
        } catch (e) {}
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 45000);
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

    const formattedMaalems = maalemProfiles.map((m) => {
      const details = detailsMap.get(String(m.id).trim()) || {};
      const zone = (m.city_zone || '').toLowerCase();
      let mLat = parseFloat(m.lat || details.lat);
      let mLng = parseFloat(m.lng || details.lng);

      if (isNaN(mLat) || isNaN(mLng) || mLng >= 0 || mLat < 20 || mLat > 38) {
        if (zone.includes('fès') || zone.includes('fes')) {
          mLat = 34.0331 + (Math.random() - 0.5) * 0.015;
          mLng = -5.0003 + (Math.random() - 0.5) * 0.015;
        } else if (zone.includes('rabat')) {
          mLat = 34.0209 + (Math.random() - 0.5) * 0.015;
          mLng = -6.8416 + (Math.random() - 0.5) * 0.015;
        } else if (zone.includes('marrakech')) {
          mLat = 31.6295 + (Math.random() - 0.5) * 0.015;
          mLng = -7.9811 + (Math.random() - 0.5) * 0.015;
        } else if (zone.includes('tanger')) {
          mLat = 35.7595 + (Math.random() - 0.5) * 0.015;
          mLng = -5.834 + (Math.random() - 0.5) * 0.015;
        } else if (zone.includes('agadir')) {
          mLat = 30.4278 + (Math.random() - 0.5) * 0.015;
          mLng = -9.5981 + (Math.random() - 0.5) * 0.015;
        } else {
          mLat = 33.5883 + (Math.random() - 0.5) * 0.015;
          mLng = -7.6328 + (Math.random() - 0.5) * 0.015;
        }
      }

      const isThisSelf = user && String(user.id).trim() === String(m.id).trim();
      const storageEntry = onlineMapFromStorage[m.id];
      const isFreshHeartbeat = Boolean(
        storageEntry && storageEntry.last_seen_at && Date.now() - storageEntry.last_seen_at < 90000
      );
      const onlineStatus = isThisSelf ? Boolean(isMaalemOnline) : isFreshHeartbeat;

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
        is_online: onlineStatus,
        is_available: onlineStatus,
        lat: mLat,
        lng: mLng,
        credit_balance: isThisSelf
          ? user.credits !== undefined && user.credits !== null
            ? Number(user.credits)
            : user.maalem_details?.credit_balance !== undefined &&
              user.maalem_details?.credit_balance !== null
            ? Number(user.maalem_details.credit_balance)
            : details.credit_balance ?? m.credits ?? 15.0
          : details.credit_balance !== undefined && details.credit_balance !== null
          ? Number(details.credit_balance)
          : m.credits !== undefined && m.credits !== null
          ? Number(m.credits)
          : 15.0,
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
        .limit(30);

      if (realReviews) {
        const enrichedReviews = realReviews.map((r) => {
          const clientP =
            profilesMap.get(String(r.client_id).trim()) || clientMap.get(String(r.client_id).trim());
          return {
            ...r,
            client_name: clientP?.full_name || 'Client BricoleMoi'
          };
        });
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
        .select(
          'id, client_id, maalem_id, service_type, district, description_photo, audio_note_url, estimated_price_min, estimated_price_max, final_agreed_price, status, cost_lead, created_at'
        )
        .order('created_at', { ascending: false })
        .limit(50);

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
            maalemMap.set(mId, {
              id: mId,
              full_name:
                maalemProf?.full_name || intv.maalem_name || `Artisan Maâlem #${mId.slice(0, 6)}`,
              phone: maalemProf?.phone || intv.maalem_phone || '',
              specialty: details.specialty || intv.service_type || 'PLUMBING',
              rating_avg: details.rating_avg || 5.0,
              is_verified: true,
              cin_verified: true,
              status: 'active',
              portfolio_urls: details.portfolio_urls || [],
              is_online: false,
              is_available: false,
              lat: intv.lat || 33.5883,
              lng: intv.lng || -7.6328,
              credit_balance: 15.0,
              district: intv.district || 'Casablanca'
            });
          }
        });

        const enrichedInterventions = intvData.map((intv) => {
          const clientProf =
            clientMap.get(String(intv.client_id || '').trim()) ||
            profilesMap.get(String(intv.client_id).trim());
          const maalemProf =
            maalemMap.get(String(intv.maalem_id || '').trim()) ||
            profilesMap.get(String(intv.maalem_id).trim());
          const rev = reviewsMap.get(String(intv.id).trim());
          const isLocallyUnlocked = myUnlocked.includes(String(intv.id).trim());

          return {
            ...intv,
            status: isLocallyUnlocked && intv.status === 'PENDING' ? 'ACCEPTED' : intv.status,
            maalem_id:
              isLocallyUnlocked && !intv.maalem_id
                ? user?.id || '22222222-2222-2222-2222-222222222222'
                : intv.maalem_id,
            rating: intv.rating ?? rev?.rating ?? null,
            comment: intv.comment || rev?.comment || null,
            client_name: clientProf?.full_name || intv.client_name || 'Client BricoleMoi',
            client_phone: clientProf?.phone || intv.client_phone || '0661-234567',
            maalem_name:
              maalemProf?.full_name ||
              intv.maalem_name ||
              (intv.maalem_id ? 'Artisan Maalem' : null),
            maalem_phone: maalemProf?.phone || intv.maalem_phone || ''
          };
        });
        setInterventions(enrichedInterventions);
      }
    } catch (e) {}

    const finalClients = Array.from(clientMap.values());
    const finalMaalems = Array.from(maalemMap.values());

    setClients(finalClients);
    setMaalems(finalMaalems);
    try {
      localStorage.setItem('bricolemoi_clients_cache', JSON.stringify(finalClients));
      localStorage.setItem('bricolemoi_maalems_cache', JSON.stringify(finalMaalems));
    } catch (e) {}

    try {
      const { data: realTransactions } = await supabase
        .from('transactions')
        .select(
          'id, maalem_id, amount_dh, type, payment_method, reference_ref, status, created_at'
        )
        .order('created_at', { ascending: false })
        .limit(50);

      if (realTransactions) {
        let cachedMap = new Map();
        try {
          const cachedRaw = localStorage.getItem('bricolemoi_transactions_cache');
          if (cachedRaw) {
            const parsed = JSON.parse(cachedRaw);
            (parsed || []).forEach((c) => {
              if (c.id) cachedMap.set(String(c.id).trim(), c);
              if (c.reference_ref)
                cachedMap.set(String(c.reference_ref).trim().toLowerCase(), c);
            });
          }
        } catch (e) {}

        const enrichedTx = realTransactions.map((tx) => {
          const p =
            profilesMap.get(String(tx.maalem_id).trim()) ||
            maalemMap.get(String(tx.maalem_id).trim());
          const cachedMatch =
            cachedMap.get(String(tx.id).trim()) ||
            (tx.reference_ref && cachedMap.get(String(tx.reference_ref).trim().toLowerCase()));
          const effectiveStatus =
            cachedMatch && cachedMatch.status !== 'PENDING' ? cachedMatch.status : tx.status;
          const effectiveNotes = cachedMatch?.admin_notes || tx.admin_notes;

          return {
            ...tx,
            status: effectiveStatus,
            admin_notes: effectiveNotes,
            maalem_name:
              p?.full_name ||
              tx.maalem_name ||
              (user?.id === tx.maalem_id ? user?.full_name : 'Artisan Maalem'),
            maalem_phone:
              p?.phone ||
              tx.maalem_phone ||
              (user?.id === tx.maalem_id ? user?.phone : '')
          };
        });
        setTransactions(enrichedTx);
        try {
          localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(enrichedTx));
        } catch (e) {}
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

    // Polling doux de sécurité (30s uniquement si l'onglet est actif et qu'une mission est en cours)
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

      // Si Ably est actif, les mises à jour sont déjà poussées en direct (<50ms).
      // Le polling ne sert que de filet de sécurité à basse consommation.
      if (hasActiveMission && !isAblyConnected) {
        fetchRealSupabaseData();
      }
    }, 30000);

    let supabaseChannel = null;
    if (isSupabaseConfigured) {
      try {
        supabaseChannel = supabase
          .channel('public:interventions_realtime_sync')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'interventions' },
            (payload) => {
              if (payload.new) {
                const item = payload.new;
                setInterventions((prev) => {
                  const exists = prev.some(
                    (i) => String(i.id).trim() === String(item.id).trim()
                  );
                  const next = exists
                    ? prev.map((i) =>
                        String(i.id).trim() === String(item.id).trim() ? { ...i, ...item } : i
                      )
                    : [item, ...prev];
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
