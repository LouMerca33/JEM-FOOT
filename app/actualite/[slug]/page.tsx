import { db, schema } from '@/lib/db';
import { eq, and, ne } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleVisibleWhere } from '@/lib/article-visibility';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [a] = await db.select({ titre: schema.articles.titre, extrait: schema.articles.extrait })
      .from(schema.articles).where(eq(schema.articles.slug, slug)).limit(1);
    if (a) return { title: `${a.titre} — J.E.M`, description: a.extrait ?? '' };
  } catch {}
  return { title: 'Article — J.E.M' };
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: Article | null = null;
  let similaires: Article[] = [];

  try {
    const [found] = await db.select().from(schema.articles)
      .where(and(eq(schema.articles.slug, slug), articleVisibleWhere)).limit(1);
    if (!found) notFound();
    article = found;

    if (found.categorie) {
      similaires = await db.select().from(schema.articles)
        .where(and(
          articleVisibleWhere,
          eq(schema.articles.categorie, found.categorie),
          ne(schema.articles.id, found.id),
        )).limit(3);
    }
  } catch {
    notFound();
  }

  if (!article) notFound();

  return (
    <div className="bg-[#0d1429] min-h-screen">
      <div className="relative bg-[#141d3f] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#8a96b8] mb-8">
            <Link href="/" className="hover:text-[#e8d5a3]">Accueil</Link>
            <span>/</span>
            <Link href="/actualite" className="hover:text-[#e8d5a3]">Actualités</Link>
            <span>/</span>
            <span className="text-[#f8f6f2] truncate max-w-[200px]">{article.titre}</span>
          </nav>
          {article.categorie && (
            <span className="inline-block bg-[#7a1f3d] text-[#f8f6f2] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4">
              {article.categorie}
            </span>
          )}
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl tracking-[0.04em] text-[#f8f6f2] mb-4">{article.titre}</h1>
          <p className="text-sm text-[#8a96b8]">{formatDate(article.created_at)}</p>
        </div>
      </div>

      {article.image_url && (
        <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
          <Image src={article.image_url} alt={article.titre} fill className="object-cover" unoptimized priority />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1429]" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {article.contenu ? (
          <div className="prose prose-invert prose-sm max-w-none text-[#8a96b8] leading-relaxed" dangerouslySetInnerHTML={{ __html: article.contenu }} />
        ) : article.extrait ? (
          <p className="text-[#8a96b8] leading-relaxed text-lg">{article.extrait}</p>
        ) : null}
        <div className="mt-12 pt-8 border-t border-[rgba(232,213,163,0.1)]">
          <Link href="/actualite" className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">← Retour aux actualités</Link>
        </div>
      </div>

      {similaires.length > 0 && (
        <section className="bg-[#141d3f] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.04em] text-[#f8f6f2] mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similaires.map((a) => (
                <Link key={a.id} href={`/actualite/${a.slug}`} className="group">
                  <article className="rounded-[10px] overflow-hidden bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] transition-all hover:-translate-y-1">
                    {a.image_url && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={a.image_url} alt={a.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs text-[#8a96b8] mb-1">{formatDate(a.created_at)}</p>
                      <h3 className="font-[family-name:var(--font-bebas)] text-lg text-[#f8f6f2] group-hover:text-[#e8d5a3] transition-colors">{a.titre}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
