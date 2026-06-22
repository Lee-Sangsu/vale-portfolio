import Image from "next/image";

/**
 * Travel photos that flow continuously along a closed bezier arc — a CSS
 * Motion Path conveyor belt. The closed path sweeps from the top-center-right,
 * down the left side, across the invisible bottom return rail (clipped), up
 * the right side, and back to the top. The upper-left quadrant stays empty
 * so the "Contact" heading reads clearly.
 *
 * Mobile: simple wrapping grid (the motion path does not fit narrow viewports).
 */

const RING = "/figma/contact/ring";

// Single ribbon path:
//  1. Top cluster   — tight arc from x≈900 back to x≈600, y≈40–80
//  2. Left arm      — nearly vertical descent, x stays ~42–47% until y≈350,
//                     then curves hard left to (120, 490)
//  3. Bottom sweep  — travels right across the full width at y≈490–495
//  4. Off-screen    — exits past x=1280, loops up and back (invisible,
//                     clipped by overflow-hidden) to rejoin the top cluster
const ARC_PATH =
  "M 600 80 " +
  "C 595 250 590 400 120 490 " +
  "C 450 495 920 495 1400 490 " +
  "C 2000 490 2100 200 1900 50 " +
  "C 1700 -60 1200 -40 900 40 " +
  "C 750 48 650 65 600 80 " +
  "Z";

const DURATION = 40; // seconds for one full revolution

const TILES: { src: string; rot: number; size: number }[] = [
  { src: `${RING}/ring-01.jpg`, rot: -8,  size: 123 },
  { src: `${RING}/ring-02.jpg`, rot:  6,  size: 114 },
  { src: `${RING}/ring-03.jpg`, rot: -4,  size: 100 },
  { src: `${RING}/ring-04.jpg`, rot:  8,  size: 116 },
  { src: `${RING}/ring-05.jpg`, rot: -6,  size: 134 },
  { src: `${RING}/ring-06.jpg`, rot: 10,  size: 128 },
  { src: `${RING}/ring-07.jpg`, rot: -10, size: 135 },
  { src: `${RING}/ring-08.jpg`, rot: 12,  size: 112 },
  { src: `${RING}/ring-09.jpg`, rot: -7,  size: 109 },
  { src: `${RING}/ring-10.jpg`, rot: 14,  size: 116 },
  { src: `${RING}/ring-11.jpg`, rot:  5,  size: 108 },
  { src: `${RING}/ring-12.jpg`, rot: -5,  size: 138 },
  { src: `${RING}/ring-13.jpg`, rot:  7,  size: 135 },
  { src: `${RING}/ring-14.jpg`, rot: -9,  size: 132 },
];

export function PhotoRing() {
  return (
    <>
      {/* Desktop: photos flow along the bezier arc */}
      <div className="relative mx-auto hidden h-[600px] w-full max-w-[1280px] overflow-hidden md:block">
        <style>{`
          @keyframes photoRingMove {
            from { offset-distance: 0%; }
            to   { offset-distance: 100%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .photo-ring-tile { animation: none !important; }
          }
        `}</style>

        {TILES.map((t, i) => {
          const startPct = (i / TILES.length) * 100;
          const delaySec = -((startPct / 100) * DURATION);

          return (
            <div
              key={i}
              className="photo-ring-tile absolute"
              style={{
                width: t.size,
                height: t.size,
                offsetPath: `path("${ARC_PATH}")`,
                offsetRotate: "0deg",
                transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
                animation: `photoRingMove ${DURATION}s linear ${delaySec}s infinite`,
              } as React.CSSProperties}
            >
              <div className="relative h-full w-full overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: simple wrapping grid of the same square tiles */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {TILES.map((t, i) => (
          <div
            key={i}
            className="relative size-[88px] overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            style={{ transform: `rotate(${t.rot / 3}deg)` }}
          >
            <Image
              src={t.src}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
