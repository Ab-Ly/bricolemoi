-- ==============================================================================
-- 🚀 BRICOLEMOI MAROC — MASTER DEFINITIVE DATABASE MIGRATION (100% UNIFIÉ)
-- ==============================================================================
-- Copiez et collez l'intégralité de ce script dans votre Supabase Dashboard > SQL Editor
-- puis cliquez sur "Run". Ce script est 100% idempotent (peut être exécuté plusieurs fois).
-- ==============================================================================

-- 0. Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. TABLE PROFILES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(30) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CLIENT',
    full_name VARCHAR(120) NOT NULL DEFAULT 'Utilisateur BricoleMoi',
    city_zone VARCHAR(120) NOT NULL DEFAULT 'Casablanca',
    credits NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    pin_hash VARCHAR(128),
    is_suspended BOOLEAN NOT NULL DEFAULT false,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assurer toutes les colonnes sur profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'CLIENT';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name VARCHAR(120) DEFAULT 'Utilisateur BricoleMoi';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city_zone VARCHAR(120) DEFAULT 'Casablanca';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits NUMERIC(10, 2) DEFAULT 0.00;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pin_hash VARCHAR(128);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ==============================================================================
-- 2. TABLE MAALEM_DETAILS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.maalem_details (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialty VARCHAR(50) NOT NULL DEFAULT 'PLUMBING',
    cin_number VARCHAR(40),
    cin_photo_url TEXT,
    cin_photo_recto_url TEXT,
    cin_photo_verso_url TEXT,
    portfolio_urls TEXT[] DEFAULT '{}',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    credit_balance NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    is_verified BOOLEAN NOT NULL DEFAULT true,
    cin_verified BOOLEAN NOT NULL DEFAULT true,
    rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
    consecutive_five_stars INT NOT NULL DEFAULT 0,
    hundred_dh_recharges_count INT NOT NULL DEFAULT 0,
    bio TEXT,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6)
);

-- Assurer toutes les colonnes sur maalem_details
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS specialty VARCHAR(50) DEFAULT 'PLUMBING';
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_number VARCHAR(40);
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_recto_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_verso_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS portfolio_urls TEXT[] DEFAULT '{}';
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'active';
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS credit_balance NUMERIC(10, 2) DEFAULT 15.00;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT true;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_verified BOOLEAN DEFAULT true;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS rating_avg NUMERIC(3, 2) DEFAULT 5.00;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS consecutive_five_stars INT DEFAULT 0;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS hundred_dh_recharges_count INT DEFAULT 0;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS lat NUMERIC(10, 6);
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS lng NUMERIC(10, 6);

-- ==============================================================================
-- 3. TABLE INTERVENTIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    maalem_id UUID,
    service_type VARCHAR(50) NOT NULL DEFAULT 'PLUMBING',
    subcategory VARCHAR(100),
    district VARCHAR(120) NOT NULL DEFAULT 'Casablanca',
    description_photo TEXT,
    photos_list TEXT[] DEFAULT '{}',
    audio_note_url TEXT,
    estimated_price_min NUMERIC(10, 2) DEFAULT 100.00,
    estimated_price_max NUMERIC(10, 2) DEFAULT 300.00,
    final_agreed_price NUMERIC(10, 2),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    cost_lead NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    access_details TEXT,
    urgency_level VARCHAR(30) DEFAULT 'NORMAL',
    rating INT,
    comment TEXT,
    escrow_status VARCHAR(50) DEFAULT 'NONE',
    unfeasible_reason TEXT,
    unfeasible_reported_at TIMESTAMPTZ,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assurer toutes les colonnes sur interventions
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS client_id UUID;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS maalem_id UUID;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS service_type VARCHAR(50) DEFAULT 'PLUMBING';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS district VARCHAR(120) DEFAULT 'Casablanca';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS description_photo TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS photos_list TEXT[] DEFAULT '{}';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS audio_note_url TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS estimated_price_min NUMERIC(10, 2) DEFAULT 100.00;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS estimated_price_max NUMERIC(10, 2) DEFAULT 300.00;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS final_agreed_price NUMERIC(10, 2);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'PENDING';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS cost_lead NUMERIC(10, 2) DEFAULT 15.00;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS access_details TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS urgency_level VARCHAR(30) DEFAULT 'NORMAL';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS rating INT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(50) DEFAULT 'NONE';
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS unfeasible_reason TEXT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS unfeasible_reported_at TIMESTAMPTZ;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS lat NUMERIC(10, 6);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS lng NUMERIC(10, 6);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ==============================================================================
-- 4. TABLE TRANSACTIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    maalem_id UUID,
    amount_dh NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    type VARCHAR(50) NOT NULL DEFAULT 'RECHARGE',
    payment_method VARCHAR(80) DEFAULT 'CASH_PLUS',
    reference_ref VARCHAR(120),
    receipt_photo_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    admin_notes TEXT,
    reconciled_at TIMESTAMPTZ,
    reconciled_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assurer toutes les colonnes sur transactions
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS maalem_id UUID;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS amount_dh NUMERIC(10, 2) DEFAULT 0.00;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'RECHARGE';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS payment_method VARCHAR(80) DEFAULT 'CASH_PLUS';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reference_ref VARCHAR(120);
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS receipt_photo_url TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'PENDING';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_at TIMESTAMPTZ;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_by UUID;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- ==============================================================================
-- 5. TABLE REVIEWS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intervention_id UUID,
    maalem_id UUID,
    client_id UUID,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 6. TABLE ADMIN_NOTIFICATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 7. DÉSACTIVER TOUT BLOCAGE RLS ET CRÉER LES POLITIQUES UNIFIÉES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maalem_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Nettoyage des anciennes politiques
DROP POLICY IF EXISTS "profiles_master_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "Public Manage Profiles" ON public.profiles;

DROP POLICY IF EXISTS "maalem_details_master_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "maalem_details_select_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "maalem_details_insert_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "maalem_details_update_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "Public Manage Maalem Details" ON public.maalem_details;

DROP POLICY IF EXISTS "interventions_master_policy" ON public.interventions;
DROP POLICY IF EXISTS "Public Manage Interventions" ON public.interventions;

DROP POLICY IF EXISTS "transactions_master_policy" ON public.transactions;
DROP POLICY IF EXISTS "Public Manage Transactions" ON public.transactions;

DROP POLICY IF EXISTS "reviews_master_policy" ON public.reviews;
DROP POLICY IF EXISTS "Public Manage Reviews" ON public.reviews;

DROP POLICY IF EXISTS "admin_notifications_master_policy" ON public.admin_notifications;
DROP POLICY IF EXISTS "Public Manage Admin Notifications" ON public.admin_notifications;

-- Politiques Maîtres Infaillibles (Lecture, Écriture, Modification & Insertion autorisées)
CREATE POLICY "profiles_master_policy" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "maalem_details_master_policy" ON public.maalem_details FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "interventions_master_policy" ON public.interventions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "transactions_master_policy" ON public.transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "reviews_master_policy" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin_notifications_master_policy" ON public.admin_notifications FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 8. PUBLICATION TEMPS RÉEL SUPABASE REALTIME
-- ==============================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.maalem_details;
ALTER PUBLICATION supabase_realtime ADD TABLE public.interventions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;

-- ==============================================================================
-- 9. SÉCURISER ET ENREGISTRER DÉFINITIVEMENT LE COMPTE D'ALI ALI (+212619184098)
-- ==============================================================================
DO $$
DECLARE
    v_ali_id UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- 1. Profil Ali Ali
    INSERT INTO public.profiles (id, phone, role, full_name, city_zone, credits, is_suspended)
    VALUES (v_ali_id, '+212619184098', 'MAALEM', 'ali ali', 'Fès - Ville Nouvelle', 340.00, false)
    ON CONFLICT (phone) DO UPDATE SET
        role = 'MAALEM',
        full_name = 'ali ali',
        city_zone = 'Fès - Ville Nouvelle',
        credits = 340.00,
        is_suspended = false;

    -- 2. Détails Maâlem Ali Ali
    INSERT INTO public.maalem_details (id, specialty, cin_number, status, credit_balance, is_verified, cin_verified, rating_avg)
    VALUES (v_ali_id, 'PLUMBING', 'CIN-ALI-FES', 'active', 340.00, true, true, 5.00)
    ON CONFLICT (id) DO UPDATE SET
        specialty = 'PLUMBING',
        status = 'active',
        credit_balance = 340.00,
        is_verified = true,
        cin_verified = true,
        rating_avg = 5.00;
END $$;
