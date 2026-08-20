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
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 pt-1.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-lg select-none"
    >
      <div className="max-w-md mx-auto flex items-center justify-around gap-1">
        
        {/* 1. LANDING NAVIGATION TABS */}
        {activeView === 'LANDING' && (
          <>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-blue-700 hover:text-blue-800 transition-all active:scale-95 cursor-pointer bg-blue-50 border border-blue-200"
            >
              <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">SOS Urgence</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-amber-800 hover:text-amber-900 transition-all active:scale-95 cursor-pointer bg-amber-50 border border-amber-200"
            >
              <Wrench className="w-5 h-5 text-amber-600" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Espace Maâlem</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-600" />
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
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5 text-slate-500" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('CLIENT')}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-blue-700 bg-blue-50 border border-blue-200 font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">SOS Dépannage</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-600" />
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
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5 text-slate-500" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            {/* 2. Missions (Active View) */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('MAALEM')}
              className="min-h-[46px] flex-1 max-w-[88px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-amber-800 bg-amber-50 border border-amber-200 font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Wrench className="w-5 h-5 text-amber-600" />
              <span className="text-[10px] mt-0.5 font-bold tracking-tight truncate max-w-full">Missions</span>
            </motion.button>

            {/* 3. Recharge Action */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => {
                if (typeof onOpenRecharge === 'function') onOpenRecharge();
                else window.dispatchEvent(new CustomEvent('bricolemoi_open_recharge_modal'));
              }}
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Wallet className="w-5 h-5 text-slate-500 hover:text-blue-600 transition-colors" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-full">Recharge</span>
            </motion.button>

            {/* 4. Profil */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[80px] px-1 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-500 hover:text-blue-600 transition-colors" />
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
              className="min-h-[46px] flex-1 max-w-[110px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 border border-transparent transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Accueil</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => onChangeView('ADMIN')}
              className="min-h-[46px] flex-1 max-w-[130px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-purple-800 bg-purple-50 border border-purple-200 font-bold transition-all active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight truncate max-w-full">Dashboard Admin</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={handleProfileClick}
              className="min-h-[46px] flex-1 max-w-[110px] px-2 py-1 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-purple-800 border border-transparent transition-all active:scale-95 cursor-pointer"
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
