import Image from "next/image";

import { PrintPackPx, cardBleedPx } from "@/components/marketing/print-crop-marks";

/** 3.5 × 2 in at ~120dpi — matches static /business-card. */
export const BUSINESS_CARD_TRIM_W_PX = 420;
export const BUSINESS_CARD_TRIM_H_PX = 240;

/** ~3mm bleed at this trim scale — use to extend edge colours into the bleed zone. */
export const BUSINESS_CARD_BLEED_PX = cardBleedPx(BUSINESS_CARD_TRIM_W_PX);
const CARD_GUTTER_PX = 24;
const BLEED_BOX_W = BUSINESS_CARD_TRIM_W_PX + 2 * BUSINESS_CARD_BLEED_PX;
const BLEED_BOX_H = BUSINESS_CARD_TRIM_H_PX + 2 * BUSINESS_CARD_BLEED_PX;
export const BUSINESS_CARD_SHEET_W_PX = BLEED_BOX_W + 2 * CARD_GUTTER_PX;
export const BUSINESS_CARD_SHEET_H_PX = BLEED_BOX_H + 2 * CARD_GUTTER_PX;

export type BusinessCardCanvasAddress = {
  street: string;
  city: string;
  postalCode: string;
};

/** Two-sided front only — one-sided layout ignores these. */
export type BusinessCardFrontLogoSize = "sm" | "md" | "lg";
export type BusinessCardFrontLogoPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

/** Bleed background for one-sided, two-sided front, and two-sided back. */
export type BusinessCardFrontBgStyle = "classic" | "deep" | "soft";
export type BusinessCardBackQrSize = "sm" | "md" | "lg";

export type BusinessCardCanvasProps = {
  bookingQrDataUrl: string;
  brandFirst: string;
  brandRest: string;
  ownerName: string;
  ownerTitle: string;
  phone: string;
  email: string;
  url: string;
  bookingUrl: string;
  address: BusinessCardCanvasAddress;
  /** Two-sided front — line under name/title. */
  frontTagline: string;
  /** Two-sided back — small caps above contact list. */
  backEyebrow: string;
  /** Two-sided front logo scale (default matches original ~160px). */
  frontLogoSize?: BusinessCardFrontLogoSize;
  /** Two-sided front logo corner (default top-right). */
  frontLogoPlacement?: BusinessCardFrontLogoPlacement;
  /** Subtle noise texture on bleed (default on). */
  cardTexture?: boolean;
  /** Purple gradient variant — all faces (one-sided, two-sided front & back). */
  frontBgStyle?: BusinessCardFrontBgStyle;
  /** Two-sided back QR code size. */
  backQrSize?: BusinessCardBackQrSize;
  /** Two-sided front — hairline rule under brand block. */
  frontBrandDivider?: boolean;
  /** Two-sided front logo drop shadow (default on). */
  frontLogoGlow?: boolean;
};

export const BUSINESS_CARD_DOWNLOAD_FRAME_CLASS = "relative overflow-hidden";

const TRIM_OVERFLOW_VISIBLE =
  "relative z-10 box-border min-h-0 min-w-0 overflow-visible";

const FRONT_LOGO_PX: Record<BusinessCardFrontLogoSize, number> = {
  sm: 96,
  md: 160,
  lg: 192,
};

const FRONT_LOGO_CLASS: Record<BusinessCardFrontLogoSize, string> = {
  sm: "h-24 w-24",
  md: "h-40 w-40",
  lg: "h-48 w-48",
};

function BusinessCardFrontLogoImage({
  size,
  glow = true,
}: {
  size: BusinessCardFrontLogoSize;
  glow?: boolean;
}) {
  const px = FRONT_LOGO_PX[size];
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={px}
      height={px}
      priority
      unoptimized
      className={`block ${FRONT_LOGO_CLASS[size]} shrink-0 opacity-95 ${
        glow ? "drop-shadow-[0_0_22px_rgba(197,165,86,0.4)]" : ""
      }`}
    />
  );
}

function FrontBleedBackdrop({
  style,
  texture,
}: {
  style: BusinessCardFrontBgStyle;
  texture: boolean;
}) {
  const baseClass =
    style === "deep"
      ? "absolute inset-0 bg-gradient-to-br from-[#16101f] via-purple-deep to-[#2d1f42]"
      : style === "soft"
        ? "absolute inset-0 bg-gradient-to-br from-purple-royal via-[#5c4088] to-purple-deep"
        : "absolute inset-0 bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660]";

  const radial =
    style === "soft"
      ? "radial-gradient(ellipse 85% 75% at 90% 28%, rgba(197,165,86,0.14) 0%, transparent 52%)"
      : style === "deep"
        ? "radial-gradient(ellipse 80% 72% at 100% 18%, rgba(122,80,176,0.48) 0%, transparent 56%)"
        : "radial-gradient(ellipse 90% 80% at 100% 20%, rgba(122,80,176,0.35) 0%, transparent 55%)";

  const radialOpacity = style === "deep" ? 0.55 : style === "soft" ? 0.42 : 0.5;

  return (
    <>
      <div className={baseClass} />
      {texture ? (
        <div aria-hidden className="noise pointer-events-none absolute inset-0" />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: radialOpacity, background: radial }}
      />
    </>
  );
}

const BACK_QR_PX: Record<BusinessCardBackQrSize, number> = {
  sm: 72,
  md: 92,
  lg: 108,
};

export function BusinessCardOneSidedCanvas(props: BusinessCardCanvasProps) {
  const {
    bookingQrDataUrl,
    brandFirst,
    brandRest,
    ownerName,
    ownerTitle,
    phone,
    email,
    url,
    bookingUrl,
    address,
    cardTexture = true,
    frontBgStyle = "classic",
  } = props;
  const urlDisplay = url.replace(/^https?:\/\//, "");
  const b = BUSINESS_CARD_BLEED_PX;

  return (
    <PrintPackPx
      trimWidthPx={BUSINESS_CARD_TRIM_W_PX}
      trimHeightPx={BUSINESS_CARD_TRIM_H_PX}
      bleedPx={BUSINESS_CARD_BLEED_PX}
      gutterPx={CARD_GUTTER_PX}
      trimClassName={TRIM_OVERFLOW_VISIBLE}
      bleedBackdrop={<FrontBleedBackdrop style={frontBgStyle} texture={cardTexture} />}
    >
      <div className="relative flex h-full w-full overflow-visible">
        <div
          aria-hidden
          className="pointer-events-none absolute z-[1] w-1 bg-gradient-to-b from-gold-premium via-gold-champagne to-gold-premium"
          style={{ left: -b, top: -b, bottom: -b }}
        />
        <div className="relative z-[2] flex min-h-0 min-w-0 flex-1 items-stretch">
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 py-5 pl-9 pr-3">
            <div>
              <p className="font-serif text-xl font-semibold leading-none tracking-tight text-neutral-light">
                {brandFirst}
              </p>
              {brandRest ? (
                <p className="mt-0.5 font-serif text-xl font-light leading-none tracking-tight text-gold-champagne">
                  {brandRest}
                </p>
              ) : null}
            </div>
            <div>
              <p className="font-serif text-base font-medium text-neutral-light">{ownerName}</p>
              <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.26em] text-gold-premium">
                {ownerTitle}
              </p>
            </div>
            <ul className="space-y-1 text-[9px] leading-snug text-neutral-light">
              <li>
                <span className="text-neutral-gray">M </span>
                {phone}
              </li>
              <li>
                <span className="text-neutral-gray">E </span>
                {email}
              </li>
              <li>
                <span className="text-neutral-gray">W </span>
                {urlDisplay}
              </li>
              <li>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-champagne/90 underline-offset-2 hover:underline"
                >
                  Book through Fresha
                </a>
              </li>
            </ul>
            <p className="text-[8px] leading-relaxed text-neutral-gray">
              {address.street}, {address.city} {address.postalCode}
            </p>
          </div>
          <div
            className="flex w-[172px] shrink-0 flex-col self-stretch border-l border-gold-premium/20 px-2.5 pb-2 pt-0"
            style={{
              width: 172 + b,
              marginTop: -b,
              marginBottom: -b,
              marginRight: -b,
              background: "linear-gradient(180deg, rgba(32,21,46,0.5) 0%, rgba(44,30,66,0.65) 100%)",
            }}
          >
            <div className="-translate-y-3 flex flex-col items-center justify-start gap-1">
              <Image
                src="/logo.svg"
                alt=""
                width={160}
                height={160}
                priority
                unoptimized
                className="block h-40 w-40 shrink-0 leading-none opacity-95 drop-shadow-[0_0_22px_rgba(197,165,86,0.4)]"
              />
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Fresha booking (same link as QR code)"
                className="block shrink-0 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-deep"
              >
                <Image
                  src={bookingQrDataUrl}
                  alt="QR code — book through Fresha"
                  width={56}
                  height={56}
                  priority
                  unoptimized
                  className="block rounded-sm leading-none ring-1 ring-gold-premium/30"
                />
              </a>
              <p className="max-w-[140px] text-center text-[5px] font-medium uppercase leading-none tracking-[0.08em] text-gold-premium">
                Book through Fresha
              </p>
            </div>
          </div>
        </div>
      </div>
    </PrintPackPx>
  );
}

export function BusinessCardFrontCanvas(props: BusinessCardCanvasProps) {
  const {
    brandFirst,
    brandRest,
    ownerName,
    ownerTitle,
    frontTagline,
    frontLogoSize = "md",
    frontLogoPlacement = "top-right",
    cardTexture = true,
    frontBgStyle = "classic",
    frontBrandDivider = false,
    frontLogoGlow = true,
  } = props;

  const brandBlock = (
    <div
      className={
        frontBrandDivider
          ? "min-w-0 border-b border-gold-premium/25 pb-3"
          : "min-w-0"
      }
    >
      <p className="font-serif text-2xl font-semibold leading-none tracking-tight text-neutral-light">
        {brandFirst}
      </p>
      {brandRest ? (
        <p className="mt-0.5 font-serif text-2xl font-light leading-none tracking-tight text-gold-champagne">
          {brandRest}
        </p>
      ) : null}
    </div>
  );

  const contactBlock = (
    <div className="mt-4">
      <p className="font-serif text-lg font-medium text-neutral-light">{ownerName}</p>
      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
        {ownerTitle}
      </p>
      <p className="mt-2.5 max-w-[260px] text-[9px] leading-snug text-neutral-gray">{frontTagline}</p>
    </div>
  );

  const textBlock = (
    <div className="min-w-0 flex-1">
      {brandBlock}
      {contactBlock}
    </div>
  );

  const logoEl = <BusinessCardFrontLogoImage size={frontLogoSize} glow={frontLogoGlow} />;
  const bottomLogoRow = (
    <div
      className={
        frontLogoPlacement === "bottom-right"
          ? "flex shrink-0 justify-end pt-3"
          : "flex shrink-0 justify-start pt-3"
      }
    >
      {logoEl}
    </div>
  );

  return (
    <PrintPackPx
      trimWidthPx={BUSINESS_CARD_TRIM_W_PX}
      trimHeightPx={BUSINESS_CARD_TRIM_H_PX}
      bleedPx={BUSINESS_CARD_BLEED_PX}
      gutterPx={CARD_GUTTER_PX}
      trimClassName={TRIM_OVERFLOW_VISIBLE}
      bleedBackdrop={<FrontBleedBackdrop style={frontBgStyle} texture={cardTexture} />}
    >
      <div className="relative flex h-full w-full flex-col overflow-visible px-8 py-7 pl-10">
        {frontLogoPlacement === "bottom-right" || frontLogoPlacement === "bottom-left" ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">{textBlock}</div>
            {bottomLogoRow}
          </div>
        ) : frontLogoPlacement === "top-left" ? (
          <div className="flex items-start gap-5">
            <div className="shrink-0">{logoEl}</div>
            <div className="flex min-w-0 flex-1 flex-col">
              {brandBlock}
              {contactBlock}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-5">
            {textBlock}
            <div className="shrink-0">{logoEl}</div>
          </div>
        )}
      </div>
    </PrintPackPx>
  );
}

export function BusinessCardBackCanvas(props: BusinessCardCanvasProps) {
  const {
    bookingQrDataUrl,
    phone,
    email,
    url,
    bookingUrl,
    address,
    backEyebrow,
    cardTexture = true,
    frontBgStyle = "classic",
    backQrSize = "md",
  } = props;
  const urlDisplay = url.replace(/^https?:\/\//, "");
  const qrPx = BACK_QR_PX[backQrSize];

  return (
    <PrintPackPx
      trimWidthPx={BUSINESS_CARD_TRIM_W_PX}
      trimHeightPx={BUSINESS_CARD_TRIM_H_PX}
      bleedPx={BUSINESS_CARD_BLEED_PX}
      gutterPx={CARD_GUTTER_PX}
      trimClassName={TRIM_OVERFLOW_VISIBLE}
      bleedBackdrop={<FrontBleedBackdrop style={frontBgStyle} texture={cardTexture} />}
    >
      <div className="relative flex h-full w-full flex-col overflow-visible">
        <div className="relative flex flex-1 items-center gap-5 px-6 py-5 pl-9">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold-premium">{backEyebrow}</p>
            <ul className="mt-3 space-y-1.5 text-[10px] leading-snug text-neutral-light">
              <li>
                <span className="text-neutral-gray">M </span>
                {phone}
              </li>
              <li>
                <span className="text-neutral-gray">E </span>
                {email}
              </li>
              <li>
                <span className="text-neutral-gray">W </span>
                {urlDisplay}
              </li>
              <li>
                <span className="text-neutral-gray">Book </span>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-champagne/90 underline-offset-2 hover:underline"
                >
                  fresha.com
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[9px] leading-relaxed text-neutral-gray">
              {address.street}
              <br />
              {address.city} {address.postalCode}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-1">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Fresha booking (same link as QR code)"
              className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium focus-visible:ring-offset-2 focus-visible:ring-offset-purple-royal"
            >
              <Image
                src={bookingQrDataUrl}
                alt="QR code — opens Fresha booking"
                width={qrPx}
                height={qrPx}
                priority
                unoptimized
                className="rounded-sm ring-1 ring-gold-premium/25"
                style={{ width: qrPx, height: qrPx }}
              />
            </a>
            <p
              className="text-center text-[7px] font-medium uppercase tracking-[0.12em] text-gold-premium"
              style={{ maxWidth: qrPx }}
            >
              Scan for Fresha
            </p>
          </div>
        </div>
      </div>
    </PrintPackPx>
  );
}
