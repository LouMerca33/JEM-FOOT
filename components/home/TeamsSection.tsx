import Image from 'next/image';
import Link from 'next/link';
import { asc } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import type { Equipe } from '@/lib/types';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card3D from '@/components/ui/Card3D';

// Repli si la table est vide ou inaccessible (ex: avant le premier seed).
const fallbackTeams: Equipe[] = [
  {
    id: 'fallback-1',
    categorie: 'U7/U8',
    tranche_age: '5–7 ans',
    coach: null,
    description: null,
    horaires: 'Lundi 17h45–19h30\nMercredi 14h15–16h00',
    effectif: null,
    image_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613972/jem-foot/equipes/U7-edited.jpg',
    ordre: 1,
  },
  {
    id: 'fallback-2',
    categorie: 'U9',
    tranche_age: '8–9 ans',
    coach: null,
    description: null,
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    effectif: null,
    image_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613976/jem-foot/equipes/U8-U9.jpg',
    ordre: 2,
  },
  {
    id: 'fallback-3',
    categorie: 'U10/U11',
    tranche_age: '10–11 ans',
    coach: null,
    description: null,
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    effectif: null,
    image_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613978/jem-foot/equipes/U10-PRIME.jpg',
    ordre: 3,
  },
  {
    id: 'fallback-4',
    categorie: 'U12/U13',
    tranche_age: '12–13 ans',
    coach: null,
    description: null,
    horaires: 'Lundi 18h00–19h30\nMercredi 16h00–18h00',
    effectif: null,
    image_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613981/jem-foot/equipes/U13-MATCH-11.jpg',
    ordre: 4,
  },
];

export default async function TeamsSection() {
  let teams: Equipe[] = fallbackTeams;
  try {
    const fromDb = await db.select().from(schema.equipes).orderBy(asc(schema.equipes.ordre));
    if (fromDb.length > 0) teams = fromDb;
  } catch {
    // Table absente ou DB inaccessible : on garde le repli ci-dessus.
  }

  return (
    <section className="bg-[#0d1429] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow label="Nos équipes" />
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2]">
              Catégories U7 à U14
            </h2>
            <Link
              href="/nos-equipes"
              className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors hidden sm:block"
            >
              Voir toutes →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, i) => (
            <ScrollReveal key={team.id} delay={i * 0.1}>
              <Card3D intensity={6}>
                <Link href="/nos-equipes" className="group block">
                  <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] group-hover:border-[rgba(232,213,163,0.25)] transition-colors duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {team.image_url ? (
                        <Image
                          src={team.image_url}
                          alt={`Équipe ${team.categorie}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-[#141d3f] flex items-center justify-center text-[#8a96b8] text-sm">
                          Pas de photo
                        </div>
                      )}
                      {/* Jersey stripe on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, rgba(122,31,61,0.18) 0px, rgba(122,31,61,0.18) 12px, transparent 12px, transparent 28px)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e2c56] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.06em] text-[#f8f6f2]">
                          {team.categorie}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-2">
                        {team.tranche_age}
                      </p>
                      <p className="text-sm text-[#8a96b8] whitespace-pre-line leading-relaxed">
                        {team.horaires}
                      </p>
                    </div>
                  </article>
                </Link>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
