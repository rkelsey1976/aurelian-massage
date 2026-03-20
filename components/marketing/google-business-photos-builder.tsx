"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  BUILDER_CUSTOM_BG_SELECT,
  BuilderCustomBackgroundControl,
  useBuilderCustomBackground,
} from "@/components/marketing/builder-custom-background";
import {
  GBP_BACKGROUNDS,
  GoogleBusinessBackdrop,
  type GbpBackgroundId,
  type GbpPhotoOverlay,
} from "@/components/marketing/gbp-shared-backgrounds";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

export type GoogleBusinessPhotosBuilderDefaults = {
  line1: string;
  line2: string;
  caption: string;
};

const FORMATS = [
  {
    id: "logo-720",
    kind: "logo" as const,
    w: 720,
    h: 720,
    label: "Logo / profile — 720×720",
    filename: "google-business-profile-logo-720",
    hint: "Square logo upload for your Business Profile. Keep the mark centred with clear padding.",
  },
  {
    id: "listing-720",
    kind: "listing" as const,
    w: 720,
    h: 720,
    label: "Listing photo — 720×720",
    filename: "google-business-listing-photo-720",
    hint: "Square gallery image — interior, treatment room, or team. Optional caption strip at the bottom.",
  },
  {
    id: "listing-1200-900",
    kind: "listing" as const,
    w: 1200,
    h: 900,
    label: "Listing / post — 1200×900 (4:3)",
    filename: "google-business-listing-photo-1200x900",
    hint: "Wider listing or post-style image. Good for room shots with a readable caption band.",
  },
] as const;

type FormatId = (typeof FORMATS)[number]["id"];

export function GoogleBusinessPhotosBuilder({
  defaults,
}: {
  defaults: GoogleBusinessPhotosBuilderDefaults;
}) {
  const [formatId, setFormatId] = useState<FormatId>("logo-720");
  const [line1, setLine1] = useState(defaults.line1);
  const [line2, setLine2] = useState(defaults.line2);
  const [caption, setCaption] = useState(defaults.caption);
  const [showWordmark, setShowWordmark] = useState(true);
  const [showCaptionBand, setShowCaptionBand] = useState(true);
  const [bgId, setBgId] = useState<GbpBackgroundId>("gradient-royal");
  const [photoOverlay, setPhotoOverlay] = useState<GbpPhotoOverlay>("soft");
  const {
    dataUrl: customBgUrl,
    clear: clearCustomBg,
    onFileChange: onCustomBgFile,
    fileHint: customBgFileHint,
  } = useBuilderCustomBackground();

  const format = useMemo(() => FORMATS.find((f) => f.id === formatId)!, [formatId]);
  const bg = useMemo(() => GBP_BACKGROUNDS.find((b) => b.id === bgId)!, [bgId]);
  const isPhoto = !customBgUrl && "src" in bg && Boolean(bg.src);
  const usePhotoLikeBg = Boolean(customBgUrl) || isPhoto;

  const reset = () => {
    setFormatId("logo-720");
    setLine1(defaults.line1);
    setLine2(defaults.line2);
    setCaption(defaults.caption);
    setShowWordmark(true);
    setShowCaptionBand(true);
    setBgId("gradient-royal");
    setPhotoOverlay("soft");
    clearCustomBg();
  };

  const isLogo = format.kind === "logo";
  const listingLarge = format.w >= 1000;

  const logoPx = isLogo ? 268 : 0;
  const captionTitleCls = listingLarge
    ? "font-serif text-[28px] font-semibold leading-tight text-neutral-light"
    : "font-serif text-[17px] font-semibold leading-tight text-neutral-light";
  const captionGoldCls = listingLarge
    ? "mt-0.5 font-serif text-[26px] font-light leading-tight text-gold-champagne"
    : "mt-0.5 font-serif text-[15px] font-light leading-tight text-gold-champagne";
  const captionMetaCls = listingLarge ? "mt-1.5 text-[13px] text-neutral-gray" : "mt-1 text-[10px] text-neutral-gray";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Photo type</label>
          <select
            value={formatId}
            onChange={(e) => setFormatId(e.target.value as FormatId)}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            {FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-[11px] leading-snug text-neutral-gray">{format.hint}</p>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Background</label>
          <select
            value={customBgUrl ? BUILDER_CUSTOM_BG_SELECT : bgId}
            onChange={(e) => {
              const v = e.target.value;
              if (v === BUILDER_CUSTOM_BG_SELECT) return;
              clearCustomBg();
              setBgId(v as GbpBackgroundId);
            }}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            {GBP_BACKGROUNDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
            {customBgUrl ? <option value={BUILDER_CUSTOM_BG_SELECT}>Uploaded image</option> : null}
          </select>
        </div>

        {usePhotoLikeBg ? (
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Photo tint</label>
            <select
              value={photoOverlay}
              onChange={(e) => setPhotoOverlay(e.target.value as GbpPhotoOverlay)}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            >
              <option value="soft">Soft — logo &amp; faces read clearly</option>
              <option value="medium">Medium</option>
              <option value="strong">Strong — maximum contrast for text</option>
            </select>
          </div>
        ) : null}

        <BuilderCustomBackgroundControl
          inputId="gbp-photos-builder-bg-upload"
          dataUrl={customBgUrl}
          fileHint={customBgFileHint}
          onFileChange={onCustomBgFile}
          onClear={clearCustomBg}
        />

        {isLogo ? (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
            <input
              type="checkbox"
              checked={showWordmark}
              onChange={(e) => setShowWordmark(e.target.checked)}
              className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
            />
            Show name under logo
          </label>
        ) : (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
            <input
              type="checkbox"
              checked={showCaptionBand}
              onChange={(e) => setShowCaptionBand(e.target.checked)}
              className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
            />
            Show bottom caption band
          </label>
        )}

        <div>
          <label className="text-xs text-neutral-gray">Name — line 1</label>
          <input
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            maxLength={34}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-gray">Name — line 2 (gold)</label>
          <input
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            maxLength={34}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            placeholder="Optional"
          />
        </div>

        {!isLogo ? (
          <div>
            <label className="text-xs text-neutral-gray">Caption line (under title, optional)</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={72}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
              placeholder="e.g. Swedish & aromatherapy · Bath"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium hover:bg-purple-plum/30"
        >
          Reset to site defaults
        </button>
      </div>

      <div className="min-w-0 overflow-x-auto">
        <DownloadableGraphic
          key={formatId}
          id="gbp-photos-builder-preview"
          filename={format.filename}
          title={`Live preview — ${format.w}×${format.h}px`}
          note="Use JPG or PNG under 5MB for Google. Export uses 2× pixel ratio for a crisp upload. Prefer real photos of your space for listing images — this tool is for branded overlays when you need them."
          dimensions={{ width: format.w, height: format.h }}
          pixelRatio={2}
          frameClassName="relative overflow-hidden rounded-lg shadow-purple-depth max-w-full"
        >
          <div
            className={`relative h-full w-full overflow-hidden ${usePhotoLikeBg ? "bg-purple-royal" : "bg-purple-deep"}`}
          >
            <GoogleBusinessBackdrop
              customImageUrl={customBgUrl}
              bg={bg}
              sizesHintPx={format.w}
              photoOverlay={usePhotoLikeBg ? photoOverlay : "strong"}
              noiseOpacity={usePhotoLikeBg ? 0.45 : 0.65}
            />

            {isLogo ? (
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 text-center">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={280}
                  height={280}
                  priority
                  unoptimized
                  className="shrink-0 opacity-[0.97] drop-shadow-[0_6px_32px_rgba(197,165,86,0.38)]"
                  style={{ width: logoPx, height: logoPx }}
                />
                {showWordmark ? (
                  <div className="mt-5 max-w-[90%]">
                    {line1 ? (
                      <p className="font-serif text-[22px] font-semibold leading-tight tracking-tight text-neutral-light">
                        {line1}
                      </p>
                    ) : null}
                    {line2 ? (
                      <p className="mt-0.5 font-serif text-[22px] font-light leading-tight tracking-tight text-gold-champagne">
                        {line2}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                {showCaptionBand ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-purple-royal via-purple-royal/92 to-transparent px-6 pb-5 pt-20 text-center">
                    {line1 ? <p className={captionTitleCls}>{line1}</p> : null}
                    {line2 ? <p className={captionGoldCls}>{line2}</p> : null}
                    {caption ? <p className={captionMetaCls}>{caption}</p> : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </DownloadableGraphic>
      </div>
    </div>
  );
}
