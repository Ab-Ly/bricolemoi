import React from 'react';
import { useClientViewState } from './hooks/useClientViewState';
import { ClientActiveOngoingCard } from './components/ClientActiveOngoingCard';
import { ClientRadarSearchingCard } from './components/ClientRadarSearchingCard';
import { ClientSosForm } from './components/ClientSosForm';
import { ClientActiveRequestsList } from './components/ClientActiveRequestsList';
import { ClientHistoryList } from './components/ClientHistoryList';
import { ClientReviewCompletionModal } from './components/ClientReviewCompletionModal';
import { ClientPhoneRequirementModal } from './components/ClientPhoneRequirementModal';

export const ClientView = ({ initialCategory, initialCity, initialDistrict }) => {
  const client = useClientViewState({ initialCategory, initialCity, initialDistrict });

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-48 md:pb-24 px-3 sm:px-4">
      {/* 1. Intervention active en cours avec le Maâlem */}
      {client.activeOngoingSOS ? (
        <ClientActiveOngoingCard {...client} />
      ) : client.activePendingSOS ? (
        /* 2. Recherche radar en direct d'un Maâlem */
        <ClientRadarSearchingCard {...client} />
      ) : (
        /* 3. Formulaire de commande SOS */
        <ClientSosForm {...client} />
      )}

      {/* 4. Liste des demandes actives en cours */}
      <ClientActiveRequestsList {...client} />

      {/* 5. Historique des interventions terminées avec pagination */}
      <ClientHistoryList {...client} />

      {/* 6. Modales d'avis et de fin de chantier */}
      <ClientReviewCompletionModal {...client} />

      {/* 7. Modale numéro requis pour SOS */}
      <ClientPhoneRequirementModal {...client} />
    </div>
  );
};
