import HeroVideo from '@/components/home/HeroVideo';
import StatsBar from '@/components/home/StatsBar';
import NewsSection from '@/components/home/NewsSection';
import TeamsSection from '@/components/home/TeamsSection';
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
      <ValuesSection />
      <StadeSection />
      <CtaSection />
    </>
  );
}
