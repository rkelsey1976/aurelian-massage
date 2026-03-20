import Image from "next/image";

import { PrintPackMm } from "@/components/marketing/print-crop-marks";

export const FLYER_TRIM_W_MM = 148;
export const FLYER_TRIM_H_MM = 210;
export const FLYER_BLEED_MM = 3;
export const FLYER_GUTTER_MM = 4;
const FLYER_BLEED_W_MM = FLYER_TRIM_W_MM + 2 * FLYER_BLEED_MM;
const FLYER_BLEED_H_MM = FLYER_TRIM_H_MM + 2 * FLYER_BLEED_MM;
export const FLYER_SHEET_W_MM = FLYER_BLEED_W_MM + 2 * FLYER_GUTTER_MM;
export const FLYER_SHEET_H_MM = FLYER_BLEED_H_MM + 2 * FLYER_GUTTER_MM;

export type FlyerService = {
  slug: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  featured?: boolean;
};

/** Visual theme — typography, overlays, list chrome, accent band. */
export type TreatmentFlyerStyleId = "aurelian" | "minimal" | "noir" | "editorial";

export const FLYER_STYLE_OPTIONS: { id: TreatmentFlyerStyleId; label: string; hint: string }[] = [
  {
    id: "aurelian",
    label: "Aurelian — classic",
    hint: "Photo + royal purple wash, gold rule, noise (default site look).",
  },
  {
    id: "minimal",
    label: "Minimal — airy",
    hint: "Lighter overlay, softer dividers, calm footer; photo reads through.",
  },
  {
    id: "noir",
    label: "Noir — dramatic",
    hint: "Deep shadows, high contrast, bold gold prices.",
  },
  {
    id: "editorial",
    label: "Editorial — magazine",
    hint: "Heavy type stack, treatment cards, gold accents.",
  },
];

type LayerStyle = {
  overlay: string;
  radial?: string;
  noiseOpacity: number;
};

/** Non-photo bleed backgrounds (gradients / solids + texture). */
export type TreatmentFlyerFillPresetId =
  | "royal-gradient"
  | "deep-plum"
  | "gold-veil"
  | "charcoal-violet"
  | "aubergine-soft";

export const TREATMENT_FLYER_FILL_OPTIONS: { id: TreatmentFlyerFillPresetId; label: string }[] = [
  { id: "royal-gradient", label: "No photo · royal gradient" },
  { id: "deep-plum", label: "No photo · deep plum" },
  { id: "gold-veil", label: "No photo · gold veil" },
  { id: "charcoal-violet", label: "No photo · charcoal violet" },
  { id: "aubergine-soft", label: "No photo · soft aubergine" },
];

export type FlyerBackground =
  | { kind: "image"; src: string }
  | { kind: "fill"; preset: TreatmentFlyerFillPresetId };

type FillLayerSpec = {
  base: string;
  accentRadial?: string;
  accentRadialOpacity?: number;
  noise: number;
};

const FILL_LAYERS: Record<TreatmentFlyerFillPresetId, FillLayerSpec> = {
  "royal-gradient": {
    base: "linear-gradient(135deg, #20152E 0%, #2C1E42 52%, #3B2660 100%)",
    accentRadial: "radial-gradient(ellipse 90% 70% at 100% 0%, rgba(122,80,176,0.35) 0%, transparent 55%)",
    accentRadialOpacity: 0.55,
    noise: 0.42,
  },
  "deep-plum": {
    base: "linear-gradient(168deg, #1a0f28 0%, #2C1E42 42%, #20152E 100%)",
    accentRadial: "radial-gradient(ellipse 70% 55% at 0% 100%, rgba(92,61,136,0.4) 0%, transparent 50%)",
    accentRadialOpacity: 0.45,
    noise: 0.48,
  },
  "gold-veil": {
    base: "linear-gradient(180deg, #20152E 0%, #261a38 55%, #1e1530 100%)",
    accentRadial: "radial-gradient(ellipse 85% 60% at 85% 8%, rgba(197,165,86,0.28) 0%, transparent 52%)",
    accentRadialOpacity: 0.65,
    noise: 0.38,
  },
  "charcoal-violet": {
    base: "linear-gradient(160deg, #0e0a14 0%, #1e1530 48%, #120e1c 100%)",
    accentRadial: "radial-gradient(ellipse 65% 50% at 50% 100%, rgba(122,80,176,0.18) 0%, transparent 48%)",
    accentRadialOpacity: 0.5,
    noise: 0.55,
  },
  "aubergine-soft": {
    base: "linear-gradient(180deg, #2C1E42 0%, #3d2a5c 40%, #2C1E42 100%)",
    accentRadial: "radial-gradient(ellipse 80% 65% at 50% 0%, rgba(223,201,138,0.1) 0%, transparent 50%)",
    accentRadialOpacity: 0.55,
    noise: 0.32,
  },
};

export function isTreatmentFlyerFillPresetId(id: string): id is TreatmentFlyerFillPresetId {
  return Object.prototype.hasOwnProperty.call(FILL_LAYERS, id);
}

const LAYERS: Record<TreatmentFlyerStyleId, LayerStyle> = {
  aurelian: {
    overlay:
      "linear-gradient(165deg, rgba(32,21,46,0.94) 0%, rgba(44,30,66,0.88) 45%, rgba(32,21,46,0.92) 100%)",
    radial: "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(122,80,176,0.4) 0%, transparent 55%)",
    noiseOpacity: 1,
  },
  minimal: {
    overlay:
      "linear-gradient(180deg, rgba(32,21,46,0.58) 0%, rgba(32,21,46,0.72) 45%, rgba(32,21,46,0.78) 100%)",
    radial: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(197,165,86,0.08) 0%, transparent 50%)",
    noiseOpacity: 0.35,
  },
  noir: {
    overlay:
      "linear-gradient(165deg, rgba(8,5,14,0.94) 0%, rgba(20,14,32,0.92) 40%, rgba(10,8,18,0.96) 100%)",
    radial: "radial-gradient(ellipse 70% 55% at 80% 100%, rgba(122,80,176,0.22) 0%, transparent 50%)",
    noiseOpacity: 0.85,
  },
  editorial: {
    overlay:
      "linear-gradient(168deg, rgba(32,21,46,0.97) 0%, rgba(44,30,66,0.94) 35%, rgba(32,21,46,0.96) 100%)",
    radial: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(197,165,86,0.12) 0%, transparent 45%)",
    noiseOpacity: 0.45,
  },
};

export type TreatmentFlyerCanvasProps = {
  bookingQrDataUrl: string;
  brandFirst: string;
  brandRest: string;
  headerEyebrow: string;
  treatmentsHeading: string;
  treatmentsIntro: string;
  address: { city: string; street: string; postalCode: string };
  phone: string;
  bookingUrl: string;
  url: string;
  services: FlyerService[];
  /** Photo (path or data URL) or CSS-only fill preset — no image. */
  background: FlyerBackground;
  /** Visual style preset. */
  style?: TreatmentFlyerStyleId;
};

function BleedBackdrop({ background, style }: { background: FlyerBackground; style: TreatmentFlyerStyleId }) {
  const L = LAYERS[style];

  if (background.kind === "fill") {
    const F = FILL_LAYERS[background.preset];
    return (
      <div className="absolute inset-0">
        <div aria-hidden className="absolute inset-0" style={{ background: F.base }} />
        {F.accentRadial ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: F.accentRadial,
              opacity: F.accentRadialOpacity ?? 0.5,
            }}
          />
        ) : null}
        {F.noise > 0 ? (
          <div aria-hidden className="noise pointer-events-none absolute inset-0" style={{ opacity: F.noise }} />
        ) : null}
        {L.radial ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: L.radial, opacity: 0.22 }}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={background.src}
        alt=""
        fill
        priority
        unoptimized
        className="object-cover object-center"
        sizes="600px"
      />
      <div aria-hidden className="absolute inset-0" style={{ background: L.overlay }} />
      {L.noiseOpacity > 0 ? (
        <div aria-hidden className="noise pointer-events-none absolute inset-0" style={{ opacity: L.noiseOpacity }} />
      ) : null}
      {L.radial ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: L.radial }}
        />
      ) : null}
    </div>
  );
}

export function TreatmentFlyerCanvas({
  bookingQrDataUrl,
  brandFirst,
  brandRest,
  headerEyebrow,
  treatmentsHeading,
  treatmentsIntro,
  address,
  phone,
  bookingUrl,
  url,
  services,
  background,
  style: styleProp = "aurelian",
}: TreatmentFlyerCanvasProps) {
  const style = styleProp;

  const eyebrow =
    style === "editorial"
      ? "text-[6.5pt] font-semibold uppercase tracking-[0.32em] text-gold-champagne"
      : style === "minimal"
        ? "text-[7pt] font-medium uppercase tracking-[0.26em] text-gold-premium/90"
        : "text-[7pt] font-medium uppercase tracking-[0.28em] text-gold-premium";

  const brandFirstCls =
    style === "editorial"
      ? "font-serif text-[18pt] font-semibold leading-[1.05] tracking-tight text-neutral-light"
      : "font-serif text-[17pt] font-semibold leading-tight tracking-tight text-neutral-light";

  const brandRestCls =
    style === "editorial"
      ? "font-serif text-[18pt] font-light leading-[1.05] tracking-tight text-gold-champagne"
      : "font-serif text-[17pt] font-light leading-tight tracking-tight text-gold-champagne";

  const ruleCls =
    style === "minimal"
      ? "mt-2 h-px max-w-[48mm] bg-gradient-to-r from-white/25 to-transparent"
      : style === "noir"
        ? "mt-2 h-[2px] max-w-[52mm] bg-gradient-to-r from-gold-premium via-gold-champagne to-transparent"
        : style === "editorial"
          ? "mt-2.5 h-px w-[18mm] bg-gold-premium"
          : "mt-2 h-px max-w-[52mm] bg-gradient-to-r from-gold-premium to-transparent";

  const h2Cls =
    style === "editorial"
      ? "mt-4 font-serif text-[14pt] font-semibold tracking-tight text-neutral-light"
      : "mt-3 font-serif text-[13pt] font-semibold text-neutral-light";

  const introCls =
    style === "minimal"
      ? "mt-1 max-w-[78mm] text-[8pt] leading-snug text-neutral-light/75"
      : style === "noir"
        ? "mt-1 max-w-[78mm] text-[8pt] leading-snug text-neutral-gray"
        : "mt-1 max-w-[78mm] text-[8pt] leading-snug text-neutral-gray";

  const listWrapCls =
    style === "editorial"
      ? "mt-[5mm] flex shrink-0 flex-col gap-[2mm] border-t border-gold-premium/20 pt-[4mm]"
      : style === "minimal"
        ? "mt-[5mm] flex shrink-0 flex-col gap-[2mm] border-t border-white/10 pt-[4mm]"
        : "mt-[5mm] flex shrink-0 flex-col gap-[2.5mm] border-t border-gold-premium/15 pt-[4mm]";

  const itemBase =
    style === "editorial"
      ? "flex gap-2 rounded-md border border-gold-premium/12 bg-purple-deep/35 px-2 py-1.5 text-[8pt] leading-snug"
      : style === "minimal"
        ? "flex gap-2 border-b border-white/8 pb-[2.5mm] text-[8pt] leading-snug last:border-b-0 last:pb-0"
        : "flex gap-2 border-b border-gold-premium/10 pb-[2.5mm] text-[8pt] leading-snug last:border-b-0 last:pb-0";

  const featuredExtra =
    style === "editorial"
      ? "border-gold-premium/35 bg-gold-premium/8"
      : style === "minimal"
        ? "rounded-sm bg-white/5 px-1.5 py-1 -mx-1.5"
        : "rounded-sm bg-gold-premium/5 px-1.5 py-1 -mx-1.5";

  const sigCls =
    style === "noir"
      ? "ml-1.5 align-middle text-[6pt] font-sans font-bold uppercase tracking-wider text-gold-champagne"
      : "ml-1.5 align-middle text-[6pt] font-sans font-bold uppercase tracking-wider text-gold-premium";

  const priceCls =
    style === "noir"
      ? "font-serif text-[11pt] font-semibold text-gold-champagne"
      : "font-serif text-[10pt] font-semibold text-gold-champagne";

  const durationCls =
    style === "minimal" ? "text-[7pt] text-neutral-light/55" : "text-[7pt] text-neutral-gray";

  const footerBorder =
    style === "minimal" ? "border-t border-white/12" : "border-t border-gold-premium/20";

  const footerText = style === "minimal" ? "text-[7pt] leading-snug text-neutral-light/65" : "text-[7pt] leading-snug text-neutral-gray";

  const phoneCls =
    style === "minimal" ? "font-medium text-neutral-light/90" : "font-medium text-neutral-light";

  const urlCls =
    style === "noir" ? "mt-1 text-gold-champagne/90" : "mt-1 text-gold-premium/90";

  const qrRing =
    style === "minimal"
      ? "rounded-sm ring-1 ring-white/20"
      : style === "noir"
        ? "rounded-sm ring-1 ring-gold-champagne/35"
        : "rounded-sm ring-1 ring-gold-premium/30";

  const bookLabel =
    style === "minimal"
      ? "max-w-[22mm] text-center text-[5.5pt] font-medium uppercase leading-tight tracking-[0.06em] text-neutral-light/70"
      : "max-w-[22mm] text-center text-[5.5pt] font-medium uppercase leading-tight tracking-[0.06em] text-gold-premium";

  const logoCls =
    style === "editorial"
      ? "h-[56mm] w-[56mm] shrink-0 opacity-95 drop-shadow-[0_0_28px_rgba(197,165,86,0.38)]"
      : style === "noir"
        ? "h-[58mm] w-[58mm] shrink-0 opacity-[0.98] drop-shadow-[0_0_48px_rgba(197,165,86,0.35)]"
        : "h-[58mm] w-[58mm] shrink-0 opacity-95 drop-shadow-[0_0_42px_rgba(197,165,86,0.42)]";

  return (
    <PrintPackMm
      trimWidthMm={FLYER_TRIM_W_MM}
      trimHeightMm={FLYER_TRIM_H_MM}
      bleedMm={FLYER_BLEED_MM}
      gutterMm={FLYER_GUTTER_MM}
      bleedBackdrop={<BleedBackdrop background={background} style={style} />}
    >
      <div className="relative z-10 flex h-full flex-col px-[9mm] pb-[7mm] pt-[8mm]">
        <div className="flex items-start justify-between gap-[3mm]">
          <div className="min-w-0 flex-1 pr-1">
            <p className={eyebrow}>{headerEyebrow}</p>
            <div className="mt-2">
              <p className={brandFirstCls}>{brandFirst}</p>
              {brandRest ? <p className={brandRestCls}>{brandRest}</p> : null}
            </div>
            <div className={ruleCls} aria-hidden />
            <h2 className={h2Cls}>{treatmentsHeading}</h2>
            <p className={introCls}>{treatmentsIntro}</p>
          </div>
          <Image
            src="/logo.svg"
            alt=""
            width={280}
            height={280}
            priority
            unoptimized
            className={logoCls}
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ul className={listWrapCls}>
            {services.map((s) => (
              <li
                key={s.slug}
                className={`${itemBase} ${s.featured ? featuredExtra : ""}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[9pt] font-semibold text-neutral-light">
                    {s.name}
                    {s.featured ? <span className={sigCls}>Signature</span> : null}
                  </p>
                  <p className="mt-0.5 text-[7pt] text-neutral-gray line-clamp-1">{s.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className={priceCls}>£{s.price}</p>
                  <p className={durationCls}>{s.duration} min</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="min-h-0 min-w-0 flex-1" aria-hidden />
        </div>

        <div className={`flex shrink-0 items-end justify-between gap-3 pt-[4mm] ${footerBorder}`}>
          <div className={`min-w-0 ${footerText}`}>
            <p className={phoneCls}>{phone}</p>
            <p className="mt-0.5">{address.street}</p>
            <p>
              {address.city} {address.postalCode}
            </p>
            <p className={urlCls}>{url.replace(/^https?:\/\//, "")}</p>
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
                className={qrRing}
              />
            </a>
            <p className={bookLabel}>Book through Fresha</p>
          </div>
        </div>
      </div>
    </PrintPackMm>
  );
}
