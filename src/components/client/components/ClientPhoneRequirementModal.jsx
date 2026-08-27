import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Siren, ChevronRight, Zap } from 'lucide-react';
import { COUNTRY_DIAL_CODES } from '../../../constants/geo';

export const ClientPhoneRequirementModal = ({
  sosPhoneModalOpen,
  setSosPhoneModalOpen,
  handleConfirmSosPhone,
  sosCountryDropdownRef,
  sosCountry,
  setSosCountry,
  sosCountryOpen,
  setSosCountryOpen,
  sosPhoneInput,
  setSosPhoneInput,
  savingSosPhone
}) => {
  return (
    <AnimatePresence>
      {sosPhoneModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 10 }}
            className="bg-white border border-red-200 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-slate-900 space-y-4"
          >
            <button
              type="button"
              onClick={() => setSosPhoneModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer touch-target-44 active:scale-95"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 pt-1">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto shadow-xs">
                <Siren className="w-7 h-7 text-red-600 animate-bounce" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Numéro de Contact d'Urgence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                L'artisan doit pouvoir <strong>vous appeler directement</strong> avant de prendre
                la route pour intervenir chez vous.
              </p>
            </div>

            <form onSubmit={handleConfirmSosPhone} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Votre Numéro de Téléphone :
                </label>
                <div className="relative">
                  {/* Sélecteur Pays */}
                  <div
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20"
                    ref={sosCountryDropdownRef}
                  >
                    <button
                      type="button"
                      onClick={() => setSosCountryOpen(!sosCountryOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <img
                        src={
                          sosCountry.flagUrl ||
                          `https://flagcdn.com/w40/${sosCountry.code.toLowerCase()}.png`
                        }
                        alt={sosCountry.name}
                        className="w-4 h-3 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60"
                      />
                      <span>{sosCountry.dial}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500 opacity-70 rotate-90" />
                    </button>

                    {sosCountryOpen && (
                      <div className="absolute left-0 top-full mt-1.5 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 modal-scroll backdrop-blur-xl">
                        {COUNTRY_DIAL_CODES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSosCountry(c);
                              setSosCountryOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                              sosCountry.code === c.code
                                ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={c.flagUrl}
                                alt={c.name}
                                className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60"
                              />
                              <span className="truncate text-left text-xs">{c.name}</span>
                            </div>
                            <span className="font-mono text-blue-700 text-xs font-bold shrink-0">
                              {c.dial}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    required
                    placeholder={sosCountry.placeholder || '612345678'}
                    value={sosPhoneInput}
                    onChange={(e) => setSosPhoneInput(e.target.value)}
                    className="w-full pl-28 sm:pl-32 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm font-bold focus:border-blue-600 focus:bg-white focus:outline-none transition-colors shadow-xs dir-ltr tracking-wider"
                    autoFocus
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={savingSosPhone}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {savingSosPhone
                    ? 'Validation...'
                    : "Confirmer & Déclencher l'Alerte SOS ⚡"}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
