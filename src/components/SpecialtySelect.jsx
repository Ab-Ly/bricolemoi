import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, Check } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyMeta, SPECIALTY_CONFIG } from './EnhancedCategoryIcon';

export const SpecialtySelect = ({ 
  value = 'PLUMBING', 
  onChange, 
  className = "",
  label = "Spécialité Principale" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const currentMeta = getSpecialtyMeta(value);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const specialtiesList = Object.values(SPECIALTY_CONFIG);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between text-left shadow-sm ${
          isOpen
            ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 text-white'
            : 'bg-slate-900/90 hover:bg-slate-900 border-cyan-500/30 text-slate-100 hover:border-cyan-400/60'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-slate-950 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-inner">
            <EnhancedCategoryIcon type={value} className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-100 truncate">
            {currentMeta.label}
          </span>
        </div>

        <CaretDown 
          weight="bold" 
          className={`w-4 h-4 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-64 overflow-y-auto rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] shadow-cyan-950/30 space-y-1"
          >
            {specialtiesList.map((spec) => {
              const isSelected = spec.key === currentMeta.key;

              return (
                <button
                  key={spec.key}
                  type="button"
                  onClick={() => {
                    if (onChange) onChange(spec.key);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between transition-all duration-150 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 text-cyan-200 shadow-sm'
                      : 'hover:bg-slate-900/90 text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                      <EnhancedCategoryIcon type={spec.key} className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                      {spec.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check weight="bold" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
