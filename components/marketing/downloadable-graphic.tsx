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
  /** If set, shows a second button for a higher `pixelRatio` export (print / litho). */
  highResFilename?: string;
  /** Pixel ratio for the quick download (default 2). */
  pixelRatio?: number;
  /** Pixel ratio for the high-res download when `highResFilename` is set (default 5). */
  highResPixelRatio?: number;
  /** Capture root classes (default rounded preview + shadow). Use square corners for print sheets. */
  frameClassName?: string;
  /** Passed to html-to-image — use `"transparent"` for logo / alpha exports. */
  exportBackgroundColor?: string;
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
  highResFilename,
  pixelRatio = 2,
  highResPixelRatio = 5,
  frameClassName = "relative overflow-hidden rounded-lg shadow-purple-depth",
  exportBackgroundColor,
}: DownloadableGraphicProps) {
  const [busy, setBusy] = useState<false | "quick" | "high">(false);
  const [error, setError] = useState<string | null>(null);

  const runDownload = useCallback(async (ratio: number, fileBase: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      await waitForImagesInRoot(el);

      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, {
        pixelRatio: ratio,
        cacheBust: true,
        skipFonts: true,
        ...(exportBackgroundColor !== undefined ? { backgroundColor: exportBackgroundColor } : {}),
      });
      const a = document.createElement("a");
      a.download = `${sanitizeFilename(fileBase)}.png`;
      a.href = dataUrl;
      a.click();
  }, [id, exportBackgroundColor]);

  const downloadQuick = useCallback(async () => {
    setError(null);
    setBusy("quick");
    try {
      await runDownload(pixelRatio, filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create PNG.");
    } finally {
      setBusy(false);
    }
  }, [runDownload, pixelRatio, filename]);

  const downloadHighRes = useCallback(async () => {
    if (!highResFilename) return;
    setError(null);
    setBusy("high");
    try {
      await runDownload(highResPixelRatio, highResFilename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create PNG.");
    } finally {
      setBusy(false);
    }
  }, [runDownload, highResPixelRatio, highResFilename]);

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
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              disabled={!!busy}
              onClick={downloadQuick}
              className="rounded-md border border-gold-premium/35 bg-purple-deep px-3 py-1.5 text-xs font-medium text-gold-premium transition hover:bg-purple-plum/40 disabled:cursor-wait disabled:opacity-60"
            >
              {busy === "quick"
                ? "Saving…"
                : highResFilename
                  ? `Standard (${pixelRatio}×)`
                  : pixelRatio === 2
                    ? "Download PNG"
                    : `PNG (${pixelRatio}×)`}
            </button>
            {highResFilename ? (
              <button
                type="button"
                disabled={!!busy}
                onClick={downloadHighRes}
                className="rounded-md border border-gold-champagne/45 bg-purple-plum/50 px-3 py-1.5 text-xs font-semibold text-gold-champagne transition hover:bg-purple-plum/70 disabled:cursor-wait disabled:opacity-60"
              >
                {busy === "high" ? "Saving…" : `High-res PNG (${highResPixelRatio}×)`}
              </button>
            ) : null}
          </div>
          {error ? (
            <p className="max-w-[240px] text-right text-[10px] leading-snug text-red-300/95">{error}</p>
          ) : null}
        </div>
      </div>
      <div id={id} className={frameClassName} style={frameStyle}>
        {children}
      </div>
    </section>
  );
}
