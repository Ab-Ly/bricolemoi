import { pb, toPbId, generatePbId, isPocketBaseConfigured } from './pocketbaseClient';

/**
 * Service de persistance et de synchronisation temps réel basé sur PocketBase
 * Architecture : Client - Maâlem - Admin (Zéro Donnée Forcée)
 * Standardisation totale sur l'identifiant natif PocketBase (15 caractères alphanumériques)
 */

export const dbService = {
  // --- PROFILES ---
  async getProfiles() {
    try {
      const records = await pb.collection('profiles').getFullList({ sort: '-created' });
      return records.map((r) => ({
        ...r,
        id: r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getProfiles:', err);
      return [];
    }
  },

  async getProfileByPhone(phone) {
    if (!phone) return null;
    try {
      const record = await pb.collection('profiles').getFirstListItem(`phone = "${phone}"`);
      return { ...record, id: record.id };
    } catch (err) {
      return null;
    }
  },

  async getProfileById(id) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const r = await pb.collection('profiles').getOne(pbId);
      return { ...r, id: r.id };
    } catch (err) {
      return null;
    }
  },

  async upsertProfile(profile) {
    if (!profile) return null;
    const pbId = profile.id ? toPbId(profile.id) : generatePbId();

    const payload = {
      phone: profile.phone,
      role: profile.role ? String(profile.role).toUpperCase() : undefined,
      full_name: profile.full_name || profile.name,
      city_zone: profile.city_zone || profile.city,
      district: profile.district,
      credits: profile.credits !== undefined ? Number(profile.credits) : undefined,
      pin_hash: profile.pin_hash,
      is_suspended: profile.is_suspended !== undefined ? Boolean(profile.is_suspended) : undefined,
      avatar_url: profile.avatar_url,
      updated_at_original: new Date().toISOString()
    };

    // Nettoyage des champs undefined
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      try {
        const updated = await pb.collection('profiles').update(pbId, payload);
        return { ...updated, id: updated.id };
      } catch (notFound) {
        const created = await pb.collection('profiles').create({ id: pbId, ...payload });
        return { ...created, id: created.id };
      }
    } catch (err) {
      console.error('[PocketBase] Échec upsertProfile:', err);
      return null;
    }
  },

  async updateProfile(id, fields) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const updated = await pb.collection('profiles').update(pbId, fields);
      return { ...updated, id: updated.id };
    } catch (err) {
      console.error('[PocketBase] Échec updateProfile:', err);
      return null;
    }
  },

  // --- MAALEM DETAILS ---
  async getMaalemDetailsList() {
    try {
      const records = await pb.collection('maalem_details').getFullList();
      return records.map((r) => ({
        ...r,
        id: r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getMaalemDetailsList:', err);
      return [];
    }
  },

  async getMaalemDetailsById(id) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const r = await pb.collection('maalem_details').getOne(pbId);
      return { ...r, id: r.id };
    } catch (err) {
      return null;
    }
  },

  async upsertMaalemDetails(details) {
    if (!details) return null;
    const pbId = details.id ? toPbId(details.id) : generatePbId();

    const payload = {
      specialty: details.specialty,
      specialties: details.specialties || [],
      cin_number: details.cin_number,
      cin_photo_url: details.cin_photo_url,
      cin_photo_recto_url: details.cin_photo_recto_url,
      cin_photo_verso_url: details.cin_photo_verso_url,
      cin_verified: details.cin_verified !== undefined ? Boolean(details.cin_verified) : undefined,
      cin_rejection_reason: details.cin_rejection_reason,
      credit_balance: details.credit_balance !== undefined ? Number(details.credit_balance) : undefined,
      is_verified: details.is_verified !== undefined ? Boolean(details.is_verified) : undefined,
      rating_avg: details.rating_avg !== undefined ? Number(details.rating_avg) : undefined,
      total_reviews: details.total_reviews !== undefined ? Number(details.total_reviews) : undefined,
      consecutive_five_stars: details.consecutive_five_stars !== undefined ? Number(details.consecutive_five_stars) : undefined,
      hundred_dh_recharges_count: details.hundred_dh_recharges_count !== undefined ? Number(details.hundred_dh_recharges_count) : undefined,
      lat: details.lat !== undefined ? Number(details.lat) : undefined,
      lng: details.lng !== undefined ? Number(details.lng) : undefined,
      is_online: details.is_online !== undefined ? Boolean(details.is_online) : undefined,
      is_available: details.is_available !== undefined ? Boolean(details.is_available) : undefined,
      status: details.status,
      bio: details.bio,
      portfolio_urls: details.portfolio_urls || [],
      last_seen_at: details.last_seen_at || new Date().toISOString()
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      try {
        const updated = await pb.collection('maalem_details').update(pbId, payload);
        return { ...updated, id: updated.id };
      } catch (notFound) {
        const created = await pb.collection('maalem_details').create({ id: pbId, ...payload });
        return { ...created, id: created.id };
      }
    } catch (err) {
      console.error('[PocketBase] Échec upsertMaalemDetails:', err);
      return null;
    }
  },

  async updateMaalemDetails(id, fields) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const updated = await pb.collection('maalem_details').update(pbId, fields);
      return { ...updated, id: updated.id };
    } catch (err) {
      console.error('[PocketBase] Échec updateMaalemDetails:', err);
      return null;
    }
  },

  // --- INTERVENTIONS (Demandes SOS & Chantiers) ---
  async getInterventions() {
    try {
      const records = await pb.collection('interventions').getFullList({ sort: '-created' });
      return records.map((r) => ({
        ...r,
        id: r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getInterventions:', err);
      return [];
    }
  },

  async createIntervention(intervention) {
    if (!intervention) return null;
    const pbId = intervention.id ? toPbId(intervention.id) : generatePbId();

    const payload = {
      id: pbId,
      client_id: intervention.client_id ? toPbId(intervention.client_id) : undefined,
      maalem_id: intervention.maalem_id ? toPbId(intervention.maalem_id) : undefined,
      service_type: intervention.service_type,
      subcategory: intervention.subcategory,
      district: intervention.district,
      location_address: intervention.location_address,
      lat: intervention.lat ? Number(intervention.lat) : undefined,
      lng: intervention.lng ? Number(intervention.lng) : undefined,
      status: intervention.status || 'PENDING',
      cost_lead: intervention.cost_lead ? Number(intervention.cost_lead) : 15,
      estimated_price_min: intervention.estimated_price_min ? Number(intervention.estimated_price_min) : undefined,
      estimated_price_max: intervention.estimated_price_max ? Number(intervention.estimated_price_max) : undefined,
      final_agreed_price: intervention.final_agreed_price ? Number(intervention.final_agreed_price) : undefined,
      devis_confirmed: Boolean(intervention.devis_confirmed),
      client_name: intervention.client_name,
      client_phone: intervention.client_phone,
      maalem_name: intervention.maalem_name,
      maalem_phone: intervention.maalem_phone,
      rating: intervention.rating ? Number(intervention.rating) : undefined,
      comment: intervention.comment,
      badges: intervention.badges || [],
      photos_list: intervention.photos_list || [],
      audio_note_url: intervention.audio_note_url,
      progress_step: intervention.progress_step || 'PENDING',
      urgency_level: intervention.urgency_level || 'NORMAL',
      escrow_status: intervention.escrow_status || 'PENDING',
      accepted_at: intervention.accepted_at,
      completed_at: intervention.completed_at,
      created_at_original: new Date().toISOString()
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      const created = await pb.collection('interventions').create(payload);
      return { ...created, id: created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createIntervention:', err);
      return null;
    }
  },

  async updateIntervention(id, fields) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const updated = await pb.collection('interventions').update(pbId, fields);
      return { ...updated, id: updated.id };
    } catch (err) {
      console.error('[PocketBase] Échec updateIntervention:', err);
      return null;
    }
  },

  // --- TRANSACTIONS & LEADS 15 DH ---
  async getTransactions() {
    try {
      const records = await pb.collection('transactions').getFullList({ sort: '-created' });
      return records.map((r) => ({
        ...r,
        id: r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getTransactions:', err);
      return [];
    }
  },

  async createTransaction(tx) {
    if (!tx) return null;
    const pbId = tx.id ? toPbId(tx.id) : generatePbId();

    const payload = {
      id: pbId,
      maalem_id: tx.maalem_id ? toPbId(tx.maalem_id) : undefined,
      amount_dh: Number(tx.amount_dh || 0),
      type: tx.type || 'LEAD_DEDUCTION',
      payment_method: tx.payment_method || 'SYSTEM',
      reference_ref: tx.reference_ref || `REF_${Date.now()}`,
      status: tx.status || 'VALIDATED',
      admin_notes: tx.admin_notes,
      receipt_photo_url: tx.receipt_photo_url,
      receipt_url: tx.receipt_url,
      created_at_original: new Date().toISOString()
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      const created = await pb.collection('transactions').create(payload);
      return { ...created, id: created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createTransaction:', err);
      return null;
    }
  },

  async updateTransaction(id, fields) {
    if (!id) return null;
    const pbId = toPbId(id);
    try {
      const updated = await pb.collection('transactions').update(pbId, fields);
      return { ...updated, id: updated.id };
    } catch (err) {
      try {
        const item = await pb.collection('transactions').getFirstListItem(`reference_ref = "${id}"`);
        if (item) {
          const updated = await pb.collection('transactions').update(item.id, fields);
          return { ...updated, id: updated.id };
        }
      } catch (e) {}
      console.error('[PocketBase] Échec updateTransaction:', err);
      return null;
    }
  },

  // --- REVIEWS (Avis 1 à 5 étoiles & Badges) ---
  async getReviews() {
    try {
      const records = await pb.collection('reviews').getFullList({ sort: '-created' });
      return records.map((r) => ({
        ...r,
        id: r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getReviews:', err);
      return [];
    }
  },

  async createReview(review) {
    if (!review) return null;
    const pbId = review.id ? toPbId(review.id) : generatePbId();

    const payload = {
      id: pbId,
      intervention_id: review.intervention_id ? toPbId(review.intervention_id) : undefined,
      maalem_id: review.maalem_id ? toPbId(review.maalem_id) : undefined,
      client_id: review.client_id ? toPbId(review.client_id) : undefined,
      rating: Number(review.rating || 5),
      comment: review.comment || '',
      badges: review.badges || [],
      client_name: review.client_name,
      created_at_original: new Date().toISOString()
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      const created = await pb.collection('reviews').create(payload);
      return { ...created, id: created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createReview:', err);
      return null;
    }
  },

  // --- ABONNEMENT TEMPS RÉEL UNIFIÉ (SSE PocketBase) ---
  subscribeInterventions(onEvent) {
    try {
      return pb.collection('interventions').subscribe('*', (e) => {
        const record = e.record ? { ...e.record, id: e.record.id } : null;
        onEvent({ action: e.action, record });
      });
    } catch (err) {
      console.warn('[PocketBase Realtime] Échec subscribe interventions:', err);
      return () => {};
    }
  },

  unsubscribeInterventions() {
    try {
      pb.collection('interventions').unsubscribe('*');
    } catch (e) {}
  }
};
