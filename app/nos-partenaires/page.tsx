import { db, schema } from '@/lib/db';
import { eq, asc } from 'drizzle-orm';
import type { Partenaire } from '@/lib/types';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Nos Partenaires — J.E.M Mérignac',
  description: 'Les partenaires qui soutiennent les Jeunes Espoirs Mérignacais.',
};

const fallback: Partenaire[] = [
  { id: '1', nom: 'MercadierLab', logo_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613984/jem-foot/partenaires/MercadierLab-LOGO.png', site_url: null, niveau: 'gold', ordre: 1, actif: true },
  { id: '2', nom: 'JSA CPA', logo_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613998/jem-foot/partenaires/JSA-CPA.png', site_url: null, niveau: 'standard', ordre: 2, actif: true },
  { id: '3', nom: 'SPUC', logo_url: 'https://res.cloudinary.com/drwj4qlnu/image/upload/v1781613999/jem-foot/partenaires/SPUC.png', site_url: null, niveau: 'standard', ordre: 3, actif: true },
];

export default async function PartenairesPage() {
  let partenaires: Partenaire[] = [];
  try {
    partenaires = await db.select().from(schema.partenaires)
      .where(eq(schema.partenaires.actif, true))
      .orderBy(asc(schema.partenaires.ordre));
  } catch {}

  const list = partenaires.length > 0 ? partenaires : fallback;
  const gold = list.filter((p) => p.niveau === 'gold');
  const standard = list.filter((p) => p.niveau === 'standard');

  return (
    <div className="bg-[#0d1429] min-h-screen">
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Ils nous soutiennent" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">Nos Partenaires</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {gold.length > 0 && (
          <section className="mb-16">
            <ScrollReveal><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-8">Partenaires Gold</p></ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gold.map((p, i) => <ScrollReveal key={p.id} delay={i * 0.1}><PartenaireCard partenaire={p} large /></ScrollReveal>)}
            </div>
          </section>
        )}
        {standard.length > 0 && (
          <section className="mb-16">
            <ScrollReveal><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a96b8] mb-8">Partenaires</p></ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {standard.map((p, i) => <ScrollReveal key={p.id} delay={i * 0.08}><PartenaireCard partenaire={p} /></ScrollReveal>)}
            </div>
          </section>
        )}
        <ScrollReveal>
          <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.1)] rounded-[10px] p-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-3">Rejoignez-nous</p>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl tracking-[0.04em] text-[#f8f6f2] mb-4">Devenir Partenaire du J.E.M</h2>
            <p className="text-[#8a96b8] max-w-xl mx-auto mb-8">Soutenez le développement du football jeunesse à Mérignac. Logo sur notre site, visibilité sur les réseaux sociaux et présence lors des événements.</p>
            <Link href="/nous-contacter" className="inline-flex items-center gap-2 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-8 py-4 rounded text-sm transition-colors">
              Nous contacter →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function PartenaireCard({ partenaire, large }: { partenaire: Partenaire; large?: boolean }) {
  const card = (
    <div className={`bg-[#1e2c56] border ${large ? 'border-[rgba(232,213,163,0.15)]' : 'border-[rgba(232,213,163,0.08)]'} rounded-[10px] p-6 flex items-center justify-center hover:border-[rgba(232,213,163,0.3)] hover:-translate-y-1 transition-all ${large ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
      {partenaire.logo_url ? (
        <Image src={partenaire.logo_url} alt={partenaire.nom} width={large ? 180 : 120} height={large ? 90 : 60} className="object-contain max-h-full" unoptimized />
      ) : (
        <span className="font-[family-name:var(--font-bebas)] text-2xl text-[#8a96b8]">{partenaire.nom}</span>
      )}
    </div>
  );
  if (partenaire.site_url) return <a href={partenaire.site_url} target="_blank" rel="noopener noreferrer">{card}</a>;
  return card;
}
