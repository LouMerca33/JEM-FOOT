import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SAISON_LABEL } from '@/lib/season';

export default function CtaSection() {
  return (
    <section className="bg-[#7a1f3d] py-20 relative overflow-hidden">
      {/* Decorative diagonal */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(232,213,163,0.3) 40%, rgba(232,213,163,0.3) 60%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[rgba(232,213,163,0.8)] mb-4">
            Saison {SAISON_LABEL}
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl tracking-[0.04em] text-[#f8f6f2] mb-6">
            Rejoignez l&apos;Aventure JEM
          </h2>
          <p className="text-[rgba(248,246,242,0.8)] mb-10 text-lg max-w-xl mx-auto">
            Votre enfant a entre 5 et 13 ans ? Rejoignez les Jeunes Espoirs Mérignacais
            et découvrez le football dans la bonne humeur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nous-contacter"
              className="bg-[#f8f6f2] hover:bg-[#f2e8c6] text-[#7a1f3d] font-semibold px-8 py-4 rounded text-sm tracking-wide transition-colors"
            >
              S&apos;inscrire maintenant
            </Link>
            <Link
              href="/le-club"
              className="border border-[rgba(248,246,242,0.4)] hover:border-[#f8f6f2] text-[#f8f6f2] hover:bg-[rgba(248,246,242,0.1)] font-semibold px-8 py-4 rounded text-sm tracking-wide transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
