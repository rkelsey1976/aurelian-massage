import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Facebook cover designs",
  description: "On-brand cover art for Facebook — screenshot each 820×312 block.",
  robots: { index: false, follow: false },
};

/** Facebook displays covers at 820×312 CSS px on desktop. */
const COVER_W = 820;
const COVER_H = 312;

function CoverDownload({
  id,
  filename,
  title,
  note,
  children,
}: {
  id: string;
  filename: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <DownloadableGraphic
      id={id}
      filename={filename}
      title={title}
      note={
        note ??
        `${COVER_W}×${COVER_H}px Facebook desktop cover. Download PNG exports at 2× pixel density for a crisp upload.`
      }
      dimensions={{ width: COVER_W, height: COVER_H }}
    >
      {children}
    </DownloadableGraphic>
  );
}

export default function FacebookCoversPage() {
  const { name, tagline, url, address } = siteConfig;
  const shortTag =
    "Swedish & aromatherapy massage — Bath city centre";
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const nameFirst = nameWords[0] ?? name;
  const nameRest = nameWords.slice(1).join(" ");

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-[900px] space-y-10">
        <header className="space-y-2 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">
            Facebook cover designs
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-gray">
            Each frame below is{" "}
            <strong className="font-medium text-neutral-light">{COVER_W}×{COVER_H}px</strong>{" "}
            (Facebook’s desktop cover size). Use <strong className="text-neutral-light">Download PNG</strong>{" "}
            on each design for a quick export (2× pixel density). You can still screenshot at 100% zoom if
            you prefer — note Facebook’s profile photo overlaps the{" "}
            <strong className="font-medium text-neutral-light">lower left</strong>; these designs keep the
            main copy <strong className="font-medium text-neutral-light">centred vertically</strong> and{" "}
            <strong className="font-medium text-neutral-light">left aligned</strong>.
          </p>
          <p className="text-sm text-neutral-gray">
            Build your own copy and background on{" "}
            <Link
              href="/facebook-cover-builder"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              /facebook-cover-builder
            </Link>
            .
          </p>
        </header>

        <div className="flex flex-col gap-16">
          {/* 1 — Hero-style luxury gradient */}
          <CoverDownload
            id="fb-cover-1-luxury-gradient"
            filename="facebook-cover-1-luxury-gradient"
            title="1 — Luxury gradient (matches site hero)"
          >
            <div className="relative flex h-full w-full items-center justify-start bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660] pl-10 pr-6">
              <div
                aria-hidden
                className="noise pointer-events-none absolute inset-0 opacity-100"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 0% 50%, rgba(122,80,176,0.35) 0%, transparent 55%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 35%, rgba(20, 12, 32, 0.5) 100%)",
                }}
              />
              <div className="relative z-10 max-w-[480px] text-left">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-gold-premium">
                  Massage therapy
                </p>
                <p className="font-serif text-[32px] font-semibold leading-tight tracking-tight text-neutral-light">
                  {name}
                </p>
                <p className="mt-2 font-serif text-[13px] font-light italic text-neutral-light/85">
                  {address.city} · {address.region}
                </p>
                <div className="mr-auto mt-4 h-px w-32 bg-gradient-to-r from-gold-premium to-transparent" />
                <p className="mt-3 text-[11px] leading-snug text-neutral-gray">{shortTag}</p>
              </div>
            </div>
          </CoverDownload>

          {/* 2 — Gold headline bar */}
          <CoverDownload
            id="fb-cover-2-gold-bar"
            filename="facebook-cover-2-gold-bar"
            title="2 — Gold bar + deep purple"
          >
            <div className="relative flex h-full w-full flex-col bg-purple-royal">
              <div
                aria-hidden
                className="noise pointer-events-none absolute inset-0 opacity-100"
              />
              <div className="relative z-10 flex h-[88px] shrink-0 items-center justify-center bg-gradient-to-r from-gold-premium via-gold-champagne to-gold-premium px-6">
                <p className="text-center font-serif text-[26px] font-semibold leading-tight text-on-gold">
                  {name}
                </p>
              </div>
              <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-12 pb-6 pt-5 text-left">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-premium">
                  {address.city} city centre
                </p>
                <p className="mt-2 max-w-md font-serif text-[15px] font-light italic leading-snug text-neutral-light/90">
                  {tagline}
                </p>
                <p className="mt-4 text-[11px] text-neutral-gray">{url.replace("https://", "")}</p>
              </div>
            </div>
          </CoverDownload>

          {/* 3 — Minimal wordmark */}
          <CoverDownload
            id="fb-cover-3-minimal-wordmark"
            filename="facebook-cover-3-minimal-wordmark"
            title="3 — Minimal wordmark"
          >
            <div className="relative flex h-full w-full items-center justify-start bg-purple-deep pl-14 pr-6">
              <div
                aria-hidden
                className="noise pointer-events-none absolute inset-0 opacity-100"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(197,165,86,0.04) 1px, rgba(197,165,86,0.04) 2px)",
                }}
              />
              <div className="relative z-10 text-left">
                <p className="font-serif text-[42px] font-semibold leading-none tracking-tight text-neutral-light">
                  Aurelian
                </p>
                <p className="mt-1 font-serif text-[42px] font-light leading-none tracking-tight text-gold-champagne">
                  Massage
                </p>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                  Bath
                </p>
              </div>
            </div>
          </CoverDownload>

          {/* 4 — Logo + hero photo (matches homepage hero) */}
          <CoverDownload
            id="fb-cover-4-logo-spotlight"
            filename="facebook-cover-4-logo-spotlight"
            title="4 — Logo spotlight"
          >
            <div className="relative flex h-full w-full items-center justify-start overflow-hidden pl-4 pr-0">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-18%] bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/therapist-hero.png')",
                  /* Higher X% shifts anchor right → subject reads further left in the frame */
                  backgroundPosition: "72% 30%",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(32,21,46,0.94) 0%, rgba(44,30,66,0.9) 38%, rgba(72,48,112,0.84) 68%, rgba(92,61,136,0.76) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(32,21,46,0.55) 0%, transparent 62%)",
                }}
              />
              <div aria-hidden className="noise pointer-events-none absolute inset-0" />
              <div aria-hidden className="vignette pointer-events-none absolute inset-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full opacity-12 blur-3xl"
                style={{ background: "radial-gradient(circle, #c5a556 0%, transparent 70%)" }}
              />
              <div className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center">
                <div className="shrink-0 pr-[288px] text-left">
                  <p className="font-serif text-[42px] font-semibold leading-none tracking-tight text-neutral-light">
                    {nameFirst}
                  </p>
                  {nameRest ? (
                    <p className="mt-1 font-serif text-[42px] font-light leading-none tracking-tight text-gold-champagne">
                      {nameRest}
                    </p>
                  ) : null}
                  <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                    {address.city}
                  </p>
                </div>
                <div className="pointer-events-none absolute right-0 top-1/2 z-[11] -translate-y-1/2 translate-x-5">
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={248}
                    height={248}
                    className="h-[248px] w-[248px] shrink-0 drop-shadow-[0_0_32px_rgba(197,165,86,0.42)]"
                  />
                </div>
              </div>
            </div>
          </CoverDownload>

          {/* 5 — Editorial services line */}
          <CoverDownload
            id="fb-cover-5-editorial-services"
            filename="facebook-cover-5-editorial-services"
            title="5 — Editorial services"
          >
            <div className="relative flex h-full w-full flex-col justify-center bg-purple-royal pl-[148px] pr-10">
              <div
                aria-hidden
                className="noise pointer-events-none absolute inset-0 opacity-100"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-[120px] bg-gradient-to-r from-gold-premium/25 to-transparent"
              />
              <div className="relative z-10">
                <p className="font-serif text-[28px] font-semibold leading-tight text-neutral-light">
                  {name}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-gold-champagne">
                  <span>Swedish</span>
                  <span className="text-gold-premium/60">·</span>
                  <span>Aromatherapy</span>
                  <span className="text-gold-premium/60">·</span>
                  <span>Tailored sessions</span>
                </p>
                <p className="mt-4 max-w-md text-[11px] leading-relaxed text-neutral-gray">
                  {address.street}, {address.city} {address.postalCode}
                </p>
              </div>
            </div>
          </CoverDownload>
        </div>
      </div>
    </div>
  );
}
