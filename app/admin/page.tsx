import { db, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import Link from 'next/link';
import { AdminPageHeader, AdminCard, AdminCardTitle, AdminBadge, AdminEmptyState } from '@/components/admin/ui';

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function AdminDashboard() {
  let stats = { articles: 0, galerie: 0, partenaires: 0, sondages: 0 };
  let recentArticles: Article[] = [];

  try {
    const [allArticles, allGalerie, allPartenaires, allSondages] = await Promise.all([
      db.select().from(schema.articles),
      db.select().from(schema.galerie),
      db.select().from(schema.partenaires).where(eq(schema.partenaires.actif, true)),
      db.select().from(schema.sondages).where(eq(schema.sondages.actif, true)),
    ]);
    stats = { articles: allArticles.length, galerie: allGalerie.length, partenaires: allPartenaires.length, sondages: allSondages.length };
    recentArticles = await db.select().from(schema.articles).orderBy(desc(schema.articles.created_at)).limit(5);
  } catch {}

  const statCards = [
    { label: 'Articles', value: stats.articles, href: '/admin/articles', icon: '✎' },
    { label: 'Photos galerie', value: stats.galerie, href: '/admin/galerie', icon: '⊡' },
    { label: 'Partenaires actifs', value: stats.partenaires, href: '/admin/partenaires', icon: '⊕' },
    { label: 'Sondage en ligne', value: stats.sondages, href: '/admin/sondages', icon: '◈' },
  ];

  const quickLinks = [
    { href: '/admin/articles/new', label: 'Nouvel article', icon: '✎' },
    { href: '/admin/galerie', label: 'Upload photos', icon: '⊡' },
    { href: '/admin/equipes', label: 'Modifier équipes', icon: '⊛' },
    { href: '/admin/accueil', label: "Réglages de l'accueil", icon: '⌂' },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Vue d'ensemble du site — accès rapide aux sections que tu modifies le plus souvent."
        icon="⊞"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] group-hover:border-[rgba(232,213,163,0.25)] rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-full bg-[rgba(122,31,61,0.3)] border border-[rgba(232,213,163,0.15)] flex items-center justify-center text-sm text-[#e8d5a3]">
                  {s.icon}
                </span>
              </div>
              <p className="font-[family-name:var(--font-bebas)] text-4xl text-[#f8f6f2]">{s.value}</p>
              <p className="text-xs text-[#8a96b8] mt-1">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <AdminCardTitle>Articles récents</AdminCardTitle>
            <Link href="/admin/articles" className="text-xs font-semibold text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">Voir tout →</Link>
          </div>
          {recentArticles.length > 0 ? (
            <ul className="divide-y divide-[rgba(232,213,163,0.06)]">
              {recentArticles.map((a) => {
                const scheduled = a.publie && a.publish_at && new Date(a.publish_at) > new Date();
                return (
                  <li key={a.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#f8f6f2] truncate">{a.titre}</p>
                      <p className="text-xs text-[#8a96b8] mt-0.5">{formatDate(a.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <AdminBadge tone={scheduled ? 'gold' : a.publie ? 'success' : 'neutral'}>
                        {scheduled ? 'Programmé' : a.publie ? 'Publié' : 'Brouillon'}
                      </AdminBadge>
                      <Link href={`/admin/articles/${a.id}`} className="text-xs font-semibold text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">Éditer</Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <AdminEmptyState>Aucun article pour l&apos;instant.</AdminEmptyState>
          )}
        </AdminCard>

        <AdminCard>
          <AdminCardTitle>Accès rapide</AdminCardTitle>
          <ul className="space-y-1">
            {quickLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <span className="w-7 h-7 rounded-full bg-[rgba(232,213,163,0.08)] flex items-center justify-center text-xs text-[#e8d5a3] flex-shrink-0">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
