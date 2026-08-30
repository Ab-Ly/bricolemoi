import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Drop,
  Lightning,
  Key,
  Flame,
  Snowflake,
  Hammer,
  Toilet,
  Wrench,
  CheckCircle,
  MapPin,
  Camera,
  X,
  Upload,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Buildings,
  MapPinLine,
  Door,
  HouseLine,
  Television,
  Car,
  Sparkle
} from '@phosphor-icons/react';
import { CustomDropdown } from '../../CustomDropdown';
import { InteractiveMap } from '../../InteractiveMap';
import { VoiceRecorder } from '../../VoiceRecorder';

// Taxonomie Bilingue des Urgences & Installations Express (Français & الدارجة المغربية)
export const DIAGNOSTIC_TAXONOMY = [
  {
    id: 'leak',
    serviceType: 'PLUMBING',
    icon: Drop,
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-100',
    titleFr: "Fuite d'eau & Robinetterie",
    titleAr: "فويت د الما و روبينيات",
    descFr: "Robinet, tuyauterie, chasse d'eau ou fuite encastrée",
    descAr: "روبيني كايسيل، قادوس، شاس د طواليط ولا فويت فالحيط",
    questions: [
      {
        id: 'location',
        labelFr: "Où se situe la fuite ?",
        labelAr: "فين كاين هاد الفويت بالضبط ؟",
        options: [
          { value: "Robinet / Évier", valueAr: "روبيني أو لافابو", icon: "🚿" },
          { value: "Chasse d'eau WC", valueAr: "شاس د طواليط", icon: "🚽" },
          { value: "Chauffe-eau", valueAr: "الشوفو د الما", icon: "🔥" },
          { value: "Tuyau encastré / Mur humide", valueAr: "فالحيط أو تحت الزليج", icon: "💧" }
        ]
      },
      {
        id: 'severity',
        labelFr: "L'eau coule-t-elle sans arrêt ?",
        labelAr: "واش الما كايسيل بزاف دابا ؟",
        options: [
          { value: "Oui, débit fort (Vanne coupée)", valueAr: "الما كايسيل بزاف وسديت الماڭانة", icon: "🚨" },
          { value: "Non, simple goutte-à-goutte", valueAr: "غير كايقطر بشوية", icon: "💧" }
        ]
      }
    ]
  },
  {
    id: 'clog',
    serviceType: 'PLUMBING',
    icon: Toilet,
    color: 'from-blue-600 to-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    titleFr: "WC ou Évacuation bouchée",
    titleAr: "طواليط أو قوادس مخنوقين",
    descFr: "Débouchage express toilettes, évier, douche ou siphon",
    descAr: "تسريح الطواليط، قادوس، ليفيي د الكوزينة أو الدوش",
    questions: [
      {
        id: 'target',
        labelFr: "Quel équipement est bouché ?",
        labelAr: "شنو اللي مخنوق ومبلوكي ؟",
        options: [
          { value: "WC / Toilette", valueAr: "الطواليط (WC)", icon: "🚽" },
          { value: "Évier de cuisine / Lavabo", valueAr: "ليفيي د الكوزينة أو لافابو", icon: "🥣" },
          { value: "Douche / Baignoire", valueAr: "الدوش أو البانيو", icon: "🚿" },
          { value: "Évacuation générale / Regard", valueAr: "القرقارة الكبيرة د الدار", icon: "🕳️" }
        ]
      },
      {
        id: 'state',
        labelFr: "L'eau déborde-t-elle ?",
        labelAr: "واش الما كيفيض فالأرض ؟",
        options: [
          { value: "Oui, risque de débordement immédiat", valueAr: "كايطلع الما وكايفيض", icon: "🚨" },
          { value: "Non, évacuation très lente", valueAr: "كيمشي ثقيل بزاف", icon: "⏳" }
        ]
      }
    ]
  },
  {
    id: 'electricity',
    serviceType: 'ELECTRICIAN',
    icon: Lightning,
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-600 border-amber-100',
    titleFr: "Panne d'Électricité & Court-circuit",
    titleAr: "عطب فالضو أو ديجونكتور طايح",
    descFr: "Coupure générale, disjoncteur qui saute, prises ou étincelles",
    descAr: "الضو تقطع، الماڭانة طايحة، بريز مفركع أو خيوط عريانين",
    questions: [
      {
        id: 'scope',
        labelFr: "Quelle est l'étendue de la panne ?",
        labelAr: "شنو واقع فالضو دابا ؟",
        options: [
          { value: "Coupure totale (Disjoncteur général saute)", valueAr: "الدار كاملة طافية (الماڭانة طايحة)", icon: "🚨" },
          { value: "Prise ou interrupteur en panne", valueAr: "بريز أو ساروت خاسر", icon: "🔌" },
          { value: "Un appareil fait disjoncter", valueAr: "ماكينة أو فران كايطيح الضو", icon: "⚡" },
          { value: "Étincelles ou odeur de brûlé", valueAr: "ريحة الحريق أو شرارات", icon: "🔥" }
        ]
      }
    ]
  },
  {
    id: 'lock',
    serviceType: 'SERRURERIE',
    icon: Key,
    color: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-50 text-purple-600 border-purple-100',
    titleFr: "Serrure bloquée & Porte claquée",
    titleAr: "ساروت تهرس أو باب تسد",
    descFr: "Ouverture express, clé cassée ou serrure grippée",
    descAr: "فتح الباب، ساروت مبلوكي لداخل أو تهرس فالقفل",
    questions: [
      {
        id: 'issue',
        labelFr: "Quelle est votre situation ?",
        labelAr: "شنو واقع للباب والساروت ؟",
        options: [
          { value: "Porte claquée (clé restée à l'intérieur)", valueAr: "الباب تسد والساروت نسيتو لداخل", icon: "🚪" },
          { value: "Clé cassée dans la serrure / perdue", valueAr: "الساروت تهرس فالقفل أو توضّر", icon: "🗝️" },
          { value: "Serrure bloquée (ne tourne plus)", valueAr: "القفل مبلوكي ماكايدورش", icon: "🔒" }
        ]
      }
    ]
  },
  {
    id: 'volets',
    serviceType: 'VOLETS_RIDEAUX',
    icon: Door,
    color: 'from-cyan-600 to-blue-700',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    titleFr: "Volets Roulants & Rideaux Métalliques",
    titleAr: "ريدو كهربائي وألمنيوم",
    descFr: "Moteur volet bloqué, manivelle, rideau de magasin ou garage",
    descAr: "ريدو هابط مابغاش يطلع، موطور كوانسي، ألمنيوم وتصليح",
    questions: [
      {
        id: 'type',
        labelFr: "Quel équipement est bloqué ?",
        labelAr: "شنو هو الريدو اللي مبلوكي ؟",
        options: [
          { value: "Volet roulant électrique maison", valueAr: "ريدو كهربائي د الدار بالبوطون", icon: "🪟" },
          { value: "Rideau métallique magasin / garage", valueAr: "ريدو د الحانوت أو الڭاراج", icon: "🏪" },
          { value: "Volet manuel à manivelle / sangle", valueAr: "ريدو عادي بالمانيفيل", icon: "⚙️" }
        ]
      },
      {
        id: 'problem',
        labelFr: "Quelle est la panne constatée ?",
        labelAr: "شنو العطب اللي فيه ؟",
        options: [
          { value: "Moteur ne répond plus / bloqué en bas", valueAr: "الموطور ساكت والريدو هابط لتحت", icon: "🛑" },
          { value: "Lame cassée / volet décroché", valueAr: "السلايت مقطوعين أو خارجين د السكة", icon: "🛠️" }
        ]
      }
    ]
  },
  {
    id: 'water_heater',
    serviceType: 'SOLAIRE',
    icon: Flame,
    color: 'from-red-500 to-amber-600',
    badgeBg: 'bg-red-50 text-red-600 border-red-100',
    titleFr: "Chauffe-eau en panne (Gaz / Élec / Solaire)",
    titleAr: "الشوفو خاسر (غاز / ضو / طاقة شمسية)",
    descFr: "Pas d'eau chaude, étincelle absente, fuite ou résistance",
    descAr: "الما سخون ماكاينش، الشوفو ماكايشعلش أو كايسيل",
    questions: [
      {
        id: 'type',
        labelFr: "Quel type de chauffe-eau ?",
        labelAr: "شنو نوع الشوفو ديالك ؟",
        options: [
          { value: "Chauffe-eau à Gaz", valueAr: "شوفو د الغاز", icon: "🔥" },
          { value: "Chauffe-eau Électrique", valueAr: "شوفو د الضو", icon: "⚡" },
          { value: "Chauffe-eau Solaire (Toiture)", valueAr: "سخان الطاقة الشمسية ف السطح", icon: "☀️" }
        ]
      },
      {
        id: 'symptom',
        labelFr: "Quel est le problème ?",
        labelAr: "شنو هو العطب اللي فيه ؟",
        options: [
          { value: "Ne s'allume pas / Pas d'eau chaude", valueAr: "ماكايشعلش كاع / الما بارد", icon: "❄️" },
          { value: "Fuite d'eau sur le chauffe-eau", valueAr: "كايسيل منو الما", icon: "💧" },
          { value: "Résistance grillée / Thermostat", valueAr: "الريزيستانس تحرقات أو الترموستا", icon: "🔌" }
        ]
      }
    ]
  },
  {
    id: 'ac',
    serviceType: 'CLIMATISATION',
    icon: Snowflake,
    color: 'from-teal-500 to-cyan-600',
    badgeBg: 'bg-teal-50 text-teal-600 border-teal-100',
    titleFr: "Climatiseur en panne & Recharge Fréon",
    titleAr: "كليماتيزور مبلوك أو خاصو فريون",
    descFr: "Ne refroidit plus, recharge de gaz fréon ou fuite",
    descAr: "مابقاش كايبرّد، خاصو شارج فريون أو كايكب الما",
    questions: [
      {
        id: 'need',
        labelFr: "Que souhaitez-vous faire ?",
        labelAr: "شنو باغي تدير ليه ؟",
        options: [
          { value: "Ne refroidit plus (Recharge gaz Fréon)", valueAr: "ماكايبردش (خاصو غاز فريون)", icon: "💨" },
          { value: "Appareil en panne / Ne démarre pas", valueAr: "ساكت مابغاش يخدم كاع", icon: "🛠️" },
          { value: "Fuite d'eau à l'intérieur de la pièce", valueAr: "كايكب الما فالبيت لداخل", icon: "💧" }
        ]
      }
    ]
  },
  {
    id: 'parabole_tech',
    serviceType: 'PARABOLE',
    icon: HouseLine,
    color: 'from-indigo-600 to-purple-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    titleFr: "Paraboles, Caméras & Installation TV",
    titleAr: "بارابول، كاميرات المراقبة وتلفاز",
    descFr: "Réglage signal satellite, caméras de sécurité, support TV mural",
    descAr: "ريڭلاج بارابول، كاميرات المراقبة للفيلا أو المحل، تعليق التلفاز فالحيط",
    questions: [
      {
        id: 'tech_type',
        labelFr: "Quel est votre besoin d'installation ?",
        labelAr: "شنو نوع التركيب اللي محتاج دابا ؟",
        options: [
          { value: "Réglage Parabole / Signal perdu (Nilesat/Astra)", valueAr: "ريڭلاج البارابول والإشارة (نايلسات/أسترا)", icon: "📡" },
          { value: "Pose Caméras de Surveillance (Maison / Commerce)", valueAr: "تركيب كاميرات المراقبة (دار / محل)", icon: "📹" },
          { value: "Fixation Support Mural TV (LED / OLED)", valueAr: "تعليق التلفاز فالحيط بسيبور صوليد", icon: "📺" },
          { value: "Câblage Antenne & Prise TV / Réseau", valueAr: "كابلاج التلفاز والريزو فالدار", icon: "🔌" }
        ]
      }
    ]
  },
  {
    id: 'appliance',
    serviceType: 'ELECTROMENAGER',
    icon: Television,
    color: 'from-purple-600 to-pink-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    titleFr: "Électroménager & Cuisson",
    titleAr: "أجهزة منزلية وماكينات الصابون",
    descFr: "Machine à laver, lave-vaisselle, réfrigérateur, four encastrable",
    descAr: "ماكينة الصابون، لاف-فيسيل، ثلاجة، فران وبلاكة الطياب",
    questions: [
      {
        id: 'appliance_type',
        labelFr: "Quel appareil est en panne ?",
        labelAr: "أشنو هو الجهاز اللي خاسر ؟",
        options: [
          { value: "Machine à laver le linge (Ne vidange pas / bloque)", valueAr: "ماكينة الصابون مابغاتش تعصر أو كتقرقب", icon: "🧺" },
          { value: "Réfrigérateur / Congélateur (Ne refroidit plus)", valueAr: "الثلاجة أو الفريڭو مابقاش كايبرد", icon: "🧊" },
          { value: "Four encastrable ou Plaque de cuisson", valueAr: "الفران د الضو أو بلاكة د الطياب", icon: "🍳" },
          { value: "Lave-vaisselle (Fuite d'eau ou arrêt)", valueAr: "لاف-فيسيل كاتسيل الما أو كاتبلوكي", icon: "🍽️" }
        ]
      }
    ]
  },
  {
    id: 'auto',
    serviceType: 'AUTO_MECHANIC',
    icon: Car,
    color: 'from-blue-600 to-indigo-700',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    titleFr: "Dépannage Auto Express",
    titleAr: "ديباناج سريع وبطاريات السيارات",
    descFr: "Batterie à plat à domicile, crevaison de roue, démarrage",
    descAr: "باتري طايح عند الدار، رويدة مبنشرة، كابلات شارج ديباناج",
    questions: [
      {
        id: 'car_problem',
        labelFr: "Quel est le problème avec votre véhicule ?",
        labelAr: "شنو المشكل اللي واقع للسيارة ؟",
        options: [
          { value: "Batterie à plat (Besoin de booster / câbles)", valueAr: "الباتري طايح (خاص كابلات د الشارج)", icon: "🔋" },
          { value: "Pneu crevé (Changement roue de secours)", valueAr: "الرويدة مبنشرة (خاص تبديل سكور)", icon: "🛞" },
          { value: "Clés enfermées à l'intérieur de la voiture", valueAr: "السواريت تسدو لداخل فالطوموبيل", icon: "🔑" },
          { value: "Démarrage impossible / Panne mécanique", valueAr: "مابغاتش ديماري كاع", icon: "🚗" }
        ]
      }
    ]
  }
];

export const ClientDiagnosticFunnel = ({
  serviceType,
  setServiceType,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedLat,
  selectedLng,
  setSelectedLat,
  setSelectedLng,
  updateCityAndDistrictFromGPS,
  selectedCity,
  selectedDistrict,
  cityOptions,
  districtOptions,
  handleCityChange,
  handleDistrictChange,
  audioUrl,
  setAudioUrl,
  photos,
  photoUrl,
  setPhotoUrl,
  removePhoto,
  showUrlInput,
  setShowUrlInput,
  handleFileUpload,
  accessDetails,
  setAccessDetails,
  submitting,
  handleSOSSubmit,
  lang = 'fr',
  user
}) => {
  const isRtl = lang === 'ar';
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(() => {
    return DIAGNOSTIC_TAXONOMY.find((t) => t.serviceType === serviceType) || DIAGNOSTIC_TAXONOMY[0];
  });
  const [answers, setAnswers] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);

  // Synchronisation du type de service parent
  useEffect(() => {
    if (selectedIssue) {
      setServiceType(selectedIssue.serviceType);
    }
  }, [selectedIssue, setServiceType]);

  // Synchronisation de la synthèse du problème dans `selectedSubcategory`
  useEffect(() => {
    if (!selectedIssue) return;
    const ansList = Object.values(answers).filter(Boolean);
    const mainTitle = isRtl ? selectedIssue.titleAr : selectedIssue.titleFr;
    const summary = ansList.length > 0
      ? `${mainTitle} : ${ansList.join(' • ')}`
      : mainTitle;
    setSelectedSubcategory(summary);
  }, [selectedIssue, answers, isRtl, setSelectedSubcategory]);

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setAnswers({});
    setStep(2);
  };

  const handleAnswerSelect = (questionId, optionValue) => {
    const nextAnswers = { ...answers, [questionId]: optionValue };
    setAnswers(nextAnswers);

    // Si toutes les questions de l'arbre sont répondues, on avance automatiquement à l'étape 3
    const allAnswered = selectedIssue.questions.every(
      (q) => nextAnswers[q.id] || q.id === questionId
    );
    if (allAnswered) {
      setTimeout(() => setStep(3), 280);
    }
  };

  const handleUseCurrentGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLat(pos.coords.latitude);
          setSelectedLng(pos.coords.longitude);
          updateCityAndDistrictFromGPS(pos.coords.latitude, pos.coords.longitude);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-8 shadow-lg relative overflow-hidden text-slate-900 transition-all"
    >
      {/* 🧭 En-tête avec Fil d'Ariane & Progression Mobile */}
      <div className="mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 mb-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              {isRtl ? (
                <>
                  <span>رجوع</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                  <span>Retour</span>
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-black uppercase tracking-wider">
              <Sparkle weight="fill" className="w-3 h-3 text-blue-600" />
              {isRtl ? 'ديباناج سريع 24/7' : 'SOS Dépannage Express'}
            </span>
          )}

          <div className="text-right">
            <span className="text-xs font-black text-slate-900">
              {isRtl ? `المرحلة ${step} من 4` : `Étape ${step} sur 4`}
            </span>
            <span className="text-[11px] text-slate-400 block">
              {step === 1 && (isRtl ? 'نوع العطب' : 'Votre Problème')}
              {step === 2 && (isRtl ? 'تشخيص دقيق' : 'Diagnostic')}
              {step === 3 && (isRtl ? 'الموقع و الحي' : 'Localisation GPS')}
              {step === 4 && (isRtl ? 'إطلاق الرادار' : 'Lancement SOS')}
            </span>
          </div>
        </div>

        {/* Barre de progression fluide */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* =================================================================== */}
        {/* 🌟 ÉTAPE 1 : QUEL EST VOTRE PROBLÈME ? (TUILES TACTILES LARGES)   */}
        {/* =================================================================== */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                {isRtl ? 'شنو هو المشكل اللي عندك اليوم ؟' : 'Quel est votre problème aujourd’hui ?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRtl
                  ? 'اختر نوع العطب للحصول على معلم معتمد في الحين'
                  : 'Touchez le motif de votre panne pour qualifier votre besoin en 1 clic'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DIAGNOSTIC_TAXONOMY.map((issue) => {
                const IconComp = issue.icon;
                const isSelected = selectedIssue?.id === issue.id;

                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => handleSelectIssue(issue)}
                    className={`p-4 sm:p-4.5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 active:scale-[0.98] cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50/70 border-2 border-blue-600 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-xs bg-gradient-to-br ${issue.color} group-hover:scale-105 transition-transform`}
                    >
                      <IconComp weight="duotone" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-black text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors truncate">
                          {isRtl ? issue.titleAr : issue.titleFr}
                        </h4>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                          {isRtl ? 'اتفاق مباشر' : 'Accord Direct'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {isRtl ? issue.descAr : issue.descFr}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* =================================================================== */}
        {/* 🌟 ÉTAPE 2 : LE DIAGNOSTIC GUIDÉ (QUESTIONS À CHOIX MULTIPLES)      */}
        {/* =================================================================== */}
        {step === 2 && selectedIssue && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${selectedIssue.color}`}
              >
                <selectedIssue.icon weight="duotone" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isRtl ? 'العطب المختار' : 'Panne sélectionnée'}
                </span>
                <h4 className="text-sm font-black text-slate-900">
                  {isRtl ? selectedIssue.titleAr : selectedIssue.titleFr}
                </h4>
              </div>
            </div>

            {/* Questions de qualification */}
            <div className="space-y-6">
              {selectedIssue.questions.map((q, qIndex) => {
                const currentVal = answers[q.id];

                return (
                  <div key={q.id} className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold mr-2 ml-2">
                        {qIndex + 1}
                      </span>
                      {isRtl ? q.labelAr : q.labelFr}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIndex) => {
                        const isOptSelected =
                          currentVal === opt.value || currentVal === opt.valueAr;

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() =>
                              handleAnswerSelect(
                                q.id,
                                isRtl ? opt.valueAr : opt.value
                              )
                            }
                            className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all duration-150 active:scale-95 cursor-pointer ${
                              isOptSelected
                                ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 text-left">
                              <span className="text-lg">{opt.icon}</span>
                              <span className="font-bold text-slate-900">
                                {isRtl ? opt.valueAr : opt.value}
                              </span>
                            </span>
                            {isOptSelected && (
                              <CheckCircle
                                weight="fill"
                                className="w-5 h-5 text-blue-600 flex-shrink-0"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRtl ? 'متابعة لتحديد الموقع' : 'Continuer vers la localisation'}</span>
                {isRtl ? <ArrowLeft weight="bold" /> : <ArrowRight weight="bold" />}
              </button>
            </div>
          </motion.div>
        )}

        {/* =================================================================== */}
        {/* 🌟 ÉTAPE 3 : LOCALISATION GPS & QUARTIER EXACT (MOBILE-FIRST)        */}
        {/* =================================================================== */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {isRtl ? 'فين كاين هاد العطب بالضبط ؟' : 'Où se situe l’intervention ?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isRtl
                  ? 'السيستيم كايحدد المعلمين اللي قراب ليك فالحومة ديالك'
                  : 'Nous alertons uniquement les Maâlems disponibles dans votre secteur'}
              </p>
            </div>

            {/* Bouton GPS Instantané Mobile */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MapPin weight="fill" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    {isRtl ? 'الموقع الجغرافي الدقيق' : 'Position GPS en temps réel'}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {selectedCity} • {selectedDistrict}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleUseCurrentGPS}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin weight="bold" />
                  <span>{isRtl ? 'حدد موقعي تلقائياً' : 'Détecter ma position'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapModal(!showMapModal)}
                  className="px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  {showMapModal ? (isRtl ? 'إخفاء الخريطة' : 'Masquer carte') : (isRtl ? 'تعديل بالخريطة' : 'Ajuster sur carte')}
                </button>
              </div>
            </div>

            {/* Carte rétractable si souhaité */}
            {showMapModal && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <InteractiveMap
                  mode="CLIENT_PICKER"
                  selectedLat={selectedLat}
                  selectedLng={selectedLng}
                  onLocationSelect={(lat, lng) => {
                    setSelectedLat(lat);
                    setSelectedLng(lng);
                    updateCityAndDistrictFromGPS(lat, lng);
                  }}
                  filterCategory={serviceType}
                />
              </div>
            )}

            {/* Sélecteur Ville & Quartier synchronisé */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isRtl ? 'المدينة :' : 'Ville :'}
                  </label>
                  <CustomDropdown
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={cityOptions}
                    placeholder={isRtl ? 'اختر المدينة...' : 'Choisir une ville...'}
                    icon={Buildings}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isRtl ? 'الحي / المنطقة :' : 'Quartier / Secteur :'}
                  </label>
                  <CustomDropdown
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    options={districtOptions}
                    placeholder={isRtl ? 'اختر الحي...' : 'Choisir un quartier...'}
                    icon={MapPinLine}
                  />
                </div>
              </div>

              {/* Champ complément d'adresse */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isRtl ? 'تفاصيل إضافية للعنوان (اختياري) :' : "Complément d'adresse (Optionnel) :"}
                </label>
                <input
                  type="text"
                  value={accessDetails}
                  onChange={(e) => setAccessDetails(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'مثال : إقامة الضحى، عمارة 4، الطبقة 3، الباب على اليمين...'
                      : 'Ex: Résidence Al Andalous, Imm 4, 3ème étage, porte droite...'
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRtl ? 'متابعة لتأكيد الطلب' : 'Continuer vers le récapitulatif'}</span>
                {isRtl ? <ArrowLeft weight="bold" /> : <ArrowRight weight="bold" />}
              </button>
            </div>
          </motion.div>
        )}

        {/* =================================================================== */}
        {/* 🌟 ÉTAPE 4 : CONFIRMATION, VOCAL/PHOTO & LANCEMENT RADAR SOS         */}
        {/* =================================================================== */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 🎟️ Carte d'embarquement SOS (Récapitulatif ultra-clair) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {isRtl ? 'طلب جاهز للإرسال' : 'Ticket d’intervention prêt'}
                  </span>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                  {selectedCity}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    {isRtl ? 'العطب المؤهل :' : 'Problème qualifié :'}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span className="text-blue-400">⚡</span>
                    <span>{selectedSubcategory || (isRtl ? selectedIssue.titleAr : selectedIssue.titleFr)}</span>
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/60 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      {isRtl ? 'الحي :' : 'Secteur :'}
                    </span>
                    <span className="font-bold text-slate-200">{selectedDistrict}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      {isRtl ? 'التوقيت :' : 'Délai :'}
                    </span>
                    <span className="font-bold text-amber-400">
                      {isRtl ? '🚨 فوري (تحت 20-30 دقيقة)' : '🚨 Immédiat (20-30 min)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🛡️ Règle Fondamentale : Transparence Tarifaire Marocaine */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 sm:p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck weight="duotone" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {isRtl ? 'شفافية الأثمنة والاتفاق المسبق' : 'Transparence & Diagnostic sur Place'}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {isRtl
                      ? 'الديبلاصمون والمُعاينة : 40 - 50 درهم • اتفاق مسبق على ثمن الخدمة قبل البدء'
                      : 'Déplacement & Constat : 40 - 50 DH • Aucun prix imposé, Accord Direct avec le Maâlem'}
                  </p>
                </div>
              </div>
            </div>

            {/* 🎙️ Note Vocale Optionnelle en Darija / Français */}
            <div className="space-y-1.5">
              <VoiceRecorder
                onAudioRecorded={(url) => setAudioUrl(url)}
                audioUrl={audioUrl}
                onClearAudio={() => setAudioUrl(null)}
              />
              <p className="text-[11px] text-slate-500 text-center font-medium">
                {isRtl
                  ? '💡 تقدر تسجل أوديو سريع بالدارجة تشرح فيه العطب للمعلم'
                  : '💡 Vous pouvez enregistrer une note vocale rapide en Darija ou Français'}
              </p>
            </div>

            {/* 📷 Photos Optionnelles */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Camera weight="bold" className="w-4 h-4 text-blue-600" />
                  <span>
                    {isRtl
                      ? `تصاور العطب (${photos.length}/3)`
                      : `Photos du problème (${photos.length}/3)`}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
                >
                  {showUrlInput
                    ? (isRtl ? 'رفع ملف' : 'Importer fichier')
                    : (isRtl ? 'رابط صورة' : 'Lien URL')}
                </button>
              </div>

              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {photos.map((picUrl, idx) => (
                    <div key={idx} className="relative inline-block">
                      <img
                        src={picUrl}
                        alt={`Photo ${idx + 1}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-blue-300 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute -top-1.5 -right-1.5 p-1 bg-red-600 text-white rounded-full shadow-md active:scale-90 cursor-pointer"
                      >
                        <X weight="bold" className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!showUrlInput ? (
                photos.length < 3 && (
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl cursor-pointer bg-white transition-colors">
                    <Upload weight="bold" className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">
                      {isRtl ? 'إضافة صورة من الهاتف' : 'Prendre ou ajouter une photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )
              ) : (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (photoUrl) {
                        setPhotoUrl('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            {/* 🚀 BOUTON D'ACTION PRINCIPAL : DÉCLENCHEMENT RADAR SOS */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSOSSubmit}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base rounded-2xl py-4 px-6 shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isRtl ? 'جاري إطلاق الرادار...' : 'Recherche des Maâlems en cours...'}</span>
                  </span>
                ) : (
                  <>
                    <span className="text-xl">⚡</span>
                    <span>
                      {isRtl
                        ? 'إطلاق رادار المعلمين دابا (SOS ديباناج)'
                        : 'Lancer l’Alerte Radar SOS Immédiate'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
