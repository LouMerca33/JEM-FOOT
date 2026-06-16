import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Partenaire } from '@/lib/types';
import PartenairesAdmin from './PartenairesAdmin';

export default async function AdminPartenairesPage() {
  let partenaires: Partenaire[] = [];
  try {
    partenaires = await db.select().from(schema.partenaires).orderBy(asc(schema.partenaires.ordre));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">Partenaires</h1>
      <PartenairesAdmin partenaires={partenaires} />
    </div>
  );
}
