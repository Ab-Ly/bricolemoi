import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { EmergencyFlowProvider, useEmergencyFlow } from './context/EmergencyFlowContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { useApp } from './context/AppContext';
import { useRealtimeNotifications } from './hooks/useRealtimeNotifications';
import { getAppSubdomain, switchSubdomainInDev, APP_SUBDOMAINS } from './lib/subdomain';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { initRemoteTelemetry, sendTerminalLog } from './lib/remoteLogger';

import { lazyWithRetry } from './utils/lazyWithRetry';

// Code Splitting & Lazy-loaded Sub-Apps
const ClientApp = lazyWithRetry(() => import('./layouts/ClientApp'));
const MaalemApp = lazyWithRetry(() => import('./layouts/MaalemApp'));
const AdminApp = lazyWithRetry(() => import('./layouts/AdminApp'));
const ITApp = lazyWithRetry(() => import('./layouts/ITApp').then((m) => ({ default: m.ITApp })));

// Élégant composant de chargement pour les transitions SPA instantanées
const AppLoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
    <div className="relative flex items-center justify-center mb-4">
      <div className="w-12 h-12 rounded-2xl bg-blue-600 animate-pulse flex items-center justify-center shadow-lg shadow-blue-500/30">
        <span className="text-white font-black text-xl">B</span>
      </div>
      <div className="absolute -inset-2 rounded-3xl border-2 border-blue-500/20 animate-spin" style={{ animationDuration: '3s' }} />
    </div>
    <p className="text-sm font-extrabold text-slate-800 tracking-tight">BricoleMoi 🇲🇦</p>
    <p className="text-xs text-slate-500 font-medium mt-1">Chargement de votre espace...</p>
  </div>
);

const MainApp = () => {
  const { user, switchRole, setAuthModalOpen, profileModalOpen, setProfileModalOpen, profileModalInitialTab } = useAuth();
  const { acceptLead } = useApp();
  const { activeSosAlert, dismissSosAlert } = useRealtimeNotifications({ user });
  const { incomingAlert, acceptSOS, dismissAlert } = useEmergencyFlow();
  
  // Reactive Subdomain & Navigation State
  const [activeSubdomain, setActiveSubdomain] = useState(() => getAppSubdomain());
  const [navParams, setNavParams] = useState(() => {
    if (typeof window === 'undefined') return {};
    const searchParams = new URLSearchParams(window.location.search);
    return {
      category: searchParams.get('category') || searchParams.get('service') || '',
      city: searchParams.get('city') || '',
      district: searchParams.get('district') || ''
    };
  });

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPromptBanner, setShowPromptBanner] = useState(true);

  // 1. Initialize Remote Live Console & Telemetry Bridge
  useEffect(() => {
    initRemoteTelemetry();
  }, []);

  // Listen to popstate and custom bricolemoi_navigate events for instant 0ms SPA switching
  useEffect(() => {
    const handlePopState = () => {
      const newSub = getAppSubdomain();
      setActiveSubdomain(newSub);
      sendTerminalLog('ACTION', 'NAVIGATE', `Navigation vers le portail ${newSub}`);
      const sp = new URLSearchParams(window.location.search);
      setNavParams({
        category: sp.get('category') || sp.get('service') || '',
        city: sp.get('city') || '',
        district: sp.get('district') || ''
      });
    };

    const handleCustomNavigate = (e) => {
      const targetApp = e.detail?.app || getAppSubdomain();
      setActiveSubdomain(targetApp);
      sendTerminalLog('ACTION', 'NAVIGATE', `Changement d'espace vers ${targetApp}`);
      if (e.detail?.params) {
        setNavParams(e.detail.params);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('bricolemoi_navigate', handleCustomNavigate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('bricolemoi_navigate', handleCustomNavigate);
    };
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const handleSelectJourney = (journey, params = {}) => {
    if (journey === 'CLIENT') {
      switchRole('CLIENT');
      switchSubdomainInDev('CLIENT', params);
    } else if (journey === 'MAALEM') {
      switchRole('MAALEM');
      if (!user || user.role !== 'MAALEM') {
        setAuthModalOpen(true);
      }
      switchSubdomainInDev('MAALEM', params);
    }
  };

  // Render 100% Dedicated Subdomain Layouts without Dev Toolbar
  if (activeSubdomain === APP_SUBDOMAINS.CLIENT) {
    return (
      <ErrorBoundary name="ClientAppRoot">
        <Suspense fallback={<AppLoadingFallback />}>
          <Toaster 
            position="top-center" 
            theme="light" 
            offset="16px" 
            gap={10} 
            visibleToasts={3} 
            expand={false} 
            closeButton
            toastOptions={{
              style: {
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                borderRadius: '1.25rem',
                padding: '0.85rem 1.15rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.04)'
              }
            }}
          />
          <ClientApp initialCategory={navParams.category} initialCity={navParams.city} initialDistrict={navParams.district} />
          <AuthModal />
          <AdminAuthModal />
          <UserProfileModal 
            isOpen={profileModalOpen} 
            initialTab={profileModalInitialTab}
            onClose={() => setProfileModalOpen(false)} 
            onLoggedOut={() => switchSubdomainInDev('LANDING')}
          />
          <EmergencySOSModal 
            alert={activeSosAlert} 
            onAccept={async (id) => {
              await acceptLead(id);
              dismissSosAlert();
            }} 
            onDismiss={dismissSosAlert} 
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (activeSubdomain === APP_SUBDOMAINS.MAALEM) {
    return (
      <ErrorBoundary name="MaalemAppRoot">
        <Suspense fallback={<AppLoadingFallback />}>
          <Toaster 
            position="top-center" 
            theme="light" 
            offset="16px" 
            gap={10} 
            visibleToasts={3} 
            expand={false} 
            closeButton
            toastOptions={{
              style: {
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                borderRadius: '1.25rem',
                padding: '0.85rem 1.15rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.04)'
              }
            }}
          />
          <MaalemApp />
          <AuthModal />
          <AdminAuthModal />
          <UserProfileModal 
            isOpen={profileModalOpen} 
            initialTab={profileModalInitialTab}
            onClose={() => setProfileModalOpen(false)} 
            onLoggedOut={() => switchSubdomainInDev('LANDING')}
          />
          <EmergencySOSModal 
            alert={activeSosAlert} 
            onAccept={async (id) => {
              await acceptLead(id);
              dismissSosAlert();
            }} 
            onDismiss={dismissSosAlert} 
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (activeSubdomain === APP_SUBDOMAINS.ADMIN) {
    return (
      <ErrorBoundary name="AdminAppRoot">
        <Suspense fallback={<AppLoadingFallback />}>
          <Toaster 
            position="top-center" 
            theme="light" 
            offset="16px" 
            gap={10} 
            visibleToasts={3} 
            expand={false} 
            closeButton
            toastOptions={{
              style: {
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                borderRadius: '1.25rem',
                padding: '0.85rem 1.15rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.04)'
              }
            }}
          />
          <AdminApp />
          <AuthModal />
          <AdminAuthModal />
          <UserProfileModal 
            isOpen={profileModalOpen} 
            initialTab={profileModalInitialTab}
            onClose={() => setProfileModalOpen(false)} 
            onLoggedOut={() => switchSubdomainInDev('LANDING')}
          />
          <EmergencySOSModal 
            alert={activeSosAlert} 
            onAccept={async (id) => {
              await acceptLead(id);
              dismissSosAlert();
            }} 
            onDismiss={dismissSosAlert} 
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (activeSubdomain === APP_SUBDOMAINS.IT) {
    return (
      <ErrorBoundary name="ITAppRoot">
        <Suspense fallback={<AppLoadingFallback />}>
          <Toaster 
            position="top-right" 
            theme="dark" 
            offset="16px" 
            gap={10} 
            visibleToasts={4} 
            expand={false} 
            closeButton
          />
          <ITApp />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Root Domain / Landing Page Layout
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Toaster 
        position="top-center" 
        theme="light" 
        offset="16px" 
        gap={10} 
        visibleToasts={3} 
        expand={false} 
        closeButton
        toastOptions={{
          style: {
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            borderRadius: '1.25rem',
            padding: '0.85rem 1.15rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#0f172a',
            boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.04)'
          }
        }}
      />

      <Navbar
        appMode="LANDING"
        deferredPrompt={deferredPrompt}
        installPWA={installPWA}
        isInstalled={isInstalled}
        onGoHome={() => switchSubdomainInDev('LANDING')}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        <LandingPage onSelectJourney={handleSelectJourney} />
      </main>

      <BottomNav 
        activeView="LANDING" 
        onChangeView={(view) => switchSubdomainInDev(view)}
      />

      <AuthModal />
      <AdminAuthModal />
      <UserProfileModal 
        isOpen={profileModalOpen} 
        initialTab={profileModalInitialTab}
        onClose={() => setProfileModalOpen(false)} 
        onLoggedOut={() => switchSubdomainInDev('LANDING')}
      />
      <EmergencySOSModal 
        alert={incomingAlert || activeSosAlert} 
        onAccept={async (id) => {
          await acceptSOS(id);
          dismissSosAlert();
        }} 
        onDismiss={() => {
          dismissAlert();
          dismissSosAlert();
        }} 
      />

      <footer className="hidden md:block border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-blue-600 text-sm tracking-tight">
              BricoleMoi 🇲🇦
            </span>
            <span className="text-slate-500 font-medium">• Le 1er Réseau de Dépannage d'Urgence au Maroc</span>
          </div>
          <p className="text-slate-500">© 2026 BricoleMoi • Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir • Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary name="RootApplication">
      <AuthProvider>
        <AppProvider>
          <EmergencyFlowProvider>
            <MainApp />
          </EmergencyFlowProvider>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
