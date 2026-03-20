import type { Metadata } from "next";
import QRCode from "qrcode";

import { TreatmentFlyerPreview } from "./treatment-flyer-preview";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Treatment flyer (A5)",
  description: "Print-ready A5 treatment menu for Aurelian Massage.",
  robots: { index: false, follow: false },
};

export default async function TreatmentFlyerPage() {
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

  return (
    <div className="min-h-screen bg-purple-royal px-6 py-12 text-neutral-light">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-2 border-b border-gold-premium/20 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-premium">
            Internal — not linked in nav
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-light">Treatment flyer — A5</h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-gray">
            Frame below is <strong className="text-neutral-light">148×210mm</strong> (ISO A5). Use print dialog
            “Actual size” or export at <strong className="text-neutral-light">300dpi</strong> (~1748×2480px) for
            professional print. The preview adds a <strong className="text-neutral-light">4mm gutter</strong>{" "}
            with <strong className="text-neutral-light">crop marks</strong> at the 148×210mm trim. Use{" "}
            <strong className="text-neutral-light">Standard (2×)</strong> for proofs or{" "}
            <strong className="text-neutral-light">High-res (6×)</strong> for large print-ready files.
          </p>
        </header>

        <TreatmentFlyerPreview
          bookingQrDataUrl={bookingQrDataUrl}
          brandFirst={brandFirst}
          brandRest={brandRest}
          address={address}
          phone={phone}
          bookingUrl={bookingUrl}
          url={url}
          services={flyerServices}
        />
      </div>
    </div>
  );
}
