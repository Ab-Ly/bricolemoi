import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  Ban, 
  UserCheck, 
  MessageSquare, 
  Star, 
  Wrench, 
  Clock, 
  Coins, 
  ExternalLink,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from '../EnhancedCategoryIcon';

export const AdminClientsView = ({ clients = [], interventions = [], reviews = [], onToggleSuspension }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'SUSPENDED'
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calcul des statistiques par client (Demandes SOS lancées, terminées, note moyenne attribuée)
  const clientStatsMap = useMemo(() => {
    const map = new Map();

    // Analyse des interventions
    interventions.forEach((intv) => {
      const clientId = String(intv.client_id || '').trim();
      const clientPhone = String(intv.client_phone || '').replace(/\D/g, '');
      const clientName = intv.client_name;

      const keys = [clientId, clientPhone].filter(Boolean);
      keys.forEach((k) => {
        if (!map.has(k)) {
          map.set(k, { totalSOS: 0, completedSOS: 0, lastActivity: null, interventions: [] });
        }
        const data = map.get(k);
        data.totalSOS += 1;
        if (intv.status === 'COMPLETED') {
          data.completedSOS += 1;
        }
        data.interventions.push(intv);
      });
    });

    return map;
  }, [interventions]);

  // Filtrage et Recherche multi-critères
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const nameMatch = (client.full_name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const phoneMatch = (client.phone || '').replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''));
      const districtMatch = (client.city_zone || client.district || '').toLowerCase().includes(searchTerm.toLowerCase());
      const queryMatch = !searchTerm || nameMatch || phoneMatch || districtMatch;

      const cityMatch = cityFilter === 'ALL' || (client.city_zone || client.district || '').toLowerCase().includes(cityFilter.toLowerCase());
      
      const isSuspended = Boolean(client.is_suspended);
      const statusMatch = 
        statusFilter === 'ALL' ||
        (statusFilter === 'SUSPENDED' && isSuspended) ||
        (statusFilter === 'ACTIVE' && !isSuspended);

      return queryMatch && cityMatch && statusMatch;
    });
  }, [clients, searchTerm, cityFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage]);

  // Récupération de l'historique et des avis pour le client sélectionné dans le Slide-Over Drawer
  const clientDrawerData = useMemo(() => {
    if (!selectedClient) return { missions: [], clientReviews: [], stats: { total: 0, completed: 0 } };

    const cId = String(selectedClient.id || '').trim();
    const cPhone = String(selectedClient.phone || '').replace(/\D/g, '');

    const missions = interventions.filter((intv) => {
      const matchId = cId && String(intv.client_id || '').trim() === cId;
      const matchPhone = cPhone && cPhone.length > 7 && String(intv.client_phone || '').replace(/\D/g, '') === cPhone;
      return matchId || matchPhone;
    });

    const clientReviews = reviews.filter((r) => {
      return missions.some((m) => String(m.id).trim() === String(r.intervention_id).trim());
    });

    return {
      missions,
      clientReviews,
      stats: {
        total: missions.length,
        completed: missions.filter((m) => m.status === 'COMPLETED').length
      }
    };
  }, [selectedClient, interventions, reviews]);

  const cleanPhone = (phone) => (phone || '').replace(/\D/g, '');

  return (
    <div className="space-y-6">
      {/* Header & Filtres Rapides */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2.5 font-sans">
              <Users className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span>Répertoire &amp; Données Clients</span>
              <span className="text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                {filteredClients.length} clients
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supervision de l'activité, historique des dépannages demandés et gestion du statut des comptes.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher par nom, tél ou quartier..."
              className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Barre de Filtres de Ville & Statut */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ville :</span>
          </div>

          {['ALL', 'Casablanca', 'Fès', 'Rabat', 'Marrakech', 'Tanger', 'Agadir'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setCityFilter(city);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                cityFilter === city
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {city === 'ALL' ? 'Toutes' : city}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-slate-800 mx-2 hidden sm:block" />

          {/* Statut Compte */}
          <div className="flex items-center gap-1.5 ml-auto">
            {['ALL', 'ACTIVE', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? st === 'SUSPENDED' 
                      ? 'bg-rose-950 border border-rose-500 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {st === 'ALL' ? 'Tous Statuts' : st === 'ACTIVE' ? '🟢 Actifs' : '🔴 Suspendus'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Interactive des Clients */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Contact &amp; WhatsApp</th>
                <th className="py-3.5 px-4">Ville / Quartier</th>
                <th className="py-3.5 px-4 text-center">SOS Lancés</th>
                <th className="py-3.5 px-4 text-center">Complétés</th>
                <th className="py-3.5 px-4 text-center">Statut Compte</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {paginatedClients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-500">
                    <Users className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
                    <p className="text-sm font-bold text-slate-400">Aucun client correspondant aux critères.</p>
                    <p className="text-xs text-slate-600 mt-1">Modifiez vos filtres ou effectuez une autre recherche.</p>
                  </td>
                </tr>
              ) : (
                paginatedClients.map((client) => {
                  const stats = clientStatsMap.get(String(client.id)) || 
                               clientStatsMap.get(cleanPhone(client.phone)) || 
                               { totalSOS: 0, completedSOS: 0 };
                  const isSuspended = Boolean(client.is_suspended);
                  const pClean = cleanPhone(client.phone);

                  return (
                    <motion.tr
                      key={client.id || client.phone}
                      whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}
                      onClick={() => setSelectedClient(client)}
                      className="cursor-pointer transition-colors group"
                    >
                      {/* Nom & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-950 to-slate-900 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center text-xs shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                            {client.full_name ? client.full_name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-white text-xs sm:text-sm truncate group-hover:text-cyan-300 transition-colors">
                              {client.full_name || 'Client BricoleMoi'}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              Inscrit le {new Date(client.created_at || Date.now()).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Téléphone & WhatsApp */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${client.phone}`}
                            className="font-mono text-xs text-slate-200 hover:text-cyan-300 flex items-center gap-1 font-bold"
                          >
                            <Phone className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{client.phone || 'Non renseigné'}</span>
                          </a>

                          {pClean.length >= 9 && (
                            <a
                              href={`https://wa.me/212${pClean.replace(/^0/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-800 transition-colors"
                              title="Discuter sur WhatsApp"
                            >
                              <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Ville & Quartier */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-slate-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{client.city_zone || client.district || 'Casablanca'}</span>
                        </div>
                      </td>

                      {/* Total SOS lancés */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs shadow-inner">
                          {stats.totalSOS}
                        </span>
                      </td>

                      {/* Total complétés */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs shadow-inner">
                          {stats.completedSOS}
                        </span>
                      </td>

                      {/* Statut Compte */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 border ${
                          isSuspended
                            ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                            : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        }`}>
                          {isSuspended ? '🔴 Suspendu' : '🟢 Actif'}
                        </span>
                      </td>

                      {/* Bouton Voir Détail */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="px-3 py-1.5 bg-slate-950/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-xs font-bold inline-flex items-center gap-1 shadow-sm transition-all active:scale-95"
                        >
                          <span>Fiche</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Page <strong className="text-white">{currentPage}</strong> sur <strong className="text-white">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Précédent
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* Slide-over Drawer : Détail Client & Audit d'Activité                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-slate-950/95 border-l border-cyan-500/30 text-slate-100 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Header Drawer */}
                <div className="p-6 border-b border-slate-800/80 bg-slate-900/60 sticky top-0 z-10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-900 to-slate-900 border border-cyan-500/50 text-cyan-300 font-black text-lg flex items-center justify-center shadow-lg">
                        {selectedClient.full_name ? selectedClient.full_name.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white leading-tight">
                          {selectedClient.full_name || 'Client BricoleMoi'}
                        </h3>
                        <p className="text-xs text-cyan-300 font-mono mt-0.5">
                          ID: {String(selectedClient.id).slice(0, 12)}...
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedClient(null)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Coordonnées & Statut Card */}
                  <div className="grid grid-cols-2 gap-2.5 mt-5">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Téléphone</span>
                      <p className="text-xs font-bold text-white mt-0.5 flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        {selectedClient.phone || 'Non renseigné'}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Ville / Secteur</span>
                      <p className="text-xs font-bold text-white mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {selectedClient.city_zone || selectedClient.district || 'Casablanca'}
                      </p>
                    </div>
                  </div>

                  {/* Stats Badges */}
                  <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800/60">
                    <div className="text-center flex-1 bg-cyan-950/40 border border-cyan-500/20 rounded-xl py-2">
                      <span className="text-[10px] text-cyan-300 font-mono">Total Demandes</span>
                      <p className="text-base font-black text-white">{clientDrawerData.stats.total}</p>
                    </div>
                    <div className="text-center flex-1 bg-emerald-950/40 border border-emerald-500/20 rounded-xl py-2">
                      <span className="text-[10px] text-emerald-300 font-mono">Clôturées avec Succès</span>
                      <p className="text-base font-black text-white">{clientDrawerData.stats.completed}</p>
                    </div>
                  </div>
                </div>

                {/* Body Drawer : Historique des Interventions */}
                <div className="p-6 space-y-6 flex-1">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Historique des Interventions ({clientDrawerData.missions.length})</span>
                    </h4>

                    {clientDrawerData.missions.length === 0 ? (
                      <div className="text-center py-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-500 text-xs">
                        Aucune intervention enregistrée pour ce client.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {clientDrawerData.missions.map((m) => (
                          <div
                            key={m.id}
                            className="bg-slate-900/90 border border-cyan-500/20 hover:border-cyan-400/40 rounded-2xl p-4 space-y-2.5 transition-all shadow-md"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 ${getSpecialtyMeta(m.service_type).bgClass}`}>
                                <EnhancedCategoryIcon type={m.service_type} className="w-3.5 h-3.5" />
                                <span>{getSpecialtyMeta(m.service_type).label}</span>
                              </span>

                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                                m.status === 'COMPLETED'
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                  : m.status === 'PENDING'
                                    ? 'bg-amber-950 border-amber-500 text-amber-300'
                                    : 'bg-cyan-950 border-cyan-500 text-cyan-300'
                              }`}>
                                {m.status === 'COMPLETED' ? 'Clôturée 🟢' : m.status === 'PENDING' ? 'En Attente ⏳' : 'En Cours 🛠️'}
                              </span>
                            </div>

                            <p className="text-xs font-bold text-white">
                              {m.subcategory || 'Dépannage d\'urgence'}
                            </p>

                            <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                              <p className="flex items-center justify-between">
                                <span>Maâlem Assigné :</span>
                                <strong className="text-slate-200">{m.maalem_name || 'Non attribué'}</strong>
                              </p>
                              <p className="flex items-center justify-between">
                                <span>Devis / Prix convenu :</span>
                                <strong className="text-cyan-300 font-mono">{m.final_agreed_price ? `${m.final_agreed_price} DH` : '150 - 250 DH'}</strong>
                              </p>
                              <p className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>Date :</span>
                                <span>{new Date(m.created_at || Date.now()).toLocaleString('fr-FR')}</span>
                              </p>
                            </div>

                            {/* Note / Avis si présent */}
                            {m.rating && (
                              <div className="bg-slate-950 p-2 rounded-xl border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5 mt-2">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="font-bold">{m.rating} / 5</span>
                                {m.comment && <span className="text-slate-400 italic truncate">- "{m.comment}"</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Drawer : Actions d'Administration */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/80 sticky bottom-0 z-10 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Contacter WhatsApp */}
                    {cleanPhone(selectedClient.phone).length >= 9 && (
                      <a
                        href={`https://wa.me/212${cleanPhone(selectedClient.phone).replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-400" />
                        <span>Message WhatsApp</span>
                      </a>
                    )}

                    {/* Toggle Suspension */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleSuspension) {
                          onToggleSuspension(selectedClient.id);
                        }
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        selectedClient.is_suspended
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                          : 'bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300'
                      }`}
                    >
                      {selectedClient.is_suspended ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Réactiver Compte</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 text-rose-400" />
                          <span>Suspendre Compte</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
