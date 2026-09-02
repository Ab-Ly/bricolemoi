import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogoutWarningModal = ({ show, isMaalem, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 rounded-3xl p-5 flex items-center justify-center font-sans"
      >
        <motion.div
          initial={{ scale: 0.9, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 10 }}
          className="bg-white border border-amber-200 rounded-2xl p-5 shadow-2xl max-w-sm text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold shadow-inner">
            ⚠️
          </div>
          <h4 className="text-sm font-black text-slate-900 mb-1">
            Intervention en cours détectée !
          </h4>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            {isMaalem 
              ? 'Vous avez une mission active en cours. Si vous vous déconnectez, le client ne pourra plus voir votre statut d\'arrivée sur la carte.'
              : 'Un Maâlem est actuellement en mission ou en route vers votre adresse. Si vous vous déconnectez, vous ne recevrez plus le suivi en direct.'}
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all"
            >
              🛡️ Rester Connecté (Recommandé)
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full py-2 bg-slate-100 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all"
            >
              Forcer la Déconnexion
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
