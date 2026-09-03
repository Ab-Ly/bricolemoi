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
  Gift,
  Menu,
  X,
  ChevronRight,
  Radio,
  Sliders,
  Sparkles,
  LogOut
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
  const { user, logout } = useAuth();
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navSections = [
    {
      id: 'MISSIONS',
      label: 'Tour de Contrôle (SOS)',
      shortLabel: 'Tour de Contrôle',
      icon: Activity,
      count: activeSOSCount,
      countType: activeSOSCount > 0 ? 'pulse' : 'normal',
      color: 'amber',
      desc: 'Flux d’urgences en direct, matching radar & suivi GPS'
    },
    {
      id: 'CLIENTS',
      label: 'Clients Particuliers',
      shortLabel: 'Clients',
      icon: Users,
      count: clients.length,
      countType: 'normal',
      color: 'blue',
      desc: 'Gestion des comptes, historique et suspensions'
    },
    {
      id: 'MAALEMS',
      label: 'Maâlems Partenaires',
      shortLabel: 'Maâlems Pro',
      icon: Wrench,
      count: uniqueMaalems.length,
      countType: 'normal',
      color: 'emerald',
      desc: 'Fiches artisans, solde de leads et conformité'
    },
    {
      id: 'DISPUTES',
      label: 'Litiges & Arbitrage',
      shortLabel: 'Litiges',
      icon: ShieldAlert,
      count: pendingDisputesCount,
      countType: pendingDisputesCount > 0 ? 'pulse' : 'normal',
      color: 'rose',
      desc: 'Médiation chantiers, réclamations et remboursements'
    },
    {
      id: 'RECHARGES',
      label: 'Recharges & Packs',
      shortLabel: 'Recharges',
      icon: Receipt,
      count: pendingRechargesCount,
      countType: pendingRechargesCount > 0 ? 'pulse' : 'normal',
      color: 'purple',
      desc: 'Validation des crédits leads et factures'
    },
    {
      id: 'LOYALTY',
      label: 'Fidélité & Badges',
      shortLabel: 'Fidélité',
      icon: Gift,
      count: null,
      color: 'amber',
      desc: 'Récompenses artisans et distinctions qualité'
    }
  ];

  const currentSection = navSections.find(s => s.id === activeTab) || navSections[0];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-28 md:pb-16 font-sans">
      {/* 1. Header Global avec Actions Rapides & Switch Menu */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-xs relative overflow-hidden text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-mono font-bold text-purple-700 flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>SUPERVISION GÉNÉRALE • BRICOLEMOI</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Tour de Contrôle Administrateur
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Supervision temps réel : clients, flux d'urgences SOS, artisans maâlems et arbitrage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap md:flex-nowrap items-center gap-2">
            {/* Bouton Arbitre d'Audit */}
            <button
              type="button"
              onClick={() => setShowAuditModal(true)}
              className={`min-h-[44px] px-3 py-2 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44 border ${
                auditReport.healthStatus === 'OPTIMAL'
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-300 animate-pulse'
              }`}
            >
              <SearchCheck className={`w-4 h-4 shrink-0 ${auditReport.healthStatus === 'OPTIMAL' ? 'text-emerald-600' : 'text-amber-600'}`} />
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
              className="min-h-[44px] px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-purple-600 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? '...' : 'Actualiser'}</span>
            </button>

            {/* Bouton Sécurité & Identifiants Admin */}
            <button
              type="button"
              onClick={() => setShowSecurityModal(true)}
              className="min-h-[44px] px-3 py-2 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44"
              title="Modifier le mot de passe admin et le code PIN"
            >
              <KeyRound className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Sécurité</span>
            </button>

            {/* Bouton Accès Dédié Cockpit IT */}
            <button
              type="button"
              onClick={() => switchSubdomainInDev('IT')}
              className="min-h-[44px] px-3 py-2 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44"
              title="Ouvrir la Console Live et l'Observabilité IT"
            >
              <Terminal className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Espace IT</span>
            </button>

            {/* Bouton Quitter Session Admin */}
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('bricolemoi_admin_pin_ok');
                if (typeof logout === 'function') {
                  logout(() => switchSubdomainInDev('LANDING'));
                } else {
                  switchSubdomainInDev('LANDING');
                }
              }}
              className="min-h-[44px] px-3 py-2 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer touch-target-44"
              title="Quitter la console d'administration"
            >
              <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Quitter</span>
            </button>
          </div>
        </div>

        {/* Bannières KPI Financières & Activité */}
        <div className="mt-4 pt-4 border-t border-slate-100">
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
      </div>

      {/* 2. Barre d'Action & Navigation Latérale / Drawer */}
      <div className="flex flex-col lg:flex-row gap-4 items-start relative">
        {/* SIDEBAR DÉROULANTE (DESKTOP ET TIROIR MOBILE) */}
        <>
          {/* Backdrop sombre sur mobile */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 lg:hidden transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Tiroir Latéral Déroulant */}
          <aside 
            className={`
              fixed lg:sticky top-0 lg:top-20 h-screen lg:h-auto
              w-72 sm:w-80 lg:w-64 bg-white border-r lg:border border-slate-200/90 z-50 lg:z-10
              flex flex-col justify-between p-4 rounded-none lg:rounded-3xl shadow-xl lg:shadow-xs shrink-0
              transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="space-y-4">
              {/* Header mobile drawer */}
              <div className="flex items-center justify-between lg:hidden border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="font-mono font-black text-xs text-slate-900">NAVIGATION ADMIN</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                MODULES MÉTIER ({navSections.length})
              </div>

              {/* Liste des sections de navigation */}
              <nav className="space-y-1">
                {navSections.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectTab(item.id)}
                      className={`
                        w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left
                        ${isActive 
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 font-black' 
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{item.shortLabel}</span>
                      </div>

                      {item.count !== null && item.count !== undefined && (
                        <span 
                          className={`
                            px-2 py-0.5 rounded-full text-[10px] font-mono font-black shrink-0
                            ${isActive 
                              ? 'bg-white/25 text-white' 
                              : item.countType === 'pulse' && item.count > 0
                              ? 'bg-rose-100 text-rose-900 animate-pulse'
                              : 'bg-slate-100 text-slate-600 border border-slate-200/70'}
                          `}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Pied de sidebar : Raccourci vers Cockpit IT */}
            <div className="pt-4 border-t border-slate-100 space-y-2 font-mono text-[11px] mt-4">
              <button
                type="button"
                onClick={() => switchSubdomainInDev('IT')}
                className="w-full py-2 px-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-between transition-all border border-blue-200 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cockpit IT VPS</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
              </button>
            </div>
          </aside>
        </>

        {/* CONTENU PRINCIPAL DE LA VUE SÉLECTIONNÉE */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {/* Header Mobile / Tablette de section active avec bouton tiroir */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                {React.createElement(currentSection.icon, { className: 'w-4 h-4' })}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>ADMINISTRATION</span>
                  <span>/</span>
                  <span className="font-bold text-purple-700">{currentSection.shortLabel}</span>
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 truncate">
                  {currentSection.label}
                </h2>
              </div>
            </div>

            {/* Bouton pour changer de section sur mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 touch-target-44"
            >
              <Menu className="w-4 h-4 text-purple-600" />
              <span>Menu</span>
            </button>
          </div>

          {/* Vues Métier Conditionnelles */}
          <AnimatePresence mode="wait">
            {activeTab === 'CLIENTS' && (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <AdminLoyaltyRewardsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
