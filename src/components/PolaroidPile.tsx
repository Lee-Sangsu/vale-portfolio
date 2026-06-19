import Image from "next/image";
import { getPhotoMeta } from "@/lib/photos";

/**
 * Adriana-style polaroid pile — overlapping photos at varied rotations.
 * Each polaroid keeps its real aspect ratio. Server component.
 */
export async function PolaroidPile({
  photos,
  alt,
  className = "",
  size = 220,
}: {
  photos: string[];
  alt: string;
  className?: string;
  /** Longest edge of each polaroid in px. */
  size?: number;
}) {
  if (photos.length === 0) return null;

  // Cap at 6 — more than that becomes visual noise.
  const slice = photos.slice(0, 6);
  const metas = await Promise.all(slice.map(getPhotoMeta));

  // Manual placement: rotations + offsets in % so the pile reads as scattered
  // but never escapes the container.
  const POSES: { rotate: number; x: string; y: string; z: number }[] = [
    { rotate: -8,  x: "8%",  y: "10%", z: 1 },
    { rotate: 6,   x: "30%", y: "0%",  z: 3 },
    { rotate: -4,  x: "55%", y: "12%", z: 2 },
    { rotate: 10,  x: "20%", y: "38%", z: 4 },
    { rotate: -10, x: "45%", y: "42%", z: 5 },
    { rotate: 4,   x: "12%", y: "62%", z: 6 },
  ];

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ minHeight: size * 2.2 }}
    >
      {slice.map((src, i) => {
        const meta = metas[i];
        const pose = POSES[i % POSES.length];
        // Polaroid is sized by its longest edge.
        const isLandscape = meta.width >= meta.height;
        const w = isLandscape ? size : Math.round((meta.width / meta.height) * size);
        const h = isLandscape ? Math.round((meta.height / meta.width) * size) : size;

        return (
          <div
            key={src}
            className="absolute bg-white p-2 pb-6 rounded-[6px] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.35),0_6px_14px_-6px_rgba(0,0,0,0.2)]"
            style={{
              width: w + 16,
              transform: `translate(${pose.x}, ${pose.y}) rotate(${pose.rotate}deg)`,
              zIndex: pose.z,
            }}
          >
            <div
              className="relative overflow-hidden rounded-[3px] bg-cream-deep"
              style={{ width: w, height: h }}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                sizes={`${w}px`}
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
