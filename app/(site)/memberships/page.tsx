import Link from "next/link";
import { Crown } from "lucide-react";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { membershipFaqs, membershipTiers } from "@/lib/memberships";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Monthly Massage Membership in Bath",
  description:
    "A massage every month for up to 25% less. Aurelian Massage memberships in Bath: Bronze 30 minutes £22.50, Silver 60 minutes £45, Gold 75 minutes £57.",
  path: "/memberships",
  keywords: [
    "massage membership Bath",
    "monthly massage Bath",
    "massage subscription Bath",
    "regular massage Bath",
  ],
});

const steps = [
  { title: "Choose a membership", body: "Bronze, Silver or Gold, depending on how long you like your massage." },
  { title: "Get in touch to join", body: "Tell us which membership you’d like and we’ll set it up with you. You pay monthly." },
  { title: "Book your monthly massage", body: "Pick a time that suits you each month, the same way you book now." },
];

export default function MembershipsPage() {
  const faqs = membershipFaqs.filter((f) => f.answer);

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-luxury">
        <div aria-hidden="true" className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <ol className="flex items-center gap-2 text-xs text-neutral-mid/50">
              <li>
                <Link href="/" className="rounded transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-mid/30">›</li>
              <li className="text-neutral-mid/80">Memberships</li>
            </ol>
          </nav>

          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <Crown size={13} strokeWidth={1.5} aria-hidden="true" />
            Monthly memberships · Bath
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight tracking-tight text-neutral-light sm:text-6xl">
            A massage every month, <em className="text-gold-champagne">for up to 25% less.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            One treatment a month at a member’s price. A little self-care goes a long way, and it’s
            easier to keep up when it’s already booked in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#tiers"
              className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              style={{ background: "#C5A556", boxShadow: "0 0 24px rgba(197,165,86,0.30)" }}
            >
              Choose your membership
            </a>
            <a
              href="#how"
              className="inline-flex items-center rounded-full border border-gold-accent/65 px-8 py-3.5 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              How it works
            </a>
          </div>
        </div>
      </div>

      {/* ── Tiers ── */}
      <section id="tiers" aria-labelledby="tiers-h" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 lg:py-20">
        <h2 id="tiers-h" className="sr-only">Membership options</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <article
              key={tier.id}
              className="flex flex-col gap-4 rounded-3xl p-8 text-center"
              style={{ background: "#2C1E42", border: "1px solid rgba(197,165,86,0.28)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">{tier.name}</p>
              <h3 className="font-serif text-2xl font-semibold text-neutral-light">{tier.minutes}-minute massage</h3>
              <p className="font-serif text-5xl text-gold-champagne">
                {tier.price}
                <span className="ml-1 font-sans text-sm text-neutral-mid">/month</span>
              </p>
              <p className="text-sm text-neutral-mid">
                Usually {tier.usual} · you save {tier.saving} a month
              </p>
              <p className="border-t pt-4 text-sm leading-6 text-neutral-mid" style={{ borderColor: "rgba(197,165,86,0.18)" }}>
                {tier.blurb}{" "}
                <Link href={tier.treatment.href} className="text-gold-accent underline underline-offset-4 hover:text-gold-champagne">
                  {tier.treatment.label}
                </Link>
              </p>
              <Link
                href={`/contact?topic=membership&tier=${tier.id}#contact-form`}
                className="mt-auto rounded-full border border-gold-accent/65 px-6 py-3 text-sm font-semibold text-gold-champagne transition-all duration-200 hover:border-gold-accent hover:bg-gold-accent hover:text-on-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              >
                Choose {tier.name}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-neutral-mid/70">
          Savings are against the standard price of the matching treatment.
        </p>
      </section>

      {/* ── How it works ── */}
      <section
        id="how"
        aria-labelledby="how-h"
        className="scroll-mt-24 py-16 lg:py-20"
        style={{ background: "#2C1E42", borderTop: "1px solid rgba(122,80,176,0.20)", borderBottom: "1px solid rgba(122,80,176,0.20)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">How it works</p>
          <h2 id="how-h" className="mt-4 text-center font-serif text-3xl font-semibold text-neutral-light sm:text-4xl">
            Join once. <em className="text-gold-champagne">Relax every month.</em>
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl p-6" style={{ border: "1px solid rgba(197,165,86,0.22)" }}>
                <p className="font-serif text-3xl text-gold-accent">{i + 1}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-neutral-light">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-mid">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQs (only those Ross has answered) ── */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq-h" className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <h2 id="faq-h" className="text-center font-serif text-3xl font-semibold text-neutral-light">
            Membership questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <div className="rounded-3xl px-6 py-14" style={{ background: "#2C1E42", border: "1px solid #C5A556" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">Your wellbeing matters</p>
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-semibold text-neutral-light">
            Become a member today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-neutral-mid">
            More relaxation · more value · all year round
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?topic=membership#contact-form"
              className="inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold text-on-gold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
              style={{ background: "#C5A556", boxShadow: "0 0 24px rgba(197,165,86,0.30)" }}
            >
              Join now
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-full border border-gold-accent/65 px-8 py-3.5 text-sm font-medium text-neutral-mid transition-all duration-200 hover:border-gold-accent hover:text-gold-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
