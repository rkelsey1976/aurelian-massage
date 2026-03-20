"use client";

import Image from "next/image";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { PrintPackPx, cardBleedPx } from "@/components/marketing/print-crop-marks";

const CARD_W = 420;
const CARD_H = 240;
const CARD_BLEED_PX = cardBleedPx(CARD_W);
const CARD_GUTTER_PX = 24;
const BLEED_BOX_W = CARD_W + 2 * CARD_BLEED_PX;
const BLEED_BOX_H = CARD_H + 2 * CARD_BLEED_PX;
const SHEET_W = BLEED_BOX_W + 2 * CARD_GUTTER_PX;
const SHEET_H = BLEED_BOX_H + 2 * CARD_GUTTER_PX;

export type BusinessCardPreviewsProps = {
  bookingQrDataUrl: string;
  brandFirst: string;
  brandRest: string;
  owner: { name: string; title: string };
  phone: string;
  email: string;
  url: string;
  bookingUrl: string;
  address: { street: string; city: string; postalCode: string };
};

export function BusinessCardPreviews({
  bookingQrDataUrl,
  brandFirst,
  brandRest,
  owner,
  phone,
  email,
  url,
  bookingUrl,
  address,
}: BusinessCardPreviewsProps) {
  return (
    <div className="flex flex-col gap-14">
      <DownloadableGraphic
        id="bc-one-sided"
        filename="business-card-one-sided"
        title="One-sided (all on one face)"
        note={`Trim ${CARD_W}×${CARD_H}px with ~3mm bleed (${CARD_BLEED_PX}px) and crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: SHEET_W, height: SHEET_H }}
        highResFilename="business-card-one-sided-hires"
        highResPixelRatio={5}
      >
        <PrintPackPx
          trimWidthPx={CARD_W}
          trimHeightPx={CARD_H}
          bleedPx={CARD_BLEED_PX}
          gutterPx={CARD_GUTTER_PX}
          bleedBackdrop={
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660]" />
              <div aria-hidden className="noise pointer-events-none absolute inset-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 90% at 100% 50%, rgba(122,80,176,0.3) 0%, transparent 50%)",
                }}
              />
            </>
          }
        >
          <div className="relative flex h-full w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-premium via-gold-champagne to-gold-premium"
            />
            <div className="relative flex min-h-0 min-w-0 flex-1 items-stretch">
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
                  <p className="font-serif text-base font-medium text-neutral-light">{owner.name}</p>
                  <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.26em] text-gold-premium">
                    {owner.title}
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
                    {url.replace(/^https?:\/\//, "")}
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
                className="flex h-full w-[172px] shrink-0 flex-col border-l border-gold-premium/20 px-2.5 pb-2 pt-0"
                style={{
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
      </DownloadableGraphic>

      <DownloadableGraphic
        id="bc-front"
        filename="business-card-front"
        title="Front"
        note={`Trim ${CARD_W}×${CARD_H}px + bleed + crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: SHEET_W, height: SHEET_H }}
        highResFilename="business-card-front-hires"
        highResPixelRatio={5}
      >
        <PrintPackPx
          trimWidthPx={CARD_W}
          trimHeightPx={CARD_H}
          bleedPx={CARD_BLEED_PX}
          gutterPx={CARD_GUTTER_PX}
          bleedBackdrop={
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660]" />
              <div aria-hidden className="noise pointer-events-none absolute inset-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 100% 20%, rgba(122,80,176,0.35) 0%, transparent 55%)",
                }}
              />
            </>
          }
        >
          <div className="relative flex h-full w-full flex-col justify-between px-8 py-7 pl-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl font-semibold leading-none tracking-tight text-neutral-light">
                  {brandFirst}
                </p>
                {brandRest ? (
                  <p className="mt-0.5 font-serif text-2xl font-light leading-none tracking-tight text-gold-champagne">
                    {brandRest}
                  </p>
                ) : null}
              </div>
              <Image
                src="/logo.svg"
                alt=""
                width={160}
                height={160}
                priority
                unoptimized
                className="h-40 w-40 shrink-0 opacity-95 drop-shadow-[0_0_22px_rgba(197,165,86,0.4)]"
              />
            </div>
            <div>
              <p className="font-serif text-lg font-medium text-neutral-light">{owner.name}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                {owner.title}
              </p>
              <p className="mt-3 max-w-[260px] text-[9px] leading-snug text-neutral-gray">
                Swedish & aromatherapy · {address.city}
              </p>
            </div>
          </div>
        </PrintPackPx>
      </DownloadableGraphic>

      <DownloadableGraphic
        id="bc-back"
        filename="business-card-back"
        title="Back"
        note={`Trim ${CARD_W}×${CARD_H}px + bleed + crop marks. Standard (2×) or High-res (5×).`}
        dimensions={{ width: SHEET_W, height: SHEET_H }}
        highResFilename="business-card-back-hires"
        highResPixelRatio={5}
      >
        <PrintPackPx
          trimWidthPx={CARD_W}
          trimHeightPx={CARD_H}
          bleedPx={CARD_BLEED_PX}
          gutterPx={CARD_GUTTER_PX}
          bleedBackdrop={
            <>
              <div className="absolute inset-0 bg-purple-royal" />
              <div aria-hidden className="noise pointer-events-none absolute inset-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(197,165,86,0.08) 0%, transparent 45%, rgba(92,61,136,0.25) 100%)",
                }}
              />
            </>
          }
        >
          <div className="relative flex h-full w-full flex-col">
            <div className="relative flex flex-1 items-center gap-5 px-6 py-5 pl-9">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold-premium">
                  Visit · Book · Connect
                </p>
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
                    {url.replace(/^https?:\/\//, "")}
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
                    width={92}
                    height={92}
                    priority
                    unoptimized
                    className="rounded-sm ring-1 ring-gold-premium/25"
                  />
                </a>
                <p className="max-w-[92px] text-center text-[7px] font-medium uppercase tracking-[0.12em] text-gold-premium">
                  Scan for Fresha
                </p>
              </div>
            </div>
          </div>
        </PrintPackPx>
      </DownloadableGraphic>
    </div>
  );
}
