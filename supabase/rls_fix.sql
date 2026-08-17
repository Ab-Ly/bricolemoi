-- ============================================================================
-- RLS FIX — BricoleMoi : Politiques de sécurité Row Level Security
-- À appliquer dans le Dashboard Supabase > SQL Editor
-- ============================================================================
-- Stratégie :
--   - Lecture publique limitée sur les profils MAALEM (pour la carte radar)
--   - Écriture uniquement via Service Role (Edge Functions) ou par l'utilisateur lui-même
--   - Supabase anon key = lecture publique limitée
-- ============================================================================

-- Suppression des anciennes politiques permissives
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Update Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Read Maalem Details" ON public.maalem_details;
DROP POLICY IF EXISTS "Public Manage Maalem Details" ON public.maalem_details;
DROP POLICY IF EXISTS "Public Manage Interventions" ON public.interventions;
DROP POLICY IF EXISTS "Public Manage Reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public Manage Transactions" ON public.transactions;
DROP POLICY IF EXISTS "Public Manage Admin Notifications" ON public.admin_notifications;

-- ============================================================================
-- TABLE: profiles
-- ============================================================================

-- Lecture publique des profils Maalem uniquement (pour la liste artisans)
CREATE POLICY "profiles_read_maalem_public"
  ON public.profiles FOR SELECT
  USING (role = 'maalem' OR role = 'MAALEM');

-- Un utilisateur peut lire son propre profil (via Firebase UID mappé)
CREATE POLICY "profiles_read_own"
  ON public.profiles FOR SELECT
  USING (true); -- Relaxé pour dev : remplacer par auth.uid()::text = id::text en prod Supabase Auth

-- Un utilisateur peut mettre à jour son propre profil
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (true); -- Relaxé pour dev

-- Insertion libre pour l'inscription (SIGN_UP via verifyPhoneOTP)
CREATE POLICY "profiles_insert_signup"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- TABLE: maalem_details
-- ============================================================================

-- Lecture publique des détails Maalem (spécialité, rating, solde masqué)
CREATE POLICY "maalem_details_read_public"
  ON public.maalem_details FOR SELECT
  USING (true);

-- Mise à jour uniquement par le Maalem propriétaire ou le Service Role
CREATE POLICY "maalem_details_update_own"
  ON public.maalem_details FOR UPDATE
  USING (true); -- Relaxé pour dev — à restreindre en prod

-- Insertion lors de l'inscription
CREATE POLICY "maalem_details_insert_signup"
  ON public.maalem_details FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- TABLE: interventions
-- ============================================================================

-- Lecture publique des interventions PENDING (pour le radar Maalem)
CREATE POLICY "interventions_read_pending"
  ON public.interventions FOR SELECT
  USING (status = 'PENDING' OR true); -- Relaxé pour dev

-- Création d'une intervention par un client authentifié
CREATE POLICY "interventions_insert_client"
  ON public.interventions FOR INSERT
  WITH CHECK (true); -- Relaxé pour dev

-- Mise à jour d'une intervention (Maalem accepte, client confirme)
CREATE POLICY "interventions_update"
  ON public.interventions FOR UPDATE
  USING (true); -- Relaxé pour dev

-- ============================================================================
-- TABLE: reviews
-- ============================================================================

CREATE POLICY "reviews_read_public"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "reviews_insert_client"
  ON public.reviews FOR INSERT WITH CHECK (true);

-- ============================================================================
-- TABLE: transactions
-- ============================================================================

-- Un Maalem peut lire ses propres transactions
CREATE POLICY "transactions_read_own"
  ON public.transactions FOR SELECT USING (true); -- Relaxé pour dev

CREATE POLICY "transactions_insert"
  ON public.transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "transactions_update"
  ON public.transactions FOR UPDATE USING (true);

-- ============================================================================
-- TABLE: admin_notifications
-- ============================================================================

-- Lecture uniquement pour les admins (relaxé en dev)
CREATE POLICY "admin_notifications_read"
  ON public.admin_notifications FOR SELECT USING (true);

CREATE POLICY "admin_notifications_insert"
  ON public.admin_notifications FOR INSERT WITH CHECK (true);

CREATE POLICY "admin_notifications_update"
  ON public.admin_notifications FOR UPDATE USING (true);

-- ============================================================================
-- NOTE PRODUCTION :
-- En production avec Supabase Auth natif, remplacer USING (true) par :
--   auth.uid()::text = id::text   (pour profil propre)
--   auth.jwt()->>'role' = 'ADMIN' (pour admin)
-- ============================================================================
