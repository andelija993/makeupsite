import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          color: "#171211",
          background: "linear-gradient(130deg, #fcfaf7, #f3e5d3)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          lineHeight: 1.2,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#a47f58" }}>Luxury Makeup Artistry</div>
        <div style={{ marginTop: 20 }}>Luna Atelier</div>
        <div style={{ marginTop: 14, fontSize: 34 }}>Bridal · Glam · Editorial</div>
      </div>
    ),
    size,
  );
}
