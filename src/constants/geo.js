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
  {
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    lat: 33.5731,
    lng: -7.5898,
    activeMaalems: 420,
    districts: [
      { name: 'Maârif', lat: 33.5883, lng: -7.6328 },
      { name: 'Bourgogne', lat: 33.5950, lng: -7.6450 },
      { name: 'Gauthier', lat: 33.5820, lng: -7.6290 },
      { name: 'Anfa / Aïn Diab', lat: 33.5910, lng: -7.6600 },
      { name: 'Hay Hassani', lat: 33.5650, lng: -7.6650 },
      { name: 'Sidi Maarouf', lat: 33.5350, lng: -7.6450 },
      { name: 'Aïn Sebaâ', lat: 33.6050, lng: -7.5300 },
      { name: 'Bernoussi', lat: 33.6150, lng: -7.5000 },
      { name: 'Oasis / Polo', lat: 33.5600, lng: -7.6250 },
      { name: 'Centre-Ville', lat: 33.5930, lng: -7.6150 },
      { name: 'Belvédère', lat: 33.5970, lng: -7.5950 },
      { name: '2 Mars', lat: 33.5700, lng: -7.6100 },
      { name: 'Derb Sultan', lat: 33.5650, lng: -7.5900 },
      { name: 'Bouskoura', lat: 33.4480, lng: -7.6480 },
      { name: 'Dar Bouazza', lat: 33.5200, lng: -7.8200 },
      { name: 'Mohammedia', lat: 33.6860, lng: -7.3830 }
    ]
  },
  {
    name: 'Rabat',
    nameAr: 'الرباط',
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
    name: 'Marrakech',
    nameAr: 'مراكش',
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
      { name: 'Sidi Youssef Ben Ali', lat: 31.6050, lng: -7.9750 }
    ]
  },
  {
    name: 'Tanger',
    nameAr: 'طنجة',
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
    name: 'Salé',
    nameAr: 'سلا',
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
    name: 'Fès',
    nameAr: 'فاس',
    lat: 34.0181,
    lng: -5.0078,
    activeMaalems: 140,
    districts: [
      { name: 'Ville Nouvelle', lat: 34.0331, lng: -5.0003 },
      { name: 'Médina / Fès El Bali', lat: 34.0600, lng: -4.9750 },
      { name: 'Atlas', lat: 34.0200, lng: -5.0050 },
      { name: 'Narjiss', lat: 34.0050, lng: -4.9900 },
      { name: 'Route d\'Imouzzer', lat: 33.9900, lng: -5.0100 },
      { name: 'Champ de Course', lat: 34.0300, lng: -5.0150 },
      { name: 'Mont Fleuri', lat: 34.0100, lng: -4.9800 },
      { name: 'Zouagha', lat: 34.0400, lng: -5.0500 },
      { name: 'Bensouda', lat: 34.0250, lng: -5.0700 }
    ]
  },
  {
    name: 'Agadir',
    nameAr: 'أكادير',
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
      { name: 'Aourir / Taghazout', lat: 30.5000, lng: -9.6800 }
    ]
  },
  {
    name: 'Témara',
    nameAr: 'تمارة',
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
    name: 'Meknès',
    nameAr: 'مكناس',
    lat: 33.8938,
    lng: -5.5516,
    activeMaalems: 85,
    districts: [
      { name: 'Hamria / Centre-Ville', lat: 33.8950, lng: -5.5450 },
      { name: 'Médina', lat: 33.8900, lng: -5.5650 },
      { name: 'Mansour', lat: 33.8800, lng: -5.5350 },
      { name: 'Bassatine', lat: 33.9100, lng: -5.5300 },
      { name: 'Zitoune', lat: 33.8750, lng: -5.5550 },
      { name: 'Marjane', lat: 33.8650, lng: -5.5400 }
    ]
  }
];
