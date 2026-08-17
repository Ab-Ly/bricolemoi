-- ============================================================================
-- FIX: Ajouter la colonne credits sur la table public.profiles
-- & Rafraîchir le cache du schéma PostgREST
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- 1. Ajouter la colonne credits si manquante
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits NUMERIC(10, 2) NOT NULL DEFAULT 0.00;

-- 2. Ajouter les colonnes photo/CIN manquantes sur maalem_details
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_recto_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_verso_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_extracted_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_verified BOOLEAN NOT NULL DEFAULT false;

-- 3. Forcer Supabase PostgREST à rafraîchir son cache du schéma
NOTIFY pgrst, 'reload schema';

-- 4. Vérification des colonnes de profiles
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND table_schema = 'public';
