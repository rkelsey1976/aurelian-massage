import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, CalendarCheck, Sparkles } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";

export const metadata = createPageMetadata({
  title: "Book a Treatment",
  description:
    "Book a massage treatment at Aurelian Massage in Bath city centre. Contact us by phone or email, or use the enquiry form and we will get back to you promptly.",
  path: "/contact",
  keywords: [
    "book massage Bath",
    "contact Aurelian Massage",
    "massage appointment Bath",
    "book massage therapy Bath",
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

        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 py-20 lg:py-28">
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
            Book a Treatment
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            Ready to experience the golden standard in massage therapy? Get in
            touch and we will arrange your session — individually tailored to
            your body&apos;s needs.
          </p>

          {/* Quick contact pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-accent/35 px-5 py-2.5 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              <Phone size={14} aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-accent/35 px-5 py-2.5 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              <Mail size={14} aria-hidden="true" />
              {siteConfig.email}
            </a>
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

          {/* ── Enquiry form ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Send an enquiry
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-gold-champagne">
              Request your appointment
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-mid">
              Fill in the form below and we will get back to you within one
              business day to confirm your booking.
            </p>

            <form
              className="mt-8 space-y-5"
              action="mailto:hello@aurelianmassage.co.uk"
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
                <label htmlFor="treatment" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Treatment of interest
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                >
                  <option value="">Not sure yet</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name} — {s.duration} min · £{s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Anything we should know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal resize-none"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                  placeholder="Any health considerations, preferred times, or questions for us…"
                />
              </div>

              <div>
                <label htmlFor="discount" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-mid/70">
                  Discount code
                </label>
                <input
                  id="discount"
                  name="discount"
                  type="text"
                  className="w-full rounded-xl px-4 py-3 text-sm text-neutral-light placeholder-neutral-mid/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-purple-royal"
                  style={{
                    background: "#2C1E42",
                    border: "1px solid rgba(122,80,176,0.30)",
                  }}
                  placeholder="e.g. WELCOME10"
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
                <CalendarCheck size={16} aria-hidden="true" />
                Send enquiry
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

            {/* Discount reminder */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(44,30,66,0.80) 0%, rgba(92,61,136,0.40) 100%)",
                border: "1px solid rgba(197,165,86,0.25)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-accent">
                New client offer
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold text-gold-champagne">
                WELCOME10
              </p>
              <p className="mt-2 text-xs text-neutral-mid/60">
                10% off your first treatment. Add the code to your enquiry above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
