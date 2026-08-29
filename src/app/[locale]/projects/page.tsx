import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { getChapterDetail, heroes, chapters, getMentionsByChapter } from "@/content";
import {
  HERO_MANIFEST,
  MENTION_MANIFEST,
  encodeAsset,
} from "@/content/photo-manifest";
import { carryOn } from "@/content/about";
import { SiteNav } from "@/components/site/SiteNav";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProjectChapterGrid } from "@/components/site/ProjectChapterGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CARRYON_ASSET_BASE = "shared/carry-on";
const carryOnAsset = (file: string) =>
  encodeAsset(`${CARRYON_ASSET_BASE}/${file}`)!;

const CARRYON_ITEMS = [
  {
    src: carryOnAsset("camara.svg"),
    width: 2263,
    height: 1366,
    className:
      "left-[6%] top-[11%] w-[31%] sm:left-[9%] sm:top-[22%] sm:w-[9.5%]",
    sizes: "(min-width: 640px) 10vw, 31vw",
  },
  {
    src: carryOnAsset("1Object.svg"),
    width: 848,
    height: 1194,
    className:
      "left-[56%] top-[6%] w-[14%] sm:left-[30%] sm:top-[6%] sm:w-[5.5%]",
    sizes: "(min-width: 640px) 6vw, 14vw",
  },
  {
    src: carryOnAsset("oveja.svg"),
    width: 953,
    height: 772,
    className:
      "right-[8%] top-[19%] w-[26%] sm:right-[27%] sm:top-[15%] sm:w-[9%]",
    sizes: "(min-width: 640px) 9vw, 26vw",
  },
  {
    src: carryOnAsset("nube.svg"),
    width: 4660,
    height: 4660,
    className:
      "right-[7%] top-[6%] w-[27%] sm:right-[5%] sm:top-[14%] sm:w-[10%]",
    sizes: "(min-width: 640px) 10vw, 27vw",
  },
  {
    src: carryOnAsset("laptop.svg"),
    width: 2577,
    height: 1793,
    className:
      "left-[3%] top-[54%] w-[32%] sm:left-[6%] sm:top-[51%] sm:w-[10%]",
    sizes: "(min-width: 640px) 10vw, 32vw",
  },
  {
    src: carryOnAsset("loto.svg"),
    width: 2916,
    height: 2916,
    className:
      "left-[10%] top-[35%] w-[30%] sm:left-[20%] sm:top-[39%] sm:w-[9%]",
    sizes: "(min-width: 640px) 9vw, 30vw",
  },
  {
    src: carryOnAsset("disco.svg"),
    width: 2131,
    height: 2557,
    className:
      "left-[20%] top-[75%] w-[21%] sm:left-[18%] sm:top-[67%] sm:w-[6.5%]",
    sizes: "(min-width: 640px) 7vw, 21vw",
  },
  {
    src: carryOnAsset("plane.svg"),
    width: 3308,
    height: 2203,
    className:
      "left-[47%] top-[80%] w-[38%] sm:left-[27%] sm:top-[74%] sm:w-[13%]",
    sizes: "(min-width: 640px) 13vw, 38vw",
  },
  {
    src: carryOnAsset("dados.svg"),
    width: 1552,
    height: 2002,
    className:
      "right-[4%] top-[43%] w-[22%] sm:right-[15%] sm:top-[37%] sm:w-[7%]",
    sizes: "(min-width: 640px) 7vw, 22vw",
  },
  {
    src: carryOnAsset("audifonos.svg"),
    width: 2371,
    height: 2623,
    className:
      "right-[5%] top-[77%] w-[25%] sm:right-[6%] sm:top-[66%] sm:w-[8%]",
    sizes: "(min-width: 640px) 8vw, 25vw",
  },
];

const CARRYON_BAG = {
  src: carryOnAsset("Bag.svg"),
  width: 1936,
  height: 3464,
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const es = locale === "es";

  const portfolioPile = [
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_2567.png")!,
      alt: "Portfolio photo collage",
      className: "left-[15%] top-[27%] z-20 h-[61%] w-[21%] -rotate-[9deg]",
      hoverClass:
        "delay-[20ms] group-hover:-translate-x-7 group-hover:-translate-y-24 group-hover:scale-[1.06] group-hover:-rotate-[17deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_2012.png")!,
      alt: "Portfolio photo collage",
      className: "left-[30%] top-[17%] z-20 h-[37%] w-[19%] rotate-[9deg]",
      hoverClass:
        "delay-[40ms] group-hover:-translate-x-4 group-hover:-translate-y-32 group-hover:scale-[1.06] group-hover:rotate-[16deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_9109_VSCO.png")!,
      alt: "Portfolio photo collage",
      className: "left-[43%] top-[30%] z-30 h-[22%] w-[14%] -rotate-[4deg]",
      hoverClass:
        "delay-[60ms] group-hover:translate-x-2 group-hover:-translate-y-24 group-hover:scale-[1.06] group-hover:rotate-[4deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_0742_VSCO.png")!,
      alt: "Portfolio photo collage",
      className: "left-[32%] top-[50%] z-20 h-[37%] w-[19%] rotate-[1deg]",
      hoverClass:
        "delay-[80ms] group-hover:-translate-x-16 group-hover:-translate-y-16 group-hover:scale-[1.06] group-hover:-rotate-[6deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_0621.png")!,
      alt: "Portfolio photo collage",
      className: "left-[45%] top-[46%] z-40 h-[41%] w-[20%] rotate-[10deg]",
      hoverClass:
        "delay-[100ms] group-hover:translate-x-14 group-hover:-translate-y-14 group-hover:scale-[1.06] group-hover:rotate-[17deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_2012.png")!,
      alt: "Portfolio photo collage",
      className: "left-[50%] top-[20%] z-30 h-[31%] w-[18%] -rotate-[10deg]",
      hoverClass:
        "delay-[120ms] group-hover:translate-x-4 group-hover:-translate-y-28 group-hover:scale-[1.06] group-hover:-rotate-[17deg]",
      accent: false,
    },
    {
      src: encodeAsset("pages/projects/hero-photos/IMG_2567.png")!,
      alt: "Portfolio photo collage",
      className: "left-[64%] top-[17%] z-30 h-[62%] w-[22%] rotate-[5deg]",
      hoverClass:
        "delay-[140ms] group-hover:translate-x-8 group-hover:-translate-y-32 group-hover:scale-[1.06] group-hover:rotate-[13deg]",
      accent: false,
    },
    {
      src: undefined,
      alt: "",
      className: "left-[61%] top-[54%] z-40 h-[36%] w-[15%] -rotate-[9deg]",
      hoverClass:
        "delay-[160ms] group-hover:translate-x-20 group-hover:-translate-y-16 group-hover:scale-[1.06] group-hover:-rotate-[16deg]",
      accent: true,
    },
  ];

  // Chapter cards are the top level of the portfolio. They lead to chapter
  // details, while individual case studies keep their existing /work URLs.
  const chapterCards = chapters.map((c) => {
    const detail = getChapterDetail(c.id)!;
    const hero = heroes.find((h) => h.chapter === c.id);
    const chapterMentions = getMentionsByChapter(c.id);
    const featured =
      chapterMentions.find((m) => MENTION_MANIFEST[m.id]?.cover) ??
      chapterMentions[0];
    const fallbackProjectImage = detail.projects.find((project) => project.image)?.image;
    const cover = encodeAsset(
      HERO_MANIFEST[hero?.slug ?? ""]?.cover ??
        MENTION_MANIFEST[featured?.id ?? ""]?.cover ??
        detail.cover ??
        fallbackProjectImage,
    );

    return {
      c,
      cover,
      href: `/chapters/${c.id}`,
      description: detail.intro[locale],
    };
  });

  const projectCategories = [
    { id: "chapters", label: es ? "Capítulos" : "Chapters" },
    { id: "design", label: es ? "Diseño gráfico" : "Graphic design" },
    { id: "ux-ui", label: "UX/UI" },
    { id: "events", label: es ? "Eventos" : "Events" },
    {
      id: "marketing-content",
      label: es ? "Marketing y contenido" : "Marketing & content",
    },
    { id: "strategy", label: es ? "Estrategia" : "Strategy" },
  ];

  return (
    <main>
      {/* ── Hero — custom portfolio photo pile ── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#cf9bac] via-[#e8c8d1] to-[#fffafa]">
        <SiteNav tone="dark" />
        <div className="relative mx-auto flex min-h-[690px] max-w-[1200px] flex-col items-center px-5 pb-10 pt-[128px] sm:min-h-[850px] sm:px-8 sm:pt-[142px]">
          <h1 className="relative z-10 flex items-baseline text-[#82143f]">
            <span className="font-display text-[clamp(4.3rem,13vw,10.5rem)] leading-[0.78] tracking-[-0.055em]">
              PORTA
            </span>
            <span className="-ml-[0.02em] font-serif text-[clamp(4.25rem,11.5vw,9rem)] italic leading-none tracking-[-0.08em]">
              folio
            </span>
          </h1>
          <div className="group relative -mt-3 aspect-[11/7] w-full max-w-[920px] sm:-mt-8">
            <div className="absolute inset-0">
              <div
                aria-hidden="true"
                data-projects-folder="back"
                className="pointer-events-none absolute bottom-[5%] left-1/2 z-0 h-[50%] w-[68%] -translate-x-1/2 rounded-b-[34px] rounded-t-[24px] border border-[#151315] bg-[#737373]/35"
              >
                <div
                  data-projects-folder="tab"
                  className="absolute -top-[15%] left-[9%] h-[18%] w-[34%] rounded-t-[20px] border border-b-0 border-[#151315] bg-[#737373]/35"
                />
              </div>
              {portfolioPile.map((photo) => (
                <figure
                  key={`${photo.src ?? "accent"}-${photo.className}`}
                  className={`absolute overflow-hidden rounded-[10px] border-[7px] border-white bg-white shadow-[0_12px_24px_rgba(47,30,40,0.28)] transition-transform duration-200 ease-in motion-reduce:transform-none motion-reduce:transition-none ${photo.className} ${photo.hoverClass}`}
                >
                  {photo.accent ? (
                    <div className="size-full bg-[#1fa463]" aria-hidden="true" />
                  ) : (
                    <Image
                      src={photo.src!}
                      alt={photo.alt}
                      fill
                      preload
                      sizes="(max-width: 640px) 24vw, 200px"
                      className="object-cover"
                    />
                  )}
                </figure>
              ))}
              <div className="pointer-events-none absolute bottom-[3%] left-1/2 z-10 h-[44%] w-[74%] -translate-x-1/2 perspective-[800px]">
                <div
                  aria-hidden="true"
                  data-projects-folder="flap"
                  className="absolute inset-0 origin-bottom transform-gpu rounded-b-[34px] rounded-t-[24px] border border-[#090809] bg-[#737373]/35 transition-transform duration-200 ease-in group-hover:rotate-x-[-14deg] motion-reduce:rotate-x-0 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
              <div className="absolute bottom-[4%] left-[7%] z-50 flex size-[92px] flex-col items-center justify-center rounded-full bg-white font-display text-[2.4rem] leading-[0.72] tracking-[-0.08em] text-[#124aa8] shadow-[0_9px_16px_rgba(40,30,34,0.28)] sm:size-[132px] sm:text-[3.75rem]">
                <span>20</span>
                <span>26</span>
              </div>
              <div className="absolute bottom-[3%] right-[2%] z-50 w-[min(45vw,340px)] rounded-[20px] bg-[#86143e] px-4 py-3 font-inter text-[0.7rem] leading-tight text-white shadow-lg sm:px-6 sm:py-5 sm:text-[1.15rem]">
                <p className="whitespace-nowrap">BOG → BIO → BER → ICN</p>
                <p className="mt-2 border-t border-white/60 pt-2">Vale Jimenez</p>
                <p className="mt-2 border-t border-white/60 pt-2">2021 - 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommunityStrip>
        {es
          ? "Diseño, producto y estrategia · 5 años entre Bilbao, Berlín, Bogotá y Seúl"
          : "Design, product and strategy · 5 years between Bilbao, Berlin, Bogotá and Seoul"}
      </CommunityStrip>

      {/* ── Chapters grid ── */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-inter text-ink2 text-center text-[32px] font-bold sm:text-[40px]">
            {es ? "Capítulos" : "Chapters"}
          </h2>
          <p className="font-inter text-muted mx-auto mt-3 max-w-[520px] text-center text-[16px]">
            {es
              ? "Cada capítulo es una fase: un país, un equipo, una forma de trabajar."
              : "Each chapter is a phase: a country, a team, a way of working."}
          </p>
          <ProjectChapterGrid
            categories={projectCategories}
            cards={chapterCards.map(({ c, cover, href, description }) => ({
              id: c.id,
              href,
              cover,
              title: c.title[locale],
              dateRange: c.dateRange,
              location: c.location[locale],
              description,
              projects: c.projects[locale],
            }))}
          />
        </div>
      </section>

      {/* ── What's in my carry-on? ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto h-[640px] w-full overflow-hidden sm:h-auto sm:min-h-[460px] sm:aspect-[2/1] lg:min-h-0">
          {CARRYON_ITEMS.map((item) => (
            <Image
              key={item.src}
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              className={`pointer-events-none absolute z-10 h-auto select-none object-contain ${item.className}`}
              sizes={item.sizes}
            />
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[34%] top-[63%] z-10 h-[30vw] max-h-[120px] w-[30vw] max-w-[120px] bg-[#1043d8] sm:right-[22.5%] sm:top-[60%] sm:h-[9.5vw] sm:max-h-none sm:w-[9.5vw] sm:max-w-none"
          >
            <span className="absolute top-[20%] left-[18%] h-[28%] w-[24%] rounded-full border-[3px] border-white/90 border-r-transparent border-b-transparent" />
            <span className="absolute top-[24%] right-[14%] h-[22%] w-[42%] rotate-[-18deg] rounded-full border-t-[4px] border-white/90" />
            <span className="absolute bottom-[27%] left-[18%] h-[24%] w-[23%] rounded-full border-[3px] border-white/90 border-r-transparent" />
            <span className="absolute right-[12%] bottom-[24%] h-[23%] w-[44%] rotate-[17deg] rounded-full border-t-[4px] border-white/90" />
          </div>

          <Image
            src={CARRYON_BAG.src}
            alt=""
            width={CARRYON_BAG.width}
            height={CARRYON_BAG.height}
            className="pointer-events-none absolute top-[49%] left-1/2 z-20 h-auto w-[42%] max-w-[250px] min-w-[205px] -translate-x-1/2 -translate-y-1/2 select-none object-contain sm:w-[13%] sm:min-w-[160px] sm:max-w-[300px]"
            sizes="(min-width: 640px) 13vw, 42vw"
          />

          <h2 className="font-heebo pointer-events-none absolute top-[49%] left-1/2 z-30 w-[82%] -translate-x-1/2 -translate-y-1/2 text-center text-[42px] leading-[0.98] font-black tracking-normal text-[#101713]/90 sm:w-[48%] sm:text-[48px] md:text-[58px] lg:text-[64px] xl:text-[72px] 2xl:text-[82px]">
            {es ? (
              <>
                <span className="block">¿Qué llevo</span>
                <span className="block">en mi maleta?</span>
              </>
            ) : (
              <>
                <span className="block">{"What's in my"}</span>
                <span className="block">carry-on?</span>
              </>
            )}
          </h2>

          <p className="sr-only">
            {es ? "Base" : "Based"}: {carryOn.based}.{" "}
            {es ? "Idiomas" : "Languages"}: {carryOn.languages}.{" "}
            {es ? "Roles" : "Roles"}: {carryOn.roles}.{" "}
            {es ? "Disponible" : "Available"}: {carryOn.available}.
          </p>
        </div>
      </section>

      <WorkTogether photo={encodeAsset("shared/portraits/Val.png")} />
      <SiteFooter />
    </main>
  );
}
