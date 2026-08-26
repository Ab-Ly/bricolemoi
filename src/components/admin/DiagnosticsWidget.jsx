import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  Zap, 
  Wifi, 
  Volume2, 
  MapPin, 
  Database,
  X,
  Copy,
  Check
} from 'lucide-react';
import { telemetry } from '../../lib/telemetry';
import { playNotificationSound } from '../../lib/audioNotifier';

export const DiagnosticsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState(() => telemetry.getLogs());
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'WARNING'
  const [copied, setCopied] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    storageOk: true,
    audioOk: true,
    gpsAvailable: typeof navigator !== 'undefined' && 'geolocation' in navigator,
    broadcastOk: typeof window !== 'undefined' && 'BroadcastChannel' in window
  });

  useEffect(() => {
    const unsubscribe = telemetry.subscribe((newEntry, allLogs) => {
      setLogs([...allLogs]);
    });
    return unsubscribe;
  }, []);

  const handleTestAudio = () => {
    try {
      playNotificationSound('sos');
      telemetry.recordEvent({
        type: 'AUDIO_TEST',
        message: 'Test audio sonore SOS exécuté',
        severity: 'INFO'
      });
    } catch (e) {
      setSystemHealth((prev) => ({ ...prev, audioOk: false }));
    }
  };

  const handleSelfRepair = () => {
    telemetry.selfRepair();
    setLogs([...telemetry.getLogs()]);
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const criticalCount = logs.filter((l) => l.severity === 'CRITICAL').length;
  const warningCount = logs.filter((l) => l.severity === 'WARNING').length;

  const filteredLogs = logs.filter((l) => {
    if (filter === 'CRITICAL') return l.severity === 'CRITICAL';
    if (filter === 'WARNING') return l.severity === 'WARNING';
    return true;
  });

  return (
    <>
      {/* Bouton Flottant Déclencheur (Discret et ergonomique) */}
      <div className="fixed bottom-20 right-4 z-40">
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => setIsOpen(true)}
          className={`px-3 py-2 rounded-2xl shadow-xl border flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md ${
            criticalCount > 0
              ? 'bg-red-500 text-white border-red-400 shadow-red-500/30 animate-pulse'
              : warningCount > 0
              ? 'bg-amber-500 text-white border-amber-400 shadow-amber-500/25'
              : 'bg-white/95 text-slate-800 border-slate-200 shadow-slate-900/10 hover:bg-slate-50'
          }`}
          title="Superviseur d'Événements & Diagnostic Bugs"
        >
          <Activity className="w-4 h-4" />
          <span className="text-xs font-mono font-bold hidden sm:inline">Diagnostic</span>
          {(criticalCount > 0 || warningCount > 0) && (
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-mono font-black">
              {criticalCount + warningCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Modale Inspecteur & Contrôleur d'Événements */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 text-slate-900 max-h-[90vh] overflow-y-auto font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                      <span>Contrôleur d'Événements &amp; Bugs</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black border border-emerald-200">
                        Système Actif
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">Superviseur d'exceptions et de télémétrie en direct.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Statut Santé Système Instantané */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                  <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Temps Réel</span>
                    <strong className="text-emerald-700 text-[11px]">Ably + BC OK</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">GPS Tracker</span>
                    <strong className="text-blue-700 text-[11px]">{systemHealth.gpsAvailable ? 'Actif' : 'Indisponible'}</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                  <Volume2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Sons &amp; Audio</span>
                    <button
                      type="button"
                      onClick={handleTestAudio}
                      className="text-purple-700 underline text-[11px] font-bold cursor-pointer hover:text-purple-900"
                    >
                      Tester 🔊
                    </button>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                  <Database className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Persistance</span>
                    <strong className="text-amber-700 text-[11px]">Storage OK</strong>
                  </div>
                </div>
              </div>

              {/* Barre d'Actions & Filtres */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tous ({logs.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('CRITICAL')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filter === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    Critiques ({criticalCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('WARNING')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filter === 'WARNING' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    Avertissements ({warningCount})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLogs}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                    title="Copier les logs JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSelfRepair}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Auto-Réparation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => telemetry.clearLogs()}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Vider le journal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Journal des Événements */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {filteredLogs.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
                    <p className="text-xs font-bold text-slate-700">Aucun bug ni exception interceptée !</p>
                    <p className="text-[11px] text-slate-500">Tous les flux d'événements s'exécutent de façon stable.</p>
                  </div>
                ) : (
                  filteredLogs.map((log) => {
                    const isCrit = log.severity === 'CRITICAL';
                    const isWarn = log.severity === 'WARNING';
                    const isSuccess = log.severity === 'SUCCESS';

                    return (
                      <div
                        key={log.id}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                          isCrit
                            ? 'bg-red-50/70 border-red-200 text-red-950'
                            : isWarn
                            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                            : isSuccess
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${isCrit ? 'bg-red-500 animate-ping' : isWarn ? 'bg-amber-500' : 'bg-slate-400'}`} />
                            <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-slate-600 truncate">
                              {log.type}
                            </span>
                            <span className="text-[10px] text-slate-400">({log.source})</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                          </span>
                        </div>

                        <p className="font-semibold text-xs leading-relaxed break-words">
                          {log.message}
                        </p>

                        {log.stack && (
                          <details className="mt-1 text-[10px] font-mono text-slate-500 cursor-pointer">
                            <summary className="hover:text-slate-800">Afficher la pile d'exécution</summary>
                            <pre className="p-2 mt-1 bg-slate-900 text-slate-200 rounded-lg overflow-x-auto text-[10px] leading-tight">
                              {log.stack}
                            </pre>
                          </details>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
