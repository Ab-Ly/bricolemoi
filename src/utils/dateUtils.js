/**
 * Utilitaire de formatage standardisé Date & Heure pour l'ensemble de l'application BricoleMoi.
 * Garantit un affichage précis (Jour/Mois/Année à Heure:Minute) dans tous les historiques.
 */

export const formatDateTime = (dateInput, formatType = 'standard') => {
  if (!dateInput) return 'Date non renseignée';

  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'Date invalide';

    if (formatType === 'long') {
      // Ex: "27 août 2026 à 11:30"
      const dateStr = d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const timeStr = d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateStr} à ${timeStr}`;
    }

    // Ex: "27/08/2026 à 11:30"
    const dateStr = d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeStr = d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr} à ${timeStr}`;
  } catch (err) {
    return String(dateInput);
  }
};

export const formatDateOnly = (dateInput) => {
  if (!dateInput) return '';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return '';
  }
};

export const formatTimeOnly = (dateInput) => {
  if (!dateInput) return '';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return '';
  }
};
