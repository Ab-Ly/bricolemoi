import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { useEmergencyFlow } from '../../../context/EmergencyFlowContext';
import { MOROCCAN_CITIES } from '../../../constants/geo';
import { calculateMaalemBalance, isBonusTx, isLeadTx, isRealRechargeTx } from '../../../utils/balanceUtils';
import { calculateMaalemRating } from '../../../utils/ratingUtils';
import { uploadMediaToR2 } from '../../../lib/r2StorageService';
import { db, isDbConfigured, supabase, isSupabaseConfigured } from '../../../lib/dbClient';
import { playSosRadarAlert } from '../../../services/soundAlertService';

export const useMaalemViewState = ({ onOpenCINVerification } = {}) => {
  const { t, user, setUser } = useAuth();
  const {
    interventions,
    maalems,
    transactions,
    reviews = [],
    loyaltyRewardsHistory = [],
    generateReceiptPDF,
    acceptLead,
    requestWorkCompletion,
    requestOnSiteReview,
    updateInterventionProgress,
    reportUnreachableClient,
    declareMissionUnfeasible,
    releaseLeadCredit,
    submitRechargeRequest,
    calculateDistanceInKm,
    verifyMaalemCINWithGemini,
    whatsappMsg,
    setWhatsappMsg,
    isMaalemOnline,
    toggleMaalemOnlineStatus
  } = useApp();

  const {
    state: emergencyState,
    isMatched,
    activeEmergency,
    progressStep: flowProgressStep,
    setProgressStep: flowSetProgressStep,
    finishMission: flowFinishMission,
    abandonActiveMission
  } = useEmergencyFlow();

  const currentLiveMaalem = maalems?.find((m) => m.id === user?.id) || user?.maalem_details || user;

  const balanceInfo = calculateMaalemBalance(user, transactions, maalems);
  const ratingInfo = calculateMaalemRating(user, reviews, interventions);
  const myTransactions = balanceInfo.myTransactions;
  const totalRechargedSum = balanceInfo.totalRechargedSum;
  const totalValidatedLeadsSpent = balanceInfo.totalValidatedLeadsSpent;
  const totalLeadsSpent = totalValidatedLeadsSpent;
  const totalBonusSum = balanceInfo.totalBonusSum;
  const liveTotalBalance = balanceInfo.liveTotalBalance;
  const liveAvailableBalance = balanceInfo.liveAvailableBalance;
  const liveCreditBalance = liveAvailableBalance;

  const maalemDetails = user?.maalem_details || {
    specialty: currentLiveMaalem?.specialty || 'PLUMBING',
    credit_balance: liveAvailableBalance,
    total_balance: liveTotalBalance,
    is_verified: currentLiveMaalem?.is_verified ?? true,
    rating_avg: ratingInfo.averageRating,
    consecutive_five_stars: ratingInfo.consecutiveFiveStars,
    hundred_dh_recharges_count: 2
  };

  const isCinVerified = Boolean(
    user?.cin_verified ||
      user?.is_verified ||
      user?.profiles?.cin_verified ||
      user?.maalem_details?.cin_verified ||
      user?.maalem_details?.is_verified ||
      maalemDetails?.cin_verified ||
      maalemDetails?.is_verified
  );

  const getMaalemInitialCoords = () => {
    let lat = parseFloat(user?.lat);
    let lng = parseFloat(user?.lng);
    if (!isNaN(lat) && !isNaN(lng) && lng < 0 && lat >= 20 && lat <= 38) {
      return [lat, lng];
    }
    try {
      const saved = JSON.parse(
        localStorage.getItem('bricolemoi_maalem_gps') ||
          localStorage.getItem('bricolemoi_client_gps') ||
          'null'
      );
      if (saved?.lat && saved?.lng) return [saved.lat, saved.lng];
    } catch (e) {}
    const zone = (user?.city_zone || '').toLowerCase();
    if (zone.includes('fès') || zone.includes('fes')) return [34.0331, -5.0003];
    if (zone.includes('rabat')) return [34.0209, -6.8416];
    if (zone.includes('marrakech')) return [31.6295, -7.9811];
    if (zone.includes('tanger')) return [35.7595, -5.834];
    if (zone.includes('agadir')) return [30.4278, -9.5981];
    return [33.5883, -7.6328];
  };

  const [maalemPos, setMaalemPos] = useState(getMaalemInitialCoords);

  useEffect(() => {
    setMaalemPos(getMaalemInitialCoords());
  }, [user]);

  const [focusedMapCoords, setFocusedMapCoords] = useState(null);
  const [filterBySpecialtyOnly, setFilterBySpecialtyOnly] = useState(false);
  const [agreedPrices, setAgreedPrices] = useState({});
  const [unreachableModalLead, setUnreachableModalLead] = useState(null);
  const [unreachableReason, setUnreachableReason] = useState(
    'Client injoignable après plusieurs tentatives'
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const applyMaalemPosition = (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setMaalemPos(coords);
        try {
          localStorage.setItem(
            'bricolemoi_maalem_gps',
            JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              updated_at: Date.now()
            })
          );
        } catch (e) {}
      };

      navigator.geolocation.getCurrentPosition(
        applyMaalemPosition,
        () => {
          navigator.geolocation.getCurrentPosition(
            applyMaalemPosition,
            () => {},
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('ALL');
  const [amountDh, setAmountDh] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('CB / Instant');
  const [referenceRef, setReferenceRef] = useState('');
  const [verifyingCIN, setVerifyingCIN] = useState(false);
  const [completedPage, setCompletedPage] = useState(1);

  useEffect(() => {
    const handleOpenRecharge = () => setRechargeModalOpen(true);
    const handleOpenHistory = () => setHistoryModalOpen(true);

    window.addEventListener('bricolemoi_open_recharge_modal', handleOpenRecharge);
    window.addEventListener('bricolemoi_open_history_modal', handleOpenHistory);

    return () => {
      window.removeEventListener('bricolemoi_open_recharge_modal', handleOpenRecharge);
      window.removeEventListener('bricolemoi_open_history_modal', handleOpenHistory);
    };
  }, []);

  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState(null);
  const [receiptPhotoUrl, setReceiptPhotoUrl] = useState(null);

  const handleReceiptFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadMediaToR2(file, 'receipts');
      if (uploadedUrl) {
        setReceiptPhotoUrl(uploadedUrl);
        return;
      }
    } catch (err) {
      console.warn('[MaalemView] Erreur upload reçu R2, fallback local:', err);
    }
    const reader = new FileReader();
    reader.onload = () => {
      setReceiptPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const audioPlayersRef = useRef({});
  const togglePlayMaalemAudio = (leadId, audioUrl) => {
    if (!audioUrl) return;
    let audio = audioPlayersRef.current[leadId];
    if (!audio) {
      audio = new Audio(audioUrl);
      audio.playbackRate = playbackSpeed;
      audio.onended = () => setPlayingAudioId(null);
      audioPlayersRef.current[leadId] = audio;
    }

    if (playingAudioId === leadId) {
      audio.pause();
      setPlayingAudioId(null);
    } else {
      Object.values(audioPlayersRef.current).forEach((a) => a.pause());
      audio.playbackRate = playbackSpeed;
      audio.play().catch((e) => console.warn('Audio playback error:', e));
      setPlayingAudioId(leadId);
    }
  };

  const cyclePlaybackSpeed = (leadId) => {
    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    setPlaybackSpeed(nextSpeed);
    const audio = audioPlayersRef.current[leadId];
    if (audio) audio.playbackRate = nextSpeed;
  };

  const pendingMyRechargesCount = myTransactions.filter(
    (t) => t.status === 'PENDING' && isRealRechargeTx(t)
  ).length;

  const filteredHistoryTransactions = myTransactions.filter((t) => {
    if (historyFilter === 'RECHARGE') return isRealRechargeTx(t);
    if (historyFilter === 'LEAD') return isLeadTx(t);
    if (historyFilter === 'BONUS') return isBonusTx(t);
    if (historyFilter === 'PENDING') return t.status === 'PENDING';
    return true;
  });

  const handleTriggerGeminiOCR = async () => {
    setVerifyingCIN(true);
    try {
      await verifyMaalemCINWithGemini({
        maalem_id: user?.id,
        cin_photo_url:
          maalemDetails.cin_photo_url ||
          'https://images.unsplash.com/photo-1544717305-2782549b5136',
        full_name: user?.full_name,
        phone: user?.phone
      });
    } finally {
      setVerifyingCIN(false);
    }
  };

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    const isInstant = paymentMethod === 'CB / Instant';
    if (!isInstant && !referenceRef && !receiptPhotoUrl) {
      alert(
        'Veuillez saisir le numéro de référence du reçu ou joindre une photo du ticket Cash Plus / Wafacash.'
      );
      return;
    }
    submitRechargeRequest({
      amount_dh: amountDh,
      payment_method: paymentMethod,
      reference_ref: referenceRef || 'CP-' + Date.now().toString().slice(-6),
      receipt_photo_url: receiptPhotoUrl,
      instant: isInstant
    });
    setRechargeModalOpen(false);
    setReferenceRef('');
    setReceiptPhotoUrl(null);
  };

  const getIntvCoords = (item) => {
    let lat = parseFloat(item?.lat);
    let lng = parseFloat(item?.lng);
    if (!isNaN(lat) && !isNaN(lng) && lng < 0 && lat >= 20 && lat <= 38) {
      return [lat, lng];
    }
    const loc = (item?.district || '').toLowerCase();
    for (const city of MOROCCAN_CITIES) {
      if (loc.includes(city.name.toLowerCase())) {
        for (const dist of city.districts || []) {
          if (loc.includes(dist.name.toLowerCase())) {
            return [dist.lat, dist.lng];
          }
        }
        return [city.lat, city.lng];
      }
    }
    return [33.5883, -7.6328];
  };

  const maalemSpecialty =
    maalemDetails?.specialty || user?.maalem_details?.specialty || 'PLUMBING';

  // 1. Leads Disponibles
  // 1. Leads Disponibles (Chantiers SOS PENDING non encore débloqués)
  const availableLeads = interventions
    .filter((item) => {
      const isPending = item.status === 'PENDING' || item.status === 'SEARCHING' || !item.status;
      if (!isPending) return false;
      if (!filterBySpecialtyOnly || maalemSpecialty === 'BOTH' || maalemSpecialty === 'ALL') return true;
      const itemSpec = String(item.service_type || '').toUpperCase();
      const mySpec = String(maalemSpecialty || '').toUpperCase();
      return (
        !itemSpec ||
        itemSpec === mySpec ||
        mySpec.includes(itemSpec) ||
        itemSpec.includes(mySpec)
      );
    })
    .map((item) => {
      const [lat, lng] = getIntvCoords(item);
      const distance = calculateDistanceInKm(maalemPos[0], maalemPos[1], lat, lng);
      return { ...item, lat, lng, calculatedDistance: distance };
    })
    .sort((a, b) => (a.calculatedDistance || 0) - (b.calculatedDistance || 0));

  // Alerte Sonore & Vibreur Radar lorsque de nouveaux chantiers SOS apparaissent
  const prevLeadsCountRef = useRef(availableLeads.length);
  useEffect(() => {
    if (availableLeads.length > prevLeadsCountRef.current) {
      playSosRadarAlert();
    }
    prevLeadsCountRef.current = availableLeads.length;
  }, [availableLeads.length]);

  // 2. Chantiers Actifs Débloqués (Missions assignées à cet artisan)
  const uPhone9 = String(user?.phone || '').replace(/\D/g, '').slice(-9);
  const uId = String(user?.id || '').trim();

  let myUnlockedLeadsStorage = [];
  try {
    myUnlockedLeadsStorage = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
  } catch (e) {}

  const activeUnlockedLeads = interventions
    .filter((item) => {
      if (item.status === 'COMPLETED' || item.status === 'CANCELLED' || item.status === 'UNFEASIBLE' || item.status === 'PENDING') return false;
      const isOwnerById = uId && String(item.maalem_id || '').trim() === uId;
      const mPhone9 = String(item.maalem_phone || '').replace(/\D/g, '').slice(-9);
      const isOwnerByPhone = uPhone9.length >= 8 && mPhone9.length >= 8 && uPhone9 === mPhone9;
      const isUnlockedLocally = myUnlockedLeadsStorage.includes(String(item.id).trim());
      const isFallbackOwner =
        (!user?.id ||
          user.id === 'maalem-1' ||
          user.id === '22222222-2222-2222-2222-222222222222') &&
        (!item.maalem_id ||
          item.maalem_id === 'maalem-1' ||
          item.maalem_id === '22222222-2222-2222-2222-222222222222');
      return isOwnerById || isOwnerByPhone || isUnlockedLocally || isFallbackOwner;
    })
    .sort(
      (a, b) =>
        new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0)
    );

  // 3. Chantiers Clôturés & Évalués
  const completedLeads = interventions
    .filter((item) => {
      if (item.status !== 'COMPLETED') return false;
      const isOwnerById = uId && String(item.maalem_id || '').trim() === uId;
      const mPhone9 = String(item.maalem_phone || '').replace(/\D/g, '').slice(-9);
      const isOwnerByPhone = uPhone9.length >= 8 && mPhone9.length >= 8 && uPhone9 === mPhone9;
      const isUnlockedLocally = myUnlockedLeadsStorage.includes(String(item.id).trim());
      const isFallbackOwner =
        (!user?.id ||
          user.id === 'maalem-1' ||
          user.id === '22222222-2222-2222-2222-222222222222') &&
        (!item.maalem_id ||
          item.maalem_id === 'maalem-1' ||
          item.maalem_id === '22222222-2222-2222-2222-222222222222');
      return isOwnerById || isOwnerByPhone || isUnlockedLocally || isFallbackOwner;
    })
    .map((item) => {
      const matchReview = (reviews || []).find(
        (r) => String(r.intervention_id).trim() === String(item.id).trim()
      );
      const finalRating =
        matchReview?.rating !== undefined && matchReview?.rating !== null
          ? Number(matchReview.rating)
          : item.rating !== undefined && item.rating !== null
          ? Number(item.rating)
          : null;
      const finalComment = matchReview?.comment || item.comment || null;
      return {
        ...item,
        rating: finalRating,
        comment: finalComment
      };
    })
    .sort(
      (a, b) =>
        new Date(b.completed_at || b.updated_at || b.created_at || 0) -
        new Date(a.completed_at || a.updated_at || a.created_at || 0)
    );

  const COMPLETED_ITEMS_PER_PAGE = 4;
  const totalCompletedPages = Math.max(
    1,
    Math.ceil(completedLeads.length / COMPLETED_ITEMS_PER_PAGE)
  );
  const paginatedCompletedLeads = completedLeads.slice(
    (completedPage - 1) * COMPLETED_ITEMS_PER_PAGE,
    completedPage * COMPLETED_ITEMS_PER_PAGE
  );

  const handleUnlockLead = async (leadId) => {
    const res = await acceptLead(leadId);
    if (res !== false) {
      try {
        const myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]');
        if (!myUnlocked.includes(String(leadId).trim())) {
          myUnlocked.push(String(leadId).trim());
          localStorage.setItem('bricolemoi_my_unlocked_leads', JSON.stringify(myUnlocked));
        }
      } catch (e) {}

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const el =
          document.getElementById('active-unlocked-missions-section') ||
          document.getElementById(`active-lead-${leadId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const maalemName = user?.full_name || currentLiveMaalem?.full_name || 'Artisan Maalem';
  const cleanUserPhone = (user?.phone || currentLiveMaalem?.phone || '0661001122').replace(
    /\D/g,
    ''
  );

  const formattedWhatsAppDarija = `السلام عليكم معلّم ${maalemName} 🛠️🇲🇦
مرحباً بك في منصة BricoleMoi Maroc !
✨ تم تفعيل حسابك المهني بنجاح عبر تأكيد رقم الهاتف (+212 ${cleanUserPhone.slice(-9)}).
🎁 لقد تم تفعيل رصيدك بـ +15.00 درهم كهدية مجانية (أول خدمة مجانية 100%).
🚀 يمكنك الآن استقبال طلبات الطوارئ والبدء في العمل فوراً عبر الرابط التالي :
https://bricolemoi.ma/maalem/access?id=${user?.id || 'maalem-pro'}`;

  const [copiedMsg, setCopiedMsg] = useState(false);
  const handleCopyWhatsAppMsg = () => {
    navigator.clipboard.writeText(formattedWhatsAppDarija);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    const targetPhone = cleanUserPhone.startsWith('212')
      ? cleanUserPhone
      : '212' + (cleanUserPhone.startsWith('0') ? cleanUserPhone.slice(1) : cleanUserPhone);
    window.open(
      `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(
        formattedWhatsAppDarija
      )}`,
      '_blank'
    );
  };

  const handleAddPortfolioPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('La photo ne doit pas dépasser 5 Mo.');
      return;
    }
    let uploadedUrl = null;
    try {
      uploadedUrl = await uploadMediaToR2(file, 'portfolio');
    } catch (err) {
      console.warn('[MaalemView] Erreur upload portfolio R2:', err);
    }

    const finalUrl =
      uploadedUrl ||
      (await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      }));

    const currentList = Array.isArray(user?.maalem_details?.portfolio_urls)
      ? [...user.maalem_details.portfolio_urls]
      : Array.isArray(currentLiveMaalem?.portfolio_urls)
      ? [...currentLiveMaalem.portfolio_urls]
      : [];
    if (currentList.length >= 3) {
      alert('Maximum 3 photos de portfolio.');
      return;
    }
    const updatedList = [...currentList, finalUrl];
    const updatedUser = {
      ...user,
      maalem_details: {
        ...(user?.maalem_details || {}),
        portfolio_urls: updatedList
      }
    };
    setUser(updatedUser);

    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase
          .from('maalem_details')
          .update({ portfolio_urls: updatedList })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Update portfolio error:', err);
      }
    }
  };

  const handleRemovePortfolioPhoto = async (idxToRemove) => {
    const currentList = Array.isArray(user?.maalem_details?.portfolio_urls)
      ? [...user.maalem_details.portfolio_urls]
      : Array.isArray(currentLiveMaalem?.portfolio_urls)
      ? [...currentLiveMaalem.portfolio_urls]
      : [];
    const updatedList = currentList.filter((_, i) => i !== idxToRemove);
    const updatedUser = {
      ...user,
      maalem_details: {
        ...(user?.maalem_details || {}),
        portfolio_urls: updatedList
      }
    };
    setUser(updatedUser);

    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase
          .from('maalem_details')
          .update({ portfolio_urls: updatedList })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Update portfolio error:', err);
      }
    }
  };

  return {
    t,
    user,
    setUser,
    currentLiveMaalem,
    maalemDetails,
    isCinVerified,
    maalemPos,
    setMaalemPos,
    focusedMapCoords,
    setFocusedMapCoords,
    filterBySpecialtyOnly,
    setFilterBySpecialtyOnly,
    agreedPrices,
    setAgreedPrices,
    unreachableModalLead,
    setUnreachableModalLead,
    unreachableReason,
    setUnreachableReason,
    rechargeModalOpen,
    setRechargeModalOpen,
    historyModalOpen,
    setHistoryModalOpen,
    historyFilter,
    setHistoryFilter,
    amountDh,
    setAmountDh,
    paymentMethod,
    setPaymentMethod,
    referenceRef,
    setReferenceRef,
    verifyingCIN,
    setVerifyingCIN,
    completedPage,
    setCompletedPage,
    playingAudioId,
    playbackSpeed,
    previewPhotoUrl,
    setPreviewPhotoUrl,
    receiptPhotoUrl,
    setReceiptPhotoUrl,
    handleReceiptFileChange,
    togglePlayMaalemAudio,
    cyclePlaybackSpeed,
    pendingMyRechargesCount,
    filteredHistoryTransactions,
    handleTriggerGeminiOCR,
    handleRechargeSubmit,
    availableLeads,
    activeUnlockedLeads,
    completedLeads,
    totalCompletedPages,
    paginatedCompletedLeads,
    handleUnlockLead,
    whatsappMsg,
    setWhatsappMsg,
    formattedWhatsAppDarija,
    copiedMsg,
    handleCopyWhatsAppMsg,
    handleOpenWhatsApp,
    handleAddPortfolioPhoto,
    handleRemovePortfolioPhoto,
    isMaalemOnline,
    toggleMaalemOnlineStatus,
    ratingInfo,
    liveTotalBalance,
    liveAvailableBalance,
    liveCreditBalance,
    totalRechargedSum,
    totalLeadsSpent,
    totalBonusSum,
    myTransactions,
    flowFinishMission,
    updateInterventionProgress,
    reportUnreachableClient,
    declareMissionUnfeasible,
    abandonActiveMission,
    requestWorkCompletion,
    requestOnSiteReview,
    generateReceiptPDF,
    onOpenCINVerification
  };
};
