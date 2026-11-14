import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProject, getProjectCover } from "@/content/portfolio";
import type { Locale } from "@/content/types";

/** Real projects shown in the strip, strongest first. Only those with a cover photo are used. */
const FEATURED_SLUGS = [
  "nomadher-app",
  "global-youth-summit",
  "jal-nomadher",
  "sejong-hackathon",
  "misiones-internacionales",
  "brujula-etica",
  "nobled-coffee",
  "seoul-women-entrepreneur-summit",
  "opuesto-sas",
];

/** Frame sizes (px, at desktop) cycled across the strip to keep the staggered Figma rhythm. */
const FRAMES = [
  { w: 288, h: 293 },
  { w: 286, h: 373 },
  { w: 259, h: 364 },
  { w: 227, h: 302 },
  { w: 339, h: 315 },
  { w: 236, h: 300 },
];

export function SneakPeek({ locale }: { locale: Locale }) {
  const es = locale === "es";

  const items = FEATURED_SLUGS.flatMap((slug, index) => {
    const project = getProject(slug, locale);
    const cover = getProjectCover(slug);
    if (!project || !cover) return [];
    return [
      {
        slug,
        cover,
        title: project.t.card.title,
        frame: FRAMES[index % FRAMES.length],
      },
    ];
  });

  if (items.length === 0) return null;

  // Duplicated once so the -50% translate loops seamlessly.
  const strip = [...items, ...items];

  return (
    <section className="overflow-hidden bg-white px-0 py-20 sm:py-24">
      <h2 className="font-inter text-ink2 px-5 text-center text-[28px] font-semibold sm:px-8 sm:text-[34px]">
        {es ? "Un adelanto de mi trabajo" : "Sneak peek of my work"}
      </h2>

      <div
        role="region"
        aria-label={es ? "Galería visual de trabajos" : "Visual work gallery"}
        className="relative mt-14 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)",
        }}
      >
        <ul
          className="marquee-track flex w-max items-end gap-[23px] pb-6 will-change-transform"
          style={{ ["--marquee-duration" as string]: "70s" }}
        >
          {strip.map((item, index) => {
            const duplicate = index >= items.length;
            return (
              <li
                key={`${item.slug}-${index}`}
                className="shrink-0"
                aria-hidden={duplicate || undefined}
              >
                <Link
                  href={`/work/${item.slug}`}
                  tabIndex={duplicate ? -1 : undefined}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6e726e]"
                >
                  <span
                    className="relative block overflow-hidden rounded-[5px] bg-[#ecece7] shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
                    style={{
                      width: `min(${item.frame.w}px, 72vw)`,
                      aspectRatio: `${item.frame.w} / ${item.frame.h}`,
                    }}
                  >
                    <Image
                      src={item.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 340px, 72vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="font-inter text-ink2 mt-3 block max-w-[260px] text-[14px] leading-snug font-medium transition-opacity group-hover:opacity-70">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
