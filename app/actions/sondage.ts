'use server';

import { db, schema } from '@/lib/db';
import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Action publique — aucune authentification requise.
// voterId : identifiant anonyme généré côté client (localStorage), sert
// uniquement à empêcher un même visiteur de voter plusieurs fois sur le même
// sondage (contrainte UNIQUE(sondage_id, voter_id) en base).
export async function voteSondage(sondageId: string, optionId: string, voterId: string) {
  if (!voterId || voterId.length < 8) {
    return { success: false, error: 'Identifiant invalide' };
  }

  const [sondage] = await db
    .select()
    .from(schema.sondages)
    .where(and(eq(schema.sondages.id, sondageId), eq(schema.sondages.actif, true)));

  if (!sondage) {
    return { success: false, error: 'Ce sondage n\u2019est plus disponible' };
  }

  try {
    await db.insert(schema.sondageVotes).values({
      sondage_id: sondageId,
      option_id: optionId,
      voter_id: voterId,
    });
  } catch {
    // Contrainte UNIQUE violée : ce visiteur a déjà voté sur ce sondage.
    return { success: false, error: 'Vous avez déjà voté sur ce sondage' };
  }

  revalidatePath('/');
  return { success: true };
}

export async function getSondageResults(sondageId: string) {
  const rows = await db
    .select({
      option_id: schema.sondageOptions.id,
      texte: schema.sondageOptions.texte,
      votes: sql<number>`count(${schema.sondageVotes.id})`.mapWith(Number),
    })
    .from(schema.sondageOptions)
    .leftJoin(schema.sondageVotes, eq(schema.sondageVotes.option_id, schema.sondageOptions.id))
    .where(eq(schema.sondageOptions.sondage_id, sondageId))
    .groupBy(schema.sondageOptions.id, schema.sondageOptions.texte, schema.sondageOptions.ordre)
    .orderBy(schema.sondageOptions.ordre);

  return rows;
}
