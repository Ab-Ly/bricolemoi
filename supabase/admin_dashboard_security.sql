-- =========================================================================
-- BricoleMoi Admin Dashboard RLS Security Policies
-- Fichier de migration pour la sécurisation de l'espace Administrateur
-- =========================================================================

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

-- 2. Activation du RLS sur toutes les tables principales
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.maalem_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;

-- 3. Politiques RLS pour la table PROFILES
-- Les administrateurs peuvent tout voir et modifier sur les profils clients et maâlems
DROP POLICY IF EXISTS "Admin full access on profiles" ON public.profiles;
CREATE POLICY "Admin full access on profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. Politiques RLS pour la table INTERVENTIONS
-- Les administrateurs ont une visibilité complète sur la tour de contrôle des missions
DROP POLICY IF EXISTS "Admin full access on interventions" ON public.interventions;
CREATE POLICY "Admin full access on interventions"
  ON public.interventions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Politiques RLS pour la table MAALEM_DETAILS
-- Les administrateurs peuvent gérer les portfolios, statuts et soldes de tous les maâlems
DROP POLICY IF EXISTS "Admin full access on maalem_details" ON public.maalem_details;
CREATE POLICY "Admin full access on maalem_details"
  ON public.maalem_details
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 6. Politiques RLS pour la table TRANSACTIONS
-- Les administrateurs peuvent approuver, rejeter et auditer toutes les recharges et crédits
DROP POLICY IF EXISTS "Admin full access on transactions" ON public.transactions;
CREATE POLICY "Admin full access on transactions"
  ON public.transactions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 7. Politiques RLS pour la table REVIEWS
-- Les administrateurs peuvent consulter et modérer tous les avis et notes
DROP POLICY IF EXISTS "Admin full access on reviews" ON public.reviews;
CREATE POLICY "Admin full access on reviews"
  ON public.reviews
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
