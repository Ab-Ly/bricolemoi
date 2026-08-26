import React, { useState, useEffect, useMemo } from 'react';
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
  Check,
  Globe,
  Compass,
  MousePointer,
  Bell,
  Search
} from 'lucide-react';
import { telemetry } from '../../lib/telemetry';
import { playNotificationSound } from '../../lib/audioNotifier';

export const DiagnosticsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState(() => telemetry.getLogs());
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'NETWORK' | 'NAVIGATION' | 'UI' | 'NOTIFICATION'
  const [searchQuery, setSearchQuery] = useState('');
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
        category: 'SYSTEM',
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

  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      // Filtrage par catégorie
      if (activeCategory === 'CRITICAL' && l.severity !== 'CRITICAL' && l.severity !== 'WARNING') return false;
      if (activeCategory === 'NETWORK' && l.category !== 'NETWORK') return false;
      if (activeCategory === 'NAVIGATION' && l.category !== 'NAVIGATION') return false;
      if (activeCategory === 'UI' && l.category !== 'UI') return false;
      if (activeCategory === 'NOTIFICATION' && l.category !== 'NOTIFICATION') return false;

      // Filtrage par recherche
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const msg = (l.message || '').toLowerCase();
        const type = (l.type || '').toLowerCase();
        const cat = (l.category || '').toLowerCase();
        const url = (l.url || '').toLowerCase();
        return msg.includes(q) || type.includes(q) || cat.includes(q) || url.includes(q);
      }

      return true;
    });
  }, [logs, activeCategory, searchQuery]);

  return (
    <>
      {/* Bouton Flottant Déclencheur */}
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
          title="Superviseur d'Événements & Télémétrie Globale"
        >
          <Activity className="w-4 h-4 text-blue-600 animate-spin-slow" />
          <span className="text-xs font-mono font-bold hidden sm:inline">Télémétrie</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-black border border-slate-200">
            {logs.length}
          </span>
          {(criticalCount > 0 || warningCount > 0) && (
            <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-mono font-black">
              ! {criticalCount + warningCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Modale Inspecteur & Superviseur d'Événements */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-3xl w-full shadow-2xl border border-slate-200 space-y-4 text-slate-900 max-h-[90vh] overflow-y-auto font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                      <span>Télémétrie &amp; Écouteur d'Événements</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black border border-emerald-200">
                        Écoute Active ({logs.length})
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">Superviseur universel : Requêtes, Clics, Routes, Erreurs &amp; Notifications.</p>
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
                    <span className="text-[10px] text-slate-500 block">Réseau &amp; Sync</span>
                    <strong className="text-emerald-700 text-[11px]">En direct</strong>
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

              {/* Recherche & Contrôles */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer par mot-clé, route, URL, statut..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyLogs}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                    title="Copier les logs JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? 'Copié' : 'Copier'}</span>
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

              {/* Filtres par Catégorie */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                    activeCategory === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tous ({logs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('CRITICAL')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    activeCategory === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  Erreurs ({criticalCount + warningCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('NETWORK')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    activeCategory === 'NETWORK' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  Réseau
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('NAVIGATION')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    activeCategory === 'NAVIGATION' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  Navigation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('UI')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    activeCategory === 'UI' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <MousePointer className="w-3 h-3" />
                  Clics &amp; UI
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('NOTIFICATION')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    activeCategory === 'NOTIFICATION' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Bell className="w-3 h-3" />
                  Alertes / SOS
                </button>
              </div>

              {/* Journal des Événements */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredLogs.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
                    <p className="text-xs font-bold text-slate-700">Aucun événement ne correspond à ce filtre.</p>
                    <p className="text-[11px] text-slate-500">Le superviseur enregistre les clics, requêtes et erreurs en continu.</p>
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
                            : log.category === 'NETWORK'
                            ? 'bg-blue-50/60 border-blue-200/80 text-blue-950'
                            : log.category === 'NAVIGATION'
                            ? 'bg-indigo-50/60 border-indigo-200/80 text-indigo-950'
                            : log.category === 'UI'
                            ? 'bg-amber-50/50 border-amber-200/60 text-slate-900'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isCrit
                                  ? 'bg-red-500 animate-ping'
                                  : isWarn
                                  ? 'bg-amber-500'
                                  : isSuccess
                                  ? 'bg-emerald-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            <span className="font-mono font-black text-[10px] uppercase tracking-wider text-slate-700 truncate">
                              {log.type}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">[{log.category || 'APP'}]</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                          </span>
                        </div>

                        <p className="font-semibold text-xs leading-relaxed break-words">
                          {log.message}
                        </p>

                        {log.metadata && Object.keys(log.metadata).length > 0 && (
                          <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-500">
                            {Object.entries(log.metadata).map(([k, v]) => (
                              <span key={k} className="px-1.5 py-0.5 bg-black/5 rounded">
                                {k}: <strong className="text-slate-700">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</strong>
                              </span>
                            ))}
                          </div>
                        )}

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
