import Image from 'next/image';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function StadeSection() {
  return (
    <section className="bg-[#0d1429] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Infos */}
          <ScrollReveal>
            <SectionEyebrow label="Notre terrain" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2] mb-6">
              Stade Marie Houdré
            </h2>
            <p className="text-[#8a96b8] mb-8 leading-relaxed">
              Tous nos entraînements et matchs à domicile se déroulent au stade Marie Houdré,
              au cœur de Mérignac. Une infrastructure adaptée au développement des jeunes joueurs.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                { label: 'Adresse', value: '2 rue Maréchal Foch, 33700 Mérignac' },
                { label: 'Accès', value: 'Bus Tbm ligne 38 — Arrêt Maréchal Foch' },
                { label: 'Parking', value: 'Parking gratuit à proximité' },
              ].map(({ label, value }) => (
                <li key={label} className="flex gap-3">
                  <span className="h-px w-4 bg-[#7a1f3d] mt-3 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#e8d5a3]">{label}</span>
                    <p className="text-sm text-[#8a96b8] mt-0.5">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="https://maps.google.com/?q=Stade+Marie+Houdré,+2+rue+Maréchal+Foch,+33700+Mérignac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8d5a3] border border-[rgba(232,213,163,0.3)] hover:border-[#e8d5a3] hover:bg-[rgba(232,213,163,0.08)] px-5 py-2.5 rounded transition-all"
            >
              Voir sur Google Maps →
            </a>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal delay={0.2}>
            <div className="relative rounded-[10px] overflow-hidden aspect-[4/3] border border-[rgba(232,213,163,0.1)]">
              <Image
                src="https://jem-foot.fr/wp-content/uploads/2025/12/Stade-Marie-Houdre.jpg"
                alt="Stade Marie Houdré"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1429]/40 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
