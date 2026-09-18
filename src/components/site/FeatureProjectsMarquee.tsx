import Image from "next/image";
import { listPhotos } from "@/lib/photos";

export type FeatureItem = { title: string; href: string; img: string };

/**
 * Auto-scrolling strip of brand logos.
 * Uses the global `.marquee-track` animation; duplicates the list for a
 * seamless loop and pauses on hover.
 */
export function FeatureProjectsMarquee({
  label,
  durationSeconds = 55,
}: {
  items: FeatureItem[];
  label: string;
  durationSeconds?: number;
}) {
  const logos = listPhotos("shared/brands");
  if (logos.length === 0) return null;

  const strip = [...logos, ...logos];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto mb-7 max-w-[1460px] px-6 sm:px-8">
        <h2 className="font-inter text-[34px] leading-none font-bold text-[#2a2a2a] sm:text-[48px]">
          {label}
        </h2>
      </div>

      <div
        className="marquee-pause relative overflow-hidden"
        style={
          {
            ["--marquee-duration" as string]: `${durationSeconds}s`,
            maskImage:
              "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
          } as React.CSSProperties
        }
      >
        <ul
          className="marquee-track flex w-max items-stretch gap-[22px] will-change-transform"
          aria-hidden="true"
        >
          {strip.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="shrink-0"
              aria-hidden={i >= logos.length}
            >
              <div className="relative h-[172px] w-[210px] overflow-hidden rounded-[12px] bg-[#f3f2ee] sm:h-[192px] sm:w-[234px]">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 210px, 234px"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
