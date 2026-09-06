import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { heroes, getHero, chapters } from "@/content";
import { mentions } from "@/content/mentions";
import { HERO_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { MentionDetail } from "@/components/MentionDetail";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WorkTogether } from "@/components/site/WorkTogether";
import { AppSwatchRow } from "@/components/site/AppSwatchRow";
import { ProjectRosette } from "@/components/site/project/ProjectRosette";
import { VisualDiary } from "@/components/site/project/VisualDiary";
import { getProjectTemplate } from "@/lib/project-template.mjs";
import type { Hero, Locale } from "@/content/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  const heroParams = routing.locales.flatMap((locale) =>
    heroes.map((h) => ({ locale, slug: h.slug })),
  );
  const mentionParams = routing.locales.flatMap((locale) =>
    mentions.map((m) => ({ locale, slug: m.id })),
  );
  return [...heroParams, ...mentionParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const hero = getHero(slug);
  if (hero) {
    return {
      title: hero.title[locale as Locale],
      description: hero.tagline[locale as Locale],
    };
  }
  const mention = mentions.find((m) => m.id === slug);
  if (mention) {
    return {
      title: mention.title,
      description: mention.tagline[locale as Locale],
    };
  }
  return {};
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const es = locale === "es";

  // (A) Hero (fav project) — redesigned project detail
  const hero = getHero(slug);
  if (hero) {
    return <HeroProjectPage hero={hero} locale={locale} es={es} />;
  }

  // (B) Mention (secondary project) — reuse existing MentionDetail
  const mention = mentions.find((m) => m.id === slug);
  if (mention) {
    return (
      <>
        <section className="relative">
          <SiteNav tone="dark" />
        </section>
        <main>
          <MentionDetail mention={mention} locale={locale} />
        </main>
        <WorkTogether />
        <SiteFooter />
      </>
    );
  }

  notFound();
}

/* ------------------------------------------------------------------ */
/* Hero project detail                                                 */
/* ------------------------------------------------------------------ */

function HeroProjectPage({
  hero,
  locale,
  es,
}: {
  hero: Hero;
  locale: Locale;
  es: boolean;
}) {
  const manifest = HERO_MANIFEST[hero.slug] ?? {};
  const cover = encodeAsset(manifest.cover);
  const template = getProjectTemplate(hero.slug);

  // Project manifests can contain a single cover only. Repeat that cover as a
  // visual fallback so every Figma composition keeps its media rhythm.
  const discoveredPhotos = [
    ...(manifest.mosaic ?? []),
    ...(manifest.mainCarousel ?? []),
    ...(hero.gallery ?? []),
  ]
    .map((p) => encodeAsset(p)!)
    .filter(Boolean);
  const diaryPhotos = discoveredPhotos.length
    ? discoveredPhotos
    : cover
      ? Array.from({ length: 7 }, () => cover)
      : [];

  // Tags / labels.
  const t = {
    diary: es ? "Diario visual" : "Visual Diary",
    diarySub: es
      ? "Esta sección reúne fotografía y video originales que capturé, creados sobre todo para contenido de viaje propio y, de vez en cuando, para clientes."
      : "This section features original photography and video captured by me, created primarily for personal travel content alongside occasional client work.",
    overview: es ? "Resumen" : "Overview",
    client: es ? "Cliente" : "Client",
    role: es ? "Rol" : "Role",
    projectType: es ? "Tipo de proyecto" : "Project Type",
    challenge: es ? "Reto" : "Challenge",
    approach: es ? "Enfoque" : "Approach",
    result: es ? "Resultado" : "Result",
    visualA: es ? "Identidad" : "Visual",
    visualB: es ? "visual" : "Identity",
    coreBenefits: es ? "BENEFICIOS CLAVE" : "CORE BENEFITS",
  };

  // ── Overview meta + cards ─────────────────────────────────────────
  const chapter = chapters.find((c) => c.id === hero.chapter);
  const projectType = chapter ? chapter.title[locale] : hero.brand;

  const sections = hero.sections ?? [];
  const challengeBody = hero.context[locale];
  const approachBody =
    sections[0]?.body?.[locale] ??
    sections[0]?.bullets?.[locale]?.join(". ") ??
    hero.tagline[locale];
  const resultBody =
    hero.status?.[locale] ??
    sections[sections.length - 1]?.body?.[locale] ??
    sections[sections.length - 1]?.bullets?.[locale]?.join(". ") ??
    hero.tagline[locale];

  const cards = [
    { n: "01", title: t.challenge, body: challengeBody },
    { n: "02", title: t.approach, body: approachBody },
    { n: "03", title: t.result, body: resultBody },
  ];

  // ── Visual Identity benefits ──────────────────────────────────────
  const benefits =
    hero.results && hero.results.length
      ? hero.results.slice(0, 3).map((r) => ({
          label:
            typeof r.value === "string" ? r.value : r.value[locale],
          body: r.label[locale],
        }))
      : sections.slice(0, 3).map((s) => ({
          label: s.title[locale],
          body:
            s.body?.[locale] ??
            s.bullets?.[locale]?.[0] ??
            "",
        }));

  return (
    <main>
      <ProjectHero
        template={template}
        title={hero.title[locale]}
        description={hero.context[locale]}
        tagline={hero.tagline[locale]}
        cover={cover}
        photos={diaryPhotos}
        locale={locale}
      />

      {/* ── Overview ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-[32px] font-bold leading-tight text-ink2 sm:text-[40px]">
            {t.overview}
          </h2>

          {/* Meta row */}
          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#e2e2dc] pt-8 sm:grid-cols-3">
            {[
              { label: t.client, value: hero.brand },
              { label: t.role, value: hero.location },
              { label: t.projectType, value: projectType },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-inter text-[14px] text-muted">
                  {m.label}
                </div>
                <div className="mt-1 font-inter text-[17px] font-medium text-ink2">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* 3 cards */}
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
            {cards.map((c) => (
              <div
                key={c.n}
                className="flex flex-col gap-3 rounded-[14px] bg-[#f3f2ee] px-6 pb-8 pt-6 shadow-[0_8px_26px_rgba(0,0,0,0.06)]"
              >
                <span className="font-inter text-[32px] font-bold leading-none text-[#c8c8c2]">
                  {c.n}
                </span>
                <h3 className="font-inter text-[21px] font-semibold text-ink2">
                  {c.title}
                </h3>
                <p className="font-inter text-[16px] leading-[23px] text-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <AppSwatchRow className="mt-14 sm:mt-20" />
        </div>
      </section>

      {template === "ux-ui" ? (
        <DeviceGallery title={hero.title[locale]} photos={diaryPhotos} />
      ) : null}

      {template === "marketing-social" ? (
        <SocialMediaShowcase photos={diaryPhotos} locale={locale} />
      ) : null}

      {/* ── Visual Identity (campaign / brand template) ── */}
      {template === "campaign-brand" ? <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_320px]">
            {/* Green panel */}
            <div className="rounded-[24px] bg-[#1f4a37] p-8 sm:p-12 lg:p-14">
              <h2 className="font-inter text-[44px] font-bold leading-[1.02] text-white sm:text-[64px] lg:text-[88px] lg:leading-[0.95]">
                {t.visualA}
                <br />
                {t.visualB}
              </h2>

              <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
                <p className="max-w-[280px] font-inter text-[16px] leading-[24px] text-white/[0.82]">
                  {hero.tagline[locale]}
                </p>

                <div className="max-w-[280px]">
                  <div className="font-inter text-[13px] font-bold tracking-[0.78px] text-white">
                    {t.coreBenefits}
                  </div>
                  <ul className="mt-5 flex flex-col gap-5">
                    {benefits.map((b, i) => (
                      <li
                        key={i}
                        className="font-inter text-[16px] leading-[22px] text-white/90"
                      >
                        <span className="font-bold text-white">{b.label}</span>
                        {b.body ? <>{" · "}{b.body}</> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Side photo */}
            {cover ? (
              <div className="relative hidden h-full min-h-[500px] overflow-hidden rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] lg:block">
                <Image
                  src={cover}
                  alt={hero.title[locale]}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section> : null}

      {template === "campaign-brand" ? (
        <VisualDiary heading={t.diary} subtitle={t.diarySub} photos={diaryPhotos} />
      ) : null}

      {/* ── Contact + footer ── */}
      <WorkTogether photo={cover ?? undefined} />
      <SiteFooter />
    </main>
  );
}

function ProjectHero({
  template,
  title,
  description,
  tagline,
  cover,
  photos,
  locale,
}: {
  template: string;
  title: string;
  description: string;
  tagline: string;
  cover?: string;
  photos: string[];
  locale: Locale;
}) {
  if (template === "ux-ui") {
    return (
      <section className="relative overflow-hidden bg-white">
        <SiteNav tone="dark" />
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-20 pt-[150px] sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:pt-[180px]">
          <div className="relative mx-auto h-[360px] w-full max-w-[500px] sm:h-[520px]">
            {cover ? (
              <Image
                src={cover}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-contain drop-shadow-[0_16px_16px_rgba(0,0,0,0.18)]"
              />
            ) : null}
          </div>
          <div className="max-w-[640px]">
            <h1 className="font-inter text-[44px] font-bold leading-none text-ink2 sm:text-[72px]">
              {title}
            </h1>
            <p className="mt-6 line-clamp-6 font-inter text-[16px] leading-[23px] text-muted sm:text-[17px]">
              {description}
            </p>
            <div className="mt-8 rounded-[28px] bg-[#f4f4f4] px-7 py-6 sm:px-10">
              <span className="font-inter text-[13px] text-muted">
                {locale === "es" ? "Propósito" : "Purpose"}
              </span>
              <div className="mt-3 grid grid-cols-3 divide-x divide-[#9a9a9a]">
                {["Research", "System", "Shipped"].map((item) => (
                  <span key={item} className="px-3 text-center font-inter text-[15px] font-bold text-ink2 sm:text-[20px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (template === "campaign-brand") {
    const cards = photos.slice(0, 3);
    return (
      <section className="relative overflow-hidden bg-white">
        <SiteNav tone="dark" />
        <div className="mx-auto grid max-w-[1420px] items-center gap-10 px-5 pb-20 pt-[140px] sm:px-8 md:grid-cols-[1.08fr_0.92fr] md:pt-[170px]">
          <div className="grid h-[280px] grid-cols-3 gap-3 sm:h-[420px]">
            {cards.map((photo, index) => (
              <div key={`${photo}-${index}`} className="relative overflow-hidden rounded-[2px] bg-[#dedede]">
                <Image src={photo} alt="" fill priority={index === 0} sizes="30vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="max-w-[500px]">
            <h1 className="font-inter text-[40px] font-bold leading-none text-ink2 sm:text-[60px]">
              {title}
            </h1>
            <p className="mt-7 font-inter text-[16px] leading-[23px] text-muted sm:text-[17px]">
              {tagline}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <SiteNav tone="dark" />
      <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 pb-12 pt-[150px] text-center sm:px-8 sm:pt-[200px]">
        <h1 className="font-inter text-[36px] font-bold leading-tight text-[#111] sm:text-[56px]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] font-inter text-[15px] leading-[23px] text-muted">
          {tagline}
        </p>
        <div className="mt-12 sm:mt-16">
          <ProjectRosette photos={photos} title={title} />
        </div>
      </div>
    </section>
  );
}

function DeviceGallery({ title, photos }: { title: string; photos: string[] }) {
  const screens = photos.slice(0, 7);
  if (!screens.length) return null;
  return (
    <section className="overflow-hidden bg-[#f7f7f7] py-20 sm:py-28">
      <div className="mx-auto flex max-w-[1500px] items-end justify-center px-5 sm:px-8">
        {screens.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className="relative -mx-5 h-[230px] w-[130px] overflow-hidden rounded-[18px] border-[3px] border-[#161616] bg-[#f3bad2] shadow-[0_10px_18px_rgba(0,0,0,0.16)] sm:-mx-8 sm:h-[390px] sm:w-[220px]"
            style={{ zIndex: index, transform: `translateY(${Math.abs(index - 3) * 18}px)` }}
          >
            <Image src={photo} alt="" fill sizes="220px" className="object-cover" />
          </div>
        ))}
      </div>
      <p className="mt-8 text-center font-inter text-[14px] text-muted">{title}</p>
    </section>
  );
}

function SocialMediaShowcase({ photos, locale }: { photos: string[]; locale: Locale }) {
  const [feature, ...stack] = photos;
  if (!feature) return null;
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[960px] px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-inter text-[30px] font-bold text-ink2 sm:text-[42px]">Social Media Carousel</h2>
          <p className="mt-2 font-inter text-[13px] text-green-soft">{locale === "es" ? "9 piezas" : "9 slides"}</p>
        </div>
        <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[9px] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <Image src={feature} alt="" fill sizes="340px" className="object-cover" />
          </div>
          <div className="relative mx-auto h-[300px] w-full max-w-[370px]">
            {stack.slice(0, 5).map((photo, index) => (
              <div key={`${photo}-${index}`} className="absolute inset-y-0 w-[72%] overflow-hidden rounded-[9px] shadow-[0_8px_16px_rgba(0,0,0,0.14)]" style={{ left: `${index * 7}%`, zIndex: index }}>
                <Image src={photo} alt="" fill sizes="280px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
