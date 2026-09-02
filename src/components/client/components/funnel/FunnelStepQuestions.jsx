import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from '@phosphor-icons/react';

export const FunnelStepQuestions = ({
  isRtl,
  selectedIssue,
  answers,
  handleAnswerSelect,
  onNext
}) => {
  if (!selectedIssue) return null;

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 font-sans"
    >
      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${selectedIssue.color}`}
        >
          <selectedIssue.icon weight="duotone" className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isRtl ? 'العطب المختار' : 'Panne sélectionnée'}
          </span>
          <h4 className="text-sm font-black text-slate-900">
            {isRtl ? selectedIssue.titleAr : selectedIssue.titleFr}
          </h4>
        </div>
      </div>

      {/* Questions de qualification */}
      <div className="space-y-6">
        {selectedIssue.questions.map((q, qIndex) => {
          const currentVal = answers[q.id];

          return (
            <div key={q.id} className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold mr-2 ml-2">
                  {qIndex + 1}
                </span>
                {isRtl ? q.labelAr : q.labelFr}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIndex) => {
                  const isOptSelected = currentVal === opt.value || currentVal === opt.valueAr;

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() =>
                        handleAnswerSelect(
                          q.id,
                          isRtl ? opt.valueAr : opt.value
                        )
                      }
                      className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all duration-150 active:scale-95 cursor-pointer ${
                        isOptSelected
                          ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-left">
                        <span className="text-lg">{opt.icon}</span>
                        <span className="font-bold text-slate-900">
                          {isRtl ? opt.valueAr : opt.value}
                        </span>
                      </span>
                      {isOptSelected && (
                        <CheckCircle
                          weight="fill"
                          className="w-5 h-5 text-blue-600 flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{isRtl ? 'متابعة لتحديد الموقع' : 'Continuer vers la localisation'}</span>
          {isRtl ? <ArrowLeft weight="bold" /> : <ArrowRight weight="bold" />}
        </button>
      </div>
    </motion.div>
  );
};
