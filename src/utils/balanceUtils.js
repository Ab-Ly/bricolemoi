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

export const isRealRechargeTx = (t) => {
  if (!t) return false;
  const typeUpper = String(t.type || '').toUpperCase();
  return (typeUpper === 'RECHARGE' || typeUpper === 'CREDIT') && !isBonusTx(t) && !isLeadTx(t);
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
  const mPhone = String(maalemOrUser.phone || '').replace(/\D/g, '');

  const myTransactions = (transactions || []).filter((t) => {
    const matchId = mId && String(t.maalem_id || '').trim() === mId;
    const matchPhone = mPhone && mPhone.length > 7 && String(t.maalem_phone || '').replace(/\D/g, '') === mPhone;
    return matchId || matchPhone;
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
          : (maalemOrUser?.role?.toUpperCase() === 'MAALEM' ? 15.00 : 0)))
  );

  const totalRechargeAndBonus = totalRechargedSum + totalBonusSum;
  let liveTotalBalance = 0;

  if (totalRechargeAndBonus > 0) {
    liveTotalBalance = Math.max(0, totalRechargeAndBonus - totalValidatedLeadsSpent);
  } else {
    liveTotalBalance = Math.max(0, fallbackCredits);
  }

  if (!isNaN(fallbackCredits) && fallbackCredits > liveTotalBalance && totalRechargedSum === 0) {
    liveTotalBalance = fallbackCredits;
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
