import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedCategoryIcon } from './EnhancedCategoryIcon';
import { 
  Sparkles, 
  Zap, 
  Droplet, 
  Tv, 
  Hammer, 
  KeyRound, 
  Bug, 
  Trees, 
  Car, 
  Waves,
  Check,
  Search,
  Paintbrush,
  Snowflake,
  Wrench,
  ShieldAlert,
  Flame,
  Radio
} from 'lucide-react';
import { 
  Drop, 
  Lightning, 
  Snowflake as PhosphorSnowflake, 
  Television, 
  Key, 
  PaintBrush, 
  Hammer as PhosphorHammer, 
  Wall, 
  Broom, 
  HouseLine,
  MagnifyingGlass
} from '@phosphor-icons/react';

export const CATEGORIES_TAXONOMY = [
  {
    id: 'cat-plomberie',
    name: 'Plomberie & Sanitaire',
    nameAr: 'بلومبي و صحي',
    slug: 'plomberie',
    iconType: 'PLUMBING',
    iconComponent: Drop,
    colorTheme: 'text-cyan-400',
    subcategories: [
      { name: 'Fuite d\'eau & Robinetterie', icon: '🚿' },
      { name: 'Débouchage express canalisations & WC', icon: '🪠' },
      { name: 'Chauffe-eau à gaz ou électrique', icon: '🔥' },
      { name: 'Installation Sanitaire & Salle de bain', icon: '🛁' },
      { name: 'Recherche de fuite encastrée & Humidité', icon: '💧' },
      { name: 'Remplacement mécanisme de chasse d\'eau', icon: '🚽' }
    ]
  },
  {
    id: 'cat-electricite',
    name: 'Électricité & Éclairage',
    nameAr: 'تريسيان و إنارة',
    slug: 'electricite',
    iconType: 'ELECTRICIAN',
    iconComponent: Lightning,
    colorTheme: 'text-amber-400',
    subcategories: [
      { name: 'Court-circuit & Coupure générale', icon: '🚨' },
      { name: 'Prises, Interrupteurs & Spots LED', icon: '💡' },
      { name: 'Tableau électrique & Disjoncteur différentiel', icon: '🔌' },
      { name: 'Montage et fixation de lustres & appliques', icon: '🏮' },
      { name: 'Branchement appareils électroménagers', icon: '⚡' },
      { name: 'Tirage de câbles & Éclairage extérieur', icon: '💡' }
    ]
  },
  {
    id: 'cat-clim',
    name: 'Climatisation & Froid',
    nameAr: 'كليماتيزور و تبريد',
    slug: 'climatisation',
    iconType: 'CLIMATISATION',
    iconComponent: PhosphorSnowflake,
    colorTheme: 'text-cyan-300',
    subcategories: [
      { name: 'Recharge Gaz Fréon & Entretien annuel', icon: '💨' },
      { name: 'Réparation Climatiseur en panne (Split/Cassette)', icon: '🛠️' },
      { name: 'Réfrigérateur & Congélateur (Ne refroidit plus)', icon: '🧊' },
      { name: 'Installation nouveau Climatiseur Split', icon: '❄️' },
      { name: 'Nettoyage & Désinfection filtres de clim', icon: '✨' }
    ]
  },
  {
    id: 'cat-electro',
    name: 'Électroménager & Cuisson',
    nameAr: 'الأجهزة المنزلية',
    slug: 'electromenager',
    iconType: 'ELECTROMENAGER',
    iconComponent: Television,
    colorTheme: 'text-purple-400',
    subcategories: [
      { name: 'Machine à laver le linge (Essorage/Vidange)', icon: '🌀' },
      { name: 'Lave-vaisselle en panne', icon: '🍽️' },
      { name: 'Four encastré, Plaque de cuisson & Hotte', icon: '🍳' },
      { name: 'Sèche-linge & Chauffe-eau électrique', icon: '♨️' },
      { name: 'Micro-ondes & Petit électroménager', icon: '🔌' }
    ]
  },
  {
    id: 'cat-serrurerie',
    name: 'Serrurerie & Métal',
    nameAr: 'قفلجي و حدادة',
    slug: 'serrurerie',
    iconType: 'SERRURERIE',
    iconComponent: Key,
    colorTheme: 'text-emerald-400',
    subcategories: [
      { name: 'Ouverture de porte claquée / Clé cassée', icon: '🚪' },
      { name: 'Changement serrure, cylindre & barillet', icon: '🔒' },
      { name: 'Rideau métallique de magasin bloqué', icon: '🏪' },
      { name: 'Blindage de porte & Poignées de sécurité', icon: '🛡️' },
      { name: 'Serrure de portail & Grille métallique', icon: '🗝️' }
    ]
  },
  {
    id: 'cat-peinture',
    name: 'Peinture & Plâtre (BA13)',
    nameAr: 'صباغ و جباص',
    slug: 'peinture',
    iconType: 'PEINTURE',
    iconComponent: PaintBrush,
    colorTheme: 'text-fuchsia-400',
    subcategories: [
      { name: 'Peinture intérieure & Rafraîchissement', icon: '🖌️' },
      { name: 'Plâtre moderne, Faux-plafond & BA13', icon: '🪵' },
      { name: 'Traitement anti-humidité & Moisissures', icon: '🌧️' },
      { name: 'Enduit, Lissage & Réparation fissures', icon: '🧱' },
      { name: 'Peinture décorative (Khayala / Ambra / Stuc)', icon: '🎨' }
    ]
  },
  {
    id: 'cat-menuiserie',
    name: 'Menuiserie Bois & Aluminium',
    nameAr: 'نجار و ألمنيوم',
    slug: 'menuiserie',
    iconType: 'MENUISERIE',
    iconComponent: PhosphorHammer,
    colorTheme: 'text-amber-400',
    subcategories: [
      { name: 'Portes, Placards & Cuisine sur mesure', icon: '🚪' },
      { name: 'Fenêtres Aluminium, Baies & Volets roulants', icon: '🪟' },
      { name: 'Montage de meubles en kit (IKEA / KITEA)', icon: '📦' },
      { name: 'Réparation serrures & Rails de fenêtres', icon: '🔧' },
      { name: 'Habillage mural en bois & Parquet', icon: '🪵' }
    ]
  },
  {
    id: 'cat-etancheite',
    name: 'Étanchéité & Carrelage',
    nameAr: 'زليجي و عزل السطح',
    slug: 'etancheite-carrelage',
    iconType: 'MACONNERIE',
    iconComponent: Wall,
    colorTheme: 'text-amber-500',
    subcategories: [
      { name: 'Étanchéité toiture terrasse anti-pluie (Stah)', icon: '☂️' },
      { name: 'Pose carrelage, faïence & Zellige marocain', icon: '💠' },
      { name: 'Réparation fuite salle de bain sous carrelage', icon: '🚿' },
      { name: 'Petits travaux de maçonnerie & Cloisons', icon: '🧱' }
    ]
  },
  {
    id: 'cat-nettoyage',
    name: 'Nettoyage & Dératisation',
    nameAr: 'نظافة و تعقيم',
    slug: 'nettoyage-menage',
    iconType: 'NETTOYAGE',
    iconComponent: Broom,
    colorTheme: 'text-sky-400',
    subcategories: [
      { name: 'Grand ménage complet & Fin de chantier', icon: '✨' },
      { name: 'Nettoyage canapé, tapis & matelas (شستيل)', icon: '🛋️' },
      { name: 'Dératisation, Cafards & Punaises de lit (البق)', icon: '🪳' },
      { name: 'Nettoyage vitres & Baies vitrées', icon: '🪟' }
    ]
  },
  {
    id: 'cat-parabole',
    name: 'Parabole, Caméras & Wi-Fi',
    nameAr: 'بارابول و كاميرات',
    slug: 'parabole-cameras',
    iconType: 'PARABOLE',
    iconComponent: HouseLine,
    colorTheme: 'text-indigo-400',
    subcategories: [
      { name: 'Pointage et installation Parabole Satellite', icon: '🛰️' },
      { name: 'Installation Caméras de Surveillance & DVR', icon: '📹' },
      { name: 'Câblage réseau Ethernet & Répéteur Wi-Fi', icon: '📶' },
      { name: 'Installation interphone & Visiophone', icon: '🔔' }
    ]
  }
];

export const CategorySelector = ({ selectedCategory, selectedSubcategory, onSelectCategory, onSelectSubcategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Trouver la catégorie courante
  const currentCat = CATEGORIES_TAXONOMY.find((c) => c.slug === selectedCategory) || CATEGORIES_TAXONOMY[0];

  // Filtrage par recherche
  const filteredCategories = CATEGORIES_TAXONOMY.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchCat = cat.name.toLowerCase().includes(q) || cat.nameAr.includes(q);
    const matchSub = cat.subcategories.some((s) => s.name.toLowerCase().includes(q));
    return matchCat || matchSub;
  });

  return (
    <div className="space-y-5">
      {/* Search Input Filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <MagnifyingGlass weight="bold" className="w-4 h-4 text-cyan-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une panne ou un besoin (ex: fuite d'eau, chauffe-eau, disjoncteur, clé cassée, BA13, canapé...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/60 focus:border-cyan-400 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Grid of Clickable Category Cards with Dark Sci-Fi Glassmorphism */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {filteredCategories.map((cat) => {
          const isSelected = cat.slug === currentCat.slug;

          return (
            <motion.button
              whileTap={{ scale: 0.92 }}
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.slug);
                if (cat.subcategories.length > 0) {
                  onSelectSubcategory(cat.subcategories[0].name);
                }
              }}
              className={`p-2.5 xs:p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[7.25rem] sm:min-h-[8rem] relative overflow-hidden shadow-lg cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-cyan-400 ring-2 ring-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                  : 'bg-slate-900/70 backdrop-blur-md text-slate-200 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {/* Futuristic Dark Glassmorphism 3D Icon Badge */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center justify-center transition-transform hover:scale-110 flex-shrink-0">
                  <EnhancedCategoryIcon type={cat.iconType || 'PLUMBING'} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {isSelected && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] sm:text-xs font-black shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    ✓
                  </span>
                )}
              </div>

              <div>
                <span className="font-black text-[11px] sm:text-xs font-sans leading-tight block text-white line-clamp-2">
                  {cat.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-400/80 font-bold block mt-0.5" dir="rtl">
                  {cat.nameAr}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Interactive Subcategories Chips / Pills with Moroccan Vocab */}
      {currentCat && currentCat.subcategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl space-y-2.5 sm:space-y-3 shadow-inner"
        >
          <div className="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)] flex-shrink-0">
                <EnhancedCategoryIcon type={currentCat.iconType} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-black text-white tracking-wide uppercase font-sans">
                  Sous-catégories pour {currentCat.name} :
                </span>
                <span className="text-[10px] text-cyan-400 ml-1 font-bold">({currentCat.nameAr})</span>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden xs:inline">Sélectionnez le besoin exact</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {currentCat.subcategories.map((subObj) => {
              const subName = typeof subObj === 'string' ? subObj : subObj.name;
              const subIcon = typeof subObj === 'string' ? '🛠️' : subObj.icon;
              const isSubSelected = selectedSubcategory === subName;

              return (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  key={subName}
                  type="button"
                  onClick={() => onSelectSubcategory(subName)}
                  className={`py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all duration-200 shadow-sm flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${
                    isSubSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400'
                      : 'bg-slate-900 text-slate-200 border-cyan-500/25 hover:border-cyan-400/70 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{subIcon}</span>
                  <span className="leading-tight">{subName}</span>
                  {isSubSelected && <Check className="w-3.5 h-3.5 text-white ml-0.5 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
