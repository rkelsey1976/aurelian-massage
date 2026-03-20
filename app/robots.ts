import type { MetadataRoute } from "next";

import { INTERNAL_ASSET_PATHS } from "@/lib/internal-asset-paths";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...INTERNAL_ASSET_PATHS],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
