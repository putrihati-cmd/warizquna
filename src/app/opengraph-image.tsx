import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.brand} — ${SITE.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0B141A 0%, #128C7E 60%, #25D366 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#fff",
              color: "#128C7E",
              fontSize: 48,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            R
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.name}</span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            WhatsApp API Gateway
          </p>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              lineHeight: 1.05,
              margin: 0,
              marginTop: 16,
              maxWidth: 1000,
            }}
          >
            WhatsApp API Free
            <br />
            <span style={{ color: "#25D366" }}>& API Gateway Mandiri.</span>
          </h1>
          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              marginTop: 24,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            wa.rizquna.id
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}