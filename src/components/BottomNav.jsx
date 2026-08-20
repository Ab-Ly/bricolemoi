import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Wrench, 
  User, 
  Wallet, 
  ShieldCheck, 
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';

export const BottomNav = ({ activeView, onChangeView, onOpenRecharge }) => {
  const { currentRole, user, setAuthModalOpen, setProfileModalOpen } = useAuth();

  const handleProfileClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setProfileModalOpen(true);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return 'Compte';
    if (user.full_name) {
      const firstName = user.full_name.trim().split(' ')[0];
      return firstName.length > 8 ? `${firstName.slice(0, 7)}…` : firstName;
    }
    return 'Profil';
  };

  return (
    <nav 
      aria-label="Navigation Mobile"
      className="md:hidden fixed bottom-2.5 left-3 right-3 z-50 max-w-md mx-auto select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Glow Halo Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-amber-500/15 blur-xl -z-10 rounded-full pointer-events-none" />

      {/* Floating Island Dock */}
      <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-1.5 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.18)] flex items-center justify-between gap-1 relative">
        
        {/* ======================================================== */}
        {/* 1. LANDING VIEW NAVIGATION TABS                           */}
        {/* ======================================================== */}
        {activeView === 'LANDING' && (
          <>
            {/* Tab: Accueil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs border border-blue-100">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 mt-1 tracking-tight">Accueil</span>
              <motion.div 
                layoutId="activeBottomIndicator"
                className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5 shadow-xs shadow-blue-500"
              />
            </motion.button>

            {/* Hero Glowing Center SOS Button */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              {/* Animated Glow Aura */}
              <div className="absolute inset-0 w-12 h-12 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-md opacity-70 group-hover:opacity-100 animate-pulse transition-opacity" />
              
              {/* Center Floating Squircle */}
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-2 border-white ring-2 ring-blue-500/20 active:scale-95 transition-all">
                <Zap className="w-6 h-6 fill-white drop-shadow-sm animate-bounce" />
              </div>
              <span className="text-[10px] font-extrabold text-blue-700 mt-0.5 tracking-tight flex items-center gap-0.5">
                <span>SOS Urgence</span>
              </span>
            </motion.button>

            {/* Tab: Espace Maâlem */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-amber-50/60 transition-all"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/70 group-hover:border-amber-300 transition-all">
                  <Wrench className="w-4 h-4 text-amber-600" />
                </div>
                {/* Micro Badge Bonus */}
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-amber-500 text-white text-[8px] font-black rounded-full shadow-xs border border-white">
                  +15 DH
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-amber-800 mt-1 tracking-tight">Maâlem</span>
            </motion.button>

            {/* Tab: Compte / Profil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 group-hover:border-slate-300 transition-all relative">
                <User className="w-4 h-4" />
                {user && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white absolute -top-0.5 -right-0.5" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getUserDisplayName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 2. CLIENT VIEW NAVIGATION TABS                           */}
        {/* ======================================================== */}
        {activeView === 'CLIENT' && (
          <>
            {/* Tab: Accueil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* Hero Glowing Center SOS Button (Active) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              {/* Glowing Halo */}
              <div className="absolute inset-0 w-12 h-12 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-md opacity-80 animate-pulse" />
              
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border-2 border-white ring-2 ring-blue-500/30">
                <Zap className="w-6 h-6 fill-white drop-shadow-sm" />
              </div>
              <span className="text-[10px] font-black text-blue-700 mt-0.5 tracking-tight flex items-center gap-0.5">
                <span>SOS Dépannage</span>
              </span>
              <motion.div 
                layoutId="activeBottomIndicatorClient"
                className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5 shadow-xs shadow-blue-500"
              />
            </motion.button>

            {/* Tab: Mon Compte */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 relative">
                <User className="w-4 h-4" />
                {user && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white absolute -top-0.5 -right-0.5" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getUserDisplayName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 3. MAALEM VIEW NAVIGATION TABS                           */}
        {/* ======================================================== */}
        {activeView === 'MAALEM' && (
          <>
            {/* Tab: Accueil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* Hero Glowing Amber Center Action: Missions */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              {/* Glowing Warm Amber Aura */}
              <div className="absolute inset-0 w-12 h-12 mx-auto rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 blur-md opacity-80 animate-pulse" />
              
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-600/40 border-2 border-white ring-2 ring-amber-500/30">
                <Wrench className="w-5 h-5 drop-shadow-sm" />
              </div>
              <span className="text-[10px] font-black text-amber-800 mt-0.5 tracking-tight flex items-center gap-0.5">
                <span>Missions</span>
              </span>
              <motion.div 
                layoutId="activeBottomIndicatorMaalem"
                className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-xs shadow-amber-500"
              />
            </motion.button>

            {/* Tab: Recharge Solde */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-emerald-50/60 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <Wallet className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold text-emerald-800 mt-1 tracking-tight">Recharge</span>
            </motion.button>

            {/* Tab: Profil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 relative">
                <User className="w-4 h-4" />
                {user && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white absolute -top-0.5 -right-0.5" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getUserDisplayName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 4. ADMIN VIEW NAVIGATION TABS                            */}
        {/* ======================================================== */}
        {activeView === 'ADMIN' && (
          <>
            {/* Tab: Accueil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* Hero Glowing Purple Center Action: Admin */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('ADMIN')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              <div className="absolute inset-0 w-12 h-12 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-80 animate-pulse" />
              
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/40 border-2 border-white ring-2 ring-purple-500/30">
                <ShieldCheck className="w-5 h-5 drop-shadow-sm" />
              </div>
              <span className="text-[10px] font-black text-purple-800 mt-0.5 tracking-tight flex items-center gap-0.5">
                <span>Tour Contrôle</span>
              </span>
              <motion.div 
                layoutId="activeBottomIndicatorAdmin"
                className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5 shadow-xs shadow-purple-500"
              />
            </motion.button>

            {/* Tab: Profil Admin */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-slate-50 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 relative">
                <User className="w-4 h-4" />
                {user && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white absolute -top-0.5 -right-0.5" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getUserDisplayName()}
              </span>
            </motion.button>
          </>
        )}
      </div>
    </nav>
  );
};
