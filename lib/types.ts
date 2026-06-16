// Types re-exportés depuis le schéma Drizzle
export type {
  Article,
  NewArticle,
  Educateur,
  NewEducateur,
  Equipe,
  NewEquipe,
  GaleriePhoto,
  NewGaleriePhoto,
  Partenaire,
  NewPartenaire,
  Resultat,
} from './schema';

// Helpers de catégories (validation côté UI)
export type ArticleCategorie = 'Articles Mensuels' | 'FAQ' | 'Interview';
export type GalerieCategorie = 'Match' | 'Entraînement' | 'Événement';
export type PartenaireNiveau = 'gold' | 'standard';
export type ResultatLieu = 'Domicile' | 'Extérieur';
export type ResultatType = 'match' | 'plateau' | 'tournoi';
