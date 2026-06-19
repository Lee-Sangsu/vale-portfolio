import Image from "next/image";
import { encodeAsset } from "@/content/photo-manifest";

/**
 * Decorative ring of square travel photos that sweeps around an empty center,
 * matching the Figma "Portfolio Spiral" centerpiece. Each tile is a square
 * (no rounded corners) with a soft drop shadow and an individual small rotation
 * so the set reads hand-scattered.
 *
 * Desktop: absolute scatter inside an oval, center left empty for the title.
 * Mobile: a simple wrapping grid (the absolute scatter does not fit narrow
 * viewports), still square + rotated for character.
 */

const NICE = "photos/Nice photos ";
const MINE = "photos/about/My photos";

/**
 * Each tile: a source photo + percentage position (left/top of its center
 * within the ring box) + rotation + size. Positions trace a loose oval whose
 * empty middle sits slightly above center, denser toward the bottom/right.
 */
const TILES: { src: string; left: number; top: number; rot: number; size: number }[] = [
  { src: `${NICE}/IMG_0621.png`, left: 12, top: 20, rot: -13.4, size: 116 },
  { src: `${NICE}/IMG_0622.png`, left: 30, top: 8, rot: 11.9, size: 124 },
  { src: `${NICE}/IMG_2012.png`, left: 50, top: 5, rot: -3.4, size: 110 },
  { src: `${NICE}/IMG_2316.png`, left: 70, top: 9, rot: 10.3, size: 122 },
  { src: `${NICE}/IMG_2567.png`, left: 87, top: 22, rot: 25.9, size: 114 },
  { src: `${NICE}/IMG_9109_VSCO.png`, left: 92, top: 48, rot: -13.7, size: 118 },
  { src: `${NICE}/IMG_9454_VSCO.png`, left: 87, top: 74, rot: 20.2, size: 120 },
  { src: `${NICE}/IMG_3672_VSCO.png`, left: 72, top: 90, rot: -38.1, size: 112 },
  { src: `${NICE}/IMG_0742_VSCO.png`, left: 52, top: 95, rot: 1.6, size: 126 },
  { src: `${NICE}/44A94BF8-45CA-40EA-A686-9E602E4DD168_VSCO.png`, left: 32, top: 92, rot: -53.8, size: 114 },
  { src: `${NICE}/2DA4ABA0-7999-4F50-AA99-E01B4DF45A7F.png`, left: 14, top: 76, rot: 50.6, size: 118 },
  { src: `${NICE}/4F260AF5-82F7-43B1-B6B8-0C2066C3916F.png`, left: 8, top: 48, rot: -8.9, size: 116 },
  { src: `${MINE}/IMG_2260.png`, left: 64, top: 64, rot: 32.5, size: 104 },
  { src: `${MINE}/IMG_7142.png`, left: 40, top: 70, rot: -22.0, size: 100 },
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
                src={encodeAsset(t.src)!}
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
              src={encodeAsset(t.src)!}
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
