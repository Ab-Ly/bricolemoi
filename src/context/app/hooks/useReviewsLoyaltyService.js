import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient';
import { ABLY_CHANNELS } from '../../../lib/ablyClient';
import { publishRealtimeEvent } from '../../../lib/ablyRealtimeService';
import { playNotificationSound } from '../../../lib/audioNotifier';
import { calculateMaalemRating } from '../../../utils/ratingUtils';
import { broadcastSync, isUuid } from '../helpers/appSyncHelpers';

export const useReviewsLoyaltyService = ({
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
  confirmLeadDebit,
  quickCreditMaalem,
  userRef
}) => {
  const requestOnSiteReview = async (interventionId) => {
    const cleanId = String(interventionId).trim();
    const targetIntv = interventions.find((i) => String(i.id).trim() === cleanId);
    const liveMaalem = (maalems || []).find((m) => String(m.id).trim() === String(user?.id).trim());
    const maalemName = user?.full_name || liveMaalem?.full_name || targetIntv?.maalem_name || 'Votre Artisan Maâlem';
    const maalemPhone = user?.phone || liveMaalem?.phone || targetIntv?.maalem_phone || '';

    setInterventions((prev) => {
      const updated = prev.map((item) =>
        String(item.id).trim() === cleanId
          ? {
              ...item,
              status: 'PENDING_COMPLETION',
              on_site_review_requested: true,
              maalem_id: user?.id || item.maalem_id,
              maalem_name: maalemName,
              maalem_phone: maalemPhone || item.maalem_phone
            }
          : item
      );
      try {
        localStorage.setItem('bricolemoi_interventions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const payload = {
      type: 'ON_SITE_REVIEW_REQUESTED',
      intervention_id: cleanId,
      client_id: targetIntv?.client_id,
      maalem_id: user?.id,
      maalem_name: maalemName,
      maalem_phone: maalemPhone,
      final_agreed_price: targetIntv?.final_agreed_price,
      _ts: Date.now()
    };

    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    if (targetIntv?.client_id) {
      publishRealtimeEvent(
        'work:completion_requested',
        {
          intervention_id: cleanId,
          status: 'PENDING_COMPLETION',
          maalem_id: user?.id,
          maalem_name: maalemName,
          maalem_phone: maalemPhone,
          final_agreed_price: targetIntv?.final_agreed_price
        },
        ABLY_CHANNELS.getUserChannel(targetIntv.client_id)
      );
    }

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('interventions')
          .update({ status: 'PENDING_COMPLETION' })
          .eq('id', cleanId);
      } catch (e) {
        console.warn('[Supabase] requestOnSiteReview error:', e.message);
      }
    }

    showToast(
      '📱 Demande de notation sur place envoyée au client ! Présentez votre écran.',
      'info'
    );
  };

  const submitReview = async ({
    intervention_id,
    maalem_id,
    rating,
    comment,
    badges
  }) => {
    const currentInt = interventions.find((i) => String(i.id).trim() === String(intervention_id).trim());
    const targetMaalemId =
      maalem_id || currentInt?.maalem_id;
    const targetMaalemObj = (maalems || []).find((m) => String(m.id).trim() === String(targetMaalemId).trim());
    const targetMaalemName =
      (currentInt?.maalem_name && currentInt?.maalem_name !== 'Maalem' && currentInt?.maalem_name !== 'Artisan Maâlem' && currentInt?.maalem_name !== 'Artisan Maalem')
        ? currentInt.maalem_name
        : (targetMaalemObj?.full_name || 'Artisan Maâlem');
    const targetMaalemPhone =
      (currentInt?.maalem_phone && currentInt?.maalem_phone !== 'N/A')
        ? currentInt.maalem_phone
        : (targetMaalemObj?.phone || '');

    await confirmLeadDebit(intervention_id, targetMaalemId);

    let cleanCommentText = String(comment || '').trim();
    if (cleanCommentText === '""' || cleanCommentText === "''") cleanCommentText = '';

    const alreadyHasBadges = cleanCommentText.includes('[Badges:');
    const fullComment =
      badges && badges.length > 0 && !alreadyHasBadges
        ? cleanCommentText
          ? `${cleanCommentText} [Badges: ${badges.join(', ')}]`
          : `[Badges: ${badges.join(', ')}]`
        : cleanCommentText;

    const newReview = {
      id: 'rev-' + Date.now(),
      intervention_id,
      maalem_id: targetMaalemId,
      client_name: user?.full_name || currentInt?.client_name || 'Client BricoleMoi',
      client_phone: user?.phone || currentInt?.client_phone || '',
      rating: Number(rating),
      comment: fullComment,
      badges: badges || [],
      created_at: new Date().toISOString()
    };

    const nextReviews = [
      newReview,
      ...reviews.filter((r) => r.intervention_id !== intervention_id)
    ];
    setReviews(nextReviews);
    try {
      localStorage.setItem('bricolemoi_reviews_cache', JSON.stringify(nextReviews));
    } catch (e) {}

    const updatedInterventions = interventions.map((item) =>
      String(item.id).trim() === String(intervention_id).trim()
        ? {
            ...item,
            status: 'COMPLETED',
            progress_step: 'COMPLETED',
            completed_at: new Date().toISOString(),
            rating: Number(rating),
            comment: fullComment,
            badges: badges || item.badges,
            maalem_id: targetMaalemId || item.maalem_id,
            maalem_name: targetMaalemName,
            maalem_phone: targetMaalemPhone || item.maalem_phone
          }
        : item
    );
    setInterventions(updatedInterventions);
    try {
      localStorage.setItem(
        'bricolemoi_interventions_cache',
        JSON.stringify(updatedInterventions)
      );
    } catch (e) {}

    const ratingInfo = calculateMaalemRating(
      { id: targetMaalemId },
      nextReviews,
      updatedInterventions
    );

    setMaalems((prev) =>
      prev.map((m) => {
        if (String(m.id).trim() === String(targetMaalemId).trim()) {
          return {
            ...m,
            rating_avg: ratingInfo.averageRating,
            reviews_count: ratingInfo.totalReviews,
            last_review_comment: fullComment,
            last_review_rating: Number(rating)
          };
        }
        return m;
      })
    );

    if (
      userRef.current &&
      String(userRef.current.id).trim() === String(targetMaalemId).trim()
    ) {
      setUser((prev) => ({
        ...prev,
        maalem_details: {
          ...(prev?.maalem_details || {}),
          rating_avg: ratingInfo.averageRating,
          consecutive_five_stars: ratingInfo.consecutiveFiveStars
        }
      }));
    }

    broadcastSync({
      type: 'INTERVENTION_COMPLETED_WITH_REVIEW',
      intervention_id,
      rating: Number(rating),
      comment: fullComment,
      maalem_id: targetMaalemId,
      maalem_name: targetMaalemName,
      maalem_phone: targetMaalemPhone,
      badges: badges || [],
      client_name: user?.full_name || currentInt?.client_name
    });

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('interventions')
          .update({
            status: 'COMPLETED',
            rating: Number(rating),
            comment: fullComment
          })
          .eq('id', String(intervention_id).trim());

        try {
          const validIntId = isUuid(intervention_id) ? intervention_id : null;
          const validMaalemId = isUuid(targetMaalemId) ? targetMaalemId : null;
          const validClientId = (user?.id && isUuid(user.id))
            ? user.id
            : (currentInt?.client_id && isUuid(currentInt.client_id) ? currentInt.client_id : null);

          const reviewPayload = {
            rating: Number(rating),
            comment: fullComment
          };
          if (validIntId) reviewPayload.intervention_id = validIntId;
          if (validMaalemId) reviewPayload.maalem_id = validMaalemId;
          if (validClientId) reviewPayload.client_id = validClientId;

          await supabase.from('reviews').insert([reviewPayload]);
        } catch (revErr) {
          console.warn('[Supabase] reviews insert warning:', revErr.message);
        }
      } catch (e) {
        console.warn('[Supabase] submitReview BDD notice:', e.message);
      }
    }

    if (Number(rating) <= 3) {
      const alertItem = {
        id: 'alert-' + Date.now(),
        intervention_id,
        maalem_id: targetMaalemId,
        maalem_name: targetMaalemName,
        maalem_phone: targetMaalemPhone,
        client_name: user?.full_name || currentInt?.client_name || 'Client BricoleMoi',
        client_phone: user?.phone || currentInt?.client_phone || '',
        district: currentInt?.district || 'Casablanca',
        rating: Number(rating),
        comment: fullComment,
        reason_label: `Avis Insatisfaisant (${rating}⭐)`,
        status: 'PENDING',
        badges: badges || [],
        created_at: new Date().toISOString()
      };
      setAdminAlerts((prev) => {
        const next = [
          alertItem,
          ...prev.filter((a) => a.intervention_id !== intervention_id)
        ];
        try {
          localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      broadcastSync({
        type: 'NEW_DISPUTE_REPORTED',
        alert: alertItem
      });
      showToast(
        `⚠️ Note de ${rating}★ transmise à l'équipe Admin pour litige/arbitrage !`,
        'error'
      );
    } else {
      showToast(
        "⭐ Évaluation & Confirmation d'accomplissement enregistrées ! Merci.",
        'success'
      );
    }

    // 4 AVIS QUALIFIANTS (≥ 4★) = 1 LEAD SOS GRATUIT (15 DH)
    if (Number(rating) >= 4) {
      const qualifyingReviews = nextReviews.filter(
        (r) =>
          String(r.maalem_id || '').trim() === String(targetMaalemId).trim() &&
          Number(r.rating) >= 4
      );
      const totalQualifying = qualifyingReviews.length;

      if (totalQualifying > 0 && totalQualifying % 4 === 0) {
        const rewardAmount = 15.0;

        setMaalems((prev) =>
          prev.map((m) => {
            if (String(m.id).trim() === String(targetMaalemId).trim()) {
              return {
                ...m,
                credit_balance: Number(m.credit_balance || 0) + rewardAmount
              };
            }
            return m;
          })
        );

        if (
          userRef.current &&
          String(userRef.current.id).trim() === String(targetMaalemId).trim()
        ) {
          setUser((prev) => {
            const prevBal = Number(
              prev?.maalem_details?.credit_balance ?? prev?.credits ?? 0
            );
            return {
              ...prev,
              credits: prevBal + rewardAmount,
              maalem_details: {
                ...(prev?.maalem_details || {}),
                credit_balance: prevBal + rewardAmount
              }
            };
          });
        }

        const bonusTx = {
          id: 'tx-loyalty-' + Date.now(),
          maalem_id: targetMaalemId,
          maalem_name: targetMaalemName,
          maalem_phone: currentInt?.maalem_phone || '',
          amount_dh: rewardAmount,
          type: 'BONUS',
          payment_method: 'LOYALTY_4_REVIEWS_FREE_LEAD',
          reference_ref: `BONUS-LOYALTY-4STAR-${Date.now()}`,
          status: 'VALIDATED',
          admin_notes: `Prime Fidélité 4/4 avis ≥4★ accordée (1 Lead SOS Gratuit = +15 DH)`,
          created_at: new Date().toISOString()
        };
        setTransactions((prev) => [bonusTx, ...prev]);

        const qualifyingMissions = updatedInterventions
          .filter(
            (i) =>
              String(i.maalem_id || '').trim() === String(targetMaalemId).trim() &&
              Number(i.rating) >= 4
          )
          .slice(0, 4)
          .map((i) => ({
            id: i.id,
            client_name: i.client_name || 'Client',
            rating: i.rating,
            district: i.district || 'Casablanca',
            created_at: i.created_at
          }));

        const newRewardRecord = {
          id: 'reward-' + Date.now(),
          maalem_id: targetMaalemId,
          maalem_name: targetMaalemName,
          maalem_phone: currentInt?.maalem_phone || '',
          reward_type: 'FREE_SOS_LEAD',
          reward_value_dh: rewardAmount,
          qualifying_reviews_count: 4,
          qualifying_missions: qualifyingMissions,
          created_at: new Date().toISOString(),
          status: 'GRANTED_AND_CREDITED'
        };

        setLoyaltyRewardsHistory((prev) => {
          const next = [newRewardRecord, ...prev];
          try {
            localStorage.setItem(
              'bricolemoi_loyalty_rewards_cache',
              JSON.stringify(next)
            );
          } catch (e) {}
          return next;
        });

        const adminNotif = {
          id: 'notif-loyalty-' + Date.now(),
          type: 'LOYALTY_REWARD',
          title: '🎁 Prime Lead Gratuit Débloquée !',
          message: `L'artisan ${targetMaalemName} a validé 4 avis ≥ 4★ et a reçu 1 Lead SOS 100% Offert (+15 DH).`,
          maalem_id: targetMaalemId,
          created_at: new Date().toISOString()
        };
        setAdminAlerts((prev) => [adminNotif, ...prev]);

        broadcastSync({
          type: 'LOYALTY_LEAD_REWARDED',
          reward: newRewardRecord,
          adminNotif,
          maalem_id: targetMaalemId,
          _ts: Date.now()
        });

        playNotificationSound('success');
        showToast(
          `🎉 FÉLICITATIONS ! 4 interventions réussies (≥ 4★) : 1 Lead SOS 100% Gratuit (+15 DH) crédité sur votre solde ! 🎁`,
          'success'
        );
      }
    }
  };

  const reportDisputeIssue = async ({
    interventionId,
    maalemId,
    reason = 'CLIENT_UNREACHABLE',
    notes = ''
  }) => {
    const targetMaalemId = maalemId || user?.id || 'maalem-1';
    const targetIntv = interventions.find(
      (i) => String(i.id).trim() === String(interventionId).trim()
    );
    const targetMaalem = maalems.find(
      (m) => String(m.id).trim() === String(targetMaalemId).trim()
    );

    if (
      targetIntv?.status === 'COMPLETED' ||
      (targetIntv?.final_agreed_price && targetIntv?.devis_confirmed)
    ) {
      showToast(
        "⚠️ Règle stricte anti-abus : aucun remboursement ni contestation n'est accordé pour une intervention déjà réalisée et validée.",
        'error'
      );
      return false;
    }

    const acceptedTime = targetIntv?.accepted_at
      ? new Date(targetIntv.accepted_at).getTime()
      : targetIntv?.created_at
      ? new Date(targetIntv.created_at).getTime()
      : Date.now();
    const elapsedMinutes = (Date.now() - acceptedTime) / (60 * 1000);

    if (elapsedMinutes > 30) {
      showToast(
        "⚠️ Délai anti-abus dépassé : le signalement de faux numéro ou client injoignable doit obligatoirement être effectué dans les 30 minutes suivant l'acceptation.",
        'error'
      );
      return false;
    }

    const reasonLabels = {
      CLIENT_UNREACHABLE: '📵 Client Injoignable (Ne décroche pas / Téléphone éteint)',
      CLIENT_CANCELLED: '❌ Client a déjà trouvé / Annulé son besoin',
      WRONG_NUMBER: '📍 Faux Numéro / Adresse Introuvable',
      PRICE_DISAGREEMENT: '💸 Désaccord Devis / Refus de Déplacement'
    };

    await quickCreditMaalem(targetMaalemId, 15.0);

    const newAlert = {
      id: 'alert-' + Date.now(),
      intervention_id: interventionId,
      maalem_id: targetMaalemId,
      maalem_name: targetMaalem?.full_name || user?.full_name || 'Artisan Maâlem',
      maalem_phone: targetMaalem?.phone || user?.phone || '',
      client_name: targetIntv?.client_name || 'Client BricoleMoi',
      client_phone: targetIntv?.client_phone || '',
      district: targetIntv?.district || 'Casablanca',
      service_type: targetIntv?.service_type || 'PLUMBING',
      reason_code: reason,
      reason_label: reasonLabels[reason] || reason,
      comment: notes
        ? `${reasonLabels[reason] || reason} - Notes: ${notes}`
        : reasonLabels[reason] || reason,
      rating: 1,
      status: 'REFUNDED_RESOLVED',
      compensation_type: 'REPLACEMENT_CREDIT_LEAD',
      created_at: new Date().toISOString()
    };

    setAdminAlerts((prev) => [newAlert, ...prev]);

    setInterventions((prev) =>
      prev.map((item) =>
        String(item.id).trim() === String(interventionId).trim()
          ? {
              ...item,
              status: 'UNREACHABLE_REFUNDED',
              unreachable_reason: reasonLabels[reason] || reason,
              refunded_at: new Date().toISOString()
            }
          : item
      )
    );

    const payload = {
      type: 'NEW_DISPUTE_REPORTED',
      alert: newAlert,
      _ts: Date.now()
    };
    try {
      localStorage.setItem('bricolemoi_sync_payload', JSON.stringify(payload));
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage(payload);
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('interventions')
          .update({ status: 'UNREACHABLE_REFUNDED' })
          .eq('id', interventionId);
      } catch (e) {}
    }

    showToast(
      '🛡️ Garantie Anti-Abus BricoleMoi : 1 Crédit de remplacement (+15.00 DH) accordé sur votre solde !',
      'success'
    );
    return true;
  };

  const reportUnreachableClient = (interventionId, reason) =>
    reportDisputeIssue({ interventionId, reason: 'CLIENT_UNREACHABLE', notes: reason });

  const resolveDisputeAndRefund = async ({
    alertId,
    maalemId,
    amount = 15,
    shouldRefund = true,
    adminNotes = ''
  }) => {
    const statusToSet = shouldRefund ? 'REFUNDED_RESOLVED' : 'REJECTED';
    const cleanAlertId = String(alertId || '').trim();
    const targetIntId = cleanAlertId.replace(/^dispute-/, '');

    if (shouldRefund && maalemId) {
      await quickCreditMaalem(maalemId, amount);
    }

    // Persistance immédiate dans Supabase
    if (targetIntId) {
      try {
        const patchData = {
          updated_at: new Date().toISOString(),
          unfeasible_notes: `${statusToSet}: ${adminNotes || (shouldRefund ? 'Remboursement accordé' : 'Réclamation rejetée')}`
        };
        if (shouldRefund) {
          patchData.status = 'UNREACHABLE_REFUNDED';
        }
        await supabase
          .from('interventions')
          .update(patchData)
          .eq('id', targetIntId);
      } catch (err) {
        console.warn('Supabase dispute update warning:', err);
      }
    }

    setAdminAlerts((prev) => {
      let found = false;
      const next = prev.map((a) => {
        if (
          String(a.id).trim() === cleanAlertId ||
          String(a.intervention_id).trim() === cleanAlertId ||
          String(a.intervention_id).trim() === targetIntId
        ) {
          found = true;
          return {
            ...a,
            status: statusToSet,
            resolved_at: new Date().toISOString(),
            resolution_type: statusToSet,
            admin_notes: adminNotes
          };
        }
        return a;
      });

      if (!found) {
        next.push({
          id: cleanAlertId,
          intervention_id: targetIntId,
          maalem_id: maalemId,
          status: statusToSet,
          resolved_at: new Date().toISOString(),
          resolution_type: statusToSet,
          admin_notes: adminNotes
        });
      }

      try {
        localStorage.setItem('bricolemoi_admin_alerts', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    try {
      const resolvedMap = JSON.parse(
        localStorage.getItem('bricolemoi_resolved_disputes') || '{}'
      );
      resolvedMap[cleanAlertId] = statusToSet;
      resolvedMap[targetIntId] = statusToSet;
      localStorage.setItem(
        'bricolemoi_resolved_disputes',
        JSON.stringify(resolvedMap)
      );
    } catch (e) {}

    setInterventions((prev) => {
      const next = prev.map((item) =>
        String(item.id).trim() === String(targetIntId).trim()
          ? {
              ...item,
              dispute_status: statusToSet,
              unfeasible_notes: `${statusToSet}: ${adminNotes}`,
              dispute_resolved_at: new Date().toISOString(),
              status: shouldRefund ? 'UNREACHABLE_REFUNDED' : item.status
            }
          : item
      );
      try {
        localStorage.setItem(
          'bricolemoi_interventions_cache',
          JSON.stringify(next)
        );
      } catch (e) {}
      return next;
    });

    broadcastSync({
      type: 'DISPUTE_RESOLVED',
      alertId: cleanAlertId,
      interventionId: targetIntId,
      status: statusToSet,
      _ts: Date.now()
    });

    showToast(
      shouldRefund
        ? '✅ Crédit de remplacement (+15 DH) accordé et dossier clôturé !'
        : '❌ Réclamation de litige rejetée et dossier clôturé !',
      'success'
    );
  };

  const awardManualFreeLead = async (
    maalemId,
    reason = 'Geste commercial Admin'
  ) => {
    const targetMaalem = maalems.find(
      (m) => String(m.id).trim() === String(maalemId).trim()
    );
    const rewardAmount = 15.0;

    await quickCreditMaalem(maalemId, rewardAmount);

    const newRewardRecord = {
      id: 'manual-reward-' + Date.now(),
      maalem_id: maalemId,
      maalem_name: targetMaalem?.full_name || 'Artisan Maalem',
      maalem_phone: targetMaalem?.phone || '',
      reward_type: 'MANUAL_FREE_LEAD',
      reward_value_dh: rewardAmount,
      qualifying_reviews_count: 0,
      admin_notes: reason,
      created_at: new Date().toISOString(),
      status: 'GRANTED_BY_ADMIN'
    };

    setLoyaltyRewardsHistory((prev) => {
      const next = [newRewardRecord, ...prev];
      try {
        localStorage.setItem(
          'bricolemoi_loyalty_rewards_cache',
          JSON.stringify(next)
        );
      } catch (e) {}
      return next;
    });

    broadcastSync({
      type: 'LOYALTY_LEAD_REWARDED',
      reward: newRewardRecord,
      maalem_id: maalemId,
      _ts: Date.now()
    });

    showToast(
      `🎁 1 Lead Gratuit (+15 DH) accordé avec succès à ${
        targetMaalem?.full_name || "l'artisan"
      } !`,
      'success'
    );
  };

  return {
    requestOnSiteReview,
    submitReview,
    reportDisputeIssue,
    reportUnreachableClient,
    resolveDisputeAndRefund,
    awardManualFreeLead
  };
};
