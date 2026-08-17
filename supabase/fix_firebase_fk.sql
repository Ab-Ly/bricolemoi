-- ============================================================================
-- FIX: Suppression contrainte FK auth.users sur profiles.id
-- Raison : L'app utilise Firebase Auth (pas Supabase Auth natif).
--          Le champ id est un UUID dérivé du UID Firebase via toValidUUID().
--          La FK vers auth.users bloque tous les INSERT depuis le frontend.
-- ============================================================================

-- 1. Supprimer la contrainte de clé étrangère vers auth.users
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. Même fix pour maalem_details si elle référence profiles.id
ALTER TABLE public.maalem_details DROP CONSTRAINT IF EXISTS maalem_details_id_fkey;

-- 3. S'assurer que l'id reste PRIMARY KEY (sans FK)
-- (ALTER TABLE ne casse pas la PK, juste la FK)

-- 4. Vérification : doit montrer les colonnes sans contrainte FK
SELECT 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name IN ('profiles', 'maalem_details')
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_type;
