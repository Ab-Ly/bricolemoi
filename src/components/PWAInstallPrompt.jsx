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
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-40 max-w-sm bg-white/95 backdrop-blur-xl border border-slate-200 p-4 sm:p-5 rounded-3xl shadow-xl text-slate-900 font-sans"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-sans">Installer BricoleMoi (PWA)</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">Accès rapide sur l'écran d'accueil &amp; mode d'urgence hors-ligne</p>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={installPWA}
          className="w-full mt-3.5 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t('pwa_install')} (Gratuit)</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
