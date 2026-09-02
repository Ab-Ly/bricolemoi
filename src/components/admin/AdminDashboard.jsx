import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Activity, 
  Wrench, 
  ShieldAlert, 
  RefreshCw, 
  ShieldCheck, 
  SearchCheck, 
  Terminal, 
  KeyRound, 
  Receipt, 
  Gift 
} from 'lucide-react';
import { switchSubdomainInDev } from '../../lib/subdomain';
import { auditPlatformState, healPlatformState } from '../../services/platformAuditReferee';

// Sous-composants & Vues
import { AdminClientsView } from './AdminClientsView';
import { AdminLiveMissions } from './AdminLiveMissions';
import { AdminMaalemsView } from './AdminMaalemsView';
import { AdminDisputesView } from './AdminDisputesView';
import { AdminRechargesView } from './AdminRechargesView';
import { AdminLoyaltyRewardsView } from './AdminLoyaltyRewardsView';
import { AdminSecurityModal } from './AdminSecurityModal';
import { AdminAuditModal } from './components/AdminAuditModal';
import { AdminKpiBanners } from './components/AdminKpiBanners';
import { useAdminKpis } from './hooks/useAdminKpis';

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
    generateReceiptPDF
  } = useApp();

  const [activeTab, setActiveTab] = useState('MISSIONS'); // 'CLIENTS' | 'MISSIONS' | 'MAALEMS' | 'DISPUTES' | 'RECHARGES' | 'LOYALTY'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // Hook modulaire de KPIs
  const {
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
  } = useAdminKpis({
    interventions,
    transactions,
    maalems,
    clients,
    adminAlerts
  });

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

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap md:flex-nowrap items-center gap-2 sm:gap-2.5 w-full md:w-auto">
            {/* Bouton Arbitre d'Audit */}
            <button
              type="button"
              onClick={() => setShowAuditModal(true)}
              className={`min-h-[44px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44 border ${
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
              className="min-h-[44px] px-2.5 py-2 sm:px-4 sm:py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? '...' : 'Actualiser'}</span>
            </button>

            {/* Bouton Sécurité & Identifiants Admin */}
            <button
              type="button"
              onClick={() => setShowSecurityModal(true)}
              className="min-h-[44px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44"
              title="Modifier le mot de passe admin et le code PIN de session 2FA"
            >
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
              <span>Sécurité Accès</span>
            </button>

            {/* Bouton Accès Dédié Cockpit IT */}
            <button
              type="button"
              onClick={() => switchSubdomainInDev('IT')}
              className="min-h-[44px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44"
              title="Ouvrir la Console Live et l'Observabilité IT"
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
              <span>Espace IT</span>
            </button>
          </div>
        </div>

        {/* Bannières KPI Financières & Activité */}
        <AdminKpiBanners
          financialMetrics={financialMetrics}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          clientsCount={clients.length}
          activeClientsCount={activeClientsCount}
          interventionsCount={interventions.length}
          activeSOSCount={activeSOSCount}
          pendingSOSCount={pendingSOSCount}
          inProgressSOSCount={inProgressSOSCount}
          maalemsCount={uniqueMaalems.length}
          onlineMaalemsCount={onlineMaalemsCount}
          pendingDisputesCount={pendingDisputesCount}
        />
      </div>

      {/* 2. Barre de Navigation par Onglets Métier */}
      <div className="bg-slate-100/95 border border-slate-200 p-1.5 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex lg:grid lg:grid-cols-6 gap-1.5 min-w-max lg:min-w-0">
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
              {uniqueMaalems.length}
            </span>
          </button>

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
            <span>Litiges &amp; Arbitrage</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              pendingDisputesCount > 0 ? 'bg-rose-100 text-rose-900 animate-pulse' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {pendingDisputesCount}
            </span>
          </button>

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
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              pendingRechargesCount > 0 ? 'bg-purple-100 text-purple-900 animate-pulse' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {pendingRechargesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('LOYALTY')}
            className={`py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'LOYALTY'
                ? 'bg-white text-amber-700 shadow-sm font-black border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Gift className={`w-4 h-4 shrink-0 ${activeTab === 'LOYALTY' ? 'text-amber-600' : 'text-slate-500'}`} />
            <span>Fidélité &amp; Badges</span>
          </button>
        </div>
      </div>

      {/* 3. Vues Métier Conditionnelles */}
      <AnimatePresence mode="wait">
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
              maalems={uniqueMaalems}
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

      {/* Modale interactive d'audit */}
      <AdminAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        auditReport={auditReport}
      />

      {/* Modale de sécurité admin */}
      <AdminSecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
      />
    </div>
  );
};
