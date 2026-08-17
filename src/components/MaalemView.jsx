import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useEmergencyFlow, EMERGENCY_STATES } from '../context/EmergencyFlowContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
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

export const MaalemView = ({ onOpenCINVerification }) => {
  const { t, user, setUser } = useAuth();
  const { 
    interventions, 
    maalems,
    transactions,
    generateReceiptPDF,
    acceptLead, 
    requestWorkCompletion,
    updateInterventionProgress,
    reportUnreachableClient,
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
    finishMission: flowFinishMission
  } = useEmergencyFlow();

  const currentLiveMaalem = maalems?.find((m) => m.id === user?.id) || user?.maalem_details || user;
  const liveCreditBalance = parseFloat(currentLiveMaalem?.credit_balance ?? user?.credits ?? user?.maalem_details?.credit_balance ?? 15.00);

  const maalemDetails = user?.maalem_details || {
    specialty: currentLiveMaalem?.specialty || 'PLUMBING',
    credit_balance: liveCreditBalance,
    is_verified: currentLiveMaalem?.is_verified ?? true,
    rating_avg: currentLiveMaalem?.rating_avg || 4.80,
    consecutive_five_stars: 3,
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

  const handleReceiptFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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

  // Transactions spécifiques à l'artisan connecté
  const myTransactions = (transactions || []).filter((t) => {
    if (!user) return true;
    const isExactId = user.id && String(t.maalem_id || '').trim() === String(user.id).trim();
    const isMaalemRole = user.role?.toUpperCase() === 'MAALEM' && (!t.maalem_id || t.maalem_id === 'maalem-1' || String(t.maalem_id).trim() === String(user.id).trim());
    return isExactId || isMaalemRole;
  });

  const totalRechargedSum = myTransactions
    .filter((t) => t.status === 'VALIDATED' && t.type === 'RECHARGE')
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const totalLeadsSpent = myTransactions
    .filter((t) => t.type === 'LEAD_DEDUCTION' || t.type === 'DEBIT')
    .reduce((acc, t) => acc + Math.abs(parseFloat(t.amount_dh) || 0), 0);

  const totalBonusSum = myTransactions
    .filter((t) => t.type === 'BONUS' || t.payment_method?.includes('Offert'))
    .reduce((acc, t) => acc + (parseFloat(t.amount_dh) || 0), 0);

  const pendingMyRechargesCount = myTransactions.filter(
    (t) => t.status === 'PENDING' && t.type === 'RECHARGE'
  ).length;

  const filteredHistoryTransactions = myTransactions.filter((t) => {
    if (historyFilter === 'RECHARGE') return t.type === 'RECHARGE';
    if (historyFilter === 'LEAD') return t.type === 'LEAD_DEDUCTION' || t.type === 'DEBIT';
    if (historyFilter === 'BONUS') return t.type === 'BONUS' || t.payment_method?.includes('Offert');
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
    const district = (item?.district || '').toLowerCase();
    if (district.includes('fès') || district.includes('fes') || district.includes('imouzzer') || district.includes('narjiss')) return [34.0331, -5.0003];
    if (district.includes('rabat') || district.includes('salé') || district.includes('agdal') || district.includes('hay riad')) return [34.0209, -6.8416];
    if (district.includes('marrakech') || district.includes('gueliz') || district.includes('hivernage')) return [31.6295, -7.9811];
    if (district.includes('tanger') || district.includes('malabata') || district.includes('boukhalef')) return [35.7595, -5.8340];
    if (district.includes('agadir') || district.includes('talborjt')) return [30.4278, -9.5981];
    if (district.includes('meknès') || district.includes('meknes')) return [33.8938, -5.5513];
    if (district.includes('oujda')) return [34.6814, -1.9086];
    if (district.includes('tétouan') || district.includes('tetouan')) return [35.5889, -5.3626];
    if (district.includes('kénitra') || district.includes('kenitra')) return [34.2610, -6.5802];
    return [33.5883, -7.6328];
  };

  const maalemSpecialty = maalemDetails?.specialty || user?.maalem_details?.specialty || 'PLUMBING';

  // 1. Leads Disponibles (Radar Public des SOS en attente de prise en charge)
  const availableLeads = interventions
    .filter((item) => {
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

  // 2. Chantiers Débloqués (Exclusivité Stricte : Attribués uniquement à l'artisan connecté)
  const unlockedLeads = interventions.filter((item) => {
    if (item.status === 'PENDING') return false;
    const isOwner = user?.id && String(item.maalem_id || '').trim() === String(user.id).trim();
    const isFallbackOwner = (!user?.id || user.id === 'maalem-1' || user.id === '22222222-2222-2222-2222-222222222222') && (!item.maalem_id || item.maalem_id === 'maalem-1' || item.maalem_id === '22222222-2222-2222-2222-222222222222');
    return isOwner || isFallbackOwner;
  });

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
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result;
      const currentList = Array.isArray(user?.maalem_details?.portfolio_urls) 
        ? [...user.maalem_details.portfolio_urls] 
        : Array.isArray(currentLiveMaalem?.portfolio_urls)
        ? [...currentLiveMaalem.portfolio_urls]
        : [];
      if (currentList.length >= 3) {
        alert('Maximum 3 photos de portfolio.');
        return;
      }
      const updatedList = [...currentList, dataUrl];
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
    reader.readAsDataURL(file);
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
          className="bg-slate-950 text-slate-100 p-6 rounded-3xl border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] space-y-4 relative overflow-hidden"
        >
          <button
            onClick={() => setWhatsappMsg(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                <WhatsappLogo weight="duotone" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base tracking-tight text-white flex items-center gap-2">
                  <span>Message WhatsApp Automatique (Darija 🇲🇦)</span>
                </h4>
                <p className="text-xs text-slate-400">Notification instantanée envoyée au Maâlem</p>
              </div>
            </div>
          </div>

          <div 
            dir="rtl"
            className="bg-slate-900/95 border border-cyan-500/30 p-5 rounded-2xl font-sans text-sm text-slate-100 whitespace-pre-line leading-relaxed shadow-inner select-all"
          >
            {formattedWhatsAppDarija}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenWhatsApp}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" />
              <span>Ouvrir dans WhatsApp</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyWhatsAppMsg}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{copiedMsg ? '✔ Message Copié !' : 'Copier le Message'}</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 1. Tableau de Bord : Header Solde, Statut EN LIGNE, Note Globale (Dark Sci-Fi Glassmorphism) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Profile & Status */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-black p-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex-shrink-0">
              <EnhancedCategoryIcon type={maalemDetails.specialty || user?.maalem_details?.specialty} className="w-10 h-10" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-black text-white font-sans tracking-tight">{user?.full_name || 'Maalem Hassan'}</h2>
                
                {/* Statut EN LIGNE Toggle Sci-Fi Tactile */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleMaalemOnlineStatus()}
                  className={`group relative pl-2.5 pr-3.5 py-1.5 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 cursor-pointer ${
                    isMaalemOnline
                      ? 'bg-gradient-to-r from-emerald-950/90 to-slate-950/95 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:border-emerald-300'
                      : 'bg-slate-950/90 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                  title="Cliquer pour basculer votre disponibilité (En Ligne / Hors Ligne)"
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isMaalemOnline 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 shadow-[0_0_10px_rgba(52,211,153,0.5)]' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                    {isMaalemOnline ? (
                      <Broadcast weight="duotone" className="w-4 h-4 animate-pulse drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                    ) : (
                      <Power weight="bold" className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex flex-col items-start leading-none text-left">
                    <span className={`text-xs font-black tracking-tight transition-colors ${
                      isMaalemOnline ? 'text-emerald-300' : 'text-slate-300'
                    }`}>
                      {isMaalemOnline ? 'EN LIGNE' : 'HORS LIGNE'}
                    </span>
                    <span className={`text-[9px] font-mono font-semibold mt-0.5 transition-colors ${
                      isMaalemOnline ? 'text-emerald-400/80' : 'text-slate-500'
                    }`}>
                      {isMaalemOnline ? 'Radar SOS Actif' : 'Alertes en Pause'}
                    </span>
                  </div>

                  <div className={`ml-1 w-2 h-2 rounded-full transition-all ${
                    isMaalemOnline 
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)] animate-ping' 
                      : 'bg-slate-600'
                  }`} />
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs font-medium">
                <span className="px-2.5 py-1 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                  <PhosphorWrench weight="duotone" className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{getSpecialtyLabel(maalemDetails.specialty || user?.maalem_details?.specialty)}</span>
                </span>
                
                <span className="flex items-center text-amber-300 font-mono font-black bg-slate-950/90 px-2.5 py-1 rounded-xl border border-amber-500/40 shadow-[0_0_10px_rgba(251,191,36,0.25)]">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  <span>{(maalemDetails.rating_avg || 4.9).toFixed(1)} / 5.0</span>
                </span>
              </div>
            </div>
          </div>

          {/* Credit Balance Card (Sci-Fi Glassmorphism Card) */}
          <div className="bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-3xl shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 sm:min-w-[340px]">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" />

            {/* Header: Title + Active Badge */}
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.25)] flex-shrink-0">
                  <Coins weight="duotone" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-100 tracking-wide flex items-center gap-1.5">
                    <span>Portefeuille Artisan</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">رصيد الحساب المتاح</p>
                </div>
              </div>

              {liveCreditBalance >= 15 ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold font-mono flex items-center gap-1.5 shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Opérationnel</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-bold font-mono flex items-center gap-1.5 shadow-[0_0_8px_rgba(244,63,94,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>Recharge Requise</span>
                </span>
              )}
            </div>

            {/* Main Balance Display */}
            <div className="relative z-10 my-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-white font-mono tracking-tight drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                  {liveCreditBalance.toFixed(2)}
                </span>
                <span className="text-sm font-black font-mono text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                  DH
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Coût : <strong className="text-slate-200 font-mono font-bold">15.00 DH</strong> / déblocage lead client</span>
              </p>
            </div>

            {/* Action Buttons: Historique + Recharger */}
            <div className="grid grid-cols-2 gap-2 relative z-10 pt-1 border-t border-cyan-500/15">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setHistoryModalOpen(true)}
                className="bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                title="Consulter l'historique complet de mes transactions et recharges"
              >
                <ClockCounterClockwise className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                <span>Historique</span>
                {pendingMyRechargesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] animate-pulse">
                    {pendingMyRechargesCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setRechargeModalOpen(true)}
                className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl shadow-[0_0_18px_rgba(6,182,212,0.45)] hover:shadow-[0_0_25px_rgba(6,182,212,0.65)] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle weight="bold" className="w-4 h-4 text-slate-950" />
                <span>Recharger</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Badge de Confiance & Réputation Numéro Vérifié */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-emerald-950/50 via-slate-950 to-cyan-950/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_18px_rgba(52,211,153,0.15)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(52,211,153,0.35)]">
              <ShieldCheck className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-xs font-black text-white font-sans tracking-wide uppercase">
                  Profil Artisan Opérationnel &amp; Certifié
                </h4>
                <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Numéro Vérifié (SMS)
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Authentifié par OTP. Vous recevez directement les demandes SOS de votre zone d'intervention.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-inner">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+212 {cleanUserPhone.slice(-9)}</span>
            </span>
          </div>
        </motion.div>

        {/* Section Interactive : Portfolio de Réalisations Chantiers */}
        <div className="mt-4 p-4.5 bg-slate-950/90 border border-cyan-500/30 rounded-2xl space-y-3 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/15 pb-2.5">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]" />
              <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">
                Mon Portfolio de Réalisations Chantiers
              </h4>
              <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                {(user?.maalem_details?.portfolio_urls || currentLiveMaalem?.portfolio_urls || []).length}/3 photos
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Photos de vos travaux visibles par les clients pour renforcer la confiance.
            </p>
          </div>

          {/* Grid des photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {(user?.maalem_details?.portfolio_urls || currentLiveMaalem?.portfolio_urls || []).map((url, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 aspect-video sm:aspect-square flex items-center justify-center shadow-md">
                <img
                  src={url}
                  alt={`Chantier ${idx + 1}`}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform"
                  onClick={() => setPreviewPhotoUrl(url)}
                />
                <button
                  type="button"
                  onClick={() => handleRemovePortfolioPhoto(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-950/90 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-900 hover:text-white transition-all shadow-sm cursor-pointer opacity-90 group-hover:opacity-100"
                  title="Supprimer cette photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPhotoUrl(url)}
                  className="absolute bottom-1.5 right-1.5 p-1 bg-slate-950/80 text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-slate-900 transition-all shadow-sm cursor-pointer"
                  title="Agrandir en HD"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30">
                  Chantier #{idx + 1}
                </span>
              </div>
            ))}

            {/* Bouton d'ajout si < 3 photos */}
            {(user?.maalem_details?.portfolio_urls || currentLiveMaalem?.portfolio_urls || []).length < 3 && (
              <label className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/60 hover:bg-slate-900/90 rounded-xl aspect-video sm:aspect-square flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all p-3 text-center group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddPortfolioPhoto}
                  className="hidden"
                />
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <PlusCircle weight="bold" className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-cyan-300">
                  + Ajouter Photo
                </span>
                <span className="text-[9px] text-slate-400">
                  (Max 5 Mo)
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Gamification Progress Gauges (Clean Vector Typography & Icons) */}
        <div className="mt-6 pt-5 border-t border-cyan-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/30 shadow-inner">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-black text-slate-100 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Jauge 1 : Avis 5 Étoiles Consécutifs</span>
              </span>
              <span className="font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded-lg border border-cyan-500/30 font-mono text-xs">
                {maalemDetails.consecutive_five_stars || 0} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500"
                style={{ width: `${((maalemDetails.consecutive_five_stars || 0) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>5 avis 5★ consécutifs = <strong className="text-cyan-300">+15.00 DH GRATUITS (1er Lead Offert)</strong> !</span>
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/30 shadow-inner">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-black text-slate-100 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Jauge 2 : Recharges de 100 DH</span>
              </span>
              <span className="font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded-lg border border-cyan-500/30 font-mono text-xs">
                {maalemDetails.hundred_dh_recharges_count || 0} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500"
                style={{ width: `${((maalemDetails.hundred_dh_recharges_count || 0) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>À la 5ème recharge de 100 DH = <strong className="text-cyan-300">+15.00 DH GRATUITS (1er Lead Offert)</strong> !</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Interactive Radar Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white flex items-center gap-2 font-sans">
            <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            Carte Radar d'Urgence (Position GPS Réelle)
          </h3>
          <span className="text-xs text-cyan-300 font-bold bg-slate-900 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>Pos: {maalemPos[0].toFixed(4)}, {maalemPos[1].toFixed(4)}</span>
          </span>
        </div>

        {!isMaalemOnline && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-950/40 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200 text-xs shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
              <div>
                <p className="font-extrabold text-amber-300 text-sm">Mode Hors Ligne Activé</p>
                <p className="text-[11px] text-amber-200/80">Votre profil est temporairement masqué des clients et vos alertes SOS sont en pause.</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleMaalemOnlineStatus(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-[0_0_15px_rgba(52,211,153,0.4)] active:scale-95 transition-all flex-shrink-0"
            >
              Passer en Ligne 🟢
            </motion.button>
          </motion.div>
        )}

        <div id="maalem-radar-map">
          <InteractiveMap 
            mode="MAALEM_RADAR" 
            selectedLat={focusedMapCoords ? focusedMapCoords[0] : maalemPos[0]} 
            selectedLng={focusedMapCoords ? focusedMapCoords[1] : maalemPos[1]} 
          />
        </div>
      </div>

      {/* 3. Demandes d'Urgence SOS Disponibles (Directement sous la carte radar) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-950/90 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-sans tracking-tight flex items-center gap-2">
                Demandes d'Urgence SOS en Direct
                <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/40 text-xs font-mono font-bold">
                  {availableLeads.length} actives
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Directement depuis Supabase Realtime • Coût déblocage : 15 DH
              </p>
            </div>
          </div>

          <div className="flex items-center p-1 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 ${
                filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Target weight="duotone" className={`w-4 h-4 ${filterBySpecialtyOnly ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'text-cyan-400'}`} />
              <span>Ma Spécialité</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterBySpecialtyOnly(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 ${
                !filterBySpecialtyOnly
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GlobeHemisphereWest weight="duotone" className={`w-4 h-4 ${!filterBySpecialtyOnly ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'text-cyan-400'}`} />
              <span>Toutes les Demandes</span>
            </button>
          </div>
        </div>

        {availableLeads.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/70 border border-cyan-500/20 rounded-2xl text-slate-400 text-sm shadow-sm space-y-2">
            <p className="text-base font-bold text-slate-300">Aucune nouvelle demande d'urgence en attente.</p>
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
                  className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-5 shadow-lg hover:border-cyan-400/50 flex flex-col justify-between transition-all space-y-4"
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
                        className="text-xs text-cyan-300 hover:text-white font-black bg-slate-950/90 px-3 py-1.5 rounded-xl border border-cyan-500/40 hover:border-cyan-400 flex items-center gap-1 shadow-inner font-mono cursor-pointer transition-all active:scale-95"
                        title="Cliquer pour centrer la carte sur cette demande SOS"
                      >
                        <span>📍 {distanceKm} km</span>
                        <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/80 px-1.5 py-0.5 rounded ml-1 border border-cyan-500/30">🎯 Carte</span>
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
                              className="w-20 h-20 rounded-2xl object-cover border border-cyan-500/40 shadow-md group-hover:border-cyan-400 group-hover:scale-105 transition-all"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-cyan-300">
                              <Eye className="w-5 h-5" />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-white flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{item.district || 'Casablanca'}</span>
                          </p>
                          <p className="text-xs text-cyan-300 font-bold mt-0.5">
                            {item.subcategory || 'Dépannage d\'urgence'}
                          </p>
                          {item.access_details && (
                            <p className="text-[11px] text-slate-300 italic mt-1 line-clamp-2">
                              ✍️ "{item.access_details}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Lecteur Audio Interactif pour l'Artisan (Avant Déblocage) */}
                      {item.audio_note_url && (
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-2 shadow-inner">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => togglePlayMaalemAudio(item.id, item.audio_note_url)}
                              className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)] flex-shrink-0 cursor-pointer"
                              title="Écouter la voix du client"
                            >
                              {playingAudioId === item.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </motion.button>
                            <div>
                              <p className="text-xs font-bold text-slate-200">
                                {playingAudioId === item.id ? 'Lecture en cours...' : 'Note Vocale Client (Darija / FR)'}
                              </p>
                              <p className="text-[10px] text-cyan-400">Écoutez les explications avant d'accepter</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => cyclePlaybackSpeed(item.id)}
                            className="px-2 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 hover:bg-slate-800"
                            title="Vitesse de lecture"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Coût : <span className="text-cyan-300 font-mono font-black">15.00 DH</span>
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => acceptLead(item.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5 active:scale-90 cursor-pointer"
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

      {/* 4. SECTION LEADS DÉBLOQUÉS (Contact Direct WhatsApp + Itinéraire GPS + Audio + Photos HD) */}
      {unlockedLeads.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-cyan-500/20">
          <h3 className="text-xl font-black text-emerald-400 flex items-center gap-2 font-sans">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Leads Débloqués - Direct Client ({unlockedLeads.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedLeads.map((lead) => {
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
                  className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-5 shadow-[0_0_20px_rgba(52,211,153,0.15)] space-y-4"
                >
                  {/* Header: Badge & Métier */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5 ${
                      lead.status === 'COMPLETED'
                        ? 'text-emerald-300 bg-emerald-950/90 border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                        : lead.status === 'PENDING_COMPLETION'
                        ? 'text-purple-300 bg-purple-950/90 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)] animate-pulse'
                        : 'text-cyan-300 bg-cyan-950/90 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${lead.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'}`} />
                      <span>
                        {lead.status === 'COMPLETED' 
                          ? '🏆 CHANTIER CLÔTURÉ' 
                          : lead.status === 'PENDING_COMPLETION'
                          ? '⏳ EN ATTENTE CLIENT'
                          : '🟢 LEAD ACTIF DÉBLOQUÉ'}
                      </span>
                    </span>
                    <span className="text-xs font-black text-cyan-300 bg-slate-950 px-3 py-1 rounded-xl border border-cyan-500/30 font-sans">
                      {lead.subcategory || 'Dépannage'}
                    </span>
                  </div>

                  {/* Coordonnées & Précision d'Accès */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-white">{lead.client_name || 'Client BricoleMoi'}</h4>
                    <p className="text-xs text-slate-300 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{lead.district || 'Casablanca'}</span>
                    </p>
                    {lead.access_details && (
                      <p className="text-[11px] text-amber-300 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-amber-500/30 mt-1 font-medium">
                        📍 <strong>Accès :</strong> {lead.access_details}
                      </p>
                    )}
                  </div>

                  {/* Galerie Photos HD du Lead Débloqué */}
                  {(lead.photos_list || lead.description_photo) && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400">Photos de la Panne (Cliquer pour agrandir HD) :</p>
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
                              className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30 group-hover:border-cyan-400 transition-all"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-300">
                              <Eye className="w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lecteur Audio Intégré pour le Maâlem */}
                  {lead.audio_note_url && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => togglePlayMaalemAudio(lead.id, lead.audio_note_url)}
                          className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)] flex-shrink-0 cursor-pointer"
                          title="Écouter l'explication du client"
                        >
                          {playingAudioId === lead.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </motion.button>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-100">
                            {playingAudioId === lead.id ? 'Écoute en cours...' : 'Note Vocale du Client'}
                          </p>
                          <p className="text-[10px] text-cyan-300 font-mono">Explication détaillée de la panne</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => cyclePlaybackSpeed(lead.id)}
                        className="px-2 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 hover:bg-slate-800"
                        title="Vitesse de lecture"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>
                  )}

                  {/* Barre d'Action Mobile Tactile : 3 Boutons Équilibrés (Appel, WhatsApp, GPS) */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-cyan-500/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-bold">Client Joignable :</span>
                      <span className="text-xs font-mono font-black text-white dir-ltr">+{formattedWaDigits}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={`tel:+${formattedWaDigits}`}
                        className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm"
                        title="Appeler le client directement par téléphone GSM"
                      >
                        <PhoneCall className="w-4 h-4 text-cyan-400" />
                        <span>Appeler</span>
                      </a>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-[0_0_12px_rgba(52,211,153,0.4)] flex items-center justify-center gap-1.5 transition-all"
                        title="Ouvrir la discussion WhatsApp avec message pré-rempli"
                      >
                        <WhatsappLogo weight="fill" className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-[0_0_12px_rgba(59,130,246,0.4)] flex items-center justify-center gap-1.5 transition-all"
                        title="Lancer l'itinéraire GPS sur Google Maps"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>GPS Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Stepper d'avancement d'intervention */}
                  {lead.status !== 'COMPLETED' && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-500/20 space-y-2">
                      <p className="text-[11px] font-bold text-slate-400">Statut du déplacement :</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateInterventionProgress(lead.id, 'ON_THE_WAY');
                            flowSetProgressStep('ON_THE_WAY');
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border ${
                            lead.progress_step === 'ON_THE_WAY'
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] font-black'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400/50'
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
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border ${
                            lead.progress_step === 'ARRIVED'
                              ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] font-black'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-blue-400/50'
                          }`}
                        >
                          <span>📍 Sur place</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action d'Accomplissement des Travaux & Saisie du Montant Réel */}
                  <div className="pt-2 border-t border-cyan-500/20 space-y-3">
                    {lead.status === 'PENDING_COMPLETION' ? (
                      <div className="p-3.5 bg-amber-950/80 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 flex items-center justify-between shadow-inner">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-400 animate-spin flex-shrink-0" />
                          <span>Demande de fin de chantier transmise ({lead.final_agreed_price || currentAgreedPrice} DH)</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-900/60 px-2 py-0.5 rounded">En attente client</span>
                      </div>
                    ) : lead.status === 'COMPLETED' ? (
                      <div className="p-3.5 bg-slate-950/90 border border-emerald-500/40 rounded-xl text-xs space-y-2 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Intervention Clôturée &amp; Validée ({lead.final_agreed_price} DH)</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full font-black font-mono flex items-center gap-1 text-xs text-amber-300 bg-amber-950/90 border border-amber-500/50 shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{lead.rating ? `${lead.rating} / 5` : '5 / 5'}</span>
                          </span>
                        </div>
                        {lead.comment && (
                          <p className="text-slate-200 font-semibold italic text-[11px] bg-slate-900 p-2 rounded-lg border border-cyan-500/20">
                            Avis Client : "{lead.comment}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/30 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                            <span>Prix Final Convenu des Travaux :</span>
                            <span className="text-cyan-400 font-mono text-sm">{currentAgreedPrice} DH</span>
                          </div>
                          <input
                            type="range"
                            min="100"
                            max="3000"
                            step="50"
                            value={currentAgreedPrice}
                            onChange={(e) => setAgreedPrices((prev) => ({ ...prev, [lead.id]: parseInt(e.target.value) }))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            requestWorkCompletion(lead.id, currentAgreedPrice);
                            flowFinishMission(currentAgreedPrice);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 border border-emerald-400/30 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Déclarer les travaux terminés &amp; Valider</span>
                        </motion.button>
                      </div>
                    )}

                    {/* Bouton Litige & Règles Anti-Abus (Fenêtre 30 min max, compensation 1 Crédit de Remplacement) */}
                    {lead.status !== 'COMPLETED' && lead.status !== 'UNREACHABLE_REFUNDED' && (() => {
                      const acceptedTime = lead.accepted_at
                        ? new Date(lead.accepted_at).getTime()
                        : (lead.created_at ? new Date(lead.created_at).getTime() : Date.now());
                      const elapsedMin = Math.floor((Date.now() - acceptedTime) / 60000);
                      const remainingMin = Math.max(0, 30 - elapsedMin);

                      return remainingMin > 0 ? (
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-cyan-500/15 mt-2">
                          <button
                            type="button"
                            onClick={() => setUnreachableModalLead(lead)}
                            className="font-bold text-amber-400/90 hover:text-amber-300 transition-colors underline cursor-pointer flex items-center gap-1"
                          >
                            <span>⚠️ Signaler faux numéro / client injoignable</span>
                          </button>
                          <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-950 px-2 py-0.5 rounded-md border border-amber-500/30 shadow-inner">
                            ⏳ {remainingMin} min
                          </span>
                        </div>
                      ) : (
                        <div className="text-center pt-1 mt-2 border-t border-cyan-500/10">
                          <span className="text-[10px] text-slate-500 font-mono italic">
                            🔒 Délai de signalement anti-abus expiré (&gt; 30 min après acceptation)
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recharge Modal */}
      <AnimatePresence>
        {rechargeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-slate-950 border border-cyan-500/40 rounded-3xl max-w-md w-full p-4 sm:p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative text-slate-100 max-h-[85vh] overflow-y-auto modal-scroll"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setRechargeModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Wallet className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black text-white font-sans">Module de Recharge Solde</h3>
                <p className="text-xs text-slate-400 mt-1">Choisissez votre pack et créditez votre compte Supabase</p>
              </div>

              {/* Boutons Rapides 50 DH, 100 DH, 200 DH, 500 DH */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Packs de Recharge Solde</label>
                <div className="grid grid-cols-4 gap-2">
                  {['50', '100', '200', '500'].map((val) => (
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      key={val}
                      type="button"
                      onClick={() => setAmountDh(val)}
                      className={`py-3 rounded-xl border text-xs sm:text-sm font-black transition-all active:scale-90 ${
                        amountDh === val
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-900 text-slate-300 border-cyan-500/30 hover:bg-slate-800'
                      }`}
                    >
                      {val} DH
                    </motion.button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRechargeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Mode de Paiement au Maroc</label>
                  <CustomDropdown
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    options={[
                      { value: 'CB / Instant', label: 'Paiement Immédiat (Carte Bancaire)', icon: PhosphorCreditCard, iconColor: 'text-emerald-400' },
                      { value: 'Cash Plus', label: 'Cash Plus (Code Agence)', icon: Coins, iconColor: 'text-amber-400' },
                      { value: 'Wafacash', label: 'Wafacash (Transfert Express)', icon: Coins, iconColor: 'text-rose-400' },
                      { value: 'Barid Cash', label: 'Barid Cash (Reçu Agence)', icon: EnvelopeSimple, iconColor: 'text-yellow-400' },
                      { value: 'Virement Bancaire', label: 'Virement RIB (CIH / Attijari / BMCE)', icon: Bank, iconColor: 'text-cyan-400' }
                    ]}
                  />
                </div>

                <div className="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl text-xs space-y-2">
                  {paymentMethod === 'CB / Instant' && (
                    <>
                      <p className="font-black text-emerald-400 flex items-center gap-1">
                        <CreditCard className="w-4 h-4" /> Crédit Instantané Supabase :
                      </p>
                      <p className="text-slate-300">Votre solde <code className="text-cyan-300">profiles.credits</code> sera immédiatement crédité de <strong>{amountDh} DH</strong> dès validation.</p>
                    </>
                  )}
                  {paymentMethod === 'Cash Plus' && (
                    <>
                      <p className="font-black text-cyan-300 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>Instructions Cash Plus :</span>
                      </p>
                      <p className="text-slate-300">Rendez-vous en agence Cash Plus avec le code : <strong className="text-cyan-400 font-mono">CP-BRICOLEMOI-88</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Wafacash' && (
                    <>
                      <p className="font-black text-cyan-300 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-rose-400" />
                        <span>Instructions Wafacash :</span>
                      </p>
                      <p className="text-slate-300">Mandat express au nom de : <strong className="text-cyan-400">BricoleMoi SARL (+212661000000)</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Barid Cash' && (
                    <>
                      <p className="font-black text-cyan-300 flex items-center gap-1.5">
                        <EnvelopeSimple className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Instructions Barid Cash :</span>
                      </p>
                      <p className="text-slate-300">Guichet Poste Maroc / Barid Cash sous le compte : <strong className="text-cyan-400 font-mono">BC-998811</strong></p>
                    </>
                  )}
                  {paymentMethod === 'Virement Bancaire' && (
                    <>
                      <p className="font-black text-cyan-300">🏦 Instructions Virement RIB Bancaire :</p>
                      <p className="text-slate-300 font-mono text-[11px]">RIB CIH : 230 780 0001234567890123 45</p>
                    </>
                  )}
                </div>

                {paymentMethod !== 'CB / Instant' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Numéro de Référence du Reçu (Recommandé)
                      </label>
                      <input
                        type="text"
                        placeholder="ex: CP-984029102 ou WC-489201"
                        value={referenceRef}
                        onChange={(e) => setReferenceRef(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono text-sm uppercase focus:border-cyan-400 focus:outline-none transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                        <span>📸 Photo du Reçu / Ticket Papier (Justificatif) :</span>
                        {receiptPhotoUrl && (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">✓ Photo Attachée</span>
                        )}
                      </label>

                      {receiptPhotoUrl ? (
                        <div className="relative rounded-2xl border border-emerald-500/50 p-2.5 bg-slate-900 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                          <div className="flex items-center gap-3">
                            <img
                              src={receiptPhotoUrl}
                              alt="Ticket reçu"
                              className="w-14 h-14 object-cover rounded-xl border border-emerald-500/40 cursor-pointer"
                              onClick={() => setPreviewPhotoUrl(receiptPhotoUrl)}
                            />
                            <div>
                              <p className="text-xs font-bold text-emerald-300">Ticket Reçu / Virement Prêt</p>
                              <p className="text-[10px] text-slate-400">Cliquez sur l'image pour agrandir HD</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReceiptPhotoUrl(null)}
                            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-xl transition-colors"
                            title="Supprimer la photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-2xl bg-slate-900/60 cursor-pointer transition-colors group">
                          <Camera className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform mb-1" />
                          <span className="text-xs font-bold text-slate-200">Prendre en photo le ticket papier</span>
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
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
                >
                  Payer & Recharger ({amountDh} DH)
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-cyan-500/30 p-4 sm:p-6 rounded-3xl w-full max-w-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] space-y-4 max-h-[85vh] overflow-y-auto modal-scroll flex flex-col"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                    <Receipt weight="duotone" className="w-5 h-5 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white font-sans">Historique &amp; Portefeuille</h3>
                    <p className="text-xs text-slate-400">Recharges, déblocages de leads clients et bonus</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono font-black text-cyan-300">
                    <span>Solde :</span>
                    <span className="text-white">{liveCreditBalance.toFixed(2)} DH</span>
                  </div>
                  <button
                    onClick={() => setHistoryModalOpen(false)}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 3 Summary KPIs */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-emerald-500/30 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Rechargé</span>
                  <span className="text-sm font-black text-emerald-300 font-mono">+{totalRechargedSum.toFixed(2)} DH</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-cyan-500/30 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Leads Débloqués</span>
                  <span className="text-sm font-black text-cyan-300 font-mono">-{totalLeadsSpent.toFixed(2)} DH</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-amber-500/30 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Bonus Reçus</span>
                  <span className="text-sm font-black text-amber-300 font-mono">+{totalBonusSum.toFixed(2)} DH</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-slate-950/90 rounded-2xl border border-cyan-500/20 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setHistoryFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    historyFilter === 'ALL'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tous ({myTransactions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('RECHARGE')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    historyFilter === 'RECHARGE'
                      ? 'bg-emerald-600 text-white shadow-sm font-black'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recharges ({myTransactions.filter(t => t.type === 'RECHARGE').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('LEAD')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    historyFilter === 'LEAD'
                      ? 'bg-cyan-600 text-white shadow-sm font-black'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Leads SOS ({myTransactions.filter(t => t.type === 'LEAD_DEDUCTION' || t.type === 'DEBIT').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryFilter('BONUS')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    historyFilter === 'BONUS'
                      ? 'bg-amber-500 text-black shadow-sm font-black'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bonus ({myTransactions.filter(t => t.type === 'BONUS' || t.payment_method?.includes('Offert')).length})</span>
                </button>
                {pendingMyRechargesCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setHistoryFilter('PENDING')}
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                      historyFilter === 'PENDING'
                        ? 'bg-amber-500 text-black shadow-sm font-black'
                        : 'text-amber-400 hover:text-amber-300'
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
                  <div className="p-8 text-center bg-slate-950/70 border border-cyan-500/20 rounded-2xl text-slate-400 text-xs space-y-2">
                    <p className="text-sm font-bold text-slate-300">Aucune transaction trouvée pour ce filtre.</p>
                    <p className="text-[11px] text-slate-500">Toutes vos opérations apparaîtront ici automatiquement.</p>
                  </div>
                ) : (
                  filteredHistoryTransactions.map((tx) => {
                    const statusUpper = String(tx.status || 'PENDING').trim().toUpperCase();
                    const isRecharge = String(tx.type || '').toUpperCase() === 'RECHARGE';
                    const isLead = String(tx.type || '').toUpperCase() === 'LEAD_DEDUCTION' || String(tx.type || '').toUpperCase() === 'DEBIT';
                    const isBonus = String(tx.type || '').toUpperCase() === 'BONUS' || tx.payment_method?.includes('Offert');
                    const isPositive = Number(tx.amount_dh) > 0;
                    const isValidated = statusUpper === 'VALIDATED';
                    const isRejected = statusUpper === 'REJECTED';
                    const isPending = statusUpper === 'PENDING';

                    return (
                      <div
                        key={tx.id}
                        className={`p-3.5 bg-slate-950/80 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                          isPending ? 'border-amber-500/40' : isRejected ? 'border-red-500/30' : 'border-cyan-500/20 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isBonus ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40' :
                            isLead ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40' :
                            'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
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
                              <span className="font-bold text-slate-100 text-xs">
                                {isBonus ? 'Bonus Récompense Platform' : isLead ? 'Déblocage Lead Client SOS' : `Recharge Solde (${tx.payment_method || 'Virement'})`}
                              </span>
                              {isPending && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[9px] font-bold">
                                  ⏳ En attente validation
                                </span>
                              )}
                              {isValidated && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
                                  ✔ Validé
                                </span>
                              )}
                              {isRejected && (
                                <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/40 text-[9px] font-bold">
                                  ✖ Refusé
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                              <span className="font-mono">{new Date(tx.created_at || Date.now()).toLocaleDateString('fr-FR')} à {new Date(tx.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              {tx.reference_ref && (
                                <span>• Réf : <strong className="text-slate-300 font-mono">{tx.reference_ref}</strong></span>
                              )}
                              {tx.receipt_photo_url && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewPhotoUrl(tx.receipt_photo_url)}
                                  className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>• 📷 Voir Mon Ticket</span>
                                </button>
                              )}
                            </div>

                            {/* Rejection Motif Banner */}
                            {isRejected && tx.admin_notes && (
                              <div className="mt-2 p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-xs text-red-200">
                                <p className="font-bold flex items-center gap-1 text-red-400">
                                  <span>❌ Motif du rejet par l'Admin :</span>
                                </p>
                                <p className="mt-0.5 text-slate-100 font-medium italic">
                                  "{tx.admin_notes}"
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                          <span className={`text-base font-black font-mono ${
                            isPositive ? 'text-emerald-400' : 'text-cyan-400'
                          }`}>
                            {isPositive ? `+${Number(tx.amount_dh).toFixed(2)}` : `${Number(tx.amount_dh).toFixed(2)}`} DH
                          </span>

                          {isValidated && isRecharge && (
                            <motion.button
                              whileTap={{ scale: 0.90 }}
                              onClick={() => generateReceiptPDF(tx)}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-sm active:scale-90 transition-all"
                              title="Télécharger le reçu officiel PDF"
                            >
                              <Printer className="w-3.5 h-3.5" />
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
              <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Affichage de {filteredHistoryTransactions.length} transaction(s)
                </span>
                <button
                  type="button"
                  onClick={() => setHistoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Fullscreen Photo Zoom Modal (Visionneuse HD pour l'Artisan) */}
        {previewPhotoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewPhotoUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[85vh] p-2 bg-slate-950 border border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewPhotoUrl(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-red-600 transition-colors z-10 cursor-pointer"
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
                <span className="text-xs font-bold text-cyan-300">
                  🔍 Photo HD de la panne — Cliquez en dehors pour fermer
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Litige & Garantie Anti-Abus (Crédit de Remplacement 15 DH) */}
        {unreachableModalLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-slate-950 border border-amber-500/50 rounded-3xl max-w-md w-full p-4 sm:p-6 max-h-modal overflow-y-auto modal-scroll shadow-[0_0_30px_rgba(251,191,36,0.3)] space-y-4 text-slate-100"
            >
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  <h3 className="font-extrabold text-sm">Garantie Anti-Abus &amp; Crédit de Remplacement</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setUnreachableModalLead(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  Vous avez tenté de joindre <strong>{unreachableModalLead.client_name || 'le Client'}</strong> et le numéro est faux, injoignable ou la demande est annulée ?
                </p>
                <div className="text-[11px] text-amber-300/90 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 space-y-1">
                  <p className="font-bold flex items-center gap-1 text-amber-300">
                    <span>🛡️ Règles Métier Anti-Abus BricoleMoi :</span>
                  </p>
                  <p>• Signalement autorisé sous <strong>30 minutes maximum</strong> après déblocage.</p>
                  <p>• Compensation exclusive : <strong>1 Crédit de Remplacement (+15.00 DH)</strong> ajouté sur votre solde (aucun remboursement cash).</p>
                  <p>• Aucune compensation accordée si le chantier a déjà été validé/réalisé.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-300">Motif précis du signalement :</label>
                <select
                  value={unreachableReason}
                  onChange={(e) => setUnreachableReason(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                >
                  <option value="CLIENT_UNREACHABLE">📵 Client Injoignable (Ne décroche pas / Téléphone éteint)</option>
                  <option value="CLIENT_CANCELLED">❌ Client a Déjà Trouvé / Annulé son besoin</option>
                  <option value="WRONG_NUMBER">📍 Faux Numéro / Adresse Introuvable</option>
                  <option value="PRICE_DISAGREEMENT">💸 Désaccord Devis / Refus de Déplacement</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-cyan-500/20">
                <button
                  type="button"
                  onClick={() => setUnreachableModalLead(null)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reportUnreachableClient(unreachableModalLead.id, unreachableReason);
                    setUnreachableModalLead(null);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-all cursor-pointer"
                >
                  🛡️ Crédit de Remplacement (+15 DH)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
