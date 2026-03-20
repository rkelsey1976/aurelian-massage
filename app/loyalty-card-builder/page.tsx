import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";

import { LoyaltyCardBuilder } from "@/components/marketing/loyalty-card-builder";
import {
  BUSINESS_CARD_TRIM_H_PX,
  BUSINESS_CARD_TRIM_W_PX,
} from "@/components/marketing/business-card-canvas";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Loyalty card builder",
  description:
    "White loyalty card with purple header — 4 stamp circles, $20 off after 4 visits, Fresha QR — PNG with bleed and crop marks.",
  robots: { index: false, follow: false },
};

export default async function LoyaltyCardBuilderPage() {
  const { name, bookingUrl } = siteConfig;
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
    eyebrow: "Loyalty rewards",
    rewardPrimary: "$20 off",
    rewardSecondary: "after 4 visits",
    stampAreaHint: "Studio stamp · one circle per visit",
    footnote:
      "Staff: use a round stamp centred in each circle. One stamp per qualifying visit; card presented at checkout. Reward applies to a future treatment; not valid with other offers. Non-transferable. Studio may amend or end this programme.",
  };

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in main nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Loyalty card builder</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-gray">
            White card with a purple header; layout uses{" "}
            <strong className="text-neutral-light">four fixed stamp circles</strong> (one row) so terms and QR stay
            visible. Default offer: <strong className="text-neutral-light">$20 off after 4 visits</strong>. Same trim
            as business cards (
            <strong className="text-neutral-light">
              {BUSINESS_CARD_TRIM_W_PX}×{BUSINESS_CARD_TRIM_H_PX}px
            </strong>
            , 3.5×2 in proportion) with bleed and crop marks for print. Edit copy and booking URL (QR updates);
            download PNG.
          </p>
          <p className="text-sm text-neutral-gray">
            <Link href="/marketing" className="font-medium text-gold-premium underline-offset-2 hover:underline">
              ← Marketing hub
            </Link>
          </p>
        </header>

        <LoyaltyCardBuilder initial={initial} />
      </div>
    </div>
  );
}
