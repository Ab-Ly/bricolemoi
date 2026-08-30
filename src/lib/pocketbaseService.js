import { pb, toPbId, isPocketBaseConfigured } from './pocketbaseClient';

/**
 * Service de persistance et de synchronisation temps réel basé sur PocketBase
 * Architecture : Client - Maâlem - Admin (Zéro Donnée Forcée)
 */

export const dbService = {
  // --- PROFILES ---
  async getProfiles() {
    try {
      const records = await pb.collection('profiles').getFullList({ sort: '-created' });
      return records.map((r) => ({
        ...r,
        id: r.uuid || r.id
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
      return { ...record, id: record.uuid || record.id };
    } catch (err) {
      return null;
    }
  },

  async getProfileById(idOrUuid) {
    if (!idOrUuid) return null;
    try {
      const pbId = toPbId(idOrUuid);
      try {
        const r = await pb.collection('profiles').getOne(pbId);
        return { ...r, id: r.uuid || r.id };
      } catch (e) {
        const r = await pb.collection('profiles').getFirstListItem(`uuid = "${idOrUuid}"`);
        return { ...r, id: r.uuid || r.id };
      }
    } catch (err) {
      return null;
    }
  },

  async upsertProfile(profile) {
    if (!profile) return null;
    const uuid = profile.id || profile.uuid;
    const pbId = toPbId(uuid);

    const payload = {
      uuid: uuid,
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
        return { ...updated, id: updated.uuid || updated.id };
      } catch (notFound) {
        const created = await pb.collection('profiles').create({ id: pbId, ...payload });
        return { ...created, id: created.uuid || created.id };
      }
    } catch (err) {
      console.error('[PocketBase] Échec upsertProfile:', err);
      return null;
    }
  },

  async updateProfile(idOrUuid, fields) {
    if (!idOrUuid) return null;
    const pbId = toPbId(idOrUuid);
    try {
      const updated = await pb.collection('profiles').update(pbId, fields);
      return { ...updated, id: updated.uuid || updated.id };
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
        id: r.uuid || r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getMaalemDetailsList:', err);
      return [];
    }
  },

  async getMaalemDetailsById(idOrUuid) {
    if (!idOrUuid) return null;
    const pbId = toPbId(idOrUuid);
    try {
      try {
        const r = await pb.collection('maalem_details').getOne(pbId);
        return { ...r, id: r.uuid || r.id };
      } catch (e) {
        const r = await pb.collection('maalem_details').getFirstListItem(`uuid = "${idOrUuid}"`);
        return { ...r, id: r.uuid || r.id };
      }
    } catch (err) {
      return null;
    }
  },

  async upsertMaalemDetails(details) {
    if (!details) return null;
    const uuid = details.id || details.uuid;
    const pbId = toPbId(uuid);

    const payload = {
      uuid: uuid,
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
        return { ...updated, id: updated.uuid || updated.id };
      } catch (notFound) {
        const created = await pb.collection('maalem_details').create({ id: pbId, ...payload });
        return { ...created, id: created.uuid || created.id };
      }
    } catch (err) {
      console.error('[PocketBase] Échec upsertMaalemDetails:', err);
      return null;
    }
  },

  async updateMaalemDetails(idOrUuid, fields) {
    if (!idOrUuid) return null;
    const pbId = toPbId(idOrUuid);
    try {
      const updated = await pb.collection('maalem_details').update(pbId, fields);
      return { ...updated, id: updated.uuid || updated.id };
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
        id: r.uuid || r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getInterventions:', err);
      return [];
    }
  },

  async createIntervention(intervention) {
    if (!intervention) return null;
    const uuid = intervention.id || crypto.randomUUID();
    const pbId = toPbId(uuid);

    const payload = {
      id: pbId,
      uuid: uuid,
      client_id: intervention.client_id,
      maalem_id: intervention.maalem_id,
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
      return { ...created, id: created.uuid || created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createIntervention:', err);
      return null;
    }
  },

  async updateIntervention(idOrUuid, fields) {
    if (!idOrUuid) return null;
    const pbId = toPbId(idOrUuid);
    try {
      let targetId = pbId;
      try {
        const updated = await pb.collection('interventions').update(targetId, fields);
        return { ...updated, id: updated.uuid || updated.id };
      } catch (errFind) {
        const item = await pb.collection('interventions').getFirstListItem(`uuid = "${idOrUuid}"`);
        if (item) {
          const updated = await pb.collection('interventions').update(item.id, fields);
          return { ...updated, id: updated.uuid || updated.id };
        }
        throw errFind;
      }
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
        id: r.uuid || r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getTransactions:', err);
      return [];
    }
  },

  async createTransaction(tx) {
    if (!tx) return null;
    const uuid = tx.id || crypto.randomUUID();
    const pbId = toPbId(uuid);

    const payload = {
      id: pbId,
      uuid: uuid,
      maalem_id: tx.maalem_id,
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
      return { ...created, id: created.uuid || created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createTransaction:', err);
      return null;
    }
  },

  async updateTransaction(idOrUuid, fields) {
    if (!idOrUuid) return null;
    const pbId = toPbId(idOrUuid);
    try {
      const updated = await pb.collection('transactions').update(pbId, fields);
      return { ...updated, id: updated.uuid || updated.id };
    } catch (err) {
      try {
        const item = await pb.collection('transactions').getFirstListItem(`uuid = "${idOrUuid}" || reference_ref = "${idOrUuid}"`);
        if (item) {
          const updated = await pb.collection('transactions').update(item.id, fields);
          return { ...updated, id: updated.uuid || updated.id };
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
        id: r.uuid || r.id
      }));
    } catch (err) {
      console.warn('[PocketBase] Erreur getReviews:', err);
      return [];
    }
  },

  async createReview(review) {
    if (!review) return null;
    const uuid = review.id || crypto.randomUUID();
    const pbId = toPbId(uuid);

    const payload = {
      id: pbId,
      uuid: uuid,
      intervention_id: review.intervention_id,
      maalem_id: review.maalem_id,
      client_id: review.client_id,
      rating: Number(review.rating || 5),
      comment: review.comment || '',
      badges: review.badges || [],
      client_name: review.client_name,
      created_at_original: new Date().toISOString()
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      const created = await pb.collection('reviews').create(payload);
      return { ...created, id: created.uuid || created.id };
    } catch (err) {
      console.error('[PocketBase] Échec createReview:', err);
      return null;
    }
  },

  // --- ABONNEMENT TEMPS RÉEL UNIFIÉ (SSE PocketBase) ---
  subscribeInterventions(onEvent) {
    try {
      return pb.collection('interventions').subscribe('*', (e) => {
        const record = e.record ? { ...e.record, id: e.record.uuid || e.record.id } : null;
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
