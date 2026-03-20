import type { Metadata } from "next";
import Link from "next/link";

import { FacebookGraphicBuilder } from "@/components/marketing/facebook-graphic-builder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Facebook graphic builder",
  description: "Create customised square Facebook feed graphics from Aurelian Massage brand defaults.",
  robots: { index: false, follow: false },
};

export default function FacebookBuilderPage() {
  const { name, tagline, address, bookingUrl, url } = siteConfig;
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const line1 = nameWords[0] ?? name;
  const line2 = nameWords.slice(1).join(" ");

  const defaults = {
    eyebrow: address.city,
    line1,
    line2,
    body: tagline,
    ctaLabel: "Book through Fresha",
    ctaHref: bookingUrl,
    urlDisplay: url.replace(/^https?:\/\//, ""),
  };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Facebook graphic builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Compose a <strong className="text-neutral-light">540×540px</strong> square (half of 1080×1080). Copy
            defaults from your site config, then edit text, toggles, and background.{" "}
            <strong className="text-neutral-light">Download PNG</strong> exports at 2× for crisp Facebook uploads.
            Static templates without editing live on{" "}
            <Link href="/facebook" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /facebook
            </Link>
            .
          </p>
          <p className="text-sm text-neutral-gray">
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
          </p>
        </header>

        <FacebookGraphicBuilder defaults={defaults} />
      </div>
    </div>
  );
}
