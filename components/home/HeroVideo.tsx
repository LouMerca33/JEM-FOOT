'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { SAISON_LABEL } from '@/lib/season';

interface Props {
  tagline: string;
}

export default function HeroVideo({ tagline }: Props) {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden py-28">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/video/hero-jem.mp4" type="video/mp4" />
      </video>

      {/* Navy overlay gradient — plus marqué en haut/bas pour la lisibilité du texte et de la nav */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1429]/85 via-[#0d1429]/45 to-[#0d1429]/95" />

      {/* Vignette radiale pour concentrer l'œil sur le centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(13,20,41,0.55) 100%)',
        }}
      />

      {/* Rayures gazon */}
      <div className="absolute inset-0 pitch-bg" />

      {/* Burgundy diagonal chevron */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 45%, #7a1f3d 45%, #7a1f3d 55%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Saison badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[rgba(122,31,61,0.75)] backdrop-blur-sm border border-[rgba(232,213,163,0.25)] rounded-full px-4 py-1.5 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#e8d5a3] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3]">
            Saison {SAISON_LABEL}
          </span>
        </motion.div>

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-[#e8d5a3] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
        >
          <Image
            src="https://res.cloudinary.com/drwj4qlnu/image/upload/v1781614003/jem-foot/logo/jem.png"
            alt="Logo J.E.M"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            unoptimized
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl md:text-9xl tracking-[0.06em] leading-none text-[#f8f6f2] mb-2 [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]"
        >
          Jeunes Espoirs
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl tracking-[0.12em] text-[#e8d5a3] mb-8 [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]"
        >
          Mérignacais
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg text-[#c3cbe0] mb-10 max-w-xl mx-auto"
        >
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/nous-contacter"
            className="bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-8 py-3.5 rounded text-sm tracking-wide shadow-[0_4px_16px_rgba(122,31,61,0.4)] hover:shadow-[0_4px_20px_rgba(122,31,61,0.55)] transition-all"
          >
            Rejoindre le club
          </Link>
          <Link
            href="/nos-equipes"
            className="border border-[rgba(232,213,163,0.4)] hover:border-[#e8d5a3] text-[#e8d5a3] hover:bg-[rgba(232,213,163,0.08)] font-semibold px-8 py-3.5 rounded text-sm tracking-wide transition-all"
          >
            Nos équipes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
