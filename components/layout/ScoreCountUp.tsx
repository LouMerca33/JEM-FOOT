'use client';

import { useEffect, useState } from 'react';

// Défile de 0 jusqu'à la valeur finale, une seule fois au montage —
// contrairement à AnimatedCounter (basé sur le scroll), ce popup est déjà
// visible dès son apparition, donc pas besoin d'IntersectionObserver.
export default function ScoreCountUp({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 900;
    let raf: number;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
        setDisplay(Math.round(eased * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return <>{display}</>;
}
