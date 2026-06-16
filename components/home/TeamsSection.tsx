import Image from 'next/image';
import Link from 'next/link';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card3D from '@/components/ui/Card3D';

const teams = [
  {
    categorie: 'U7/U8',
    tranche_age: '5–7 ans',
    horaires: 'Lundi 17h45–19h30\nMercredi 14h15–16h00',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-edited.jpeg',
  },
  {
    categorie: 'U9',
    tranche_age: '8–9 ans',
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U8-U9.jpeg',
  },
  {
    categorie: 'U10/U11',
    tranche_age: '10–11 ans',
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U10-PRIME.jpeg',
  },
  {
    categorie: 'U12/U13',
    tranche_age: '12–13 ans',
    horaires: 'Lundi 18h00–19h30\nMercredi 16h00–18h00',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-MATCH-11.jpeg',
  },
];

export default function TeamsSection() {
  return (
    <section className="bg-[#0d1429] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow label="Nos équipes" />
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2]">
              Catégories U7 à U13
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
            <ScrollReveal key={team.categorie} delay={i * 0.1}>
              <Card3D intensity={6}>
                <Link href="/nos-equipes" className="group block">
                  <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] group-hover:border-[rgba(232,213,163,0.25)] transition-colors duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={team.image_url}
                        alt={`Équipe ${team.categorie}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
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
