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
  publie: boolean('publie').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const equipes = pgTable('equipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  categorie: text('categorie').notNull(),
  tranche_age: text('tranche_age'),
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
