-- ============================================================================
-- FIX: Création du Bucket de Stockage 'cin-documents' & Politiques d'Accès
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- 1. Créer le bucket cin-documents (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cin-documents', 
  'cin-documents', 
  true, 
  10485760, -- Limit 10 Mo
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Créer les politiques d'accès de stockage (lecture/écriture)
DROP POLICY IF EXISTS "Public Read cin-documents" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert cin-documents" ON storage.objects;
DROP POLICY IF EXISTS "Public Update cin-documents" ON storage.objects;

CREATE POLICY "Public Read cin-documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'cin-documents');

CREATE POLICY "Public Insert cin-documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'cin-documents');

CREATE POLICY "Public Update cin-documents" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'cin-documents');

-- 3. Vérification
SELECT id, name, public FROM storage.buckets WHERE id = 'cin-documents';
