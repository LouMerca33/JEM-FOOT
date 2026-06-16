import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card3D from '@/components/ui/Card3D';

const values = [
  { num: '01', title: 'Respect', desc: 'La base de notre projet éducatif' },
  { num: '02', title: 'Plaisir', desc: 'Jouer pour apprendre' },
  { num: '03', title: 'Engagement', desc: 'Se dépasser ensemble' },
  { num: '04', title: 'Collectif', desc: "L'équipe avant tout" },
];

export default function ValuesSection() {
  return (
    <section className="bg-[#141d3f] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow label="Nos valeurs" />
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2] mb-14">
            Ce Qui Nous Définit
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.num} delay={i * 0.1}>
              <Card3D intensity={8}>
                <div className="group bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.22)] rounded-[10px] p-6 transition-colors duration-300 relative overflow-hidden">
                  {/* Arc de coin de terrain — déco football */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 border-2 border-[rgba(232,213,163,0.07)] rounded-full group-hover:border-[rgba(232,213,163,0.18)] transition-colors duration-300" />
                  <span className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.06em] text-[rgba(232,213,163,0.12)] group-hover:text-[rgba(232,213,163,0.24)] transition-colors duration-300">
                    {v.num}
                  </span>
                  <h3 className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.06em] text-[#f8f6f2] mt-2 mb-2">
                    {v.title}
                  </h3>
                  {/* Ligne dorée qui s'étend au hover */}
                  <div className="h-px bg-[#e8d5a3] w-0 group-hover:w-8 transition-all duration-300 mb-3" />
                  <p className="text-sm text-[#8a96b8]">{v.desc}</p>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
