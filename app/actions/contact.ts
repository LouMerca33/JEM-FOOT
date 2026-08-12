'use server';

import { db, schema } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function sendContactMessage(data: {
  nom: string;
  email: string;
  objet: string;
  message: string;
}) {
  if (!data.nom.trim() || !data.email.trim() || !data.message.trim()) {
    return { success: false, error: 'Merci de remplir tous les champs.' };
  }

  try {
    await db.insert(schema.contactMessages).values({
      nom: data.nom.trim(),
      email: data.email.trim(),
      objet: data.objet || null,
      message: data.message.trim(),
    });
  } catch {
    return { success: false, error: "Une erreur est survenue, réessayez ou appelez-nous directement." };
  }

  revalidatePath('/admin/messages');
  return { success: true };
}
