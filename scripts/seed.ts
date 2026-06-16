import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('Nettoyage...');
  await db.delete(schema.partenaires);
  await db.delete(schema.equipes);
  await db.delete(schema.articles);

  await db.delete(schema.educateurs);

  console.log('Seeding éducateurs...');
  const BASE = 'https://jem-foot.fr/wp-content/uploads/2025/12/';
  await db.insert(schema.educateurs).values([
    { nom: 'Hammadi LAMTALSI',   role: 'Responsable U10',         quote: 'Aide chaque enfant à progresser à son rythme dans un cadre sécurisant.',                         photo_url: `${BASE}Capture-decran-2025-12-11-a-17.52.56.png`,           ordre: 1,  actif: true },
    { nom: 'Yassine BOUASSRIA',  role: 'Responsable U12/U13',     quote: 'Éducateur passionné, dédié au développement technique et humain des jeunes joueurs.',             photo_url: `${BASE}Capture-decran-2025-12-11-a-17.59.41.png`,           ordre: 2,  actif: true },
    { nom: 'Mohammed BOUASSRIA', role: 'Encadrant',                quote: 'Forme les jeunes Mérignacais dans le respect, le plaisir et l\'esprit d\'équipe.',               photo_url: `${BASE}Capture-decran-2025-12-11-a-17.53.12.png`,           ordre: 3,  actif: true },
    { nom: 'Louÿs MERCADIER',    role: 'Responsable équipe U11',  quote: 'Centré sur la progression et le plaisir de jeu.',                                                photo_url: `${BASE}Capture-decran-2025-12-11-a-18.24.30.png`,           ordre: 4,  actif: true },
    { nom: 'Luiggy LOSTEAU',     role: 'Encadrant U11',           quote: 'Forme les jeunes Mérignacais dans le respect, le plaisir et l\'esprit d\'équipe.',               photo_url: `${BASE}Luiggy-1.jpeg`,                                      ordre: 5,  actif: true },
    { nom: 'Jean Marie BROU',    role: 'Éducateur',               quote: 'Faire grandir les joueurs, sur et en dehors du terrain.',                                         photo_url: `${BASE}Capture-decran-2025-12-11-a-17.59.54.png`,           ordre: 6,  actif: true },
    { nom: 'Ali DAIF',           role: 'Éducateur',               quote: 'Donner envie de jouer, d\'apprendre et de s\'améliorer.',                                        photo_url: `${BASE}Capture-decran-2025-12-11-a-18.17.00.png`,           ordre: 7,  actif: true },
    { nom: 'Amin ESSALHI',       role: 'Responsable U7',          quote: 'Éducateur engagé dans le football jeunes à Mérignac.',                                            photo_url: `${BASE}Capture-decran-2025-12-11-a-17.55.43.png`,           ordre: 8,  actif: true },
    { nom: 'Mohamed MACHTIH',    role: 'Encadrant U10',           quote: 'Le plaisir du jeu au service de la progression.',                                                 photo_url: `${BASE}Capture-decran-.-2025-12-11-a-18.19.55-1.png`,       ordre: 9,  actif: true },
    { nom: 'Kevin MINOT',        role: 'Responsable équipe U8/U9',quote: 'Construire des joueurs, former des personnes.',                                                   photo_url: `${BASE}Capture-decran-2025-12-11-a-18.16.51.png`,           ordre: 10, actif: true },
    { nom: 'Saad TAZINE',        role: 'Éducateur',               quote: 'Passionné par la formation des jeunes.',                                                           photo_url: `${BASE}Capture-decran-2025-12-11-a-17.57.29.png`,           ordre: 11, actif: true },
    { nom: 'Othman RAHMOUNE',    role: 'Éducateur',               quote: 'Former et transmettre, avant tout.',                                                              photo_url: `${BASE}Capture-decran-.-2025-12-11-a-18.20.58-2.png`,       ordre: 12, actif: true },
  ]);

  console.log('Seeding équipes...');
  await db.insert(schema.equipes).values([
    { categorie: 'U7',  tranche_age: '5–6 ans',   horaires: 'Lundi 17h45–19h30 / Mercredi 14h15–16h00', effectif: 18, ordre: 1, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-edited.jpeg' },
    { categorie: 'U8',  tranche_age: '7–8 ans',   horaires: 'Lundi 17h45–19h30 / Mercredi 14h15–16h00', effectif: 16, ordre: 2, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-PRIME.jpeg' },
    { categorie: 'U9',  tranche_age: '8–9 ans',   horaires: 'Mardi & Jeudi 17h45–19h30',                 effectif: 16, ordre: 3, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U8-U9.jpeg' },
    { categorie: 'U10', tranche_age: '9–10 ans',  horaires: 'Mardi & Jeudi 17h45–19h30',                 effectif: 16, ordre: 4, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U10-PRIME.jpeg' },
    { categorie: 'U11', tranche_age: '10–11 ans', horaires: 'Mardi & Jeudi 17h45–19h30',                 effectif: 18, ordre: 5, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/JEM-U11.jpeg' },
    { categorie: 'U12', tranche_age: '11–12 ans', horaires: 'Lundi 18h00–19h30 / Mercredi 16h00–18h00', effectif: 20, ordre: 6, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-MATCH-11.jpeg' },
    { categorie: 'U13', tranche_age: '12–13 ans', horaires: 'Lundi 18h00–19h30 / Mercredi 16h00–18h00', effectif: 22, ordre: 7, image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-12-12.jpeg' },
  ]);

  console.log('Seeding partenaires...');
  await db.insert(schema.partenaires).values([
    { nom: 'MercadierLab',        logo_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/MercadierLab-LOGO.png',                        site_url: 'https://mercadierlab.com',     niveau: 'gold',     ordre: 1, actif: true },
    { nom: 'Sport\'R & SR Pro',   logo_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/432cf7b7-3467-45d2-a5b6-94873cfdffaa.jpg',     site_url: 'https://www.sportr.fr',        niveau: 'gold',     ordre: 2, actif: true },
    { nom: 'Barber Hair',         logo_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/95f11c1c-f3f2-41b6-9ddf-21705d9eba6c.jpg',     site_url: null,                           niveau: 'standard', ordre: 3, actif: true },
    { nom: 'Auto Pare Brise +',   logo_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/Capture-decran-2025-12-15-a-09.41.03.png',     site_url: 'https://autoparebrisseplus.fr', niveau: 'standard', ordre: 4, actif: true },
  ]);

  console.log('Seeding articles...');
  await db.insert(schema.articles).values([
    {
      titre: 'Bonne année 2026 et reprise des entraînements au J.E.M',
      slug: 'bonne-annee-2026-et-reprise-des-entrainements-au-j-e-m',
      categorie: 'Articles Mensuels',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/Echauffement-10-01-2026.jpeg',
      extrait: 'Bonne année à toute la famille JEM ! Retour sur la reprise des entraînements et les premières séances de 2026.',
      contenu: '<p>Le club des Jeunes Espoirs Mérignacais vous souhaite une excellente année 2026. Après les fêtes, les entraînements ont repris avec enthousiasme. Tous les groupes étaient au rendez-vous pour débuter cette nouvelle année sous les meilleurs auspices.</p>',
      publie: true,
      created_at: new Date('2026-01-15'),
      updated_at: new Date('2026-01-15'),
    },
    {
      titre: 'Bilan du mois de décembre',
      slug: 'actualite-du-j-e-m-bilan-du-mois-de-decembre',
      categorie: 'Articles Mensuels',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/Gouter-noel-.jpeg',
      extrait: 'Retour sur un mois de décembre riche en émotions : matchs, entraînements et goûter de Noël pour clôturer l\'année en beauté.',
      contenu: '<p>Le mois de décembre a été particulièrement riche pour le J.E.M. Entre les derniers matchs de l\'année et le traditionnel goûter de Noël, les joueurs ont vécu de beaux moments ensemble. Un grand merci à tous les parents et bénévoles pour leur soutien.</p>',
      publie: true,
      created_at: new Date('2026-01-15'),
      updated_at: new Date('2026-01-15'),
    },
    {
      titre: 'Comment choisir son club de foot à Mérignac ?',
      slug: 'comment-choisir-son-club-de-foot-a-merignac',
      categorie: 'FAQ',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U10-PRIME.jpeg',
      extrait: 'Vous cherchez un club de football pour votre enfant à Mérignac ? Voici les critères essentiels à prendre en compte pour faire le bon choix.',
      contenu: '<p>Choisir un club de football pour son enfant est une décision importante. Il faut prendre en compte plusieurs critères : les valeurs éducatives, la qualité des éducateurs, les créneaux d\'entraînement, et bien sûr l\'ambiance au sein du groupe. Au J.E.M, nous mettons l\'accent sur le plaisir de jouer et le développement de l\'enfant.</p>',
      publie: true,
      created_at: new Date('2026-01-23'),
      updated_at: new Date('2026-01-23'),
    },
    {
      titre: 'Interview : Yassine Bouassria, Président du J.E.M',
      slug: 'interview-immersion-dans-le-quotidien-du-j-e-m-yassine-bouassria',
      categorie: 'Interview',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/Interview-President-JEM-Couverture-scaled.jpg',
      extrait: 'Le président du club nous ouvre les portes du J.E.M et nous parle du projet éducatif, des ambitions et de sa vision pour 2026.',
      contenu: '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:24px"><iframe src="https://www.youtube.com/embed/DtjU7TGOH2Y" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe></div><p>Rencontre avec Yassine Bouassria, président et fondateur des Jeunes Espoirs Mérignacais. Il revient sur la création du club en 2022, les valeurs qui animent l\'équipe encadrante et les projets pour la saison à venir.</p><p><strong>Comment est né le projet ?</strong></p><p>L\'idée est née d\'un constat simple : Mérignac manquait d\'un club de proximité, axé sur les valeurs éducatives, pour les jeunes de 5 à 13 ans. Avec quelques passionnés, nous avons décidé de créer le J.E.M en 2022.</p>',
      publie: true,
      created_at: new Date('2026-01-23'),
      updated_at: new Date('2026-01-23'),
    },
    {
      titre: 'Interview : Nos U12-U13 parlent de leur saison',
      slug: 'interview-immersion-dans-le-quotidien-du-j-e-m-nos-u12-u13',
      categorie: 'Interview',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-MATCH-11.jpeg',
      extrait: 'Les grands du club se confient : ambiance dans le groupe, objectifs de la saison et ce qu\'ils aiment au J.E.M.',
      contenu: '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:24px"><iframe src="https://www.youtube.com/embed/nQPzTDKK588" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe></div><p>Cette semaine, nous avons donné la parole aux joueurs de la catégorie U12-U13. Ils nous racontent leur saison, leurs ambitions et ce qui les fait revenir chaque semaine au stade Marie Houdré.</p>',
      publie: true,
      created_at: new Date('2026-02-04'),
      updated_at: new Date('2026-02-04'),
    },
    {
      titre: 'Bilan du mois de Janvier',
      slug: 'actualite-du-j-e-m-bilan-du-mois-de-janvier',
      categorie: 'Articles Mensuels',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/Gouter-du-club-scaled.jpg',
      extrait: 'Janvier en chiffres : matchs joués, entraînements et premiers résultats de l\'année pour toutes les catégories du J.E.M.',
      contenu: '<p>Janvier 2026 a démarré sur les chapeaux de roue ! Toutes les catégories ont repris la compétition avec un bel engouement. Voici le bilan de ce premier mois de l\'année pour les Jeunes Espoirs Mérignacais.</p>',
      publie: true,
      created_at: new Date('2026-02-05'),
      updated_at: new Date('2026-02-05'),
    },
    {
      titre: 'Bilan du mois de Février',
      slug: 'actualite-du-j-e-m-bilan-du-mois-de-fevrier',
      categorie: 'Articles Mensuels',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/02/IMG_6327.jpeg',
      extrait: 'Résultats, moments forts et temps forts du mois de février au J.E.M. Retour sur un mois riche en football.',
      contenu: '<p>Février a été un mois intense pour tous les groupes du J.E.M. Matchs serrés, belles victoires et leçons tirées des défaites : nos jeunes joueurs grandissent à chaque rencontre.</p>',
      publie: true,
      created_at: new Date('2026-03-04'),
      updated_at: new Date('2026-03-04'),
    },
    {
      titre: 'Pourquoi le football est excellent pour les enfants ?',
      slug: 'football-sport-enfants-merignac',
      categorie: 'FAQ',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-PRIME.jpeg',
      extrait: 'Sport collectif par excellence, le football développe bien plus que la technique. Découvrez tous les bienfaits de la pratique pour les enfants.',
      contenu: '<p>Le football est l\'un des sports les plus bénéfiques pour les enfants. Au-delà de la forme physique, il développe des compétences essentielles : le travail en équipe, la gestion des émotions, la persévérance et le fair-play. Au J.E.M, nous en faisons la pierre angulaire de notre projet éducatif.</p>',
      publie: true,
      created_at: new Date('2026-02-11'),
      updated_at: new Date('2026-02-11'),
    },
    {
      titre: 'Projet Mbappé : faut-il mettre la pression sur son enfant ?',
      slug: 'football-enfant-projet-mbappe-pression',
      categorie: 'FAQ',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U8-U9.jpeg',
      extrait: 'Beaucoup de parents rêvent d\'un futur champion. Mais trop de pression peut-elle nuire au développement de l\'enfant ? Notre regard d\'éducateurs.',
      contenu: '<p>La question revient souvent dans nos vestiaires. Des parents qui projettent beaucoup sur leurs enfants, des enfants qui portent un poids parfois trop lourd. Chez le J.E.M, nous croyons fermement que le plaisir de jouer doit primer sur la performance.</p>',
      publie: true,
      created_at: new Date('2026-02-25'),
      updated_at: new Date('2026-02-25'),
    },
    {
      titre: 'Combien coûte le football pour un enfant à Mérignac en 2026 ?',
      slug: 'prix-football-enfant-merignac-2026',
      categorie: 'FAQ',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/03/Jem-coupe.jpeg',
      extrait: 'Licence, équipement, frais de déplacement... Voici une estimation claire du budget annuel pour inscrire son enfant au football à Mérignac.',
      contenu: '<p>Vous souhaitez inscrire votre enfant au football mais vous ne savez pas quel budget prévoir ? Le J.E.M s\'engage à proposer des tarifs accessibles à toutes les familles. Contactez-nous pour connaître les modalités d\'inscription et les aides disponibles.</p>',
      publie: true,
      created_at: new Date('2026-03-25'),
      updated_at: new Date('2026-03-25'),
    },
    {
      titre: 'Formulaire d\'inscription pour les détections',
      slug: 'formulaire-dinscription-pour-les-detections',
      categorie: 'Articles Mensuels',
      image_url: 'https://jem-foot.fr/wp-content/uploads/2026/02/IMG_6332.jpeg',
      extrait: 'Le J.E.M organise des séances de détection pour la saison 2026-2027. Inscrivez votre enfant dès maintenant !',
      contenu: '<p>La saison 2026-2027 approche et nous commençons les détections pour constituer nos groupes. Si votre enfant a entre 5 et 13 ans et souhaite rejoindre le J.E.M, contactez-nous pour participer à une séance d\'essai gratuite.</p><p>📧 secretariat.em@gmail.fr</p>',
      publie: true,
      created_at: new Date('2026-03-22'),
      updated_at: new Date('2026-03-22'),
    },
  ]);

  console.log('✓ Seed terminé — 7 équipes, 6 partenaires, 11 articles');
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
