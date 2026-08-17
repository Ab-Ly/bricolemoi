-- ====================================================================
-- SCRIPT DE MIGRATION SUPABASE : CONTRAINTES DE STATUT & COLONNES AVIS
-- À exécuter dans le "SQL Editor" de votre Dashboard Supabase
-- ====================================================================

-- 1. Suppression des anciennes contraintes restrictives (évite l'erreur HTTP 400 Bad Request)
ALTER TABLE public.interventions DROP CONSTRAINT IF EXISTS interventions_status_check;
ALTER TABLE public.interventions DROP CONSTRAINT IF EXISTS interventions_service_type_check;

-- 2. Ajout de la contrainte complète de statuts
ALTER TABLE public.interventions 
ADD CONSTRAINT interventions_status_check 
CHECK (status IN ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'PENDING_COMPLETION', 'COMPLETED', 'CANCELLED', 'UNREACHABLE_REFUNDED'));

-- 3. Ajout des colonnes de suivi, avis et médias
ALTER TABLE public.interventions 
ADD COLUMN IF NOT EXISTS progress_step TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS final_agreed_price NUMERIC DEFAULT NULL,
ADD COLUMN IF NOT EXISTS unreachable_reason TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS media_purged BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT NULL,
ADD COLUMN IF NOT EXISTS comment TEXT DEFAULT NULL;

-- 4. Rechargement du schéma Supabase
NOTIFY pgrst, 'reload schema';
