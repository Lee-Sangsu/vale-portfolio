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
  /** vertical nudge for the scattered look on lg+ */
  offset: string;
  /** label background color */
  label: string;
  /** label text color */
  labelText: string;
};

// styles keyed by hero index (order: GYS, Misiones, Sejong, JAL, NomadHer app)
const STYLES: CardStyle[] = [
  { height: "lg:h-[229px]", offset: "lg:mt-10", label: "#ff3da0", labelText: "#ffffff" },
  { height: "lg:h-[287px]", offset: "lg:mt-0", label: "#111111", labelText: "#ffffff" },
  { height: "lg:h-[263px]", offset: "lg:mt-12", label: "#1f4a37", labelText: "#ffffff" },
  { height: "lg:h-[238px]", offset: "lg:mt-4", label: "#7a1f3d", labelText: "#ffffff" },
  { height: "lg:h-[277px]", offset: "lg:mt-14", label: "#e516b0", labelText: "#ffffff" },
];

export function SneakPeek({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center font-inter text-[28px] font-semibold text-ink2 sm:text-[34px]">
          {es ? "Un vistazo a mi trabajo" : "Sneak peek of my works"}
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-5 lg:flex-nowrap lg:items-start">
          {heroes.map((hero, i) => {
            const style = STYLES[i % STYLES.length];
            const cover = encodeAsset(HERO_MANIFEST[hero.slug]?.cover);
            return (
              <Link
                key={hero.slug}
                href={`/work/${hero.slug}`}
                className={`group flex w-[46%] flex-col sm:w-[230px] ${style.offset}`}
              >
                <div
                  className={`relative h-[220px] w-full overflow-hidden rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.12)] ${style.height}`}
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt={hero.title[locale]}
                      fill
                      sizes="(min-width: 1024px) 230px, 46vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span
                    className="absolute left-3 top-3 rounded-[7px] px-2 py-[3px] font-inter text-[11px] font-semibold"
                    style={{ backgroundColor: style.label, color: style.labelText }}
                  >
                    {hero.brand}
                  </span>
                </div>
                <p className="mt-3 font-inter text-[15px] font-medium leading-snug text-ink2 transition-colors group-hover:text-green">
                  {hero.title[locale]}
                </p>
                <p className="font-inter text-[12px] text-muted">{hero.date[locale]}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
