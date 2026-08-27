import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';

export const MaalemWelcomeWhatsAppBanner = ({
  whatsappMsg,
  setWhatsappMsg,
  formattedWhatsAppDarija,
  handleOpenWhatsApp,
  handleCopyWhatsAppMsg,
  copiedMsg
}) => {
  if (!whatsappMsg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-emerald-50 text-emerald-950 p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-4 relative overflow-hidden"
    >
      <button
        onClick={() => setWhatsappMsg(null)}
        className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-900 p-1.5 rounded-xl hover:bg-emerald-100/60 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
            <WhatsappLogo weight="duotone" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-base tracking-tight text-slate-900 flex items-center gap-2">
              <span>Message WhatsApp Automatique (Darija 🇲🇦)</span>
            </h4>
            <p className="text-xs text-slate-600">Notification instantanée envoyée au Maâlem</p>
          </div>
        </div>
      </div>

      <div
        dir="rtl"
        className="bg-white border border-emerald-200/90 p-5 rounded-2xl font-sans text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-inner select-all"
      >
        {formattedWhatsAppDarija}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenWhatsApp}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <WhatsappLogo weight="fill" className="w-4 h-4" />
          <span>Ouvrir dans WhatsApp</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyWhatsAppMsg}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{copiedMsg ? '✔ Message Copié !' : 'Copier le Message'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
