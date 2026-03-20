"use client";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import {
  FLYER_SHEET_H_MM,
  FLYER_SHEET_W_MM,
  TreatmentFlyerCanvas,
  type FlyerService,
} from "@/components/marketing/treatment-flyer-canvas";

export type { FlyerService };

export type TreatmentFlyerPreviewProps = {
  bookingQrDataUrl: string;
  brandFirst: string;
  brandRest: string;
  address: { city: string; street: string; postalCode: string };
  phone: string;
  bookingUrl: string;
  url: string;
  services: FlyerService[];
};

export function TreatmentFlyerPreview({
  bookingQrDataUrl,
  brandFirst,
  brandRest,
  address,
  phone,
  bookingUrl,
  url,
  services,
}: TreatmentFlyerPreviewProps) {
  return (
    <DownloadableGraphic
      id="treatment-flyer-a5"
      filename="treatment-flyer-a5"
      title="Print preview"
      note={`Trim 148×210mm + 3mm bleed + crop marks. Standard (2×) or High-res (6×).`}
      dimensions={{ width: `${FLYER_SHEET_W_MM}mm`, height: `${FLYER_SHEET_H_MM}mm` }}
      highResFilename="treatment-flyer-a5-hires"
      highResPixelRatio={6}
      frameClassName="relative overflow-hidden"
    >
      <TreatmentFlyerCanvas
        bookingQrDataUrl={bookingQrDataUrl}
        brandFirst={brandFirst}
        brandRest={brandRest}
        headerEyebrow={`${address.city} city centre`}
        treatmentsHeading="Our treatments"
        treatmentsIntro="Swedish & aromatherapy — every session tailored to you. Durations and fees below; book online anytime."
        address={address}
        phone={phone}
        bookingUrl={bookingUrl}
        url={url}
        services={services}
        background={{ kind: "image", src: "/back-massage.png" }}
      />
    </DownloadableGraphic>
  );
}
