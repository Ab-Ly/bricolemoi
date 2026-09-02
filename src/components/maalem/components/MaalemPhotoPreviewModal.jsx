import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const MaalemPhotoPreviewModal = ({ previewPhotoUrl, setPreviewPhotoUrl }) => {
  return (
    <AnimatePresence>
      {previewPhotoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreviewPhotoUrl(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl max-h-[92dvh] p-2 sm:p-3 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhotoUrl(null)}
              className="absolute top-3.5 right-3.5 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors z-20 cursor-pointer touch-target-44 active:scale-95 shadow-xs"
              title="Fermer la photo"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={previewPhotoUrl}
              alt="Zoom panne"
              className="w-full h-auto max-h-[75dvh] object-contain rounded-2xl"
            />

            <div className="py-2.5 px-3 text-center">
              <span className="text-[11px] sm:text-xs font-bold text-slate-600">
                🔍 Photo HD — Touchez en dehors pour fermer
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
