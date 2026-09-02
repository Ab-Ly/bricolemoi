/**
 * Utilitaires pour le calcul du grand livre (ledger) des soldes Maâlems.
 * Garantit une cohérence parfaite et synchronisée à 100% entre le header (Navbar),
 * la vue MaalemView, la modal de profil et les vues Administrateur.
 */

export const isBonusTx = (t) => {
  if (!t) return false;
  const typeUpper = String(t.type || '').toUpperCase();
  const methodUpper = String(t.payment_method || '').toUpperCase();
  const refUpper = String(t.reference_ref || '').toUpperCase();
  return typeUpper === 'BONUS' || methodUpper.includes('OFFERT') || methodUpper.includes('BONUS') || refUpper.includes('BONUS');
};

export const isLeadTx = (t) => {
  if (!t) return false;
  const typeUpper = String(t.type || '').toUpperCase();
  return typeUpper === 'LEAD_DEDUCTION' || typeUpper === 'DEBIT' || typeUpper === 'LEAD' || Number(t.amount_dh) < 0;
};

export const isRefundTx = (t) => {
  if (!t) return false;
  const typeUpper = String(t.type || '').toUpperCase();
  const methodUpper = String(t.payment_method || '').toUpperCase();
  const refUpper = String(t.reference_ref || '').toUpperCase();
  return typeUpper === 'REFUND' || methodUpper.includes('REMBOURSEMENT') || methodUpper.includes('REFUND') || refUpper.startsWith('REFUND_') || refUpper.includes('REFUND');
};

export const isRealRechargeTx = (t) => {
  if (!t) return false;
  const typeUpper = String(t.type || '').toUpperCase();
  return (typeUpper === 'RECHARGE' || typeUpper === 'CREDIT') && !isBonusTx(t) && !isLeadTx(t) && !isRefundTx(t);
};

export const RECHARGE_PACKS = [
  {
    id: 'pack_50',
    amount: '50',
    amountNum: 50,
    bonusDh: 0,
    totalCredits: 50,
    leadsCount: 3,
    badgeFr: 'Découverte',
    badgeAr: 'تجربة',
    popular: false,
    color: 'slate'
  },
  {
    id: 'pack_100',
    amount: '100',
    amountNum: 100,
    bonusDh: 15,
    totalCredits: 115,
    leadsCount: 7,
    freeLeads: 1,
    badgeFr: '⭐ Recommandé (+1 Lead Offert)',
    badgeAr: '⭐ الأكثر طلباً (+1 ليد كادو)',
    popular: true,
    color: 'amber'
  },
  {
    id: 'pack_200',
    amount: '200',
    amountNum: 200,
    bonusDh: 30,
    totalCredits: 230,
    leadsCount: 15,
    freeLeads: 2,
    badgeFr: '👑 Pro Master (+2 Leads Offerts)',
    badgeAr: '👑 أفضل قيمة (+2 ليد كادو)',
    popular: false,
    color: 'emerald'
  },
  {
    id: 'pack_500',
    amount: '500',
    amountNum: 500,
    bonusDh: 90,
    totalCredits: 590,
    leadsCount: 39,
    freeLeads: 6,
    badgeFr: '🚀 Volume Entreprise (+6 Leads Offerts)',
    badgeAr: '🚀 للمحترفين (+6 ليد كادو)',
    popular: false,
    color: 'indigo'
  }
];

export const getRechargePackBonus = (amount) => {
  const num = parseFloat(amount) || 0;
  const pack = RECHARGE_PACKS.find((p) => p.amountNum === num);
  if (pack) return pack.bonusDh;
  if (num >= 500) return 90.0;
  if (num >= 200) return 30.0;
  if (num >= 100) return 15.0;
  return 0;
};

export const calculateMaalemBalance = (maalemOrUser, transactions = [], maalems = []) => {
  if (!maalemOrUser) {
    return {
      totalRechargedSum: 0,
      totalValidatedLeadsSpent: 0,
      totalReservedEscrow: 0,
      totalBonusSum: 0,
      liveTotalBalance: 0,
      liveAvailableBalance: 0,
      availableBalance: 0,
      myTransactions: []
    };
  }

  const currentLiveMaalem = maalems?.find((m) => m.id === maalemOrUser?.id) || maalemOrUser?.maalem_details || maalemOrUser;
  const mId = String(maalemOrUser.id || '').trim();
  const mPhoneDigits = String(maalemOrUser.phone || '').replace(/\D/g, '');
  const mPhone9 = mPhoneDigits.slice(-9);

  const isFallbackMaalem = !mId || mId === 'maalem-1' || mId === '22222222-2222-2222-2222-222222222222';

  const maalemPhoneMap = new Map((maalems || []).map(m => [String(m.id).trim(), String(m.phone || '').replace(/\D/g, '').slice(-9)]));

  const cleanId = (id) => String(id || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  const myTransactions = (transactions || []).filter((t) => {
    if (!t) return false;
    const tId = String(t.maalem_id || '').trim();
    const tPhoneDigits = String(t.maalem_phone || '').replace(/\D/g, '');
    const tIdDigits = tId.replace(/\D/g, '');
    const tPhone9 = tPhoneDigits.slice(-9) || (tIdDigits.length >= 8 ? tIdDigits.slice(-9) : '') || maalemPhoneMap.get(tId) || '';

    const matchId = (mId && tId === mId) || (currentLiveMaalem?.id && String(currentLiveMaalem.id).trim() === tId);
    const matchPhone = mPhone9.length >= 8 && tPhone9.length >= 8 && mPhone9 === tPhone9;
    const matchPhoneInTId = mPhone9.length >= 8 && tId.includes(mPhone9);
    const matchPhoneInMId = tPhone9.length >= 8 && mId.includes(tPhone9);
    const matchName = t.maalem_name && maalemOrUser?.full_name && 
      String(t.maalem_name).trim().toLowerCase() === String(maalemOrUser.full_name).trim().toLowerCase();
    const matchFallback = isFallbackMaalem && (tId === 'maalem-1' || tId === '22222222-2222-2222-2222-222222222222');
    const matchFuzzyId = mId && tId && cleanId(mId).length >= 10 && cleanId(tId).length >= 10 && (
      cleanId(mId).includes(cleanId(tId)) || cleanId(tId).includes(cleanId(mId))
    );

    return matchId || matchPhone || matchPhoneInTId || matchPhoneInMId || matchName || matchFallback || matchFuzzyId;
  });

  // Dédupliquer les transactions de déduction de lead pour la même intervention
  const validatedLeadTxs = myTransactions.filter((t) => t.status === 'VALIDATED' && isLeadTx(t));
  const seenInterventionKeys = new Set();
  let totalValidatedLeadsSpent = 0;

  for (const t of validatedLeadTxs) {
    const ref = String(t.reference_ref || '').trim();
    const uuidMatch = ref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const intvKey = uuidMatch ? uuidMatch[0].toLowerCase() : (t.id || ref);
    if (!seenInterventionKeys.has(intvKey)) {
      seenInterventionKeys.add(intvKey);
      totalValidatedLeadsSpent += Math.abs(parseFloat(t.amount_dh) || 0);
    }
  }

  // Dédupliquer les remboursements de leads par intervention (évite les doublons de clics)
  const validatedRefundTxs = myTransactions.filter((t) => t.status === 'VALIDATED' && isRefundTx(t));
  const seenRefundKeys = new Set();
  let totalValidatedRefunds = 0;

  for (const t of validatedRefundTxs) {
    const ref = String(t.reference_ref || '').trim();
    const uuidMatch = ref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const intvKey = uuidMatch ? uuidMatch[0].toLowerCase() : (t.id || ref);
    if (!seenRefundKeys.has(intvKey)) {
      seenRefundKeys.add(intvKey);
      totalValidatedRefunds += Math.abs(parseFloat(t.amount_dh) || 15.0);
    }
  }

  // Déterminer si une transaction explicite de bienvenue (15 DH) existe déjà dans l'historique
  const hasExplicitWelcomeTx = myTransactions.some((t) => {
    const ref = String(t.reference_ref || '').toUpperCase();
    const method = String(t.payment_method || '').toUpperCase();
    const notes = String(t.admin_notes || '').toUpperCase();
    return (
      ref.includes('WELCOME') ||
      ref.includes('BIENVENUE') ||
      method.includes('WELCOME') ||
      method.includes('BIENVENUE') ||
      (notes.includes('BIENVENUE') && Number(t.amount_dh) === 15)
    );
  });

  // Si aucune transaction de bienvenue n'est enregistrée dans le grand livre,
  // synthétiser la transaction de 15 DH offerte à l'inscription afin qu'elle apparaisse
  // fidèlement dans l'historique et qu'elle ne disparaisse JAMAIS lors d'une recharge.
  let enrichedTransactions = [...myTransactions];
  if (!hasExplicitWelcomeTx) {
    const welcomeTx = {
      id: `tx-welcome-bonus-${mId || 'default'}`,
      maalem_id: mId,
      maalem_name: maalemOrUser?.full_name || 'Artisan Maâlem',
      maalem_phone: maalemOrUser?.phone || '',
      amount_dh: 15.00,
      type: 'BONUS',
      payment_method: 'WELCOME_BONUS_15DH',
      reference_ref: 'BONUS-BIENVENUE-15DH',
      status: 'VALIDATED',
      admin_notes: "1 Lead SOS Offert à l'inscription (15 DH) 🎁",
      created_at: maalemOrUser?.created_at || '2026-08-01T00:00:00.000Z'
    };
    enrichedTransactions.push(welcomeTx);
    enrichedTransactions.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  const totalBonusSum = enrichedTransactions
    .filter((t) => (t.status === 'VALIDATED' || !t.status) && isBonusTx(t))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const totalRechargedSum = enrichedTransactions
    .filter((t) => t.status === 'VALIDATED' && isRealRechargeTx(t))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const fallbackCredits = parseFloat(
    currentLiveMaalem?.credit_balance !== undefined && currentLiveMaalem?.credit_balance !== null
      ? currentLiveMaalem.credit_balance
      : (maalemOrUser?.credits !== undefined && maalemOrUser?.credits !== null
        ? maalemOrUser.credits
        : (maalemOrUser?.maalem_details?.credit_balance !== undefined && maalemOrUser?.maalem_details?.credit_balance !== null
          ? maalemOrUser.maalem_details.credit_balance
          : 0))
  );

  const totalCreditsInjected = totalRechargedSum + totalBonusSum + totalValidatedRefunds;
  let liveTotalBalance = 0;

  if (totalCreditsInjected > 0 || totalValidatedLeadsSpent > 0) {
    liveTotalBalance = Math.max(0, totalCreditsInjected - totalValidatedLeadsSpent);
  } else if (!isNaN(fallbackCredits) && fallbackCredits > 0) {
    liveTotalBalance = fallbackCredits;
  } else {
    liveTotalBalance = 15.00; // Garantie du 1er lead offert
  }

  return {
    totalRechargedSum,
    totalValidatedLeadsSpent,
    totalReservedEscrow: 0,
    totalBonusSum,
    liveTotalBalance,
    liveAvailableBalance: liveTotalBalance,
    availableBalance: liveTotalBalance,
    myTransactions: enrichedTransactions
  };
};
