'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/accueil', label: 'Accueil', icon: '⌂' },
  { href: '/admin/articles', label: 'Articles', icon: '✎' },
  { href: '/admin/galerie', label: 'Galerie', icon: '⊡' },
  { href: '/admin/equipes', label: 'Équipes', icon: '⊛' },
  { href: '/admin/resultats', label: 'Résultats', icon: '⚽' },
  { href: '/admin/educateurs', label: 'Éducateurs', icon: '⊙' },
  { href: '/admin/partenaires', label: 'Partenaires', icon: '⊕' },
  { href: '/admin/sondages', label: 'Sondages', icon: '◈' },
  { href: '/admin/temoignages', label: 'Témoignages', icon: '❝' },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-1">
      {navItems.map(({ href, label, icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-[rgba(122,31,61,0.25)] text-[#f8f6f2]'
                  : 'text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#e8d5a3]" />}
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                  active ? 'bg-[rgba(232,213,163,0.18)] text-[#e8d5a3]' : 'bg-[rgba(255,255,255,0.04)] text-[#8a96b8]'
                }`}
              >
                {icon}
              </span>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      {/* Barre mobile (< md) */}
      <div className="md:hidden sticky top-0 z-40 bg-[#141d3f] border-b border-[rgba(232,213,163,0.08)] flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#e8d5a3] flex items-center justify-center flex-shrink-0">
            <span className="font-[family-name:var(--font-bebas)] text-sm tracking-[0.08em] text-[#e8d5a3]">JEM</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8a96b8]">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 text-[#f8f6f2]"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Panneau mobile déroulant */}
      {mobileOpen && (
        <div className="md:hidden sticky top-[57px] z-30 bg-[#141d3f] border-b border-[rgba(232,213,163,0.08)] px-4 py-4 max-h-[70vh] overflow-y-auto">
          <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          <div className="mt-4 pt-4 border-t border-[rgba(232,213,163,0.08)] space-y-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <span>⊗</span>Déconnexion
            </button>
            <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#8a96b8] hover:text-[#e8d5a3] transition-colors">
              <span>↗</span>Voir le site
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar fixe (>= md) */}
      <aside className="hidden md:flex w-60 flex-shrink-0 bg-[#141d3f] border-r border-[rgba(232,213,163,0.08)] flex-col min-h-screen sticky top-0 shadow-[4px_0_20px_rgba(0,0,0,0.15)]">
        <div className="p-6 border-b border-[rgba(232,213,163,0.08)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#e8d5a3] flex items-center justify-center flex-shrink-0">
              <span className="font-[family-name:var(--font-bebas)] text-sm tracking-[0.08em] text-[#e8d5a3]">JEM</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8a96b8]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="p-4 border-t border-[rgba(232,213,163,0.08)] space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <span className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-xs flex-shrink-0">⊗</span>
            Déconnexion
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8a96b8] hover:text-[#e8d5a3] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            <span className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-xs flex-shrink-0">↗</span>
            Voir le site
          </Link>
        </div>
      </aside>
    </>
  );
}
