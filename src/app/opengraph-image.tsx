import { ImageResponse } from "next/og";

export const alt = "Form Studio — Boutique Fitness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ECE4D3",
          fontFamily: "Georgia, serif",
          color: "#1F1A14",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#5C3925",
            display: "flex",
          }}
        >
          Form Studio · Boutique Fitness
        </div>

        {/* Title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Title row 1 */}
          <div
            style={{
              fontSize: 132,
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: "-0.025em",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span style={{ display: "flex" }}>Mișcare.&nbsp;</span>
            <span style={{ display: "flex", fontStyle: "italic" }}>
              Spațiu.
            </span>
          </div>
          {/* Title row 2 */}
          <div
            style={{
              fontSize: 132,
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: "-0.025em",
              display: "flex",
            }}
          >
            Echilibru.
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 30,
              fontStyle: "italic",
              color: "#635A4D",
              maxWidth: 760,
              display: "flex",
              marginTop: 24,
            }}
          >
            Un loc gândit pentru oameni, nu pentru aglomerație.
          </div>
        </div>

        {/* Bottom rule + footer line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              height: 1,
              background: "#1F1A14",
              opacity: 0.15,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#635A4D",
              display: "flex",
            }}
          >
            Alba Iulia · Boutique Fitness
          </div>
        </div>
      </div>
    ),
    size
  );
}
