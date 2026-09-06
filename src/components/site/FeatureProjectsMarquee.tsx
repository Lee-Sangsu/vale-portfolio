import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type FeatureItem = { title: string; href: string; img: string };

/**
 * Auto-scrolling strip of featured projects (replaces the old photo strip).
 * Uses the global `.marquee-track` animation; duplicates the list for a
 * seamless loop and pauses on hover.
 */
export function FeatureProjectsMarquee({
  items,
  label,
  durationSeconds = 55,
}: {
  items: FeatureItem[];
  label: string;
  durationSeconds?: number;
}) {
  const strip = [...items, ...items];

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
        <ul className="marquee-track flex w-max items-stretch gap-[22px] will-change-transform">
          {strip.map((p, i) => (
            <li
              key={`${p.href}-${i}`}
              className="shrink-0"
              aria-hidden={i >= items.length}
            >
              <Link
                href={p.href}
                className="group block rounded-[12px] focus-visible:ring-2 focus-visible:ring-[#2a2a2a] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <div className="relative h-[172px] w-[210px] overflow-hidden rounded-[12px] bg-[#f3f2ee] sm:h-[192px] sm:w-[234px]">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 639px) 210px, 234px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="font-inter absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-3.5 pt-10 pb-3 text-[14px] leading-tight font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] sm:text-[16px]">
                    {p.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
