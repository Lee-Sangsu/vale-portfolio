import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { heroes, chapters, getMentionsByChapter } from "@/content";
import { HERO_MANIFEST, MENTION_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { carryOn } from "@/content/about";
import { SiteNav } from "@/components/site/SiteNav";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Hero spread — photo cards fanning out of a folder, matching the Figma interactive pile.
// Cards start from the folder position (center-bottom) and spread out with staggered animation.
type SpreadItem = { kind: "photo"; path: string; w: number; h: number; tx: string; ty: string; rot: string; delay: string; z: number };

const HERO_SPREAD: SpreadItem[] = [
  // tall portrait — far left
  { kind: "photo", path: "photos/Favorite projects/global-youth-summit/_MG_3552.png",                    w: 170, h: 310, tx: "-440px", ty: "-12px",  rot: "-9deg",  delay: "0s",    z: 4 },
  // outdoor missions
  { kind: "photo", path: "photos/Favorite projects/misiones-internacionales/IMG_9822.png",               w: 148, h: 188, tx: "-240px", ty: "-115px", rot: "9deg",   delay: "0.07s", z: 3 },
  // coffee / lifestyle
  { kind: "photo", path: "photos/N9NE/nobled-coffee/IMG_3839.png",                                       w: 115, h: 115, tx: "-26px",  ty: "-90px",  rot: "-4deg",  delay: "0.14s", z: 5 },
  // summit event
  { kind: "photo", path: "photos/Favorite projects/global-youth-summit/IMG_0028.png",                    w: 140, h: 160, tx: "170px",  ty: "-130px", rot: "-10deg", delay: "0.21s", z: 3 },
  // Seoul women's summit
  { kind: "photo", path: "photos/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-034.png",  w: 148, h: 185, tx: "-115px", ty: "110px",  rot: "1deg",   delay: "0.28s", z: 2 },
  // hackathon — center-right
  { kind: "photo", path: "photos/Favorite projects/sejong-hackathon/IMG_3845.png",                       w: 162, h: 208, tx: "130px",  ty: "88px",   rot: "10deg",  delay: "0.35s", z: 6 },
  // tall portrait — far right
  { kind: "photo", path: "photos/Favorite projects/jal-nomadher/Banner.png",                             w: 170, h: 315, tx: "432px",  ty: "-42px",  rot: "5deg",   delay: "0.42s", z: 4 },
  // personal / travel
  { kind: "photo", path: "photos/Nice photos /IMG_9454_VSCO.png",                                        w: 120, h: 180, tx: "376px",  ty: "130px",  rot: "-9deg",  delay: "0.49s", z: 3 },
];

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
      chapterMentions.find((m) => MENTION_MANIFEST[m.id]?.cover) ?? chapterMentions[0];
    const cover = featured ? encodeAsset(MENTION_MANIFEST[featured.id]?.cover) : undefined;
    const href = featured ? `/work/${featured.id}` : "/projects";
    return { c, cover, href };
  });

  return (
    <main>
      {/* ── Hero — cards fan out of a folder, matching the Figma interactive pile ── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef4f8] to-white">
        <style>{`
          @keyframes spreadOut {
            0%   { transform: translate(calc(-50% + 0px), calc(-50% + 55px)) scale(0.45); opacity: 0; }
            65%  { opacity: 1; }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rot)) scale(1); opacity: 1; }
          }
          .spread-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(calc(-50% + 0px), calc(-50% + 55px)) scale(0.45);
            opacity: 0;
            animation: spreadOut 0.75s cubic-bezier(0.34, 1.42, 0.64, 1) forwards;
          }
        `}</style>
        <SiteNav tone="dark" />
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 pb-20 pt-[140px] sm:pb-24 sm:pt-[170px]">
          <h1 className="sr-only">{es ? "Trabajo" : "Work"}</h1>
          {/* pile container — folder base + cards fanning out above it */}
          <div className="relative h-[560px] w-full">
            {/* folder base — static, sits behind all cards */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[10px]"
              style={{ zIndex: 1 }}
            >
              <div className="h-[155px] w-[370px] rounded-[18px] bg-[#1e1e1e] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.45)]">
                {/* folder tab */}
                <div className="absolute -top-[14px] left-[24px] h-[18px] w-[80px] rounded-t-[8px] bg-[#2c2c2c]" />
              </div>
            </div>

            {/* spread cards */}
            {HERO_SPREAD.map((card) => (
              <div
                key={card.path}
                className="spread-card"
                style={{
                  "--tx": card.tx,
                  "--ty": card.ty,
                  "--rot": card.rot,
                  animationDelay: card.delay,
                  zIndex: card.z,
                } as React.CSSProperties}
              >
                <div
                  className="overflow-hidden rounded-[9px] bg-white shadow-[0_10px_32px_-6px_rgba(0,0,0,0.32)] ring-1 ring-black/5"
                  style={{ width: card.w, height: card.h, padding: 5 }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[5px]">
                    <Image
                      src={encodeAsset(card.path)!}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                      priority={card.delay === "0s" || card.delay === "0.07s"}
                    />
                  </div>
                </div>
              </div>
            ))}
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
