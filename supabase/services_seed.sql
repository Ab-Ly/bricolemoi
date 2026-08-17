-- ============================================================================
-- ARBORESCENCE SUPABASE DES SERVICES BRICOLEMOI (CATÉGORIES & SOUS-CATÉGORIES)
-- ============================================================================

-- 1. TABLE SERVICES_CATEGORIES
CREATE TABLE IF NOT EXISTS public.services_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(10) NOT NULL DEFAULT '🛠️',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABLE SERVICES_SUBCATEGORIES
CREATE TABLE IF NOT EXISTS public.services_subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.services_categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- POLICIES PERMISSIVES POUR L'ACCÈS PUBLIC
ALTER TABLE public.services_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Categories" ON public.services_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Subcategories" ON public.services_subcategories FOR SELECT USING (true);

-- SEED DATA: CATÉGORIES ET SOUS-CATÉGORIES COMPLETES

-- 1. Nettoyage et ménage 🧹
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000001', 'Nettoyage et ménage', 'nettoyage-menage', '🧹')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000001', 'Ménage des Maisons', 'menage-maisons'),
('c1000000-0000-0000-0000-000000000001', 'Nettoyage général', 'nettoyage-general'),
('c1000000-0000-0000-0000-000000000001', 'Nettoyage des surfaces', 'nettoyage-surfaces'),
('c1000000-0000-0000-0000-000000000001', 'Nettoyage de canapés', 'nettoyage-canapes')
ON CONFLICT (slug) DO NOTHING;

-- 2. Électricité ⚡
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000002', 'Électricité', 'electricite', '⚡')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000002', 'Éclairage', 'eclairage'),
('c1000000-0000-0000-0000-000000000002', 'Disjoncteur & Fusible', 'disjoncteur-fusible'),
('c1000000-0000-0000-0000-000000000002', 'Onduleur et Stabilisateur', 'onduleur-stabilisateur'),
('c1000000-0000-0000-0000-000000000002', 'Interrupteur', 'interrupteur'),
('c1000000-0000-0000-0000-000000000002', 'Lustre', 'lustre'),
('c1000000-0000-0000-0000-000000000002', 'Éclairage de jardin', 'eclairage-jardin')
ON CONFLICT (slug) DO NOTHING;

-- 3. Plomberie 🚰
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000003', 'Plomberie', 'plomberie', '🚰')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000003', 'Diagnostic de plomberie', 'diagnostic-plomberie'),
('c1000000-0000-0000-0000-000000000003', 'Réparations & Fuite', 'reparations-fuite'),
('c1000000-0000-0000-0000-000000000003', 'Réparations salle de bain', 'reparations-salle-bain'),
('c1000000-0000-0000-0000-000000000003', 'Installation salle de bain', 'installation-salle-bain'),
('c1000000-0000-0000-0000-000000000003', 'Installation plomberie générale', 'installation-plomberie-generale'),
('c1000000-0000-0000-0000-000000000003', 'Nettoyage et débouchage', 'nettoyage-debouchage')
ON CONFLICT (slug) DO NOTHING;

-- 4. Électroménager & Multimédia 📺
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000004', 'Électroménager & Multimédia', 'electromenager-multimedia', '📺')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000004', 'TV, Internet, Parabole', 'tv-internet-parabole'),
('c1000000-0000-0000-0000-000000000004', 'Électroménager', 'electromenager'),
('c1000000-0000-0000-0000-000000000004', 'Gros Électro-ménager', 'gros-electromenager'),
('c1000000-0000-0000-0000-000000000004', 'Alarme et porte électrique', 'alarme-porte-electrique'),
('c1000000-0000-0000-0000-000000000004', 'Système interphone et porte électrique', 'interphone-porte-electrique'),
('c1000000-0000-0000-0000-000000000004', 'Caméra et système anti-intrusion', 'camera-anti-intrusion')
ON CONFLICT (slug) DO NOTHING;

-- 5. Menuiserie 🪵
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000005', 'Menuiserie', 'menuiserie', '🪵')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000005', 'Installation Menuiserie Bois', 'installation-menuiserie-bois'),
('c1000000-0000-0000-0000-000000000005', 'Réparation Menuiserie Bois', 'reparation-menuiserie-bois'),
('c1000000-0000-0000-0000-000000000005', 'Perçage et accrochage', 'percage-accrochage'),
('c1000000-0000-0000-0000-000000000005', 'Menuiserie Aluminium', 'menuiserie-aluminium')
ON CONFLICT (slug) DO NOTHING;

-- 6. Serrurerie 🔑
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000006', 'Serrurerie', 'serrurerie', '🔑')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000006', 'Serrurerie Simple', 'serrurerie-simple'),
('c1000000-0000-0000-0000-000000000006', 'Installations de serrurerie', 'installations-serrurerie'),
('c1000000-0000-0000-0000-000000000006', 'Réparation de serrurerie', 'reparation-serrurerie'),
('c1000000-0000-0000-0000-000000000006', 'Serrurerie pour coffre-fort', 'serrurerie-coffre-fort'),
('c1000000-0000-0000-0000-000000000006', 'Serrurerie Voiture', 'serrurerie-voiture')
ON CONFLICT (slug) DO NOTHING;

-- 7. Dératisation et désinfection 🦟
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000007', 'Dératisation et désinfection', 'deratisation-desinfection', '🦟')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000007', 'Désinsectisation de fourmis, cafards, et plus', 'desinsectisation-cafards-fourmis'),
('c1000000-0000-0000-0000-000000000007', 'Dératisation', 'deratisation'),
('c1000000-0000-0000-0000-000000000007', 'Désinfection de reptiles', 'desinfection-reptiles'),
('c1000000-0000-0000-0000-000000000007', 'Désinsectisation d''insects volants', 'desinsectisation-insects-volants')
ON CONFLICT (slug) DO NOTHING;

-- 8. Jardinage 🌿
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000008', 'Jardinage', 'jardinage', '🌿')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000008', 'Entretien de Gazon et Pelouse', 'entretien-gazon-pelouse'),
('c1000000-0000-0000-0000-000000000008', 'Entretien de jardin (taille et élagage)', 'entretien-jardin-taille'),
('c1000000-0000-0000-0000-000000000008', 'Traitement de jardin', 'traitement-jardin'),
('c1000000-0000-0000-0000-000000000008', 'Plantation pour jardin', 'plantation-jardin'),
('c1000000-0000-0000-0000-000000000008', 'Système d''arrosage, forage et pompage', 'systeme-arrosage-pompage'),
('c1000000-0000-0000-0000-000000000008', 'Conception paysagère', 'conception-paysagere')
ON CONFLICT (slug) DO NOTHING;

-- 9. Lavage Auto 🚗
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000009', 'Lavage Auto', 'lavage-auto', '🚗')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000009', 'Lavage Auto à Domicile', 'lavage-auto-domicile'),
('c1000000-0000-0000-0000-000000000009', 'Nettoyage Tapisserie Voiture', 'nettoyage-tapisserie-voiture')
ON CONFLICT (slug) DO NOTHING;

-- 10. Piscine 🏊
INSERT INTO public.services_categories (id, name, slug, icon) VALUES
('c1000000-0000-0000-0000-000000000010', 'Piscine', 'piscine', '🏊')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services_subcategories (category_id, name, slug) VALUES
('c1000000-0000-0000-0000-000000000010', 'Entretien & Nettoyage Piscine', 'entretien-nettoyage-piscine'),
('c1000000-0000-0000-0000-000000000010', 'Traitement d''eau & Pompes Piscine', 'traitement-eau-pompes-piscine')
ON CONFLICT (slug) DO NOTHING;
