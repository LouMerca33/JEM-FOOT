import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import GalerieGrid from './GalerieGrid';

export const metadata: Metadata = {
  title: 'Galerie Photos — J.E.M Mérignac',
  description: 'Galerie photos des matchs, entraînements et événements du J.E.M.',
};

export default function GaleriePage() {
  return (
    <div className="bg-[#0d1429] min-h-screen">
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Souvenirs" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">
            Galerie Photos
          </h1>
          <p className="mt-4 text-[#8a96b8] max-w-xl">
            Retrouvez les photos de chaque catégorie. Sélectionnez une catégorie pour accéder à l&apos;album complet sur Google Drive.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GalerieGrid />
      </div>
    </div>
  );
}
