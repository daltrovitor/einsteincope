import Preloader from '@/components/campaign/Preloader';
import Navbar from '@/components/campaign/Navbar';
import HeroSection from '@/components/campaign/HeroSection';
import AboutSection from '@/components/campaign/AboutSection';
import ImpactSection from '@/components/campaign/ImpactSection';
import ProofOfImpactSection from '@/components/campaign/ProofOfImpactSection';
import { HowToHelpSection, GallerySection, CTASection, Footer } from '@/components/campaign/FinalSections';

export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <Preloader />
      <Navbar />
      
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ProofOfImpactSection />
      <HowToHelpSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </main>
  );
}
