import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, FileText, X, Check } from 'lucide-react';

export const CGUModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl relative max-h-modal flex flex-col text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5 mb-3.5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shadow-xs">
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-sans tracking-tight">
                    CGU &amp; Protection des Données
                  </h3>
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <span>Conforme Loi CNDP 09-08 &amp; Droit Marocain</span>
                    <span>🇲🇦</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Terms Content */}
            <div className="overflow-y-auto pr-1 sm:pr-2 space-y-4 text-xs text-slate-600 leading-relaxed font-sans flex-grow modal-scroll">
              <div className="bg-emerald-50/80 p-3.5 sm:p-4 rounded-2xl border border-emerald-200/90 flex items-start gap-3 shadow-xs text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>
                  Bienvenue sur <strong>BricoleMoi Maroc</strong>. La présente plateforme met en relation des clients en situation d'urgence technique (Plomberie, Mécanique Auto, Électricité, Serrurerie) avec des artisans qualifiés et indépendants (« Maalems ») sur l'ensemble du territoire du Royaume du Maroc.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  1. Conformité Loi CNDP 09-08 (Données Personnelles)
                </h4>
                <p>
                  Conformément à la <strong>Loi n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, promulguée par le Dahir n° 1-09-15, vos données personnelles (numéro de téléphone, localisation GPS, photographies de pannes, notes vocales) sont collectées uniquement pour la mise en relation d'urgence et le traitement de vos demandes de dépannage.
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                  <li>Vos données ne sont ni vendues ni cédées à des tiers non autorisés.</li>
                  <li>Vous disposez d'un droit d'accès, de rectification et d'opposition en contactant support@bricolemoi.ma.</li>
                  <li>Déclaration et traitement de sécurité aux normes souveraines nationales.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">
                  2. Tarification Accord Direct &amp; Transparence
                </h4>
                <p>
                  Les interventions fonctionnent sous le principe d'<strong>Accord Direct</strong> entre le Client et le Maâlem. Le prix final convenu est communiqué avant l'exécution des travaux pour assurer une clarté totale et mutuelle.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">
                  3. Système de Notation &amp; Arbitrage Garanti
                </h4>
                <p>
                  Afin de garantir un niveau de qualité irréprochable, chaque intervention fait l'objet d'une évaluation par étoiles (1 à 5★) et badges certifiés. En cas d'incompréhension ou de litige, notre centre d'arbitrage dédié intervient avec recoupement complet des informations et possibilité de remboursement intégral du lead pour le Maâlem.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">
                  4. Juridiction &amp; Droit Applicable
                </h4>
                <p>
                  Les présentes CGU sont régies par le droit marocain. Tout litige relatif à leur interprétation ou leur exécution sera soumis aux juridictions compétentes du Royaume du Maroc.
                </p>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-3.5 border-t border-slate-200/80 flex items-center justify-end gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 touch-target-44"
              >
                <Check className="w-4 h-4" />
                <span>J'ai Compris &amp; J'Accepte</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
