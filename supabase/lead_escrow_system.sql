-- ==============================================================================
-- MIGRATION SUPABASE : SYSTÈME DE LEAD EN INSTANCE (LEAD ESCROW)
-- ==============================================================================

-- 1. Mise à jour de la contrainte sur le statut des transactions
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE public.transactions 
  ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING', 'RESERVED', 'VALIDATED', 'CANCELLED', 'REJECTED'));

-- 2. Mise à jour de la contrainte sur le type de transaction (si existante)
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_type_check;
ALTER TABLE public.transactions 
  ADD CONSTRAINT transactions_type_check 
  CHECK (type IN ('RECHARGE', 'LEAD_DEDUCTION', 'LEAD_ESCROW', 'BONUS', 'REFUND', 'DEBIT', 'CREDIT'));

-- 3. Colonnes d'escrow et d'abandon sur interventions si non existantes
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(50) DEFAULT 'NONE'; -- 'NONE', 'RESERVED', 'DEBITED', 'RELEASED'
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS unfeasible_reason TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS unfeasible_reported_at TIMESTAMPTZ;

-- 4. Trigger intelligent pour la gestion de l'escrow lors de l'acceptation et complétion
CREATE OR REPLACE FUNCTION public.manage_lead_escrow()
RETURNS TRIGGER AS $$
DECLARE
    v_available_credits NUMERIC(10, 2);
    v_active_missions INT;
BEGIN
    -- CAS 1 : ACCEPTATION DU LEAD (MISE EN ESCROW / RÉSERVE 15 DH)
    IF NEW.status = 'ACCEPTED' AND (OLD.status IS NULL OR OLD.status = 'PENDING') AND NEW.maalem_id IS NOT NULL THEN
        -- Vérifier si l'artisan a déjà une autre mission active en cours
        SELECT COUNT(*) INTO v_active_missions
        FROM public.interventions
        WHERE maalem_id = NEW.maalem_id
          AND id != NEW.id
          AND status IN ('ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION');

        IF v_active_missions >= 1 THEN
            RAISE EXCEPTION 'Vous avez déjà une mission active en cours. Terminez-la avant d''en accepter une nouvelle.';
        END IF;

        -- Vérifier le solde disponible du Maalem
        SELECT credit_balance INTO v_available_credits 
        FROM public.maalem_details 
        WHERE id = NEW.maalem_id;

        IF v_available_credits IS NULL OR v_available_credits < COALESCE(NEW.cost_lead, 15.00) THEN
            RAISE EXCEPTION 'Solde disponible insuffisant (minimum 15.00 DH requis).';
        END IF;

        -- Marquer l'intervention en statut escrow RESERVED
        NEW.escrow_status := 'RESERVED';

        -- Créer la transaction d'escrow en statut RESERVED (non débitée définitivement)
        INSERT INTO public.transactions (
            maalem_id, 
            amount_dh, 
            type, 
            payment_method, 
            reference_ref, 
            status, 
            admin_notes
        )
        VALUES (
            NEW.maalem_id, 
            -COALESCE(NEW.cost_lead, 15.00), 
            'LEAD_ESCROW', 
            'SYSTEM_ESCROW', 
            'ESCROW_INT_' || NEW.id, 
            'RESERVED', 
            'Réservation temporaire 15 DH en garantie pour mission #' || NEW.id
        );
    END IF;

    -- CAS 2 : COMPLÉTION DU LEAD (VALIDATION DU DÉBIT DÉFINITIF)
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' AND NEW.maalem_id IS NOT NULL THEN
        NEW.escrow_status := 'DEBITED';

        -- Déduire définitivement du credit_balance
        UPDATE public.maalem_details 
        SET credit_balance = credit_balance - COALESCE(NEW.cost_lead, 15.00)
        WHERE id = NEW.maalem_id;

        -- Synchroniser credits sur profiles
        UPDATE public.profiles
        SET credits = credits - COALESCE(NEW.cost_lead, 15.00)
        WHERE id = NEW.maalem_id;

        -- Passer la transaction d'escrow en statut VALIDATED
        UPDATE public.transactions
        SET status = 'VALIDATED',
            admin_notes = 'Débit confirmé après réalisation des travaux pour mission #' || NEW.id
        WHERE maalem_id = NEW.maalem_id 
          AND reference_ref = 'ESCROW_INT_' || NEW.id
          AND status = 'RESERVED';
    END IF;

    -- CAS 3 : MISSION ANNULÉE OU NON RÉALISABLE (LIBÉRATION DE L'ESCROW 0 DH DÉBITÉ)
    IF (NEW.status = 'CANCELLED' OR NEW.status = 'UNFEASIBLE' OR NEW.status = 'UNREACHABLE_REFUNDED') 
       AND OLD.status IN ('ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION') 
       AND NEW.maalem_id IS NOT NULL THEN
        NEW.escrow_status := 'RELEASED';

        -- Passer la transaction d'escrow en statut CANCELLED (restitution immédiate des 15 DH)
        UPDATE public.transactions
        SET status = 'CANCELLED',
            admin_notes = 'Garantie libérée (0 DH débité) - Mission non réalisable : ' || COALESCE(NEW.unfeasible_reason, 'Abandon')
        WHERE maalem_id = NEW.maalem_id 
          AND reference_ref = 'ESCROW_INT_' || NEW.id
          AND status = 'RESERVED';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Remplacement de l'ancien trigger par le nouveau trigger escrow
DROP TRIGGER IF EXISTS trigger_deduct_lead ON public.interventions;
DROP TRIGGER IF EXISTS trigger_manage_lead_escrow ON public.interventions;
CREATE TRIGGER trigger_manage_lead_escrow
BEFORE UPDATE ON public.interventions
FOR EACH ROW EXECUTE FUNCTION public.manage_lead_escrow();
