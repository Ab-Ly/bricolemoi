import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ErrorInfoBanner = ({ errorBanner, infoMsg, gpsSuccessMsg }) => {
  return (
    <>
      {errorBanner && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3.5 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center gap-2.5 shadow-xs"
        >
          <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
            <span className="text-xs">⚠️</span>
          </div>
          <span className="font-semibold text-xs leading-tight">{errorBanner}</span>
        </motion.div>
      )}

      {infoMsg && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3.5 p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-700 text-xs flex items-center gap-2 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-medium text-xs">{infoMsg}</span>
        </motion.div>
      )}

      {gpsSuccessMsg && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{gpsSuccessMsg}</span>
        </motion.div>
      )}
    </>
  );
};
