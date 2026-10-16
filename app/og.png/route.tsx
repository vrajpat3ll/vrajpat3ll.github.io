import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#fafafa",
          padding: "72px",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 28,
            color: "#a1a1aa",
            letterSpacing: "-0.01em",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 9999,
              backgroundColor: "#4ade80",
            }}
          />
          {site.url.replace("https://", "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#a1a1aa", marginTop: 16 }}>
            {`${site.role} · ${site.location}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#71717a" }}>
          <span>{`@${site.username}`}</span>
          <span>·</span>
          <span>{"IIT Jammu · CSE '26"}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
