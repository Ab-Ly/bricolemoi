import { isUuid } from '../context/app/helpers/appSyncHelpers';
import { POSITIVE_BADGES, NEGATIVE_BADGES } from '../constants/badges';
import { calculateMaalemBalance } from '../utils/balanceUtils';
import { getCoordinatesFromDistrict } from '../lib/geoService';

/**
 * 🛡️ Arbitre d'Audit & Contrôleur d'Invariants Déterministe (BricoleMoi)
 * Inspiré des architectures d'observabilité & guardrails des leaders de la tech (Stripe, Uber, Airbnb).
 */

export const auditPlatformState = ({
  interventions = [],
  transactions = [],
  maalems = [],
  reviews = [],
  user = null
}) => {
  const issues = [];
  const autoFixes = [];

  // ==========================================
  // INVARIANT 1 : Intégrité Financière & Grand Livre
  // ==========================================
  (maalems || []).forEach((m) => {
    const balResult = calculateMaalemBalance(m, transactions, maalems);
    const mId = String(m.id || '').trim();
    const mPhone = String(m.phone || '').replace(/\D/g, '');

    // Vérifier les missions débloquées par cet artisan
    const unlockedIntvs = (interventions || []).filter((i) => {
      const matchId = mId && String(i.maalem_id || '').trim() === mId;
      const matchPhone = mPhone && mPhone.length > 7 && String(i.maalem_phone || '').replace(/\D/g, '') === mPhone;
      return (matchId || matchPhone) && ['ACCEPTED', 'PENDING_COMPLETION', 'COMPLETED'].includes(i.status);
    });

    const leadDeductionTxs = balResult.myTransactions.filter(
      (t) => (t.type === 'LEAD_DEDUCTION' || String(t.reference_ref || '').includes('LEAD_UNLOCK')) && t.status === 'VALIDATED'
    );

    if (unlockedIntvs.length > leadDeductionTxs.length) {
      issues.push({
        level: 'WARNING',
        category: 'FINANCE',
        title: `Débits de lead manquants pour ${m.full_name || 'Artisan'}`,
        message: `${unlockedIntvs.length} missions débloquées mais seulement ${leadDeductionTxs.length} débits tracés au grand livre.`,
        maalem_id: m.id
      });
    }
  });

  // ==========================================
  // INVARIANT 2 : Intégrité des Identités (Zéro Anonymat sur Missions Débloquées)
  // ==========================================
  (interventions || []).forEach((item) => {
    // 1. Pour les missions en cours (ACCEPTED, PENDING_COMPLETION)
    if (['ACCEPTED', 'PENDING_COMPLETION'].includes(item.status)) {
      const resolvedM = (maalems || []).find((m) => String(m.id).trim() === String(item.maalem_id).trim());
      const actualName = (item.maalem_name && item.maalem_name !== 'Artisan Maâlem' && item.maalem_name !== 'Artisan Maalem' && item.maalem_name !== 'Maalem')
        ? item.maalem_name
        : (resolvedM?.full_name || null);
      const actualPhone = item.maalem_phone || resolvedM?.phone || null;

      if (!actualName) {
        issues.push({
          level: 'CRITICAL',
          category: 'IDENTITY',
          title: `Mission en cours #${item.id?.slice(-6)} sans identité artisan`,
          message: `Mission en statut ${item.status} mais sans artisan identifié.`,
          intervention_id: item.id
        });
      }

      if (!actualPhone || String(actualPhone).replace(/\D/g, '').length < 8) {
        issues.push({
          level: 'WARNING',
          category: 'IDENTITY',
          title: `Mission en cours #${item.id?.slice(-6)} sans numéro de contact`,
          message: `Numéro de téléphone introuvable pour joindre l'artisan.`,
          intervention_id: item.id
        });
      }
    }

    // 2. Pour les missions clôturées qui avaient un artisan assigné
    if (item.status === 'COMPLETED' && (item.maalem_id || item.escrow_status === 'DEBITED')) {
      const resolvedM = (maalems || []).find((m) => String(m.id).trim() === String(item.maalem_id).trim());
      const actualName = (item.maalem_name && item.maalem_name !== 'Artisan Maâlem' && item.maalem_name !== 'Artisan Maalem' && item.maalem_name !== 'Maalem')
        ? item.maalem_name
        : (resolvedM?.full_name || null);

      if (!actualName) {
        issues.push({
          level: 'WARNING',
          category: 'IDENTITY',
          title: `Mission réalisée #${item.id?.slice(-6)} avec profil artisan non synchronisé`,
          message: `L'artisan assigné n'a pas pu être résolu dans la liste des Maâlems.`,
          intervention_id: item.id
        });
      }
    }
  });

  // ==========================================
  // INVARIANT 3 : Intégrité Géographique & GPS (Zéro Déroutement Forcé)
  // ==========================================
  (interventions || []).forEach((item) => {
    const district = item.district || '';
    const isOutsideCasa = district && !district.toLowerCase().includes('casablanca');
    const isNearCasaCenter = item.lat && item.lng && Math.abs(Number(item.lat) - 33.5883) < 0.005 && Math.abs(Number(item.lng) - (-7.6328)) < 0.005;

    if (isOutsideCasa && isNearCasaCenter) {
      issues.push({
        level: 'WARNING',
        category: 'GPS',
        title: `Coordonnées GPS déroutées sur Casablanca pour #${item.id?.slice(-6)}`,
        message: `Quartier déclaré : "${district}" mais coordonnées pointant sur le centre de Casablanca.`,
        intervention_id: item.id
      });
    }
  });

  // ==========================================
  // INVARIANT 4 : Intégrité des Avis & Ségrégation des Badges
  // ==========================================
  (reviews || []).forEach((rev) => {
    const rRating = Number(rev.rating || 5);
    const badges = Array.isArray(rev.badges) ? rev.badges : [];

    if (rRating <= 3) {
      const conflictingBadges = badges.filter((b) => POSITIVE_BADGES.includes(b));
      if (conflictingBadges.length > 0) {
        issues.push({
          level: 'CRITICAL',
          category: 'REVIEWS',
          title: `Badges contradictoires sur avis insatisfaisant (${rRating}★)`,
          message: `L'avis contient des badges élogieux (${conflictingBadges.join(', ')}) malgré une note basse.`,
          review_id: rev.id
        });
      }
    } else {
      const conflictingBadges = badges.filter((b) => NEGATIVE_BADGES.includes(b));
      if (conflictingBadges.length > 0) {
        issues.push({
          level: 'WARNING',
          category: 'REVIEWS',
          title: `Badges négatifs sur avis positif (${rRating}★)`,
          message: `L'avis contient des badges négatifs (${conflictingBadges.join(', ')}) avec une note élevée.`,
          review_id: rev.id
        });
      }
    }
  });

  // ==========================================
  // INVARIANT 5 : Intégrité du Cycle de Vie des Statuts
  // ==========================================
  (interventions || []).forEach((item) => {
    if (item.status === 'COMPLETED' && item.progress_step === 'SEARCHING') {
      issues.push({
        level: 'WARNING',
        category: 'LIFECYCLE',
        title: `Collision d'état sur mission clôturée #${item.id?.slice(-6)}`,
        message: `Statut COMPLETED mais étape toujours marquée en recherche.`,
        intervention_id: item.id
      });
    }
  });

  // Calcul du score global d'intégrité (sur 100)
  const criticalCount = issues.filter((i) => i.level === 'CRITICAL').length;
  const warningCount = issues.filter((i) => i.level === 'WARNING').length;
  const score = Math.max(0, 100 - criticalCount * 25 - warningCount * 10);

  const healthStatus = score >= 90 ? 'OPTIMAL' : score >= 70 ? 'WARNING' : 'CRITICAL';

  return {
    score,
    healthStatus,
    totalAudited: {
      interventions: interventions.length,
      maalems: maalems.length,
      transactions: transactions.length,
      reviews: reviews.length
    },
    criticalCount,
    warningCount,
    issues,
    timestamp: new Date().toISOString()
  };
};

/**
 * Moteur d'Auto-Correction (Self-Healing)
 * Répare silencieusement et immédiatement les légères anomalies de données.
 */
export const healPlatformState = ({
  interventions = [],
  maalems = [],
  transactions = [],
  reviews = []
}) => {
  const healedInterventions = interventions.map((item) => {
    let copy = { ...item };

    // 1. Healer GPS
    if (copy.district && !copy.district.toLowerCase().includes('casablanca')) {
      const isNearCasa = copy.lat && copy.lng && Math.abs(Number(copy.lat) - 33.5883) < 0.005;
      if (isNearCasa || !copy.lat || !copy.lng) {
        const accurate = getCoordinatesFromDistrict(copy.district, copy.lat, copy.lng);
        copy.lat = accurate.lat;
        copy.lng = accurate.lng;
      }
    }

    // 2. Healer Identité Maâlem
    if (copy.maalem_id && (!copy.maalem_name || copy.maalem_name === 'Artisan Maâlem' || !copy.maalem_phone)) {
      const matchM = (maalems || []).find((m) => String(m.id).trim() === String(copy.maalem_id).trim());
      if (matchM) {
        if (!copy.maalem_name || copy.maalem_name === 'Artisan Maâlem') copy.maalem_name = matchM.full_name;
        if (!copy.maalem_phone) copy.maalem_phone = matchM.phone;
      }
    }

    return copy;
  });

  // 3. Healer Badges Avis
  const healedReviews = reviews.map((rev) => {
    const rRating = Number(rev.rating || 5);
    const badges = Array.isArray(rev.badges) ? rev.badges : [];
    if (rRating <= 3) {
      return { ...rev, badges: badges.filter((b) => !POSITIVE_BADGES.includes(b)) };
    }
    return { ...rev, badges: badges.filter((b) => !NEGATIVE_BADGES.includes(b)) };
  });

  return {
    interventions: healedInterventions,
    reviews: healedReviews
  };
};
