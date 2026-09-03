import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { Lock, KeyRound, AlertCircle, ShieldCheck, Mail, Eye, EyeOff, Sparkles } from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';
import { lazyWithRetry } from '../utils/lazyWithRetry';

const AdminView = lazyWithRetry(() =>
  import('../components/AdminView').then((m) => ({ default: m.AdminView }))
);

export const AdminApp = () => {
  const { user, currentRole, loginAdminWithCredentials } = useAuth();
  const [emailInput, setEmailInput] = useState('admin@bricolemoi.ma');
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPinAuthenticated, setIsPinAuthenticated] = useState(
    () => currentRole === 'ADMIN' || user?.role?.toUpperCase() === 'ADMIN'
      || sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
  );

  useEffect(() => {
    if (
      currentRole === 'ADMIN' ||
      user?.role?.toUpperCase() === 'ADMIN' ||
      sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
    ) {
      setIsPinAuthenticated(true);
    }
  }, [currentRole, user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setErrorMsg('Veuillez saisir votre code PIN de sécurité.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await loginAdminWithCredentials(emailInput, passwordInput, pinInput);
      setIsPinAuthenticated(true);
    } catch (err) {
      setErrorMsg(err.message || 'Identifiants administrateur ou code PIN incorrects.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* Header affiché avant authentification (évite le double header en session active) */}
      {!isPinAuthenticated && <Navbar appMode="ADMIN" onGoHome={() => switchSubdomainInDev('LANDING')} />}

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        {!isPinAuthenticated ? (
          <div className="max-w-md mx-auto my-6 sm:my-10 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
              <Lock className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                Accès Protégé • Double Facteur 2FA
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
                Tour de Contrôle Administrateur
              </h2>
              <p className="text-xs text-slate-500">
                Portail officiel réservé à la direction et aux superviseurs BricoleMoi.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              {/* 1. Email Administrateur */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Identifiant / Email Admin
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@bricolemoi.ma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-xs font-medium focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* 2. Mot de Passe Administrateur */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mot de Passe Supabase
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
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

              {/* 3. Code PIN de Sécurité (2FA) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Code PIN Session 2FA
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="PIN Administrateur"
                    className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 font-mono tracking-widest focus:outline-none focus:border-purple-600 focus:bg-white text-center text-sm font-bold"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-md shadow-purple-500/20 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4 text-purple-100" />
                <span>{isSubmitting ? 'Authentification Sécurisée...' : 'Déverrouiller le Dashboard Admin'}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                Sécurité renforcée • Session chiffrée par jeton JWT Supabase
              </p>
            </div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto animate-pulse">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-800">Chargement de la console d'administration...</p>
              </div>
            }
          >
            <AdminView />
          </Suspense>
        )}
      </main>

      <BottomNav activeView="ADMIN" onChangeView={(v) => switchSubdomainInDev(v)} />
    </div>
  );
};

export default AdminApp;
