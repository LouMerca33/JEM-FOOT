import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Calendrier & Résultats — J.E.M Mérignac',
  description: 'Calendrier des matchs et résultats des Jeunes Espoirs Mérignacais, toutes catégories U7 à U13.',
};

const categories = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13'];

export default function CalendrierPage() {
  const scorencoUrl = process.env.NEXT_PUBLIC_SCORENCO_WIDGET_URL;
  const hasWidget = scorencoUrl && !scorencoUrl.includes('XXXXXX');

  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        {/* Demi-cercle central de terrain */}
        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-64 h-64 border border-[rgba(232,213,163,0.06)] rounded-full pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Compétitions" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl md:text-8xl tracking-[0.04em] text-[#f8f6f2] mb-4">
            Calendrier & Résultats
          </h1>
          <p className="text-[#8a96b8] max-w-xl">
            Retrouvez les matchs à venir et les résultats de toutes nos équipes, de la U7 à la U13, via notre partenaire Scorenco.
          </p>
          {/* Pills catégories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(cat => (
              <span
                key={cat}
                className="font-[family-name:var(--font-bebas)] text-sm tracking-[0.1em] px-3 py-1 rounded border border-[rgba(232,213,163,0.15)] text-[#e8d5a3]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          {hasWidget ? (
            <div className="rounded-[10px] overflow-hidden border border-[rgba(232,213,163,0.1)] shadow-2xl">
              <iframe
                src={scorencoUrl}
                className="w-full bg-white"
                style={{ height: '700px' }}
                title="Widget Scorenco — Calendrier & Résultats JEM"
                loading="lazy"
                referrerPolicy="unsafe-url"
              />
            </div>
          ) : (
            <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-10 text-center">
              <p className="font-[family-name:var(--font-bebas)] text-3xl text-[#f8f6f2] mb-3">
                Widget Scorenco à configurer
              </p>
              <p className="text-[#8a96b8] max-w-md mx-auto">
                Définissez <code className="text-[#e8d5a3]">NEXT_PUBLIC_SCORENCO_WIDGET_URL</code> dans <code className="text-[#e8d5a3]">.env.local</code>.
              </p>
            </div>
          )}
        </ScrollReveal>

        {/* Lien Scorenco */}
        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-center text-xs text-[#8a96b8]">
            Données fournies par{' '}
            <a
              href="https://scorenco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors"
            >
              Score&apos;n&apos;co
            </a>
            {' '}— la plateforme officielle de gestion des compétitions.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
