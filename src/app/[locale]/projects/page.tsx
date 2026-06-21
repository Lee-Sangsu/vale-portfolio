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
      {/* ── Hero — photo-folder pile centerpiece (Figma node 227:1353) ──
          The design hero is a single editorial graphic: a folder spilling
          project photos + colored cards. We render it as one transparent image
          centered on the pale-sky wash, with an sr-only heading for a11y/SEO. */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef4f8] to-white">
        <SiteNav tone="dark" />
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 pb-20 pt-[140px] sm:pb-24 sm:pt-[170px]">
          <h1 className="sr-only">{es ? "Trabajo" : "Work"}</h1>
          <Image
            src="/figma/projects/hero-pile.png"
            alt={es ? "Pila de fotos de proyectos saliendo de una carpeta" : "Pile of project photos spilling from a folder"}
            width={701}
            height={507}
            priority
            sizes="(min-width: 640px) 700px, 90vw"
            className="h-auto w-[90vw] max-w-[700px] drop-shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]"
          />
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
