import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, AlertTriangle, Zap, CheckCircle2, PhoneCall } from 'lucide-react';
import { getServiceDisplay } from '../hooks/useClientViewState';

export const ClientActiveRequestsList = ({
  activeClientInterventions = [],
  activeOngoingSOS,
  activePendingSOS,
  relaunchEmergencyRequest,
  setPendingCompletionModalInt,
  cancelIntervention,
  t
}) => {
  const currentFocusedId = String(activeOngoingSOS?.id || activePendingSOS?.id || '').trim();
  const displayableRequests = currentFocusedId
    ? activeClientInterventions.filter((item) => String(item.id).trim() !== currentFocusedId)
    : activeClientInterventions;

  if (currentFocusedId && displayableRequests.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        {t('my_requests')} en cours ({displayableRequests.length})
      </h3>

      {displayableRequests.length === 0 ? (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-2 shadow-xs">
          <p className="text-sm font-bold text-slate-700">✨ Vous n'avez aucune demande SOS en cours.</p>
          <p className="text-xs text-slate-500">
            Remplissez le formulaire ci-dessus pour envoyer une alerte aux Maâlems de votre secteur.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayableRequests.map((item) => {
            const serviceInfo = getServiceDisplay(item.service_type);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                key={item.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 shadow-xs">
                      <span className="text-sm">{serviceInfo.icon}</span>
                      <span>{serviceInfo.label}</span>
                    </span>

                    <span
                      className={`px-3.5 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 ${
                        item.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200 animate-pulse'
                          : item.status === 'ACCEPTED'
                          ? item.progress_step === 'ARRIVED'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200 animate-pulse'
                            : item.progress_step === 'ON_THE_WAY'
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                          : item.status === 'PENDING_COMPLETION'
                          ? 'bg-purple-50 text-purple-900 border border-purple-200 animate-pulse'
                          : item.status === 'UNFEASIBLE'
                          ? 'bg-rose-50 text-rose-900 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>
                        {item.status === 'PENDING' && 'En recherche de Maalem...'}
                        {item.status === 'ACCEPTED' &&
                          (item.progress_step === 'ARRIVED'
                            ? '📍 Maâlem sur place'
                            : item.progress_step === 'ON_THE_WAY'
                            ? '🚗 Maâlem en route'
                            : 'Maâlem assigné')}
                        {item.status === 'PENDING_COMPLETION' && 'Clôture en attente'}
                        {item.status === 'UNFEASIBLE' && '❌ Mission Non Réalisable'}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="font-bold text-slate-900 text-sm">{item.subcategory || 'Dépannage'}</p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.district}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {new Date(item.created_at || Date.now()).toLocaleTimeString()} (
                        {new Date(item.created_at || Date.now()).toLocaleDateString()})
                      </span>
                    </p>

                    {item.status === 'ACCEPTED' && item.progress_step === 'ARRIVED' && (
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2 mt-2 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping flex-shrink-0" />
                        <span>📍 Le Maâlem est arrivé à votre domicile et démarre le diagnostic.</span>
                      </div>
                    )}

                    {item.status === 'ACCEPTED' && item.progress_step === 'ON_THE_WAY' && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 mt-2 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse flex-shrink-0" />
                        <span>🚗 Le Maâlem est actuellement en route vers votre adresse.</span>
                      </div>
                    )}

                    {item.status === 'UNFEASIBLE' && (
                      <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200 space-y-2.5 mt-2 shadow-xs text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-950">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>Artisan indisponible pour cette intervention</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          Motif signalé :{' '}
                          <strong>
                            {item.unfeasible_reason === 'CLIENT_UNREACHABLE'
                              ? 'Client injoignable par téléphone'
                              : item.unfeasible_reason === 'PARTS_UNAVAILABLE'
                              ? 'Pièce de rechange indisponible sur le marché'
                              : item.unfeasible_reason === 'CLIENT_CANCELLED'
                              ? 'Demande annulée'
                              : item.unfeasible_reason === 'PRICE_DISAGREEMENT'
                              ? 'Périmètre ou devis hors portée'
                              : item.unfeasible_reason === 'WRONG_LOCATION'
                              ? 'Hors secteur géographique'
                              : item.unfeasible_reason || 'Impossibilité technique ou imprévu'}
                          </strong>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={() => relaunchEmergencyRequest(item.id)}
                          className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                        >
                          <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                          <span>⚡ Relancer immédiatement la recherche d'un autre Maâlem</span>
                        </button>
                      </div>
                    )}

                    {item.status === 'PENDING_COMPLETION' && (
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 mt-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Travaux finalisés par le Maâlem</span>
                          </span>
                          {item.final_agreed_price ? (
                            <span className="text-xs font-black font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                              {item.final_agreed_price} DH
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                              Prêt pour Clôture
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-700">
                          Le Maâlem a terminé l'intervention{item.final_agreed_price ? ` pour un montant de ${item.final_agreed_price} DH` : ''}. Veuillez confirmer pour clôturer et noter.
                        </p>
                        <button
                          type="button"
                          onClick={() => setPendingCompletionModalInt(item)}
                          className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirmer &amp; Évaluer la Prestation</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Details */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  {item.status === 'ACCEPTED' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                        <span>🛠️ {item.maalem_name || 'Artisan Maâlem'}</span>
                      </div>
                      {item.maalem_phone && (
                        <a
                          href={`tel:${item.maalem_phone}`}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-all"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Appeler ({item.maalem_phone})</span>
                        </a>
                      )}
                    </div>
                  )}

                  {item.status === 'PENDING_COMPLETION' && (
                    <button
                      onClick={() => setPendingCompletionModalInt(item)}
                      className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Valider Fin de Chantier ({item.final_agreed_price || 150} DH)</span>
                    </button>
                  )}

                  {item.status === 'PENDING' && (
                    <button
                      onClick={() => cancelIntervention(item.id)}
                      className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
