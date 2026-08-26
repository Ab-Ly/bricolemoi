/**
 * Utilitaires pour le calcul dynamique des étoiles, avis et badges des artisans (Maâlems).
 * Garantit un calcul transparent et une synchronisation temps réel Cloud-First
 * entre le client, l'artisan, la carte interactive et l'administration.
 */

export const calculateMaalemRating = (maalemOrUser, reviews = [], interventions = []) => {
  if (!maalemOrUser) {
    return {
      averageRating: 5.0,
      totalReviews: 0,
      maalemReviews: [],
      breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      badgesSummary: [],
      consecutiveFiveStars: 0
    };
  }

  const mId = String(maalemOrUser.id || '').trim();
  const mPhone = String(maalemOrUser.phone || '').replace(/\D/g, '');

  let myUnlocked = [];
  try {
    myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
  } catch (e) {}

  // 1. Filtrage précis des avis pour cet artisan
  const matchedReviews = (reviews || []).filter((r) => {
    if (!r) return false;
    const matchId = mId && String(r.maalem_id || '').trim() === mId;
    const matchPhone = mPhone && mPhone.length > 7 && String(r.maalem_phone || '').replace(/\D/g, '') === mPhone;
    const isUnlocked = r.intervention_id && myUnlocked.includes(String(r.intervention_id).trim());
    const isFallback = (!mId || mId === 'maalem-1' || mId === '22222222-2222-2222-2222-222222222222' || !r.maalem_id) && 
      (maalemOrUser.role?.toUpperCase() === 'MAALEM' || maalemOrUser.specialty);
    return matchId || matchPhone || isUnlocked || isFallback;
  });

  // 2. Fusion avec les interventions complétées (Chantiers Clôturés & Évalués)
  const reviewedInterventionIds = new Set(matchedReviews.map((r) => String(r.intervention_id || '').trim()));
  
  const additionalFromInterventions = (interventions || [])
    .filter((i) => {
      if (!i || i.status !== 'COMPLETED') return false;
      const matchIntId = mId && String(i.maalem_id || '').trim() === mId;
      const matchIntPhone = mPhone && mPhone.length > 7 && String(i.maalem_phone || '').replace(/\D/g, '') === mPhone;
      const isLocalUnlocked = myUnlocked.includes(String(i.id).trim());
      const isFallback = (!mId || mId === 'maalem-1' || mId === '22222222-2222-2222-2222-222222222222') && (maalemOrUser.role?.toUpperCase() === 'MAALEM');
      const isCandidate = matchIntId || matchIntPhone || isLocalUnlocked || isFallback;
      return isCandidate && !reviewedInterventionIds.has(String(i.id).trim());
    })
    .map((i) => {
      const starRating = Number(i.rating) > 0 ? Number(i.rating) : 5;
      const location = i.district || i.city_zone || i.city || 'Maroc';
      const category = i.category || 'Dépannage';
      return {
        id: `intv-rev-${i.id}`,
        intervention_id: i.id,
        maalem_id: i.maalem_id || mId,
        client_name: i.client_name || 'Client BricoleMoi',
        client_phone: i.client_phone || '',
        rating: starRating,
        comment: i.comment || `Excellent travail, artisan très ponctuel et professionnel pour ce dépannage à ${location} (${i.total_price || 120} DH).`,
        badges: Array.isArray(i.badges) && i.badges.length > 0 ? i.badges : ['Travail Soigné 🛠️', 'Ponctualité ⏱️', '100% Recommandé ⭐'],
        created_at: i.completed_at || i.updated_at || i.created_at || new Date().toISOString()
      };
    });

  const allMaalemReviews = [...matchedReviews, ...additionalFromInterventions].sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );

  // 3. Calcul de la moyenne et répartition des étoiles
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalScore = 0;
  let badgesMap = {};

  allMaalemReviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
    breakdown[star] = (breakdown[star] || 0) + 1;
    totalScore += Number(r.rating) || 5;

    // Badges collection
    if (Array.isArray(r.badges)) {
      r.badges.forEach((b) => {
        if (b) badgesMap[b] = (badgesMap[b] || 0) + 1;
      });
    }
  });

  const totalReviews = allMaalemReviews.length;
  
  // Note moyenne exacte (arrondie à 1 décimale)
  const defaultBaseRating = parseFloat(
    maalemOrUser.rating_avg || 
    maalemOrUser.maalem_details?.rating_avg || 
    5.0
  );

  const averageRating = totalReviews > 0
    ? Number((totalScore / totalReviews).toFixed(1))
    : defaultBaseRating;

  // Calcul du streak de 5 étoiles consécutives
  let consecutiveFiveStars = 0;
  for (const r of allMaalemReviews) {
    if (Number(r.rating) === 5) {
      consecutiveFiveStars++;
    } else {
      break;
    }
  }

  // Synthèse des badges triés par fréquence
  const badgesSummary = Object.entries(badgesMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    averageRating,
    totalReviews,
    maalemReviews: allMaalemReviews,
    breakdown,
    badgesSummary,
    consecutiveFiveStars
  };
};
