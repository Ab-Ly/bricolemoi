import { getCoordinatesFromDistrict } from '../lib/geoService';
import { POSITIVE_BADGES, NEGATIVE_BADGES } from '../constants/badges';

/**
 * Normaliseur Centralisé de Données BricoleMoi (Single Source of Truth)
 * Garantit une cohérence mathématique et relationnelle absolue sur les 3 piliers (Client - Maâlem - Admin)
 */

/**
 * Nettoyage et normalisation d'une intervention
 */
export const normalizeIntervention = (raw = {}, context = {}) => {
  if (!raw || typeof raw !== 'object') return null;

  const id = String(raw.id || raw.intervention_id || '').trim();
  if (!id) return null;

  const clientId = raw.client_id ? String(raw.client_id).trim() : null;
  const maalemId = raw.maalem_id ? String(raw.maalem_id).trim() : null;

  // 1. Résolution des profils relationnels (Client & Maâlem)
  const clientProfile = context.clientsMap?.get(clientId) || context.profilesMap?.get(clientId);
  const maalemProfile = context.maalemsMap?.get(maalemId) || context.profilesMap?.get(maalemId);

  const clientName = clientProfile?.full_name || raw.client_name || 'Client BricoleMoi';
  const clientPhone = clientProfile?.phone || raw.client_phone || '';

  const maalemName = maalemProfile?.full_name || raw.maalem_name || (maalemId ? 'Artisan Maâlem' : null);
  const maalemPhone = maalemProfile?.phone || raw.maalem_phone || '';

  // 2. Résolution géographique précise (sans aucun repli arbitraire sur Casablanca)
  const rawLat = parseFloat(raw.lat);
  const rawLng = parseFloat(raw.lng);
  const hasValidCoords = !isNaN(rawLat) && !isNaN(rawLng) && rawLat !== 0 && (rawLat !== 33.5883 || (raw.district && raw.district.toLowerCase().includes('casablanca')));
  
  const resolvedCoords = hasValidCoords
    ? { lat: rawLat, lng: rawLng }
    : getCoordinatesFromDistrict(raw.district, raw.lat, raw.lng);

  // 3. Traitement des photos : Zéro fausse photo d'Unsplash
  let cleanPhoto = raw.description_photo || null;
  if (cleanPhoto && typeof cleanPhoto === 'string' && cleanPhoto.includes('unsplash.com')) {
    cleanPhoto = null;
  }

  let cleanPhotosList = Array.isArray(raw.photos_list)
    ? raw.photos_list.filter((p) => p && typeof p === 'string' && !p.includes('unsplash.com'))
    : (cleanPhoto ? [cleanPhoto] : []);

  // 4. Tarification Accord Direct
  let finalAgreedPrice = null;
  if (raw.final_agreed_price !== undefined && raw.final_agreed_price !== null && raw.final_agreed_price !== '') {
    const parsed = parseFloat(raw.final_agreed_price);
    if (!isNaN(parsed) && parsed > 0) {
      finalAgreedPrice = parsed;
    }
  }

  // 5. Normalisation des avis et notes
  const relatedReview = context.reviewsMap?.get(id);
  const rawRating = raw.rating ?? relatedReview?.rating ?? null;
  const numericRating = (rawRating !== null && rawRating !== undefined && !isNaN(Number(rawRating)) && Number(rawRating) > 0)
    ? Number(rawRating)
    : null;

  let cleanComment = raw.comment || relatedReview?.comment || null;
  if (cleanComment && typeof cleanComment === 'string') {
    cleanComment = cleanComment.replace(/^""|""$/g, '').trim();
    if (cleanComment === '""' || cleanComment === "''") cleanComment = null;
  }

  const rawBadges = Array.isArray(raw.badges) ? raw.badges : (Array.isArray(relatedReview?.badges) ? relatedReview.badges : []);
  const cleanBadges = Array.from(new Set(rawBadges)).filter(Boolean);

  return {
    ...raw,
    id,
    client_id: clientId,
    client_name: clientName,
    client_phone: clientPhone,
    maalem_id: maalemId,
    maalem_name: maalemName,
    maalem_phone: maalemPhone,
    service_type: String(raw.service_type || 'PLUMBING').toUpperCase(),
    subcategory: raw.subcategory || 'Dépannage d\'urgence',
    district: raw.district || 'Casablanca - Maârif',
    lat: resolvedCoords.lat,
    lng: resolvedCoords.lng,
    description_photo: cleanPhoto,
    photos_list: cleanPhotosList,
    audio_note_url: raw.audio_note_url || null,
    status: String(raw.status || 'PENDING').toUpperCase(),
    progress_step: (String(raw.status || '').toUpperCase() === 'COMPLETED' || String(raw.status || '').toUpperCase() === 'CANCELLED' || String(raw.status || '').toUpperCase() === 'UNFEASIBLE')
      ? String(raw.status || '').toUpperCase()
      : (raw.progress_step || 'DISPATCHED'),
    final_agreed_price: finalAgreedPrice,
    rating: numericRating,
    comment: cleanComment,
    badges: cleanBadges,
    cost_lead: parseFloat(raw.cost_lead) || 15.0,
    created_at: raw.created_at || new Date().toISOString(),
    completed_at: raw.completed_at || null,
    updated_at: raw.updated_at || raw.created_at || new Date().toISOString()
  };
};

/**
 * Normalisation d'un artisan Maâlem
 */
export const normalizeMaalemProfile = (raw = {}) => {
  if (!raw || typeof raw !== 'object') return null;

  const id = String(raw.id || '').trim();
  if (!id) return null;

  const details = raw.maalem_details || {};
  const portfolioUrls = Array.isArray(details.portfolio_urls || raw.portfolio_urls)
    ? (details.portfolio_urls || raw.portfolio_urls).filter((u) => u && !u.includes('unsplash.com'))
    : [];

  const rawLat = parseFloat(raw.lat || details.lat);
  const rawLng = parseFloat(raw.lng || details.lng);
  const resolvedCoords = (!isNaN(rawLat) && !isNaN(rawLng) && rawLat !== 0)
    ? { lat: rawLat, lng: rawLng }
    : getCoordinatesFromDistrict(raw.district || raw.city_zone || 'Casablanca');

  return {
    ...raw,
    id,
    full_name: raw.full_name || `Artisan Maâlem #${id.slice(0, 6)}`,
    phone: raw.phone || '',
    specialty: String(details.specialty || raw.specialty || 'PLUMBING').toUpperCase(),
    city_zone: raw.city_zone || raw.district || 'Casablanca',
    district: raw.district || raw.city_zone || 'Casablanca',
    lat: resolvedCoords.lat,
    lng: resolvedCoords.lng,
    credit_balance: parseFloat(details.credit_balance ?? raw.credits ?? raw.credit_balance ?? 15.0),
    is_online: Boolean(raw.is_online || details.is_online),
    is_available: Boolean(raw.is_available ?? true),
    is_verified: Boolean(raw.is_verified ?? true),
    cin_verified: Boolean(raw.cin_verified ?? false),
    is_suspended: Boolean(raw.is_suspended ?? false),
    portfolio_urls: portfolioUrls,
    created_at: raw.created_at || new Date().toISOString()
  };
};

/**
 * Normalisation d'un avis client
 */
export const normalizeReviewRecord = (raw = {}) => {
  if (!raw || typeof raw !== 'object') return null;

  const rating = Number(raw.rating);
  const validRating = (!isNaN(rating) && rating >= 1 && rating <= 5) ? rating : 5;

  let rawBadges = Array.isArray(raw.badges) ? raw.badges : [];
  
  // Filtrage strict : Ne jamais mélanger avis négatifs et badges positifs
  const filteredBadges = rawBadges.filter((b) => {
    if (validRating <= 3) return NEGATIVE_BADGES.includes(b);
    return POSITIVE_BADGES.includes(b);
  });

  let cleanComment = String(raw.comment || '').trim();
  cleanComment = cleanComment.replace(/^""|""$/g, '').trim();
  if (cleanComment === '""' || cleanComment === "''") cleanComment = '';

  // Supprimer toute redondance [Badges: ...] dans le texte si présent
  const commentTextOnly = cleanComment.replace(/\[Badges:[^\]]*\]/gi, '').trim();

  return {
    ...raw,
    id: String(raw.id || `rev-${Date.now()}`),
    intervention_id: String(raw.intervention_id || '').trim(),
    maalem_id: String(raw.maalem_id || '').trim(),
    client_id: raw.client_id ? String(raw.client_id).trim() : null,
    client_name: raw.client_name || 'Client BricoleMoi',
    rating: validRating,
    comment: commentTextOnly || (filteredBadges.length > 0 ? `[Badges: ${filteredBadges.join(', ')}]` : ''),
    badges: filteredBadges,
    created_at: raw.created_at || new Date().toISOString()
  };
};
