-- Jeunes Espoirs Mérignacais — Schéma Supabase

CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenu TEXT,
  extrait TEXT,
  image_url TEXT,
  categorie TEXT CHECK (categorie IN ('Articles Mensuels', 'FAQ', 'Interview')),
  publie BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE equipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categorie TEXT NOT NULL,
  tranche_age TEXT,
  horaires TEXT,
  effectif INT,
  image_url TEXT,
  ordre INT
);

CREATE TABLE galerie (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT,
  image_url TEXT NOT NULL,
  categorie TEXT CHECK (categorie IN ('Match', 'Entraînement', 'Événement')),
  equipe TEXT,
  date_photo DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partenaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  logo_url TEXT,
  site_url TEXT,
  niveau TEXT DEFAULT 'standard' CHECK (niveau IN ('gold', 'standard')),
  ordre INT,
  actif BOOLEAN DEFAULT true
);

CREATE TABLE resultats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipe TEXT NOT NULL,
  adversaire TEXT NOT NULL,
  score_jem INT,
  score_adversaire INT,
  date_match DATE,
  lieu TEXT CHECK (lieu IN ('Domicile', 'Extérieur')),
  type TEXT DEFAULT 'match' CHECK (type IN ('match', 'plateau', 'tournoi'))
);

-- Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE galerie ENABLE ROW LEVEL SECURITY;
ALTER TABLE partenaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultats ENABLE ROW LEVEL SECURITY;

-- Lecture publique des contenus publiés
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (publie = true);
CREATE POLICY "equipes_public_read" ON equipes FOR SELECT USING (true);
CREATE POLICY "galerie_public_read" ON galerie FOR SELECT USING (true);
CREATE POLICY "partenaires_public_read" ON partenaires FOR SELECT USING (actif = true);
CREATE POLICY "resultats_public_read" ON resultats FOR SELECT USING (true);

-- Écriture réservée au service role (admin)
CREATE POLICY "articles_admin_all" ON articles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "equipes_admin_all" ON equipes FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "galerie_admin_all" ON galerie FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "partenaires_admin_all" ON partenaires FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "resultats_admin_all" ON resultats FOR ALL USING (auth.role() = 'service_role');

-- Seed équipes
INSERT INTO equipes (categorie, tranche_age, horaires, effectif, ordre) VALUES
  ('U7/U8',   '5–7 ans',   'Lundi 17h45–19h30 / Mercredi 14h15–16h00', 20, 1),
  ('U9',      '8–9 ans',   'Mardi & Jeudi 17h45–19h30',                  18, 2),
  ('U10/U11', '10–11 ans', 'Mardi & Jeudi 17h45–19h30',                  22, 3),
  ('U12/U13', '12–13 ans', 'Lundi 18h00–19h30 / Mercredi 16h00–18h00',  25, 4);

-- Seed partenaires
INSERT INTO partenaires (nom, logo_url, site_url, niveau, ordre) VALUES
  ('MercadierLab', 'https://jem-foot.fr/wp-content/uploads/2026/01/MercadierLab-LOGO.png', NULL, 'gold', 1),
  ('JSA CPA',      'https://jem-foot.fr/wp-content/uploads/2026/01/JSA-CPA.png',            NULL, 'standard', 2),
  ('SPUC',         'https://jem-foot.fr/wp-content/uploads/2026/01/SPUC.png',               NULL, 'standard', 3);
