import Image from 'next/image';
import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Boutique — J.E.M Mérignac',
  description: 'Boutique officielle des Jeunes Espoirs Mérignacais.',
};

const produits = [
  {
    nom: 'Sac J.E.M',
    image: 'https://jem-foot.fr/wp-content/uploads/2026/01/sac-jem.jpg',
    alt: 'Sac officiel J.E.M',
  },
  {
    nom: 'Maillot J.E.M',
    image: 'https://jem-foot.fr/wp-content/uploads/2026/01/maillot-jem.jpg',
    alt: 'Maillot officiel J.E.M',
  },
];

function ProductCard({ nom, image, alt }: { nom: string; image: string; alt: string }) {
  return (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] overflow-hidden">
      <div className="relative aspect-square bg-[#141d3f]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain p-4"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.04em] text-[#f8f6f2]">
          {nom}
        </h3>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Équipement officiel" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">
            La Boutique
          </h1>
        </div>
      </div>

      {/* Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <SectionEyebrow label="Présentation" />
              <p className="text-[#8a96b8] leading-relaxed text-lg mt-4">
                Découvrez la boutique officielle du Jeunes Espoirs Mérignacais, dédiée aux licenciés, aux familles et aux supporters du club. Cette boutique permet de retrouver les équipements et articles aux couleurs du J.E.M, conçus pour accompagner les joueurs au quotidien et afficher fièrement l&apos;identité du club.
              </p>
              <div className="mt-8">
                <a
                  href="#boutique"
                  className="inline-flex items-center gap-2 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-8 py-4 rounded text-sm transition-colors"
                >
                  Accéder à la boutique →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Produits */}
      <section className="pb-16" id="boutique">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionEyebrow label="Nos articles" />
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-10">
              Équipements du Club
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
            {produits.map((p, i) => (
              <ScrollReveal key={p.nom} delay={i * 0.1}>
                <ProductCard {...p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA – fond burgundy */}
      <section className="bg-[#7a1f3d] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-4">
              {/* Logo JEM */}
              <div className="w-20 h-20 rounded-full bg-[rgba(248,246,242,0.1)] border border-[rgba(248,246,242,0.2)] flex items-center justify-center mb-2">
                <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.04em] text-[#f8f6f2]">
                  JEM
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[rgba(248,246,242,0.7)]">
                Official Club Shop
              </p>
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-[0.04em] text-[#f8f6f2]">
                Jeunes Espoirs Mérignacais
              </h2>
              <p className="text-[rgba(248,246,242,0.75)] max-w-sm leading-relaxed">
                Pour toute question concernant les commandes, contactez-nous directement.
              </p>
              <a
                href="mailto:secretariat.jem@gmail.com"
                className="mt-2 inline-flex items-center gap-2 bg-[#f8f6f2] hover:bg-[#e8d5a3] text-[#7a1f3d] font-semibold px-8 py-4 rounded text-sm transition-colors"
              >
                Nous contacter →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
