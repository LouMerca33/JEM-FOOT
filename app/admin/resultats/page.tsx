import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import type { Resultat } from '@/lib/types';
import ResultatsAdmin from './ResultatsAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminResultatsPage() {
  let resultats: Resultat[] = [];
  try {
    resultats = await db.select().from(schema.resultats).orderBy(desc(schema.resultats.date_match));
  } catch {}

  return (
    <div>
      <AdminPageHeader
        title="Résultats"
        description="Chaque victoire enregistrée déclenche une petite célébration sur le site."
        icon="⚽"
      />
      <ResultatsAdmin resultats={resultats} />
    </div>
  );
}
