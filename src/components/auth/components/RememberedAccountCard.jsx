import React from 'react';
import { motion } from 'framer-motion';
import { Password } from '@phosphor-icons/react';

export const RememberedAccountCard = ({ rememberedUser, handleQuickLoginWithRemembered, loading }) => {
  if (!rememberedUser || !rememberedUser.phone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 border border-blue-200/80 rounded-2xl flex items-center justify-between shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
          {rememberedUser.fullName?.charAt(0)?.toUpperCase() || '👤'}
        </div>
        <div>
          <p className="text-xs font-black text-slate-900 leading-tight">
            {rememberedUser.fullName || 'Ravi de vous revoir !'}
          </p>
          <p className="text-[11px] font-mono text-slate-600 font-bold mt-0.5">
            {rememberedUser.phone}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleQuickLoginWithRemembered(rememberedUser)}
        disabled={loading}
        className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
      >
        <Password className="w-4 h-4" />
        <span>Code PIN 🔒</span>
      </button>
    </motion.div>
  );
};
