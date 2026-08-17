/**
 * Utility for Subdomain-based Multi-App Routing in BricoleMoi
 * Detects domain hostname (e.g., client.bricolemoi.ma, maalem.bricolemoi.ma, admin.bricolemoi.ma)
 * or fallback search params / path routes in dev mode.
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

export const switchSubdomainInDev = (targetApp) => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('app', targetApp.toLowerCase());
  window.location.href = url.toString();
};
