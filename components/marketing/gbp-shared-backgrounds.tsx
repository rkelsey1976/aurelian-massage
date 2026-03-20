import Image from "next/image";

/** Preset backgrounds for Google Business Profile graphic builders. */
export const GBP_BACKGROUNDS = [
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
  },
  {
    id: "photo-spa",
    label: "Photo · spa room",
    src: "/spa-setup.png" as const,
    object: "object-center" as const,
  },
  {
    id: "photo-hero",
    label: "Photo · therapist",
    src: "/therapist-hero.png" as const,
    object: "object-[72%_30%]" as const,
  },
] as const;

export type GbpBackgroundId = (typeof GBP_BACKGROUNDS)[number]["id"];
export type GbpBackgroundOption = (typeof GBP_BACKGROUNDS)[number];

/** Full-bleed tint when using a photo (or custom upload) behind text/logo. */
export type GbpPhotoOverlay = "strong" | "medium" | "soft";

const PHOTO_OVERLAY_CSS: Record<GbpPhotoOverlay, string> = {
  strong:
    "linear-gradient(160deg, rgba(32,21,46,0.88) 0%, rgba(44,30,66,0.72) 50%, rgba(32,21,46,0.86) 100%)",
  medium:
    "linear-gradient(160deg, rgba(32,21,46,0.78) 0%, rgba(44,30,66,0.62) 50%, rgba(32,21,46,0.8) 100%)",
  soft:
    "linear-gradient(160deg, rgba(32,21,46,0.52) 0%, rgba(44,30,66,0.42) 50%, rgba(32,21,46,0.55) 100%)",
};

const CUSTOM_OVERLAY_CSS: Record<GbpPhotoOverlay, string> = {
  strong:
    "linear-gradient(160deg, rgba(32,21,46,0.9) 0%, rgba(44,30,66,0.75) 50%, rgba(32,21,46,0.88) 100%)",
  medium:
    "linear-gradient(160deg, rgba(32,21,46,0.82) 0%, rgba(44,30,66,0.68) 50%, rgba(32,21,46,0.8) 100%)",
  soft:
    "linear-gradient(160deg, rgba(32,21,46,0.55) 0%, rgba(44,30,66,0.45) 50%, rgba(32,21,46,0.58) 100%)",
};

export function GoogleBusinessBackdrop({
  customImageUrl,
  bg,
  sizesHintPx,
  photoOverlay = "strong",
  noiseOpacity = 0.65,
}: {
  customImageUrl: string | null;
  bg: GbpBackgroundOption;
  sizesHintPx: number;
  photoOverlay?: GbpPhotoOverlay;
  /** 0 = no noise layer on photo/custom paths */
  noiseOpacity?: number;
}) {
  if (customImageUrl) {
    return (
      <>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- user data URL */}
          <img src={customImageUrl} alt="" className="h-full w-full object-cover object-center" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: CUSTOM_OVERLAY_CSS[photoOverlay] }}
          />
        </div>
        {noiseOpacity > 0 ? (
          <div
            aria-hidden
            className="noise pointer-events-none absolute inset-0"
            style={{ opacity: noiseOpacity }}
          />
        ) : null}
      </>
    );
  }

  const isPhoto = "src" in bg && Boolean(bg.src);
  if (isPhoto) {
    const p = bg as Extract<GbpBackgroundOption, { src: string }>;
    return (
      <>
        <div className="absolute inset-0">
          <Image
            src={p.src}
            alt=""
            fill
            priority
            unoptimized
            className={`object-cover ${p.object}`}
            sizes={`${sizesHintPx}px`}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: PHOTO_OVERLAY_CSS[photoOverlay] }}
          />
        </div>
        {noiseOpacity > 0 ? (
          <div
            aria-hidden
            className="noise pointer-events-none absolute inset-0"
            style={{ opacity: noiseOpacity }}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <div className={`absolute inset-0 ${(bg as GbpBackgroundOption & { className: string }).className}`} />
      <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-90" />
      {"radial" in bg && bg.radial ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{ background: bg.radial }}
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 0%, rgba(197,165,86,0.12) 0%, transparent 55%)",
        }}
      />
    </>
  );
}
