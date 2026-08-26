import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { translations } from '../lib/i18n';
import { 
  Zap, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Lock,
  Gift,
  Coins,
  MapPin,
  TrendingUp,
  Sliders,
  Building2,
  Star,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Search
} from 'lucide-react';
import { EnhancedCategoryIcon, getSpecialtyMeta } from './EnhancedCategoryIcon';
import { searchRepairProblems } from '../lib/semanticSearchService';
import { PromoVideoPlayer } from './PromoVideoPlayer';

const MOROCCAN_SERVICES = [
  { 
    id: 'PLUMBING', 
    name: 'Plomberie & Fuites', 
    nameAr: 'سباكة وترصيص',
    desc: 'Fuites d\'eau, canalisations, chauffe-eau',
    descAr: 'تسرب المياه، قوادس، سخانات الماء',
    iconType: 'PLUMBING',
    minPrice: 80, 
    maxPrice: 200, 
    time: '< 15 min', 
    timeAr: '< 15 دقيقة',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40'
  },
  { 
    id: 'ELECTRICIAN', 
    name: 'Électricité & Court-Circuit', 
    nameAr: 'كهرباء وإصلاحات',
    desc: 'Pannes, disjoncteurs, prises, tableaux',
    descAr: 'انقطاع الضوء، ديجونكتور، بريزات',
    iconType: 'ELECTRICIAN',
    minPrice: 100, 
    maxPrice: 250, 
    time: '< 15 min', 
    timeAr: '< 15 دقيقة',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/40'
  },
  { 
    id: 'SERRURERIE', 
    name: 'Serrurerie & Porte Claquée', 
    nameAr: 'أقفال ومفاتيح',
    desc: 'Portes bloquées, serrures blindées, clés',
    descAr: 'أبواب مغلقة، كوالين، تبديل السواريت',
    iconType: 'SERRURERIE',
    minPrice: 100, 
    maxPrice: 300, 
    time: '< 15 min', 
    timeAr: '< 15 دقيقة',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40'
  },
  { 
    id: 'VOLETS_RIDEAUX', 
    name: 'Volets Roulants & Rideaux', 
    nameAr: 'ريدو كهربائي وألمنيوم',
    desc: 'Moteur volet bloqué, manivelle, rideau magasin',
    descAr: 'ريدو هابط، موطور كوانسي، ألمنيوم',
    iconType: 'VOLETS_RIDEAUX',
    minPrice: 120, 
    maxPrice: 300, 
    time: '< 20 min', 
    timeAr: '< 20 دقيقة',
    color: 'from-cyan-600 to-blue-700',
    borderColor: 'border-cyan-500/40'
  },
  { 
    id: 'CLIMATISATION', 
    name: 'Climatisation & Froid', 
    nameAr: 'تكييف وتبريد',
    desc: 'Recharge gaz, nettoyage, filtres, split',
    descAr: 'شحن الغاز، صيانة وتنظيف المكيفات',
    iconType: 'CLIMATISATION',
    minPrice: 150, 
    maxPrice: 400, 
    time: '< 25 min', 
    timeAr: '< 25 دقيقة',
    color: 'from-sky-400 to-cyan-600',
    borderColor: 'border-sky-500/40'
  },
  { 
    id: 'AUTO_MECHANIC', 
    name: 'Dépannage Auto & Batterie', 
    nameAr: 'ميكانيك وبطاريات',
    desc: 'Batterie à plat, démarrage, crevaison',
    descAr: 'باتري طايح، رويدة، ديباناج سريع',
    iconType: 'AUTO_MECHANIC',
    minPrice: 120, 
    maxPrice: 350, 
    time: '< 20 min', 
    timeAr: '< 20 دقيقة',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/40'
  },
  { 
    id: 'DEMENAGEMENT', 
    name: 'Déménagement & Montage', 
    nameAr: 'ترحيل وتركيب الأثاث',
    desc: 'Camionnette, porteurs, meubles en kit',
    descAr: 'ترنسبور ديور، نقالة، مونطاج حوايج',
    iconType: 'DEMENAGEMENT',
    minPrice: 150, 
    maxPrice: 600, 
    time: '< 30 min', 
    timeAr: '< 30 دقيقة',
    color: 'from-amber-600 to-orange-700',
    borderColor: 'border-amber-500/40'
  },
  { 
    id: 'SOLAIRE', 
    name: 'Chauffe-Eau Solaire', 
    nameAr: 'طاقة شمسية وسخان',
    desc: 'Panneaux solaires, résistance, thermostat',
    descAr: 'سخان السطح، ريزيستانس، صيانة',
    iconType: 'SOLAIRE',
    minPrice: 150, 
    maxPrice: 450, 
    time: '< 25 min', 
    timeAr: '< 25 دقيقة',
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-amber-400/40'
  },
  { 
    id: 'POMPE_PISCINE', 
    name: 'Pompes à Eau & Surpresseurs', 
    nameAr: 'موطور الماء ومسابح',
    desc: 'Pompe de puits, surpresseur, filtration',
    descAr: 'موطور بئر، سوربريسور، بيسين',
    iconType: 'POMPE_PISCINE',
    minPrice: 120, 
    maxPrice: 380, 
    time: '< 25 min', 
    timeAr: '< 25 دقيقة',
    color: 'from-teal-500 to-emerald-600',
    borderColor: 'border-teal-500/40'
  },
  { 
    id: 'ELECTROMENAGER', 
    name: 'Électroménager & Cuisson', 
    nameAr: 'أجهزة منزلية وسخانات',
    desc: 'Machine à laver, frigo, fours, plaques',
    descAr: 'ماكينة الصابون، ثلاجة، أفران',
    iconType: 'ELECTROMENAGER',
    minPrice: 100, 
    maxPrice: 280, 
    time: '< 20 min', 
    timeAr: '< 20 دقيقة',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/40'
  }
];

const MOROCCAN_CITIES = [
  { name: 'Casablanca', nameAr: 'الدار البيضاء', activeMaalems: 420 },
  { name: 'Rabat - Salé', nameAr: 'الرباط - سلا', activeMaalems: 260 },
  { name: 'Marrakech', nameAr: 'مراكش', activeMaalems: 190 },
  { name: 'Tanger', nameAr: 'طنجة', activeMaalems: 175 },
  { name: 'Fès', nameAr: 'فاس', activeMaalems: 140 },
  { name: 'Agadir', nameAr: 'أكادير', activeMaalems: 110 },
  { name: 'Meknès', nameAr: 'مكناس', activeMaalems: 85 }
];

export const LandingPage = ({ onSelectJourney }) => {
  const { lang, setAdminAuthModalOpen } = useAuth();
  const t = translations[lang] || translations.fr;
  const isAr = lang === 'ar';
  
  // Interactive Hero Switcher: 'CLIENT' (B2C) | 'MAALEM' (B2B)
  const [activeTab, setActiveTab] = useState('CLIENT');

  // Client Request State
  const [selectedServiceId, setSelectedServiceId] = useState('PLUMBING');
  const [selectedCityName, setSelectedCityName] = useState('Casablanca');
  const [searchQuery, setSearchQuery] = useState('');

  // Semantic suggestions
  const semanticSuggestions = searchQuery.trim().length >= 2 ? searchRepairProblems(searchQuery, 4) : [];

  // Maalem Revenue Calculator State
  const [dailyJobs, setDailyJobs] = useState(4);
  const avgJobPrice = 140; // DH moyen
  const monthlyWorkingDays = 26;
  const leadCost = 15; // 15 DH par lead
  const netPerJob = avgJobPrice - leadCost;
  const calculatedMonthlyRevenue = dailyJobs * netPerJob * monthlyWorkingDays;

  const currentService = MOROCCAN_SERVICES.find((s) => s.id === selectedServiceId) || MOROCCAN_SERVICES[0];
  const currentCity = MOROCCAN_CITIES.find((c) => c.name === selectedCityName) || MOROCCAN_CITIES[0];

  return (
    <div className={`space-y-16 pb-16 relative overflow-hidden ${isAr ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Ambient Decorative Lighting Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* 1. HERO SECTION : Interactive Switcher (Client vs Maâlem) */}
      <section className="relative pt-6 pb-2 text-center max-w-5xl mx-auto space-y-6">
        
        {/* Badge Live Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 text-blue-800 text-xs font-bold shadow-xs hover:border-blue-300 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping inline-block" />
          <span>{t.hero_badge_live}</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]"
        >
          {activeTab === 'CLIENT' ? (
            <>
              {t.hero_client_title} <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                {t.hero_client_highlight}
              </span>
            </>
          ) : (
            <>
              {t.hero_maalem_title} <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                {t.hero_maalem_highlight}
              </span>
            </>
          )}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {activeTab === 'CLIENT' ? t.hero_client_sub : t.hero_maalem_sub}
        </motion.p>

        {/* Floating Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800">~12 min</span>
            <span className="text-slate-500 text-[11px]">{isAr ? 'متوسط وقت الوصول' : 'Arrivée Moyenne'}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800">100%</span>
            <span className="text-slate-500 text-[11px]">{isAr ? 'معلم موثق بالبطاقة الوطنية' : 'Artisans Vérifiés CIN'}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-800">4.9 / 5.0</span>
            <span className="text-slate-500 text-[11px]">{isAr ? 'أكثر من 1250 تقييم' : '+1 250 Avis'}</span>
          </div>
        </motion.div>

        {/* HERO TAB SWITCHER (Client vs Artisan) */}
        <div className="pt-3 flex justify-center">
          <div className="p-1.5 bg-slate-200/70 backdrop-blur-md border border-slate-200 rounded-2xl flex items-center gap-1 shadow-inner max-w-md w-full">
            <button
              type="button"
              onClick={() => setActiveTab('CLIENT')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'CLIENT'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{t.hero_client_tab}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('MAALEM')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'MAALEM'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{t.hero_maalem_tab}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE WIDGETS SECTION */}
      <AnimatePresence mode="wait">
        {activeTab === 'CLIENT' ? (
          /* ============================================================== */
          /* 🚨 PARCOURS CLIENT : SÉLECTION D'URGENCE & TARIF TRANSPARENT   */
          /* ============================================================== */
          <motion.section
            id="bricolemoi-simulator"
            key="client-simulator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-blue-600 tracking-wider uppercase flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>{t.selector_badge}</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                  {t.selector_title}
                </h3>
              </div>

              {/* City Selector */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl shadow-xs">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-slate-500 font-bold">{t.city_label}</span>
                <select
                  value={selectedCityName}
                  onChange={(e) => setSelectedCityName(e.target.value)}
                  className="bg-transparent text-xs font-black text-slate-900 focus:outline-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((city) => (
                    <option key={city.name} value={city.name} className="bg-white text-slate-900">
                      {isAr ? city.nameAr : city.name} ({city.activeMaalems} {t.online_count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Smart Semantic Search Bar */}
            <div className="pt-5 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isAr ? "ابحث عن عطب أو مشكل (مثال: تسرب الماء، شوفو خاسر، ديجونكتور كيطيح، ساروت مبلوكي...)" : "Rechercher une panne (ex: fuite d'eau, chauffe-eau coule, disjoncteur saute, porte claquée, qadous...)"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Semantic Suggestions */}
              <AnimatePresence>
                {semanticSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-2xl space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-black text-blue-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isAr ? 'الأعطاب المطابقة لبحثك :' : 'Pannes détectées correspondantes :'}</span>
                      </span>
                      <span className="text-[10px] text-blue-600 font-bold">{isAr ? 'اضغط للاختيار السريع' : '1-Clic pour choisir'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {semanticSuggestions.map((problem) => (
                        <button
                          key={problem.id}
                          type="button"
                          onClick={() => {
                            setSelectedServiceId(problem.category);
                            if (problem.detectedCity) {
                              setSelectedCityName(problem.detectedCity);
                            }
                            try {
                              localStorage.setItem('bricolemoi_pending_intent', JSON.stringify({ 
                                category: problem.category, 
                                city: problem.detectedCity || selectedCityName,
                                district: problem.detectedDistrict || 'Centre',
                                subcategory: problem.title
                              }));
                            } catch (e) {}
                            setSearchQuery('');
                          }}
                          className="p-2.5 bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs group active:scale-98"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                              ⚡
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                                {isAr ? problem.titleAr : problem.title}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                                {isAr ? problem.title : problem.titleAr}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-2">
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 font-mono block">
                              {problem.minPrice}-{problem.maxPrice} DH
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium">
                              {problem.timeEstimate}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              {MOROCCAN_SERVICES.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                const meta = getSpecialtyMeta(srv.iconType || srv.id);
                return (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    key={srv.id}
                    type="button"
                    onClick={() => {
                      setSelectedServiceId(srv.id);
                      try {
                        localStorage.setItem('bricolemoi_pending_intent', JSON.stringify({ category: srv.id, city: selectedCityName }));
                      } catch (e) {}
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all text-left flex flex-col justify-between gap-3 relative cursor-pointer group ${
                      isSelected
                        ? `${meta.activeCard} scale-[1.02] shadow-sm ring-2 ring-blue-500/20`
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isSelected 
                          ? meta.activeIconBox 
                          : 'bg-slate-50 border border-slate-200/80 shadow-2xs'
                      }`}>
                        <EnhancedCategoryIcon 
                          type={srv.iconType} 
                          className="w-5 h-5" 
                          colorClass={isSelected ? 'text-white' : undefined} 
                        />
                      </div>
                      {isSelected && (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-xs ${meta.activeBadge}`}>
                          ✓
                        </span>
                      )}
                    </div>

                    <div>
                      <p className={`text-xs font-black leading-tight ${isSelected ? 'text-slate-950' : 'text-slate-900'}`}>
                        {isAr ? srv.nameAr : srv.name}
                      </p>
                      <p className={`text-[11px] sm:text-xs font-medium font-arabic mt-0.5 leading-snug ${isSelected ? meta.colorClass : 'text-slate-500'}`}>
                        {isAr ? srv.name : srv.nameAr}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
                      <span className={`font-bold ${isSelected ? meta.colorClass : 'text-blue-600'}`}>{srv.minPrice}-{srv.maxPrice} {t.dh}</span>
                      <span className="text-emerald-600 font-bold">{isAr ? srv.timeAr : srv.time}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Live Result Card & Direct Action */}
            <div className="mt-6 p-5 sm:p-6 bg-slate-50/80 border border-slate-200/90 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Metric 1 : Tarif Garanti */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs flex-shrink-0">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{t.price_guarantee_title}</p>
                  <p className="text-2xl font-black text-slate-900 font-mono">
                    {currentService.minPrice} - {currentService.maxPrice} <span className="text-sm text-amber-600 font-bold">{t.dh}</span>
                  </p>
                  <p className="text-[10px] text-slate-500">{t.price_guarantee_sub}</p>
                </div>
              </div>

              {/* Metric 2 : Délai Moyen & Disponibilité */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{t.arrival_time_title}</p>
                  <p className="text-xl font-black text-emerald-600 font-mono">{isAr ? currentService.timeAr : currentService.time}</p>
                  <p className="text-[10px] text-slate-500">
                    <strong className="text-emerald-700 font-bold">{Math.round(currentCity.activeMaalems * 0.35)}</strong> {t.pros_nearby}
                  </p>
                </div>
              </div>

              {/* Direct Action Button */}
              <div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    try {
                      localStorage.setItem('bricolemoi_pending_intent', JSON.stringify({ category: selectedServiceId }));
                    } catch (e) {}
                    onSelectJourney('CLIENT', { category: selectedServiceId });
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>{t.btn_request_now}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
            </div>
          </motion.section>
        ) : (
          /* ============================================================== */
          /* 🛠️ PARCOURS ARTISAN : BARÈME DE REVENUS & BONUS 15 DH         */
          /* ============================================================== */
          <motion.section
            key="maalem-calculator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-amber-600 tracking-wider uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.calc_badge}</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                  {t.calc_title}
                </h3>
              </div>

              {/* Bonus Callout Pill */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl shadow-xs">
                <Gift className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-amber-900">{t.bonus_pill}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 items-center">
              {/* Slider Control */}
              <div className="space-y-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-800">
                      {t.jobs_per_day_label}
                    </label>
                    <span className="px-3 py-1 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-mono font-black text-base">
                      {dailyJobs} {t.jobs_suffix}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={dailyJobs}
                    onChange={(e) => setDailyJobs(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold mt-1.5">
                    <span>{t.part_time}</span>
                    <span>{t.active_time}</span>
                    <span>{t.full_time}</span>
                  </div>
                </div>

                {/* Economic Transparency Breakdown */}
                <div className="space-y-2 pt-2 text-xs border-t border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.avg_price_label}</span>
                    <strong className="text-slate-900 font-mono font-bold">~{avgJobPrice} {t.dh}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.lead_cost_label}</span>
                    <strong className="text-blue-600 font-mono font-bold">-15 {t.dh}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{t.net_per_job_label}</span>
                    <strong className="font-mono">{netPerJob} {t.dh} (100% direct)</strong>
                  </div>
                </div>
              </div>

              {/* Calculated Net Result Card */}
              <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-2xl text-center space-y-4 shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">{t.net_monthly_title}</p>
                <p className="text-4xl sm:text-5xl font-black text-amber-950 font-mono">
                  {calculatedMonthlyRevenue.toLocaleString('fr-FR')} <span className="text-xl text-amber-600 font-bold">{t.dh}</span>
                </p>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {t.monthly_note}
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                >
                  <Wrench className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  <span>{t.btn_join_maalem}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 🎬 SPOT VIDÉO PROMO & DÉMONSTRATION DU SERVICE */}
      <section className="pt-2">
        <PromoVideoPlayer onSelectJourney={onSelectJourney} />
      </section>

      {/* 3. STEP-BY-STEP PROCESS FLOW */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {t.steps_title}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            {t.steps_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'CLIENT' ? (
            <>
              {/* Step 1 Client */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-sm flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {isAr ? 'المرحلة 1' : 'Étape 1'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step1_client_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step1_client_desc}</p>
              </div>

              {/* Step 2 Client */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-sm flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {isAr ? 'المرحلة 2' : 'Étape 2'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step2_client_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step2_client_desc}</p>
              </div>

              {/* Step 3 Client */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-sm flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {isAr ? 'ضمان وأمان' : 'Garantie'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step3_client_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step3_client_desc}</p>
              </div>
            </>
          ) : (
            <>
              {/* Step 1 Maalem */}
              <div className="bg-white border border-amber-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono font-black text-sm flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    +15 {t.dh}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step1_maalem_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step1_maalem_desc}</p>
              </div>

              {/* Step 2 Maalem */}
              <div className="bg-white border border-amber-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono font-black text-sm flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {isAr ? 'مباشر' : 'Live'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step2_maalem_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step2_maalem_desc}</p>
              </div>

              {/* Step 3 Maalem */}
              <div className="bg-white border border-amber-200 rounded-3xl p-6 relative shadow-2xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono font-black text-sm flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    0%
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{t.step3_maalem_title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{t.step3_maalem_desc}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. MOROCCAN CITIES COVERAGE & LIVE STATS */}
      <section className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 tracking-tight">{t.coverage_title}</h4>
              <p className="text-xs text-slate-500">{t.coverage_sub}</p>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono flex items-center gap-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.network_status}</span>
          </span>
        </div>

        {/* Cities Grid with Click-to-Filter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {MOROCCAN_CITIES.map((city) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={city.name}
              type="button"
              onClick={() => {
                setSelectedCityName(city.name);
                try {
                  localStorage.setItem('bricolemoi_pending_intent', JSON.stringify({ category: selectedServiceId, city: city.name }));
                } catch (e) {}
                const sim = document.getElementById('bricolemoi-simulator');
                if (sim) sim.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer group ${
                selectedCityName === city.name
                  ? 'bg-blue-50 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <p className={`text-xs font-black truncate transition-colors ${selectedCityName === city.name ? 'text-blue-700 font-black' : 'text-slate-800 group-hover:text-blue-600'}`}>
                {isAr ? city.nameAr : city.name}
              </p>
              <p className="text-[10px] text-blue-600 font-mono font-bold mt-0.5">{city.activeMaalems} {t.pros_active}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 5. TRUST, GUARANTEES & ADMIN FOOTER LINK */}
      <section className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{t.trust_title}</p>
            <p className="text-slate-500">{t.trust_desc}</p>
          </div>
        </div>

        <button
          onClick={() => setAdminAuthModalOpen(true)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
        >
          <Lock className="w-3.5 h-3.5 text-slate-600" />
          <span>{t.admin_access}</span>
        </button>
      </section>
    </div>
  );
};
