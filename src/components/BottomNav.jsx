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
  Radio,
  Clock
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
      return first.length > 7 ? `${first.slice(0, 6)}…` : first;
    }
    return 'Profil';
  };

  return (
    <div 
      className="md:hidden fixed bottom-3 left-0 right-0 z-50 pointer-events-none flex justify-center px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Outer Floating Island */}
      <nav 
        aria-label="Navigation Principale"
        className="pointer-events-auto w-full max-w-[390px] bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-full px-2 py-1.5 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/5 relative flex items-center justify-between gap-1 select-none"
      >
        {/* Soft Ambient Glow underneath */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-amber-500/10 blur-xl -z-10 pointer-events-none" />

        {/* ======================================================== */}
        {/* 1. VUE LANDING / ACCUEIL                                 */}
        {/* ======================================================== */}
        {activeView === 'LANDING' && (
          <>
            {/* 1. Accueil (Actif) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="relative px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <motion.div 
                layoutId="navPillLanding"
                className="absolute inset-0 bg-slate-900 rounded-full shadow-md shadow-slate-900/20 -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              <Home className="w-4 h-4 text-white stroke-[2.2]" />
              <span className="text-[11px] font-bold text-white tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. SOS Urgence Hero Button (Pulsing Glow Center Capsule) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('CLIENT')}
              className="relative group px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer overflow-hidden transition-all"
            >
              {/* Electric Blue Radiant Glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient rounded-full shadow-md shadow-blue-500/30 -z-10" />
              
              {/* Subtle Pulsing Beacon */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>

              <Zap className="w-4 h-4 text-white fill-white drop-shadow-xs" />
              <span className="text-[11px] font-black text-white tracking-wide uppercase">SOS</span>
            </motion.button>

            {/* 3. Espace Maâlem */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="relative px-3 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              <div className="relative">
                <Wrench className="w-4 h-4 text-slate-600 group-hover:text-amber-600 stroke-[2]" />
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">Maâlem</span>
            </motion.button>

            {/* 4. Compte / Connexion */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="relative px-3 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative">
                <User className="w-4 h-4 text-slate-600 stroke-[2]" />
                {user && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">{getFirstName()}</span>
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
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-600 stroke-[2]" />
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. SOS Dépannage (Actif avec Glowing Pill) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('CLIENT')}
              className="relative px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 transition-all"
            >
              <motion.div 
                layoutId="navPillClient"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>

              <Zap className="w-4 h-4 text-white fill-white" />
              <span className="text-[11px] font-black text-white tracking-wide">SOS Express</span>
            </motion.button>

            {/* 3. Mon Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative">
                <User className="w-4 h-4 text-slate-600 stroke-[2]" />
                {user && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">{getFirstName()}</span>
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
              className="relative px-3 py-2 rounded-full flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-600 stroke-[2]" />
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Missions Radar (Actif avec Warm Glowing Pill) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('MAALEM')}
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/25 transition-all"
            >
              <motion.div 
                layoutId="navPillMaalem"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              <Wrench className="w-4 h-4 text-white stroke-[2.2]" />
              <span className="text-[11px] font-black text-white tracking-wide">Missions</span>
            </motion.button>

            {/* 3. Recharge */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="relative px-3 py-2 rounded-full flex items-center gap-1 text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-emerald-600 stroke-[2]" />
              <span className="text-[11px] font-bold tracking-tight">Recharge</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="relative px-3 py-2 rounded-full flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative">
                <User className="w-4 h-4 text-slate-600 stroke-[2]" />
                {user && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">{getFirstName()}</span>
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
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-600 stroke-[2]" />
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Tour de Contrôle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('ADMIN')}
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-500/25 transition-all"
            >
              <motion.div 
                layoutId="navPillAdmin"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              <ShieldCheck className="w-4 h-4 text-white stroke-[2.2]" />
              <span className="text-[11px] font-black text-white tracking-wide">Tour Contrôle</span>
            </motion.button>

            {/* 3. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="relative px-4 py-2 rounded-full flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-600 stroke-[2]" />
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight">{getFirstName()}</span>
            </motion.button>
          </>
        )}
      </nav>
    </div>
  );
};
