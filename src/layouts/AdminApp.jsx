import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminView } from '../components/AdminView';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { Lock, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';

export const AdminApp = () => {
  const { user, currentRole, verifyAdminPIN } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPinAuthenticated, setIsPinAuthenticated] = useState(
    () => currentRole === 'ADMIN' || user?.role?.toUpperCase() === 'ADMIN'
      || sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
  );

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const success = verifyAdminPIN(pinInput);
    if (success) {
      sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
      setIsPinAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Code PIN Administrateur incorrect.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* 100% Dedicated Admin Header */}
      <Navbar appMode="ADMIN" onGoHome={() => switchSubdomainInDev('LANDING')} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        {!isPinAuthenticated ? (
          <div className="max-w-md mx-auto my-8 sm:my-12 bg-slate-900/90 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(168,85,247,0.25)] space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Lock className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-black text-white">Espace Administrateur (admin.bricolemoi.ma)</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Accès sécurisé réservé à la direction BricoleMoi. Saisissez votre code PIN administrateur.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Code PIN Securité
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Saisissez votre code PIN administrateur"
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl pl-11 pr-4 py-3 text-slate-100 font-mono tracking-widest focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-center text-lg"
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl px-6 py-3.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-purple-200" />
                <span>Déverrouiller le Dashboard Admin</span>
              </button>
            </form>
          </div>
        ) : (
          <AdminView />
        )}
      </main>

      <BottomNav activeView="ADMIN" onChangeView={(v) => switchSubdomainInDev(v)} />
    </div>
  );
};
