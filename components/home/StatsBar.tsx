import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { value: '120+', label: 'Licenciés cette saison' },
  { value: 'U7–U13', label: 'Toutes catégories' },
  { value: '2022', label: 'Fondation du club' },
  { value: '15+', label: 'Éducateurs formés FFF' },
];

export default function StatsBar() {
  return (
    <section className="bg-[#7a1f3d] py-10 relative overflow-hidden">
      {/* Jersey stripe overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 32px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.value} delay={i * 0.08}>
              <p className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-[0.06em] text-[#f8f6f2]">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="text-sm text-[rgba(232,213,163,0.8)] mt-1 font-medium">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
