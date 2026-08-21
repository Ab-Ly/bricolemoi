-- ============================================================================
-- TABLE PUSH_SUBSCRIPTIONS POUR WEB PUSH PWA (BRICOLEMOI)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    endpoint TEXT UNIQUE NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'MAALEM',
    city_zone VARCHAR(100) DEFAULT 'Casablanca',
    specialty VARCHAR(30) DEFAULT 'PLUMBING',
    is_active BOOLEAN NOT NULL DEFAULT true,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour recherche rapide par ville et spécialité
CREATE INDEX IF NOT EXISTS idx_push_sub_city ON public.push_subscriptions(city_zone);
CREATE INDEX IF NOT EXISTS idx_push_sub_specialty ON public.push_subscriptions(specialty);
CREATE INDEX IF NOT EXISTS idx_push_sub_role ON public.push_subscriptions(role);
CREATE INDEX IF NOT EXISTS idx_push_sub_active ON public.push_subscriptions(is_active);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies RLS
DROP POLICY IF EXISTS "Public can insert or update push subscriptions" ON public.push_subscriptions;
CREATE POLICY "Public can insert or update push subscriptions"
ON public.push_subscriptions FOR ALL
USING (true)
WITH CHECK (true);
