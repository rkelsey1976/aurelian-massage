"use client";

import { useCallback, useState } from "react";

const MAX_BYTES = 12 * 1024 * 1024;

/** Sentinel value for background `<select>` when a file is active. */
export const BUILDER_CUSTOM_BG_SELECT = "__builder_custom_upload__";

export function useBuilderCustomBackground() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileHint, setFileHint] = useState<string | null>(null);

  const clear = useCallback(() => {
    setDataUrl(null);
    setFileHint(null);
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    setFileHint(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileHint("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileHint("Image must be about 12 MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") setDataUrl(r);
    };
    reader.readAsDataURL(file);
  }, []);

  return { dataUrl, clear, onFileChange, fileHint };
}

export function BuilderCustomBackgroundControl({
  inputId,
  dataUrl,
  fileHint,
  onFileChange,
  onClear,
}: {
  inputId: string;
  dataUrl: string | null;
  fileHint: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-gold-premium/10 bg-purple-royal/30 p-3">
      <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-wider text-gold-premium">
        Your background image
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFileChange}
        className="block w-full cursor-pointer text-xs text-neutral-gray file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-gold-premium/35 file:bg-purple-deep file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-gold-premium hover:file:bg-purple-plum/40"
      />
      {fileHint ? <p className="text-[11px] text-amber-200/95">{fileHint}</p> : null}
      {dataUrl ? (
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-gold-premium underline-offset-2 hover:underline"
        >
          Remove uploaded image
        </button>
      ) : null}
      <p className="text-[10px] leading-snug text-neutral-gray/80">
        JPEG, PNG, WebP or GIF, up to ~12&nbsp;MB. When set, this replaces the preset background for the preview
        and PNG export.
      </p>
    </div>
  );
}
