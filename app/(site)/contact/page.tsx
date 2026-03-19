import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, CalendarCheck, Send, Sparkles } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Aurelian Massage in Bath city centre. Call, email, or send us a message — we will get back to you promptly. Book treatments online via Fresha.",
  path: "/contact",
  keywords: [
    "contact Aurelian Massage",
    "massage Bath enquiry",
    "Aurelian Massage Bath",
    "massage therapy Bath contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        <Image
          src="/spa-setup.png"
          alt="Luxury massage treatment room at Aurelian Massage, Bath city centre"
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
              "linear-gradient(135deg, rgba(32,21,46,0.95) 0%, rgba(44,30,66,0.82) 55%, rgba(32,21,46,0.92) 100%)",
          }}
        />
        {/* Purple glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7A50B0, transparent)" }}
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
              <li className="text-neutral-mid/80">Contact</li>
            </ol>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
            Aurelian Massage · Bath City Centre
          </p>

          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-gold-champagne sm:text-6xl">
            Get in Touch
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            Have a question about a treatment, or not sure which session is
            right for you? Send us a message and we will get back to you
            promptly. Ready to book? Head straight to Fresha.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-purple-dark transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
              style={{ background: "#C5A556" }}
            >
              <CalendarCheck size={14} aria-hidden="true" />
              Book online via Fresha
            </Link>
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

      {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* ── Contact form ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Send a message
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-gold-champagne">
              How can we help?
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-mid">
              Questions about treatments, availability, or anything else — fill
              in the form below and we will get back to you within one business
              day.
            </p>

            <form
              className="mt-8 space-y-5"
              action="mailto:ross@aurelianmassage.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                    First name <span className="text-gold-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                    style={{
                      background: "#2C1E42",
                      border: "1px solid rgba(122,80,176,0.30)",
                    }}
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                    Last name <span className="text-gold-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                    style={{
                      background: "#2C1E42",
                      border: "1px solid rgba(122,80,176,0.30)",
                    }}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Email address <span className="text-gold-accent" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                  placeholder="+44 7700 000000"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Your message <span className="text-gold-accent" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal resize-none"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                  placeholder="Tell us what you'd like to know — questions about treatments, health considerations, or anything else…"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:scale-[1.02] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
                style={{
                  background: "#C5A556",
                  boxShadow: "0 0 24px rgba(197,165,86,0.30), 0 4px 16px rgba(32,21,46,0.4)",
                }}
              >
                <Send size={16} aria-hidden="true" />
                Send message
              </button>
            </form>
          </div>

          {/* ── Sidebar: info cards ── */}
          <div className="space-y-5 lg:sticky lg:top-24">
            {/* Visit us */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.25)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gold-accent"
                  style={{ background: "rgba(197,165,86,0.10)", border: "1px solid rgba(197,165,86,0.20)" }}
                >
                  <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base font-semibold text-neutral-light">
                  Visit us
                </h3>
              </div>
              <address className="mt-4 space-y-1 not-italic text-sm leading-7 text-neutral-mid">
                <p>{siteConfig.legalName}</p>
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.city}, {siteConfig.address.region}</p>
                <p>{siteConfig.address.postalCode}</p>
              </address>
            </div>

            {/* Call or email */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.25)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-purple-mid"
                  style={{ background: "rgba(122,80,176,0.12)", border: "1px solid rgba(122,80,176,0.28)" }}
                >
                  <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base font-semibold text-neutral-light">
                  Call or email
                </h3>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-neutral-mid transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
                >
                  <Phone size={13} aria-hidden="true" className="text-neutral-mid/40" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-neutral-mid transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
                >
                  <Mail size={13} aria-hidden="true" className="text-neutral-mid/40" />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2C1E42", border: "1px solid rgba(122,80,176,0.25)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-purple-mid"
                  style={{ background: "rgba(122,80,176,0.12)", border: "1px solid rgba(122,80,176,0.28)" }}
                >
                  <Clock size={16} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base font-semibold text-neutral-light">
                  Opening hours
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-mid">
                {siteConfig.openingHours.map((h) => (
                  <li key={h.schema}>{h.label}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-neutral-mid/50">
                We recommend booking in advance to secure your preferred time.
              </p>
            </div>

            {/* Book via Fresha */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(44,30,66,0.80) 0%, rgba(92,61,136,0.40) 100%)",
                border: "1px solid rgba(197,165,86,0.25)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-accent">
                Ready to book?
              </p>
              <p className="mt-2 font-serif text-lg font-semibold text-neutral-light">
                Book online via Fresha
              </p>
              <p className="mt-2 text-xs text-neutral-mid/60">
                Choose your treatment, pick a time, and confirm your appointment instantly.
              </p>
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-purple-dark transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                style={{ background: "#C5A556" }}
              >
                <CalendarCheck size={13} aria-hidden="true" />
                Book now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
