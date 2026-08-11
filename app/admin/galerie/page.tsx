import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import type { GaleriePhoto } from '@/lib/types';
import GalerieAdmin from './GalerieAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminGaleriePage() {
  let photos: GaleriePhoto[] = [];
  try {
    photos = await db.select().from(schema.galerie).orderBy(desc(schema.galerie.created_at));
  } catch {}

  return (
    <div>
      <AdminPageHeader title="Galerie Photos" description="Les photos affichées sur /galeries-photos, classées par catégorie." icon="⊡" />
      <GalerieAdmin photos={photos} />
    </div>
  );
}
