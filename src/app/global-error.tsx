"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          background: "#0B141A",
          color: "#fff",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", color: "#EF4444" }}>
            Critical Error
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 12, lineHeight: 1.15 }}>
            Aplikasi tidak dapat dimuat
          </h1>
          <p style={{ marginTop: 14, color: "rgba(255,255,255,0.75)" }}>
            Coba muat ulang halaman. Jika masalah berlanjut, hubungi admin@rizquna.id.
          </p>
          {error.digest && (
            <p style={{ fontFamily: "monospace", fontSize: 12, marginTop: 6, color: "rgba(255,255,255,0.4)" }}>
              digest: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: 28,
              padding: "14px 24px",
              borderRadius: 14,
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}