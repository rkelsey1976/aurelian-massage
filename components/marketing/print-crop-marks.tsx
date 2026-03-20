import type { CSSProperties, ReactNode } from "react";

/** Corner crop marks: lines extend outward from trim by `gap` then `markLen`. */
function trimCornerLines(
  t: number,
  trimW: number,
  trimH: number,
  markLen: number,
  gap: number,
): Array<[number, number, number, number]> {
  const x2 = t + trimW;
  const y2 = t + trimH;
  return [
    [t - gap - markLen, t, t - gap, t],
    [t, t - gap - markLen, t, t - gap],
    [x2 + gap, t, x2 + gap + markLen, t],
    [x2, t - gap - markLen, x2, t - gap],
    [t - gap - markLen, y2, t - gap, y2],
    [t, y2 + gap, t, y2 + gap + markLen],
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
  /** Margin around trim where marks sit (default 24). */
  gutterPx?: number;
  markLengthPx?: number;
  gapPx?: number;
  children: ReactNode;
  /** Optional class on the trim (card) box. */
  trimClassName?: string;
  trimStyle?: CSSProperties;
};

/** Screen / raster sheet in pixels — light gutter + crop marks at trim. */
export function PrintPackPx({
  trimWidthPx,
  trimHeightPx,
  gutterPx = 24,
  markLengthPx = 11,
  gapPx = 2,
  children,
  trimClassName = "overflow-hidden rounded-md shadow-purple-depth",
  trimStyle,
}: PrintPackPxProps) {
  const sheetW = trimWidthPx + 2 * gutterPx;
  const sheetH = trimHeightPx + 2 * gutterPx;
  const lines = trimCornerLines(gutterPx, trimWidthPx, trimHeightPx, markLengthPx, gapPx);

  return (
    <div
      className="relative h-full w-full bg-[#d4d2d8]"
      style={{ width: sheetW, height: sheetH }}
    >
      <CropMarkLines lines={lines} strokeWidth={1} viewBoxW={sheetW} viewBoxH={sheetH} />
      <div
        className={`absolute ${trimClassName}`}
        style={{
          left: gutterPx,
          top: gutterPx,
          width: trimWidthPx,
          height: trimHeightPx,
          ...trimStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type PrintPackMmProps = {
  trimWidthMm: number;
  trimHeightMm: number;
  gutterMm?: number;
  markLengthMm?: number;
  gapMm?: number;
  children: ReactNode;
  trimClassName?: string;
  trimStyle?: CSSProperties;
};

/** ISO-style sheet in mm (e.g. A5 + gutter) with crop marks in document units. */
export function PrintPackMm({
  trimWidthMm,
  trimHeightMm,
  gutterMm = 4,
  markLengthMm = 2.5,
  gapMm = 0.75,
  children,
  trimClassName = "overflow-hidden rounded-sm shadow-purple-depth",
  trimStyle,
}: PrintPackMmProps) {
  const sheetW = trimWidthMm + 2 * gutterMm;
  const sheetH = trimHeightMm + 2 * gutterMm;
  const lines = trimCornerLines(gutterMm, trimWidthMm, trimHeightMm, markLengthMm, gapMm);

  return (
    <div
      className="relative h-full w-full bg-[#d4d2d8]"
      style={{ width: `${sheetW}mm`, height: `${sheetH}mm` }}
    >
      <CropMarkLines lines={lines} strokeWidth={0.25} viewBoxW={sheetW} viewBoxH={sheetH} />
      <div
        className={`absolute ${trimClassName}`}
        style={{
          left: `${gutterMm}mm`,
          top: `${gutterMm}mm`,
          width: `${trimWidthMm}mm`,
          height: `${trimHeightMm}mm`,
          ...trimStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
