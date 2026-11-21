import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { KeyFiguresSection } from '@/components/KeyFiguresSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { JourneySection } from '@/components/JourneySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { EngagementSection } from '@/components/EngagementSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/common/RevealObserver';

const Index = () => {
  const { hash } = useLocation();

  // Coming back from another page with "/#projets": the browser does not jump
  // to the anchor by itself in a single-page app, so do it once mounted.
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }),
    );
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <RevealObserver />
      <Navbar />
      <main id="contenu">
        <HeroSection />
        <KeyFiguresSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <TestimonialsSection />
        <EngagementSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
