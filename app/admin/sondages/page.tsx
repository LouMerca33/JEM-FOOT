import { db, schema } from '@/lib/db';
import { asc, desc, eq, sql } from 'drizzle-orm';
import SondagesAdmin from './SondagesAdmin';

export type SondageWithOptions = {
  id: string;
  question: string;
  actif: boolean;
  options: { id: string; texte: string; ordre: number; votes: number }[];
};

export default async function AdminSondagesPage() {
  let sondages: SondageWithOptions[] = [];
  try {
    const base = await db.select().from(schema.sondages).orderBy(desc(schema.sondages.created_at));
    const optionsRows = await db
      .select({
        id: schema.sondageOptions.id,
        sondage_id: schema.sondageOptions.sondage_id,
        texte: schema.sondageOptions.texte,
        ordre: schema.sondageOptions.ordre,
        votes: sql<number>`count(${schema.sondageVotes.id})`.mapWith(Number),
      })
      .from(schema.sondageOptions)
      .leftJoin(schema.sondageVotes, eq(schema.sondageVotes.option_id, schema.sondageOptions.id))
      .groupBy(schema.sondageOptions.id)
      .orderBy(asc(schema.sondageOptions.ordre));

    sondages = base.map((s) => ({
      id: s.id,
      question: s.question,
      actif: s.actif,
      options: optionsRows.filter((o) => o.sondage_id === s.id),
    }));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-2">Sondages</h1>
      <p className="text-sm text-[#8a96b8] mb-8">Un seul sondage actif s&apos;affiche sur la page d&apos;accueil (le plus récent).</p>
      <SondagesAdmin sondages={sondages} />
    </div>
  );
}
