import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    "Club de football J.E.M basé à Mérignac (33700). Catégories U7 à U13. Rejoignez-nous !",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}
