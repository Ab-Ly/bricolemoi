-- ==============================================================================
-- BricoleMoi : Sécurisation Administrateur & Journal d'Audit (Option A)
-- ==============================================================================
-- À appliquer dans le Dashboard Supabase > SQL Editor
-- ==============================================================================

-- 1. Helper function pour vérifier si l'utilisateur courant est un Administrateur
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() 
      AND UPPER(COALESCE(role, '')) = 'ADMIN'
  );
$$;

-- 2. Création de la table de Journal d'Audit Immuable (Audit Logs)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    admin_email VARCHAR(255),
    action_type VARCHAR(100) NOT NULL, -- Ex: 'VALIDATE_RECHARGE', 'REFUND_LEAD', 'BAN_USER'
    target_type VARCHAR(100),          -- Ex: 'TRANSACTION', 'INTERVENTION', 'PROFILE'
    target_id VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexation pour recherches rapides
CREATE INDEX IF NOT EXISTS idx_audit_admin_id ON public.admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_action_type ON public.admin_audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON public.admin_audit_logs(created_at DESC);

-- 3. Activation du RLS sur la table de logs
ALTER TABLE IF EXISTS public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 4. Politiques RLS pour admin_audit_logs :
-- Seuls les administrateurs peuvent lire les logs d'audit
DROP POLICY IF EXISTS "admin_audit_logs_select" ON public.admin_audit_logs;
CREATE POLICY "admin_audit_logs_select"
  ON public.admin_audit_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role');

-- Insertion de logs d'audit autorisée pour les admins ou le service role
DROP POLICY IF EXISTS "admin_audit_logs_insert" ON public.admin_audit_logs;
CREATE POLICY "admin_audit_logs_insert"
  ON public.admin_audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- 5. Politiques RLS globales Admin sur les tables métier
-- Profiles
DROP POLICY IF EXISTS "Admin full access on profiles" ON public.profiles;
CREATE POLICY "Admin full access on profiles"
  ON public.profiles FOR ALL TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role')
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- Transactions
DROP POLICY IF EXISTS "Admin full access on transactions" ON public.transactions;
CREATE POLICY "Admin full access on transactions"
  ON public.transactions FOR ALL TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role')
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- Interventions
DROP POLICY IF EXISTS "Admin full access on interventions" ON public.interventions;
CREATE POLICY "Admin full access on interventions"
  ON public.interventions FOR ALL TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role')
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- Reviews
DROP POLICY IF EXISTS "Admin full access on reviews" ON public.reviews;
CREATE POLICY "Admin full access on reviews"
  ON public.reviews FOR ALL TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role')
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- Maalem Details
DROP POLICY IF EXISTS "Admin full access on maalem_details" ON public.maalem_details;
CREATE POLICY "Admin full access on maalem_details"
  ON public.maalem_details FOR ALL TO authenticated
  USING (public.is_admin() OR auth.role() = 'service_role')
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');
