import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { DIAGNOSTIC_TAXONOMY } from '../../data/diagnosticTaxonomy';

export const FunnelStepCategory = ({
  isRtl,
  selectedIssue,
  onSelectIssue
}) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-4 font-sans"
    >
      <div className="text-center sm:text-left">
        <h3 className="text-lg sm:text-2xl font-black text-slate-900">
          {isRtl ? 'شنو هو المشكل اللي عندك اليوم ؟' : 'Quel est votre problème aujourd’hui ?'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isRtl
            ? 'اختر نوع العطب للحصول على معلم معتمد في الحين'
            : 'Touchez le motif de votre panne pour qualifier votre besoin en 1 clic'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {DIAGNOSTIC_TAXONOMY.map((issue) => {
          const IconComp = issue.icon;
          const isSelected = selectedIssue?.id === issue.id;

          return (
            <button
              key={issue.id}
              type="button"
              onClick={() => onSelectIssue(issue)}
              className={`p-4 sm:p-4.5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 active:scale-[0.98] cursor-pointer group ${
                isSelected
                  ? 'bg-blue-50/70 border-2 border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-xs bg-gradient-to-br ${issue.color} group-hover:scale-105 transition-transform`}
              >
                <IconComp weight="duotone" className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors leading-snug">
                      {isRtl ? issue.titleAr : issue.titleFr}
                    </h4>
                    <span className="text-[11px] font-arabic font-bold text-slate-500 block mt-0.5">
                      {isRtl ? issue.titleFr : issue.titleAr}
                    </span>
                  </div>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all mt-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mt-1" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {isRtl ? issue.descAr : issue.descFr}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {(isRtl ? issue.tagsAr : issue.tags).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
