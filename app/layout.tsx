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

export const metadata: Metadata = {
  title: "Filip Wyrembak | Personal Brand Builder",
  description: "Building brands that command attention and drive results. Helping leaders build personal brands that open doors.",
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
  openGraph: {
    title: "Filip Wyrembak | Personal Brand Builder",
    description: "Building brands that command attention and drive results. Helping leaders build personal brands that open doors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filip Wyrembak | Personal Brand Builder",
    description: "Building brands that command attention and drive results.",
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
