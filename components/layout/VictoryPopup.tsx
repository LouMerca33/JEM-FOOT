'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import ScoreCountUp from './ScoreCountUp';

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
        className="absolute inset-0 bg-[#0d1429]/85 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Lueur dorée pulsante derrière la carte */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none animate-[glowPulse_2.2s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, rgba(232,213,163,0.35) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-sm w-full bg-gradient-to-b from-[#1e2c56] to-[#141d3f] border border-[rgba(232,213,163,0.35)] rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] p-8 text-center overflow-hidden animate-[popIn_0.55s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        {/* Balayage brillant */}
        <div
          className="absolute inset-0 pointer-events-none animate-[shineSweep_1.4s_ease-out_0.4s_both]"
          style={{ background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)' }}
          aria-hidden="true"
        />

        <p className="relative text-5xl mb-3 animate-[bounceIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.15s_both]">🎉</p>

        <p className="relative font-[family-name:var(--font-bebas)] text-5xl tracking-[0.06em] text-[#e8d5a3] mb-2 [text-shadow:0_0_24px_rgba(232,213,163,0.5)] animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.3s_both]">
          VICTOIRE !
        </p>
        <p className="relative text-sm font-bold uppercase tracking-widest text-[#8a96b8] mb-4 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.45s_forwards]">
          {latest.equipe}
        </p>
        <div className="relative flex items-center justify-center gap-4 mb-6 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.55s_forwards]">
          <span className="font-[family-name:var(--font-bebas)] text-5xl text-[#f8f6f2] tabular-nums">
            <ScoreCountUp value={latest.score_jem} delay={650} />
          </span>
          <span className="text-[#8a96b8] text-sm">–</span>
          <span className="font-[family-name:var(--font-bebas)] text-5xl text-[#8a96b8] tabular-nums">
            <ScoreCountUp value={latest.score_adversaire} delay={650} />
          </span>
        </div>
        <p className="relative text-xs text-[#8a96b8] mb-6 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.65s_forwards]">
          contre {latest.adversaire}
        </p>
        <button
          onClick={dismiss}
          className="relative bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-6 py-2.5 rounded-lg text-sm shadow-[0_2px_10px_rgba(122,31,61,0.4)] transition-colors opacity-0 animate-[fadeInUp_0.5s_ease-out_0.8s_forwards]"
        >
          Bravo les jeunes !
        </button>
      </div>
    </div>
  );
}
