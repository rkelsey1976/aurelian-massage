"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

const SQ = 540;

export type FacebookBuilderDefaults = {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  urlDisplay: string;
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

export function FacebookGraphicBuilder({ defaults }: { defaults: FacebookBuilderDefaults }) {
  const [eyebrow, setEyebrow] = useState(defaults.eyebrow);
  const [line1, setLine1] = useState(defaults.line1);
  const [line2, setLine2] = useState(defaults.line2);
  const [body, setBody] = useState(defaults.body);
  const [showBody, setShowBody] = useState(true);
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [layout, setLayout] = useState<"brand" | "cta">("brand");
  const [ctaLabel, setCtaLabel] = useState(defaults.ctaLabel);
  const [ctaHref, setCtaHref] = useState(defaults.ctaHref);
  const [showCta, setShowCta] = useState(layout === "cta");
  const [urlFooter, setUrlFooter] = useState(defaults.urlDisplay);
  const [showUrlFooter, setShowUrlFooter] = useState(true);
  const [bgId, setBgId] = useState<BgId>("gradient-royal");

  const bg = useMemo(() => BACKGROUNDS.find((b) => b.id === bgId)!, [bgId]);
  const isPhoto = "src" in bg && Boolean(bg.src);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-5 rounded-xl border border-gold-premium/15 bg-purple-deep/40 p-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-gold-premium">Layout</label>
          <select
            value={layout}
            onChange={(e) => {
              const v = e.target.value as "brand" | "cta";
              setLayout(v);
              setShowCta(v === "cta");
            }}
            className="mt-2 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          >
            <option value="brand">Brand — name + tagline</option>
            <option value="cta">Promo — headline + button</option>
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
          Show eyebrow (small caps line)
        </label>
        {showEyebrow ? (
          <div>
            <label className="text-xs text-neutral-gray">Eyebrow</label>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              maxLength={48}
              className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light placeholder:text-neutral-gray/50 focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
              placeholder="City or category"
            />
          </div>
        ) : null}

        <div>
          <label className="text-xs text-neutral-gray">
            {layout === "brand" ? "Name — line 1 (serif bold)" : "Headline — line 1"}
          </label>
          <input
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            maxLength={36}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
          />
        </div>

        <div>
          <label className="text-xs text-neutral-gray">
            {layout === "brand" ? "Name — line 2 (gold, optional)" : "Subhead — line 2 (gold)"}
          </label>
          <input
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            maxLength={36}
            className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
            placeholder="Leave blank to hide"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showBody}
            onChange={(e) => setShowBody(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show body text {layout === "brand" ? "(tagline)" : "(supporting copy)"}
        </label>
        {showBody ? (
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={220}
              rows={4}
              className="mt-1 w-full resize-y rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
            />
          </div>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showCta}
            onChange={(e) => setShowCta(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show CTA button
        </label>
        {showCta ? (
          <div className="space-y-2">
            <div>
              <label className="text-xs text-neutral-gray">Button label</label>
              <input
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                maxLength={40}
                className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-sm text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-gray">Button link (URL)</label>
              <input
                value={ctaHref}
                onChange={(e) => setCtaHref(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold-premium/25 bg-purple-royal px-3 py-2 text-xs text-neutral-light focus:outline-none focus:ring-2 focus:ring-gold-premium/50"
              />
            </div>
          </div>
        ) : null}

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show logo
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-gray">
          <input
            type="checkbox"
            checked={showUrlFooter}
            onChange={(e) => setShowUrlFooter(e.target.checked)}
            className="rounded border-gold-premium/40 bg-purple-royal text-gold-premium focus:ring-gold-premium"
          />
          Show URL strip (bottom)
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

        <button
          type="button"
          onClick={() => {
            setEyebrow(defaults.eyebrow);
            setLine1(defaults.line1);
            setLine2(defaults.line2);
            setBody(defaults.body);
            setCtaLabel(defaults.ctaLabel);
            setCtaHref(defaults.ctaHref);
            setUrlFooter(defaults.urlDisplay);
            setBgId("gradient-royal");
            setLayout("brand");
            setShowCta(false);
            setShowBody(true);
            setShowEyebrow(true);
            setShowLogo(true);
            setShowUrlFooter(true);
          }}
          className="w-full rounded-md border border-gold-premium/30 py-2 text-xs font-medium text-gold-premium transition hover:bg-purple-plum/30"
        >
          Reset to site defaults
        </button>
      </div>

      <div>
        <DownloadableGraphic
          id="fb-custom-builder-preview"
          filename="facebook-custom-square"
          title="Live preview — 540×540 (scale ×2 for 1080)"
          note="Edits update instantly. Download PNG uses 2× pixel density for uploads."
          dimensions={{ width: SQ, height: SQ }}
        >
          <div
            className={`relative flex h-full w-full flex-col ${isPhoto ? "bg-purple-royal" : (bg as BgOption & { className: string }).className}`}
          >
            {isPhoto ? (
              <>
                <div className="absolute inset-0">
                  <Image
                    src={(bg as Extract<BgOption, { src: string }>).src}
                    alt=""
                    fill
                    priority
                    unoptimized
                    className={`object-cover ${(bg as Extract<BgOption, { object: string }>).object}`}
                    sizes="540px"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(32,21,46,0.88) 0%, rgba(44,30,66,0.72) 50%, rgba(32,21,46,0.85) 100%)",
                    }}
                  />
                </div>
                <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-70" />
              </>
            ) : (
              <>
                <div aria-hidden className="noise pointer-events-none absolute inset-0" />
                {"radial" in bg && bg.radial ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{ background: bg.radial }}
                  />
                ) : null}
              </>
            )}

            <div className="relative z-10 flex min-h-0 flex-1 flex-col p-10">
              {layout === "brand" ? (
                <>
                  {showEyebrow && eyebrow ? (
                    <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-premium">
                      {eyebrow}
                    </p>
                  ) : null}
                  <div className={showEyebrow && eyebrow ? "mt-4" : ""}>
                    {line1 ? (
                      <p className="font-serif text-[42px] font-semibold leading-[0.95] tracking-tight text-neutral-light">
                        {line1}
                      </p>
                    ) : null}
                    {line2 ? (
                      <p className="mt-1 font-serif text-[42px] font-light leading-[0.95] tracking-tight text-gold-champagne">
                        {line2}
                      </p>
                    ) : null}
                  </div>
                  {showBody && body ? (
                    <p className="mt-auto max-w-[280px] font-serif text-[15px] font-light italic leading-snug text-neutral-light/85">
                      {body}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <div className="h-1 w-20 shrink-0 bg-gradient-to-r from-gold-premium to-transparent" />
                    <div className="flex flex-col items-end gap-2">
                      {showLogo ? (
                        <Image
                          src="/logo.svg"
                          alt=""
                          width={88}
                          height={88}
                          priority
                          unoptimized
                          className="h-[88px] w-[88px] opacity-95 drop-shadow-[0_0_20px_rgba(197,165,86,0.35)]"
                        />
                      ) : null}
                      {showUrlFooter && urlFooter ? (
                        <p className="max-w-[200px] text-right text-[10px] text-gold-premium/85">{urlFooter}</p>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    {showEyebrow && eyebrow ? (
                      <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-gold-premium">{eyebrow}</p>
                    ) : null}
                    {line1 ? (
                      <p
                        className={`font-serif font-semibold leading-tight text-neutral-light ${
                          showEyebrow && eyebrow ? "mt-6" : ""
                        } text-[36px]`}
                      >
                        {line1}
                      </p>
                    ) : null}
                    {line2 ? (
                      <p className="mt-2 font-serif text-[36px] font-light leading-tight text-gold-champagne">{line2}</p>
                    ) : null}
                    {showBody && body ? (
                      <p className="mt-4 max-w-[400px] text-[16px] leading-relaxed text-neutral-gray">{body}</p>
                    ) : null}
                    {showCta && ctaLabel ? (
                      <a
                        href={ctaHref || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 rounded-full px-10 py-3.5 text-[13px] font-semibold text-on-gold transition-opacity hover:opacity-95"
                        style={{
                          background: "#C5A556",
                          boxShadow: "0 0 24px rgba(197, 165, 86, 0.35)",
                        }}
                      >
                        {ctaLabel}
                      </a>
                    ) : null}
                  </div>
                  {(showLogo || showUrlFooter) ? (
                    <div className="mt-auto flex items-end justify-between pt-6">
                      {showUrlFooter && urlFooter ? (
                        <p className="text-[10px] text-gold-premium/80">{urlFooter}</p>
                      ) : (
                        <span />
                      )}
                      {showLogo ? (
                        <Image
                          src="/logo.svg"
                          alt=""
                          width={56}
                          height={56}
                          priority
                          unoptimized
                          className="h-14 w-14 opacity-95 drop-shadow-[0_0_16px_rgba(197,165,86,0.35)]"
                        />
                      ) : null}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </DownloadableGraphic>
      </div>
    </div>
  );
}
