import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { useEmergencyFlow } from '../../../context/EmergencyFlowContext';
import { MOROCCAN_CITIES, COUNTRY_DIAL_CODES } from '../../../constants/geo';
import { reverseGeocodeMorocco } from '../../../lib/geoService';
import { uploadMediaToR2 } from '../../../lib/r2StorageService';
import { db, isDbConfigured, supabase, isSupabaseConfigured, generatePbId } from '../../../lib/dbClient';
import { isMatchingInterventionId } from '../../../context/app/helpers/appSyncHelpers';
import { toast } from 'sonner';

export const getServiceDisplay = (type) => {
  const t = String(type || '').toUpperCase();
  if (t.includes('PLUMB') || t.includes('PLOMB')) return { label: 'Plomberie', icon: '🚰' };
  if (t.includes('ELEC')) return { label: 'Électricité', icon: '⚡' };
  if (t.includes('SERRUR') || t.includes('LOCK')) return { label: 'Serrurerie', icon: '🔑' };
  if (t.includes('VOLET') || t.includes('RIDEAU')) return { label: 'Volets & Rideaux', icon: '🪟' };
  if (t.includes('PARABOL') || t.includes('CAMERA') || t.includes('TV')) return { label: 'Paraboles & Caméras', icon: '📡' };
  if (t.includes('SOLAR') || t.includes('SOLAIRE') || t.includes('CHAUFFE')) return { label: 'Chauffe-eau & Solaire', icon: '🔥' };
  if (t.includes('AUTO') || t.includes('MECAN')) return { label: 'Mécanique Auto', icon: '🚗' };
  if (t.includes('CLIM') || t.includes('FROID')) return { label: 'Climatisation', icon: '❄️' };
  if (t.includes('ELECTRO') || t.includes('APPLIANCE')) return { label: 'Électroménager', icon: '🧺' };
  if (t.includes('PEINT')) return { label: 'Peinture', icon: '🎨' };
  if (t.includes('MENUIS')) return { label: 'Menuiserie', icon: '🪚' };
  if (t.includes('ETANCH') || t.includes('MACON')) return { label: 'Étanchéité', icon: '🧱' };
  if (t.includes('NETT')) return { label: 'Nettoyage', icon: '🧹' };
  return { label: 'Dépannage', icon: '🛠️' };
};

export const mapCategoryToSlug = (cat) => {
  if (!cat) return 'plomberie';
  const c = String(cat).toLowerCase();
  if (c.includes('plomb')) return 'plomberie';
  if (c.includes('elec')) return 'electricite';
  if (c.includes('serrur')) return 'serrurerie';
  if (c.includes('volet') || c.includes('rideau')) return 'volets-rideaux';
  if (c.includes('parabol') || c.includes('camera') || c.includes('tv')) return 'parabole-cameras';
  if (c.includes('solar') || c.includes('solaire') || c.includes('chauffe')) return 'chauffe-eau-solaire';
  if (c.includes('auto') || c.includes('mecan')) return 'mecanique';
  if (c.includes('clim') || c.includes('froid')) return 'climatisation';
  if (c.includes('appliance') || c.includes('electro')) return 'electromenager';
  if (c.includes('peint')) return 'peinture';
  if (c.includes('menuis')) return 'menuiserie';
  if (c.includes('macon') || c.includes('etanch')) return 'etancheite-carrelage';
  if (c.includes('nett')) return 'nettoyage-menage';
  return c;
};

// Résolution instantanée de la ville la plus proche (0ms fallback)
export const findNearestCatalogCity = (lat, lng) => {
  if (!lat || !lng) return { city: 'Casablanca', district: 'Maârif' };
  let nearestCity = MOROCCAN_CITIES[0];
  let minDistance = Infinity;

  MOROCCAN_CITIES.forEach((c) => {
    const dLat = c.lat - lat;
    const dLng = c.lng - lng;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = c;
    }
  });

  const defaultDistrict = nearestCity.districts?.[0]?.name || 'Centre';
  return { city: nearestCity.name, district: defaultDistrict };
};

export const SENTIMENT_FEEDBACK = {
  5: { text: '🔥 Excellent ! (Recommandé à 100%)', color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-500/50' },
  4: { text: '✨ Très Bien (Professionnel & Efficace)', color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-500/50' },
  3: { text: '👌 Correct (Prestation Standard)', color: 'text-cyan-400', bg: 'bg-cyan-950/80 border-cyan-500/50' },
  2: { text: '⚠️ Moyen (Quelques points à corriger)', color: 'text-amber-300', bg: 'bg-amber-950/80 border-amber-500/50' },
  1: { text: '❌ Insatisfait (Signalement Équipe Support)', color: 'text-red-400', bg: 'bg-red-950/80 border-red-500/50' }
};

export const POSITIVE_BADGES = ['⏱️ Très Ponctuel', '🧹 Chantier Propre', '💰 Prix Respecté', '🤝 Sympathique', '🛠️ Matériel Pro', '⚡ Diagnostic Rapide'];
export const NEGATIVE_BADGES = ['⏱️ Retard important', '💰 Prix plus cher que prévu', '🛠️ Travail incomplet', '🧹 Saleté laissée sur place', '⚠️ Communication difficile'];

export const useClientViewState = ({ initialCategory, initialCity, initialDistrict }) => {
  const { t, user, setUser, setAuthModalOpen, lang } = useAuth();
  const {
    interventions,
    maalems,
    clients,
    reviews,
    createIntervention,
    confirmFinalDevis,
    completeIntervention,
    submitReview,
    cancelIntervention,
    relaunchEmergencyRequest
  } = useApp();

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

  const savedGPS = (() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_client_gps') || 'null');
    } catch (e) {
      return null;
    }
  })();

  const startCategory = initialCategory || pendingIntent?.category || 'plomberie';
  const startCity = initialCity || pendingIntent?.city || savedGPS?.city || 'Casablanca';
  const startCityObj =
    MOROCCAN_CITIES.find((c) => c.name.toLowerCase() === startCity.toLowerCase()) || MOROCCAN_CITIES[0];
  const startDistrict =
    initialDistrict ||
    pendingIntent?.district ||
    (initialCity ? startCityObj.districts?.[0]?.name || 'Centre' : savedGPS?.district || 'Maârif');
  const startDistrictObj =
    (startCityObj.districts || []).find((d) => d.name.toLowerCase() === startDistrict.toLowerCase()) ||
    startCityObj.districts?.[0];

  const [serviceType, setServiceType] = useState(() => mapCategoryToSlug(startCategory));
  const [selectedSubcategory, setSelectedSubcategory] = useState('Réparations & Fuite');
  const [urgencyLevel, setUrgencyLevel] = useState('IMMEDIATE');

  const [selectedCity, setSelectedCity] = useState(startCityObj.name);
  const [selectedDistrict, setSelectedDistrict] = useState(startDistrictObj?.name || 'Maârif');
  const [selectedLat, setSelectedLat] = useState(startDistrictObj?.lat || savedGPS?.lat || 33.5883);
  const [selectedLng, setSelectedLng] = useState(startDistrictObj?.lng || savedGPS?.lng || -7.6328);

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
        const dist = initialDistrict
          ? (cityObj.districts || []).find((d) => d.name.toLowerCase() === initialDistrict.toLowerCase())
          : cityObj.districts?.[0];
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

  const [pendingCompletionModalInt, setPendingCompletionModalInt] = useState(null);
  const [dismissedCompletionIds, setDismissedCompletionIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_dismissed_completions') || '[]');
    } catch (e) {
      return [];
    }
  });

  const DUMMY_CLIENT_ID = '11111111-1111-1111-1111-111111111111';

  const clientPhoneMap = new Map(
    (clients || []).map((c) => [String(c.id).trim(), String(c.phone || '').replace(/\D/g, '').slice(-9)])
  );
  const cp9 = String(user?.phone || '').replace(/\D/g, '').slice(-9);
  const uId = String(user?.id || '').trim();

  const myClientInterventions = interventions
    .filter((item) => {
      let myCreated = [];
      try {
        myCreated = JSON.parse(localStorage.getItem('bricolemoi_my_created_leads') || '[]');
      } catch (e) {}

      const isOwnerByLocalCreated = myCreated.some(
        (cId) => isMatchingInterventionId(cId, item.id) || (item.uuid && isMatchingInterventionId(cId, item.uuid))
      );
      if (isOwnerByLocalCreated) return true;

      if (!user) return false;

      const iClientId = String(item.client_id || '').trim();
      const isOwnerById =
        uId &&
        uId !== DUMMY_CLIENT_ID &&
        iClientId &&
        iClientId !== DUMMY_CLIENT_ID &&
        iClientId === uId;

      const rawPhone = item.client_phone || clientPhoneMap.get(iClientId) || '';
      const ip9 = String(rawPhone).replace(/\D/g, '').slice(-9);
      const isOwnerByPhone = cp9.length >= 8 && ip9.length >= 8 && cp9 === ip9;

      return isOwnerById || isOwnerByPhone;
    })
    .sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  const [clientHistoryPage, setClientHistoryPage] = useState(1);

  const activeClientInterventions = myClientInterventions
    .filter(
      (item) =>
        ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION', 'UNFEASIBLE'].includes(
          item.status
        ) &&
        item.status !== 'COMPLETED' &&
        item.status !== 'CANCELLED'
    )
    .sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  const completedClientInterventions = myClientInterventions
    .filter((item) => item.status === 'COMPLETED' || item.status === 'CANCELLED')
    .map((item) => {
      const sId = String(item.id || '').trim();
      const rev = (reviews || []).find(
        (r) => String(r.intervention_id || '').trim() === sId
      );
      const exactRating =
        item.rating !== undefined && item.rating !== null && !isNaN(Number(item.rating)) && Number(item.rating) > 0
          ? Number(item.rating)
          : (rev && rev.rating !== undefined && rev.rating !== null && !isNaN(Number(rev.rating)) && Number(rev.rating) > 0
              ? Number(rev.rating)
              : null);

      return {
        ...item,
        rating: exactRating,
        comment: item.comment || rev?.comment || null,
        badges: item.badges || rev?.badges || []
      };
    })
    .sort(
      (a, b) =>
        new Date(b.completed_at || b.updated_at || b.created_at || 0) -
        new Date(a.completed_at || a.updated_at || a.created_at || 0)
    );

  const CLIENT_HISTORY_PER_PAGE = 4;
  const totalClientHistoryPages = Math.max(
    1,
    Math.ceil(completedClientInterventions.length / CLIENT_HISTORY_PER_PAGE)
  );
  const paginatedCompletedInterventions = completedClientInterventions.slice(
    (clientHistoryPage - 1) * CLIENT_HISTORY_PER_PAGE,
    clientHistoryPage * CLIENT_HISTORY_PER_PAGE
  );

  useEffect(() => {
    const pendingInt = myClientInterventions.find(
      (i) => (i.status === 'PENDING_COMPLETION' || i.on_site_review_requested) && 
             i.status !== 'COMPLETED' && 
             i.status !== 'CANCELLED' && 
             !dismissedCompletionIds.includes(i.id)
    );
    if (pendingInt && (!pendingCompletionModalInt || pendingCompletionModalInt.id !== pendingInt.id)) {
      setPendingCompletionModalInt(pendingInt);
    } else if (!pendingInt && pendingCompletionModalInt) {
      setPendingCompletionModalInt(null);
    }
  }, [myClientInterventions, dismissedCompletionIds, pendingCompletionModalInt]);

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

  const cityOptions = MOROCCAN_CITIES.map((c) => ({
    value: c.name,
    label: c.name
  }));

  const normCity = (s) =>
    String(s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  const currentCityObj =
    MOROCCAN_CITIES.find((c) => normCity(c.name) === normCity(selectedCity)) || MOROCCAN_CITIES[0];
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

  const updateCityAndDistrictFromGPS = async (lat, lng) => {
    const instantFallback = findNearestCatalogCity(lat, lng);
    setSelectedCity(instantFallback.city);
    setSelectedDistrict(instantFallback.district);

    try {
      const geoResult = await reverseGeocodeMorocco(lat, lng);
      if (geoResult && geoResult.city) {
        setSelectedCity(geoResult.city);
        setSelectedDistrict(geoResult.district || geoResult.city);

        try {
          localStorage.setItem(
            'bricolemoi_client_gps',
            JSON.stringify({
              lat,
              lng,
              city: geoResult.city,
              district: geoResult.district || geoResult.city,
              fullLabel: geoResult.fullLabel,
              updated_at: Date.now()
            })
          );
        } catch (e) {}
      }
    } catch (e) {}
  };

  const serviceKey = String(serviceType || '').toUpperCase();
  const realOnlineMaalemsInCity = (maalems || []).filter((m) => {
    const isOnline = m.is_online === true || m.is_available === true;
    if (!isOnline) return false;

    const maalemLoc = (m.district || m.city || '').toLowerCase();
    const cityMatches = maalemLoc.includes(selectedCity.toLowerCase());
    if (!cityMatches) return false;

    const maalemSpec = (m.specialty || '').toUpperCase();
    const specialtyMatches =
      maalemSpec === serviceKey ||
      maalemSpec.includes(serviceKey) ||
      serviceKey.includes(maalemSpec) ||
      (maalemSpec.includes('PLUMB') && serviceKey.includes('PLOMB')) ||
      (maalemSpec.includes('ELEC') && serviceKey.includes('ELEC')) ||
      maalemSpec === 'AUTRE' ||
      maalemSpec === 'POLYVALENT';

    return specialtyMatches;
  });

  const onlineMaalemsCount = realOnlineMaalemsInCity.length;

  const [devisModalInt, setDevisModalInt] = useState(null);
  const [devisInputPrice, setDevisInputPrice] = useState(350);

  const [reviewModalInt, setReviewModalInt] = useState(null);
  const [dismissedReviewIds, setDismissedReviewIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bricolemoi_dismissed_reviews') || '[]');
    } catch (e) {
      return [];
    }
  });

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedBadges, setSelectedBadges] = useState(['⏱️ Très Ponctuel', '🧹 Chantier Propre', '💰 Prix Respecté']);
  const [tipAmount, setTipAmount] = useState(0);

  const [cguOpen, setCguOpen] = useState(false);

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
        () => {
          navigator.geolocation.getCurrentPosition(
            applyLivePosition,
            () => {},
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

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
    const primaryPhoto = photos[0] || photoUrl || null;

    try {
      const created = await createIntervention({
        service_type: serviceType.toUpperCase(),
        subcategory: selectedSubcategory,
        district: fullDistrictLabel,
        lat: selectedLat,
        lng: selectedLng,
        description_photo: primaryPhoto,
        photos_list: photos.length > 0 ? photos : (primaryPhoto ? [primaryPhoto] : []),
        access_details: accessDetails,
        urgency_level: urgencyLevel,
        audio_note_url: audioUrl,
        client_phone: overridePhone || user?.phone
      });

      if (created) {
        flowTriggerSOS(created);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (!user || !user.phone || user.phone.length < 8) {
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

    let currentUser = user;
    if (!currentUser) {
      const generatedId = generatePbId();
      currentUser = {
        id: generatedId,
        full_name: `Client ${formatted.slice(-4)}`,
        phone: formatted,
        role: 'CLIENT'
      };
    } else {
      currentUser = { ...currentUser, phone: formatted };
    }

    setUser(currentUser);
    sessionStorage.setItem('bricolemoi_session', JSON.stringify(currentUser));

    if (isSupabaseConfigured && currentUser.id) {
      try {
        await supabase.from('profiles').upsert([{
          id: currentUser.id,
          full_name: currentUser.full_name,
          phone: formatted,
          role: 'CLIENT'
        }]);
      } catch (err) {
        console.error('Erreur save phone SOS:', err);
      }
    }

    setSavingSosPhone(false);
    setSosPhoneModalOpen(false);
    toast.success("📱 Numéro enregistré avec succès ! Lancement de l'alerte SOS...");
    await executeSOSCreation(formatted);
  };

  const toggleBadge = (badgeText) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeText) ? prev.filter((b) => b !== badgeText) : [...prev, badgeText]
    );
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const targetIntv = reviewModalInt || pendingCompletionModalInt || activeOngoingSOS || latestClientIntv;
    if (!targetIntv) return;

    const relevantBadges = selectedBadges.filter((b) =>
      rating >= 4 ? POSITIVE_BADGES.includes(b) : NEGATIVE_BADGES.includes(b)
    );

    const fullComment = `${comment.trim()}${
      relevantBadges.length > 0 ? ` [Badges: ${relevantBadges.join(', ')}]` : ''
    }${tipAmount > 0 ? ` [Pourboire: +${tipAmount} DH]` : ''}`;

    if (typeof submitClientFeedback === 'function') {
      await submitClientFeedback({
        intervention_id: targetIntv.id,
        rating,
        comment: fullComment,
        badges: relevantBadges,
        tipDh: tipAmount
      });
    } else {
      await submitReview({
        intervention_id: targetIntv.id,
        maalem_id: targetIntv.maalem_id,
        rating,
        comment: fullComment,
        badges: relevantBadges,
        tip_dh: tipAmount
      });
    }

    setDismissedReviewIds((prev) => Array.from(new Set([...prev, targetIntv.id])));
    setDismissedCompletionIds((prev) => Array.from(new Set([...prev, targetIntv.id])));
    setReviewModalInt(null);
    setPendingCompletionModalInt(null);
    setComment('');
    setTipAmount(0);
  };

  const latestClientIntv = myClientInterventions[0] || null;

  const ongoingFromList = activeClientInterventions.find(
    (i) =>
      i.status !== 'COMPLETED' &&
      i.status !== 'CANCELLED' &&
      i.status !== 'UNFEASIBLE' &&
      (['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(i.status) ||
       ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS'].includes(i.progress_step) ||
       Boolean(i.maalem_id))
  );

  // Synchroniser activeEmergency avec son état réel le plus récent dans myClientInterventions
  const liveActiveEmergency = activeEmergency?.id
    ? myClientInterventions.find(
        (i) =>
          isMatchingInterventionId(i.id, activeEmergency.id) ||
          (i.uuid && isMatchingInterventionId(i.uuid, activeEmergency.id))
      ) || activeEmergency
    : activeEmergency;

  const isLiveEmergencyActive =
    liveActiveEmergency &&
    liveActiveEmergency.status !== 'COMPLETED' &&
    liveActiveEmergency.status !== 'CANCELLED' &&
    liveActiveEmergency.status !== 'UNFEASIBLE' &&
    (
      ['ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'].includes(liveActiveEmergency.status) ||
      ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS'].includes(liveActiveEmergency.progress_step) ||
      Boolean(liveActiveEmergency.maalem_id)
    );

  const isEmergencyMatched = isMatched && isLiveEmergencyActive;

  const activeOngoingSOS =
    ongoingFromList
      ? ongoingFromList
      : (isEmergencyMatched && liveActiveEmergency && !isCompleted
        ? liveActiveEmergency
        : null);

  const pendingFromList = !activeOngoingSOS
    ? activeClientInterventions.find(
        (i) => i.status === 'PENDING' && !i.maalem_id && i.progress_step !== 'COMPLETED' && i.status !== 'CANCELLED' && i.status !== 'UNFEASIBLE'
      )
    : null;

  const isPendingEmergencyValid =
    liveActiveEmergency &&
    liveActiveEmergency.status === 'PENDING' &&
    !liveActiveEmergency.maalem_id &&
    liveActiveEmergency.status !== 'COMPLETED' &&
    liveActiveEmergency.status !== 'CANCELLED' &&
    liveActiveEmergency.status !== 'UNFEASIBLE';

  const activePendingSOS = !activeOngoingSOS
    ? pendingFromList ||
      (isSearching && !isEmergencyMatched && !isCompleted && isPendingEmergencyValid
        ? liveActiveEmergency || {
            id: 'pending-sos',
            service_type: serviceType,
            district: `${selectedCity} - ${selectedDistrict}`
          }
        : null)
    : null;

  const handleCancelIntervention = useCallback(
    async (interventionId) => {
      flowCancelSOS();
      return await cancelIntervention(interventionId);
    },
    [flowCancelSOS, cancelIntervention]
  );

  return {
    t,
    user,
    lang,
    setUser,
    serviceType,
    setServiceType,
    selectedSubcategory,
    setSelectedSubcategory,
    urgencyLevel,
    setUrgencyLevel,
    selectedCity,
    selectedDistrict,
    selectedLat,
    setSelectedLat,
    selectedLng,
    setSelectedLng,
    audioUrl,
    setAudioUrl,
    photos,
    photoUrl,
    setPhotoUrl,
    accessDetails,
    setAccessDetails,
    showUrlInput,
    setShowUrlInput,
    submitting,
    showNewSOSForm,
    setShowNewSOSForm,
    cityOptions,
    districtOptions,
    handleCityChange,
    handleDistrictChange,
    updateCityAndDistrictFromGPS,
    onlineMaalemsCount,
    devisModalInt,
    setDevisModalInt,
    devisInputPrice,
    setDevisInputPrice,
    confirmFinalDevis,
    reviewModalInt,
    setReviewModalInt,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    comment,
    setComment,
    selectedBadges,
    setSelectedBadges,
    toggleBadge,
    tipAmount,
    setTipAmount,
    cguOpen,
    setCguOpen,
    sosPhoneModalOpen,
    setSosPhoneModalOpen,
    sosPhoneInput,
    setSosPhoneInput,
    sosCountry,
    setSosCountry,
    sosCountryOpen,
    setSosCountryOpen,
    savingSosPhone,
    sosCountryDropdownRef,
    handleFileUpload,
    removePhoto,
    handleSOSSubmit,
    handleConfirmSosPhone,
    handleReviewSubmit,
    latestClientIntv,
    activeOngoingSOS,
    activePendingSOS,
    activeClientInterventions,
    completedClientInterventions,
    paginatedCompletedInterventions,
    clientHistoryPage,
    setClientHistoryPage,
    totalClientHistoryPages,
    cancelIntervention: handleCancelIntervention,
    relaunchEmergencyRequest,
    maalems,
    matchedMaalem,
    reviews,
    interventions,
    flowCancelSOS,
    pendingCompletionModalInt,
    setPendingCompletionModalInt,
    setDismissedCompletionIds
  };
};
