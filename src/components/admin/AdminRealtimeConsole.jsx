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
  Wifi,
  Users,
  Smartphone
} from 'lucide-react';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../../lib/ablyRealtimeService';

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

  const getRoleBadge = (role, user) => {
    const name = user?.name || user?.full_name || 'Anonyme';
    const phone = user?.phone ? ` (${user.phone})` : '';

    switch (role) {
      case 'CLIENT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Users className="w-3 h-3 text-blue-600" />
            <span>CLIENT • {name}{phone}</span>
          </span>
        );
      case 'MAALEM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Shield className="w-3 h-3 text-amber-600" />
            <span>MAÂLEM • {name}{phone}</span>
          </span>
        );
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Radio className="w-3 h-3 text-purple-600" />
            <span>ADMIN • {name}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Server className="w-3 h-3 text-slate-500" />
            <span>SYSTÈME • {name}</span>
          </span>
        );
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'ERROR':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">ERROR</span>;
      case 'WARN':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">WARN</span>;
      case 'ACTION':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-cyan-50 text-cyan-700 border border-cyan-200">ACTION</span>;
      case 'GPS':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">GPS</span>;
      case 'SOS':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-100 text-red-700 border border-red-300 animate-pulse">🚨 SOS</span>;
      case 'INFO':
      default:
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">INFO</span>;
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* 1. Barres KPIs Modern Clean & Trust */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-bold">Total Événements</span>
            <p className="text-2xl font-black font-mono text-slate-900">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 block font-bold">Urgences SOS</span>
            <p className="text-2xl font-black font-mono text-rose-600">{stats.sosCount}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 block font-bold">Déblocages Maâlems</span>
            <p className="text-2xl font-black font-mono text-amber-600">{stats.maalemCount}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 block font-bold">Latence VPS</span>
            <p className="text-2xl font-black font-mono text-emerald-600">{stats.lastPing}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-xs">
            <Wifi className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Fenêtre Console Pro Blanche & Lumineuse */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden text-xs">
        {/* Header Console & Boutons d'Action */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-slate-900 text-sm tracking-tight">Console Temps Réel Live</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  VPS Centrifugo v5 Actif
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Serveur : <span className="font-mono text-slate-700 font-bold">51.255.46.206:8800</span> • WSS TLS Sécurisé
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs cursor-pointer border ${
                isPaused
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Reprendre' : 'Pause'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendTestPing}
              disabled={isTestSending}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 text-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isTestSending ? 'Envoi...' : 'Tester le Flux'}</span>
            </button>

            <button
              type="button"
              onClick={() => setEvents([])}
              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-all cursor-pointer shadow-xs"
              title="Vider la console"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="bg-slate-50/60 border-b border-slate-200 p-3 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'Tous les flux' },
              { id: 'SOS', label: '🚨 SOS Urgences' },
              { id: 'MAALEM', label: '🛠️ Maâlems' },
              { id: 'GPS', label: '🚗 GPS Tracking' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterCategory(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === f.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer nom, tél, quartier, message..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
            />
          </div>
        </div>

        {/* Bandeau d'état réseau clair */}
        <div className="px-4 sm:px-6 py-2.5 bg-emerald-50/50 border-b border-emerald-100/60 text-emerald-800 text-[11px] font-mono flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">✓ Passerelle Centrifugo VPS connectée en direct</span>
          </div>
          <span className="text-slate-500 font-sans">Canaux : <strong className="font-mono text-slate-700">jobs:stream • admin:alerts • tracking:all</strong></span>
        </div>

        {/* Liste des Événements Formatés Propres (Modern Clean & Trust) */}
        <div className="p-3 sm:p-6 space-y-2.5 max-h-[540px] overflow-y-auto pr-2 bg-slate-50/30">
          {filteredEvents.length === 0 ? (
            <div className="py-14 text-center text-slate-400 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 mx-auto flex items-center justify-center">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <p className="font-bold text-slate-700 text-sm">En attente d'événements temps réel...</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Cliquez sur <strong>« Tester le Flux »</strong> ou réalisez une action dans l'application pour voir les lignes défiler.
              </p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isExpanded = expandedId === evt.id;
              const hasDetails = evt.payload && Object.keys(evt.payload).length > 0;

              return (
                <div
                  key={evt.id}
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none bg-white ${
                    isExpanded 
                      ? 'border-blue-300 shadow-sm ring-1 ring-blue-500/20' 
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Ligne 1 : Horodatage + Niveau + Badges Acteurs */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-400 font-bold font-mono text-[11px]">
                        [{evt.timestamp}]
                      </span>
                      
                      {getLevelBadge(evt.level)}
                      {getRoleBadge(evt.user?.role, evt.user)}
                    </div>

                    <span className="text-slate-400 font-mono text-[10px] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                      {evt.channel}
                    </span>
                  </div>

                  {/* Ligne 2 : Message clair & Device */}
                  <div className="pt-2 flex items-start justify-between gap-3 text-xs">
                    <div className="text-slate-800 font-medium leading-relaxed flex-1">
                      <span className="text-blue-600 font-black mr-1.5">»</span>
                      <strong className="text-slate-900 font-bold">{evt.message}</strong>
                      {evt.device?.summary && (
                        <span className="text-slate-500 text-[11px] ml-2 font-mono">
                          • {evt.device.summary}
                        </span>
                      )}
                    </div>

                    {hasDetails && (
                      <div className="flex items-center gap-1 shrink-0 text-slate-400 hover:text-blue-600 text-[11px] font-bold">
                        <span>{isExpanded ? 'Masquer' : 'Détails'}</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-blue-600" /> : <ChevronRight className="w-3.5 h-3.5" />}
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
                        className="mt-3 pt-2.5 border-t border-slate-100 relative"
                      >
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono text-[11px] overflow-x-auto shadow-inner">
                          <pre className="text-slate-700">{JSON.stringify(evt.payload, null, 2)}</pre>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleCopyJson(evt, e)}
                          className="absolute top-4 right-3 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[11px] flex items-center gap-1.5 font-bold border border-slate-200 shadow-xs transition-all cursor-pointer"
                        >
                          {copiedId === evt.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
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
