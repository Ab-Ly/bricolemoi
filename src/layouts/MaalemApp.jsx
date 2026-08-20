import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MaalemView } from '../components/MaalemView';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';

export const MaalemApp = () => {
  const { user, setUser, setAuthModalOpen, switchRole, logout } = useAuth();

  // Check if user is authenticated and has role MAALEM
  const isMaalem = user && user.role?.toUpperCase() === 'MAALEM';

  const handleQuickMaalemLogin = () => {
    const demoMaalem = {
      id: '22222222-2222-2222-2222-222222222222',
      role: 'MAALEM',
      full_name: 'Artisan Partenaire',
      phone: '+212661234567',
      credits: 15.00,
      city: 'Casablanca',
      district: 'Maârif',
      lat: 33.5883,
      lng: -7.6328,
      is_verified: true,
      cin_verified: true,
      maalem_details: {
        specialty: 'PLUMBING',
        rating_avg: 5.0,
        credit_balance: 15.00,
        is_verified: true,
        cin_verified: true,
        is_online: true,
        is_available: true
      }
    };
    setUser(demoMaalem);
    switchRole('MAALEM');
    try {
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(demoMaalem));
    } catch (e) { }
  };

  const handleUpgradeCurrentToMaalem = () => {
    if (!user) return;
    const updated = {
      ...user,
      role: 'MAALEM',
      is_verified: true,
      cin_verified: true,
      maalem_details: {
        specialty: 'PLUMBING',
        rating_avg: 5.0,
        credit_balance: user.credits || 15.00,
        is_verified: true,
        cin_verified: true,
        is_online: true,
        is_available: true
      }
    };
    setUser(updated);
    switchRole('MAALEM');
    try {
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(updated));
    } catch (e) { }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* 100% Dedicated Maalem Header */}
      <Navbar appMode="MAALEM" onGoHome={() => switchSubdomainInDev('LANDING')} />

      {/* Main Content (Mobile-First Layout) */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] md:pb-12 flex flex-col items-center justify-center">
        {!user ? (
          <div className="max-w-md w-full my-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 font-sans tracking-tight">Espace Artisans Maallems</h2>
              <p className="text-xs text-slate-500 font-arabic mt-0.5">بوابة الحرفيين والمهنيين المعتمدين</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Connectez-vous pour accéder au radar d'urgences SOS en temps réel, gérer vos crédits et intervenir chez les clients.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  switchRole('MAALEM');
                  setAuthModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-sm active:scale-95 transition-all text-sm cursor-pointer"
              >
                Se Connecter / S'inscrire comme Maalem Pro
              </button>

              <button
                type="button"
                onClick={handleQuickMaalemLogin}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                ⚡ Connexion Rapide Démo (Maâlem Hassan)
              </button>
            </div>
          </div>
        ) : !isMaalem ? (
          <div className="max-w-md w-full my-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Accès Espace Maalem Pro</h2>
              <p className="text-sm text-slate-600 mt-2">
                Votre session active (<span className="font-bold text-blue-600">{user.full_name}</span>) est actuellement définie en mode <span className="font-bold text-blue-600">CLIENT</span>.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleQuickMaalemLogin}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-sm active:scale-95 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                ⚡ Connexion Directe Maâlem Démo (Hassan Plombier)
              </button>

              <button
                onClick={handleUpgradeCurrentToMaalem}
                className="w-full bg-white hover:bg-slate-50 text-amber-800 border border-slate-200 rounded-xl px-6 py-3 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                🔄 Activer le Rôle Artisan sur ce Compte ({user.full_name})
              </button>

              <button
                onClick={() => {
                  logout(() => {
                    switchRole('MAALEM');
                    setAuthModalOpen(true);
                  });
                }}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-6 py-2.5 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                🔑 Se Déconnecter &amp; Nouveau Numéro Maâlem
              </button>

              <button
                onClick={() => {
                  switchRole('CLIENT');
                  switchSubdomainInDev('CLIENT');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl px-6 py-2 text-xs transition-all flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retourner à l'Espace Client</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <MaalemView />
          </div>
        )}
      </main>

      <BottomNav 
        activeView="MAALEM" 
        onChangeView={(v) => switchSubdomainInDev(v)} 
        onOpenRecharge={() => window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'))}
      />
    </div>
  );
};

export default MaalemApp;
