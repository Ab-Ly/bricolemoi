import React from 'react';
import { ChevronDown } from 'lucide-react';

export const CountryCodeSelector = ({ role, selectedCountry, setIsCountryOpen }) => {
  if (role === 'MAALEM') {
    return (
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-slate-800 text-sm font-mono font-bold z-10 select-none pointer-events-none">
        <img
          src="https://flagcdn.com/w40/ma.png"
          alt="Maroc"
          className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200"
        />
        <span>+212</span>
      </div>
    );
  }

  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
      <button
        type="button"
        onClick={() => setIsCountryOpen(true)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 rounded-2xl text-slate-800 text-sm font-mono font-bold transition-all shadow-xs cursor-pointer group select-none active:scale-95"
        title="Changer de pays / indicatif téléphonique"
      >
        <img
          src={
            selectedCountry.flagUrl ||
            `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`
          }
          alt={selectedCountry.name}
          className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60"
        />
        <span>{selectedCountry.dial}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
      </button>
    </div>
  );
};
