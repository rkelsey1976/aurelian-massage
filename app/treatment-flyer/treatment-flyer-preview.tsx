"use client";

import Image from "next/image";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import { PrintPackMm } from "@/components/marketing/print-crop-marks";

const FLYER_TRIM_W_MM = 148;
const FLYER_TRIM_H_MM = 210;
const FLYER_GUTTER_MM = 4;
const FLYER_SHEET_W_MM = FLYER_TRIM_W_MM + 2 * FLYER_GUTTER_MM;
const FLYER_SHEET_H_MM = FLYER_TRIM_H_MM + 2 * FLYER_GUTTER_MM;

export type FlyerService = {
  slug: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  featured?: boolean;
};

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
      note={`Trim ${FLYER_TRIM_W_MM}×${FLYER_TRIM_H_MM}mm A5, ${FLYER_GUTTER_MM}mm gutter + crop marks. Standard (2×) for proof; High-res (6×) for large print files.`}
      dimensions={{ width: `${FLYER_SHEET_W_MM}mm`, height: `${FLYER_SHEET_H_MM}mm` }}
      highResFilename="treatment-flyer-a5-hires"
      highResPixelRatio={6}
    >
      <PrintPackMm
        trimWidthMm={FLYER_TRIM_W_MM}
        trimHeightMm={FLYER_TRIM_H_MM}
        gutterMm={FLYER_GUTTER_MM}
      >
        <div className="relative h-full w-full">
        <div className="absolute inset-0">
          <Image
            src="/back-massage.png"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover object-center"
            sizes="600px"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(32,21,46,0.94) 0%, rgba(44,30,66,0.88) 45%, rgba(32,21,46,0.92) 100%)",
            }}
          />
          <div aria-hidden className="noise absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(122,80,176,0.4) 0%, transparent 55%)",
            }}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col px-[9mm] pb-[7mm] pt-[8mm]">
          <div className="flex items-start justify-between gap-[3mm]">
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[7pt] font-medium uppercase tracking-[0.28em] text-gold-premium">
                {address.city} city centre
              </p>
              <div className="mt-2">
                <p className="font-serif text-[17pt] font-semibold leading-tight tracking-tight text-neutral-light">
                  {brandFirst}
                </p>
                {brandRest ? (
                  <p className="font-serif text-[17pt] font-light leading-tight tracking-tight text-gold-champagne">
                    {brandRest}
                  </p>
                ) : null}
              </div>
              <div className="mt-2 h-px max-w-[52mm] bg-gradient-to-r from-gold-premium to-transparent" />
              <h2 className="mt-3 font-serif text-[13pt] font-semibold text-neutral-light">Our treatments</h2>
              <p className="mt-1 max-w-[78mm] text-[8pt] leading-snug text-neutral-gray">
                Swedish & aromatherapy — every session tailored to you. Durations and fees below; book online
                anytime.
              </p>
            </div>
            <Image
              src="/logo.svg"
              alt=""
              width={280}
              height={280}
              priority
              unoptimized
              className="h-[58mm] w-[58mm] shrink-0 opacity-95 drop-shadow-[0_0_42px_rgba(197,165,86,0.42)]"
            />
          </div>

          <ul className="mt-[5mm] flex min-h-0 flex-1 flex-col gap-[2.5mm] border-t border-gold-premium/15 pt-[4mm]">
            {services.map((s) => (
              <li
                key={s.slug}
                className={`flex gap-2 border-b border-gold-premium/10 pb-[2.5mm] text-[8pt] leading-snug last:border-b-0 last:pb-0 ${
                  s.featured ? "rounded-sm bg-gold-premium/5 px-1.5 py-1 -mx-1.5" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[9pt] font-semibold text-neutral-light">
                    {s.name}
                    {s.featured ? (
                      <span className="ml-1.5 align-middle text-[6pt] font-sans font-bold uppercase tracking-wider text-gold-premium">
                        Signature
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-[7pt] text-neutral-gray line-clamp-1">{s.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-serif text-[10pt] font-semibold text-gold-champagne">£{s.price}</p>
                  <p className="text-[7pt] text-neutral-gray">{s.duration} min</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-gold-premium/20 pt-[4mm]">
            <div className="min-w-0 text-[7pt] leading-snug text-neutral-gray">
              <p className="font-medium text-neutral-light">{phone}</p>
              <p className="mt-0.5">{address.street}</p>
              <p>
                {address.city} {address.postalCode}
              </p>
              <p className="mt-1 text-gold-premium/90">{url.replace(/^https?:\/\//, "")}</p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-0.5">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book on Fresha"
                className="leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-premium"
              >
                <Image
                  src={bookingQrDataUrl}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  unoptimized
                  className="rounded-sm ring-1 ring-gold-premium/30"
                />
              </a>
              <p className="max-w-[22mm] text-center text-[5.5pt] font-medium uppercase leading-tight tracking-[0.06em] text-gold-premium">
                Book through Fresha
              </p>
              <div
                aria-hidden
                className="mt-0.5 h-[1.75mm] w-[20mm] rounded-sm bg-purple-royal ring-1 ring-gold-premium/20"
              />
            </div>
          </div>
        </div>
      </div>
      </PrintPackMm>
    </DownloadableGraphic>
  );
}
