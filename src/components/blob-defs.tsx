// Organic blob clip-paths used across the site (about image, trainer portraits).
// Coordinates are in objectBoundingBox space (0–1), so the same path scales to
// any element size and aspect ratio.
const blobPaths = [
  // 1 — lopsided right: heavy upper-right bulge, pinched lower-left
  "M0.42,0.02 C0.7,0.02 0.97,0.14 0.98,0.36 C0.99,0.55 0.85,0.66 0.74,0.78 C0.6,0.92 0.52,0.99 0.4,0.97 C0.2,0.95 0.04,0.84 0.02,0.62 C0.0,0.35 0.06,0.12 0.2,0.05 C0.28,0.02 0.34,0.02 0.42,0.02 Z",
  // 2 — bottom-heavy pear with narrow shoulders
  "M0.5,0.04 C0.66,0.02 0.74,0.1 0.78,0.22 C0.82,0.32 0.94,0.4 0.98,0.55 C0.99,0.78 0.86,0.94 0.6,0.98 C0.32,1.0 0.05,0.9 0.02,0.65 C0.0,0.42 0.18,0.32 0.26,0.22 C0.32,0.14 0.4,0.08 0.5,0.04 Z",
  // 3 — comma swirl, dramatic shoulder-and-tail asymmetry
  "M0.4,0.02 C0.62,0.02 0.85,0.06 0.95,0.22 C1.0,0.42 0.94,0.62 0.82,0.74 C0.72,0.84 0.7,0.92 0.6,0.98 C0.45,1.0 0.28,0.98 0.16,0.88 C0.02,0.74 0.02,0.55 0.06,0.4 C0.1,0.22 0.05,0.06 0.22,0.02 C0.3,0.0 0.34,0.02 0.4,0.02 Z",
  // 4 — kidney bean: deep concave on the left, broad right
  "M0.55,0.02 C0.78,0.02 0.92,0.18 0.92,0.35 C0.92,0.5 0.74,0.55 0.7,0.65 C0.65,0.76 0.78,0.88 0.7,0.96 C0.6,1.0 0.4,1.0 0.22,0.96 C0.02,0.86 0.0,0.6 0.04,0.4 C0.14,0.18 0.32,0.04 0.55,0.02 Z",
  // 5 — droplet with a kink: slim top, splash bottom-right
  "M0.55,0.02 C0.65,0.04 0.7,0.14 0.68,0.22 C0.66,0.32 0.86,0.36 0.96,0.5 C1.0,0.66 0.96,0.86 0.8,0.96 C0.6,1.0 0.32,1.0 0.14,0.92 C0.0,0.78 0.0,0.5 0.1,0.32 C0.22,0.16 0.42,0.02 0.55,0.02 Z",
];

export function BlobDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        {blobPaths.map((d, i) => (
          <clipPath
            key={i}
            id={`blob-${i + 1}`}
            clipPathUnits="objectBoundingBox"
          >
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

export const blobCount = blobPaths.length;
