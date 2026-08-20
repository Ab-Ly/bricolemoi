import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Wrench, 
  User, 
  Wallet, 
  ShieldCheck, 
  Zap
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

  const getFirstName = () => {
    if (!user) return 'Compte';
    if (user.full_name) {
      const first = user.full_name.trim().split(' ')[0];
      return first.length > 8 ? `${first.slice(0, 7)}…` : first;
    }
    return 'Profil';
  };

  return (
    <div 
      className="md:hidden fixed bottom-2 left-0 right-0 z-50 pointer-events-none flex justify-center px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Floating Island Capsule Dock */}
      <nav 
        aria-label="Navigation Principale"
        className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl px-2 py-2 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/5 relative flex items-center justify-around select-none"
      >
        {/* Soft Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/12 via-indigo-500/12 to-amber-500/12 blur-xl -z-10 pointer-events-none" />

        {/* ======================================================== */}
        {/* 1. VUE LANDING / ACCUEIL                                 */}
        {/* ======================================================== */}
        {activeView === 'LANDING' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-2xs">
                <Home className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-extrabold text-blue-600 mt-1 tracking-tight">Accueil</span>
              <motion.div 
                layoutId="activeBottomGlowDot"
                className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5 shadow-xs shadow-blue-500"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            </motion.button>

            {/* 2. Hero Central Glowing SOS Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              {/* Outer Pulsing Aura */}
              <div className="absolute inset-0 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition-opacity -z-10" />
              
              {/* Elevated Squircle Trigger */}
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border-2 border-white ring-2 ring-blue-500/25 active:scale-95 transition-all">
                <Zap className="w-7 h-7 fill-white drop-shadow-xs animate-bounce" />
              </div>
              <span className="text-[11px] font-black text-blue-700 mt-0.5 tracking-tight flex items-center gap-1">
                <span>SOS Urgence</span>
              </span>
            </motion.button>

            {/* 3. Espace Maâlem */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 flex items-center justify-center border border-slate-200/70 hover:border-amber-200 transition-all">
                  <Wrench className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-black rounded-full shadow-xs border border-white">
                  +15 DH
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-amber-800 mt-1 tracking-tight">Maâlem</span>
            </motion.button>

            {/* 4. Compte / Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70 transition-all relative">
                <User className="w-5 h-5 stroke-[2]" />
                {user && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -top-0.5 -right-0.5 shadow-2xs" />
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getFirstName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 2. VUE CLIENT                                            */}
        {/* ======================================================== */}
        {activeView === 'CLIENT' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70">
                <Home className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Hero Central Glowing SOS Button (Actif) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              <div className="absolute inset-0 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-lg opacity-85 animate-pulse -z-10" />
              
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border-2 border-white ring-2 ring-blue-500/30">
                <Zap className="w-7 h-7 fill-white drop-shadow-xs" />
              </div>
              <span className="text-[11px] font-black text-blue-700 mt-0.5 tracking-tight">
                SOS Express
              </span>
              <motion.div 
                layoutId="activeBottomGlowDotClient"
                className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5 shadow-xs shadow-blue-500"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            </motion.button>

            {/* 3. Mon Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70 relative">
                <User className="w-5 h-5 stroke-[2]" />
                {user && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -top-0.5 -right-0.5 shadow-2xs" />
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getFirstName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 3. VUE MAALEM                                            */}
        {/* ======================================================== */}
        {activeView === 'MAALEM' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-9 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70">
                <Home className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Hero Amber Central Action: Missions */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              <div className="absolute inset-0 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 blur-lg opacity-85 animate-pulse -z-10" />
              
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-500 text-white flex items-center justify-center shadow-xl shadow-amber-600/40 border-2 border-white ring-2 ring-amber-500/30">
                <Wrench className="w-6 h-6 drop-shadow-xs" />
              </div>
              <span className="text-[11px] font-black text-amber-800 mt-0.5 tracking-tight">
                Missions
              </span>
              <motion.div 
                layoutId="activeBottomGlowDotMaalem"
                className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5 shadow-xs shadow-amber-500"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            </motion.button>

            {/* 3. Recharge */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-9 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <Wallet className="w-5 h-5 text-emerald-600 stroke-[2]" />
              </div>
              <span className="text-[11px] font-extrabold text-emerald-800 mt-1 tracking-tight">Recharge</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-9 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70 relative">
                <User className="w-5 h-5 stroke-[2]" />
                {user && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -top-0.5 -right-0.5 shadow-2xs" />
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getFirstName()}
              </span>
            </motion.button>
          </>
        )}

        {/* ======================================================== */}
        {/* 4. VUE ADMIN                                             */}
        {/* ======================================================== */}
        {activeView === 'ADMIN' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70">
                <Home className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Hero Central Purple Action */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('ADMIN')}
              className="flex-1 py-1 px-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
            >
              <div className="absolute inset-0 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-lg opacity-85 animate-pulse -z-10" />
              
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/40 border-2 border-white ring-2 ring-purple-500/30">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-black text-purple-800 mt-0.5 tracking-tight">
                Tour Contrôle
              </span>
              <motion.div 
                layoutId="activeBottomGlowDotAdmin"
                className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5 shadow-xs shadow-purple-500"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            </motion.button>

            {/* 3. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <div className="w-10 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/70 relative">
                <User className="w-5 h-5 stroke-[2]" />
                {user && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -top-0.5 -right-0.5 shadow-2xs" />
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 mt-1 tracking-tight truncate max-w-full">
                {getFirstName()}
              </span>
            </motion.button>
          </>
        )}
      </nav>
    </div>
  );
};
