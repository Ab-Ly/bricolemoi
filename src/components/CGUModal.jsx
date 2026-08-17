import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, FileText, X, Lock } from 'lucide-react';

export const CGUModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-slate-950 border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative max-h-[85vh] flex flex-col text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                  <Scale className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-sans">CGU &amp; Protection des Données</h3>
                  <p className="text-xs text-cyan-400 font-semibold">Conforme à la Loi CNDP 09-08 &amp; Droit Marocain 🇲🇦</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Terms Content */}
            <div className="overflow-y-auto pr-2 space-y-5 text-xs text-slate-300 leading-relaxed font-sans flex-grow">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30 flex items-start gap-3 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p>
                  Bienvenue sur <strong>BricoleMoi Maroc</strong>. La présente plateforme met en relation des clients en situation d'urgence technique (Plomberie, Mécanique Auto, Électricité) avec des artisans qualifiés et indépendants (« Maalems ») sur le territoire du Royaume du Maroc.
                </p>
              </div>

              <div>
                <h4 className="font-black text-sm text-white mb-1 flex items-center gap-1.5">
                  1. Conformité Loi CNDP 09-08 (Données Personnelles)
                </h4>
                <p>
                  Conformément à la <strong>Loi n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, promulguée par le Dahir n° 1-09-15, vos données personnelles (numéro de téléphone, localisation GPS, photographies de pannes, notes vocales) sont collectées uniquement pour la mise en relation d'urgence et le traitement de vos demandes de dépannage.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                  <li>Vos données ne sont ni vendues ni cédées à des tiers non autorisés.</li>
                  <li>Vous disposez d'un droit d'accès, de rectification et d'opposition en contactant support@bricolemoi.ma.</li>
                  <li>Déclaration CNDP enregistrée sous le récépissé officiel.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-sm text-white mb-1">
                  2. Devis et Transparence des Tarifs
                </h4>
                <p>
                  Chaque Maalem s'engage à proposer un prix final agrée (« Devis ») avant le démarrage de toute intervention. Si le montant du devis dépasse <strong>300 DH</strong>, une étape de confirmation de sécurité est obligatoirement affichée au client.
                </p>
              </div>

              <div>
                <h4 className="font-black text-sm text-white mb-1">
                  3. Système de Notation Uber &amp; Qualité Service
                </h4>
                <p>
                  Afin de garantir un niveau de qualité optimal, chaque intervention fait l'objet d'une évaluation obligatoire (1 à 5 étoiles). Toute note inférieure ou égale à 3 étoiles déclenche immédiatement une alerte auprès de notre équipe d'administration et d'arbitrage.
                </p>
              </div>

              <div>
                <h4 className="font-black text-sm text-white mb-1">
                  4. Juridiction &amp; Droit Applicable
                </h4>
                <p>
                  Les présentes CGU sont régies par le droit marocain. Tout litige relatif à leur interprétation ou leur exécution sera de la compétence exclusive des tribunaux de commerce de Casablanca.
                </p>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-4 border-t border-cyan-500/20 flex justify-end flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all active:scale-95"
              >
                J'accepte les CGU
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
