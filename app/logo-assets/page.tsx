import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LogoAssetsDownloads } from "@/components/marketing/logo-assets-downloads";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Logo assets",
  description: "Download the Aurelian Massage logo as transparent PNG — gold, grayscale, and black.",
  robots: { index: false, follow: false },
};

export default function LogoAssetsPage() {
  const { name } = siteConfig;

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-4 pb-8">
          <Link
            href="/marketing"
            className="inline-flex items-center gap-2 text-xs font-medium text-gold-premium/90 transition hover:text-gold-champagne"
          >
            <ArrowLeft size={14} strokeWidth={2} aria-hidden />
            Marketing hub
          </Link>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">Internal</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-light">Logo downloads</h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-gray">
            Transparent PNG exports for <strong className="text-neutral-light">{name}</strong> — brand gold, black
            &amp; white (grayscale), and solid black. Each download uses a transparent background. This page is
            listed under <strong className="text-neutral-light">Media</strong> on the marketing hub.
          </p>
        </header>

        <LogoAssetsDownloads />
      </div>
    </div>
  );
}
