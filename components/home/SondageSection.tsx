import { db, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SondageWidget from './SondageWidget';
import { getSondageResults } from '@/app/actions/sondage';

export default async function SondageSection() {
  let sondage = null;
  try {
    [sondage] = await db
      .select()
      .from(schema.sondages)
      .where(eq(schema.sondages.actif, true))
      .orderBy(desc(schema.sondages.created_at))
      .limit(1);
  } catch {
    return null;
  }

  if (!sondage) return null;

  const results = await getSondageResults(sondage.id);
  if (results.length === 0) return null;

  return (
    <section className="py-20 bg-[#0d1429]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="flex justify-center">
            <SectionEyebrow label="Sondage du moment" />
          </div>
          <SondageWidget sondageId={sondage.id} question={sondage.question} initialResults={results} />
        </ScrollReveal>
      </div>
    </section>
  );
}
