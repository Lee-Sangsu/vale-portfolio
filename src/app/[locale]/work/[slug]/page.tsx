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
  const spotlight = encodeAsset(manifest.spotlight) ?? cover;

  // Photo pools for the rosette + diary.
  const rosettePhotos = [
    ...(manifest.mosaic ?? []),
    ...(manifest.mainCarousel ?? []),
  ]
    .map((p) => encodeAsset(p)!)
    .filter(Boolean);

  const diaryPhotos = [
    ...(manifest.mosaic ?? []),
    ...(manifest.mainCarousel ?? []),
    ...(hero.gallery ?? []),
  ]
    .map((p) => encodeAsset(p)!)
    .filter(Boolean);

  // Tags / labels.
  const t = {
    myRole: es ? "Mi rol" : "My role",
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

  // ── My role list ──────────────────────────────────────────────────
  const roleItems: { label: string; value: string }[] = hero.role
    ? hero.role[locale].map((r) => {
        // Split "Label · detail" or "Label, detail" into name/role pairs.
        const sep = r.includes(" · ") ? " · " : r.includes(": ") ? ": " : null;
        if (sep) {
          const [label, ...rest] = r.split(sep);
          return { label, value: rest.join(sep) };
        }
        return { label: r, value: "" };
      })
    : [
        { label: hero.brand, value: es ? "Marca" : "Brand" },
        { label: hero.location, value: es ? "Rol" : "Role" },
        {
          label: hero.date[locale],
          value: es ? "Periodo" : "Timeline",
        },
      ];

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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <SiteNav tone="dark" />
        <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 pb-12 pt-[150px] text-center sm:px-8 sm:pt-[200px]">
          <h1 className="font-inter text-[36px] font-bold leading-tight text-[#111] sm:text-[56px]">
            {hero.title[locale]}
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] font-inter text-[15px] leading-[23px] text-muted">
            {hero.tagline[locale]}
          </p>

          <div className="mt-12 sm:mt-16">
            <ProjectRosette photos={rosettePhotos} title={hero.title[locale]} />
          </div>
        </div>
      </section>

      {/* ── My role ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-heebo text-[40px] font-bold leading-tight text-ink2 sm:text-[64px]">
            {t.myRole}
          </h2>

          <div className="mt-10 grid items-start gap-10 md:mt-14 md:grid-cols-[minmax(0,460px)_1fr] md:gap-16">
            {/* Credits list */}
            <dl className="w-full">
              {roleItems.map((it, i) => (
                <div
                  key={`${it.label}-${i}`}
                  className="flex items-baseline justify-between gap-6 border-b border-[#e2e2dc] py-4"
                >
                  <dt className="font-inter text-[16px] font-semibold text-[#111] sm:text-[18px]">
                    {it.label}
                  </dt>
                  {it.value ? (
                    <dd className="text-right font-inter text-[14px] text-muted sm:text-[16px]">
                      {it.value}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>

            {/* Project photo */}
            {spotlight ? (
              <div className="relative aspect-[385/256] w-full overflow-hidden rounded-[8px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] md:max-w-[460px] md:justify-self-end">
                <Image
                  src={spotlight}
                  alt={hero.title[locale]}
                  fill
                  sizes="(min-width: 768px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Visual Diary ── */}
      <VisualDiary heading={t.diary} subtitle={t.diarySub} photos={diaryPhotos} />

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

      {/* ── Visual Identity (dark green panel) ── */}
      <section className="bg-white py-12 sm:py-20">
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
      </section>

      {/* ── Contact + footer ── */}
      <WorkTogether photo={cover ?? undefined} />
      <SiteFooter />
    </main>
  );
}
