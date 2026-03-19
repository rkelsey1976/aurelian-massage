import Image from "next/image";
import Link from "next/link";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Products We Use | Aurelian Massage, Bath",
  description:
    "At Aurelian Massage in Bath we use premium aromatherapy oils from Neal's Yard Remedies and professional massage waxes from Songbird Naturals — organic, cruelty-free, and made in the UK.",
  path: "/products",
  keywords: [
    "Neal's Yard Remedies massage oils Bath",
    "Songbird massage wax Bath",
    "organic massage products Bath",
    "professional massage oils Bath",
  ],
});

const products = [
  {
    brand: "Neal's Yard Remedies",
    tagline: "Luxury Organic Aromatherapy Oils",
    icon: Leaf,
    image: "/aromatherapy-oil.png",
    description:
      "We use carefully selected aromatherapy oils from Neal's Yard Remedies — a British wellness brand rooted in natural and organic botanical expertise. Founded in Covent Garden in 1981, Neal's Yard builds each product with ethically sourced herbs, botanicals and essential oils, handcrafted in small batches in England.",
    highlights: [
      "Certified organic and cruelty-free",
      "Ethically sourced botanicals and essential oils",
      "Handcrafted in small batches in England",
      "Eco-conscious packaging that protects potency",
      "Formulated to support relaxation, balance and mood",
    ],
    accentColor: "rgba(46,120,60,0.12)",
    borderColor: "rgba(46,120,60,0.25)",
    iconColor: "#4a9e5c",
  },
  {
    brand: "Songbird Naturals",
    tagline: "Professional Massage Waxes",
    icon: Sparkles,
    image: "/spa-setup.png",
    description:
      "In addition to oils, we use high-performance massage waxes from Songbird Naturals — including the Songbird Relaxation Massage Wax. These semi-solid waxes melt smoothly on contact with skin, providing excellent control and glide for deeper work while remaining clean and waste-free.",
    highlights: [
      "Made in the UK with natural ingredients",
      "Melts on contact with skin for effortless glide",
      "Excellent control for precise, deeper work",
      "Clean application with no waste",
      "Trusted by massage professionals across the UK",
    ],
    accentColor: "rgba(197,165,86,0.10)",
    borderColor: "rgba(197,165,86,0.25)",
    iconColor: "#C5A556",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <Image
          src="/back-massage.png"
          alt="Premium massage oils and professional products used at Aurelian Massage, Bath"
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
              "linear-gradient(135deg, rgba(32,21,46,0.95) 0%, rgba(60,38,96,0.80) 55%, rgba(32,21,46,0.92) 100%)",
          }}
        />
        <div aria-hidden="true" className="noise absolute inset-0" />
        <div aria-hidden="true" className="vignette absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-neutral-mid/50">
              <li>
                <Link href="/" className="rounded transition-colors hover:text-gold-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-mid/30">›</li>
              <li className="text-neutral-mid/80">Products</li>
            </ol>
          </nav>

          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
            <ShieldCheck size={13} strokeWidth={1.5} aria-hidden="true" />
            What we use
          </p>

          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight text-neutral-light sm:text-6xl">
            Products We Use
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-mid">
            We only choose products that support your wellbeing and contribute to
            a truly luxurious experience — premium, natural, and made with care.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: "linear-gradient(to bottom, transparent, #20152E)" }}
        />
      </div>

      {/* ── Product cards ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="space-y-16">
          {products.map((product, i) => (
            <article
              key={product.brand}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Text */}
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: product.accentColor, border: `1px solid ${product.borderColor}` }}
                  >
                    <product.icon size={20} strokeWidth={1.5} aria-hidden="true" style={{ color: product.iconColor }} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: product.iconColor }}>
                    {product.tagline}
                  </p>
                </div>

                <h2 className="mt-4 font-serif text-3xl font-semibold text-neutral-light">
                  {product.brand}
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-mid">
                  {product.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {product.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-6 text-neutral-mid">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: product.iconColor }}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{ minHeight: "380px", border: `1px solid ${product.borderColor}` }}
              >
                <Image
                  src={product.image}
                  alt={`${product.brand} products used at Aurelian Massage`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div
        className="py-12"
        style={{ background: "#2C1E42", borderTop: "1px solid rgba(122,80,176,0.20)", borderBottom: "1px solid rgba(122,80,176,0.20)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            {[
              { label: "Organic & Natural", detail: "No synthetic fragrances or harsh chemicals" },
              { label: "Cruelty-Free", detail: "Ethically produced, never tested on animals" },
              { label: "Made in the UK", detail: "Both brands are proudly British" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-sm font-semibold text-gold-accent">{item.label}</p>
                <p className="text-xs text-neutral-mid/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-accent">
          Experience it for yourself
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-semibold text-neutral-light">
          Ready to feel the difference?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-neutral-mid">
          Every product we use is chosen to elevate your experience. Book a treatment
          and feel the quality for yourself.
        </p>
        <Link
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-purple-dark transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent"
          style={{ background: "#C5A556", boxShadow: "0 0 24px rgba(197,165,86,0.30)" }}
        >
          Book a treatment
        </Link>
      </div>
    </>
  );
}
