import React from 'react';
import { motion } from 'framer-motion';
import { ClientDiagnosticFunnel } from './ClientDiagnosticFunnel';

export const ClientSosForm = (props) => {
  const {
    activeOngoingSOS,
    showNewSOSForm,
    setShowNewSOSForm,
    lang = 'fr'
  } = props;

  const isRtl = lang === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-4"
    >
      {/* Alerte si intervention déjà en cours */}
      {activeOngoingSOS && showNewSOSForm && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-blue-900 font-medium shadow-xs"
        >
          <span>
            🚗 {isRtl ? 'كاين تدخل جاري مع المعلم ديالك :' : 'Une intervention est en cours avec votre Maâlem :'}{' '}
            <strong>({activeOngoingSOS.subcategory || 'Dépannage'})</strong>.
          </span>
          <button
            type="button"
            onClick={() => setShowNewSOSForm(false)}
            className="font-bold underline text-blue-700 hover:text-blue-900 cursor-pointer flex-shrink-0"
          >
            {isRtl ? 'الرجوع للتتبع المباشر ←' : 'Retourner au suivi en direct →'}
          </button>
        </div>
      )}

      {/* Entonnoir interactif de diagnostic Mobile-First */}
      <ClientDiagnosticFunnel {...props} />
    </motion.div>
  );
};
