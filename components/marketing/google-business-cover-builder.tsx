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
} from "@/components/marketing/gbp-shared-backgrounds";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

/** Google Business Profile cover — 16:9 (recommended upload size). */
export const GBP_COVER_W = 1024;
export const GBP_COVER_H = 576;

export type GoogleBusinessCoverBuilderDefaults = {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  urlDisplay: string;
  regionLine: string;
};

type GbpLayout = "centre" | "left-brand" | "lower-band";

export function GoogleBusinessCoverBuilder({
  defaults,
}: {
  defaults: GoogleBusinessCoverBuilderDefaults;
}) {
  const [layout, setLayout] = useState<GbpLayout>("centre");
  const [eyebrow, setEyebrow] = useState(defaults.eyebrow);
  const [line1, setLine1] = useState(defaults.line1);
  const [line2, setLine2] = useState(defaults.line2);
  const [body, setBody] = useState(defaults.body);
  const [regionLine, setRegionLine] = useState(defaults.regionLine);
  const [urlDisplay, setUrlDisplay] = useState(defaults.urlDisplay);
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const [showRegion, setShowRegion] = useState(true);
  const [showUrl, setShowUrl] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [bgId, setBgId] = useState<GbpBackgroundId>("gradient-royal");
  const {
    dataUrl: customBgUrl,
    clear: clearCustomBg,
    onFileChange: onCustomBgFile,
    fileHint: customBgFileHint,
  } = useBuilderCustomBackground();

  const bg = useMemo(() => GBP_BACKGROUNDS.find((b) => b.id === bgId)!, [bgId]);
  const isPhoto = !customBgUrl && "src" in bg && Boolean(bg.src);
  const usePhotoLikeBg = Boolean(customBgUrl) || isPhoto;

  const reset = () => {
    setLayout("centre");
    setEyebrow(defaults.eyebrow);
    setLine1(defaults.line1);
    setLine2(defaults.line2);
    setBody(defaults.body);
    setRegionLine(defaults.regionLine);
    setUrlDisplay(defaults.urlDisplay);
    setShowEyebrow(true);
    setShowBody(true);
    setShowRegion(true);
    setShowUrl(true);
    setShowLogo(true);
    setBgId("gradient-royal");
    clearCustomBg();
  };

  const titleBlock = (
    <>
      {showEyebrow && eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-premium">{eyebrow}</p>
      ) : null}
      {line1 ? (
        <p
          className={`font-serif text-[34px] font-semibold leading-[1.05] tracking-tight text-neutral-light ${
            showEyebrow && eyebrow ? "mt-2" : ""
          }`}
        >
          {line1}
        </p>
      ) : null}
      {line2 ? (
        <p className="mt-0.5 font-serif text-[34px] font-light leading-[1.05] tracking-tight text-gold-champagne">
          {line2}
        </p>
      ) : null}
      {showRegion && regionLine ? (
        <p className="mt-2 font-serif text-[15px] font-light italic text-neutral-light/88">{regionLine}</p>
      ) : null}
      {showBody && body ? (
        <p className="mt-3 max-w-[520px] text-[13px] leading-snug text-neutral-gray">{body}</p>
      ) : null}
      {showUrl && urlDisplay ? (
        <p className="mt-3 text-[12px] font-medium text-gold-premium/95">{urlDisplay}</p>
      ) : null}
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Layout</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as GbpLayout)}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          >
            <option value="centre">Centred — logo + stack</option>
            <option value="left-brand">Left — brand column</option>
            <option value="lower-band">Lower band — photo + bottom bar</option>
          </select>
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

        <BuilderCustomBackgroundControl
          inputId="gbp-cover-builder-bg-upload"
          dataUrl={customBgUrl}
          fileHint={customBgFileHint}
          onFileChange={onCustomBgFile}
          onClear={clearCustomBg}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
          />
          Show logo
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showEyebrow}
            onChange={(e) => setShowEyebrow(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
          />
          Show eyebrow
        </label>

        {showEyebrow ? (
          <div>
            <label className="text-xs text-neutral-gray">Eyebrow</label>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              maxLength={48}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
        ) : null}

        <div>
          <label className="text-xs text-neutral-gray">Name — line 1</label>
          <input
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            maxLength={36}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-gray">Name — line 2 (gold)</label>
          <input
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            maxLength={36}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            placeholder="Optional"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showRegion}
            onChange={(e) => setShowRegion(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
          />
          Show location line
        </label>
        {showRegion ? (
          <div>
            <label className="text-xs text-neutral-gray">Location line</label>
            <input
              value={regionLine}
              onChange={(e) => setRegionLine(e.target.value)}
              maxLength={44}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showBody}
            onChange={(e) => setShowBody(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
          />
          Show tagline / body
        </label>
        {showBody ? (
          <div>
            <label className="text-xs text-neutral-gray">Tagline</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              maxLength={200}
              className="mt-1 w-full resize-y rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light"
            />
          </div>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showUrl}
            onChange={(e) => setShowUrl(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium"
          />
          Show website line
        </label>
        {showUrl ? (
          <div>
            <label className="text-xs text-neutral-gray">Website (display)</label>
            <input
              value={urlDisplay}
              onChange={(e) => setUrlDisplay(e.target.value)}
              maxLength={56}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light"
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
          id="gbp-cover-builder-preview"
          filename="google-business-cover"
          title={`Live preview — ${GBP_COVER_W}×${GBP_COVER_H}px (16:9)`}
          note="Google may crop edges on different devices; the profile photo overlaps the lower-left on Search & Maps — keep faces and key text out of that zone. PNG exports at 2× (~2048×1152) for a sharp upload within typical size limits."
          dimensions={{ width: GBP_COVER_W, height: GBP_COVER_H }}
          pixelRatio={2}
        >
          <div
            className={`relative h-full w-full overflow-hidden ${usePhotoLikeBg ? "bg-purple-royal" : "bg-purple-deep"}`}
          >
            <GoogleBusinessBackdrop
              customImageUrl={customBgUrl}
              bg={bg}
              sizesHintPx={GBP_COVER_W}
              photoOverlay="strong"
            />

            {layout === "centre" ? (
              <div className="relative z-10 flex h-full flex-col items-center px-16 pb-[120px] pt-10 text-center">
                {showLogo ? (
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={200}
                    height={200}
                    priority
                    unoptimized
                    className="mb-5 h-[168px] w-[168px] shrink-0 opacity-95 drop-shadow-[0_4px_28px_rgba(197,165,86,0.35)]"
                  />
                ) : null}
                <div className="flex max-w-[720px] flex-col items-center text-center">{titleBlock}</div>
              </div>
            ) : null}

            {layout === "left-brand" ? (
              <div className="relative z-10 flex h-full items-center pl-14 pr-10 pb-[100px] pt-8">
                <div className="max-w-[540px] text-left">
                  {showLogo ? (
                    <Image
                      src="/logo.svg"
                      alt=""
                      width={140}
                      height={140}
                      priority
                      unoptimized
                      className="mb-4 h-[100px] w-[100px] opacity-95 drop-shadow-[0_4px_24px_rgba(197,165,86,0.32)]"
                    />
                  ) : null}
                  {titleBlock}
                </div>
              </div>
            ) : null}

            {layout === "lower-band" ? (
              <div className="relative z-10 flex h-full flex-col">
                <div className="min-h-0 flex-1" aria-hidden />
                <div className="shrink-0 border-t border-gold-premium/25 bg-[rgba(32,21,46,0.92)] px-10 py-7 backdrop-blur-[4px]">
                  <div className="mx-auto flex max-w-[900px] flex-row items-center justify-between gap-8">
                    <div className="flex min-w-0 flex-1 items-start gap-5">
                      {showLogo ? (
                        <Image
                          src="/logo.svg"
                          alt=""
                          width={120}
                          height={120}
                          priority
                          unoptimized
                          className="h-[76px] w-[76px] shrink-0 opacity-95 drop-shadow-[0_2px_16px_rgba(197,165,86,0.3)]"
                        />
                      ) : null}
                      <div className="min-w-0 text-left">
                        {showEyebrow && eyebrow ? (
                          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                            {eyebrow}
                          </p>
                        ) : null}
                        {line1 ? (
                          <p className="font-serif text-[26px] font-semibold leading-tight text-neutral-light">
                            {line1}
                          </p>
                        ) : null}
                        {line2 ? (
                          <p className="mt-0.5 font-serif text-[26px] font-light leading-tight text-gold-champagne">
                            {line2}
                          </p>
                        ) : null}
                        {showRegion && regionLine ? (
                          <p className="mt-1.5 font-serif text-[13px] italic text-neutral-light/85">{regionLine}</p>
                        ) : null}
                        {showBody && body ? (
                          <p className="mt-2 max-w-[460px] text-[11px] leading-snug text-neutral-gray">{body}</p>
                        ) : null}
                      </div>
                    </div>
                    {showUrl && urlDisplay ? (
                      <p className="max-w-[200px] shrink-0 text-right text-[11px] font-medium leading-snug text-gold-premium">
                        {urlDisplay}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </DownloadableGraphic>
      </div>
    </div>
  );
}
