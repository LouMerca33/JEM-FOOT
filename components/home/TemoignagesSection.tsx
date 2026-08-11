import { db, schema } from '@/lib/db';
import { asc, eq } from 'drizzle-orm';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default async function TemoignagesSection() {
  let temoignages: (typeof schema.temoignages.$inferSelect)[] = [];
  try {
    temoignages = await db
      .select()
      .from(schema.temoignages)
      .where(eq(schema.temoignages.actif, true))
      .orderBy(asc(schema.temoignages.ordre));
  } catch {
    return null;
  }

  if (temoignages.length === 0) return null;

  return (
    <section className="py-20 bg-[#111a38]">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <SectionEyebrow label="Ils nous font confiance" />
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.08}>
              <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6 h-full flex flex-col">
                <p className="text-[#f8f6f2] text-sm leading-relaxed mb-4 flex-1">&laquo; {t.message} &raquo;</p>
                <div>
                  <p className="text-[#e8d5a3] font-semibold text-sm">{t.nom_parent}</p>
                  {t.categorie_enfant && (
                    <p className="text-[#8a96b8] text-xs">Parent {t.categorie_enfant}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
