import Image from "next/image";

import {
  BUSINESS_CARD_BLEED_PX,
  BUSINESS_CARD_SHEET_H_PX,
  BUSINESS_CARD_SHEET_W_PX,
  BUSINESS_CARD_TRIM_H_PX,
  BUSINESS_CARD_TRIM_W_PX,
} from "@/components/marketing/business-card-canvas";
import { PrintPackPx } from "@/components/marketing/print-crop-marks";

const GUTTER_PX = 24;

/** Fixed stamp slots — keeps room for terms + QR on the card. */
export const LOYALTY_STAMP_SLOTS = 4;

const TRIM_OVERFLOW =
  "relative z-10 box-border min-h-0 min-w-0 overflow-hidden bg-white";

function LoyaltyBleedBackdrop({ texture }: { texture: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-white" />
      {texture ? (
        <div
          aria-hidden
          className="noise pointer-events-none absolute inset-0 opacity-[0.14]"
        />
      ) : null}
    </>
  );
}

export type LoyaltyCardCanvasProps = {
  brandFirst: string;
  brandRest: string;
  /** Small caps line above business name */
  eyebrow: string;
  /** Main reward line, e.g. "$20 off" */
  rewardPrimary: string;
  /** Second line, e.g. "after 4 visits" */
  rewardSecondary: string;
  /** Shown above the stamp grid (e.g. one stamp per visit) */
  stampAreaHint: string;
  footnote: string;
  bookingQrDataUrl: string;
  bookingUrl: string;
  cardTexture?: boolean;
  showQr?: boolean;
};

export const LOYALTY_CARD_DOWNLOAD_FRAME_CLASS = "relative overflow-hidden";

export function LoyaltyCardCanvas(props: LoyaltyCardCanvasProps) {
  const {
    brandFirst,
    brandRest,
    eyebrow,
    rewardPrimary,
    rewardSecondary,
    stampAreaHint,
    footnote,
    bookingQrDataUrl,
    bookingUrl,
    cardTexture = true,
    showQr = true,
  } = props;

  const stamps = LOYALTY_STAMP_SLOTS;
  const cols = stamps;

  return (
    <PrintPackPx
      trimWidthPx={BUSINESS_CARD_TRIM_W_PX}
      trimHeightPx={BUSINESS_CARD_TRIM_H_PX}
      bleedPx={BUSINESS_CARD_BLEED_PX}
      gutterPx={GUTTER_PX}
      trimClassName={TRIM_OVERFLOW}
      bleedBackdrop={<LoyaltyBleedBackdrop texture={cardTexture} />}
    >
      <div className="relative flex h-full w-full flex-col antialiased">
        <div className="shrink-0 bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660] px-6 py-3 pl-8 pr-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[9px] font-semibold uppercase leading-snug tracking-[0.18em] text-gold-premium">
                {eyebrow}
              </p>
              <p className="mt-1.5 font-serif text-xl font-semibold leading-[1.15] tracking-tight text-neutral-light">
                {brandFirst}
              </p>
              {brandRest ? (
                <p className="mt-0.5 font-serif text-xl font-light leading-[1.15] tracking-tight text-gold-champagne">
                  {brandRest}
                </p>
              ) : null}
            </div>
            {showQr ? (
              <div className="flex shrink-0 flex-col items-center gap-0.5">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book online — scan QR"
                  className="rounded-md bg-white p-1 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-deep"
                >
                  <Image
                    src={bookingQrDataUrl}
                    alt=""
                    width={56}
                    height={56}
                    priority
                    unoptimized
                    className="block h-14 w-14"
                  />
                </a>
                <p className="text-center text-[6px] font-medium uppercase tracking-[0.08em] text-gold-premium/90">
                  Book
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-6 py-3 pl-8 pr-5">
          <p className="mb-2 text-balance text-center text-[8px] font-semibold uppercase leading-snug tracking-[0.1em] text-purple-royal">
            {stampAreaHint}
          </p>
          <div
            className="grid place-content-center gap-x-4 gap-y-3"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              maxWidth: stamps * 72 + (stamps - 1) * 16,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {Array.from({ length: stamps }, (_, i) => (
              <div
                key={i}
                role="img"
                aria-label={`Stamp space ${i + 1} of ${stamps}`}
                className="mx-auto box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-[3px] border-solid border-purple-royal/55 bg-white ring-1 ring-black/[0.05]"
              />
            ))}
          </div>

          <div className="mx-auto mt-2 max-w-[min(100%,280px)] text-center text-pretty">
            <p className="font-serif text-[17px] font-semibold leading-tight tracking-tight text-purple-royal">
              {rewardPrimary}
            </p>
            <p className="mt-1 text-[10px] font-medium leading-snug tracking-normal text-purple-deep/85">
              {rewardSecondary}
            </p>
          </div>

          <div className="mt-auto border-t border-purple-royal/15 pt-2.5">
            <p className="w-full whitespace-pre-wrap break-words text-[8px] leading-[1.5] text-neutral-gray">
              {footnote}
            </p>
          </div>
        </div>
      </div>
    </PrintPackPx>
  );
}

export {
  BUSINESS_CARD_SHEET_H_PX as LOYALTY_CARD_SHEET_H_PX,
  BUSINESS_CARD_SHEET_W_PX as LOYALTY_CARD_SHEET_W_PX,
};
