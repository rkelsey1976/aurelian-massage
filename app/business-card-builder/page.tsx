import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";

import { BusinessCardBuilder } from "@/components/marketing/business-card-builder";
import { BUSINESS_CARD_TRIM_H_PX, BUSINESS_CARD_TRIM_W_PX } from "@/components/marketing/business-card-canvas";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Business card builder",
  description:
    "Edit Aurelian Massage business card copy and export one-sided or two-sided print PNGs with bleed and crop marks.",
  robots: { index: false, follow: false },
};

export default async function BusinessCardBuilderPage() {
  const { name, owner, address, phone, email, url, bookingUrl } = siteConfig;
  const bookingQrDataUrl = await QRCode.toDataURL(bookingUrl, {
    width: 200,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#20152E", light: "#F7F7F7" },
  });
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const brandFirst = nameParts[0] ?? name;
  const brandRest = nameParts.slice(1).join(" ");

  const initial = {
    bookingQrDataUrl,
    bookingUrl,
    brandFirst,
    brandRest,
    ownerName: owner.name,
    ownerTitle: owner.title,
    phone,
    email,
    url,
    address,
    frontTagline: `Swedish & aromatherapy · ${address.city}`,
    backEyebrow: "Visit · Book · Connect",
  };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Business card builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            One design system: <strong className="text-neutral-light">one-sided</strong> (brand column + gold rule + logo/QR
            strip) or <strong className="text-neutral-light">two-sided</strong> (clean front with logo, contact + large QR on
            back). Trim <strong className="text-neutral-light">{BUSINESS_CARD_TRIM_W_PX}×{BUSINESS_CARD_TRIM_H_PX}px</strong>{" "}
            (3.5×2 in proportion), ~3mm bleed, crop marks — same as the static{" "}
            <Link href="/business-card" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              /business-card
            </Link>{" "}
            proofs. Edit fields and booking URL (QR regenerates); download each face as PNG.
          </p>
          <p className="text-sm text-neutral-gray">
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
          </p>
        </header>

        <BusinessCardBuilder initial={initial} />
      </div>
    </div>
  );
}
