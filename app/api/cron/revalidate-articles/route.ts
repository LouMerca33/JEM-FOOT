import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Appelé par le Cron Job Vercel (voir vercel.json). Rafraîchit les pages qui
// listent les articles pour que les publications programmées (publish_at)
// apparaissent sans attendre une modification manuelle dans l'admin.
//
// Limite du plan Vercel Hobby : le cron ne peut tourner qu'une fois par jour,
// et son horaire exact varie dans l'heure programmée (pas de précision à la
// minute). Une publication programmée à 08h00 peut donc n'apparaître qu'au
// prochain passage du cron, dans la journée. Passer au plan Pro permettrait
// une fréquence à la minute si une précision plus fine devient nécessaire.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/actualite');

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
