-- ==============================================================================
-- FIX SUPABASE TRANSACTIONS : SYNCHRONISATION DU STATUT 'REJECTED' ET DU REALTIME
-- ==============================================================================

-- 1. Supprimer l'ancienne contrainte qui bloquait 'REJECTED'
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_status_check;

-- 2. Ajouter la nouvelle contrainte incluant 'REJECTED'
ALTER TABLE public.transactions 
  ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING', 'VALIDATED', 'REJECTED'));

-- 3. Ajouter les colonnes requises si elles n'existent pas
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS receipt_photo_url TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_at TIMESTAMPTZ;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reconciled_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reference_ref VARCHAR(100);
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'Cash Plus';

-- 4. Débloquer les Permissions RLS (Lecture, Insertion, Mise à jour)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Manage Transactions" ON public.transactions;
DROP POLICY IF EXISTS "transactions_read_own" ON public.transactions;
DROP POLICY IF EXISTS "transactions_insert" ON public.transactions;
DROP POLICY IF EXISTS "transactions_update" ON public.transactions;

CREATE POLICY "Public Manage Transactions" 
  ON public.transactions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 5. Activer le Realtime Supabase sur la table transactions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'transactions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
  END IF;
END $$;

-- 6. Mettre à jour immédiatement la transaction de test si présente
UPDATE public.transactions 
SET status = 'REJECTED', admin_notes = 'Test rejeté par Admin' 
WHERE reference_ref = 'CB-98989898-88';
