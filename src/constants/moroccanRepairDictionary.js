/**
 * Dictionnaire Sémantique Enrichi des Pannes et Dépannages d'Urgence au Maroc (BricoleMoi)
 * 
 * Couvre l'ensemble des pannes du quotidien avec :
 * - Vocabulaire Français courant et technique
 * - Vocabulaire Darija marocain (Phonétique / Arabizi avec 3, 7, 9)
 * - Vocabulaire Arabe officiel
 * - Fautes de frappe et variantes fréquentes (Typo tolerance)
 * - Délais moyens d'intervention d'urgence (< 15-30 min)
 */

export const MOROCCAN_REPAIR_PROBLEMS = [
  // ====================================================================
  // 1. PLOMBERIE & SANITAIRE (سباكة وترصيص)
  // ====================================================================
  {
    id: 'plumb-leak-tap',
    category: 'PLUMBING',
    title: 'Fuite Robinet & Mitigeur',
    titleAr: 'تسرب الماء من الروبيني والميتيجور',
    keywords: [
      'fuite robinet', 'robinet qui coule', 'robinet qui fuit', 'mitigeur cuisine', 'melangeur sdb',
      'robinet cassé', 'joint robinet', 'robinet gougoutte', 'goutte a goutte',
      'robini', 'robini kay9ater', 'mitijour', 'tasaroub robini', 'fuite d eau', 'plombie', 'plombier'
    ],
    minPrice: 80,
    maxPrice: 150,
    timeEstimate: '< 15 min',
    urgencyLevel: 'HIGH',
    iconType: 'PLUMBING'
  },
  {
    id: 'plumb-water-heater',
    category: 'PLUMBING',
    title: 'Chauffe-Eau en Panne / Fuite',
    titleAr: 'عطب أو تسرب في الشوفو / سخان الماء',
    keywords: [
      'chauffe eau', 'chauffe bain', 'chofeau', 'chof-o', 'chofo', 'chaufe eau gaz', 'chauffe eau electrique',
      'chauffe eau coule', 'eau tiede', 'chauffe eau ne s allume pas', 'bouteille gaz chauffe eau',
      'chofage ma', 'sakhan ma', 'chofeau kay9ater', 'chofeau mataych3alch', 'plomberie chauffe eau'
    ],
    minPrice: 120,
    maxPrice: 280,
    timeEstimate: '< 20 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'PLUMBING'
  },
  {
    id: 'plumb-clogged-drain',
    category: 'PLUMBING',
    title: 'Canalisation & Évier Bouché (Qadous)',
    titleAr: 'قادوس مسدود / تسريح مجاري الصرف',
    keywords: [
      'canalisation bouchee', 'evier bouche', 'lavabo bouche', 'wc bouche', 'toilette bouchee', 'qadous masdoud',
      'kadous', 'debouchage canalisation', 'siphon bouche', 'mauvaise odeur egout', 'eau qui remonte',
      'tasrih majari', 'qadous', 'qawadis', 'bouchon tuyau', 'deboucher evier', 'sebbak debouchage'
    ],
    minPrice: 100,
    maxPrice: 220,
    timeEstimate: '< 15 min',
    urgencyLevel: 'HIGH',
    iconType: 'PLUMBING'
  },
  {
    id: 'plumb-flush-tank',
    category: 'PLUMBING',
    title: 'Chasse d\'Eau qui Coule / Cassée',
    titleAr: 'شاس الماء فالمرحاض كتسيل',
    keywords: [
      'chasse d eau', 'chasse d eau coule en continu', 'flotteur wc', 'mecanisme chasse d eau',
      'wc coule', 'toilettes fuite reservoir', 'chasse cassée', 'la chasse', 'chass', 'khazan ma'
    ],
    minPrice: 80,
    maxPrice: 160,
    timeEstimate: '< 15 min',
    urgencyLevel: 'MEDIUM',
    iconType: 'PLUMBING'
  },
  {
    id: 'plumb-burst-pipe',
    category: 'PLUMBING',
    title: 'Tuyau Percé & Inondation d\'Urgence',
    titleAr: 'قادوس مفركع / طوفان الماء فالدار',
    keywords: [
      'tuyau perce', 'tuyau casse', 'fuite d eau sous carrelage', 'inondation cuisine', 'compteur eau tourne',
      'pression eau basse', 'tuyau cuivre perce', 'tuyau ppr', 'tuyau pvc', 'tuyau mferga3', 'ghar9a d lma',
      'coupure eau generale', 'urgence fuite eau', 'vanne d arret bloquee'
    ],
    minPrice: 150,
    maxPrice: 350,
    timeEstimate: '< 15 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'PLUMBING'
  },
  {
    id: 'plumb-booster-pump',
    category: 'PLUMBING',
    title: 'Surpresseur & Pompe à Eau',
    titleAr: 'بومبة الماء والسوربريسور',
    keywords: [
      'surpresseur', 'pompe a eau', 'pompe de puits', 'pression d eau faible', 'manometre',
      'pompe ne demarre pas', 'pompe tourne en continu', 'bomba d lma', 'sorprisor'
    ],
    minPrice: 150,
    maxPrice: 350,
    timeEstimate: '< 25 min',
    urgencyLevel: 'HIGH',
    iconType: 'PLUMBING'
  },

  // ====================================================================
  // 2. ÉLECTRICITÉ & COURT-CIRCUIT (كهرباء وإصلاحات)
  // ====================================================================
  {
    id: 'elec-short-circuit',
    category: 'ELECTRICIAN',
    title: 'Court-Circuit & Disjoncteur qui Saute',
    titleAr: 'كور سيركوي / ديجونكتور كيطيح',
    keywords: [
      'court circuit', 'court jus', 'disjoncteur qui saute', 'disjoncte', 'dijancteur', 'dijoncteur',
      'tableau electrique', 'coupure generale', 'plus de lumiere', 'differenciel', 'disjoncteur coupe',
      'trikinti', 'dijanctor kayti7', 'cour sircwi', 'in9ita3 do', 'panne courant', 'electricien d urgence'
    ],
    minPrice: 100,
    maxPrice: 220,
    timeEstimate: '< 15 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'ELECTRICIAN'
  },
  {
    id: 'elec-burnt-socket',
    category: 'ELECTRICIAN',
    title: 'Prise Brûlée & Étincelles',
    titleAr: 'بريز محروق / شرارات الضوء',
    keywords: [
      'prise brulee', 'prise qui fume', 'etincelles prise', 'odeur de plastique brule', 'interrupteur casse',
      'briz m7rou9', 'chara d do', 'prise murale arrachee', 'remplacement prise', 'spot qui saute',
      'cable chauffe', 'electricite securite'
    ],
    minPrice: 80,
    maxPrice: 150,
    timeEstimate: '< 15 min',
    urgencyLevel: 'HIGH',
    iconType: 'ELECTRICIAN'
  },
  {
    id: 'elec-light-install',
    category: 'ELECTRICIAN',
    title: 'Installation Lustre, Spots & Éclairage',
    titleAr: 'تركيب الثريات والسبوطات والإضاءة',
    keywords: [
      'installation lustre', 'poser lustre', 'brancher spots led', 'ruban led', 'applique murale',
      'lumiere sdb', 'eclairage terrasse', 'lustre plafond', 'tarkib triya', 'spotat led'
    ],
    minPrice: 90,
    maxPrice: 200,
    timeEstimate: '< 25 min',
    urgencyLevel: 'MEDIUM',
    iconType: 'ELECTRICIAN'
  },
  {
    id: 'elec-triphase-upgrade',
    category: 'ELECTRICIAN',
    title: 'Équilibrage Tableau & Triphasé',
    titleAr: 'توزيع الأحمال وتري فازي',
    keywords: [
      'triphase', 'monophase', 'tableau triphase', 'puissance insuffisante', 'equilibrage phases',
      'cable 6mm', 'cable 10mm', 'compteur electrique one', 'redresseur de tension'
    ],
    minPrice: 180,
    maxPrice: 400,
    timeEstimate: '< 30 min',
    urgencyLevel: 'HIGH',
    iconType: 'ELECTRICIAN'
  },

  // ====================================================================
  // 3. SERRURERIE D'URGENCE (أقفال وكوالين)
  // ====================================================================
  {
    id: 'lock-slammed-door',
    category: 'SERRURERIE',
    title: 'Porte Claquée (Clés à l\'Intérieur)',
    titleAr: 'الباب تصفق والساروت لداخل (فتح سريع)',
    keywords: [
      'porte claquee', 'porte fermee de l interieur', 'cle a l interieur', 'cles oubliees', 'ouverture de porte',
      'serrure claquee', 'bab tsedd', 'sarout l dakhel', 'fath bab', 'porte sans cle',
      'serrurier ouverture sans casse', 'urgence porte bloquee', 'radiographie porte'
    ],
    minPrice: 120,
    maxPrice: 250,
    timeEstimate: '< 15 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'SERRURERIE'
  },
  {
    id: 'lock-broken-key',
    category: 'SERRURERIE',
    title: 'Clé Cassée dans la Serrure',
    titleAr: 'الساروت تهرس فالباب',
    keywords: [
      'cle cassee', 'cle cassee dans serrure', 'morceau de cle coince', 'extraire cle cassee',
      'sarout mahrsa', 'sarout thress f l9fel', 'serrure tournee dans le vide', 'serrurier urgent'
    ],
    minPrice: 100,
    maxPrice: 200,
    timeEstimate: '< 15 min',
    urgencyLevel: 'HIGH',
    iconType: 'SERRURERIE'
  },
  {
    id: 'lock-cylinder-replace',
    category: 'SERRURERIE',
    title: 'Changement de Serrure & Barillet Blindé',
    titleAr: 'تبديل الكولون وساروت الباب المصفح',
    keywords: [
      'changement serrure', 'changer cylindre', 'barillet blinde', 'serrure 3 points', 'serrure 5 points',
      'porte blindee', 'canon serrure', 'cles perdues', 'tabdil l9fel', 'serrure securite multipoints'
    ],
    minPrice: 150,
    maxPrice: 380,
    timeEstimate: '< 20 min',
    urgencyLevel: 'HIGH',
    iconType: 'SERRURERIE'
  },

  // ====================================================================
  // 4. VOLETS ROULANTS & RIDEAUX (ريدو كهربائي وألمنيوم)
  // ====================================================================
  {
    id: 'shutter-stuck-motor',
    category: 'VOLETS_RIDEAUX',
    title: 'Volet Roulant Électrique Bloqué',
    titleAr: 'ريدو كهربائي مبلوكي / عطب في الموتور',
    keywords: [
      'volet roulant bloque', 'moteur volet electrique', 'volet ne monte plus', 'volet ne descend plus',
      'rideau aluminium coince', 'telecommande volet', 'axe volet roulant', 'lames volet sorties',
      'rido electrique', 'motor d rido', 'rido habat ma kaytl3ch', 'volet somfy'
    ],
    minPrice: 120,
    maxPrice: 280,
    timeEstimate: '< 20 min',
    urgencyLevel: 'HIGH',
    iconType: 'VOLETS_RIDEAUX'
  },
  {
    id: 'shutter-metal-shop',
    category: 'VOLETS_RIDEAUX',
    title: 'Rideau Métallique Magasin & Garage',
    titleAr: 'ريدو حديد ديال المحل أو الكراج مبلوكي',
    keywords: [
      'rideau metallique magasin', 'rideau garage bloque', 'ressort rideau metallique', 'moteur rideau magasin',
      'serrure rideau metallique', 'rido magasin', 'rido d l garage', 'bab garage'
    ],
    minPrice: 150,
    maxPrice: 350,
    timeEstimate: '< 25 min',
    urgencyLevel: 'HIGH',
    iconType: 'VOLETS_RIDEAUX'
  },
  {
    id: 'shutter-manual-strap',
    category: 'VOLETS_RIDEAUX',
    title: 'Manivelle ou Sangle de Volet Cassée',
    titleAr: 'سير أو مانيفيل ديال الريدو تهرسات',
    keywords: [
      'manivelle cassee', 'sangle volet coupee', 'changement sangle volet', 'manivelle tourne dans le vide',
      'smeta d rido', 'manivel d rido'
    ],
    minPrice: 90,
    maxPrice: 180,
    timeEstimate: '< 20 min',
    urgencyLevel: 'MEDIUM',
    iconType: 'VOLETS_RIDEAUX'
  },

  // ====================================================================
  // 5. CLIMATISATION & FROID (تكييف وتبريد)
  // ====================================================================
  {
    id: 'ac-gas-recharge',
    category: 'CLIMATISATION',
    title: 'Recharge Gaz Climatiseur (Freon R410/R32)',
    titleAr: 'شحن غاز المكيف (فريون) وتبريد',
    keywords: [
      'recharge gaz clim', 'clim ne refroidit pas', 'gaz freon r410', 'gaz r32', 'gaz r22',
      'manque de gaz clim', 'recharge clim maison', 'charji gaz clim', 'clim makatbredch',
      'recharge fréon', 'climatiseur split'
    ],
    minPrice: 180,
    maxPrice: 380,
    timeEstimate: '< 25 min',
    urgencyLevel: 'HIGH',
    iconType: 'CLIMATISATION'
  },
  {
    id: 'ac-water-leak',
    category: 'CLIMATISATION',
    title: 'Clim qui Coule de l\'Eau à l\'Intérieur',
    titleAr: 'المكيف كيسيل الماء لداخل الغرفة',
    keywords: [
      'clim qui coule', 'fuite d eau climatiseur', 'tuyau condensat bouche', 'bac condensat deborde',
      'clim katgoutti lma', 'climatiseur fait du bruit', 'odeur mauvaise clim'
    ],
    minPrice: 120,
    maxPrice: 220,
    timeEstimate: '< 20 min',
    urgencyLevel: 'MEDIUM',
    iconType: 'CLIMATISATION'
  },
  {
    id: 'ac-deep-clean',
    category: 'CLIMATISATION',
    title: 'Nettoyage & Désinfection Climatisation',
    titleAr: 'تنظيف وتعقيم فلاتر ومحرك المكيف',
    keywords: [
      'nettoyage clim', 'desinfection climatiseur', 'nettoyer filtres clim', 'entretien clim',
      'tanzif climatiseur', 'ghsil l clim'
    ],
    minPrice: 100,
    maxPrice: 200,
    timeEstimate: '< 30 min',
    urgencyLevel: 'LOW',
    iconType: 'CLIMATISATION'
  },

  // ====================================================================
  // 6. DÉPANNAGE AUTO & BATTERIE (ميكانيك وبطاريات)
  // ====================================================================
  {
    id: 'auto-flat-battery',
    category: 'AUTO_MECHANIC',
    title: 'Batterie à Plat & Démarrage Express (Câbles / Booster)',
    titleAr: 'باتري طايح / ديماراج سريع بالكابلات',
    keywords: [
      'batterie a plat', 'voiture ne demarre pas', 'cable batterie', 'booster batterie', 'pinces de demarrage',
      'batria khawya', 'tomobil matdemarich', 'tonobil makatdemarich', 'changement batterie voiture',
      'depannage batterie sur place', 'dépannage auto express'
    ],
    minPrice: 100,
    maxPrice: 200,
    timeEstimate: '< 15 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'AUTO_MECHANIC'
  },
  {
    id: 'auto-flat-tire',
    category: 'AUTO_MECHANIC',
    title: 'Crevaison & Changement de Roue de Secours',
    titleAr: 'رويدة مفشوشة / تبديل الرويدة على الطريق',
    keywords: [
      'crevaison pneu', 'changement roue secours', 'pneu creve', 'cric voiture', 'boulon roue coince',
      'rwida mfechoucha', 'tabdil rwida', 'pneu crevé sur place'
    ],
    minPrice: 90,
    maxPrice: 160,
    timeEstimate: '< 15 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'AUTO_MECHANIC'
  },
  {
    id: 'auto-towing-recovery',
    category: 'AUTO_MECHANIC',
    title: 'Remorquage Express / Dépanneuse Dépannage',
    titleAr: 'ديباناج سريع لجر السيارة المعطلة',
    keywords: [
      'depanneuse', 'remorquage voiture', 'voiture en panne sur route', 'dpanage tomobil',
      'remorquage casablanca', 'remorquage rabat', 'remorquage marrakech', 'remorquage tanger'
    ],
    minPrice: 200,
    maxPrice: 450,
    timeEstimate: '< 20 min',
    urgencyLevel: 'CRITICAL',
    iconType: 'AUTO_MECHANIC'
  },

  // ====================================================================
  // 7. ÉLECTROMÉNAGER & RÉPARATION (إصلاح الأجهزة المنزلية)
  // ====================================================================
  {
    id: 'appliance-washing-machine',
    category: 'APPLIANCE_REPAIR',
    title: 'Machine à Laver qui ne Tourne pas / Fuite',
    titleAr: 'ماكينة الصابون مكتعصرش / كتسيل الماء',
    keywords: [
      'machine a laver en panne', 'lave linge ne vidange pas', 'lave linge n essore pas', 'tambour bloque',
      'makina d saboun', 'ghassala d saboun', 'pompe vidange lave linge', 'courroie machine a laver'
    ],
    minPrice: 120,
    maxPrice: 280,
    timeEstimate: '< 30 min',
    urgencyLevel: 'HIGH',
    iconType: 'APPLIANCE_REPAIR'
  },
  {
    id: 'appliance-fridge',
    category: 'APPLIANCE_REPAIR',
    title: 'Réfrigérateur qui ne Refroidit pas',
    titleAr: 'الثلاجة مكتبردش / الموتور ساكت',
    keywords: [
      'refrigerateur ne refroidit pas', 'frigo en panne', 'moteur frigo ne tourne pas', 'fuite gaz frigo',
      'talaja makatbredch', 'frigo fait du bruit', 'termostat frigo'
    ],
    minPrice: 150,
    maxPrice: 350,
    timeEstimate: '< 30 min',
    urgencyLevel: 'HIGH',
    iconType: 'APPLIANCE_REPAIR'
  },

  // ====================================================================
  // 8. DÉMÉNAGEMENT & MONTAGE MEUBLES (ترحيل وتركيب الأثاث)
  // ====================================================================
  {
    id: 'move-furniture-transport',
    category: 'DEMENAGEMENT',
    title: 'Transport Meubles & Camionnette Express',
    titleAr: 'ترحيل الأثاث / نقل البضائع بالهوندا والكاميو',
    keywords: [
      'demenagement express', 'transport meubles', 'honda transport', 'camionnette demenagement',
      'porteurs meubles', 'tarhil atat', 'naql atat', 'naqal casablanca', 'transport bagages'
    ],
    minPrice: 180,
    maxPrice: 600,
    timeEstimate: '< 30 min',
    urgencyLevel: 'MEDIUM',
    iconType: 'DEMENAGEMENT'
  },
  {
    id: 'move-furniture-assembly',
    category: 'DEMENAGEMENT',
    title: 'Montage & Démontage Meubles (IKEA, Lit, Dressing)',
    titleAr: 'مونطاج وتركيب الأثاث (غرف النوم، البلاكارات)',
    keywords: [
      'montage meuble', 'montage lit', 'montage armoire dressing', 'montage meuble ikea', 'montage cuisine equipee',
      'tarkib atat', 'montaj bit n3as'
    ],
    minPrice: 120,
    maxPrice: 300,
    timeEstimate: '< 30 min',
    urgencyLevel: 'LOW',
    iconType: 'DEMENAGEMENT'
  }
];

// Catégories mères avec métadonnées enrichies
export const MOROCCAN_MAIN_CATEGORIES = [
  { id: 'PLUMBING', name: 'Plomberie & Sanitaire', nameAr: 'سباكة وترصيص', color: 'from-blue-600 to-cyan-600', icon: 'PLUMBING' },
  { id: 'ELECTRICIAN', name: 'Électricité & Court-Circuit', nameAr: 'كهرباء وإصلاحات', color: 'from-amber-500 to-yellow-600', icon: 'ELECTRICIAN' },
  { id: 'SERRURERIE', name: 'Serrurerie d\'Urgence', nameAr: 'أقفال وكوالين', color: 'from-emerald-600 to-teal-600', icon: 'SERRURERIE' },
  { id: 'VOLETS_RIDEAUX', name: 'Volets Roulants & Rideaux', nameAr: 'ريدو كهربائي وألمنيوم', color: 'from-cyan-600 to-blue-700', icon: 'VOLETS_RIDEAUX' },
  { id: 'CLIMATISATION', name: 'Climatisation & Froid', nameAr: 'تكييف وتبريد', color: 'from-sky-500 to-blue-600', icon: 'CLIMATISATION' },
  { id: 'AUTO_MECHANIC', name: 'Dépannage Auto Express', nameAr: 'ميكانيك وبطاريات', color: 'from-indigo-600 to-blue-700', icon: 'AUTO_MECHANIC' },
  { id: 'APPLIANCE_REPAIR', name: 'Électroménager', nameAr: 'أجهزة منزلية', color: 'from-purple-600 to-indigo-600', icon: 'APPLIANCE_REPAIR' },
  { id: 'DEMENAGEMENT', name: 'Déménagement & Montage', nameAr: 'ترحيل وتركيب', color: 'from-orange-500 to-amber-600', icon: 'DEMENAGEMENT' }
];
