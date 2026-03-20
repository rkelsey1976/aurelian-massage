"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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
type CoverLayout = "right-brand" | "gold-bar" | "minimal-right";

function BackgroundLayers({
  bg,
  layout,
}: {
  bg: BgOption;
  layout: CoverLayout;
}) {
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
              background:
                "radial-gradient(ellipse 80% 100% at 100% 50%, rgba(122,80,176,0.35) 0%, transparent 55%)",
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
  const [showUrlFooter, setShowUrlFooter] = useState(true);
  const [bgId, setBgId] = useState<BgId>("gradient-royal");

  const bg = useMemo(() => BACKGROUNDS.find((b) => b.id === bgId)!, [bgId]);
  const isPhoto = "src" in bg && Boolean(bg.src);

  const goldBarTitle =
    [line1, line2].filter(Boolean).join(" ").trim() || line1 || "Your business name";

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
              if (v === "minimal-right") setShowLogo(false);
            }}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            <option value="right-brand">Spotlight — copy on the right (profile-safe)</option>
            <option value="gold-bar">Gold strip — headline bar + body</option>
            <option value="minimal-right">Minimal — large wordmark, right</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Background</label>
          <select
            value={bgId}
            onChange={(e) => setBgId(e.target.value as BgId)}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            {BACKGROUNDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

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

        {layout === "right-brand" ? (
          <>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
              <input
                type="checkbox"
                checked={showRegionLine}
                onChange={(e) => setShowRegionLine(e.target.checked)}
                className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
              />
              Show location line (italic, under name)
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
          Show supporting line {layout === "gold-bar" ? "(tagline)" : "(short blurb)"}
        </label>
        {showBody ? (
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={layout === "gold-bar" ? 200 : 140}
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
          Show URL {layout === "gold-bar" ? "(below tagline)" : ""}
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
            layout === "minimal-right"
              ? "cursor-not-allowed text-neutral-gray/50"
              : "cursor-pointer text-neutral-gray"
          }`}
        >
          <input
            type="checkbox"
            checked={showLogo}
            disabled={layout === "minimal-right"}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium disabled:opacity-40"
          />
          Show logo {layout === "minimal-right" ? "(not used in minimal layout)" : "(lower right)"}
        </label>

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
            setLayout("right-brand");
            setShowBody(true);
            setShowEyebrow(true);
            setShowRegionLine(true);
            setShowLogo(false);
            setShowUrlFooter(true);
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
          note="Keep important copy toward the right or top — the profile photo overlaps the left. PNG exports at 2×."
          dimensions={{ width: COVER_W, height: COVER_H }}
        >
          <div
            className={`relative h-full w-full overflow-hidden ${
              layout === "minimal-right" && !isPhoto ? "bg-purple-deep" : isPhoto ? "bg-purple-royal" : ""
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
                  <BackgroundLayers bg={bg} layout={layout} />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 pb-5 pt-4 text-center">
                    {showEyebrow && eyebrow ? (
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-premium">
                        {eyebrow}
                      </p>
                    ) : null}
                    {showBody && body ? (
                      <p
                        className={`max-w-lg font-serif text-[15px] font-light italic leading-snug text-neutral-light/90 ${
                          showEyebrow && eyebrow ? "mt-2" : ""
                        }`}
                      >
                        {body}
                      </p>
                    ) : null}
                    {showUrlFooter && urlFooter ? (
                      <p
                        className={`text-[11px] text-neutral-gray ${showBody && body ? "mt-4" : showEyebrow && eyebrow ? "mt-3" : ""}`}
                      >
                        {urlFooter}
                      </p>
                    ) : null}
                  </div>
                  {showLogo ? (
                    <div className="pointer-events-none absolute bottom-3 right-4 z-20">
                      <Image
                        src="/logo.svg"
                        alt=""
                        width={64}
                        height={64}
                        priority
                        unoptimized
                        className="h-16 w-16 opacity-95 drop-shadow-[0_0_18px_rgba(197,165,86,0.35)]"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <BackgroundLayers bg={bg} layout={layout} />
                {layout === "right-brand" ? (
                  <div className="relative z-10 flex h-full w-full items-center justify-end pr-10">
                    <div className="max-w-[480px] text-right">
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
                          <div className="ml-auto mt-4 h-px w-32 bg-gradient-to-l from-gold-premium to-transparent" />
                          <p className="mt-3 text-[11px] leading-snug text-neutral-gray">{body}</p>
                        </>
                      ) : null}
                    </div>
                    {showLogo ? (
                      <div className="pointer-events-none absolute bottom-4 right-4 z-20">
                        <Image
                          src="/logo.svg"
                          alt=""
                          width={72}
                          height={72}
                          priority
                          unoptimized
                          className="h-[72px] w-[72px] opacity-95 drop-shadow-[0_0_20px_rgba(197,165,86,0.35)]"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="relative z-10 flex h-full w-full items-center justify-end pr-14">
                    <div className="text-right">
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
                        <p className="mt-3 max-w-[320px] text-[10px] leading-relaxed text-neutral-gray">
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
