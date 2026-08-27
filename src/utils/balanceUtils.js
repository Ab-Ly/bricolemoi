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
  return typeUpper === 'LEAD_DEDUCTION' || typeUpper === 'LEAD_ESCROW' || typeUpper === 'DEBIT' || typeUpper === 'LEAD' || Number(t.amount_dh) < 0;
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

  const totalRechargedSum = myTransactions
    .filter((t) => t.status === 'VALIDATED' && isRealRechargeTx(t))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const totalValidatedLeadsSpent = myTransactions
    .filter((t) => t.status === 'VALIDATED' && isLeadTx(t))
    .reduce((acc, t) => acc + Math.abs(parseFloat(t.amount_dh) || 0), 0);

  const totalReservedEscrow = myTransactions
    .filter((t) => t.status === 'RESERVED' && isLeadTx(t))
    .reduce((acc, t) => acc + Math.abs(parseFloat(t.amount_dh) || 0), 0);

  const totalBonusSum = myTransactions
    .filter((t) => (t.status === 'VALIDATED' || !t.status) && isBonusTx(t))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const fallbackCredits = parseFloat(
    maalemOrUser?.credits !== undefined && maalemOrUser?.credits !== null
      ? maalemOrUser.credits
      : (maalemOrUser?.maalem_details?.credit_balance !== undefined && maalemOrUser?.maalem_details?.credit_balance !== null
        ? maalemOrUser.maalem_details.credit_balance
        : (currentLiveMaalem?.credit_balance !== undefined && currentLiveMaalem?.credit_balance !== null
          ? currentLiveMaalem.credit_balance
          : (maalemOrUser?.role?.toUpperCase() === 'MAALEM' ? 15.00 : 0)))
  );

  const liveTotalBalance = myTransactions.length > 0
    ? Math.max(0, totalRechargedSum + totalBonusSum - totalValidatedLeadsSpent)
    : fallbackCredits;

  const liveAvailableBalance = Math.max(0, liveTotalBalance - totalReservedEscrow);

  return {
    totalRechargedSum,
    totalValidatedLeadsSpent,
    totalReservedEscrow,
    totalBonusSum,
    liveTotalBalance,
    liveAvailableBalance,
    availableBalance: liveAvailableBalance,
    myTransactions
  };
};
