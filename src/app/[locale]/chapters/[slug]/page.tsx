import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ChapterProjectRail } from "@/components/site/chapter/ChapterProjectRail";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkTogether } from "@/components/site/WorkTogether";
import { chapters, getChapter, getChapterDetail } from "@/content";
import { encodeAsset } from "@/content/photo-manifest";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    chapters.map((chapter) => ({ locale, slug: chapter.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const chapter = getChapter(slug as (typeof chapters)[number]["id"]);

  if (!chapter || !hasLocale(routing.locales, locale)) return {};

  return {
    title: chapter.title[locale as Locale],
    description: getChapterDetail(slug)?.intro[locale as Locale],
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
  const chapter = getChapter(slug as (typeof chapters)[number]["id"]);
  const detail = getChapterDetail(slug);
  if (!chapter || !detail) notFound();

  const es = locale === "es";
  const firstProjectImage = detail.projects.find((project) => project.image)?.image;
  const cover = encodeAsset(detail.cover ?? firstProjectImage);
  const pageStyle = { "--chapter-accent": detail.accent } as CSSProperties;

  return (
    <main style={pageStyle}>
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#111] sm:min-h-[760px] lg:min-h-[900px]">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[var(--chapter-accent)]"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[76%] bg-gradient-to-b from-transparent via-[#0d0f0a]/55 to-[#0d0f0a]"
        />

        <SiteNav tone="light" />

        <div className="mx-auto flex min-h-[680px] max-w-[1710px] items-end px-5 pb-12 pt-40 sm:min-h-[760px] sm:px-8 sm:pb-16 lg:min-h-[900px] lg:px-[84px] lg:pb-[92px]">
          <div className="max-w-[940px]">
            <p className="font-inter text-[13px] font-medium tracking-[0.1em] text-white/85 sm:text-[14px]">
              [ {es ? "CAPÍTULO" : "CHAPTER"} {chapter.number} ]
            </p>
            <h1 className="mt-4 font-display text-[clamp(4rem,14vw,15.625rem)] leading-[0.84] text-[#ffb1db] [text-shadow:0_3px_7px_rgba(0,0,0,0.1),0_13px_13px_rgba(0,0,0,0.09),0_30px_18px_rgba(0,0,0,0.05)]">
              {chapter.title[locale]}
            </h1>
            <p className="mt-6 max-w-[760px] font-inter text-[17px] leading-[1.45] text-white sm:text-[20px]">
              {detail.intro[locale]}
            </p>
            <div className="mt-7 inline-flex rounded-full border border-white/50 px-5 py-2.5 font-inter text-[12px] font-medium tracking-[0.09em] text-white sm:text-[13px]">
              {detail.role[locale].toUpperCase()} · {chapter.dateRange.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--chapter-accent)] px-5 py-16 sm:px-8 sm:py-20 lg:px-[96px] lg:py-[110px]">
        <div className="mx-auto grid max-w-[1710px] gap-10 lg:grid-cols-[minmax(190px,0.22fr)_minmax(0,1fr)] lg:gap-[120px]">
          <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-[#e5f273] sm:text-[14px]">
            [ {chapter.title[locale].toUpperCase()} ]
          </p>
          <div>
            <p className="max-w-[1060px] font-inter text-[20px] leading-[1.48] text-[#fafaf5] sm:text-[22px]">
              {detail.intro[locale]}
            </p>
            <div className="mt-11 grid gap-8 sm:grid-cols-3 sm:gap-10 lg:mt-14 lg:gap-[90px]">
              {detail.impact.map((impact) => (
                <div key={impact.value}>
                  <p className="font-inter text-[clamp(2.1rem,3.3vw,2.75rem)] font-bold leading-none text-[#e5f273]">
                    {impact.value}
                  </p>
                  <p className="mt-3 max-w-[250px] font-inter text-[14px] leading-[1.45] text-[#e5e5db] sm:text-[15px]">
                    {impact.label[locale]}
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
            <h2 className="font-inter text-[clamp(2.1rem,4vw,3rem)] font-bold leading-[1.04] text-black">
              {es ? "Mis responsabilidades" : "My responsibilities"}
            </h2>
            <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-muted sm:text-[14px]">
              [ {es ? "MI ROL" : "MY ROLE"} ]
            </p>
          </div>
          <div className="mt-10 grid overflow-hidden border-l border-t border-[#d1d1cc] sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {detail.responsibilities.map((responsibility, index) => (
              <article
                key={responsibility.title[locale]}
                className="flex min-h-[256px] flex-col border-b border-r border-[#d1d1cc] p-6 sm:min-h-[280px] sm:p-8"
              >
                <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-muted sm:text-[14px]">
                  [ {String(index + 1).padStart(2, "0")} ]
                </p>
                <div className="mt-auto pt-10">
                  <h3 className="font-inter text-[26px] font-semibold leading-[1.1] text-black sm:text-[30px]">
                    {responsibility.title[locale]}
                  </h3>
                  <p className="mt-3 font-inter text-[16px] leading-[1.45] text-muted sm:text-[18px]">
                    {responsibility.body[locale]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChapterProjectRail projects={detail.projects} locale={locale} accent={detail.accent} />

      <WorkTogether photo={cover ?? undefined} />
      <SiteFooter />
    </main>
  );
}
