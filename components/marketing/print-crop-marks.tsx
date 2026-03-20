import type { CSSProperties, ReactNode } from "react";

/** Corner crop marks on trim; lines extend outward from trim by `gap` then `markLen`. */
function trimCornerLines(
  trimLeft: number,
  trimTop: number,
  trimW: number,
  trimH: number,
  markLen: number,
  gap: number,
): Array<[number, number, number, number]> {
  const x2 = trimLeft + trimW;
  const y2 = trimTop + trimH;
  return [
    [trimLeft - gap - markLen, trimTop, trimLeft - gap, trimTop],
    [trimLeft, trimTop - gap - markLen, trimLeft, trimTop - gap],
    [x2 + gap, trimTop, x2 + gap + markLen, trimTop],
    [x2, trimTop - gap - markLen, x2, trimTop - gap],
    [trimLeft - gap - markLen, y2, trimLeft - gap, y2],
    [trimLeft, y2 + gap, trimLeft, y2 + gap + markLen],
    [x2 + gap, y2, x2 + gap + markLen, y2],
    [x2, y2 + gap, x2, y2 + gap + markLen],
  ];
}

function CropMarkLines({
  lines,
  strokeWidth,
  viewBoxW,
  viewBoxH,
}: {
  lines: Array<[number, number, number, number]>;
  strokeWidth: number;
  viewBoxW: number;
  viewBoxH: number;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-neutral-900"
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
        {lines.map((c, i) => (
          <line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} />
        ))}
      </g>
    </svg>
  );
}

type PrintPackPxProps = {
  trimWidthPx: number;
  trimHeightPx: number;
  /** ~3mm at this trim scale (3.5×2 in card). */
  bleedPx: number;
  /** Full-bleed layers (gradients, textures) — must fill behind trim. */
  bleedBackdrop: ReactNode;
  /** Margin outside bleed box for crop marks (default 24). */
  gutterPx?: number;
  markLengthPx?: number;
  gapPx?: number;
  /** Trim-only content (stays inside final cut); padded automatically by `bleedPx`. */
  children: ReactNode;
  trimClassName?: string;
  trimStyle?: CSSProperties;
};

/** Sheet: gutter + bleed box + gutter. Marks on trim; backdrop fills full bleed. */
export function PrintPackPx({
  trimWidthPx,
  trimHeightPx,
  bleedPx,
  bleedBackdrop,
  gutterPx = 24,
  markLengthPx = 11,
  gapPx = 2,
  children,
  trimClassName = "relative z-10 box-border min-h-0 min-w-0 overflow-hidden",
  trimStyle,
}: PrintPackPxProps) {
  const bleedW = trimWidthPx + 2 * bleedPx;
  const bleedH = trimHeightPx + 2 * bleedPx;
  const sheetW = bleedW + 2 * gutterPx;
  const sheetH = bleedH + 2 * gutterPx;
  const trimLeft = gutterPx + bleedPx;
  const trimTop = gutterPx + bleedPx;
  const lines = trimCornerLines(trimLeft, trimTop, trimWidthPx, trimHeightPx, markLengthPx, gapPx);

  return (
    <div
      className="relative h-full w-full bg-[#d4d2d8]"
      style={{ width: sheetW, height: sheetH }}
    >
      <CropMarkLines lines={lines} strokeWidth={1} viewBoxW={sheetW} viewBoxH={sheetH} />
      <div
        className="absolute overflow-hidden"
        style={{
          left: gutterPx,
          top: gutterPx,
          width: bleedW,
          height: bleedH,
        }}
      >
        {/* Slightly oversized backdrop so gradients/solids fully cover bleed (avoids hairline gaps at trim). */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[102%] w-[102%] -translate-x-1/2 -translate-y-1/2">
            {bleedBackdrop}
          </div>
        </div>
        <div
          className={trimClassName}
          style={{
            margin: bleedPx,
            width: trimWidthPx,
            height: trimHeightPx,
            ...trimStyle,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type PrintPackMmProps = {
  trimWidthMm: number;
  trimHeightMm: number;
  /** Standard litho bleed (default 3mm). */
  bleedMm: number;
  bleedBackdrop: ReactNode;
  gutterMm?: number;
  markLengthMm?: number;
  gapMm?: number;
  children: ReactNode;
  trimClassName?: string;
  trimStyle?: CSSProperties;
};

/** ISO sheet: gutter + (trim + 2×bleed) + gutter. */
export function PrintPackMm({
  trimWidthMm,
  trimHeightMm,
  bleedMm,
  bleedBackdrop,
  gutterMm = 4,
  markLengthMm = 2.5,
  gapMm = 0.75,
  children,
  trimClassName = "relative z-10 box-border min-h-0 min-w-0 overflow-hidden",
  trimStyle,
}: PrintPackMmProps) {
  const bleedW = trimWidthMm + 2 * bleedMm;
  const bleedH = trimHeightMm + 2 * bleedMm;
  const sheetW = bleedW + 2 * gutterMm;
  const sheetH = bleedH + 2 * gutterMm;
  const trimLeft = gutterMm + bleedMm;
  const trimTop = gutterMm + bleedMm;
  const lines = trimCornerLines(trimLeft, trimTop, trimWidthMm, trimHeightMm, markLengthMm, gapMm);

  return (
    <div
      className="relative h-full w-full bg-[#d4d2d8]"
      style={{ width: `${sheetW}mm`, height: `${sheetH}mm` }}
    >
      <CropMarkLines lines={lines} strokeWidth={0.25} viewBoxW={sheetW} viewBoxH={sheetH} />
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${gutterMm}mm`,
          top: `${gutterMm}mm`,
          width: `${bleedW}mm`,
          height: `${bleedH}mm`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[102%] w-[102%] -translate-x-1/2 -translate-y-1/2">
            {bleedBackdrop}
          </div>
        </div>
        <div
          className={trimClassName}
          style={{
            margin: `${bleedMm}mm`,
            width: `${trimWidthMm}mm`,
            height: `${trimHeightMm}mm`,
            ...trimStyle,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** ~3mm bleed in px for a 3.5×2 in card at the given trim pixel width. */
export function cardBleedPx(trimWidthPx: number, trimWidthInches = 3.5, bleedMm = 3) {
  return Math.round((trimWidthPx / trimWidthInches) * (bleedMm / 25.4));
}
