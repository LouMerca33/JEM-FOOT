'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/le-club', label: 'Le Club' },
  { href: '/actualite', label: 'Actualités' },
  { href: '/nos-equipes', label: 'Nos Équipes' },
  { href: '/calendrier-et-resultat', label: 'Calendrier' },
  { href: '/galeries-photos', label: 'Galerie' },
  { href: '/nos-partenaires', label: 'Partenaires' },
  { href: '/nous-contacter', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1429]/95 backdrop-blur-md border-b border-[rgba(232,213,163,0.1)] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border-2 border-[#e8d5a3] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/drwj4qlnu/image/upload/v1781614003/jem-foot/logo/jem.png"
              alt="Logo JEM"
              width={40}
              height={40}
              className="object-cover"
              unoptimized
            />
          </div>
          <span
            className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.08em] text-[#f8f6f2] group-hover:text-[#e8d5a3] transition-colors"
          >
            J.E.M
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded ${
                    active
                      ? 'text-[#e8d5a3]'
                      : 'text-[#8a96b8] hover:text-[#f8f6f2]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/boutique"
            className="text-sm font-semibold text-[#e8d5a3] border border-[rgba(232,213,163,0.3)] hover:border-[#e8d5a3] hover:bg-[rgba(232,213,163,0.08)] px-4 py-2 rounded transition-all"
          >
            Boutique
          </Link>
          <Link
            href="/nous-contacter"
            className="text-sm font-semibold bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] px-4 py-2 rounded transition-colors"
          >
            Rejoindre le club
          </Link>
        </div>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-[#f8f6f2]"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0d1429]/98 border-t border-[rgba(232,213,163,0.1)]">
          <ul className="px-4 py-4 space-y-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#8a96b8] hover:text-[#f8f6f2] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-[rgba(232,213,163,0.1)]">
              <Link
                href="/nous-contacter"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-sm font-semibold bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] px-4 py-2.5 rounded transition-colors"
              >
                Rejoindre le club
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
