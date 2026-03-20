import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";

import { TreatmentFlyerBuilder } from "@/components/marketing/treatment-flyer-builder";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Treatment flyer builder",
  description: "Custom A5 treatment menu — edit copy, treatments, background, export print PNGs.",
  robots: { index: false, follow: false },
};

export default async function TreatmentFlyerBuilderPage() {
  const { name, address, phone, bookingUrl, url } = siteConfig;
  const bookingQrDataUrl = await QRCode.toDataURL(bookingUrl, {
    width: 180,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#20152E", light: "#F7F7F7" },
  });
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const brandFirst = nameParts[0] ?? name;
  const brandRest = nameParts.slice(1).join(" ");

  const flyerServices = services.map(({ slug, name: n, duration, price, description, featured }) => ({
    slug,
    name: n,
    duration,
    price,
    description,
    featured,
  }));

  const initial = {
    bookingQrDataUrl,
    brandFirst,
    brandRest,
    headerEyebrow: `${address.city} city centre`,
    treatmentsHeading: "Our treatments",
    treatmentsIntro:
      "Swedish & aromatherapy — every session tailored to you. Durations and fees below; book online anytime.",
    address,
    phone,
    bookingUrl,
    url,
    services: flyerServices,
  };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Treatment flyer builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            Same <strong className="text-neutral-light">A5 + bleed + crop marks</strong> shell as the static flyer,
            but every field is editable: brand, intro, address, booking URL (QR regenerates), treatment rows (add /
            remove / signature), photo backgrounds, no-photo gradient fills, or custom upload. Export{" "}
            <strong className="text-neutral-light">Standard (2×)</strong> or{" "}
            <strong className="text-neutral-light">High-res (6×)</strong> PNGs for print.
          </p>
          <p className="text-sm text-neutral-gray">
            Fixed menu from site data:{" "}
            <Link href="/treatment-flyer" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /treatment-flyer
            </Link>
            .{" "}
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
          </p>
        </header>

        <TreatmentFlyerBuilder initial={initial} />
      </div>
    </div>
  );
}
