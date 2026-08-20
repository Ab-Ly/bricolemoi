import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Clock, 
  Coins, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  Car, 
  Wrench, 
  Search, 
  Filter, 
  Eye, 
  Map as MapIcon, 
  Compass, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from '../EnhancedCategoryIcon';
import { InteractiveMap } from '../InteractiveMap';

export const AdminLiveMissions = ({ interventions = [], maalems = [], onCancelIntervention }) => {
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'UNREACHABLE_REFUNDED'
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [focusedCoords, setFocusedCoords] = useState(null);

  // Statistiques de la tour de contrôle avec exclusion mutuelle stricte
  const stats = useMemo(() => {
    const total = interventions.length;
    const pending = interventions.filter((i) => i.status === 'PENDING').length;
    const completed = interventions.filter((i) => i.status === 'COMPLETED').length;
    const refunded = interventions.filter((i) => i.status === 'UNREACHABLE_REFUNDED').length;
    const inProgress = interventions.filter(
      (i) => i.status !== 'PENDING' && i.status !== 'COMPLETED' && i.status !== 'UNREACHABLE_REFUNDED'
    ).length;

    return { total, pending, inProgress, completed, refunded };
  }, [interventions]);

  // Filtrage des missions
  const filteredInterventions = useMemo(() => {
    return interventions.filter((item) => {
      const q = searchTerm.toLowerCase();
      const clientMatch = (item.client_name || '').toLowerCase().includes(q) || (item.client_phone || '').includes(q);
      const maalemMatch = (item.maalem_name || '').toLowerCase().includes(q) || (item.maalem_phone || '').includes(q);
      const districtMatch = (item.district || '').toLowerCase().includes(q) || (item.subcategory || '').toLowerCase().includes(q);
      const queryOk = !searchTerm || clientMatch || maalemMatch || districtMatch;

      const serviceOk = serviceFilter === 'ALL' || String(item.service_type || '').toUpperCase() === serviceFilter.toUpperCase();

      let statusOk = true;
      if (statusFilter === 'PENDING') statusOk = item.status === 'PENDING';
      else if (statusFilter === 'IN_PROGRESS') statusOk = item.status !== 'PENDING' && item.status !== 'COMPLETED' && item.status !== 'UNREACHABLE_REFUNDED';
      else if (statusFilter === 'COMPLETED') statusOk = item.status === 'COMPLETED';
      else if (statusFilter === 'UNREACHABLE_REFUNDED') statusOk = item.status === 'UNREACHABLE_REFUNDED';

      return queryOk && serviceOk && statusOk;
    });
  }, [interventions, searchTerm, serviceFilter, statusFilter]);

  const cleanPhone = (p) => (p || '').replace(/\D/g, '');
  return (
    <div className="space-y-6 font-sans">
      {/* 1. Baromètre & KPI Tour de Contrôle */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1 : Total */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'ALL'
              ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-slate-500">Total Flux</span>
            <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{stats.total}</p>
        </motion.button>

        {/* Card 2 : En Attente */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('PENDING')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'PENDING'
              ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-amber-800">En Attente</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-800 font-mono">{stats.pending}</p>
        </motion.button>

        {/* Card 3 : En Déplacement */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('IN_PROGRESS')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'IN_PROGRESS'
              ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-blue-700">En Déplacement</span>
            <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-700 font-mono">{stats.inProgress}</p>
        </motion.button>

        {/* Card 4 : Clôturées */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('COMPLETED')}
          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'COMPLETED'
              ? 'bg-emerald-50/80 border-emerald-400 ring-1 ring-emerald-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-emerald-800">Clôturées</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-800 font-mono">{stats.completed}</p>
        </motion.button>

        {/* Card 5 : Litiges */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setStatusFilter('UNREACHABLE_REFUNDED')}
          className={`col-span-2 sm:col-span-1 p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-xs ${
            statusFilter === 'UNREACHABLE_REFUNDED'
              ? 'bg-rose-50/80 border-rose-400 ring-1 ring-rose-400/50 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-rose-700">Litiges Résolus</span>
            <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-700 font-mono">{stats.refunded}</p>
        </motion.button>
      </div>

      {/* 2. Filtres & Carte Synoptique Toggle */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className="text-lg font-black text-slate-900">Tour de Contrôle des Urgences SOS</h3>
              <p className="text-xs text-slate-500">Visualisation et traçabilité en temps réel des flux d'interventions.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Carte */}
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                showMap
                  ? 'bg-blue-50 border border-blue-300 text-blue-700'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4 text-blue-600" />
              <span>{showMap ? 'Masquer la Carte' : 'Afficher la Carte Live'}</span>
            </button>

            {/* Barre de recherche */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher mission..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Filtre Métier */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Spécialité :</span>
          </span>
          {['ALL', 'PLUMBING', 'ELECTRICIAN', 'AUTO_MECHANIC', 'CLIMATISATION', 'SERRURERIE'].map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setServiceFilter(spec)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                serviceFilter === spec
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {spec === 'ALL' ? 'Tous Métiers' : getSpecialtyLabel(spec)}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Carte Synoptique MapLibre (Live Dispatch Map) */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-3 px-2">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 animate-spin duration-3000 text-blue-600" />
                <span>Radar Synoptique des Interventions et Artisans</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                CartoDB Clean Light • MapLibre GL
              </span>
            </div>

            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <InteractiveMap
                activeView="ALL"
                onEmergencyClick={(emg) => setSelectedMission(emg)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Grille des Fiches de Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInterventions.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm shadow-xs">
            Aucune intervention ne correspond aux filtres appliqués.
          </div>
        ) : (
          filteredInterventions.map((item) => {
            const clientPhoneClean = cleanPhone(item.client_phone);
            const maalemPhoneClean = cleanPhone(item.maalem_phone);

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 shadow-xs transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Header Carte : Métier + Statut */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${getSpecialtyMeta(item.service_type).bgClass}`}>
                      <EnhancedCategoryIcon type={item.service_type} className="w-4 h-4" />
                      <span>{getSpecialtyMeta(item.service_type).label}</span>
                    </span>

                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : item.status === 'PENDING'
                          ? 'bg-amber-50 border-amber-200 text-amber-800 animate-pulse'
                          : item.status === 'UNREACHABLE_REFUNDED'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                    }`}>
                      {item.status === 'COMPLETED'
                        ? '✅ Clôturée'
                        : item.status === 'PENDING'
                          ? '⏳ En Attente Maâlem'
                          : item.status === 'UNREACHABLE_REFUNDED'
                            ? '🛡️ Litige Résolu'
                            : '🚗 En Déplacement'}
                    </span>
                  </div>

                  {/* Description & Photo */}
                  <div className="flex gap-3 items-start">
                    {item.description_photo && (
                      <img
                        src={item.description_photo}
                        alt="Aperçu urgence"
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-black text-slate-900 truncate">
                        {item.subcategory || 'Dépannage d\'urgence express'}
                      </h4>
                      <p className="text-xs text-blue-700 font-bold flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{item.district || 'Casablanca'}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Lancé à {new Date(item.created_at || Date.now()).toLocaleTimeString('fr-FR')} • {new Date(item.created_at || Date.now()).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Fiche Contact Partagée (Client vs Maâlem) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs">
                    {/* Bloc Client */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">👤 Client</span>
                      <p className="font-bold text-slate-900 truncate">{item.client_name || 'Client BricoleMoi'}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <a href={`tel:${item.client_phone}`} className="text-[11px] font-mono text-slate-700 hover:text-blue-600 flex items-center gap-1 font-bold">
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span>{item.client_phone || 'Non renseigné'}</span>
                        </a>
                        {clientPhoneClean.length >= 9 && (
                          <a
                            href={`https://wa.me/212${clientPhoneClean.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 p-0.5"
                          >
                            <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Bloc Maâlem */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">🛠️ Maâlem Assigné</span>
                      <p className="font-bold text-slate-900 truncate">{item.maalem_name || 'En attente de prise...'}</p>
                      {item.maalem_phone ? (
                        <div className="flex items-center gap-2 pt-1">
                          <a href={`tel:${item.maalem_phone}`} className="text-[11px] font-mono text-slate-700 hover:text-emerald-700 flex items-center gap-1 font-bold">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{item.maalem_phone}</span>
                          </a>
                          {maalemPhoneClean.length >= 9 && (
                            <a
                              href={`https://wa.me/212${maalemPhoneClean.replace(/^0/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:text-emerald-800 p-0.5"
                            >
                              <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">Non débloqué</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Carte : Coût Lead & Devis */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">Prix convenu :</span>
                    <p className="font-mono font-black text-slate-900">
                      {item.final_agreed_price ? `${item.final_agreed_price} DH` : '150 - 250 DH'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bouton Annulation Admin si PENDING */}
                    {item.status === 'PENDING' && onCancelIntervention && (
                      <button
                        type="button"
                        onClick={() => onCancelIntervention(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Annuler
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedMission(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Détail Mission</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal Détail Mission */}
      <AnimatePresence>
        {selectedMission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMission(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Dossier Intervention #{String(selectedMission.id).slice(0, 8)}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedMission(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span>Statut Actuel :</span>
                  <strong className="text-blue-700 font-mono font-bold">{selectedMission.status}</strong>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-700">Client :</p>
                  <p className="text-slate-900 font-bold">{selectedMission.client_name || 'Client'}</p>
                  <p className="font-mono text-blue-700">{selectedMission.client_phone || 'N/A'}</p>
                  <p className="text-slate-500">{selectedMission.district}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-700">Maâlem Assigné :</p>
                  <p className="text-slate-900 font-bold">{selectedMission.maalem_name || 'Aucun pour le moment'}</p>
                  <p className="font-mono text-emerald-800 font-bold">{selectedMission.maalem_phone || 'N/A'}</p>
                </div>

                {selectedMission.description_photo && (
                  <div>
                    <p className="font-bold text-slate-700 mb-1">Photo jointe :</p>
                    <img
                      src={selectedMission.description_photo}
                      alt="Photo mission"
                      className="w-full h-48 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
