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
      <div className="mx-auto mb-8 max-w-[1040px] px-6 sm:px-8">
        <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.16em] text-green-soft">
          {label}
        </p>
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
        <ul className="marquee-track flex w-max items-stretch gap-4 will-change-transform">
          {strip.map((p, i) => (
            <li key={`${p.href}-${i}`} className="shrink-0" aria-hidden={i >= items.length}>
              <Link href={p.href} className="group block">
                <div className="relative h-[200px] w-[290px] overflow-hidden rounded-[14px] bg-[#f3f2ee] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="290px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 font-inter text-[13px] font-semibold text-white">
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
