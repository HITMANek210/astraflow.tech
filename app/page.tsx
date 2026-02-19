import { HeroSection } from "@/components/hero-section";
import { AboutIntro } from "@/components/about-intro";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { CredentialsSection } from "@/components/credentials-section";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutIntro />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <CredentialsSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
