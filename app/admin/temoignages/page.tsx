import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Temoignage } from '@/lib/types';
import TemoignagesAdmin from './TemoignagesAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminTemoignagesPage() {
  let temoignages: Temoignage[] = [];
  try {
    temoignages = await db.select().from(schema.temoignages).orderBy(asc(schema.temoignages.ordre));
  } catch {}

  return (
    <div>
      <AdminPageHeader title="Témoignages" description="Affichés en page d'accueil pour rassurer les nouveaux parents." icon="❝" />
      <TemoignagesAdmin temoignages={temoignages} />
    </div>
  );
}
