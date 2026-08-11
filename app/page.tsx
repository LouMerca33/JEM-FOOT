import HeroVideo from '@/components/home/HeroVideo';
import StatsBar from '@/components/home/StatsBar';
import NewsSection from '@/components/home/NewsSection';
import TeamsSection from '@/components/home/TeamsSection';
import TemoignagesSection from '@/components/home/TemoignagesSection';
import SondageSection from '@/components/home/SondageSection';
import ValuesSection from '@/components/home/ValuesSection';
import StadeSection from '@/components/home/StadeSection';
import CtaSection from '@/components/home/CtaSection';
import { getSettings } from '@/lib/settings';

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <HeroVideo tagline={settings.hero_tagline} />
      <StatsBar />
      <StadeSection />
      <NewsSection />
      <TeamsSection />
      <TemoignagesSection />
      <SondageSection />
      <ValuesSection />
      <CtaSection />
    </>
  );
}
