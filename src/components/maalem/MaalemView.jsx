import React from 'react';
import { Compass, MapPin } from 'lucide-react';
import { useMaalemViewState } from './hooks/useMaalemViewState';
import { MaalemWelcomeWhatsAppBanner } from './components/MaalemWelcomeWhatsAppBanner';
import { MaalemRadarHeader } from './components/MaalemRadarHeader';
import { MaalemLoyaltyGaugeCard } from './components/MaalemLoyaltyGaugeCard';
import { MaalemActiveMissionCard } from './components/MaalemActiveMissionCard';
import { MaalemLeadsFeed } from './components/MaalemLeadsFeed';
import { MaalemWalletModal } from './components/MaalemWalletModal';
import { MaalemTransactionsModal } from './components/MaalemTransactionsModal';
import { MaalemUnfeasibleModal } from './components/MaalemUnfeasibleModal';
import { MaalemPhotoPreviewModal } from './components/MaalemPhotoPreviewModal';
import { InteractiveMap } from '../InteractiveMap';

export const MaalemView = ({ onOpenCINVerification }) => {
  const maalem = useMaalemViewState({ onOpenCINVerification });
  const hasActiveMissions = maalem.activeUnlockedLeads.length > 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-32 md:pb-16 font-sans px-3 sm:px-4 pb-safe">
      {/* 1. Message de Bienvenue WhatsApp Automatique */}
      <MaalemWelcomeWhatsAppBanner {...maalem} />

      {/* 2. Priorité 1 : Missions Actives Débloquées (Au sommet dès qu'un lead est actif) */}
      {hasActiveMissions && <MaalemActiveMissionCard {...maalem} />}

      {/* 3. En-Tête Radar, Solde et Statut EN LIGNE */}
      <MaalemRadarHeader {...maalem} onOpenCINVerification={onOpenCINVerification} />

      {/* 4. Carte Jauge Fidélité : 4 Avis (≥4★) = 5ème Lead OFFERT */}
      <MaalemLoyaltyGaugeCard {...maalem} />

      {/* 5. Carte Radar Interactive d'Urgence */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 font-sans">
            <Compass className="w-5 h-5 text-blue-600 animate-spin-slow" />
            Carte Radar d'Urgence (Position GPS Réelle)
          </h3>
          <span className="text-xs text-slate-700 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>
              Pos: {maalem.maalemPos[0].toFixed(4)}, {maalem.maalemPos[1].toFixed(4)}
            </span>
          </span>
        </div>

        <div
          id="maalem-radar-map"
          className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden bg-white"
        >
          <InteractiveMap
            mode="MAALEM_RADAR"
            selectedLat={
              maalem.focusedMapCoords ? maalem.focusedMapCoords[0] : maalem.maalemPos[0]
            }
            selectedLng={
              maalem.focusedMapCoords ? maalem.focusedMapCoords[1] : maalem.maalemPos[1]
            }
          />
        </div>
      </div>

      {/* 5. Flux des Demandes d'Urgence SOS Disponibles & Historique Clôturé */}
      <MaalemLeadsFeed {...maalem} />

      {/* 6. Modales : Recharge de Solde, Historique des Transactions, Abandon Escrow, Zoom HD */}
      <MaalemWalletModal {...maalem} />
      <MaalemTransactionsModal {...maalem} />
      <MaalemUnfeasibleModal {...maalem} />
      <MaalemPhotoPreviewModal {...maalem} />
    </div>
  );
};
