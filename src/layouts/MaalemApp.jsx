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

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
        <Navbar appMode="MAALEM" onGoHome={() => switchSubdomainInDev('LANDING')} />

        <main className="flex-grow max-w-md w-full mx-auto px-4 py-12 flex items-center justify-center">
          <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_35px_rgba(6,182,212,0.2)] space-y-6 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />

            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Lock className="w-8 h-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white font-sans tracking-tight">Espace Artisans Maallems</h2>
              <p className="text-xs text-slate-400 font-arabic mt-0.5">بوابة الحرفيين والمهنيين المعتمدين</p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Connectez-vous pour accéder au radar d'urgences SOS en temps réel, gérer vos crédits et intervenir chez les clients.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  switchRole('MAALEM');
                  setAuthModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl px-6 py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:shadow-[0_0_28px_rgba(6,182,212,0.65)] active:scale-95 transition-all text-sm cursor-pointer"
              >
                Se Connecter / S'inscrire comme Maalem Pro
              </button>

              <button
                type="button"
                onClick={handleQuickMaalemLogin}
                className="w-full py-2.5 px-4 bg-slate-950/80 hover:bg-slate-800/80 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl text-xs font-bold text-cyan-300 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                ⚡ Connexion Rapide Démo (Maâlem Hassan)
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Role Etanchéité Guard: If logged in as CLIENT, display quick switch & upgrade options
  if (!isMaalem) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-center items-center px-4 py-12 font-sans">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(251,191,36,0.4)]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Accès Espace Maalem Pro</h2>
            <p className="text-sm text-slate-300 mt-2">
              Votre session active (<span className="font-bold text-cyan-400">{user.full_name}</span>) est actuellement définie en mode <span className="font-bold text-emerald-400">CLIENT</span>.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleQuickMaalemLogin}
              className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl px-6 py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.45)] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
            >
              ⚡ Connexion Directe Maâlem Démo (Hassan Plombier)
            </button>

            <button
              onClick={handleUpgradeCurrentToMaalem}
              className="w-full bg-slate-950/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 rounded-xl px-6 py-3 text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
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
              className="w-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-cyan-500/20 hover:border-cyan-400 rounded-xl px-6 py-2.5 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              🔑 Se Déconnecter &amp; Nouveau Numéro Maâlem
            </button>

            <button
              onClick={() => {
                switchRole('CLIENT');
                switchSubdomainInDev('CLIENT');
              }}
              className="w-full bg-slate-900/50 text-slate-400 hover:text-white rounded-xl px-6 py-2 text-xs transition-all flex items-center justify-center gap-1.5 mt-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner à l'Espace Client</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* 100% Dedicated Maalem Header */}
      <Navbar appMode="MAALEM" onGoHome={() => switchSubdomainInDev('LANDING')} />

      {/* Main Content (Mobile-First Layout) */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] md:pb-12">
        <MaalemView />
      </main>

      <BottomNav 
        activeView="MAALEM" 
        onChangeView={(v) => switchSubdomainInDev(v)} 
        onOpenRecharge={() => window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'))}
      />
    </div>
  );
};
