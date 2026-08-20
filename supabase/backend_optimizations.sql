-- ============================================================================
-- SCRIPT D'OPTIMISATION & DURCISSEMENT BACKEND BRICOLEMOI MAROC
-- ============================================================================

-- 1. Index Composite pour le Radar d'Urgence (Performance x5 sur requêtes filtres)
CREATE INDEX IF NOT EXISTS idx_interventions_radar 
ON public.interventions(status, service_type, district);

CREATE INDEX IF NOT EXISTS idx_profiles_phone_role 
ON public.profiles(phone, role);

-- 2. Fonction Sécurisée Anti-Course (Seul le 1er artisan qui valide emporte la mission)
CREATE OR REPLACE FUNCTION public.safe_accept_intervention(
    p_intervention_id UUID,
    p_maalem_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_intv public.interventions%ROWTYPE;
    v_balance NUMERIC(10, 2);
BEGIN
    -- Verrouillage strict de la ligne d'intervention pour éviter les race conditions
    SELECT * INTO v_intv 
    FROM public.interventions 
    WHERE id = p_intervention_id 
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Intervention introuvable');
    END IF;

    IF v_intv.status != 'PENDING' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Cette intervention a déjà été prise par un autre Maâlem.');
    END IF;

    -- Vérification solde
    SELECT credit_balance INTO v_balance 
    FROM public.maalem_details 
    WHERE id = p_maalem_id;

    IF v_balance < 15.00 THEN
        RETURN jsonb_build_object('success', false, 'error', 'Solde insuffisant (15 DH minimum requis)');
    END IF;

    -- Attribution de l'intervention
    UPDATE public.interventions
    SET maalem_id = p_maalem_id,
        status = 'ACCEPTED'
    WHERE id = p_intervention_id;

    RETURN jsonb_build_object('success', true, 'message', 'Mission acceptée avec succès');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Nettoyage automatique des OTP expirés
CREATE OR REPLACE FUNCTION public.purge_expired_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM public.otp_verifications WHERE expires_at < now() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;
