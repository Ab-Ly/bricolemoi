import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, XCircle } from 'lucide-react';

export const RechargeRejectModal = ({
  rejectModalTx,
  rejectReason,
  setRejectReason,
  onClose,
  onConfirmReject
}) => {
  if (!rejectModalTx) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 1 }}
          className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-rose-700 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Rejeter la recharge #{String(rejectModalTx.reference_ref || rejectModalTx.id).slice(-6)}</span>
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Motif du rejet (notifié à l'artisan) :
            </label>
            <textarea
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-rose-600 shadow-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => onConfirmReject(rejectModalTx.id, rejectReason)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Confirmer le Rejet
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
