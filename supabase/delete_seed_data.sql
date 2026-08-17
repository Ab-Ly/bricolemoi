-- ============================================================================
-- PURGE DES DONNÉES SEED DE DÉMONSTRATION
-- BricoleMoi — À appliquer dans Supabase Dashboard > SQL Editor
-- ============================================================================
-- Supprime les comptes de démonstration insérés par schema.sql
-- IDs concernés :
--   11111111... = Karim El Amrani (CLIENT démo)
--   22222222... = Maalem Hassan Benchekroun (MAALEM démo)
--   33333333... = Maalem Youssef Tazi (MAALEM démo)
--   99999999... = Administrateur BricoleMoi (ADMIN démo)
-- ============================================================================

-- 1. Supprimer les détails Maalem (FK cascade depuis profiles)
DELETE FROM public.maalem_details
WHERE id IN (
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333'
);

-- 2. Supprimer les transactions liées aux comptes démo
DELETE FROM public.transactions
WHERE maalem_id IN (
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333'
);

-- 3. Supprimer les interventions liées aux comptes démo
DELETE FROM public.interventions
WHERE client_id = '11111111-1111-1111-1111-111111111111'
   OR maalem_id IN (
     '22222222-2222-2222-2222-222222222222',
     '33333333-3333-3333-3333-333333333333'
   );

-- 4. Supprimer les profils démo (CASCADE supprimera le reste automatiquement)
DELETE FROM public.profiles
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '99999999-9999-9999-9999-999999999999'
);

-- 5. Supprimer toutes les admin_notifications de test
DELETE FROM public.admin_notifications WHERE true;

-- Vérification : doit retourner 0 lignes
SELECT id, full_name, role FROM public.profiles
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '99999999-9999-9999-9999-999999999999'
);
