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
  HardDrive,
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  Cloud,
  ShieldAlert
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

// 🔑 TROUSSEAU D'ACCÈS SÉCURISÉ & IDENTIFIANTS (DEVOPS VAULT)
const DEVOPS_KEYRING = [
  {
    id: 'ssh-vps',
    name: 'Serveur VPS OVH (Accès SSH & Root)',
    category: 'INFRASTRUCTURE',
    url: '51.255.46.206:22',
    isUrl: false,
    cmdSnippet: 'ssh debian@51.255.46.206',
    loginLabel: 'Utilisateur SSH',
    loginValue: 'debian',
    secretLabel: 'Mot de passe Sudo',
    secretValue: 'Ali15091985@@',
    badge: 'Port 22 • Debian 12',
    notes: 'Accès console administrateur système OVH Gravelines.'
  },
  {
    id: 'pocketbase-admin',
    name: 'PocketBase Admin Dashboard',
    category: 'BASE DE DONNÉES',
    url: 'https://pocketbase.51.255.46.206.sslip.io/_/',
    isUrl: true,
    loginLabel: 'Superuser Email',
    loginValue: 'admin@bricolemoi.ma',
    secretLabel: 'Mot de passe Superuser',
    secretValue: 'BricoleMoi2026!Securise',
    badge: 'Port 8090 • SSL Let\'s Encrypt',
    notes: 'Console centrale des collections SQL et gestion des règles d\'API.'
  },
  {
    id: 'coolify-panel',
    name: 'Coolify Platform PaaS',
    category: 'ORCHESTRATION',
    url: 'http://51.255.46.206:8000',
    isUrl: true,
    loginLabel: 'Email Administrateur',
    loginValue: 'admin@bricolemoi.ma',
    secretLabel: 'Mot de passe Coolify',
    secretValue: 'Ali15091985@@',
    badge: 'Port 8000 • Traefik v3.6',
    notes: 'Gestion des 17 conteneurs Docker, bases de données et proxies.'
  },
  {
    id: 'beszel-hub',
    name: 'Beszel Monitoring VPS',
    category: 'SURVEILLANCE',
    url: 'http://51.255.46.206:8095',
    isUrl: true,
    loginLabel: 'Email de Connexion',
    loginValue: 'abdelalilyoussefi@gmail.com',
    secretLabel: 'Port Écoute Agent',
    secretValue: '45876',
    badge: 'Port 8095 • Agent 45876',
    notes: 'Monitoring CPU, RAM, Disque et conteneurs Docker en temps réel.'
  },
  {
    id: 'evolution-whatsapp',
    name: 'Evolution API (WhatsApp Business Gateway)',
    category: 'MESSAGERIE',
    url: 'http://51.255.46.206:8085',
    isUrl: true,
    loginLabel: 'Instance Active',
    loginValue: 'bricolemoi-otp',
    secretLabel: 'Global API Key',
    secretValue: 'bricolemoi_secret_token_2026',
    badge: 'Port 8085 • WhatsApp v2',
    notes: 'Passerelle d\'envoi de SMS OTP et d\'alertes chantiers Maâlems.'
  },
  {
    id: 'n8n-workflows',
    name: 'n8n Workflows Engine',
    category: 'AUTOMATISATION',
    url: 'http://n8n-nfyfefwxs67boyv7oeeu02s4.51.255.46.206.sslip.io:5678',
    isUrl: true,
    loginLabel: 'Webhook Radar',
    loginValue: '/webhook/bricolemoi-booking-radar',
    secretLabel: 'Port Interne',
    secretValue: '5678',
    badge: 'Port 5678 • No-Code Engine',
    notes: 'Dispatching géographique des demandes SOS dans un rayon de 8 km.'
  },
  {
    id: 'prelude-otp',
    name: 'Prelude.so Verification Gateway',
    category: 'AUTHENTIFICATION',
    url: 'https://prelude.so',
    isUrl: true,
    loginLabel: 'Fournisseur Primaire',
    loginValue: 'Prelude SMS & WhatsApp',
    secretLabel: 'API Secret Key',
    secretValue: 'sk_72Xju0Hj6c3evZiDyrQJ0alDnxPiLDaZ',
    badge: 'OTP Cloud • Haute Délivrabilité',
    notes: 'Service mondial de validation de numéros de téléphone par SMS et WhatsApp.'
  },
  {
    id: 'cloudflare-r2',
    name: 'Cloudflare R2 (Stockage Médias)',
    category: 'STOCKAGE CLOUD',
    url: 'https://pub-e32b5a8e3eb24da59b44606366d761d7.r2.dev',
    isUrl: true,
    loginLabel: 'Bucket Name',
    loginValue: 'bricolemoi-media',
    secretLabel: 'Frais Egress Sortants',
    secretValue: '0.00 DH (Gratuit à vie)',
    badge: 'S3 Compatible • Zero Egress Fee',
    notes: 'Stockage des enregistrements vocaux SOS et photos chantiers WebP.'
  }
];

export const ITApp = () => {
  const { user, currentRole, loginAdminWithCredentials } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'KEYRING' | 'SERVICES' | 'MONITORING' | 'MATRIX' | 'CONSOLE'

  // État local pour révéler les secrets du trousseau (masqué par défaut)
  const [visibleSecrets, setVisibleSecrets] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

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

  const toggleSecretVisibility = (id) => {
    setVisibleSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, keyId) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
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
                Espace sécurisé : trousseau de mots de passe, monitoring Beszel et supervision technique.
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
                  onClick={() => setActiveTab('KEYRING')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'KEYRING'
                      ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  <span>🔑 Trousseau de Logins ({DEVOPS_KEYRING.length})</span>
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
                <span className="font-bold text-slate-700">Trousseau Chiffré • Accès Protégé</span>
              </div>
            </div>

            {/* 🔑 SECTION : TROUSSEAU DE LOGINS & MOTS DE PASSE (DEVOPS KEYRING) */}
            {(activeTab === 'ALL' || activeTab === 'KEYRING') && (
              <div className="space-y-3.5 bg-gradient-to-br from-amber-50/40 via-white to-slate-50 border border-amber-200/70 rounded-3xl p-4 sm:p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2 font-mono">
                        TROUSSEAU D'ACCÈS SÉCURISÉ &amp; IDENTIFIANTS
                      </h2>
                      <p className="text-xs text-slate-500">
                        Tous vos identifiants, mots de passe et commandes SSH avec copie en 1 clic et liens directs.
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
                    🔒 Masquage Actif (Eye Toggle)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {DEVOPS_KEYRING.map((item) => {
                    const isSecretShown = Boolean(visibleSecrets[item.id]);

                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                              {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {item.badge}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900">
                            {item.name}
                          </h3>

                          {/* Ligne 1 : Login / Identifiant */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono text-slate-400 block">{item.loginLabel}</span>
                              <span className="text-xs font-mono font-bold text-slate-800 truncate block">
                                {item.loginValue}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => copyToClipboard(item.loginValue, `${item.id}-login`)}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer"
                              title="Copier l'identifiant"
                            >
                              {copiedKey === `${item.id}-login` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-[10px] text-emerald-700 font-bold">Copié</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  <span className="text-[10px]">Copier</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Ligne 2 : Mot de passe ou Clé secrète */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono text-slate-400 block">{item.secretLabel}</span>
                              <span className="text-xs font-mono font-bold text-slate-800 truncate block">
                                {isSecretShown ? item.secretValue : '••••••••••••••••'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleSecretVisibility(item.id)}
                                className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg shadow-xs transition-all cursor-pointer"
                                title={isSecretShown ? 'Masquer' : 'Afficher le mot de passe'}
                              >
                                {isSecretShown ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                              </button>

                              <button
                                type="button"
                                onClick={() => copyToClipboard(item.secretValue, `${item.id}-secret`)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer"
                                title="Copier le mot de passe"
                              >
                                {copiedKey === `${item.id}-secret` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-[10px] text-emerald-700 font-bold">Copié</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="text-[10px]">Copier</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Snippet SSH optionnel */}
                          {item.cmdSnippet && (
                            <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-700">
                              <code className="truncate">{item.cmdSnippet}</code>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(item.cmdSnippet, `${item.id}-cmd`)}
                                className="text-blue-600 hover:text-blue-700 font-bold ml-2 shrink-0 cursor-pointer"
                              >
                                {copiedKey === `${item.id}-cmd` ? '✓' : 'Copier'}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Footer Carte : Lien Direct */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 italic truncate max-w-[220px]">
                            {item.notes}
                          </span>

                          {item.isUrl ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <span>Ouvrir</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-400">Terminal SSH</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
