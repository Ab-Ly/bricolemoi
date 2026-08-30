import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminSystemHealthMatrix } from '../components/admin/AdminSystemHealthMatrix';
import { AdminRealtimeConsole } from '../components/admin/AdminRealtimeConsole';
import { 
  Server, 
  Terminal, 
  Activity, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  ArrowLeft, 
  Radio, 
  CheckCircle2,
  Cpu,
  ExternalLink,
  Zap,
  Gauge,
  Layers,
  Database,
  MessageSquare,
  Workflow,
  MapPin,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { switchSubdomainInDev } from '../lib/subdomain';

const DEVOPS_SERVICES = [
  {
    id: 'coolify',
    name: 'Coolify Platform',
    category: 'PAAS & ORCHESTRATION',
    url: 'http://51.255.46.206:8000',
    port: '8000',
    icon: Layers,
    color: 'purple',
    badge: 'Conteneurs & Traefik',
    desc: 'Gestion des builds, variables d\'environnement et certificats SSL.'
  },
  {
    id: 'pocketbase',
    name: 'PocketBase Core',
    category: 'BASE DE DONNÉES & AUTH',
    url: 'https://pocketbase.51.255.46.206.sslip.io/_/',
    port: '8090',
    icon: Database,
    color: 'blue',
    badge: 'SQL & Superusers',
    desc: 'Collections profiles, interventions, transactions et règles de sécurité.'
  },
  {
    id: 'beszel',
    name: 'Beszel Monitoring VPS',
    category: 'MÉTRIQUES MATÉRIELLES',
    url: 'http://51.255.46.206:8095',
    port: '8095',
    icon: Gauge,
    color: 'emerald',
    badge: 'CPU • RAM • Disque',
    desc: 'Monitoring ultra-léger en direct du VPS OVH et des conteneurs Docker.'
  },
  {
    id: 'evolution',
    name: 'Evolution API WhatsApp',
    category: 'MESSAGERIE & NOTIFICATIONS',
    url: 'http://51.255.46.206:8085',
    port: '8085',
    icon: MessageSquare,
    color: 'emerald',
    badge: 'WhatsApp Business API',
    desc: 'Passerelle WhatsApp souveraine, QR Codes de session et Webhooks.'
  },
  {
    id: 'n8n',
    name: 'n8n Workflows Engine',
    category: 'AUTOMATISATION CRM',
    url: 'http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io:5678',
    port: '5678',
    icon: Workflow,
    color: 'amber',
    badge: 'Scénarios No-Code',
    desc: 'Déclencheurs automatiques, rappels SMS/WhatsApp et synchronisation.'
  },
  {
    id: 'tileserver',
    name: 'TileServer GL Maroc',
    category: 'CARTOGRAPHIE SOUVERAINE',
    url: 'https://tiles.51.255.46.206.sslip.io:8080',
    port: '8086',
    icon: MapPin,
    color: 'rose',
    badge: 'Tuiles Vectorielles',
    desc: 'Serveur de cartographie marocaine locale rapide et autonome.'
  }
];

export const ITApp = () => {
  const { user, currentRole, loginAdminWithCredentials } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'SERVICES' | 'MONITORING' | 'MATRIX' | 'CONSOLE'

  const [isPinAuthenticated, setIsPinAuthenticated] = useState(
    () => currentRole === 'ADMIN' || user?.role?.toUpperCase() === 'ADMIN'
      || sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
  );

  useEffect(() => {
    if (
      currentRole === 'ADMIN' ||
      user?.role?.toUpperCase() === 'ADMIN' ||
      sessionStorage.getItem('bricolemoi_admin_pin_ok') === 'true'
    ) {
      setIsPinAuthenticated(true);
    }
  }, [currentRole, user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setErrorMsg('Veuillez saisir votre code PIN administrateur.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await loginAdminWithCredentials('admin@bricolemoi.ma', '', pinInput);
      setIsPinAuthenticated(true);
      sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
    } catch (err) {
      setErrorMsg(err.message || 'Code PIN administrateur incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. Header DevOps & IT — 100% Modern Clean & Trust */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-3 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 flex items-center gap-2 font-mono">
                    BRICOLEMOI • COCKPIT IT & OBSERVABILITÉ
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    DEVOPS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  VPS OVH Debian • PocketBase (8090) • Beszel (8095) • Coolify (8000)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => switchSubdomainInDev('ADMIN')}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>VPS : 51.255.46.206 (Opérationnel)</span>
            </div>

            <button
              type="button"
              onClick={() => switchSubdomainInDev('ADMIN')}
              className="hidden sm:flex px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Retour Vue Métier Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content — Fond Clair & Cartes Blanches Lumineuses */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-20">
        {!isPinAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Accès Ingénierie &amp; IT</h2>
              <p className="text-xs text-slate-500 mt-1">
                Espace réservé à l'infrastructure technique, au monitoring Beszel et à l'observabilité temps réel.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Code PIN de Sécurité Administrateur
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-center text-lg font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 font-bold text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || pinInput.length !== 4}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
              >
                {isSubmitting ? 'Authentification...' : 'Déverrouiller le Cockpit IT'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contrôle de vue dédié (Sous-onglets IT — Clean Light) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === 'ALL'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vue Complète
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('SERVICES')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === 'SERVICES'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Raccourcis Serveur ({DEVOPS_SERVICES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('MONITORING')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === 'MONITORING'
                      ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monitoring Beszel (VPS)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('MATRIX')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === 'MATRIX'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Santé 5 Nœuds
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('CONSOLE')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === 'CONSOLE'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Console Live
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-700">Docker Engine 27.x • 17 Conteneurs</span>
              </div>
            </div>

            {/* SECTION 1 : GRILLE DES RACCOURCIS DIRECTS CLOUD & VPS */}
            {(activeTab === 'ALL' || activeTab === 'SERVICES') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Hub des Raccourcis Directs & Services Déployés
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Hôte VPS OVH : 51.255.46.206</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {DEVOPS_SERVICES.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <div
                        key={srv.id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className={`w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              Port {srv.port}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                              {srv.category}
                            </span>
                            <h3 className="text-sm font-black text-slate-900 mt-0.5 tracking-tight">
                              {srv.name}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {srv.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {srv.badge}
                          </span>
                          <a
                            href={srv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <span>Ouvrir</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2 : MONITORING MATÉRIEL BESZEL */}
            {(activeTab === 'ALL' || activeTab === 'MONITORING') && (
              <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <Gauge className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono">MONITORING DU VPS EN DIRECT (BESZEL HUB PORT 8095)</span>
                  </div>

                  <a
                    href="http://51.255.46.206:8095"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-200 transition-all shadow-xs"
                  >
                    <span>Plein Écran Beszel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>CPU &amp; Charge Système</span>
                    </div>
                    <p className="text-lg font-black font-mono text-slate-900">4 vCores OVH</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Charge optimale (&lt; 20% en continu)</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>Mémoire RAM Vive</span>
                    </div>
                    <p className="text-lg font-black font-mono text-slate-900">8.0 Go DDR4</p>
                    <p className="text-[11px] text-emerald-700 font-bold mt-0.5">~3.2 Go alloués aux conteneurs</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                      <HardDrive className="w-4 h-4 text-purple-600" />
                      <span>Stockage SSD NVMe</span>
                    </div>
                    <p className="text-lg font-black font-mono text-slate-900">80 Go NVMe</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Volumes Docker persistants</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
                    <span>Console de bord Beszel intégrée (http://51.255.46.206:8095)</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Actif
                    </span>
                  </div>
                  <iframe
                    src="http://51.255.46.206:8095"
                    title="Beszel Monitoring Hub"
                    className="w-full h-[460px] border-0 bg-white"
                  />
                </div>
              </div>
            )}

            {/* SECTION 3 : MATRICE DE SANTÉ INFRASTRUCTURE (5 NŒUDS) */}
            {(activeTab === 'ALL' || activeTab === 'MATRIX') && (
              <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                    <Server className="w-4 h-4 text-blue-600" />
                    <span>SUPERVISION DE L'INFRASTRUCTURE (5 NŒUDS CLOUD)</span>
                  </div>
                </div>
                <AdminSystemHealthMatrix />
              </div>
            )}

            {/* SECTION 4 : CONSOLE WEBSOCKET EN DIRECT */}
            {(activeTab === 'ALL' || activeTab === 'CONSOLE') && (
              <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>FLUX DE MESSAGERIE TEMPS RÉEL (CENTRIFUGO VPS STREAM)</span>
                  </div>
                </div>
                <AdminRealtimeConsole />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
