import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient';
import { notify } from '../../../lib/notify';
import { publishRealtimeEvent } from '../../../lib/ablyRealtimeService';
import { ABLY_CHANNELS } from '../../../lib/ablyClient';
import { getCoordinatesFromDistrict } from '../../../lib/geoService';
import {
  generateUuid,
  isUuid,
  toSafeUUID,
  broadcastSync
} from '../helpers/appSyncHelpers';

export const useInterventionsService = ({
  user,
  setUser,
  interventions,
  setInterventions,
  maalems,
  setMaalems,
  transactions,
  setTransactions,
  showToast,
  reserveLeadCredit,
  confirmLeadDebit,
  releaseLeadCredit,
  quickCreditMaalem,
  setAdminAlerts
}) => {
  const createIntervention = async ({
    service_type = 'PLUMBING',
    subcategory = '',
    district = 'Casablanca - Maarif',
    lat,
    lng,
    description_photo,
    audio_note_url
  }) => {
    const resolvedCoords = getCoordinatesFromDistrict(district, lat, lng);
    const finalLat = (lat && !isNaN(Number(lat)) && (Number(lat) !== 33.5883 || (district && district.toLowerCase().includes('casablanca'))))
      ? Number(lat)
      : resolvedCoords.lat;
    const finalLng = (lng && !isNaN(Number(lng)) && (Number(lng) !== -7.6328 || (district && district.toLowerCase().includes('casablanca'))))
      ? Number(lng)
      : resolvedCoords.lng;

    const finalPhoto = description_photo || null;

    const validUuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const generatedId = generateUuid();
    const validClientId =
      user?.id && validUuidPattern.test(user.id)
        ? user.id
        : '11111111-1111-1111-1111-111111111111';

    const dbPayload = {
      id: generatedId,
      client_id: validClientId,
      service_type: (service_type || 'PLUMBING').toUpperCase(),
      subcategory: subcategory,
      district: district || 'Casablanca - Maarif',
      lat: finalLat,
      lng: finalLng,
      description_photo: finalPhoto,
      audio_note_url: audio_note_url || null,
      estimated_price_min: null,
      estimated_price_max: null,
      final_agreed_price: null,
      devis_confirmed: false,
      status: 'PENDING',
      cost_lead: 15.0
    };

    const newIntervention = {
      ...dbPayload,
      subcategory,
      client_name: user?.full_name || 'Client Maroc',
      client_phone: user?.phone || '',
      lat: finalLat,
      lng: finalLng,
      created_at: new Date().toISOString()
    };

    setInterventions((prev) => {
      const filtered = prev.filter(
        (i) =>
          !(
            String(i.client_id || '').trim() === String(validClientId).trim() &&
            i.status === 'PENDING'
          )
      );
      const updated = [
        newIntervention,
        ...filtered.filter((i) => String(i.id).trim() !== String(newIntervention.id).trim())
      ];
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      const myCreated = JSON.parse(
        localStorage.getItem('bricolemoi_my_created_leads') || '[]'
      );
      if (!myCreated.includes(String(generatedId).trim())) {
        myCreated.push(String(generatedId).trim());
        localStorage.setItem('bricolemoi_my_created_leads', JSON.stringify(myCreated));
      }
    } catch (e) {}

    const payload = {
      type: 'NEW_INTERVENTION_CREATED',
      intervention: newIntervention,
      _ts: Date.now()
    };
    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    let insertedRecord = null;
    if (isSupabaseConfigured) {
      try {
        let { data, error } = await supabase
          .from('interventions')
          .insert([dbPayload])
          .select();

        if (
          error &&
          (error.message?.includes('subcategory') ||
            error.message?.includes('column') ||
            error.message?.includes('check constraint'))
        ) {
          const minimalPayload = {
            id: generatedId,
            client_id: validClientId,
            service_type: ['PLUMBING', 'AUTO_MECHANIC'].includes(dbPayload.service_type)
              ? dbPayload.service_type
              : 'PLUMBING',
            district: dbPayload.district,
            description_photo: dbPayload.description_photo,
            estimated_price_min: null,
            estimated_price_max: null,
            final_agreed_price: null,
            status: 'PENDING',
            cost_lead: 15.0
          };
          const fb = await supabase.from('interventions').insert([minimalPayload]).select();
          data = fb.data;
          error = fb.error;
        }

        if (error) {
          console.warn('[Supabase] Intervention insert warning:', error.message);
        } else if (data?.[0]) {
          insertedRecord = { ...newIntervention, ...data[0] };
          setInterventions((prev) => [
            insertedRecord,
            ...prev.filter((i) => i.id !== insertedRecord.id)
          ]);
        }

        const cityName =
          String(district || '').split('-')[0]?.trim() || 'Casablanca';
        publishRealtimeEvent('new_job', insertedRecord || newIntervention);
        publishRealtimeEvent(
          'sos:alert',
          { intervention: insertedRecord || newIntervention },
          ABLY_CHANNELS.getSosChannel(cityName, newIntervention.service_type)
        );
        publishRealtimeEvent(
          'sos:alert',
          { intervention: insertedRecord || newIntervention },
          ABLY_CHANNELS.getSosCityChannel(cityName)
        );
      } catch (err) {
        console.warn('[Supabase] Intervention insert exception:', err.message);
      }
    }

    showToast(
      '🚨 SOS Dépannage envoyé ! Les Maalems sont notifiés en direct sur la carte radar.',
      'success'
    );
    return insertedRecord || newIntervention;
  };

  const confirmFinalDevis = (interventionId, finalPrice) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === interventionId
          ? { ...item, final_agreed_price: finalPrice, devis_confirmed: true }
          : item
      )
    );

    if (finalPrice > 300) {
      showToast(
        `⚠️ Devis de ${finalPrice} DH confirmé avec avertissement de sécurité (> 300 DH).`,
        'warning'
      );
    } else {
      showToast(
        `✅ Devis final de ${finalPrice} DH confirmé ! Les travaux peuvent commencer.`,
        'success'
      );
    }
  };

  const declareMissionUnfeasible = async (
    interventionId,
    reason = 'Mission non réalisable',
    notes = ''
  ) => {
    const cleanIntId = String(interventionId).trim();
    const targetIntv = interventions.find((i) => String(i.id).trim() === cleanIntId);
    const nowIso = new Date().toISOString();

    await releaseLeadCredit(cleanIntId, reason);

    const updatedIntv = {
      status: 'UNFEASIBLE',
      unfeasible_reason: reason,
      unfeasible_notes: notes,
      unfeasible_reported_at: nowIso,
      escrow_status: 'RELEASED'
    };

    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === cleanIntId ? { ...item, ...updatedIntv } : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    broadcastSync({
      type: 'INTERVENTION_UNFEASIBLE',
      intervention_id: cleanIntId,
      reason,
      notes,
      client_id: targetIntv?.client_id
    });

    publishRealtimeEvent('job_unfeasible', {
      intervention_id: cleanIntId,
      reason,
      notes,
      timestamp: Date.now()
    });

    if (targetIntv?.client_id) {
      publishRealtimeEvent(
        'job:unfeasible',
        {
          intervention_id: cleanIntId,
          reason,
          notes,
          timestamp: Date.now()
        },
        ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
      );
    }

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('interventions')
          .update({
            status: 'UNFEASIBLE',
            unfeasible_reason: reason,
            unfeasible_reported_at: nowIso,
            escrow_status: 'RELEASED'
          })
          .eq('id', cleanIntId);
      } catch (e) {
        console.warn('[Supabase] declareMissionUnfeasible warning:', e?.message);
      }
    }

    showToast(
      '🛡️ Mission clôturée sans frais. Vos 15 DH de garantie ont été restitués immédiatement sur votre solde disponible !',
      'success'
    );
    return true;
  };

  const relaunchEmergencyRequest = async (interventionId) => {
    const cleanIntId = String(interventionId).trim();
    const targetIntv = interventions.find((i) => String(i.id).trim() === cleanIntId);

    const resetFields = {
      status: 'PENDING',
      maalem_id: null,
      maalem_name: null,
      maalem_phone: null,
      accepted_at: null,
      progress_step: 'SEARCHING',
      escrow_status: null,
      unfeasible_reason: null,
      unfeasible_notes: null
    };

    let updatedJob = null;
    setInterventions((prev) => {
      const updated = prev.map((item) => {
        if (String(item.id).trim() === cleanIntId) {
          updatedJob = { ...item, ...resetFields };
          return updatedJob;
        }
        return item;
      });
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const finalJob = updatedJob || { ...targetIntv, ...resetFields };
    const cityName =
      String(finalJob?.district || user?.city_zone || 'Casablanca')
        .split('-')[0]
        ?.trim() || 'Casablanca';
    const serviceType = finalJob?.service_type || 'all';

    publishRealtimeEvent(
      'new_emergency_job',
      { ...finalJob, timestamp: Date.now() },
      ABLY_CHANNELS.getSosChannel(cityName, serviceType)
    );
    publishRealtimeEvent(
      'new_emergency_job',
      { ...finalJob, timestamp: Date.now() },
      ABLY_CHANNELS.getSosCityChannel(cityName)
    );

    broadcastSync({
      type: 'INTERVENTION_RELAUNCHED',
      intervention: finalJob
    });

    if (isSupabaseConfigured) {
      try {
        await supabase.from('interventions').update(resetFields).eq('id', cleanIntId);
      } catch (e) {
        console.warn('[Supabase] relaunchEmergencyRequest warning:', e?.message);
      }
    }

    showToast(
      '🚀 Alerte SOS relancée ! Recherche active des artisans disponibles en cours...',
      'success'
    );
    return finalJob;
  };

  const acceptLead = async (interventionId) => {
    const activeMissions = interventions.filter((i) => {
      const isMine =
        user?.id && String(i.maalem_id || '').trim() === String(user.id).trim();
      const isFallbackMine =
        (!user?.id ||
          user.id === 'maalem-1' ||
          user.id === '22222222-2222-2222-2222-222222222222') &&
        (i.maalem_id === 'maalem-1' ||
          i.maalem_id === '22222222-2222-2222-2222-222222222222');
      const isActiveStatus = [
        'ACCEPTED',
        'ON_THE_WAY',
        'ARRIVED',
        'IN_PROGRESS',
        'PENDING_COMPLETION'
      ].includes(i.status);
      return (
        (isMine || isFallbackMine) &&
        isActiveStatus &&
        String(i.id).trim() !== String(interventionId).trim()
      );
    });

    if (activeMissions.length >= 1) {
      notify.warning(
        'Mission Déjà en Cours ⚠️',
        "Vous avez déjà 1 mission active en cours d'exécution. Terminez-la ou clôturez-la avant de pouvoir accepter une nouvelle mission.",
        { id: `active-mission-limit-${interventionId}`, duration: 6000 }
      );
      return false;
    }

    const maalemId = user?.id;
    const myTxs = (transactions || []).filter((t) => {
      const matchId =
        maalemId && String(t.maalem_id || '').trim() === String(maalemId).trim();
      const isFallback =
        !maalemId ||
        maalemId === 'maalem-1' ||
        maalemId === '22222222-2222-2222-2222-222222222222';
      return matchId || isFallback;
    });

    const totalRecharges = myTxs
      .filter((t) => t.status === 'VALIDATED' && (t.type === 'RECHARGE' || t.type === 'CREDIT'))
      .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);
    const totalBonus = myTxs
      .filter(
        (t) =>
          (t.status === 'VALIDATED' || !t.status) &&
          (t.type === 'BONUS' || String(t.payment_method || '').includes('BONUS'))
      )
      .reduce((sum, t) => sum + (parseFloat(t.amount_dh) || 0), 0);
    const totalValidatedLeads = myTxs
      .filter(
        (t) => t.status === 'VALIDATED' && (t.type === 'LEAD_DEDUCTION' || Number(t.amount_dh) < 0)
      )
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount_dh) || 0), 0);
    const reservedEscrow = myTxs
      .filter((t) => t.status === 'RESERVED')
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount_dh) || 0), 0);

    const computedLedgerBalance = totalRecharges + totalBonus - totalValidatedLeads;
    const totalBalance =
      myTxs.length > 0
        ? Math.max(0, computedLedgerBalance)
        : Number(user?.maalem_details?.credit_balance ?? user?.credits ?? 15.0);

    const availableBalance = Math.max(0, totalBalance - reservedEscrow);

    if (availableBalance < 15) {
      notify.error(
        'Solde Disponible Insuffisant 💳',
        `Votre solde disponible est de ${availableBalance.toFixed(
          2
        )} DH (15.00 DH requis en garantie temporaire). Veuillez recharger votre compte.`,
        { id: `insufficient-credit-${interventionId}` }
      );
      return false;
    }

    const targetIntv = interventions.find(
      (i) => String(i.id).trim() === String(interventionId).trim()
    );
    const maalemSpec = String(
      user?.maalem_details?.specialty || user?.specialty || ''
    ).toUpperCase();
    const jobSpec = String(targetIntv?.service_type || '').toUpperCase();

    const isCompatible =
      !jobSpec ||
      !maalemSpec ||
      maalemSpec === 'ALL' ||
      maalemSpec === 'BOTH' ||
      maalemSpec === 'POLYVALENT' ||
      maalemSpec === jobSpec ||
      (maalemSpec.includes('PLUMB') && jobSpec.includes('PLOMB')) ||
      (maalemSpec.includes('PLOMB') && jobSpec.includes('PLUMB')) ||
      (maalemSpec.includes('ELEC') && jobSpec.includes('ELEC')) ||
      (maalemSpec.includes('AUTO') && jobSpec.includes('AUTO')) ||
      (maalemSpec.includes('CLIM') && jobSpec.includes('CLIM'));

    if (!isCompatible) {
      notify.warning(
        'Spécialité Non Compatible ⚠️',
        `Cette mission nécessite un artisan compatible avec ${jobSpec}.`,
        { id: `incompatible-specialty-${interventionId}`, duration: 7000 }
      );
      return false;
    }

    const cityName =
      String(targetIntv?.district || user?.city_zone || 'Casablanca')
        .split('-')[0]
        ?.trim() || 'Casablanca';
    const serviceType = targetIntv?.service_type || user?.specialty || 'all';
    const nowIso = new Date().toISOString();
    const cleanIntId = String(interventionId).trim();
    const cleanMaalemId = toSafeUUID(user?.id);

    const acceptedItem = {
      id: interventionId,
      status: 'ACCEPTED',
      escrow_status: 'DEBITED',
      maalem_id: cleanMaalemId,
      maalem_name: user?.full_name || 'Artisan Maâlem',
      maalem_phone: user?.phone,
      accepted_at: nowIso,
      progress_step: 'ON_THE_WAY'
    };

    const leadCost = 15.0;
    const ref = `LEAD_UNLOCK_${cleanIntId}_${Date.now()}`;

    const newDebitTx = {
      id: `tx-lead-${cleanIntId}-${Date.now()}`,
      maalem_id: cleanMaalemId,
      maalem_name: user?.full_name || 'Artisan Maalem',
      maalem_phone: user?.phone || '',
      amount_dh: -leadCost,
      type: 'LEAD_DEDUCTION',
      payment_method: 'SYSTEM_DEBIT',
      reference_ref: ref,
      status: 'VALIDATED',
      admin_notes: `Déblocage Immédiat Contact SOS #${cleanIntId}`,
      created_at: nowIso
    };

    setTransactions((prev) => [newDebitTx, ...prev]);

    if (user?.role === 'MAALEM') {
      const currentBal = Number(
        user?.maalem_details?.credit_balance ?? user?.credits ?? leadCost
      );
      const newBal = Math.max(0, currentBal - leadCost);
      setUser((prev) => ({
        ...prev,
        credits: newBal,
        maalem_details: {
          ...(prev?.maalem_details || {}),
          credit_balance: newBal
        }
      }));
    }

    setMaalems((prev) =>
      prev.map((m) =>
        String(m.id).trim() === cleanMaalemId
          ? {
              ...m,
              credit_balance: Math.max(0, Number(m.credit_balance || leadCost) - leadCost)
            }
          : m
      )
    );

    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === cleanIntId ? { ...item, ...acceptedItem } : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    publishRealtimeEvent('job_accepted', {
      intervention_id: interventionId,
      maalem_id: cleanMaalemId,
      maalem_name: user?.full_name,
      maalem_phone: user?.phone,
      accepted_at: nowIso,
      progress_step: 'ON_THE_WAY'
    });

    publishRealtimeEvent(
      'sos:claimed',
      { intervention_id: interventionId, maalem_id: cleanMaalemId },
      ABLY_CHANNELS.getSosChannel(cityName, serviceType)
    );
    publishRealtimeEvent(
      'sos:claimed',
      { intervention_id: interventionId, maalem_id: cleanMaalemId },
      ABLY_CHANNELS.getSosCityChannel(cityName)
    );

    if (targetIntv?.client_id) {
      publishRealtimeEvent(
        'job:accepted',
        {
          intervention_id: interventionId,
          maalem_id: cleanMaalemId,
          maalem_name: user?.full_name,
          maalem_phone: user?.phone,
          accepted_at: nowIso
        },
        ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
      );
    }

    const payload = {
      type: 'INTERVENTION_ACCEPTED',
      intervention: acceptedItem,
      _ts: Date.now()
    };
    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    try {
      const myUnlocked = JSON.parse(
        localStorage.getItem('bricolemoi_my_unlocked_leads') || '[]'
      );
      if (!myUnlocked.includes(cleanIntId)) {
        myUnlocked.push(cleanIntId);
        localStorage.setItem('bricolemoi_my_unlocked_leads', JSON.stringify(myUnlocked));
      }
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        const isUserUuid = user?.id && isUuid(user.id);
        const validIntvUuid = isUuid(interventionId) ? interventionId : null;

        if (validIntvUuid && isUserUuid) {
          const { data: rpcRes, error: rpcErr } = await supabase.rpc(
            'unlock_lead_secure',
            {
              p_maalem_id: user.id,
              p_intervention_id: validIntvUuid,
              p_cost: leadCost
            }
          );

          if (rpcErr) {
            await supabase
              .from('interventions')
              .update({ status: 'ACCEPTED', maalem_id: user.id })
              .eq('id', interventionId);
          } else if (rpcRes && rpcRes.success === false) {
            notify.error(
              'Déblocage Impossible 🚫',
              rpcRes.message || 'Impossible de débloquer cette mission.',
              { id: `rpc-unlock-fail-${interventionId}` }
            );
            return false;
          }
        } else {
          const updatePayload = { status: 'ACCEPTED' };
          if (isUserUuid) updatePayload.maalem_id = user.id;
          await supabase
            .from('interventions')
            .update(updatePayload)
            .eq('id', interventionId);
        }
      } catch (dbErr) {
        console.warn('[Supabase] acceptLead exception:', dbErr.message);
      }
    }

    showToast(
      '🟢 Contact débloqué avec succès ! Coordonnées complètes et itinéraire GPS disponibles.',
      'success'
    );
    return acceptedItem;
  };

  const updateInterventionProgress = async (interventionId, progressStep) => {
    const sId = String(interventionId || '').trim();
    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === sId
          ? {
              ...item,
              progress_step: progressStep,
              status: item.status === 'PENDING' || !item.status ? 'ACCEPTED' : item.status
            }
          : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const stepLabels = {
      ON_THE_WAY: '🚗 Notification transmise : Vous êtes en route vers le client !',
      ARRIVED: '📍 Notification transmise : Vous êtes arrivé sur place pour le diagnostic.',
      IN_PROGRESS: "🛠️ Chantier en cours d'exécution."
    };

    if (stepLabels[progressStep]) {
      showToast(stepLabels[progressStep], 'info');
    }

    const payload = {
      type: 'INTERVENTION_PROGRESS_UPDATED',
      intervention_id: interventionId,
      progress_step: progressStep,
      _ts: Date.now()
    };

    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        const targetIntv = interventions.find(
          (i) => String(i.id).trim() === String(interventionId).trim()
        );
        publishRealtimeEvent('job_progress_updated', {
          intervention_id: interventionId,
          progress_step: progressStep
        });
        if (targetIntv?.client_id) {
          publishRealtimeEvent(
            'job:progress',
            { intervention_id: interventionId, progress_step: progressStep },
            ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
          );
        }
        await supabase
          .from('interventions')
          .update({ progress_step: progressStep })
          .eq('id', interventionId);
      } catch (e) {
        console.warn('[Supabase] updateInterventionProgress error:', e.message);
      }
    }
  };

  const requestWorkCompletion = async (interventionId, finalAgreedPrice) => {
    const parsedPrice = finalAgreedPrice ? parseFloat(finalAgreedPrice) : undefined;
    const targetIntv = interventions.find(
      (i) => String(i.id).trim() === String(interventionId).trim()
    );

    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === String(interventionId).trim()
          ? {
              ...item,
              status: 'PENDING_COMPLETION',
              final_agreed_price:
                parsedPrice || item.final_agreed_price || null,
              devis_confirmed: true
            }
          : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const payload = {
      type: 'WORK_COMPLETION_REQUESTED',
      intervention_id: interventionId,
      final_agreed_price: parsedPrice,
      _ts: Date.now()
    };

    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        publishRealtimeEvent('work_completion_requested', {
          intervention_id: interventionId,
          final_agreed_price: parsedPrice
        });
        if (targetIntv?.client_id) {
          publishRealtimeEvent(
            'work:completion_requested',
            { intervention_id: interventionId, final_agreed_price: parsedPrice },
            ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
          );
        }
        let { error } = await supabase
          .from('interventions')
          .update({ status: 'PENDING_COMPLETION', final_agreed_price: parsedPrice })
          .eq('id', String(interventionId).trim());

        if (
          error &&
          (error.message?.includes('column') || error.message?.includes('schema'))
        ) {
          await supabase
            .from('interventions')
            .update({ status: 'PENDING_COMPLETION' })
            .eq('id', String(interventionId).trim());
        }
      } catch (e) {
        console.warn('[Supabase] requestWorkCompletion warning:', e.message);
      }
    }

    showToast(
      `🛠️ Demande de fin de chantier transmise au client (${
        parsedPrice ? `${parsedPrice} DH` : 'Montant convenu'
      }) !`,
      'success'
    );
  };

  const purgeInterventionMedia = async (interventionId) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === interventionId
          ? { ...item, media_purged: true, audio_note_url: null }
          : item
      )
    );

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('interventions')
          .update({ audio_note_url: null })
          .eq('id', String(interventionId).trim());
      } catch (e) {
        console.warn('[Storage] Purge error:', e.message);
      }
    }
  };

  const completeIntervention = async (interventionId, finalPrice) => {
    const cleanId = String(interventionId).trim();
    await confirmLeadDebit(cleanId);

    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === cleanId
          ? {
              ...item,
              status: 'COMPLETED',
              escrow_status: 'DEBITED',
              final_agreed_price:
                finalPrice || item.final_agreed_price || null
            }
          : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const payload = {
      type: 'INTERVENTION_COMPLETED',
      intervention_id: cleanId,
      _ts: Date.now()
    };

    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        publishRealtimeEvent('job_completed', { intervention_id: cleanId });
        const targetIntv = interventions.find((i) => String(i.id).trim() === cleanId);
        if (targetIntv?.client_id) {
          publishRealtimeEvent(
            'job:completed',
            { intervention_id: cleanId },
            ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
          );
        }
        await supabase
          .from('interventions')
          .update({ status: 'COMPLETED', escrow_status: 'DEBITED' })
          .eq('id', cleanId);
      } catch (e) {
        console.warn('[Supabase] completeIntervention warning:', e.message);
      }
    }

    purgeInterventionMedia(cleanId);
    showToast(
      "✅ Intervention marquée comme terminée ! Modale d'évaluation ouverte.",
      'success'
    );
  };

  const cancelIntervention = async (interventionId) => {
    const cleanId = String(interventionId).trim();
    await releaseLeadCredit(cleanId, 'Annulation par le client');

    setInterventions((prev) =>
      prev.filter((item) => String(item.id).trim() !== cleanId)
    );

    if (isSupabaseConfigured) {
      try {
        await supabase.from('interventions').delete().eq('id', cleanId);
      } catch (e) {
        console.warn('[Supabase] cancelIntervention error:', e.message);
      }
    }

    showToast('Demande SOS annulée et retirée des radars des Maâlems.', 'info');
  };

  return {
    createIntervention,
    confirmFinalDevis,
    declareMissionUnfeasible,
    relaunchEmergencyRequest,
    acceptLead,
    updateInterventionProgress,
    requestWorkCompletion,
    completeIntervention,
    cancelIntervention
  };
};
