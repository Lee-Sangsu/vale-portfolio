import Image from "next/image";

/**
 * Decorative swoosh of square travel photos that sweeps from the lower-left,
 * along a dense bottom arc, then curls up the right edge and into a loose
 * cluster at the top-center — matching the Figma "Contact hero" spiral. The
 * whole upper-left quadrant is left empty so the "Contact" title reads clearly.
 * Each tile is a square (no rounded corners) with a soft drop shadow and a
 * small individual rotation so the set reads hand-scattered.
 *
 * Mobile: a simple wrapping grid (the absolute scatter does not fit narrow
 * viewports), still square + rotated for character.
 *
 * The source travel photos live under the git-ignored `public/photos/**` tree
 * (6–10 MB each), so they would not deploy. Square 400px JPG copies are baked
 * into `public/figma/contact/ring/` (tracked, ~40 KB each) and referenced here.
 */

const RING = "/figma/contact/ring";

/**
 * Each tile: a source photo + percentage position (center left/top within the
 * 1280×600 ring box) + rotation + size. Coordinates are transcribed from the
 * Figma "Group 1" spiral (node 207:494): a bottom arc left→right (1–4), a dense
 * centre cluster (5–7), an up-the-right curl (8–10), then a diagonal climb into
 * the top-centre cluster (11–14). The upper-left stays open for the title.
 */
const TILES: { src: string; left: number; top: number; rot: number; size: number }[] = [
  // bottom arc, left → right
  { src: `${RING}/ring-01.jpg`, left: 7, top: 81, rot: -8, size: 123 },
  { src: `${RING}/ring-02.jpg`, left: 18, top: 89, rot: 6, size: 114 },
  { src: `${RING}/ring-03.jpg`, left: 30, top: 92, rot: -4, size: 100 },
  { src: `${RING}/ring-04.jpg`, left: 42, top: 93, rot: 8, size: 116 },
  // dense centre cluster
  { src: `${RING}/ring-05.jpg`, left: 64, top: 73, rot: -6, size: 134 },
  { src: `${RING}/ring-06.jpg`, left: 61, top: 82, rot: 10, size: 128 },
  { src: `${RING}/ring-07.jpg`, left: 53, top: 65, rot: -10, size: 135 },
  // up-the-right curl
  { src: `${RING}/ring-08.jpg`, left: 72, top: 90, rot: 12, size: 112 },
  { src: `${RING}/ring-09.jpg`, left: 83, top: 92, rot: -7, size: 109 },
  { src: `${RING}/ring-10.jpg`, left: 95, top: 90, rot: 14, size: 116 },
  // diagonal climb into the top-centre cluster
  { src: `${RING}/ring-11.jpg`, left: 68, top: 52, rot: 5, size: 108 },
  { src: `${RING}/ring-12.jpg`, left: 53, top: 41, rot: -5, size: 138 },
  { src: `${RING}/ring-13.jpg`, left: 47, top: 25, rot: 7, size: 135 },
  { src: `${RING}/ring-14.jpg`, left: 64, top: 11, rot: -9, size: 132 },
];

export function PhotoRing() {
  return (
    <>
      {/* Desktop: absolute oval scatter with an empty center */}
      <div className="relative mx-auto hidden h-[600px] w-full max-w-[1280px] md:block">
        {TILES.map((t, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${t.left}%`,
              top: `${t.top}%`,
              width: t.size,
              height: t.size,
              transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
            }}
          >
            <div className="relative h-full w-full overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <Image
                src={t.src}
                alt=""
                fill
                sizes="130px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
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
