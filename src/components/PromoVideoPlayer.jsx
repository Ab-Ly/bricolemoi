import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Zap, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  PhoneCall,
  Coins,
  Gift,
  Check,
  MapPin,
  Flame,
  Radio,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { 
  WhatsappLogo, 
  SpeakerHigh,
  SpeakerSimpleSlash,
  VideoCamera,
  Star,
  CheckCircle,
  Money
} from '@phosphor-icons/react';

const CLIENT_SCENES = [
  {
    id: 1,
    shortLabel: '🚨 1. Panne Réelle (22h)',
    badge: 'Cas Réel 1/4 • L\'Urgence à Domicile',
    badgeAr: 'مشكل واقعي فالدار',
    title: '21h45 : Fuite d\'Eau sous l\'Évier à Casablanca (Maârif)',
    titleAr: 'الما سايل فالكوزينة فـ 10 دالليل وما لقيتي نمرة حتى معلم ؟',
    desc: 'L\'eau inonde votre cuisine en pleine soirée. Impossible de trouver un artisan disponible dans la rue ou sur les petites annonces. Avec BricoleMoi, vous trouvez un plombier en 1 clic.',
    descAr: 'ما تبقاش تقلب فزنقة ولا تصوني على نمر طافيين.. بريكول موي كيلقا ليك المعلم لي مسالي فالحومة ديالك فـ 30 ثانية.',
    icon: Zap,
    themeColor: 'from-cyan-500 to-blue-600',
    accentColor: 'text-cyan-400',
    mockupType: 'real_alert',
    mockupVisual: {
      type: 'REAL_ALERT',
      service: 'Plomberie & Dégât des Eaux',
      location: 'Rue Normandie, Maârif • Casablanca',
      urgency: 'Intervention Immédiate Requise',
      status: '🚨 Recherche de 3 Maâlems en direct...'
    }
  },
  {
    id: 2,
    shortLabel: '🎙️ 2. Vocal en Darija',
    badge: 'Cas Réel 2/4 • Description Simple',
    badgeAr: 'سجل أوديو بالدارجة',
    title: 'Vous Envoyez un Message Vocal en Darija (Sans Écrire)',
    titleAr: 'سجل أوديو بالدارجة و التطبيق كيتكلف بالباقي',
    desc: 'Appuyez sur le micro et parlez naturellement : "عندي روبيني تهرس والما كيعمر الكوزينة". Le système analyse automatiquement la panne, estime le prix (80 à 150 DH) et alerte les plombiers du quartier.',
    descAr: 'صيفط فوكال عادي كيفما كتهضر، السيستيم كيدير تشخيص فالحين ويحدد الثمن التقريبي باش ما يصيدوكش.',
    icon: Sparkles,
    themeColor: 'from-blue-500 to-indigo-600',
    accentColor: 'text-blue-400',
    mockupType: 'voice_recorder',
    mockupVisual: {
      type: 'REAL_VOICE',
      audioText: '🎙️ "السلام عليكم، عندي روبيني ديال الكوزينة طرطق والما سايل.. عتقونا."',
      diagnostic: 'Diagnostic Automatique : Remplacement flexible robinetterie',
      estimatedPrice: '80 - 150 DH (Fourchette constatée)'
    }
  },
  {
    id: 3,
    shortLabel: '📍 3. Maâlem en Route',
    badge: 'Cas Réel 3/4 • Suivi Live GPS',
    badgeAr: 'المعلم فطريقو عندك',
    title: '12 Minutes : Maâlem Hassan Arrive chez Vous',
    titleAr: 'المعلم حسن واصل فـ 12 دقيقة مع تتبع GPS مباشر',
    desc: 'Vous recevez la fiche de Hassan : Plombier professionnel vérifié, noté 4.9★ (128 avis). Vous pouvez l\'appeler ou lui parler sur WhatsApp et voir sa moto avancer sur la carte en temps réel.',
    descAr: 'كتشوف تصويرتو، النمرة ديالو، والكونط ديالو مفعل، والبوزيسيون ديال الموطور ديالو جاية ديريكت لدارك.',
    icon: Clock,
    themeColor: 'from-emerald-500 to-teal-600',
    accentColor: 'text-emerald-400',
    mockupType: 'live_tracking',
    mockupVisual: {
      type: 'REAL_TRACKING',
      maalemName: 'Hassan Plombier (Maârif)',
      verifiedBadge: '✔ Artisan Professionnel Vérifié',
      rating: '4.9 ★ (128 interventions)',
      eta: 'En route en Moto • Arrivée dans 8 min (1.2 km)'
    }
  },
  {
    id: 4,
    shortLabel: '🤝 4. Devis & 0 Arnaque',
    badge: 'Cas Réel 4/4 • Devis Garanti',
    badgeAr: 'ثمن محدد وبلا زيادات',
    title: 'Devis Convenu de 120 DH & Réparation Réussie',
    titleAr: 'تفاهمتو على 120 درهم قبل ما يقيس حتى بياسة',
    desc: 'Hassan diagnostique le problème sur place et confirme le montant de 120 DH avant de commencer. Après réparation, vous validez la fin des travaux et réglez directement le montant convenu.',
    descAr: 'كيقاد المشكل فـ 20 دقيقة، كتخلصلو 120 درهم نيشان وكتخلي ليه تقييم فالتطبيق باش يستافدو ناس خرين.',
    icon: ShieldCheck,
    themeColor: 'from-cyan-400 to-emerald-500',
    accentColor: 'text-cyan-300',
    mockupType: 'done_receipt',
    mockupVisual: {
      type: 'REAL_RECEIPT',
      reparation: 'Remplacement Flexible & Joint Robinetterie',
      totalPaid: '120.00 DH (Prix Convenu Respecté)',
      satisfaction: '★★★★★ 5.0 - Client Satisfait'
    }
  }
];

const MAALEM_SCENES = [
  {
    id: 1,
    shortLabel: '📱 1. Inscription 30s',
    badge: 'Cas Réel 1/4 • Inscription Express',
    badgeAr: 'تسجيل سريع في 30 ثانية',
    title: 'Inscription Pro en 30s avec votre Téléphone',
    titleAr: 'سجل برقم تليفونك واختار الحرفة ديالك باش تبدا',
    desc: 'Saisissez votre numéro marocain (+212 6... / 7...) et sélectionnez votre métier. Votre profil artisan est activé immédiatement pour recevoir des chantiers dans votre ville.',
    descAr: 'بلا تعقيدات وبلا ما تمشي للبيرو، دخل نمرتك وحرفتك والسيستيم كيفعل الكونط فالحين.',
    icon: Wrench,
    themeColor: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-400',
    mockupType: 'profile_activation',
    mockupVisual: {
      type: 'REAL_PROFILE_ACTIVATION',
      title: 'Activation Immédiate du Profil Pro',
      extractedName: 'Hassan El Alami (Plombier Casablanca)',
      status: '✔ Profil Validé & Prêt à Recevoir des Chantiers'
    }
  },
  {
    id: 2,
    shortLabel: '🎁 2. +15 DH Cadeau',
    badge: 'Cas Réel 2/4 • Premier Chantier Offert',
    badgeAr: '15 درهم كادو فجيبك',
    title: '+15 DH Crédités Directement dans votre Portefeuille',
    titleAr: '15 درهم كادو باش تجرب أول كليان فابور بلا ما تخلص والو',
    desc: 'Dès que votre compte est validé, BricoleMoi vous offre un bonus de 15 DH. Cela vous permet de débloquer votre tout premier chantier client sans dépenser un seul centime.',
    descAr: 'جرب الخدمة فابور، أول كليان كتدخل ليه الواتساب ديالو مجانا بالصولد لي عطاتك المنصة.',
    icon: Gift,
    themeColor: 'from-emerald-500 to-amber-500',
    accentColor: 'text-emerald-400',
    mockupType: 'wallet_bonus',
    mockupVisual: {
      type: 'REAL_WALLET',
      bonusAmount: '+15.00 DH (Bonus Bienvenue Activé)',
      balance: 'Solde Disponible : 15.00 DH',
      perk: '👉 1 Lead Client SOS 100% Déblocable Immédiatement'
    }
  },
  {
    id: 3,
    shortLabel: '📡 3. Alertes WhatsApp',
    badge: 'Cas Réel 3/4 • Chantiers dans votre Zone',
    badgeAr: 'تنبيهات صوتية ديال الخدمة',
    title: 'Votre Téléphone Sonne : SOS Plomberie à 800m de Vous',
    titleAr: 'كتسمع تنبيه صوتي فتيليفونك وأوديو ديال كليان باغي معلم دابا',
    desc: 'Une alerte d\'urgence s\'affiche avec la note vocale du client. Vous écoutez le problème, cliquez pour débloquer le lead à 15 DH et ouvrez la discussion WhatsApp en Darija en 1 seconde.',
    descAr: 'كتسمع الكليان شنو عندو، كتكليكي تفك النمرة بـ 15 درهم، وكتدوز تهضر معاه فواتساب باش تفاهمو على الوقت.',
    icon: WhatsappLogo,
    themeColor: 'from-cyan-500 to-blue-600',
    accentColor: 'text-cyan-400',
    mockupType: 'lead_radar',
    mockupVisual: {
      type: 'REAL_LEAD',
      clientAlert: '🚨 SOS Plomberie (Quartier Agdal - Rabat)',
      audioSnippet: '🎙️ "عفاك راه عندي قادوس مسدود.. محتاج معلم دابا"',
      action: 'Bouton : Débloquer & Ouvrir WhatsApp Darija 🇲🇦'
    }
  },
  {
    id: 4,
    shortLabel: '💰 4. 0% Commission',
    badge: 'Cas Réel 4/4 • Vos Gains Réels',
    badgeAr: '100% ديال الأرباح فجيبك',
    title: 'Vous Encaissez 100% du Prix Convenu (0% Commission)',
    titleAr: 'كتخدم بـ 200 درهم كتاخد 200 درهم كاملة كاش وبلا اقتطاعات',
    desc: 'Si vous convenez d\'une intervention à 250 DH avec le client, vous encaissez la totalité des 250 DH en direct. Avec 3 interventions par jour, générez entre 9 000 et 15 000 DH/mois.',
    descAr: 'فلوس الخدمة كتاخدهم نتا ديريكت من عند الكليان كاش، المنصة ما كتاخد حتى نسبة مئوية من الخدمة ديالك.',
    icon: Coins,
    themeColor: 'from-amber-400 to-yellow-500',
    accentColor: 'text-amber-300',
    mockupType: 'net_income',
    mockupVisual: {
      type: 'REAL_INCOME',
      dailyWork: '3 chantiers / jour x 26 jours travaillés',
      grossMonthly: '~11 700 DH / mois net direct',
      commission: 'Commission Plateforme : 0.00 DH (0%)'
    }
  }
];

export const PromoVideoPlayer = ({ onSelectJourney }) => {
  const [track, setTrack] = useState('CLIENT'); // 'CLIENT' | 'MAALEM'
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const scenes = track === 'CLIENT' ? CLIENT_SCENES : MAALEM_SCENES;
  const currentScene = scenes[currentSceneIdx] || scenes[0];
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Auto-advance scenes every 6 seconds when playing
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(timerRef.current);
      clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const duration = 6500;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % scenes.length);
    }, duration);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSceneIdx, track, scenes.length]);

  const handleSelectTrack = (newTrack) => {
    setTrack(newTrack);
    setCurrentSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSelectScene = (idx) => {
    setCurrentSceneIdx(idx);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* Top Header : Video Title & Channel Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-cyan-400 tracking-wider uppercase flex items-center gap-2">
            <VideoCamera weight="duotone" className="w-4 h-4 text-cyan-400" />
            <span>Spot Vidéo Démonstratif • Cas Réels &amp; Concrets au Maroc</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Découvrez BricoleMoi en Vidéo Animée
          </h3>
        </div>

        {/* Video Track Selector Buttons */}
        <div className="flex items-center p-1 bg-slate-950/90 border border-cyan-500/30 rounded-2xl shadow-inner">
          <button
            type="button"
            onClick={() => handleSelectTrack('CLIENT')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              track === 'CLIENT'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Spot Client (Urgence)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTrack('MAALEM')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              track === 'MAALEM'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Spot Artisan (Maâlem)</span>
          </button>
        </div>
      </div>

      {/* 📺 VIDEO PLAYER CONTAINER (Futuristic Dark Sci-Fi Glass Frame) */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] relative">
        
        {/* Top Video Progress Bar (Story-like 4 segments) */}
        <div className="grid grid-cols-4 gap-1.5 p-3 sm:p-4 bg-slate-950/95 border-b border-cyan-500/20">
          {scenes.map((sc, idx) => {
            const isCurrent = idx === currentSceneIdx;
            const isPassed = idx < currentSceneIdx;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScene(idx)}
                className="h-2 rounded-full bg-slate-800 relative overflow-hidden cursor-pointer group"
                title={sc.title}
              >
                <div 
                  className={`h-full rounded-full transition-all duration-75 ${
                    track === 'CLIENT' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                  }`}
                  style={{
                    width: isPassed ? '100%' : isCurrent ? `${progress}%` : '0%'
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Video Canvas / Main Stage */}
        <div className="p-4 sm:p-8 min-h-[360px] sm:min-h-[440px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Animated Background Ambience */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Scene Header */}
          <div className="flex items-center justify-between relative z-10 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black font-mono border shadow-sm ${
                track === 'CLIENT' 
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                  : 'bg-amber-950/90 text-amber-300 border-amber-500/40'
              }`}>
                {currentScene.badge}
              </span>
              <span className="text-[11px] text-slate-400 font-bold font-arabic hidden md:inline">
                {currentScene.badgeAr}
              </span>
            </div>

            {/* Controls : Sound & Play/Pause */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all cursor-pointer"
                title={soundEnabled ? 'Couper le son' : 'Activer les effets sonores'}
              >
                {soundEnabled ? <SpeakerHigh className="w-4 h-4 text-cyan-400" /> : <SpeakerSimpleSlash className="w-4 h-4 text-slate-500" />}
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all cursor-pointer"
                title={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Center Stage : Animated Content with Concrete Real-Life Mockups */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${track}-${currentScene.id}`}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-4 sm:my-6 relative z-10"
            >
              {/* Left Column : Story Text & Darija Subtitles */}
              <div className="lg:col-span-7 space-y-3.5 text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  {React.createElement(currentScene.icon, {
                    className: `w-6 h-6 sm:w-7 sm:h-7 ${currentScene.accentColor} drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]`
                  })}
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                    {currentScene.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-arabic font-bold text-amber-300 mt-1" dir="rtl">
                    {currentScene.titleAr}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {currentScene.desc}
                </p>

                {/* Subtitle Banner (Darija) */}
                <div className="p-3 sm:p-3.5 bg-slate-900/90 border border-cyan-500/25 rounded-2xl flex items-center gap-2.5 shadow-inner">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[9px] sm:text-[10px] font-black flex-shrink-0">
                    🇲🇦 DARIJA
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-100 font-medium italic truncate font-arabic" dir="rtl">
                    "{currentScene.descAr}"
                  </p>
                </div>
              </div>

              {/* Right Column : Interactive Real-Life Moroccan Visual Mockups */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-[320px] sm:max-w-sm bg-slate-900/95 border-2 border-cyan-500/40 rounded-3xl p-4 sm:p-5 shadow-[0_0_35px_rgba(6,182,212,0.35)] space-y-3 relative overflow-hidden">
                  
                  {/* Phone Header Bar */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pb-2 border-b border-cyan-500/20 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                      <span>BricoleMoi Live</span>
                    </span>
                    <span className="text-emerald-400 font-bold">24h / 7j 🇲🇦</span>
                  </div>

                  {/* 1. Client Real Alert Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_ALERT' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-red-500/40 space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/40 text-[9px] sm:text-[10px] font-black">
                          {currentScene.mockupVisual.urgency}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">21:45</span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-white">{currentScene.mockupVisual.service}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{currentScene.mockupVisual.location}</span>
                      </p>
                      <div className="p-2 bg-slate-900/80 rounded-xl text-[10px] sm:text-[11px] text-cyan-300 font-mono font-bold text-center border border-cyan-500/20 animate-pulse">
                        {currentScene.mockupVisual.status}
                      </div>
                    </div>
                  )}

                  {/* 2. Client Real Voice Analysis Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_VOICE' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 space-y-2.5">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-cyan-500/30 space-y-1 text-right font-arabic">
                        <span className="text-[9px] text-cyan-400 font-bold block">تسجيل صوتي (أوديو الزبون) :</span>
                        <p className="text-[11px] sm:text-xs text-white leading-relaxed">{currentScene.mockupVisual.audioText}</p>
                      </div>
                      <div className="space-y-1 text-left">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Diagnostic Instantané du Problème :</p>
                        <p className="text-[11px] sm:text-xs font-bold text-emerald-400 leading-tight">{currentScene.mockupVisual.diagnostic}</p>
                        <div className="p-1.5 sm:p-2 bg-slate-900 rounded-xl text-[11px] font-mono font-black text-amber-300 flex items-center justify-between mt-1">
                          <span>Tarif Indicatif :</span>
                          <span>{currentScene.mockupVisual.estimatedPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Client Real GPS Tracking Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_TRACKING' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-2.5 text-left">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(6,182,212,0.6)] flex-shrink-0">
                          HP
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-white truncate">{currentScene.mockupVisual.maalemName}</p>
                          <p className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{currentScene.mockupVisual.verifiedBadge}</span>
                          </p>
                          <p className="text-[9px] text-amber-300 font-bold font-mono">{currentScene.mockupVisual.rating}</p>
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900 border border-emerald-500/30 rounded-xl text-[10px] sm:text-xs text-cyan-300 font-mono font-bold">
                        {currentScene.mockupVisual.eta}
                      </div>
                    </div>
                  )}

                  {/* 4. Client Real Receipt Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_RECEIPT' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center space-y-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto text-base shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                        <Check className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-black text-white">{currentScene.mockupVisual.reparation}</p>
                      <div className="p-2 bg-slate-900 rounded-xl text-xs sm:text-sm font-mono font-black text-emerald-300">
                        {currentScene.mockupVisual.totalPaid}
                      </div>
                      <p className="text-[9px] text-amber-300 font-bold">{currentScene.mockupVisual.satisfaction}</p>
                    </div>
                  )}

                  {/* 5. Maalem Real Profile Activation Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_PROFILE_ACTIVATION' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-2 text-left">
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[9px] sm:text-[10px] font-black">
                        {currentScene.mockupVisual.title}
                      </span>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-amber-500/30 space-y-1">
                        <p className="text-xs font-bold text-slate-100">{currentScene.mockupVisual.extractedName}</p>
                        <p className="text-[10px] text-emerald-400 font-bold">{currentScene.mockupVisual.status}</p>
                      </div>
                      <div className="p-1.5 bg-emerald-950/80 rounded-xl text-[9px] text-emerald-300 font-bold text-center border border-emerald-500/30">
                        Badge Artisan Officiel Activé 🚀
                      </div>
                    </div>
                  )}

                  {/* 6. Maalem Real Wallet Bonus Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_WALLET' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center space-y-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto text-base shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                        <Gift className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-xs sm:text-sm font-black text-emerald-300 font-mono">{currentScene.mockupVisual.bonusAmount}</p>
                      <p className="text-[11px] font-bold text-white">{currentScene.mockupVisual.balance}</p>
                      <p className="text-[9px] text-slate-400 font-medium">{currentScene.mockupVisual.perk}</p>
                    </div>
                  )}

                  {/* 7. Maalem Real Lead Alert Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_LEAD' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 space-y-2 text-left">
                      <p className="text-[11px] sm:text-xs font-black text-cyan-300">{currentScene.mockupVisual.clientAlert}</p>
                      <div className="p-2 bg-slate-900 rounded-xl text-[10px] text-slate-200 font-arabic text-right">
                        {currentScene.mockupVisual.audioSnippet}
                      </div>
                      <div className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                        <span>Ouvrir WhatsApp en Darija 🇲🇦</span>
                      </div>
                    </div>
                  )}

                  {/* 8. Maalem Real Net Income Mockup */}
                  {currentScene.mockupVisual.type === 'REAL_INCOME' && (
                    <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-amber-500/40 text-center space-y-2">
                      <p className="text-[10px] text-slate-400 font-bold">{currentScene.mockupVisual.dailyWork}</p>
                      <p className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-white font-mono drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                        {currentScene.mockupVisual.grossMonthly}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-bold">{currentScene.mockupVisual.commission}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Bar : Interactive Scene Navigation Buttons & Instant CTA */}
          <div className="pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3.5 relative z-10">
            
            {/* Step Selector Chips with Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {scenes.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScene(idx)}
                  className={`px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                    idx === currentSceneIdx
                      ? track === 'CLIENT'
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                        : 'bg-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.45)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sc.shortLabel || `${idx + 1}. Étape`}
                </button>
              ))}
            </div>

            {/* Direct Action Button based on Track (Full Width on Mobile) */}
            <div className="w-full sm:w-auto">
              {track === 'CLIENT' ? (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => onSelectJourney('CLIENT', { category: 'PLUMBING', city: 'Casablanca' })}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950 flex-shrink-0" />
                  <span>Lancer mon Dépannage Immédiat</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => onSelectJourney('MAALEM', { promo: 'BONUS15' })}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-slate-950 flex-shrink-0" />
                  <span>Rejoindre le Réseau &amp; Recevoir +15 DH</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
