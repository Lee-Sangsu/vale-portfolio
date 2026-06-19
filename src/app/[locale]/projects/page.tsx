import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { heroes, chapters, getMentionsByChapter } from "@/content";
import { HERO_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { carryOn } from "@/content/about";
import { SiteNav } from "@/components/site/SiteNav";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import { FolderSticker } from "@/components/site/FolderSticker";
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

  // chapter cards: cover from first hero in the chapter, link to first hero/mention
  const chapterCards = chapters.map((c) => {
    const hero = heroes.find((h) => h.chapter === c.id);
    const mention = getMentionsByChapter(c.id)[0];
    const cover = hero ? encodeAsset(HERO_MANIFEST[hero.slug]?.cover) : undefined;
    const href = hero ? `/work/${hero.slug}` : mention ? `/work/${mention.id}` : "/projects";
    return { c, cover, href };
  });

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative isolate min-h-[420px] overflow-hidden bg-gradient-to-b from-[#eef4f8] to-white sm:min-h-[480px]">
        <SiteNav tone="dark" />
        {/* floating folders */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-[14%] top-[42%]">
            <FolderSticker src="/figma/home/folder-1.png" label={es ? "Capítulos" : "Chapters"} color="#043c9f" textColor="#fff" rotate={-6} />
          </div>
          <div className="absolute right-[16%] top-[36%]">
            <FolderSticker src="/figma/home/folder-2.png" label={es ? "Proyectos" : "Projects"} color="#acd7e8" textColor="#000" rotate={5} />
          </div>
          <div className="absolute right-[30%] top-[58%] size-[64px] rounded-[12px] bg-blue shadow-[0_8px_18px_rgba(43,131,224,0.35)]" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-5 pt-[150px] pb-16 text-center sm:pt-[170px]">
          <span className="font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-green-soft">
            {es ? "El archivo" : "The archive"}
          </span>
          <h1 className="mt-3 font-heebo text-[44px] font-bold leading-none text-ink2 sm:text-[64px]">
            {es ? "Trabajo" : "Work"}
          </h1>
          <p className="mt-4 max-w-[520px] font-inter text-[16px] leading-[1.6] text-muted sm:text-[17px]">
            {es
              ? "Cinco capítulos, cinco proyectos hero y una docena de eventos. El portafolio leído como una historia."
              : "Five chapters, five hero projects and a dozen events. The portfolio read as a story."}
          </p>
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
          <h2 className="text-center font-inter text-[32px] font-bold text-ink2 sm:text-[40px]">
            {es ? "Capítulos" : "Chapters"}
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-center font-inter text-[16px] text-muted">
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
                  <div className="relative h-[180px] w-full overflow-hidden" style={{ background: CHAPTER_TINT[c.id] ?? "#eee" }}>
                    {cover && (
                      <Image src={cover} alt={c.title[locale]} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-green px-3 py-1 font-inter text-[11px] font-semibold text-white">
                      {c.dateRange}
                    </span>
                    {c.starred && (
                      <span className="absolute right-3 top-3 text-[18px] text-hero-lime drop-shadow">★</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-inter text-[19px] font-bold text-ink2">{c.title[locale]}</h3>
                    <p className="mt-1 font-inter text-[13px] text-muted">{c.location[locale]}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.projects[locale].slice(0, 3).map((p) => (
                        <span key={p} className="rounded-full bg-ink2 px-3 py-1 font-inter text-[11px] font-medium text-white">
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
                <div key={h.slug} className="relative aspect-square overflow-hidden rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                  {cover && (
                    <Image src={cover} alt={h.title[locale]} fill sizes="240px" className="object-cover" />
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="font-heebo text-[34px] font-bold text-ink2 sm:text-[44px]">
              {es ? "Proyectos favoritos" : "Fav projects"}
            </h2>
            <ul className="mt-6 border-t border-[#e2e2dc]">
              {heroes.map((h) => (
                <li key={h.slug} className="border-b border-[#e2e2dc]">
                  <Link href={`/work/${h.slug}`} className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-green">
                    <span className="font-inter text-[16px] font-semibold text-ink2">{h.title[locale]}</span>
                    <span className="shrink-0 font-inter text-[12px] text-muted">{h.brand}</span>
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
                <span className="font-inter text-[11px] text-muted">{es ? it.es : it.en}</span>
              </span>
            ))}
          </div>
          <h2 className="font-heebo text-[32px] font-bold text-ink2 sm:text-[44px]">
            {es ? "¿Qué llevo en mi maleta?" : "What's in my carry-on?"}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-inter text-[14px] text-muted">
            <span><b className="text-ink2">{es ? "Base" : "Based"}:</b> {carryOn.based}</span>
            <span><b className="text-ink2">{es ? "Idiomas" : "Languages"}:</b> {carryOn.languages}</span>
            <span><b className="text-ink2">{es ? "Roles" : "Roles"}:</b> {carryOn.roles}</span>
            <span><b className="text-ink2">{es ? "Disponible" : "Available"}:</b> {carryOn.available}</span>
          </div>
        </div>
      </section>

      <WorkTogether photo={encodeAsset("photos/about/Val.png")} />
      <SiteFooter />
    </main>
  );
}
