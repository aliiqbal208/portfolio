import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Ali | Tech Lead & Full Stack Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0f1e",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #0ea5c7 0%, #22d3ee 100%)",
          }}
        />

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(14,165,199,0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Left glow */}
        <div
          style={{
            position: "absolute",
            left: -100,
            top: "50%",
            marginTop: -200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,199,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Watermark MA */}
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: -80,
            fontSize: 340,
            fontWeight: 900,
            color: "rgba(14,165,199,0.05)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          MA
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "#0ea5c7",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: "0 0 20px 0",
              fontFamily: "monospace",
            }}
          >
            muhammadali.dev
          </p>

          <h1
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "white",
              lineHeight: 0.9,
              margin: "0 0 22px 0",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            Muhammad Ali
          </h1>

          <p
            style={{
              fontSize: 26,
              color: "#94a3b8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 48px 0",
            }}
          >
            Tech Lead & Full Stack Architect
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            {["8+ Years", "AI / ML", "Cloud", "Full Stack"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  border: "1px solid rgba(14,165,199,0.4)",
                  color: "rgba(14,165,199,0.9)",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: 4,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
