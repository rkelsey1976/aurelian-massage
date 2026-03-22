"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { DownloadableGraphic } from "@/components/marketing/downloadable-graphic";

/** viewBox 210×297 — keep aspect for previews */
const PREVIEW_W = 280;
const PREVIEW_H = (297 / 210) * PREVIEW_W;

function LogoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">{children}</div>
  );
}

export function LogoAssetsDownloads() {
  return (
    <div className="space-y-12">
      <DownloadableGraphic
        id="logo-asset-gold"
        filename="aurelian-logo-gold-transparent"
        title="Gold (brand)"
        note="Brand gold (#C5A556) on transparent background — use on light or coloured surfaces."
        dimensions={{ width: PREVIEW_W, height: PREVIEW_H }}
        pixelRatio={3}
        exportBackgroundColor="transparent"
        frameClassName="relative overflow-hidden rounded-lg shadow-purple-depth"
      >
        <LogoFrame>
          <Image
            src="/logo.svg"
            alt=""
            width={400}
            height={566}
            className="h-auto w-full max-w-[220px] object-contain"
            priority
            unoptimized
          />
        </LogoFrame>
      </DownloadableGraphic>

      <DownloadableGraphic
        id="logo-asset-bw"
        filename="aurelian-logo-grayscale-transparent"
        title="Black & white"
        note="Neutral grayscale on transparent — works when full colour is not appropriate."
        dimensions={{ width: PREVIEW_W, height: PREVIEW_H }}
        pixelRatio={3}
        exportBackgroundColor="transparent"
        frameClassName="relative overflow-hidden rounded-lg shadow-purple-depth"
      >
        <LogoFrame>
          <Image
            src="/logo.svg"
            alt=""
            width={400}
            height={566}
            className="h-auto w-full max-w-[220px] object-contain grayscale"
            priority
            unoptimized
          />
        </LogoFrame>
      </DownloadableGraphic>

      <DownloadableGraphic
        id="logo-asset-black"
        filename="aurelian-logo-black-transparent"
        title="Black"
        note="Solid black silhouette on transparent — strong contrast on light backgrounds."
        dimensions={{ width: PREVIEW_W, height: PREVIEW_H }}
        pixelRatio={3}
        exportBackgroundColor="transparent"
        frameClassName="relative overflow-hidden rounded-lg shadow-purple-depth"
      >
        <LogoFrame>
          <Image
            src="/logo.svg"
            alt=""
            width={400}
            height={566}
            className="h-auto w-full max-w-[220px] object-contain brightness-0"
            priority
            unoptimized
          />
        </LogoFrame>
      </DownloadableGraphic>
    </div>
  );
}
