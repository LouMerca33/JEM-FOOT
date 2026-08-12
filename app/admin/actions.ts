'use server';

import { db, schema } from '@/lib/db';
import { asc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import type { ArticleCategorie, GalerieCategorie, PartenaireNiveau } from '@/lib/types';

// ── Articles ──────────────────────────────────────────────────────────────────

export async function saveArticle(data: {
  id?: string;
  titre: string;
  slug: string;
  categorie: ArticleCategorie;
  saison: string;
  image_url: string;
  extrait: string;
  contenu: string;
  publie: boolean;
  publish_at: string; // ISO string, vide = publication immédiate
}) {
  const { id, ...fields } = data;
  const payload = {
    ...fields,
    saison: fields.saison || null,
    image_url: fields.image_url || null,
    extrait: fields.extrait || null,
    contenu: fields.contenu || null,
    publish_at: fields.publish_at ? new Date(fields.publish_at) : null,
    updated_at: new Date(),
  };

  if (id) {
    await db.update(schema.articles).set(payload).where(eq(schema.articles.id, id));
  } else {
    await db.insert(schema.articles).values({ ...payload, created_at: new Date() });
  }
  revalidatePath('/admin/articles');
  revalidatePath('/actualite');
  revalidatePath('/');
}

export async function toggleArticlePublish(id: string, publie: boolean) {
  await db.update(schema.articles)
    .set({ publie: !publie, updated_at: new Date() })
    .where(eq(schema.articles.id, id));
  revalidatePath('/admin/articles');
  revalidatePath('/actualite');
  revalidatePath('/');
}

export async function deleteArticle(id: string) {
  await db.delete(schema.articles).where(eq(schema.articles.id, id));
  revalidatePath('/admin/articles');
  revalidatePath('/actualite');
  revalidatePath('/');
}

// ── Éducateurs ────────────────────────────────────────────────────────────────

export async function saveEducateur(data: {
  id?: string;
  nom: string;
  role: string;
  quote: string;
  photo_url: string;
  ordre: number;
}) {
  const { id, ...fields } = data;
  const payload = {
    nom: fields.nom,
    role: fields.role,
    quote: fields.quote || null,
    photo_url: fields.photo_url || null,
    ordre: fields.ordre,
  };
  if (id) {
    await db.update(schema.educateurs).set(payload).where(eq(schema.educateurs.id, id));
  } else {
    await db.insert(schema.educateurs).values({ ...payload, actif: true });
  }
  revalidatePath('/admin/educateurs');
  revalidatePath('/le-club');
}

export async function toggleEducateur(id: string, actif: boolean) {
  await db.update(schema.educateurs).set({ actif: !actif }).where(eq(schema.educateurs.id, id));
  revalidatePath('/admin/educateurs');
  revalidatePath('/le-club');
}

export async function deleteEducateur(id: string) {
  await db.delete(schema.educateurs).where(eq(schema.educateurs.id, id));
  revalidatePath('/admin/educateurs');
  revalidatePath('/le-club');
}

// ── Galerie ───────────────────────────────────────────────────────────────────

export async function addGaleriePhoto(data: {
  image_url: string;
  titre: string;
  categorie: GalerieCategorie;
  equipe: string;
  date_photo: string;
}) {
  await db.insert(schema.galerie).values({
    image_url: data.image_url,
    titre: data.titre || null,
    categorie: data.categorie,
    equipe: data.equipe || null,
    date_photo: data.date_photo || null,
    created_at: new Date(),
  });
  revalidatePath('/admin/galerie');
  revalidatePath('/galeries-photos');
}

export async function deleteGaleriePhoto(id: string) {
  await db.delete(schema.galerie).where(eq(schema.galerie.id, id));
  revalidatePath('/admin/galerie');
  revalidatePath('/galeries-photos');
}

// ── Équipes ───────────────────────────────────────────────────────────────────

export async function updateEquipe(id: string, data: {
  tranche_age: string;
  coach: string;
  description: string;
  horaires: string;
  effectif: number | null;
  image_url: string;
}) {
  await db.update(schema.equipes).set({
    tranche_age: data.tranche_age || null,
    coach: data.coach || null,
    description: data.description || null,
    horaires: data.horaires || null,
    effectif: data.effectif,
    image_url: data.image_url || null,
  }).where(eq(schema.equipes.id, id));
  revalidatePath('/admin/equipes');
  revalidatePath('/nos-equipes');
  revalidatePath('/');
}

export async function createEquipe(data: {
  categorie: string;
  tranche_age: string;
  coach: string;
  description: string;
  horaires: string;
  effectif: number | null;
  image_url: string;
  ordre: number;
}) {
  await db.insert(schema.equipes).values({
    categorie: data.categorie,
    tranche_age: data.tranche_age || null,
    coach: data.coach || null,
    description: data.description || null,
    horaires: data.horaires || null,
    effectif: data.effectif,
    image_url: data.image_url || null,
    ordre: data.ordre,
  });
  revalidatePath('/admin/equipes');
  revalidatePath('/nos-equipes');
  revalidatePath('/');
}

export async function deleteEquipe(id: string) {
  await db.delete(schema.equipes).where(eq(schema.equipes.id, id));
  revalidatePath('/admin/equipes');
  revalidatePath('/nos-equipes');
  revalidatePath('/');
}

export async function moveEquipe(id: string, direction: 'up' | 'down') {
  const all = await db.select().from(schema.equipes).orderBy(asc(schema.equipes.ordre));
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return;

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return;

  const current = all[idx];
  const neighbor = all[swapIdx];

  await db.update(schema.equipes).set({ ordre: neighbor.ordre }).where(eq(schema.equipes.id, current.id));
  await db.update(schema.equipes).set({ ordre: current.ordre }).where(eq(schema.equipes.id, neighbor.id));

  revalidatePath('/admin/equipes');
  revalidatePath('/nos-equipes');
  revalidatePath('/');
}

// ── Partenaires ───────────────────────────────────────────────────────────────

export async function addPartenaire(data: {
  nom: string;
  logo_url: string;
  site_url: string;
  niveau: PartenaireNiveau;
  ordre: number;
}) {
  await db.insert(schema.partenaires).values({
    nom: data.nom,
    logo_url: data.logo_url || null,
    site_url: data.site_url || null,
    niveau: data.niveau,
    ordre: data.ordre,
    actif: true,
  });
  revalidatePath('/admin/partenaires');
  revalidatePath('/nos-partenaires');
}

export async function togglePartenaire(id: string, actif: boolean) {
  await db.update(schema.partenaires).set({ actif: !actif }).where(eq(schema.partenaires.id, id));
  revalidatePath('/admin/partenaires');
  revalidatePath('/nos-partenaires');
}

export async function deletePartenaire(id: string) {
  await db.delete(schema.partenaires).where(eq(schema.partenaires.id, id));
  revalidatePath('/admin/partenaires');
  revalidatePath('/nos-partenaires');
}

// ── Sondages ──────────────────────────────────────────────────────────────────

export async function createSondage(question: string) {
  const [sondage] = await db.insert(schema.sondages).values({ question, actif: true }).returning();
  revalidatePath('/admin/sondages');
  revalidatePath('/');
  return sondage;
}

export async function toggleSondage(id: string, actif: boolean) {
  await db.update(schema.sondages).set({ actif: !actif }).where(eq(schema.sondages.id, id));
  revalidatePath('/admin/sondages');
  revalidatePath('/');
}

export async function deleteSondage(id: string) {
  await db.delete(schema.sondages).where(eq(schema.sondages.id, id));
  revalidatePath('/admin/sondages');
  revalidatePath('/');
}

export async function addSondageOption(sondageId: string, texte: string, ordre: number) {
  await db.insert(schema.sondageOptions).values({ sondage_id: sondageId, texte, ordre });
  revalidatePath('/admin/sondages');
  revalidatePath('/');
}

export async function deleteSondageOption(id: string) {
  await db.delete(schema.sondageOptions).where(eq(schema.sondageOptions.id, id));
  revalidatePath('/admin/sondages');
  revalidatePath('/');
}

// ── Témoignages ───────────────────────────────────────────────────────────────

export async function addTemoignage(data: {
  nom_parent: string;
  categorie_enfant: string;
  message: string;
  ordre: number;
}) {
  await db.insert(schema.temoignages).values({
    nom_parent: data.nom_parent,
    categorie_enfant: data.categorie_enfant || null,
    message: data.message,
    ordre: data.ordre,
    actif: true,
  });
  revalidatePath('/admin/temoignages');
  revalidatePath('/');
}

export async function toggleTemoignage(id: string, actif: boolean) {
  await db.update(schema.temoignages).set({ actif: !actif }).where(eq(schema.temoignages.id, id));
  revalidatePath('/admin/temoignages');
  revalidatePath('/');
}

export async function deleteTemoignage(id: string) {
  await db.delete(schema.temoignages).where(eq(schema.temoignages.id, id));
  revalidatePath('/admin/temoignages');
  revalidatePath('/');
}

// ── Réglages page d'accueil ─────────────────────────────────────────────────

export async function saveSettings(data: Record<string, string>) {
  for (const [key, value] of Object.entries(data)) {
    await db
      .insert(schema.siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({ target: schema.siteSettings.key, set: { value } });
  }
  revalidatePath('/admin/accueil');
  revalidatePath('/');
}

// ── Résultats ────────────────────────────────────────────────────────────────

export async function addResultat(data: {
  equipe: string;
  adversaire: string;
  score_jem: number | null;
  score_adversaire: number | null;
  date_match: string; // YYYY-MM-DD
  lieu: string;
  type: string;
}) {
  await db.insert(schema.resultats).values({
    equipe: data.equipe,
    adversaire: data.adversaire,
    score_jem: data.score_jem,
    score_adversaire: data.score_adversaire,
    date_match: data.date_match || null,
    lieu: data.lieu || null,
    type: data.type,
  });
  revalidatePath('/admin/resultats');
  revalidatePath('/calendrier-et-resultat');
  revalidatePath('/');
}

export async function deleteResultat(id: string) {
  await db.delete(schema.resultats).where(eq(schema.resultats.id, id));
  revalidatePath('/admin/resultats');
  revalidatePath('/calendrier-et-resultat');
  revalidatePath('/');
}

// ── Messages de contact ─────────────────────────────────────────────────────

export async function markMessageRead(id: string, lu: boolean) {
  await db.update(schema.contactMessages).set({ lu: !lu }).where(eq(schema.contactMessages.id, id));
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, id));
  revalidatePath('/admin/messages');
}
