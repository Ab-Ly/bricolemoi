import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, CreditCard, Camera } from 'lucide-react';
import {
  CreditCard as PhosphorCreditCard,
  Coins,
  EnvelopeSimple,
  Bank
} from '@phosphor-icons/react';
import { CustomDropdown } from '../../CustomDropdown';

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
            className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl relative text-slate-900 max-h-[92dvh] overflow-y-auto modal-scroll pb-safe"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setRechargeModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer touch-target-44 active:scale-95 z-20"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Wallet className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-sans">Module de Recharge Solde</h3>
              <p className="text-xs text-slate-500 mt-1">Choisissez votre pack et créditez votre compte</p>
            </div>

            {/* Boutons Rapides 50 DH, 100 DH, 200 DH, 500 DH */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Packs de Recharge Solde
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['50', '100', '200', '500'].map((val) => (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={val}
                    type="button"
                    onClick={() => setAmountDh(val)}
                    className={`py-3 rounded-xl border text-xs sm:text-sm font-black transition-all cursor-pointer ${
                      amountDh === val
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {val} DH
                  </motion.button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRechargeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Mode de Paiement au Maroc</label>
                <CustomDropdown
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    {
                      value: 'CB / Instant',
                      label: 'Paiement Immédiat (Carte Bancaire)',
                      icon: PhosphorCreditCard,
                      iconColor: 'text-emerald-600'
                    },
                    {
                      value: 'Cash Plus',
                      label: 'Cash Plus (Code Agence)',
                      icon: Coins,
                      iconColor: 'text-amber-600'
                    },
                    {
                      value: 'Wafacash',
                      label: 'Wafacash (Transfert Express)',
                      icon: Coins,
                      iconColor: 'text-rose-600'
                    },
                    {
                      value: 'Barid Cash',
                      label: 'Barid Cash (Reçu Agence)',
                      icon: EnvelopeSimple,
                      iconColor: 'text-yellow-600'
                    },
                    {
                      value: 'Virement Bancaire',
                      label: 'Virement RIB (CIH / Attijari / BMCE)',
                      icon: Bank,
                      iconColor: 'text-blue-600'
                    }
                  ]}
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-700">
                {paymentMethod === 'CB / Instant' && (
                  <>
                    <p className="font-black text-emerald-800 flex items-center gap-1">
                      <CreditCard className="w-4 h-4 text-emerald-600" /> Crédit Instantané :
                    </p>
                    <p className="text-slate-600">
                      Votre solde sera immédiatement crédité de <strong className="text-slate-900">{amountDh} DH</strong> dès validation.
                    </p>
                  </>
                )}
                {paymentMethod === 'Cash Plus' && (
                  <>
                    <p className="font-black text-amber-800 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>Instructions Cash Plus :</span>
                    </p>
                    <p className="text-slate-600">
                      Rendez-vous en agence Cash Plus avec le code : <strong className="text-slate-900 font-mono">CP-BRICOLEMOI-88</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Wafacash' && (
                  <>
                    <p className="font-black text-rose-800 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-rose-600" />
                      <span>Instructions Wafacash :</span>
                    </p>
                    <p className="text-slate-600">
                      Mandat express au nom de : <strong className="text-slate-900">BricoleMoi SARL (+212661000000)</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Barid Cash' && (
                  <>
                    <p className="font-black text-yellow-800 flex items-center gap-1.5">
                      <EnvelopeSimple className="w-3.5 h-3.5 text-yellow-600" />
                      <span>Instructions Barid Cash :</span>
                    </p>
                    <p className="text-slate-600">
                      Guichet Poste Maroc / Barid Cash sous le compte : <strong className="text-slate-900 font-mono">BC-998811</strong>
                    </p>
                  </>
                )}
                {paymentMethod === 'Virement Bancaire' && (
                  <>
                    <p className="font-black text-blue-800">🏦 Instructions Virement RIB Bancaire :</p>
                    <p className="text-slate-600 font-mono text-[11px]">RIB CIH : 230 780 0001234567890123 45</p>
                  </>
                )}
              </div>

              {paymentMethod !== 'CB / Instant' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Numéro de Référence du Reçu (Recommandé)
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
                      <span>📸 Photo du Reçu / Ticket Papier :</span>
                      {receiptPhotoUrl && (
                        <span className="text-[10px] text-emerald-700 font-mono font-bold">✓ Photo Attachée</span>
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
                            <p className="text-xs font-bold text-emerald-900">Ticket Reçu Prêt</p>
                            <p className="text-[10px] text-emerald-700">Cliquez pour agrandir HD</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReceiptPhotoUrl(null)}
                          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-100/50 rounded-xl transition-colors cursor-pointer"
                          title="Supprimer la photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl bg-slate-50 cursor-pointer transition-colors group">
                        <Camera className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-xs font-bold text-slate-700">Prendre en photo le ticket papier</span>
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

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Payer &amp; Recharger ({amountDh} DH)
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
