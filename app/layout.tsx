import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewArticleToast from "@/components/layout/NewArticleToast";
import VictoryPopup from "@/components/layout/VictoryPopup";
import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";
import { articleVisibleWhere } from "@/lib/article-visibility";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeunes Espoirs Mérignacais — Club de Football",
  description:
    "Club de football J.E.M basé à Mérignac (33700). Catégories U7 à U14. Rejoignez-nous !",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let latest: { slug: string; titre: string } | null = null;
  try {
    const [found] = await db
      .select({ slug: schema.articles.slug, titre: schema.articles.titre })
      .from(schema.articles)
      .where(articleVisibleWhere)
      .orderBy(desc(schema.articles.created_at))
      .limit(1);
    latest = found ?? null;
  } catch {
    // Table absente ou DB inaccessible : pas de toast, on n'affiche rien.
  }

  let latestVictoire: {
    id: string;
    equipe: string;
    adversaire: string;
    score_jem: number;
    score_adversaire: number;
  } | null = null;
  try {
    const recentResultats = await db
      .select()
      .from(schema.resultats)
      .orderBy(desc(schema.resultats.date_match))
      .limit(5);
    const win = recentResultats.find(
      (r) => r.score_jem !== null && r.score_adversaire !== null && r.score_jem > r.score_adversaire
    );
    if (win) {
      latestVictoire = {
        id: win.id,
        equipe: win.equipe,
        adversaire: win.adversaire,
        score_jem: win.score_jem!,
        score_adversaire: win.score_adversaire!,
      };
    }
  } catch {
    // Table absente ou DB inaccessible : pas de popup.
  }

  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${barlow.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#0d1429] text-[#f8f6f2] font-[family-name:var(--font-barlow)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewArticleToast latest={latest} />
        <VictoryPopup latest={latestVictoire} />
      </body>
    </html>
  );
}
