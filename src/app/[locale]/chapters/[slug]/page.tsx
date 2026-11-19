import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ChapterProjectRail } from "@/components/site/chapter/ChapterProjectRail";
import { CaseSections } from "@/components/site/project/CaseSections";
import { HeroMedia, TemplateGallery } from "@/components/site/project/ProjectTemplates";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RotatingCover } from "@/components/site/RotatingCover";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkTogether } from "@/components/site/WorkTogether";
import { getChapterDetail } from "@/content";
import {
  FILTER_IDS,
  FILTER_LABELS,
  getChapter,
  getChapterCovers,
  getChapterPhotos,
  getProjectCover,
  getTopLevelProjects,
  portfolioChapters,
} from "@/content/portfolio";
import type { ChapterProject, Locale } from "@/content/types";
import { CHAPTER_FOLDERS } from "@/lib/project-photos";
import { routing } from "@/i18n/routing";

/** Chapters whose project carousel shows the discipline filter chips. */
const FILTERED_CHAPTERS = ["nomadher", "boost-lab"];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    portfolioChapters.map((chapter) => ({ locale, slug: chapter.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const chapter = getChapter(slug, locale as Locale);
  if (!chapter) return {};

  return {
    title: chapter.t.card.title,
    description: chapter.t.page.tagline,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;
  const chapter = getChapter(slug, locale);
  // Visual identity (accent color, cover photo) still comes from the old chapter detail.
  const detail = getChapterDetail(slug);
  if (!chapter || !detail) notFound();

  const es = locale === "es";
  const { page } = chapter.t;

  // Project cards for the rail, in the shape the rail already renders.
  const railProjects: ChapterProject[] = getTopLevelProjects(chapter.id).map((project) => ({
    title: { es: project.es.card.title, en: project.en.card.title },
    label: {
      es: project.es.card.labels[0] ?? "",
      en: project.en.card.labels[0] ?? "",
    },
    date: project.es.card.labels[1]
      ? { es: project.es.card.labels[1], en: project.en.card.labels[1] ?? project.es.card.labels[1] }
      : undefined,
    description: {
      es: project.es.card.description,
      en: project.en.card.description,
    },
    href: `/work/${project.slug}`,
    // Versioned URL (?v=mtime): a replaced cover.jpg shows at once instead of the optimizer's cached copy.
    image: getProjectCover(project.slug),
    filters: project.filters,
  }));

  // Filter chips for the rail: only categories that at least one project uses.
  // Only the two chapters with many projects (NomadHer, BOOST LAB) show the filter chips; the others just list their projects.
  const railFilters = FILTERED_CHAPTERS.includes(chapter.id)
    ? FILTER_IDS.filter((id) =>
        railProjects.some((project) => project.filters?.includes(id)),
      ).map((id) => ({ id, label: FILTER_LABELS[id][locale] }))
    : [];

  // Case chapters: photos from public/portafolio/capitulos/<chapter>/{destacada,visual,presentacion,instagram}/
  const casePhotos = {
    celular: [],
    instagram: page.case ? getChapterPhotos(chapter.id, "instagram") : [],
    presentacion: page.case ? getChapterPhotos(chapter.id, "presentacion") : [],
    visual: page.case ? getChapterPhotos(chapter.id, "visual") : [],
  };
  const featured = page.case ? getChapterPhotos(chapter.id, "destacada") : [];
  const caseMedia = await HeroMedia({ template: "visual", photos: casePhotos, title: page.title });
  const caseFolder = `public/portafolio/capitulos/${CHAPTER_FOLDERS[chapter.id]}`;
  const caseHints = {
    celular: "",
    instagram: `${caseFolder}/instagram/`,
    presentacion: `${caseFolder}/presentacion/`,
    visual: `${caseFolder}/visual/`,
  };

  // Chapter photo: whatever is in public/portafolio/capitulos/<chapter>/portada/
  const covers = getChapterCovers(chapter.id);
  const pageStyle = { "--chapter-accent": detail.accent } as CSSProperties;

  return (
    <main style={pageStyle}>
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#111] sm:min-h-[760px] lg:min-h-[900px]">
        {covers.length ? (
          // Phones: the photo keeps its own proportions at the top and fades into the dark background,
          // instead of being stretched to cover the whole title area. From md up it covers the hero.
          <div className="absolute inset-x-0 top-0 -z-20 aspect-[4/3] md:inset-0 md:aspect-auto">
            <RotatingCover srcs={covers} />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#111] md:hidden"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[var(--chapter-accent)]"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[76%] bg-gradient-to-b from-transparent via-[#10110d]/55 to-[#10110d]"
        />

        {/* Soft shade behind the white logo and nav so they stay legible over bright photos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[170px] bg-gradient-to-b from-black/55 to-transparent"
        />
        <SiteNav tone="onDark" />

        <div className="mx-auto flex min-h-[680px] max-w-[1710px] items-end px-5 pt-40 pb-12 sm:min-h-[760px] sm:px-8 sm:pb-16 lg:min-h-[900px] lg:px-[84px] lg:pb-[92px]">
          <div className="max-w-[940px]">
            <p className="font-inter text-[13px] font-medium tracking-[0.1em] text-white/85 sm:text-[14px]">
              [ {es ? "CAPÍTULO" : "CHAPTER"} {chapter.number} ]
            </p>
            <h1 className="font-display mt-4 text-[clamp(4rem,14vw,15.625rem)] leading-[0.84] text-[#ffb1db] [text-shadow:0_3px_7px_rgba(0,0,0,0.1),0_13px_13px_rgba(0,0,0,0.09),0_30px_18px_rgba(0,0,0,0.05)]">
              {page.title}
            </h1>
            <p className="font-inter mt-6 max-w-[760px] text-[17px] leading-[1.45] text-white sm:text-[20px]">
              {page.tagline}
            </p>
            <div className="font-inter mt-7 inline-flex rounded-full border border-white/50 px-5 py-2.5 text-[12px] font-medium tracking-[0.09em] text-white sm:text-[13px]">
              {page.pill}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--chapter-accent)] px-5 py-16 sm:px-8 sm:py-20 lg:px-[96px] lg:py-[110px]">
        <div className="mx-auto grid max-w-[1710px] gap-10 lg:grid-cols-[minmax(190px,0.22fr)_minmax(0,1fr)] lg:gap-[120px]">
          <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-[#d6ff5a] sm:text-[14px]">
            [ {page.label} ]
          </p>
          <div>
            <p className="font-inter max-w-[1060px] text-[20px] leading-[1.48] text-[#fafaf5] sm:text-[22px]">
              {page.band}
            </p>
            <div className="mt-11 grid gap-8 sm:grid-cols-3 sm:gap-10 lg:mt-14 lg:gap-[90px]">
              {page.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <p className="font-inter text-[clamp(2.1rem,3.3vw,2.75rem)] leading-none font-bold text-[#d6ff5a]">
                    {stat.value}
                  </p>
                  <p className="font-inter mt-3 max-w-[250px] text-[14px] leading-[1.45] text-[#e5e5db] sm:text-[15px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-[96px] lg:py-[110px]">
        <div className="mx-auto max-w-[1710px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:gap-10">
            <h2 className="font-inter text-[clamp(2.1rem,4vw,3rem)] leading-[1.04] font-bold text-black">
              {es ? "Mis responsabilidades" : "My responsibilities"}
            </h2>
            <p className="font-inter text-muted text-[13px] font-medium tracking-[0.08em] sm:text-[14px]">
              [ {es ? "MI ROL" : "MY ROLE"} ]
            </p>
          </div>
          <div className="mt-10 grid overflow-hidden border-t border-l border-[#d1d1cc] sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {page.responsibilities.map((responsibility) => (
              <article
                key={responsibility.n}
                className="flex flex-col border-r border-b border-[#d1d1cc] p-5 sm:min-h-[280px] sm:p-8"
              >
                <p className="font-inter text-muted text-[13px] font-medium tracking-[0.08em] sm:text-[14px]">
                  [ {responsibility.n} ]
                </p>
                <div className="mt-auto pt-10">
                  <h3 className="font-inter text-[26px] leading-[1.1] font-semibold text-black sm:text-[30px]">
                    {responsibility.title}
                  </h3>
                  <p className="font-inter text-ink mt-3 text-[16px] leading-[1.45] sm:text-[18px]">
                    {responsibility.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters without projects (Ironhack, Travelling University) carry their case on this page,
          laid out like the "visual" project template: photo grid, Overview, collage. */}
      {page.case ? (
        <>
          {featured.length || caseMedia ? (
            <section className="bg-white px-5 pt-16 sm:px-8 sm:pt-24 lg:px-[96px] lg:pt-[110px]">
              <div className="mx-auto flex max-w-[1710px] flex-col gap-4 sm:gap-6">
                {featured.map((src, i) => (
                  <div
                    key={src}
                    className="relative mx-auto aspect-[3/2] w-full max-w-[1040px] overflow-hidden rounded-[16px] bg-[#ecece7] shadow-[0_8px_22px_rgba(0,0,0,0.12)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1040px) 1040px, 92vw"
                      className="object-cover"
                    />
                  </div>
                ))}
                {caseMedia}
              </div>
            </section>
          ) : null}
          <CaseSections
            data={page.case}
            locale={locale}
            heading={es ? "El caso" : "The case"}
          />
          <TemplateGallery
            template="visual"
            photos={casePhotos}
            locale={locale}
            hints={caseHints}
          />
          {casePhotos.presentacion.length ? (
            <TemplateGallery
              template="ppt"
              photos={casePhotos}
              locale={locale}
              hints={caseHints}
              title={es ? "Dossier del evento" : "Event dossier"}
              tallSlides={chapter.id === "travelling-university"}
            />
          ) : null}
          {casePhotos.instagram.length ? (
            <TemplateGallery
              template="instagram"
              photos={casePhotos}
              locale={locale}
              hints={caseHints}
              // Travelling University keeps the original look: one tall strip with the next piece peeking in.
              classicPosts={chapter.id === "travelling-university"}
            />
          ) : null}
        </>
      ) : null}

      {railProjects.length ? (
        <ChapterProjectRail
          projects={railProjects}
          locale={locale}
          accent={detail.accent}
          filters={railFilters}
        />
      ) : null}

      <WorkTogether variant="detail" />
      <SiteFooter />
    </main>
  );
}
