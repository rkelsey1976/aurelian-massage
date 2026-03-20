"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  BUILDER_CUSTOM_BG_SELECT,
  BuilderCustomBackgroundControl,
  useBuilderCustomBackground,
} from "@/components/marketing/builder-custom-background";
import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

/** Facebook desktop cover — matches /facebook-covers. */
const COVER_W = 820;
const COVER_H = 312;

export type FacebookCoverBuilderDefaults = {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  urlDisplay: string;
  regionLine: string;
};

const BACKGROUNDS = [
  {
    id: "gradient-royal",
    label: "Royal gradient",
    className: "bg-gradient-to-br from-purple-royal via-purple-deep to-[#3b2660]",
  },
  {
    id: "gradient-deep",
    label: "Deep purple",
    className: "bg-gradient-to-b from-[#1a1228] via-purple-deep to-purple-royal",
  },
  {
    id: "gradient-gold-mist",
    label: "Gold mist",
    className: "bg-gradient-to-br from-purple-royal via-[#2d2045] to-[#3b2660]",
    radial:
      "radial-gradient(ellipse at 80% 20%, rgba(122,80,176,0.4) 0%, transparent 50%)",
  },
  {
    id: "photo-massage",
    label: "Photo · massage",
    src: "/back-massage.png" as const,
    object: "object-center" as const,
    className: "",
  },
  {
    id: "photo-spa",
    label: "Photo · spa room",
    src: "/spa-setup.png" as const,
    object: "object-center" as const,
    className: "",
  },
  {
    id: "photo-hero",
    label: "Photo · therapist",
    src: "/therapist-hero.png" as const,
    object: "object-[72%_30%]" as const,
    className: "",
  },
] as const;

type BgId = (typeof BACKGROUNDS)[number]["id"];
type BgOption = (typeof BACKGROUNDS)[number];
type CoverLayout =
  | "right-brand"
  | "gold-bar"
  | "minimal-right"
  | "editorial-strip"
  | "logo-spotlight"
  | "footer-band";

/** Split body into a gold “Swedish · Aromatherapy” style row (| or comma). */
function editorialServiceSegments(body: string): string[] {
  return body
    .split(/[|,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
}

type LogoSizeId = "sm" | "md" | "lg" | "xl";
type LogoCornerAlign = "left" | "centre" | "right";
type LogoHeroSide = "left" | "right";
type LogoHeroVertical = "centre" | "top" | "bottom";

const LOGO_CORNER_PX: Record<LogoSizeId, number> = {
  sm: 52,
  md: 68,
  lg: 84,
  xl: 104,
};

const LOGO_SPOTLIGHT_PX: Record<LogoSizeId, number> = {
  sm: 128,
  md: 168,
  lg: 200,
  xl: 236,
};

function logoCornerPositionClass(align: LogoCornerAlign, zone: "gold" | "spotlight"): string {
  const bottom = zone === "gold" ? "bottom-3" : "bottom-4";
  if (align === "left") return `${bottom} left-4`;
  if (align === "centre") return `${bottom} left-1/2 -translate-x-1/2`;
  return `${bottom} right-4`;
}

function logoHeroShellClass(side: LogoHeroSide, vertical: LogoHeroVertical): string {
  const sideCls = side === "right" ? "right-0 translate-x-2" : "left-0 -translate-x-2";
  const vCls =
    vertical === "centre"
      ? "top-1/2 -translate-y-1/2"
      : vertical === "top"
        ? "top-6"
        : "bottom-8";
  return `pointer-events-none absolute z-[11] ${vCls} ${sideCls}`;
}

/** Horizontal position for text block (and related accents). */
type CoverHorizontalAlign = "left" | "centre" | "right";

function spotlightRadialXPercent(align: CoverHorizontalAlign): number {
  if (align === "left") return 0;
  if (align === "centre") return 50;
  return 100;
}

function BackgroundLayers({
  customImageUrl,
  bg,
  layout,
  horizontalAlign,
}: {
  customImageUrl: string | null;
  bg: BgOption;
  layout: CoverLayout;
  horizontalAlign: CoverHorizontalAlign;
}) {
  if (customImageUrl) {
    return (
      <>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- user data URL; html-to-image needs decoded bitmap */}
          <img
            src={customImageUrl}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                layout === "minimal-right"
                  ? "linear-gradient(135deg, rgba(32,21,46,0.92) 0%, rgba(44,30,66,0.78) 50%, rgba(32,21,46,0.9) 100%)"
                  : "linear-gradient(135deg, rgba(32,21,46,0.88) 0%, rgba(44,30,66,0.72) 50%, rgba(32,21,46,0.85) 100%)",
            }}
          />
        </div>
        <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-70" />
      </>
    );
  }

  const isPhoto = "src" in bg && Boolean(bg.src);

  if (isPhoto) {
    return (
      <>
        <div className="absolute inset-0">
          <Image
            src={(bg as Extract<BgOption, { src: string }>).src}
            alt=""
            fill
            priority
            unoptimized
            className={`object-cover ${(bg as Extract<BgOption, { object: string }>).object}`}
            sizes={`${COVER_W}px`}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                layout === "minimal-right"
                  ? "linear-gradient(135deg, rgba(32,21,46,0.92) 0%, rgba(44,30,66,0.78) 50%, rgba(32,21,46,0.9) 100%)"
                  : "linear-gradient(135deg, rgba(32,21,46,0.88) 0%, rgba(44,30,66,0.72) 50%, rgba(32,21,46,0.85) 100%)",
            }}
          />
        </div>
        <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-70" />
      </>
    );
  }

  return (
    <>
      <div className={`absolute inset-0 ${(bg as BgOption & { className: string }).className}`} />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-100" />
      {"radial" in bg && bg.radial ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: bg.radial }}
        />
      ) : null}
      {layout === "right-brand" ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 100% at ${spotlightRadialXPercent(horizontalAlign)}% 50%, rgba(122,80,176,0.35) 0%, transparent 55%)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(20, 12, 32, 0.5) 100%)",
            }}
          />
        </>
      ) : null}
      {layout === "minimal-right" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(197,165,86,0.04) 1px, rgba(197,165,86,0.04) 2px)",
          }}
        />
      ) : null}
    </>
  );
}

export function FacebookCoverBuilder({ defaults }: { defaults: FacebookCoverBuilderDefaults }) {
  const [layout, setLayout] = useState<CoverLayout>("right-brand");
  const [eyebrow, setEyebrow] = useState(defaults.eyebrow);
  const [line1, setLine1] = useState(defaults.line1);
  const [line2, setLine2] = useState(defaults.line2);
  const [body, setBody] = useState(defaults.body);
  const [regionLine, setRegionLine] = useState(defaults.regionLine);
  const [urlFooter, setUrlFooter] = useState(defaults.urlDisplay);
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const [showRegionLine, setShowRegionLine] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [logoCornerAlign, setLogoCornerAlign] = useState<LogoCornerAlign>("left");
  const [logoSize, setLogoSize] = useState<LogoSizeId>("md");
  const [logoHeroSide, setLogoHeroSide] = useState<LogoHeroSide>("right");
  const [logoHeroVertical, setLogoHeroVertical] = useState<LogoHeroVertical>("centre");
  const [showUrlFooter, setShowUrlFooter] = useState(true);
  const [bgId, setBgId] = useState<BgId>("gradient-royal");
  const {
    dataUrl: customBgUrl,
    clear: clearCustomBg,
    onFileChange: onCustomBgFile,
    fileHint: customBgFileHint,
  } = useBuilderCustomBackground();

  const bg = useMemo(() => BACKGROUNDS.find((b) => b.id === bgId)!, [bgId]);
  const isPhoto = !customBgUrl && "src" in bg && Boolean(bg.src);
  const usePhotoLikeBg = Boolean(customBgUrl) || isPhoto;

  const goldBarTitle =
    [line1, line2].filter(Boolean).join(" ").trim() || line1 || "Your business name";

  const editorialSegs = useMemo(() => editorialServiceSegments(body), [body]);

  const [horizontalAlign, setHorizontalAlign] = useState<CoverHorizontalAlign>("left");

  const alignJustify: Record<CoverHorizontalAlign, string> = {
    left: "justify-start",
    centre: "justify-center",
    right: "justify-end",
  };
  const alignText: Record<CoverHorizontalAlign, string> = {
    left: "text-left",
    centre: "text-center",
    right: "text-right",
  };
  const alignItemsGold: Record<CoverHorizontalAlign, string> = {
    left: "items-start",
    centre: "items-center",
    right: "items-end",
  };
  const padSpotlight = {
    left: "pl-10 pr-6",
    centre: "px-10",
    right: "pl-6 pr-10",
  } satisfies Record<CoverHorizontalAlign, string>;
  const padMinimal = {
    left: "pl-14 pr-6",
    centre: "px-10",
    right: "pl-6 pr-14",
  } satisfies Record<CoverHorizontalAlign, string>;

  const cornerLogoPx = LOGO_CORNER_PX[logoSize];
  const heroLogoPx = LOGO_SPOTLIGHT_PX[logoSize];
  const heroContentPadPx = Math.min(340, Math.round(heroLogoPx * 1.08) + 28);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-5 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Layout</label>
          <select
            value={layout}
            onChange={(e) => {
              const v = e.target.value as CoverLayout;
              setLayout(v);
              if (v === "minimal-right" || v === "footer-band") setShowLogo(false);
              if (v === "logo-spotlight") setShowLogo(true);
            }}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            <option value="right-brand">Spotlight — hero text block</option>
            <option value="gold-bar">Gold strip — top bar + body</option>
            <option value="minimal-right">Minimal — large wordmark</option>
            <option value="editorial-strip">Editorial — gold accent + services line</option>
            <option value="logo-spotlight">Logo spotlight — mark + name (photo-friendly)</option>
            <option value="footer-band">Footer band — bottom bar + URL</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">
            Text alignment
          </label>
          <select
            value={horizontalAlign}
            onChange={(e) => setHorizontalAlign(e.target.value as CoverHorizontalAlign)}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            <option value="left">Left</option>
            <option value="centre">Centre</option>
            <option value="right">Right</option>
          </select>
          <p className="mt-1 text-[10px] leading-snug text-neutral-gray/75">
            Horizontal position for the copy block. Corner logo position is set under Logo options. Footer band
            aligns content inside the bottom strip.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Background preset</label>
          <select
            value={customBgUrl ? BUILDER_CUSTOM_BG_SELECT : bgId}
            onChange={(e) => {
              const v = e.target.value;
              if (v === BUILDER_CUSTOM_BG_SELECT) return;
              clearCustomBg();
              setBgId(v as BgId);
            }}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            {BACKGROUNDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
            {customBgUrl ? (
              <option value={BUILDER_CUSTOM_BG_SELECT}>Uploaded image</option>
            ) : null}
          </select>
        </div>

        <BuilderCustomBackgroundControl
          inputId="fb-cover-builder-bg-upload"
          dataUrl={customBgUrl}
          fileHint={customBgFileHint}
          onFileChange={onCustomBgFile}
          onClear={clearCustomBg}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showEyebrow}
            onChange={(e) => setShowEyebrow(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show eyebrow (small caps)
        </label>
        {showEyebrow ? (
          <div>
            <label className="text-xs text-neutral-gray">Eyebrow</label>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              maxLength={52}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light placeholder:text-neutral-gray/50 focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
              placeholder="Category or location"
            />
          </div>
        ) : null}

        <div>
          <label className="text-xs text-neutral-gray">Name — line 1 (serif bold)</label>
          <input
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            maxLength={40}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          />
        </div>

        <div>
          <label className="text-xs text-neutral-gray">Name — line 2 (gold, optional)</label>
          <input
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            maxLength={40}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
            placeholder="Leave blank to hide"
          />
        </div>

        {layout === "right-brand" || layout === "editorial-strip" || layout === "logo-spotlight" ? (
          <>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
              <input
                type="checkbox"
                checked={showRegionLine}
                onChange={(e) => setShowRegionLine(e.target.checked)}
                className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
              />
              Show location line{" "}
              {layout === "editorial-strip"
                ? "(below services)"
                : layout === "logo-spotlight"
                  ? "(under name)"
                  : "(italic, under name)"}
            </label>
            {showRegionLine ? (
              <div>
                <label className="text-xs text-neutral-gray">Location line</label>
                <input
                  value={regionLine}
                  onChange={(e) => setRegionLine(e.target.value)}
                  maxLength={48}
                  className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  placeholder="City · Region"
                />
              </div>
            ) : null}
          </>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showBody}
            onChange={(e) => setShowBody(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show supporting line{" "}
          {layout === "gold-bar"
            ? "(tagline)"
            : layout === "editorial-strip"
              ? "(services — split with | or commas)"
              : "(short blurb)"}
        </label>
        {showBody ? (
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={layout === "gold-bar" || layout === "editorial-strip" ? 220 : 140}
              rows={3}
              className="mt-1 w-full resize-y rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
            />
          </div>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showUrlFooter}
            onChange={(e) => setShowUrlFooter(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show URL{" "}
          {layout === "gold-bar"
            ? "(below tagline)"
            : layout === "footer-band"
              ? "(right side of bar)"
              : ""}
        </label>
        {showUrlFooter ? (
          <div>
            <label className="text-xs text-neutral-gray">URL text (no https://)</label>
            <input
              value={urlFooter}
              onChange={(e) => setUrlFooter(e.target.value)}
              maxLength={56}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
            />
          </div>
        ) : null}

        <label
          className={`flex items-center gap-2 text-sm ${
            layout === "minimal-right" || layout === "logo-spotlight" || layout === "footer-band"
              ? "cursor-not-allowed text-neutral-gray/50"
              : "cursor-pointer text-neutral-gray"
          }`}
        >
          <input
            type="checkbox"
            checked={layout === "logo-spotlight" ? true : showLogo}
            disabled={layout === "minimal-right" || layout === "logo-spotlight" || layout === "footer-band"}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium disabled:opacity-40"
          />
          Show logo{" "}
          {layout === "logo-spotlight"
            ? "(always on — side, size & vertical under Logo options)"
            : layout === "minimal-right"
              ? "(not used in minimal layout)"
              : layout === "footer-band"
                ? "(not used in footer band)"
                : "(corner position & size below)"}
        </label>

        {layout !== "minimal-right" && layout !== "footer-band" ? (
          <div className="space-y-4 rounded-lg border border-gold-premium/15 bg-purple-royal/25 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gold-premium">Logo options</p>

            {layout === "logo-spotlight" ? (
              <>
                <div>
                  <label className="text-xs text-neutral-gray">Hero mark — side</label>
                  <select
                    value={logoHeroSide}
                    onChange={(e) => setLogoHeroSide(e.target.value as LogoHeroSide)}
                    className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  >
                    <option value="right">Right (default)</option>
                    <option value="left">Left</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-gray">Hero mark — vertical</label>
                  <select
                    value={logoHeroVertical}
                    onChange={(e) => setLogoHeroVertical(e.target.value as LogoHeroVertical)}
                    className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  >
                    <option value="centre">Centre</option>
                    <option value="top">Upper</option>
                    <option value="bottom">Lower</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-gray">Hero mark — size</label>
                  <select
                    value={logoSize}
                    onChange={(e) => setLogoSize(e.target.value as LogoSizeId)}
                    className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  >
                    <option value="sm">Small (~128px)</option>
                    <option value="md">Medium (~168px)</option>
                    <option value="lg">Large (~200px)</option>
                    <option value="xl">Extra large (~236px)</option>
                  </select>
                </div>
              </>
            ) : null}

            {(layout === "gold-bar" || layout === "right-brand") && showLogo ? (
              <>
                <div>
                  <label className="text-xs text-neutral-gray">Corner logo — position</label>
                  <select
                    value={logoCornerAlign}
                    onChange={(e) => setLogoCornerAlign(e.target.value as LogoCornerAlign)}
                    className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  >
                    <option value="left">Lower left</option>
                    <option value="centre">Lower centre</option>
                    <option value="right">Lower right</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-gray">Corner logo — size</label>
                  <select
                    value={logoSize}
                    onChange={(e) => setLogoSize(e.target.value as LogoSizeId)}
                    className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
                  >
                    <option value="sm">Small (52px)</option>
                    <option value="md">Medium (68px)</option>
                    <option value="lg">Large (84px)</option>
                    <option value="xl">Extra large (104px)</option>
                  </select>
                </div>
              </>
            ) : null}

            {layout !== "logo-spotlight" && (layout === "gold-bar" || layout === "right-brand") && !showLogo ? (
              <p className="text-[11px] leading-snug text-neutral-gray/75">
                Turn on <strong className="text-neutral-light/90">Show logo</strong> to set corner position and
                size.
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setEyebrow(defaults.eyebrow);
            setLine1(defaults.line1);
            setLine2(defaults.line2);
            setBody(defaults.body);
            setRegionLine(defaults.regionLine);
            setUrlFooter(defaults.urlDisplay);
            setBgId("gradient-royal");
            clearCustomBg();
            setLayout("right-brand");
            setHorizontalAlign("left");
            setShowBody(true);
            setShowEyebrow(true);
            setShowRegionLine(true);
            setShowLogo(false);
            setShowUrlFooter(true);
            setLogoCornerAlign("left");
            setLogoSize("md");
            setLogoHeroSide("right");
            setLogoHeroVertical("centre");
          }}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium transition hover:bg-purple-plum/30"
        >
          Reset to site defaults
        </button>
      </div>

      <div>
        <DownloadableGraphic
          id="fb-cover-builder-preview"
          filename="facebook-cover-custom"
          title={`Live preview — ${COVER_W}×${COVER_H} (Facebook desktop cover)`}
          note="Facebook’s profile photo overlaps the lower left — keep critical detail out of that corner. PNG exports at 2×."
          dimensions={{ width: COVER_W, height: COVER_H }}
        >
          <div
            className={`relative h-full w-full overflow-hidden ${
              layout === "minimal-right" && !usePhotoLikeBg
                ? "bg-purple-deep"
                : usePhotoLikeBg
                  ? "bg-purple-royal"
                  : ""
            }`}
          >
            {layout === "gold-bar" ? (
              <div className="flex h-full w-full flex-col bg-purple-royal">
                <div className="relative z-20 flex h-[88px] shrink-0 items-center justify-center bg-gradient-to-r from-gold-premium via-gold-champagne to-gold-premium px-6">
                  <p className="text-center font-serif text-[26px] font-semibold leading-tight text-on-gold">
                    {goldBarTitle}
                  </p>
                </div>
                <div className="relative min-h-0 flex-1">
                  <BackgroundLayers
                    customImageUrl={customBgUrl}
                    bg={bg}
                    layout={layout}
                    horizontalAlign={horizontalAlign}
                  />
                  <div
                    className={`relative z-10 flex h-full flex-col ${alignItemsGold[horizontalAlign]} justify-center px-12 pb-5 pt-4 ${alignText[horizontalAlign]}`}
                  >
                    {showEyebrow && eyebrow ? (
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-premium">
                        {eyebrow}
                      </p>
                    ) : null}
                    {showBody && body ? (
                      <p
                        className={`max-w-lg font-serif text-[15px] font-light italic leading-snug text-neutral-light/90 ${
                          showEyebrow && eyebrow ? "mt-2" : ""
                        } ${horizontalAlign === "centre" ? "mx-auto" : horizontalAlign === "right" ? "ml-auto" : ""}`}
                      >
                        {body}
                      </p>
                    ) : null}
                    {showUrlFooter && urlFooter ? (
                      <p
                        className={`max-w-lg text-[11px] text-neutral-gray ${horizontalAlign === "centre" ? "mx-auto" : horizontalAlign === "right" ? "ml-auto" : ""} ${showBody && body ? "mt-4" : showEyebrow && eyebrow ? "mt-3" : ""}`}
                      >
                        {urlFooter}
                      </p>
                    ) : null}
                  </div>
                  {showLogo ? (
                    <div
                      className={`pointer-events-none absolute z-20 pt-6 ${logoCornerPositionClass(logoCornerAlign, "gold")}`}
                    >
                      <Image
                        src="/logo.svg"
                        alt=""
                        width={cornerLogoPx}
                        height={cornerLogoPx}
                        priority
                        unoptimized
                        className="opacity-95 drop-shadow-[0_0_18px_rgba(197,165,86,0.35)]"
                        style={{ width: cornerLogoPx, height: cornerLogoPx }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : layout === "editorial-strip" ? (
              <div className="relative h-full w-full">
                <BackgroundLayers
                  customImageUrl={customBgUrl}
                  bg={bg}
                  layout={layout}
                  horizontalAlign={horizontalAlign}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-[5] h-full w-[120px] bg-gradient-to-r from-gold-premium/25 to-transparent"
                />
                <div
                  className={`relative z-10 flex h-full w-full items-center ${alignJustify[horizontalAlign]}`}
                >
                  <div className={`max-w-[600px] pl-[136px] pr-10 ${alignText[horizontalAlign]}`}>
                    {showEyebrow && eyebrow ? (
                      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                        {eyebrow}
                      </p>
                    ) : null}
                    <p
                      className={`font-serif text-[28px] font-semibold leading-tight text-neutral-light ${
                        showEyebrow && eyebrow ? "mt-1" : ""
                      }`}
                    >
                      {goldBarTitle}
                    </p>
                    {showBody && editorialSegs.length > 0 ? (
                      <p
                        className={`mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-gold-champagne ${
                          horizontalAlign === "centre"
                            ? "justify-center"
                            : horizontalAlign === "right"
                              ? "justify-end"
                              : "justify-start"
                        }`}
                      >
                        {editorialSegs.map((seg, i) => (
                          <span key={`${seg}-${i}`} className="inline-flex items-center gap-x-2">
                            {i > 0 ? (
                              <span className="text-gold-premium/60" aria-hidden>
                                ·
                              </span>
                            ) : null}
                            <span>{seg}</span>
                          </span>
                        ))}
                      </p>
                    ) : null}
                    {showRegionLine && regionLine ? (
                      <p
                        className={`mt-4 max-w-md text-[11px] leading-relaxed text-neutral-gray ${
                          horizontalAlign === "centre" ? "mx-auto" : horizontalAlign === "right" ? "ml-auto" : ""
                        }`}
                      >
                        {regionLine}
                      </p>
                    ) : null}
                    {showUrlFooter && urlFooter ? (
                      <p
                        className={`mt-2 text-[10px] text-gold-premium/85 ${
                          horizontalAlign === "centre" ? "mx-auto block w-fit" : horizontalAlign === "right" ? "ml-auto block w-fit" : ""
                        }`}
                      >
                        {urlFooter}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : layout === "logo-spotlight" ? (
              <div className="relative h-full w-full">
                <BackgroundLayers
                  customImageUrl={customBgUrl}
                  bg={bg}
                  layout={layout}
                  horizontalAlign={horizontalAlign}
                />
                <div aria-hidden className="vignette pointer-events-none absolute inset-0 z-[1]" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      logoHeroSide === "right"
                        ? "linear-gradient(100deg, rgba(32,21,46,0.55) 0%, transparent 60%)"
                        : "linear-gradient(260deg, rgba(32,21,46,0.55) 0%, transparent 60%)",
                  }}
                />
                <div aria-hidden className="noise pointer-events-none absolute inset-0 z-[1] opacity-80" />
                <div
                  className={`relative z-10 flex h-full w-full items-center ${alignJustify[horizontalAlign]}`}
                  style={{
                    paddingLeft: logoHeroSide === "left" ? heroContentPadPx : 24,
                    paddingRight: logoHeroSide === "right" ? heroContentPadPx : 24,
                  }}
                >
                  <div className={`max-w-[400px] shrink-0 ${alignText[horizontalAlign]}`}>
                    {line1 ? (
                      <p className="font-serif text-[40px] font-semibold leading-none tracking-tight text-neutral-light">
                        {line1}
                      </p>
                    ) : null}
                    {line2 ? (
                      <p className="mt-1 font-serif text-[40px] font-light leading-none tracking-tight text-gold-champagne">
                        {line2}
                      </p>
                    ) : null}
                    {showEyebrow && eyebrow ? (
                      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                        {eyebrow}
                      </p>
                    ) : null}
                    {showRegionLine && regionLine ? (
                      <p className="mt-2 font-serif text-[13px] font-light italic text-neutral-light/85">
                        {regionLine}
                      </p>
                    ) : null}
                    {showBody && body ? (
                      <p className="mt-3 max-w-[340px] text-[10px] leading-relaxed text-neutral-gray">{body}</p>
                    ) : null}
                  </div>
                  <div className={logoHeroShellClass(logoHeroSide, logoHeroVertical)}>
                    <Image
                      src="/logo.svg"
                      alt=""
                      width={heroLogoPx}
                      height={heroLogoPx}
                      priority
                      unoptimized
                      className="shrink-0 opacity-95 drop-shadow-[0_0_36px_rgba(197,165,86,0.42)]"
                      style={{ width: heroLogoPx, height: heroLogoPx }}
                    />
                  </div>
                </div>
              </div>
            ) : layout === "footer-band" ? (
              <div className="relative h-full w-full">
                <BackgroundLayers
                  customImageUrl={customBgUrl}
                  bg={bg}
                  layout={layout}
                  horizontalAlign={horizontalAlign}
                />
                <div className="absolute inset-x-0 bottom-0 z-20 border-t border-gold-premium/30 bg-[rgba(32,21,46,0.93)] px-8 py-3.5 backdrop-blur-[6px]">
                  <div
                    className={`flex min-h-[48px] flex-wrap items-center gap-x-10 gap-y-2 ${alignJustify[horizontalAlign]}`}
                  >
                    <div className={`min-w-0 max-w-[72%] ${alignText[horizontalAlign]}`}>
                      {showEyebrow && eyebrow ? (
                        <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-gold-premium">
                          {eyebrow}
                        </p>
                      ) : null}
                      <p className="font-serif text-[22px] font-semibold leading-tight tracking-tight text-neutral-light">
                        {goldBarTitle}
                      </p>
                    </div>
                    {showUrlFooter && urlFooter ? (
                      <p className="shrink-0 text-[11px] font-medium text-gold-champagne/90">{urlFooter}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <BackgroundLayers
                  customImageUrl={customBgUrl}
                  bg={bg}
                  layout={layout}
                  horizontalAlign={horizontalAlign}
                />
                {layout === "right-brand" ? (
                  <div
                    className={`relative z-10 flex h-full w-full items-center ${alignJustify[horizontalAlign]} ${padSpotlight[horizontalAlign]}`}
                  >
                    <div className={`max-w-[480px] ${alignText[horizontalAlign]}`}>
                      {showEyebrow && eyebrow ? (
                        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-gold-premium">
                          {eyebrow}
                        </p>
                      ) : null}
                      {line1 ? (
                        <p className="font-serif text-[32px] font-semibold leading-tight tracking-tight text-neutral-light">
                          {line1}
                        </p>
                      ) : null}
                      {line2 ? (
                        <p className="mt-0.5 font-serif text-[32px] font-light leading-tight tracking-tight text-gold-champagne">
                          {line2}
                        </p>
                      ) : null}
                      {showRegionLine && regionLine ? (
                        <p className="mt-2 font-serif text-[13px] font-light italic text-neutral-light/85">
                          {regionLine}
                        </p>
                      ) : null}
                      {showBody && body ? (
                        <>
                          {horizontalAlign === "left" ? (
                            <div className="mr-auto mt-4 h-px w-32 bg-gradient-to-r from-gold-premium to-transparent" />
                          ) : null}
                          {horizontalAlign === "centre" ? (
                            <div className="mx-auto mt-4 h-px w-32 max-w-full bg-gradient-to-r from-transparent via-gold-premium to-transparent" />
                          ) : null}
                          {horizontalAlign === "right" ? (
                            <div className="ml-auto mt-4 h-px w-32 bg-gradient-to-l from-gold-premium to-transparent" />
                          ) : null}
                          <p className="mt-3 text-[11px] leading-snug text-neutral-gray">{body}</p>
                        </>
                      ) : null}
                    </div>
                    {showLogo ? (
                      <div
                        className={`pointer-events-none absolute z-20 pt-6 ${logoCornerPositionClass(logoCornerAlign, "spotlight")}`}
                      >
                        <Image
                          src="/logo.svg"
                          alt=""
                          width={cornerLogoPx}
                          height={cornerLogoPx}
                          priority
                          unoptimized
                          className="opacity-95 drop-shadow-[0_0_20px_rgba(197,165,86,0.35)]"
                          style={{ width: cornerLogoPx, height: cornerLogoPx }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div
                    className={`relative z-10 flex h-full w-full items-center ${alignJustify[horizontalAlign]} ${padMinimal[horizontalAlign]}`}
                  >
                    <div className={alignText[horizontalAlign]}>
                      {line1 ? (
                        <p className="font-serif text-[42px] font-semibold leading-none tracking-tight text-neutral-light">
                          {line1}
                        </p>
                      ) : null}
                      {line2 ? (
                        <p className="mt-1 font-serif text-[42px] font-light leading-none tracking-tight text-gold-champagne">
                          {line2}
                        </p>
                      ) : null}
                      {showEyebrow && eyebrow ? (
                        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-premium">
                          {eyebrow}
                        </p>
                      ) : null}
                      {showBody && body ? (
                        <p
                          className={`mt-3 max-w-[320px] text-[10px] leading-relaxed text-neutral-gray ${
                            horizontalAlign === "centre" ? "mx-auto" : horizontalAlign === "right" ? "ml-auto" : ""
                          }`}
                        >
                          {body}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DownloadableGraphic>
      </div>
    </div>
  );
}
