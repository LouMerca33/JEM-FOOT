import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Nos Équipes — J.E.M Mérignac',
  description: 'Découvrez les catégories U7 à U13 des Jeunes Espoirs Mérignacais.',
};

const teams = [
  {
    categorie: 'U7',
    tranche_age: '5-6 ans',
    coach: 'Hammadi LAMTALSI & Louÿs MERCADIER',
    horaires: 'Lundi 17h45–19h30\nMercredi 14h15–16h00',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-edited.jpeg',
    description:
      'La catégorie U7 permet aux jeunes Mérignacais de découvrir le football dans un cadre ludique et sécurisant. Les séances sont axées sur la motricité, la découverte du ballon et le plaisir de jouer. Chaque enfant progresse à son rythme dans une ambiance positive.',
  },
  {
    categorie: 'U8',
    tranche_age: '7-8 ans',
    coach: 'Kevin MINOT',
    horaires: 'Lundi 17h45–19h30\nMercredi 14h15–16h00',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U7-PRIME.jpeg',
    description:
      'À 7-8 ans, les joueurs progressent rapidement. Leurs formations se basent sur la maîtrise du ballon, les premiers gestes techniques, et le jeu en petits espaces. La catégorie U8 prépare les enfants à prendre des décisions simples tout en cultivant l\'esprit collectif et la maîtrise.',
  },
  {
    categorie: 'U9',
    tranche_age: '8-9 ans',
    coach: null,
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U8-U9.jpeg',
    description:
      'À 8 ans, les joueurs gagnent en confiance. Ils travaillent avec les bases du jeu collectif avec la balle : les premiers gestes techniques, la prise d\'informations dans leurs déplacements dans leurs balles, tout en encourageant l\'initiative, la créativité et le plaisir du jeu.',
  },
  {
    categorie: 'U10',
    tranche_age: '9-10 ans',
    coach: null,
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U10-PRIME.jpeg',
    description:
      'En U10, les jeunes joueurs de 9 à 10 ans développent leur technique en apprenant à évoluer avec la balle dans des situations de jeu réelles. Les séances sont centrées sur la maîtrise du ballon, la prise d\'informations et les déplacements réalisés. Chaque enfant dans une progression adaptée, tout en gardant le plaisir du jeu au cœur du développement.',
  },
  {
    categorie: 'U11',
    tranche_age: '10-11 ans',
    coach: null,
    horaires: 'Mardi & Jeudi\n17h45–19h30',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/JEM-U11.jpeg',
    description:
      'Les U11 sont dans une phase clé où ils se concentrent à l\'aise au niveau du jeu de qualité du ballon, au développement du Football éducatif. Nous incitons les joueurs à s\'interroger sur leurs actions à l\'essai et dans les attentes fondamentales de notre jeunesse ainsi que l\'appui et l\'esprit d\'équipe.',
  },
  {
    categorie: 'U12',
    tranche_age: '11-12 ans',
    coach: 'Yassine BOUASSRIA',
    horaires: 'Lundi 18h00–19h30\nMercredi 16h00–18h00',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-MATCH-11.jpeg',
    description:
      'Les U12 jouent dans une phase où on se concentre le plus sur la qualité du jeu de la construction de ses responsabilités. L\'acquisition du Football éducatif, la considération collective et la place d\'effort. Nous les préparons progressivement aux exigences du football à 11 et aux premiers enjeux de compétition.',
  },
  {
    categorie: 'U13',
    tranche_age: '12-13 ans',
    coach: 'Yassine BOUASSRIA',
    horaires: 'Lundi 18h00–19h30\nMercredi 16h00–18h00',
    image: 'https://jem-foot.fr/wp-content/uploads/2025/12/U13-12-12.jpeg',
    description:
      'En U13, les joueurs gagnent en maturité et perfectionnent leur jeu à 11 grâce à des séances centrées sur la phase éducative élémentaire, la considération collective et la place d\'effort. Vous les préparons progressivement aux exigences du football à 11, tout en conservant et appui le plaisir et l\'effort.',
  },
];

export default function NosEquipesPage() {
  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Catégories" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">
            Nos Équipes
          </h1>
        </div>
      </div>

      {/* Teams */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {teams.map((team, i) => (
          <ScrollReveal key={team.categorie} delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Info */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d5a3] mb-2">{team.tranche_age}</p>
                <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl tracking-[0.04em] text-[#f8f6f2] mb-4">
                  {team.categorie}
                </h2>
                <p className="text-[#8a96b8] mb-6 leading-relaxed">{team.description}</p>
                <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-4 mb-6 space-y-3">
                  {team.coach && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-1">Coach</p>
                      <p className="text-sm text-[#f8f6f2]">{team.coach}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d5a3] mb-1">Créneaux</p>
                    <p className="text-sm text-[#f8f6f2] whitespace-pre-line">{team.horaires}</p>
                  </div>
                </div>
                <Link
                  href="/nous-contacter"
                  className="inline-flex items-center gap-2 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-6 py-3 rounded text-sm transition-colors"
                >
                  Inscrire mon enfant →
                </Link>
              </div>

              {/* Image */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden border border-[rgba(232,213,163,0.08)]">
                  <Image
                    src={team.image}
                    alt={`Équipe ${team.categorie} J.E.M`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
