import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { getChapterDetail } from "@/content";
import {
  FILTER_IDS,
  FILTER_LABELS,
  getChapterCardCover,
  getProjectCover,
  getProjectsByFilter,
  portfolioChapters,
} from "@/content/portfolio";
import { encodeAsset } from "@/content/photo-manifest";
import { carryOn } from "@/content/about";
import { SiteNav } from "@/components/site/SiteNav";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import { TouchReveal } from "@/components/site/TouchReveal";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProjectChapterGrid } from "@/components/site/ProjectChapterGrid";
import {
  FolderBack,
  FolderFront,
  WineCardBackground,
} from "@/components/site/ProjectsFolderArt";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CARRYON_ASSET_BASE = "compartido/maleta";
const carryOnAsset = (file: string) =>
  encodeAsset(`${CARRYON_ASSET_BASE}/${file}`)!;

const CARRYON_ITEMS = [
  {
    src: carryOnAsset("camara.svg"),
    alt: { es: "Cámara", en: "Camera" },
    label: { es: "visión artística", en: "artistic vision" },
    width: 2263,
    height: 1366,
    className:
      "left-[3%] top-[9%] w-[22%] sm:left-[9%] sm:top-[22%] sm:w-[9.5%]",
    sizes: "(min-width: 640px) 10vw, 31vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("duck-figma.png"),
    alt: { es: "Pato", en: "Duck" },
    label: { es: "evolución", en: "evolution" },
    width: 207,
    height: 354,
    className:
      "left-[50%] top-[3%] w-[9%] sm:left-[30%] sm:top-[6%] sm:w-[5.5%]",
    sizes: "(min-width: 640px) 6vw, 14vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("oveja.svg"),
    alt: { es: "Oveja con café", en: "Sheep with coffee" },
    label: { es: "café mañanero", en: "morning coffee" },
    width: 953,
    height: 772,
    className:
      "right-[4%] top-[24%] w-[18%] sm:right-[27%] sm:top-[15%] sm:w-[9%]",
    sizes: "(min-width: 640px) 9vw, 26vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("nube.svg"),
    alt: { es: "Nube", en: "Cloud" },
    label: { es: "creatividad", en: "creativity" },
    width: 4660,
    height: 4660,
    className:
      "right-[5%] top-[5%] w-[19%] sm:right-[5%] sm:top-[14%] sm:w-[10%]",
    sizes: "(min-width: 640px) 10vw, 27vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("laptop.svg"),
    alt: { es: "Portátil", en: "Laptop" },
    label: { es: "diseño de interfaces", en: "interface design" },
    width: 2577,
    height: 1793,
    className:
      "left-[3%] top-[54%] w-[22%] sm:left-[6%] sm:top-[51%] sm:w-[10%]",
    sizes: "(min-width: 640px) 10vw, 32vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("loto.svg"),
    alt: { es: "Flor de loto", en: "Lotus flower" },
    label: { es: "pensamiento holístico", en: "holistic thinking" },
    width: 2916,
    height: 2916,
    className:
      "left-[6%] top-[31%] w-[19%] sm:left-[20%] sm:top-[39%] sm:w-[9%]",
    sizes: "(min-width: 640px) 9vw, 30vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("disco.svg"),
    alt: { es: "Bola de disco", en: "Disco ball" },
    label: { es: "diversión", en: "fun" },
    width: 2131,
    height: 2557,
    className:
      "left-[7%] top-[79%] w-[13%] sm:left-[18%] sm:top-[67%] sm:w-[6.5%]",
    sizes: "(min-width: 640px) 7vw, 21vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("plane.svg"),
    alt: { es: "Avión", en: "Plane" },
    label: { es: "visión internacional", en: "international vision" },
    width: 3308,
    height: 2203,
    className:
      "left-[26%] top-[83%] w-[26%] sm:left-[27%] sm:top-[74%] sm:w-[13%]",
    sizes: "(min-width: 640px) 13vw, 38vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("dados.svg"),
    alt: { es: "Dados", en: "Dice" },
    label: { es: "estrategia", en: "strategy" },
    width: 1552,
    height: 2002,
    className:
      "right-[5%] top-[45%] w-[15%] sm:right-[15%] sm:top-[37%] sm:w-[7%]",
    sizes: "(min-width: 640px) 7vw, 22vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("paint-figma.png"),
    alt: { es: "Foto", en: "Photo" },
    label: { es: "fuerza", en: "strength" },
    width: 338,
    height: 459,
    className:
      "left-[57%] top-[84%] w-[17%] sm:right-[22.5%] sm:top-[60%] sm:w-[9.5%]",
    sizes: "(min-width: 640px) 10vw, 30vw",
    labelClassName: "top-full mt-2",
  },
  {
    src: carryOnAsset("audifonos.svg"),
    alt: { es: "Audífonos", en: "Headphones" },
    label: { es: "buena música", en: "good music" },
    width: 2371,
    height: 2623,
    className:
      "right-[3%] top-[67%] w-[17%] sm:right-[6%] sm:top-[66%] sm:w-[8%]",
    sizes: "(min-width: 640px) 8vw, 25vw",
    labelClassName: "top-full mt-2",
  },
];

const CARRYON_BAG = {
  src: carryOnAsset("Bag.svg"),
  width: 1936,
  height: 3464,
};

const chaptersTravelPhotos = [
  {
    src: encodeAsset("portafolio/viajando-por-el-mundo/chapters-travel-1.jpeg")!,
    className:
      "left-[11.5%] top-[21.5%] z-10 h-[52.1%] w-[37.5%] -rotate-[18.79deg]",
    hoverClass:
      "group-hover:-translate-x-14 group-data-[reveal=on]/reveal:-translate-x-14 group-hover:scale-[1.14] group-data-[reveal=on]/reveal:scale-[1.14] group-hover:-rotate-[24deg] group-data-[reveal=on]/reveal:-rotate-[24deg]",
  },
  {
    src: encodeAsset("portafolio/viajando-por-el-mundo/chapters-travel-2.jpeg")!,
    className:
      "left-[35.3%] top-[21.5%] z-20 h-[52.1%] w-[37.5%] -rotate-[1.88deg]",
    hoverClass:
      "delay-[40ms] group-hover:scale-[1.2] group-data-[reveal=on]/reveal:scale-[1.2] group-hover:rotate-[1deg] group-data-[reveal=on]/reveal:rotate-[1deg]",
  },
  {
    src: encodeAsset("portafolio/viajando-por-el-mundo/chapters-travel-3.jpeg")!,
    className:
      "left-[60%] top-[27.3%] z-30 h-[52.1%] w-[28.5%] rotate-[9.42deg]",
    hoverClass:
      "delay-[80ms] group-hover:translate-x-14 group-data-[reveal=on]/reveal:translate-x-14 group-hover:scale-[1.14] group-data-[reveal=on]/reveal:scale-[1.14] group-hover:rotate-[15deg] group-data-[reveal=on]/reveal:rotate-[15deg]",
  },
];

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

  // Photos tucked inside the folder: they start mostly hidden behind the front
  // panel and rise out of it on hover. `w`/`h` are the files' own pixel size so
  // each keeps its aspect ratio (the white frames are part of the images).
  const portfolioPile = [
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-tote.png")!,
      alt: "Tote bags \"She connects. She innovates. She inspires.\"",
      w: 303, h: 383,
      className: "left-[35.66%] top-[24.9%] z-[10] w-[15.5%] rotate-[10deg]",
      hoverClass:
        "delay-[0ms] group-hover:-translate-x-[67%] group-data-[reveal=on]/reveal:-translate-x-[67%] group-hover:-translate-y-[39%] group-data-[reveal=on]/reveal:-translate-y-[39%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:rotate-[5deg] group-data-[reveal=on]/reveal:rotate-[5deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-team.png")!,
      alt: es ? "Taller de identidad de equipo" : "Team identity workshop",
      w: 338, h: 631,
      className: "left-[22.94%] top-[32%] z-[12] w-[18%] -rotate-[8deg]",
      hoverClass:
        "delay-[60ms] group-hover:-translate-x-[100%] group-data-[reveal=on]/reveal:-translate-x-[100%] group-hover:-translate-y-[34%] group-data-[reveal=on]/reveal:-translate-y-[34%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:-rotate-[10deg] group-data-[reveal=on]/reveal:-rotate-[10deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-nobled.png")!,
      alt: "Nobled Specialty Coffee",
      w: 332, h: 430,
      className: "left-[46.14%] top-[48.2%] z-[15] w-[17.5%] rotate-[11deg]",
      hoverClass:
        "delay-[150ms] group-hover:-translate-x-[148%] group-data-[reveal=on]/reveal:-translate-x-[148%] group-hover:-translate-y-[48%] group-data-[reveal=on]/reveal:-translate-y-[48%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:rotate-[8deg] group-data-[reveal=on]/reveal:rotate-[8deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-superalink.png")!,
      alt: "Superalink × NomadHer",
      w: 288, h: 324,
      className: "left-[50.15%] top-[26.7%] z-[11] w-[15%] -rotate-[9deg]",
      hoverClass:
        "delay-[30ms] group-hover:-translate-x-[38%] group-data-[reveal=on]/reveal:-translate-x-[38%] group-hover:-translate-y-[40%] group-data-[reveal=on]/reveal:-translate-y-[40%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:-rotate-[9deg] group-data-[reveal=on]/reveal:-rotate-[9deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-brujula.png")!,
      alt: "Brújula Ética",
      w: 354, h: 646,
      className: "left-[60.86%] top-[24.3%] z-[16] w-[19.5%] rotate-[6deg]",
      hoverClass:
        "delay-[180ms] group-hover:translate-x-[74%] group-data-[reveal=on]/reveal:translate-x-[74%] group-hover:-translate-y-[20%] group-data-[reveal=on]/reveal:-translate-y-[20%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:rotate-[6deg] group-data-[reveal=on]/reveal:rotate-[6deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-card.png")!,
      alt: es ? "Tarjeta \"Cómo hablarle a mi cliente\"" : "\"How to talk to my customer\" card",
      w: 303, h: 379,
      className: "left-[40.45%] top-[52.9%] z-[14] w-[14%] -rotate-[1deg]",
      hoverClass:
        "delay-[120ms] group-hover:translate-x-[90%] group-data-[reveal=on]/reveal:translate-x-[90%] group-hover:-translate-y-[72%] group-data-[reveal=on]/reveal:-translate-y-[72%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:rotate-[3deg] group-data-[reveal=on]/reveal:rotate-[3deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-mic.png")!,
      alt: es ? "Participante con micrófono" : "Attendee with a microphone",
      w: 243, h: 371,
      className: "left-[57.92%] top-[55.9%] z-[17] w-[14.5%] -rotate-[6deg]",
      hoverClass:
        "delay-[210ms] group-hover:translate-x-[75%] group-data-[reveal=on]/reveal:translate-x-[75%] group-hover:-translate-y-[60%] group-data-[reveal=on]/reveal:-translate-y-[60%] group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:-rotate-[8deg] group-data-[reveal=on]/reveal:-rotate-[8deg]",
    },
    {
      src: encodeAsset("portafolio/portada-carpeta/folder-people.png")!,
      alt: es ? "Asistentes a un evento" : "Event attendees",
      w: 234, h: 233,
      className: "left-[44.13%] top-[34.8%] z-[13] w-[12.5%] -rotate-[3deg]",
      hoverClass:
        "delay-[90ms] group-hover:-translate-x-[51%] group-data-[reveal=on]/reveal:-translate-x-[51%] group-hover:translate-y-0 group-data-[reveal=on]/reveal:translate-y-0 group-hover:scale-[1.05] group-data-[reveal=on]/reveal:scale-[1.05] group-hover:-rotate-[6deg] group-data-[reveal=on]/reveal:-rotate-[6deg]",
    },
  ];

  // Chapter cards are the top level of the portfolio. They lead to chapter
  // pages; every project has its own page under /work/<slug>.
  const chapterCards = portfolioChapters.map((chapter) => {
    // Same photo as the chapter page: public/portafolio/capitulos/<chapter>/portada/
    const cover = getChapterCardCover(chapter.id);

    return {
      id: chapter.id,
      href: `/chapters/${chapter.id}`,
      cover,
      title: chapter[locale].card.title,
      meta: chapter[locale].card.meta,
      description: chapter[locale].card.description,
      tags: chapter[locale].card.tags,
    };
  });

  const accentOf = (chapterId: string) =>
    getChapterDetail(chapterId)?.accent ?? "#c9d6cd";

  // Filtered views list projects (not chapters), in the order set in the copy.
  const projectsByCategory = Object.fromEntries(
    FILTER_IDS.map((filter) => [
      filter,
      getProjectsByFilter(filter, locale).map((project) => ({
        key: project.slug,
        href: `/work/${project.slug}`,
        image: getProjectCover(project.slug),
        number: project.number,
        accent: accentOf(project.chapter),
        meta: project.t.card.meta,
        title: project.t.card.title,
        description: project.t.card.description,
      })),
    ]),
  );

  const projectCategories = [
    { id: "chapters", label: es ? "Capítulos" : "Chapters" },
    ...FILTER_IDS.map((id) => ({ id, label: FILTER_LABELS[id][locale] })),
  ];

  return (
    <main>
      {/* ── Hero — custom portfolio photo pile ── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#cf9bac] via-[#e8c8d1] to-[#fffafa]">
        <SiteNav tone="dark" />
        <div className="relative mx-auto flex min-h-[470px] max-w-[1200px] flex-col items-center px-5 pb-12 pt-[128px] sm:min-h-[920px] sm:px-8 sm:pb-20 sm:pt-[142px]">
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
              <FolderBack className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[62%] -translate-x-1/2" />
              {portfolioPile.map((photo) => (
                <div
                  key={photo.src}
                  className={`absolute drop-shadow-[0_8px_14px_rgba(47,30,40,0.28)] transition-transform duration-200 ease-in motion-reduce:transform-none motion-reduce:transition-none ${photo.className} ${photo.hoverClass}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    preload
                    sizes="(max-width: 640px) 60vw, 240px"
                    className="h-auto w-full"
                  />
                </div>
              ))}
              <FolderFront className="pointer-events-none absolute bottom-0 left-1/2 z-[45] aspect-[603/409] w-[62%] -translate-x-1/2" />
              <div className="absolute bottom-[4%] left-[4%] z-50 flex size-[64px] flex-col items-center justify-center rounded-full bg-white font-display text-[1.6rem] leading-[0.72] tracking-[-0.08em] text-[#124aa8] shadow-[0_9px_16px_rgba(40,30,34,0.28)] sm:left-[7%] sm:size-[132px] sm:text-[3.75rem]">
                <span>20</span>
                <span>26</span>
              </div>
              <div
                data-projects-folder="meta"
                className="absolute bottom-[3%] right-[2%] z-50 aspect-[245/131] w-[160px] rotate-[2deg] drop-shadow-lg sm:w-[330px]"
              >
                <WineCardBackground className="absolute inset-0 size-full" />
                <div className="relative flex h-full flex-col justify-center px-[7%] pt-[9%] font-inter text-[0.54rem] leading-tight text-white sm:text-[1.1rem]">
                  <p className="whitespace-nowrap">BOG → BIO → BER → ICN</p>
                  <p className="mt-[3%] border-t border-white/60 pt-[3%]">Vale Jimenez</p>
                  <p className="mt-[3%] border-t border-white/60 pt-[3%]">2021 - 2026</p>
                </div>
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
          <TouchReveal
            aria-hidden="true"
            data-projects-chapters="travel-collage"
            threshold={0.7}
            className="group group/reveal relative mx-auto mb-6 aspect-[320/340] w-full max-w-[320px] sm:mb-8"
          >
            <p className="absolute inset-x-0 top-0 text-center font-inter text-[15px] text-[#6e726e]">
              Viajando por el mundo
            </p>
            <p className="absolute inset-x-0 top-[7.65%] text-center font-inter text-[15px] font-medium text-[#5b9bd5]">
              @valejimenez.cm
            </p>
            {/* Photos + stickers keep their original 320×288 frame, anchored to the
                bottom, so the header text above has clear space when photos grow. */}
            <div className="absolute inset-x-0 bottom-0 aspect-[320/288]">
              {chaptersTravelPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className={`absolute overflow-hidden rounded-[8px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition-[translate,rotate,scale] duration-300 ease-out motion-reduce:transition-none ${photo.className} ${photo.hoverClass}`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 80vw, 120px"
                    className="object-cover"
                  />
                </div>
              ))}
              <span className="absolute left-0 top-[71.2%] z-40 rounded-[4px] bg-white px-2 py-1 font-inter text-[11px] font-bold leading-none text-[#111] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                I ♥ DESIGN
              </span>
              <span className="absolute left-1/2 top-[58%] z-40 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-white px-2 py-1 font-inter text-[11px] font-bold leading-none text-[#111] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                ENJOYING THE PROCESS
              </span>
              <span className="absolute left-[62%] top-[74.5%] z-40 rounded-[4px] bg-white px-2 py-1 font-inter text-[11px] font-bold leading-none text-[#111] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                🎨
              </span>
              <span className="absolute left-[77%] top-[28%] z-40 rounded-[4px] bg-white px-2 py-1 font-inter text-[11px] font-bold leading-none text-[#111] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                🌸
              </span>
            </div>
          </TouchReveal>
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
            locale={locale}
            cards={chapterCards}
            projectsByCategory={projectsByCategory}
          />
        </div>
      </section>

      {/* ── What's in my carry-on? ── */}
      <section className="relative overflow-hidden bg-white">
        <TouchReveal threshold={0.2} className="group/reveal relative mx-auto h-[700px] w-full overflow-hidden sm:h-auto sm:min-h-[460px] sm:aspect-[2/1] lg:min-h-0">
          {CARRYON_ITEMS.map((item, index) => (
            <div
              key={item.src}
              tabIndex={0}
              role="img"
              aria-label={`${item.alt[locale]}: ${item.label[locale]}`}
              className={`group absolute z-10 focus-visible:z-40 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c211e] hover:z-40 ${item.className}`}
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                className="pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[4deg] group-hover:scale-[1.06] group-data-[reveal=on]/reveal:-translate-y-2 group-data-[reveal=on]/reveal:rotate-[4deg] group-data-[reveal=on]/reveal:scale-[1.06] group-focus-visible:-translate-y-2 group-focus-visible:rotate-[4deg] group-focus-visible:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
                sizes={item.sizes}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 w-[96px] -translate-x-1/2 text-center font-inter text-[11px] leading-tight font-medium text-[#1c211e] opacity-0 sm:w-auto sm:whitespace-nowrap transition-opacity duration-200 group-hover:opacity-70 group-focus-visible:opacity-70 group-data-[reveal=on]/reveal:opacity-70 sm:text-[14px] ${item.labelClassName}`}
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {item.label[locale]}
              </span>
            </div>
          ))}

          <Image
            src={CARRYON_BAG.src}
            alt=""
            width={CARRYON_BAG.width}
            height={CARRYON_BAG.height}
            className="pointer-events-none absolute top-[49%] left-1/2 z-20 h-auto w-[36%] max-w-[210px] min-w-[170px] -translate-x-1/2 -translate-y-1/2 select-none object-contain sm:w-[13%] sm:min-w-[160px] sm:max-w-[300px]"
            sizes="(min-width: 640px) 13vw, 42vw"
          />

          <h2 className="font-quinn pointer-events-none absolute top-[49%] left-1/2 z-30 w-[82%] -translate-x-1/2 -translate-y-1/2 text-center text-[34px] leading-[0.98] font-bold tracking-normal text-[#101713]/90 sm:w-[48%] sm:text-[48px] md:text-[58px] lg:text-[64px] xl:text-[72px] 2xl:text-[82px]">
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
        </TouchReveal>
      </section>

      <WorkTogether />
      <SiteFooter />
    </main>
  );
}
