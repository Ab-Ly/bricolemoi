import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Trash2, 
  Zap, 
  Clock, 
  Server, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  Activity,
  Copy,
  Check,
  Pause,
  Play,
  Shield,
  Wifi
} from 'lucide-react';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../../lib/ablyRealtimeService';
import { isCentrifugoConfigured } from '../../lib/centrifugoClient';

export const AdminRealtimeConsole = () => {
  const [events, setEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState('ALL'); // 'ALL' | 'SOS' | 'MAALEM' | 'GPS' | 'SYSTEM'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [isTestSending, setIsTestSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    sosCount: 0,
    maalemCount: 0,
    lastPing: '< 15ms'
  });
  
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Écoute universelle en direct
  useEffect(() => {
    const unsubs = [];
    const channels = [
      'jobs:stream',
      'bricolemoi:jobs:stream',
      'admin:alerts',
      'bricolemoi:admin:alerts',
      'tracking:all',
      'bricolemoi:tracking:all',
      'presence:maalems',
      'bricolemoi:presence:maalems',
      'terminal:logs',
      'bricolemoi:terminal:logs'
    ];

    channels.forEach((channelName) => {
      const unsub = subscribeToRealtimeChannel(channelName, (data) => {
        if (isPausedRef.current) return;

        const rawData = data.payload !== undefined ? data.payload : data;
        const eventName = data.event || data.name || (rawData.level ? rawData.category : 'EVENT');
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }) + '.' + String(now.getMilliseconds()).padStart(3, '0');

        const newEvt = {
          id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
          channel: channelName,
          event: eventName,
          level: rawData.level || (String(eventName).toLowerCase().includes('sos') ? 'SOS' : 'INFO'),
          category: rawData.category || (String(eventName).toLowerCase().includes('track') ? 'GPS' : 'REALTIME'),
          message: rawData.message || (typeof rawData === 'string' ? rawData : `Événement ${eventName}`),
          payload: rawData.data || rawData,
          user: rawData.user || { role: 'SYSTEM', name: 'Passerelle VPS' },
          device: rawData.device || { summary: '🌐 Web • Centrifugo v5' },
          timestamp: timeStr,
          rawTimestamp: Date.now()
        };

        setEvents((prev) => [newEvt, ...prev.slice(0, 99)]);
        setStats((prev) => ({
          ...prev,
          total: prev.total + 1,
          sosCount: prev.sosCount + (String(eventName).toLowerCase().includes('sos') ? 1 : 0),
          maalemCount: prev.maalemCount + (String(eventName).toLowerCase().includes('accept') || String(eventName).toLowerCase().includes('claim') ? 1 : 0)
        }));
      });
      unsubs.push(unsub);
    });

    return () => {
      unsubs.forEach((fn) => {
        try { fn(); } catch (e) {}
      });
    };
  }, []);

  const handleSendTestPing = async () => {
    setIsTestSending(true);
    const start = performance.now();
    await publishRealtimeEvent('admin_ping_test', {
      level: 'INFO',
      category: 'TEST',
      message: 'Test de réactivité temps réel validé avec succès',
      user: { role: 'ADMIN', name: 'Super Administrateur', phone: '+212600000000' },
      device: { summary: '🌐 Web [Console Admin]' },
      data: {
        server: 'Centrifugo v5.4.9 (VPS 51.255.46.206)',
        protocol: 'WebSocket TLS WSS',
        dispatchedAt: new Date().toISOString()
      }
    }, 'bricolemoi:admin:alerts', 'admin-console');
    
    const latency = Math.round(performance.now() - start);
    setStats((prev) => ({ ...prev, lastPing: `${latency}ms` }));
    setIsTestSending(false);
  };

  const handleCopyJson = (evt, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(evt.payload, null, 2));
    setCopiedId(evt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredEvents = events.filter((e) => {
    if (filterCategory === 'SOS') {
      const match = String(e.event).toLowerCase().includes('sos') || String(e.level).toLowerCase().includes('sos') || e.category === 'SOS';
      if (!match) return false;
    } else if (filterCategory === 'MAALEM') {
      const match = e.user?.role === 'MAALEM' || String(e.event).toLowerCase().includes('claim') || String(e.event).toLowerCase().includes('accept');
      if (!match) return false;
    } else if (filterCategory === 'GPS') {
      const match = e.category === 'GPS' || String(e.event).toLowerCase().includes('track') || String(e.event).toLowerCase().includes('progress');
      if (!match) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = (e.message || '').toLowerCase().includes(q);
      const matchUser = (e.user?.name || '').toLowerCase().includes(q);
      const matchPhone = (e.user?.phone || '').toLowerCase().includes(q);
      const matchPayload = JSON.stringify(e.payload).toLowerCase().includes(q);
      return matchText || matchUser || matchPhone || matchPayload;
    }
    return true;
  });

  const getRoleStyle = (role) => {
    switch (role) {
      case 'CLIENT':
        return { bg: 'bg-blue-600/20 text-blue-300 border-blue-500/40', tag: '👤 CLIENT' };
      case 'MAALEM':
        return { bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', tag: '🛠️ MAÂLEM' };
      case 'ADMIN':
        return { bg: 'bg-purple-600/20 text-purple-300 border-purple-500/40', tag: '🛡️ ADMIN' };
      default:
        return { bg: 'bg-slate-700/40 text-slate-300 border-slate-600/40', tag: '⚙️ SYSTÈME' };
    }
  };

  const getLevelStyle = (level) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-500/20 text-red-400 border-red-500/40 font-bold';
      case 'WARN':
        return 'bg-amber-500/20 text-yellow-400 border-yellow-500/40 font-bold';
      case 'ACTION':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'GPS':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40 font-bold';
      case 'SOS':
        return 'bg-red-600/30 text-rose-300 border-rose-500/50 font-black animate-pulse';
      case 'INFO':
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold';
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-100">
      {/* 1. Barres KPIs Haute Densité */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Total Événements</span>
            <p className="text-xl font-black font-mono text-white">{stats.total}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Urgences SOS</span>
            <p className="text-xl font-black font-mono text-rose-400">{stats.sosCount}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Déblocages Artisans</span>
            <p className="text-xl font-black font-mono text-amber-400">{stats.maalemCount}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Latence VPS</span>
            <p className="text-xl font-black font-mono text-emerald-400">{stats.lastPing}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Wifi className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. Fenêtre Terminal Dark Obsidian (Style CLI Haute Définition) */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
        {/* Header Mac-Style & Commandes */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-xs truncate">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>bricolemoi@vps-51.255.46.206: ~ centrifugo-v5.4.9 (TLS WSS)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                isPaused
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? 'Reprendre' : 'Pause'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendTestPing}
              disabled={isTestSending}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3 h-3" />
              <span>{isTestSending ? 'Test...' : 'Tester le Flux'}</span>
            </button>

            <button
              type="button"
              onClick={() => setEvents([])}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 transition-all cursor-pointer"
              title="Vider la console"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="bg-slate-900/40 border-b border-slate-800/60 p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'Tous' },
              { id: 'SOS', label: '🚨 SOS' },
              { id: 'MAALEM', label: '🛠️ Maâlems' },
              { id: 'GPS', label: '🚗 GPS' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterCategory(f.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === f.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher nom, tel, message..."
              className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* ASCII Banner Style CLI */}
        <div className="p-3.5 border-b border-slate-900 bg-slate-950 text-cyan-400 text-[11px] leading-relaxed select-none">
          <div className="text-slate-500">╔════════════════════════════════════════════════════════════════════════════════╗</div>
          <div className="text-emerald-400 font-bold">║  📟 BRICOLEMOI LIVE CONSOLE &amp; TELEMETRY STREAM 3.0 (CENTRIFUGO VPS)            ║</div>
          <div className="text-slate-400">║  Flux temps réel &amp; télémétrie souveraine sur VPS 51.255.46.206 🇲🇦              ║</div>
          <div className="text-slate-500">╚════════════════════════════════════════════════════════════════════════════════╝</div>
          <div className="text-slate-500 pt-1">📡 Canaux actifs : <span className="text-slate-300 font-bold">jobs:stream | admin:alerts | tracking:all | presence:maalems</span></div>
          <div className="text-emerald-400 font-bold">✓ Connecté à Centrifugo v5 VPS Gateway. Écoute permanente active...</div>
        </div>

        {/* Liste des Lignes de Logs Formatées Style CLI */}
        <div className="p-3 space-y-2 max-h-[520px] overflow-y-auto pr-2">
          {filteredEvents.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Terminal className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
              <p className="font-bold text-slate-400">En attente d'événements temps réel...</p>
              <p className="text-[11px] text-slate-600">
                Cliquez sur <strong>« Tester le Flux »</strong> ou réalisez une action dans l'application.
              </p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const roleStyle = getRoleStyle(evt.user?.role);
              const levelStyle = getLevelStyle(evt.level);
              const isExpanded = expandedId === evt.id;
              const hasDetails = evt.payload && Object.keys(evt.payload).length > 0;

              return (
                <div
                  key={evt.id}
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isExpanded 
                      ? 'bg-slate-900/90 border-blue-500/50 shadow-md' 
                      : 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80'
                  }`}
                >
                  {/* Ligne 1 : Timestamp + Niveau + Rôle Acteur + Nom/Tel */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-slate-500 font-bold shrink-0 font-mono">[{evt.timestamp}]</span>
                    
                    <span className={`px-2 py-0.2 rounded border text-[10px] shrink-0 font-mono ${levelStyle}`}>
                      {evt.level}
                    </span>

                    <span className={`px-2 py-0.2 rounded border text-[10px] shrink-0 font-bold ${roleStyle.bg}`}>
                      {roleStyle.tag} {evt.user?.name || 'Anonyme'} {evt.user?.phone ? `(${evt.user.phone})` : ''}
                    </span>

                    <span className="text-slate-500 font-mono text-[10px] hidden sm:inline ml-auto truncate">
                      [{evt.channel}]
                    </span>
                  </div>

                  {/* Ligne 2 : Message Explicite + Device + Flèche Dépliage */}
                  <div className="pt-1.5 flex items-start justify-between gap-2 text-xs">
                    <div className="text-slate-200 font-bold leading-snug">
                      <span className="text-emerald-400 mr-1 font-black">»</span>
                      <span>{evt.message}</span>
                      {evt.device?.summary && (
                        <span className="text-slate-500 text-[10px] font-normal ml-2 font-mono">
                          • {evt.device.summary}
                        </span>
                      )}
                    </div>

                    {hasDetails && (
                      <div className="flex items-center gap-1.5 shrink-0 text-slate-500 text-[10px]">
                        <span>Détails</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-blue-400" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </div>
                    )}
                  </div>

                  {/* Ligne 3 : Payload JSON Dépliable */}
                  <AnimatePresence>
                    {isExpanded && hasDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pt-2 border-t border-slate-800 relative"
                      >
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-emerald-300 font-mono text-[11px] overflow-x-auto shadow-inner">
                          <pre>{JSON.stringify(evt.payload, null, 2)}</pre>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleCopyJson(evt, e)}
                          className="absolute top-4 right-3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 font-bold border border-slate-700 transition-all cursor-pointer"
                        >
                          {copiedId === evt.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === evt.id ? 'Copié !' : 'Copier JSON'}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
