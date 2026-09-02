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
 * Générateur officiel d'identifiant PocketBase (15 caractères alphanumériques [a-z0-9])
 * 100% compatible avec l'ID natif PocketBase côté client (offline/optimistic)
 */
export function generatePbId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(15);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < 15; i++) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  }
  for (let i = 0; i < 15; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Normalise un identifiant vers le standard natif 15 caractères PocketBase
 * Préserve fidèlement les IDs PocketBase existants et convertit les anciens UUIDs
 */
export function toPbId(idOrUuid) {
  if (!idOrUuid) return '';
  const s = String(idOrUuid).trim().toLowerCase();
  // Si c'est déjà un ID PocketBase standard 15 chars alphanumériques
  if (/^[a-z0-9]{15}$/.test(s)) {
    return s;
  }
  // Pour les anciens UUIDs 36 chars ou chaînes externes
  const clean = s.replace(/[^a-z0-9]/g, '');
  return clean.slice(0, 15).padEnd(15, '0');
}

