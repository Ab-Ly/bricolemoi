import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, Check } from '@phosphor-icons/react';

export const CustomDropdown = ({
  options = [],
  value,
  onChange,
  className = "",
  placeholder = "Sélectionner...",
  icon: TriggerIcon = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0] || {
    value: '',
    label: placeholder
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

  const IconComponent = selectedOption.icon || TriggerIcon;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between text-left shadow-xs ${
          isOpen
            ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-slate-900'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {IconComponent && (
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <IconComponent weight="duotone" className={`w-4 h-4 ${selectedOption.iconColor || 'text-blue-600'}`} />
            </div>
          )}
          <span className="text-xs font-bold text-slate-800 truncate">
            {selectedOption.label}
          </span>
        </div>

        <CaretDown 
          weight="bold" 
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-1.5 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
        />
      </button>

      {/* Options Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-56 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-1.5 shadow-xl space-y-1"
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedOption.value;
              const OptIcon = opt.icon;

              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => {
                    if (onChange) onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left flex items-center justify-between transition-all duration-150 group ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold'
                      : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {OptIcon && (
                      <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        <OptIcon weight="duotone" className={`w-3.5 h-3.5 ${opt.iconColor || 'text-blue-600'}`} />
                      </div>
                    )}
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {opt.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check weight="bold" className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
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
