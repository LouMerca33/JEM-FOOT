import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Boutique — J.E.M Mérignac',
  description: 'Boutique officielle des Jeunes Espoirs Mérignacais — équipements et articles aux couleurs du club.',
};

const SHOP_URL = 'https://clubshop.macron.com/pau/jeunes-espoirs-merignacais/merchandising';

const articles = [
  { label: 'Maillots officiels', icon: '👕' },
  { label: 'Survêtements', icon: '🧥' },
  { label: 'Sacs de sport', icon: '🎒' },
  { label: 'Accessoires club', icon: '⚽' },
];

export default function BoutiquePage() {
  return (
    <div className="bg-[#0d1429] min-h-screen">

      {/* Hero */}
      <div className="bg-[#141d3f] py-36 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        {/* Cercle décoratif */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 border border-[rgba(232,213,163,0.06)] rounded-full pointer-events-none" />
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 h-64 border border-[rgba(232,213,163,0.04)] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Équipement officiel" />
            <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl md:text-8xl tracking-[0.04em] text-[#f8f6f2] mb-4">
              La Boutique
            </h1>
            <p className="text-[#8a96b8] text-lg max-w-xl mb-10">
              Retrouvez tous les équipements et articles aux couleurs du J.E.M sur notre boutique officielle Macron.
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-8 py-4 rounded text-sm tracking-wide transition-colors"
            >
              Accéder à la boutique →
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* Articles disponibles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Nos articles" />
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] text-[#f8f6f2] mb-12">
              Équipements du Club
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {articles.map((a, i) => (
              <ScrollReveal key={a.label} delay={i * 0.08}>
                <div className="bg-[#141d3f] border border-[rgba(232,213,163,0.08)] hover:border-[rgba(232,213,163,0.2)] rounded-[10px] p-6 text-center transition-colors">
                  <span className="text-3xl mb-3 block">{a.icon}</span>
                  <p className="text-sm font-semibold text-[#f8f6f2]">{a.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA central */}
          <ScrollReveal delay={0.2}>
            <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.1)] rounded-[10px] p-10 md:p-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e8d5a3] mb-4">
                Boutique officielle
              </p>
              <h3 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-[0.04em] text-[#f8f6f2] mb-3">
                Macron Club Shop
              </h3>
              <p className="text-[#8a96b8] mb-8 leading-relaxed">
                Commandez en ligne en quelques clics. Livraison à domicile ou retrait disponible.
              </p>
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-10 py-4 rounded text-sm tracking-wide transition-colors"
              >
                Voir tous les articles →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bande burgundy bas de page */}
      <section className="bg-[#7a1f3d] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[rgba(248,246,242,0.6)] mb-3">
              Une question sur votre commande ?
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl tracking-[0.04em] text-[#f8f6f2] mb-6">
              Contactez-nous directement
            </h2>
            <a
              href="mailto:secretariat.jem@gmail.com"
              className="inline-flex items-center gap-2 bg-[#f8f6f2] hover:bg-[#e8d5a3] text-[#7a1f3d] font-semibold px-8 py-3.5 rounded text-sm transition-colors"
            >
              secretariat.jem@gmail.com
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
