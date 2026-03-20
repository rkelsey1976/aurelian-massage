"use client";

import {
  BUSINESS_CARD_DOWNLOAD_FRAME_CLASS,
  BUSINESS_CARD_SHEET_H_PX,
  BUSINESS_CARD_SHEET_W_PX,
  BUSINESS_CARD_TRIM_H_PX,
  BUSINESS_CARD_TRIM_W_PX,
  BusinessCardBackCanvas,
  BusinessCardFrontCanvas,
  BusinessCardOneSidedCanvas,
  type BusinessCardCanvasAddress,
  type BusinessCardCanvasProps,
} from "@/components/marketing/business-card-canvas";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { cardBleedPx } from "@/components/marketing/print-crop-marks";

const CARD_BLEED_PX = cardBleedPx(BUSINESS_CARD_TRIM_W_PX);

export type BusinessCardPreviewsProps = {
  bookingQrDataUrl: string;
  brandFirst: string;
  brandRest: string;
  owner: { name: string; title: string };
  phone: string;
  email: string;
  url: string;
  bookingUrl: string;
  address: BusinessCardCanvasAddress;
};

function canvasProps(p: BusinessCardPreviewsProps): BusinessCardCanvasProps {
  return {
    bookingQrDataUrl: p.bookingQrDataUrl,
    brandFirst: p.brandFirst,
    brandRest: p.brandRest,
    ownerName: p.owner.name,
    ownerTitle: p.owner.title,
    phone: p.phone,
    email: p.email,
    url: p.url,
    bookingUrl: p.bookingUrl,
    address: p.address,
    frontTagline: `Swedish & aromatherapy · ${p.address.city}`,
    backEyebrow: "Visit · Book · Connect",
  };
}

export function BusinessCardPreviews(props: BusinessCardPreviewsProps) {
  const c = canvasProps(props);

  return (
    <div className="flex flex-col gap-14">
      <DownloadableGraphic
        id="bc-one-sided"
        filename="business-card-one-sided"
        title="One-sided (all on one face)"
        note={`Trim ${BUSINESS_CARD_TRIM_W_PX}×${BUSINESS_CARD_TRIM_H_PX}px with ~3mm bleed (${CARD_BLEED_PX}px) and crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
        highResFilename="business-card-one-sided-hires"
        highResPixelRatio={5}
        frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
      >
        <BusinessCardOneSidedCanvas {...c} />
      </DownloadableGraphic>

      <DownloadableGraphic
        id="bc-front"
        filename="business-card-front"
        title="Front"
        note={`Trim ${BUSINESS_CARD_TRIM_W_PX}×${BUSINESS_CARD_TRIM_H_PX}px + bleed + crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
        highResFilename="business-card-front-hires"
        highResPixelRatio={5}
        frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
      >
        <BusinessCardFrontCanvas {...c} />
      </DownloadableGraphic>

      <DownloadableGraphic
        id="bc-back"
        filename="business-card-back"
        title="Back"
        note={`Trim ${BUSINESS_CARD_TRIM_W_PX}×${BUSINESS_CARD_TRIM_H_PX}px + bleed + crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
        highResFilename="business-card-back-hires"
        highResPixelRatio={5}
        frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
      >
        <BusinessCardBackCanvas {...c} />
      </DownloadableGraphic>
    </div>
  );
}
