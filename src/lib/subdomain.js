/**
 * Utility for Subdomain-based & SPA-based Multi-App Routing in BricoleMoi
 * Supports real subdomains (e.g., client.bricolemoi.ma, maalem.bricolemoi.ma, admin.bricolemoi.ma)
 * and seamless zero-reload SPA transitions via History API and custom events.
 */

export const APP_SUBDOMAINS = {
  CLIENT: 'CLIENT',
  MAALEM: 'MAALEM',
  ADMIN: 'ADMIN',
  LANDING: 'LANDING'
};

export const getAppSubdomain = () => {
  if (typeof window === 'undefined') return APP_SUBDOMAINS.LANDING;

  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname.toLowerCase();

  // 1. Check URL Query Parameters (dev/test override: ?app=client | ?subdomain=maalem)
  const appParam = (searchParams.get('app') || searchParams.get('subdomain') || '').toUpperCase();
  if (appParam && APP_SUBDOMAINS[appParam]) {
    return APP_SUBDOMAINS[appParam];
  }

  // 2. Check URL Path Fallback (/client, /maalem, /admin)
  if (pathname.startsWith('/client')) return APP_SUBDOMAINS.CLIENT;
  if (pathname.startsWith('/maalem')) return APP_SUBDOMAINS.MAALEM;
  if (pathname.startsWith('/admin')) return APP_SUBDOMAINS.ADMIN;

  // 3. Check Subdomain Hostname (e.g. client.bricolemoi.ma, maalem.localhost, admin.bricolemoi.ma)
  const hostParts = hostname.split('.');

  if (hostParts.length > 1) {
    const sub = hostParts[0].toUpperCase();
    if (sub === 'CLIENT') return APP_SUBDOMAINS.CLIENT;
    if (sub === 'MAALEM') return APP_SUBDOMAINS.MAALEM;
    if (sub === 'ADMIN') return APP_SUBDOMAINS.ADMIN;
  }

  // Default to Root / Landing Page
  return APP_SUBDOMAINS.LANDING;
};

/**
 * Seamless SPA in-app router & navigation helper.
 * Pushes new URL to history without hard reload, stores context, and dispatches navigation event.
 */
export const switchSubdomainInDev = (targetApp, params = {}) => {
  if (typeof window === 'undefined') return;

  const validApp = APP_SUBDOMAINS[String(targetApp).toUpperCase()] || APP_SUBDOMAINS.LANDING;
  const url = new URL(window.location.href);
  url.searchParams.set('app', validApp.toLowerCase());

  // Store contextual navigation params (e.g. initial service category, city)
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });
    try {
      sessionStorage.setItem('bricolemoi_nav_context', JSON.stringify(params));
    } catch (e) {}
  }

  // Push state to browser history without white flash
  window.history.pushState({ app: validApp, params }, '', url.toString());

  // Dispatch custom navigation event for reactive listeners
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

