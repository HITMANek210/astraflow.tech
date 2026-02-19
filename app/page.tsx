import { HeroSection } from "@/components/hero-section";
import { AboutIntro } from "@/components/about-intro";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { CredentialsSection } from "@/components/credentials-section";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astraflow.tech";

export const metadata: Metadata = {
  title: {
    absolute: "Filip Wyrembak | Brand Strategist",
  },
  description: "Brand Strategist & Security Analyst at ING. Helping leaders and executives build personal brands that command attention, open doors, and drive real results through clear messaging and strategy.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Filip Wyrembak | Brand Strategist",
    description: "Brand Strategist & Security Analyst at ING. Helping leaders and executives build personal brands that command attention, open doors, and drive real results through clear messaging and strategy.",
    url: siteUrl,
  },
};

// Structured Data (JSON-LD) for better AI and search engine understanding
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Filip Wyrembak",
  jobTitle: "Security Analyst & Personal Brand Builder",
  worksFor: {
    "@type": "Organization",
    name: "ING",
  },
  description: "Security Analyst at ING and Personal Brand Builder. Helping leaders build personal brands that command attention and drive results.",
  url: siteUrl,
  sameAs: [
    // Add your social media profiles here
    // "https://linkedin.com/in/filipwyrembak",
    // "https://twitter.com/filipwyrembak",
  ],
  offers: {
    "@type": "Service",
    serviceType: "Personal Branding Consultation",
    description: "Personal brand building, content strategy, and online presence optimization services",
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact`,
    },
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Filip Wyrembak - Personal Brand Builder",
  description: "Personal brand building services for executives, founders, and thought leaders",
  url: siteUrl,
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      // Add your location coordinates if desired
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Personal Branding Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Building",
          description: "Define your unique value and market position with clarity and confidence",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Content & Trust",
          description: "Build trust with content that speaks to the right people",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Online Presence",
          description: "Build and grow your social media presence and website",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "One-on-One Guidance",
          description: "Personal coaching to refine your messaging and amplify your impact",
        },
      },
    ],
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Filip Wyrembak | Personal Brand Builder",
  url: siteUrl,
  description: "Building brands that command attention and drive results",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/contact`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      {/* Structured Data for Search Engines and AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      
      <main>
        {/* Static H1 for SEO crawlers - hidden visually but accessible to search engines */}
        <h1 className="sr-only">Filip Wyrembak | Brand Strategist</h1>
        <HeroSection />
        <AboutIntro />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <CredentialsSection />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
