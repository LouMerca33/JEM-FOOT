import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import Link from 'next/link';
import ArticleActions from './ArticleActions';

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function AdminArticlesPage() {
  let articles: Article[] = [];
  try {
    articles = await db.select().from(schema.articles).orderBy(desc(schema.articles.created_at));
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2]">Articles</h1>
        <Link href="/admin/articles/new" className="bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
          + Nouvel article
        </Link>
      </div>
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] overflow-hidden">
        {articles.length === 0 ? (
          <p className="p-8 text-sm text-[#8a96b8] text-center">Aucun article.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(232,213,163,0.08)]">
                {['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#8a96b8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-[rgba(232,213,163,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-3">
                    <p className="text-sm text-[#f8f6f2] max-w-xs truncate">{a.titre}</p>
                    <p className="text-xs text-[#8a96b8]">/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#8a96b8]">{a.categorie ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${a.publie ? 'bg-green-900/40 text-green-400' : 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]'}`}>
                      {a.publie ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#8a96b8]">{formatDate(a.created_at)}</td>
                  <td className="px-4 py-3"><ArticleActions id={a.id} publie={a.publie} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
