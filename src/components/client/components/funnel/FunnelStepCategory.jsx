import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, MagnifyingGlass, X, CaretRight, CaretLeft } from '@phosphor-icons/react';
import { DIAGNOSTIC_TAXONOMY } from '../../data/diagnosticTaxonomy';

export const FunnelStepCategory = ({
  isRtl,
  selectedIssue,
  onSelectIssue
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIssues = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DIAGNOSTIC_TAXONOMY;

    return DIAGNOSTIC_TAXONOMY.filter((issue) => {
      const matchFr = (issue.titleFr || '').toLowerCase().includes(q) || (issue.descFr || '').toLowerCase().includes(q);
      const matchAr = (issue.titleAr || '').toLowerCase().includes(q) || (issue.descAr || '').toLowerCase().includes(q);
      const matchTags = (issue.tags || []).some(t => t.toLowerCase().includes(q)) || (issue.tagsAr || []).some(t => t.toLowerCase().includes(q));
      return matchFr || matchAr || matchTags;
    });
  }, [searchQuery]);

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-3.5 font-sans"
    >
      {/* En-tête épuré et percutant */}
      <div className="text-center sm:text-left">
        <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
          {isRtl ? 'شنو هو المشكل اللي عندك اليوم ؟' : 'Quel est votre problème aujourd’hui ?'}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          {isRtl
            ? 'اختر نوع العطب للحصول على معلم معتمد في الحين'
            : 'Touchez le motif de votre panne pour trouver un Maâlem qualifié'}
        </p>
      </div>

      {/* Barre de Recherche Rapide (Pattern Uber / TaskRabbit) */}
      <div className="relative">
        <div className={`absolute inset-y-0 ${isRtl ? 'right-3' : 'left-3'} flex items-center pointer-events-none text-slate-400`}>
          <MagnifyingGlass className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isRtl ? 'ابحث عن العطب (مثال: فويت، قادوس، ساروت، شوفو...)' : 'Rechercher (ex: fuite d\'eau, serrure, disjoncteur, clim...)'}
          className={`w-full py-2.5 sm:py-3 ${isRtl ? 'pr-9 pl-9 text-right' : 'pl-9 pr-9 text-left'} text-xs sm:text-sm bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 shadow-2xs focus:shadow-sm outline-none transition-all`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className={`absolute inset-y-0 ${isRtl ? 'left-2.5' : 'right-2.5'} flex items-center text-slate-400 hover:text-slate-700 p-1 cursor-pointer`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grille 2 colonnes ultra-optimisée Mobile (App-style) */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          {filteredIssues.map((issue) => {
            const IconComp = issue.icon;
            const isSelected = selectedIssue?.id === issue.id;

            return (
              <button
                key={issue.id}
                type="button"
                onClick={() => onSelectIssue(issue)}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[105px] sm:min-h-[115px] transition-all duration-200 active:scale-95 cursor-pointer group relative overflow-hidden shadow-2xs hover:shadow-md ${
                  isSelected
                    ? 'bg-blue-50/80 border-2 border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/90 hover:border-blue-400'
                }`}
              >
                {/* Ligne du haut : Icône en dégradé vibrant + Chevron */}
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-xs bg-gradient-to-br ${issue.color} group-hover:scale-105 transition-transform`}
                  >
                    <IconComp weight="duotone" className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {isRtl ? (
                    <CaretLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-all" />
                  ) : (
                    <CaretRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>

                {/* Libellé Métier & Traduction Arabe concise */}
                <div className="mt-2 w-full">
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                    {isRtl ? issue.titleAr : issue.titleFr}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-arabic font-bold text-slate-500 block mt-0.5 line-clamp-1">
                    {isRtl ? issue.titleFr : issue.titleAr}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
          <p className="text-xs font-bold text-slate-600">
            {isRtl ? 'لم نجد نتيجة مطابقة لبحثك' : 'Aucune catégorie ne correspond exactement à votre recherche.'}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs font-black text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            {isRtl ? 'عرض كل الخدمات' : 'Afficher toutes les catégories'}
          </button>
        </div>
      )}
    </motion.div>
  );
};
