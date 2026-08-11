'use client';

// Flash d'impact façon "BOOM" comics, avant que la carte victoire ne se
// stabilise — inspiré du rythme d'une animation de gain type appli de paris
// (texte géant qui claque + éclat d'étincelles), transposé en version foot :
// pas d'argent, un ballon qui rentre au fond des filets.
export default function ImpactBurst() {
  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center overflow-hidden pointer-events-none animate-[burstFadeOut_0.9s_ease-in_forwards]">
      <div className="absolute inset-0 bg-[#7a1f3d] animate-[burstBgFlash_0.9s_ease-out_forwards]" />

      {/* Texte "BUUUT !" géant répété, façon texture comic */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rotate-[-8deg] opacity-90">
        {['BUUUT', 'BUUUT', 'BUUUT'].map((t, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-bebas)] text-[18vw] leading-[0.85] text-[#f8f6f2]/10 tracking-tight whitespace-nowrap select-none"
          >
            {t} {t}
          </span>
        ))}
      </div>

      {/* Ballon + impact étincelant */}
      <div className="relative animate-[ballImpact_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
        <span className="text-8xl block drop-shadow-[0_0_30px_rgba(232,213,163,0.6)]">⚽</span>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#e8d5a3] animate-[sparkOut_0.5s_ease-out_0.15s_both]"
            style={{ '--deg': `${deg}deg` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
