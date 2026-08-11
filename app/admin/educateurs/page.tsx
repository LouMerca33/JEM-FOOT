import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Educateur } from '@/lib/types';
import EducateursAdmin from './EducateursAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminEducateursPage() {
  let educateurs: Educateur[] = [];
  try {
    educateurs = await db.select().from(schema.educateurs).orderBy(asc(schema.educateurs.ordre));
  } catch {}

  return (
    <div>
      <AdminPageHeader title="Éducateurs" description="L'équipe encadrante mise en avant sur le site." icon="⊙" />
      <EducateursAdmin educateurs={educateurs} />
    </div>
  );
}
