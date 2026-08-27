import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Wrench as PhosphorWrench } from '@phosphor-icons/react';

export const RoleSwitcher = ({ role, setRole, isClient, setErrorBanner }) => {
  return (
    <div className="relative p-1 bg-slate-100 rounded-2xl border border-slate-200 grid grid-cols-2 gap-1 mb-4">
      <button
        type="button"
        onClick={() => {
          setRole('CLIENT');
          setErrorBanner('');
        }}
        className={`relative z-10 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
          isClient ? 'text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <UserCircle
          weight="duotone"
          className={`w-4 h-4 transition-colors ${isClient ? 'text-white' : 'text-slate-500'}`}
        />
        <span>Particulier</span>
        {isClient && (
          <motion.div
            layoutId="roleActivePill"
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            className="absolute inset-0 bg-blue-600 rounded-xl shadow-sm -z-10"
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => {
          setRole('MAALEM');
          setErrorBanner('');
        }}
        className={`relative z-10 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
          !isClient ? 'text-white font-black' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <PhosphorWrench
          weight="duotone"
          className={`w-4 h-4 transition-colors ${!isClient ? 'text-white' : 'text-slate-500'}`}
        />
        <span>Artisan Maâlem</span>
        <span
          className={`px-1.5 py-0.5 rounded-full text-[9px] font-black tracking-wider transition-colors ${
            !isClient ? 'bg-amber-700 text-white shadow-xs' : 'bg-amber-100 text-amber-800'
          }`}
        >
          +15 DH
        </span>
        {!isClient && (
          <motion.div
            layoutId="roleActivePill"
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            className="absolute inset-0 bg-amber-500 rounded-xl shadow-sm -z-10"
          />
        )}
      </button>
    </div>
  );
};
