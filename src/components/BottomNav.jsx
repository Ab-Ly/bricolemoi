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
        
        {/* ROLE CLIENT / LANDING NAVIGATION TABS */}
        {(currentRole === 'CLIENT' || activeView === 'LANDING') && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('LANDING')}
              className={`min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
                activeView === 'LANDING'
                  ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Zap className={`w-5 h-5 ${activeView === 'LANDING' ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]' : 'text-slate-400'}`} />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">SOS Urgence</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className={`min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
                activeView === 'CLIENT'
                  ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <ClipboardList className={`w-5 h-5 ${activeView === 'CLIENT' ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]' : 'text-slate-400'}`} />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Mes Demandes</span>
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

        {/* ROLE MAALEM NAVIGATION TABS */}
        {currentRole === 'MAALEM' && activeView !== 'LANDING' && (
          <>
            {/* 1. Missions (Active View) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className={`min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
                activeView === 'MAALEM'
                  ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Wrench className={`w-5 h-5 ${activeView === 'MAALEM' ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 font-bold tracking-tight truncate max-w-full">Missions</span>
            </motion.button>

            {/* 2. Recharge Action (Modal Trigger) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Wallet className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Recharge</span>
            </motion.button>

            {/* 3. Portefeuille & Historique (Modal Trigger) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => window.dispatchEvent(new CustomEvent('bricolemoi_open_history_modal'))}
              className="min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Receipt weight="duotone" className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Portefeuille</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Profil</span>
            </motion.button>
          </>
        )}

        {/* ROLE ADMIN NAVIGATION TABS */}
        {currentRole === 'ADMIN' && activeView !== 'LANDING' && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('ADMIN')}
              className={`min-h-[46px] flex-1 max-w-[140px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${
                activeView === 'ADMIN'
                  ? 'text-purple-300 bg-purple-950/70 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)] font-bold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Dashboard Admin</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[140px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-purple-300 border border-transparent transition-all active:scale-95 cursor-pointer"
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
