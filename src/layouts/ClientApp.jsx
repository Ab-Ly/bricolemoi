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
    let dynamicZone = 'Casablanca - Centre-Ville';
    try {
      const gps = JSON.parse(localStorage.getItem('bricolemoi_client_gps') || '{}');
      if (gps.city) dynamicZone = gps.district ? `${gps.city} - ${gps.district}` : gps.city;
    } catch (e) {}

    const demoClient = {
      id: '11111111-1111-1111-1111-111111111111',
      role: 'CLIENT',
      full_name: 'Karim Particulier',
      phone: '+212600112233',
      city_zone: dynamicZone
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 100% Dedicated Client Header */}
      <Navbar appMode="CLIENT" onGoHome={() => switchSubdomainInDev('LANDING')} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8 flex flex-col items-center justify-center">
        {isUnauthorizedRole ? (
          <div className="max-w-md w-full my-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Accès Espace Client Particulier</h2>
              <p className="text-sm text-slate-600 mt-2">
                Votre session active (<span className="font-bold text-amber-600">{user.full_name}</span>) est actuellement enregistrée avec le rôle <span className="font-bold text-amber-600">MAALEM PRO</span>.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleQuickClientLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-sm active:scale-95 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                ⚡ Connexion Directe Client Démo (Karim)
              </button>

              <button
                onClick={handleConvertCurrentToClient}
                className="w-full bg-white hover:bg-slate-50 text-blue-700 border border-slate-200 rounded-xl px-6 py-3 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
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
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-6 py-2.5 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                🔑 Se Déconnecter &amp; Nouveau Compte Client
              </button>

              <button
                onClick={() => {
                  switchRole('MAALEM');
                  switchSubdomainInDev('MAALEM');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl px-6 py-2 text-xs transition-all flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Aller à l'Espace Maalem Pro</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <ClientView initialCategory={initialCategory} initialCity={initialCity} initialDistrict={initialDistrict} />
          </div>
        )}
      </main>

      <BottomNav activeView="CLIENT" onChangeView={(v) => switchSubdomainInDev(v)} />
    </div>
  );
};

export default ClientApp;

