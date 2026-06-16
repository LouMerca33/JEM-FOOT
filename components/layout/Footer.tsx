import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/le-club', label: 'Le Club' },
  { href: '/actualite', label: 'Actualités' },
  { href: '/nos-equipes', label: 'Nos Équipes' },
  { href: '/calendrier-et-resultat', label: 'Calendrier & Résultats' },
  { href: '/galeries-photos', label: 'Galerie Photos' },
  { href: '/nos-partenaires', label: 'Nos Partenaires' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/nous-contacter', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1429] border-t border-[rgba(232,213,163,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#e8d5a3] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/drwj4qlnu/image/upload/v1781614003/jem-foot/logo/jem.png"
                  alt="Logo JEM"
                  width={48}
                  height={48}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.1em] text-[#f8f6f2]">
                  J.E.M
                </p>
                <p className="text-xs text-[#8a96b8] tracking-widest uppercase">
                  Jeunes Espoirs Mérignacais
                </p>
              </div>
            </Link>
            <p className="text-sm text-[#8a96b8] leading-relaxed mb-4">
              Club de football fondé en 2022 à Mérignac. Former des joueurs, cultiver des valeurs.
            </p>
            {/* Réseaux */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100089656322113"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#1e2c56] hover:bg-[#7a1f3d] flex items-center justify-center transition-colors text-[#8a96b8] hover:text-white text-xs font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com/jeunes.espoirs.merignacais"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#1e2c56] hover:bg-[#7a1f3d] flex items-center justify-center transition-colors text-[#8a96b8] hover:text-white text-xs font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://youtube.com/@communication.jem.33700"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#1e2c56] hover:bg-[#7a1f3d] flex items-center justify-center transition-colors text-[#8a96b8] hover:text-white text-xs font-bold"
                aria-label="YouTube"
              >
                yt
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-4">
              Informations
            </h3>
            <ul className="space-y-3 text-sm text-[#8a96b8]">
              <li>
                <span className="block text-[#f8f6f2] font-medium">Adresse</span>
                Stade Marie Houdré<br />
                2 rue Maréchal Foch<br />
                33700 Mérignac
              </li>
              <li>
                <span className="block text-[#f8f6f2] font-medium">Email</span>
                <a href="mailto:secretariat.jem@gmail.com" className="hover:text-[#e8d5a3] transition-colors">
                  secretariat.jem@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-[#f8f6f2] font-medium">Saison</span>
                2025–2026
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgba(232,213,163,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a96b8]">
          <p>© 2026 Jeunes Espoirs Mérignacais. Tous droits réservés.</p>
          <p>
            Développé par{' '}
            <span className="text-[#e8d5a3]">@MercadieLab</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
