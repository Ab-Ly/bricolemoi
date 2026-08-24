import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useEmergencyFlow } from '../context/EmergencyFlowContext';
import { EMERGENCY_STATES } from '../constants/emergencyStates';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { uploadMediaToR2 } from '../lib/r2StorageService';
import { InteractiveMap } from './InteractiveMap';
import { 
  Wrench, 
  Wallet, 
  Star, 
  Award, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  PlusCircle, 
  CheckCircle2, 
  TrendingUp,
  X,
  Volume2,
  ExternalLink,
  Compass,
  Sparkles,
  MessageSquareShare,
  Droplet,
  Zap,
  Car,
  CreditCard,
  Clock,
  Gift,
  Eye,
  Play,
  Pause,
  Camera,
  AlertTriangle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { EnhancedCategoryIcon, getSpecialtyLabel, getSpecialtyMeta } from './EnhancedCategoryIcon';
import { CustomDropdown } from './CustomDropdown';
import { 
  WhatsappLogo, 
  Coins, 
  Bank, 
  CreditCard as PhosphorCreditCard, 
  EnvelopeSimple, 
  Broadcast, 
  Power, 
  Radio, 
  MoonStars, 
  Target, 
  GlobeHemisphereWest,
  Receipt,
  ClockCounterClockwise,
  ArrowUpRight,
  ArrowDownLeft,
  Printer,
  MinusCircle,
  Wrench as PhosphorWrench
} from '@phosphor-icons/react';
import { PushNotificationBanner } from './maalem/PushNotificationBanner';
import { MOROCCAN_CITIES } from '../constants/geo';
import { calculateMaalemBalance, isBonusTx, isLeadTx, isRealRechargeTx } from '../utils/balanceUtils';
import { calculateMaalemRating } from '../utils/ratingUtils';

export const MaalemView = ({ onOpenCINVerification }) => {
  const { t, user, setUser } = useAuth();
  const { 
    interventions, 
    maalems,
    transactions,
    reviews = [],
    generateReceiptPDF,
    acceptLead, 
    requestWorkCompletion,
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
  const totalReservedEscrow = balanceInfo.totalReservedEscrow;
  const totalLeadsSpent = totalValidatedLeadsSpent + totalReservedEscrow;
  const totalBonusSum = balanceInfo.totalBonusSum;
  const liveTotalBalance = balanceInfo.liveTotalBalance;
  const liveAvailableBalance = balanceInfo.liveAvailableBalance;
  const liveCreditBalance = liveAvailableBalance; // Rétrocompatibilité

  const maalemDetails = user?.maalem_details || {
    specialty: currentLiveMaalem?.specialty || 'PLUMBING',
    credit_balance: liveAvailableBalance,
    total_balance: liveTotalBalance,
    reserved_escrow: totalReservedEscrow,
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
      const saved = JSON.parse(localStorage.getItem('bricolemoi_maalem_gps') || localStorage.getItem('bricolemoi_client_gps') || 'null');
      if (saved?.lat && saved?.lng) return [saved.lat, saved.lng];
    } catch (e) {}
    const zone = (user?.city_zone || '').toLowerCase();
    if (zone.includes('fès') || zone.includes('fes')) return [34.0331, -5.0003];
    if (zone.includes('rabat')) return [34.0209, -6.8416];
    if (zone.includes('marrakech')) return [31.6295, -7.9811];
    if (zone.includes('tanger')) return [35.7595, -5.8340];
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
  const [unreachableReason, setUnreachableReason] = useState('Client injoignable après plusieurs tentatives');

  // HTML5 Geolocation: Détection GPS immédiate et persistance pour le Maâlem
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const applyMaalemPosition = (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setMaalemPos(coords);
        try {
          localStorage.setItem('bricolemoi_maalem_gps', JSON.stringify({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            updated_at: Date.now()
          }));
        } catch (e) {}
      };

      navigator.geolocation.getCurrentPosition(
        applyMaalemPosition,
        (highAccErr) => {
          console.warn('Maalem GPS high-accuracy fallback, trying fast network geolocation:', highAccErr);
          navigator.geolocation.getCurrentPosition(
            applyMaalemPosition,
            (finalErr) => console.warn('Final Maalem Geolocation fallback:', finalErr),
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('ALL'); // 'ALL' | 'RECHARGE' | 'LEAD' | 'BONUS' | 'PENDING'
  const [amountDh, setAmountDh] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('CB / Instant');
  const [referenceRef, setReferenceRef] = useState('');
  const [verifyingCIN, setVerifyingCIN] = useState(false);
  const [completedPage, setCompletedPage] = useState(1);

  // Écouteurs d'événements globaux pour l'ouverture depuis la barre de navigation mobile
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

  // Audio Player, Photo HD Zoom & Justificatif Reçu states pour le Maâlem
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
        cin_photo_url: maalemDetails.cin_photo_url || 'https://images.unsplash.com/photo-1544717305-2782549b5136',
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
      alert('Veuillez saisir le numéro de référence du reçu ou joindre une photo du ticket Cash Plus / Wafacash.');
      return;
    }
    submitRechargeRequest({
      amount_dh: amountDh,
      payment_method: paymentMethod,
      reference_ref: referenceRef || ('CP-' + Date.now().toString().slice(-6)),
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
        for (const dist of (city.districts || [])) {
          if (loc.includes(dist.name.toLowerCase())) {
            return [dist.lat, dist.lng];
          }
        }
        return [city.lat, city.lng];
      }
    }
    return [33.5883, -7.6328];
  };

  const maalemSpecialty = maalemDetails?.specialty || user?.maalem_details?.specialty || 'PLUMBING';

  // 1. Leads Disponibles (Radar Public des SOS en attente de prise en charge)
  const availableLeads = interventions
    .filter((item) => {
      let myUnlocked = [];
      try { myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]'); } catch (e) {}
      if (myUnlocked.includes(String(item.id).trim())) return false; // Déjà débloqué sur cet appareil => ne plus afficher ici
      if (item.status !== 'PENDING') return false; // Disparaît immédiatement dès déblocage
      if (!filterBySpecialtyOnly || maalemSpecialty === 'BOTH' || maalemSpecialty === 'ALL') return true;
      return String(item.service_type || '').toUpperCase() === String(maalemSpecialty || '').toUpperCase();
    })
    .map((item) => {
      const [lat, lng] = getIntvCoords(item);
      const distance = calculateDistanceInKm(maalemPos[0], maalemPos[1], lat, lng);
      return { ...item, lat, lng, calculatedDistance: distance };
    })
    .sort((a, b) => (a.calculatedDistance || 0) - (b.calculatedDistance || 0));

  // 2. Chantiers Actifs Débloqués (Missions en cours: En route, Sur place, Attente validation - Trié du plus récent au plus ancien)
  const activeUnlockedLeads = interventions
    .filter((item) => {
      if (item.status !== 'ACCEPTED' && item.status !== 'PENDING_COMPLETION') return false;
      let myUnlocked = [];
      try { myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]'); } catch (e) {}
      const isLocalUnlocked = myUnlocked.includes(String(item.id).trim());
      const isOwner = user?.id && String(item.maalem_id || '').trim() === String(user.id).trim();
      const isFallbackOwner = (!user?.id || user.id === 'maalem-1' || user.id === '22222222-2222-2222-2222-222222222222') && (!item.maalem_id || item.maalem_id === 'maalem-1' || item.maalem_id === '22222222-2222-2222-2222-222222222222');
      return isOwner || isFallbackOwner || isLocalUnlocked;
    })
    .sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));

  // 3. Chantiers Clôturés & Évalués (Historique de l'artisan avec Pagination)
  const completedLeads = interventions
    .filter((item) => {
      if (item.status !== 'COMPLETED') return false;
      let myUnlocked = [];
      try { myUnlocked = JSON.parse(localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]'); } catch (e) {}
      const isLocalUnlocked = myUnlocked.includes(String(item.id).trim());
      const isOwner = user?.id && String(item.maalem_id || '').trim() === String(user.id).trim();
      const isFallbackOwner = (!user?.id || user.id === 'maalem-1' || user.id === '22222222-2222-2222-2222-222222222222') && (!item.maalem_id || item.maalem_id === 'maalem-1' || item.maalem_id === '22222222-2222-2222-2222-222222222222');
      return isOwner || isFallbackOwner || isLocalUnlocked;
    })
    .sort((a, b) => new Date(b.completed_at || b.updated_at || b.created_at || 0) - new Date(a.completed_at || a.updated_at || a.created_at || 0));

  const COMPLETED_ITEMS_PER_PAGE = 4;
  const totalCompletedPages = Math.max(1, Math.ceil(completedLeads.length / COMPLETED_ITEMS_PER_PAGE));
  const paginatedCompletedLeads = completedLeads.slice(
    (completedPage - 1) * COMPLETED_ITEMS_PER_PAGE,
    completedPage * COMPLETED_ITEMS_PER_PAGE
  );

  const handleUnlockLead = async (leadId) => {
    const res = await acceptLead(leadId);
    if (res !== false) {
      setTimeout(() => {
        const el = document.getElementById('active-unlocked-missions-section') || document.getElementById(`active-lead-${leadId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    }
  };

  const maalemName = user?.full_name || currentLiveMaalem?.full_name || 'Artisan Maalem';
  const cleanUserPhone = (user?.phone || currentLiveMaalem?.phone || '0661001122').replace(/\D/g, '');

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
    const targetPhone = cleanUserPhone.startsWith('212') ? cleanUserPhone : '212' + (cleanUserPhone.startsWith('0') ? cleanUserPhone.slice(1) : cleanUserPhone);
    window.open(`https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(formattedWhatsAppDarija)}`, '_blank');
  };

  // Gestion interactive du Portfolio Artisan
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

    const finalUrl = uploadedUrl || await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

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
        await supabase.from('maalem_details').update({ portfolio_urls: updatedList }).eq('id', user.id);
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
        await supabase.from('maalem_details').update({ portfolio_urls: updatedList }).eq('id', user.id);
      } catch (err) {
        console.warn('Update portfolio error:', err);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24 md:pb-12 font-sans">
      {/* WhatsApp Welcome Message Banner (Polished RTL Darija with Actions) */}
      {whatsappMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 text-emerald-950 p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-4 relative overflow-hidden"
        >
          <button
            onClick={() => setWhatsappMsg(null)}
            className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-900 p-1.5 rounded-xl hover:bg-emerald-100/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                <WhatsappLogo weight="duotone" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base tracking-tight text-slate-900 flex items-center gap-2">
                  <span>Message WhatsApp Automatique (Darija 🇲🇦)</span>
                </h4>
                <p className="text-xs text-slate-600">Notification instantanée envoyée au Maâlem</p>
              </div>
            </div>
          </div>

          <div 
            dir="rtl"
            className="bg-white border border-emerald-200/90 p-5 rounded-2xl font-sans text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-inner select-all"
          >
            {formattedWhatsAppDarija}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenWhatsApp}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" />
              <span>Ouvrir dans WhatsApp</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyWhatsAppMsg}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{copiedMsg ? '✔ Message Copié !' : 'Copier le Message'}</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Bannière de Permission Web Push Notification pour Réveil d'Urgence */}
      <PushNotificationBanner user={user} />

      {/* 1. Tableau de Bord : Header Solde, Statut EN LIGNE, Note Globale (Modern Clean & Trust) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-slate-900"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Profile & Status */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-black p-3 shadow-xs flex-shrink-0">
              <EnhancedCategoryIcon type={maalemDetails.specialty || user?.maalem_details?.specialty} className="w-10 h-10" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-black text-slate-900 font-sans tracking-tight">{user?.full_name || 'Maalem Hassan'}</h2>
                
                {/* Statut EN LIGNE Toggle Tactile */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleMaalemOnlineStatus()}
                  className={`group relative pl-2.5 pr-3.5 py-1.5 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 shadow-xs active:scale-95 cursor-pointer ${
                    isMaalemOnline
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100/70'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/70'
                  }`}
                  title="Cliquer pour basculer votre disponibilité (En Ligne / Hors Ligne)"
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isMaalemOnline 
                      ? 'bg-emerald-100 text-emerald-600 border border-emerald-300' 
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}>
                    {isMaalemOnline ? (
                      <Broadcast weight="duotone" className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Power weight="bold" className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex flex-col items-start leading-none text-left">
                    <span className={`text-xs font-black tracking-tight ${
                      isMaalemOnline ? 'text-emerald-800' : 'text-slate-700'
                    }`}>
                      {isMaalemOnline ? 'EN LIGNE' : 'HORS LIGNE'}
                    </span>
                    <span className={`text-[9px] font-mono font-semibold mt-0.5 ${
                      isMaalemOnline ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      {isMaalemOnline ? 'Radar SOS Actif' : 'Alertes en Pause'}
                    </span>
                  </div>

                  <div className={`ml-1 w-2 h-2 rounded-full ${
                    isMaalemOnline 
                      ? 'bg-emerald-500 animate-ping' 
                      : 'bg-slate-400'
                  }`} />
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs font-medium">
                <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold flex items-center gap-1.5 shadow-xs">
                  <PhosphorWrench weight="duotone" className="w-3.5 h-3.5 text-blue-600" />
                  <span>{getSpecialtyLabel(maalemDetails.specialty || user?.maalem_details?.specialty)}</span>
                </span>
                
                <span className="flex items-center text-amber-800 font-mono font-black bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                  <span>{ratingInfo.averageRating.toFixed(1)} / 5.0</span>
                  {ratingInfo.totalReviews > 0 && (
                    <span className="ml-1 text-[10px] text-amber-600 font-bold">({ratingInfo.totalReviews} avis)</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Credit Balance Card */}
          <div className="bg-slate-50 border border-slate-200/90 p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 sm:min-w-[340px]">
            {/* Header: Title + Active Badge */}
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-600 shadow-xs flex-shrink-0">
                  <Coins weight="duotone" className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 tracking-wide flex items-center gap-1.5">
                    <span>Portefeuille Artisan</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">رصيد الحساب المتاح</p>
                </div>
              </div>

              {liveCreditBalance >= 15 ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold font-mono flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Opérationnel</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold font-mono flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Recharge Requise</span>
                </span>
              )}
            </div>

            {/* Main Balance Display */}
            <div className="relative z-10 my-0.5 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {liveAvailableBalance.toFixed(2)}
                </span>
                <span className="text-sm font-black font-mono text-emerald-600">
                  DH Dispo
                </span>
              </div>

              {totalReservedEscrow > 0 ? (
                <div className="flex items-center gap-1.5 text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-xl font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span><strong>{totalReservedEscrow.toFixed(2)} DH</strong> en garantie (Total : {liveTotalBalance.toFixed(2)} DH)</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Total compte : <strong className="text-slate-800 font-mono font-bold">{liveTotalBalance.toFixed(2)} DH</strong> • Zéro risque (Escrow)</span>
                </p>
              )}
            </div>

            {/* Action Buttons: Historique + Recharger */}
            <div className="grid grid-cols-2 gap-2 relative z-10 pt-2 border-t border-slate-200">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setHistoryModalOpen(true)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                title="Consulter l'historique complet de mes transactions et recharges"
              >
                <ClockCounterClockwise className="w-4 h-4 text-slate-600" />
                <span>Historique</span>
                {pendingMyRechargesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-black text-[9px]">
                    {pendingMyRechargesCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setRechargeModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs py-2.5 px-3 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle weight="bold" className="w-4 h-4 text-white" />
                <span>Recharger</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Badge de Confiance & Réputation Numéro Vérifié */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-xs font-black text-slate-900 font-sans tracking-wide uppercase">
                  Profil Artisan Opérationnel &amp; Certifié
                </h4>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Numéro Vérifié (SMS)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Authentifié par OTP. Vous recevez directement les demandes SOS de votre zone d'intervention.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+212 {cleanUserPhone.slice(-9)}</span>
            </span>
          </div>
        </motion.div>

        {/* Section Interactive : Portfolio de Réalisations Chantiers */}
        <div className="mt-5 p-5 bg-slate-50/90 border border-slate-200/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-200 text-amber-700 flex items-center justify-center shadow-xs flex-shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">
                    Portfolio &amp; Chantiers Réalisés
                  </h4>
                  <span className="text-[11px] font-mono text-amber-800 font-bold bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {(user?.maalem_details?.portfolio_urls || currentLiveMaalem?.portfolio_urls || []).length} / 3 photos
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vos photos sont mises en avant auprès des clients pour maximiser vos prises de contact.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-xs flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>+3x plus d'appels clients</span>
            </div>
          </div>

          {/* Grid des 3 Chantiers Structurés (Slot 1, Slot 2, Slot 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[0, 1, 2].map((slotIndex) => {
              const portfolioList = user?.maalem_details?.portfolio_urls || currentLiveMaalem?.portfolio_urls || [];
              const url = portfolioList[slotIndex];
              const slotLabels = [
                { title: 'Chantier Principal', desc: 'Rénovation ou gros dépannage' },
                { title: 'Chantier Récent', desc: 'Installation ou pose propre' },
                { title: 'Savoir-Faire', desc: 'Finitions & travail soigné' }
              ];
              const meta = slotLabels[slotIndex];

              if (url) {
                return (
                  <div
                    key={slotIndex}
                    className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[4/3] flex items-center justify-center shadow-xs hover:shadow-md transition-all"
                  >
                    <img
                      src={url}
                      alt={`Chantier ${slotIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => setPreviewPhotoUrl(url)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                    {/* Actions Top Right */}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setPreviewPhotoUrl(url)}
                        className="p-1.5 bg-white/95 hover:bg-white text-slate-700 hover:text-blue-600 rounded-xl shadow-xs transition-colors cursor-pointer"
                        title="Agrandir en HD"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemovePortfolioPhoto(slotIndex)}
                        className="p-1.5 bg-white/95 hover:bg-white text-red-600 hover:bg-red-50 rounded-xl shadow-xs transition-colors cursor-pointer"
                        title="Supprimer cette photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Badge Bottom Left */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-sm text-[10px] font-bold text-slate-900 border border-slate-200 shadow-xs">
                        📸 Chantier #{slotIndex + 1}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <label
                  key={slotIndex}
                  className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all p-4 text-center group shadow-xs hover:shadow-sm"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddPortfolioPhoto}
                    className="hidden"
                  />
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Camera className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors block">
                      + {meta.title}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block font-medium">
                      {meta.desc}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full mt-0.5">
                    JPG, PNG • Max 5 Mo
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Gamification Progress Gauges */}
        <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-black text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Jauge 1 : Avis 5 Étoiles Consécutifs</span>
              </span>
              <span className="font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 font-mono text-xs">
                {maalemDetails.consecutive_five_stars || 0} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${((maalemDetails.consecutive_five_stars || 0) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-600 mt-2 font-medium flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>5 avis 5★ consécutifs = <strong className="text-amber-700 font-bold">+15.00 DH GRATUITS (1er Lead Offert)</strong> !</span>
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-black text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Jauge 2 : Recharges de 100 DH</span>
              </span>
              <span className="font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 font-mono text-xs">
                {maalemDetails.hundred_dh_recharges_count || 0} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${((maalemDetails.hundred_dh_recharges_count || 0) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-600 mt-2 font-medium flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>À la 5ème recharge de 100 DH = <strong className="text-blue-700 font-bold">+15.00 DH GRATUITS (1er Lead Offert)</strong> !</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* 1.1 SECTION LEADS DÉBLOQUÉS ACTIFS (EN TÊTE DE DASHBOARD - ACTION PRIORITAIRE) */}
      {activeUnlockedLeads.length > 0 && (
        <div id="active-unlocked-missions-section" className="space-y-4 scroll-mt-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border-2 border-emerald-500/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0 animate-pulse">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-sans flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 inline-block" />
                  Missions Actives en Cours ({activeUnlockedLeads.length})
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider uppercase border border-emerald-300">
                    Action Immédiate ⚡
                  </span>
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Prenez contact avec le client sans attendre (WhatsApp ou Appel) et démarrez l'itinéraire GPS.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeUnlockedLeads.map((lead) => {
              const rawPhone = lead.client_phone || lead.phone || '+212661001122';
              const cleanDigits = String(rawPhone).replace(/\D/g, '');
              const formattedWaDigits = cleanDigits.startsWith('212')
                ? cleanDigits
                : cleanDigits.startsWith('0')
                ? '212' + cleanDigits.substring(1)
                : '212' + cleanDigits;

              const waLink = `https://wa.me/${formattedWaDigits}?text=${encodeURIComponent(`السلام عليكم ${lead.client_name || ''}، أنا المعلم الخاص بك من منصة BricoleMoi بخصوص طلبك (${lead.subcategory || 'Dépannage'}). أنا في الطريق إليك.`)}`;
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lead.lat || 33.5883},${lead.lng || -7.6328}`;
              const currentAgreedPrice = agreedPrices[lead.id] ?? lead.final_agreed_price ?? lead.estimated_price_min ?? 150;

              return (
                <div 
                  key={lead.id}
                  id={`active-lead-${lead.id}`}
                  className="bg-white border-2 border-emerald-500/90 rounded-3xl p-5 shadow-md space-y-4 text-slate-900 transition-all hover:shadow-lg"
                >
                  {/* Header: Badge & Métier */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs flex items-center gap-1.5 ${
                      lead.status === 'COMPLETED'
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        : lead.status === 'PENDING_COMPLETION'
                        ? 'text-purple-800 bg-purple-50 border-purple-200 animate-pulse'
                        : 'text-blue-800 bg-blue-50 border-blue-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${lead.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500 animate-ping'}`} />
                      <span>
                        {lead.status === 'COMPLETED' 
                          ? '🏆 CHANTIER CLÔTURÉ' 
                          : lead.status === 'PENDING_COMPLETION'
                          ? '⏳ EN ATTENTE VALIDATION CLIENT'
                          : '🟢 LEAD ACTIF DÉBLOQUÉ'}
                      </span>
                    </span>
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 font-sans">
                      {lead.subcategory || 'Dépannage'}
                    </span>
                  </div>

                  {/* Coordonnées & Précision d'Accès */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900">{lead.client_name || 'Client BricoleMoi'}</h4>
                    <p className="text-xs text-slate-600 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{lead.district || 'Casablanca'}</span>
                    </p>
                    {lead.access_details && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 mt-1 font-medium">
                        📍 <strong>Accès :</strong> {lead.access_details}
                      </p>
                    )}
                  </div>

                  {/* Galerie Photos HD du Lead Débloqué */}
                  {(lead.photos_list || lead.description_photo) && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-500">Photos de la Panne (Cliquer pour agrandir HD) :</p>
                      <div className="flex flex-wrap gap-2">
                        {(lead.photos_list || [lead.description_photo]).map((pic, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => setPreviewPhotoUrl(pic)}
                            className="relative group cursor-pointer"
                          >
                            <img
                              src={pic}
                              alt={`Panne ${pIdx + 1}`}
                              className="w-16 h-16 rounded-xl object-cover border border-slate-200 group-hover:border-amber-400 transition-all shadow-xs"
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                              <Eye className="w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lecteur Audio Intégré pour le Maâlem */}
                  {lead.audio_note_url && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => togglePlayMaalemAudio(lead.id, lead.audio_note_url)}
                          className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 cursor-pointer"
                          title="Écouter l'explication du client"
                        >
                          {playingAudioId === lead.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </motion.button>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">
                            {playingAudioId === lead.id ? 'Écoute en cours...' : 'Note Vocale du Client'}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">Explication détaillée de la panne</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => cyclePlaybackSpeed(lead.id)}
                        className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 hover:bg-slate-50"
                        title="Vitesse de lecture"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>
                  )}

                  {/* Barre d'Action Mobile Tactile : 3 Boutons Équilibrés (Appel, WhatsApp, GPS) */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold">Client Joignable :</span>
                      <span className="text-xs font-mono font-black text-slate-900 dir-ltr">+{formattedWaDigits}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={`tel:+${formattedWaDigits}`}
                        className="py-2.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-1.5 text-xs font-bold shadow-xs"
                        title="Appeler le client directement par téléphone GSM"
                      >
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                        <span>Appeler</span>
                      </a>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
                        title="Ouvrir la discussion WhatsApp avec message pré-rempli"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-all"
                        title="Lancer l'itinéraire GPS sur Google Maps"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>GPS Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Stepper d'avancement d'intervention */}
                  {lead.status !== 'COMPLETED' && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <p className="text-[11px] font-bold text-slate-500">Statut du déplacement :</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateInterventionProgress(lead.id, 'ON_THE_WAY');
                            flowSetProgressStep('ON_THE_WAY');
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                            lead.progress_step === 'ON_THE_WAY'
                              ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                          }`}
                        >
                          <span>🚗 En route</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            updateInterventionProgress(lead.id, 'ARRIVED');
                            flowSetProgressStep('ARRIVED');
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                            lead.progress_step === 'ARRIVED'
                              ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-black'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                          }`}
                        >
                          <span>📍 Sur place</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action d'Accomplissement des Travaux & Saisie du Montant Réel */}
                  <div className="pt-2 border-t border-slate-200 space-y-3">
                    {lead.status === 'PENDING_COMPLETION' ? (
                      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-between shadow-xs">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600 animate-spin flex-shrink-0" />
                          <span>Demande de fin de chantier transmise ({lead.final_agreed_price || currentAgreedPrice} DH)</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">En attente client</span>
                      </div>
                    ) : lead.status === 'COMPLETED' ? (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-2 shadow-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5 text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Intervention Clôturée &amp; Validée ({lead.final_agreed_price} DH)</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full font-black font-mono flex items-center gap-1 text-xs text-amber-800 bg-amber-50 border border-amber-200 shadow-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{lead.rating ? `${lead.rating} / 5` : '5 / 5'}</span>
                          </span>
                        </div>
                        {lead.comment && (
                          <p className="text-slate-700 font-semibold italic text-[11px] bg-white p-2 rounded-lg border border-emerald-100">
                            Avis Client : "{lead.comment}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Coins className="w-4 h-4 text-amber-600" />
                            <span>Prix Final Convenu des Travaux :</span>
                          </label>

                          {/* Champ Saisie Manuelle Numérique Pure */}
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              max="50000"
                              placeholder="Ex: 250"
                              value={currentAgreedPrice || ''}
                              onChange={(e) => {
                                const val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0);
                                setAgreedPrices((prev) => ({ ...prev, [lead.id]: val }));
                              }}
                              className="w-full py-2.5 px-4 pr-14 bg-white border border-slate-300 rounded-xl text-lg font-mono font-black text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-xs placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono font-black text-slate-500 pointer-events-none">
                              DH
                            </span>
                          </div>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            const finalP = Number(currentAgreedPrice) || 150;
                            requestWorkCompletion(lead.id, finalP);
                            flowFinishMission(finalP);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Déclarer les travaux terminés &amp; Valider ({currentAgreedPrice || 150} DH)</span>
                        </motion.button>
                      </div>
                    )}

                    {/* Bouton Abandon / Mission Non Réalisable — Escrow libéré à 0 DH */}
                    {lead.status !== 'COMPLETED' && (
                      <div className="pt-2 border-t border-slate-200 mt-2">
                        <button
                          type="button"
                          onClick={() => setUnreachableModalLead(lead)}
                          className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>❌ Mission Non Réalisable / Abandonner (Restitution 15 DH)</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Interactive Radar Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 font-sans">
            <Compass className="w-5 h-5 text-blue-600 animate-spin-slow" />
            Carte Radar d'Urgence (Position GPS Réelle)
          </h3>
          <span className="text-xs text-slate-700 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Pos: {maalemPos[0].toFixed(4)}, {maalemPos[1].toFixed(4)}</span>
          </span>
        </div>

        {!isMaalemOnline && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900 text-xs shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
              <div>
                <p className="font-extrabold text-amber-900 text-sm">Mode Hors Ligne Activé</p>
                <p className="text-[11px] text-amber-700">Votre profil est temporairement masqué des clients et vos alertes SOS sont en pause.</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleMaalemOnlineStatus(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
            >
              Passer en Ligne 🟢
            </motion.button>
          </motion.div>
        )}

        <div id="maalem-radar-map" className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <InteractiveMap 
            mode="MAALEM_RADAR" 
            selectedLat={focusedMapCoords ? focusedMapCoords[0] : maalemPos[0]} 
            selectedLng={focusedMapCoords ? focusedMapCoords[1] : maalemPos[1]} 
          />
        </div>
      </div>

      {/* 3. Demandes d'Urgence SOS Disponibles (Directement sous la carte radar) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 shadow-xs flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-sans tracking-tight flex items-center gap-2">
                Demandes d'Urgence SOS en Direct
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-mono font-bold">
                  {availableLeads.length} actives
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Flux instantané Ably Realtime (&lt; 50ms) • Coût déblocage : 15 DH
              </p>
            </div>
          </div>

          <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Target weight="duotone" className={`w-4 h-4 ${filterBySpecialtyOnly ? 'text-white' : 'text-amber-600'}`} />
              <span>Ma Spécialité</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                !filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <GlobeHemisphereWest weight="duotone" className={`w-4 h-4 ${!filterBySpecialtyOnly ? 'text-white' : 'text-blue-600'}`} />
              <span>Toutes les Demandes</span>
            </button>
          </div>
        </div>

        {availableLeads.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-sm shadow-xs space-y-2">
            <p className="text-base font-bold text-slate-800">Aucune nouvelle demande d'urgence en attente.</p>
            <p className="text-xs text-slate-500">Les nouvelles demandes créées par les clients apparaîtront ici instantanément en temps réel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableLeads.map((item) => {
              const lat = item.lat;
              const lng = item.lng;
              const distanceKm = item.calculatedDistance ?? calculateDistanceInKm(maalemPos[0], maalemPos[1], lat, lng);
              const defaultPhotosByService = {
                ELECTRICIAN: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
                PLUMBING: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
                AUTO_MECHANIC: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
                CLIMATISATION: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80'
              };
              const displayPhoto = item.description_photo || defaultPhotosByService[item.service_type] || defaultPhotosByService.PLUMBING;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-amber-300 flex flex-col justify-between transition-all space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 ${getSpecialtyMeta(item.service_type).bgClass}`}>
                        <EnhancedCategoryIcon type={item.service_type} className="w-4 h-4 inline-block" />
                        <span>{getSpecialtyMeta(item.service_type).label}</span>
                      </span>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setFocusedMapCoords([lat, lng]);
                          document.getElementById('maalem-radar-map')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs text-blue-700 hover:text-blue-900 font-black bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1 font-mono cursor-pointer transition-all active:scale-95 shadow-xs"
                        title="Cliquer pour centrer la carte sur cette demande SOS"
                      >
                        <span>📍 {distanceKm} km</span>
                        <span className="text-[10px] text-blue-600 font-bold bg-white px-1.5 py-0.5 rounded ml-1 border border-blue-200">🎯 Carte</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-3.5 items-start">
                        {displayPhoto && (
                          <div 
                            onClick={() => setPreviewPhotoUrl(displayPhoto)}
                            className="relative group cursor-pointer flex-shrink-0"
                          >
                            <img
                              src={displayPhoto}
                              alt="Urgence photo"
                              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:border-amber-400 group-hover:scale-105 transition-all"
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                              <Eye className="w-5 h-5" />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span className="truncate">{item.district || 'Casablanca'}</span>
                          </p>
                          <p className="text-xs text-amber-700 font-bold mt-0.5">
                            {item.subcategory || 'Dépannage d\'urgence'}
                          </p>
                          {item.access_details && (
                            <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-2">
                              ✍️ "{item.access_details}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Lecteur Audio Interactif pour l'Artisan (Avant Déblocage) */}
                      {item.audio_note_url && (
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => togglePlayMaalemAudio(item.id, item.audio_note_url)}
                              className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0 cursor-pointer"
                              title="Écouter la voix du client"
                            >
                              {playingAudioId === item.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </motion.button>
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                {playingAudioId === item.id ? 'Lecture en cours...' : 'Note Vocale Client (Darija / FR)'}
                              </p>
                              <p className="text-[10px] text-slate-500">Écoutez les explications avant d'accepter</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => cyclePlaybackSpeed(item.id)}
                            className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 hover:bg-slate-50"
                            title="Vitesse de lecture"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500">
                      Coût : <span className="text-slate-900 font-mono font-black">15.00 DH</span>
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleUnlockLead(item.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 active:scale-90 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Débloquer le Lead (-15 DH) 🔓</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Historique des Chantiers Clôturés & Avis (avec Pagination) */}
      {completedLeads.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-sans">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Chantiers Clôturés &amp; Avis Clients
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono border border-slate-200">
                {completedLeads.length} au total
              </span>
            </h3>
            {totalCompletedPages > 1 && (
              <p className="text-xs text-slate-500 font-medium">
                Page {completedPage} sur {totalCompletedPages}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paginatedCompletedLeads.map((lead) => (
              <div key={lead.id} className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl space-y-2 text-xs shadow-xs hover:shadow-sm transition-all">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-emerald-950 font-black">{lead.client_name || 'Client BricoleMoi'} • {lead.subcategory || 'Dépannage'}</span>
                  <span className="px-2.5 py-0.5 rounded-full font-mono font-black text-amber-900 bg-amber-100/90 flex items-center gap-1 border border-amber-200 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{lead.rating ? `${lead.rating} / 5` : '5 / 5'}</span>
                  </span>
                </div>
                <p className="text-slate-600 font-mono text-[11px]">
                  📍 {lead.district || 'Casablanca'} • Rémunération : <strong className="text-slate-900 font-black">{lead.final_agreed_price || 150} DH</strong>
                </p>
                {lead.comment && (
                  <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-emerald-100 font-medium shadow-xs">
                    "{lead.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalCompletedPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCompletedPage((p) => Math.max(1, p - 1))}
                disabled={completedPage === 1}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  completedPage === 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalCompletedPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCompletedPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                      completedPage === pageNum
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCompletedPage((p) => Math.min(totalCompletedPages, p + 1))}
                disabled={completedPage === totalCompletedPages}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  completedPage === totalCompletedPages
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

      {/* Recharge Modal */}
      <AnimatePresence>
        {rechargeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-900 max-h-[85vh] overflow-y-auto modal-scroll"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setRechargeModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Wallet className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-sans">Module de Recharge Solde</h3>
                <p className="text-xs text-slate-500 mt-1">Choisissez votre pack et créditez votre compte Supabase</p>
              </div>

              {/* Boutons Rapides 50 DH, 100 DH, 200 DH, 500 DH */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Packs de Recharge Solde</label>
                <div className="grid grid-cols-4 gap-2">
                  {['50', '100', '200', '500'].map((val) => (
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      key={val}
                      type="button"
                      onClick={() => setAmountDh(val)}
                      className={`py-3 rounded-xl border text-xs sm:text-sm font-black transition-all cursor-pointer ${
                        amountDh === val
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {val} DH
                    </motion.button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRechargeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mode de Paiement au Maroc</label>
                  <CustomDropdown
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    options={[
                      { value: 'CB / Instant', label: 'Paiement Immédiat (Carte Bancaire)', icon: PhosphorCreditCard, iconColor: 'text-emerald-600' },
                      { value: 'Cash Plus', label: 'Cash Plus (Code Agence)', icon: Coins, iconColor: 'text-amber-600' },
                      { value: 'Wafacash', label: 'Wafacash (Transfert Express)', icon: Coins, iconColor: 'text-rose-600' },
                      { value: 'Barid Cash', label: 'Barid Cash (Reçu Agence)', icon: EnvelopeSimple, iconColor: 'text-yellow-600' },
                      { value: 'Virement Bancaire', label: 'Virement RIB (CIH / Attijari / BMCE)', icon: Bank, iconColor: 'text-blue-600' }
                    ]}
                  />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-700">
                  {paymentMethod === 'CB / Instant' && (
                    <>
                      <p className="font-black text-emerald-800 flex items-center gap-1">
                        <CreditCard className="w-4 h-4 text-emerald-600" /> Crédit Instantané Supabase :
                      </p>
                      <p className="text-slate-600">Votre solde sera immédiatement crédité de <strong className="text-slate-900">{amountDh} DH</strong> dès validation.</p>
                    </>
                  )}
                  {paymentMethod === 'Cash Plus' && (
                    <>
                      <p className="font-black text-amber-800 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-amber-600" />
                        <span>Instructions Cash Plus :</span>
                      </p>
                      <p className="text-slate-600">Rendez-vous en agence Cash Plus avec le code : <strong className="text-slate-900 font-mono">CP-BRICOLEMOI-88</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Wafacash' && (
                    <>
                      <p className="font-black text-rose-800 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-rose-600" />
                        <span>Instructions Wafacash :</span>
                      </p>
                      <p className="text-slate-600">Mandat express au nom de : <strong className="text-slate-900">BricoleMoi SARL (+212661000000)</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Barid Cash' && (
                    <>
                      <p className="font-black text-yellow-800 flex items-center gap-1.5">
                        <EnvelopeSimple className="w-3.5 h-3.5 text-yellow-600" />
                        <span>Instructions Barid Cash :</span>
                      </p>
                      <p className="text-slate-600">Guichet Poste Maroc / Barid Cash sous le compte : <strong className="text-slate-900 font-mono">BC-998811</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Virement Bancaire' && (
                    <>
                      <p className="font-black text-blue-800">🏦 Instructions Virement RIB Bancaire :</p>
                      <p className="text-slate-600 font-mono text-[11px]">RIB CIH : 230 780 0001234567890123 45</p>
                    </>
                  )}
                </div>

                {paymentMethod !== 'CB / Instant' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Numéro de Référence du Reçu (Recommandé)
                      </label>
                      <input
                        type="text"
                        placeholder="ex: CP-984029102 ou WC-489201"
                        value={referenceRef}
                        onChange={(e) => setReferenceRef(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono text-sm uppercase focus:border-amber-500 focus:outline-none transition-colors shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                        <span>📸 Photo du Reçu / Ticket Papier (Justificatif) :</span>
                        {receiptPhotoUrl && (
                          <span className="text-[10px] text-emerald-700 font-mono font-bold">✓ Photo Attachée</span>
                        )}
                      </label>

                      {receiptPhotoUrl ? (
                        <div className="relative rounded-2xl border border-emerald-300 p-2.5 bg-emerald-50 flex items-center justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={receiptPhotoUrl}
                              alt="Ticket reçu"
                              className="w-14 h-14 object-cover rounded-xl border border-emerald-200 cursor-pointer"
                              onClick={() => setPreviewPhotoUrl(receiptPhotoUrl)}
                            />
                            <div>
                              <p className="text-xs font-bold text-emerald-900">Ticket Reçu / Virement Prêt</p>
                              <p className="text-[10px] text-emerald-700">Cliquez sur l'image pour agrandir HD</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReceiptPhotoUrl(null)}
                            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-100/50 rounded-xl transition-colors cursor-pointer"
                            title="Supprimer la photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl bg-slate-50 cursor-pointer transition-colors group">
                          <Camera className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform mb-1" />
                          <span className="text-xs font-bold text-slate-700">Prendre en photo le ticket papier</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG ou capture d'écran de l'application</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleReceiptFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Payer &amp; Recharger ({amountDh} DH)
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Historique & Portefeuille Maâlem */}
        {historyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 p-6 rounded-3xl w-full max-w-2xl shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto modal-scroll flex flex-col text-slate-900"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                    <Receipt weight="duotone" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 font-sans">Historique &amp; Portefeuille</h3>
                    <p className="text-xs text-slate-500">Recharges, déblocages de leads clients et bonus</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-black text-slate-800">
                    <span>Solde :</span>
                    <span className="text-amber-700">{liveCreditBalance.toFixed(2)} DH</span>
                  </div>
                  <button
                    onClick={() => setHistoryModalOpen(false)}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 3 Summary KPIs */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Rechargé</span>
                  <span className="text-sm font-black text-emerald-700 font-mono">+{totalRechargedSum.toFixed(2)} DH</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-center">
                  <span className="text-[10px] text-blue-800 font-bold block uppercase tracking-wider">Leads Débloqués</span>
                  <span className="text-sm font-black text-blue-700 font-mono">-{totalLeadsSpent.toFixed(2)} DH</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                  <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wider">Bonus Reçus</span>
                  <span className="text-sm font-black text-amber-700 font-mono">+{totalBonusSum.toFixed(2)} DH</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setHistoryFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    historyFilter === 'ALL'
                      ? 'bg-white text-slate-900 shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tous ({myTransactions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('RECHARGE')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                    historyFilter === 'RECHARGE'
                      ? 'bg-emerald-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Recharges ({myTransactions.filter(isRealRechargeTx).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('LEAD')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                    historyFilter === 'LEAD'
                      ? 'bg-blue-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Leads SOS ({myTransactions.filter(isLeadTx).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('BONUS')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                    historyFilter === 'BONUS'
                      ? 'bg-amber-500 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-amber-700'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Bonus ({myTransactions.filter(isBonusTx).length})</span>
                </button>
                {pendingMyRechargesCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setHistoryFilter('PENDING')}
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                      historyFilter === 'PENDING'
                        ? 'bg-amber-500 text-white shadow-xs font-black'
                        : 'text-amber-700 hover:text-amber-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>En attente ({pendingMyRechargesCount})</span>
                  </button>
                )}
              </div>

              {/* Transactions Scrollable List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[48vh]">
                {filteredHistoryTransactions.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 text-xs space-y-2">
                    <p className="text-sm font-bold text-slate-800">Aucune transaction trouvée pour ce filtre.</p>
                    <p className="text-[11px] text-slate-400">Toutes vos opérations apparaîtront ici automatiquement.</p>
                  </div>
                ) : (
                  filteredHistoryTransactions.map((tx) => {
                    const statusUpper = String(tx.status || 'PENDING').trim().toUpperCase();
                    const isRecharge = isRealRechargeTx(tx);
                    const isLead = isLeadTx(tx);
                    const isBonus = isBonusTx(tx);
                    const isPositive = Number(tx.amount_dh) > 0;
                    const isValidated = statusUpper === 'VALIDATED';
                    const isRejected = statusUpper === 'REJECTED';
                    const isPending = statusUpper === 'PENDING';

                    const cleanTitle = isBonus 
                      ? (Number(tx.amount_dh) >= 100 ? 'Bonus Récompense Plateforme' : 'Bonus de Bienvenue Artisan')
                      : isLead 
                      ? 'Déblocage Lead Client SOS' 
                      : `Recharge Solde (${tx.payment_method || 'Virement'})`;

                    const displayRef = (() => {
                      if (!tx.reference_ref) return '';
                      const raw = String(tx.reference_ref);
                      if (raw.startsWith('INTERVENTION_')) return `Lead SOS #${raw.replace('INTERVENTION_', '').slice(0, 8)}`;
                      if (raw.startsWith('QUICK-BONUS-')) return `Bonus #${raw.replace('QUICK-BONUS-', '').slice(0, 10)}`;
                      return raw;
                    })();

                    return (
                      <div
                        key={tx.id}
                        className={`p-3.5 bg-white border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                          isPending ? 'border-amber-300 bg-amber-50/20' : isRejected ? 'border-red-300 bg-red-50/20' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isBonus ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                            isLead ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                            'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}>
                            {isBonus ? (
                              <Gift className="w-4 h-4" />
                            ) : isLead ? (
                              <Zap className="w-4 h-4" />
                            ) : (
                              <Coins className="w-4 h-4" />
                            )}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-slate-900 text-xs">
                                {cleanTitle}
                              </span>
                              {isPending && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                  ⏳ En attente validation
                                </span>
                              )}
                              {isValidated && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold">
                                  ✔ Validé
                                </span>
                              )}
                              {isRejected && (
                                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200 text-[9px] font-bold">
                                  ✖ Refusé
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                              <span className="font-mono">{new Date(tx.created_at || Date.now()).toLocaleDateString('fr-FR')} à {new Date(tx.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              {displayRef && (
                                <span>• Réf : <strong className="text-slate-700 font-mono">{displayRef}</strong></span>
                              )}
                              {tx.receipt_photo_url && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewPhotoUrl(tx.receipt_photo_url)}
                                  className="text-blue-600 hover:text-blue-800 font-bold underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>• 📷 Voir Mon Ticket</span>
                                </button>
                              )}
                            </div>

                            {/* Rejection Motif Banner */}
                            {isRejected && tx.admin_notes && (
                              <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900">
                                <p className="font-bold flex items-center gap-1 text-red-700">
                                  <span>❌ Motif du rejet par l'Admin :</span>
                                </p>
                                <p className="mt-0.5 text-slate-800 font-medium italic">
                                  "{tx.admin_notes}"
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
                          <span className={`text-base font-black font-mono whitespace-nowrap ${
                            isPositive ? 'text-emerald-600' : 'text-slate-800'
                          }`}>
                            {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : `${Number(tx.amount_dh).toFixed(2)}`} DH
                          </span>

                          {isValidated && isRecharge && (
                            <motion.button
                              whileTap={{ scale: 0.90 }}
                              onClick={() => generateReceiptPDF(tx)}
                              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-xs active:scale-90 transition-all cursor-pointer whitespace-nowrap"
                              title="Télécharger le reçu officiel PDF"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-600" />
                              <span className="hidden xs:inline">Reçu</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Affichage de {filteredHistoryTransactions.length} transaction(s)
                </span>
                <button
                  type="button"
                  onClick={() => setHistoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Fullscreen Photo Zoom Modal */}
        {previewPhotoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewPhotoUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[85vh] p-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewPhotoUrl(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-700 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors z-10 cursor-pointer shadow-sm"
                title="Fermer la photo"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={previewPhotoUrl}
                alt="Zoom panne"
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
              />

              <div className="p-3 text-center">
                <span className="text-xs font-bold text-slate-600">
                  🔍 Photo HD de la panne — Cliquez en dehors pour fermer
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Litige & Libération Garantie Escrow */}
        {unreachableModalLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-extrabold text-sm text-slate-900">Garantie Escrow &amp; Clôture Sans Frais</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setUnreachableModalLead(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  Vous ne pouvez pas réaliser la mission pour <strong className="text-slate-900">{unreachableModalLead.client_name || 'le Client'}</strong> ?
                </p>
                <div className="text-[11px] text-emerald-900 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                  <p className="font-bold flex items-center gap-1 text-emerald-800">
                    <span>🛡️ Garantie Zéro Risque BricoleMoi :</span>
                  </p>
                  <p>• Les <strong>15.00 DH</strong> placés en garantie sont <strong>restitués immédiatement</strong> sur votre solde disponible.</p>
                  <p>• Aucun frais n'est prélevé. Vous pouvez accepter une autre mission immédiatement.</p>
                  <p>• Le client sera notifié pour pouvoir relancer sa recherche sans délai.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700">Motif de non-réalisation :</label>
                <select
                  value={unreachableReason}
                  onChange={(e) => setUnreachableReason(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="CLIENT_UNREACHABLE">📵 Client Injoignable (Ne décroche pas / Téléphone éteint)</option>
                  <option value="PARTS_UNAVAILABLE">🔧 Pièce de Rechange Indisponible / Travaux non réalisables</option>
                  <option value="CLIENT_CANCELLED">❌ Client a Déjà Trouvé / Annulé son besoin</option>
                  <option value="PRICE_DISAGREEMENT">💸 Désaccord sur le Devis / Périmètre hors portée</option>
                  <option value="WRONG_LOCATION">📍 Adresse Erronée / Hors Secteur</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setUnreachableModalLead(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await declareMissionUnfeasible(unreachableModalLead.id, unreachableReason);
                    setUnreachableModalLead(null);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  🛡️ Confirmer &amp; Restituer 15 DH
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
