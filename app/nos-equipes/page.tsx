import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Nos Équipes — J.E.M Mérignac',
  description: 'Découvrez les catégories U7 à U14 des Jeunes Espoirs Mérignacais.',
};

export default async function NosEquipesPage() {
  const teams = await db.select().from(schema.equipes).orderBy(asc(schema.equipes.ordre));

  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Catégories" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">
            Nos Équipes
          </h1>
        </div>
      </div>

      {/* Teams */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {teams.map((team, i) => (
          <ScrollReveal key={team.id} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Info */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-2">{team.tranche_age}</p>
                <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2] mb-4">
                  {team.categorie}
                </h2>
                {team.description && <p className="text-[#8a96b8] mb-6 leading-relaxed">{team.description}</p>}
                <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-4 mb-6 space-y-3">
                  {team.coach && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-1">Coach</p>
                      <p className="text-sm text-[#f8f6f2]">{team.coach}</p>
                    </div>
                  )}
                  {team.horaires && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-1">Créneaux</p>
                      <p className="text-sm text-[#f8f6f2] whitespace-pre-line">{team.horaires}</p>
                    </div>
                  )}
                </div>
                <Link
                  href="/nous-contacter"
                  className="inline-flex items-center gap-2 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-6 py-3 rounded text-sm transition-colors"
                >
                  Inscrire mon enfant →
                </Link>
              </div>

              {/* Image */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden border border-[rgba(232,213,163,0.08)]">
                  {team.image_url && (
                    <Image
                      src={team.image_url}
                      alt={`Équipe ${team.categorie} J.E.M`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
