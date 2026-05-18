"use client";

import Image from "next/image";
import { useState } from "react";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

const CANVAS = 420;

type BgId = "transparent" | "purple-royal" | "purple-deep" | "white" | "black" | "gold";

const BG_OPTIONS: { id: BgId; label: string; style: React.CSSProperties; swatch: string }[] = [
  { id: "transparent", label: "Transparent", style: {}, swatch: "" },
  { id: "purple-royal", label: "Purple Royal", style: { background: "#20152E" }, swatch: "#20152E" },
  { id: "purple-deep", label: "Purple Deep", style: { background: "#2C1E42" }, swatch: "#2C1E42" },
  { id: "white", label: "White", style: { background: "#FFFFFF" }, swatch: "#FFFFFF" },
  { id: "black", label: "Black", style: { background: "#000000" }, swatch: "#000000" },
  {
    id: "gold",
    label: "Gold gradient",
    style: { background: "linear-gradient(135deg, #C5A556 0%, #DFC98A 50%, #C5A556 100%)" },
    swatch: "#C5A556",
  },
];

type LogoColour = "gold" | "white" | "black";

const LOGO_COLOURS: { id: LogoColour; label: string; swatch: string; filterClass: string }[] = [
  { id: "gold", label: "Gold", swatch: "#C5A556", filterClass: "" },
  { id: "white", label: "White", swatch: "#F7F7F7", filterClass: "brightness-0 invert" },
  { id: "black", label: "Black", swatch: "#111111", filterClass: "brightness-0" },
];

function Swatch({
  active,
  title,
  swatch,
  isTransparent,
  onClick,
}: {
  active: boolean;
  title: string;
  swatch: string;
  isTransparent?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 shrink-0 rounded-md border-2 transition ${
        active
          ? "border-gold-premium scale-110 shadow-luxury-glow"
          : "border-white/20 hover:border-white/40"
      }`}
      style={!isTransparent ? { background: swatch } : undefined}
    >
      {isTransparent && (
        <span
          className="block h-full w-full rounded-[4px]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(#555 0% 25%, #333 0% 50%)",
            backgroundSize: "10px 10px",
          }}
        />
      )}
    </button>
  );
}

export function LogoBuilder() {
  const [bgId, setBgId] = useState<BgId>("purple-royal");
  const [logoColour, setLogoColour] = useState<LogoColour>("gold");

  const bg = BG_OPTIONS.find((b) => b.id === bgId)!;
  const lc = LOGO_COLOURS.find((c) => c.id === logoColour)!;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-premium">Background</p>
          <div className="flex flex-wrap gap-2">
            {BG_OPTIONS.map((b) => (
              <Swatch
                key={b.id}
                active={bgId === b.id}
                title={b.label}
                swatch={b.swatch}
                isTransparent={b.id === "transparent"}
                onClick={() => setBgId(b.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-premium">Logo colour</p>
          <div className="flex flex-wrap gap-2">
            {LOGO_COLOURS.map((c) => (
              <Swatch
                key={c.id}
                active={logoColour === c.id}
                title={c.label}
                swatch={c.swatch}
                onClick={() => setLogoColour(c.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <DownloadableGraphic
        id="logo-builder-canvas"
        filename="aurelian-logo-60cm"
        title="Logo — 60 × 60 cm square"
        note="Standard (3×): 1260×1260px. Print-ready (8×): 3360×3360px — suitable for 60 cm print at ~142 dpi."
        dimensions={{ width: CANVAS, height: CANVAS }}
        pixelRatio={3}
        highResFilename="aurelian-logo-60cm-print"
        highResPixelRatio={8}
        exportBackgroundColor={bgId === "transparent" ? "transparent" : undefined}
        frameClassName="relative overflow-hidden rounded-lg shadow-purple-depth"
      >
        <div className="flex h-full w-full items-center justify-center" style={bg.style}>
          <Image
            src="/logo.svg"
            alt=""
            width={210}
            height={297}
            className={`h-auto w-auto object-contain ${lc.filterClass}`}
            style={{ maxHeight: "72%", maxWidth: "58%" }}
            priority
            unoptimized
          />
        </div>
      </DownloadableGraphic>
    </div>
  );
}
