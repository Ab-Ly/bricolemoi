import React from 'react';
import { motion } from 'framer-motion';
import { formatDateTime } from '../../../utils/dateUtils';

export const ProfileTransactionsTab = ({ transactions = [], liveAvailableBalance = 0 }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 font-sans">
      <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-950 block">Solde Disponible</span>
          <span className="text-[10px] text-emerald-800">Crédits valides pour débloquer des chantiers</span>
        </div>
        <span className="text-base font-mono font-black text-emerald-900">
          {liveAvailableBalance.toFixed(2)} DH
        </span>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto modal-scroll pr-1">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 space-y-1">
            <p className="text-xs font-bold">Aucune transaction enregistrée.</p>
            <p className="text-[11px] text-slate-400">Vos déblocages de leads (-15 DH) et recharges apparaîtront ici.</p>
          </div>
        ) : (
          transactions.map((tx) => {
            const isPositive = Number(tx.amount_dh) > 0;
            return (
              <div key={tx.id} className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-2 shadow-xs text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {tx.payment_method || tx.type}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {formatDateTime(tx.created_at || Date.now(), 'long')}
                  </p>
                  {tx.admin_notes && (
                    <p className="text-[10px] text-slate-600 italic truncate mt-0.5">
                      {tx.admin_notes}
                    </p>
                  )}
                </div>
                <span className={`font-mono font-bold px-2.5 py-1 rounded-xl text-xs shrink-0 ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : Number(tx.amount_dh).toFixed(2)} DH
                </span>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};
