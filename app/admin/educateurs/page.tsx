import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Educateur } from '@/lib/types';
import EducateursAdmin from './EducateursAdmin';

export default async function AdminEducateursPage() {
  let educateurs: Educateur[] = [];
  try {
    educateurs = await db.select().from(schema.educateurs).orderBy(asc(schema.educateurs.ordre));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">
        Éducateurs
      </h1>
      <EducateursAdmin educateurs={educateurs} />
    </div>
  );
}
