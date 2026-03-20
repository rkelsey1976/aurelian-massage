import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, BookOpen, Sparkles } from "lucide-react";

import { getAllBlogPosts } from "@/lib/blog";
import { buildBreadcrumbListSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Massage Advice & Guides for Bath",
  description:
    "Expert advice on massage therapy, relaxation techniques, and getting the most from your treatment in Bath city centre — from the team at Aurelian Massage.",
  path: "/blog",
  keywords: ["massage advice Bath", "massage guide", "therapeutic massage tips"],
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "460px" }}>
        <Image
          src="/intro-2.png"
          alt="Massage therapy advice and wellness guides from Aurelian Massage, Bath"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(32,21,46,0.94) 0%, rgba(44,30,66,0.82) 55%, rgba(32,21,46,0.92) 100%)",
          }}
        />
        {/* Gold ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #C5A556, transparent)" }}
        />
        {/* Grain */}
        <div aria-hidden="true" className="noise absolute inset-0" />
        {/* Vignette */}
        <div aria-hidden="true" className="vignette absolute inset-0" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:py-28">
          {/* Left — content */}
          <div className="flex flex-col justify-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-neutral-mid/50">
              <li>
                <Link
                  href="/"
                  className="rounded transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-mid/30">›</li>
              <li className="text-neutral-mid/80">Journal</li>
            </ol>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
            The Aurelian Journal
          </p>

          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-gold-champagne sm:text-6xl">
            Massage Advice &amp; Guides
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            Expert guidance on getting the most from your massage therapy
            experience — from treatment advice and relaxation tips to the
            history of wellness in Bath.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-neutral-mid/60">
            <span className="inline-flex items-center gap-2">
              <BookOpen size={14} aria-hidden="true" className="text-gold-accent/70" />
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
            <span aria-hidden="true" className="text-neutral-mid/20">·</span>
            <span>Written by the Aurelian Massage team</span>
          </div>
          </div>

          {/* Right — logo */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <Image
              src="/logo.svg"
              alt="Aurelian Massage logo"
              width={340}
              height={340}
              className="h-auto w-full max-w-[340px] drop-shadow-[0_0_40px_rgba(197,165,86,0.35)]"
              priority
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: "linear-gradient(to bottom, transparent, #20152E)" }}
        />
      </div>

      {/* ── Posts ── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Featured post */}
        {featured && (
          <div className="mb-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Latest article
            </p>
            <article
              className="group relative grid overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.005] lg:grid-cols-[1.2fr_1fr]"
              style={{
                background: "#2C1E42",
                border: "1px solid rgba(122,80,176,0.30)",
                boxShadow: "0 8px 40px rgba(32,21,46,0.55)",
              }}
            >
              {featured.image && (
                <div className="relative min-h-[260px] overflow-hidden lg:min-h-[360px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    priority
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 60%, rgba(44,30,66,0.85) 100%)",
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-mid/50">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                    style={{ background: "rgba(122,80,176,0.25)", color: "#DFC98A" }}
                  >
                    {featured.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featured.publishedAt}>{featured.publishedAt}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} aria-hidden="true" />
                    {featured.readingTime}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-gold-champagne sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="transition-colors duration-200 hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-mid line-clamp-4">
                  {featured.description}
                </p>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-on-gold transition-all duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                  style={{ background: "#C5A556" }}
                >
                  Read article
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* Rest of posts */}
        {rest.length > 0 && (
          <>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              More articles
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.22)",
                    boxShadow: "0 4px 20px rgba(32,21,46,0.4)",
                  }}
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 50%, rgba(44,30,66,0.75) 100%)",
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-mid/50">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                        style={{ background: "rgba(122,80,176,0.20)", color: "#DFC98A" }}
                      >
                        {post.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-neutral-light transition-colors group-hover:text-neutral-light">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-7 text-neutral-mid line-clamp-3">
                      {post.description}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-accent transition-colors hover:text-neutral-light focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
                    >
                      Read article
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbListSchema([{ name: "Home" }, { name: "Blog", path: "/blog" }])),
        }}
      />
    </>
  );
}
