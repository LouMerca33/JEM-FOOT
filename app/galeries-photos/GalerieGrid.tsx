'use client';

import { useState } from 'react';

const categories = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'ÉVÉNEMENTS'] as const;
type Categorie = (typeof categories)[number];

const driveLinks: Record<Categorie, string> = {
  U7:         'https://drive.google.com/drive/folders/1i4S8vM6mZCQBTrG3Z66Ye7x00i9Q2H8x',
  U8:         'https://drive.google.com/drive/folders/1gFO1-mKJFb4ILLi17fyoU-nXHj611-uw',
  U9:         'https://drive.google.com/drive/folders/1s5vyLeyztYFMmi96f70EerT9anJLlw4w',
  U10:        'https://drive.google.com/drive/folders/1etbvLqXq5E106Tohow9vY4P_OVfNeBqg',
  U11:        'https://drive.google.com/drive/folders/1IgZFyFLXDLHDflSfoD2vle2JPxBabCbi',
  U12:        'https://drive.google.com/drive/folders/1orhrWgy9PcxCdwzwQf_Z7ZykDOV7nPsv',
  U13:        'https://drive.google.com/drive/folders/1dXCgFLxxmxaCguedddPNgyCGE9QsXg_b',
  ÉVÉNEMENTS: 'https://drive.google.com/drive/folders/1rNQ7sPjD1Bs74sGvQClVtoC_vy-jyhjk',
};

export default function GalerieGrid() {
  const [open, setOpen] = useState<Categorie | null>(null);

  function toggle(cat: Categorie) {
    setOpen((prev) => (prev === cat ? null : cat));
  }

  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const isOpen = open === cat;
        return (
          <div
            key={cat}
            className="border border-[rgba(232,213,163,0.1)] rounded-[10px] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 bg-[#141d3f] hover:bg-[#1e2c56] transition-colors text-left"
              onClick={() => toggle(cat)}
              aria-expanded={isOpen}
            >
              <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.04em] text-[#f8f6f2]">
                {cat}
              </span>
              <span
                className="text-[#e8d5a3] text-xl transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="bg-[#0d1429] px-6 py-6">
                <p className="text-sm text-[#8a96b8] mb-4">
                  Retrouvez toutes les photos de la catégorie {cat} sur Google Drive.
                </p>
                <a
                  href={driveLinks[cat]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-6 py-3 rounded text-sm transition-colors"
                >
                  Voir les photos (Google Drive) →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
