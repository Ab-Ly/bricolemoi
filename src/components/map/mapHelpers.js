/**
 * Utilitaires géométriques et templates SVG pour la cartographie
 */

export const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
};

export const computeBearing = (lat1, lng1, lat2, lng2) => {
  const y = Math.sin(((lng2 - lng1) * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(((lng2 - lng1) * Math.PI) / 180);
  const b = (Math.atan2(y, x) * 180) / Math.PI;
  return (b + 360) % 360;
};

export const MAP_ICONS_SVG = {
  PLUMBING: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.2"/>
    </svg>
  `,
  ELECTRICIAN: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#d97706" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  CLIMATISATION: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12H22M12 2V22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#0284c7" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  SERRURERIE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 7C13.66 7 15 8.34 15 10C15 11.23 14.26 12.28 13.2 12.74L14.5 17H12.5L12 15H11L10.5 17H8.5L9.8 12.74C8.74 12.28 8 11.23 8 10C8 8.34 9.34 7 12 7Z" fill="#059669" stroke="#047857" stroke-width="1.2"/>
    </svg>
  `,
  DEFAULT: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
      <path d="M12 7V13L16 15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `
};

export const getMapIconSvg = (specialty) => {
  const spec = String(specialty || '').toUpperCase();
  if (spec.includes('PLUMB') || spec.includes('PLOMB')) return MAP_ICONS_SVG.PLUMBING;
  if (spec.includes('ELECTR')) return MAP_ICONS_SVG.ELECTRICIAN;
  if (spec.includes('CLIM')) return MAP_ICONS_SVG.CLIMATISATION;
  if (spec.includes('SERRUR')) return MAP_ICONS_SVG.SERRURERIE;
  return MAP_ICONS_SVG.DEFAULT;
};

export const renderMaalemPopupHtml = ({ maalem, isSelf, distanceKm, etaMin }) => {
  const name = maalem.full_name || 'Artisan Maâlem';
  const phone = maalem.phone || '';
  const spec = maalem.specialty || 'Dépannage';
  const district = maalem.district || maalem.city_zone || 'Casablanca';

  return `
    <div class="bg-white/95 backdrop-blur-xl border border-slate-200 p-3.5 min-w-[220px] rounded-2xl shadow-xl font-sans text-slate-800 space-y-2">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span class="font-black text-xs text-slate-900">${name}</span>
        </div>
        ${isSelf ? '<span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[9px] font-black">VOUS</span>' : ''}
      </div>
      <div class="text-[11px] text-slate-600 space-y-0.5">
        <p>🛠️ Spécialité : <strong class="text-slate-900">${spec}</strong></p>
        <p>📍 Secteur : <strong class="text-slate-900">${district}</strong></p>
        <div class="flex items-center justify-between pt-1 border-t border-slate-100 font-mono text-[10px]">
          <span>Distance : <strong>${distanceKm} km</strong></span>
          <span class="text-emerald-700 font-bold">~${etaMin} min</span>
        </div>
      </div>
      ${phone ? `<a href="tel:${phone}" class="block w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center text-xs rounded-xl shadow-xs transition-colors">📞 Appeler Direct</a>` : ''}
    </div>
  `;
};

export const renderTrackingPopupHtml = ({ maalem, etaSummary, distanceKm, durationMin }) => {
  const name = maalem?.full_name || 'Maâlem BricoleMoi';
  const phone = maalem?.phone || '';
  return `
    <div class="bg-white/95 backdrop-blur-xl border border-amber-300 p-3.5 min-w-[230px] rounded-2xl shadow-xl font-sans text-slate-800 space-y-2">
      <div class="flex items-center justify-between border-b border-amber-100 pb-2">
        <span class="font-black text-xs text-amber-900 flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span>
          En route vers vous
        </span>
        <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono font-black text-[10px]">${durationMin || '~10'} min</span>
      </div>
      <div class="text-[11px] text-slate-600 space-y-0.5">
        <p class="font-bold text-slate-900">🛠️ ${name}</p>
        <p class="text-[10px] text-slate-500">${etaSummary || 'En déplacement'}</p>
      </div>
      ${phone ? `<a href="tel:${phone}" class="block w-full py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-center text-xs rounded-xl shadow-xs">📞 Contacter l'Artisan</a>` : ''}
    </div>
  `;
};
