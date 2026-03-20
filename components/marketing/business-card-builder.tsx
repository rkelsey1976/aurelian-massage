"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

import {
  BUSINESS_CARD_DOWNLOAD_FRAME_CLASS,
  BUSINESS_CARD_SHEET_H_PX,
  BUSINESS_CARD_SHEET_W_PX,
  BUSINESS_CARD_TRIM_H_PX,
  BUSINESS_CARD_TRIM_W_PX,
  BusinessCardBackCanvas,
  BusinessCardFrontCanvas,
  BusinessCardOneSidedCanvas,
  type BusinessCardBackQrSize,
  type BusinessCardCanvasAddress,
  type BusinessCardCanvasProps,
  type BusinessCardFrontBgStyle,
  type BusinessCardFrontLogoPlacement,
  type BusinessCardFrontLogoSize,
} from "@/components/marketing/business-card-canvas";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { cardBleedPx } from "@/components/marketing/print-crop-marks";

const CARD_BLEED_PX = cardBleedPx(BUSINESS_CARD_TRIM_W_PX);

const QR_OPTS: QRCode.QRCodeToDataURLOptions = {
  width: 200,
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#20152E", light: "#F7F7F7" },
};

export type BusinessCardBuilderInitial = {
  bookingQrDataUrl: string;
  bookingUrl: string;
  brandFirst: string;
  brandRest: string;
  ownerName: string;
  ownerTitle: string;
  phone: string;
  email: string;
  url: string;
  address: BusinessCardCanvasAddress;
  frontTagline: string;
  backEyebrow: string;
};

type CardMode = "one-sided" | "two-sided";

export function BusinessCardBuilder({ initial }: { initial: BusinessCardBuilderInitial }) {
  const [mode, setMode] = useState<CardMode>("one-sided");
  const [brandFirst, setBrandFirst] = useState(initial.brandFirst);
  const [brandRest, setBrandRest] = useState(initial.brandRest);
  const [ownerName, setOwnerName] = useState(initial.ownerName);
  const [ownerTitle, setOwnerTitle] = useState(initial.ownerTitle);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);
  const [url, setUrl] = useState(initial.url);
  const [bookingUrl, setBookingUrl] = useState(initial.bookingUrl);
  const [street, setStreet] = useState(initial.address.street);
  const [city, setCity] = useState(initial.address.city);
  const [postalCode, setPostalCode] = useState(initial.address.postalCode);
  const [frontTagline, setFrontTagline] = useState(initial.frontTagline);
  const [backEyebrow, setBackEyebrow] = useState(initial.backEyebrow);
  const [frontLogoSize, setFrontLogoSize] = useState<BusinessCardFrontLogoSize>("md");
  const [frontLogoPlacement, setFrontLogoPlacement] =
    useState<BusinessCardFrontLogoPlacement>("top-right");
  const [cardTexture, setCardTexture] = useState(true);
  const [frontBgStyle, setFrontBgStyle] = useState<BusinessCardFrontBgStyle>("classic");
  const [backQrSize, setBackQrSize] = useState<BusinessCardBackQrSize>("md");
  const [frontBrandDivider, setFrontBrandDivider] = useState(false);
  const [frontLogoGlow, setFrontLogoGlow] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState(initial.bookingQrDataUrl);

  useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(bookingUrl || "https://example.com", QR_OPTS).then((data) => {
      if (!cancelled) setQrDataUrl(data);
    });
    return () => {
      cancelled = true;
    };
  }, [bookingUrl]);

  const address = useMemo(
    () => ({ street, city, postalCode }),
    [street, city, postalCode],
  );

  const canvasProps: BusinessCardCanvasProps = useMemo(
    () => ({
      bookingQrDataUrl: qrDataUrl,
      brandFirst,
      brandRest,
      ownerName,
      ownerTitle,
      phone,
      email,
      url,
      bookingUrl,
      address,
      frontTagline,
      backEyebrow,
      frontLogoSize,
      frontLogoPlacement,
      cardTexture,
      frontBgStyle,
      backQrSize,
      frontBrandDivider,
      frontLogoGlow,
    }),
    [
      qrDataUrl,
      brandFirst,
      brandRest,
      ownerName,
      ownerTitle,
      phone,
      email,
      url,
      bookingUrl,
      address,
      frontTagline,
      backEyebrow,
      frontLogoSize,
      frontLogoPlacement,
      cardTexture,
      frontBgStyle,
      backQrSize,
      frontBrandDivider,
      frontLogoGlow,
    ],
  );

  const resetAll = useCallback(() => {
    setMode("one-sided");
    setBrandFirst(initial.brandFirst);
    setBrandRest(initial.brandRest);
    setOwnerName(initial.ownerName);
    setOwnerTitle(initial.ownerTitle);
    setPhone(initial.phone);
    setEmail(initial.email);
    setUrl(initial.url);
    setBookingUrl(initial.bookingUrl);
    setStreet(initial.address.street);
    setCity(initial.address.city);
    setPostalCode(initial.address.postalCode);
    setFrontTagline(initial.frontTagline);
    setBackEyebrow(initial.backEyebrow);
    setFrontLogoSize("md");
    setFrontLogoPlacement("top-right");
    setCardTexture(true);
    setFrontBgStyle("classic");
    setBackQrSize("md");
    setFrontBrandDivider(false);
    setFrontLogoGlow(true);
    setQrDataUrl(initial.bookingQrDataUrl);
  }, [initial]);

  const trimNote = `Trim ${BUSINESS_CARD_TRIM_W_PX}×${BUSINESS_CARD_TRIM_H_PX}px + ~3mm bleed (${CARD_BLEED_PX}px) + crop marks. Standard (2×) or High-res (5×).`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Card type</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as CardMode)}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            <option value="one-sided">One-sided — logo strip + QR on same face</option>
            <option value="two-sided">Two-sided — minimal front + contact back</option>
          </select>
          <p className="mt-1 text-[11px] leading-snug text-neutral-gray">
            Same print spec as the static card page: US standard 3.5×2 proportion at {BUSINESS_CARD_TRIM_W_PX}×
            {BUSINESS_CARD_TRIM_H_PX}px trim.
          </p>
        </div>

        <div className="grid gap-3 border-t border-gold-premium/15 pt-4">
          <div>
            <label className="text-xs text-neutral-gray">Brand — line 1</label>
            <input
              value={brandFirst}
              onChange={(e) => setBrandFirst(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Brand — line 2 (gold)</label>
            <input
              value={brandRest}
              onChange={(e) => setBrandRest(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Owner / therapist name</label>
            <input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Title (small caps)</label>
            <input
              value={ownerTitle}
              onChange={(e) => setOwnerTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
        </div>

        <div className="grid gap-3 border-t border-gold-premium/15 pt-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Street</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Postcode</label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Website (full URL)</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Fresha booking URL (QR updates)</label>
            <input
              value={bookingUrl}
              onChange={(e) => setBookingUrl(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
            />
          </div>
        </div>

        <div className="space-y-3 border-t border-gold-premium/15 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gold-premium">Design</p>
          <div className="flex items-center gap-2">
            <input
              id="bc-texture"
              type="checkbox"
              checked={cardTexture}
              onChange={(e) => setCardTexture(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
            />
            <label htmlFor="bc-texture" className="text-xs text-neutral-gray">
              Paper texture overlay
            </label>
          </div>
          <div>
            <label className="text-xs text-neutral-gray">
              Card background{mode === "two-sided" ? " — front & back" : ""}
            </label>
            <select
              value={frontBgStyle}
              onChange={(e) => setFrontBgStyle(e.target.value as BusinessCardFrontBgStyle)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            >
              <option value="classic">Classic purple gradient</option>
              <option value="deep">Deep / dramatic</option>
              <option value="soft">Soft / airy</option>
            </select>
          </div>
          {mode === "two-sided" ? (
            <>
              <div>
                <label className="text-xs text-neutral-gray">Back — QR code size</label>
                <select
                  value={backQrSize}
                  onChange={(e) => setBackQrSize(e.target.value as BusinessCardBackQrSize)}
                  className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium (default)</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    id="bc-divider"
                    type="checkbox"
                    checked={frontBrandDivider}
                    onChange={(e) => setFrontBrandDivider(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
                  />
                  <label htmlFor="bc-divider" className="text-xs text-neutral-gray">
                    Front — gold rule under business name
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="bc-logoglow"
                    type="checkbox"
                    checked={frontLogoGlow}
                    onChange={(e) => setFrontLogoGlow(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
                  />
                  <label htmlFor="bc-logoglow" className="text-xs text-neutral-gray">
                    Front — soft glow on logo
                  </label>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {mode === "two-sided" ? (
          <div className="space-y-3 border-t border-gold-premium/15 pt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs text-neutral-gray">Front — logo size</label>
                <select
                  value={frontLogoSize}
                  onChange={(e) => setFrontLogoSize(e.target.value as BusinessCardFrontLogoSize)}
                  className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium (default)</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-gray">Front — logo placement</label>
                <select
                  value={frontLogoPlacement}
                  onChange={(e) =>
                    setFrontLogoPlacement(e.target.value as BusinessCardFrontLogoPlacement)
                  }
                  className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
                >
                  <option value="top-right">Top right</option>
                  <option value="top-left">Top left</option>
                  <option value="bottom-right">Bottom right</option>
                  <option value="bottom-left">Bottom left</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-neutral-gray">Front — tagline (under name)</label>
              <input
                value={frontTagline}
                onChange={(e) => setFrontTagline(e.target.value)}
                maxLength={120}
                className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-gray">Back — eyebrow (small caps)</label>
              <input
                value={backEyebrow}
                onChange={(e) => setBackEyebrow(e.target.value)}
                maxLength={48}
                className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
              />
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={resetAll}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium hover:bg-purple-plum/30"
        >
          Reset to site defaults
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-12 overflow-x-auto">
        {mode === "one-sided" ? (
          <DownloadableGraphic
            id="business-card-builder-one-sided"
            filename="business-card-custom-one-sided"
            title="Live preview — one-sided"
            note={trimNote}
            dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
            highResFilename="business-card-custom-one-sided-hires"
            highResPixelRatio={5}
            frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
          >
            <BusinessCardOneSidedCanvas {...canvasProps} />
          </DownloadableGraphic>
        ) : (
          <>
            <DownloadableGraphic
              id="business-card-builder-front"
              filename="business-card-custom-front"
              title="Live preview — front"
              note={trimNote}
              dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
              highResFilename="business-card-custom-front-hires"
              highResPixelRatio={5}
              frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
            >
              <BusinessCardFrontCanvas {...canvasProps} />
            </DownloadableGraphic>
            <DownloadableGraphic
              id="business-card-builder-back"
              filename="business-card-custom-back"
              title="Live preview — back"
              note={trimNote}
              dimensions={{ width: BUSINESS_CARD_SHEET_W_PX, height: BUSINESS_CARD_SHEET_H_PX }}
              highResFilename="business-card-custom-back-hires"
              highResPixelRatio={5}
              frameClassName={BUSINESS_CARD_DOWNLOAD_FRAME_CLASS}
            >
              <BusinessCardBackCanvas {...canvasProps} />
            </DownloadableGraphic>
          </>
        )}
      </div>
    </div>
  );
}
