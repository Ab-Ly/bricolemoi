import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export const RechargeSlipModal = ({
  previewReceiptImage,
  onClose
}) => {
  if (!previewReceiptImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 1 }}
          className="relative max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-4 shadow-2xl text-slate-900 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-mono font-bold text-purple-700">Ticket de Reçu / Bordereau Encaissé</span>
            <div className="flex items-center gap-2">
              <a
                href={previewReceiptImage}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                title="Ouvrir en taille réelle"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-[70vh] flex items-center justify-center bg-slate-50">
            <img
              src={previewReceiptImage}
              alt="Preuve de virement bancaire"
              className="max-h-[65vh] w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
