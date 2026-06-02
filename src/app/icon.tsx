import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          color: "#fff",
          fontSize: 22,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
// Avoid lint warning for unused import in build
void SITE;