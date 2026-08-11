'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
  latest: { slug: string; titre: string } | null;
}

const STORAGE_KEY = 'jem_last_seen_article';

export default function NewArticleToast({ latest }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!latest || pathname?.startsWith('/admin')) return;
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (lastSeen === latest.slug) return;

    // Petit délai pour ne pas surgir instantanément à l'arrivée sur la page.
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, [latest, pathname]);

  if (!latest || !visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, latest.slug);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-[fadeInUp_0.4s_ease-out]">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.25)] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] p-4 flex gap-3">
        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[rgba(122,31,61,0.4)] border border-[rgba(232,213,163,0.2)] flex items-center justify-center text-[#e8d5a3] text-sm">
          📰
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Nouvel article</p>
          <p className="text-sm text-[#f8f6f2] leading-snug line-clamp-2 mb-2">{latest.titre}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/actualite/${latest.slug}`}
              onClick={dismiss}
              className="text-xs font-semibold text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors"
            >
              Lire →
            </Link>
            <button onClick={dismiss} className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] transition-colors">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
