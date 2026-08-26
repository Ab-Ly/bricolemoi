export const COUNTRY_DIAL_CODES = [
  { code: 'MA', dial: '+212', flagUrl: 'https://flagcdn.com/w40/ma.png', name: 'Maroc', nameAr: 'المغرب', placeholder: '6 12 34 56 78' },
  { code: 'FR', dial: '+33', flagUrl: 'https://flagcdn.com/w40/fr.png', name: 'France (MRE)', nameAr: 'فرنسا', placeholder: '6 12 34 56 78' },
  { code: 'ES', dial: '+34', flagUrl: 'https://flagcdn.com/w40/es.png', name: 'Espagne (MRE)', nameAr: 'إسبانيا', placeholder: '612 345 678' },
  { code: 'BE', dial: '+32', flagUrl: 'https://flagcdn.com/w40/be.png', name: 'Belgique (MRE)', nameAr: 'بلجيكا', placeholder: '470 12 34 56' },
  { code: 'IT', dial: '+39', flagUrl: 'https://flagcdn.com/w40/it.png', name: 'Italie (MRE)', nameAr: 'إيطاليا', placeholder: '312 345 6789' },
  { code: 'NL', dial: '+31', flagUrl: 'https://flagcdn.com/w40/nl.png', name: 'Pays-Bas (MRE)', nameAr: 'هولندا', placeholder: '6 12 34 56 78' },
  { code: 'DE', dial: '+49', flagUrl: 'https://flagcdn.com/w40/de.png', name: 'Allemagne (MRE)', nameAr: 'ألمانيا', placeholder: '151 23456789' },
  { code: 'GB', dial: '+44', flagUrl: 'https://flagcdn.com/w40/gb.png', name: 'Royaume-Uni', nameAr: 'بريطانيا', placeholder: '7123 456789' },
  { code: 'CA', dial: '+1', flagUrl: 'https://flagcdn.com/w40/ca.png', name: 'Canada (MRE)', nameAr: 'كندا', placeholder: '514 123 4567' },
  { code: 'US', dial: '+1', flagUrl: 'https://flagcdn.com/w40/us.png', name: 'États-Unis', nameAr: 'أمريكا', placeholder: '202 555 0123' },
  { code: 'AE', dial: '+971', flagUrl: 'https://flagcdn.com/w40/ae.png', name: 'Émirats (Dubaï)', nameAr: 'الإمارات', placeholder: '50 123 4567' },
  { code: 'SA', dial: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png', name: 'Arabie Saoudite', nameAr: 'السعودية', placeholder: '50 123 4567' },
  { code: 'QA', dial: '+974', flagUrl: 'https://flagcdn.com/w40/qa.png', name: 'Qatar', nameAr: 'قطر', placeholder: '33 12 34 56' },
  { code: 'CH', dial: '+41', flagUrl: 'https://flagcdn.com/w40/ch.png', name: 'Suisse (MRE)', nameAr: 'سويسرا', placeholder: '78 123 45 67' },
  { code: 'SE', dial: '+46', flagUrl: 'https://flagcdn.com/w40/se.png', name: 'Suède (MRE)', nameAr: 'السويد', placeholder: '70 123 45 67' }
];

export const MOROCCAN_CITIES = [
  // ==========================================
  // 1. CASABLANCA - SETTAT
  // ==========================================
  {
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    lat: 33.5731,
    lng: -7.5898,
    activeMaalems: 420,
    districts: [
      { name: 'Maârif', lat: 33.5883, lng: -7.6328 },
      { name: 'Bourgogne', lat: 33.5950, lng: -7.6450 },
      { name: 'Gauthier', lat: 33.5820, lng: -7.6290 },
      { name: 'Anfa / Aïn Diab', lat: 33.5910, lng: -7.6600 },
      { name: 'Hay Hassani', lat: 33.5650, lng: -7.6650 },
      { name: 'Oulfa', lat: 33.5480, lng: -7.6750 },
      { name: 'Lissasfa', lat: 33.5300, lng: -7.6800 },
      { name: 'Sidi Maarouf', lat: 33.5350, lng: -7.6450 },
      { name: 'Californie', lat: 33.5420, lng: -7.6180 },
      { name: 'CIL / Beauséjour', lat: 33.5720, lng: -7.6520 },
      { name: 'Oasis / Polo', lat: 33.5600, lng: -7.6250 },
      { name: 'Centre-Ville', lat: 33.5930, lng: -7.6150 },
      { name: 'Belvédère', lat: 33.5970, lng: -7.5950 },
      { name: '2 Mars', lat: 33.5700, lng: -7.6100 },
      { name: 'Derb Sultan', lat: 33.5650, lng: -7.5900 },
      { name: 'Sbata', lat: 33.5500, lng: -7.5700 },
      { name: 'Sidi Othman', lat: 33.5600, lng: -7.5500 },
      { name: 'Hay Mohammadi', lat: 33.5900, lng: -7.5650 },
      { name: 'Aïn Sebaâ', lat: 33.6050, lng: -7.5300 },
      { name: 'Bernoussi', lat: 33.6150, lng: -7.5000 },
      { name: 'Sidi Moumen', lat: 33.5900, lng: -7.5200 },
      { name: 'Tit Mellil', lat: 33.5550, lng: -7.4800 },
      { name: 'Médiouna', lat: 33.4500, lng: -7.5100 },
      { name: 'Errahma', lat: 33.5150, lng: -7.7650 }
    ]
  },
  {
    name: 'Mohammedia',
    nameAr: 'المحمدية',
    region: 'Casablanca-Settat',
    lat: 33.6860,
    lng: -7.3830,
    activeMaalems: 95,
    districts: [
      { name: 'Centre-Ville', lat: 33.6880, lng: -7.3850 },
      { name: 'Kasbah / Plage', lat: 33.7050, lng: -7.3750 },
      { name: 'El Alia', lat: 33.6750, lng: -7.3950 },
      { name: 'Wafa', lat: 33.6900, lng: -7.4050 },
      { name: 'Monica', lat: 33.7120, lng: -7.3600 }
    ]
  },
  {
    name: 'Bouskoura',
    nameAr: 'بوسكورة',
    region: 'Casablanca-Settat',
    lat: 33.4480,
    lng: -7.6480,
    activeMaalems: 60,
    districts: [
      { name: 'Ville Verte', lat: 33.4650, lng: -7.6350 },
      { name: 'Centre Bouskoura', lat: 33.4480, lng: -7.6480 },
      { name: 'Victoria', lat: 33.4350, lng: -7.6600 }
    ]
  },
  {
    name: 'Dar Bouazza',
    nameAr: 'دار بوعزة',
    region: 'Casablanca-Settat',
    lat: 33.5200,
    lng: -7.8200,
    activeMaalems: 55,
    districts: [
      { name: 'Tamaris / Plage', lat: 33.5350, lng: -7.8450 },
      { name: 'Errahma', lat: 33.5150, lng: -7.7650 },
      { name: 'Centre Dar Bouazza', lat: 33.5200, lng: -7.8200 }
    ]
  },
  {
    name: 'El Jadida',
    nameAr: 'الجديدة',
    region: 'Casablanca-Settat',
    lat: 33.2563,
    lng: -8.5088,
    activeMaalems: 85,
    districts: [
      { name: 'Cité Portugaise / Centre', lat: 33.2560, lng: -8.5050 },
      { name: 'Sidi Bouzid', lat: 33.2300, lng: -8.5500 },
      { name: 'Al Qods / Salam', lat: 33.2450, lng: -8.5150 }
    ]
  },
  {
    name: 'Settat',
    nameAr: 'سطات',
    region: 'Casablanca-Settat',
    lat: 33.0010,
    lng: -7.6166,
    activeMaalems: 65,
    districts: [
      { name: 'Centre-Ville', lat: 33.0010, lng: -7.6166 },
      { name: 'Hay Salam', lat: 32.9920, lng: -7.6250 },
      { name: 'Mmimouna', lat: 33.0150, lng: -7.6050 }
    ]
  },
  {
    name: 'Berrechid',
    nameAr: 'برشيد',
    region: 'Casablanca-Settat',
    lat: 33.2655,
    lng: -7.5875,
    activeMaalems: 50,
    districts: [
      { name: 'Centre-Ville', lat: 33.2655, lng: -7.5875 },
      { name: 'Hay Hassani', lat: 33.2720, lng: -7.5780 }
    ]
  },

  // ==========================================
  // 2. RABAT - SALÉ - KÉNITRA
  // ==========================================
  {
    name: 'Rabat',
    nameAr: 'الرباط',
    region: 'Rabat-Salé-Kénitra',
    lat: 34.0209,
    lng: -6.8416,
    activeMaalems: 260,
    districts: [
      { name: 'Agdal', lat: 34.0000, lng: -6.8500 },
      { name: 'Hassan / Centre', lat: 34.0200, lng: -6.8300 },
      { name: 'Souissi', lat: 33.9750, lng: -6.8350 },
      { name: 'Hay Riad', lat: 33.9650, lng: -6.8750 },
      { name: 'Océan', lat: 34.0250, lng: -6.8550 },
      { name: 'Yacoub El Mansour', lat: 34.0100, lng: -6.8800 },
      { name: 'Diour Jamaa', lat: 34.0150, lng: -6.8450 },
      { name: 'Aviation', lat: 33.9900, lng: -6.8400 },
      { name: 'Mabella', lat: 34.0050, lng: -6.8250 },
      { name: 'Hay El Fath', lat: 33.9550, lng: -6.8900 }
    ]
  },
  {
    name: 'Salé',
    nameAr: 'سلا',
    region: 'Rabat-Salé-Kénitra',
    lat: 34.0531,
    lng: -6.7985,
    activeMaalems: 120,
    districts: [
      { name: 'Tabriquet', lat: 34.0450, lng: -6.8000 },
      { name: 'Bettana', lat: 34.0350, lng: -6.8150 },
      { name: 'Sala Al Jadida', lat: 34.0150, lng: -6.7550 },
      { name: 'Hay Salam', lat: 34.0550, lng: -6.8100 },
      { name: 'Bab Lamrissa', lat: 34.0380, lng: -6.8200 },
      { name: 'Sidi Moussa', lat: 34.0500, lng: -6.8300 },
      { name: 'Hay Rahma', lat: 34.0600, lng: -6.7800 }
    ]
  },
  {
    name: 'Témara',
    nameAr: 'تمارة',
    region: 'Rabat-Salé-Kénitra',
    lat: 33.9267,
    lng: -6.9122,
    activeMaalems: 85,
    districts: [
      { name: 'Centre Témara', lat: 33.9250, lng: -6.9100 },
      { name: 'Massira 1 & 2', lat: 33.9350, lng: -6.9000 },
      { name: 'Wifaq', lat: 33.9400, lng: -6.8900 },
      { name: 'Harhoura', lat: 33.9450, lng: -6.9400 },
      { name: 'Val d\'Or', lat: 33.9300, lng: -6.9550 },
      { name: 'Sables d\'Or', lat: 33.9200, lng: -6.9650 },
      { name: 'Ain Attig', lat: 33.8750, lng: -6.9600 }
    ]
  },
  {
    name: 'Kénitra',
    nameAr: 'القنيطرة',
    region: 'Rabat-Salé-Kénitra',
    lat: 34.2610,
    lng: -6.5802,
    activeMaalems: 115,
    districts: [
      { name: 'Centre-Ville / Maâmora', lat: 34.2610, lng: -6.5802 },
      { name: 'Mehdia / Plage', lat: 34.2550, lng: -6.6750 },
      { name: 'Bir Rami', lat: 34.2400, lng: -6.5950 },
      { name: 'Val Fleury', lat: 34.2700, lng: -6.5650 },
      { name: 'Saknia', lat: 34.2800, lng: -6.5700 },
      { name: 'Ouled Oujih', lat: 34.2500, lng: -6.5500 }
    ]
  },
  {
    name: 'Skhirat',
    nameAr: 'الصخيرات',
    region: 'Rabat-Salé-Kénitra',
    lat: 33.8525,
    lng: -7.0322,
    activeMaalems: 40,
    districts: [
      { name: 'Centre Skhirat', lat: 33.8525, lng: -7.0322 },
      { name: 'Plage Skhirat', lat: 33.8650, lng: -7.0450 }
    ]
  },

  // ==========================================
  // 3. FÈS - MEKNÈS
  // ==========================================
  {
    name: 'Fès',
    nameAr: 'فاس',
    region: 'Fès-Meknès',
    lat: 34.0181,
    lng: -5.0078,
    activeMaalems: 140,
    districts: [
      { name: 'Ville Nouvelle', lat: 34.0331, lng: -5.0003 },
      { name: 'Médina / Fès El Bali', lat: 34.0600, lng: -4.9750 },
      { name: 'Atlas', lat: 34.0200, lng: -5.0050 },
      { name: 'Saïss', lat: 33.9850, lng: -4.9750 },
      { name: 'Oulad Tayeb', lat: 33.9550, lng: -4.9950 },
      { name: 'Aïn Chkef', lat: 33.9700, lng: -5.0400 },
      { name: 'Narjiss', lat: 34.0050, lng: -4.9900 },
      { name: 'Route d\'Imouzzer', lat: 33.9900, lng: -5.0100 },
      { name: 'Route de Sefrou', lat: 34.0000, lng: -4.9700 },
      { name: 'Champ de Course', lat: 34.0300, lng: -5.0150 },
      { name: 'Mont Fleuri', lat: 34.0100, lng: -4.9800 },
      { name: 'Dokkarat', lat: 34.0450, lng: -5.0100 },
      { name: 'Aïn Kadous', lat: 34.0650, lng: -4.9900 },
      { name: 'Zouagha', lat: 34.0400, lng: -5.0500 },
      { name: 'Bensouda', lat: 34.0250, lng: -5.0700 },
      { name: 'Sidi Harazem', lat: 34.0250, lng: -4.8800 }
    ]
  },
  {
    name: 'Meknès',
    nameAr: 'مكناس',
    region: 'Fès-Meknès',
    lat: 33.8938,
    lng: -5.5516,
    activeMaalems: 85,
    districts: [
      { name: 'Hamria / Centre-Ville', lat: 33.8950, lng: -5.5450 },
      { name: 'Médina', lat: 33.8900, lng: -5.5650 },
      { name: 'Mansour', lat: 33.8800, lng: -5.5350 },
      { name: 'Bassatine', lat: 33.9100, lng: -5.5300 },
      { name: 'Zitoune', lat: 33.8750, lng: -5.5550 },
      { name: 'Marjane', lat: 33.8650, lng: -5.5400 },
      { name: 'Sidi Bouzekri', lat: 33.8850, lng: -5.5100 },
      { name: 'Toulal', lat: 33.8890, lng: -5.5900 },
      { name: 'Ouislane', lat: 33.9120, lng: -5.4850 }
    ]
  },
  {
    name: 'El Hajeb',
    nameAr: 'الحاجب',
    region: 'Fès-Meknès',
    lat: 33.6872,
    lng: -5.3711,
    activeMaalems: 35,
    districts: [
      { name: 'Centre El Hajeb', lat: 33.6872, lng: -5.3711 },
      { name: 'Aïn Khadem', lat: 33.6930, lng: -5.3650 },
      { name: 'Aïn Maarouf / Cantina', lat: 33.9541, lng: -4.9928 }
    ]
  },
  {
    name: 'Ifrane',
    nameAr: 'إفران',
    region: 'Fès-Meknès',
    lat: 33.5333,
    lng: -5.1000,
    activeMaalems: 30,
    districts: [
      { name: 'Centre Ifrane', lat: 33.5333, lng: -5.1000 },
      { name: 'Quartier Universitaire', lat: 33.5250, lng: -5.1100 }
    ]
  },
  {
    name: 'Azrou',
    nameAr: 'أزرو',
    region: 'Fès-Meknès',
    lat: 33.4333,
    lng: -5.2167,
    activeMaalems: 28,
    districts: [
      { name: 'Centre Azrou', lat: 33.4333, lng: -5.2167 },
      { name: 'Tioumliline', lat: 33.4200, lng: -5.2300 }
    ]
  },
  {
    name: 'Sefrou',
    nameAr: 'صفرو',
    region: 'Fès-Meknès',
    lat: 33.8333,
    lng: -4.8333,
    activeMaalems: 32,
    districts: [
      { name: 'Centre Sefrou', lat: 33.8333, lng: -4.8333 },
      { name: 'Bahlil', lat: 33.8500, lng: -4.8667 }
    ]
  },
  {
    name: 'Taza',
    nameAr: 'تازة',
    region: 'Fès-Meknès',
    lat: 34.2167,
    lng: -4.0167,
    activeMaalems: 45,
    districts: [
      { name: 'Taza Haute', lat: 34.2100, lng: -4.0100 },
      { name: 'Taza Basse / Gare', lat: 34.2250, lng: -4.0250 }
    ]
  },

  // ==========================================
  // 4. MARRAKECH - SAFI
  // ==========================================
  {
    name: 'Marrakech',
    nameAr: 'مراكش',
    region: 'Marrakech-Safi',
    lat: 31.6295,
    lng: -7.9811,
    activeMaalems: 190,
    districts: [
      { name: 'Guéliz', lat: 31.6333, lng: -8.0167 },
      { name: 'Hivernage', lat: 31.6200, lng: -8.0100 },
      { name: 'Médina', lat: 31.6250, lng: -7.9890 },
      { name: 'Semlalia', lat: 31.6450, lng: -8.0200 },
      { name: 'Targa', lat: 31.6550, lng: -8.0500 },
      { name: 'Mhamid', lat: 31.5950, lng: -8.0400 },
      { name: 'Massira', lat: 31.6350, lng: -8.0550 },
      { name: 'Daoudiate', lat: 31.6500, lng: -7.9950 },
      { name: 'Palmeraie', lat: 31.6600, lng: -7.9500 },
      { name: 'Sidi Youssef Ben Ali', lat: 31.6050, lng: -7.9750 },
      { name: 'Sidi Ghanem', lat: 31.6680, lng: -8.0450 }
    ]
  },
  {
    name: 'Safi',
    nameAr: 'آسفي',
    region: 'Marrakech-Safi',
    lat: 32.2994,
    lng: -9.2372,
    activeMaalems: 60,
    districts: [
      { name: 'Centre / Plateau', lat: 32.2994, lng: -9.2372 },
      { name: 'Kouki', lat: 32.2850, lng: -9.2250 },
      { name: 'Sidi Bouzid Safi', lat: 32.3300, lng: -9.2550 }
    ]
  },
  {
    name: 'Essaouira',
    nameAr: 'الصويرة',
    region: 'Marrakech-Safi',
    lat: 31.5085,
    lng: -9.7595,
    activeMaalems: 45,
    districts: [
      { name: 'Médina / Port', lat: 31.5120, lng: -9.7700 },
      { name: 'Borj / Ghazoua', lat: 31.4750, lng: -9.7250 }
    ]
  },

  // ==========================================
  // 5. TANGER - TÉTOUAN - AL HOCEÏMA
  // ==========================================
  {
    name: 'Tanger',
    nameAr: 'طنجة',
    region: 'Tanger-Tétouan-Al Hoceïma',
    lat: 35.7595,
    lng: -5.8340,
    activeMaalems: 175,
    districts: [
      { name: 'Malabata', lat: 35.7800, lng: -5.7900 },
      { name: 'Centre-Ville', lat: 35.7720, lng: -5.8080 },
      { name: 'Boukhalef', lat: 35.7250, lng: -5.8950 },
      { name: 'Iberia', lat: 35.7750, lng: -5.8180 },
      { name: 'Marshane', lat: 35.7900, lng: -5.8200 },
      { name: 'California', lat: 35.7850, lng: -5.8450 },
      { name: 'Val Fleuri', lat: 35.7600, lng: -5.8100 },
      { name: 'Mesnana', lat: 35.7450, lng: -5.8500 },
      { name: 'Beni Makada', lat: 35.7400, lng: -5.8000 },
      { name: 'Achakar', lat: 35.7600, lng: -5.9200 }
    ]
  },
  {
    name: 'Tétouan',
    nameAr: 'تطوان',
    region: 'Tanger-Tétouan-Al Hoceïma',
    lat: 35.5889,
    lng: -5.3626,
    activeMaalems: 80,
    districts: [
      { name: 'Centre / Ensanche', lat: 35.5700, lng: -5.3700 },
      { name: 'Martil', lat: 35.6167, lng: -5.2667 },
      { name: 'M\'diq / Cabo Negro', lat: 35.6850, lng: -5.3200 },
      { name: 'Fnideq', lat: 35.8500, lng: -5.3500 },
      { name: 'Wilaya', lat: 35.5850, lng: -5.3550 }
    ]
  },
  {
    name: 'Larache',
    nameAr: 'العرائش',
    region: 'Tanger-Tétouan-Al Hoceïma',
    lat: 35.1833,
    lng: -6.1500,
    activeMaalems: 40,
    districts: [
      { name: 'Centre-Ville', lat: 35.1833, lng: -6.1500 },
      { name: 'Balcon Atlantico', lat: 35.1950, lng: -6.1600 }
    ]
  },
  {
    name: 'Al Hoceïma',
    nameAr: 'الحسيمة',
    region: 'Tanger-Tétouan-Al Hoceïma',
    lat: 35.2472,
    lng: -3.9322,
    activeMaalems: 35,
    districts: [
      { name: 'Centre / Calabonita', lat: 35.2472, lng: -3.9322 },
      { name: 'Imzouren', lat: 35.1450, lng: -3.8550 }
    ]
  },
  {
    name: 'Chefchaouen',
    nameAr: 'شفشاون',
    region: 'Tanger-Tétouan-Al Hoceïma',
    lat: 35.1688,
    lng: -5.2636,
    activeMaalems: 25,
    districts: [
      { name: 'Médina Bleue', lat: 35.1688, lng: -5.2636 },
      { name: 'Outa El Hammam', lat: 35.1710, lng: -5.2610 }
    ]
  },

  // ==========================================
  // 6. SOUSS - MASSA
  // ==========================================
  {
    name: 'Agadir',
    nameAr: 'أكادير',
    region: 'Souss-Massa',
    lat: 30.4278,
    lng: -9.5981,
    activeMaalems: 110,
    districts: [
      { name: 'Centre-Ville', lat: 30.4200, lng: -9.5900 },
      { name: 'Founty / Baie des Palmiers', lat: 30.4050, lng: -9.6000 },
      { name: 'Talborjt', lat: 30.4280, lng: -9.5950 },
      { name: 'Dakhla', lat: 30.4100, lng: -9.5600 },
      { name: 'Salam', lat: 30.4050, lng: -9.5450 },
      { name: 'Al Houda', lat: 30.3950, lng: -9.5350 },
      { name: 'Charaf', lat: 30.4350, lng: -9.5800 },
      { name: 'Tikiouine', lat: 30.4000, lng: -9.4950 },
      { name: 'Bensergao', lat: 30.3800, lng: -9.5600 },
      { name: 'Inezgane / Aït Melloul', lat: 30.3550, lng: -9.5350 },
      { name: 'Aourir / Taghazout', lat: 30.5000, lng: -9.6800 }
    ]
  },
  {
    name: 'Taroudant',
    nameAr: 'تارودانت',
    region: 'Souss-Massa',
    lat: 30.4703,
    lng: -8.8770,
    activeMaalems: 35,
    districts: [
      { name: 'Centre / Remparts', lat: 30.4703, lng: -8.8770 },
      { name: 'Bab Zorgan', lat: 30.4650, lng: -8.8680 }
    ]
  },
  {
    name: 'Tiznit',
    nameAr: 'تيزنيت',
    region: 'Souss-Massa',
    lat: 29.6974,
    lng: -9.7316,
    activeMaalems: 30,
    districts: [
      { name: 'Centre / Source Bleue', lat: 29.6974, lng: -9.7316 }
    ]
  },

  // ==========================================
  // 7. ORIENTAL
  // ==========================================
  {
    name: 'Oujda',
    nameAr: 'وجدة',
    region: 'Oriental',
    lat: 34.6814,
    lng: -1.9086,
    activeMaalems: 90,
    districts: [
      { name: 'Centre-Ville', lat: 34.6814, lng: -1.9086 },
      { name: 'Lazaret', lat: 34.6950, lng: -1.8950 },
      { name: 'Al Qods', lat: 34.6700, lng: -1.9200 },
      { name: 'Sidi Yahya', lat: 34.6550, lng: -1.8850 }
    ]
  },
  {
    name: 'Nador',
    nameAr: 'الناظور',
    region: 'Oriental',
    lat: 35.1667,
    lng: -2.9333,
    activeMaalems: 75,
    districts: [
      { name: 'Centre / Corniche', lat: 35.1667, lng: -2.9333 },
      { name: 'Beni Ensar', lat: 35.2600, lng: -2.9300 },
      { name: 'Al Aaroui', lat: 35.0150, lng: -3.0150 }
    ]
  },
  {
    name: 'Berkane',
    nameAr: 'بركان',
    region: 'Oriental',
    lat: 34.9167,
    lng: -2.3167,
    activeMaalems: 40,
    districts: [
      { name: 'Centre Berkane', lat: 34.9167, lng: -2.3167 },
      { name: 'Saïdia / Marina', lat: 35.0833, lng: -2.2333 }
    ]
  },

  // ==========================================
  // 8. BÉNI MELLAL - KHÉNIFRA
  // ==========================================
  {
    name: 'Béni Mellal',
    nameAr: 'بني ملال',
    region: 'Béni Mellal-Khénifra',
    lat: 32.3373,
    lng: -6.3498,
    activeMaalems: 70,
    districts: [
      { name: 'Centre-Ville', lat: 32.3373, lng: -6.3498 },
      { name: 'Aïn Asserdoun', lat: 32.3250, lng: -6.3350 },
      { name: 'Al Massira', lat: 32.3450, lng: -6.3650 }
    ]
  },
  {
    name: 'Khouribga',
    nameAr: 'خريبكة',
    region: 'Béni Mellal-Khénifra',
    lat: 32.8811,
    lng: -6.9063,
    activeMaalems: 55,
    districts: [
      { name: 'Centre Khouribga', lat: 32.8811, lng: -6.9063 },
      { name: 'Oued Zem', lat: 32.8639, lng: -6.5736 }
    ]
  },
  {
    name: 'Khénifra',
    nameAr: 'خنيفرة',
    region: 'Béni Mellal-Khénifra',
    lat: 32.9333,
    lng: -5.6667,
    activeMaalems: 40,
    districts: [
      { name: 'Centre Khénifra', lat: 32.9333, lng: -5.6667 },
      { name: 'Sources Oum Errabia', lat: 33.0550, lng: -5.4150 }
    ]
  },

  // ==========================================
  // 9. DRÂA - TAFILALET
  // ==========================================
  {
    name: 'Errachidia',
    nameAr: 'الرشيدية',
    region: 'Drâa-Tafilalet',
    lat: 31.9319,
    lng: -4.4244,
    activeMaalems: 45,
    districts: [
      { name: 'Centre Errachidia', lat: 31.9319, lng: -4.4244 },
      { name: 'Erfoud / Merzouga', lat: 31.4333, lng: -4.2333 }
    ]
  },
  {
    name: 'Ouarzazate',
    nameAr: 'ورزازات',
    region: 'Drâa-Tafilalet',
    lat: 30.9189,
    lng: -6.8934,
    activeMaalems: 40,
    districts: [
      { name: 'Centre / Taourirt', lat: 30.9189, lng: -6.8934 },
      { name: 'Tinghir', lat: 31.5147, lng: -5.5328 }
    ]
  },

  // ==========================================
  // 10. PROVINCES DU SUD (LAÂYOUNE - DAKHLA - GUELMIM)
  // ==========================================
  {
    name: 'Laâyoune',
    nameAr: 'العيون',
    region: 'Laâyoune-Sakia El Hamra',
    lat: 27.1536,
    lng: -13.2033,
    activeMaalems: 65,
    districts: [
      { name: 'Centre / Place du Mechouar', lat: 27.1536, lng: -13.2033 },
      { name: 'Al Massira', lat: 27.1450, lng: -13.1950 },
      { name: 'Port de Laâyoune', lat: 27.0950, lng: -13.4150 }
    ]
  },
  {
    name: 'Dakhla',
    nameAr: 'الداخلة',
    region: 'Dakhla-Oued Ed-Dahab',
    lat: 23.7144,
    lng: -15.9389,
    activeMaalems: 35,
    districts: [
      { name: 'Centre Dakhla / Lagune', lat: 23.7144, lng: -15.9389 },
      { name: 'Pointe de l\'Or', lat: 23.8200, lng: -15.8900 }
    ]
  },
  {
    name: 'Guelmim',
    nameAr: 'كلميم',
    region: 'Guelmim-Oued Noun',
    lat: 28.9870,
    lng: -10.0574,
    activeMaalems: 30,
    districts: [
      { name: 'Centre Guelmim', lat: 28.9870, lng: -10.0574 },
      { name: 'Tan-Tan', lat: 28.4380, lng: -11.1032 }
    ]
  }
];
