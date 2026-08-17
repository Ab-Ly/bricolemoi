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
    colorClass: 'text-cyan-400',
    glowColor: 'rgba(34,211,238,0.7)',
    bgClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
  },
  ELECTRICIAN: {
    key: 'ELECTRICIAN',
    label: 'Électricité & Éclairage',
    labelAr: 'تريسيان و إنارة',
    iconEmoji: '⚡',
    IconComponent: Lightning,
    colorClass: 'text-amber-400',
    glowColor: 'rgba(251,191,36,0.7)',
    bgClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
  },
  CLIMATISATION: {
    key: 'CLIMATISATION',
    label: 'Climatisation & Froid',
    labelAr: 'كليماتيزور و تبريد',
    iconEmoji: '❄️',
    IconComponent: Snowflake,
    colorClass: 'text-cyan-300',
    glowColor: 'rgba(125,211,252,0.7)',
    bgClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
  },
  ELECTROMENAGER: {
    key: 'ELECTROMENAGER',
    label: 'Électroménager & Cuisson',
    labelAr: 'الأجهزة المنزلية',
    iconEmoji: '🧺',
    IconComponent: Television,
    colorClass: 'text-purple-400',
    glowColor: 'rgba(192,132,252,0.7)',
    bgClass: 'bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
  },
  SERRURERIE: {
    key: 'SERRURERIE',
    label: 'Serrurerie & Métal',
    labelAr: 'قفلجي و حدادة',
    iconEmoji: '🔑',
    IconComponent: Key,
    colorClass: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.7)',
    bgClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
  },
  PEINTURE: {
    key: 'PEINTURE',
    label: 'Peinture & Plâtre (BA13)',
    labelAr: 'صباغ و جباص',
    iconEmoji: '🎨',
    IconComponent: PaintBrush,
    colorClass: 'text-fuchsia-400',
    glowColor: 'rgba(232,121,249,0.7)',
    bgClass: 'bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_12px_rgba(217,70,239,0.25)]'
  },
  MENUISERIE: {
    key: 'MENUISERIE',
    label: 'Menuiserie Bois & Aluminium',
    labelAr: 'نجار و ألمنيوم',
    iconEmoji: '🪚',
    IconComponent: Hammer,
    colorClass: 'text-amber-400',
    glowColor: 'rgba(245,158,11,0.7)',
    bgClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
  },
  MACONNERIE: {
    key: 'MACONNERIE',
    label: 'Étanchéité & Carrelage (Zellige)',
    labelAr: 'زليجي و عزل السطح',
    iconEmoji: '🧱',
    IconComponent: Wall,
    colorClass: 'text-amber-500',
    glowColor: 'rgba(245,158,11,0.7)',
    bgClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
  },
  NETTOYAGE: {
    key: 'NETTOYAGE',
    label: 'Nettoyage & Dératisation',
    labelAr: 'نظافة و تعقيم',
    iconEmoji: '🧹',
    IconComponent: Broom,
    colorClass: 'text-sky-400',
    glowColor: 'rgba(56,189,248,0.7)',
    bgClass: 'bg-sky-950/80 text-sky-300 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
  },
  PARABOLE: {
    key: 'PARABOLE',
    label: 'Parabole, Caméras & Wi-Fi',
    labelAr: 'بارابول و كاميرات',
    iconEmoji: '📡',
    IconComponent: HouseLine,
    colorClass: 'text-indigo-400',
    glowColor: 'rgba(129,140,248,0.7)',
    bgClass: 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
  },
  JARDINAGE: {
    key: 'JARDINAGE',
    label: 'Jardinage & Espaces Verts',
    labelAr: 'بستاني و حدائق',
    iconEmoji: '🌿',
    IconComponent: Plant,
    colorClass: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.7)',
    bgClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(34,197,94,0.25)]'
  },
  AUTO_MECHANIC: {
    key: 'AUTO_MECHANIC',
    label: 'Mécanique & Lavage Auto',
    labelAr: 'ميكانيك و لافاج',
    iconEmoji: '🚗',
    IconComponent: Car,
    colorClass: 'text-cyan-400',
    glowColor: 'rgba(34,211,238,0.7)',
    bgClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
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
    colorClass: 'text-cyan-400',
    glowColor: 'rgba(34,211,238,0.7)',
    bgClass: 'bg-slate-900 border border-cyan-500/30 text-slate-200 shadow-sm'
  };
};

export const getSpecialtyLabel = (type) => {
  const meta = getSpecialtyMeta(type);
  return `${meta.label} ${meta.iconEmoji}`;
};

/**
 * EnhancedCategoryIcon - Renders Phosphor Icons Duotone with High-Contrast Dark Sci-Fi Glow
 */
export const EnhancedCategoryIcon = ({ 
  type = 'PLOMBERIE', 
  className = "w-6 h-6", 
  weight = "duotone",
  glow = true 
}) => {
  const meta = getSpecialtyMeta(type);
  const IconComp = meta.IconComponent || Wrench;

  return (
    <IconComp 
      weight={weight} 
      className={`${className} ${meta.colorClass} transition-transform`} 
      style={glow ? { filter: `drop-shadow(0 0 6px ${meta.glowColor})` } : undefined}
    />
  );
};

/**
 * SpecialtyBadge - Standardized Glassmorphism pill badge for Maâlems & Categories
 */
export const SpecialtyBadge = ({ type, className = "", showIcon = true }) => {
  const meta = getSpecialtyMeta(type);

  return (
    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 backdrop-blur-md ${meta.bgClass} ${className}`}>
      {showIcon && <EnhancedCategoryIcon type={type} className="w-3.5 h-3.5 inline-block" glow={false} />}
      <span>{meta.label}</span>
    </span>
  );
};
