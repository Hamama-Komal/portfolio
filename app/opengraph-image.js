import { ImageResponse } from "next/og";
import { publishedCount } from "@/lib/data";

export const alt = "Hamama Komal — Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview, generated at build time so there is no hand-made PNG to keep
 * in sync. Same palette as the site: bone paper, warm ink, one rust rule.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f7f6f3",
        padding: "64px 72px",
      }}
    >
      <div style={{ display: "flex", height: 6, width: 160, background: "#c2410c" }} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#12110f",
          }}
        >
          Hamama Komal
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 40,
            color: "#4a4742",
            letterSpacing: "-0.01em",
          }}
        >
          Flutter Developer · Bhakkar, Pakistan
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(18,17,15,0.15)",
          paddingTop: 28,
          fontSize: 26,
          color: "#7c776f",
          letterSpacing: "0.08em",
        }}
      >
        <div style={{ display: "flex" }}>{publishedCount} APPS ON GOOGLE PLAY</div>
        <div style={{ display: "flex", color: "#9a3412" }}>HAMAMA-KOMAL.VERCEL.APP</div>
      </div>
    </div>,
    size
  );
}
