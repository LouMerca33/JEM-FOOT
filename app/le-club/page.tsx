import Image from 'next/image';
import type { Metadata } from 'next';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card3D from '@/components/ui/Card3D';

export const metadata: Metadata = {
  title: 'Le Club — J.E.M Mérignac',
  description: 'Histoire, valeurs, éducateurs et direction des Jeunes Espoirs Mérignacais.',
};

const milestones: { date: string; label: string }[] = [
  { date: '10/2022', label: 'Création du club' },
  { date: '12/2022', label: 'Affiliation officielle à la Ligue Nouvelle Aquitaine' },
  { date: '05/2023', label: 'Début des entraînements au Stade Marie Houdré' },
  { date: '2023/2024', label: 'Première saison officielle de compétition' },
  { date: '2024', label: '60+ licenciés' },
  { date: '2025', label: '120+ licenciés – Les fans du Mérignac' },
];


const direction = [
  { poste: 'Président', nom: 'Yassine BOUASSRIA' },
  { poste: 'Secrétaire', nom: 'Mari MADI' },
  { poste: 'Responsable Technique des Jeunes (RTJ)', nom: 'Louÿs MERCADIER' },
  { poste: 'Responsable Communication', nom: 'Sofiane KAADA' },
];

function Initiales({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#1e2c56] text-[#e8d5a3] font-[family-name:var(--font-bebas)] text-2xl">
      {initials}
    </div>
  );
}

export default async function LeClubPage() {
  const educateurs = await db
    .select()
    .from(schema.educateurs)
    .where(eq(schema.educateurs.actif, true))
    .orderBy(asc(schema.educateurs.ordre));

  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#141d3f] py-32 overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Qui sommes-nous" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl md:text-8xl tracking-[0.04em] text-[#f8f6f2]">
            Le Club
          </h1>
        </div>
      </div>

      {/* Mot du Président */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionEyebrow label="Mot du Président" />
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-[0.04em] text-[#f8f6f2] mb-6">
                Yassine Bouassria
              </h2>
              <blockquote className="border-l-2 border-[#e8d5a3] pl-6 text-[#8a96b8] leading-relaxed italic space-y-4">
                <p>
                  &ldquo;Bienvenue au Jeunes Espoirs Mérignacais. Depuis la création du club, notre ambition est restée la même&nbsp;: offrir aux jeunes de Mérignac un cadre structuré et bienveillant où ils peuvent pratiquer le football dans les meilleures conditions. Chaque joueur – des U7 aux U14 – grandit et s&apos;améliore en apprenant à dépasser leurs limites.
                </p>
                <p>
                  Nous nous appuyons sur des valeurs essentielles&nbsp;: le respect, le plaisir, l&apos;engagement et le collectif. Notre priorité est de faire de chaque entraînement un moment de progrès et d&apos;épanouissement pour nos joueurs.
                </p>
                <p>
                  À mes parents, éducateurs et partenaires&nbsp;: merci pour votre confiance et votre engagement sans faille à nos côtés. Ensemble, nous construisons chaque semaine un club dont nous sommes fiers.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative rounded-[10px] overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 border border-[rgba(232,213,163,0.1)]">
                <Image
                  src="https://res.cloudinary.com/drwj4qlnu/image/upload/v1781614000/jem-foot/misc/Yassine.jpg"
                  alt="Yassine Bouassria, Président du J.E.M"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="bg-[#141d3f] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Chronologie" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-12">
              Notre Histoire
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[rgba(232,213,163,0.15)]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.date} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} sm:gap-0`}>
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#e8d5a3] mt-1.5 z-10" />
                    <div className={`pl-10 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-1">{m.date}</span>
                      <p className="text-[#f8f6f2] font-medium">{m.label}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projet sportif et éducatif */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Projet" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-6">
              Notre Projet Sportif et Éducatif
            </h2>
            <p className="text-[#8a96b8] leading-relaxed max-w-3xl">
              Le projet du J.E.M repose sur l&apos;apprentissage du football dans le respect des valeurs humaines. Nous prônons une pratique où l&apos;épanouissement personnel de chaque jeune joueur est au cœur de tout&nbsp;: l&apos;engagement, la créativité, la solidarité. Les entraînements sont pensés pour allier technique, tactique et développement du joueur dans un environnement positif.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Éducateurs */}
      <section className="bg-[#141d3f] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Encadrement" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-12">
              Nos Éducateurs
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {educateurs.map((edu, i) => (
              <ScrollReveal key={edu.id} delay={i * 0.06}>
                <Card3D intensity={5}>
                <div className="group bg-[#0d1429] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] rounded-[10px] overflow-hidden flex flex-col sm:flex-row items-start transition-colors duration-300">
                  <div className="relative w-20 h-20 flex-shrink-0 m-4 rounded-full overflow-hidden border border-[rgba(232,213,163,0.12)]">
                    {edu.photo_url ? (
                      <Image
                        src={edu.photo_url}
                        alt={edu.nom}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <Initiales name={edu.nom} />
                    )}
                  </div>
                  <div className="px-4 pb-4 sm:pt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e8d5a3] mb-0.5">{edu.role}</p>
                    <h3 className="font-[family-name:var(--font-bebas)] text-xl text-[#f8f6f2] mb-2">{edu.nom}</h3>
                    {edu.quote && <p className="text-xs text-[#8a96b8] leading-relaxed italic">&ldquo;{edu.quote}&rdquo;</p>}
                  </div>
                </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe de direction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Gouvernance" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-12">
              L&apos;Équipe de Direction
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {direction.map((d, i) => (
              <ScrollReveal key={d.nom} delay={i * 0.1}>
                <div className="bg-[#141d3f] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-1">{d.poste}</p>
                  <p className="font-[family-name:var(--font-bebas)] text-xl text-[#f8f6f2]">{d.nom}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notre philosophie */}
      <section className="bg-[#7a1f3d] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <SectionEyebrow label="Notre philosophie" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-8">
              Ce En Quoi Nous Croyons
            </h2>
            <p className="text-[rgba(248,246,242,0.85)] leading-relaxed text-lg">
              Au Jeunes Espoirs Mérignacais, notre projet sportif repose sur un football humain et bienveillant. Nous encourageons la progression individuelle, le plaisir de jeu et l&apos;épanouissement de chacun. Chaque entraînement est une occasion de transmettre les valeurs du sport&nbsp;: le respect, l&apos;engagement, le collectif et la solidarité. À travers le football, nous voulons construire des joueurs épanouis et des citoyens responsables.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
