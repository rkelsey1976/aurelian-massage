import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #20152E 0%, #2C1E42 55%, #3B2660 100%)",
          color: "#F2EAE9",
          fontFamily: "Arial, sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#C5A556",
              }}
            >
              SEO-ready starter
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 700,
                maxWidth: "900px",
                lineHeight: 1.05,
                color: "#F7F7F7",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                maxWidth: "900px",
                color: "#A4A2A6",
              }}
            >
              {siteConfig.tagline}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#C5A556",
            }}
          >
            LocalBusiness Schema • Marketing Pages • Blog Scaffolding
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
