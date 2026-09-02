/**
 * Configuration des styles cartographiques et palettes de couleurs haute lisibilité
 * Système 100% libre de droits, zéro clé d'API requise, sans filigrane.
 */

export const MAP_STYLES = {
  OSM_FR: {
    id: 'OSM_FR',
    name: 'Plan Urbain HD Maroc (Rues Nommées & Bâtiments)',
    tiles: [
      'https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
    ],
    attribution: '&copy; OpenStreetMap France & contributeurs'
  },
  OSM_HOT: {
    id: 'OSM_HOT',
    name: 'OSM Humanitarian Hot (Épuré Pastel)',
    tiles: [
      'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    ],
    attribution: '&copy; OpenStreetMap contributors, Humanitarian OSM'
  },
  ESRI_STREETS: {
    id: 'ESRI_STREETS',
    name: 'Esri World Streets HD (Officiel & Détaillé)',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    ],
    attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap'
  },
  VPS_DEDICATED: {
    id: 'VPS_DEDICATED',
    name: 'Serveur Dédié VPS BricoleMoi (Ultra-Rapide)',
    tiles: [
      '/tiles-proxy/styles/basic-preview/{z}/{x}/{y}.png'
    ],
    attribution: '&copy; BricoleMoi Dedicated VPS &copy; OpenMapTiles'
  },
  SATELLITE: {
    id: 'SATELLITE',
    name: 'Vue Satellite HD (Bâtiments réels)',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    ],
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  }
};

export const ROAD_COLOR_THEMES = [
  { id: 'GOLD_CYAN', label: 'Doré & Cyan (Haute Clarté)', iconColor: 'bg-amber-400', desc: 'Grands axes dorés et rues nettes' },
  { id: 'NEON_CYBER', label: 'Néon Cyberpunk (Sombre)', iconColor: 'bg-cyan-400', desc: 'Radar de nuit avec routes fluorescentes' },
  { id: 'SILVER_SLATE', label: 'Silver Épuré (Minimaliste)', iconColor: 'bg-slate-300', desc: 'Rendu monochrome moderne' },
  { id: 'NATURAL', label: 'Couleurs Naturelles (Standard)', iconColor: 'bg-emerald-400', desc: 'Rendu topographique officiel' }
];

export const getMapStyleJson = (styleKey) => {
  const cfg = MAP_STYLES[styleKey] || MAP_STYLES.OSM_FR;
  const isRetina = typeof window !== 'undefined' && (window.devicePixelRatio || 1) > 1.25;
  const tileUrls = cfg.tiles.map((t) => t.replace('{r}', isRetina ? '@2x' : ''));
  return {
    version: 8,
    sources: {
      'base-tiles': {
        type: 'raster',
        tiles: tileUrls,
        tileSize: 256,
        attribution: cfg.attribution || '&copy; OpenStreetMap'
      }
    },
    layers: [
      {
        id: 'base-tiles-layer',
        type: 'raster',
        source: 'base-tiles',
        minzoom: 0,
        maxzoom: 20,
        paint: {
          'raster-resampling': 'linear',
          'raster-contrast': 0.05,
          'raster-saturation': 0.05
        }
      }
    ]
  };
};
