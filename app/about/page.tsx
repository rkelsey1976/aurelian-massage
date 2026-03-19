import Image from "next/image";
import Link from "next/link";
import { UserCheck, Sparkles, MapPin, Heart } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Aurelian Massage",
  description:
    "Learn about Aurelian Massage in Bath — our philosophy, our specialist therapists, and why we believe every session should be uniquely tailored to you.",
  path: "/about",
  keywords: [
    "about Aurelian Massage",
    "massage therapist Bath",
    "holistic therapy Bath",
    "remedial massage Bath",
  ],
});

const values = [
  {
    icon: UserCheck,
    title: "Specialist Therapists",
    body: "Every therapist at Aurelian Massage is trained in a range of remedial and holistic techniques. We combine clinical knowledge with a deeply intuitive touch to deliver treatments that are both effective and profoundly relaxing.",
  },
  {
    icon: Sparkles,
    title: "Individually Tailored",
    body: "No two bodies are the same, and no two sessions should be either. Before every treatment we take time to understand how you are feeling on the day and adapt every technique, pressure, and pace to suit you.",
  },
  {
    icon: MapPin,
    title: "Bath City Centre",
    body: "Our studio is nestled in the heart of Bath — one of England's most beautiful cities and a place with a deep, centuries-old connection to the healing power of water and rest. We are easy to reach whether you live locally or are visiting.",
  },
  {
    icon: Heart,
    title: "Beyond the Physical",
    body: "We believe that true restoration is more than muscular release. Every session is designed to quieten the mind as much as ease the body, creating a genuine space for recovery and renewal.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
        <Image
          src="/hot-stones.png"
          alt="Hot stone massage therapy at Aurelian Massage, Bath city centre"
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
              "linear-gradient(135deg, rgba(32,21,46,0.94) 0%, rgba(60,38,96,0.78) 55%, rgba(32,21,46,0.90) 100%)",
          }}
        />
        {/* Gold ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #C5A556, transparent)" }}
        />
        {/* Grain */}
        <div aria-hidden="true" className="noise absolute inset-0" />
        {/* Vignette */}
        <div aria-hidden="true" className="vignette absolute inset-0" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:py-28">
          {/* Left — content */}
          <div className="flex flex-col justify-center">
            {/* Logo on mobile (desktop has it on the right) */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Image
                src="/logo.svg"
                alt="Aurelian Massage logo"
                width={200}
                height={200}
                className="h-auto w-full max-w-[200px] drop-shadow-[0_0_40px_rgba(197,165,86,0.35)]"
                priority
              />
            </div>
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
              <li className="text-neutral-mid/80">About</li>
            </ol>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
            Our story
          </p>

          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-gold-champagne sm:text-6xl">
            About Aurelian Massage
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            Inspired by the Latin <em className="text-gold-accent/80">Aureus</em> — meaning golden — Aurelian
            Massage was founded on the belief that exceptional massage therapy
            should be accessible in the heart of Bath.
          </p>
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

      {/* ── Story section ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Who we are
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-gold-champagne">
              A modern sanctuary in a historic city
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-neutral-mid">
              <p>
                Bath has long been a place associated with healing, restoration, and
                the pursuit of wellbeing. From the Roman Baths to its Georgian spa
                culture, the city carries a tradition of care that we are proud to
                continue at Aurelian Massage.
              </p>
              <p>
                Our studio offers a calm, unhurried environment where specialist
                therapists deliver treatments that are both clinically informed and
                deeply personal. We work with a range of Swedish, remedial, and
                aromatherapy techniques — not because we follow a fixed menu, but
                because every client deserves a session shaped entirely around them.
              </p>
              <p>
                Whether you are managing chronic tension, recovering from travel,
                seeking relief from daily stress, or simply making time for yourself,
                we are here to help you feel genuinely restored.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                style={{ background: "#C5A556", boxShadow: "0 0 20px rgba(197,165,86,0.25)" }}
              >
                Explore treatments
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold-accent/40 px-7 py-3 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent/70 hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Image panel */}
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: "420px" }}>
            <Image
              src="/aromatherapy-oil.png"
              alt="Aromatherapy massage treatment at Aurelian Massage in Bath, Somerset"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl"
              style={{ border: "1px solid rgba(197,165,86,0.20)" }}
            />
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div
        className="py-16 lg:py-20"
        style={{ background: "#2C1E42", borderTop: "1px solid rgba(122,80,176,0.20)", borderBottom: "1px solid rgba(122,80,176,0.20)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            What we stand for
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-gold-champagne">
            Our approach to every session
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 rounded-2xl p-6"
                style={{
                  background: "rgba(32,21,46,0.50)",
                  border: "1px solid rgba(122,80,176,0.20)",
                }}
              >
                <div
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gold-accent"
                  style={{ background: "rgba(197,165,86,0.10)", border: "1px solid rgba(197,165,86,0.22)" }}
                >
                  <v.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-neutral-light">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-mid">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
          Ready to experience it?
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-semibold text-gold-champagne">
          Book your first treatment today
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-neutral-mid">
          Use code <span className="font-semibold text-gold-accent">WELCOME10</span> for 10% off your first
          session. One use per customer.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          style={{ background: "#C5A556", boxShadow: "0 0 24px rgba(197,165,86,0.30)" }}
        >
          Book a treatment
        </Link>
      </div>
    </>
  );
}
