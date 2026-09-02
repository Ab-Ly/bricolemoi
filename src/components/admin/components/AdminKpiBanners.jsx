import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Activity, 
  Wrench, 
  ShieldAlert 
} from 'lucide-react';

export const AdminKpiBanners = ({
  financialMetrics,
  activeTab,
  setActiveTab,
  clientsCount,
  activeClientsCount,
  interventionsCount,
  activeSOSCount,
  pendingSOSCount,
  inProgressSOSCount,
  maalemsCount,
  onlineMaalemsCount,
  pendingDisputesCount
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Bilan Financier & Trésorerie */}
      <div className="mt-3.5 sm:mt-6 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200 shadow-xs font-sans">
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

      {/* 2. 4 Compteurs KPI Essentiels & Interactifs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 mt-3.5 sm:mt-5 pt-3.5 sm:pt-5 border-t border-slate-100 font-sans">
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
            <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{clientsCount}</p>
          </div>

          <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
            <span className="truncate">Missions :</span>
            <strong className="text-blue-700 font-black">{interventionsCount}</strong>
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
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            </div>
            <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{onlineMaalemsCount} en ligne</span>
            </span>
          </div>

          <div>
            <span className="text-[9px] sm:text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider block truncate">
              Maâlems Pro Réseau
            </span>
            <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{maalemsCount}</p>
          </div>

          <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
            <span className="truncate">Disponibles :</span>
            <strong className="text-emerald-800 font-black">{onlineMaalemsCount} prêts</strong>
          </div>
        </motion.div>

        {/* Card 4 : Litiges & Arbitrage */}
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
            <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {pendingDisputesCount} en attente
            </span>
          </div>

          <div>
            <span className="text-[9px] sm:text-[11px] font-mono text-rose-700 font-bold uppercase tracking-wider block truncate">
              Litiges &amp; Réclamations
            </span>
            <p className="text-lg sm:text-3xl font-black text-slate-900 font-mono mt-0.5">{pendingDisputesCount}</p>
          </div>

          <div className="text-[8px] sm:text-[10px] text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between font-mono">
            <span className="truncate">Priorité :</span>
            <strong className={pendingDisputesCount > 0 ? 'text-rose-600 font-black' : 'text-slate-500'}>
              {pendingDisputesCount > 0 ? 'Traitement Immédiat' : 'Aucun litige'}
            </strong>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
