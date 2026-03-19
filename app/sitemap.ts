import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/treatments", "/products", "/contact", "/blog"].map((path) => ({
    url: getCanonicalUrl(path),
    lastModified: new Date(),
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...blogRoutes];
}
