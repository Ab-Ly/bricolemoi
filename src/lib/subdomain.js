/**
 * Utility for Subdomain-based & SPA-based Clean Path Routing in BricoleMoi
 * Supports real subdomains (client.bricolemoi.ma, maalem.bricolemoi.ma, admin.bricolemoi.ma),
 * Clean Modern Paths (/client, /maalem, /admin, /plomberie...),
 * and seamless zero-reload SPA transitions via HTML5 History API.
 */

export const APP_SUBDOMAINS = {
  CLIENT: 'CLIENT',
  MAALEM: 'MAALEM',
  ADMIN: 'ADMIN',
  LANDING: 'LANDING'
};

// Mappage des raccourcis de liens directs (Deep Links Marketing & WhatsApp)
const CATEGORY_PATH_ALIASES = {
  '/plomberie': { app: 'CLIENT', category: 'PLUMBING' },
  '/plombier': { app: 'CLIENT', category: 'PLUMBING' },
  '/electricite': { app: 'CLIENT', category: 'ELECTRICIAN' },
  '/electricien': { app: 'CLIENT', category: 'ELECTRICIAN' },
  '/serrurerie': { app: 'CLIENT', category: 'SERRURERIE' },
  '/serrurier': { app: 'CLIENT', category: 'SERRURERIE' },
  '/climatisation': { app: 'CLIENT', category: 'CLIMATISATION' },
  '/clim': { app: 'CLIENT', category: 'CLIMATISATION' },
  '/auto': { app: 'CLIENT', category: 'AUTO_MECHANIC' },
  '/depannage-auto': { app: 'CLIENT', category: 'AUTO_MECHANIC' },
  '/volets': { app: 'CLIENT', category: 'VOLETS_RIDEAUX' },
  '/rideaux': { app: 'CLIENT', category: 'VOLETS_RIDEAUX' },
  '/demenagement': { app: 'CLIENT', category: 'DEMENAGEMENT' },
  '/electromenager': { app: 'CLIENT', category: 'APPLIANCE_REPAIR' }
};

export const getAppSubdomain = () => {
  if (typeof window === 'undefined') return APP_SUBDOMAINS.LANDING;

  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

  // 1. Détection des Raccourcis Directs de Catégories (SEO & Campagnes WhatsApp)
  if (CATEGORY_PATH_ALIASES[pathname]) {
    try {
      sessionStorage.setItem('bricolemoi_nav_context', JSON.stringify({
        category: CATEGORY_PATH_ALIASES[pathname].category
      }));
    } catch (e) {}
    return APP_SUBDOMAINS.CLIENT;
  }

  // 2. Détection par Clean Paths (/client, /maalem, /admin)
  if (pathname.startsWith('/client')) return APP_SUBDOMAINS.CLIENT;
  if (pathname.startsWith('/maalem') || pathname.startsWith('/pro') || pathname.startsWith('/artisan')) return APP_SUBDOMAINS.MAALEM;
  if (pathname.startsWith('/admin')) return APP_SUBDOMAINS.ADMIN;

  // 3. Détection par Sous-Domaine Réel (ex: client.bricolemoi.ma, maalem.bricolemoi.ma, admin.bricolemoi.ma)
  const hostParts = hostname.split('.');
  if (hostParts.length > 1) {
    const sub = hostParts[0].toUpperCase();
    if (sub === 'CLIENT') return APP_SUBDOMAINS.CLIENT;
    if (sub === 'MAALEM' || sub === 'PRO') return APP_SUBDOMAINS.MAALEM;
    if (sub === 'ADMIN') return APP_SUBDOMAINS.ADMIN;
  }

  // 4. Fallback Paramètres Query (Compatibilité ascendante ?app=client | ?subdomain=maalem)
  const appParam = (searchParams.get('app') || searchParams.get('subdomain') || '').toUpperCase();
  if (appParam && APP_SUBDOMAINS[appParam]) {
    return APP_SUBDOMAINS[appParam];
  }

  // Par défaut : Page d'Accueil (Landing Page)
  return APP_SUBDOMAINS.LANDING;
};

/**
 * Routeur SPA Moderne & Élégant (Clean Path Navigation)
 * Change l'URL sans rechargement de page et sans paramètres parasites.
 */
export const switchSubdomainInDev = (targetApp, params = {}) => {
  if (typeof window === 'undefined') return;

  const validApp = APP_SUBDOMAINS[String(targetApp).toUpperCase()] || APP_SUBDOMAINS.LANDING;

  // Déterminer le Clean Path correspondant
  let newPath = '/';
  if (validApp === APP_SUBDOMAINS.CLIENT) newPath = '/client';
  else if (validApp === APP_SUBDOMAINS.MAALEM) newPath = '/maalem';
  else if (validApp === APP_SUBDOMAINS.ADMIN) newPath = '/admin';

  // Conserver le contexte de navigation sans polluer la barre d'adresse
  if (params && typeof params === 'object' && Object.keys(params).length > 0) {
    try {
      sessionStorage.setItem('bricolemoi_nav_context', JSON.stringify(params));
    } catch (e) {}
  }

  // Mise à jour propre de l'historique du navigateur
  window.history.pushState({ app: validApp, params }, '', newPath);

  // Émission de l'événement de navigation réactif
  window.dispatchEvent(
    new CustomEvent('bricolemoi_navigate', {
      detail: { app: validApp, params }
    })
  );
};

export const getNavContext = () => {
  try {
    const raw = sessionStorage.getItem('bricolemoi_nav_context');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};
