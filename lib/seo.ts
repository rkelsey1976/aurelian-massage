import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  keywords?: string[];
  type?: "website" | "article";
};

function normalizePath(path?: string): string {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getCanonicalUrl(path?: string): string {
  const normalizedPath = normalizePath(path);

  if (!normalizedPath) {
    return siteConfig.url;
  }

  return `${siteConfig.url}${normalizedPath}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  imagePath = siteConfig.defaultOgImage,
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = getCanonicalUrl(imagePath);
  const pageTitle = `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} open graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    image: getCanonicalUrl(siteConfig.defaultOgImage),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area.city}, ${area.region}`,
    })),
    openingHours: siteConfig.openingHours.map((hours) => hours.schema),
    sameAs: siteConfig.socialProfiles,
  };
}
