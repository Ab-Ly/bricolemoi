-- ============================================================================
-- FIX INTERVENTIONS TABLE — BRICOLEMOI SUPABASE
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- 1. Supprimer la contrainte restrictive sur service_type (autorise Électricité, Serrurerie, Nettoyage, etc.)
ALTER TABLE public.interventions DROP CONSTRAINT IF EXISTS interventions_service_type_check;

-- 2. Ajouter les colonnes manquantes sur public.interventions
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS devis_confirmed BOOLEAN DEFAULT false;
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS maalem_name VARCHAR(100);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS maalem_phone VARCHAR(20);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS client_name VARCHAR(100);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS client_phone VARCHAR(20);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS lat NUMERIC(10, 6);
ALTER TABLE public.interventions ADD COLUMN IF NOT EXISTS lng NUMERIC(10, 6);

-- 3. Assurer que Realtime est activé sur toutes les tables principales
ALTER PUBLICATION supabase_realtime ADD TABLE public.interventions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.maalem_details;

-- 4. Rafraîchir le cache du schéma PostgREST
NOTIFY pgrst, 'reload schema';

-- 5. Vérification
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'interventions' AND table_schema = 'public';
