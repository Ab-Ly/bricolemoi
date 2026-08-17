import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Wrench, 
  Globe, 
  Download,
  Zap,
  RefreshCw
} from 'lucide-react';
import { 
  LockKey, 
  Coins, 
  CheckCircle, 
  WarningCircle, 
  SignOut, 
  ShieldCheck as PhosphorShieldCheck, 
  User as PhosphorUser
} from '@phosphor-icons/react';

export const Navbar = ({ deferredPrompt, installPWA, isInstalled, onGoHome, appMode = 'CLIENT' }) => {
  const { 
    lang, 
    toggleLanguage, 
    t, 
    user, 
    setAuthModalOpen, 
    setProfileModalOpen, 
    logout 
  } = useAuth();
  const { refreshData, maalems, isAblyConnected, isAblyConfigured } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const currentLiveMaalem = maalems?.find((m) => m.id === user?.id) || user?.maalem_details || user;
  const liveCreditBalance = parseFloat(currentLiveMaalem?.credit_balance ?? user?.credits ?? user?.maalem_details?.credit_balance ?? 0);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 800);
  };

  const isCinVerified = Boolean(
    user?.cin_verified ||
    user?.is_verified ||
    user?.profiles?.cin_verified ||
    user?.maalem_details?.cin_verified ||
    user?.maalem_details?.is_verified
  );

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(6,182,212,0.15)] font-sans">
      {/* Top Ticker Bar */}
      <div className="bg-slate-950/90 text-slate-200 text-xs py-1.5 px-3 sm:px-4 font-medium flex justify-between items-center max-w-7xl mx-auto border-b border-cyan-500/10 gap-2">
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block shadow-[0_0_8px_rgba(34,211,238,0.9)] flex-shrink-0" />
          <span className="text-cyan-300 font-bold truncate text-[11px] sm:text-xs max-w-[180px] xs:max-w-[240px] sm:max-w-none">
            {appMode === 'MAALEM'
              ? 'Espace Maalem Pro 24h/7j - Radar d\'Urgence Maroc'
              : appMode === 'ADMIN'
              ? 'Plateforme Administration BricoleMoi - Maroc'
              : 'SOS Dépannage Express 24h/7j - Maroc'}
          </span>
          {isAblyConfigured && (
            <span className="hidden md:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <span className={`w-1.5 h-1.5 rounded-full ${isAblyConnected ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse' : 'bg-amber-400'}`} />
              {isAblyConnected ? 'Ably Live' : 'Ably Reconnexion...'}
            </span>
          )}
        </span>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href="https://wa.me/212619184098"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Support WhatsApp :</span>
            <strong className="text-cyan-400 font-mono font-bold hover:underline">+212 619 18 40 98</strong>
          </a>
          <motion.button 
            whileTap={{ scale: 0.90 }}
            onClick={toggleLanguage}
            className="bg-slate-900/90 hover:bg-slate-800 px-2.5 sm:px-3 py-1 rounded-xl text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-all text-[10px] sm:text-[11px] font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)] active:scale-90"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] flex-shrink-0" />
            <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0" 
          onClick={onGoHome}
        >
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900/90 backdrop-blur-md border ${
            appMode === 'MAALEM' ? 'border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:border-amber-400' :
            appMode === 'ADMIN' ? 'border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:border-purple-400' :
            'border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-cyan-400'
          } flex items-center justify-center font-black text-lg sm:text-xl transition-all flex-shrink-0`}>
            {appMode === 'MAALEM' ? <Wrench className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" /> : appMode === 'ADMIN' ? <PhosphorShieldCheck weight="duotone" className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" /> : <Zap className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none truncate">
                Bricole<span className={
                  appMode === 'MAALEM' ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]' :
                  appMode === 'ADMIN' ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]' :
                  'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                }>Moi</span>
              </h1>
              <span className={`text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full border shadow-sm ${
                appMode === 'MAALEM' ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' :
                appMode === 'ADMIN' ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' :
                'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
              }`}>
                {appMode === 'MAALEM' ? 'PRO' : appMode === 'ADMIN' ? 'ADMIN' : 'CLIENT'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 truncate hidden xs:block">
              {appMode === 'MAALEM' ? 'Portail Artisans & Dépannage' : appMode === 'ADMIN' ? 'Dashboard Administration' : 'Dépannage d\'Urgence Express'}
            </p>
          </div>
        </motion.div>

        {/* Dynamic Dedicated Header Actions (All with Harmonious Unified Height h-10/h-11) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* 1. CLIENT HEADER ACTIONS */}
          {appMode === 'CLIENT' && (
            <>
              {deferredPrompt && !isInstalled && (
                <motion.button
                  whileTap={{ scale: 0.90 }}
                  onClick={installPWA}
                  className="h-10 sm:h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold px-2.5 sm:px-3.5 rounded-2xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-90"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">{t('pwa_install')}</span>
                </motion.button>
              )}

              {user ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileModalOpen(true)}
                  className="h-10 sm:h-11 flex items-center gap-2 sm:gap-2.5 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 px-2.5 sm:px-3 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-[0_0_8px_rgba(34,211,238,0.8)] flex-shrink-0">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col justify-center text-left leading-none">
                    <p className="text-xs font-bold text-slate-100 leading-none">{user.full_name}</p>
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1 leading-none">Mon Compte Client</p>
                  </div>
                </motion.button>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => setAuthModalOpen(true)}
                    className="h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 rounded-2xl border border-cyan-500/30 flex items-center gap-1.5 transition-all shadow-sm active:scale-90"
                  >
                    <PhosphorUser weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    <span>Connexion</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => setAuthModalOpen(true)}
                    className="h-10 sm:h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 rounded-2xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-90"
                  >
                    <span>Inscription</span>
                  </motion.button>
                </div>
              )}
            </>
          )}

          {/* 2. MAALEM HEADER ACTIONS (Unified Height h-11 / 44px) */}
          {appMode === 'MAALEM' && (
            <>
              {user ? (
                <>
                  {/* Credit Balance Badge (Seulement si connecté) */}
                  <div className="h-11 flex items-center gap-2 bg-gradient-to-r from-slate-900/95 to-cyan-950/40 border border-cyan-500/40 px-3.5 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)] text-xs font-bold text-cyan-300">
                    <Coins weight="duotone" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] flex-shrink-0" />
                    <span className="text-[11px] text-slate-400 hidden xs:inline">Solde :</span>
                    <span className="text-white font-mono font-black">{liveCreditBalance.toFixed(2)} <span className="text-amber-400 text-[10px]">DH</span></span>
                  </div>

                  {/* User Profile & CIN Badge Card */}
                  <div className="flex items-center gap-2.5">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setProfileModalOpen(true)}
                      className="h-11 flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 px-3 rounded-2xl shadow-sm transition-all cursor-pointer"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(6,182,212,0.7)]">
                          {user.full_name?.charAt(0) || 'M'}
                        </div>
                        {/* Mobile verified indicator badge */}
                        <span className="sm:hidden absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 border border-slate-800">
                          {isCinVerified ? (
                            <CheckCircle weight="fill" className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <WarningCircle weight="fill" className="w-3 h-3 text-amber-400" />
                          )}
                        </span>
                      </div>

                      <div className="hidden sm:flex flex-col justify-center text-left leading-none">
                        <p className="text-xs font-bold text-slate-100 leading-none">{user.full_name}</p>
                        <div className="flex items-center gap-1 mt-1 leading-none">
                          {isCinVerified ? (
                            <span className="text-emerald-400 flex items-center gap-1 font-extrabold text-[10px]">
                              <CheckCircle weight="fill" className="w-3 h-3 text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
                              CIN Vérifiée
                            </span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1 font-extrabold text-[10px]">
                              <WarningCircle weight="fill" className="w-3 h-3 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
                              En attente CIN
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>

                    {/* Deconnexion Button */}
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      onClick={() => logout()}
                      className="h-11 flex items-center gap-2 bg-slate-900/90 hover:bg-red-950/80 text-slate-300 hover:text-red-300 border border-slate-700/80 hover:border-red-500/50 px-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      title="Se Déconnecter"
                    >
                      <SignOut weight="bold" className="w-4 h-4 text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.7)]" />
                      <span className="hidden sm:inline">Déconnexion</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => setAuthModalOpen(true)}
                    className="h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-4 rounded-2xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-90 cursor-pointer"
                  >
                    <PhosphorUser weight="bold" className="w-4 h-4 text-slate-950" />
                    <span>Espace Pro • Connexion</span>
                  </motion.button>
                </div>
              )}
            </>
          )}

          {/* 3. ADMIN HEADER ACTIONS (Unified Height h-11) */}
          {appMode === 'ADMIN' && (
            <div className="flex items-center gap-2">
              <span className="h-11 hidden sm:inline-flex items-center gap-1.5 px-3.5 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-sm">
                <LockKey weight="duotone" className="w-4 h-4 text-purple-400" />
                <span>Accès Protégé</span>
              </span>
              {/* Bouton Rafraîchir données Supabase */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="h-11 bg-slate-900/90 hover:bg-cyan-950/80 text-slate-300 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/50 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Rafraîchir les données depuis Supabase"
              >
                <RefreshCw className={`w-4 h-4 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? 'Chargement...' : 'Rafraîchir'}</span>
              </motion.button>
              {/* Bouton Quitter Admin */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={() => {
                  sessionStorage.removeItem('bricolemoi_admin_pin_ok');
                  logout(() => {
                    window.location.href = '/?app=landing';
                  });
                }}
                className="h-11 bg-slate-900/90 hover:bg-red-950/80 text-slate-300 hover:text-red-300 border border-purple-500/30 hover:border-red-500/40 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Quitter le Dashboard Admin"
              >
                <SignOut weight="bold" className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Quitter Admin</span>
              </motion.button>
            </div>
          )}

          {/* 4. LANDING ROOT HEADER ACTIONS (Unified Height h-11) */}
          {appMode === 'LANDING' && (
            <div className="flex items-center gap-2">
              {user ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileModalOpen(true)}
                  className="h-11 flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 px-3.5 rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-extrabold text-xs">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-100 hidden sm:inline">{user.full_name}</span>
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.90 }}
                  onClick={() => setAuthModalOpen(true)}
                  className="h-11 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center"
                >
                  Connexion / Inscription
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
