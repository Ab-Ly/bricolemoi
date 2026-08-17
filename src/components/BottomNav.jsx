import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Wrench, 
  User, 
  MapPin, 
  ShieldCheck, 
  Wallet, 
  ClipboardList, 
  Zap
} from 'lucide-react';
import { Receipt } from '@phosphor-icons/react';

export const BottomNav = ({ activeView, onChangeView, onOpenRecharge }) => {
  const { currentRole, user, setAuthModalOpen, setProfileModalOpen } = useAuth();

  const handleProfileClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setProfileModalOpen(true);
    }
  };

  return (
    <nav 
      aria-label="Navigation Basse Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0F17]/95 backdrop-blur-2xl border-t border-cyan-500/25 px-2 pt-1.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_30px_rgba(0,0,0,0.85)] select-none"
    >
      <div className="max-w-md mx-auto flex items-center justify-around gap-1">
        
        {/* 1. LANDING NAVIGATION TABS */}
        {activeView === 'LANDING' && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-cyan-300 transition-all active:scale-95 cursor-pointer bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50"
            >
              <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">SOS Urgence</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-amber-300 transition-all active:scale-95 cursor-pointer bg-slate-900/60 border border-amber-500/20 hover:border-amber-400/50"
            >
              <Wrench className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Espace Maâlem</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">{user ? 'Profil' : 'Connexion'}</span>
            </motion.button>
          </>
        )}

        {/* 2. CLIENT VIEW NAVIGATION TABS */}
        {activeView === 'CLIENT' && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-200 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">SOS Dépannage</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">{user ? 'Profil' : 'Connexion'}</span>
            </motion.button>
          </>
        )}

        {/* 3. MAALEM VIEW NAVIGATION TABS */}
        {activeView === 'MAALEM' && (
          <>
            {/* 1. Accueil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-200 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            {/* 2. Missions (Active View) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-amber-300 bg-amber-950/70 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Wrench className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span className="text-[10px] mt-0.5 font-bold tracking-tight truncate max-w-full">Missions</span>
            </motion.button>

            {/* 3. Recharge Action (Modal Trigger) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Wallet className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Recharge</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Profil</span>
            </motion.button>
          </>
        )}

        {/* 4. ADMIN VIEW NAVIGATION TABS */}
        {activeView === 'ADMIN' && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className="min-h-[46px] flex-1 max-w-[110px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-200 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('ADMIN')}
              className="min-h-[46px] flex-1 max-w-[130px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-purple-300 bg-purple-950/70 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)] font-bold transition-all active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Dashboard Admin</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-purple-300 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Profil</span>
            </motion.button>
          </>
        )}
      </div>
    </nav>
  );
};
