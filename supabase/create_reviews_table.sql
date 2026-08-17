-- ============================================================================
-- FIX: Création Table Reviews & Colonnes d'Avis / Accomplissement
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- 1. Ajouter les colonnes de note et commentaire sur public.interventions
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS rating INT;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS comment TEXT;

-- 2. Créer la table public.reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intervention_id VARCHAR(100),
    maalem_id VARCHAR(100),
    client_id VARCHAR(100),
    client_name VARCHAR(100),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Activer RLS et autoriser la gestion publique des avis
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Manage Reviews" ON public.reviews;
CREATE POLICY "Public Manage Reviews" ON public.reviews FOR ALL USING (true);

-- 4. Activer Realtime sur reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;

-- 5. Rafraîchir le schéma
NOTIFY pgrst, 'reload schema';

SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'reviews';
