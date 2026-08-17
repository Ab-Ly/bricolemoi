import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, KeyRound, Lock, X, Check } from 'lucide-react';

export const AdminAuthModal = () => {
  const { adminAuthModalOpen, setAdminAuthModalOpen, verifyAdminPIN } = useAuth();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = verifyAdminPIN(pin);
    if (success) {
      setPin('');
      setErrorMsg('');
    } else {
      setErrorMsg('Code PIN Administrateur incorrect. (Utilisez admin2026)');
    }
  };

  return (
    <AnimatePresence>
      {adminAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            className="w-full max-w-md bg-slate-950 border border-purple-500/40 rounded-3xl p-4 sm:p-6 max-h-modal overflow-y-auto modal-scroll shadow-[0_0_30px_rgba(168,85,247,0.3)] relative overflow-hidden"
          >
            <button
              onClick={() => setAdminAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-950/80 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Espace Administrateur Sécurisé</h3>
                <p className="text-xs text-slate-400">Authentification réservée à l'administration</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-purple-400" />
                  Saisissez le Code PIN Admin :
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Code PIN (ex: admin2026)"
                  autoFocus
                  className="w-full py-3.5 px-4 bg-slate-900 border border-purple-500/30 rounded-xl text-white text-center font-mono text-lg tracking-widest focus:border-purple-400 focus:outline-none transition-colors shadow-inner"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 font-bold bg-red-950/60 border border-red-500/30 p-2.5 rounded-xl text-center">
                  ⚠️ {errorMsg}
                </p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4 text-white" />
                <span>Déverrouiller le Dashboard Admin</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
