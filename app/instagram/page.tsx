import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Instagram — posts & stories",
  description: "On-brand square, 4:5, and story graphics for Instagram.",
  robots: { index: false, follow: false },
};

/** Half of 1080 — scale ×2 for native square feed. */
const SQ = 540;
/** Half of 1080×1350 (4:5) — Instagram’s preferred portrait feed ratio. */
const P_W = 540;
const P_H = 675;
/** Half of 1080×1920 (9:16) — Stories / Reels cover. */
const ST_W = 540;
const ST_H = 960;

export default function InstagramAssetsPage() {
  const { name, tagline, address, bookingUrl, url, openingHours } = siteConfig;
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const nameFirst = nameWords[0] ?? name;
  const nameRest = nameWords.slice(1).join(" ");
  const featured = services.find((s) => s.featured) ?? services[3];

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-5xl space-y-14">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Instagram graphics</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Sizes are <strong className="text-neutral-light">half-scale</strong> for easy preview; export at{" "}
            <strong className="text-neutral-light">×2</strong> or capture at <strong className="text-neutral-light">200%</strong> zoom.{" "}
            <strong className="text-neutral-light">4:5</strong> ({P_W}×{P_H} → 1080×1350) often gets more feed
            space than square. <strong className="text-neutral-light">9:16</strong> ({ST_W}×{ST_H} → 1080×1920) for
            Stories/Reels — keep key text in the <strong className="text-neutral-light">centre “safe” band</strong>{" "}
            (avoid the very top and bottom where UI sits). Each block has{" "}
            <strong className="text-neutral-light">Download PNG</strong> (2× capture for sharper uploads).
          </p>
          <p className="text-sm text-neutral-gray">
            Square feed templates also live on{" "}
            <Link href="/facebook" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /facebook
            </Link>
            .
          </p>
        </header>

        {/* ── Square 1:1 ── */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-premium">
            Square 1:1 — feed & profile grid
          </h2>
          <div className="grid gap-14 lg:grid-cols-2">
            <DownloadableGraphic
              id="ig-sq-1-link-in-bio"
              filename="instagram-square-1-link-in-bio"
              title="1 — Link in bio"
              note="Classic IG CTA; point your bio link to Fresha or your site."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660] px-10 text-center">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-45"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 20%, rgba(197,165,86,0.18) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={96}
                    height={96}
                    priority
                    unoptimized
                    className="h-24 w-24 drop-shadow-[0_0_24px_rgba(197,165,86,0.4)]"
                  />
                  <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.32em] text-gold-premium">
                    Link in bio
                  </p>
                  <p className="mt-3 font-serif text-[26px] font-semibold leading-tight text-neutral-light">
                    Book your next
                    <br />
                    <span className="text-gold-champagne">massage</span>
                  </p>
                  <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-neutral-gray">
                    {name} · {address.city}. Tap the link in our bio to choose your time on Fresha.
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 rounded-full px-8 py-3 text-[12px] font-semibold text-on-gold"
                    style={{
                      background: "#C5A556",
                      boxShadow: "0 0 24px rgba(197, 165, 86, 0.35)",
                    }}
                  >
                    Book through Fresha
                  </a>
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="ig-sq-2-this-week"
              filename="instagram-square-2-this-week"
              title="2 — This week"
              note="Hours from site config — update copy when schedule changes."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col bg-purple-deep px-9 py-10">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div className="relative z-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                    {name}
                  </p>
                  <p className="mt-3 font-serif text-[28px] font-semibold leading-tight text-neutral-light">
                    This week in {address.city}
                  </p>
                  <p className="mt-2 text-[12px] text-neutral-gray">
                    Swedish & aromatherapy — we&apos;re here when you need to reset.
                  </p>
                </div>
                <ul className="relative z-10 mt-8 space-y-3 border-t border-gold-premium/20 pt-6">
                  {openingHours.map((h) => {
                    const parts = h.label.match(/^(\S+)\s+(.+)$/);
                    const day = parts?.[1] ?? h.label;
                    const hours = parts?.[2] ?? "";
                    return (
                      <li
                        key={h.schema}
                        className="flex items-baseline justify-between gap-3 border-b border-gold-premium/10 pb-3 text-[13px] last:border-b-0 last:pb-0"
                      >
                        <span className="font-medium text-neutral-light">{day}</span>
                        <span className="text-right text-neutral-gray">{hours}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="relative z-10 mt-auto flex items-center justify-between border-t border-gold-premium/15 pt-5">
                  <p className="text-[10px] text-gold-premium/90">Link in bio to book</p>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={44}
                    height={44}
                    priority
                    unoptimized
                    className="h-11 w-11 opacity-95"
                  />
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="ig-sq-3-carousel"
              filename="instagram-square-3-carousel-cover"
              title="3 — Carousel cover"
              note="Post 1 of a carousel; follow with treatment slides or photos."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col justify-between bg-purple-royal p-10">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(122,80,176,0.25) 0%, transparent 55%)",
                  }}
                />
                <div className="relative z-10">
                  <p className="font-serif text-[36px] font-semibold leading-[0.95] text-neutral-light">
                    {nameFirst}
                    <br />
                    <span className="text-gold-champagne">{nameRest}</span>
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-neutral-gray">{tagline}</p>
                </div>
                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-premium">
                      Swipe for more →
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-gray">Treatments · {address.city}</p>
                  </div>
                  <span className="rounded-full border border-gold-premium/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gold-premium">
                    1 / 7
                  </span>
                </div>
              </div>
            </DownloadableGraphic>
          </div>
        </div>

        {/* ── Portrait 4:5 ── */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-premium">
            Portrait 4:5 — feed (recommended)
          </h2>
          <div className="grid gap-14 lg:grid-cols-2">
            <DownloadableGraphic
              id="ig-45-4-hero"
              filename="instagram-portrait-4-full-bleed-headline"
              title="4 — Full-bleed + headline"
              note="Photo-forward; pair with a short caption."
              dimensions={{ width: P_W, height: P_H }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/therapist-hero.png"
                  alt=""
                  fill
                  priority
                  unoptimized
                  className="object-cover object-[72%_35%]"
                  sizes="540px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(32,21,46,0.95) 0%, rgba(32,21,46,0.55) 38%, rgba(32,21,46,0.25) 62%, rgba(32,21,46,0.85) 100%)",
                  }}
                />
                <div aria-hidden className="noise absolute inset-0 opacity-70" />
                <div className="absolute inset-x-0 top-0 z-10 px-8 pb-6 pt-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-premium">
                    {address.city}
                  </p>
                  <p className="mt-3 font-serif text-[32px] font-semibold leading-tight text-neutral-light">
                    Your space to breathe
                  </p>
                  <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed text-neutral-gray">
                    {name} — tailored Swedish & aromatherapy massage in the heart of the city.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-8 pb-10">
                  <p className="text-[11px] font-medium text-gold-premium">Link in bio · Fresha</p>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={56}
                    height={56}
                    priority
                    unoptimized
                    className="h-14 w-14 drop-shadow-[0_0_16px_rgba(197,165,86,0.35)]"
                  />
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="ig-45-5-menu"
              filename="instagram-portrait-5-menu-stack"
              title="5 — Menu stack"
              note="Full treatment list from site data — portrait save post."
              dimensions={{ width: P_W, height: P_H }}
            >
              <div className="relative flex h-full w-full flex-col bg-gradient-to-b from-purple-royal to-purple-deep px-6 pb-6 pt-8">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div className="relative z-10 flex shrink-0 items-start justify-between gap-2">
                  <div className="min-w-0 pr-1">
                    <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-gold-premium">{name}</p>
                    <p className="mt-1.5 font-serif text-[20px] font-semibold leading-tight text-neutral-light">
                      Treatments
                    </p>
                    <p className="mt-1 text-[9px] leading-snug text-neutral-gray">Swedish & aromatherapy</p>
                  </div>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={44}
                    height={44}
                    priority
                    unoptimized
                    className="h-11 w-11 shrink-0 opacity-95"
                  />
                </div>
                <ul className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col gap-y-1 border-t border-gold-premium/20 pt-3.5">
                  {services.map((s) => (
                    <li
                      key={s.slug}
                      className="flex items-center justify-between gap-2 border-b border-gold-premium/10 py-1.5 last:border-b-0"
                    >
                      <span className="flex min-w-0 flex-1 items-baseline gap-1">
                        <span className="line-clamp-2 font-serif text-[9.5px] font-medium leading-tight text-neutral-light">
                          {s.name}
                        </span>
                        {s.featured ? (
                          <span className="shrink-0 text-[6px] font-sans font-bold uppercase tracking-wider text-gold-premium">
                            Sig.
                          </span>
                        ) : null}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
                        <span className="text-[8px] text-neutral-gray">{s.duration}′</span>
                        <span className="font-serif text-[10.5px] leading-none text-gold-champagne">£{s.price}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="relative z-10 mt-2 text-center text-[9px] text-gold-premium/90">
                  Book online · link in bio
                </p>
                <p className="relative z-10 mt-1 truncate text-center text-[8px] text-neutral-gray/80">
                  {url.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </DownloadableGraphic>
          </div>
        </div>

        {/* ── Story 9:16 ── */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-premium">
            Story / Reels 9:16
          </h2>
          <div className="flex flex-col gap-14 lg:flex-row lg:flex-wrap">
            <DownloadableGraphic
              id="ig-story-6-tap-link"
              filename="instagram-story-6-tap-link-bio"
              title="6 — Story — Tap link"
              note="Keep main text in the middle third; avoid top ~14% and bottom ~20% for IG UI."
              dimensions={{ width: ST_W, height: ST_H }}
            >
              <div className="relative flex h-full w-full flex-col bg-gradient-to-b from-[#1a1228] via-purple-deep to-purple-royal">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[18%] h-40 w-40 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
                  style={{ background: "radial-gradient(circle, #c5a556, transparent)" }}
                />
                <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-premium">
                    {name}
                  </p>
                  <p className="mt-10 font-serif text-[38px] font-semibold leading-[0.95] text-neutral-light">
                    Tap link
                    <br />
                    <span className="text-gold-champagne">in bio</span>
                  </p>
                  <p className="mt-8 max-w-[280px] text-[14px] leading-relaxed text-neutral-gray">
                    Book {featured.duration} min with us on Fresha — {address.city}.
                  </p>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={80}
                    height={80}
                    priority
                    unoptimized
                    className="mt-12 h-20 w-20 drop-shadow-[0_0_20px_rgba(197,165,86,0.38)]"
                  />
                </div>
                <div className="pb-12 pt-4 text-center">
                  <p className="text-[10px] tracking-wide text-gold-premium/80">Book through Fresha</p>
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="ig-story-7-featured"
              filename="instagram-story-7-featured-treatment"
              title="7 — Story — Featured treatment"
              note="Swap image in code (featured service) for variety."
              dimensions={{ width: ST_W, height: ST_H }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center"
                  sizes="540px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: featured.gradient }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(32,21,46,0.88) 0%, transparent 35%, transparent 55%, rgba(32,21,46,0.92) 100%)",
                  }}
                />
                <div aria-hidden className="noise absolute inset-0 opacity-60" />
                <div className="absolute inset-x-0 top-0 z-10 px-8 pt-14 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-premium">
                    This week
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-16 text-center">
                  <p className="font-serif text-[26px] font-semibold leading-tight text-neutral-light">
                    {featured.name}
                  </p>
                  <p className="mt-2 text-[13px] text-gold-champagne">
                    {featured.duration} min · £{featured.price}
                  </p>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-premium">
                    Link in bio to book
                  </p>
                </div>
              </div>
            </DownloadableGraphic>
          </div>
        </div>
      </div>
    </div>
  );
}
