import Script from "next/script";

import { getCanonicalUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

// Single source of truth for all @id and absolute URLs in the graph
const SCHEMA_BASE_URL = siteConfig.url.replace(/\/$/, "");
const MAIN_ENTITY_ID = `${SCHEMA_BASE_URL}/#local-business`;

// Central Bath, near Milsom Street (geo-precision)
const BATH_GEO = {
  latitude: 51.3828,
  longitude: -2.358,
};

// GeoShape box covering postcodes BA1, BA2, BA3 (southwest then northeast: minLon minLat maxLon maxLat)
const BATH_GEOSHAPE_BOX = "51.36 -2.42 51.41 -2.35";

// Landmarks for knowsAbout
const BATH_LANDMARKS = [
  { name: "Roman Baths", url: "https://www.romanbaths.co.uk" },
  { name: "Thermae Bath Spa", url: "https://www.thermaebathspa.com" },
];

/** Schema.org JSON-LD shape for the massage business (MassageTherapy). */
export type MassageBusiness = {
  "@context": "https://schema.org";
  "@type": "MassageTherapy";
  "@id": string;
  name: string;
  legalName: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  image: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  hasMap: string;
  areaServed: (
    | { "@type": "GeoShape"; box: string }
    | { "@type": "Place"; name: string }
  )[];
  knowsAbout: { "@type": "Place"; name: string; url: string }[];
  openingHours: string[];
  sameAs?: string[];
  service: {
    "@type": "Service";
    "@id": string;
    name: string;
    description: string;
    provider: { "@id": string };
    offers?: {
      "@type": "Offer";
      price: number;
      priceCurrency: "GBP";
    };
  }[];
};

function buildBathLocalBusinessSchema(): MassageBusiness {
  const description = [
    siteConfig.description,
    " Deep Tissue Massage Bath and Sports Therapy BA1 for relief and recovery. Therapeutic Massage near Royal Victoria Park in Central Bath, Somerset.",
  ].join("");

  const schema: MassageBusiness = {
    "@context": "https://schema.org",
    "@type": "MassageTherapy",
    "@id": MAIN_ENTITY_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: getCanonicalUrl(siteConfig.defaultOgImage),
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
      latitude: BATH_GEO.latitude,
      longitude: BATH_GEO.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BATH_GEO.latitude},${BATH_GEO.longitude}`,
    areaServed: [
      { "@type": "GeoShape", box: BATH_GEOSHAPE_BOX },
      { "@type": "Place", name: "BA1, BA2, BA3" },
    ],
    knowsAbout: BATH_LANDMARKS.map((place) => ({
      "@type": "Place" as const,
      name: place.name,
      url: place.url,
    })),
    openingHours: siteConfig.openingHours.map((h) => h.schema),
    sameAs: siteConfig.socialProfiles.map((p) => p.href),
    service: services.map((service) => ({
      "@type": "Service",
      "@id": `${SCHEMA_BASE_URL}/#service-${service.slug}`,
      name: service.name,
      description: service.description.split(".")[0] + ".",
      provider: { "@id": MAIN_ENTITY_ID },
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "GBP",
      },
    })),
  };

  return schema;
}

export function BathLocalBusinessSchema() {
  const data = buildBathLocalBusinessSchema();

  return (
    <Script
      id="bath-local-business-schema"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}
