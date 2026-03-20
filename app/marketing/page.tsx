import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  IdCard,
  ImageIcon,
  LayoutGrid,
  PanelTop,
  PanelsTopLeft,
  PenLine,
  Share2,
  Sparkles,
  Store,
  Ticket,
} from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Marketing hub",
  description: "Internal links to print and social asset pages for Aurelian Massage.",
  robots: { index: false, follow: false },
};

const assets = [
  {
    href: "/business-card",
    title: "Business cards",
    description: "Print-ready card layout with QR and contact details.",
    icon: IdCard,
  },
  {
    href: "/business-card-builder",
    title: "Business card builder",
    description: "Edit copy & Fresha link — one-sided or two-sided PNG export with bleed + crop marks.",
    icon: PenLine,
  },
  {
    href: "/loyalty-card-builder",
    title: "Loyalty card builder",
    description: "White card, purple header — 4 stamps, $20 off after 4 visits by default, Fresha QR, PNG export.",
    icon: Ticket,
  },
  {
    href: "/treatment-flyer",
    title: "Treatment flyer (A5)",
    description: "Print-ready menu with treatments, QR, and studio details.",
    icon: LayoutGrid,
  },
  {
    href: "/treatment-flyer-builder",
    title: "Treatment flyer builder",
    description: "Edit A5 menu copy, treatment rows, background, booking QR — export PNG.",
    icon: PenLine,
  },
  {
    href: "/facebook",
    title: "Facebook graphics",
    description: "Square and landscape feed assets; Download PNG on each block.",
    icon: Share2,
  },
  {
    href: "/facebook-builder",
    title: "Facebook builder",
    description: "Custom square post — edit copy, layout, background, export PNG.",
    icon: PenLine,
  },
  {
    href: "/facebook-covers",
    title: "Facebook covers",
    description: "Timeline cover frames (820×312 style preview).",
    icon: PanelTop,
  },
  {
    href: "/facebook-cover-builder",
    title: "Facebook cover builder",
    description: "Custom timeline cover — layouts, copy, backgrounds, PNG export.",
    icon: PanelsTopLeft,
  },
  {
    href: "/google-business-cover-builder",
    title: "Google Business cover builder",
    description: "16:9 Business Profile cover — 1024×576 layouts, copy, backgrounds, PNG export.",
    icon: Store,
  },
  {
    href: "/google-business-photos-builder",
    title: "Google Business photos builder",
    description: "Profile logo & listing sizes — 720×720 and 1200×900, captions, PNG export.",
    icon: Camera,
  },
  {
    href: "/instagram",
    title: "Instagram graphics",
    description: "Square, 4:5 portrait, and 9:16 story templates with PNG export.",
    icon: ImageIcon,
  },
] as const;

export default function MarketingHubPage() {
  const { name } = siteConfig;

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4 border-b border-gold-premium/20 pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-premium/25 bg-purple-deep/80 text-gold-premium">
              <Sparkles size={18} strokeWidth={1.5} aria-hidden />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-light">
                Marketing hub
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-gray">
                Quick access to <strong className="text-neutral-light">{name}</strong> asset pages — cards,
                flyers, and social templates. These URLs are hidden from search; bookmark this page for the
                team.
              </p>
            </div>
          </div>
        </header>

        <nav aria-label="Marketing asset pages">
          <ul className="space-y-3">
            {assets.map(({ href, title, description, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex gap-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 px-5 py-4 transition hover:border-gold-premium/35 hover:bg-purple-deep/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold-premium/20 bg-purple-royal/80 text-gold-premium transition group-hover:border-gold-premium/40">
                    <Icon size={20} strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-serif text-lg font-medium text-neutral-light group-hover:text-gold-champagne">
                      {title}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 opacity-50 transition group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-neutral-gray">{description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="border-t border-gold-premium/15 pt-8 text-sm text-neutral-gray">
          <p>
            Customer-facing site:{" "}
            <Link
              href="/"
              className="font-medium text-gold-premium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-premium rounded"
            >
              Home
            </Link>
            {" · "}
            <Link
              href="/treatments"
              className="font-medium text-gold-premium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-premium rounded"
            >
              Treatments
            </Link>
            {" · "}
            <Link
              href="/contact"
              className="font-medium text-gold-premium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-premium rounded"
            >
              Contact
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
