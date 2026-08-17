-- ============================================================================
-- SCHÉMA SUPABASE POUR BRICOLEMOI (DÉPANNAGE D'URGENCE MAROC)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('CLIENT', 'MAALEM', 'ADMIN')) DEFAULT 'CLIENT',
    full_name VARCHAR(100) NOT NULL,
    city_zone VARCHAR(100) NOT NULL DEFAULT 'Casablanca',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABLE MAALEM_DETAILS
CREATE TABLE IF NOT EXISTS public.maalem_details (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialty VARCHAR(30) NOT NULL CHECK (specialty IN ('PLUMBING', 'AUTO_MECHANIC', 'BOTH')),
    cin_number VARCHAR(30),
    cin_photo_url TEXT,
    portfolio_urls TEXT[] DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    credit_balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    is_verified BOOLEAN NOT NULL DEFAULT true,
    rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
    consecutive_five_stars INT NOT NULL DEFAULT 0,
    hundred_dh_recharges_count INT NOT NULL DEFAULT 0
);

-- 3. TABLE INTERVENTIONS
CREATE TABLE IF NOT EXISTS public.interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    maalem_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    service_type VARCHAR(30) NOT NULL CHECK (service_type IN ('PLUMBING', 'AUTO_MECHANIC')),
    description_photo TEXT,
    audio_note_url TEXT,
    district VARCHAR(100) NOT NULL,
    estimated_price_min NUMERIC(10, 2),
    estimated_price_max NUMERIC(10, 2),
    final_agreed_price NUMERIC(10, 2),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED')) DEFAULT 'PENDING',
    cost_lead NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABLE REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intervention_id UUID NOT NULL REFERENCES public.interventions(id) ON DELETE CASCADE,
    maalem_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABLE TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    maalem_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount_dh NUMERIC(10, 2) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('RECHARGE', 'BONUS', 'LEAD_DEDUCTION', 'REFUND')),
    payment_method VARCHAR(50),
    reference_ref VARCHAR(100),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'VALIDATED')) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. TABLE ADMIN_NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(40) NOT NULL CHECK (type IN ('RECHARGE', 'CIN_SUBMISSION', 'URGENT_JOB', 'LOW_RATING', 'SYSTEM')),
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ADD MISSING COLUMNS IF NOT EXIST
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits NUMERIC(10, 2) NOT NULL DEFAULT 0.00;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_recto_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_verso_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_extracted_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_verified BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS portfolio_urls TEXT[] DEFAULT '{}';
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- INDEXES FOR FAST SEARCH
CREATE INDEX IF NOT EXISTS idx_interventions_status ON public.interventions(status);
CREATE INDEX IF NOT EXISTS idx_interventions_district ON public.interventions(district);
CREATE INDEX IF NOT EXISTS idx_interventions_service ON public.interventions(service_type);
CREATE INDEX IF NOT EXISTS idx_transactions_maalem ON public.transactions(maalem_id);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type ON public.admin_notifications(type);

-- RLS (ROW LEVEL SECURITY) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maalem_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- POLICIES PERMISSIVES POUR PERMETTRE LE DÉVELOPPEMENT & ACCÈS PUBLIC
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Update Profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Public Read Maalem Details" ON public.maalem_details FOR SELECT USING (true);
CREATE POLICY "Public Manage Maalem Details" ON public.maalem_details FOR ALL USING (true);

CREATE POLICY "Public Manage Interventions" ON public.interventions FOR ALL USING (true);
CREATE POLICY "Public Manage Reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Public Manage Transactions" ON public.transactions FOR ALL USING (true);
CREATE POLICY "Public Manage Admin Notifications" ON public.admin_notifications FOR ALL USING (true);

-- ENABLE REALTIME ON INTERVENTIONS & ADMIN NOTIFICATIONS
ALTER PUBLICATION supabase_realtime ADD TABLE public.interventions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;

-- TRIGGER DE PRÉLÈVEMENT DU LEAD (15 DH) LORSQU'UN MAALEM ACCEPTE UNE INTERVENTION
CREATE OR REPLACE FUNCTION public.deduct_lead_cost()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'ACCEPTED' AND OLD.status = 'PENDING' AND NEW.maalem_id IS NOT NULL THEN
        -- Vérifier le solde du Maalem
        IF (SELECT credit_balance FROM public.maalem_details WHERE id = NEW.maalem_id) < NEW.cost_lead THEN
            RAISE EXCEPTION 'Solde insuffisant (minimum 15 DH requis)';
        END IF;

        -- Déduire 15 DH du solde
        UPDATE public.maalem_details 
        SET credit_balance = credit_balance - NEW.cost_lead
        WHERE id = NEW.maalem_id;

        -- Synchroniser credits sur profiles
        UPDATE public.profiles
        SET credits = credits - NEW.cost_lead
        WHERE id = NEW.maalem_id;

        -- Enregistrer la transaction de déduction
        INSERT INTO public.transactions (maalem_id, amount_dh, type, payment_method, reference_ref, status)
        VALUES (NEW.maalem_id, -NEW.cost_lead, 'LEAD_DEDUCTION', 'SYSTEM', 'INTERVENTION_' || NEW.id, 'VALIDATED');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_deduct_lead ON public.interventions;
CREATE TRIGGER trigger_deduct_lead
BEFORE UPDATE ON public.interventions
FOR EACH ROW EXECUTE FUNCTION public.deduct_lead_cost();

-- TRIGGER DE MISE À JOUR DE LA NOTE MAALEM & BONUS 5 ÉTOILES
CREATE OR REPLACE FUNCTION public.update_maalem_rating_on_review()
RETURNS TRIGGER AS $$
DECLARE
    new_avg NUMERIC(3, 2);
BEGIN
    -- Recalculer la moyenne des notes
    SELECT AVG(rating)::NUMERIC(3, 2) INTO new_avg
    FROM public.reviews
    WHERE maalem_id = NEW.maalem_id;

    -- Traiter les 5 étoiles consécutives
    IF NEW.rating = 5 THEN
        UPDATE public.maalem_details
        SET rating_avg = new_avg,
            consecutive_five_stars = consecutive_five_stars + 1
        WHERE id = NEW.maalem_id;

        -- Bonus de 100 DH après 5 avis 5-étoiles d'affilée
        IF (SELECT consecutive_five_stars FROM public.maalem_details WHERE id = NEW.maalem_id) >= 5 THEN
            UPDATE public.maalem_details
            SET credit_balance = credit_balance + 100.00,
                consecutive_five_stars = 0,
                hundred_dh_recharges_count = hundred_dh_recharges_count + 1
            WHERE id = NEW.maalem_id;

            INSERT INTO public.transactions (maalem_id, amount_dh, type, payment_method, reference_ref, status)
            VALUES (NEW.maalem_id, 100.00, 'BONUS', 'FIVE_STAR_BONUS', 'BONUS_' || gen_random_uuid(), 'VALIDATED');
        END IF;
    ELSE
        -- Réinitialiser le compteur si note < 5
        UPDATE public.maalem_details
        SET rating_avg = new_avg,
            consecutive_five_stars = 0
        WHERE id = NEW.maalem_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_maalem_rating ON public.reviews;
CREATE TRIGGER trigger_update_maalem_rating
AFTER INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_maalem_rating_on_review();

-- DONNÉES DÉMO INITIALES (SEED DATA)
INSERT INTO public.profiles (id, phone, role, full_name, city_zone, credits) VALUES
('11111111-1111-1111-1111-111111111111', '+212661001122', 'CLIENT', 'Karim El Amrani', 'Casablanca - Maarif', 0.00),
('22222222-2222-2222-2222-222222222222', '+212663998877', 'MAALEM', 'Maalem Hassan Benchekroun', 'Casablanca - Maarif', 150.00),
('33333333-3333-3333-3333-333333333333', '+212668554433', 'MAALEM', 'Maalem Youssef Tazi', 'Casablanca - Bourgogne', 45.00),
('99999999-9999-9999-9999-999999999999', '+212600000000', 'ADMIN', 'Administrateur BricoleMoi', 'Casablanca', 0.00)
ON CONFLICT (phone) DO NOTHING;

INSERT INTO public.maalem_details (id, specialty, cin_number, cin_photo_url, credit_balance, is_verified, cin_verified, rating_avg, consecutive_five_stars, hundred_dh_recharges_count) VALUES
('22222222-2222-2222-2222-222222222222', 'PLUMBING', 'BE123456', 'https://images.unsplash.com/photo-1544717305-2782549b5136', 150.00, true, true, 4.90, 3, 2),
('33333333-3333-3333-3333-333333333333', 'AUTO_MECHANIC', 'CD987654', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 45.00, true, true, 4.85, 1, 0)
ON CONFLICT (id) DO NOTHING;

