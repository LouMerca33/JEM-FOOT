'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { SAISON_LABEL } from '@/lib/season';

export default function HeroVideo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      >
        <source src="/video/hero-jem.mp4" type="video/mp4" />
      </video>

      {/* Navy overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1429]/60 via-[#0d1429]/40 to-[#0d1429]" />

      {/* Rayures gazon */}
      <div className="absolute inset-0 pitch-bg" />

      {/* Burgundy diagonal chevron */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
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
          className="inline-flex items-center gap-2 bg-[rgba(122,31,61,0.7)] border border-[rgba(122,31,61,0.5)] rounded-full px-4 py-1.5 mb-8"
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
          className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-[#e8d5a3] overflow-hidden"
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
          className="font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl md:text-9xl tracking-[0.06em] leading-none text-[#f8f6f2] mb-2"
        >
          Jeunes Espoirs
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl tracking-[0.12em] text-[#e8d5a3] mb-8"
        >
          Mérignacais
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg text-[#8a96b8] mb-10 max-w-xl mx-auto"
        >
          Respect · Plaisir · Engagement · Collectif
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
            className="bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-8 py-3.5 rounded text-sm tracking-wide transition-colors"
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-[#8a96b8]">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8a96b8] to-transparent animate-pulse" />
      </motion.div>

      {/* Season badge bottom-right */}
      <div className="absolute bottom-8 right-6 hidden sm:block">
        <div className="bg-[rgba(14,20,41,0.7)] border border-[rgba(232,213,163,0.15)] rounded px-3 py-2 text-center">
          <p className="text-xs text-[#8a96b8] uppercase tracking-widest">Saison en cours</p>
          <p className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.06em] text-[#e8d5a3]">{SAISON_LABEL}</p>
        </div>
      </div>
    </section>
  );
}
