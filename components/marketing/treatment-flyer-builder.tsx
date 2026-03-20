"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

import {
  BUILDER_CUSTOM_BG_SELECT,
  BuilderCustomBackgroundControl,
  useBuilderCustomBackground,
} from "@/components/marketing/builder-custom-background";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";
import {
  FLYER_SHEET_H_MM,
  FLYER_SHEET_W_MM,
  FLYER_STYLE_OPTIONS,
  isTreatmentFlyerFillPresetId,
  TREATMENT_FLYER_FILL_OPTIONS,
  TreatmentFlyerCanvas,
  type FlyerBackground,
  type FlyerService,
  type TreatmentFlyerStyleId,
} from "@/components/marketing/treatment-flyer-canvas";

const PHOTO_BG_PRESETS = [
  { id: "back-massage", label: "Photo · massage", src: "/back-massage.png" },
  { id: "spa-setup", label: "Photo · spa room", src: "/spa-setup.png" },
  { id: "therapist-hero", label: "Photo · therapist", src: "/therapist-hero.png" },
] as const;

export type TreatmentFlyerBuilderInitial = {
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
};

const QR_OPTS: QRCode.QRCodeToDataURLOptions = {
  width: 180,
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#20152E", light: "#F7F7F7" },
};

/** Upper bound for rows — A5 layout gets tight beyond ~12–14; preview shows overflow risk. */
const MAX_SERVICES = 24;

function newRowSlug() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TreatmentFlyerBuilder({ initial }: { initial: TreatmentFlyerBuilderInitial }) {
  const [brandFirst, setBrandFirst] = useState(initial.brandFirst);
  const [brandRest, setBrandRest] = useState(initial.brandRest);
  const [headerEyebrow, setHeaderEyebrow] = useState(initial.headerEyebrow);
  const [treatmentsHeading, setTreatmentsHeading] = useState(initial.treatmentsHeading);
  const [treatmentsIntro, setTreatmentsIntro] = useState(initial.treatmentsIntro);
  const [street, setStreet] = useState(initial.address.street);
  const [city, setCity] = useState(initial.address.city);
  const [postalCode, setPostalCode] = useState(initial.address.postalCode);
  const [phone, setPhone] = useState(initial.phone);
  const [url, setUrl] = useState(initial.url);
  const [bookingUrl, setBookingUrl] = useState(initial.bookingUrl);
  const [services, setServices] = useState<FlyerService[]>(() =>
    initial.services.slice(0, MAX_SERVICES).map((s) => ({ ...s })),
  );
  const [bgPreset, setBgPreset] = useState<string>("back-massage");
  const [flyerStyle, setFlyerStyle] = useState<TreatmentFlyerStyleId>("aurelian");
  const {
    dataUrl: customBgUrl,
    clear: clearCustomBg,
    onFileChange: onCustomBgFile,
    fileHint: customBgFileHint,
  } = useBuilderCustomBackground();

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

  const background = useMemo((): FlyerBackground => {
    if (customBgUrl) return { kind: "image", src: customBgUrl };
    if (bgPreset.startsWith("fill-")) {
      const id = bgPreset.slice("fill-".length);
      if (isTreatmentFlyerFillPresetId(id)) return { kind: "fill", preset: id };
    }
    const photo = PHOTO_BG_PRESETS.find((b) => b.id === bgPreset);
    return { kind: "image", src: photo?.src ?? "/back-massage.png" };
  }, [customBgUrl, bgPreset]);

  const address = useMemo(
    () => ({ city, street, postalCode }),
    [city, street, postalCode],
  );

  const resetAll = useCallback(() => {
    setBrandFirst(initial.brandFirst);
    setBrandRest(initial.brandRest);
    setHeaderEyebrow(initial.headerEyebrow);
    setTreatmentsHeading(initial.treatmentsHeading);
    setTreatmentsIntro(initial.treatmentsIntro);
    setStreet(initial.address.street);
    setCity(initial.address.city);
    setPostalCode(initial.address.postalCode);
    setPhone(initial.phone);
    setUrl(initial.url);
    setBookingUrl(initial.bookingUrl);
    setServices(initial.services.slice(0, MAX_SERVICES).map((s) => ({ ...s })));
    setBgPreset("back-massage");
    setFlyerStyle("aurelian");
    clearCustomBg();
    setQrDataUrl(initial.bookingQrDataUrl);
  }, [initial, clearCustomBg]);

  const updateService = (index: number, patch: Partial<FlyerService>) => {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const addService = () => {
    if (services.length >= MAX_SERVICES) return;
    setServices((prev) => [
      ...prev,
      {
        slug: newRowSlug(),
        name: "New treatment",
        duration: 60,
        price: 55,
        description: "Short menu line — edit me.",
        featured: false,
      },
    ]);
  };

  const removeService = (index: number) => {
    if (services.length <= 1) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Brand — line 1</label>
            <input
              value={brandFirst}
              onChange={(e) => setBrandFirst(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Brand — line 2 (gold)</label>
            <input
              value={brandRest}
              onChange={(e) => setBrandRest(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Header eyebrow (small caps)</label>
            <input
              value={headerEyebrow}
              onChange={(e) => setHeaderEyebrow(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Treatments section title</label>
            <input
              value={treatmentsHeading}
              onChange={(e) => setTreatmentsHeading(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Treatments intro blurb</label>
            <textarea
              value={treatmentsIntro}
              onChange={(e) => setTreatmentsIntro(e.target.value)}
              rows={3}
              maxLength={280}
              className="mt-1 w-full resize-y rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Flyer style</label>
          <select
            value={flyerStyle}
            onChange={(e) => setFlyerStyle(e.target.value as TreatmentFlyerStyleId)}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            {FLYER_STYLE_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[11px] leading-snug text-neutral-gray">
            {FLYER_STYLE_OPTIONS.find((o) => o.id === flyerStyle)?.hint}
          </p>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Background</label>
          <select
            value={customBgUrl ? BUILDER_CUSTOM_BG_SELECT : bgPreset}
            onChange={(e) => {
              const v = e.target.value;
              if (v === BUILDER_CUSTOM_BG_SELECT) return;
              clearCustomBg();
              setBgPreset(v);
            }}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            <optgroup label="Photos">
              {PHOTO_BG_PRESETS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="No photo — gradients">
              {TREATMENT_FLYER_FILL_OPTIONS.map((b) => (
                <option key={b.id} value={`fill-${b.id}`}>
                  {b.label}
                </option>
              ))}
            </optgroup>
            {customBgUrl ? <option value={BUILDER_CUSTOM_BG_SELECT}>Uploaded image</option> : null}
          </select>
        </div>
        <BuilderCustomBackgroundControl
          inputId="treatment-flyer-bg-upload"
          dataUrl={customBgUrl}
          fileHint={customBgFileHint}
          onFileChange={onCustomBgFile}
          onClear={clearCustomBg}
        />

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
            <label className="text-xs text-neutral-gray">Website (full URL)</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-neutral-gray">Booking link (QR updates automatically)</label>
            <input
              value={bookingUrl}
              onChange={(e) => setBookingUrl(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
            />
          </div>
        </div>

        <div className="border-t border-gold-premium/15 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-gold-premium">Treatments ({services.length}/{MAX_SERVICES})</p>
            <button
              type="button"
              onClick={addService}
              disabled={services.length >= MAX_SERVICES}
              title={
                services.length >= MAX_SERVICES
                  ? `This template supports up to ${MAX_SERVICES} rows for readable A5 print`
                  : undefined
              }
              className="rounded-md border border-gold-premium/35 px-2 py-1 text-xs font-medium text-gold-premium hover:bg-purple-plum/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add row
            </button>
          </div>
          <ul className="mt-3 space-y-3">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className="rounded-lg border border-gold-premium/15 bg-purple-royal/40 p-3 text-xs"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-medium text-neutral-gray">Row {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeService(i)}
                    disabled={services.length <= 1}
                    className="text-gold-premium/80 hover:text-gold-premium disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={s.name}
                  onChange={(e) => updateService(i, { name: e.target.value })}
                  placeholder="Name"
                  className="mb-2 w-full rounded border border-gold-premium/20 bg-purple-royal px-2 py-1.5 text-sm text-neutral-light"
                />
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <label className="flex flex-col gap-0.5 text-[10px] text-neutral-gray">
                    £ Price
                    <input
                      type="number"
                      min={0}
                      value={s.price}
                      onChange={(e) => updateService(i, { price: Number(e.target.value) || 0 })}
                      className="rounded border border-gold-premium/20 bg-purple-royal px-2 py-1 text-sm text-neutral-light"
                    />
                  </label>
                  <label className="flex flex-col gap-0.5 text-[10px] text-neutral-gray">
                    Minutes
                    <input
                      type="number"
                      min={5}
                      step={5}
                      value={s.duration}
                      onChange={(e) => updateService(i, { duration: Number(e.target.value) || 0 })}
                      className="rounded border border-gold-premium/20 bg-purple-royal px-2 py-1 text-sm text-neutral-light"
                    />
                  </label>
                </div>
                <label className="mb-2 flex flex-col gap-0.5 text-[10px] text-neutral-gray">
                  Description (about two lines on the flyer)
                  <textarea
                    value={s.description}
                    onChange={(e) => updateService(i, { description: e.target.value })}
                    placeholder="Short blurb — wraps here while you edit"
                    rows={4}
                    className="min-h-[5.25rem] w-full resize-y rounded border border-gold-premium/20 bg-purple-royal px-2 py-1.5 text-sm text-neutral-light"
                  />
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-neutral-gray">
                  <input
                    type="checkbox"
                    checked={!!s.featured}
                    onChange={(e) => updateService(i, { featured: e.target.checked })}
                    className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
                  />
                  Signature highlight
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium hover:bg-purple-plum/30"
        >
          Reset to site defaults
        </button>
      </div>

      <div>
        <DownloadableGraphic
          id="treatment-flyer-builder-preview"
          filename="treatment-flyer-custom"
          title="Live A5 preview — trim 148×210mm + bleed + crop marks"
          note="Edits update live. Standard (2×) or High-res (6×) PNG — same print spec as /treatment-flyer."
          dimensions={{ width: `${FLYER_SHEET_W_MM}mm`, height: `${FLYER_SHEET_H_MM}mm` }}
          highResFilename="treatment-flyer-custom-hires"
          highResPixelRatio={6}
          frameClassName="relative overflow-hidden"
        >
          <TreatmentFlyerCanvas
            bookingQrDataUrl={qrDataUrl}
            brandFirst={brandFirst}
            brandRest={brandRest}
            headerEyebrow={headerEyebrow}
            treatmentsHeading={treatmentsHeading}
            treatmentsIntro={treatmentsIntro}
            address={address}
            phone={phone}
            bookingUrl={bookingUrl}
            url={url}
            services={services}
            background={background}
            style={flyerStyle}
          />
        </DownloadableGraphic>
      </div>
    </div>
  );
}
