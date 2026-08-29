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

  const myTransactions = (transactions || []).filter((t) => {
    if (!t) return false;
    const tId = String(t.maalem_id || '').trim();
    const tPhoneDigits = String(t.maalem_phone || '').replace(/\D/g, '');
    const tPhone9 = tPhoneDigits.slice(-9);
    const matchId = mId && tId === mId;
    const matchPhone = mPhone9.length >= 8 && tPhone9.length >= 8 && mPhone9 === tPhone9;
    const matchFallback = isFallbackMaalem && (tId === 'maalem-1' || tId === '22222222-2222-2222-2222-222222222222');
    return matchId || matchPhone || matchFallback;
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

  const totalBonusSum = myTransactions
    .filter((t) => (t.status === 'VALIDATED' || !t.status) && isBonusTx(t))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const totalRechargedSum = myTransactions
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

  const totalRechargeAndBonus = totalRechargedSum + totalBonusSum;
  let liveTotalBalance = 0;

  if (totalRechargeAndBonus > 0) {
    liveTotalBalance = Math.max(0, totalRechargeAndBonus - totalValidatedLeadsSpent);
  } else if (!isNaN(fallbackCredits) && fallbackCredits > 0) {
    liveTotalBalance = fallbackCredits;
  } else {
    liveTotalBalance = 0;
  }

  return {
    totalRechargedSum,
    totalValidatedLeadsSpent,
    totalReservedEscrow: 0,
    totalBonusSum,
    liveTotalBalance,
    liveAvailableBalance: liveTotalBalance,
    availableBalance: liveTotalBalance,
    myTransactions
  };
};
