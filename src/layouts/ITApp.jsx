import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { AdminSystemHealthMatrix } from '../components/admin/AdminSystemHealthMatrix';
import { AdminRealtimeConsole } from '../components/admin/AdminRealtimeConsole';
import { 
  Server, 
  Terminal, 
  Activity, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  ArrowLeft, 
  Cpu, 
  Radio, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';

export const ITApp = () => {
  const { user, currentRole, loginAdminWithCredentials } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'MATRIX' | 'CONSOLE'

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
      setErrorMsg('Veuillez saisir votre code PIN administrateur.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await loginAdminWithCredentials('admin@bricolemoi.ma', '', pinInput);
      setIsPinAuthenticated(true);
      sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
    } catch (err) {
      setErrorMsg(err.message || 'Code PIN administrateur incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* 1. Header DevOps & IT Navigation */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-3 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xs">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-2 font-mono">
                    BRICOLEMOI • COCKPIT IT & OBSERVABILITÉ
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    DEVOPS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  VPS OVH Debian • PocketBase Core (8090) • Centrifugo v5 • Coolify Traefik
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => switchSubdomainInDev('ADMIN')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Host : 51.255.46.206</span>
            </div>

            <button
              type="button"
              onClick={() => switchSubdomainInDev('ADMIN')}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Retour Vue Métier Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-20">
        {!isPinAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white font-mono tracking-tight">Accès Ingénierie &amp; IT</h2>
              <p className="text-xs text-slate-400 mt-1">
                Espace réservé à l'infrastructure technique, à la télémétrie temps réel et aux diagnostics d'observabilité.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                  Code PIN de Sécurité Administrateur
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 font-mono text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || pinInput.length !== 4}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-black font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-600/20 active:scale-95"
              >
                {isSubmitting ? 'Authentification...' : 'Déverrouiller le Cockpit IT'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contrôle de vue dédié (Sous-onglets IT) */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    activeTab === 'ALL'
                      ? 'bg-cyan-600 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vue Complète (Matrice + Console)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('MATRIX')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    activeTab === 'MATRIX'
                      ? 'bg-cyan-600 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Matrice Santé Serveurs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('CONSOLE')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    activeTab === 'CONSOLE'
                      ? 'bg-cyan-600 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Console WebSocket Live
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>SSL Traefik Let's Encrypt Actif</span>
              </div>
            </div>

            {/* Affichage des composants isolés */}
            {(activeTab === 'ALL' || activeTab === 'MATRIX') && (
              <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                    <Server className="w-4 h-4" />
                    <span>SUPERVISION DE L'INFRASTRUCTURE (5 NŒUDS)</span>
                  </div>
                </div>
                <AdminSystemHealthMatrix />
              </div>
            )}

            {(activeTab === 'ALL' || activeTab === 'CONSOLE') && (
              <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>FLUX DE MESSAGERIE TEMPS RÉEL (CENTRIFUGO VPS STREAM)</span>
                  </div>
                </div>
                <AdminRealtimeConsole />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
