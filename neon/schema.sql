-- Jeunes Espoirs Mérignacais — Schéma Neon PostgreSQL
-- Exécuter dans l'éditeur SQL de console.neon.tech

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenu TEXT,
  extrait TEXT,
  image_url TEXT,
  categorie TEXT CHECK (categorie IN ('Articles Mensuels', 'FAQ', 'Interview')),
  saison TEXT,
  publie BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Si la table articles existe déjà (site en prod), exécuter plutôt ceci :
-- ALTER TABLE articles ADD COLUMN IF NOT EXISTS saison TEXT;
-- UPDATE articles SET saison = '2026-2027' WHERE saison IS NULL;

CREATE TABLE IF NOT EXISTS equipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categorie TEXT NOT NULL,
  tranche_age TEXT,
  horaires TEXT,
  effectif INTEGER,
  image_url TEXT,
  ordre INTEGER
);

CREATE TABLE IF NOT EXISTS galerie (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT,
  image_url TEXT NOT NULL,
  categorie TEXT CHECK (categorie IN ('Match', 'Entraînement', 'Événement')),
  equipe TEXT,
  date_photo DATE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS partenaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  logo_url TEXT,
  site_url TEXT,
  niveau TEXT DEFAULT 'standard' NOT NULL CHECK (niveau IN ('gold', 'standard')),
  ordre INTEGER,
  actif BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS resultats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipe TEXT NOT NULL,
  adversaire TEXT NOT NULL,
  score_jem INTEGER,
  score_adversaire INTEGER,
  date_match DATE,
  lieu TEXT CHECK (lieu IN ('Domicile', 'Extérieur')),
  type TEXT DEFAULT 'match' NOT NULL CHECK (type IN ('match', 'plateau', 'tournoi'))
);

CREATE TABLE IF NOT EXISTS sondages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  actif BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS sondage_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sondage_id UUID NOT NULL REFERENCES sondages(id) ON DELETE CASCADE,
  texte TEXT NOT NULL,
  ordre INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS sondage_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sondage_id UUID NOT NULL REFERENCES sondages(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES sondage_options(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (sondage_id, voter_id)
);

CREATE TABLE IF NOT EXISTS temoignages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom_parent TEXT NOT NULL,
  categorie_enfant TEXT,
  message TEXT NOT NULL,
  ordre INTEGER DEFAULT 0 NOT NULL,
  actif BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO site_settings (key, value) VALUES
  ('stat1_value', '120+'), ('stat1_label', 'Licenciés cette saison'),
  ('stat2_value', 'U7–U13'), ('stat2_label', 'Toutes catégories'),
  ('stat3_value', '2022'), ('stat3_label', 'Fondation du club'),
  ('stat4_value', '15+'), ('stat4_label', 'Éducateurs formés FFF'),
  ('hero_tagline', 'Respect · Plaisir · Engagement · Collectif')
ON CONFLICT DO NOTHING;

-- Seed équipes
INSERT INTO equipes (categorie, tranche_age, horaires, effectif, ordre) VALUES
  ('U7/U8',   '5–7 ans',   'Lundi 17h45–19h30 / Mercredi 14h15–16h00', 20, 1),
  ('U9',      '8–9 ans',   'Mardi & Jeudi 17h45–19h30',                  18, 2),
  ('U10/U11', '10–11 ans', 'Mardi & Jeudi 17h45–19h30',                  22, 3),
  ('U12/U13', '12–13 ans', 'Lundi 18h00–19h30 / Mercredi 16h00–18h00',  25, 4)
ON CONFLICT DO NOTHING;

-- Seed partenaires
INSERT INTO partenaires (nom, logo_url, site_url, niveau, ordre) VALUES
  ('MercadierLab', 'https://jem-foot.fr/wp-content/uploads/2026/01/MercadierLab-LOGO.png', NULL, 'gold', 1),
  ('JSA CPA',      'https://jem-foot.fr/wp-content/uploads/2026/01/JSA-CPA.png',            NULL, 'standard', 2),
  ('SPUC',         'https://jem-foot.fr/wp-content/uploads/2026/01/SPUC.png',               NULL, 'standard', 3)
ON CONFLICT DO NOTHING;
