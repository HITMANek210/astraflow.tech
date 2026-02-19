import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/header";
import { I18nProvider } from "@/components/i18n-provider";
import { detectLanguageFromHeader } from "@/lib/detect-language";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astraflow.tech";
const siteName = "Filip Wyrembak | Brand Strategist";
const defaultDescription = "Brand Strategist & Security Analyst at ING. Helping leaders and executives build personal brands that command attention, open doors, and drive real results through clear messaging and strategy.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "personal brand builder",
    "brand strategy",
    "content marketing",
    "online presence",
    "personal branding consultant",
    "executive branding",
    "thought leadership",
    "brand positioning",
    "digital marketing",
    "social media strategy",
    "Filip Wyrembak",
    "security analyst",
    "ING",
  ],
  authors: [{ name: "Filip Wyrembak" }],
  creator: "Filip Wyrembak",
  publisher: "Filip Wyrembak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      pl: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Filip Wyrembak - Brand Strategist",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business",
  classification: "Personal Branding Consultant",
  other: {
    // AI-specific meta tags
    "ai:description": defaultDescription,
    "ai:keywords": "personal brand builder, brand strategy, content marketing, online presence, personal branding consultant, executive branding, thought leadership",
    "ai:author": "Filip Wyrembak",
    "ai:category": "Business Services - Personal Branding",
    "ai:service_type": "Personal Branding Consultation",
    "ai:target_audience": "Executives, Founders, Thought Leaders, Professionals",
    "ai:expertise": "Brand Strategy, Content Marketing, Online Presence, Personal Branding",
    "ai:location": "Remote, Worldwide",
    // Additional structured data hints
    "application-name": siteName,
    "apple-mobile-web-app-title": siteName,
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    // AI assistant specific tags
    "chatgpt:description": defaultDescription,
    "chatgpt:category": "Business Services",
    "perplexity:description": defaultDescription,
    "claude:description": defaultDescription,
    // Schema.org hints
    "schema:Person": "Filip Wyrembak",
    "schema:jobTitle": "Security Analyst & Brand Strategist",
    "schema:worksFor": "ING",
    "schema:Service": "Personal Branding Consultation",
    // SEO hints
    "subject": "Personal Branding Services",
    "topic": "Personal Brand Building, Content Strategy, Online Presence",
    "classification": "Business Services",
    "category": "Personal Branding Consultant",
    "coverage": "Worldwide",
    "distribution": "Global",
    "language": "English, Polish",
    "geo.region": "PL",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const detectedLanguage = detectLanguageFromHeader(acceptLanguage);

  return (
    <html lang={detectedLanguage} className={inter.variable}>
      <body>
        <I18nProvider initialLanguage={detectedLanguage}>
        <Header />
        {children}
        </I18nProvider>
      </body>
    </html>
  );
}
