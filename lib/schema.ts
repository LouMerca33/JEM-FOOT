import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: uuid('id').defaultRandom().primaryKey(),
  titre: text('titre').notNull(),
  slug: text('slug').unique().notNull(),
  contenu: text('contenu'),
  extrait: text('extrait'),
  image_url: text('image_url'),
  categorie: text('categorie'),
  saison: text('saison'),
  publie: boolean('publie').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const equipes = pgTable('equipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  categorie: text('categorie').notNull(),
  tranche_age: text('tranche_age'),
  coach: text('coach'),
  description: text('description'),
  horaires: text('horaires'),
  effectif: integer('effectif'),
  image_url: text('image_url'),
  ordre: integer('ordre'),
});

export const galerie = pgTable('galerie', {
  id: uuid('id').defaultRandom().primaryKey(),
  titre: text('titre'),
  image_url: text('image_url').notNull(),
  categorie: text('categorie'),
  equipe: text('equipe'),
  date_photo: date('date_photo'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const partenaires = pgTable('partenaires', {
  id: uuid('id').defaultRandom().primaryKey(),
  nom: text('nom').notNull(),
  logo_url: text('logo_url'),
  site_url: text('site_url'),
  niveau: text('niveau').default('standard').notNull(),
  ordre: integer('ordre'),
  actif: boolean('actif').default(true).notNull(),
});

export const educateurs = pgTable('educateurs', {
  id: uuid('id').defaultRandom().primaryKey(),
  nom: text('nom').notNull(),
  role: text('role').notNull(),
  quote: text('quote'),
  photo_url: text('photo_url'),
  ordre: integer('ordre'),
  actif: boolean('actif').default(true).notNull(),
});

export const resultats = pgTable('resultats', {
  id: uuid('id').defaultRandom().primaryKey(),
  equipe: text('equipe').notNull(),
  adversaire: text('adversaire').notNull(),
  score_jem: integer('score_jem'),
  score_adversaire: integer('score_adversaire'),
  date_match: date('date_match'),
  lieu: text('lieu'),
  type: text('type').default('match').notNull(),
});

export const sondages = pgTable('sondages', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  actif: boolean('actif').default(true).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const sondageOptions = pgTable('sondage_options', {
  id: uuid('id').defaultRandom().primaryKey(),
  sondage_id: uuid('sondage_id').notNull().references(() => sondages.id, { onDelete: 'cascade' }),
  texte: text('texte').notNull(),
  ordre: integer('ordre').default(0).notNull(),
});

export const sondageVotes = pgTable('sondage_votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  sondage_id: uuid('sondage_id').notNull().references(() => sondages.id, { onDelete: 'cascade' }),
  option_id: uuid('option_id').notNull().references(() => sondageOptions.id, { onDelete: 'cascade' }),
  voter_id: text('voter_id').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const temoignages = pgTable('temoignages', {
  id: uuid('id').defaultRandom().primaryKey(),
  nom_parent: text('nom_parent').notNull(),
  categorie_enfant: text('categorie_enfant'),
  message: text('message').notNull(),
  ordre: integer('ordre').default(0).notNull(),
  actif: boolean('actif').default(true).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Petits réglages libres de la page d'accueil (clé/valeur), pour éviter de
// créer une table dédiée pour chaque nouveau champ éditable.
export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Equipe = typeof equipes.$inferSelect;
export type NewEquipe = typeof equipes.$inferInsert;
export type GaleriePhoto = typeof galerie.$inferSelect;
export type NewGaleriePhoto = typeof galerie.$inferInsert;
export type Partenaire = typeof partenaires.$inferSelect;
export type NewPartenaire = typeof partenaires.$inferInsert;
export type Educateur = typeof educateurs.$inferSelect;
export type NewEducateur = typeof educateurs.$inferInsert;
export type Resultat = typeof resultats.$inferSelect;
export type Sondage = typeof sondages.$inferSelect;
export type NewSondage = typeof sondages.$inferInsert;
export type SondageOption = typeof sondageOptions.$inferSelect;
export type NewSondageOption = typeof sondageOptions.$inferInsert;
export type SondageVote = typeof sondageVotes.$inferSelect;
export type Temoignage = typeof temoignages.$inferSelect;
export type NewTemoignage = typeof temoignages.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
