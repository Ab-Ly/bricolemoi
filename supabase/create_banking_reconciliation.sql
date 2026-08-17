-- ============================================================================
-- MODULE DE RAPPROCHEMENT BANCAIRE & GESTION DES TRANSACTIONS POUR BRICOLEMOI 🇲🇦
-- ============================================================================

-- 1. Table TRANSACTIONS enrichie pour le rapprochement bancaire réel
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    maalem_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount_dh NUMERIC(10, 2) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('RECHARGE', 'ADMIN_CREDIT', 'ADMIN_DEBIT', 'LEAD_DEDUCTION', 'BONUS', 'REFUND')),
    payment_method VARCHAR(50) NOT NULL DEFAULT 'Cash Plus',
    reference_ref VARCHAR(100),
    receipt_photo_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VALIDATED', 'REJECTED')),
    admin_notes TEXT,
    reconciled_at TIMESTAMPTZ,
    reconciled_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assurer que toutes les colonnes existent si la table existait déjà
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) NOT NULL DEFAULT 'Cash Plus';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reference_ref VARCHAR(100);
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS receipt_photo_url TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'PENDING';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_at TIMESTAMPTZ;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Index pour requêtes financières et rapprochements rapides
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_maalem_id ON public.transactions(maalem_id);
CREATE INDEX IF NOT EXISTS idx_transactions_payment_method ON public.transactions(payment_method);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_reference_ref ON public.transactions(reference_ref);

-- Activer RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
DROP POLICY IF EXISTS "Public Manage Transactions" ON public.transactions;
CREATE POLICY "Public Manage Transactions" ON public.transactions FOR ALL USING (true);

-- Activer le Realtime sur les transactions
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- 2. PROCÉDURE STOCKÉE ATOMIQUE DE RAPPROCHEMENT BANCAIRE
-- Permet de valider ou rejeter une transaction et de mettre à jour le solde du Maâlem en une seule transaction ACID.
CREATE OR REPLACE FUNCTION public.reconcile_transaction(
    p_transaction_id UUID,
    p_admin_id UUID,
    p_action VARCHAR(20), -- 'VALIDATE' ou 'REJECT'
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_tx RECORD;
    v_new_balance NUMERIC(10, 2);
    v_maalem_name VARCHAR(100);
BEGIN
    -- Récupérer la transaction
    SELECT * INTO v_tx 
    FROM public.transactions 
    WHERE id = p_transaction_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Transaction introuvable');
    END IF;

    IF v_tx.status != 'PENDING' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Cette transaction a déjà été traitée');
    END IF;

    -- Récupérer le nom de l'artisan
    SELECT full_name INTO v_maalem_name 
    FROM public.profiles 
    WHERE id = v_tx.maalem_id;

    IF p_action = 'VALIDATE' THEN
        -- Mettre à jour la transaction
        UPDATE public.transactions
        SET status = 'VALIDATED',
            reconciled_at = now(),
            reconciled_by = p_admin_id,
            admin_notes = COALESCE(p_notes, admin_notes)
        WHERE id = p_transaction_id;

        -- Créditer le solde dans maalem_details
        UPDATE public.maalem_details
        SET credit_balance = credit_balance + v_tx.amount_dh
        WHERE id = v_tx.maalem_id
        RETURNING credit_balance INTO v_new_balance;

        -- Synchroniser le solde sur profiles
        UPDATE public.profiles
        SET credits = COALESCE(credits, 0) + v_tx.amount_dh
        WHERE id = v_tx.maalem_id;

        -- Créer une notification pour l'artisan
        INSERT INTO public.admin_notifications (type, title, message, data)
        VALUES (
            'RECHARGE',
            '✅ Recharge Validée (' || v_tx.amount_dh || ' DH)',
            'Votre recharge de ' || v_tx.amount_dh || ' DH via ' || v_tx.payment_method || ' a été validée par l''administration. Nouveau solde : ' || v_new_balance || ' DH.',
            jsonb_build_object('maalem_id', v_tx.maalem_id, 'amount_dh', v_tx.amount_dh, 'status', 'VALIDATED')
        );

        RETURN jsonb_build_object(
            'success', true, 
            'status', 'VALIDATED', 
            'amount_dh', v_tx.amount_dh, 
            'new_balance', v_new_balance,
            'maalem_name', v_maalem_name
        );

    ELSIF p_action = 'REJECT' THEN
        -- Rejeter la transaction
        UPDATE public.transactions
        SET status = 'REJECTED',
            reconciled_at = now(),
            reconciled_by = p_admin_id,
            admin_notes = COALESCE(p_notes, 'Bordereau ou référence non reconnue')
        WHERE id = p_transaction_id;

        -- Notification de rejet
        INSERT INTO public.admin_notifications (type, title, message, data)
        VALUES (
            'RECHARGE',
            '❌ Demande de Recharge Rejetée',
            'Votre demande de recharge de ' || v_tx.amount_dh || ' DH via ' || v_tx.payment_method || ' a été rejetée. Motif : ' || COALESCE(p_notes, 'Référence de paiement invalide.'),
            jsonb_build_object('maalem_id', v_tx.maalem_id, 'amount_dh', v_tx.amount_dh, 'status', 'REJECTED')
        );

        RETURN jsonb_build_object(
            'success', true, 
            'status', 'REJECTED', 
            'reason', p_notes
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'error', 'Action invalide (VALIDATE ou REJECT attendu)');
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
