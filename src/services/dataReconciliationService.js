/**
 * Moteur de Réconciliation Non-Destructive & Gestion des Mutations Optimistes
 * BricoleMoi - Architecture Mobile & Cloud VPS OVH
 * 
 * Garantit que les données distantes (polling Supabase/PocketBase, Realtime)
 * ne peuvent JAMAIS écraser ou rétrograder un état local en cours d'exécution.
 */

import { isMatchingInterventionId } from '../context/app/helpers/appSyncHelpers';

// Durée par défaut de la période de grâce des mutations locales (15 secondes)
export const DEFAULT_GRACE_PERIOD_MS = 15000;

// Registre mémoire des mutations en cours (entité -> timestamp d'expiration)
const activeMutationsRegistry = new Map();

/**
 * Normalise la clé d'entité pour le registre
 */
const getMutationKey = (entityType, entityId) => {
  if (!entityType || !entityId) return null;
  return `${String(entityType).toUpperCase()}_${String(entityId).trim().toLowerCase()}`;
};

/**
 * Enregistre une mutation locale avec période de grâce
 * @param {'INTERVENTION' | 'TRANSACTION' | 'BALANCE' | 'MAALEM'} entityType
 * @param {string} entityId
 * @param {number} [durationMs=15000]
 */
export const recordLocalMutation = (entityType, entityId, durationMs = DEFAULT_GRACE_PERIOD_MS) => {
  const key = getMutationKey(entityType, entityId);
  if (!key) return;
  const expiresAt = Date.now() + durationMs;
  activeMutationsRegistry.set(key, expiresAt);

  try {
    const raw = JSON.parse(localStorage.getItem('bricolemoi_active_mutations') || '{}');
    raw[key] = expiresAt;
    localStorage.setItem('bricolemoi_active_mutations', JSON.stringify(raw));
  } catch (e) {}
};

/**
 * Vérifie si une entité est actuellement protégée par sa période de grâce optimiste
 * @param {'INTERVENTION' | 'TRANSACTION' | 'BALANCE' | 'MAALEM'} entityType
 * @param {string} entityId
 * @returns {boolean}
 */
export const isEntityInGracePeriod = (entityType, entityId) => {
  const key = getMutationKey(entityType, entityId);
  if (!key) return false;

  const now = Date.now();
  const memExp = activeMutationsRegistry.get(key);
  if (memExp && memExp > now) return true;

  try {
    const raw = JSON.parse(localStorage.getItem('bricolemoi_active_mutations') || '{}');
    const storageExp = raw[key];
    if (storageExp && storageExp > now) {
      activeMutationsRegistry.set(key, storageExp);
      return true;
    }
  } catch (e) {}

  return false;
};

/**
 * Libère manuellement la période de grâce d'une entité
 */
export const clearLocalMutation = (entityType, entityId) => {
  const key = getMutationKey(entityType, entityId);
  if (!key) return;
  activeMutationsRegistry.delete(key);
  try {
    const raw = JSON.parse(localStorage.getItem('bricolemoi_active_mutations') || '{}');
    delete raw[key];
    localStorage.setItem('bricolemoi_active_mutations', JSON.stringify(raw));
  } catch (e) {}
};

/**
 * Hiérarchie de progression des statuts d'intervention SOS
 * Empêche une lecture serveur en retard de rétrograder une mission avancée
 */
const STATUS_WEIGHT = {
  'CANCELLED': 100,
  'COMPLETED': 90,
  'PENDING_COMPLETION': 80,
  'IN_PROGRESS': 70,
  'ARRIVED': 60,
  'ON_THE_WAY': 50,
  'ACCEPTED': 40,
  'PENDING': 10
};

/**
 * Réconciliation non-destructive des interventions
 * - Conserve les interventions locales absentes de la liste distante
 * - Empêche la régression de statut (ex: PENDING ne peut pas écraser ACCEPTED)
 * - Privilégie la version locale si protégée par la période de grâce
 */
export const mergeInterventions = (localList = [], remoteList = []) => {
  if (!Array.isArray(remoteList)) return localList || [];
  if (!Array.isArray(localList) || localList.length === 0) return remoteList;

  const mergedMap = new Map();

  // 1. Indexer les éléments distants
  remoteList.forEach((remoteItem) => {
    if (!remoteItem) return;
    const rId = String(remoteItem.id || remoteItem.uuid || '').trim();
    if (rId) {
      mergedMap.set(rId, { ...remoteItem });
    }
  });

  // 2. Fusionner avec les éléments locaux
  localList.forEach((localItem) => {
    if (!localItem) return;
    const lId = String(localItem.id || localItem.uuid || '').trim();
    if (!lId) return;

    // Trouver si une correspondance existe déjà dans mergedMap
    let matchedRemoteKey = null;
    for (const [rKey, rVal] of mergedMap.entries()) {
      if (isMatchingInterventionId(lId, rKey) || isMatchingInterventionId(localItem.uuid, rVal.uuid)) {
        matchedRemoteKey = rKey;
        break;
      }
    }

    if (!matchedRemoteKey) {
      // Conserver l'élément local uniquement s'il est sous période de grâce (création locale récente)
      if (isEntityInGracePeriod('INTERVENTION', lId)) {
        mergedMap.set(lId, { ...localItem });
      }
    } else {
      const remoteItem = mergedMap.get(matchedRemoteKey);
      const isProtected = isEntityInGracePeriod('INTERVENTION', lId) || isEntityInGracePeriod('INTERVENTION', matchedRemoteKey);

      const localWeight = STATUS_WEIGHT[localItem.status] || 0;
      const remoteWeight = STATUS_WEIGHT[remoteItem.status] || 0;

      // Si l'état local est plus avancé ou sous période de grâce, l'état local prime
      if (isProtected || localWeight > remoteWeight) {
        mergedMap.set(matchedRemoteKey, {
          ...remoteItem,
          ...localItem,
          status: localWeight >= remoteWeight ? localItem.status : remoteItem.status,
          progress_step: localItem.progress_step || remoteItem.progress_step,
          maalem_id: localItem.maalem_id || remoteItem.maalem_id,
          maalem_name: localItem.maalem_name || remoteItem.maalem_name,
          maalem_phone: localItem.maalem_phone || remoteItem.maalem_phone,
          accepted_at: localItem.accepted_at || remoteItem.accepted_at
        });
      } else {
        // Le serveur a progressé légitimement
        mergedMap.set(matchedRemoteKey, {
          ...localItem,
          ...remoteItem,
          client_phone: remoteItem.client_phone || localItem.client_phone,
          maalem_phone: remoteItem.maalem_phone || localItem.maalem_phone
        });
      }
    }
  });

  const result = Array.from(mergedMap.values());
  result.sort((a, b) => {
    const timeA = new Date(a.created_at || 0).getTime();
    const timeB = new Date(b.created_at || 0).getTime();
    return timeB - timeA;
  });

  return result;
};

/**
 * Réconciliation non-destructive des transactions financières
 * - Déduplique par ID et par reference_ref
 * - Conserve les transactions créées localement sous période de grâce
 * - Maintient l'intégrité du grand livre (ledger)
 */
export const mergeTransactions = (localList = [], remoteList = []) => {
  if (!Array.isArray(remoteList)) return localList || [];
  if (!Array.isArray(localList) || localList.length === 0) return remoteList;

  const txMap = new Map();

  const getTxKey = (t) => {
    if (!t) return null;
    const ref = String(t.reference_ref || '').trim().toLowerCase();
    const id = String(t.id || '').trim().toLowerCase();
    return ref && ref.length > 5 ? `ref_${ref}` : `id_${id}`;
  };

  // 1. Ajouter les transactions distantes
  remoteList.forEach((t) => {
    if (!t) return;
    const key = getTxKey(t);
    if (key) {
      txMap.set(key, { ...t });
    }
  });

  // 2. Fusionner avec les transactions locales (les locales sous période de grâce sont conservées)
  localList.forEach((t) => {
    if (!t) return;
    const key = getTxKey(t);
    if (!key) return;

    if (!txMap.has(key)) {
      if (isEntityInGracePeriod('TRANSACTION', t.id) || isEntityInGracePeriod('TRANSACTION', t.reference_ref)) {
        txMap.set(key, { ...t });
      }
    } else {
      const existing = txMap.get(key);
      const isProtected = isEntityInGracePeriod('TRANSACTION', t.id) || isEntityInGracePeriod('TRANSACTION', t.reference_ref);

      const preferredStatus = (t.status === 'VALIDATED' || isProtected) ? 'VALIDATED' : (existing.status || t.status);

      txMap.set(key, {
        ...existing,
        ...t,
        status: preferredStatus,
        maalem_name: t.maalem_name || existing.maalem_name,
        maalem_phone: t.maalem_phone || existing.maalem_phone,
        admin_notes: t.admin_notes || existing.admin_notes
      });
    }
  });

  const result = Array.from(txMap.values());
  result.sort((a, b) => {
    const timeA = new Date(a.created_at || 0).getTime();
    const timeB = new Date(b.created_at || 0).getTime();
    return timeB - timeA;
  });

  return result;
};

/**
 * Déduplication déterministe des artisans Maâlems
 * Fused les alias (PocketBase ID, UUID, ID temporaire) et garantit qu'un numéro de téléphone n'apparaît qu'une seule fois.
 */
export const deduplicateMaalems = (maalemsList = []) => {
  if (!Array.isArray(maalemsList) || maalemsList.length <= 1) return maalemsList || [];

  const getPhone9 = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '').slice(-9);
  };

  const fusedList = [];

  maalemsList.forEach((m) => {
    if (!m) return;
    const mId = String(m.id || '').trim();
    const mUuid = String(m.uuid || '').trim();
    const mPhone9 = getPhone9(m.phone);

    // Trouver un artisan existant qui correspond par ID, UUID ou téléphone (9 chiffres)
    const existingIndex = fusedList.findIndex((ex) => {
      const exId = String(ex.id || '').trim();
      const exUuid = String(ex.uuid || '').trim();
      const exPhone9 = getPhone9(ex.phone);

      const matchId = (mId && exId && mId === exId) || 
                      (mUuid && exUuid && mUuid === exUuid) || 
                      (mId && exUuid && mId === exUuid) || 
                      (mUuid && exId && mUuid === exId);
      const matchPhone = mPhone9.length >= 8 && exPhone9.length >= 8 && mPhone9 === exPhone9;

      return matchId || matchPhone;
    });

    if (existingIndex === -1) {
      fusedList.push({ ...m });
    } else {
      const ex = fusedList[existingIndex];
      const isOnline = Boolean(ex.is_online || m.is_online);
      const isAvailable = Boolean(ex.is_available || m.is_available);

      const hasRealGpsM = !isNaN(m.lat) && m.lat !== 33.5883 && m.lat !== 34.0331 && m.lat > 20;
      const hasRealGpsEx = !isNaN(ex.lat) && ex.lat !== 33.5883 && ex.lat !== 34.0331 && ex.lat > 20;

      const lat = hasRealGpsM ? m.lat : (hasRealGpsEx ? ex.lat : (m.lat || ex.lat));
      const lng = hasRealGpsM ? m.lng : (hasRealGpsEx ? ex.lng : (m.lng || ex.lng));

      const district = (m.district && m.district !== 'Casablanca' ? m.district : ex.district) || m.city_zone || ex.city_zone || 'Casablanca';

      fusedList[existingIndex] = {
        ...ex,
        ...m,
        id: ex.id || m.id,
        uuid: ex.uuid || m.uuid || ex.id || m.id,
        full_name: ex.full_name || m.full_name || 'Artisan Maâlem',
        phone: ex.phone || m.phone || '',
        is_online: isOnline,
        is_available: isAvailable,
        lat,
        lng,
        district,
        city_zone: district,
        credit_balance: Math.max(Number(ex.credit_balance || 0), Number(m.credit_balance || 0))
      };
    }
  });

  return fusedList;
};

/**
 * Réconciliation des profils Maâlems
 * Protège le solde et la disponibilité de l'artisan connecté contre les lectures DB obsolètes
 * et élimine les cartes dupliquées.
 */
export const mergeMaalems = (localList = [], remoteList = [], currentUser = null) => {
  if (!Array.isArray(remoteList)) return deduplicateMaalems(localList || []);
  if (!Array.isArray(localList) || localList.length === 0) return deduplicateMaalems(remoteList);

  const currentUserId = currentUser?.id ? String(currentUser.id).trim() : null;
  const isSelfProtected = currentUserId && (
    isEntityInGracePeriod('BALANCE', currentUserId) || 
    isEntityInGracePeriod('MAALEM', currentUserId)
  );

  const mLocalMap = new Map(localList.map((m) => [String(m.id).trim(), m]));

  const merged = remoteList.map((rMaalem) => {
    if (!rMaalem) return rMaalem;
    const mId = String(rMaalem.id).trim();
    const lMaalem = mLocalMap.get(mId);

    if (!lMaalem) return rMaalem;

    const isThisSelf = currentUserId && (mId === currentUserId || mId === 'maalem-1');

    if (isThisSelf && isSelfProtected) {
      // Préserver impérativement le solde local optimiste
      return {
        ...rMaalem,
        credit_balance: lMaalem.credit_balance !== undefined ? lMaalem.credit_balance : rMaalem.credit_balance,
        is_online: lMaalem.is_online !== undefined ? lMaalem.is_online : rMaalem.is_online,
        is_available: lMaalem.is_available !== undefined ? lMaalem.is_available : rMaalem.is_available,
        lat: (!isNaN(lMaalem.lat) && lMaalem.lat !== 33.5883) ? lMaalem.lat : rMaalem.lat,
        lng: (!isNaN(lMaalem.lng) && lMaalem.lng !== -7.6328) ? lMaalem.lng : rMaalem.lng
      };
    }

    return {
      ...lMaalem,
      ...rMaalem,
      // Préserver les coordonnées GPS réelles si la distante est un fallback générique
      lat: (!isNaN(lMaalem.lat) && lMaalem.lat !== 33.5883 && (rMaalem.lat === 33.5883 || isNaN(rMaalem.lat)))
        ? lMaalem.lat
        : rMaalem.lat,
      lng: (!isNaN(lMaalem.lng) && lMaalem.lng !== -7.6328 && (rMaalem.lng === -7.6328 || isNaN(rMaalem.lng)))
        ? lMaalem.lng
        : rMaalem.lng
    };
  });

  return deduplicateMaalems(merged);
};

/**
 * Lecture sécurisée du stockage local avec valeur de repli
 */
export const loadCacheWithFallback = (cacheKey, fallback = []) => {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
};

/**
 * Écriture sécurisée dans le stockage local
 */
export const saveCache = (cacheKey, data) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (e) {}
};
