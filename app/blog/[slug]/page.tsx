import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";

import { buildBreadcrumbListSchema, createPageMetadata } from "@/lib/seo";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import type { ContentBlock } from "@/content/blog/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    keywords: [post.category, "massage Bath", "Aurelian Massage"],
    ...(post.image ? { imagePath: post.image } : {}),
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 font-serif text-2xl font-semibold leading-snug text-neutral-light sm:text-3xl">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="mt-8 font-serif text-xl font-semibold text-neutral-light">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p className="mt-5 text-base leading-8 text-neutral-mid sm:text-lg">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-7 text-neutral-mid">
              <span
                aria-hidden="true"
                className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-purple-dark"
                style={{ background: "#C5A556" }}
              >
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          className="mt-8 rounded-2xl p-6 sm:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(44,30,66,0.9) 0%, rgba(59,38,96,0.9) 100%)",
            border: "1px solid rgba(197,165,86,0.35)",
            boxShadow: "0 4px 24px rgba(32,21,46,0.4)",
          }}
        >
          <p className="text-base leading-8 text-neutral-mid">
            {block.text}
          </p>
          <Link
            href="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
            style={{ background: "#C5A556" }}
          >
            Browse all treatments
          </Link>
        </aside>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Aurelian Massage",
    },
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "360px" }}>
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={`${post.title} – Aurelian Massage, Bath`}
              fill
              sizes="100vw"
              className="object-cover object-center grayscale"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(32,21,46,0.5) 0%, rgba(32,21,46,0.88) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(32,21,46,1) 0%, rgba(59,38,96,1) 100%)",
            }}
          />
        )}

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20">
          {/* Left — content */}
          <div className="flex max-w-3xl flex-col justify-end">
            {/* Logo on mobile (desktop has it on the right) */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Image
                src="/logo.svg"
                alt="Aurelian Massage logo"
                width={180}
                height={180}
                className="h-auto w-full max-w-[180px] drop-shadow-[0_0_40px_rgba(197,165,86,0.35)]"
                priority
              />
            </div>
            <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-neutral-mid/70 transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent rounded"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All articles
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-mid/60">
            <span className="inline-flex items-center gap-1.5">
              <Tag size={11} aria-hidden="true" />
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={11} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-neutral-light sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-neutral-mid/80 sm:text-lg">
            {post.description}
          </p>
          </div>

          {/* Right — logo */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <Image
              src="/logo.svg"
              alt="Aurelian Massage logo"
              width={280}
              height={280}
              className="h-auto w-full max-w-[280px] drop-shadow-[0_0_40px_rgba(197,165,86,0.35)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-6 py-14 lg:py-20">
        <article>
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        {/* Divider */}
        <div className="mt-16 h-px w-full bg-gold-accent/15" />

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              More from the blog
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                  style={{
                    background: "rgba(32,21,46,0.6)",
                    border: "1px solid rgba(197,165,86,0.18)",
                  }}
                >
                  <p className="text-xs text-neutral-mid/50">{p.category} · {p.publishedAt}</p>
                  <p className="mt-2 font-serif text-lg font-semibold text-neutral-light transition-colors group-hover:text-gold-accent">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-mid/70 line-clamp-2">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbListSchema([
              { name: "Home" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
