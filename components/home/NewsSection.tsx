import { db, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const placeholders: Article[] = [
  {
    id: '1',
    titre: 'Actualité du J.E.M – 01 Janvier 2026',
    slug: 'bonne-annee-2026-et-reprise-des-entrainements-au-j-e-m',
    extrait: 'Bonne année à toute la famille JEM ! Retour sur la reprise des entraînements.',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/Echauffement-10-01-2026.jpeg',
    categorie: 'Articles Mensuels',
    publie: true,
    contenu: null,
    created_at: new Date('2026-01-15'),
    updated_at: new Date('2026-01-15'),
  },
  {
    id: '2',
    titre: 'Interview : Yassine Bouassria',
    slug: 'interview-immersion-dans-le-quotidien-du-j-e-m-yassine-bouassria',
    extrait: 'Le président nous parle du projet éducatif et des ambitions pour 2026.',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2026/01/Interview-President-JEM-Couverture-scaled.jpg',
    categorie: 'Interview',
    publie: true,
    contenu: null,
    created_at: new Date('2026-01-23'),
    updated_at: new Date('2026-01-23'),
  },
  {
    id: '3',
    titre: 'Bilan du mois de Février',
    slug: 'actualite-du-j-e-m-bilan-du-mois-de-fevrier',
    extrait: 'Résultats, entraînements et temps forts du mois de février au J.E.M.',
    image_url: 'https://jem-foot.fr/wp-content/uploads/2026/02/IMG_6327.jpeg',
    categorie: 'Articles Mensuels',
    publie: true,
    contenu: null,
    created_at: new Date('2026-03-04'),
    updated_at: new Date('2026-03-04'),
  },
];

const categoryColors: Record<string, string> = {
  'Articles Mensuels': 'bg-[#7a1f3d]',
  FAQ: 'bg-[#2a3d6e]',
  Interview: 'bg-[#1e2c56] border border-[rgba(232,213,163,0.2)]',
};

export default async function NewsSection() {
  let articles: Article[] = [];

  try {
    articles = await db
      .select()
      .from(schema.articles)
      .where(eq(schema.articles.publie, true))
      .orderBy(desc(schema.articles.created_at))
      .limit(3);
  } catch {
    // DB not configured yet — show placeholders
  }

  const displayed = articles.length > 0 ? articles : placeholders;
  const [main, ...rest] = displayed;

  return (
    <section className="bg-[#141d3f] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow label="Actualités" />
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2]">
              Dernières Nouvelles
            </h2>
            <Link href="/actualite" className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors hidden sm:block">
              Voir tout →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {main && (
            <ScrollReveal className="lg:col-span-3" delay={0.1}>
              <Link href={`/actualite/${main.slug}`} className="group block h-full">
                <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] transition-all hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {main.image_url && (
                      <Image src={main.image_url} alt={main.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    )}
                    {main.categorie && (
                      <span className={`absolute top-3 left-3 ${categoryColors[main.categorie] ?? 'bg-[#7a1f3d]'} text-[#f8f6f2] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded`}>
                        {main.categorie}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-[#8a96b8] mb-2">{formatDate(main.created_at)}</p>
                    <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.04em] text-[#f8f6f2] mb-3 group-hover:text-[#e8d5a3] transition-colors">{main.titre}</h3>
                    {main.extrait && <p className="text-sm text-[#8a96b8] leading-relaxed flex-1">{main.extrait}</p>}
                    <span className="mt-4 text-xs font-semibold text-[#e8d5a3]">Lire l&apos;article →</span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          )}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((article, i) => (
              <ScrollReveal key={article.id} delay={0.2 + i * 0.1} className="flex-1">
                <Link href={`/actualite/${article.slug}`} className="group block h-full">
                  <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] transition-all hover:-translate-y-1 h-full flex flex-col">
                    {article.image_url && (
                      <div className="relative aspect-[16/7] overflow-hidden">
                        <Image src={article.image_url} alt={article.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        {article.categorie && (
                          <span className={`absolute top-2 left-2 ${categoryColors[article.categorie] ?? 'bg-[#7a1f3d]'} text-[#f8f6f2] text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded`}>
                            {article.categorie}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-[#8a96b8] mb-1">{formatDate(article.created_at)}</p>
                      <h3 className="font-[family-name:var(--font-bebas)] text-lg tracking-[0.04em] text-[#f8f6f2] group-hover:text-[#e8d5a3] transition-colors">{article.titre}</h3>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
