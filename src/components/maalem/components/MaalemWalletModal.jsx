import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, CreditCard, Camera, Sparkles, Check, Gift } from 'lucide-react';
import {
  CreditCard as PhosphorCreditCard,
  Coins,
  EnvelopeSimple,
  Bank
} from '@phosphor-icons/react';
import { CustomDropdown } from '../../CustomDropdown';
import { RECHARGE_PACKS, getRechargePackBonus } from '../../../utils/balanceUtils';
import { useAuth } from '../../../context/AuthContext';

export const MaalemWalletModal = ({
  rechargeModalOpen,
  setRechargeModalOpen,
  amountDh,
  setAmountDh,
  paymentMethod,
  setPaymentMethod,
  referenceRef,
  setReferenceRef,
  receiptPhotoUrl,
  setReceiptPhotoUrl,
  handleReceiptFileChange,
  setPreviewPhotoUrl,
  handleRechargeSubmit
}) => {
  const { lang } = useAuth();
  const isAr = lang === 'ar';

  const selectedBonus = getRechargePackBonus(amountDh);
  const selectedTotalCredits = (parseFloat(amountDh) || 0) + selectedBonus;

  return (
    <AnimatePresence>
      {rechargeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            dir={isAr ? 'rtl' : 'ltr'}
            className={`bg-white border border-slate-200/90 rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative text-slate-900 max-h-[92dvh] overflow-y-auto modal-scroll pb-safe ${
              isAr ? 'font-arabic' : 'font-sans'
            }`}
          >
            {/* Bouton Fermer */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setRechargeModalOpen(false)}
              className={`absolute top-3.5 ${isAr ? 'left-3.5' : 'right-3.5'} text-slate-400 hover:text-slate-700 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer touch-target-44 active:scale-95 z-20`}
              title={isAr ? 'إغلاق' : 'Fermer'}
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Header Modal */}
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-2.5 shadow-xs flex-shrink-0">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isAr ? 'شحن رصيد المهام (Leads SOS)' : 'Recharge Solde Leads SOS'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs sm:max-w-sm">
                {isAr
                  ? 'اختر الباقة المناسبة واستفد من عروض الليدات المجانية'
                  : 'Choisissez votre pack incitatif et bénéficiez de leads offerts'}
              </p>
            </div>

            {/* 4 Packs de Recharge avec Bonus Incitatifs */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  {isAr ? 'باقات الشحن مع بونيس كادو 🎁' : 'Packs de Recharge avec Bonus 🎁'}
                </label>
                <span className="text-[10px] text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {isAr ? '1 ليد SOS = 15 درهم' : '1 Lead SOS = 15 DH'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {RECHARGE_PACKS.map((pack) => {
                  const isSelected = String(amountDh) === pack.amount;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={pack.id}
                      type="button"
                      onClick={() => setAmountDh(pack.amount)}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-amber-500 shadow-md shadow-amber-500/15 ring-2 ring-amber-500/30'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                      }`}
                    >
                      {/* Top Row: Badge & Radio Check */}
                      <div className="flex items-center justify-between gap-1 mb-2 w-full">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg truncate max-w-[190px] ${
                            pack.popular
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : pack.bonusDh > 0
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {isAr ? pack.badgeAr : pack.badgeFr}
                        </span>

                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'bg-amber-600 text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Montant Principal & Bonus */}
                      <div className="flex items-baseline justify-between gap-2 my-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                            {pack.amount}
                          </span>
                          <span className="text-xs font-bold text-slate-500">DH</span>
                        </div>

                        {pack.bonusDh > 0 ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                            <Gift className="w-3 h-3 text-emerald-600" />
                            +{pack.bonusDh} DH {isAr ? 'كادو' : 'Offerts'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">Standard</span>
                        )}
                      </div>

                      {/* Footer Row: Crédit Total & Estimation de Chantiers */}
                      <div className="mt-2 pt-2 border-t border-slate-100/90 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">
                          {isAr ? 'الرصيد الكلي :' : 'Solde total :'}
                        </span>
                        <span className="font-black text-slate-900 font-mono">
                          {pack.totalCredits} DH{' '}
                          <span className="text-amber-700 font-sans font-bold">
                            (~{pack.leadsCount} {isAr ? 'مهام' : 'leads'})
                          </span>
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Formulaire de validation */}
            <form onSubmit={handleRechargeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isAr ? 'طريقة الأداء بالمغرب' : 'Mode de Paiement au Maroc'}
                </label>
                <CustomDropdown
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    {
                      value: 'CB / Instant',
                      label: isAr ? 'أداء فوري (بطاقة بنكية CMI)' : 'Paiement Immédiat (Carte Bancaire)',
                      icon: PhosphorCreditCard,
                      iconColor: 'text-emerald-600'
                    },
                    {
                      value: 'Cash Plus',
                      label: isAr ? 'كاش بلوس (وكالة قريبة)' : 'Cash Plus (Code Agence)',
                      icon: Coins,
                      iconColor: 'text-amber-600'
                    },
                    {
                      value: 'Wafacash',
                      label: isAr ? 'وفاكاش (تحويل فوري)' : 'Wafacash (Transfert Express)',
                      icon: Coins,
                      iconColor: 'text-rose-600'
                    },
                    {
                      value: 'Barid Cash',
                      label: isAr ? 'بريد كاش / بريد بنك' : 'Barid Cash (Reçu Agence)',
                      icon: EnvelopeSimple,
                      iconColor: 'text-yellow-600'
                    },
                    {
                      value: 'Virement Bancaire',
                      label: isAr ? 'تحويل بنكي RIB (CIH / التجاري / BMCE)' : 'Virement RIB (CIH / Attijari / BMCE)',
                      icon: Bank,
                      iconColor: 'text-blue-600'
                    }
                  ]}
                />
              </div>

              {/* Instructions de paiement */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs space-y-2 text-slate-700">
                {paymentMethod === 'CB / Instant' && (
                  <>
                    <p className="font-black text-emerald-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>{isAr ? 'شحن فوري ومباشر :' : 'Crédit Instantané Automatique :'}</span>
                    </p>
                    <p className="text-slate-600">
                      {isAr
                        ? `سيتم شحن حسابك بـ ${selectedTotalCredits} درهم (${amountDh} درهم + ${selectedBonus} درهم بونيس كادو) فوراً.`
                        : `Votre solde sera immédiatement crédité de ${selectedTotalCredits} DH (${amountDh} DH payés + ${selectedBonus} DH bonus offert) dès validation.`}
                    </p>
                  </>
                )}
                {paymentMethod === 'Cash Plus' && (
                  <>
                    <p className="font-black text-amber-800 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isAr ? 'تعليمات كاش بلوس :' : 'Instructions Cash Plus :'}</span>
                    </p>
                    <p className="text-slate-600">
                      {isAr
                        ? 'توجه لأقرب وكالة كاش بلوس وأدلِ برمز الحساب :'
                        : 'Rendez-vous en agence Cash Plus avec le code :'}{' '}
                      <strong className="text-slate-900 font-mono">CP-BRICOLEMOI-88</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Wafacash' && (
                  <>
                    <p className="font-black text-rose-800 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-rose-600" />
                      <span>{isAr ? 'تعليمات وفاكاش :' : 'Instructions Wafacash :'}</span>
                    </p>
                    <p className="text-slate-600">
                      {isAr ? 'حوالة سريعة باسم :' : 'Mandat express au nom de :'}{' '}
                      <strong className="text-slate-900">BricoleMoi SARL (+212661000000)</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Barid Cash' && (
                  <>
                    <p className="font-black text-yellow-800 flex items-center gap-1.5">
                      <EnvelopeSimple className="w-3.5 h-3.5 text-yellow-600" />
                      <span>{isAr ? 'تعليمات بريد كاش :' : 'Instructions Barid Cash :'}</span>
                    </p>
                    <p className="text-slate-600">
                      {isAr ? 'شباك بريد بنك / بريد كاش رقم :' : 'Guichet Poste Maroc / Barid Cash sous le compte :'}{' '}
                      <strong className="text-slate-900 font-mono">BC-998811</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Virement Bancaire' && (
                  <>
                    <p className="font-black text-blue-800">
                      🏦 {isAr ? 'تحويل بنكي RIB :' : 'Instructions Virement RIB Bancaire :'}
                    </p>
                    <p className="text-slate-600 font-mono text-[11px]">RIB CIH : 230 780 0001234567890123 45</p>
                  </>
                )}
              </div>

              {paymentMethod !== 'CB / Instant' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isAr ? 'رقم وصل الأداء (مرجع التحويل)' : 'Numéro de Référence du Reçu (Recommandé)'}
                    </label>
                    <input
                      type="text"
                      placeholder="ex: CP-984029102 ou WC-489201"
                      value={referenceRef}
                      onChange={(e) => setReferenceRef(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono text-sm uppercase focus:border-amber-500 focus:outline-none transition-colors shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>{isAr ? '📸 صورة الوصل الورقي :' : '📸 Photo du Reçu / Ticket Papier :'}</span>
                      {receiptPhotoUrl && (
                        <span className="text-[10px] text-emerald-700 font-mono font-bold">
                          ✓ {isAr ? 'تم إرفاق الصورة' : 'Photo Attachée'}
                        </span>
                      )}
                    </label>

                    {receiptPhotoUrl ? (
                      <div className="relative rounded-2xl border border-emerald-300 p-2.5 bg-emerald-50 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={receiptPhotoUrl}
                            alt="Ticket reçu"
                            className="w-14 h-14 object-cover rounded-xl border border-emerald-200 cursor-pointer"
                            onClick={() => setPreviewPhotoUrl(receiptPhotoUrl)}
                          />
                          <div>
                            <p className="text-xs font-bold text-emerald-900">
                              {isAr ? 'الوصل جاهز' : 'Ticket Reçu Prêt'}
                            </p>
                            <p className="text-[10px] text-emerald-700">
                              {isAr ? 'اضغط للمعاينة HD' : 'Cliquez pour agrandir HD'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReceiptPhotoUrl(null)}
                          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-100/50 rounded-xl transition-colors cursor-pointer"
                          title={isAr ? 'حذف الصورة' : 'Supprimer la photo'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl bg-slate-50 cursor-pointer transition-colors group">
                        <Camera className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-xs font-bold text-slate-700">
                          {isAr ? 'تصوير الوصل بالكاميرا أو إرفاق ملف' : 'Prendre en photo le ticket papier'}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG ou capture d'écran</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleReceiptFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Bouton de Soumission */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-sm rounded-xl shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {isAr ? `أداء وتعبئة (${amountDh} درهم)` : `Payer & Recharger (${amountDh} DH)`}
                </span>
                {selectedBonus > 0 && (
                  <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs text-white font-bold">
                    +{selectedBonus} DH {isAr ? 'كادو 🎁' : 'Offerts 🎁'}
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
