import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Lock,
  Gift,
  Coins,
  MapPin,
  PhoneCall,
  Check,
  TrendingUp,
  AlertTriangle,
  Flame,
  Radio,
  Sliders,
  Car,
  Wind
} from 'lucide-react';
import { 
  WhatsappLogo, 
  Wrench as PhosphorWrench, 
  ShieldCheck as PhosphorShieldCheck, 
  Coins as PhosphorCoins,
  Sparkle as PhosphorSparkle,
  Buildings,
  NavigationArrow
} from '@phosphor-icons/react';
import { EnhancedCategoryIcon } from './EnhancedCategoryIcon';
import { PromoVideoPlayer } from './PromoVideoPlayer';

const MOROCCAN_SERVICES = [
  { 
    id: 'PLUMBING', 
    name: 'Plomberie & Fuites', 
    nameAr: 'سباكة وترصيص',
    iconType: 'PLUMBING',
    minPrice: 80, 
    maxPrice: 200, 
    time: '< 15 min', 
    sampleProblems: ['Fuite sous évier', 'Robinet cassé', 'Tuyau bouché', 'Chauffe-eau en panne'],
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    glowColor: 'rgba(6,182,212,0.3)'
  },
  { 
    id: 'ELECTRICIAN', 
    name: 'Électricité & Court-Circuit', 
    nameAr: 'كهرباء وإصلاحات',
    iconType: 'ELECTRICIAN',
    minPrice: 100, 
    maxPrice: 250, 
    time: '< 15 min', 
    sampleProblems: ['Disjoncteur qui saute', 'Prise brûlée', 'Tableau électrique', 'Court-circuit général'],
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/40',
    glowColor: 'rgba(245,158,11,0.3)'
  },
  { 
    id: 'SERRURERIE', 
    name: 'Serrurerie & Porte Claquée', 
    nameAr: 'أقفال ومفاتيح',
    iconType: 'SERRURERIE',
    minPrice: 100, 
    maxPrice: 300, 
    time: '< 15 min', 
    sampleProblems: ['Clé cassée dans serrure', 'Porte blindée bloquée', 'Changement de cylindre', 'Ouverture express'],
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40',
    glowColor: 'rgba(16,185,129,0.3)'
  },
  { 
    id: 'AUTO_MECHANIC', 
    name: 'Dépannage Auto & Batterie', 
    nameAr: 'ميكانيك وبطاريات',
    iconType: 'AUTO_MECHANIC',
    minPrice: 120, 
    maxPrice: 350, 
    time: '< 20 min', 
    sampleProblems: ['Batterie à plat', 'Crevaison sur route', 'Panne de démarrage', 'Vidange express'],
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/40',
    glowColor: 'rgba(59,130,246,0.3)'
  },
  { 
    id: 'CLIMATISATION', 
    name: 'Climatisation & Froid', 
    nameAr: 'تكييف وتبريد',
    iconType: 'CLIMATISATION',
    minPrice: 150, 
    maxPrice: 400, 
    time: '< 25 min', 
    sampleProblems: ['Clim qui ne refroidit pas', 'Fuite de gaz fréon', 'Nettoyage & entretien', 'Bruit compresseur'],
    color: 'from-sky-400 to-cyan-600',
    borderColor: 'border-sky-500/40',
    glowColor: 'rgba(56,189,248,0.3)'
  },
  { 
    id: 'APPLIANCE', 
    name: 'Électroménager & Chauffe-eau', 
    nameAr: 'أجهزة منزلية',
    iconType: 'APPLIANCE',
    minPrice: 100, 
    maxPrice: 280, 
    time: '< 20 min', 
    sampleProblems: ['Machine à laver en panne', 'Réfrigérateur ne givre pas', 'Four électrique', 'Micro-ondes'],
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/40',
    glowColor: 'rgba(168,85,247,0.3)'
  }
];

const MOROCCAN_CITIES = [
  { name: 'Casablanca', activeMaalems: 420, districts: ['Maârif', 'Bourgogne', 'Gauthier', 'Aïn Sebaâ', 'Hay Hassani', 'Oasis'] },
  { name: 'Rabat - Salé', activeMaalems: 260, districts: ['Agdal', 'Hay Riad', 'Hassan', 'Souissi', 'Tabriquet', 'Bettana'] },
  { name: 'Marrakech', activeMaalems: 190, districts: ['Guéliz', 'Hivernage', 'Médina', 'Targa', 'Semlalia'] },
  { name: 'Tanger', activeMaalems: 175, districts: ['Malabata', 'Boukhalef', 'Centre-Ville', 'California', 'Marshan'] },
  { name: 'Fès', activeMaalems: 140, districts: ['Atlas', 'Narjiss', 'Saïss', 'Ville Nouvelle', 'Batha'] },
  { name: 'Agadir', activeMaalems: 110, districts: ['Talborjt', 'Sonaba', 'Haut Founty', 'Charaf', 'Dakhla'] },
  { name: 'Meknès', activeMaalems: 85, districts: ['Hamria', 'Bassatine', 'Marjane', 'Mansour'] }
];

export const LandingPage = ({ onSelectJourney }) => {
  const { setAdminAuthModalOpen } = useAuth();
  
  // Interactive Hero Switcher: 'CLIENT' (B2C) | 'MAALEM' (B2B)
  const [activeTab, setActiveTab] = useState('CLIENT');

  // Client Simulator State
  const [selectedServiceId, setSelectedServiceId] = useState('PLUMBING');
  const [selectedCityName, setSelectedCityName] = useState('Casablanca');

  // Maalem Revenue Calculator State
  const [dailyJobs, setDailyJobs] = useState(3);
  const avgJobPrice = 140; // DH par intervention moyenne
  const monthlyWorkingDays = 26;
  const leadCost = 15; // Coût lead BricoleMoi
  const netPerJob = avgJobPrice - leadCost;
  const calculatedMonthlyRevenue = dailyJobs * netPerJob * monthlyWorkingDays;

  const currentService = MOROCCAN_SERVICES.find((s) => s.id === selectedServiceId) || MOROCCAN_SERVICES[0];
  const currentCity = MOROCCAN_CITIES.find((c) => c.name === selectedCityName) || MOROCCAN_CITIES[0];

  return (
    <div className="space-y-16 pb-12 font-sans">
      
      {/* 1. HERO SECTION : Interactive Switcher (Client vs Maâlem) */}
      <section className="relative pt-4 pb-2 text-center max-w-5xl mx-auto space-y-6">
        
        {/* Neon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          <span>Plateforme N°1 de Dépannage d'Urgence Express au Maroc 🇲🇦</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
        >
          {activeTab === 'CLIENT' ? (
            <>
              Un Artisan Qualifié chez Vous <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                en Moins de 15 Minutes
              </span>
            </>
          ) : (
            <>
              Développez vos Chantiers Pro <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                0% Commission & Leads Directs
              </span>
            </>
          )}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {activeTab === 'CLIENT' ? (
            <>Plomberie, électricité, serrurerie ou panne auto ? Lancez votre alerte SOS et suivez votre <strong className="text-cyan-300">Maâlem certifié CIN</strong> en direct sur la carte radar.</>
          ) : (
            <>Rejoignez le réseau des artisans vérifiés au Maroc. Recevez des alertes WhatsApp instantanées dans votre quartier. <strong className="text-amber-300">+15 DH offerts à l'inscription</strong> pour votre 1er lead offert.</>
          )}
        </motion.p>

        {/* 🎛️ HERO TAB SWITCHER (Client vs Artisan) */}
        <div className="pt-2 flex justify-center">
          <div className="p-1.5 bg-slate-950/90 border border-cyan-500/30 rounded-2xl flex items-center gap-1 shadow-[0_0_25px_rgba(6,182,212,0.2)] max-w-md w-full">
            <button
              type="button"
              onClick={() => setActiveTab('CLIENT')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'CLIENT'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>J'ai une Urgence (Client)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('MAALEM')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'MAALEM'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Espace Artisan (Maâlem)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE WIDGETS SECTION */}
      <AnimatePresence mode="wait">
        {activeTab === 'CLIENT' ? (
          /* ============================================================== */
          /* 🚨 PARCOURS CLIENT : SIMULATEUR D'URGENCE & TARIF INDICATIF */
          /* ============================================================== */
          <motion.section
            key="client-simulator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
              <div>
                <span className="text-xs font-black text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>Simulateur d'Urgence Express</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  Quel est votre problème de dépannage ?
                </h3>
              </div>

              {/* City Selector */}
              <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/30 px-3.5 py-2 rounded-2xl shadow-inner">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400 font-bold">Ville :</span>
                <select
                  value={selectedCityName}
                  onChange={(e) => setSelectedCityName(e.target.value)}
                  className="bg-transparent text-xs font-black text-cyan-300 focus:outline-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((city) => (
                    <option key={city.name} value={city.name} className="bg-slate-900 text-slate-100">
                      {city.name} ({city.activeMaalems} en ligne)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
              {MOROCCAN_SERVICES.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                return (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between gap-3 relative cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]'
                        : 'bg-slate-950/60 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-950/90 text-slate-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-slate-900 text-slate-400'
                      }`}>
                        <EnhancedCategoryIcon type={srv.iconType} className="w-5 h-5" />
                      </div>
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_rgba(34,211,238,0.9)]" />}
                    </div>

                    <div>
                      <p className={`text-xs font-black leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {srv.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium font-arabic mt-0.5">{srv.nameAr}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                      <span className="text-cyan-400 font-bold">{srv.minPrice}-{srv.maxPrice} DH</span>
                      <span className="text-emerald-400 font-bold">{srv.time}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Live Result Card & Action */}
            <div className="mt-6 p-5 sm:p-6 bg-slate-950/90 border border-cyan-500/30 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Metric 1 : Tarif Indicatif */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] flex-shrink-0">
                  <Coins className="w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tarif Indicatif Maroc</p>
                  <p className="text-2xl font-black text-cyan-300 font-mono">
                    {currentService.minPrice} - {currentService.maxPrice} <span className="text-sm text-amber-400 font-bold">DH</span>
                  </p>
                  <p className="text-[10px] text-slate-400">Devis convenu avant démarrage</p>
                </div>
              </div>

              {/* Metric 2 : Disponibilité & Délai */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)] flex-shrink-0">
                  <Clock className="w-6 h-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Délai d'Arrivée à {selectedCityName}</p>
                  <p className="text-xl font-black text-emerald-400 font-mono">{currentService.time}</p>
                  <p className="text-[10px] text-slate-400">
                    <strong className="text-emerald-300 font-bold">{Math.round(currentCity.activeMaalems * 0.35)}</strong> artisans dispo près de chez vous
                  </p>
                </div>
              </div>

              {/* Direct Launch Button */}
              <div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectJourney('CLIENT', { category: selectedServiceId, city: selectedCityName })}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                >
                  <Zap className="w-5 h-5 text-slate-950 fill-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Demander mon Dépannage Immédiat</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.section>
        ) : (
          /* ============================================================== */
          /* 🛠️ PARCOURS ARTISAN : CALCULATEUR DE REVENUS & BONUS 15 DH */
          /* ============================================================== */
          <motion.section
            key="maalem-calculator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
              <div>
                <span className="text-xs font-black text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Calculateur de Gains Maâlem Pro</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  Combien pouvez-vous gagner avec BricoleMoi ?
                </h3>
              </div>

              {/* Bonus Callout Pill */}
              <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-2xl shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black text-emerald-300">+15 DH Offerts à l'Inscription !</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 items-center">
              {/* Slider Control */}
              <div className="space-y-6 bg-slate-950/80 border border-amber-500/20 p-6 rounded-2xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-200">
                      Interventions réalisées par jour :
                    </label>
                    <span className="px-3 py-1 bg-amber-950 border border-amber-500/40 rounded-xl text-amber-300 font-mono font-black text-base">
                      {dailyJobs} chantiers / jour
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={dailyJobs}
                    onChange={(e) => setDailyJobs(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold mt-1.5">
                    <span>1 job/j (Temps partiel)</span>
                    <span>4 jobs/j (Actif)</span>
                    <span>8 jobs/j (Intensif)</span>
                  </div>
                </div>

                {/* Economic Transparency Breakdown */}
                <div className="space-y-2 pt-2 text-xs border-t border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span>Prix moyen par dépannage client :</span>
                    <strong className="text-white font-mono font-bold">~{avgJobPrice} DH</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Coût forfaitaire lead BricoleMoi :</span>
                    <strong className="text-cyan-300 font-mono font-bold">-15 DH</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Votre gain net moyen par chantier :</span>
                    <strong className="font-mono">{netPerJob} DH (100% direct)</strong>
                  </div>
                </div>
              </div>

              {/* Calculated Net Result Card */}
              <div className="bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-500/40 p-6 rounded-2xl text-center space-y-4 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Revenu Net Mensuel Estimé :</p>
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-white font-mono drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                  {calculatedMonthlyRevenue.toLocaleString('fr-FR')} <span className="text-xl text-amber-400 font-bold">DH</span>
                </p>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Basé sur 26 jours de travail par mois. Aucun pourcentage prélevé sur vos devis finaux !
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                >
                  <Wrench className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
                  <span>Rejoindre BricoleMoi &amp; Recevoir +15 DH</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 🎬 SPOT VIDÉO PROMO & DÉMO ANIMÉE (1 MINUTE EXPLAINER) */}
      <section className="pt-2">
        <PromoVideoPlayer onSelectJourney={onSelectJourney} />
      </section>

      {/* 3. STEP-BY-STEP PROCESS FLOW ("COMMENT ÇA MARCHE ?") */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Comment fonctionne BricoleMoi ?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Un processus fluide, transparent et 100% sécurisé pour les deux parties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'CLIENT' ? (
            <>
              {/* Step 1 Client */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('CLIENT', { category: selectedServiceId, city: selectedCityName })}
                className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6 relative hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    1
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Lancer →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">Lancez votre Alerte SOS</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Sélectionnez votre panne et décrivez votre urgence vocalement en Darija 🇲🇦 ou avec une photo. L'IA géolocalise automatiquement votre quartier.
                </p>
              </motion.div>

              {/* Step 2 Client */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('CLIENT', { category: selectedServiceId, city: selectedCityName })}
                className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6 relative hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    2
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Suivre →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">Suivez votre Maâlem en Route</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Un artisan certifié prend en charge votre SOS. Vous recevez son nom, sa photo, son contact WhatsApp direct et suivez son trajet GPS en temps réel.
                </p>
              </motion.div>

              {/* Step 3 Client */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('CLIENT', { category: selectedServiceId, city: selectedCityName })}
                className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6 relative hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    3
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Garantie →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">Devis Convenu &amp; Notation</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Le diagnostic sur place établit un devis convenu avant toute réparation. Après accomplissement, confirmez la fin des travaux et notez votre Maâlem.
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Step 1 Maalem */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                className="bg-slate-900/70 border border-amber-500/20 rounded-3xl p-6 relative hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    1
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>S'inscrire →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-amber-300 transition-colors">Inscription &amp; Vérification CIN</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Créez votre compte pro avec votre numéro de téléphone. Votre pièce d'identité est vérifiée instantanément en quelques secondes pour obtenir votre badge certifié.
                </p>
              </motion.div>

              {/* Step 2 Maalem */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                className="bg-slate-900/70 border border-amber-500/20 rounded-3xl p-6 relative hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    2
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Voir Radar →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-amber-300 transition-colors">Radar Live &amp; Déblocage à 15 DH</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Recevez des alertes sonores de chantiers dans votre ville. Écoutez le vocal client et débloquez son contact direct pour seulement 15 DH (1er lead offert avec votre bonus).
                </p>
              </motion.div>

              {/* Step 3 Maalem */}
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                className="bg-slate-900/70 border border-amber-500/20 rounded-3xl p-6 relative hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all shadow-lg cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-black text-sm flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    3
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>0% Commission →</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 group-hover:text-amber-300 transition-colors">Encaissement 100% Direct</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Intervenez et encaissez la totalité de votre prestation directement auprès du client. Aucune commission en pourcentage n'est prélevée sur votre travail.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* 4. MOROCCAN CITIES COVERAGE & LIVE STATS */}
      <section className="max-w-5xl mx-auto bg-slate-950/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Buildings weight="duotone" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-white tracking-tight">Couverture Nationale au Maroc</h4>
              <p className="text-xs text-slate-400">Plus de 1 200 artisans opérationnels 24h/7j dans tout le Royaume</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Réseau Opérationnel 100%</span>
          </span>
        </div>

        {/* Cities Grid with Click-to-Select & Launch */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {MOROCCAN_CITIES.map((city) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={city.name}
              type="button"
              onClick={() => {
                setSelectedCityName(city.name);
                if (activeTab === 'CLIENT') {
                  onSelectJourney('CLIENT', { category: selectedServiceId, city: city.name });
                } else {
                  onSelectJourney('MAALEM', { city: city.name, promo: 'BONUS15' });
                }
              }}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer group ${
                selectedCityName === city.name
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/70 border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-900'
              }`}
            >
              <p className="text-xs font-black text-white truncate group-hover:text-cyan-300 transition-colors">{city.name}</p>
              <p className="text-[10px] text-cyan-400 font-mono font-bold mt-0.5">{city.activeMaalems} Pros</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 5. TRUST, GUARANTEES & ADMIN FOOTER LINK */}
      <section className="max-w-5xl mx-auto bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
            <ShieldCheck className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Garantie Anti-Arnaque &amp; Certification CIN</p>
            <p className="text-slate-400">Tous les Maâlems sont vérifiés avec pièce d'identité officielle et évalués après chaque intervention.</p>
          </div>
        </div>

        <button
          onClick={() => setAdminAuthModalOpen(true)}
          className="bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2 font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Accès Administration</span>
        </button>
      </section>

      {/* 🚨 STICKY MOBILE QUICK SOS ACTION BAR */}
      <div className="md:hidden fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] left-3 right-3 z-40">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (activeTab === 'CLIENT') {
              onSelectJourney('CLIENT', { category: selectedServiceId, city: selectedCityName });
            } else {
              onSelectJourney('MAALEM', { promo: 'BONUS15' });
            }
          }}
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.85)] cursor-pointer ${
            activeTab === 'CLIENT'
              ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.45)]'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.45)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-slate-950/20 flex items-center justify-center">
              {activeTab === 'CLIENT' ? <Zap className="w-4 h-4 fill-slate-950" /> : <Wrench className="w-4 h-4" />}
            </div>
            <span className="truncate">
              {activeTab === 'CLIENT' ? `🚨 SOS Express à ${selectedCityName}` : `🛠️ Inscription Maâlem (+15 DH)`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold bg-slate-950/20 px-2.5 py-1 rounded-xl">
            <span>Démarrer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

