import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import type { GaleriePhoto } from '@/lib/types';
import GalerieAdmin from './GalerieAdmin';

export default async function AdminGaleriePage() {
  let photos: GaleriePhoto[] = [];
  try {
    photos = await db.select().from(schema.galerie).orderBy(desc(schema.galerie.created_at));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">Galerie Photos</h1>
      <GalerieAdmin photos={photos} />
    </div>
  );
}
