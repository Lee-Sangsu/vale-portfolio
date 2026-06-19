import Image from "next/image";
import clsx from "clsx";

/**
 * The hero "rosette" loader: a soft pink radial glow with NINE petals
 * (80x100 rounded rects) arranged radially like a flower / loading spinner.
 * Petals are filled with project photos when available, else grey #d9d9d9.
 *
 * Server component. The slow spin is pure CSS (see `.rosette-spin` in the
 * inline <style>) and is disabled under prefers-reduced-motion.
 */
export function ProjectRosette({
  photos = [],
  title,
}: {
  photos?: string[];
  title: string;
}) {
  // 9 petals, every 40deg around the ring.
  const petals = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      className="relative mx-auto aspect-square w-[320px] sm:w-[460px] lg:w-[560px]"
      aria-hidden="true"
    >
      {/* Pink radial glow behind the ring */}
      <Image
        src="/figma/project/rosette-glow.svg"
        alt=""
        fill
        sizes="560px"
        className="select-none object-contain"
      />

      {/* Petal ring */}
      <div className="rosette-spin absolute inset-0">
        {petals.map((i) => {
          const photo = photos[i % Math.max(photos.length, 1)];
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${i * 40}deg) translateY(-150px)`,
              }}
            >
              <div
                className={clsx(
                  "relative h-[80px] w-[64px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] sm:h-[100px] sm:w-[80px]",
                  !photo && "bg-[#d9d9d9]",
                )}
                style={{
                  transform: `rotate(${-i * 40}deg)`,
                }}
              >
                {photo ? (
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <span className="sr-only">{title}</span>

      <style>{`
        .rosette-spin {
          animation: rosette-rotate 48s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes rosette-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rosette-spin { animation: none; }
        }
      `}</style>
    </div>
  );
}
