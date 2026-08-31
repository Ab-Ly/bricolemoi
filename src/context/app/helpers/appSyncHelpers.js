import { getAppSubdomain } from '../../../lib/subdomain';
import { db, isDbConfigured, supabase, isSupabaseConfigured } from '../../../lib/dbClient';

export const isUuid = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

/**
 * Compare deux identifiants d'interventions de manière tolérante
 * Supporte indifféremment l'égalité exacte, l'UUID 36 chars et l'ID 15 chars PocketBase
 */
export const isMatchingInterventionId = (id1, id2) => {
  if (!id1 || !id2) return false;
  const s1 = String(id1).trim().toLowerCase();
  const s2 = String(id2).trim().toLowerCase();
  if (s1 === s2) return true;
  const c1 = s1.replace(/[^a-z0-9]/g, '');
  const c2 = s2.replace(/[^a-z0-9]/g, '');
  if (c1 === c2) return true;
  if (c1.length >= 15 && c2.length >= 15 && c1.slice(0, 15) === c2.slice(0, 15)) return true;
  return false;
};

export const generateUuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Haversine formula — distance en km
export const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
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

export const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';
export const DUMMY_MAALEM_ID = '22222222-2222-2222-2222-222222222222';

export const toSafeUUID = (id, fallback = DUMMY_MAALEM_ID) => {
  if (!id) return fallback;
  const str = String(id).trim();
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) return str;
  const digits = str.replace(/\D/g, '').padEnd(12, '0').slice(-12);
  return `22222222-2222-2222-2222-${digits}`;
};

export const isCurrentUserClientOf = (intv, userRef) => {
  if (!intv) return false;
  const currentApp = getAppSubdomain();
  if (currentApp === 'ADMIN' || currentApp === 'MAALEM') return false;

  const curr = userRef?.current;
  const currentRole = String(curr?.role || '').toUpperCase();
  if (currentRole === 'ADMIN' || currentRole === 'MAALEM') return false;

  const intvId = String(intv.id || intv.intervention_id || '').trim();
  try {
    const myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
    if (intvId && myCreated.some((createdId) => isMatchingInterventionId(createdId, intvId))) return true;
  } catch (e) {}

  if (!curr) return false;

  if (
    curr.id &&
    curr.id !== DUMMY_CLIENT_ID &&
    intv.client_id &&
    intv.client_id !== DUMMY_CLIENT_ID &&
    String(intv.client_id).trim() === String(curr.id).trim()
  ) {
    return true;
  }

  if (curr.phone && intv.client_phone) {
    const cp = String(curr.phone).replace(/\D/g, '');
    const ip = String(intv.client_phone).replace(/\D/g, '');
    if (cp.length >= 8 && ip.length >= 8 && cp === ip && cp !== '0661234567') {
      return true;
    }
  }

  return false;
};

export const isCurrentUserAssignedMaalemOf = (intv, userRef) => {
  if (!intv) return false;
  const currentApp = getAppSubdomain();
  if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

  const curr = userRef?.current;
  if (!curr) return false;
  const role = String(curr.role || '').toUpperCase();
  if (role !== 'MAALEM') return false;
  const maalemId = intv.maalem_id || intv.maalemId;
  return Boolean(maalemId && String(maalemId).trim() === String(curr.id).trim());
};

export const isCurrentUserEligibleMaalemForNewJob = (intv, userRef, isMaalemOnlineRef) => {
  if (!intv) return false;
  const currentApp = getAppSubdomain();
  if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

  const curr = userRef?.current;
  if (!curr) return false;
  const role = String(curr.role || '').toUpperCase();
  if (role !== 'MAALEM') return false;

  if (isMaalemOnlineRef?.current === false) return false;

  const maalemSpecialty = curr.maalem_details?.specialty || curr.specialty;
  if (maalemSpecialty && maalemSpecialty !== 'ALL' && maalemSpecialty !== 'BOTH' && intv.service_type) {
    if (String(maalemSpecialty).toUpperCase() !== String(intv.service_type).toUpperCase()) {
      return false;
    }
  }

  if (isCurrentUserClientOf(intv, userRef)) return false;

  return true;
};

export const isCurrentUserAdmin = (userRef) => {
  const currentApp = getAppSubdomain();
  if (currentApp !== 'ADMIN') return false;
  const curr = userRef?.current;
  return Boolean(curr && String(curr.role || '').toUpperCase() === 'ADMIN');
};

export const isCurrentUserMaalemOfTransaction = (txOrMaalemId, userRef) => {
  const currentApp = getAppSubdomain();
  if (currentApp === 'ADMIN' || currentApp === 'CLIENT') return false;

  const curr = userRef?.current;
  if (!curr) return false;
  const role = String(curr.role || '').toUpperCase();
  if (role !== 'MAALEM') return false;
  const maalemId =
    typeof txOrMaalemId === 'object'
      ? txOrMaalemId?.maalem_id || txOrMaalemId?.maalemId
      : txOrMaalemId;
  return Boolean(maalemId && String(maalemId).trim() === String(curr.id).trim());
};

export const updateOnlineMaalemInStorage = (maalemId, status, extraData = {}) => {
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

export const getOnlineMaalemsFromStorage = () => {
  try {
    const raw = JSON.parse(localStorage.getItem('bricolemoi_online_maalems_map') || '{}');
    const now = Date.now();
    const activeOnly = {};
    let changed = false;
    Object.entries(raw).forEach(([id, data]) => {
      if (data && data.last_seen_at && now - data.last_seen_at < 90000) {
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

export const getTabId = () => {
  if (typeof window === 'undefined') return 'server';
  if (!window.__bricolemoi_tab_id) {
    window.__bricolemoi_tab_id =
      'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
  }
  return window.__bricolemoi_tab_id;
};

export const broadcastSync = (payload) => {
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
  } catch (e) {}

  try {
    localStorage.setItem(
      'bricolemoi_sync_payload',
      JSON.stringify({
        ...enrichedPayload,
        _sync_time: Date.now() + Math.random()
      })
    );
  } catch (e) {}
};

export const safeSupabaseBroadcast = async (channelName, eventName, payload) => {
  if (!isSupabaseConfigured) return;
  try {
    const channel = supabase.channel(channelName);
    if (typeof channel.httpSend === 'function') {
      await channel.httpSend({ type: 'broadcast', event: eventName, payload });
    } else if (typeof channel.send === 'function') {
      await channel.send({ type: 'broadcast', event: eventName, payload });
    }
  } catch (e) {}
};
