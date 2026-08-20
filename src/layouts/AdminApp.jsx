import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (
      currentRole === 'ADMIN' ||
      user?.role?.toUpperCase() === 'ADMIN' ||
      sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
    ) {
      setIsPinAuthenticated(true);
    }
  }, [currentRole, user]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const success = verifyAdminPIN(pinInput);
    if (success) {
      sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
      setIsPinAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Code PIN Administrateur incorrect. (Utilisez admin2026)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* 100% Dedicated Admin Header */}
      <Navbar appMode="ADMIN" onGoHome={() => switchSubdomainInDev('LANDING')} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        {!isPinAuthenticated ? (
          <div className="max-w-md mx-auto my-8 sm:my-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Espace Administrateur (admin.bricolemoi.ma)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Accès sécurisé réservé à la direction BricoleMoi. Saisissez votre code PIN administrateur.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Code PIN Securité
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Saisissez votre code PIN administrateur"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 font-mono tracking-widest focus:outline-none focus:border-purple-600 focus:bg-white text-center text-lg"
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-sm active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-purple-100" />
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

export default AdminApp;
