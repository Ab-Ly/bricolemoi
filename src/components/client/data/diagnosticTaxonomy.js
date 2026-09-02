import {
  Drop,
  Lightning,
  Key,
  Flame,
  Snowflake,
  Toilet,
  Door,
  HouseLine,
  Television,
  Car
} from '@phosphor-icons/react';

// Taxonomie Bilingue des Urgences & Installations Express (Français & الدارجة المغربية)
export const DIAGNOSTIC_TAXONOMY = [
  {
    id: 'leak',
    serviceType: 'PLUMBING',
    icon: Drop,
    color: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-100',
    titleFr: "Plomberie & Fuites d'eau",
    titleAr: "سباكة وترصيص (فويت د الما)",
    descFr: "Fuites robinetterie, tuyauterie, chasse d'eau WC ou canalisations",
    descAr: "روبيني كايسيل، قادوس، شاس د طواليط ولا فويت فالحيط",
    tags: ["Robinet & mitigeur", "Chasse d'eau WC", "Tuyau encastré", "Fuite compteur"],
    tagsAr: ["روبيني كايسيل", "شاس د طواليط", "فويت فالحيط", "الماڭانة"],
    questions: [
      {
        id: 'location',
        labelFr: "Où se situe la fuite d'eau ?",
        labelAr: "فين كاين هاد الفويت بالضبط ؟",
        options: [
          { value: "Robinet / Évier / Lavabo", valueAr: "روبيني أو لافابو كايسيل", icon: "🚿" },
          { value: "Chasse d'eau WC / Toilette", valueAr: "شاس د طواليط كاتسيل", icon: "🚽" },
          { value: "Chauffe-eau qui fuit", valueAr: "الشوفو د الما كايقطر", icon: "🔥" },
          { value: "Tuyau encastré / Mur humide", valueAr: "فالحيط أو تحت الزليج", icon: "💧" }
        ]
      },
      {
        id: 'severity',
        labelFr: "L'eau coule-t-elle sans arrêt ?",
        labelAr: "واش الما كايسيل بزاف دابا ؟",
        options: [
          { value: "Oui, débit fort (Vanne générale coupée)", valueAr: "الما كايسيل بزاف وسديت الماڭانة", icon: "🚨" },
          { value: "Non, simple goutte-à-goutte ou suintement", valueAr: "غير كايقطر بشوية", icon: "💧" }
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
    titleFr: "Débouchage & Évacuation Express",
    titleAr: "تسريح المجاري والقوادس",
    descFr: "Débouchage rapide toilettes, évier, douche, baignoire ou égout",
    descAr: "تسريح الطواليط، قادوس، ليفيي د الكوزينة أو الدوش",
    tags: ["WC toilette bouchée", "Évier de cuisine", "Siphon douche", "Regard principal"],
    tagsAr: ["طواليط مخنوقة", "قادوس ليفيي", "الدوش والبانيو", "القرقارة الكبيرة"],
    questions: [
      {
        id: 'target',
        labelFr: "Quel équipement est bouché ?",
        labelAr: "شنو اللي مخنوق ومبلوكي ؟",
        options: [
          { value: "WC / Toilette bouchée", valueAr: "الطواليط (WC)", icon: "🚽" },
          { value: "Évier de cuisine / Lavabo", valueAr: "ليفيي د الكوزينة أو لافابو", icon: "🥣" },
          { value: "Douche / Baignoire", valueAr: "الدوش أو البانيو", icon: "🚿" },
          { value: "Évacuation générale / Regard de cour", valueAr: "القرقارة الكبيرة د الدار", icon: "🕳️" }
        ]
      },
      {
        id: 'state',
        labelFr: "L'eau risque-t-elle de déborder ?",
        labelAr: "واش الما كيفيض فالأرض ؟",
        options: [
          { value: "Oui, débordement immédiat sur le sol", valueAr: "كايطلع الما وكايفيض دابا", icon: "🚨" },
          { value: "Non, évacuation très lente", valueAr: "كيمشي ثقيل بزاف بشوية", icon: "⏳" }
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
    titleFr: "Panne d'Électricité & Court-Circuit",
    titleAr: "عطب فالضو أو ديجونكتور طايح",
    descFr: "Coupure générale, disjoncteur qui saute, tableau électrique ou prises",
    descAr: "الضو تقطع، الماڭانة طايحة، بريز مفركع أو خيوط عريانين",
    tags: ["Disjoncteur qui saute", "Coupure générale", "Prises & interrupteurs", "Étincelles / odeur"],
    tagsAr: ["الماڭانة كطيح", "انقطاع الضو", "بريز خاسر", "ريحة الحريق"],
    questions: [
      {
        id: 'scope',
        labelFr: "Quelle est l'étendue de la panne électrique ?",
        labelAr: "شنو واقع فالضو دابا ؟",
        options: [
          { value: "Coupure totale (Disjoncteur général saute)", valueAr: "الدار كاملة طافية (الماڭانة طايحة)", icon: "🚨" },
          { value: "Prise ou interrupteur brûlé / cassé", valueAr: "بريز أو ساروت خاسر أو محروق", icon: "🔌" },
          { value: "Un appareil fait sauter les plombs", valueAr: "ماكينة أو فران كايطيح الضو", icon: "⚡" },
          { value: "Étincelles ou odeur de brûlé suspecte", valueAr: "ريحة الحريق أو شرارات فالخيوط", icon: "🔥" }
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
    titleFr: "Serrurerie & Porte Claquée",
    titleAr: "أقفال وسواريت (باب مسدود)",
    descFr: "Ouverture express sans dégât, clé cassée, cylindre ou serrure bloquée",
    descAr: "فتح الباب، ساروت مبلوكي لداخل أو تهرس فالقفل",
    tags: ["Porte claquée (clé dedans)", "Clé cassée dans serrure", "Serrure bloquée", "Changement cylindre"],
    tagsAr: ["الباب تسد والساروت لداخل", "ساروت تهرس فالقفل", "القفل مبلوكي", "تبديل الكالون"],
    questions: [
      {
        id: 'issue',
        labelFr: "Quelle est votre situation avec la porte ?",
        labelAr: "شنو واقع للباب والساروت ؟",
        options: [
          { value: "Porte claquée (clé restée à l'intérieur)", valueAr: "الباب تسد والساروت نسيتو لداخل", icon: "🚪" },
          { value: "Clé cassée dans le barillet / clé perdue", valueAr: "الساروت تهرس فالقفل أو توضّر", icon: "🗝️" },
          { value: "Serrure bloquée (la clé ne tourne plus)", valueAr: "القفل مبلوكي ماكايدورش بالساروت", icon: "🔒" }
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
    titleAr: "ريدو كهربائي وألمنيوم ومحلات",
    descFr: "Moteur volet bloqué, manivelle, rideau de magasin ou porte de garage",
    descAr: "ريدو هابط مابغاش يطلع، موطور كوانسي، ألمنيوم وتصليح",
    tags: ["Moteur volet électrique", "Rideau magasin / garage", "Lames décrochées", "Manivelle cassée"],
    tagsAr: ["ريدو كهربائي هابط", "ريدو د الحانوت والڭاراج", "السلايت خارجين", "المانيفيل"],
    questions: [
      {
        id: 'type',
        labelFr: "Quel équipement est bloqué ?",
        labelAr: "شنو هو الريدو اللي مبلوكي ؟",
        options: [
          { value: "Volet roulant électrique d'appartement / villa", valueAr: "ريدو كهربائي د الدار بالبوطون", icon: "🪟" },
          { value: "Rideau métallique de magasin ou garage", valueAr: "ريدو د الحانوت أو الڭاراج", icon: "🏪" },
          { value: "Volet roulant manuel à manivelle ou sangle", valueAr: "ريدو عادي بالمانيفيل أو السير", icon: "⚙️" }
        ]
      },
      {
        id: 'problem',
        labelFr: "Quelle est la panne constatée sur le volet ?",
        labelAr: "شنو العطب اللي فيه بالضبط ؟",
        options: [
          { value: "Moteur électrique bloqué (reste en bas)", valueAr: "الموطور ساكت والريدو هابط لتحت", icon: "🛑" },
          { value: "Lames cassées ou sorties des coulisses", valueAr: "السلايت مقطوعين أو خارجين د السكة", icon: "🛠️" }
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
    titleFr: "Chauffe-Eau (Gaz, Élec & Solaire)",
    titleAr: "شوفو وسخانات الماء (غاز / ضو)",
    descFr: "Pas d'eau chaude, étincelle absente, fuite d'eau, résistance ou solaire",
    descAr: "الما سخون ماكاينش، الشوفو ماكايشعلش أو كايسيل",
    tags: ["Chauffe-eau à Gaz", "Chauffe-eau Électrique", "Solaire de toiture", "Pas d'eau chaude"],
    tagsAr: ["شوفو د الغاز", "شوفو د الضو", "سخان الطاقة الشمسية", "الما بارد كايسيل"],
    questions: [
      {
        id: 'type',
        labelFr: "Quel type de chauffe-eau utilisez-vous ?",
        labelAr: "شنو نوع الشوفو ديالك ؟",
        options: [
          { value: "Chauffe-eau à Gaz (Bouteille / Ville)", valueAr: "شوفو د الغاز", icon: "🔥" },
          { value: "Chauffe-eau Électrique (Ballon mural)", valueAr: "شوفو د الضو (بالون)", icon: "⚡" },
          { value: "Chauffe-eau Solaire installé sur le toit", valueAr: "سخان الطاقة الشمسية ف السطح", icon: "☀️" }
        ]
      },
      {
        id: 'symptom',
        labelFr: "Quel est le problème constaté ?",
        labelAr: "شنو هو العطب اللي فيه ؟",
        options: [
          { value: "Ne s'allume pas / Pas d'eau chaude du tout", valueAr: "ماكايشعلش كاع / الما بارد", icon: "❄️" },
          { value: "Fuite d'eau continue sous l'appareil", valueAr: "كايسيل منو الما لتحت", icon: "💧" },
          { value: "Résistance grillée ou disjoncte au démarrage", valueAr: "الريزيستانس تحرقات أو كيطيح الضو", icon: "🔌" }
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
    titleFr: "Climatisation & Froid",
    titleAr: "تكييف وتبريد (كليماتيزور)",
    descFr: "Recharge de gaz Fréon, nettoyage filtres, fuite split ou ne refroidit plus",
    descAr: "مابقاش كايبرّد، خاصو شارج فريون أو كايكب الما",
    tags: ["Recharge gaz Fréon", "Ne refroidit plus", "Fuite d'eau intérieure", "Nettoyage filtres"],
    tagsAr: ["شارج غاز فريون", "مابقاش كايبرد", "كايكب الما فالبيت", "تنظيف الفلتر"],
    questions: [
      {
        id: 'need',
        labelFr: "Quel est le besoin sur votre climatiseur ?",
        labelAr: "شنو باغي تدير ليه ؟",
        options: [
          { value: "Ne refroidit plus (Besoin recharge gaz Fréon R410/R32)", valueAr: "ماكايبردش (خاصو غاز فريون)", icon: "💨" },
          { value: "L'appareil ne démarre pas / panne totale", valueAr: "ساكت مابغاش يخدم كاع", icon: "🛠️" },
          { value: "Fuite d'eau qui coule à l'intérieur de la pièce", valueAr: "كايكب الما فالبيت لداخل", icon: "💧" }
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
    descFr: "Réglage satellite Nilesat/Astra, pose caméras de sécurité, support TV mural",
    descAr: "ريڭلاج بارابول، كاميرات المراقبة للفيلا أو المحل، تعليق التلفاز فالحيط",
    tags: ["Réglage Nilesat & Astra", "Pose caméras surveillance", "Support mural TV", "Câblage antenne"],
    tagsAr: ["ريڭلاج نايلسات وأسترا", "كاميرات المراقبة", "تعليق التلفاز فالحيط", "كابلاج الريزو"],
    questions: [
      {
        id: 'tech_type',
        labelFr: "Quel est votre besoin d'installation technique ?",
        labelAr: "شنو نوع التركيب اللي محتاج دابا ؟",
        options: [
          { value: "Réglage Parabole / Signal perdu (Nilesat / Astra)", valueAr: "ريڭلاج البارابول والإشارة (نايلسات/أسترا)", icon: "📡" },
          { value: "Pose & Réglage Caméras de Surveillance (Maison / Magasin)", valueAr: "تركيب كاميرات المراقبة (دار / محل)", icon: "📹" },
          { value: "Fixation Support Mural TV (LED / OLED solide)", valueAr: "تعليق التلفاز فالحيط بسيبور صوليد", icon: "📺" },
          { value: "Câblage Antenne & Prise TV / Réseau Wi-Fi", valueAr: "كابلاج التلفاز والريزو فالدار", icon: "🔌" }
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
    descFr: "Machine à laver, réfrigérateur, four encastrable, plaques de cuisson",
    descAr: "ماكينة الصابون، لاف-فيسيل، ثلاجة، فران وبلاكة الطياب",
    tags: ["Machine à laver le linge", "Réfrigérateur en panne", "Four & plaque cuisson", "Lave-vaisselle"],
    tagsAr: ["ماكينة الصابون مابغاتش تعصر", "ثلاجة مابرداتش", "فران وبلاكة الطياب", "لاف فيسيل"],
    questions: [
      {
        id: 'appliance_type',
        labelFr: "Quel appareil électroménager est en panne ?",
        labelAr: "أشنو هو الجهاز اللي خاسر ؟",
        options: [
          { value: "Machine à laver le linge (Ne vidange pas / n'essore plus)", valueAr: "ماكينة الصابون مابغاتش تعصر أو كتقرقب", icon: "🧺" },
          { value: "Réfrigérateur / Congélateur (Ne refroidit plus ou givre)", valueAr: "الثلاجة أو الفريڭو مابقاش كايبرد", icon: "🧊" },
          { value: "Four encastrable ou Plaque de cuisson en panne", valueAr: "الفران د الضو أو بلاكة د الطياب", icon: "🍳" },
          { value: "Lave-vaisselle (Fuite d'eau ou arrêt au milieu du cycle)", valueAr: "لاف-فيسيل كاتسيل الما أو كاتبلوكي", icon: "🍽️" }
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
    descFr: "Batterie à plat à domicile, crevaison de roue, démarrage ou clés dedans",
    descAr: "باتري طايح عند الدار، رويدة مبنشرة، كابلات شارج ديباناج",
    tags: ["Batterie à plat (Booster)", "Pneu crevé (Secours)", "Clés enfermées dedans", "Aide démarrage"],
    tagsAr: ["باتري طايح عند الدار", "رويدة مبنشرة", "السواريت لداخل", "كابلات ديباناج"],
    questions: [
      {
        id: 'car_problem',
        labelFr: "Quel est le problème avec votre véhicule ?",
        labelAr: "شنو المشكل اللي واقع للسيارة ؟",
        options: [
          { value: "Batterie à plat (Besoin de booster / câbles à domicile)", valueAr: "الباتري طايح (خاص كابلات د الشارج)", icon: "🔋" },
          { value: "Pneu crevé (Besoin de changer la roue de secours)", valueAr: "الرويدة مبنشرة (خاص تبديل سكور)", icon: "🛞" },
          { value: "Clés enfermées à l'intérieur du véhicule", valueAr: "السواريت تسدو لداخل فالطوموبيل", icon: "🔑" },
          { value: "Démarrage impossible / Panne mécanique sur place", valueAr: "مابغاتش ديماري كاع", icon: "🚗" }
        ]
      }
    ]
  }
];
