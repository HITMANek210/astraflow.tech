import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://astraflow.tech";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free 30-minute consultation with Filip Wyrembak to discuss your personal branding goals. No pitch, no pressure - just an honest conversation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Filip Wyrembak - Brand Strategist",
    description: "Book a free 30-minute consultation to discuss your personal branding goals and explore how I can help build your brand.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
