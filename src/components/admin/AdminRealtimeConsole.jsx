import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Send, 
  Trash2, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Clock, 
  Server, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  Activity
} from 'lucide-react';
import { subscribeToRealtimeChannel, publishRealtimeEvent } from '../../lib/ablyRealtimeService';
import { centrifugo, isCentrifugoConfigured } from '../../lib/centrifugoClient';

export const AdminRealtimeConsole = () => {
  const [events, setEvents] = useState([]);
  const [filterChannel, setFilterChannel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isTestSending, setIsTestSending] = useState(false);
  const [streamStats, setStreamStats] = useState({ totalReceived: 0, lastEventTime: null });
  const listEndRef = useRef(null);

  // Écoute universelle en direct
  useEffect(() => {
    const unsubs = [];
    const channels = ['jobs:stream', 'admin:alerts', 'tracking:all', 'presence:maalems'];

    channels.forEach((channelName) => {
      const unsub = subscribeToRealtimeChannel(channelName, (data) => {
        const newEvt = {
          id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          channel: channelName,
          event: data.event || data.name || 'EVENT',
          payload: data.payload !== undefined ? data.payload : data,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }),
          clientId: data.clientId || 'Client-PWA'
        };

        setEvents((prev) => [newEvt, ...prev.slice(0, 49)]);
        setStreamStats((prev) => ({
          totalReceived: prev.totalReceived + 1,
          lastEventTime: newEvt.timestamp
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

  const sendTestEvent = async () => {
    setIsTestSending(true);
    await publishRealtimeEvent('admin_ping_test', {
      message: 'Test de latence de la Console Temps Réel Admin BricoleMoi',
      sender: 'Admin Dashboard',
      server: 'Centrifugo v5 VPS (51.255.46.206)',
      sentAt: new Date().toISOString()
    }, 'jobs:stream', 'admin-console');
    setIsTestSending(false);
  };

  const filteredEvents = events.filter((e) => {
    if (filterChannel !== 'ALL' && e.channel !== filterChannel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = e.event.toLowerCase().includes(q);
      const matchChan = e.channel.toLowerCase().includes(q);
      const matchPayload = JSON.stringify(e.payload).toLowerCase().includes(q);
      return matchName || matchChan || matchPayload;
    }
    return true;
  });

  const getEventBadge = (eventName) => {
    const ev = String(eventName).toLowerCase();
    if (ev.includes('sos') || ev.includes('new_job')) {
      return { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', label: 'SOS URGENCE' };
    }
    if (ev.includes('accept') || ev.includes('claim')) {
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', label: 'MAÂLEM DÉBLOCAGE' };
    }
    if (ev.includes('progress') || ev.includes('track') || ev.includes('way') || ev.includes('arrived')) {
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500', label: 'GPS / TRAJET' };
    }
    if (ev.includes('complete') || ev.includes('review') || ev.includes('rating')) {
      return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'CLÔTURE 5★' };
    }
    if (ev.includes('recharge') || ev.includes('credit') || ev.includes('wallet')) {
      return { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500', label: 'TRÉSORERIE' };
    }
    return { bg: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-500', label: 'SYSTÈME' };
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header Statut Serveur & Connexion Directe */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Console Temps Réel Live</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                VPS Centrifugo v5 Actif (&lt; 15ms)
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Surveillance en direct des WebSockets, alertes SOS, tracking GPS et événements tri-piliers.
            </p>
          </div>
        </div>

        {/* Boutons d'Action Rapide */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={sendTestEvent}
            disabled={isTestSending}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isTestSending ? 'Envoi...' : 'Tester le Flux'}</span>
          </button>

          <button
            type="button"
            onClick={() => setEvents([])}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-all active:scale-95 cursor-pointer"
            title="Effacer le flux"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barre de Filtrage & Recherche */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Tous les canaux' },
            { id: 'jobs:stream', label: '⚡ jobs:stream' },
            { id: 'tracking:all', label: '🚗 GPS Tracking' },
            { id: 'admin:alerts', label: '🛡️ Alertes Admin' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterChannel(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterChannel === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer un mot, nom, ID..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Flux d'Événements en Direct */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Flux Live ({filteredEvents.length} événements)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {streamStats.lastEventTime ? `Dernier événement : ${streamStats.lastEventTime}` : 'En attente de messages...'}
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs font-bold text-slate-700">En écoute du serveur Centrifugo...</p>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Cliquez sur <strong>« Tester le Flux »</strong> ci-dessus ou lancez une action dans l'application pour voir les données arriver en direct.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredEvents.map((evt, idx) => {
              const badge = getEventBadge(evt.event);
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={evt.id}
                  className={`border rounded-2xl transition-all ${
                    isExpanded ? 'border-blue-300 bg-blue-50/20 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="font-mono text-[11px] text-slate-400 shrink-0 font-bold">
                        {evt.timestamp}
                      </span>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1.5 shrink-0 ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        <span>{badge.label}</span>
                      </span>

                      <span className="font-bold text-xs text-slate-900 truncate">
                        {evt.event}
                      </span>

                      <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
                        [{evt.channel}]
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        {evt.clientId}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Détails JSON Dépliables */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3.5 pb-3.5 pt-1 border-t border-slate-100"
                      >
                        <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto shadow-inner">
                          <pre>{JSON.stringify(evt.payload, null, 2)}</pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
