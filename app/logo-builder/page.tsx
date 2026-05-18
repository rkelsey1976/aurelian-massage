import type { Metadata } from "next";
import Link from "next/link";

import { LogoBuilder } from "@/components/marketing/logo-builder";

export const metadata: Metadata = {
  title: "Logo builder",
  description: "Export the Aurelian Massage logo as a 60×60 cm square PNG — choose background and colour variant.",
  robots: { index: false, follow: false },
};

export default function LogoBuilderPage() {
  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-4 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-light">
            Logo builder
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-gray">
            Square 60×60 cm logo export. Pick a background and logo colour, then download PNG.
            Standard export is 1260×1260 px (digital use); print-ready is 3360×3360 px (~142 dpi at 60 cm —
            suitable for large-format print, vinyl, and signage).
          </p>
          <p className="text-sm text-neutral-gray">
            <Link
              href="/marketing"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              ← Marketing hub
            </Link>
            {" · "}
            <Link
              href="/logo-assets"
              className="font-medium text-gold-premium underline-offset-2 hover:underline"
            >
              Logo downloads (portrait PNG)
            </Link>
          </p>
        </header>

        <LogoBuilder />
      </div>
    </div>
  );
}
