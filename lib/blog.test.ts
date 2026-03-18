import { describe, expect, it } from "vitest";

import { getAllBlogPosts, getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";

describe("blog helpers", () => {
  it("returns posts sorted by newest first", () => {
    const posts = getAllBlogPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("local-seo-basics");
    expect(posts[1].slug).toBe("choosing-service-areas");
  });

  it("returns a post by slug", () => {
    const post = getBlogPostBySlug("local-seo-basics");

    expect(post?.title).toBe("Local SEO Basics for Service Businesses");
  });

  it("returns slugs for static params generation", () => {
    expect(getBlogPostSlugs()).toEqual([
      "local-seo-basics",
      "choosing-service-areas",
    ]);
  });
});
