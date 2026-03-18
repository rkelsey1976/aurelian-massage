import { blogPosts, type BlogPost } from "@/content/blog/posts";

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug);
}
