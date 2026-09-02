import { useMemo } from 'react';
import { isRealRechargeTx, isRefundTx, calculateMaalemBalance } from '../../../utils/balanceUtils';
import { deduplicateMaalems } from '../../../services/dataReconciliationService';

export const useAdminKpis = ({
  interventions = [],
  transactions = [],
  maalems = [],
  clients = [],
  adminAlerts = []
}) => {
  const pendingSOSCount = interventions.filter((i) => i.status === 'PENDING').length;
  const inProgressSOSCount = interventions.filter(
    (i) =>
      i.status !== 'COMPLETED' &&
      i.status !== 'CANCELLED' &&
      i.status !== 'UNFEASIBLE' &&
      i.status !== 'UNREACHABLE_REFUNDED' &&
      (i.status === 'ACCEPTED' || i.status === 'IN_PROGRESS' || i.progress_step === 'ON_THE_WAY' || i.progress_step === 'ARRIVED')
  ).length;
  const activeSOSCount = pendingSOSCount + inProgressSOSCount;
  const completedSOSCount = interventions.filter((i) => i.status === 'COMPLETED').length;

  const uniqueMaalems = useMemo(() => deduplicateMaalems(maalems), [maalems]);
  const onlineMaalemsCount = uniqueMaalems.filter((m) => m.is_online).length;
  const activeClientsCount = (clients || []).filter((c) => !c.is_suspended).length;

  const resolvedDisputesMap = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_resolved_disputes') || '{}');
    } catch (e) {
      return {};
    }
  }, []);

  const pendingDisputesCount = useMemo(() => {
    const map = new Map();

    (adminAlerts || []).forEach((a) => {
      if (a && (a.intervention_id || a.id)) {
        map.set(String(a.intervention_id || a.id), a.status);
      }
    });

    (interventions || []).forEach((intv) => {
      if (!intv) return;
      const intId = String(intv.id);
      if (map.has(intId)) {
        if (intv.unfeasible_notes?.startsWith('REJECTED')) {
          map.set(intId, 'REJECTED');
        }
        return;
      }

      const hasLowRating = intv.rating && Number(intv.rating) <= 2;
      const hasUnreachable = Boolean(intv.unreachable_reason);
      const hasUnfeasible = Boolean(intv.unfeasible_reason);

      if (hasLowRating || hasUnreachable || hasUnfeasible) {
        let status = 'PENDING';
        if (intv.status === 'UNREACHABLE_REFUNDED' || resolvedDisputesMap[intId] === 'REFUNDED_RESOLVED') {
          status = 'REFUNDED_RESOLVED';
        } else if (
          intv.unfeasible_notes?.startsWith('REJECTED') ||
          resolvedDisputesMap[intId] === 'REJECTED' ||
          intv.dispute_status === 'REJECTED'
        ) {
          status = 'REJECTED';
        }
        map.set(intId, status);
      }
    });

    return Array.from(map.values()).filter((s) => s === 'PENDING').length;
  }, [adminAlerts, interventions, resolvedDisputesMap]);

  const pendingRechargesCount = transactions.filter((t) => t.status === 'PENDING').length;

  // Bilan Financier & Trésorerie
  const financialMetrics = useMemo(() => {
    const grossRevenueEncaissed = (transactions || [])
      .filter((t) => (t.status === 'VALIDATED' || t.status === 'APPROVED' || t.status === 'COMPLETED') && isRealRechargeTx(t))
      .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);

    const unlockedMissions = (interventions || []).filter(
      (i) => i.status === 'ACCEPTED' || i.status === 'IN_PROGRESS' || i.status === 'COMPLETED'
    );
    const unlockedMissionsCount = unlockedMissions.length;
    const netEarnedCommissions = unlockedMissionsCount * 15;

    const totalMaalemCredits = uniqueMaalems.reduce((sum, m) => {
      const bal = calculateMaalemBalance(m, transactions, uniqueMaalems).liveAvailableBalance;
      return sum + (parseFloat(bal) || 0);
    }, 0);
    const unspentRealCash = Math.max(0, grossRevenueEncaissed - netEarnedCommissions);
    const unspentBonusCredits = Math.max(0, totalMaalemCredits - unspentRealCash);

    const completedMissions = (interventions || []).filter((i) => i.status === 'COMPLETED');
    const directChantiersVolume = completedMissions.reduce(
      (sum, i) => sum + (parseFloat(i.final_agreed_price) || parseFloat(i.price) || 0), 0
    );

    const totalRefundsDh = (transactions || [])
      .filter((t) => isRefundTx(t) && (t.status === 'VALIDATED' || t.status === 'APPROVED'))
      .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);

    return {
      grossRevenueEncaissed,
      netEarnedCommissions,
      totalMaalemCredits,
      unspentRealCash,
      unspentBonusCredits,
      directChantiersVolume,
      completedMissionsCount: completedMissions.length,
      totalRefundsDh,
      unlockedMissionsCount
    };
  }, [transactions, interventions, uniqueMaalems]);

  return {
    pendingSOSCount,
    inProgressSOSCount,
    activeSOSCount,
    completedSOSCount,
    uniqueMaalems,
    onlineMaalemsCount,
    activeClientsCount,
    pendingDisputesCount,
    pendingRechargesCount,
    financialMetrics
  };
};
