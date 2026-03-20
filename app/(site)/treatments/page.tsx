import Image from "next/image";
import Link from "next/link";
import { Clock, PoundSterling, Sparkles } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = createPageMetadata({
  title: "Massage Treatments in Bath",
  description:
    "Browse all massage treatments at Aurelian Massage in Bath city centre. From a 30-minute shoulder release to a 90-minute ultimate relaxation — every session is individually tailored.",
  path: "/treatments",
  keywords: [
    "massage treatments Bath",
    "Swedish massage Bath",
    "aromatherapy massage Bath",
    "deep tissue massage Bath",
  ],
});

const stats = [
  { value: "7", label: "Treatments" },
  { value: "30–90", label: "Minutes" },
  { value: "From £30", label: "Per session" },
];

export default function TreatmentsPage() {
  const menuOrder = [...services].sort(
    (a, b) => a.duration - b.duration || a.price - b.price || a.name.localeCompare(b.name),
  );

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Background image */}
        <Image
          src="/back-massage.png"
          alt="Professional massage therapy treatments at Aurelian Massage, Bath city centre"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Layered overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(32,21,46,0.92) 0%, rgba(60,38,96,0.80) 55%, rgba(32,21,46,0.88) 100%)",
          }}
        />
        {/* Purple ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7A50B0, transparent)" }}
        />
        {/* Grain */}
        <div aria-hidden="true" className="noise absolute inset-0" />
        {/* Vignette */}
        <div aria-hidden="true" className="vignette absolute inset-0" />

        {/* Content */}
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
              <li className="text-neutral-mid/80">Treatments</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
            Aurelian Massage · Bath City Centre
          </p>

          {/* H1 */}
          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-gold-champagne sm:text-6xl lg:text-7xl">
            Our Treatments
          </h1>

          {/* Strapline */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            Every session at Aurelian Massage is individually tailored to your
            body&apos;s needs — from a focused 30-minute release to a deeply
            immersive 90-minute journey.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-px overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(197,165,86,0.20)" }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-1 flex-col items-center justify-center px-8 py-5 text-center ${
                  i < stats.length - 1 ? "border-r border-gold-accent/20" : ""
                }`}
                style={{ background: "rgba(32,21,46,0.60)", backdropFilter: "blur(8px)" }}
              >
                <span className="font-serif text-2xl font-semibold text-gold-champagne">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-mid/60">
                  {stat.label}
                </span>
              </div>
            ))}
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

        {/* Bottom fade into page */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: "linear-gradient(to bottom, transparent, #20152E)",
          }}
        />
      </div>

      {/* ── Treatments grid ── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
          All treatments
        </p>
        <p className="mt-3 max-w-xl text-lg leading-8 text-neutral-mid">
          Choose the session that is right for you, or{" "}
          <Link
            href="/contact"
            className="text-gold-accent underline-offset-4 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent rounded"
          >
            speak to us
          </Link>{" "}
          and we will help you decide.
        </p>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            Full treatment list
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-mid">
            Durations and prices at a glance. Select a treatment for full details and FAQs.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-gold-accent/20 bg-[#2C1E42]/60 shadow-[0_4px_24px_rgba(32,21,46,0.45)]">
            <table className="w-full min-w-[300px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Full Aurelian Massage treatment menu: name, duration, and price per session
              </caption>
              <thead>
                <tr className="border-b border-gold-accent/25 bg-purple-deep/90">
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-accent"
                  >
                    Treatment
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-accent"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-gold-accent"
                  >
                    <span className="inline-flex items-center gap-1">
                      <PoundSterling size={12} strokeWidth={2} aria-hidden="true" />
                      Price
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-neutral-mid">
                {menuOrder.map((service) => (
                  <tr
                    key={service.slug}
                    className="border-b border-gold-accent/10 transition-colors last:border-b-0 hover:bg-purple-deep/40"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/treatments/${service.slug}`}
                        className="group inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                      >
                        <span className="font-serif font-medium text-neutral-light underline-offset-4 group-hover:text-gold-champagne group-hover:underline">
                          {service.name}
                        </span>
                        {service.featured ? (
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold-accent">
                            Signature
                          </span>
                        ) : null}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-neutral-mid/90">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} strokeWidth={1.5} aria-hidden="true" />
                        {service.duration} min
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-serif text-base font-semibold text-gold-accent">
                      £{service.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-mid/70">
            Prices are per session unless stated otherwise. Your therapist adapts pressure and focus on the day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/treatments/${service.slug}`}
              aria-label={`View ${service.name} treatment`}
              className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
              style={{
                border: service.featured
                  ? "1px solid rgba(122,80,176,0.55)"
                  : "1px solid rgba(122,80,176,0.20)",
                boxShadow: service.featured
                  ? "0 8px 32px rgba(32,21,46,0.7), 0 0 0 1px rgba(122,80,176,0.15)"
                  : "0 4px 20px rgba(32,21,46,0.5)",
                background: "#2C1E42",
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image ?? "/hero-massage.png"}
                  alt={`${service.name} treatment at Aurelian Massage, Bath city centre`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: service.gradient }} />
                {service.featured && (
                  <span
                    className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-light"
                    style={{ background: "#7A50B0" }}
                  >
                    Signature
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-mid/70">
                    <Clock size={12} aria-hidden="true" />
                    {service.duration} min
                  </span>
                  <span className="font-serif text-xl font-semibold text-gold-accent">
                    <span className="sr-only">Price: </span>£{service.price}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-lg font-semibold leading-snug text-neutral-light transition-colors group-hover:text-gold-champagne">
                  {service.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-mid line-clamp-3">
                  {service.description}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-accent">
                  View treatment
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
