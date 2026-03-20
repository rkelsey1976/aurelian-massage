"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import {
  LOYALTY_CARD_DOWNLOAD_FRAME_CLASS,
  LOYALTY_CARD_SHEET_H_PX,
  LOYALTY_CARD_SHEET_W_PX,
  LoyaltyCardCanvas,
  type LoyaltyCardCanvasProps,
} from "@/components/marketing/loyalty-card-canvas";
import { cardBleedPx } from "@/components/marketing/print-crop-marks";
import { BUSINESS_CARD_TRIM_H_PX, BUSINESS_CARD_TRIM_W_PX } from "@/components/marketing/business-card-canvas";

const BLEED_PX = cardBleedPx(BUSINESS_CARD_TRIM_W_PX);

const QR_OPTS: QRCode.QRCodeToDataURLOptions = {
  width: 200,
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#20152E", light: "#F7F7F7" },
};

export type LoyaltyCardBuilderInitial = Pick<
  LoyaltyCardCanvasProps,
  | "bookingQrDataUrl"
  | "bookingUrl"
  | "brandFirst"
  | "brandRest"
  | "eyebrow"
  | "rewardPrimary"
  | "rewardSecondary"
  | "stampAreaHint"
  | "footnote"
>;

export function LoyaltyCardBuilder({ initial }: { initial: LoyaltyCardBuilderInitial }) {
  const [brandFirst, setBrandFirst] = useState(initial.brandFirst);
  const [brandRest, setBrandRest] = useState(initial.brandRest);
  const [eyebrow, setEyebrow] = useState(initial.eyebrow);
  const [rewardPrimary, setRewardPrimary] = useState(initial.rewardPrimary);
  const [rewardSecondary, setRewardSecondary] = useState(initial.rewardSecondary);
  const [stampAreaHint, setStampAreaHint] = useState(initial.stampAreaHint);
  const [footnote, setFootnote] = useState(initial.footnote);
  const [bookingUrl, setBookingUrl] = useState(initial.bookingUrl);
  const [qrDataUrl, setQrDataUrl] = useState(initial.bookingQrDataUrl);
  const [cardTexture, setCardTexture] = useState(true);
  const [showQr, setShowQr] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(bookingUrl || "https://example.com", QR_OPTS).then((data) => {
      if (!cancelled) setQrDataUrl(data);
    });
    return () => {
      cancelled = true;
    };
  }, [bookingUrl]);

  const canvasProps: LoyaltyCardCanvasProps = useMemo(
    () => ({
      brandFirst,
      brandRest,
      eyebrow,
      rewardPrimary,
      rewardSecondary,
      stampAreaHint,
      footnote,
      bookingQrDataUrl: qrDataUrl,
      bookingUrl,
      cardTexture,
      showQr,
    }),
    [
      brandFirst,
      brandRest,
      eyebrow,
      rewardPrimary,
      rewardSecondary,
      stampAreaHint,
      footnote,
      qrDataUrl,
      bookingUrl,
      cardTexture,
      showQr,
    ],
  );

  const resetAll = useCallback(() => {
    setBrandFirst(initial.brandFirst);
    setBrandRest(initial.brandRest);
    setEyebrow(initial.eyebrow);
    setRewardPrimary(initial.rewardPrimary);
    setRewardSecondary(initial.rewardSecondary);
    setStampAreaHint(initial.stampAreaHint);
    setFootnote(initial.footnote);
    setBookingUrl(initial.bookingUrl);
    setQrDataUrl(initial.bookingQrDataUrl);
    setCardTexture(true);
    setShowQr(true);
  }, [initial]);

  const trimNote = `Trim ${BUSINESS_CARD_TRIM_W_PX}×${BUSINESS_CARD_TRIM_H_PX}px + ~3mm bleed (${BLEED_PX}px) + crop marks. Standard (2×) or High-res (5×).`;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div className="grid gap-3">
          <div>
            <label className="text-xs text-neutral-gray">Eyebrow (small caps)</label>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              maxLength={48}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Business — line 1</label>
            <input
              value={brandFirst}
              onChange={(e) => setBrandFirst(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Business — line 2 (gold)</label>
            <input
              value={brandRest}
              onChange={(e) => setBrandRest(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Reward headline (e.g. $20 off)</label>
            <input
              value={rewardPrimary}
              onChange={(e) => setRewardPrimary(e.target.value)}
              maxLength={40}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Reward subtitle (e.g. after 4 visits)</label>
            <input
              value={rewardSecondary}
              onChange={(e) => setRewardSecondary(e.target.value)}
              maxLength={48}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Line above stamps (stamping instruction)</label>
            <input
              value={stampAreaHint}
              onChange={(e) => setStampAreaHint(e.target.value)}
              maxLength={56}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Terms / footnote</label>
            <textarea
              value={footnote}
              onChange={(e) => setFootnote(e.target.value)}
              rows={3}
              maxLength={320}
              className="mt-1 w-full resize-y rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-gray">Fresha / booking URL (QR)</label>
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
              id="loyalty-texture"
              type="checkbox"
              checked={cardTexture}
              onChange={(e) => setCardTexture(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
            />
            <label htmlFor="loyalty-texture" className="text-xs text-neutral-gray">
              Paper texture overlay
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="loyalty-qr"
              type="checkbox"
              checked={showQr}
              onChange={(e) => setShowQr(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
            />
            <label htmlFor="loyalty-qr" className="text-xs text-neutral-gray">
              Show booking QR (purple header — white tile)
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium hover:bg-purple-plum/30"
        >
          Reset to defaults
        </button>
      </div>

      <DownloadableGraphic
        id="loyalty-card-builder"
        filename="loyalty-card-custom"
        title="Live preview — loyalty card"
        note={trimNote}
        dimensions={{ width: LOYALTY_CARD_SHEET_W_PX, height: LOYALTY_CARD_SHEET_H_PX }}
        highResFilename="loyalty-card-custom-hires"
        highResPixelRatio={5}
        frameClassName={LOYALTY_CARD_DOWNLOAD_FRAME_CLASS}
      >
        <LoyaltyCardCanvas {...canvasProps} />
      </DownloadableGraphic>
    </div>
  );
}
