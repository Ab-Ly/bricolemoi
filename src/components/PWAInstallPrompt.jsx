import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PWAInstallPrompt = ({ deferredPrompt, installPWA, isInstalled, onClose }) => {
  const { t } = useAuth();

  if (!deferredPrompt || isInstalled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 max-w-sm bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 p-4.5 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] text-slate-100"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Smartphone className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-sans">Installer BricoleMoi (PWA)</h4>
              <p className="text-[11px] text-slate-400">Accès rapide sur l'écran d'accueil &amp; mode d'urgence hors-ligne</p>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={installPWA}
          className="w-full mt-3.5 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>{t('pwa_install')} (Gratuit)</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
