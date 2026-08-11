import HeroVideo from '@/components/home/HeroVideo';
import StatsBar from '@/components/home/StatsBar';
import NewsSection from '@/components/home/NewsSection';
import TeamsSection from '@/components/home/TeamsSection';
import TemoignagesSection from '@/components/home/TemoignagesSection';
import SondageSection from '@/components/home/SondageSection';
import ValuesSection from '@/components/home/ValuesSection';
import StadeSection from '@/components/home/StadeSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <StatsBar />
      <NewsSection />
      <TeamsSection />
      <TemoignagesSection />
      <SondageSection />
      <ValuesSection />
      <StadeSection />
      <CtaSection />
    </>
  );
}
