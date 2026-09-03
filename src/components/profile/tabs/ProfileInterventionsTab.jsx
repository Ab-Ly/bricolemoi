import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Star, ShieldCheck, Search, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { formatDateTime } from '../../../utils/dateUtils';

const PAGE_SIZE = 5;

export const ProfileInterventionsTab = ({
  interventions = [],
  isMaalem = false,
  clientPhoneMap = new Map()
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'RATED' | 'ACTIVE'
  const [currentPage, setCurrentPage] = useState(1);

  const completedCount = interventions.filter(i => i.status === 'COMPLETED').length;
  const activeCount = interventions.filter(i => ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status)).length;
  const ratedCount = interventions.filter(i => i.rating !== undefined && i.rating !== null).length;

  const filteredInterventions = useMemo(() => {
    return interventions.filter(item => {
      // Filtre statut
      if (filterStatus === 'COMPLETED' && item.status !== 'COMPLETED') return false;
      if (filterStatus === 'ACTIVE' && !['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(item.status)) return false;
      if (filterStatus === 'RATED' && (item.rating === undefined || item.rating === null)) return false;

      // Recherche texte
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const clientName = String(item.client_name || '').toLowerCase();
        const maalemName = String(item.maalem_name || '').toLowerCase();
        const district = String(item.district || '').toLowerCase();
        const subcategory = String(item.subcategory || item.service_type || '').toLowerCase();
        const comment = String(item.comment || '').toLowerCase();
        return clientName.includes(q) || maalemName.includes(q) || district.includes(q) || subcategory.includes(q) || comment.includes(q);
      }

      return true;
    });
  }, [interventions, filterStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredInterventions.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedInterventions = filteredInterventions.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 font-sans">
      {/* 1. Statistiques Rapides Clés */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => handleFilterChange('ALL')}
          className={`p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
            filterStatus === 'ALL'
              ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-400/20'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
          }`}
        >
          <div className="text-base sm:text-lg font-black text-blue-600 font-mono">{interventions.length}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">
            {isMaalem ? 'Chantiers' : 'SOS Totaux'}
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleFilterChange('COMPLETED')}
          className={`p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
            filterStatus === 'COMPLETED'
              ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400/20'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
          }`}
        >
          <div className="text-base sm:text-lg font-black text-emerald-600 font-mono">{completedCount}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Clôturés</div>
        </button>

        <button
          type="button"
          onClick={() => handleFilterChange('RATED')}
          className={`p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
            filterStatus === 'RATED'
              ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400/20'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
          }`}
        >
          <div className="text-base sm:text-lg font-black text-amber-600 font-mono">{ratedCount}</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Avec Avis ★</div>
        </button>
      </div>

      {/* 2. Barre de Recherche et Filtres Rapides */}
      {interventions.length > 2 && (
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher par client, quartier, service..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtres Pilules Rapides */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] font-bold scrollbar-none">
            <button
              type="button"
              onClick={() => handleFilterChange('ALL')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === 'ALL'
                  ? 'bg-slate-900 text-white font-black'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Tous ({interventions.length})
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('COMPLETED')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === 'COMPLETED'
                  ? 'bg-emerald-600 text-white font-black'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60'
              }`}
            >
              Clôturés ({completedCount})
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('RATED')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === 'RATED'
                  ? 'bg-amber-600 text-white font-black'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60'
              }`}
            >
              Avec Avis ★ ({ratedCount})
            </button>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => handleFilterChange('ACTIVE')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  filterStatus === 'ACTIVE'
                    ? 'bg-blue-600 text-white font-black'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60'
                }`}
              >
                En Cours ({activeCount})
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Liste des Chantiers Pagée */}
      <div className="space-y-2.5">
        {filteredInterventions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 space-y-1 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-700">
              {searchQuery || filterStatus !== 'ALL'
                ? 'Aucun chantier ne correspond à votre recherche.'
                : isMaalem 
                ? 'Aucun chantier débloqué pour le moment.' 
                : 'Aucune demande SOS trouvée.'}
            </p>
            <p className="text-[11px] text-slate-400">
              {searchQuery || filterStatus !== 'ALL'
                ? 'Essayez de modifier votre mot-clé ou filtre.'
                : isMaalem 
                ? 'Vos interventions acceptées apparaîtront ici avec les coordonnées clients.' 
                : 'Vos demandes de dépannage apparaîtront ici.'}
            </p>
          </div>
        ) : (
          paginatedInterventions.map((item) => {
            const counterpartPhone = isMaalem 
              ? (item.client_phone || clientPhoneMap.get(String(item.client_id || '').trim()) || '')
              : item.maalem_phone;
            const counterpartPhoneClean = (counterpartPhone || '').replace(/\D/g, '');

            return (
              <div key={item.id} className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {item.subcategory || item.service_type || 'Dépannage d\'urgence'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border shrink-0 ${
                    item.status === 'COMPLETED'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : item.status === 'CANCELLED'
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
                  }`}>
                    {item.status === 'COMPLETED' ? '✅ Clôturé' : item.status === 'CANCELLED' ? '❌ Annulé' : '🛠️ En cours'}
                  </span>
                </div>

                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 truncate min-w-0">
                    <span className="font-bold text-slate-900 truncate">
                      {isMaalem ? `👤 ${item.client_name || 'Client'}` : `🛠️ ${item.maalem_name || 'Artisan Maâlem'}`}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 truncate">📍 {item.district || 'Casablanca'}</span>
                  </div>

                  {counterpartPhone && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={`tel:${counterpartPhone}`} className="font-mono text-blue-700 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{counterpartPhone}</span>
                      </a>
                      {counterpartPhoneClean.length >= 9 && (
                        <a
                          href={`https://wa.me/212${counterpartPhoneClean.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 p-0.5"
                          title="Ouvrir WhatsApp"
                        >
                          <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>Tarif : <strong className="text-slate-900">{item.final_agreed_price ? `${item.final_agreed_price} DH` : '🤝 Accord Direct'}</strong></span>
                  <span>{formatDateTime(item.completed_at || item.updated_at || item.created_at || Date.now(), 'long')}</span>
                </div>

                {item.rating !== undefined && item.rating !== null && (
                  <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-amber-800 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{isMaalem ? 'Évaluation reçue :' : 'Votre note :'}</span>
                    </span>
                    <span className="font-mono font-black text-amber-900">{Number(item.rating).toFixed(1)} / 5 ★</span>
                  </div>
                )}

                {item.comment && (
                  <p className="text-slate-700 italic bg-slate-50 p-2 rounded-xl border border-slate-100 font-medium text-[11px]">
                    "{item.comment}"
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Pagination Condensée Anti-Débordement */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className={`py-1.5 px-3 rounded-xl font-bold flex items-center gap-1 border transition-all ${
              safePage <= 1
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <span className="text-[11px] font-bold text-slate-500 font-mono">
            Page <strong className="text-slate-900">{safePage}</strong> sur <strong>{totalPages}</strong> ({filteredInterventions.length} chantiers)
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className={`py-1.5 px-3 rounded-xl font-bold flex items-center gap-1 border transition-all ${
              safePage >= totalPages
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs active:scale-95 cursor-pointer'
            }`}
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {!isMaalem && (
        <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-2xl flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Garantie BricoleMoi</p>
            <p className="text-[11px] text-slate-600">Vos demandes et chantiers sont protégés et archivés en toute sécurité.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
