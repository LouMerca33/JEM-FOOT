import { db, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { SAISON_META } from '@/lib/season';

export const metadata: Metadata = {
  title: 'Actualités — J.E.M Mérignac',
  description: 'Toutes les actualités du club de football Jeunes Espoirs Mérignacais.',
};

const categories = ['Tous', 'Articles Mensuels', 'FAQ', 'Interview'] as const;
type FilterCat = (typeof categories)[number];
const TOUTES_SAISONS = 'Toutes les saisons';

const categoryColors: Record<string, string> = {
  'Articles Mensuels': 'bg-[#7a1f3d]',
  FAQ: 'bg-[#2a3d6e]',
  Interview: 'bg-[#1e2c56] border border-[rgba(232,213,163,0.2)]',
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildHref(categorie: FilterCat, saison: string) {
  const p = new URLSearchParams();
  if (categorie !== 'Tous') p.set('categorie', categorie);
  if (saison !== SAISON_META) p.set('saison', saison);
  const qs = p.toString();
  return qs ? `/actualite?${qs}` : '/actualite';
}

export default async function ActualitePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; saison?: string }>;
}) {
  const params = await searchParams;
  const activeFilter = (params.categorie as FilterCat) ?? 'Tous';
  const activeSaison = params.saison ?? SAISON_META;

  let all: Article[] = [];
  try {
    all = await db
      .select()
      .from(schema.articles)
      .where(eq(schema.articles.publie, true))
      .orderBy(desc(schema.articles.created_at));
  } catch {}

  const saisons = [
    SAISON_META,
    ...Array.from(new Set(all.map((a) => a.saison).filter((s): s is string => !!s && s !== SAISON_META))).sort().reverse(),
  ];
  const seasonOptions = [...saisons, TOUTES_SAISONS];

  let articles = activeFilter === 'Tous' ? all : all.filter((a) => a.categorie === activeFilter);
  if (activeSaison !== TOUTES_SAISONS) {
    articles = articles.filter((a) => (a.saison ?? SAISON_META) === activeSaison);
  }

  return (
    <div className="bg-[#0d1429] min-h-screen">
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Le club en direct" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">Actualités</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildHref(cat, activeSaison)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${activeFilter === cat ? 'bg-[#7a1f3d] text-[#f8f6f2]' : 'bg-[#1e2c56] text-[#8a96b8] hover:text-[#f8f6f2] border border-[rgba(232,213,163,0.08)]'}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[rgba(232,213,163,0.08)]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8a96b8] mr-1">Saison</span>
          {seasonOptions.map((s) => (
            <Link
              key={s}
              href={buildHref(activeFilter, s)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${activeSaison === s ? 'bg-[#2a3d6e] text-[#e8d5a3] border border-[rgba(232,213,163,0.3)]' : 'text-[#8a96b8] hover:text-[#f8f6f2] border border-transparent'}`}
            >
              {s === TOUTES_SAISONS ? '📁 ' + s : s}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-[#8a96b8]">
            <p className="text-lg">
              {activeSaison === TOUTES_SAISONS
                ? 'Aucun article disponible pour l\u2019instant.'
                : `Aucun article pour la saison ${activeSaison}.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/actualite/${article.slug}`} className="group">
                <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] hover:-translate-y-1 transition-all h-full flex flex-col">
                  {article.image_url && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={article.image_url} alt={article.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      {article.categorie && (
                        <span className={`absolute top-3 left-3 ${categoryColors[article.categorie] ?? 'bg-[#7a1f3d]'} text-[#f8f6f2] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded`}>
                          {article.categorie}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-[#8a96b8] mb-2">{formatDate(article.created_at)} · {article.saison ?? SAISON_META}</p>
                    <h2 className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.04em] text-[#f8f6f2] group-hover:text-[#e8d5a3] transition-colors mb-2">{article.titre}</h2>
                    {article.extrait && <p className="text-sm text-[#8a96b8] leading-relaxed flex-1 line-clamp-3">{article.extrait}</p>}
                    <span className="mt-4 text-xs font-semibold text-[#e8d5a3]">Lire →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
