import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { heroes } from "@/content";
import { HERO_MANIFEST, encodeAsset } from "@/content/photo-manifest";

/**
 * "Sneak peek of my works" — a scattered, varied-height editorial row of
 * real project cards. Each card pulls its cover + title from the hero
 * content and links to /work/<slug>. Colored labels echo each project's
 * accent rather than the NomadHer placeholder copy.
 */
type CardStyle = {
  /** card height on lg+ */
  height: string;
  /** label background color */
  label: string;
  /** label text color */
  labelText: string;
};

// styles keyed by hero index (order: GYS, Misiones, Sejong, JAL, NomadHer app)
const STYLES: CardStyle[] = [
  {
    height: "lg:h-[229px]",
    label: "#ff3da0",
    labelText: "#ffffff",
  },
  {
    height: "lg:h-[287px]",
    label: "#111111",
    labelText: "#ffffff",
  },
  {
    height: "lg:h-[263px]",
    label: "#1f4a37",
    labelText: "#ffffff",
  },
  {
    height: "lg:h-[238px]",
    label: "#7a1f3d",
    labelText: "#ffffff",
  },
  {
    height: "lg:h-[277px]",
    label: "#e516b0",
    labelText: "#ffffff",
  },
];

export function SneakPeek({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-inter text-ink2 text-center text-[28px] font-semibold sm:text-[34px]">
          {es ? "Un vistazo a mi trabajo" : "Sneak peek of my works"}
        </h2>

        <div className="mt-14 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {heroes.map((hero, i) => {
            const style = STYLES[i % STYLES.length];
            const cover = encodeAsset(HERO_MANIFEST[hero.slug]?.cover);
            return (
              <Link
                key={hero.slug}
                href={`/work/${hero.slug}`}
                className="group flex w-[72vw] max-w-[230px] shrink-0 snap-center flex-col sm:w-[230px] lg:snap-start"
              >
                <div
                  className={`relative h-[220px] w-full overflow-hidden rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.12)] ${style.height}`}
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt={hero.title[locale]}
                      fill
                      sizes="(min-width: 1024px) 230px, 72vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span
                    className="font-inter absolute top-3 left-3 rounded-[7px] px-2 py-[3px] text-[11px] font-semibold"
                    style={{
                      backgroundColor: style.label,
                      color: style.labelText,
                    }}
                  >
                    {hero.brand}
                  </span>
                </div>
                <p className="font-inter text-ink2 group-hover:text-green mt-3 min-h-[40px] text-[15px] leading-snug font-medium transition-colors">
                  {hero.title[locale]}
                </p>
                <p className="font-inter text-muted text-[12px]">
                  {hero.date[locale]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
