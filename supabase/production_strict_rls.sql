-- ==============================================================================
-- BricoleMoi : Politiques de Sécurité Row Level Security (RLS) Durcies
-- ==============================================================================
-- À appliquer dans le Dashboard Supabase > SQL Editor pour sécuriser la base
-- ==============================================================================

-- 1. Activer RLS sur les tables existantes (avec IF EXISTS pour éviter toute erreur)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.maalem_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.banking_reconciliations ENABLE ROW LEVEL SECURITY;

-- 2. Nettoyage préventif des anciennes politiques
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;

DROP POLICY IF EXISTS "maalem_details_select_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "maalem_details_update_policy" ON public.maalem_details;
DROP POLICY IF EXISTS "maalem_details_insert_policy" ON public.maalem_details;

DROP POLICY IF EXISTS "transactions_select_policy" ON public.transactions;
DROP POLICY IF EXISTS "transactions_insert_policy" ON public.transactions;
DROP POLICY IF EXISTS "transactions_update_policy" ON public.transactions;

DROP POLICY IF EXISTS "interventions_select_policy" ON public.interventions;
DROP POLICY IF EXISTS "interventions_insert_policy" ON public.interventions;
DROP POLICY IF EXISTS "interventions_update_policy" ON public.interventions;

-- ==============================================================================
-- TABLE : profiles
-- ==============================================================================
-- Lecture publique des artisans (pour la carte radar) et lecture de son propre profil
CREATE POLICY "profiles_select_policy"
  ON public.profiles FOR SELECT
  USING (
    role = 'maalem' 
    OR role = 'MAALEM' 
    OR auth.uid()::text = id::text 
    OR auth.role() = 'service_role'
  );

-- Modification uniquement par le propriétaire du profil
CREATE POLICY "profiles_update_policy"
  ON public.profiles FOR UPDATE
  USING (auth.uid()::text = id::text OR auth.role() = 'service_role')
  WITH CHECK (auth.uid()::text = id::text OR auth.role() = 'service_role');

-- ==============================================================================
-- TABLE : maalem_details
-- ==============================================================================
CREATE POLICY "maalem_details_select_policy"
  ON public.maalem_details FOR SELECT
  USING (true);

CREATE POLICY "maalem_details_update_policy"
  ON public.maalem_details FOR UPDATE
  USING (auth.uid()::text = id::text OR auth.role() = 'service_role')
  WITH CHECK (auth.uid()::text = id::text OR auth.role() = 'service_role');

-- ==============================================================================
-- TABLE : transactions
-- ==============================================================================
-- Lecture : Chaque maâlem ne peut voir que SES transactions financières
CREATE POLICY "transactions_select_policy"
  ON public.transactions FOR SELECT
  USING (
    auth.uid()::text = maalem_id::text 
    OR auth.role() = 'service_role'
  );

-- Écriture : Les transactions sont créées soit par le Service Role, soit via les RPC sécurisées
CREATE POLICY "transactions_insert_policy"
  ON public.transactions FOR INSERT
  WITH CHECK (
    auth.role() = 'service_role'
    OR (auth.uid()::text = maalem_id::text AND type = 'RECHARGE' AND status = 'PENDING')
  );

-- ==============================================================================
-- TABLE : interventions
-- ==============================================================================
-- Lecture :
-- - Les leads PENDING sont visibles par les artisans pour le radar
-- - Les missions débloquées sont visibles par le client créateur et l'artisan assigné
CREATE POLICY "interventions_select_policy"
  ON public.interventions FOR SELECT
  USING (
    status = 'PENDING'
    OR auth.uid()::text = client_id::text
    OR auth.uid()::text = maalem_id::text
    OR auth.role() = 'service_role'
  );

-- Création par le client
CREATE POLICY "interventions_insert_policy"
  ON public.interventions FOR INSERT
  WITH CHECK (
    auth.uid()::text = client_id::text 
    OR client_id IS NULL 
    OR auth.role() = 'service_role'
  );

-- Mise à jour : Uniquement par l'artisan assigné, le client ou le service role
CREATE POLICY "interventions_update_policy"
  ON public.interventions FOR UPDATE
  USING (
    auth.uid()::text = maalem_id::text
    OR auth.uid()::text = client_id::text
    OR auth.role() = 'service_role'
  );
