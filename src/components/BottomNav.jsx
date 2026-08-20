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
    <nav 
      aria-label="Navigation Principale"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] select-none"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      <div className="max-w-lg mx-auto px-4 pt-1.5 flex items-center justify-around">
        
        {/* ======================================================== */}
        {/* 1. VUE LANDING / ACCUEIL                                 */}
        {/* ======================================================== */}
        {activeView === 'LANDING' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1 flex flex-col items-center justify-center text-blue-600 cursor-pointer group"
            >
              <div className="relative">
                <Home className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Hero Center SOS Button */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 flex flex-col items-center justify-center cursor-pointer group relative -top-3.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-white active:scale-95 transition-all">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <span className="text-[10px] font-black text-blue-600 mt-1 tracking-tight">SOS Urgence</span>
            </motion.button>

            {/* 3. Espace Maâlem */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-amber-600 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <Wrench className="w-5 h-5 stroke-[1.8] group-hover:stroke-[2.2]" />
                <span className="absolute -top-1.5 -right-3 px-1 py-0.2 bg-amber-500 text-white text-[8px] font-black rounded-full shadow-2xs">
                  +15DH
                </span>
              </div>
              <span className="text-[10px] font-medium group-hover:font-bold mt-1 tracking-tight">Maâlem</span>
            </motion.button>

            {/* 4. Compte / Connexion */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <User className="w-5 h-5 stroke-[1.8] group-hover:stroke-[2.2]" />
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] font-medium group-hover:font-bold mt-1 tracking-tight truncate max-w-[64px]">
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
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] font-medium mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. SOS Dépannage (Actif) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="flex-1 py-1 flex flex-col items-center justify-center cursor-pointer relative -top-3.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-white active:scale-95 transition-all">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <span className="text-[10px] font-black text-blue-600 mt-1 tracking-tight">SOS Express</span>
            </motion.button>

            {/* 3. Mon Profil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative">
                <User className="w-5 h-5 stroke-[1.8]" />
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] font-medium mt-1 tracking-tight truncate max-w-[64px]">
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
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] font-medium mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Missions (Hero Action) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="flex-1 py-1 flex flex-col items-center justify-center cursor-pointer relative -top-3.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-white active:scale-95 transition-all">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-amber-600 mt-1 tracking-tight">Missions</span>
            </motion.button>

            {/* 3. Recharge */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="flex-1 py-1 flex flex-col items-center justify-center text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <Wallet className="w-5 h-5 stroke-[2]" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Recharge</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative">
                <User className="w-5 h-5 stroke-[1.8]" />
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] font-medium mt-1 tracking-tight truncate max-w-[64px]">
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
              whileTap={{ scale: 0.92 }}
              onClick={() => onChangeView('LANDING')}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] font-medium mt-1 tracking-tight">Accueil</span>
            </motion.button>

            {/* 2. Hero Center Action */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('ADMIN')}
              className="flex-1 py-1 flex flex-col items-center justify-center cursor-pointer relative -top-3.5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 ring-4 ring-white active:scale-95 transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-purple-600 mt-1 tracking-tight">Tour Contrôle</span>
            </motion.button>

            {/* 3. Profil */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleProfileClick}
              className="flex-1 py-1 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10px] font-medium mt-1 tracking-tight truncate max-w-[64px]">
                {getFirstName()}
              </span>
            </motion.button>
          </>
        )}
      </div>
    </nav>
  );
};
