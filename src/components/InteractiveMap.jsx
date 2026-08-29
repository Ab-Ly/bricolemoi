import React, { useState, useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Configuration du Worker MapLibre GL pour éviter les erreurs MIME Type en production (Vite / Vercel)
if (typeof window !== 'undefined' && maplibregl?.config) {
  maplibregl.config.WORKER_URL = '/assets/maplibre-gl-worker.mjs';
}
import { motion } from 'framer-motion';
import { Navigation, Compass, Layers, Crosshair, MapPin, Star, Sparkles, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { getSpecialtyLabel } from './EnhancedCategoryIcon';

// High-Density Native Map Tiles (Zero API Key - 100% Free & No Watermark)
const MAP_STYLES = {
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

// Road & Street Color Grading Palette Options
const ROAD_COLOR_THEMES = [
  { id: 'GOLD_CYAN', label: 'Doré & Cyan (Haute Clarté)', iconColor: 'bg-amber-400', desc: 'Grands axes dorés et rues nettes' },
  { id: 'NEON_CYBER', label: 'Néon Cyberpunk (Sombre)', iconColor: 'bg-cyan-400', desc: 'Radar de nuit avec routes fluorescentes' },
  { id: 'SILVER_SLATE', label: 'Silver Épuré (Minimaliste)', iconColor: 'bg-slate-300', desc: 'Rendu monochrome moderne' },
  { id: 'NATURAL', label: 'Couleurs Naturelles (Standard)', iconColor: 'bg-emerald-400', desc: 'Rendu topographique officiel' }
];

const getMapStyleJson = (styleKey) => {
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

// Dual-Tone Glowing SVG Icon Templates for Map Markers
const SVG_ICONS = {
  PLUMBING: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M12 2.25C12 2.25 5.5 9.75 5.5 15.25C5.5 18.84 8.41 21.75 12 21.75C15.59 21.75 18.5 18.84 18.5 15.25C18.5 9.75 12 2.25 12 2.25Z" fill="url(#pGradMap)" stroke="#0284c7" stroke-width="1.5"/>
      <circle cx="10" cy="14" r="1.5" fill="#ffffff" opacity="0.9"/>
    </svg>
  `,
  ELECTRICIAN: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <path d="M13 2L3.5 13.5H12L11 22L20.5 10.5H12L13 2Z" fill="url(#eGradMap)" stroke="#b45309" stroke-width="1.2"/>
    </svg>
  `,
  AUTO_MECHANIC: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0891b2"/>
          <stop offset="100%" stop-color="#0e7490"/>
        </linearGradient>
      </defs>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.85 7H17.14L18.22 10.14H5.78L6.85 7Z" fill="url(#aGradMap)" stroke="#155e75" stroke-width="1.2"/>
    </svg>
  `,
  NETTOYAGE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="url(#cGradMap)" stroke="#0369a1" stroke-width="1.2"/>
    </svg>
  `,
  MENUISERIE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <path d="M15 3L21 9L19.5 10.5L17.5 8.5L10 16L8 14L15.5 6.5L13.5 4.5L15 3Z" fill="url(#mGradMap)" stroke="#92400e" stroke-width="1.2"/>
    </svg>
  `,
  SERRURERIE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 7C13.66 7 15 8.34 15 10C15 11.23 14.26 12.28 13.2 12.74L14.5 17H12.5L12 15H11L10.5 17H8.5L9.8 12.74C8.74 12.28 8 11.23 8 10C8 8.34 9.34 7 12 7Z" fill="url(#sGradMap)" stroke="#065f46" stroke-width="1.2"/>
    </svg>
  `,
  ELECTROMENAGER: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tvGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#7e22ce"/>
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="20" height="13" rx="3" fill="url(#tvGradMap)" stroke="#6b21a8" stroke-width="1.2"/>
      <path d="M17 2L13 6M7 2L11 6" stroke="#9333ea" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  JARDINAGE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#16a34a"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
      </defs>
      <path d="M12 2C8 2 5 6 5 10C5 13.5 7.5 16.5 11 17.8V21H13V17.8C16.5 16.5 19 13.5 19 10C19 6 16 2 12 2Z" fill="url(#jGradMap)" stroke="#166534" stroke-width="1.2"/>
    </svg>
  `,
  DERATISATION: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#65a30d"/>
          <stop offset="100%" stop-color="#4d7c0f"/>
        </linearGradient>
      </defs>
      <path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" fill="url(#dGradMap)" stroke="#3f6212" stroke-width="1.2"/>
    </svg>
  `,
  PISCINE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="poGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M2 12C4.5 12 5.5 10 8 10C10.5 10 11.5 12 14 12C16.5 12 17.5 10 20 10M2 17C4.5 17 5.5 15 8 15C10.5 15 11.5 17 14 17C16.5 17 17.5 15 20 15" stroke="url(#poGradMap)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,
  CLIMATISATION: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93M8 4L12 8L16 4M20 8L16 12L20 16M16 20L12 16L8 20M4 16L8 12L4 8" stroke="url(#clGradMap)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="2.5" fill="#38bdf8"/>
    </svg>
  `,
  PEINTURE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ptGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#be185d"/>
        </linearGradient>
      </defs>
      <path d="M19 11V4C19 2.9 18.1 2 17 2H5C3.9 2 3 2.9 3 4V11C3 12.1 3.9 13 5 13H17C18.1 13 19 12.1 19 11ZM19 11V15C19 16.1 18.1 17 17 17H13V20H15C15.55 20 16 20.45 16 21C16 21.55 15.55 22 15 22H9C8.45 22 8 21.55 8 21C8 20.45 8.45 20 9 20H11V17H7C5.9 17 5 16.1 5 15V13" fill="url(#ptGradMap)" stroke="#be185d" stroke-width="1.2"/>
    </svg>
  `,
  MACONNERIE: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mcGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ea580c"/>
          <stop offset="100%" stop-color="#c2410c"/>
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#mcGradMap)" stroke="#9a3412" stroke-width="1.2"/>
      <path d="M2 9.5H22M2 14.5H22M8 4V9.5M16 4V9.5M12 9.5V14.5M6 14.5V20M18 14.5V20" stroke="#fed7aa" stroke-width="1.2"/>
    </svg>
  `
};

const getMapIconSvg = (specType) => {
  const norm = String(specType || '').toUpperCase();
  if (norm.includes('CLIM') || norm.includes('FROID') || norm.includes('HVAC') || norm.includes('AIR')) return SVG_ICONS.CLIMATISATION;
  if (norm.includes('PLOMB') || norm.includes('PLUMB') || norm.includes('EAU')) return SVG_ICONS.PLUMBING;
  if (norm.includes('ELEC') || norm.includes('VOLT') || norm.includes('COURANT')) return SVG_ICONS.ELECTRICIAN;
  if (norm.includes('AUTO') || norm.includes('CAR') || norm.includes('LAVAGE') || norm.includes('MECAN')) return SVG_ICONS.AUTO_MECHANIC;
  if (norm.includes('MENUIS') || norm.includes('CARPENTER') || norm.includes('WOOD') || norm.includes('BOIS')) return SVG_ICONS.MENUISERIE;
  if (norm.includes('SERRUR') || norm.includes('KEY') || norm.includes('LOCK') || norm.includes('PORTE')) return SVG_ICONS.SERRURERIE;
  if (norm.includes('PEINT') || norm.includes('PAINT') || norm.includes('DECO')) return SVG_ICONS.PEINTURE;
  if (norm.includes('MACON') || norm.includes('BRICK') || norm.includes('BATIMENT') || norm.includes('CIMENT')) return SVG_ICONS.MACONNERIE;
  if (norm.includes('ELECTRO') || norm.includes('MULTIMEDIA') || norm.includes('TV')) return SVG_ICONS.ELECTROMENAGER;
  if (norm.includes('JARDIN') || norm.includes('GARDEN') || norm.includes('PLANT')) return SVG_ICONS.JARDINAGE;
  if (norm.includes('NETT') || norm.includes('MENAGE') || norm.includes('CLEAN')) return SVG_ICONS.NETTOYAGE;
  if (norm.includes('DERAT') || norm.includes('DESINF') || norm.includes('PEST')) return SVG_ICONS.DERATISATION;
  if (norm.includes('PISCINE') || norm.includes('POOL') || norm.includes('WAVE')) return SVG_ICONS.PISCINE;
  return SVG_ICONS.PLUMBING;
};

// Calcul du cap / angle d'orientation routier (0-360 deg)
const computeBearing = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  const brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
};

// Gabarit HTML Popup Maâlem en Route (Modern Clean & Trust)
const renderTrackingPopupHtml = ({ maalem, etaSummary, distanceKm, durationMin }) => {
  const displayName = maalem?.full_name && maalem.full_name !== 'Maalem' && maalem.full_name !== 'Artisan Maalem'
    ? maalem.full_name
    : 'Artisan Maâlem';
  const specialtyLabel = getSpecialtyLabel(maalem?.specialty);
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'AM';
  const ratingText = (maalem?.rating_avg ? Number(maalem.rating_avg) : 5.0).toFixed(1);
  const rawPhone = String(maalem?.phone || '').replace(/\D/g, '');
  const hasPhone = rawPhone.length >= 9;
  const intlPhone = rawPhone.startsWith('212')
    ? rawPhone
    : rawPhone.startsWith('0')
    ? `212${rawPhone.slice(1)}`
    : `212${rawPhone}`;

  let etaDisplay = durationMin ? `~${durationMin} min` : '~5-10 min';
  let distDisplay = distanceKm ? `${distanceKm} km` : 'En route';

  if (etaSummary) {
    const kmMatch = etaSummary.match(/([\d.,]+)\s*km/i);
    const minMatch = etaSummary.match(/~?\s*(\d+)\s*min/i);
    if (kmMatch) distDisplay = `${kmMatch[1]} km`;
    if (minMatch) etaDisplay = `~${minMatch[1]} min`;
  }

  return `
    <div class="bg-white border border-slate-200/90 rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.18)] p-3.5 sm:p-4 font-sans text-slate-800 w-[290px] sm:w-[310px] space-y-3">
      <!-- Entête : Avatar & Statut -->
      <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0 font-black text-sm tracking-wider">
            ${initials}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <span class="font-extrabold text-sm text-slate-900 tracking-tight truncate">${displayName}</span>
              <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            </div>
            <p class="text-[11px] font-semibold text-slate-500 truncate">${specialtyLabel}</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          En direct
        </span>
      </div>

      <!-- Boîte ETA & Distance Temps Réel -->
      <div class="bg-blue-50/80 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <p class="text-[9px] font-bold text-blue-800 uppercase tracking-wider">Arrivée estimée</p>
            <p class="text-xs font-black text-slate-900 font-mono">${etaDisplay}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Distance</p>
          <p class="text-xs font-black text-blue-700 font-mono">${distDisplay}</p>
        </div>
      </div>

      <!-- Pied de fiche : Note & Actions Téléphone / WhatsApp -->
      <div class="flex items-center justify-between gap-2 pt-0.5">
        <div class="flex items-center gap-1">
          <span class="text-amber-500 text-sm">★</span>
          <span class="font-black text-slate-800 text-xs">${ratingText}</span>
          <span class="text-[10px] text-slate-400">/ 5.0</span>
        </div>
        ${hasPhone ? `
          <div class="flex items-center gap-1.5">
            <a href="tel:${rawPhone}" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all no-underline">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Appeler
            </a>
            <a href="https://wa.me/${intlPhone}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all no-underline shrink-0" title="Contacter sur WhatsApp">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

// Gabarit HTML Popup Maâlem Radar
const renderMaalemPopupHtml = ({ maalem, isSelf, distanceKm, etaMin }) => {
  const formattedName = (maalem?.full_name || 'Artisan Maâlem')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  const specialtyLabel = getSpecialtyLabel(maalem?.specialty);
  const ratingText = (maalem?.rating_avg ? Number(maalem.rating_avg) : 5.0).toFixed(1);
  const reviewsCount = maalem?.reviews_count ? ` (${maalem.reviews_count} avis)` : '';
  const rawPhone = String(maalem?.phone || '').replace(/\D/g, '');
  const hasPhone = rawPhone.length >= 9 && !isSelf;

  return `
    <div class="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-2xl p-3.5 font-sans text-slate-800 min-w-[250px] max-w-[290px] space-y-2.5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span class="font-extrabold text-sm text-slate-900 truncate">${isSelf ? 'Votre Position Artisan' : formattedName}</span>
        </div>
        <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
          ${isSelf ? '🟢 En Ligne' : 'Disponible'}
        </span>
      </div>
      <div class="space-y-1.5 text-xs">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] text-slate-600 font-semibold truncate">${specialtyLabel}</span>
          <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-[11px] shrink-0">
            ★ ${ratingText} / 5.0${reviewsCount}
          </span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-slate-100">
          <span>Distance : <strong class="text-slate-900">${distanceKm} km</strong></span>
          <span>Trajet : <strong class="text-blue-700 font-bold">~${etaMin} min</strong></span>
        </div>
      </div>
      ${hasPhone ? `
        <div class="pt-1 border-t border-slate-100 flex justify-end">
          <a href="tel:${rawPhone}" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-all no-underline">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            Contacter
          </a>
        </div>
      ` : ''}
    </div>
  `;
};

export const InteractiveMap = ({
  mode = 'CLIENT_PICKER',
  selectedLat,
  selectedLng,
  onLocationSelect,
  filterCategory,
  activeRouteCoords,
  trackingMaalemPos,
  trackingMaalemId,
  trackingClientPos,
  etaSummary,
  distanceKm,
  durationMin
}) => {
  const { user } = useAuth();
  const { interventions, maalems, calculateDistanceInKm, showToast, isMaalemOnline, toggleMaalemOnlineStatus } = useApp();

  const isMaalemOrAdmin = Boolean(
    user && (String(user.role || '').toUpperCase() === 'MAALEM' || String(user.role || '').toUpperCase() === 'ADMIN')
  );

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Read cached GPS from localStorage if available
  const savedGPS = (() => {
    try {
      const raw = localStorage.getItem('bricolemoi_client_gps') || localStorage.getItem('bricolemoi_maalem_gps');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const defaultLat = selectedLat || savedGPS?.lat || 33.5883;
  const defaultLng = selectedLng || savedGPS?.lng || -7.6328;

  const [activeStyleKey, setActiveStyleKey] = useState('OSM_FR');
  const [mapTheme, setMapTheme] = useState('GOLD_CYAN'); // 'GOLD_CYAN' | 'NEON_CYBER' | 'SILVER_SLATE' | 'NATURAL'
  const [userGPSPos, setUserGPSPos] = useState({ lat: defaultLat, lng: defaultLng });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const maalemMarkersRef = useRef({});
  const emergencyMarkersRef = useRef({});
  const clientMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const trackingMaalemMarkerRef = useRef(null);
  const vehicleIconElRef = useRef(null);
  const vehicleHeadingRingRef = useRef(null);
  const currentVehiclePosRef = useRef(null);
  const currentVehicleHeadingRef = useRef(0);
  const vehicleAnimRef = useRef(null);
  const lastRouteSigRef = useRef('');
  const hasAutoFittedRouteRef = useRef(false);

  // 1. Initialize MapLibre Canvas with Full Street & Place Names Tile Layer
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset marker refs for fresh map instance
    clientMarkerRef.current = null;
    destinationMarkerRef.current = null;
    if (vehicleAnimRef.current) {
      cancelAnimationFrame(vehicleAnimRef.current);
      vehicleAnimRef.current = null;
    }
    currentVehiclePosRef.current = null;
    vehicleIconElRef.current = null;
    vehicleHeadingRingRef.current = null;
    if (trackingMaalemMarkerRef.current) {
      trackingMaalemMarkerRef.current.remove();
      trackingMaalemMarkerRef.current = null;
    }
    maalemMarkersRef.current = {};
    emergencyMarkersRef.current = {};

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getMapStyleJson(activeStyleKey),
      center: [defaultLng, defaultLat],
      zoom: 14.5,
      minZoom: 10,
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
      antialias: true,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
    mapRef.current = map;

    map.on('load', () => {
      setMapLoaded(true);
      map.resize();
    });

    const resizeTimer = setTimeout(() => {
      if (map) map.resize();
    }, 200);

    map.on('click', (e) => {
      // Ne pas écouter les clics de sélection d'adresse si un trajet en direct est actif
      if (onLocationSelect && (!activeRouteCoords || activeRouteCoords.length < 2)) {
        onLocationSelect(e.lngLat.lat, e.lngLat.lng);
      }
    });

    return () => {
      clearTimeout(resizeTimer);
      clientMarkerRef.current = null;
      destinationMarkerRef.current = null;
      maalemMarkersRef.current = {};
      emergencyMarkersRef.current = {};
      setMapLoaded(false);
      map.remove();
    };
  }, [activeStyleKey]);

  // 2. Smooth map center update (uniquement si aucun trajet routier actif n'est affiché)
  useEffect(() => {
    // Si un itinéraire actif est affiché, laisser fitBounds cadrer le trajet et ne pas forcer flyTo sur le point unique
    if (activeRouteCoords && activeRouteCoords.length >= 2) return;

    if (mapRef.current && selectedLat && selectedLng) {
      mapRef.current.flyTo({
        center: [selectedLng, selectedLat],
        zoom: 14.5,
        speed: 1.2
      });
    }
  }, [selectedLat, selectedLng, activeRouteCoords]);

  // 3. Render & Update All Markers (Client GPS, Destination, Maalems, SOS Leads)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const isRouteActive = Boolean(activeRouteCoords && activeRouteCoords.length >= 2);

    // A. Client GPS Pulsing Dot Marker (Masqué si un itinéraire actif affiche déjà le point d'arrivée)
    if (isRouteActive) {
      if (clientMarkerRef.current) {
        clientMarkerRef.current.remove();
        clientMarkerRef.current = null;
      }
    } else {
      if (!clientMarkerRef.current) {
        const el = document.createElement('div');
        el.style.width = '36px';
        el.style.height = '36px';
        el.className = 'relative flex items-center justify-center cursor-pointer';
        el.innerHTML = `
          <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
          `<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${userGPSPos.lat.toFixed(4)}, ${userGPSPos.lng.toFixed(4)}</p>
          </div>`
        );

        clientMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([userGPSPos.lng, userGPSPos.lat])
          .setPopup(popup)
          .addTo(map);
      } else {
        clientMarkerRef.current.setLngLat([userGPSPos.lng, userGPSPos.lat]);
        if (!clientMarkerRef.current.getElement().parentNode) {
          clientMarkerRef.current.addTo(map);
        }
      }
    }

    // B. Selected Destination Breakdown Pin Marker (Point d'arrivée fixe durant le trajet)
    const destLat = parseFloat(selectedLat || userGPSPos?.lat || 33.5883);
    const destLng = parseFloat(selectedLng || userGPSPos?.lng || -7.6328);

    if (mode === 'CLIENT_PICKER' && !isNaN(destLat) && !isNaN(destLng)) {
      if (!destinationMarkerRef.current) {
        const el = document.createElement('div');
        el.style.width = '44px';
        el.style.height = '52px';
        el.className = `${isRouteActive ? '' : 'cursor-move'} transform -translate-y-full transition-transform hover:scale-110 z-30`;
        el.innerHTML = `
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
          `<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">${isRouteActive ? "Point d'Arrivée (Votre Adresse)" : "Point d'Intervention"}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${isRouteActive ? "Adresse confirmée de l'intervention" : "Glissez le marqueur pour affiner"}</p>
          </div>`
        );

        destinationMarkerRef.current = new maplibregl.Marker({ element: el, draggable: !isRouteActive })
          .setLngLat([destLng, destLat])
          .setPopup(popup)
          .addTo(map);

        if (!isRouteActive) {
          destinationMarkerRef.current.on('dragend', () => {
            const lngLat = destinationMarkerRef.current.getLngLat();
            if (onLocationSelect) {
              onLocationSelect(lngLat.lat, lngLat.lng);
            }
          });
        }
      } else {
        destinationMarkerRef.current.setLngLat([destLng, destLat]);
        destinationMarkerRef.current.setDraggable(!isRouteActive);
        if (!destinationMarkerRef.current.getElement().parentNode) {
          destinationMarkerRef.current.addTo(map);
        }
      }
    }

    // C. Nearby Maalems High-Contrast Badges
    const mapCenterLat = parseFloat(selectedLat || userGPSPos?.lat || 33.5883);
    const mapCenterLng = parseFloat(selectedLng || userGPSPos?.lng || -7.6328);

    const filteredMaalems = (maalems || []).filter((m) => {
      if (m.is_online !== true || m.is_available === false) return false;
      const mLat = parseFloat(m.lat);
      const mLng = parseFloat(m.lng);
      if (isNaN(mLat) || isNaN(mLng) || mLat < 20 || mLat > 38 || mLng >= 0) return false;
      return true;
    });

    Object.keys(maalemMarkersRef.current).forEach((id) => {
      const stillActive = filteredMaalems.some((m) => String(m.id).trim() === String(id).trim());
      if (!stillActive) {
        maalemMarkersRef.current[id].remove();
        delete maalemMarkersRef.current[id];
      }
    });

    filteredMaalems.forEach((m) => {
      // Si cet artisan fait l'objet d'un suivi de véhicule direct avec trace active,
      // masquer le marqueur statique doublon pour éviter les scintillements
      if (trackingMaalemPos && trackingMaalemId && String(m.id).trim() === String(trackingMaalemId).trim()) {
        if (maalemMarkersRef.current[m.id]) {
          maalemMarkersRef.current[m.id].remove();
          delete maalemMarkersRef.current[m.id];
        }
        return;
      }

      const mLat = parseFloat(m.lat || 33.5883);
      const mLng = parseFloat(m.lng || -7.6328);
      if (isNaN(mLat) || isNaN(mLng) || mLat < 20 || mLat > 38 || mLng >= 0) return;

      const isSelf = user && String(m.id).trim() === String(user.id).trim();
      const svgIcon = getMapIconSvg(m.specialty);
      const distanceKm = calculateDistanceInKm(mapCenterLat, mapCenterLng, mLat, mLng);
      const etaMin = Math.max(3, Math.round((distanceKm / 30) * 60));
      const formattedName = (m.full_name || 'Artisan Maâlem')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

      if (!maalemMarkersRef.current[m.id]) {
        const el = document.createElement('div');
        el.style.width = '44px';
        el.style.height = '44px';
        el.className = 'relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125';

        if (isSelf) {
          el.innerHTML = `
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${svgIcon}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `;
        } else {
          el.innerHTML = `
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${svgIcon}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;
        }

        const popup = new maplibregl.Popup({ offset: 20, className: 'clean-trust-popup' }).setHTML(
          renderMaalemPopupHtml({ maalem: m, isSelf, distanceKm, etaMin })
        );

        maalemMarkersRef.current[m.id] = new maplibregl.Marker({ element: el })
          .setLngLat([mLng, mLat])
          .setPopup(popup)
          .addTo(map);
      } else {
        maalemMarkersRef.current[m.id].setLngLat([mLng, mLat]);
        if (!maalemMarkersRef.current[m.id].getElement().parentNode) {
          maalemMarkersRef.current[m.id].addTo(map);
        }
      }
    });

    // D. Véhicule Maâlem en Route (Suivi GPS Direct & Glissade Fluide Style WhatsApp)
    if (trackingMaalemPos && Array.isArray(trackingMaalemPos) && trackingMaalemPos.length >= 2) {
      const tLat = parseFloat(trackingMaalemPos[0]);
      const tLng = parseFloat(trackingMaalemPos[1]);
      if (!isNaN(tLat) && !isNaN(tLng) && tLat > 20 && tLat < 38) {
        const trackingMaalemObj = (maalems || []).find((m) => String(m.id).trim() === String(trackingMaalemId).trim());
        const trackingPopupHtml = renderTrackingPopupHtml({ maalem: trackingMaalemObj, etaSummary, distanceKm, durationMin });

        if (!trackingMaalemMarkerRef.current) {
          const el = document.createElement('div');
          el.style.width = '58px';
          el.style.height = '58px';
          el.className = 'relative flex items-center justify-center cursor-pointer z-40 group';

          el.innerHTML = `
            <div class="absolute w-14 h-14 rounded-full bg-amber-500/25 animate-ping pointer-events-none"></div>
            <div class="absolute w-11 h-11 rounded-full bg-amber-500/15 animate-pulse pointer-events-none"></div>
            <div class="vehicle-heading-ring absolute w-12 h-12 flex items-center justify-center transition-transform duration-500 ease-out pointer-events-none">
              <div class="absolute -top-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-amber-600 drop-shadow-sm"></div>
            </div>
            <div class="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-700 border-2.5 border-white shadow-[0_6px_18px_rgba(217,119,6,0.45)] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-xs"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
            </div>
            <div class="absolute -bottom-3 px-2 py-0.5 bg-slate-900/95 backdrop-blur-md text-white text-[9px] font-black tracking-wide rounded-full border border-slate-700/80 shadow-md flex items-center gap-1 pointer-events-none whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>MAÂLEM EN ROUTE</span>
            </div>
          `;

          const headingRing = el.querySelector('.vehicle-heading-ring');
          vehicleHeadingRingRef.current = headingRing;
          currentVehiclePosRef.current = [tLng, tLat];

          const popup = new maplibregl.Popup({ offset: 30, className: 'clean-trust-popup', closeButton: false }).setHTML(trackingPopupHtml);

          trackingMaalemMarkerRef.current = new maplibregl.Marker({ element: el })
            .setLngLat([tLng, tLat])
            .setPopup(popup)
            .addTo(map);
        } else {
          if (!trackingMaalemMarkerRef.current.getElement().parentNode) {
            trackingMaalemMarkerRef.current.addTo(map);
          }

          // Mettre à jour dynamiquement le contenu du popup avec l'ETA et les données en direct
          const existingPopup = trackingMaalemMarkerRef.current.getPopup();
          if (existingPopup) {
            existingPopup.setHTML(trackingPopupHtml);
          }

          const prevPos = currentVehiclePosRef.current || [tLng, tLat];
          const [fromLng, fromLat] = prevPos;
          const delta = Math.hypot(tLng - fromLng, tLat - fromLat);

          // Si déplacement réel > ~4 mètres : Glissade fluide WhatsApp (Linear Interpolation)
          if (delta > 0.00004) {
            const heading = computeBearing(fromLat, fromLng, tLat, tLng);
            currentVehicleHeadingRef.current = heading;
            if (vehicleHeadingRingRef.current) {
              vehicleHeadingRingRef.current.style.transform = `rotate(${Math.round(heading)}deg)`;
            }

            if (vehicleAnimRef.current) {
              cancelAnimationFrame(vehicleAnimRef.current);
            }

            const startTime = performance.now();
            const duration = 1200; // Glissade douce de 1.2s

            const glideStep = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out

              const curLng = fromLng + (tLng - fromLng) * ease;
              const curLat = fromLat + (tLat - fromLat) * ease;
              currentVehiclePosRef.current = [curLng, curLat];

              if (trackingMaalemMarkerRef.current) {
                trackingMaalemMarkerRef.current.setLngLat([curLng, curLat]);
              }

              if (progress < 1) {
                vehicleAnimRef.current = requestAnimationFrame(glideStep);
              } else {
                vehicleAnimRef.current = null;
                currentVehiclePosRef.current = [tLng, tLat];
              }
            };

            vehicleAnimRef.current = requestAnimationFrame(glideStep);
          } else {
            trackingMaalemMarkerRef.current.setLngLat([tLng, tLat]);
            currentVehiclePosRef.current = [tLng, tLat];
          }
        }
      }
    } else if (trackingMaalemMarkerRef.current) {
      if (vehicleAnimRef.current) {
        cancelAnimationFrame(vehicleAnimRef.current);
        vehicleAnimRef.current = null;
      }
      trackingMaalemMarkerRef.current.remove();
      trackingMaalemMarkerRef.current = null;
      vehicleIconElRef.current = null;
      vehicleHeadingRingRef.current = null;
      currentVehiclePosRef.current = null;
    }

    // E. Emergency SOS Leads
    if (!isMaalemOrAdmin) {
      Object.keys(emergencyMarkersRef.current).forEach((id) => {
        emergencyMarkersRef.current[id].remove();
        delete emergencyMarkersRef.current[id];
      });
    } else {
      const pendingInterventions = interventions.filter((i) => i.status === 'PENDING');
      const pendingIds = new Set(pendingInterventions.map((i) => String(i.id).trim()));

      // Nettoyer immédiatement les marqueurs SOS clôturés, acceptés ou annulés
      Object.keys(emergencyMarkersRef.current).forEach((id) => {
        if (!pendingIds.has(String(id).trim())) {
          emergencyMarkersRef.current[id].remove();
          delete emergencyMarkersRef.current[id];
        }
      });

      pendingInterventions.forEach((item) => {
        const lat = parseFloat(item.lat || 33.5883);
        const lng = parseFloat(item.lng || -7.6328);
        if (isNaN(lat) || isNaN(lng)) return;

        const svgIcon = getMapIconSvg(item.service_type);
        const distanceKm = calculateDistanceInKm(userGPSPos.lat, userGPSPos.lng, lat, lng);

        if (!emergencyMarkersRef.current[item.id]) {
          const el = document.createElement('div');
          el.style.width = '44px';
          el.style.height = '44px';
          el.style.willChange = 'transform';
          el.className = 'relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125';
          el.innerHTML = `
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${svgIcon}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;

          const serviceLabel = 
            String(item.service_type || '').toUpperCase().includes('CLIM') ? 'Climatisation & Froid' :
            item.service_type === 'PLUMBING' ? 'Plomberie' : 
            item.service_type === 'ELECTRICIAN' ? 'Électricité' : 
            item.service_type === 'AUTO_MECHANIC' ? 'Mécanique Auto' :
            item.service_type === 'PEINTURE' ? 'Peinture' :
            item.service_type === 'MACONNERIE' ? 'Maçonnerie' :
            item.service_type === 'JARDINAGE' ? 'Jardinage' : 
            item.service_type === 'SERRURERIE' ? 'Serrurerie' : 'Dépannage Urgent';

          const subcategoryHtml = item.subcategory 
            ? `<div class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">${item.subcategory}</div>` 
            : '';

          const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
            `<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
                  <span class="font-black text-xs text-red-600 uppercase tracking-tight">SOS ${serviceLabel}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold font-mono border border-amber-200">15 DH</span>
              </div>
              ${subcategoryHtml}
              <div class="space-y-1 pt-1 text-xs">
                <p class="font-bold text-slate-900">Quartier : <span class="text-blue-600 font-extrabold">${item.district || 'Casablanca'}</span></p>
                <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1 whitespace-nowrap">
                  <span>Distance : <strong class="text-slate-900">${distanceKm} km</strong></span>
                  <span>Tarif : <strong class="text-blue-700 font-bold">Accord Direct</strong></span>
                </div>
              </div>
            </div>`
          );

          emergencyMarkersRef.current[item.id] = new maplibregl.Marker({ element: el })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);
        } else {
          emergencyMarkersRef.current[item.id].setLngLat([lng, lat]);
          if (!emergencyMarkersRef.current[item.id].getElement().parentNode) {
            emergencyMarkersRef.current[item.id].addTo(map);
          }
        }
      });
    }

  }, [mapLoaded, user, userGPSPos, selectedLat, selectedLng, trackingMaalemPos, filterCategory, maalems, interventions, activeStyleKey]);

  // 5. Rendu du Tracé Routier OSRM & Guidage en Temps Réel
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const sourceId = 'route-source';
    const casingLayerId = 'route-casing-layer';
    const lineLayerId = 'route-line-layer';

    if (!activeRouteCoords || activeRouteCoords.length < 2) {
      if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId);
      if (map.getLayer(casingLayerId)) map.removeLayer(casingLayerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
      hasAutoFittedRouteRef.current = false;
      return;
    }

    const geojsonData = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: activeRouteCoords
      }
    };

    if (map.getSource(sourceId)) {
      map.getSource(sourceId).setData(geojsonData);
    } else {
      map.addSource(sourceId, {
        type: 'geojson',
        data: geojsonData
      });

      // Halo externe
      map.addLayer({
        id: casingLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#1d4ed8',
          'line-width': 8,
          'line-opacity': 0.4
        }
      });

      // Ligne principale Bleue dynamique
      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5,
          'line-opacity': 0.95
        }
      });
    }

    // Auto-cadrage doux pour englober tout le trajet (uniquement au premier affichage ou si la destination change)
    const endPt = activeRouteCoords[activeRouteCoords.length - 1];
    const routeDestSig = `${endPt[0].toFixed(3)},${endPt[1].toFixed(3)}`;

    if (!hasAutoFittedRouteRef.current || lastRouteSigRef.current !== routeDestSig) {
      hasAutoFittedRouteRef.current = true;
      lastRouteSigRef.current = routeDestSig;
      try {
        const bounds = new maplibregl.LngLatBounds();
        activeRouteCoords.forEach((pt) => {
          if (Array.isArray(pt) && pt.length >= 2 && !isNaN(pt[0]) && !isNaN(pt[1])) {
            bounds.extend(pt);
          }
        });
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
        }
      } catch (e) {}
    }
  }, [activeRouteCoords, mapLoaded]);

  // Accurate Geolocation Handler with Automatic 2-Stage Fallback
  const handleGeolocateUser = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      showToast('Géolocalisation non supportée par votre navigateur.', 'error');
      return;
    }

    setIsLocating(true);

    const applyPosition = (lat, lng, accuracyText) => {
      setIsLocating(false);
      setUserGPSPos({ lat, lng });

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 15.5,
          speed: 1.4
        });
      }

      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }

      showToast(`Position GPS détectée ${accuracyText}`, 'success');
    };

    // Stage 1: High Accuracy GPS
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        applyPosition(latitude, longitude, `(Précision: ±${Math.round(accuracy || 10)}m)`);
      },
      () => {
        // Stage 2: Standard Network Location Fallback
        navigator.geolocation.getCurrentPosition(
          (netPosition) => {
            const { latitude, longitude } = netPosition.coords;
            applyPosition(latitude, longitude, '(Réseau / Wi-Fi)');
          },
          (finalErr) => {
            setIsLocating(false);

            // Stage 3: Smooth Fallback to Casablanca Center / Selected District
            const fallbackLat = selectedLat || 33.5883;
            const fallbackLng = selectedLng || -7.6328;
            setUserGPSPos({ lat: fallbackLat, lng: fallbackLng });

            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [fallbackLng, fallbackLat],
                zoom: 14,
                speed: 1.2
              });
            }

            if (finalErr.code === 1) {
              showToast('Accès GPS refusé. Autorisez la localisation dans votre navigateur pour cibler votre adresse.', 'warning');
            } else {
              showToast('Signal GPS indisponible sur cet appareil. Position par défaut (Casablanca) activée.', 'info');
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 6000,
            maximumAge: 60000
          }
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0
      }
    );
  };

  const activeOnlineMaalems = (maalems || []).filter((m) => {
    if (m.is_online !== true || m.is_available === false) return false;
    const mLat = parseFloat(m.lat);
    const mLng = parseFloat(m.lng);
    return !isNaN(mLat) && !isNaN(mLng) && mLat >= 20 && mLat <= 38 && mLng < 0;
  });
  const activeMaalemsCount = activeOnlineMaalems.length;

  const handleFitAllMaalems = () => {
    const map = mapRef.current;
    if (!map || activeOnlineMaalems.length === 0) {
      showToast('Aucun Maâlem en ligne détecté pour le moment.', 'info');
      return;
    }

    // S'il y a 1 seul Maâlem (ex: vous-même ou l'artisan en direct), zoomer directement dessus
    if (activeOnlineMaalems.length === 1) {
      const single = activeOnlineMaalems[0];
      const mLat = parseFloat(single.lat);
      const mLng = parseFloat(single.lng);
      if (!isNaN(mLat) && !isNaN(mLng) && mLng < 0) {
        map.flyTo({
          center: [mLng, mLat],
          zoom: 15,
          speed: 1.4
        });
        if (onLocationSelect) {
          onLocationSelect(mLat, mLng);
        }
        showToast(`📍 Cadrage sur l'artisan en direct (${single.full_name})`, 'success');
        return;
      }
    }

    // Plusieurs Maâlems : cadrer UNIQUEMENT sur leurs vraies positions
    const bounds = new maplibregl.LngLatBounds();
    let validCount = 0;
    activeOnlineMaalems.forEach((m) => {
      const mLat = parseFloat(m.lat);
      const mLng = parseFloat(m.lng);
      if (!isNaN(mLat) && !isNaN(mLng) && mLng < 0 && mLat >= 20 && mLat <= 38) {
        bounds.extend([mLng, mLat]);
        validCount++;
      }
    });

    if (validCount > 0) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
      showToast(`📍 Cadrage sur les ${validCount} Maâlem(s) en ligne`, 'success');
    }
  };

  const handleFitAllLeads = () => {
    const map = mapRef.current;
    if (!map) return;

    const pendingLeads = interventions.filter((i) => i.status === 'PENDING' && i.lat && i.lng);
    if (pendingLeads.length === 0) {
      const curLat = parseFloat(selectedLat || userGPSPos?.lat || 33.5883);
      const curLng = parseFloat(selectedLng || userGPSPos?.lng || -7.6328);
      map.flyTo({ center: [curLng, curLat], zoom: 14.5, speed: 1.2 });
      showToast('Aucune demande SOS en attente pour le moment.', 'info');
      return;
    }

    if (pendingLeads.length === 1) {
      map.flyTo({
        center: [parseFloat(pendingLeads[0].lng), parseFloat(pendingLeads[0].lat)],
        zoom: 15,
        speed: 1.4
      });
      return;
    }

    const bounds = new maplibregl.LngLatBounds();
    pendingLeads.forEach((item) => {
      bounds.extend([parseFloat(item.lng), parseFloat(item.lat)]);
    });

    map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
  };

  const handleFitFullRoute = () => {
    const map = mapRef.current;
    if (!map || !activeRouteCoords || activeRouteCoords.length < 2) return;
    try {
      const bounds = new maplibregl.LngLatBounds();
      activeRouteCoords.forEach((pt) => {
        if (Array.isArray(pt) && pt.length >= 2 && !isNaN(pt[0]) && !isNaN(pt[1])) {
          bounds.extend(pt);
        }
      });
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
      }
    } catch (e) {}
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
      {/* MapLibre WebGL Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className={`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${mapTheme.toLowerCase().replace('_', '-')}`} 
      />

      {/* Floating Toolbar: GPS, Color Palette, & Layer Switcher */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)]">
        <button
          type="button"
          onClick={handleGeolocateUser}
          disabled={isLocating}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
          title="Centrer sur ma position GPS"
        >
          <Crosshair className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isLocating ? 'animate-spin text-amber-500' : 'text-blue-600'}`} />
          <span className="hidden xs:inline">{isLocating ? 'GPS...' : 'GPS'}</span>
        </button>

        {/* Road & Streets Color Palette Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowThemeMenu(!showThemeMenu);
              setShowLayerMenu(false);
            }}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
            title="Personnaliser la couleur des rues et routes"
          >
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
            <span className="hidden sm:inline">Couleur Rues</span>
          </button>

          {showThemeMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1">Palette des Routes :</p>
              {ROAD_COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setMapTheme(theme.id);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${
                    mapTheme === theme.id
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.iconColor} shadow-xs mt-0.5 flex-shrink-0`} />
                  <div>
                    <span className="block font-black leading-tight">{theme.label}</span>
                    <span className="text-[10px] font-normal text-slate-500 block">{theme.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Basemap Source Layer Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowLayerMenu(!showLayerMenu);
              setShowThemeMenu(false);
            }}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
            title="Changer la source de la carte"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
            <span className="hidden xs:inline">{MAP_STYLES[activeStyleKey]?.name.split(' ')[0]}</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1">Source Cartographique :</p>
              {Object.entries(MAP_STYLES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveStyleKey(key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeStyleKey === key
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  {activeStyleKey === key && <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Clean Footer Bar */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans">
        {isMaalemOrAdmin ? (
          /* --- PRO & ADMIN CONTROLS --- */
          <>
            {/* Zone Gauche Pro */}
            <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2">
              <div className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="truncate">GPS Pro</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllLeads}
                className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur toutes les urgences SOS ouvertes dans la zone"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0" />
                <span className="truncate">SOS ({interventions.filter((i) => i.status === 'PENDING').length})</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllMaalems}
                className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur les Maâlems disponibles sur la carte"
              >
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"></span>
                </span>
                <span className="truncate">Maâlems ({activeMaalemsCount})</span>
              </motion.button>
            </div>

            {/* Zone Droite Pro */}
            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllLeads}
                className="h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Cadrer l'ensemble de la zone active"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate">Chantiers</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleGeolocateUser}
                disabled={isLocating}
                className="h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Centrer la carte sur votre position GPS exacte"
              >
                <Navigation className={`w-3.5 h-3.5 text-white flex-shrink-0 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="truncate">{isLocating ? '...' : 'Ma Position'}</span>
              </motion.button>
            </div>
          </>
        ) : (
          /* --- CLIENT CONTROLS --- */
          <>
            {/* Zone Gauche Client */}
            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2">
              <div className="h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="truncate">Votre Position</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllMaalems}
                className="h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur les Maâlems disponibles autour de vous"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="truncate">Artisans ({activeMaalemsCount}) 🟢</span>
              </motion.button>
            </div>

            {/* Zone Droite Client */}
            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {activeRouteCoords && activeRouteCoords.length >= 2 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleFitFullRoute}
                  className="h-8 sm:h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 sm:px-3 rounded-xl border border-blue-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                  title="Cadrer l'ensemble du trajet (Artisan et Arrivée)"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Tout le Trajet</span>
                </motion.button>
              )}

              {mode === 'CLIENT_PICKER' && selectedLat && selectedLng && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo({ center: [parseFloat(selectedLng), parseFloat(selectedLat)], zoom: 15.5, speed: 1.3 });
                    }
                  }}
                  className="h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                  title="Recadrer sur l'adresse sélectionnée"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Point SOS</span>
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleGeolocateUser}
                disabled={isLocating}
                className="h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Centrer la carte sur votre position GPS"
              >
                <Navigation className={`w-3.5 h-3.5 text-white flex-shrink-0 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="truncate">{isLocating ? '...' : 'Ma Position'}</span>
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
