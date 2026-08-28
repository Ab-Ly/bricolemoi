import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, KeyRound, Lock, X, Mail, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

export const AdminAuthModal = () => {
  const { adminAuthModalOpen, setAdminAuthModalOpen, loginAdminWithCredentials } = useAuth();
  const [email, setEmail] = useState('admin@bricolemoi.ma');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg('Veuillez saisir votre code PIN de sécurité.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await loginAdminWithCredentials(email, password, pin);
      setPin('');
      setPassword('');
      setErrorMsg('');
      setAdminAuthModalOpen(false);
    } catch (err) {
      setErrorMsg(err.message || 'Identifiants ou code PIN incorrects.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {adminAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 max-h-modal overflow-y-auto modal-scroll shadow-2xl relative overflow-hidden"
          >
            <button
              onClick={() => setAdminAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 shadow-xs flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight truncate">
                    Espace Administrateur
                  </h3>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    2FA PROTÉGÉ
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Authentification réservée à la direction</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              {/* 1. Email Admin */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Identifiant / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bricolemoi.ma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-medium focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* 2. Mot de Passe Admin */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mot de Passe Supabase
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 3. Code PIN 2FA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Code PIN de Sécurité (2FA)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Code PIN de session"
                    autoFocus
                    className="w-full py-2.5 px-4 bg-purple-50/40 border border-purple-200 rounded-xl text-slate-900 text-center font-mono text-base tracking-widest focus:border-purple-600 focus:bg-white focus:outline-none transition-all shadow-xs font-bold pl-10"
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 mt-1"
              >
                <Lock className="w-4 h-4 text-white" />
                <span>{isSubmitting ? 'Authentification Sécurisée...' : 'Déverrouiller le Dashboard Admin'}</span>
              </motion.button>
            </form>

            <div className="pt-3 mt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                Session chiffrée &amp; vérifiée côté serveur PostgreSQL
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
