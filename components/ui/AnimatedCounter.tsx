'use client';

import { useEffect, useRef, useState } from 'react';

function parse(raw: string): { prefix: string; num: number; suffix: string } {
  const m = raw.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
  if (!m) return { prefix: '', num: 0, suffix: raw };
  return { prefix: m[1], num: parseInt(m[2]), suffix: m[3] };
}

export default function AnimatedCounter({ value }: { value: string }) {
  const { prefix, num, suffix } = parse(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current || num === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        const duration = 1000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
          setDisplay(Math.floor(eased * num));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  if (num === 0) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
