import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ClientView } from '../components/ClientView';
import { Navbar } from '../components/Navbar';
import { BottomNav } from '../components/BottomNav';
import { ShieldAlert, ArrowLeft, Wrench } from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';

export const ClientApp = ({ initialCategory, initialCity, initialDistrict }) => {
  const { user, setUser, setAuthModalOpen, currentRole, switchRole, logout } = useAuth();

  // Role Etanchéité Guard: If logged in as MAALEM on client.*, block access & redirect
  const isUnauthorizedRole = user && user.role?.toUpperCase() !== 'CLIENT';

  const handleQuickClientLogin = () => {
    const demoClient = {
      id: '11111111-1111-1111-1111-111111111111',
      role: 'CLIENT',
      full_name: 'Karim Particulier',
      phone: '+212600112233',
      city_zone: 'Casablanca - Maârif'
    };
    setUser(demoClient);
    switchRole('CLIENT');
    try {
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(demoClient));
    } catch (e) { }
  };

  const handleConvertCurrentToClient = () => {
    if (!user) return;
    const updated = {
      ...user,
      role: 'CLIENT'
    };
    setUser(updated);
    switchRole('CLIENT');
    try {
      sessionStorage.setItem('bricolemoi_session', JSON.stringify(updated));
    } catch (e) { }
  };

  if (isUnauthorizedRole) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-center items-center px-4 py-12 font-sans">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Accès Espace Client Particulier</h2>
            <p className="text-sm text-slate-300 mt-2">
              Votre session active (<span className="font-bold text-amber-400">{user.full_name}</span>) est actuellement enregistrée avec le rôle <span className="font-bold text-amber-400">MAALEM PRO</span>.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleQuickClientLogin}
              className="w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl px-6 py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.45)] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
            >
              ⚡ Connexion Directe Client Démo (Karim)
            </button>

            <button
              onClick={handleConvertCurrentToClient}
              className="w-full bg-slate-950/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 rounded-xl px-6 py-3 text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              🔄 Basculer ce Compte en Rôle Client ({user.full_name})
            </button>

            <button
              onClick={() => {
                logout(() => {
                  switchRole('CLIENT');
                  setAuthModalOpen(true);
                });
              }}
              className="w-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-cyan-500/20 hover:border-cyan-400 rounded-xl px-6 py-2.5 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              🔑 Se Déconnecter &amp; Nouveau Compte Client
            </button>

            <button
              onClick={() => {
                switchRole('MAALEM');
                switchSubdomainInDev('MAALEM');
              }}
              className="w-full bg-slate-900/50 text-slate-400 hover:text-white rounded-xl px-6 py-2 text-xs transition-all flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Aller à l'Espace Maalem Pro</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 100% Dedicated Client Header */}
      <Navbar appMode="CLIENT" onGoHome={() => switchSubdomainInDev('LANDING')} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        <ClientView initialCategory={initialCategory} initialCity={initialCity} initialDistrict={initialDistrict} />
      </main>

      <BottomNav activeView="CLIENT" onChangeView={(v) => switchSubdomainInDev(v)} />
    </div>
  );
};

