import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

import { CountdownClock } from "@/components/marketing/countdown-clock";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Aurelian Massage — Opening May 2026 | Bath City Centre",
  description:
    "Aurelian Massage opens in Bath city centre in May 2026. Swedish and aromatherapy massage treatments at 16 St Peters Terrace. Book your first session now via Fresha.",
  path: "/",
  keywords: [
    "Aurelian Massage Bath",
    "Swedish massage Bath opening",
    "aromatherapy massage Bath 2026",
    "massage therapist Bath city centre",
  ],
});

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">

      {/* Hero background image */}
      <Image
        src="/hero-massage.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(32,21,46,0.92) 0%, rgba(32,21,46,0.80) 50%, rgba(32,21,46,0.90) 100%)",
        }}
      />

      {/* Gold glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(197,165,86,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">

        {/* Logo + Heading row */}
        <div className="mb-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <Link href="/" aria-label={`${siteConfig.name} — Home`}>
            <Image
              src="/logo.svg"
              alt={`${siteConfig.name} logo`}
              width={220}
              height={80}
              className="h-auto w-32 sm:w-44"
              priority
            />
          </Link>

          <div className="text-left">
            {/* Eyebrow */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold-accent/70">
              Bath City Centre · 16 St Peters Terrace
            </p>
            {/* Heading */}
            <h1 className="font-serif text-4xl font-light leading-tight text-neutral-light sm:text-5xl md:text-6xl">
              Opening{" "}
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(90deg, #C5A556 0%, #E8D5A0 50%, #C5A556 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                May 2026
              </span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-5 font-serif text-lg font-light italic leading-relaxed text-neutral-mid/70 sm:text-xl">
          Swedish &amp; Aromatherapy Massage Therapy in Bath
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-24 bg-gold-accent/30" />

        {/* Countdown */}
        <CountdownClock />

        {/* Divider */}
        <div className="my-10 h-px w-24 bg-gold-accent/30" />

        {/* Description */}
        <p className="max-w-lg text-base leading-8 text-neutral-mid/70">
          A modern sanctuary inspired by the timeless healing traditions of the City of Bath.
          Every session individually tailored to your body&apos;s needs.
        </p>

        {/* Book ahead CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
            style={{
              background: "#C5A556",
              boxShadow: "0 0 24px rgba(197,165,86,0.30)",
            }}
          >
            Book in advance via Fresha
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold-accent/40 px-8 py-3.5 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent/70 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          >
            {siteConfig.phone}
          </a>
        </div>

        {/* Social links */}
        <div className="mt-12 flex items-center gap-6">
          {siteConfig.socialProfiles.map((profile) => (
            <a
              key={profile.platform}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profile.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-accent/20 text-neutral-mid/50 transition-all duration-200 hover:border-gold-accent/60 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              {profile.platform === "Instagram" && <Instagram size={18} aria-hidden="true" />}
              {profile.platform === "Facebook" && <Facebook size={18} aria-hidden="true" />}
            </a>
          ))}
        </div>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-6 text-xs text-neutral-mid/40 transition-colors hover:text-gold-accent/70 focus:outline-none focus-visible:underline"
        >
          {siteConfig.email}
        </a>

      </div>
    </main>
  );
}
