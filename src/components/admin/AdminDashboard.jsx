import React, { useState } from 'react';
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
  FileSpreadsheet
} from 'lucide-react';
import { AdminClientsView } from './AdminClientsView';
import { AdminLiveMissions } from './AdminLiveMissions';
import { AdminMaalemsView } from './AdminMaalemsView';
import { AdminDisputesView } from './AdminDisputesView';
import { AdminRechargesView } from './AdminRechargesView';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const {
    clients = [],
    maalems = [],
    interventions = [],
    transactions = [],
    adminAlerts = [],
    reviews = [],
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

  const [activeTab, setActiveTab] = useState('CLIENTS'); // 'CLIENTS' | 'MISSIONS' | 'MAALEMS' | 'DISPUTES' | 'RECHARGES'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (typeof refreshData === 'function') {
      await refreshData();
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Calcul des métriques globales en direct et détaillées
  const pendingSOSCount = interventions.filter((i) => i.status === 'PENDING').length;
  const inProgressSOSCount = interventions.filter(
    (i) => i.status === 'ACCEPTED' || i.progress_step === 'ON_THE_WAY' || i.progress_step === 'ARRIVED'
  ).length;
  const activeSOSCount = pendingSOSCount + inProgressSOSCount;
  const completedSOSCount = interventions.filter((i) => i.status === 'COMPLETED').length;

  const onlineMaalemsCount = maalems.filter((m) => m.is_online).length;
  const activeClientsCount = clients.filter((c) => !c.is_suspended).length;
  const pendingDisputesCount = adminAlerts.filter(
    (a) => a.status !== 'REFUNDED_RESOLVED' && a.status !== 'REJECTED'
  ).length;
  const pendingRechargesCount = transactions.filter((t) => t.status === 'PENDING').length;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Global & KPIs Haute Densité */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-mono font-bold text-purple-700 flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>SUPERVISION GÉNÉRALE • BRICOLEMOI MAROC</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Tour de Contrôle &amp; Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Supervision temps réel des clients, flux d'urgences SOS, partenaires maâlems et arbitrage des litiges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Bouton Rafraîchir */}
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-purple-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Actualisation...' : 'Actualiser les Flux'}</span>
            </button>
          </div>
        </div>

        {/* 4 Compteurs KPI Essentiels & Interactifs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-100">
          {/* Card 1 : Total Clients */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('CLIENTS')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs ${
              activeTab === 'CLIENTS'
                ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-400/50'
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {activeClientsCount} actifs
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                Clients Enregistrés
              </span>
              <p className="text-3xl font-black text-slate-900 font-mono mt-0.5">{clients.length}</p>
            </div>

            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span>Missions totales :</span>
              <strong className="text-blue-700 font-black">{interventions.length}</strong>
            </div>
          </motion.div>

          {/* Card 2 : Tour de Contrôle SOS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('MISSIONS')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs ${
              activeTab === 'MISSIONS'
                ? 'bg-amber-50/70 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                <Activity className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>En Direct</span>
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-amber-800 uppercase tracking-wider block font-bold">
                Urgences SOS Actives
              </span>
              <p className="text-3xl font-black text-slate-900 font-mono mt-0.5">{activeSOSCount}</p>
            </div>

            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span>{pendingSOSCount} en attente</span>
              <span>•</span>
              <span className="text-blue-700 font-bold">{inProgressSOSCount} en cours</span>
            </div>
          </motion.div>

          {/* Card 3 : Maâlems Connectés */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('MAALEMS')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs ${
              activeTab === 'MAALEMS'
                ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-1 ring-emerald-400/50'
                : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                <Wrench className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                Ably Live 🟢
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider block font-bold">
                Maâlems en Ligne
              </span>
              <p className="text-3xl font-black text-slate-900 font-mono mt-0.5">
                {onlineMaalemsCount}
              </p>
            </div>

            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span>Total réseau :</span>
              <strong className="text-slate-900">{maalems.length} artisans</strong>
            </div>
          </motion.div>

          {/* Card 4 : Litiges à Arbitrer */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('DISPUTES')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs ${
              activeTab === 'DISPUTES'
                ? 'bg-rose-50/70 border-rose-400 shadow-sm ring-1 ring-rose-400/50'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                pendingDisputesCount > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                {pendingDisputesCount > 0 ? 'Action Requise' : 'À jour 🟢'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-rose-700 uppercase tracking-wider block font-bold">
                Litiges en Attente
              </span>
              <p className="text-3xl font-black text-slate-900 font-mono mt-0.5">{pendingDisputesCount}</p>
            </div>

            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
              <span>Recharges en attente :</span>
              <strong className="text-purple-700 font-bold">{pendingRechargesCount}</strong>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Barre de Navigation par Onglets */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('CLIENTS')}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'CLIENTS'
              ? 'bg-blue-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Clients &amp; Historique ({clients.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('MISSIONS')}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'MISSIONS'
              ? 'bg-amber-500 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>2. Tour de Contrôle Live ({interventions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('MAALEMS')}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'MAALEMS'
              ? 'bg-emerald-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>3. Maâlems &amp; Crédits ({maalems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('DISPUTES')}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer relative ${
            activeTab === 'DISPUTES'
              ? 'bg-rose-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>4. Litiges &amp; Remplacement Lead</span>
          {pendingDisputesCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-mono font-black ml-1 animate-bounce">
              {pendingDisputesCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('RECHARGES')}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'RECHARGES'
              ? 'bg-purple-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>5. Recharges &amp; Rapprochement</span>
          {pendingRechargesCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono font-black ml-1 animate-pulse">
              {pendingRechargesCount}
            </span>
          )}
        </button>
      </div>

      {/* 3. Contenu de l'Onglet Actif */}
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
      </AnimatePresence>
    </div>
  );
};
