import { db, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import Link from 'next/link';

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function AdminDashboard() {
  let stats = { articles: 0, galerie: 0, partenaires: 0 };
  let recentArticles: Article[] = [];

  try {
    const [allArticles, allGalerie, allPartenaires] = await Promise.all([
      db.select().from(schema.articles),
      db.select().from(schema.galerie),
      db.select().from(schema.partenaires).where(eq(schema.partenaires.actif, true)),
    ]);
    stats = { articles: allArticles.length, galerie: allGalerie.length, partenaires: allPartenaires.length };
    recentArticles = await db.select().from(schema.articles).orderBy(desc(schema.articles.created_at)).limit(5);
  } catch {}

  const statCards = [
    { label: 'Articles', value: stats.articles, href: '/admin/articles', color: 'bg-[#7a1f3d]' },
    { label: 'Photos galerie', value: stats.galerie, href: '/admin/galerie', color: 'bg-[#2a3d6e]' },
    { label: 'Partenaires actifs', value: stats.partenaires, href: '/admin/partenaires', color: 'bg-[#1e2c56] border border-[rgba(232,213,163,0.15)]' },
  ];

  const quickLinks = [
    { href: '/admin/articles/new', label: 'Nouvel article', icon: '+' },
    { href: '/admin/galerie', label: 'Upload photos', icon: '⊡' },
    { href: '/admin/equipes', label: 'Modifier équipes', icon: '⊛' },
    { href: '/admin/partenaires', label: 'Gérer partenaires', icon: '⊕' },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className={`${s.color} rounded-[10px] p-6 hover:opacity-90 transition-opacity`}>
              <p className="font-[family-name:var(--font-bebas)] text-5xl text-[#f8f6f2]">{s.value}</p>
              <p className="text-sm text-[rgba(248,246,242,0.7)] mt-1">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2]">Articles récents</h2>
            <Link href="/admin/articles" className="text-xs text-[#e8d5a3] hover:text-[#f2e8c6]">Voir tout →</Link>
          </div>
          {recentArticles.length > 0 ? (
            <ul className="space-y-3">
              {recentArticles.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#f8f6f2] truncate">{a.titre}</p>
                    <p className="text-xs text-[#8a96b8]">{formatDate(a.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${a.publie ? 'bg-green-900/40 text-green-400' : 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]'}`}>
                      {a.publie ? 'Publié' : 'Brouillon'}
                    </span>
                    <Link href={`/admin/articles/${a.id}`} className="text-xs text-[#e8d5a3] hover:text-[#f2e8c6]">Éditer</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#8a96b8]">Aucun article pour l&apos;instant.</p>
          )}
        </div>
        <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Accès rapide</h2>
          <ul className="space-y-2">
            {quickLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-2 px-3 py-2.5 rounded text-sm text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <span className="text-[#e8d5a3]">{icon}</span>{label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
