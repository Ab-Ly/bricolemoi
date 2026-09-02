import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Printer, 
  Eye, 
  X 
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { formatDateTime } from '../../../utils/dateUtils';
import { getRechargePackBonus } from '../../../utils/balanceUtils';

export const RechargeRowCard = ({
  tx,
  maalem,
  onApprove,
  onOpenRejectModal,
  onSelectMaalemProfile,
  onPreviewReceiptImage,
  onGenerateReceiptPDF
}) => {
  const isPending = tx.status === 'PENDING';
  const isValidated = tx.status === 'VALIDATED';
  const isRejected = tx.status === 'REJECTED';

  const cleanPhone = (p) => (p || '').replace(/\D/g, '');
  const pClean = cleanPhone(maalem.phone || tx.maalem_phone);

  return (
    <motion.div
      layout
      key={tx.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border rounded-3xl p-5 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans ${
        isPending
          ? 'border-amber-300 ring-1 ring-amber-200 shadow-sm'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Bloc 1 : Fiche & Identité Maâlem */}
      <div className="flex items-start gap-3.5 min-w-0 md:max-w-xs flex-1">
        <div 
          onClick={() => onSelectMaalemProfile(maalem)}
          className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
          title="Cliquer pour voir la fiche complète"
        >
          {maalem.full_name ? maalem.full_name.charAt(0).toUpperCase() : 'M'}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 
              onClick={() => onSelectMaalemProfile(maalem)}
              className="font-black text-slate-900 text-sm truncate cursor-pointer hover:text-purple-600 transition-colors"
            >
              {maalem.full_name || 'Artisan Maâlem'}
            </h4>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono">
              ★ {(maalem.rating_avg !== undefined && maalem.rating_avg !== null ? Number(maalem.rating_avg) : 5.0).toFixed(1)}
            </span>
          </div>

          <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-purple-600 flex-shrink-0" />
            <span className="truncate">{maalem.district || maalem.city_zone || 'Casablanca'}</span>
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs">
            <a href={`tel:${maalem.phone}`} className="font-mono text-slate-700 hover:text-purple-600 flex items-center gap-1 font-bold">
              <Phone className="w-3 h-3 text-purple-600" />
              <span>{maalem.phone || 'Non renseigné'}</span>
            </a>
            {pClean.length >= 9 && (
              <a
                href={`https://wa.me/212${pClean.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-800 p-0.5"
                title="WhatsApp Direct"
              >
                <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bloc 2 : Détail de la Transaction & Rapprochement */}
      <div className="flex-1 md:px-4 md:border-l md:border-r border-slate-100 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
            Réf : {tx.reference_ref || tx.id}
          </span>

          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
            {tx.payment_method || 'Cash Plus / Wafacash'}
          </span>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
            isValidated
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : isRejected
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-amber-50 border-amber-200 text-amber-800 animate-pulse'
          }`}>
            {isValidated ? '🟢 Crédité & Validé' : isRejected ? '🔴 Rejeté' : '⏳ En Attente Validation'}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
          <span>Soumis le : {formatDateTime(tx.created_at || Date.now(), 'long')}</span>
          {tx.reconciled_at && <span>• Traité le : {formatDateTime(tx.reconciled_at, 'long')}</span>}
        </p>

        {tx.admin_notes && (
          <p className="text-[11px] text-slate-500 italic">
            Note : "{tx.admin_notes}"
          </p>
        )}
      </div>

      {/* Bloc 3 : Montant, Reçu Ticket & Actions */}
      <div className="flex items-center justify-between md:justify-end gap-4">
        {/* Photo Reçu si disponible */}
        {tx.receipt_photo_url && (
          <div 
            onClick={() => onPreviewReceiptImage(tx.receipt_photo_url)}
            className="relative group cursor-pointer flex-shrink-0"
            title="Cliquer pour agrandir la photo du bordereau"
          >
            <img
              src={tx.receipt_photo_url}
              alt="Reçu bordereau"
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:border-purple-300 group-hover:scale-105 transition-all shadow-xs"
            />
            <div className="absolute inset-0 bg-slate-900/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Montant Crédité */}
        <div className="text-right">
          <span className="text-[10px] text-slate-500 font-mono uppercase block">Montant :</span>
          <span className="text-xl font-black text-slate-900 font-mono">
            +{parseFloat(tx.amount_dh || 0).toFixed(2)} DH
          </span>
        </div>

        {/* Actions Rapides */}
        <div className="flex items-center gap-1.5">
          {onGenerateReceiptPDF && (
            <button
              type="button"
              onClick={() => onGenerateReceiptPDF(tx)}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
              title="Imprimer / Télécharger Reçu Officiel PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}

          {isPending && (
            <>
              <button
                type="button"
                onClick={() => onApprove && onApprove(tx.id)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Valider la recharge et créditer le compte (avec bonus éventuel)"
              >
                <span>
                  Valider (+{parseFloat(tx.amount_dh || 0).toFixed(0)} DH
                  {getRechargePackBonus(tx.amount_dh) > 0 ? ` +${getRechargePackBonus(tx.amount_dh)} DH Offerts 🎁` : ''})
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenRejectModal(tx)}
                className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 shadow-xs transition-colors cursor-pointer"
                title="Rejeter la demande avec motif"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => onSelectMaalemProfile(maalem)}
            className="px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            title="Consulter la fiche artisan"
          >
            Fiche
          </button>
        </div>
      </div>
    </motion.div>
  );
};
