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
            className="relative max-w-2xl max-h-[85vh] p-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhotoUrl(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-700 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors z-10 cursor-pointer shadow-sm"
              title="Fermer la photo"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={previewPhotoUrl}
              alt="Zoom panne"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />

            <div className="p-3 text-center">
              <span className="text-xs font-bold text-slate-600">
                🔍 Photo HD — Cliquez en dehors pour fermer
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
