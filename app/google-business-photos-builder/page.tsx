import type { Metadata } from "next";
import Link from "next/link";

import { GoogleBusinessPhotosBuilder } from "@/components/marketing/google-business-photos-builder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Google Business photos builder",
  description:
    "Export square and 4:3 images for Google Business Profile — logo, listing photos, branded overlays, PNG download.",
  robots: { index: false, follow: false },
};

export default function GoogleBusinessPhotosBuilderPage() {
  const { name, address } = siteConfig;
  const nameWords = name.trim().split(/\s+/).filter(Boolean);
  const line1 = nameWords[0] ?? name;
  const line2 = nameWords.slice(1).join(" ");
  const caption = `Swedish & aromatherapy · ${address.city}`;

  const defaults = { line1, line2, caption };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Google Business photos builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Create uploads sized for <strong className="text-neutral-light">Google Business Profile</strong>:{" "}
            <strong className="text-neutral-light">720×720</strong> square for a logo-style profile image or listing
            thumbnail, another <strong className="text-neutral-light">720×720</strong> template with an optional
            caption band for gallery-style shots, and <strong className="text-neutral-light">1200×900 (4:3)</strong> for
            wider listing or post-style images. Use site gradients or photos, upload your own room shot, tune the tint,
            then <strong className="text-neutral-light">Download PNG</strong> at 2×. For the wide{" "}
            <strong className="text-neutral-light">cover</strong> banner, use the{" "}
            <Link href="/google-business-cover-builder" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              cover builder
            </Link>
            .
          </p>
          <p className="text-sm text-neutral-gray">
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
            {" · "}
            <Link
              href="/google-business-cover-builder"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              16:9 cover builder
            </Link>
          </p>
        </header>

        <GoogleBusinessPhotosBuilder defaults={defaults} />
      </div>
    </div>
  );
}
