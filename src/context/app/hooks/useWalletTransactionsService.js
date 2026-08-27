import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient';
import { notify } from '../../../lib/notify';
import { publishRealtimeEvent } from '../../../lib/ablyRealtimeService';
import { ABLY_CHANNELS } from '../../../lib/ablyClient';
import {
  toSafeUUID,
  broadcastSync,
  isCurrentUserMaalemOfTransaction
} from '../helpers/appSyncHelpers';

export const useWalletTransactionsService = ({
  user,
  setUser,
  transactions,
  setTransactions,
  maalems,
  setMaalems,
  showToast,
  userRef
}) => {
  const reserveLeadCredit = async (
    interventionId,
    customMaalemId = null,
    amount = 15.0
  ) => {
    // Le déblocage direct (LEAD_DEDUCTION 15 DH) est géré directement par acceptLead
    return true;
  };

  const confirmLeadDebit = async (
    interventionId,
    customMaalemId = null,
    amount = 15.0
  ) => {
    // La déduction de lead est déjà définitivement validée lors du déblocage
    return true;
  };

  const releaseLeadCredit = async (
    interventionId,
    reason = 'Mission non réalisable'
  ) => {
    const cleanIntId = String(interventionId).trim();
    const maalemId = user?.id;
    const cleanMaalemId = String(maalemId || 'maalem-1').trim();
    const liveMaalem = (maalems || []).find((m) => String(m.id).trim() === cleanMaalemId) || user?.maalem_details || user;
    const nowIso = new Date().toISOString();

    const refundTx = {
      id: `tx-refund-${cleanIntId}-${Date.now()}`,
      maalem_id: cleanMaalemId,
      maalem_name: user?.full_name || liveMaalem?.full_name || 'Artisan Maalem',
      maalem_phone: user?.phone || liveMaalem?.phone || '',
      amount_dh: 15.0,
      type: 'RECHARGE',
      payment_method: 'Remboursement Lead 🛡️',
      reference_ref: `REFUND_INT_${cleanIntId}`,
      status: 'VALIDATED',
      admin_notes: `Remboursement 15 DH suite à mission non réalisable (${reason}) #${cleanIntId}`,
      created_at: nowIso
    };

    setTransactions((prev) => [refundTx, ...prev]);

    const currentBal = Number(user?.maalem_details?.credit_balance || user?.credits || liveMaalem?.credit_balance || 0);
    const newBal = currentBal + 15.0;

    if (user?.role === 'MAALEM') {
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
        String(m.id).trim() === cleanMaalemId ? { ...m, credit_balance: newBal } : m
      )
    );

    if (isSupabaseConfigured && maalemId) {
      try {
        await supabase.from('transactions').insert([
          {
            maalem_id: cleanMaalemId,
            amount_dh: 15.0,
            type: 'RECHARGE',
            payment_method: 'Remboursement Lead 🛡️',
            reference_ref: `REFUND_INT_${cleanIntId}`,
            status: 'VALIDATED',
            admin_notes: `Remboursement 15 DH suite à mission non réalisable (${reason}) #${cleanIntId}`
          }
        ]);
        await supabase
          .from('maalem_details')
          .update({ credit_balance: newBal })
          .eq('id', cleanMaalemId);
        await supabase
          .from('profiles')
          .update({ credits: newBal })
          .eq('id', cleanMaalemId);
      } catch (e) {
        console.warn('[Supabase] releaseLeadCredit warning:', e?.message);
      }
    }
  };

  const submitRechargeRequest = async ({
    amount_dh = '100',
    payment_method = 'Cash Plus',
    reference_ref = '',
    receipt_photo_url = null,
    instant = false
  }) => {
    const rechargeAmount = parseFloat(amount_dh) || 100;
    const maalemId = user?.id;
    const maalemName = user?.full_name || 'Artisan Maalem';
    const status = instant ? 'VALIDATED' : 'PENDING';

    if (!maalemId) {
      showToast('⚠️ Utilisateur non connecté.', 'error');
      return;
    }

    const newTx = {
      id: 'tx-' + Date.now(),
      maalem_id: maalemId,
      maalem_name: maalemName,
      amount_dh: rechargeAmount,
      type: 'RECHARGE',
      payment_method,
      reference_ref: reference_ref || 'REF-PACK-' + Date.now(),
      receipt_photo_url: receipt_photo_url || null,
      status,
      created_at: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (instant) {
      const currentBalance =
        parseFloat(user?.maalem_details?.credit_balance || user?.credits || 0) +
        rechargeAmount;
      const updatedUser = {
        ...user,
        credits: currentBalance,
        maalem_details: {
          ...(user?.maalem_details || {}),
          credit_balance: currentBalance
        }
      };
      setUser(updatedUser);
      try {
        sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
      } catch (e) {}

      setMaalems((prev) =>
        prev.map((m) =>
          m.id === maalemId ? { ...m, credit_balance: currentBalance } : m
        )
      );
    }

    try {
      const bc = new BroadcastChannel('bricolemoi_intertab_sync');
      bc.postMessage({
        type: 'RECHARGE_SUBMITTED',
        transaction: newTx,
        instant,
        maalemId,
        maalemName,
        rechargeAmount,
        paymentMethod: payment_method,
        receipt_photo_url
      });
      bc.close();
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        const cleanMaalemId = toSafeUUID(maalemId);
        const { data: insertedTx } = await supabase
          .from('transactions')
          .insert([
            {
              maalem_id: cleanMaalemId,
              amount_dh: rechargeAmount,
              type: 'RECHARGE',
              payment_method,
              reference_ref: newTx.reference_ref,
              receipt_photo_url: receipt_photo_url || null,
              status
            }
          ])
          .select()
          .maybeSingle();

        if (insertedTx) {
          setTransactions((prev) =>
            prev.map((t) => (t.id === newTx.id ? { ...t, id: insertedTx.id } : t))
          );
        }

        if (instant) {
          await supabase
            .from('maalem_details')
            .update({
              credit_balance:
                (user?.maalem_details?.credit_balance || 0) + rechargeAmount
            })
            .eq('id', cleanMaalemId);
          await supabase
            .from('profiles')
            .update({
              credits: (user?.credits || 0) + rechargeAmount
            })
            .eq('id', cleanMaalemId);
        }

        await supabase.from('admin_notifications').insert([
          {
            type: 'RECHARGE',
            title: `💳 Demande de Recharge (${rechargeAmount} DH)`,
            message: `L'artisan ${maalemName} a demandé une recharge de ${rechargeAmount} DH via ${payment_method} (Réf: ${newTx.reference_ref}).`,
            data: {
              maalem_id: maalemId,
              amount_dh: rechargeAmount,
              payment_method,
              reference_ref: newTx.reference_ref
            }
          }
        ]);
      } catch (err) {
        console.warn('[Supabase] Recharge insert warning:', err.message);
      }
    }

    showToast(
      instant
        ? `💳 Recharge de ${rechargeAmount} DH effectuée et créditée instantanément !`
        : "📋 Demande de recharge envoyée à l'Admin pour validation !",
      'success'
    );
  };

  const approveRecharge = async (transactionId, notes = '') => {
    const tx = transactions.find(
      (t) =>
        String(t.id).trim() === String(transactionId).trim() ||
        (t.reference_ref &&
          String(t.reference_ref).trim().toLowerCase() ===
            String(transactionId).trim().toLowerCase())
    );
    const targetId = tx?.id || transactionId;
    const cleanRef = tx?.reference_ref;
    const targetMaalemId = tx?.maalem_id;
    const amountDh = parseFloat(tx?.amount_dh || 0);
    const targetMaalem = maalems.find(
      (m) => String(m.id).trim() === String(targetMaalemId).trim()
    );

    setTransactions((prev) => {
      const updated = prev.map((t) =>
        String(t.id).trim() === String(targetId).trim() ||
        (cleanRef &&
          String(t.reference_ref).trim().toLowerCase() ===
            String(cleanRef).trim().toLowerCase())
          ? {
              ...t,
              status: 'VALIDATED',
              admin_notes: notes || t.admin_notes,
              reconciled_at: new Date().toISOString()
            }
          : t
      );
      try {
        localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (targetMaalemId) {
      setMaalems((prev) =>
        prev.map((m) => {
          if (String(m.id).trim() === String(targetMaalemId).trim()) {
            const newBal = (parseFloat(m.credit_balance) || 0) + amountDh;
            return { ...m, credit_balance: newBal };
          }
          return m;
        })
      );
    }

    const curr = userRef.current;
    if (
      curr &&
      (String(curr.id).trim() === String(targetMaalemId).trim() ||
        isCurrentUserMaalemOfTransaction(targetMaalemId, userRef))
    ) {
      const currentBalance =
        (parseFloat(curr.maalem_details?.credit_balance || curr.credits || 0)) +
        amountDh;
      const updatedUser = {
        ...curr,
        credits: currentBalance,
        maalem_details: {
          ...(curr?.maalem_details || {}),
          credit_balance: currentBalance
        }
      };
      setUser(updatedUser);
      try {
        sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
      } catch (e) {}
      notify.credit(amountDh, currentBalance, "Recharge Validée par l'Admin 💳", {
        id: `recharge-ok-${targetId}`
      });
    }

    broadcastSync({
      type: 'MAALEM_BALANCE_UPDATED',
      transactionId: targetId,
      reference_ref: cleanRef,
      maalemId: targetMaalemId,
      amount: amountDh,
      newBalance: (parseFloat(targetMaalem?.credit_balance || 0)) + amountDh,
      txType: 'RECHARGE',
      notes: "Recharge validée par l'administrateur"
    });

    if (targetMaalemId) {
      publishRealtimeEvent(
        'credit:added',
        {
          maalem_id: targetMaalemId,
          amount: amountDh,
          new_balance: (parseFloat(targetMaalem?.credit_balance || 0)) + amountDh,
          reason: "Recharge validée par l'Admin 💳",
          timestamp: Date.now()
        },
        ABLY_CHANNELS.getUserChannel(targetMaalemId)
      );
    }

    if (isSupabaseConfigured) {
      try {
        const updateData = {
          status: 'VALIDATED',
          admin_notes: notes || "Validé par l'administrateur",
          reconciled_at: new Date().toISOString(),
          reconciled_by: user?.id
        };

        if (cleanRef) {
          await supabase.from('transactions').update(updateData).ilike('reference_ref', cleanRef);
        } else {
          await supabase.from('transactions').update(updateData).eq('id', targetId);
        }

        if (targetMaalemId) {
          const { data: mData } = await supabase
            .from('maalem_details')
            .select('credit_balance')
            .eq('id', targetMaalemId)
            .maybeSingle();

          const newBal = (parseFloat(mData?.credit_balance) || 0) + amountDh;
          await supabase
            .from('maalem_details')
            .update({ credit_balance: newBal })
            .eq('id', targetMaalemId);
          await supabase
            .from('profiles')
            .update({ credits: newBal })
            .eq('id', targetMaalemId);
        }
      } catch (err) {
        console.warn('[Supabase] approveRecharge sync warning:', err.message);
      }
    }

    notify.success(
      'Recharge Approuvée ✅',
      `La recharge de ${amountDh.toFixed(2)} DH a été créditée avec succès.`,
      { id: `approved-${targetId}` }
    );
  };

  const rejectRecharge = async (
    transactionId,
    reason = 'Bordereau ou référence introuvable'
  ) => {
    const tx = transactions.find(
      (t) =>
        String(t.id).trim() === String(transactionId).trim() ||
        (t.reference_ref &&
          String(t.reference_ref).trim().toLowerCase() ===
            String(transactionId).trim().toLowerCase())
    );
    const targetId = tx?.id || transactionId;
    const cleanRef = tx?.reference_ref;
    const targetMaalemId = tx?.maalem_id;

    setTransactions((prev) => {
      const updated = prev.map((t) =>
        String(t.id).trim() === String(targetId).trim() ||
        (cleanRef &&
          String(t.reference_ref).trim().toLowerCase() ===
            String(cleanRef).trim().toLowerCase())
          ? {
              ...t,
              status: 'REJECTED',
              admin_notes: reason,
              reconciled_at: new Date().toISOString()
            }
          : t
      );
      try {
        localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    broadcastSync({
      type: 'RECHARGE_REJECTED',
      transactionId: targetId,
      reference_ref: cleanRef,
      maalemId: targetMaalemId,
      reason
    });

    if (isSupabaseConfigured) {
      try {
        const updateData = {
          status: 'REJECTED',
          admin_notes: reason,
          reconciled_at: new Date().toISOString(),
          reconciled_by: user?.id
        };

        if (cleanRef) {
          await supabase.from('transactions').update(updateData).ilike('reference_ref', cleanRef);
        } else {
          await supabase.from('transactions').update(updateData).eq('id', targetId);
        }
      } catch (err) {
        console.warn('[Supabase] rejectRecharge sync warning:', err.message);
      }
    }

    notify.info(
      'Recharge Refusée ❌',
      `La recharge a été rejetée (Motif : ${reason}).`,
      { id: `rejected-${targetId}` }
    );
  };

  const recordAdminPayment = async ({
    maalemId,
    amount_dh,
    payment_method,
    reference_ref,
    type = 'RECHARGE',
    notes = ''
  }) => {
    const cleanMaalemId = String(maalemId || '').trim();
    const targetMaalem = maalems.find(
      (m) => String(m.id).trim() === cleanMaalemId
    ) || { id: cleanMaalemId, full_name: 'Artisan Maalem' };

    const parsedAmount = parseFloat(amount_dh);
    const finalAmount =
      type === 'DEBIT' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const newTx = {
      id: 'tx-admin-' + Date.now(),
      maalem_id: cleanMaalemId,
      maalem_name: targetMaalem.full_name,
      amount_dh: finalAmount,
      type,
      payment_method: payment_method || 'Offert Admin 🎁',
      reference_ref: reference_ref || 'REF-ADMIN-' + Date.now(),
      status: 'VALIDATED',
      admin_notes:
        notes ||
        (type === 'DEBIT'
          ? 'Débit / Remboursement manuel'
          : 'Crédit manuel admin 🎁'),
      reconciled_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      try {
        localStorage.setItem('bricolemoi_transactions_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const currentMaalemBal = parseFloat(targetMaalem.credit_balance ?? 0);
    const calculatedNewBal = Math.max(0, currentMaalemBal + finalAmount);

    setMaalems((prev) =>
      prev.map((m) => {
        if (String(m.id).trim() === cleanMaalemId) {
          return { ...m, credit_balance: calculatedNewBal };
        }
        return m;
      })
    );

    const curr = userRef.current;
    if (
      curr &&
      (String(curr.id).trim() === cleanMaalemId ||
        isCurrentUserMaalemOfTransaction(cleanMaalemId, userRef))
    ) {
      const currentBal = parseFloat(
        curr?.credits ?? curr?.maalem_details?.credit_balance ?? 0
      );
      const newBal = Math.max(0, currentBal + finalAmount);
      const updatedUser = {
        ...curr,
        credits: newBal,
        maalem_details: {
          ...(curr?.maalem_details || {}),
          credit_balance: newBal
        }
      };
      setUser(updatedUser);
      try {
        sessionStorage.setItem('bricolemoi_session', JSON.stringify(updatedUser));
      } catch (e) {}
      notify.credit(
        finalAmount,
        newBal,
        notes || "Crédit accordé par l'Admin 🎁",
        { id: `admin-credit-${newTx.id}` }
      );
    }

    broadcastSync({
      type: 'MAALEM_BALANCE_UPDATED',
      maalemId: cleanMaalemId,
      newBalance: calculatedNewBal,
      amount: finalAmount,
      txType: type,
      notes: notes || "Crédit accordé par l'Admin 🎁"
    });

    publishRealtimeEvent(
      'credit:added',
      {
        maalem_id: cleanMaalemId,
        amount: finalAmount,
        new_balance: calculatedNewBal,
        reason: notes || "Crédit accordé par l'Admin 🎁",
        timestamp: Date.now()
      },
      ABLY_CHANNELS.getUserChannel(cleanMaalemId)
    );

    if (isSupabaseConfigured) {
      try {
        await supabase.from('transactions').insert([
          {
            maalem_id: cleanMaalemId,
            amount_dh: finalAmount,
            type,
            payment_method: payment_method || 'Offert Admin 🎁',
            reference_ref: newTx.reference_ref,
            status: 'VALIDATED',
            admin_notes: notes || "Crédit manuel de l'Admin"
          }
        ]);
        await supabase
          .from('maalem_details')
          .update({ credit_balance: calculatedNewBal })
          .eq('id', cleanMaalemId);
        await supabase
          .from('profiles')
          .update({ credits: calculatedNewBal })
          .eq('id', cleanMaalemId);
      } catch (err) {
        console.warn('[Supabase] recordAdminPayment warning:', err.message);
      }
    }
  };

  const quickCreditMaalem = (maalemId, amount) => {
    return recordAdminPayment({
      maalemId,
      amount_dh: amount,
      payment_method: 'Offert Admin 🎁',
      reference_ref: 'QUICK-BONUS-' + amount + 'DH-' + Date.now(),
      type: 'RECHARGE'
    });
  };

  return {
    reserveLeadCredit,
    confirmLeadDebit,
    releaseLeadCredit,
    submitRechargeRequest,
    approveRecharge,
    rejectRecharge,
    recordAdminPayment,
    quickCreditMaalem
  };
};
