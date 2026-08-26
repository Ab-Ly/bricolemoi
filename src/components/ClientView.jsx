import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useEmergencyFlow } from '../context/EmergencyFlowContext';
import { switchSubdomainInDev } from '../lib/subdomain';
import { EMERGENCY_STATES } from '../constants/emergencyStates';
import { VoiceRecorder } from './VoiceRecorder';
import { VoiceAudioPlayer } from './VoiceAudioPlayer';
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
  ChevronLeft,
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
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { COUNTRY_DIAL_CODES, MOROCCAN_CITIES } from '../constants/geo';
import { reverseGeocodeMorocco, findNearestCatalogCity } from '../lib/geoService';
import { uploadMediaToR2 } from '../lib/r2StorageService';
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

const SERVICE_TYPE_MAP = {
  PLUMBING: { label: 'Plomberie & Sanitaire', icon: '💧' },
  ELECTRICIAN: { label: 'Électricité', icon: '⚡' },
  AUTO_MECHANIC: { label: 'Mécanique Auto', icon: '🚗' },
  CLIMATISATION: { label: 'Climatisation & Froid', icon: '❄️' },
  JARDINAGE: { label: 'Jardinage & Espaces Verts', icon: '🌿' },
  NETTOYAGE: { label: 'Nettoyage & Ménage', icon: '🧹' },
  SERRURERIE: { label: 'Serrurerie & Porte', icon: '🔑' },
  VOLETS_RIDEAUX: { label: 'Volets Roulants & Rideaux', icon: '🪟' },
  DEMENAGEMENT: { label: 'Déménagement & Transport', icon: '📦' },
  SOLAIRE: { label: 'Chauffe-Eau Solaire', icon: '☀️' },
  POMPE_PISCINE: { label: 'Pompes à Eau & Surpresseurs', icon: '🏊' },
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
  if (key.includes('VOLET') || key.includes('RIDEAU')) return SERVICE_TYPE_MAP.VOLETS_RIDEAUX;
  if (key.includes('DEMENAG') || key.includes('MOVE') || key.includes('TRUCK')) return SERVICE_TYPE_MAP.DEMENAGEMENT;
  if (key.includes('SOLAR') || key.includes('SOLAIRE')) return SERVICE_TYPE_MAP.SOLAIRE;
  if (key.includes('POMPE') || key.includes('PISCINE')) return SERVICE_TYPE_MAP.POMPE_PISCINE;
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
  const { t, user, setUser, setAuthModalOpen } = useAuth();
  const { interventions, maalems, createIntervention, confirmFinalDevis, completeIntervention, submitReview, cancelIntervention, relaunchEmergencyRequest } = useApp();
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

  const pendingIntent = (() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_pending_intent') || 'null');
    } catch (e) {
      return null;
    }
  })();

  // Localisation Ville & Quartier (Lecture immédiate du cache d'intention, GPS local ou prop initiale)
  const savedGPS = (() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_client_gps') || 'null');
    } catch (e) {
      return null;
    }
  })();

  const startCategory = initialCategory || pendingIntent?.category || 'plomberie';
  const startCity = initialCity || pendingIntent?.city || savedGPS?.city || 'Casablanca';
  const startCityObj = MOROCCAN_CITIES.find((c) => c.name.toLowerCase() === startCity.toLowerCase()) || MOROCCAN_CITIES[0];
  const startDistrict = initialDistrict || pendingIntent?.district || (initialCity ? (startCityObj.districts?.[0]?.name || 'Centre') : (savedGPS?.district || 'Maârif'));
  const startDistrictObj = (startCityObj.districts || []).find((d) => d.name.toLowerCase() === startDistrict.toLowerCase()) || startCityObj.districts?.[0];

  const [serviceType, setServiceType] = useState(() => mapCategoryToSlug(startCategory));
  const [selectedSubcategory, setSelectedSubcategory] = useState('Réparations & Fuite');
  
  // Niveau d'urgence (Immédiat < 30min vs Planifié)
  const [urgencyLevel, setUrgencyLevel] = useState('IMMEDIATE'); // 'IMMEDIATE' | 'SCHEDULED'

  const [selectedCity, setSelectedCity] = useState(startCityObj.name);
  const [selectedDistrict, setSelectedDistrict] = useState(startDistrictObj?.name || 'Maârif');
  const [selectedLat, setSelectedLat] = useState(startDistrictObj?.lat || savedGPS?.lat || 33.5883);
  const [selectedLng, setSelectedLng] = useState(startDistrictObj?.lng || savedGPS?.lng || -7.6328);

  // Synchroniser dynamiquement si les props ou l'intention changent
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
  const [showNewSOSForm, setShowNewSOSForm] = useState(false);

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

  const [clientHistoryPage, setClientHistoryPage] = useState(1);

  // Séparation : Demandes actives en cours vs Historique des prestations passées
  const activeClientInterventions = myClientInterventions
    .filter((item) => item.status === 'PENDING' || item.status === 'ACCEPTED' || item.status === 'PENDING_COMPLETION' || item.status === 'UNFEASIBLE')
    .sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  const completedClientInterventions = myClientInterventions
    .filter((item) => item.status === 'COMPLETED' || item.status === 'CANCELLED')
    .sort((a, b) => new Date(b.completed_at || b.updated_at || b.created_at || 0) - new Date(a.completed_at || a.updated_at || a.created_at || 0));

  const CLIENT_HISTORY_PER_PAGE = 4;
  const totalClientHistoryPages = Math.max(1, Math.ceil(completedClientInterventions.length / CLIENT_HISTORY_PER_PAGE));
  const paginatedCompletedInterventions = completedClientInterventions.slice(
    (clientHistoryPage - 1) * CLIENT_HISTORY_PER_PAGE,
    clientHistoryPage * CLIENT_HISTORY_PER_PAGE
  );

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
      try {
        const uploadedUrl = await uploadMediaToR2(file, 'interventions');
        if (uploadedUrl) {
          setPhotos((prev) => (prev.length < 3 ? [...prev, uploadedUrl] : prev));
          if (!photoUrl) setPhotoUrl(uploadedUrl);
        }
      } catch (err) {
        console.warn('[ClientView] Erreur upload R2, fallback image locale:', err);
        const compressed = await compressImage(file);
        setPhotos((prev) => (prev.length < 3 ? [...prev, compressed] : prev));
        if (!photoUrl) setPhotoUrl(compressed);
      }
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

  const normCity = (s) => String(s || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const currentCityObj = MOROCCAN_CITIES.find((c) => normCity(c.name) === normCity(selectedCity)) || MOROCCAN_CITIES[0];
  const districtOptions = (currentCityObj.districts || []).map((d) => ({
    value: d.name,
    label: d.name
  }));

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const targetCity = MOROCCAN_CITIES.find((c) => normCity(c.name) === normCity(newCity));
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

  // Trouver la ville & quartier réels par reverse geocoding intelligent + fallback instantané
  const updateCityAndDistrictFromGPS = async (lat, lng) => {
    // 1. Résolution immédiate catalogue (0ms)
    const instantFallback = findNearestCatalogCity(lat, lng);
    setSelectedCity(instantFallback.city);
    setSelectedDistrict(instantFallback.district);

    // 2. Résolution satellite précise (OpenStreetMap / Cache local)
    try {
      const geoResult = await reverseGeocodeMorocco(lat, lng);
      if (geoResult && geoResult.city) {
        setSelectedCity(geoResult.city);
        setSelectedDistrict(geoResult.district || geoResult.city);

        try {
          localStorage.setItem('bricolemoi_client_gps', JSON.stringify({
            lat,
            lng,
            city: geoResult.city,
            district: geoResult.district || geoResult.city,
            fullLabel: geoResult.fullLabel,
            updated_at: Date.now()
          }));
        } catch (e) {}
      }
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

  // State pour la saisie urgente du numéro de téléphone lors d'un SOS Google sans numéro
  const [sosPhoneModalOpen, setSosPhoneModalOpen] = useState(false);
  const [sosPhoneInput, setSosPhoneInput] = useState('');
  const [sosCountry, setSosCountry] = useState(COUNTRY_DIAL_CODES[0]);
  const [sosCountryOpen, setSosCountryOpen] = useState(false);
  const [savingSosPhone, setSavingSosPhone] = useState(false);
  const sosCountryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sosCountryDropdownRef.current && !sosCountryDropdownRef.current.contains(e.target)) {
        setSosCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const executeSOSCreation = async (overridePhone) => {
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
        audio_note_url: audioUrl,
        client_phone: overridePhone || user?.phone
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

  const handleSOSSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    // Sécurité essentielle : Si le client Google n'a pas encore de numéro, lui demander en 1 clic
    if (!user.phone || user.phone.length < 8) {
      setSosPhoneModalOpen(true);
      return;
    }

    await executeSOSCreation();
  };

  const handleConfirmSosPhone = async (e) => {
    e.preventDefault();
    const cleanDigits = sosPhoneInput.replace(/\D/g, '');
    if (cleanDigits.length < 6) {
      toast.error('Veuillez renseigner un numéro de téléphone valide.');
      return;
    }
    setSavingSosPhone(true);
    const dialDigits = sosCountry.dial.replace(/\D/g, '');
    const cleanNumber = cleanDigits.startsWith('0') ? cleanDigits.substring(1) : cleanDigits;
    const formatted = cleanDigits.startsWith(dialDigits) ? `+${cleanDigits}` : `${sosCountry.dial}${cleanNumber}`;

    const updatedUser = { ...user, phone: formatted };
    setUser(updatedUser);
    sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));

    if (isSupabaseConfigured && user.id) {
      try {
        await supabase.from('profiles').update({ phone: formatted }).eq('id', user.id);
      } catch (err) {
        console.error('Erreur save phone SOS:', err);
      }
    }

    setSavingSosPhone(false);
    setSosPhoneModalOpen(false);
    toast.success('📱 Numéro enregistré avec succès ! Lancement de l\'alerte SOS...');
    await executeSOSCreation(formatted);
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

  // L'intervention la plus récente de l'utilisateur
  const latestClientIntv = myClientInterventions[0] || null;

  // L'intervention active en cours (si la plus récente est ACCEPTED ou PENDING_COMPLETION)
  const isLatestActiveOngoing = Boolean(
    latestClientIntv && (latestClientIntv.status === 'ACCEPTED' || latestClientIntv.status === 'PENDING_COMPLETION')
  );
  const activeOngoingSOS = isLatestActiveOngoing 
    ? latestClientIntv 
    : (!latestClientIntv && isMatched && activeEmergency && !isCompleted ? activeEmergency : null);

  // L'intervention en recherche (si la plus récente est PENDING)
  const isLatestPending = Boolean(!activeOngoingSOS && latestClientIntv && latestClientIntv.status === 'PENDING');
  const activePendingSOS = isLatestPending
    ? latestClientIntv
    : (!activeOngoingSOS && !latestClientIntv && isSearching ? (activeEmergency || { id: 'pending-sos', service_type: serviceType, district: `${selectedCity} - ${selectedDistrict}` }) : null);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-32 md:pb-16 font-sans px-3 sm:px-4 pb-safe">
      {/* BANDEAU INTELLIGENT : Si un artisan est connecté sur le portail client */}
      {user?.role === 'MAALEM' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 border border-amber-300/80 p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              🛠️
            </div>
            <div>
              <p className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <span>Compte Artisan Connecté ({user.full_name || 'Maâlem'})</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Vous consultez l'espace client. Vos alertes de chantiers et votre solde restent actifs.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => switchSubdomainInDev('MAALEM')}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Ouvrir mon Radar Chantiers Pro →</span>
          </button>
        </motion.div>
      )}
      {/* BANDEAU RÉASSURANCE & TRANSPARENCE TARIF LIBRE */}
      <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50 border border-blue-200/80 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            🤝
          </div>
          <p className="text-xs font-semibold text-blue-950">
            <strong className="font-bold text-blue-800">Mise en relation directe :</strong> Convenez librement du devis avec votre artisan sur place, sans frais d'intermédiaire ni commission prélevée sur ses travaux.
          </p>
        </div>
      </div>

      {/* 1. INTERVENTION EN COURS (PRISE EN CHARGE CONFIRMÉE PAR LE MAÂLEM) */}
      {activeOngoingSOS && !showNewSOSForm ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white border-2 border-blue-500/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 text-slate-900"
        >
          {/* Header Intervention en Cours */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
                {activeOngoingSOS.status === 'PENDING_COMPLETION' ? (
                  <CheckCircle2 className="w-7 h-7 text-white" />
                ) : activeOngoingSOS.progress_step === 'ARRIVED' ? (
                  <MapPin className="w-7 h-7 text-white" />
                ) : (
                  <Car className="w-7 h-7 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeOngoingSOS.status === 'PENDING_COMPLETION' ? 'bg-purple-500 animate-pulse' : 'bg-emerald-500 animate-ping'}`} />
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                    {activeOngoingSOS.status === 'PENDING_COMPLETION'
                      ? 'Clôture de Chantier • Validation Requise'
                      : activeOngoingSOS.progress_step === 'ARRIVED'
                      ? 'Maâlem sur place • Diagnostic & Réparation'
                      : 'Maâlem en route • Déplacement Live'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeOngoingSOS.status === 'PENDING_COMPLETION'
                    ? 'Travaux Finalisés par l\'Artisan'
                    : activeOngoingSOS.progress_step === 'ARRIVED'
                    ? 'L\'Artisan est arrivé à votre domicile'
                    : 'Votre Artisan Maâlem est en route'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xs shadow-xs">
                {getServiceDisplay(activeOngoingSOS.service_type).label}
              </span>
            </div>
          </div>

          {/* Stepper Dynamique d'Avancement */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <span className="text-xs font-black text-blue-800">1. Prise en charge</span>
              <p className="text-[10px] text-blue-600 font-medium">Validée ✓</p>
            </div>
            <div className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
              activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
            }`}>
              <span className="text-xs font-black">2. Déplacement</span>
              <p className="text-[10px] font-medium">
                {activeOngoingSOS.progress_step === 'ARRIVED' || activeOngoingSOS.status === 'PENDING_COMPLETION'
                  ? 'Arrivé sur place ✓'
                  : 'En route (~15 min)'}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
              activeOngoingSOS.status === 'PENDING_COMPLETION'
                ? 'bg-purple-50 border-purple-300 text-purple-900 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <span className="text-xs font-black">3. Clôture</span>
              <p className="text-[10px] font-medium">
                {activeOngoingSOS.status === 'PENDING_COMPLETION' ? 'Validation Prix' : 'À venir'}
              </p>
            </div>
          </div>

          {/* Fiche Maâlem & Actions Directes */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-xs flex-shrink-0">
                {(activeOngoingSOS.maalem_name || matchedMaalem?.full_name || 'M')[0].toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base">
                    {activeOngoingSOS.maalem_name || matchedMaalem?.full_name || 'Artisan Maâlem'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                    ✓ Vérifié
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>4.9 / 5</span>
                  </span>
                  <span>•</span>
                  <span>{activeOngoingSOS.subcategory || 'Dépannage'}</span>
                </div>
              </div>
            </div>

            {/* Boutons d'Appel / WhatsApp */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {activeOngoingSOS.maalem_phone && (
                <a
                  href={`tel:${activeOngoingSOS.maalem_phone}`}
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>Appeler</span>
                </a>
              )}
              {activeOngoingSOS.maalem_phone && (
                <a
                  href={`https://wa.me/212${String(activeOngoingSOS.maalem_phone).replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(`Bonjour, je suis le client pour l'intervention BricoleMoi (${activeOngoingSOS.subcategory || 'Dépannage'}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Validation Fin de Travaux si en attente */}
          {activeOngoingSOS.status === 'PENDING_COMPLETION' && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Le Maâlem a terminé l'intervention</span>
                </span>
                <span className="text-sm font-black font-mono text-emerald-900 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-xs">
                  {activeOngoingSOS.final_agreed_price || 150} DH
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Montant convenu pour la prestation : <strong>{activeOngoingSOS.final_agreed_price || 150} DH</strong>. Veuillez confirmer pour finaliser et évaluer l'artisan.
              </p>
              <button
                type="button"
                onClick={() => setPendingCompletionModalInt(activeOngoingSOS)}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmer &amp; Évaluer la Prestation</span>
              </button>
            </div>
          )}

          {/* Note Vocale Enregistrée par le Client */}
          {activeOngoingSOS.audio_note_url && (
            <VoiceAudioPlayer
              audioUrl={activeOngoingSOS.audio_note_url}
              title="Votre Note Vocale Envoyée au Maâlem"
            />
          )}

          {/* Carte Interactive Live */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Position géolocalisée du chantier</span>
              </span>
              <span className="text-[11px] text-blue-600 font-mono font-bold">Suivi Live</span>
            </label>
            <InteractiveMap
              mode="CLIENT_PICKER"
              selectedLat={parseFloat(activeOngoingSOS.lat || selectedLat)}
              selectedLng={parseFloat(activeOngoingSOS.lng || selectedLng)}
              filterCategory={activeOngoingSOS.service_type || serviceType}
            />
          </div>

          {/* Option discrète pour lancer une autre demande */}
          <div className="pt-2 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={() => setShowNewSOSForm(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>+ Besoin d'un autre dépannage en parallèle ?</span>
            </button>
          </div>
        </motion.div>
      ) : activePendingSOS ? (
        /* 2. ECRAN RADAR DE RECHERCHE (SI SOS EN ATTENTE D'UN ARTISAN) */
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-6 text-slate-900"
        >
          {/* Top Radar Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3.5">
              {/* Pulsing Radar Icon Container */}
              <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-blue-100 animate-ping" />
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border-2 border-blue-500 text-blue-600 flex items-center justify-center shadow-xs">
                  <Siren className="w-7 h-7 animate-bounce text-blue-600" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 font-mono">Radar SOS Actif • Diffusion Live</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Recherche d'un Maâlem en cours...
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-xs shadow-xs">
                {getServiceDisplay(activePendingSOS.service_type).label}
              </span>
            </div>
          </div>

          {/* Radar Scanner Widget */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-4">
              {/* Concentric Radar Circles with Rotating Scanner */}
              <div className="relative w-20 h-20 rounded-full border border-blue-300 bg-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <div className="absolute inset-2 rounded-full border border-dashed border-blue-200" />
                <div className="absolute inset-4 rounded-full border border-blue-100" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent animate-spin" style={{ animationDuration: '3s' }} />
                <MapPin className="w-6 h-6 text-blue-600 z-10" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900">
                  Diffusion transmise aux artisans disponibles à <span className="text-blue-600 font-black">{activePendingSOS.district || selectedDistrict}</span>
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Dès qu'un Maâlem accepte l'intervention, votre écran se synchronise automatiquement avec son contact et son suivi GPS.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    🟢 {onlineMaalemsCount} Maâlem(s) notifié(s)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
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
              className="w-full md:w-auto px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Annuler la demande SOS</span>
            </motion.button>
          </div>

          {/* Note Vocale SOS Enregistrée */}
          {activePendingSOS.audio_note_url && (
            <VoiceAudioPlayer
              audioUrl={activePendingSOS.audio_note_url}
              title="Votre Note Vocale SOS Transmise aux Artisans"
            />
          )}

          {/* Carte interactive en direct pour le Client */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Radar des Artisans en direct autour de vous</span>
              </span>
              <span className="text-[11px] text-blue-600 font-mono font-bold">100% Live Stream</span>
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
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden text-slate-900"
        >
          {activeOngoingSOS && showNewSOSForm && (
            <div className="mb-6 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-blue-900 font-medium">
              <span>🚗 Une intervention est en cours avec votre Maâlem ({activeOngoingSOS.subcategory || 'Dépannage'}).</span>
              <button
                type="button"
                onClick={() => setShowNewSOSForm(false)}
                className="font-bold underline text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                Retourner au suivi en direct →
              </button>
            </div>
          )}

          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Lightning weight="fill" className="w-3.5 h-3.5 text-blue-600" />
              <span>Dépannage d'Urgence Express 24h/7j • Maroc</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
              Sélectionnez votre Service
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
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
          <form onSubmit={handleSOSSubmit} className="space-y-6 pt-4 border-t border-slate-200">
          
          {/* Sélecteur de Niveau d'Urgence */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Siren className="w-4 h-4 text-blue-600" />
                <span>Délai d'intervention souhaité :</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setUrgencyLevel('IMMEDIATE')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs cursor-pointer ${
                  urgencyLevel === 'IMMEDIATE'
                    ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <Lightning weight="fill" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900">🚨 Urgence Immédiate</span>
                    <span className="text-[10px] text-slate-500">Arrivée estimée sous 20 à 30 min</span>
                  </div>
                </div>
                {urgencyLevel === 'IMMEDIATE' && <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => setUrgencyLevel('SCHEDULED')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs cursor-pointer ${
                  urgencyLevel === 'SCHEDULED'
                    ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck weight="duotone" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900">📅 Rendez-vous Planifié</span>
                    <span className="text-[10px] text-slate-500">Aujourd'hui ou dans la semaine</span>
                  </div>
                </div>
                {urgencyLevel === 'SCHEDULED' && <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>
            </div>
          </div>

          {/* Interactive Leaflet Location Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Position géolocalisée de l'urgence</span>
              </span>
              <span className="text-[11px] text-blue-600 font-normal">Maalems en temps réel</span>
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
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Colonne 1 : Ville */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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

          {/* Transparence Tarifaire Marocaine */}
          <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-3xl shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <ShieldCheck weight="duotone" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Transparence Tarifaire &amp; Diagnostic sur Place
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Conforme aux usages du marché marocain • 0 Mauvaise surprise
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-800 font-mono font-bold text-xs shadow-xs">
                  Déplacement &amp; Constat : 40 - 50 DH
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-xs">
              <p className="flex items-center gap-1.5 font-medium">
                <span className="text-blue-600 font-bold">✔ Accord Préalable :</span>
                <span>Le Maâlem évalue la panne chez vous et valide le prix des travaux avec vous <strong>avant tout début d'intervention</strong>.</span>
              </p>
              <p dir="rtl" className="text-[11px] text-amber-800 font-bold font-sans pt-0.5">
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
            <p className="text-[10px] text-slate-500 text-center font-medium">
              💡 Vous pouvez enregistrer une note vocale rapide en Darija ou Français pour expliquer votre problème.
            </p>
          </div>

          {/* Multi-Photo Attachment */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-600" />
                <span>Photos de la panne / problème ({photos.length}/3 photos)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
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
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-blue-400 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-md transition-transform active:scale-90 cursor-pointer"
                          title="Supprimer cette photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 right-1 bg-black/75 text-[10px] font-mono px-1.5 rounded text-white">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Zone de téléchargement / Caméra (si moins de 3 photos) */}
                {photos.length < 3 && (
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl cursor-pointer bg-white hover:bg-blue-50/50 transition-all text-center group">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-black text-slate-800">
                      {photos.length === 0 ? 'Prendre une photo ou Choisir une image' : 'Ajouter une photo supplémentaire'}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">Jusqu'à 3 photos (Vue d'ensemble / Détail de la pièce)</span>
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
                className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:outline-none transition-colors shadow-xs"
              />
            )}
          </div>

          {/* Précision d'Accès / Adresse (Optionnel) */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-2">
              <span>✍️ Précision d'accès / Instructions (Optionnel)</span>
            </label>
            <input
              type="text"
              placeholder="ex: Étage 3, porte droite, en face de la pharmacie, sonnette n°4..."
              value={accessDetails}
              onChange={(e) => setAccessDetails(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          {/* Indicateur d'artisans en ligne + Bouton SOS */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs px-1">
              {onlineMaalemsCount > 0 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping flex-shrink-0" />
                  <span>{onlineMaalemsCount} {onlineMaalemsCount === 1 ? 'Artisan Maâlem' : 'Artisans Maâlems'} En Ligne à {selectedCity}</span>
                </span>
              ) : (
                <span className="text-amber-800 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping flex-shrink-0" />
                  <span>Aucun artisan connecté à {selectedCity} actuellement</span>
                </span>
              )}
              <span className="text-slate-500 text-[11px]">
                {onlineMaalemsCount > 0 ? 'Prêt à intervenir' : 'Alerte transmise dès connexion'}
              </span>
            </div>

            {/* Primary SOS Action Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-3 font-sans active:scale-95 cursor-pointer"
            >
              <Zap className="w-6 h-6 text-white fill-current" />
              <span>{submitting ? t('loading') : 'Lancer l\'Alerte SOS Express (Dépannage Immédiat)'}</span>
              <ChevronRight className="w-5 h-5 text-blue-100" />
            </motion.button>
          </div>

          {!user && (
            <p className="text-[11px] text-center text-slate-500 font-medium">
              💡 Identification rapide par SMS/OTP requise lors de l'envoi.
            </p>
          )}
        </form>
      </motion.div>
      )}

      {/* 2. Demandes en Cours & Suivi en Direct */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          {t('my_requests')} en cours ({activeClientInterventions.length})
        </h3>

        {activeClientInterventions.length === 0 ? (
          <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-2 shadow-xs">
            <p className="text-sm font-bold text-slate-700">✨ Vous n'avez aucune demande SOS en cours.</p>
            <p className="text-xs text-slate-500">Remplissez le formulaire ci-dessus pour envoyer une alerte aux Maâlems de votre secteur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeClientInterventions.map((item) => {
              const serviceInfo = getServiceDisplay(item.service_type);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 shadow-xs">
                        <span className="text-sm">{serviceInfo.icon}</span>
                        <span>{serviceInfo.label}</span>
                      </span>

                      <span className={`px-3.5 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 ${
                        item.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200 animate-pulse'
                          : item.status === 'ACCEPTED'
                          ? (item.progress_step === 'ARRIVED'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200 animate-pulse'
                              : item.progress_step === 'ON_THE_WAY'
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200')
                          : item.status === 'PENDING_COMPLETION'
                          ? 'bg-purple-50 text-purple-900 border border-purple-200 animate-pulse'
                          : item.status === 'UNFEASIBLE'
                          ? 'bg-rose-50 text-rose-900 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
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
                          {item.status === 'UNFEASIBLE' && '❌ Mission Non Réalisable'}
                        </span>
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <p className="font-bold text-slate-900 text-sm">{item.subcategory || 'Dépannage'}</p>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.district}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(item.created_at || Date.now()).toLocaleTimeString()} ({new Date(item.created_at || Date.now()).toLocaleDateString()})</span>
                      </p>

                      {item.status === 'ACCEPTED' && item.progress_step === 'ARRIVED' && (
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2 mt-2 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping flex-shrink-0" />
                          <span>📍 Le Maâlem est arrivé à votre domicile et démarre le diagnostic.</span>
                        </div>
                      )}

                      {item.status === 'ACCEPTED' && item.progress_step === 'ON_THE_WAY' && (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 mt-2 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse flex-shrink-0" />
                          <span>🚗 Le Maâlem est actuellement en route vers votre adresse.</span>
                        </div>
                      )}

                      {item.status === 'UNFEASIBLE' && (
                        <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200 space-y-2.5 mt-2 shadow-xs text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-amber-950">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>Artisan indisponible pour cette intervention</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            Motif signalé : <strong>{
                              item.unfeasible_reason === 'CLIENT_UNREACHABLE' ? 'Client injoignable par téléphone' :
                              item.unfeasible_reason === 'PARTS_UNAVAILABLE' ? 'Pièce de rechange indisponible sur le marché' :
                              item.unfeasible_reason === 'CLIENT_CANCELLED' ? 'Demande annulée' :
                              item.unfeasible_reason === 'PRICE_DISAGREEMENT' ? 'Périmètre ou devis hors portée' :
                              item.unfeasible_reason === 'WRONG_LOCATION' ? 'Hors secteur géographique' :
                              (item.unfeasible_reason || 'Impossibilité technique ou imprévu')
                            }</strong>.
                          </p>
                          <button
                            type="button"
                            onClick={() => relaunchEmergencyRequest(item.id)}
                            className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                          >
                            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                            <span>⚡ Relancer immédiatement la recherche d'un autre Maâlem</span>
                          </button>
                        </div>
                      )}

                      {item.status === 'PENDING_COMPLETION' && (
                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 mt-2 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Travaux finalisés par le Maâlem</span>
                            </span>
                            <span className="text-xs font-black font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                              {item.final_agreed_price || item.estimated_price_min || 150} DH
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-700">
                            Le Maâlem a terminé les travaux pour un montant de <strong>{item.final_agreed_price || 150} DH</strong>. Veuillez confirmer pour clôturer et noter.
                          </p>
                          <button
                            type="button"
                            onClick={() => setPendingCompletionModalInt(item)}
                            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirmer &amp; Évaluer la Prestation</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    {item.status === 'ACCEPTED' && (
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                          <span>🛠️ {item.maalem_name || 'Artisan Maâlem'}</span>
                        </div>
                        {item.maalem_phone && (
                          <a
                            href={`tel:${item.maalem_phone}`}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-all"
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
                        className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Valider Fin de Chantier ({item.final_agreed_price || 150} DH)</span>
                      </button>
                    )}

                    {item.status === 'PENDING' && (
                      <button
                        onClick={() => cancelIntervention(item.id)}
                        className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
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

      {/* 3. Historique des Demandes Clôturées & Prestations Passées (avec Pagination) */}
      {completedClientInterventions.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Historique de vos Demandes ({completedClientInterventions.length})
            </h3>
            {totalClientHistoryPages > 1 && (
              <p className="text-xs text-slate-500 font-medium">
                Page {clientHistoryPage} sur {totalClientHistoryPages}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedCompletedInterventions.map((item) => {
              const serviceInfo = getServiceDisplay(item.service_type);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 shadow-xs">
                        <span className="text-sm">{serviceInfo.icon}</span>
                        <span>{serviceInfo.label}</span>
                      </span>

                      <span className={`px-3 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 ${
                        item.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span>{item.status === 'COMPLETED' ? 'Terminé & Validé' : 'Annulé'}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-900 text-sm">{item.subcategory || 'Dépannage'}</p>
                        {item.final_agreed_price && (
                          <span className="font-mono font-black text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {item.final_agreed_price} DH
                          </span>
                        )}
                      </div>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.district}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(item.created_at || Date.now()).toLocaleTimeString()} ({new Date(item.created_at || Date.now()).toLocaleDateString()})</span>
                      </p>

                      {item.maalem_name && (
                        <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200 font-medium">
                          🛠️ Réalisé par : <strong>{item.maalem_name}</strong>
                        </p>
                      )}

                      {item.comment && (
                        <p className="text-[11px] text-slate-600 italic bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                          ⭐ Votre avis : "{item.comment}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {item.rating ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>Note : {item.rating} / 5</span>
                      </span>
                    ) : item.status === 'COMPLETED' ? (
                      <button
                        onClick={() => setReviewModalInt(item)}
                        className="px-3.5 py-2 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs rounded-xl hover:bg-amber-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                        <span>Laisser un Avis</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Demande clôturée</span>
                    )}

                    <span className="text-[10px] font-mono text-slate-400">
                      ID: #{String(item.id).slice(0, 8)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls Client */}
          {totalClientHistoryPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setClientHistoryPage((p) => Math.max(1, p - 1))}
                disabled={clientHistoryPage === 1}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  clientHistoryPage === 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalClientHistoryPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setClientHistoryPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                      clientHistoryPage === pageNum
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setClientHistoryPage((p) => Math.min(totalClientHistoryPages, p + 1))}
                disabled={clientHistoryPage === totalClientHistoryPages}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  clientHistoryPage === totalClientHistoryPages
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      <AnimatePresence>
        {reviewModalInt && (
          <motion.div
            key="review-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-2xl space-y-4 text-slate-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 font-sans">
                  ⭐ Évaluer la Prestation
                </h3>
                <button
                  onClick={() => closeReviewModal()}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer touch-target-44 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* 1. Étoiles Interactives */}
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
                          className="p-1 transition-all duration-200 hover:scale-125 active:scale-95 cursor-pointer"
                        >
                          <Star
                            className={`w-9 h-9 transition-all duration-200 ${
                              isFilled
                                ? (activeValue === 5 
                                    ? 'text-amber-500 fill-amber-500'
                                    : activeValue >= 4
                                    ? 'text-emerald-600 fill-emerald-600'
                                    : activeValue === 3
                                    ? 'text-blue-600 fill-blue-600'
                                    : 'text-amber-600 fill-amber-600')
                                : 'text-slate-300 hover:text-slate-400'
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
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-black border ${SENTIMENT_FEEDBACK[hoverRating || rating]?.bg} ${SENTIMENT_FEEDBACK[hoverRating || rating]?.color} shadow-xs`}
                  >
                    {SENTIMENT_FEEDBACK[hoverRating || rating]?.text}
                  </motion.div>
                </div>

                {/* 2. Badges / Tags Adaptatifs */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {rating >= 4 ? '✨ Points forts :' : '⚠️ Points à améliorer :'}
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
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-red-50 text-red-800 border-red-200')
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {badge}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Pourboire Optionnel */}
                {rating >= 4 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>🎁 Pourboire (Optionnel) :</span>
                      <span className="text-[10px] text-amber-800 font-mono font-bold">100% reversé à l'artisan</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 10, 20, 50].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setTipAmount(amount)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            tipAmount === amount
                              ? 'bg-amber-500 text-white border-amber-600 shadow-xs scale-105'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Commentaire :</label>
                  <textarea
                    rows={3}
                    placeholder={rating >= 4 ? "Partagez votre expérience..." : "Décrivez le problème rencontré..."}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>Envoyer mon Avis &amp; Clôturer</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-white border border-emerald-200 p-4 sm:p-6 rounded-3xl max-w-md w-full max-h-modal overflow-y-auto modal-scroll shadow-2xl space-y-4 text-slate-900 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
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
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-all cursor-pointer touch-target-44 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed">
                  L'artisan <strong>{pendingCompletionModalInt.maalem_name || 'Maâlem'}</strong> a signalé la fin de l'intervention pour votre demande de <strong>{pendingCompletionModalInt.subcategory || 'Dépannage'}</strong>.
                </p>

                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Montant Total Convenu :</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Règlement direct à l'artisan</span>
                    <span className="text-lg font-black font-mono text-emerald-800">
                      {pendingCompletionModalInt.final_agreed_price || pendingCompletionModalInt.estimated_price_min || 150} DH
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic text-center">
                  En confirmant, vous validez la bonne exécution des travaux et accédez à l'évaluation du Maâlem.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      const intToComplete = pendingCompletionModalInt;
                      if (!intToComplete) return;
                      const id = intToComplete.id;
                      setDismissedCompletionIds((prev) => {
                        const next = Array.from(new Set([...prev, id]));
                        try { localStorage.setItem('bricolemoi_dismissed_completions', JSON.stringify(next)); } catch (e) {}
                        return next;
                      });
                      setPendingCompletionModalInt(null);
                      setReviewModalInt(intToComplete);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirmer &amp; Évaluer la Prestation</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setDismissedCompletionIds((prev) => [...prev, pendingCompletionModalInt.id]);
                    setPendingCompletionModalInt(null);
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Vérifier sur place / Plus tard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODALE D'URGENCE : NUMÉRO DE CONTACT POUR SOS GOOGLE    */}
      {/* ======================================================== */}
      <AnimatePresence>
        {sosPhoneModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 10 }}
              className="bg-white border border-red-200 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-slate-900 space-y-4"
            >
              <button
                onClick={() => setSosPhoneModalOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer touch-target-44 active:scale-95"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-2 pt-1">
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto shadow-xs">
                  <Siren className="w-7 h-7 text-red-600 animate-bounce" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">Numéro de Contact d'Urgence</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  L'artisan doit pouvoir <strong>vous appeler directement</strong> avant de prendre la route pour intervenir chez vous.
                </p>
              </div>

              <form onSubmit={handleConfirmSosPhone} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Votre Numéro de Téléphone :</label>
                  <div className="relative">
                    {/* Sélecteur Pays */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20" ref={sosCountryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setSosCountryOpen(!sosCountryOpen)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <img 
                          src={sosCountry.flagUrl || `https://flagcdn.com/w40/${sosCountry.code.toLowerCase()}.png`} 
                          alt={sosCountry.name} 
                          className="w-4 h-3 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
                        />
                        <span>{sosCountry.dial}</span>
                        <ChevronRight className="w-3 h-3 text-slate-500 opacity-70 rotate-90" />
                      </button>

                      {sosCountryOpen && (
                        <div className="absolute left-0 top-full mt-1.5 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 modal-scroll backdrop-blur-xl">
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setSosCountry(c);
                                setSosCountryOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                                sosCountry.code === c.code
                                  ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <img 
                                  src={c.flagUrl} 
                                  alt={c.name} 
                                  className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0 border border-slate-200/60" 
                                />
                                <span className="truncate text-left text-xs">{c.name}</span>
                              </div>
                              <span className="font-mono text-blue-700 text-xs font-bold shrink-0">{c.dial}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      required
                      placeholder={sosCountry.placeholder || '612345678'}
                      value={sosPhoneInput}
                      onChange={(e) => setSosPhoneInput(e.target.value)}
                      className="w-full pl-28 sm:pl-32 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm font-bold focus:border-blue-600 focus:bg-white focus:outline-none transition-colors shadow-xs dir-ltr tracking-wider"
                      autoFocus
                    />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={savingSosPhone}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{savingSosPhone ? 'Validation...' : 'Confirmer &amp; Déclencher l\'Alerte SOS ⚡'}</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
