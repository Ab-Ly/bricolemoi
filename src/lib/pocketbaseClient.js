import PocketBase from 'pocketbase';

export const DEFAULT_POCKETBASE_URL = 'https://pocketbase.51.255.46.206.sslip.io';

export const pocketbaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_POCKETBASE_URL) ||
  DEFAULT_POCKETBASE_URL;

export const pb = new PocketBase(pocketbaseUrl);

// Reconnexion automatique et persistance locale
pb.autoCancellation(false);

export const isPocketBaseConfigured = Boolean(
  pocketbaseUrl && !pocketbaseUrl.includes('placeholder')
);

/**
 * Convertit un UUID standard (36 chars) en identifiant déterministe 15 caractères PocketBase
 */
export function toPbId(uuid) {
  if (!uuid) return '';
  const clean = String(uuid).toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean.slice(0, 15).padEnd(15, '0');
}
