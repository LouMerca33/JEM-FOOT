'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/articles', label: 'Articles', icon: '✎' },
  { href: '/admin/galerie', label: 'Galerie', icon: '⊡' },
  { href: '/admin/equipes', label: 'Équipes', icon: '⊛' },
  { href: '/admin/educateurs', label: 'Éducateurs', icon: '⊙' },
  { href: '/admin/partenaires', label: 'Partenaires', icon: '⊕' },
  { href: '/admin/sondages', label: 'Sondages', icon: '◈' },
  { href: '/admin/temoignages', label: 'Témoignages', icon: '❝' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-[#141d3f] border-r border-[rgba(232,213,163,0.08)] flex flex-col min-h-screen sticky top-0">
      <div className="p-6 border-b border-[rgba(232,213,163,0.08)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#e8d5a3] flex items-center justify-center">
            <span className="font-[family-name:var(--font-bebas)] text-sm tracking-[0.08em] text-[#e8d5a3]">JEM</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8a96b8]">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                    active
                      ? 'bg-[rgba(122,31,61,0.3)] text-[#f8f6f2] border border-[rgba(122,31,61,0.4)]'
                      : 'text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <span className="text-base">{icon}</span>{label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[rgba(232,213,163,0.08)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
        >
          <span>⊗</span>Déconnexion
        </button>
        <Link href="/" className="mt-1 w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#8a96b8] hover:text-[#e8d5a3] transition-colors">
          <span>↗</span>Voir le site
        </Link>
      </div>
    </aside>
  );
}
