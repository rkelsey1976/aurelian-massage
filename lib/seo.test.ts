import { describe, expect, it } from "vitest";

import { buildLocalBusinessSchema, createPageMetadata, getCanonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

describe("getCanonicalUrl", () => {
  it("builds an absolute URL from a relative path", () => {
    expect(getCanonicalUrl("/treatments")).toBe(`${siteConfig.url}/treatments`);
  });

  it("returns the site root when no path is provided", () => {
    expect(getCanonicalUrl()).toBe(siteConfig.url);
  });
});

describe("createPageMetadata", () => {
  it("creates canonical and open graph metadata", () => {
    const metadata = createPageMetadata({
      title: "Treatments",
      description: "See our treatments.",
      path: "/treatments",
    });

    expect(metadata.title).toBe("Treatments | Starter Local Business");
    expect(metadata.description).toBe("See our treatments.");
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/treatments`);
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/treatments`);
    expect(metadata.openGraph?.images?.[0]).toMatchObject({
      url: `${siteConfig.url}/api/og`,
    });
  });
});

describe("buildLocalBusinessSchema", () => {
  it("returns LocalBusiness schema using shared business data", () => {
    const schema = buildLocalBusinessSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.address.addressLocality).toBe(siteConfig.address.city);
    expect(schema.openingHours).toEqual(["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"]);
    expect(schema.sameAs).toEqual(siteConfig.socialProfiles);
  });
});
