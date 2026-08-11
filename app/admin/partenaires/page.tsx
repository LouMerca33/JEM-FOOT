import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Partenaire } from '@/lib/types';
import PartenairesAdmin from './PartenairesAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminPartenairesPage() {
  let partenaires: Partenaire[] = [];
  try {
    partenaires = await db.select().from(schema.partenaires).orderBy(asc(schema.partenaires.ordre));
  } catch {}

  return (
    <div>
      <AdminPageHeader title="Partenaires" description="Logos et niveaux affichés sur /nos-partenaires." icon="⊕" />
      <PartenairesAdmin partenaires={partenaires} />
    </div>
  );
}
