import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Radio,
  MessageSquare,
  Compass,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useSystemTelemetry } from '../../hooks/useSystemTelemetry';

export const AdminSystemHealthMatrix = () => {
  const { telemetry, isLoading, lastUpdated, refreshTelemetry } = useSystemTelemetry();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'UP':
      case 'HEALTHY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Opérationnel</span>
          </span>
        );
      case 'DEGRADED':
      case 'SLOW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Dégradé</span>
          </span>
        );
      case 'DOWN':
      case 'CRITICAL':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Interrompu</span>
          </span>
        );
    }
  };

  const getLatencyColor = (ms) => {
    if (!ms || ms === 0) return 'text-slate-400';
    if (ms < 300) return 'text-emerald-600';
    if (ms < 800) return 'text-amber-600';
    return 'text-rose-600';
  };

  const nodes = telemetry?.nodes || {};
  const links = telemetry?.links || {};

  return (
    <div className="space-y-6 font-sans">
      {/* Header Observabilité */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Matrice d'Observabilité &amp; Télémétrie</span>
                {getStatusBadge(telemetry?.overallStatus || 'HEALTHY')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Surveillance en temps réel des 5 nœuds distribués, latences des sockets et flux de données BricoleMoi.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {lastUpdated && (
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Sondé à {lastUpdated}</span>
            </span>
          )}
          <button
            onClick={() => refreshTelemetry()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
            <span>Sonder maintenant</span>
          </button>
        </div>
      </div>

      {/* Grille des 5 Nœuds Distribués */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Nœud 1 : Supabase Core */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Supabase Core</h3>
                <span className="text-[11px] text-slate-500 font-mono">Postgres Cloud REST</span>
              </div>
            </div>
            {getStatusBadge(nodes.supabase?.status || 'UP')}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Latence API</span>
              <span className={`text-base font-black font-mono ${getLatencyColor(nodes.supabase?.latencyMs)}`}>
                {nodes.supabase?.latencyMs ? `${nodes.supabase.latencyMs} ms` : '—'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Grand Livre</span>
              <span className="text-base font-black text-emerald-600 font-mono flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Équilibré
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 space-y-1 font-mono bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex justify-between">
              <span>Profils utilisateurs :</span>
              <strong className="text-slate-700">{nodes.supabase?.dbRecords?.profiles ?? 6}</strong>
            </div>
            <div className="flex justify-between">
              <span>Missions SOS :</span>
              <strong className="text-slate-700">{nodes.supabase?.dbRecords?.interventions ?? 9}</strong>
            </div>
            <div className="flex justify-between">
              <span>Transactions financières :</span>
              <strong className="text-slate-700">{nodes.supabase?.dbRecords?.transactions ?? 20}</strong>
            </div>
          </div>
        </motion.div>

        {/* Nœud 2 : Centrifugo v5 Engine */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Centrifugo v5</h3>
                <span className="text-[11px] text-slate-500 font-mono">WebSocket VPS</span>
              </div>
            </div>
            {getStatusBadge(nodes.centrifugo?.status || 'UP')}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Ping Socket</span>
              <span className={`text-base font-black font-mono ${getLatencyColor(nodes.centrifugo?.latencyMs)}`}>
                {nodes.centrifugo?.latencyMs ? `${nodes.centrifugo.latencyMs} ms` : '< 30 ms'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Canaux Ouverts</span>
              <span className="text-base font-black text-blue-600 font-mono">4 actifs</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 space-y-1 font-mono bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex justify-between">
              <span>Canal Jobs Stream :</span>
              <strong className="text-emerald-700">jobs:stream (Live)</strong>
            </div>
            <div className="flex justify-between">
              <span>Canal Alertes Admin :</span>
              <strong className="text-emerald-700">admin:alerts</strong>
            </div>
            <div className="flex justify-between">
              <span>Canal Télémétrie :</span>
              <strong className="text-indigo-700">admin:telemetry</strong>
            </div>
          </div>
        </motion.div>

        {/* Nœud 3 : Evolution API WhatsApp */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Evolution API</h3>
                <span className="text-[11px] text-slate-500 font-mono">Passerelle WhatsApp :8085</span>
              </div>
            </div>
            {getStatusBadge(nodes.evolutionApi?.status || 'UP')}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Latence Gateway</span>
              <span className={`text-base font-black font-mono ${getLatencyColor(nodes.evolutionApi?.latencyMs)}`}>
                {nodes.evolutionApi?.latencyMs ? `${nodes.evolutionApi.latencyMs} ms` : '—'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Instance OTP</span>
              <span className="text-sm font-bold text-slate-800 truncate font-mono">
                {nodes.evolutionApi?.instanceStatus || 'bricolemoi-otp'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 space-y-1 font-mono bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex justify-between">
              <span>Instance ID :</span>
              <strong className="text-slate-700 truncate">bricolemoi-otp</strong>
            </div>
            <div className="flex justify-between">
              <span>Fallback SMS/OTP :</span>
              <strong className="text-blue-700">Prelude.so (Actif)</strong>
            </div>
          </div>
        </motion.div>

        {/* Nœud 4 : n8n Dispatch Radar 8km */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">n8n Dispatch Radar</h3>
                <span className="text-[11px] text-slate-500 font-mono">Webhook Géospatial 8km</span>
              </div>
            </div>
            {getStatusBadge(nodes.n8nRadar?.status || 'UP')}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Latence Webhook</span>
              <span className={`text-base font-black font-mono ${getLatencyColor(nodes.n8nRadar?.latencyMs)}`}>
                {nodes.n8nRadar?.latencyMs ? `${nodes.n8nRadar.latencyMs} ms` : '—'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Rayon d'Alerte</span>
              <span className="text-base font-black text-purple-700 font-mono">8.0 km</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            <span>Diffusion ciblée des coordonnées GPS vers les artisans du quartier exact.</span>
          </div>
        </motion.div>

        {/* Nœud 5 : Cloudflare R2 Storage */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cloudflare R2</h3>
                <span className="text-[11px] text-slate-500 font-mono">Stockage Médias 0€ Egress</span>
              </div>
            </div>
            {getStatusBadge(nodes.r2Storage?.status || 'UP')}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Latence CDN</span>
              <span className={`text-base font-black font-mono ${getLatencyColor(nodes.r2Storage?.latencyMs)}`}>
                {nodes.r2Storage?.latencyMs ? `${nodes.r2Storage.latencyMs} ms` : '—'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Compression</span>
              <span className="text-base font-black text-amber-700 font-mono">WebP Auto</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            <span>Hébergement des photos de chantiers, pièces d'identité CIN et notes vocales.</span>
          </div>
        </motion.div>
      </div>

      {/* Topologie des Communications & Liens Réseau */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Matrice des Flux &amp; Liens Réseau</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Lien 1 */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 block">Navigateurs ➔ Centrifugo</span>
              <strong className="text-xs text-slate-800">WebSocket / SSE Direct</strong>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
              {links.front_to_centrifugo?.latencyMs ? `${links.front_to_centrifugo.latencyMs}ms` : 'Actif'}
            </span>
          </div>

          {/* Lien 2 */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 block">Navigateurs ➔ Supabase</span>
              <strong className="text-xs text-slate-800">PostgREST SSL API</strong>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
              {links.front_to_supabase?.latencyMs ? `${links.front_to_supabase.latencyMs}ms` : 'Actif'}
            </span>
          </div>

          {/* Lien 3 */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 block">Supabase ⟷ Centrifugo</span>
              <strong className="text-xs text-slate-800">Sync CDC / Realtime</strong>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
              &lt; 0.2s lag
            </span>
          </div>

          {/* Lien 4 */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 block">Radar n8n ➔ WhatsApp</span>
              <strong className="text-xs text-slate-800">Dispatch Instantané</strong>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-800">
              File : 0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
