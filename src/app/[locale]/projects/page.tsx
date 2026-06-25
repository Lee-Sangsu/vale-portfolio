import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { heroes, chapters, getMentionsByChapter } from "@/content";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// gradient tops for chapters without a photo cover
const CHAPTER_TINT: Record<string, string> = {
  n9ne: "linear-gradient(135deg,#9AA3AD,#c7ced4)",
  "travelling-university": "linear-gradient(135deg,#8AC6E8,#cfe8f5)",
  independent: "linear-gradient(135deg,#244736,#3f7a5c)",
};

const CARRYON_ASSET_BASE = "Assets /Assets Icons cool";
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

  // chapter cards: cover from the chapter's hero; for chapters without a hero
  // (N9NE, Travelling University, Independent) fall back to the first mention
  // that has a cover photo so every card shows a real image, not a flat tint.
  const chapterCards = chapters.map((c) => {
    const hero = heroes.find((h) => h.chapter === c.id);
    if (hero) {
      return {
        c,
        cover: encodeAsset(HERO_MANIFEST[hero.slug]?.cover),
        href: `/work/${hero.slug}`,
      };
    }
    const chapterMentions = getMentionsByChapter(c.id);
    const featured =
      chapterMentions.find((m) => MENTION_MANIFEST[m.id]?.cover) ??
      chapterMentions[0];
    const cover = featured
      ? encodeAsset(MENTION_MANIFEST[featured.id]?.cover)
      : undefined;
    const href = featured ? `/work/${featured.id}` : "/projects";
    return { c, cover, href };
  });

  return (
    <main>
      {/* ── Hero — stored Figma pile, with a subtle hover lift/spread ── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef4f8] to-white">
        <SiteNav tone="dark" />
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 pt-[132px] pb-16 sm:pt-[154px] sm:pb-20">
          <h1 className="sr-only">{es ? "Trabajo" : "Work"}</h1>
          <div className="group relative w-full max-w-[920px] overflow-visible">
            <Image
              src="/figma/projects/hero-pile.png"
              alt=""
              width={701}
              height={507}
              className="mx-auto h-auto w-full max-w-[760px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] group-hover:-rotate-1 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0"
              preload
              sizes="(min-width: 1024px) 760px, 92vw"
            />
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
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {chapterCards.map(({ c, cover, href }) => (
              <li key={c.id}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#ececea] bg-[#faf9f6] shadow-[0_8px_22px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1"
                >
                  <div
                    className="relative h-[180px] w-full overflow-hidden"
                    style={{ background: CHAPTER_TINT[c.id] ?? "#eee" }}
                  >
                    {cover && (
                      <Image
                        src={cover}
                        alt={c.title[locale]}
                        fill
                        sizes="360px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="bg-green font-inter absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white">
                      {c.dateRange}
                    </span>
                    {c.starred && (
                      <span className="text-hero-lime absolute top-3 right-3 text-[18px] drop-shadow">
                        ★
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-inter text-ink2 text-[19px] font-bold">
                      {c.title[locale]}
                    </h3>
                    <p className="font-inter text-muted mt-1 text-[13px]">
                      {c.location[locale]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.projects[locale].slice(0, 3).map((p) => (
                        <span
                          key={p}
                          className="bg-ink2 font-inter rounded-full px-3 py-1 text-[11px] font-medium text-white"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fav projects ── */}
      <section className="bg-white px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="grid grid-cols-2 gap-4">
            {heroes.slice(0, 4).map((h) => {
              const cover = encodeAsset(HERO_MANIFEST[h.slug]?.cover);
              return (
                <div
                  key={h.slug}
                  className="relative aspect-square overflow-hidden rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt={h.title[locale]}
                      fill
                      sizes="240px"
                      className="object-cover object-center"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="font-heebo text-ink2 text-[34px] font-bold sm:text-[44px]">
              {es ? "Proyectos favoritos" : "Fav projects"}
            </h2>
            <ul className="mt-6 border-t border-[#e2e2dc]">
              {heroes.map((h) => (
                <li key={h.slug} className="border-b border-[#e2e2dc]">
                  <Link
                    href={`/work/${h.slug}`}
                    className="hover:text-green flex items-baseline justify-between gap-4 py-3 transition-colors"
                  >
                    <span className="font-inter text-ink2 text-[16px] font-semibold">
                      {h.title[locale]}
                    </span>
                    <span className="font-inter text-muted shrink-0 text-[12px]">
                      {h.brand}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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

      <WorkTogether photo={encodeAsset("photos/about/Val.png")} />
      <SiteFooter />
    </main>
  );
}
