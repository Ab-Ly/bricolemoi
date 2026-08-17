import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useEmergencyFlow, EMERGENCY_STATES } from '../context/EmergencyFlowContext';
import { VoiceRecorder } from './VoiceRecorder';
import { InteractiveMap } from './InteractiveMap';
import { CGUModal } from './CGUModal';
import { CategorySelector } from './CategorySelector';
import { 
  Car, 
  Droplet, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  Star, 
  X,
  MessageSquare,
  ChevronRight,
  ShieldAlert,
  FileCheck,
  Phone,
  Scale,
  Sparkles,
  Zap,
  Wrench,
  Upload,
  Trash2,
  Calendar,
  Siren,
  ShieldCheck as LucideShieldCheck
} from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';
import { 
  Buildings, 
  MapPinLine, 
  ShieldCheck, 
  Coins, 
  Sparkle, 
  ChatCircleDots, 
  Handshake, 
  CalendarCheck,
  ClockAfternoon,
  Lightning
} from '@phosphor-icons/react';

export const MOROCCAN_CITIES = [
  {
    name: 'Casablanca',
    lat: 33.5731,
    lng: -7.5898,
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
      { name: 'Centre-Ville', lat: 33.5930, lng: -7.6150 }
    ]
  },
  {
    name: 'Rabat',
    lat: 34.0209,
    lng: -6.8416,
    districts: [
      { name: 'Agdal', lat: 34.0000, lng: -6.8500 },
      { name: 'Hassan / Centre', lat: 34.0200, lng: -6.8300 },
      { name: 'Souissi', lat: 33.9750, lng: -6.8350 },
      { name: 'Hay Riad', lat: 33.9650, lng: -6.8750 },
      { name: 'Océan', lat: 34.0250, lng: -6.8550 },
      { name: 'Yacoub El Mansour', lat: 34.0100, lng: -6.8800 }
    ]
  },
  {
    name: 'Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    districts: [
      { name: 'Guéliz', lat: 31.6333, lng: -8.0167 },
      { name: 'Hivernage', lat: 31.6200, lng: -8.0100 },
      { name: 'Médina', lat: 31.6250, lng: -7.9890 },
      { name: 'Semlalia', lat: 31.6450, lng: -8.0200 },
      { name: 'Targa', lat: 31.6550, lng: -8.0500 },
      { name: 'Mhamid', lat: 31.5950, lng: -8.0400 }
    ]
  },
  {
    name: 'Tanger',
    lat: 35.7595,
    lng: -5.8340,
    districts: [
      { name: 'Malabata', lat: 35.7800, lng: -5.7900 },
      { name: 'Centre-Ville', lat: 35.7720, lng: -5.8080 },
      { name: 'Boukhalef', lat: 35.7250, lng: -5.8950 },
      { name: 'Iberia', lat: 35.7750, lng: -5.8180 },
      { name: 'Marshane', lat: 35.7900, lng: -5.8200 }
    ]
  },
  {
    name: 'Salé',
    lat: 34.0531,
    lng: -6.7985,
    districts: [
      { name: 'Tabriquet', lat: 34.0450, lng: -6.8000 },
      { name: 'Bettana', lat: 34.0350, lng: -6.8150 },
      { name: 'Sala Al Jadida', lat: 34.0150, lng: -6.7550 },
      { name: 'Hay Salam', lat: 34.0550, lng: -6.8100 }
    ]
  },
  {
    name: 'Fès',
    lat: 34.0181,
    lng: -5.0078,
    districts: [
      { name: 'Ville Nouvelle', lat: 34.0333, lng: -5.0000 },
      { name: 'Narjiss', lat: 34.0050, lng: -4.9850 },
      { name: 'Médina', lat: 34.0620, lng: -4.9780 },
      { name: 'Route Imouzzer', lat: 33.9900, lng: -5.0100 }
    ]
  },
  {
    name: 'Agadir',
    lat: 30.4278,
    lng: -9.5981,
    districts: [
      { name: 'Centre & Baie', lat: 30.4200, lng: -9.6000 },
      { name: 'Talborjt', lat: 30.4250, lng: -9.5900 },
      { name: 'Dakhla', lat: 30.4100, lng: -9.5600 },
      { name: 'Salam', lat: 30.4050, lng: -9.5500 }
    ]
  },
  {
    name: 'Mohammedia',
    lat: 33.6866,
    lng: -7.3828,
    districts: [
      { name: 'Kasbah', lat: 33.7000, lng: -7.3900 },
      { name: 'Plage & Marina', lat: 33.7100, lng: -7.3800 },
      { name: 'Monica', lat: 33.7150, lng: -7.3650 },
      { name: 'Riad Salam', lat: 33.6800, lng: -7.4000 }
    ]
  },
  {
    name: 'Kénitra',
    lat: 34.2610,
    lng: -6.5802,
    districts: [
      { name: 'Centre-Ville', lat: 34.2600, lng: -6.5800 },
      { name: 'Mehdia', lat: 34.2550, lng: -6.6750 },
      { name: 'Mimosa', lat: 34.2650, lng: -6.5700 },
      { name: 'Maamora', lat: 34.2500, lng: -6.5900 }
    ]
  },
  {
    name: 'Meknès',
    lat: 33.8938,
    lng: -5.5547,
    districts: [
      { name: 'Hamria', lat: 33.8950, lng: -5.5500 },
      { name: 'Ville Nouvelle', lat: 33.8900, lng: -5.5450 },
      { name: 'Mansour', lat: 33.8750, lng: -5.5650 }
    ]
  },
  {
    name: 'Tétouan',
    lat: 35.5889,
    lng: -5.3626,
    districts: [
      { name: 'Centre-Ville', lat: 35.5700, lng: -5.3700 },
      { name: 'Martil / Cabo', lat: 35.6150, lng: -5.2750 },
      { name: 'Wilaya', lat: 35.5800, lng: -5.3550 }
    ]
  }
];

const SERVICE_TYPE_MAP = {
  PLUMBING: { label: 'Plomberie & Sanitaire', icon: '💧' },
  ELECTRICIAN: { label: 'Électricité', icon: '⚡' },
  AUTO_MECHANIC: { label: 'Mécanique Auto', icon: '🚗' },
  CLIMATISATION: { label: 'Climatisation & Froid', icon: '❄️' },
  JARDINAGE: { label: 'Jardinage & Espaces Verts', icon: '🌿' },
  NETTOYAGE: { label: 'Nettoyage & Ménage', icon: '🧹' },
  SERRURERIE: { label: 'Serrurerie & Porte', icon: '🔑' },
  MENUISERIE: { label: 'Menuiserie & Meubles', icon: '🪚' },
  PEINTURE: { label: 'Peinture & Rénovation', icon: '🎨' },
  MACONNERIE: { label: 'Maçonnerie & Gros Œuvre', icon: '🧱' },
  ELECTROMENAGER: { label: 'Électroménager', icon: '🧊' },
  DERATISATION: { label: 'Dératisation & Nuisibles', icon: '🛡️' },
  PISCINE: { label: 'Piscine & Traitement', icon: '🏊' }
};

const getServiceDisplay = (type) => {
  const key = String(type || '').toUpperCase();
  if (key.includes('CLIM') || key.includes('FROID')) return SERVICE_TYPE_MAP.CLIMATISATION;
  if (key.includes('PLOMB')) return SERVICE_TYPE_MAP.PLUMBING;
  if (key.includes('ELEC')) return SERVICE_TYPE_MAP.ELECTRICIAN;
  if (key.includes('AUTO') || key.includes('MECAN')) return SERVICE_TYPE_MAP.AUTO_MECHANIC;
  if (key.includes('JARDIN')) return SERVICE_TYPE_MAP.JARDINAGE;
  if (key.includes('NETT') || key.includes('MENAG')) return SERVICE_TYPE_MAP.NETTOYAGE;
  if (key.includes('SERRUR')) return SERVICE_TYPE_MAP.SERRURERIE;
  if (key.includes('MENUIS')) return SERVICE_TYPE_MAP.MENUISERIE;
  if (key.includes('PEINT')) return SERVICE_TYPE_MAP.PEINTURE;
  if (key.includes('MACON')) return SERVICE_TYPE_MAP.MACONNERIE;
  return SERVICE_TYPE_MAP[key] || { label: type || 'Dépannage Général', icon: '🛠️' };
};

const mapCategoryToSlug = (cat) => {
  if (!cat) return 'plomberie';
  const c = String(cat).toLowerCase();
  if (c.includes('plomb')) return 'plomberie';
  if (c.includes('elec')) return 'electricite';
  if (c.includes('serrur')) return 'serrurerie';
  if (c.includes('auto') || c.includes('mecan')) return 'mecanique';
  if (c.includes('clim') || c.includes('froid')) return 'climatisation';
  if (c.includes('appliance') || c.includes('electro')) return 'electromenager';
  if (c.includes('peint')) return 'peinture';
  if (c.includes('menuis')) return 'menuiserie';
  if (c.includes('macon') || c.includes('etanch')) return 'etancheite-carrelage';
  if (c.includes('nett')) return 'nettoyage-menage';
  return c;
};

export const ClientView = ({ initialCategory, initialCity, initialDistrict }) => {
  const { t, user, setAuthModalOpen } = useAuth();
  const { interventions, maalems, createIntervention, confirmFinalDevis, completeIntervention, submitReview, cancelIntervention } = useApp();
  const {
    state: emergencyState,
    isIdle,
    isSearching,
    isMatched,
    isCompleted,
    activeEmergency,
    matchedMaalem,
    progressStep,
    triggerSOS: flowTriggerSOS,
    cancelSOS: flowCancelSOS,
    submitClientFeedback
  } = useEmergencyFlow();

  const [serviceType, setServiceType] = useState(() => mapCategoryToSlug(initialCategory || 'plomberie'));
  const [selectedSubcategory, setSelectedSubcategory] = useState('Réparations & Fuite');
  
  // Niveau d'urgence (Immédiat < 30min vs Planifié)
  const [urgencyLevel, setUrgencyLevel] = useState('IMMEDIATE'); // 'IMMEDIATE' | 'SCHEDULED'
  
  // Localisation Ville & Quartier (Lecture immédiate du cache GPS local ou prop initiale)
  const savedGPS = (() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_client_gps') || 'null');
    } catch (e) {
      return null;
    }
  })();

  const startCity = initialCity || savedGPS?.city || 'Casablanca';
  const startCityObj = MOROCCAN_CITIES.find((c) => c.name.toLowerCase() === startCity.toLowerCase()) || MOROCCAN_CITIES[0];
  const startDistrict = initialDistrict || (initialCity ? (startCityObj.districts?.[0]?.name || 'Centre') : (savedGPS?.district || 'Maârif'));
  const startDistrictObj = (startCityObj.districts || []).find((d) => d.name.toLowerCase() === startDistrict.toLowerCase()) || startCityObj.districts?.[0];

  const [selectedCity, setSelectedCity] = useState(startCityObj.name);
  const [selectedDistrict, setSelectedDistrict] = useState(startDistrictObj?.name || 'Maârif');
  const [selectedLat, setSelectedLat] = useState(startDistrictObj?.lat || savedGPS?.lat || 33.5883);
  const [selectedLng, setSelectedLng] = useState(startDistrictObj?.lng || savedGPS?.lng || -7.6328);

  // Synchroniser dynamiquement si les props changent
  useEffect(() => {
    if (initialCategory) {
      setServiceType(mapCategoryToSlug(initialCategory));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialCity) {
      const cityObj = MOROCCAN_CITIES.find((c) => c.name.toLowerCase() === initialCity.toLowerCase());
      if (cityObj) {
        setSelectedCity(cityObj.name);
        const dist = initialDistrict ? (cityObj.districts || []).find((d) => d.name.toLowerCase() === initialDistrict.toLowerCase()) : cityObj.districts?.[0];
        if (dist) {
          setSelectedDistrict(dist.name);
          setSelectedLat(dist.lat);
          setSelectedLng(dist.lng);
        }
      }
    }
  }, [initialCity, initialDistrict]);
  
  const [audioUrl, setAudioUrl] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [accessDetails, setAccessDetails] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Modale Surgissante Automatique de Fin de Chantier
  const [pendingCompletionModalInt, setPendingCompletionModalInt] = useState(null);
  const [dismissedCompletionIds, setDismissedCompletionIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_dismissed_completions') || '[]');
    } catch (e) {
      return [];
    }
  });

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';

  // 1. Étanchéité Stricte : Un client ne voit que ses PROPRES interventions
  const myClientInterventions = interventions.filter((item) => {
    let myCreated = [];
    try {
      myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
    } catch (e) {}

    const isOwnerByLocalCreated = myCreated.includes(String(item.id).trim());
    if (isOwnerByLocalCreated) return true;

    if (!user) return false; // Non connecté et non créé sur cet appareil => étanchéité stricte

    const isOwnerById = user.id && user.id !== DUMMY_CLIENT_ID && item.client_id && item.client_id !== DUMMY_CLIENT_ID && String(item.client_id).trim() === String(user.id).trim();
    const cp = String(user.phone || '').replace(/\D/g, '');
    const ip = String(item.client_phone || '').replace(/\D/g, '');
    const isOwnerByPhone = cp.length >= 8 && ip.length >= 8 && cp === ip && cp !== '0661234567';

    return isOwnerById || isOwnerByPhone;
  });

  // Écouteur automatique : Déclenchement au premier plan dès que le Maâlem demande la fin de chantier
  useEffect(() => {
    const pendingInt = myClientInterventions.find(
      (i) => i.status === 'PENDING_COMPLETION' && !dismissedCompletionIds.includes(i.id)
    );
    if (pendingInt && (!pendingCompletionModalInt || pendingCompletionModalInt.id !== pendingInt.id)) {
      setPendingCompletionModalInt(pendingInt);
    }
  }, [myClientInterventions, dismissedCompletionIds]);

  // Compression automatique d'image côté client (WebP < 200 Ko)
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/webp', 0.75);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (photos.length >= 3) break;
      const compressed = await compressImage(file);
      setPhotos((prev) => (prev.length < 3 ? [...prev, compressed] : prev));
      if (!photoUrl) setPhotoUrl(compressed);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setPhotoUrl(updated[0] || '');
      return updated;
    });
  };

  // Options pour les sélecteurs
  const cityOptions = MOROCCAN_CITIES.map((c) => ({
    value: c.name,
    label: c.name
  }));

  const currentCityObj = MOROCCAN_CITIES.find((c) => c.name === selectedCity) || MOROCCAN_CITIES[0];
  const districtOptions = (currentCityObj.districts || []).map((d) => ({
    value: d.name,
    label: d.name
  }));

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const targetCity = MOROCCAN_CITIES.find((c) => c.name === newCity);
    if (targetCity && targetCity.districts && targetCity.districts.length > 0) {
      const firstDistrict = targetCity.districts[0];
      setSelectedDistrict(firstDistrict.name);
      setSelectedLat(firstDistrict.lat);
      setSelectedLng(firstDistrict.lng);
    }
  };

  const handleDistrictChange = (newDistrictName) => {
    setSelectedDistrict(newDistrictName);
    const foundDistrict = (currentCityObj.districts || []).find((d) => d.name === newDistrictName);
    if (foundDistrict) {
      setSelectedLat(foundDistrict.lat);
      setSelectedLng(foundDistrict.lng);
    }
  };

  // Trouver la ville & quartier les plus proches par calcul de distance Haversine
  const updateCityAndDistrictFromGPS = (lat, lng) => {
    let closestCity = MOROCCAN_CITIES[0];
    let minCityDist = Infinity;

    MOROCCAN_CITIES.forEach((city) => {
      const dLat = (city.lat - lat) * 111;
      const dLng = (city.lng - lng) * 111 * Math.cos(lat * (Math.PI / 180));
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minCityDist) {
        minCityDist = dist;
        closestCity = city;
      }
    });

    setSelectedCity(closestCity.name);

    // Trouver le quartier le plus proche dans cette ville
    let closestDistrict = closestCity.districts[0];
    let minDistDist = Infinity;
    (closestCity.districts || []).forEach((d) => {
      const dLat = (d.lat - lat) * 111;
      const dLng = (d.lng - lng) * 111 * Math.cos(lat * (Math.PI / 180));
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistDist) {
        minDistDist = dist;
        closestDistrict = d;
      }
    });

    setSelectedDistrict(closestDistrict.name);

    try {
      localStorage.setItem('bricolemoi_client_gps', JSON.stringify({
        lat,
        lng,
        city: closestCity.name,
        district: closestDistrict.name,
        updated_at: Date.now()
      }));
    } catch (e) {}
  };

  // Compteur 100% réel et strict des artisans EN LIGNE dans la Ville et Métier choisis
  const serviceKey = String(serviceType || '').toUpperCase();
  const realOnlineMaalemsInCity = (maalems || []).filter((m) => {
    // 1. Vérifier si l'artisan est effectivement en ligne et disponible
    const isOnline = m.is_online === true || m.is_available === true;
    if (!isOnline) return false;

    // 2. Vérifier la correspondance de localisation (Ville / District)
    const maalemLoc = (m.district || m.city || '').toLowerCase();
    const cityMatches = maalemLoc.includes(selectedCity.toLowerCase());
    if (!cityMatches) return false;

    // 3. Vérifier la spécialité demandée
    const maalemSpec = (m.specialty || '').toUpperCase();
    const specialtyMatches =
      maalemSpec === serviceKey ||
      maalemSpec.includes(serviceKey) ||
      serviceKey.includes(maalemSpec) ||
      maalemSpec.includes('PLUMB') && serviceKey.includes('PLOMB') ||
      maalemSpec.includes('ELEC') && serviceKey.includes('ELEC') ||
      maalemSpec === 'AUTRE' ||
      maalemSpec === 'POLYVALENT';

    return specialtyMatches;
  });

  const onlineMaalemsCount = realOnlineMaalemsInCity.length;

  // Devis Confirmation Modal State
  const [devisModalInt, setDevisModalInt] = useState(null);
  const [devisInputPrice, setDevisInputPrice] = useState(350);

  // Review Modal State (Refonte Haute Précision & Gamification)
  const [reviewModalInt, setReviewModalInt] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedBadges, setSelectedBadges] = useState(['⏱️ Très Ponctuel', '🧹 Chantier Propre', '💰 Prix Respecté']);
  const [tipAmount, setTipAmount] = useState(0); // 0 | 10 | 20 | 50 DH

  const SENTIMENT_FEEDBACK = {
    5: { text: '🔥 Excellent ! (Recommandé à 100%)', color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-500/50' },
    4: { text: '✨ Très Bien (Professionnel & Efficace)', color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-500/50' },
    3: { text: '👌 Correct (Prestation Standard)', color: 'text-cyan-400', bg: 'bg-cyan-950/80 border-cyan-500/50' },
    2: { text: '⚠️ Moyen (Quelques points à corriger)', color: 'text-amber-300', bg: 'bg-amber-950/80 border-amber-500/50' },
    1: { text: '❌ Insatisfait (Signalement Équipe Support)', color: 'text-red-400', bg: 'bg-red-950/80 border-red-500/50' }
  };

  const POSITIVE_BADGES = ['⏱️ Très Ponctuel', '🧹 Chantier Propre', '💰 Prix Respecté', '🤝 Sympathique', '🛠️ Matériel Pro', '⚡ Diagnostic Rapide'];
  const NEGATIVE_BADGES = ['⏱️ Retard important', '💰 Prix plus cher que prévu', '🛠️ Travail incomplet', '🧹 Saleté laissée sur place', '⚠️ Communication difficile'];

  // CGU Modal State
  const [cguOpen, setCguOpen] = useState(false);

  // HTML5 Geolocation: Détection automatique et immédiate au premier chargement
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const applyLivePosition = (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setSelectedLat(lat);
        setSelectedLng(lng);
        updateCityAndDistrictFromGPS(lat, lng);
      };

      navigator.geolocation.getCurrentPosition(
        applyLivePosition,
        (highAccErr) => {
          console.warn('GPS High-accuracy fallback, trying fast network geolocation:', highAccErr);
          navigator.geolocation.getCurrentPosition(
            applyLivePosition,
            (finalErr) => console.warn('Final HTML5 Geolocation fallback:', finalErr),
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  // Persistance des modales d'évaluation fermées dans le stockage local
  const [dismissedReviewIds, setDismissedReviewIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_dismissed_reviews') || '[]');
    } catch (e) {
      return [];
    }
  });

  const closeReviewModal = (id) => {
    const targetId = id || reviewModalInt?.id;
    if (targetId) {
      setDismissedReviewIds((prev) => {
        const next = Array.from(new Set([...prev, targetId]));
        try { localStorage.setItem('bricolemoi_dismissed_reviews', JSON.stringify(next)); } catch (e) {}
        return next;
      });
    }
    setReviewModalInt(null);
  };

  const handleSOSSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setSubmitting(true);
    const fullDistrictLabel = `${selectedCity} - ${selectedDistrict}`;
    const primaryPhoto = photos[0] || photoUrl || (serviceType === 'plomberie' 
      ? 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80' 
      : 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80');

    try {
      const created = await createIntervention({
        service_type: serviceType.toUpperCase(),
        subcategory: selectedSubcategory,
        district: fullDistrictLabel,
        lat: selectedLat,
        lng: selectedLng,
        description_photo: primaryPhoto,
        photos_list: photos.length > 0 ? photos : [primaryPhoto],
        access_details: accessDetails,
        urgency_level: urgencyLevel,
        audio_note_url: audioUrl
      });

      if (created) {
        flowTriggerSOS(created);
      }

      setPhotos([]);
      setPhotoUrl('');
      setAccessDetails('');
      setAudioUrl(null);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleBadge = (badgeText) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeText) ? prev.filter((b) => b !== badgeText) : [...prev, badgeText]
    );
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const fullComment = `${comment.trim()}${selectedBadges.length > 0 ? ` [Badges: ${selectedBadges.join(', ')}]` : ''}${tipAmount > 0 ? ` [Pourboire: +${tipAmount} DH]` : ''}`;

    if (reviewModalInt) {
      await submitReview({
        intervention_id: reviewModalInt.id,
        maalem_id: reviewModalInt.maalem_id,
        rating,
        comment: fullComment,
        badges: selectedBadges,
        tip_dh: tipAmount
      });
      setDismissedReviewIds((prev) => [...prev, reviewModalInt.id]);
      setReviewModalInt(null);
    }

    await submitClientFeedback({
      rating,
      comment: fullComment,
      badges: selectedBadges,
      tipDh: tipAmount
    });

    setComment('');
    setTipAmount(0);
  };

  const activePendingSOS = myClientInterventions.find((i) => i.status === 'PENDING') || (isSearching ? (activeEmergency || { id: 'pending-sos', service_type: serviceType, district: `${selectedCity} - ${selectedDistrict}` }) : null);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24 md:pb-12 font-sans">
      {/* 1. ECRAN RADAR DE RECHERCHE VERROUILLE (SI SOS EN ATTENTE D'UN ARTISAN) */}
      {activePendingSOS ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-slate-900/90 backdrop-blur-xl border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(6,182,212,0.35)] relative overflow-hidden space-y-6"
        >
          {/* Glowing background ambient lights */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />

          {/* Top Radar Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
            <div className="flex items-center gap-3.5">
              {/* Pulsing Radar Icon Container */}
              <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-ping" />
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  <Siren className="w-7 h-7 animate-bounce text-cyan-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 font-mono">Radar SOS Actif • Diffusion Live</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Recherche d'un Maâlem en cours...
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono font-black text-xs shadow-inner">
                {getServiceDisplay(activePendingSOS.service_type).label}
              </span>
            </div>
          </div>

          {/* Sci-Fi Animated Radar Scanner Widget */}
          <div className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner relative overflow-hidden">
            <div className="flex items-center gap-4">
              {/* Concentric Radar Circles with Rotating Scanner */}
              <div className="relative w-20 h-20 rounded-full border border-cyan-500/40 bg-slate-900/80 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/30" />
                <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-transparent animate-spin" style={{ animationDuration: '3s' }} />
                <MapPin className="w-6 h-6 text-cyan-400 z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-white">
                  Diffusion transmise aux artisans disponibles à <span className="text-cyan-400 font-black">{activePendingSOS.district || selectedDistrict}</span>
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dès qu'un Maâlem accepte l'intervention, votre écran se synchronise automatiquement avec son contact et son suivi GPS.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    🟢 {onlineMaalemsCount} Maâlem(s) notifié(s)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Temps d'attente estimé : &lt; 3 min
                  </span>
                </div>
              </div>
            </div>

            {/* Cancel SOS Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                if (window.confirm('Voulez-vous vraiment annuler votre demande SOS en cours ?')) {
                  cancelIntervention(activePendingSOS.id);
                }
              }}
              className="w-full md:w-auto px-4 py-2.5 bg-red-950/80 hover:bg-red-900/90 text-red-300 hover:text-white border border-red-500/40 hover:border-red-400 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Annuler la demande SOS</span>
            </motion.button>
          </div>

          {/* Carte interactive en direct pour le Client (sans pollution visuelle ni SOS d'autrui) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Radar des Artisans en direct autour de vous</span>
              </span>
              <span className="text-[11px] text-cyan-400 font-mono font-bold">100% Live Ably Stream</span>
            </label>
            
            <InteractiveMap
              mode="CLIENT_PICKER"
              selectedLat={parseFloat(activePendingSOS.lat || selectedLat)}
              selectedLng={parseFloat(activePendingSOS.lng || selectedLng)}
              filterCategory={activePendingSOS.service_type || serviceType}
            />
          </div>
        </motion.div>
      ) : (
        /* 2. FORMULAIRE DE SELECTION DU SERVICE & DECLENCHEMENT SOS */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-950 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Lightning weight="fill" className="w-3.5 h-3.5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span>Dépannage d'Urgence Express 24h/7j • Maroc</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
              Sélectionnez votre Service
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              Artisans Maâlems qualifiés et vérifiés à proximité immédiate
            </p>
          </div>

          {/* Category & Subcategory Selector */}
          <div className="mb-8">
            <CategorySelector
              selectedCategory={serviceType}
              selectedSubcategory={selectedSubcategory}
              onSelectCategory={(catSlug) => setServiceType(catSlug)}
              onSelectSubcategory={(subName) => setSelectedSubcategory(subName)}
            />
          </div>

          {/* Formulaire Express */}
          <form onSubmit={handleSOSSubmit} className="space-y-6 pt-4 border-t border-cyan-500/20">
          
          {/* Sélecteur de Niveau d'Urgence (Moins de 30 min vs Planifié) */}
          <div className="bg-slate-950/80 border border-cyan-500/30 p-4 rounded-2xl shadow-inner space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Siren className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Délai d'intervention souhaité :</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setUrgencyLevel('IMMEDIATE')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-sm cursor-pointer ${
                  urgencyLevel === 'IMMEDIATE'
                    ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Lightning weight="fill" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-black text-white">🚨 Urgence Immédiate</span>
                    <span className="text-[10px] text-slate-400">Arrivée estimée sous 20 à 30 min</span>
                  </div>
                </div>
                {urgencyLevel === 'IMMEDIATE' && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setUrgencyLevel('SCHEDULED')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-sm cursor-pointer ${
                  urgencyLevel === 'SCHEDULED'
                    ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck weight="duotone" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-black text-white">📅 Rendez-vous Planifié</span>
                    <span className="text-[10px] text-slate-400">Aujourd'hui ou dans la semaine</span>
                  </div>
                </div>
                {urgencyLevel === 'SCHEDULED' && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
              </button>
            </div>
          </div>

          {/* Interactive Leaflet Location Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Position géolocalisée de l'urgence</span>
              </span>
              <span className="text-[11px] text-cyan-400 font-normal">Maalems en temps réel</span>
            </label>
            
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

          {/* Sélecteur Ville & Quartier 2 Colonnes Synchronisé */}
          <div className="bg-slate-950/80 border border-cyan-500/30 p-4 rounded-2xl shadow-inner space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Colonne 1 : Ville */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Ville d'intervention :
                </label>
                <CustomDropdown
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Choisir une ville..."
                  icon={Buildings}
                />
              </div>

              {/* Colonne 2 : Quartier / Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Quartier / Secteur :
                </label>
                <CustomDropdown
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  options={districtOptions}
                  placeholder="Choisir un quartier..."
                  icon={MapPinLine}
                />
              </div>
            </div>
          </div>

          {/* SOLUTION 1 : Transparence Tarifaire Marocaine (Diagnostic & Déplacement Fixe + Accord sur Place) */}
          <div className="bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/40 p-5 rounded-3xl shadow-[0_0_20px_rgba(6,182,212,0.2)] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <ShieldCheck weight="duotone" className="w-5 h-5 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Transparence Tarifaire &amp; Diagnostic sur Place
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Conforme aux usages du marché marocain • 0 Mauvaise surprise
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs shadow-inner">
                  Déplacement &amp; Constat : 40 - 50 DH
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
              <p className="flex items-center gap-1.5 font-medium">
                <span className="text-cyan-400 font-bold">✔ Accord Préalable :</span>
                <span>Le Maâlem évalue la panne chez vous et valide le prix des travaux avec vous <strong>avant tout début d'intervention</strong>.</span>
              </p>
              <p dir="rtl" className="text-[11px] text-amber-300 font-bold font-sans pt-0.5">
                🤝 اتفاق مسبق على الثمن مع المعلّم قبل بدء العمل • الأداء بعد المعاينة والرضى التام
              </p>
            </div>
          </div>

          {/* Native Audio Recorder Component */}
          <div className="space-y-1.5">
            <VoiceRecorder
              onAudioRecorded={(url) => setAudioUrl(url)}
              audioUrl={audioUrl}
              onClearAudio={() => setAudioUrl(null)}
            />
            <p className="text-[10px] text-slate-400 text-center font-medium">
              💡 Vous pouvez enregistrer une note vocale rapide en Darija ou Français pour expliquer votre problème.
            </p>
          </div>

          {/* Multi-Photo Attachment & Interactive Camera Uploader (Max 3 photos, WebP auto-compression) */}
          <div className="bg-slate-950/90 border border-cyan-500/30 p-5 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)] space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Photos de la panne / problème ({photos.length}/3 photos)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
              >
                {showUrlInput ? "Importer un fichier" : "Utiliser un lien URL"}
              </button>
            </div>

            {!showUrlInput ? (
              <div className="space-y-3">
                {/* Galerie des photos téléchargées */}
                {photos.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {photos.map((picUrl, idx) => (
                      <div key={idx} className="relative inline-block group">
                        <img
                          src={picUrl}
                          alt={`Panne photo ${idx + 1}`}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg transition-transform active:scale-90 cursor-pointer"
                          title="Supprimer cette photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 right-1 bg-black/75 text-[10px] font-mono px-1.5 rounded text-cyan-300">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Zone de téléchargement / Caméra (si moins de 3 photos) */}
                {photos.length < 3 && (
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 rounded-2xl cursor-pointer bg-slate-900/60 hover:bg-slate-900 transition-all text-center group">
                    <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-xs font-black text-white">
                      {photos.length === 0 ? 'Prendre une photo ou Choisir une image' : 'Ajouter une photo supplémentaire'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">Jusqu'à 3 photos (Vue d'ensemble / Détail de la pièce)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ) : (
              <input
                type="url"
                placeholder="Collez le lien URL de la photo de la panne..."
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  if (e.target.value && !photos.includes(e.target.value)) {
                    setPhotos([e.target.value]);
                  }
                }}
                className="w-full py-3 px-4 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none transition-colors shadow-sm"
              />
            )}
          </div>

          {/* Précision d'Accès / Adresse (Optionnel) */}
          <div className="bg-slate-950/80 border border-cyan-500/30 p-4 rounded-2xl shadow-inner space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 flex items-center gap-2">
              <span>✍️ Précision d'accès / Instructions (Optionnel)</span>
            </label>
            <input
              type="text"
              placeholder="ex: Étage 3, porte droite, en face de la pharmacie, sonnette n°4..."
              value={accessDetails}
              onChange={(e) => setAccessDetails(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-slate-900 border border-cyan-500/20 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Indicateur d'artisans en ligne + Bouton SOS (100% Réel & Dynamique) */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs px-1">
              {onlineMaalemsCount > 0 ? (
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)] animate-ping flex-shrink-0" />
                  <span>{onlineMaalemsCount} {onlineMaalemsCount === 1 ? 'Artisan Maâlem' : 'Artisans Maâlems'} En Ligne à {selectedCity}</span>
                </span>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0" />
                  <span>Aucun artisan connecté à {selectedCity} actuellement</span>
                </span>
              )}
              <span className="text-slate-400 text-[11px]">
                {onlineMaalemsCount > 0 ? 'Prêt à intervenir' : 'Alerte transmise dès connexion'}
              </span>
            </div>

            {/* Primary SOS Action Button (Futuristic Neon Gradient) */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={submitting}
              className="w-full py-5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] border border-cyan-400/40 transition-all flex items-center justify-center gap-3 font-sans active:scale-95 cursor-pointer"
            >
              <Zap className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>{submitting ? t('loading') : 'Lancer l\'Alerte SOS Express (Dépannage Immédiat)'}</span>
              <ChevronRight className="w-5 h-5 text-cyan-200" />
            </motion.button>
          </div>

          {!user && (
            <p className="text-[11px] text-center text-slate-400 font-medium">
              💡 Identification rapide par SMS/OTP requise lors de l'envoi.
            </p>
          )}
        </form>
      </motion.div>
      )}

      {/* 2. Demandes en Cours / Interventions Active List */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          {t('my_requests')} ({myClientInterventions.length})
        </h3>

        {myClientInterventions.length === 0 ? (
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-cyan-500/20 text-center space-y-2">
            <p className="text-sm font-bold text-slate-300">✨ Vous n'avez aucune demande SOS en cours.</p>
            <p className="text-xs text-slate-400">Remplissez le formulaire ci-dessus pour envoyer une alerte aux Maâlems de votre secteur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myClientInterventions.map((item) => {
            const serviceInfo = getServiceDisplay(item.service_type);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                key={item.id}
                className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-5 shadow-lg shadow-black/50 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] relative overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-slate-950/90 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                      <span className="text-sm">{serviceInfo.icon}</span>
                      <span>{serviceInfo.label}</span>
                    </span>

                    <span className={`px-3.5 py-1 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 ${
                      item.status === 'PENDING'
                        ? 'bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(251,191,36,0.3)] animate-pulse'
                        : item.status === 'ACCEPTED'
                        ? (item.progress_step === 'ARRIVED'
                            ? 'bg-blue-950/90 text-blue-300 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.4)] animate-pulse'
                            : item.progress_step === 'ON_THE_WAY'
                            ? 'bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                            : 'bg-blue-950/90 text-blue-300 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]')
                        : item.status === 'PENDING_COMPLETION'
                        ? 'bg-purple-950/90 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)] animate-pulse'
                        : item.status === 'COMPLETED'
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>
                        {item.status === 'PENDING' && 'En recherche de Maalem...'}
                        {item.status === 'ACCEPTED' && (
                          item.progress_step === 'ARRIVED'
                            ? '📍 Maâlem sur place'
                            : item.progress_step === 'ON_THE_WAY'
                            ? '🚗 Maâlem en route'
                            : 'Maâlem assigné'
                        )}
                        {item.status === 'PENDING_COMPLETION' && 'Clôture en attente'}
                        {item.status === 'COMPLETED' && 'Terminé & Validé'}
                        {item.status === 'CANCELLED' && 'Annulé'}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="font-bold text-white text-sm">{item.subcategory || 'Dépannage'}</p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.district}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(item.created_at || Date.now()).toLocaleTimeString()} ({new Date(item.created_at || Date.now()).toLocaleDateString()})</span>
                    </p>

                    {item.status === 'ACCEPTED' && item.progress_step === 'ARRIVED' && (
                      <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-200 text-xs font-bold flex items-center gap-2 mt-2 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping flex-shrink-0" />
                        <span>📍 Le Maâlem est arrivé à votre domicile et démarre le diagnostic.</span>
                      </div>
                    )}

                    {item.status === 'ACCEPTED' && item.progress_step === 'ON_THE_WAY' && (
                      <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-2 mt-2 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                        <span>🚗 Le Maâlem est actuellement en route vers votre adresse.</span>
                      </div>
                    )}

                    {item.status === 'PENDING_COMPLETION' && (
                      <div className="p-3 bg-emerald-950/90 rounded-2xl border border-emerald-500/50 space-y-2 mt-2 shadow-[0_0_20px_rgba(52,211,153,0.35)]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Travaux finalisés par le Maâlem</span>
                          </span>
                          <span className="text-xs font-black font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                            {item.final_agreed_price || item.estimated_price_min || 150} DH
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Le Maâlem a terminé les travaux pour un montant de <strong>{item.final_agreed_price || 150} DH</strong>. Veuillez confirmer pour clôturer et noter.
                        </p>
                        <button
                          type="button"
                          onClick={() => setPendingCompletionModalInt(item)}
                          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.4)] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirmer &amp; Évaluer le Maâlem (5★)</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Details */}
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-2">
                  {item.status === 'ACCEPTED' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        <span>🛠️ {item.maalem_name || 'Artisan Maâlem'}</span>
                      </div>
                      {item.maalem_phone && (
                        <a
                          href={`tel:${item.maalem_phone}`}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.4)] flex items-center gap-1.5 active:scale-95 transition-all"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Appeler ({item.maalem_phone})</span>
                        </a>
                      )}
                    </div>
                  )}

                  {item.status === 'PENDING_COMPLETION' && (
                    <button
                      onClick={() => setPendingCompletionModalInt(item)}
                      className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-xl shadow-[0_0_12px_rgba(52,211,153,0.4)] flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Valider Fin de Chantier ({item.final_agreed_price || 150} DH)</span>
                    </button>
                  )}

                  {item.status === 'COMPLETED' && !item.rating && (
                    <button
                      onClick={() => setReviewModalInt(item)}
                      className="px-3.5 py-2 bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Laisser un Avis</span>
                    </button>
                  )}

                  {item.status === 'PENDING' && (
                    <button
                      onClick={() => cancelIntervention(item.id)}
                      className="px-3 py-1.5 bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewModalInt && (
          <motion.div
            key="review-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-cyan-500/40 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-[0_0_35px_rgba(6,182,212,0.3)] space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white font-sans">
                  ⭐ Évaluez la Prestation du Maâlem
                </h3>
                <button
                  onClick={() => closeReviewModal()}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* 1. Étoiles Interactives avec Glow & Hover */}
                <div className="text-center space-y-2">
                  <div className="flex justify-center items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const activeValue = hoverRating || rating;
                      const isFilled = star <= activeValue;

                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => {
                            setRating(star);
                            if (star <= 3 && selectedBadges.some(b => POSITIVE_BADGES.includes(b))) {
                              setSelectedBadges(['⏱️ Retard important']);
                            } else if (star >= 4 && selectedBadges.some(b => NEGATIVE_BADGES.includes(b))) {
                              setSelectedBadges(['⏱️ Très Ponctuel', '🧹 Chantier Propre']);
                            }
                          }}
                          className="p-1 transition-all duration-200 hover:scale-130 active:scale-95 cursor-pointer"
                        >
                          <Star
                            className={`w-9 h-9 transition-all duration-200 ${
                              isFilled
                                ? (activeValue === 5 
                                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]'
                                    : activeValue >= 4
                                    ? 'text-emerald-400 fill-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                                    : activeValue === 3
                                    ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                                    : 'text-amber-500 fill-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]')
                                : 'text-slate-700 hover:text-slate-500'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Sentiment Badge Dynamique */}
                  <motion.div
                    key={hoverRating || rating}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-black border ${SENTIMENT_FEEDBACK[hoverRating || rating]?.bg} ${SENTIMENT_FEEDBACK[hoverRating || rating]?.color} shadow-sm`}
                  >
                    {SENTIMENT_FEEDBACK[hoverRating || rating]?.text}
                  </motion.div>
                </div>

                {/* 2. Badges / Tags Adaptatifs */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {rating >= 4 ? '✨ Compliments (Ce qui vous a plu) :' : '⚠️ Points à améliorer :'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(rating >= 4 ? POSITIVE_BADGES : NEGATIVE_BADGES).map((badge) => {
                      const isSelected = selectedBadges.includes(badge);
                      return (
                        <button
                          key={badge}
                          type="button"
                          onClick={() => toggleBadge(badge)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? (rating >= 4 
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                                  : 'bg-red-950/90 text-red-300 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.3)]')
                              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/30'
                          }`}
                        >
                          {badge}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Pourboire Optionnel (Tbarkellah 3lik) */}
                {rating >= 4 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>🎁 Pourboire au Maâlem (Optionnel) :</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">100% reversé à l'artisan</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 10, 20, 50].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setTipAmount(amount)}
                          className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                            tipAmount === amount
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-amber-500/30'
                          }`}
                        >
                          {amount === 0 ? 'Aucun' : `+${amount} DH`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Commentaire Détaillé */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Commentaire détaillé :</label>
                  <textarea
                    rows={3}
                    placeholder={rating >= 4 ? "Racontez ce qui vous a particulièrement satisfait..." : "Décrivez le problème rencontré pour nous permettre de vous aider..."}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 text-xs focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>Envoyer mon Avis & Clôturer</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Modale Surgissante Automatique de Fin de Chantier */}
        {pendingCompletionModalInt && (
          <motion.div
            key="pending-completion-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-slate-950 border border-emerald-500/50 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-[0_0_40px_rgba(52,211,153,0.3)] space-y-4 text-slate-100 relative overflow-hidden"
            >
              {/* Glow accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    Fin de Chantier — Confirmation
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const id = pendingCompletionModalInt.id;
                    setDismissedCompletionIds((prev) => {
                      const next = Array.from(new Set([...prev, id]));
                      try { localStorage.setItem('bricolemoi_dismissed_completions', JSON.stringify(next)); } catch (e) {}
                      return next;
                    });
                    setPendingCompletionModalInt(null);
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-200">
                  Votre artisan <strong>{pendingCompletionModalInt.maalem_name || 'Maâlem BricoleMoi'}</strong> déclare avoir finalisé avec succès votre intervention :
                </p>

                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-cyan-500/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">
                      {pendingCompletionModalInt.subcategory || 'Dépannage d\'urgence'}
                    </span>
                    <span className="text-[10px] font-bold text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                      {pendingCompletionModalInt.district || 'Casablanca'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-slate-400 font-medium">Montant total convenu :</span>
                    <span className="text-lg font-black font-mono text-emerald-400">
                      {pendingCompletionModalInt.final_agreed_price || pendingCompletionModalInt.estimated_price_min || 150} DH
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic text-center">
                  En confirmant, vous validez la bonne exécution des travaux et accédez à l'évaluation 5★ du Maâlem.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={async () => {
                      const intToComplete = pendingCompletionModalInt;
                      if (!intToComplete) return;
                      const id = intToComplete.id;
                      setDismissedCompletionIds((prev) => {
                        const next = Array.from(new Set([...prev, id]));
                        try { localStorage.setItem('bricolemoi_dismissed_completions', JSON.stringify(next)); } catch (e) {}
                        return next;
                      });
                      setPendingCompletionModalInt(null);
                      await completeIntervention(intToComplete.id);
                      setReviewModalInt(intToComplete);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirmer le Travail & Noter le Maâlem</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setDismissedCompletionIds((prev) => [...prev, pendingCompletionModalInt.id]);
                    setPendingCompletionModalInt(null);
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Vérifier sur place / Plus tard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
