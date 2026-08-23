-- ==============================================================================
-- BricoleMoi : Procédure Stockée Atomique Sécurisée pour le Déblocage de Leads
-- ==============================================================================
-- Cette fonction s'exécute côté serveur PostgreSQL en mode SECURITY DEFINER.
-- Elle garantit qu'aucun client ne peut falsifier son solde ou voler un lead déjà attribué.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.unlock_lead_secure(
    p_maalem_id UUID,
    p_intervention_id UUID,
    p_cost NUMERIC DEFAULT 15.00
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_intervention RECORD;
    v_active_missions_count INT;
    v_total_credits NUMERIC(10, 2) := 0;
    v_total_validated_debits NUMERIC(10, 2) := 0;
    v_total_reserved_escrow NUMERIC(10, 2) := 0;
    v_available_balance NUMERIC(10, 2) := 0;
    v_lead_cost NUMERIC(10, 2);
    v_result JSONB;
BEGIN
    -- 1. Verrouiller la ligne de l'intervention pour éviter toute race condition (concurrence)
    SELECT * INTO v_intervention
    FROM public.interventions
    WHERE id = p_intervention_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'INTERVENTION_NOT_FOUND',
            'message', 'Demande d''intervention introuvable.'
        );
    END IF;

    -- 2. Vérifier que l'intervention est bien en attente (PENDING)
    IF v_intervention.status != 'PENDING' THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'LEAD_ALREADY_TAKEN',
            'message', 'Cette mission a déjà été acceptée par un autre artisan ou a été annulée.'
        );
    END IF;

    -- 3. Règle anti-accumulation : Vérifier si l'artisan a déjà une autre mission en cours
    SELECT COUNT(*) INTO v_active_missions_count
    FROM public.interventions
    WHERE maalem_id = p_maalem_id
      AND id != p_intervention_id
      AND status IN ('ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION');

    IF v_active_missions_count >= 1 THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'ACTIVE_MISSION_LIMIT',
            'message', 'Vous avez déjà 1 mission active en cours d''exécution. Clôturez-la avant d''accepter une nouvelle mission.'
        );
    END IF;

    -- 4. Calculer le solde réel de l'artisan directement depuis le Grand Livre des Transactions
    -- A. Total des Recharges et Bonus Validés
    SELECT COALESCE(SUM(amount_dh), 0) INTO v_total_credits
    FROM public.transactions
    WHERE maalem_id = p_maalem_id
      AND (status = 'VALIDATED' OR status IS NULL)
      AND (type IN ('RECHARGE', 'CREDIT', 'BONUS') OR amount_dh > 0);

    -- B. Total des Débits Validés
    SELECT COALESCE(SUM(ABS(amount_dh)), 0) INTO v_total_validated_debits
    FROM public.transactions
    WHERE maalem_id = p_maalem_id
      AND status = 'VALIDATED'
      AND (type IN ('LEAD_DEDUCTION', 'DEBIT') OR amount_dh < 0);

    -- C. Total de l'Escrow actuellement réservé (missions en cours)
    SELECT COALESCE(SUM(ABS(amount_dh)), 0) INTO v_total_reserved_escrow
    FROM public.transactions
    WHERE maalem_id = p_maalem_id
      AND status = 'RESERVED';

    -- Solde disponible = Crédits - Débits validés - Réservations temporaires
    v_available_balance := (v_total_credits - v_total_validated_debits) - v_total_reserved_escrow;

    -- Fallback si aucune transaction n'existe encore : vérifier credit_balance sur maalem_details
    IF v_total_credits = 0 AND v_total_validated_debits = 0 THEN
        SELECT COALESCE(credit_balance, 15.00) INTO v_available_balance
        FROM public.maalem_details
        WHERE id = p_maalem_id;
    END IF;

    v_lead_cost := COALESCE(v_intervention.cost_lead, p_cost, 15.00);

    -- 5. Vérification du solde minimum
    IF v_available_balance < v_lead_cost THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'INSUFFICIENT_BALANCE',
            'available_balance', v_available_balance,
            'required_cost', v_lead_cost,
            'message', 'Solde disponible insuffisant (' || v_available_balance || ' DH disponible / ' || v_lead_cost || ' DH requis).'
        );
    END IF;

    -- 6. Exécution de la transaction atomique (Mise à jour intervention + Création Escrow)
    -- A. Mettre à jour l'intervention
    UPDATE public.interventions
    SET status = 'ACCEPTED',
        maalem_id = p_maalem_id,
        escrow_status = 'RESERVED',
        accepted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_intervention_id;

    -- B. Insérer la transaction d'escrow
    INSERT INTO public.transactions (
        maalem_id,
        amount_dh,
        type,
        payment_method,
        reference_ref,
        status,
        admin_notes,
        created_at
    )
    VALUES (
        p_maalem_id,
        -v_lead_cost,
        'LEAD_ESCROW',
        'SYSTEM_ESCROW',
        'ESCROW_INT_' || p_intervention_id,
        'RESERVED',
        'Réservation garantie pour mission #' || p_intervention_id,
        NOW()
    );

    -- 7. Retourner le résultat avec les coordonnées débloquées
    RETURN jsonb_build_object(
        'success', true,
        'code', 'LEAD_UNLOCKED',
        'message', 'Mission débloquée avec succès.',
        'data', jsonb_build_object(
            'intervention_id', p_intervention_id,
            'maalem_id', p_maalem_id,
            'cost_lead', v_lead_cost,
            'client_name', v_intervention.client_name,
            'client_phone', v_intervention.client_phone,
            'client_address', v_intervention.client_address,
            'latitude', v_intervention.latitude,
            'longitude', v_intervention.longitude,
            'status', 'ACCEPTED',
            'escrow_status', 'RESERVED'
        )
    );
END;
$$;
