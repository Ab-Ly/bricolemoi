import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, Search } from 'lucide-react';

export const CountrySelectModal = ({
  isCountryOpen,
  setIsCountryOpen,
  countrySearch,
  setCountrySearch,
  filteredCountries,
  selectedCountry,
  setSelectedCountry
}) => {
  return (
    <AnimatePresence>
      {isCountryOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">Indicatif Téléphonique</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Maroc & Résidents à l'étranger (MRE)</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen(false);
                  setCountrySearch('');
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Champ de Recherche */}
            <div className="relative mb-3 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                placeholder="Rechercher pays ou indicatif (+33, +34...)"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm sm:text-xs font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                autoFocus
              />
            </div>

            {/* Liste des Pays avec Vrais Drapeaux */}
            <div className="overflow-y-auto flex-1 space-y-1.5 pr-1 modal-scroll">
              {filteredCountries.map((c) => {
                const isSelected = selectedCountry.code === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsCountryOpen(false);
                      setCountrySearch('');
                    }}
                    className={`w-full min-h-[48px] flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer touch-target-44 border ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={c.flagUrl} 
                        alt={c.name} 
                        className="w-7 h-5 object-cover rounded-xs shadow-xs shrink-0 border border-slate-200" 
                      />
                      <div className="text-left truncate">
                        <p className="text-xs font-black text-slate-900 truncate">{c.name}</p>
                        <p className="text-[10px] text-slate-500 font-arabic leading-tight">{c.nameAr}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {c.dial}
                      </span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
