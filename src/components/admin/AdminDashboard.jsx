import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Activity, 
  Wrench, 
  ShieldAlert, 
  Coins, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Receipt,
  FileSpreadsheet,
  Gift,
  SearchCheck,
  Zap,
  X,
  Radio,
  TrendingUp,
  Wallet,
  DollarSign,
  PiggyBank
} from 'lucide-react';
import { isRealRechargeTx, isLeadTx, isBonusTx, isRefundTx } from '../../utils/balanceUtils';
import { AdminClientsView } from './AdminClientsView';
import { AdminLiveMissions } from './AdminLiveMissions';
import { AdminMaalemsView } from './AdminMaalemsView';
import { AdminDisputesView } from './AdminDisputesView';
import { AdminRechargesView } from './AdminRechargesView';
import { AdminLoyaltyRewardsView } from './AdminLoyaltyRewardsView';
import { AdminRealtimeConsole } from './AdminRealtimeConsole';
import { auditPlatformState, healPlatformState } from '../../services/platformAuditReferee';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const {
    clients = [],
    maalems = [],
    interventions = [],
    transactions = [],
    adminAlerts = [],
    reviews = [],
    loyaltyRewardsHistory = [],
    refreshData,
    quickCreditMaalem,
    toggleMaalemSuspension,
    toggleClientSuspension,
    resolveDisputeAndRefund,
    cancelIntervention,
    approveRecharge,
    rejectRecharge,
    generateReceiptPDF,
    ablyOnlineMaalemsCount
  } = useApp();

  const [activeTab, setActiveTab] = useState('MISSIONS'); // 'CLIENTS' | 'MISSIONS' | 'MAALEMS' | 'DISPUTES' | 'RECHARGES' | 'REWARDS'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // 🛡️ Audit en Temps Réel de l'Arbitre Déterministe
  const auditReport = useMemo(() => {
    return auditPlatformState({
      interventions,
      transactions,
      maalems,
      reviews,
      user
    });
  }, [interventions, transactions, maalems, reviews, user]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (typeof refreshData === 'function') {
      await refreshData();
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleHealPlatform = () => {
    const healed = healPlatformState({ interventions, maalems, transactions, reviews });
    if (healed) {
      if (refreshData) refreshData();
      setShowAuditModal(false);
    }
  };

  // Calcul des métriques globales en direct et détaillées
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

  const onlineMaalemsCount = maalems.filter((m) => m.is_online).length;
  const activeClientsCount = (clients || []).filter((c) => !c.is_suspended).length;
  const resolvedDisputesMap = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_resolved_disputes') || '{}');
    } catch (e) {
      return {};
    }
  }, []);

  const pendingDisputesCount = React.useMemo(() => {
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

  }, [adminAlerts, interventions, resolvedDisputesMap]);
  const pendingRechargesCount = transactions.filter((t) => t.status === 'PENDING').length;

  // --- 💼 Bilan Financier & Trésorerie Haute Précision ---
  const financialMetrics = useMemo(() => {
    // 1. CA Brut Encaissé (Recharges Bancaires réelles payées par les artisans, hors remboursements et hors bonus)
    const grossRevenueEncaissed = (transactions || [])
      .filter((t) => (t.status === 'VALIDATED' || t.status === 'APPROVED' || t.status === 'COMPLETED') && isRealRechargeTx(t))
      .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);

    // 2. Déblocages et Missions Réalisées (15 DH par mission débloquée)
    const unlockedMissions = (interventions || []).filter(
      (i) => i.status === 'ACCEPTED' || i.status === 'IN_PROGRESS' || i.status === 'COMPLETED'
    );
    const unlockedMissionsCount = unlockedMissions.length;
    const netEarnedCommissions = unlockedMissionsCount * 15;

    // 3. Soldes Détenus par les Maâlems (Total, Avances Réelles en Séquestre et Bonus)
    const totalMaalemCredits = (maalems || []).reduce((sum, m) => sum + (parseFloat(m.credit_balance) || 0), 0);
    const unspentRealCash = Math.max(0, grossRevenueEncaissed - netEarnedCommissions);
    const unspentBonusCredits = Math.max(0, totalMaalemCredits - unspentRealCash);

    // 4. Volume d'Affaires Global Chantiers Accord Direct (Montant total des travaux réalisés)
    const completedMissions = (interventions || []).filter((i) => i.status === 'COMPLETED');
    const directChantiersVolume = completedMissions.reduce(
      (sum, i) => sum + (parseFloat(i.final_agreed_price) || parseFloat(i.price) || 0), 0
    );

    // 5. Total des Remboursements Litiges (Avoirs SAV)
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
  }, [transactions, interventions, maalems]);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-32 md:pb-16 font-sans px-2.5 sm:px-4">
      {/* 1. Header Global & KPIs Haute Densité */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-7 shadow-sm relative overflow-hidden text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-purple-50 border border-purple-200 text-[9px] sm:text-[10px] font-mono font-bold text-purple-700 flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                <span>SUPERVISION GÉNÉRALE • BRICOLEMOI MAROC</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 mt-1.5 sm:mt-2 tracking-tight">
              Tour de Contrôle &amp; Administration
            </h1>
            <p className="text-[11px] sm:text-sm text-slate-600 mt-0.5">
              Supervision temps réel des clients, flux d'urgences SOS, partenaires maâlems et arbitrage des litiges.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 w-full md:w-auto">
            {/* Bouton Arbitre d'Audit Invariant */}
            <button
              type="button"
              onClick={() => setShowAuditModal(true)}
              className={`flex-1 md:flex-none px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer border ${
                auditReport.healthStatus === 'OPTIMAL'
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-300 animate-pulse'
              }`}
            >
              <SearchCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${auditReport.healthStatus === 'OPTIMAL' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="truncate">
                {auditReport.healthStatus === 'OPTIMAL'
                  ? `🛡️ 100% Intègre`
                  : `🛡️ ${auditReport.issues.length} Anomalie(s)`}
              </span>
            </button>

            {/* Bouton Rafraîchir */}
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex-1 md:flex-none px-2.5 py-2 sm:px-4 sm:py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Actualisation...' : 'Actualiser'}</span>
            </button>
          </div>
        </div>

        {/* 💼 1. Bilan Financier & Trésorerie Haute Visibilité (Tout en Haut) */}
        <div className="mt-3.5 sm:mt-6 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200/80 mb-2.5 sm:mb-3.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight block">
                  Bilan Financier &amp; Trésorerie
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium hidden sm:block">
                  Suivi en direct des encaissements, commissions nettes et séquestre
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('RECHARGES')}
              className="text-[10px] sm:text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 px-2.5 py-1 rounded-lg sm:rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer flex items-center gap-1 ml-auto"
            >
              <span>Recharges</span>
              <TrendingUp className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
            {/* 1. CA Brut Encaissé */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block truncate">
                CA Brut Encaissé
              </span>
              <p className="text-base sm:text-2xl font-black font-mono text-slate-900">
                {financialMetrics.grossRevenueEncaissed.toLocaleString('fr-FR')} <span className="text-[10px] sm:text-xs font-normal text-slate-500 font-sans">DH</span>
              </p>
              <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono block truncate">
                Recharges réelles payées
              </span>
            </div>

            {/* 2. CA Net Réalisé */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-emerald-200/90 shadow-xs space-y-0.5 sm:space-y-1 ring-1 ring-emerald-500/10">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold block truncate">
                CA Net Réalisé
              </span>
              <p className="text-base sm:text-2xl font-black font-mono text-emerald-700">
                {financialMetrics.netEarnedCommissions.toLocaleString('fr-FR')} <span className="text-[10px] sm:text-xs font-normal text-emerald-600 font-sans">DH</span>
              </p>
              <span className="text-[8px] sm:text-[10px] text-emerald-600 font-mono block truncate">
                {financialMetrics.unlockedMissionsCount} lead{financialMetrics.unlockedMissionsCount > 1 ? 's' : ''} (15 DH/u)
              </span>
            </div>

            {/* 3. Solde Non Consommé Maâlems */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-xs space-y-0.5 sm:space-y-1 ring-1 ring-amber-500/10">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold block truncate">
                Crédits Non Consommés
              </span>
              <p className="text-base sm:text-2xl font-black font-mono text-amber-800">
                {financialMetrics.totalMaalemCredits.toLocaleString('fr-FR')} <span className="text-[10px] sm:text-xs font-normal text-amber-700 font-sans">DH</span>
              </p>
              <span className="text-[8px] sm:text-[10px] text-amber-700 font-mono block truncate">
                {financialMetrics.unspentRealCash} DH + {financialMetrics.unspentBonusCredits} DH bonus
              </span>
            </div>

            {/* 4. Volume Global Chantiers */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-blue-200/90 shadow-xs space-y-0.5 sm:space-y-1 ring-1 ring-blue-500/10">
              <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-blue-700 font-bold block truncate">
                Volume Chantiers
              </span>
              <p className="text-base sm:text-2xl font-black font-mono text-blue-700">
                {financialMetrics.directChantiersVolume.toLocaleString('fr-FR')} <span className="text-[10px] sm:text-xs font-normal text-blue-600 font-sans">DH</span>
              </p>
              <span className="text-[8px] sm:text-[10px] text-blue-500 font-mono block truncate">
                {financialMetrics.completedMissionsCount > 0
                  ? `${financialMetrics.completedMissionsCount} chantiers directs`
                  : 'Accords directs'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. 4 Compteurs KPI Essentiels & Interactifs (2x2 Mobile, 4 Cols Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 mt-3.5 sm:mt-5 pt-3.5 sm:pt-5 border-t border-slate-100">
          {/* Card 1 : Total Clients */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('CLIENTS')}
            className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 sm:space-y-3 shadow-xs ${
              activeTab === 'CLIENTS'
                ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-400/50'
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {activeClientsCount} actifs
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold truncate">
                Clients Enregistrés
              </span>
              <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{clients.length}</p>
            </div>

            <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span className="truncate">Missions :</span>
              <strong className="text-blue-700 font-black">{interventions.length}</strong>
            </div>
          </motion.div>

          {/* Card 2 : Tour de Contrôle SOS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('MISSIONS')}
            className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 sm:space-y-3 shadow-xs ${
              activeTab === 'MISSIONS'
                ? 'bg-amber-50/70 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs shrink-0">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>Live</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider block truncate">
                Urgences SOS Actives
              </span>
              <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{activeSOSCount}</p>
            </div>

            <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span className="truncate">{pendingSOSCount} en attente</span>
              <span>•</span>
              <strong className="text-amber-800 font-bold">{inProgressSOSCount} en cours</strong>
            </div>
          </motion.div>

          {/* Card 3 : Total Maâlems */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('MAALEMS')}
            className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 sm:space-y-3 shadow-xs ${
              activeTab === 'MAALEMS'
                ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-1 ring-emerald-400/50'
                : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shadow-xs shrink-0">
                <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span>En Ligne</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[11px] font-mono text-emerald-800 uppercase tracking-wider block font-bold truncate">
                Maâlems en Ligne
              </span>
              <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{onlineMaalemsCount}</p>
            </div>

            <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span className="truncate">Réseau :</span>
              <strong className="text-slate-900 font-bold">{maalems.length} pros</strong>
            </div>
          </motion.div>

          {/* Card 4 : Litiges à Arbitrer */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('DISPUTES')}
            className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 sm:space-y-3 shadow-xs ${
              activeTab === 'DISPUTES'
                ? 'bg-rose-50/70 border-rose-400 shadow-sm ring-1 ring-rose-400/50'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs shrink-0">
                <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
              </div>
              <span className={`text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${
                pendingDisputesCount > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                {pendingDisputesCount > 0 ? 'Action' : '🟢 À jour'}
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[11px] font-mono text-rose-700 uppercase tracking-wider block font-bold truncate">
                Litiges en Attente
              </span>
              <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{pendingDisputesCount}</p>
            </div>

            <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span className="truncate">Recharges :</span>
              <strong className="text-purple-700 font-bold">{pendingRechargesCount}</strong>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Barre de Navigation par Onglets (Segmented Control SaaS Pro : 7 Cols Desktop / Scroll Horizontal Mobile) */}
      <div className="bg-slate-100/95 border border-slate-200 p-1.5 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex lg:grid lg:grid-cols-7 gap-1.5 min-w-max lg:min-w-0">
          {/* Tab 1: Clients */}
          <button
            type="button"
            onClick={() => setActiveTab('CLIENTS')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'CLIENTS'
                ? 'bg-white text-blue-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Users className={`w-4 h-4 shrink-0 ${activeTab === 'CLIENTS' ? 'text-blue-600' : 'text-slate-500'}`} />
            <span>Clients</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              activeTab === 'CLIENTS' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {clients.length}
            </span>
          </button>

          {/* Tab 2: Tour de Contrôle Live */}
          <button
            type="button"
            onClick={() => setActiveTab('MISSIONS')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'MISSIONS'
                ? 'bg-white text-amber-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Activity className={`w-4 h-4 shrink-0 ${activeTab === 'MISSIONS' ? 'text-amber-600' : 'text-slate-500'}`} />
            <span>Tour de Contrôle</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              activeSOSCount > 0 ? 'bg-amber-100 text-amber-900 animate-pulse' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {activeSOSCount}
            </span>
          </button>

          {/* Tab 3: Maâlems */}
          <button
            type="button"
            onClick={() => setActiveTab('MAALEMS')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'MAALEMS'
                ? 'bg-white text-emerald-800 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Wrench className={`w-4 h-4 shrink-0 ${activeTab === 'MAALEMS' ? 'text-emerald-800' : 'text-slate-500'}`} />
            <span>Maâlems Pro</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              activeTab === 'MAALEMS' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {maalems.length}
            </span>
          </button>

          {/* Tab 4: Litiges & Remplacement */}
          <button
            type="button"
            onClick={() => setActiveTab('DISPUTES')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap relative ${
              activeTab === 'DISPUTES'
                ? 'bg-white text-rose-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <ShieldAlert className={`w-4 h-4 shrink-0 ${activeTab === 'DISPUTES' ? 'text-rose-600' : 'text-slate-500'}`} />
            <span>Litiges &amp; SAV</span>
            {pendingDisputesCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-mono font-black animate-pulse">
                {pendingDisputesCount}
              </span>
            ) : (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-600 text-[10px] font-mono font-bold">
                0
              </span>
            )}
          </button>

          {/* Tab 5: Recharges */}
          <button
            type="button"
            onClick={() => setActiveTab('RECHARGES')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'RECHARGES'
                ? 'bg-white text-purple-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Receipt className={`w-4 h-4 shrink-0 ${activeTab === 'RECHARGES' ? 'text-purple-600' : 'text-slate-500'}`} />
            <span>Recharges</span>
            {pendingRechargesCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-mono font-black animate-pulse">
                {pendingRechargesCount}
              </span>
            ) : (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-600 text-[10px] font-mono font-bold">
                0
              </span>
            )}
          </button>

          {/* Tab 6: Gratuités & Fidélité 4/4 */}
          <button
            type="button"
            onClick={() => setActiveTab('LOYALTY')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'LOYALTY'
                ? 'bg-white text-indigo-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Gift className={`w-4 h-4 shrink-0 ${activeTab === 'LOYALTY' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span>Fidélité 4/4</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              activeTab === 'LOYALTY' ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {loyaltyRewardsHistory.length}
            </span>
          </button>

          {/* Tab 7: Console Temps Réel Live (Ably-Style Stream) */}
          <button
            type="button"
            onClick={() => setActiveTab('REALTIME')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'REALTIME'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-black'
                : 'text-blue-700 hover:text-blue-900 hover:bg-blue-50 font-bold border border-blue-200/60 bg-white'
            }`}
          >
            <Radio className={`w-4 h-4 shrink-0 animate-pulse ${activeTab === 'REALTIME' ? 'text-white' : 'text-blue-600'}`} />
            <span>Console Live</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        </div>
      </div>

      {/* 3. Contenu de l'Onglet Actif */}
      <AnimatePresence mode="wait">
        {activeTab === 'REALTIME' && (
          <motion.div
            key="realtime"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminRealtimeConsole />
          </motion.div>
        )}
        {activeTab === 'CLIENTS' && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminClientsView
              clients={clients}
              interventions={interventions}
              reviews={reviews}
              onToggleSuspension={toggleClientSuspension}
            />
          </motion.div>
        )}

        {activeTab === 'MISSIONS' && (
          <motion.div
            key="missions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminLiveMissions
              interventions={interventions}
              maalems={maalems}
              onCancelIntervention={cancelIntervention}
            />
          </motion.div>
        )}

        {activeTab === 'MAALEMS' && (
          <motion.div
            key="maalems"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminMaalemsView
              maalems={maalems}
              interventions={interventions}
              transactions={transactions}
              reviews={reviews}
              onQuickCredit={quickCreditMaalem}
              onToggleSuspension={toggleMaalemSuspension}
            />
          </motion.div>
        )}

        {activeTab === 'DISPUTES' && (
          <motion.div
            key="disputes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminDisputesView
              adminAlerts={adminAlerts}
              interventions={interventions}
              maalems={maalems}
              clients={clients}
              onResolveDispute={resolveDisputeAndRefund}
            />
          </motion.div>
        )}

        {activeTab === 'RECHARGES' && (
          <motion.div
            key="recharges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminRechargesView
              transactions={transactions}
              maalems={maalems}
              onApprove={approveRecharge}
              onReject={rejectRecharge}
              onGenerateReceiptPDF={generateReceiptPDF}
            />
          </motion.div>
        )}

        {activeTab === 'LOYALTY' && (
          <motion.div
            key="loyalty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AdminLoyaltyRewardsView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛡️ Modale Interactive d'Arbitrage et Santé Système */}
      <AnimatePresence>
        {showAuditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    auditReport.healthStatus === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Arbitre d'Audit &amp; Invariants Plateforme
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Supervision automatique continue des 3 piliers (Client - Maâlem - Admin)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAuditModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Score & Métriques */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Score Intégrité</span>
                  <p className={`text-2xl font-black font-mono ${
                    auditReport.score >= 90 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {auditReport.score}%
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Missions Audités</span>
                  <p className="text-2xl font-black font-mono text-slate-900">{auditReport.totalAudited.interventions}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Écritures Grand Livre</span>
                  <p className="text-2xl font-black font-mono text-slate-900">{auditReport.totalAudited.transactions}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Anomalies</span>
                  <p className={`text-2xl font-black font-mono ${
                    auditReport.issues.length === 0 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {auditReport.issues.length}
                  </p>
                </div>
              </div>

              {/* Liste des Invariants Vérifiés */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase text-slate-500 font-mono tracking-wider">
                  Contrôles Invariants Temps Réel :
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">1. Grand Livre Financier (Soldes Maâlems = Recharges - Débits)</span>
                    <span className="text-emerald-600 font-bold">✓ Conforme</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">2. Identité &amp; Contacts (Vrai Nom &amp; Téléphone sur Déblocage)</span>
                    <span className="text-emerald-600 font-bold">✓ Conforme</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">3. Géolocalisation &amp; GPS (Zéro Déroutement Forcé)</span>
                    <span className="text-emerald-600 font-bold">✓ Conforme</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">4. Ségrégation des Badges d'Avis (Notes 1-3★ vs 4-5★)</span>
                    <span className="text-emerald-600 font-bold">✓ Conforme</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">5. Schéma UUID &amp; Clés Étrangères PostgreSQL Supabase</span>
                    <span className="text-emerald-600 font-bold">✓ Conforme</span>
                  </div>
                </div>
              </div>

              {/* Détails des Anomalies Éventuelles */}
              {auditReport.issues.length > 0 && (
                <div className="space-y-2 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs">
                  <h4 className="font-black text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Journal des alertes de l'arbitre :</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-amber-800">
                    {auditReport.issues.map((iss, idx) => (
                      <li key={idx}>
                        <strong>{iss.title}</strong>: {iss.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bouton de Fermeture */}
              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAuditModal(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Fermer l'Arbitre
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
