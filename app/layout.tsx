import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ConsentGatedGoogleAnalytics } from "@/components/analytics/google-analytics-consent";
import { CookieBanner } from "@/components/marketing/cookie-banner";
import { BathLocalBusinessSchema } from "@/components/seo/BathLocalBusinessSchema";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.defaultKeywords,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} open graph image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <BathLocalBusinessSchema />
        {children}
        <CookieBanner />
        <ConsentGatedGoogleAnalytics />
      </body>
    </html>
  );
}
