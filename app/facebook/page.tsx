import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Facebook — posts & graphics",
  description: "On-brand square and landscape graphics for Facebook feed.",
  robots: { index: false, follow: false },
};

/** Half of 1080 — screenshot at 200% zoom or scale ×2 in Figma for native feed. */
const SQ = 540;
/** Half of 1200×630 — scale ×2 for link / landscape posts. */
const LAND_W = 600;
const LAND_H = 315;

export default function FacebookAssetsPage() {
  const { name, tagline, address, bookingUrl, url, owner } = siteConfig;
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const nameFirst = nameWords[0] ?? name;
  const nameRest = nameWords.slice(1).join(" ");
  const featured = services.find((s) => s.featured) ?? services[3];

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Facebook graphics</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Square frames are <strong className="text-neutral-light">{SQ}×{SQ}px</strong> (half of
            Facebook’s ideal <strong className="text-neutral-light">1080×1080</strong> feed size).
            Landscape frames are <strong className="text-neutral-light">{LAND_W}×{LAND_H}px</strong>{" "}
            (half of <strong className="text-neutral-light">1200×630</strong>). Scale up ×2 in your
            design tool, or set browser zoom to <strong className="text-neutral-light">200%</strong> and
            capture crisply. Use <strong className="text-neutral-light">Download PNG</strong> on each
            block for a quick export (opens at 2× pixel density — good for social uploads).
          </p>
          <p className="text-sm text-neutral-gray">
            Timeline covers (820×312) live on{" "}
            <Link
              href="/facebook-covers"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              /facebook-covers
            </Link>
            . Custom copy and backgrounds:{" "}
            <Link
              href="/facebook-builder"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              Facebook builder
            </Link>
            .
          </p>
        </header>

        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-premium">
            Square — feed & ads
          </h2>
          <div className="grid gap-14 sm:grid-cols-1 lg:grid-cols-2">
            <DownloadableGraphic
              id="fb-sq-1-wordmark"
              filename="facebook-square-1-wordmark-sanctuary"
              title="1 — Wordmark & sanctuary"
              note="Brand-led; pair with a short caption."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660] p-10">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(122,80,176,0.4) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10">
                  <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-premium">
                    {address.city}
                  </p>
                  <p className="mt-4 font-serif text-[42px] font-semibold leading-[0.95] tracking-tight text-neutral-light">
                    {nameFirst}
                  </p>
                  {nameRest ? (
                    <p className="mt-1 font-serif text-[42px] font-light leading-[0.95] tracking-tight text-gold-champagne">
                      {nameRest}
                    </p>
                  ) : null}
                </div>
                <p className="relative z-10 max-w-[280px] font-serif text-[15px] font-light italic leading-snug text-neutral-light/85">
                  {tagline}
                </p>
                <div className="relative z-10 flex items-end justify-between">
                  <div className="h-1 w-20 bg-gradient-to-r from-gold-premium to-transparent" />
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={88}
                    height={88}
                    priority
                    unoptimized
                    className="h-[88px] w-[88px] opacity-95 drop-shadow-[0_0_20px_rgba(197,165,86,0.35)]"
                  />
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="fb-sq-2-fresha"
              filename="facebook-square-2-book-fresha"
              title="2 — Book through Fresha"
              note="CTA post; link to Fresha in the post."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col bg-purple-royal">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(197,165,86,0.12) 0%, transparent 40%, rgba(92,61,136,0.2) 100%)",
                  }}
                />
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                    {name}
                  </p>
                  <p className="mt-6 font-serif text-[36px] font-semibold leading-tight text-neutral-light">
                    Ready to unwind?
                  </p>
                  <p className="mt-4 max-w-[400px] text-[16px] leading-relaxed text-neutral-gray">
                    Book your next massage in a few taps — same tailored care, {address.city} city
                    centre.
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 rounded-full px-10 py-3.5 text-[13px] font-semibold text-on-gold transition-opacity hover:opacity-95"
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
              id="fb-sq-3-signature"
              filename="facebook-square-3-signature-treatment"
              title="3 — Signature treatment spotlight"
              note={`Highlights ${featured.name}.`}
              dimensions={{ width: SQ, height: SQ }}
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
                <div aria-hidden className="noise absolute inset-0 opacity-80" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(32,21,46,0.95) 0%, rgba(32,21,46,0.4) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                  <span className="rounded-full bg-gold-premium/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-gold">
                    Signature
                  </span>
                  <p className="mt-3 font-serif text-[26px] font-semibold leading-tight text-neutral-light">
                    {featured.name}
                  </p>
                  <p className="mt-2 text-[14px] text-neutral-gray">
                    {featured.duration} minutes · £{featured.price}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-snug text-neutral-light/90">
                    {featured.description}
                  </p>
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="fb-sq-4-treatments-menu"
              filename="facebook-square-4-treatments-menu"
              title="4 — Treatments menu snapshot"
              note="All treatments from your site menu — one row each (stacked list)."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col bg-purple-deep px-7 pb-6 pt-5">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div className="relative z-10 flex shrink-0 items-start justify-between gap-4">
                  <div className="min-w-0 pr-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                      {name}
                    </p>
                    <p className="mt-1.5 font-serif text-[21px] font-semibold leading-tight text-neutral-light">
                      Treatments in {address.city}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-snug text-neutral-gray">
                      Swedish & aromatherapy — tailored every time.
                    </p>
                  </div>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={56}
                    height={56}
                    priority
                    unoptimized
                    className="h-[52px] w-[52px] shrink-0 opacity-95 drop-shadow-[0_0_16px_rgba(197,165,86,0.35)]"
                  />
                </div>
                <ul className="relative z-10 mt-5 flex min-h-0 flex-1 flex-col gap-y-3 border-t border-gold-premium/20 pt-4">
                  {services.map((s) => (
                    <li
                      key={s.slug}
                      className="flex items-center justify-between gap-3 border-b border-gold-premium/10 py-2.5 last:border-b-0"
                    >
                      <span className="flex min-w-0 flex-1 items-baseline gap-1.5">
                        <span className="truncate font-serif text-[11px] font-medium leading-tight text-neutral-light">
                          {s.name}
                        </span>
                        {s.featured ? (
                          <span className="shrink-0 text-[6.5px] font-sans font-bold uppercase tracking-wider text-gold-premium">
                            Signature
                          </span>
                        ) : null}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                        <span className="text-[9px] text-neutral-gray">{s.duration} min</span>
                        <span className="font-serif text-[12px] leading-none text-gold-champagne">
                          £{s.price}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="fb-sq-5-coming-soon"
              filename="facebook-square-5-coming-soon"
              title="5 — Coming soon"
              note="Teaser post — edit the subline in code or pair with a caption for dates."
              dimensions={{ width: SQ, height: SQ }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-purple-royal via-purple-deep to-[#2a1f3d] px-10 py-12 text-center">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(197,165,86,0.15) 0%, transparent 55%)",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-premium">
                    {name}
                  </p>
                  <p className="mt-8 font-serif text-[48px] font-semibold leading-[0.95] tracking-tight text-neutral-light">
                    Coming
                    <br />
                    <span className="text-gold-champagne">soon</span>
                  </p>
                  <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-premium to-transparent" />
                  <p className="mt-6 max-w-[320px] text-[14px] leading-relaxed text-neutral-gray">
                    Something new is taking shape at our {address.city} studio. Stay tuned — we&apos;ll share
                    more here soon.
                  </p>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={72}
                    height={72}
                    priority
                    unoptimized
                    className="mt-10 h-[72px] w-[72px] opacity-95 drop-shadow-[0_0_20px_rgba(197,165,86,0.38)]"
                  />
                  <p className="mt-6 text-[10px] tracking-wide text-gold-premium/85">
                    {url.replace(/^https?:\/\//, "")}
                  </p>
                </div>
              </div>
            </DownloadableGraphic>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-premium">
            Landscape — link preview style & events
          </h2>
          <div className="flex flex-col gap-14">
            <DownloadableGraphic
              id="fb-land-6-hero"
              filename="facebook-landscape-6-hero-strip"
              title="6 — Hero strip"
              note="Works for event headers or shared links."
              dimensions={{ width: LAND_W, height: LAND_H }}
            >
              <div className="relative flex h-full w-full overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/therapist-hero.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    className="object-cover object-[72%_30%]"
                    sizes="600px"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(32,21,46,0.92) 0%, rgba(44,30,66,0.75) 50%, rgba(122,80,176,0.45) 100%)",
                    }}
                  />
                  <div aria-hidden className="noise absolute inset-0" />
                </div>
                <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 px-8">
                  <div className="min-w-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                      Massage therapy · {address.city}
                    </p>
                    <p className="mt-1 font-serif text-[22px] font-semibold leading-tight text-neutral-light">
                      {name}
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-gray">{url.replace(/^https?:\/\//, "")}</p>
                  </div>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={72}
                    height={72}
                    priority
                    unoptimized
                    className="h-[72px] w-[72px] shrink-0 drop-shadow-[0_0_16px_rgba(197,165,86,0.35)]"
                  />
                </div>
              </div>
            </DownloadableGraphic>

            <DownloadableGraphic
              id="fb-land-7-gold-bar"
              filename="facebook-landscape-7-gold-bar"
              title="7 — Gold bar announcement"
              note="Bold date or offer line in the gold band."
              dimensions={{ width: LAND_W, height: LAND_H }}
            >
              <div className="relative flex h-full w-full flex-col bg-purple-royal">
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                <div className="relative z-10 flex h-[38%] items-center justify-center bg-gradient-to-r from-gold-premium via-gold-champagne to-gold-premium px-6">
                  <p className="text-center font-serif text-[20px] font-semibold leading-tight text-on-gold">
                    Meet {owner.name} · {owner.title}
                  </p>
                </div>
                <div className="relative z-10 flex flex-1 flex-col justify-center px-8">
                  <p className="font-serif text-[17px] font-medium text-neutral-light">{name}</p>
                  <p className="mt-2 max-w-[420px] text-[11px] leading-relaxed text-neutral-gray">
                    {siteConfig.description}
                  </p>
                  <p className="mt-3 text-[10px] font-medium text-gold-premium">
                    Book through Fresha
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
