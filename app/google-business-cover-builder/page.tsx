import type { Metadata } from "next";
import Link from "next/link";

import { GoogleBusinessCoverBuilder } from "@/components/marketing/google-business-cover-builder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Google Business cover builder",
  description:
    "Create 1024×576 Google Business Profile cover images for Aurelian Massage — layouts, copy, backgrounds, PNG export.",
  robots: { index: false, follow: false },
};

export default function GoogleBusinessCoverBuilderPage() {
  const { name, address, url } = siteConfig;
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const line1 = nameWords[0] ?? name;
  const line2 = nameWords.slice(1).join(" ");
  const shortTag = `Swedish & aromatherapy massage — ${address.city} city centre`;

  const defaults = {
    eyebrow: "Massage therapy",
    line1,
    line2,
    body: shortTag,
    urlDisplay: url.replace(/^https?:\/\//, ""),
    regionLine: `${address.city} · ${address.region}`,
  };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Google Business cover builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Build a <strong className="text-neutral-light">16:9</strong> cover at{" "}
            <strong className="text-neutral-light">1024×576px</strong> (recommended Google Business Profile size).
            Choose <strong className="text-neutral-light">centred</strong>, <strong className="text-neutral-light">left brand</strong>, or{" "}
            <strong className="text-neutral-light">lower band</strong> layout, edit copy, pick a gradient or photo background (or upload your
            own), then <strong className="text-neutral-light">Download PNG</strong> at 2× for a crisp upload. Keep important content away from
            the <strong className="text-neutral-light">lower-left</strong> — Google overlays your profile photo there on Search and Maps.
          </p>
          <p className="text-sm text-neutral-gray">
            Facebook cover builder:{" "}
            <Link href="/facebook-cover-builder" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /facebook-cover-builder
            </Link>
            .{" "}
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
            {" · "}
            <Link
              href="/google-business-photos-builder"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              Logo &amp; listing photos tool
            </Link>
          </p>
        </header>

        <GoogleBusinessCoverBuilder defaults={defaults} />
      </div>
    </div>
  );
}
