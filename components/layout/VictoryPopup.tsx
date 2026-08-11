'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const Fireworks = dynamic(() => import('./Fireworks'), { ssr: false });

interface Props {
  latest: {
    id: string;
    equipe: string;
    adversaire: string;
    score_jem: number;
    score_adversaire: number;
  } | null;
}

const STORAGE_KEY = 'jem_last_seen_victoire';

export default function VictoryPopup({ latest }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Lu après montage uniquement : localStorage n'existe pas côté serveur,
  // et lire dans l'initialiseur de useState créerait un mismatch
  // d'hydratation (le serveur ne peut jamais savoir ce que le visiteur a
  // déjà vu).
  useEffect(() => {
    if (!latest || pathname?.startsWith('/admin')) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronise avec localStorage, un système externe, après le montage client uniquement.
    if (localStorage.getItem(STORAGE_KEY) !== latest.id) setVisible(true);
  }, [latest, pathname]);

  if (!latest || !visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, latest.id);
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Fireworks />
      <div
        className="absolute inset-0 bg-[#0d1429]/80 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-sm w-full bg-gradient-to-b from-[#1e2c56] to-[#141d3f] border border-[rgba(232,213,163,0.3)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-center animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <p className="text-5xl mb-3">🎉</p>
        <p className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.06em] text-[#e8d5a3] mb-2">
          VICTOIRE !
        </p>
        <p className="text-sm font-bold uppercase tracking-widest text-[#8a96b8] mb-4">{latest.equipe}</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="font-[family-name:var(--font-bebas)] text-4xl text-[#f8f6f2]">{latest.score_jem}</span>
          <span className="text-[#8a96b8] text-sm">–</span>
          <span className="font-[family-name:var(--font-bebas)] text-4xl text-[#8a96b8]">{latest.score_adversaire}</span>
        </div>
        <p className="text-xs text-[#8a96b8] mb-6">contre {latest.adversaire}</p>
        <button
          onClick={dismiss}
          className="bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-6 py-2.5 rounded-lg text-sm shadow-[0_2px_10px_rgba(122,31,61,0.4)] transition-colors"
        >
          Bravo les jeunes !
        </button>
      </div>
    </div>
  );
}
