import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { switchSubdomainInDev } from '../lib/subdomain';
import { 
  Wrench, 
  Globe, 
  Download,
  Zap,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { 
  LockKey, 
  Coins, 
  CheckCircle, 
  WarningCircle, 
  SignOut, 
  ShieldCheck as PhosphorShieldCheck, 
  User as PhosphorUser,
  WhatsappLogo
} from '@phosphor-icons/react';

import { calculateMaalemBalance } from '../utils/balanceUtils';

export const Navbar = ({ deferredPrompt, installPWA, isInstalled, onGoHome, appMode = 'CLIENT' }) => {
  const { 
    lang, 
    toggleLanguage, 
    t, 
    user, 
    setAuthModalOpen, 
    setProfileModalOpen, 
    logout 
  } = useAuth();
  const isAr = lang === 'ar';
  const { refreshData, maalems, transactions, isAblyConnected, isAblyConfigured } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const balanceInfo = calculateMaalemBalance(user, transactions, maalems);
  const liveCreditBalance = balanceInfo.liveAvailableBalance;

  const handleRefresh = async () => {
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { switchSubdomainInDev } from '../lib/subdomain';
import { 
  Wrench, 
  Globe, 
  Download,
  Zap,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { 
  LockKey, 
  Coins, 
  CheckCircle, 
  WarningCircle, 
  SignOut, 
  ShieldCheck as PhosphorShieldCheck, 
  User as PhosphorUser,
  WhatsappLogo
} from '@phosphor-icons/react';

import { calculateMaalemBalance } from '../utils/balanceUtils';

export const Navbar = ({ deferredPrompt, installPWA, isInstalled, onGoHome, appMode = 'CLIENT' }) => {
  const { 
    lang, 
    toggleLanguage, 
    t, 
    user, 
    setAuthModalOpen, 
    setProfileModalOpen, 
    logout 
  } = useAuth();
  const isAr = lang === 'ar';
  const { refreshData, maalems, transactions, isAblyConnected, isAblyConfigured } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const balanceInfo = calculateMaalemBalance(user, transactions, maalems);
  const liveCreditBalance = balanceInfo.liveAvailableBalance;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <header dir={isAr ? 'rtl' : 'ltr'} className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs ${isAr ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Ticker Bar (100% Full Width Wrapper) */}
      <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto py-1 px-2.5 sm:px-6 text-xs font-medium flex justify-between items-center gap-1.5">
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block flex-shrink-0" />
            <span className="text-slate-200 font-bold truncate text-[10px] sm:text-xs">
              {appMode === 'MAALEM'
                ? (isAr ? 'رادار طوارئ المعلّم 24/7' : 'Radar SOS Maalem Pro 24/7')
                : appMode === 'ADMIN'
                ? (isAr ? 'منصة الإدارة بريكول موي' : 'Plateforme Admin BricoleMoi')
                : (isAr ? 'ديباناج فوري بالمغرب 24/7' : 'SOS Dépannage Express Maroc 24/7')}
            </span>
            {isAblyConfigured && (
              <span className="hidden md:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-emerald-400">
                <span className={`w-1.5 h-1.5 rounded-full ${isAblyConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {isAblyConnected ? (isAr ? 'مباشر' : 'En direct') : (isAr ? 'جاري الاتصال...' : 'Reconnexion...')}
              </span>
            )}
          </span>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <a
              href="https://wa.me/212619184098"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-[10px] sm:text-[11px] group cursor-pointer"
            >
              <WhatsappLogo weight="fill" className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-bold hidden md:inline">WhatsApp :</span>
              <strong className="text-emerald-400 font-mono font-bold tracking-wider" dir="ltr">+212 619 18 40 98</strong>
            </a>

            <motion.button 
              whileTap={{ scale: 0.90 }}
              onClick={toggleLanguage}
              className="bg-slate-800 hover:bg-slate-700 px-2 sm:px-2.5 py-0.5 rounded-lg text-slate-200 border border-slate-700 flex items-center gap-1 transition-all text-[10px] sm:text-[11px] font-bold active:scale-90 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span>{lang === 'fr' ? 'عربي' : 'FR'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand / Logo */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group min-w-0 flex-shrink-0" 
          onClick={onGoHome}
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border ${
            appMode === 'MAALEM' ? 'bg-amber-500 text-white border-amber-600 shadow-sm' :
            appMode === 'ADMIN' ? 'bg-purple-600 text-white border-purple-700 shadow-sm' :
            'bg-blue-600 text-white border-blue-700 shadow-sm'
          } flex items-center justify-center font-black text-base sm:text-xl transition-all flex-shrink-0`}>
            {appMode === 'MAALEM' ? <Wrench className="w-4 h-4 sm:w-5 sm:h-5" /> : appMode === 'ADMIN' ? <PhosphorShieldCheck weight="duotone" className="w-4 h-4 sm:w-5 sm:h-5" /> : <Zap className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-none truncate">
                Bricole<span className={
                  appMode === 'MAALEM' ? 'text-amber-600' :
                  appMode === 'ADMIN' ? 'text-purple-600' :
                  'text-blue-600'
                }>Moi</span>
              </h1>
              <span className={`text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full border ${
                appMode === 'MAALEM' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                appMode === 'ADMIN' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                appMode === 'CLIENT' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                'bg-slate-100 text-slate-800 border-slate-200'
              }`}>
                {appMode === 'MAALEM' ? (isAr ? 'حرفي' : 'PRO') : appMode === 'ADMIN' ? 'ADMIN' : appMode === 'CLIENT' ? (isAr ? 'زبون' : 'CLIENT') : 'MAROC 🇲🇦'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 truncate hidden sm:block">
              {appMode === 'MAALEM' ? (isAr ? 'بوابة الحرفيين والديباناج' : 'Portail Artisans & Dépannage') : appMode === 'ADMIN' ? (isAr ? 'لوحة تحكم الإدارة' : 'Dashboard Administration') : appMode === 'CLIENT' ? (isAr ? 'فضاء الزبون للديباناج' : 'Espace Client Dépannage') : (isAr ? 'ديباناج سريع 24/7' : 'Dépannage d\'Urgence Express 24h/7j')}
            </p>
          </div>
        </motion.div>

        {/* Dynamic Dedicated Header Actions */}
        <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
          {/* 1. CLIENT HEADER ACTIONS */}
          {appMode === 'CLIENT' && (
            <>
              {/* Back to Home / Landing Button */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={() => switchSubdomainInDev('LANDING')}
                className="hidden sm:inline-flex h-9 sm:h-11 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-bold px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-slate-300 items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                title={isAr ? 'الرجوع للرئيسية' : 'Retour à l\'accueil'}
              >
                <span>{isAr ? '→' : '←'}</span>
                <span className="hidden sm:inline">{isAr ? 'الرئيسية' : 'Accueil'}</span>
              </motion.button>

              {deferredPrompt && !isInstalled && (
                <motion.button
                  whileTap={{ scale: 0.90 }}
                  onClick={installPWA}
                  className="hidden sm:inline-flex h-9 sm:h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl items-center gap-1.5 transition-all shadow-sm active:scale-90"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>{t('pwa_install')}</span>
                </motion.button>
              )}

              {user ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileModalOpen(true)}
                    className="h-9 sm:h-11 flex items-center gap-1.5 sm:gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 px-2 sm:px-3 rounded-xl sm:rounded-2xl shadow-xs transition-all cursor-pointer"
                    title={isAr ? 'حسابي' : 'Mon Compte Client'}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1.5 ring-white" />
                    </div>
                    <div className={`flex flex-col justify-center leading-none ${isAr ? 'text-right' : 'text-left'}`}>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-none max-w-[70px] sm:max-w-[120px] truncate">
                        {user.full_name?.split(' ')[0] || (isAr ? 'الزبون' : 'Client')}
                      </p>
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold mt-0.5 leading-none flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" /> {isAr ? 'متصل' : 'En Ligne'}
                      </span>
                    </div>
                  </motion.button>

                  {/* Deconnexion Button Client */}
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => logout()}
                    className="h-9 w-9 sm:w-auto sm:h-11 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 p-0 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex-shrink-0 touch-target-44"
                    title={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                    aria-label={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                  >
                    <SignOut weight="bold" className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="hidden sm:inline">{isAr ? 'خروج' : 'Déconnexion'}</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setAuthModalOpen(true)}
                  className="h-9 sm:h-11 bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 text-[11px] sm:text-xs font-bold px-2.5 sm:px-4 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-slate-300 flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <PhosphorUser weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  <span>{isAr ? 'دخول / تسجيل' : 'Connexion'}<span className="hidden sm:inline">{isAr ? '' : ' / S\'inscrire'}</span></span>
                </motion.button>
              )}
            </>
          )}

          {/* 2. MAALEM HEADER ACTIONS */}
          {appMode === 'MAALEM' && (
            <>
              {/* Back to Home / Landing Button */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={() => switchSubdomainInDev('LANDING')}
                className="hidden sm:inline-flex h-9 sm:h-11 bg-white hover:bg-slate-50 text-slate-700 hover:text-amber-600 text-xs font-bold px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-slate-300 items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                title={isAr ? 'الرجوع للرئيسية' : 'Retour à l\'accueil'}
              >
                <span>{isAr ? '→' : '←'}</span>
                <span className="hidden sm:inline">{isAr ? 'الرئيسية' : 'Accueil'}</span>
              </motion.button>

              {user ? (
                <>
                  {/* Credit Balance Badge */}
                  <div className="h-9 sm:h-11 flex items-center gap-1 sm:gap-1.5 bg-amber-50 border border-amber-200 px-2 sm:px-3 rounded-xl sm:rounded-2xl text-xs font-bold text-amber-900 shadow-xs flex-shrink-0">
                    <Coins weight="duotone" className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="text-slate-900 font-mono font-black text-xs">
                      {liveCreditBalance.toFixed(0)} <span className="text-amber-600 text-[10px]">{t.dh}</span>
                    </span>
                  </div>

                  {/* User Profile & Pro Badge Card */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setProfileModalOpen(true)}
                      className="h-9 sm:h-11 flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl shadow-xs transition-all cursor-pointer"
                      title={isAr ? 'بروفايل الحرفي' : 'Mon Profil Artisan'}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                          {user.full_name?.charAt(0) || 'M'}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500 ring-1.5 ring-white" />
                      </div>

                      <div className={`flex flex-col justify-center leading-none ${isAr ? 'text-right' : 'text-left'}`}>
                        <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-none max-w-[65px] sm:max-w-[120px] truncate">
                          {user.full_name?.split(' ')[0] || (isAr ? 'المعلّم' : 'Maâlem')}
                        </p>
                        <span className="text-[9px] sm:text-[10px] text-emerald-700 font-extrabold mt-0.5 leading-none flex items-center gap-0.5">
                          <CheckCircle weight="fill" className="w-2.5 h-2.5 text-emerald-600 inline-block" /> {isAr ? 'حرفي معتمد' : 'Pro'}
                        </span>
                      </div>
                    </motion.button>

                    {/* Deconnexion Button Maalem */}
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      onClick={() => logout()}
                      className="h-9 w-9 sm:w-auto sm:h-11 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 p-0 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex-shrink-0 touch-target-44"
                      title={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                      aria-label={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                    >
                      <SignOut weight="bold" className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="hidden sm:inline">{isAr ? 'خروج' : 'Déconnexion'}</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => setAuthModalOpen(true)}
                    className="h-9 sm:h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs px-3 sm:px-4 rounded-xl sm:rounded-2xl flex items-center gap-1.5 transition-all shadow-sm active:scale-90 cursor-pointer"
                  >
                    <PhosphorUser weight="bold" className="w-4 h-4 text-white" />
                    <span>{isAr ? 'فضاء الحرفيين • دخول' : 'Espace Pro'}<span className="hidden xs:inline">{isAr ? '' : ' • Connexion'}</span></span>
                  </motion.button>
                </div>
              )}
            </>
          )}

          {/* 3. ADMIN HEADER ACTIONS */}
          {appMode === 'ADMIN' && (
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="h-9 sm:h-11 hidden sm:inline-flex items-center gap-1.5 px-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold shadow-xs">
                <LockKey weight="duotone" className="w-4 h-4 text-purple-600" />
                <span>{isAr ? 'دخول محمي' : 'Accès Protégé'}</span>
              </span>
              {/* Bouton Rafraîchir données Supabase */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="h-9 w-9 sm:w-auto sm:h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 p-0 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                title={isAr ? 'تحديث البيانات' : 'Rafraîchir les données depuis Supabase'}
                aria-label={isAr ? 'تحديث' : 'Rafraîchir'}
              >
                <RefreshCw className={`w-4 h-4 text-blue-600 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? (isAr ? 'جاري التحميل...' : 'Chargement...') : (isAr ? 'تحديث' : 'Rafraîchir')}</span>
              </motion.button>
              {/* Bouton Quitter Admin */}
              <motion.button
                whileTap={{ scale: 0.90 }}
                onClick={() => {
                  sessionStorage.removeItem('bricolemoi_admin_pin_ok');
                  logout(() => {
                    switchSubdomainInDev('LANDING');
                  });
                }}
                className="h-9 w-9 sm:w-auto sm:h-11 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 p-0 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                title={isAr ? 'مغادرة الإدارة' : 'Quitter le Dashboard Admin'}
                aria-label={isAr ? 'مغادرة الإدارة' : 'Quitter le Dashboard Admin'}
              >
                <SignOut weight="bold" className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="hidden sm:inline">{isAr ? 'مغادرة الإدارة' : 'Quitter Admin'}</span>
              </motion.button>
            </div>
          )}

          {/* 4. LANDING ROOT HEADER ACTIONS */}
          {appMode === 'LANDING' && (
            <div className="flex items-center gap-1 sm:gap-2.5">
              {/* Direct Quick Link to Client SOS */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => switchSubdomainInDev('CLIENT')}
                className="hidden md:inline-flex h-10 sm:h-11 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-extrabold px-3.5 sm:px-4 rounded-2xl items-center gap-2 transition-all shadow-xs cursor-pointer group"
                title={isAr ? 'طلب تدخل استعجالي' : 'Demander une intervention d\'urgence'}
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="tracking-tight">{isAr ? 'طوارئ SOS' : 'SOS Urgence'}</span>
              </motion.button>

              {/* Direct Quick Link to Maalem Pro */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => switchSubdomainInDev('MAALEM')}
                className="hidden md:inline-flex h-10 sm:h-11 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-extrabold px-3.5 sm:px-4 rounded-2xl items-center gap-2.5 transition-all shadow-xs cursor-pointer group"
                title={isAr ? 'فضاء الحرفيين والمهنيين' : 'Espace Artisans & Professionnels'}
              >
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <span className="tracking-tight hidden lg:inline">{isAr ? 'فضاء المعلّم' : 'Espace Maâlem'}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-mono text-[10px] font-black">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  {isAr ? '+15 درهم كادو' : '+15 DH Offerts'}
                </span>
              </motion.button>

              {user ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileModalOpen(true)}
                    className="h-9 sm:h-11 flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl shadow-xs transition-all cursor-pointer"
                    title={isAr ? 'بروفايلي' : 'Mon Profil'}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl text-white flex items-center justify-center font-extrabold text-xs ${
                        user.role === 'MAALEM' ? 'bg-gradient-to-tr from-amber-500 to-amber-600' : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                      }`}>
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1.5 ring-white" />
                    </div>
                    <div className={`flex flex-col justify-center leading-none ${isAr ? 'text-right' : 'text-left'}`}>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-none max-w-[70px] sm:max-w-[120px] truncate">
                        {user.full_name?.split(' ')[0] || (isAr ? 'حسابي' : 'Mon Compte')}
                      </p>
                      <span className="text-[9px] text-blue-600 font-semibold mt-0.5 leading-none">
                        {user.role === 'MAALEM' ? (isAr ? 'فضاء الحرفي' : 'Espace Pro') : (isAr ? 'زبون' : 'Client')}
                      </span>
                    </div>
                  </motion.button>

                  {/* Deconnexion Button Landing */}
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    onClick={() => logout()}
                    className="h-9 w-9 sm:w-auto sm:h-11 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 p-0 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex-shrink-0 touch-target-44"
                    title={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                    aria-label={isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}
                  >
                    <SignOut weight="bold" className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="hidden sm:inline">{isAr ? 'خروج' : 'Déconnexion'}</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setAuthModalOpen(true)}
                  className="h-9 sm:h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-3 sm:px-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <PhosphorUser weight="bold" className="w-4 h-4 text-white" />
                  <span>{isAr ? 'دخول / فتح حساب' : 'Connexion'}<span className="hidden sm:inline">{isAr ? '' : ' / S\'inscrire'}</span></span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
