import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  MapPin, 
  Star, 
  Wrench, 
  Receipt, 
  UserCheck, 
  Ban, 
  Images, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { getSpecialtyMeta } from '../../EnhancedCategoryIcon';
import { formatDateTime } from '../../../utils/dateUtils';

export const AdminMaalemDrawer = ({
  selectedMaalem,
  onClose,
  maalemDrawerData,
  creditBalance,
  ratingInfo,
  onQuickCredit,
  onToggleSuspension,
  onPreviewPhoto
}) => {
  if (!selectedMaalem) return null;

  const m = selectedMaalem;
  const pClean = (m.phone || '').replace(/\D/g, '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-lg bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xl flex items-center justify-center shadow-xs shrink-0">
                    {m.full_name ? m.full_name.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                        {m.full_name || 'Artisan Maâlem'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                        m.is_online
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.is_online ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                        <span>{m.is_online ? 'En Ligne' : 'Hors Ligne'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${getSpecialtyMeta(m.specialty).bgClass}`}>
                        {getSpecialtyMeta(m.specialty).label}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ID: {String(m.id).slice(0, 10)}...
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 Compteurs KPI de l'artisan */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[9px] font-mono text-emerald-800 uppercase block font-bold">Solde Leads</span>
                  <p className="text-base font-black text-emerald-800 font-mono mt-0.5">
                    {creditBalance.toFixed(2)} DH
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[9px] font-mono text-amber-800 uppercase block font-bold">Note ★</span>
                  <p className="text-base font-black text-amber-800 font-mono mt-0.5">
                    {ratingInfo.totalReviews > 0
                      ? `${ratingInfo.averageRating.toFixed(1)} / 5`
                      : '- / 5'}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[9px] font-mono text-blue-700 uppercase block font-bold">Missions</span>
                  <p className="text-base font-black text-blue-700 font-mono mt-0.5">
                    {maalemDrawerData.stats.totalJobs}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[9px] font-mono text-purple-700 uppercase block font-bold">Réalisées</span>
                  <p className="text-base font-black text-purple-700 font-mono mt-0.5">
                    {maalemDrawerData.stats.completedJobs}
                  </p>
                </div>
              </div>
            </div>

            {/* Body Drawer : Coordonnées, Portfolio & Historiques */}
            <div className="p-6 space-y-6 flex-1">
              {/* Coordonnées & Actions de Recharge Immédiates */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coordonnées &amp; Secteur d'Intervention</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">Téléphone :</span>
                    <p className="font-bold text-slate-900 font-mono">{m.phone || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">Ville &amp; Secteur :</span>
                    <p className="font-bold text-slate-900">{m.district || m.city_zone || 'Casablanca'}</p>
                  </div>
                </div>

                {/* Crédit Direct */}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <span className="text-[10px] text-slate-600 font-mono font-bold uppercase">Créditer Solde :</span>
                  <button
                    type="button"
                    onClick={() => onQuickCredit && onQuickCredit(m.id, 15)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    +15 DH
                  </button>
                  <button
                    type="button"
                    onClick={() => onQuickCredit && onQuickCredit(m.id, 50)}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    +50 DH
                  </button>
                  <button
                    type="button"
                    onClick={() => onQuickCredit && onQuickCredit(m.id, 100)}
                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    +100 DH
                  </button>
                </div>
              </div>

              {/* Portfolio Photos de Réalisations */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Images className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Portfolio des Réalisations ({(m.portfolio_urls || []).length})</span>
                  </h4>
                </div>

                {(m.portfolio_urls || []).length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Aucune photo de chantier ajoutée par l'artisan.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {(m.portfolio_urls || []).map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onPreviewPhoto(imgUrl)}
                        className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square group cursor-pointer shadow-xs"
                      >
                        <img
                          src={imgUrl}
                          alt={`Chantier ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Historique des Chantiers & Missions */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Missions Récentes ({maalemDrawerData.maalemMissions.length})</span>
                  </h4>
                </div>

                {maalemDrawerData.maalemMissions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                    Aucune mission enregistrée pour cet artisan.
                  </p>
                ) : (
                  <div className="space-y-2.5 max-h-64 overflow-y-auto modal-scroll pr-1">
                    {maalemDrawerData.maalemMissions.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs space-y-2 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-slate-900 truncate">
                            {item.subcategory || item.service_type || 'Dépannage SOS'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-blue-50 border-blue-200 text-blue-800'
                          }`}>
                            {item.status === 'COMPLETED' ? '✅ Clôturé' : '🛠️ En cours'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                          <span>Client : <strong>{item.client_name || 'Client BricoleMoi'}</strong></span>
                          <span>Tarif : <strong className="text-slate-900">{item.final_agreed_price ? `${item.final_agreed_price} DH` : 'Accord Direct'}</strong></span>
                        </div>

                        {item.comment && (
                          <div className="p-2 bg-white rounded-xl border border-slate-100 text-[11px] text-slate-700 italic">
                            "{item.comment}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Journal des Transactions Financières du Portefeuille */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Journal du Portefeuille ({maalemDrawerData.maalemTransactions.length})</span>
                  </h4>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    Solde : {creditBalance.toFixed(2)} DH
                  </span>
                </div>

                {maalemDrawerData.maalemTransactions.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                    Aucune transaction enregistrée pour cet artisan.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto modal-scroll pr-1">
                    {maalemDrawerData.maalemTransactions.map((tx) => {
                      const isPositive = Number(tx.amount_dh) > 0;
                      return (
                        <div
                          key={tx.id}
                          className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between gap-2 shadow-2xs"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">
                              {tx.payment_method || tx.type}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono">
                              {formatDateTime(tx.created_at || Date.now(), 'long')}
                            </p>
                          </div>
                          <span className={`font-mono font-bold px-2 py-0.5 rounded-lg text-xs ${
                            isPositive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : Number(tx.amount_dh).toFixed(2)} DH
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Drawer : WhatsApp & Suspension */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 space-y-3">
              <div className="flex items-center gap-3">
                {pClean.length >= 9 && (
                  <a
                    href={`https://wa.me/212${pClean.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <WhatsappLogo weight="fill" className="w-4 h-4" />
                    <span>Message WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onToggleSuspension && onToggleSuspension(m.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                    m.is_suspended
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700'
                  }`}
                >
                  {m.is_suspended ? (
                    <>
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>Réactiver Compte</span>
                    </>
                  ) : (
                    <>
                      <Ban className="w-3 h-3 text-rose-600" />
                      <span>Suspendre Compte</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
