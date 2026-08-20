import React from 'react';
import {
  Drop,
  Lightning,
  Hammer,
  Key,
  Television,
  Plant,
  Broom,
  Car,
  Bug,
  Waves,
  PaintBrush,
  Snowflake,
  Wall,
  Wrench,
  ShieldCheck,
  HouseLine
} from '@phosphor-icons/react';

export const SPECIALTY_CONFIG = {
  PLUMBING: {
    key: 'PLUMBING',
    label: 'Plomberie & Sanitaire',
    labelAr: 'بلومبي و صحي',
    iconEmoji: '💧',
    IconComponent: Drop,
    colorClass: 'text-blue-600',
    glowColor: 'rgba(37,99,235,0.2)',
    bgClass: 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs',
    activeCard: 'bg-blue-50/90 border-2 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 shadow-md',
    activeIconBox: 'bg-blue-600 text-white shadow-xs',
    activeBadge: 'bg-blue-600 text-white'
  },
  ELECTRICIAN: {
    key: 'ELECTRICIAN',
    label: 'Électricité & Éclairage',
    labelAr: 'تريسيان و إنارة',
    iconEmoji: '⚡',
    IconComponent: Lightning,
    colorClass: 'text-amber-600',
    glowColor: 'rgba(217,119,6,0.2)',
    bgClass: 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs',
    activeCard: 'bg-amber-50/90 border-2 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 shadow-md',
    activeIconBox: 'bg-amber-500 text-white shadow-xs',
    activeBadge: 'bg-amber-500 text-white'
  },
  CLIMATISATION: {
    key: 'CLIMATISATION',
    label: 'Climatisation & Froid',
    labelAr: 'كليماتيزور و تبريد',
    iconEmoji: '❄️',
    IconComponent: Snowflake,
    colorClass: 'text-sky-600',
    glowColor: 'rgba(2,132,199,0.2)',
    bgClass: 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs',
    activeCard: 'bg-sky-50/90 border-2 border-sky-500 ring-2 ring-sky-500/20 text-sky-950 shadow-md',
    activeIconBox: 'bg-sky-500 text-white shadow-xs',
    activeBadge: 'bg-sky-500 text-white'
  },
  ELECTROMENAGER: {
    key: 'ELECTROMENAGER',
    label: 'Électroménager & Cuisson',
    labelAr: 'الأجهزة المنزلية',
    iconEmoji: '🧺',
    IconComponent: Television,
    colorClass: 'text-purple-600',
    glowColor: 'rgba(147,51,234,0.2)',
    bgClass: 'bg-purple-50 text-purple-700 border border-purple-200 shadow-xs',
    activeCard: 'bg-purple-50/90 border-2 border-purple-500 ring-2 ring-purple-500/20 text-purple-950 shadow-md',
    activeIconBox: 'bg-purple-600 text-white shadow-xs',
    activeBadge: 'bg-purple-600 text-white'
  },
  SERRURERIE: {
    key: 'SERRURERIE',
    label: 'Serrurerie & Métal',
    labelAr: 'قفلجي و حدادة',
    iconEmoji: '🔑',
    IconComponent: Key,
    colorClass: 'text-emerald-600',
    glowColor: 'rgba(5,150,105,0.2)',
    bgClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs',
    activeCard: 'bg-emerald-50/90 border-2 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 shadow-md',
    activeIconBox: 'bg-emerald-600 text-white shadow-xs',
    activeBadge: 'bg-emerald-600 text-white'
  },
  PEINTURE: {
    key: 'PEINTURE',
    label: 'Peinture & Plâtre (BA13)',
    labelAr: 'صباغ و جباص',
    iconEmoji: '🎨',
    IconComponent: PaintBrush,
    colorClass: 'text-rose-600',
    glowColor: 'rgba(225,29,72,0.2)',
    bgClass: 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs',
    activeCard: 'bg-rose-50/90 border-2 border-rose-500 ring-2 ring-rose-500/20 text-rose-950 shadow-md',
    activeIconBox: 'bg-rose-500 text-white shadow-xs',
    activeBadge: 'bg-rose-500 text-white'
  },
  MENUISERIE: {
    key: 'MENUISERIE',
    label: 'Menuiserie Bois & Aluminium',
    labelAr: 'نجار و ألمنيوم',
    iconEmoji: '🪚',
    IconComponent: Hammer,
    colorClass: 'text-orange-600',
    glowColor: 'rgba(234,88,12,0.2)',
    bgClass: 'bg-orange-50 text-orange-800 border border-orange-200 shadow-xs',
    activeCard: 'bg-orange-50/90 border-2 border-orange-500 ring-2 ring-orange-500/20 text-orange-950 shadow-md',
    activeIconBox: 'bg-orange-500 text-white shadow-xs',
    activeBadge: 'bg-orange-500 text-white'
  },
  MACONNERIE: {
    key: 'MACONNERIE',
    label: 'Étanchéité & Carrelage (Zellige)',
    labelAr: 'زليجي و عزل السطح',
    iconEmoji: '🧱',
    IconComponent: Wall,
    colorClass: 'text-stone-700',
    glowColor: 'rgba(68,64,60,0.2)',
    bgClass: 'bg-stone-100 text-stone-800 border border-stone-200 shadow-xs',
    activeCard: 'bg-stone-100 border-2 border-stone-600 ring-2 ring-stone-500/20 text-stone-950 shadow-md',
    activeIconBox: 'bg-stone-700 text-white shadow-xs',
    activeBadge: 'bg-stone-700 text-white'
  },
  NETTOYAGE: {
    key: 'NETTOYAGE',
    label: 'Nettoyage & Dératisation',
    labelAr: 'نظافة و تعقيم',
    iconEmoji: '🧹',
    IconComponent: Broom,
    colorClass: 'text-teal-600',
    glowColor: 'rgba(13,148,136,0.2)',
    bgClass: 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs',
    activeCard: 'bg-teal-50/90 border-2 border-teal-600 ring-2 ring-teal-500/20 text-teal-950 shadow-md',
    activeIconBox: 'bg-teal-600 text-white shadow-xs',
    activeBadge: 'bg-teal-600 text-white'
  },
  PARABOLE: {
    key: 'PARABOLE',
    label: 'Parabole, Caméras & Wi-Fi',
    labelAr: 'بارابول و كاميرات',
    iconEmoji: '📡',
    IconComponent: HouseLine,
    colorClass: 'text-indigo-600',
    glowColor: 'rgba(79,70,229,0.2)',
    bgClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs',
    activeCard: 'bg-indigo-50/90 border-2 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-950 shadow-md',
    activeIconBox: 'bg-indigo-600 text-white shadow-xs',
    activeBadge: 'bg-indigo-600 text-white'
  },
  JARDINAGE: {
    key: 'JARDINAGE',
    label: 'Jardinage & Espaces Verts',
    labelAr: 'بستاني و حدائق',
    iconEmoji: '🌿',
    IconComponent: Plant,
    colorClass: 'text-green-600',
    glowColor: 'rgba(22,163,74,0.2)',
    bgClass: 'bg-green-50 text-green-700 border border-green-200 shadow-xs',
    activeCard: 'bg-green-50/90 border-2 border-green-600 ring-2 ring-green-500/20 text-green-950 shadow-md',
    activeIconBox: 'bg-green-600 text-white shadow-xs',
    activeBadge: 'bg-green-600 text-white'
  },
  AUTO_MECHANIC: {
    key: 'AUTO_MECHANIC',
    label: 'Mécanique & Lavage Auto',
    labelAr: 'ميكانيك و لافاج',
    iconEmoji: '🚗',
    IconComponent: Car,
    colorClass: 'text-blue-700',
    glowColor: 'rgba(29,78,216,0.2)',
    bgClass: 'bg-blue-50 text-blue-800 border border-blue-200 shadow-xs',
    activeCard: 'bg-blue-50/90 border-2 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 shadow-md',
    activeIconBox: 'bg-blue-600 text-white shadow-xs',
    activeBadge: 'bg-blue-600 text-white'
  }
};

export const getSpecialtyMeta = (type) => {
  const norm = String(type || '').toUpperCase();
  if (norm.includes('PLOMB') || norm.includes('PLUMB')) return SPECIALTY_CONFIG.PLUMBING;
  if (norm.includes('ELEC')) return SPECIALTY_CONFIG.ELECTRICIAN;
  if (norm.includes('CLIM') || norm.includes('FROID') || norm.includes('HVAC')) return SPECIALTY_CONFIG.CLIMATISATION;
  if (norm.includes('ELECTRO') || norm.includes('WASH') || norm.includes('FOUR')) return SPECIALTY_CONFIG.ELECTROMENAGER;
  if (norm.includes('SERRUR') || norm.includes('KEY') || norm.includes('LOCK')) return SPECIALTY_CONFIG.SERRURERIE;
  if (norm.includes('PEINT') || norm.includes('PAINT') || norm.includes('PLATRE') || norm.includes('BA13')) return SPECIALTY_CONFIG.PEINTURE;
  if (norm.includes('MENUIS') || norm.includes('CARPENTER') || norm.includes('ALU') || norm.includes('WOOD')) return SPECIALTY_CONFIG.MENUISERIE;
  if (norm.includes('MACON') || norm.includes('ETANCHEITE') || norm.includes('ZELLIGE') || norm.includes('BRICK')) return SPECIALTY_CONFIG.MACONNERIE;
  if (norm.includes('NETT') || norm.includes('MENAGE') || norm.includes('DERAT') || norm.includes('CLEAN')) return SPECIALTY_CONFIG.NETTOYAGE;
  if (norm.includes('PARAB') || norm.includes('CAMERA') || norm.includes('WIFI') || norm.includes('TV')) return SPECIALTY_CONFIG.PARABOLE;
  if (norm.includes('JARDIN') || norm.includes('GARDEN')) return SPECIALTY_CONFIG.JARDINAGE;
  if (norm.includes('AUTO') || norm.includes('CAR') || norm.includes('LAVAGE')) return SPECIALTY_CONFIG.AUTO_MECHANIC;
  
  return {
    key: norm || 'AUTRE',
    label: type || 'Artisan Polyvalent',
    labelAr: 'معلّم متعدد الاختصاصات',
    iconEmoji: '🛠️',
    IconComponent: Wrench,
    colorClass: 'text-slate-600',
    glowColor: 'rgba(100,116,139,0.2)',
    bgClass: 'bg-slate-100 border border-slate-200 text-slate-700 shadow-xs',
    activeCard: 'bg-blue-50/90 border-2 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 shadow-md',
    activeIconBox: 'bg-blue-600 text-white shadow-xs',
    activeBadge: 'bg-blue-600 text-white'
  };
};

export const getSpecialtyLabel = (type) => {
  const meta = getSpecialtyMeta(type);
  return `${meta.label} ${meta.iconEmoji}`;
};

/**
 * EnhancedCategoryIcon - Renders Phosphor Icons Duotone in Modern Clean Trust
 */
export const EnhancedCategoryIcon = ({ 
  type = 'PLOMBERIE', 
  className = "w-6 h-6", 
  colorClass,
  weight = "duotone",
  glow = false 
}) => {
  const meta = getSpecialtyMeta(type);
  const IconComp = meta.IconComponent || Wrench;
  const resolvedColorClass = colorClass !== undefined ? colorClass : meta.colorClass;

  return (
    <IconComp 
      weight={weight} 
      className={`${className} ${resolvedColorClass} transition-transform`} 
      style={glow ? { filter: `drop-shadow(0 1px 3px ${meta.glowColor})` } : undefined}
    />
  );
};

/**
 * SpecialtyBadge - Standardized Modern Clean pill badge for Maâlems & Categories
 */
export const SpecialtyBadge = ({ type, className = "", showIcon = true }) => {
  const meta = getSpecialtyMeta(type);

  return (
    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${meta.bgClass} ${className}`}>
      {showIcon && <EnhancedCategoryIcon type={type} className="w-3.5 h-3.5 inline-block" glow={false} />}
      <span>{meta.label}</span>
    </span>
  );
};
