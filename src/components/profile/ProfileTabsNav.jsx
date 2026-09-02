import React from 'react';
import { Wrench, Star, Receipt, History as HistoryIcon, Edit3, Lock } from 'lucide-react';

export const ProfileTabsNav = ({
  activeTab,
  setActiveTab,
  isMaalem,
  isMissingPhone,
  maalemMissionsCount = 0,
  reviewsCount = 0,
  transactionsCount = 0,
  clientRequestsCount = 0
}) => {
  return (
    <div className="flex bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 gap-1.5 overflow-x-auto modal-scroll scrollbar-thin">
      <button
        type="button"
        onClick={() => setActiveTab('info')}
        className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center whitespace-nowrap active:scale-95 ${
          activeTab === 'info'
            ? isMaalem ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-black'
            : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
        }`}
      >
        Coordonnées
      </button>

      {isMaalem && (
        <>
          <button
            type="button"
            onClick={() => setActiveTab('missions')}
            className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'missions'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Chantiers ({maalemMissionsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Avis ({reviewsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transactions')}
            className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'transactions'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Portefeuille ({transactionsCount})</span>
          </button>
        </>
      )}

      {!isMaalem && (
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
            activeTab === 'requests'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-black'
              : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
          }`}
        >
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Mes Demandes ({clientRequestsCount})</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => setActiveTab('edit')}
        className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
          activeTab === 'edit'
            ? 'bg-slate-900 text-white shadow-xs font-black'
            : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
        }`}
      >
        <Edit3 className="w-3 h-3" />
        <span>{isMissingPhone ? 'Compléter' : 'Modifier'}</span>
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('pin')}
        className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
          activeTab === 'pin'
            ? 'bg-slate-900 text-white shadow-xs font-black'
            : 'bg-white/60 hover:bg-white text-slate-700 hover:text-slate-900'
        }`}
      >
        <Lock className="w-3 h-3 text-amber-500" />
        <span>PIN</span>
      </button>
    </div>
  );
};
