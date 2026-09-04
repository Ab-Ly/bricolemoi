import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminSystemHealthMatrix } from '../components/admin/AdminSystemHealthMatrix';
import { AdminRealtimeConsole } from '../components/admin/AdminRealtimeConsole';
import { 
  Server, 
  Terminal, 
  Activity, 
  Lock, 
  KeyRound, 
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
  ShieldAlert,
  ShieldCheck,
  Menu,
  X,
  Search,
  ChevronRight,
  LogOut,
  LayoutDashboard
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

const NAV_ITEMS = [
  {
    id: 'ALL',
    label: 'Tableau de Bord 360°',
    shortLabel: 'Vue 360°',
    icon: LayoutDashboard,
    badge: 'Global'
  },
  {
    id: 'KEYRING',
    label: 'Trousseau Identifiants',
    shortLabel: 'Trousseau',
    icon: Key,
    badge: `${DEVOPS_KEYRING.length}`,
    badgeColor: 'amber'
  },
  {
    id: 'SERVICES',
    label: 'Raccourcis Serveur',
    shortLabel: 'Services VPS',
    icon: Layers,
    badge: `${DEVOPS_SERVICES.length}`,
    badgeColor: 'blue'
  },
  {
    id: 'MONITORING',
    label: 'Monitoring Beszel',
    shortLabel: 'Monitoring',
    icon: Gauge,
    badge: 'VPS Live',
    badgeColor: 'emerald'
  },
  {
    id: 'MATRIX',
    label: 'Santé Infrastructure',
    shortLabel: 'Matrice 5 Nœuds',
    icon: Server,
    badge: '5 Nœuds',
    badgeColor: 'blue'
  },
  {
    id: 'CONSOLE',
    label: 'Console WebSocket',
    shortLabel: 'Console Live',
    icon: Radio,
    badge: 'Centrifugo',
    badgeColor: 'emerald'
  }
];

export const ITApp = () => {
  const { user, currentRole } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Navigation active
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'KEYRING' | 'SERVICES' | 'MONITORING' | 'MATRIX' | 'CONSOLE'
  
  // Contrôle du Menu Déroulant / Sidebar Mobile & Desktop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [keyringSearch, setKeyringSearch] = useState('');

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
      const cleanPin = pinInput.trim();
      const ADMIN_PIN = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PIN) || 'admin2026';
      if (cleanPin !== ADMIN_PIN && cleanPin !== 'admin2026' && cleanPin !== '2026') {
        throw new Error('Code PIN administrateur incorrect.');
      }
      setIsPinAuthenticated(true);
      sessionStorage.setItem('bricolemoi_admin_pin_ok', 'true');
    } catch (err) {
      setErrorMsg(err.message || 'Code PIN administrateur incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLockCockpit = () => {
    sessionStorage.removeItem('bricolemoi_admin_pin_ok');
    setIsPinAuthenticated(false);
    setPinInput('');
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

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredKeyring = useMemo(() => {
    if (!keyringSearch.trim()) return DEVOPS_KEYRING;
    const q = keyringSearch.toLowerCase().trim();
    return DEVOPS_KEYRING.filter(k => 
      k.name.toLowerCase().includes(q) ||
      k.category.toLowerCase().includes(q) ||
      k.loginValue.toLowerCase().includes(q) ||
      k.notes.toLowerCase().includes(q) ||
      k.url.toLowerCase().includes(q)
    );
  }, [keyringSearch]);

  const currentNav = NAV_ITEMS.find(n => n.id === activeTab) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header DevOps & IT Sticky */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Gauche : Bouton Hamburger Mobile + Titre Cockpit */}
          <div className="flex items-center gap-2.5">
            {isPinAuthenticated && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center cursor-pointer transition-all active:scale-95 touch-target-44"
                title="Ouvrir le menu de navigation IT"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 font-mono flex items-center gap-1.5">
                    <span>COCKPIT IT</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline text-blue-700">OBSERVABILITÉ</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    DEVOPS
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono truncate max-w-[200px] sm:max-w-none">
                  VPS OVH Debian • 51.255.46.206
                </p>
              </div>
            </div>
          </div>

          {/* Droite : Statut VPS & Actions Rapides */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>VPS : 51.255.46.206</span>
            </div>

            <button
              type="button"
              onClick={() => switchSubdomainInDev('ADMIN')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Vue Métier Admin</span>
              <span className="sm:hidden">Admin</span>
            </button>

            {isPinAuthenticated && (
              <button
                type="button"
                onClick={handleLockCockpit}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                title="Verrouiller le cockpit IT"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verrouiller</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Body avec Sidebar Latérale & Contenu */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* SIDEBAR LATÉRALE DÉROULANTE (DESKTOP & MOBILE DRAWER) */}
        {isPinAuthenticated && (
          <>
            {/* Backdrop sombre sur mobile */}
            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Menu Latéral Déroulant / Sidebar Drawer */}
            <aside 
              className={`
                fixed lg:sticky top-0 lg:top-[57px] h-screen lg:h-[calc(100vh-57px)]
                w-72 sm:w-80 lg:w-64 bg-white border-r border-slate-200/90 z-50 lg:z-10
                flex flex-col justify-between p-4 shadow-xl lg:shadow-none
                transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}
            >
              <div className="space-y-4">
                {/* En-tête tiroir mobile */}
                <div className="flex items-center justify-between lg:hidden border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-600" />
                    <span className="font-mono font-black text-xs text-slate-900">MENU NAVIGATION IT</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                  SECTIONS &amp; OBSERVABILITÉ
                </div>

                {/* Liste des liens de navigation avec badges */}
                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectTab(item.id)}
                        className={`
                          w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left
                          ${isActive 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black' 
                            : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'}
                        `}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span 
                            className={`
                              px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0
                              ${isActive 
                                ? 'bg-white/20 text-white' 
                                : item.badgeColor === 'amber'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                                : item.badgeColor === 'emerald'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                                : 'bg-slate-100 text-slate-600 border border-slate-200/80'}
                            `}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Pied de sidebar : État Serveur & Raccourci SSH */}
              <div className="pt-4 border-t border-slate-100 space-y-2 font-mono text-[11px]">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                    <span>HÔTE DEBIAN 12</span>
                    <span className="text-emerald-700">● 100% UP</span>
                  </div>
                  <div className="font-bold text-slate-800 text-xs truncate">
                    51.255.46.206
                  </div>
                </div>

                <a
                  href="https://pocketbase.51.255.46.206.sslip.io/_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    <span>PocketBase Admin</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </aside>
          </>
        )}

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 min-w-0 px-3 sm:px-6 py-4 sm:py-6 pb-24 overflow-x-hidden">
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
                      maxLength={16}
                      placeholder="2026 ou admin2026"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-center text-lg font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-bold text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || pinInput.trim().length < 4}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
                >
                  {isSubmitting ? 'Authentification...' : 'Déverrouiller le Cockpit IT'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* En-tête de section actif avec fil d'ariane & switch mobile rapide */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                    {React.createElement(currentNav.icon, { className: 'w-4 h-4' })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>COCKPIT IT</span>
                      <span>/</span>
                      <span className="font-bold text-blue-700 uppercase">{currentNav.label}</span>
                    </div>
                    <h2 className="text-sm sm:text-base font-black text-slate-900">
                      {currentNav.label}
                    </h2>
                  </div>
                </div>

                {/* Bouton pour ouvrir le menu déroulant sur mobile */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden w-full sm:w-auto py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Menu className="w-4 h-4 text-blue-600" />
                  <span>Changer de section ({NAV_ITEMS.length} rubriques)</span>
                </button>
              </div>

              {/* 🔑 SECTION : TROUSSEAU DE LOGINS & MOTS DE PASSE (DEVOPS KEYRING) */}
              {(activeTab === 'ALL' || activeTab === 'KEYRING') && (
                <div className="space-y-3.5 bg-gradient-to-br from-amber-50/40 via-white to-slate-50 border border-amber-200/70 rounded-3xl p-4 sm:p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                        <Key className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2 font-mono">
                          TROUSSEAU D'ACCÈS SÉCURISÉ &amp; IDENTIFIANTS ({filteredKeyring.length})
                        </h3>
                        <p className="text-xs text-slate-500">
                          Identifiants, mots de passe et commandes SSH avec copie en 1 clic.
                        </p>
                      </div>
                    </div>

                    {/* Barre de recherche instantanée dans le trousseau */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Rechercher login, service..."
                        value={keyringSearch}
                        onChange={(e) => setKeyringSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 shadow-2xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredKeyring.map((item) => {
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

                            <h4 className="text-sm font-bold text-slate-900">
                              {item.name}
                            </h4>

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
                            <span className="text-[11px] text-slate-500 italic truncate max-w-[200px]">
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
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                        Hub des Raccourcis Directs &amp; Services Déployés
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">Hôte : 51.255.46.206</span>
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
                              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
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
                              <h4 className="text-sm font-black text-slate-900 mt-0.5 tracking-tight">
                                {srv.name}
                              </h4>
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

                  {/* Console de bord Beszel Hub : Accès Sécurisé Direct */}
                  <div className="border border-slate-200 rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-slate-50 to-white space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider">
                            CONSOLE BESZEL HUB v0.8.0 • DOCKER CONTAINER
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                            PORT 8095 OPÉRATIONNEL
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Surveillance temps réel de l'infrastructure matérielle : CPU multi-cœurs, mémoire RAM, I/O disque NVMe et conteneurs.
                        </p>
                      </div>

                      <a
                        href="http://51.255.46.206:8095"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Ouvrir le Hub Beszel en Plein Écran</span>
                      </a>
                    </div>

                    {/* Identifiants d'accès rapide Beszel */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">URL Console</span>
                          <code className="text-xs font-mono font-bold text-slate-800">51.255.46.206:8095</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('http://51.255.46.206:8095', 'beszel-url')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Copier l'URL"
                        >
                          {copiedKey === 'beszel-url' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Identifiant</span>
                          <code className="text-xs font-mono font-bold text-slate-800">admin@bricolemoi.ma</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('admin@bricolemoi.ma', 'beszel-email')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Copier l'email"
                        >
                          {copiedKey === 'beszel-email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Mot de Passe</span>
                          <code className="text-xs font-mono font-bold text-slate-800">Ali15091985@@</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('Ali15091985@@', 'beszel-pwd')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Copier le mot de passe"
                        >
                          {copiedKey === 'beszel-pwd' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-[11px] leading-relaxed">
                        <strong>Sécurité navigateur :</strong> Beszel interdit l'intégration directe en iframe (<code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">X-Frame-Options: SAMEORIGIN</code>). Cliquez sur le bouton vert ci-dessus pour ouvrir le tableau de bord complet dans un onglet dédié.
                      </span>
                    </div>
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
    </div>
  );
};
