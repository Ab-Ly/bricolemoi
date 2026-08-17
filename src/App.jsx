import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { EmergencyFlowProvider, useEmergencyFlow } from './context/EmergencyFlowContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { ClientApp } from './layouts/ClientApp';
import { MaalemApp } from './layouts/MaalemApp';
import { AdminApp } from './layouts/AdminApp';
import { AuthModal } from './components/AuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { UserProfileModal } from './components/UserProfileModal';
import { useApp } from './context/AppContext';
import { useAblyNotifications } from './hooks/useAblyNotifications';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { getAppSubdomain, switchSubdomainInDev, APP_SUBDOMAINS } from './lib/subdomain';

const MainApp = () => {
  const { user, switchRole, setAuthModalOpen, profileModalOpen, setProfileModalOpen } = useAuth();
  const { acceptLead } = useApp();
  const { activeSosAlert, dismissSosAlert } = useAblyNotifications({ user });
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

  // Listen to popstate and custom bricolemoi_navigate events for instant 0ms SPA switching
  useEffect(() => {
    const handlePopState = () => {
      setActiveSubdomain(getAppSubdomain());
      const sp = new URLSearchParams(window.location.search);
      setNavParams({
        category: sp.get('category') || sp.get('service') || '',
        city: sp.get('city') || '',
        district: sp.get('district') || ''
      });
    };

    const handleCustomNavigate = (e) => {
      if (e.detail?.app) {
        setActiveSubdomain(e.detail.app);
      } else {
        setActiveSubdomain(getAppSubdomain());
      }
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
      <>
        <Toaster position="top-center" theme="dark" offset="16px" gap={10} visibleToasts={4} expand={false} />
        <ClientApp initialCategory={navParams.category} initialCity={navParams.city} initialDistrict={navParams.district} />
        <AuthModal />
        <AdminAuthModal />
        <UserProfileModal 
          isOpen={profileModalOpen} 
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
      </>
    );
  }

  if (activeSubdomain === APP_SUBDOMAINS.MAALEM) {
    return (
      <>
        <Toaster position="top-center" theme="dark" offset="16px" gap={10} visibleToasts={4} expand={false} />
        <MaalemApp />
        <AuthModal />
        <AdminAuthModal />
        <UserProfileModal 
          isOpen={profileModalOpen} 
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
      </>
    );
  }

  if (activeSubdomain === APP_SUBDOMAINS.ADMIN) {
    return (
      <>
        <Toaster position="top-center" theme="dark" offset="16px" gap={10} visibleToasts={4} expand={false} />
        <AdminApp />
        <AuthModal />
        <AdminAuthModal />
        <UserProfileModal 
          isOpen={profileModalOpen} 
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
      </>
    );
  }

  // Root Domain / Landing Page Layout
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Toaster position="top-center" theme="dark" offset="16px" gap={10} visibleToasts={4} expand={false} />

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

      {showPromptBanner && (
        <PWAInstallPrompt
          deferredPrompt={deferredPrompt}
          installPWA={installPWA}
          isInstalled={isInstalled}
          onClose={() => setShowPromptBanner(false)}
        />
      )}

      <footer className="hidden md:block border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-md py-8 text-center text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-cyan-400 text-sm tracking-tight drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
              BricoleMoi 🇲🇦
            </span>
            <span className="text-slate-400 font-medium">• Le 1er Réseau de Dépannage d'Urgence au Maroc</span>
          </div>
          <p className="text-slate-400">© 2026 BricoleMoi • Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir • Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <EmergencyFlowProvider>
          <MainApp />
        </EmergencyFlowProvider>
      </AppProvider>
    </AuthProvider>
  );
}
