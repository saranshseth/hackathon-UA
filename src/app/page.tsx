import Header from '@/components/Layout/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularToursSection } from '@/components/PopularToursSection';
import { AuthenticExperiencesSection } from '@/components/AuthenticExperiencesSection';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Homepage() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <HeroSection />
      <PopularToursSection />
      <AuthenticExperiencesSection />
    </>
  );
}