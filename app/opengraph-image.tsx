import { ImageResponse } from "next/og";
export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Tanvesh - Engineer and Designer";

export default async function Image() {
  const departureMono = await fetch(
    new URL("./fonts/DepartureMono-Regular.woff", import.meta.url),
  ).then((response) => response.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "Departure Mono",
      }}
    >
      {/* Grid pattern background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
              linear-gradient(to right, #e5e5e5 1px, transparent 1px),
              linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
            `,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "24px",
          zIndex: 1,
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#005ebb",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          Tanvesh
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Departure Mono",
          data: departureMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
