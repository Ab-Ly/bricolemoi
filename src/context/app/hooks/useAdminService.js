import { db, isDbConfigured, supabase, isSupabaseConfigured } from '../../../lib/dbClient';
import { generateReceiptPDF } from '../../../lib/pdfReceiptGenerator';

export const useAdminService = ({
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
}) => {
  const verifyMaalemCINWithGemini = async ({
    maalem_id,
    cin_photo_url,
    cin_photo_verso_url,
    full_name,
    phone,
    cin_number_hint
  }) => {
    const maalemId = maalem_id || user?.id;
    const maalemName = full_name || user?.full_name;

    if (!isSupabaseConfigured || !maalemId) {
      showToast('⚠️ Supabase requis pour la vérification CIN.', 'error');
      return { success: false, error: 'Supabase non configuré' };
    }

    try {
      const { data, error } = await supabase.functions.invoke('verify-maalem-cin', {
        body: {
          maalem_id: maalemId,
          cin_photo_url,
          cin_photo_verso_url,
          full_name: maalemName,
          phone: phone || user?.phone,
          cin_number_hint
        }
      });

      if (error || !data?.success) {
        const errMsg = data?.error || error?.message || 'Erreur vérification CIN';
        showToast(`⚠️ ${errMsg}`, 'error');
        return data || { success: false, error: errMsg };
      }

      const newBalance =
        (user?.maalem_details?.credit_balance || 0) + (data.bonus_added_dh || 15.0);

      if (isSupabaseConfigured) {
        try {
          const httpRectoUrl =
            cin_photo_url &&
            typeof cin_photo_url === 'string' &&
            cin_photo_url.startsWith('http')
              ? cin_photo_url
              : null;
          const httpVersoUrl =
            cin_photo_verso_url &&
            typeof cin_photo_verso_url === 'string' &&
            cin_photo_verso_url.startsWith('http')
              ? cin_photo_verso_url
              : null;

          const finalCinNumber =
            cin_number_hint && String(cin_number_hint).trim()
              ? String(cin_number_hint).trim().toUpperCase()
              : data?.cin_number;

          const detailsUpdate = {
            is_verified: true,
            cin_number: finalCinNumber,
            credit_balance: newBalance
          };
          if (httpRectoUrl) {
            detailsUpdate.cin_photo_url = httpRectoUrl;
            detailsUpdate.cin_photo_recto_url = httpRectoUrl;
          }
          if (httpVersoUrl) {
            detailsUpdate.cin_photo_verso_url = httpVersoUrl;
          }

          let { error: mdErr } = await supabase
            .from('maalem_details')
            .update({ ...detailsUpdate, cin_verified: true })
            .eq('id', maalemId);

          if (mdErr && mdErr.message?.includes('cin_verified')) {
            await supabase.from('maalem_details').update(detailsUpdate).eq('id', maalemId);
          }

          await supabase.from('transactions').upsert([
            {
              maalem_id: maalemId,
              amount_dh: data.bonus_added_dh || 15.0,
              type: 'BONUS',
              payment_method: 'WELCOME_BONUS_15DH',
              reference_ref: 'GEMINI_VISION_OCR_' + finalCinNumber,
              status: 'VALIDATED'
            }
          ]);
        } catch (dbErr) {
          console.warn('[Supabase] verifyMaalemCIN DB update warning:', dbErr.message);
        }
      }

      const finalCinNumber =
        cin_number_hint && String(cin_number_hint).trim()
          ? String(cin_number_hint).trim().toUpperCase()
          : data?.cin_number;

      const updatedUser = {
        ...user,
        cin_verified: true,
        is_verified: true,
        cin_number: finalCinNumber,
        maalem_details: {
          ...(user?.maalem_details || {}),
          cin_verified: true,
          is_verified: true,
          cin_number: finalCinNumber,
          cin_photo_url: cin_photo_url,
          cin_photo_recto_url: cin_photo_url,
          cin_photo_verso_url: cin_photo_verso_url,
          credit_balance: newBalance
        }
      };
      setUser(updatedUser);

      setMaalems((prev) =>
        prev.map((m) =>
          m.id === maalemId
            ? {
                ...m,
                cin_verified: true,
                is_verified: true,
                cin_number: finalCinNumber,
                cin_photo_url: cin_photo_url,
                cin_photo_recto_url: cin_photo_url,
                cin_photo_verso_url: cin_photo_verso_url,
                credit_balance: newBalance
              }
            : m
        )
      );

      setTransactions((prev) => [
        {
          id: 'tx-welcome-' + Date.now(),
          maalem_id: maalemId,
          maalem_name: maalemName,
          amount_dh: data.bonus_added_dh || 15.0,
          type: 'BONUS',
          payment_method: 'WELCOME_BONUS_15DH',
          reference_ref: 'GEMINI_VISION_OCR_' + data.cin_number,
          status: 'VALIDATED',
          created_at: new Date().toISOString()
        },
        ...prev
      ]);

      setWhatsappMsg(data.whatsapp_message);
      showToast(
        `🤖 CIN ${data.cin_number} vérifiée ! +${data.bonus_added_dh || 15} DH offerts 🎁`,
        'success'
      );

      return data;
    } catch (err) {
      console.warn('[Supabase] Edge Function verify-maalem-cin error:', err.message);
      showToast("⚠️ Erreur lors de l'appel à l'Edge Function.", 'error');
      return { success: false, error: err.message };
    }
  };

  const manualApproveCIN = async (maalemId, cinNumber) => {
    const cleanCin = String(cinNumber || '').trim().toUpperCase() || 'AB123456';

    setMaalems((prev) =>
      prev.map((m) =>
        m.id === maalemId
          ? { ...m, is_verified: true, cin_verified: true, cin_number: cleanCin }
          : m
      )
    );

    if (user && user.id === maalemId) {
      setUser((prev) => ({
        ...prev,
        is_verified: true,
        cin_verified: true,
        cin_number: cleanCin,
        maalem_details: prev?.maalem_details
          ? { ...prev.maalem_details, is_verified: true, cin_verified: true, cin_number: cleanCin }
          : undefined
      }));
    }

    try {
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage({ type: 'CIN_APPROVED', maalemId, cinNumber: cleanCin });
      bc.close();
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('maalem_details')
          .update({ is_verified: true, cin_verified: true, cin_number: cleanCin })
          .eq('id', maalemId);
      } catch (err) {
        console.warn('[Supabase] manualApproveCIN warning:', err.message);
      }
    }

    showToast(`✅ Dossier CIN validé manuellement (N° ${cleanCin}) !`, 'success');
  };

  const manualRejectCIN = async (maalemId, reason = 'Document illisible ou non conforme') => {
    setMaalems((prev) =>
      prev.map((m) =>
        m.id === maalemId
          ? {
              ...m,
              is_verified: false,
              cin_verified: false,
              cin_rejection_reason: reason
            }
          : m
      )
    );

    if (user && user.id === maalemId) {
      setUser((prev) => ({
        ...prev,
        is_verified: false,
        cin_verified: false,
        maalem_details: prev?.maalem_details
          ? { ...prev.maalem_details, is_verified: false, cin_verified: false, cin_rejection_reason: reason }
          : undefined
      }));
    }

    try {
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage({ type: 'CIN_REJECTED', maalemId, reason });
      bc.close();
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('maalem_details')
          .update({ is_verified: false, cin_verified: false, cin_rejection_reason: reason })
          .eq('id', maalemId);
      } catch (err) {
        console.warn('[Supabase] manualRejectCIN warning:', err.message);
      }
    }

    showToast(`🔴 Dossier CIN rejeté pour l'artisan (Motif : ${reason}) !`, 'error');
  };

  const updateMaalemCIN = async (maalemId, newCinNumber) => {
    const cleanCin = String(newCinNumber || '').trim().toUpperCase();
    if (!cleanCin) return;

    setMaalems((prev) =>
      prev.map((m) => (m.id === maalemId ? { ...m, cin_number: cleanCin } : m))
    );

    if (user && user.id === maalemId) {
      setUser((prev) => ({
        ...prev,
        cin_number: cleanCin,
        maalem_details: prev?.maalem_details
          ? { ...prev.maalem_details, cin_number: cleanCin }
          : undefined
      }));
    }

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('maalem_details')
          .update({ cin_number: cleanCin })
          .eq('id', maalemId);
      } catch (err) {
        console.warn('[Supabase] updateMaalemCIN warning:', err.message);
      }
    }

    showToast(`✅ N° CIN mis à jour : ${cleanCin}`, 'success');
  };

  const toggleMaalemSuspension = (maalemId) => {
    setMaalems((prev) =>
      prev.map((m) => {
        if (m.id === maalemId) {
          const nextState = !m.is_suspended;
          showToast(
            nextState
              ? `🔴 Compte Maalem ${m.full_name} SUSPENDU !`
              : `🟢 Compte Maalem ${m.full_name} RÉACTIVÉ !`,
            nextState ? 'error' : 'success'
          );
          return { ...m, is_suspended: nextState };
        }
        return m;
      })
    );
  };

  const toggleClientSuspension = async (clientId) => {
    let nextState = false;
    setClients((prev) =>
      prev.map((c) => {
        if (String(c.id).trim() === String(clientId).trim()) {
          nextState = !c.is_suspended;
          showToast(
            nextState
              ? `🔴 Compte Client ${c.full_name} SUSPENDU !`
              : `🟢 Compte Client ${c.full_name} RÉACTIVÉ !`,
            nextState ? 'error' : 'success'
          );
          return { ...c, is_suspended: nextState };
        }
        return c;
      })
    );
    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({ is_suspended: nextState }).eq('id', clientId);
      } catch (e) {}
    }
  };

  const handleGenerateReceiptPDF = (tx) => {
    generateReceiptPDF(tx, maalems, user);
  };

  const clearAllTestData = async () => {
    setInterventions([]);
    setTransactions([]);
    setAdminNotifications([]);
    setReviews([]);
    setAdminAlerts([]);

    if (user?.role?.toUpperCase() === 'MAALEM') {
      setMaalems([
        {
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
          specialty: user.maalem_details?.specialty || 'PLUMBING',
          rating_avg: 5.0,
          is_verified: user.maalem_details?.is_verified || false,
          cin_verified: user.maalem_details?.cin_verified || false,
          credit_balance: user.maalem_details?.credit_balance || 0,
          district: user.city_zone || 'Casablanca'
        }
      ]);
    } else {
      setMaalems([]);
    }

    try {
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage({ type: 'PURGE_ALL_DATA' });
      bc.close();
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        const isValidUUID = (str) =>
          typeof str === 'string' &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
        await supabase.from('interventions').delete().not('id', 'is', null);
        await supabase.from('transactions').delete().not('id', 'is', null);
        if (user?.id && isValidUUID(user.id)) {
          await supabase.from('maalem_details').delete().neq('id', user.id);
          await supabase.from('profiles').delete().eq('role', 'maalem').neq('id', user.id);
        }
      } catch (err) {
        console.warn('[Supabase] Erreur lors de la purge:', err.message);
      }
    }
    showToast('🧹 Toutes les données de test ont été réinitialisées !', 'success');
  };

  return {
    verifyMaalemCINWithGemini,
    manualApproveCIN,
    manualRejectCIN,
    updateMaalemCIN,
    toggleMaalemSuspension,
    toggleClientSuspension,
    generateReceiptPDF: handleGenerateReceiptPDF,
    clearAllTestData
  };
};
