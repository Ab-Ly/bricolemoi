import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, Check, User, MagnifyingGlass } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyLabel } from './EnhancedCategoryIcon';

export const MaalemSelect = ({ 
  maalems = [], 
  value, 
  onChange, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  const selectedMaalem = maalems.find((m) => m.id === value) || maalems[0] || {
    id: 'none',
    full_name: 'Sélectionner un Maâlem',
    credit_balance: 0,
    specialty: 'PLUMBING'
  };

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

  const filteredMaalems = maalems.filter((m) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.full_name?.toLowerCase().includes(q) ||
      m.specialty?.toLowerCase().includes(q) ||
      m.phone?.includes(q)
    );
  });

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between text-left shadow-sm ${
          isOpen
            ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 text-white'
            : 'bg-slate-900/90 hover:bg-slate-900 border-cyan-500/30 text-slate-100 hover:border-cyan-400/60'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-slate-950 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-inner">
            <EnhancedCategoryIcon type={selectedMaalem.specialty} className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-slate-100">
              {selectedMaalem.full_name}
            </span>
            <span className="ml-2 text-[11px] font-mono font-black text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
              {selectedMaalem.credit_balance || 0} DH
            </span>
          </div>
        </div>

        <CaretDown 
          weight="bold" 
          className={`w-4 h-4 text-cyan-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 p-2 shadow-[0_12px_35px_rgba(0,0,0,0.85)] shadow-cyan-950/40 space-y-1.5"
          >
            {/* Quick Search */}
            {maalems.length > 5 && (
              <div className="relative mb-2">
                <MagnifyingGlass className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Chercher artisan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  autoFocus
                />
              </div>
            )}

            <div className="max-h-56 overflow-y-auto space-y-1 pr-0.5">
              {filteredMaalems.map((m) => {
                const isSelected = m.id === selectedMaalem.id;

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      if (onChange) onChange(m.id);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all duration-150 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border border-cyan-500/40 text-cyan-200 shadow-sm'
                        : 'hover:bg-slate-900/90 text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <EnhancedCategoryIcon type={m.specialty} className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                          {m.full_name}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span>{getSpecialtyLabel(m.specialty)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="font-mono text-xs font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                        {m.credit_balance || 0} DH
                      </span>
                      {isSelected && (
                        <Check weight="bold" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
