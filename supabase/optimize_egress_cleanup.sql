-- ==============================================================================
-- OPTIMISATION ANTI-SURCONSOMMATION EGRESS SUPABASE (QUOTA GRATUIT 5 GB)
-- ==============================================================================

-- 1. Nettoyage des vieux payloads Base64 volumineux dans les interventions terminées
UPDATE public.interventions
SET description_photo = NULL,
    audio_note_url = NULL
WHERE (status IN ('COMPLETED', 'CANCELLED', 'UNFEASIBLE', 'UNREACHABLE_REFUNDED') OR created_at < NOW() - INTERVAL '7 days')
  AND (
    (description_photo LIKE 'data:image%')
    OR (audio_note_url LIKE 'data:audio%')
  );

-- 2. Nettoyage des vieilles photos CIN Base64 volumineuses dans maalem_details si déjà vérifiés
UPDATE public.maalem_details
SET cin_photo_url = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150'
WHERE cin_photo_url LIKE 'data:image%'
  AND is_verified = TRUE;

-- 3. Ajout d'index pour accélérer les requêtes et éviter les scans de table complets
CREATE INDEX IF NOT EXISTS idx_interventions_status ON public.interventions(status);
CREATE INDEX IF NOT EXISTS idx_interventions_maalem_id ON public.interventions(maalem_id);
CREATE INDEX IF NOT EXISTS idx_interventions_client_id ON public.interventions(client_id);
CREATE INDEX IF NOT EXISTS idx_interventions_created_at ON public.interventions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_maalem_id ON public.transactions(maalem_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reviews_intervention_id ON public.reviews(intervention_id);
CREATE INDEX IF NOT EXISTS idx_reviews_maalem_id ON public.reviews(maalem_id);
