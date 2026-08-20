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
        className={`w-full px-3.5 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between text-left shadow-xs ${
          isOpen
            ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 text-slate-900'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <EnhancedCategoryIcon type={value} className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-xs font-bold text-slate-800 truncate">
            {currentMeta.label}
          </span>
        </div>

        <CaretDown 
          weight="bold" 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-amber-600' : ''}`} 
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
            className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-64 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-1.5 shadow-xl space-y-1"
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
                      ? 'bg-amber-50 border border-amber-200 text-amber-800 font-bold'
                      : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                      <EnhancedCategoryIcon type={spec.key} className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-amber-800' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {spec.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check weight="bold" className="w-4 h-4 text-amber-600 flex-shrink-0" />
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
