import Image from "next/image";
import Link from "next/link";
import { UserCheck, Sparkles, MapPin, Heart } from "lucide-react";

import { createPageMetadata, buildPersonSchema } from "@/lib/seo";
import { buildFaqSchema } from "@/lib/faqs";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

export const metadata = createPageMetadata({
  title: "Ross — Massage Therapist in Bath",
  description:
    "Meet Ross, the massage therapist behind Aurelian Massage in Bath city centre. Swedish, aromatherapy, deep tissue, hot stone and cupping treatments at 16 St Peters Terrace, Bath.",
  path: "/about",
  keywords: [
    "massage therapist bath",
    "massage therapist in bath",
    "massage therapy in bath",
    "massage therapist near me",
    "massage bath somerset",
    "Ross Aurelian Massage",
    "Swedish massage Bath",
    "Aurelian Massage",
  ],
});

const therapistFaqs = [
  {
    question: "Who is the massage therapist at Aurelian Massage?",
    answer:
      "Ross is the massage therapist behind Aurelian Massage. Every treatment at the studio is delivered by Ross personally, from the initial consultation through to aftercare advice, so you see the same therapist at every visit.",
  },
  {
    question: "What types of massage does Ross offer?",
    answer:
      "Ross offers Swedish massage, aromatherapy massage, deep tissue and sports-style work, hot stone treatments, and myofascial cupping combined with massage. Each session is adapted to your needs on the day, and treatments blend techniques where appropriate.",
  },
  {
    question: "Where is the treatment room in Bath?",
    answer:
      "Aurelian Massage is at 16 St Peters Terrace, Bath, BA2 3BT — a short walk from the city centre, easy to reach whether you live locally or are visiting Bath. Full directions are on the contact page.",
  },
  {
    question: "What do clients say about treatments at Aurelian Massage?",
    answer:
      "Aurelian Massage holds a 5.0 star rating from 65 Google reviews. Clients regularly mention the calm atmosphere, the therapist's skill and attention, and leaving feeling completely relaxed, refreshed, and pain-free.",
  },
  {
    question: "How do I book a session with Ross?",
    answer:
      "All treatments are by appointment only and can be booked online through Fresha using the Book now links on this site. A 25% deposit is taken at the time of booking. If you have a question before booking, use the contact form or email ross@aurelianmassage.com.",
  },
];

const values = [
  {
    icon: UserCheck,
    title: "Expert Technique",
    body: "Every session combines expert Swedish and holistic techniques to deliver treatments that are both effective and deeply relaxing — tailored to exactly what your body needs on the day.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Touches",
    body: "From high-quality oils to a carefully considered environment, every detail is chosen to make you feel truly looked after. Small things make all the difference.",
  },
  {
    icon: MapPin,
    title: "Bath City Centre",
    body: "Based at 16 St Peters Terrace, Bath — the ultimate spa experience without leaving the city. Easy to reach whether you live locally or are visiting.",
  },
  {
    icon: Heart,
    title: "Body, Mind & Spirit",
    body: "Treatments are designed to leave your body restored, your mind calm, and your spirit refreshed — a genuine moment of calm in your day, however you need it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
        <Image
          src="/therapist-hero.png"
          alt="Therapist delivering Swedish massage at Aurelian Massage, Bath city centre"
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
            Meet your therapist
          </p>

          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-neutral-light sm:text-6xl">
            Hi, I&apos;m Ross
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            At Aurelian Massage I create luxurious, personalised massage experiences
            designed to leave your body restored, your mind calm, and your spirit refreshed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/treatments/${s.slug}`}
                className="rounded-full border border-gold-accent/40 px-4 py-1.5 text-xs font-medium text-neutral-mid transition-colors hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              >
                {s.name}
              </Link>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-on-gold" style={{ background: "#C5A556" }}>
              ★ 5.0 · 65 Google reviews
            </span>
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

      {/* ── Story section ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Your therapist in Bath
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-light">
              Massage therapy in the heart of Bath, tailored to you
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-neutral-mid">
              <p>
                I&apos;m Ross, a massage therapist based at 16 St Peters Terrace in Bath
                city centre. Every session I deliver combines expert Swedish and holistic
                techniques with high-quality oils, a soothing environment, and thoughtful
                touches that make you feel truly looked after.
              </p>
              <p>
                Every treatment begins with a brief consultation so the pressure, pace,
                and focus are adapted to your body on the day — whether you&apos;re seeking
                deep relaxation, gentle rejuvenation, or relief from stubborn muscular
                tension.
              </p>
              <p>
                Clients travel from across Bath and Somerset for treatments that feel
                like the ultimate spa experience without leaving the city. Treat yourself,
                unwind, and discover how small, thoughtful details can make all the
                difference.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
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
            What I stand for
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-light">
            My approach to every session
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
        <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-semibold text-neutral-light">
          Book your first treatment today
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-neutral-mid">
          New to Aurelian Massage? Use code{" "}
          <span className="font-semibold text-gold-accent">AURELIAN50</span> for 50% off
          your first session, available from September to January. One use per customer.
        </p>
        <Link
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          style={{ background: "#C5A556", boxShadow: "0 0 24px rgba(197,165,86,0.30)" }}
        >
          Book a treatment
        </Link>
      </div>

      {/* ── FAQ ── */}
      <div
        className="py-16 lg:py-20"
        style={{ background: "#2C1E42", borderTop: "1px solid rgba(122,80,176,0.20)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            Common questions
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-light">
            About your therapist
          </h2>
          <div className="mt-8">
            <FaqAccordion items={therapistFaqs} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(therapistFaqs)) }}
      />
    </>
  );
}
