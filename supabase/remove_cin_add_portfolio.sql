-- ============================================================================
-- MIGRATION : SUPPRESSION DÉFINITIVE DE L'OBLIGATION CIN & AJOUT PORTFOLIO
-- ============================================================================

-- 1. Rendre les colonnes liées à la CIN optionnelles (NULLABLE) sur maalem_details
ALTER TABLE public.maalem_details ALTER COLUMN cin_number DROP NOT NULL;
ALTER TABLE public.maalem_details ALTER COLUMN cin_photo_url DROP NOT NULL;
ALTER TABLE public.maalem_details ALTER COLUMN is_verified SET DEFAULT true;

-- 2. Ajouter les colonnes supplémentaires si elles n'existent pas encore
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_recto_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_photo_verso_url TEXT;
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS cin_verified BOOLEAN DEFAULT true;

-- 3. Ajouter la colonne portfolio_urls (tableau d'URLs des photos de chantiers passés)
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS portfolio_urls TEXT[] DEFAULT '{}';

-- 4. Ajouter le statut de compte artisan (active, verified_sms, pending, suspended)
ALTER TABLE public.maalem_details ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- 5. Mettre à jour les Maalems existants pour qu'ils soient tous opérationnels immédiatement
UPDATE public.maalem_details 
SET 
  is_verified = true,
  cin_verified = true,
  status = 'active'
WHERE status IS NULL OR status = 'pending';

-- 6. Créer le bucket Supabase Storage 'portfolio-images' si non existant
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Politiques de stockage permissives pour portfolio-images
CREATE POLICY "Public Read Portfolio Images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Public Upload Portfolio Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');
CREATE POLICY "Public Update Portfolio Images" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images');
