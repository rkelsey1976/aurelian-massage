import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, PoundSterling, ArrowLeft, CalendarCheck, CheckCircle2, Sparkles } from "lucide-react";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { buildFaqSchema } from "@/lib/faqs";
import { buildServicePageSchema, createPageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.name,
    description: service.description.slice(0, 160),
    path: `/services/${service.slug}`,
    keywords: [
      `${service.name} Bath`,
      `${service.name.toLowerCase()} Bath city centre`,
      "massage therapy Bath",
      "Aurelian Massage",
    ],
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const { name, duration, price, description, image, gradient, featured, idealFor, benefits, faqs } =
    service;

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "460px" }}>
        <Image
          src={image}
          alt={`${name} massage treatment at Aurelian Massage, Bath city centre`}
          fill
          sizes="100vw"
          className="object-cover object-center grayscale"
          priority
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: gradient }} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(32,21,46,0.30) 0%, rgba(32,21,46,0.85) 100%)",
          }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-neutral-mid/70 transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent rounded"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All treatments
            </Link>
          </nav>

          {featured && (
            <span
              className="mb-4 inline-block w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-dark"
              style={{ background: "#C5A556" }}
            >
              Signature treatment
            </span>
          )}

          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-neutral-light sm:text-5xl lg:text-6xl">
            {name}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-neutral-light backdrop-blur-sm">
              <Clock size={14} aria-hidden="true" />
              {duration} minutes
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-purple-dark"
              style={{ background: "#C5A556" }}
            >
              <PoundSterling size={14} aria-hidden="true" />
              {price}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

          {/* Main content */}
          <div className="space-y-14">

            {/* About */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
                About this treatment
              </p>
              <p className="mt-5 text-lg leading-9 text-neutral-mid">
                {description}
              </p>
            </div>

            {/* Ideal for & Benefits — two columns */}
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Ideal for */}
              <div
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(32,21,46,0.55)",
                  border: "1px solid rgba(197,165,86,0.18)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gold-accent"
                    style={{ background: "rgba(197,165,86,0.12)", border: "1px solid rgba(197,165,86,0.2)" }}
                  >
                    <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-neutral-light">
                    Ideal for
                  </h2>
                </div>
                <ul className="space-y-3">
                  {idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-mid">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-purple-dark"
                        style={{ background: "#C5A556" }}
                      >
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(32,21,46,0.55)",
                  border: "1px solid rgba(197,165,86,0.18)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gold-accent"
                    style={{ background: "rgba(197,165,86,0.12)", border: "1px solid rgba(197,165,86,0.2)" }}
                  >
                    <CheckCircle2 size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-neutral-light">
                    Key benefits
                  </h2>
                </div>
                <ul className="space-y-3">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-mid">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-purple-dark"
                        style={{ background: "#C5A556" }}
                      >
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to expect */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-neutral-light">
                What to expect
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "A brief consultation before your session to discuss your needs and any areas of concern.",
                  "A treatment fully adapted to your body on the day — pressure, pace, and focus are all adjusted to suit you.",
                  "High-quality massage oils selected for your skin and comfort.",
                  "A calm, private treatment room in the heart of Bath city centre.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-mid">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-purple-dark"
                      style={{ background: "#C5A556" }}
                    >
                      ✦
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside>
            <div
              className="sticky top-8 rounded-2xl p-7"
              style={{
                background: "rgba(32,21,46,0.7)",
                border: "1px solid rgba(197,165,86,0.22)",
                boxShadow: "0 8px 32px rgba(32,21,46,0.5)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
                Book this treatment
              </p>
              <p className="mt-4 font-serif text-xl font-semibold leading-snug text-neutral-light">
                {name}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-mid">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-gold-accent" aria-hidden="true" />
                  {duration} minutes
                </span>
                <span className="flex items-center gap-2">
                  <PoundSterling size={14} className="text-gold-accent" aria-hidden="true" />
                  £{price}
                </span>
              </div>
              <div className="mt-7 h-px bg-gold-accent/15" />
              <Link
                href={`/contact?service=${service.slug}`}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
                style={{
                  background: "#C5A556",
                  boxShadow: "0 0 20px rgba(197,165,86,0.25)",
                }}
              >
                <CalendarCheck size={16} aria-hidden="true" />
                Book now
              </Link>
              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-gold-accent/65 py-3.5 text-sm font-medium text-neutral-mid transition-all duration-300 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark"
              >
                Ask a question
              </Link>
            </div>
          </aside>
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              Common questions
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-neutral-light">
              About this treatment
            </h2>
            <div className="mt-8">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        )}

        {/* Related treatments */}
        {related.length > 0 && (
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
              You may also like
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-neutral-light">
              Other treatments
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
                  style={{ border: "1px solid rgba(197,165,86,0.18)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0" style={{ background: s.gradient }} />
                  </div>
                  <div className="p-5" style={{ background: "rgba(32,21,46,0.85)" }}>
                    <p className="font-serif text-base font-semibold text-neutral-light transition-colors group-hover:text-gold-accent">
                      {s.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-mid/70">
                      {s.duration} min · £{s.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServicePageSchema(service)) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
        />
      )}
    </>
  );
}
