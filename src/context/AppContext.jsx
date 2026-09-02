import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { notify } from '../lib/notify';
import { useAuth } from './AuthContext';
import { calculateDistanceInKm } from './app/helpers/appSyncHelpers';
import { usePlatformDataSync } from './app/hooks/usePlatformDataSync';
import { useInterventionsService } from './app/hooks/useInterventionsService';
import { useWalletTransactionsService } from './app/hooks/useWalletTransactionsService';
import { useReviewsLoyaltyService } from './app/hooks/useReviewsLoyaltyService';
import { useAdminService } from './app/hooks/useAdminService';

import { loadCacheWithFallback } from '../services/dataReconciliationService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // États globaux (Architecture Cache-First & Réconciliation Non-Destructive)
  const [interventions, setInterventions] = useState(() =>
    loadCacheWithFallback('bricolemoi_interventions_cache', [])
  );
  const [maalems, setMaalems] = useState(() =>
    loadCacheWithFallback('bricolemoi_maalems_cache', [])
  );
  const [clients, setClients] = useState(() =>
    loadCacheWithFallback('bricolemoi_clients_cache', [])
  );
  const [transactions, setTransactions] = useState(() =>
    loadCacheWithFallback('bricolemoi_transactions_cache', [])
  );
  const [reviews, setReviews] = useState(() =>
    loadCacheWithFallback('bricolemoi_reviews_cache', [])
  );

  const [adminNotifications, setAdminNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [whatsappMsg, setWhatsappMsg] = useState(null);
  const [adminAlerts, setAdminAlerts] = useState([]);
  const [loyaltyRewardsHistory, setLoyaltyRewardsHistory] = useState([]);

  const [isMaalemOnline, setIsMaalemOnline] = useState(() => {
    try {
      const saved = localStorage.getItem('bricolemoi_maalem_online');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    if (type === 'error') notify.error('Attention', msg);
    else if (type === 'info') notify.info('Information', msg);
    else if (type === 'warning') notify.warning('Alerte', msg);
    else notify.success('Succès', msg);
  };

  // 1. Synchronisation Temps Réel Plateforme (Centrifugo VPS + PocketBase)
  const platformSync = usePlatformDataSync({
    user,
    setUser,
    interventions,
    setInterventions,
    maalems,
    setMaalems,
    clients,
    setClients,
    transactions,
    setTransactions,
    reviews,
    setReviews,
    adminAlerts,
    setAdminAlerts,
    isMaalemOnline,
    setIsMaalemOnline,
    showToast,
    loyaltyRewardsHistory,
    setLoyaltyRewardsHistory
  });

  // 2. Service Portefeuille & Transactions
  const walletService = useWalletTransactionsService({
    user,
    setUser,
    interventions,
    transactions,
    setTransactions,
    maalems,
    setMaalems,
    showToast,
    userRef
  });

  // 3. Service Avis, Litiges & Fidélité 4x5★
  const reviewsLoyaltyService = useReviewsLoyaltyService({
    user,
    setUser,
    interventions,
    setInterventions,
    reviews,
    setReviews,
    maalems,
    setMaalems,
    setTransactions,
    adminAlerts,
    setAdminAlerts,
    loyaltyRewardsHistory,
    setLoyaltyRewardsHistory,
    showToast,
    confirmLeadDebit: walletService.confirmLeadDebit,
    quickCreditMaalem: walletService.quickCreditMaalem,
    userRef
  });

  // 4. Service Interventions SOS
  const interventionsService = useInterventionsService({
    user,
    setUser,
    interventions,
    setInterventions,
    maalems,
    setMaalems,
    transactions,
    setTransactions,
    showToast,
    reserveLeadCredit: walletService.reserveLeadCredit,
    confirmLeadDebit: walletService.confirmLeadDebit,
    releaseLeadCredit: walletService.releaseLeadCredit,
    quickCreditMaalem: walletService.quickCreditMaalem,
    setAdminAlerts
  });

  // 5. Service Administrateur & Conformité CIN
  const adminService = useAdminService({
    user,
    setUser,
    maalems,
    setMaalems,
    clients,
    setClients,
    interventions,
    setInterventions,
    transactions,
    setTransactions,
    adminNotifications,
    setAdminNotifications,
    reviews,
    setReviews,
    adminAlerts,
    setAdminAlerts,
    showToast,
    setWhatsappMsg
  });

  return (
    <AppContext.Provider
      value={{
        interventions,
        setInterventions,
        maalems,
        setMaalems,
        clients,
        setClients,
        transactions,
        setTransactions,
        reviews,
        setReviews,
        adminAlerts,
        setAdminAlerts,
        adminNotifications,
        toastMessage,
        whatsappMsg,
        setWhatsappMsg,
        showToast,
        isMaalemOnline,
        calculateDistanceInKm,
        loyaltyRewardsHistory,
        setLoyaltyRewardsHistory,
        refreshData: platformSync.fetchRealSupabaseData,
        toggleMaalemOnlineStatus: platformSync.toggleMaalemOnlineStatus,
        isRealtimeConnected: platformSync.isAblyConnected,
        realtimeConnectionState: platformSync.ablyConnectionState,
        onlineMaalemsCount: platformSync.ablyOnlineMaalemsCount,
        onlineMaalems: platformSync.ablyOnlineMaalems,
        isAblyConnected: platformSync.isAblyConnected,
        ablyConnectionState: platformSync.ablyConnectionState,
        ablyOnlineMaalemsCount: platformSync.ablyOnlineMaalemsCount,
        ablyOnlineMaalems: platformSync.ablyOnlineMaalems,
        isAblyConfigured: platformSync.isAblyConfigured,
        ...interventionsService,
        ...walletService,
        ...reviewsLoyaltyService,
        ...adminService
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export { AppContext };
