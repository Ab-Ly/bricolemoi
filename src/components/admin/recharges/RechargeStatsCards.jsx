import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, Receipt } from 'lucide-react';

export const RechargeStatsCards = ({
  stats,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
      {/* Reçus à Valider */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => setStatusFilter('PENDING')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
          statusFilter === 'PENDING'
            ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400/50 shadow-sm'
            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-amber-800">À Valider</span>
          <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
        </div>
        <p className="text-2xl font-black text-amber-800 font-mono">{stats.pending}</p>
      </motion.button>

      {/* Validées */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => setStatusFilter('VALIDATED')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
          statusFilter === 'VALIDATED'
            ? 'bg-emerald-50/80 border-emerald-400 ring-1 ring-emerald-400/50 shadow-sm'
            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-emerald-800">Validées</span>
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-black text-emerald-800 font-mono">{stats.validated}</p>
      </motion.button>

      {/* Rejets */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => setStatusFilter('REJECTED')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
          statusFilter === 'REJECTED'
            ? 'bg-rose-50/80 border-rose-400 ring-1 ring-rose-400/50 shadow-sm'
            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-rose-700">Rejets / Refus</span>
          <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
          </div>
        </div>
        <p className="text-2xl font-black text-rose-700 font-mono">{stats.rejected}</p>
      </motion.button>

      {/* Tous les flux */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => setStatusFilter('ALL')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
          statusFilter === 'ALL'
            ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/50 shadow-sm'
            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-blue-800">Total Flux</span>
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Receipt className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-black text-blue-800 font-mono">{stats.total}</p>
      </motion.button>
    </div>
  );
};
