import type { Metadata } from "next";

import type { Service } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const SCHEMA_BASE_URL = siteConfig.url.replace(/\/$/, "");
const MAIN_ENTITY_ID = `${SCHEMA_BASE_URL}/#local-business`;

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

/**
 * Page-level schema for an individual treatment page: Service (this treatment) + BreadcrumbList.
 * Use alongside the site-wide HealthAndBeautyBusiness from layout.
 */
export function buildServicePageSchema(service: Service) {
  const serviceId = `${SCHEMA_BASE_URL}/#service-${service.slug}`;
  const serviceUrl = getCanonicalUrl(`/treatments/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.name,
        description: service.description.split(".")[0] + ".",
        url: serviceUrl,
        provider: { "@id": MAIN_ENTITY_ID },
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: "GBP",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Treatments", item: getCanonicalUrl("/treatments") },
          { "@type": "ListItem", position: 3, name: service.name, item: serviceUrl },
        ],
      },
    ],
  };
}

/** Build BreadcrumbList schema. path empty/undefined = Home (site root). */
export function buildBreadcrumbListSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      item: item.path === undefined || item.path === "" ? siteConfig.url : getCanonicalUrl(item.path),
    })),
  };
}
