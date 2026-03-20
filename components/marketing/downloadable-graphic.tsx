"use client";

import { useCallback, useState, type CSSProperties, type ReactNode } from "react";

type DownloadableGraphicProps = {
  id: string;
  /** Used as the download filename (`.png` added); keep ASCII / hyphens. */
  filename: string;
  title: string;
  note?: string;
  dimensions: { width: number | string; height: number | string };
  children: ReactNode;
};

function sanitizeFilename(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "") || "graphic";
}

/** Next/Image often lazy-loads; html-to-image needs decoded bitmaps in the DOM. */
function waitForImagesInRoot(root: HTMLElement, timeoutMs = 12_000) {
  const imgs = [...root.querySelectorAll("img")];
  if (imgs.length === 0) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error("Images took too long to load — scroll the graphic into view and try again."));
    }, timeoutMs);

    let waiting = 0;
    const clear = () => window.clearTimeout(timer);

    const done = () => {
      waiting -= 1;
      if (waiting <= 0) {
        clear();
        resolve();
      }
    };

    for (const img of imgs) {
      img.loading = "eager";
      if (img.complete) {
        if (img.naturalWidth === 0 && img.src) {
          clear();
          reject(new Error("An image in this graphic failed to load."));
          return;
        }
        continue;
      }
      waiting += 1;
      img.addEventListener(
        "load",
        () => {
          if (img.naturalWidth === 0) {
            clear();
            reject(new Error("An image in this graphic failed to load."));
            return;
          }
          done();
        },
        { once: true },
      );
      img.addEventListener(
        "error",
        () => {
          clear();
          reject(new Error("An image in this graphic failed to load."));
        },
        { once: true },
      );
    }

    if (waiting === 0) {
      clear();
      resolve();
    }
  });
}

export function DownloadableGraphic({
  id,
  filename,
  title,
  note,
  dimensions,
  children,
}: DownloadableGraphicProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    const el = document.getElementById(id);
    if (!el || busy) return;
    setBusy(true);
    setError(null);
    try {
      // html2canvas cannot parse Tailwind v4’s oklab()/oklch() in stylesheets; html-to-image
      // rasterizes via the browser’s SVG path and avoids that parser.
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      await waitForImagesInRoot(el);

      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });
      const a = document.createElement("a");
      a.download = `${sanitizeFilename(filename)}.png`;
      a.href = dataUrl;
      a.click();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not create PNG.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }, [id, filename, busy]);

  const frameStyle: CSSProperties = {
    width: dimensions.width,
    height: dimensions.height,
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium tracking-wide text-neutral-gray">{title}</h2>
          {note ? <p className="mt-1 text-xs text-neutral-gray/80">{note}</p> : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <button
            type="button"
            disabled={busy}
            onClick={download}
            className="rounded-md border border-gold-premium/35 bg-purple-deep px-3 py-1.5 text-xs font-medium text-gold-premium transition hover:bg-purple-plum/40 disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Saving…" : "Download PNG"}
          </button>
          {error ? (
            <p className="max-w-[220px] text-right text-[10px] leading-snug text-red-300/95">{error}</p>
          ) : null}
        </div>
      </div>
      <div
        id={id}
        className="relative overflow-hidden rounded-lg shadow-purple-depth"
        style={frameStyle}
      >
        {children}
      </div>
    </section>
  );
}
