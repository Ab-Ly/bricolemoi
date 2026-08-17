-- ============================================================================
-- FIX CONSTRAINTS — BRICOLEMOI SUPABASE
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================================

-- 1. Permettre 'MAALEM' et 'maalem' (majuscules/minuscules) dans profiles.role
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
  CHECK (UPPER(role) IN ('CLIENT', 'MAALEM', 'ADMIN'));

-- 2. Supprimer la contrainte restrictive sur maalem_details.specialty
-- (Permet toutes les nouvelles spécialités : ELECTRICIAN, JARDINAGE, NETTOYAGE, SERRURERIE...)
ALTER TABLE public.maalem_details DROP CONSTRAINT IF EXISTS maalem_details_specialty_check;

-- 3. Vérification des contraintes actuelles
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid IN ('public.profiles'::regclass, 'public.maalem_details'::regclass);
