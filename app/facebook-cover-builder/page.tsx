import type { Metadata } from "next";
import Link from "next/link";

import { FacebookCoverBuilder } from "@/components/marketing/facebook-cover-builder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Facebook cover builder",
  description: "Create customised 820×312 Facebook timeline covers from Aurelian Massage brand defaults.",
  robots: { index: false, follow: false },
};

export default function FacebookCoverBuilderPage() {
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
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Facebook cover builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Compose a <strong className="text-neutral-light">820×312px</strong> desktop timeline cover.             Pick from <strong className="text-neutral-light">six layouts</strong> (spotlight, gold strip, minimal,
            editorial, logo spotlight, footer band), <strong className="text-neutral-light">left / centre / right</strong>{" "}
            alignment where it applies, then edit copy, preset or uploaded background, and{" "}
            <strong className="text-neutral-light">Download PNG</strong> at 2× for a sharp upload. Facebook’s
            profile photo sits on the <strong className="text-neutral-light">lower left</strong> — avoid crucial
            detail there. Static cover templates:{" "}
            <Link href="/facebook-covers" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /facebook-covers
            </Link>
            . Square post builder:{" "}
            <Link href="/facebook-builder" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /facebook-builder
            </Link>
            .
          </p>
          <p className="text-sm text-neutral-gray">
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
          </p>
        </header>

        <FacebookCoverBuilder defaults={defaults} />
      </div>
    </div>
  );
}
