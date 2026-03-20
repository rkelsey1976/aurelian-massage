import type { Metadata } from "next";
import QRCode from "qrcode";

import { BusinessCardPreviews } from "./business-card-previews";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Business card — Ross",
  description: "Print-ready business card layout for Aurelian Massage.",
  robots: { index: false, follow: false },
};

/** 3.5 × 2 in at ~120dpi for clear on-screen proofing (420 × 240 px). */
const CARD_W = 420;
const CARD_H = 240;

export default async function BusinessCardPage() {
  const { name, owner, address, phone, email, url, bookingUrl } = siteConfig;
  /** QR encodes the same Fresha URL used site-wide (`siteConfig.bookingUrl`). */
  const bookingQrDataUrl = await QRCode.toDataURL(bookingUrl, {
    width: 200,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#20152E", light: "#F7F7F7" },
  });
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const brandFirst = nameParts[0] ?? name;
  const brandRest = nameParts.slice(1).join(" ");

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-2 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">
            Business card — {owner.name}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-gray">
            Each card is <strong className="font-medium text-neutral-light">{CARD_W}×{CARD_H}px</strong>{" "}
            (3.5×2 proportion). Export or print via your browser; for professional print, use 300dpi assets
            (e.g. 1050×600px) from the same layout. Use <strong className="text-neutral-light">One-sided</strong>{" "}
            for a single print face; Front + Back if you prefer a classic two-sided card. Each block has{" "}
            <strong className="text-neutral-light">Download PNG</strong> (2× capture for sharper files).
          </p>
        </header>

        <BusinessCardPreviews
          bookingQrDataUrl={bookingQrDataUrl}
          brandFirst={brandFirst}
          brandRest={brandRest}
          owner={owner}
          phone={phone}
          email={email}
          url={url}
          bookingUrl={bookingUrl}
          address={address}
        />
      </div>
    </div>
  );
}
