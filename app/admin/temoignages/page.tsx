import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Temoignage } from '@/lib/types';
import TemoignagesAdmin from './TemoignagesAdmin';

export default async function AdminTemoignagesPage() {
  let temoignages: Temoignage[] = [];
  try {
    temoignages = await db.select().from(schema.temoignages).orderBy(asc(schema.temoignages.ordre));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-2">Témoignages</h1>
      <p className="text-sm text-[#8a96b8] mb-8">Affichés en page d&apos;accueil pour rassurer les nouveaux parents.</p>
      <TemoignagesAdmin temoignages={temoignages} />
    </div>
  );
}
