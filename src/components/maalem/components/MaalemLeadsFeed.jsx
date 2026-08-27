import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, Eye, Play, Pause, CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Target, GlobeHemisphereWest } from '@phosphor-icons/react';
import { EnhancedCategoryIcon, getSpecialtyMeta } from '../../EnhancedCategoryIcon';

export const MaalemLeadsFeed = ({
  availableLeads,
  filterBySpecialtyOnly,
  setFilterBySpecialtyOnly,
  maalemPos,
  setFocusedMapCoords,
  setPreviewPhotoUrl,
  togglePlayMaalemAudio,
  playingAudioId,
  cyclePlaybackSpeed,
  playbackSpeed,
  handleUnlockLead,
  completedLeads,
  paginatedCompletedLeads,
  completedPage,
  setCompletedPage,
  totalCompletedPages
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Demandes d'Urgence SOS Disponibles */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 shadow-xs flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-red-600 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-sans tracking-tight">
                  Demandes d'Urgence SOS en Direct
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-mono font-bold shrink-0">
                  {availableLeads.length} active{availableLeads.length > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Alertes d'urgence instantanées dans votre secteur • Coût déblocage : 15.00 DH
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 gap-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(true)}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-center ${
                filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Target
                weight="duotone"
                className={`w-4 h-4 shrink-0 ${filterBySpecialtyOnly ? 'text-white' : 'text-amber-600'}`}
              />
              <span className="truncate">Ma Spécialité</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(false)}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-center ${
                !filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <GlobeHemisphereWest
                weight="duotone"
                className={`w-4 h-4 shrink-0 ${!filterBySpecialtyOnly ? 'text-white' : 'text-blue-600'}`}
              />
              <span className="truncate">Toutes les Demandes</span>
            </button>
          </div>
        </div>

        {availableLeads.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-sm shadow-xs space-y-2">
            <p className="text-base font-bold text-slate-800">
              Aucune nouvelle demande d'urgence en attente.
            </p>
            <p className="text-xs text-slate-500">
              Les nouvelles demandes créées par les clients apparaîtront ici instantanément en temps
              réel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableLeads.map((item) => {
              const lat = item.lat;
              const lng = item.lng;
              const distanceKm = item.calculatedDistance || 1.2;
              const defaultPhotosByService = {
                ELECTRICIAN:
                  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
                PLUMBING:
                  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
                AUTO_MECHANIC:
                  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
                CLIMATISATION:
                  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80'
              };
              const displayPhoto =
                item.description_photo ||
                defaultPhotosByService[item.service_type] ||
                defaultPhotosByService.PLUMBING;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-amber-300 flex flex-col justify-between transition-all space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                          getSpecialtyMeta(item.service_type).bgClass
                        }`}
                      >
                        <EnhancedCategoryIcon
                          type={item.service_type}
                          className="w-4 h-4 inline-block"
                        />
                        <span>{getSpecialtyMeta(item.service_type).label}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setFocusedMapCoords([lat, lng]);
                          document
                            .getElementById('maalem-radar-map')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs text-blue-700 hover:text-blue-900 font-black bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1 font-mono cursor-pointer transition-all active:scale-95 shadow-xs"
                        title="Cliquer pour centrer la carte sur cette demande SOS"
                      >
                        <span>📍 {distanceKm} km</span>
                        <span className="text-[10px] text-blue-600 font-bold bg-white px-1.5 py-0.5 rounded ml-1 border border-blue-200">
                          🎯 Carte
                        </span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-3.5 items-start">
                        {displayPhoto && (
                          <div
                            onClick={() => setPreviewPhotoUrl(displayPhoto)}
                            className="relative group cursor-pointer flex-shrink-0"
                          >
                            <img
                              src={displayPhoto}
                              alt="Urgence photo"
                              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:border-amber-400 group-hover:scale-105 transition-all"
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                              <Eye className="w-5 h-5" />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span className="truncate">{item.district || 'Casablanca'}</span>
                          </p>
                          <p className="text-xs text-amber-700 font-bold mt-0.5">
                            {item.subcategory || "Dépannage d'urgence"}
                          </p>
                          {item.access_details && (
                            <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-2">
                              ✍️ "{item.access_details}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Lecteur Audio Interactif pour l'Artisan */}
                      {item.audio_note_url && (
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => togglePlayMaalemAudio(item.id, item.audio_note_url)}
                              className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0 cursor-pointer"
                              title="Écouter la voix du client"
                            >
                              {playingAudioId === item.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </motion.button>
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                {playingAudioId === item.id
                                  ? 'Lecture en cours...'
                                  : 'Note Vocale Client (Darija / FR)'}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Écoutez les explications avant d'accepter
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => cyclePlaybackSpeed(item.id)}
                            className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 hover:bg-slate-50"
                            title="Vitesse de lecture"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500">
                      Coût :{' '}
                      <span className="text-slate-900 font-mono font-black">15.00 DH</span>
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleUnlockLead(item.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 active:scale-90 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Débloquer le Lead (-15 DH) 🔓</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Historique des Chantiers Clôturés & Avis */}
      {completedLeads.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 font-sans flex-wrap">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <span>Chantiers Clôturés &amp; Avis Clients</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono border border-slate-200 whitespace-nowrap shrink-0">
                {completedLeads.length} au total
              </span>
            </h3>
            {totalCompletedPages > 1 && (
              <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                Page {completedPage} sur {totalCompletedPages}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paginatedCompletedLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl space-y-2 text-xs shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between font-bold gap-2">
                  <span className="text-emerald-950 font-black truncate">
                    {lead.client_name || 'Client BricoleMoi'} •{' '}
                    {lead.subcategory || 'Dépannage'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full font-mono font-black text-amber-900 bg-amber-100/90 flex items-center gap-1 border border-amber-200 shadow-xs whitespace-nowrap shrink-0">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>
                      {lead.rating !== undefined && lead.rating !== null
                        ? `${lead.rating} / 5`
                        : 'Clôturé'}
                    </span>
                  </span>
                </div>
                <p className="text-slate-600 font-mono text-[11px]">
                  📍 {lead.district || 'Casablanca'} • Rémunération :{' '}
                  <strong className="text-slate-900 font-black">
                    {lead.final_agreed_price ? `${lead.final_agreed_price} DH` : 'Accord Direct'}
                  </strong>
                </p>
                {lead.comment && (
                  <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-emerald-100 font-medium shadow-xs">
                    "{lead.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalCompletedPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCompletedPage((p) => Math.max(1, p - 1))}
                disabled={completedPage === 1}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  completedPage === 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalCompletedPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCompletedPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                      completedPage === pageNum
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCompletedPage((p) => Math.min(totalCompletedPages, p + 1))}
                disabled={completedPage === totalCompletedPages}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  completedPage === totalCompletedPages
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
