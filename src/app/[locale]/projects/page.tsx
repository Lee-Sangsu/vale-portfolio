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

const CARRYON_ITEMS = [
  { emoji: "📷", es: "cámara", en: "camera" },
  { emoji: "🧳", es: "maleta", en: "carry-on" },
  { emoji: "✈️", es: "vuelo", en: "flight" },
  { emoji: "🎧", es: "playlist", en: "playlist" },
  { emoji: "💻", es: "figma", en: "figma" },
  { emoji: "📓", es: "notas", en: "notes" },
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
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative overflow-hidden bg-white px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="pointer-events-none mb-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {CARRYON_ITEMS.map((it, i) => (
              <span
                key={it.emoji}
                className="flex flex-col items-center gap-1"
                style={{ transform: `rotate(${[-8, 6, -4, 7, -6, 4][i]}deg)` }}
              >
                <span className="text-[34px] sm:text-[44px]">{it.emoji}</span>
                <span className="font-inter text-muted text-[11px]">
                  {es ? it.es : it.en}
                </span>
              </span>
            ))}
          </div>
          <h2 className="font-heebo text-ink2 text-[32px] font-bold sm:text-[44px]">
            {es ? "¿Qué llevo en mi maleta?" : "What's in my carry-on?"}
          </h2>
          <div className="font-inter text-muted mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px]">
            <span>
              <b className="text-ink2">{es ? "Base" : "Based"}:</b>{" "}
              {carryOn.based}
            </span>
            <span>
              <b className="text-ink2">{es ? "Idiomas" : "Languages"}:</b>{" "}
              {carryOn.languages}
            </span>
            <span>
              <b className="text-ink2">{es ? "Roles" : "Roles"}:</b>{" "}
              {carryOn.roles}
            </span>
            <span>
              <b className="text-ink2">{es ? "Disponible" : "Available"}:</b>{" "}
              {carryOn.available}
            </span>
          </div>
        </div>
      </section>

      <WorkTogether photo={encodeAsset("photos/about/Val.png")} />
      <SiteFooter />
    </main>
  );
}
