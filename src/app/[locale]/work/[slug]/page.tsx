import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WorkTogether } from "@/components/site/WorkTogether";
import { CaseSections } from "@/components/site/project/CaseSections";
import { ProjectExtras } from "@/components/site/project/ProjectExtras";
import {
  allProjects,
  getChapter,
  getProject,
  getProjectCover,
  portfolioChapters,
} from "@/content/portfolio";
import type { Locale } from "@/content/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allProjects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const project = getProject(slug, locale as Locale);
  if (!project) return {};
  return {
    title: project.t.page.title,
    description: project.t.card.description,
  };
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

  const project = getProject(slug, locale);
  if (!project) notFound();

  const chapter = getChapter(project.chapter, locale)!;
  const { page, card } = project.t;
  const cover = getProjectCover(project.slug);

  const siblings = portfolioChapters.find((c) => c.id === project.chapter)!.projects;
  const index = siblings.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <SiteNav tone="dark" />
        <div
          className={`mx-auto max-w-[1280px] px-5 pt-[150px] pb-14 sm:px-8 md:pt-[180px] md:pb-20 ${
            cover ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" : ""
          }`}
        >
          <div className="max-w-[760px]">
            <Link
              href={`/chapters/${project.chapter}`}
              className="font-inter text-muted text-[13px] font-medium tracking-[0.08em] transition-colors hover:text-black"
            >
              [ {es ? "CAPÍTULO" : "CHAPTER"} {chapter.number} · {chapter.t.page.label} ]
            </Link>
            <h1 className="font-inter text-ink2 mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-bold">
              {page.title}
            </h1>
            <p className="font-inter text-ink mt-6 text-[17px] leading-[1.55] sm:text-[19px]">
              {page.description}
            </p>
            <p className="font-inter text-muted mt-5 text-[14px] font-medium">
              {card.meta}
            </p>

            {page.purpose.length ? (
              <div className="mt-9 rounded-[24px] bg-[#f4f4f4] px-6 py-5 sm:px-9 sm:py-6">
                <span className="font-inter text-muted text-[13px]">
                  {es ? "Propósito" : "Purpose"}
                </span>
                <ul
                  className="mt-3 grid divide-y divide-[#c8c8c2] sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] sm:divide-x sm:divide-y-0"
                  style={{ ["--cols" as string]: page.purpose.length }}
                >
                  {page.purpose.map((item) => (
                    <li
                      key={item}
                      className="font-inter text-ink2 px-3 py-2 text-center text-[15px] leading-snug font-bold sm:text-[17px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {cover ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[#ecece7] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
              <Image
                src={cover}
                alt={page.title}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <CaseSections data={page} locale={locale} />
      <ProjectExtras extras={page.extras} />

      {/* ── Previous / next project in this chapter ── */}
      <nav
        aria-label={es ? "Más proyectos del capítulo" : "More projects in this chapter"}
        className="border-t border-[#e2e2dc] bg-white"
      >
        <div className="mx-auto grid max-w-[1280px] gap-px px-5 py-10 sm:grid-cols-2 sm:px-8">
          {[
            { target: prev, label: es ? "Anterior" : "Previous" },
            { target: next, label: es ? "Siguiente" : "Next" },
          ].map(({ target, label }, i) => (
            <div key={label} className={i === 1 ? "sm:text-right" : ""}>
              {target ? (
                <Link
                  href={`/work/${target.slug}`}
                  className="group inline-flex flex-col gap-1 py-3 transition-opacity hover:opacity-70"
                >
                  <span className="font-inter text-muted text-[13px] font-medium tracking-[0.08em]">
                    {label.toUpperCase()}
                  </span>
                  <span className="font-inter text-ink2 text-[22px] leading-tight font-semibold">
                    {target[locale].card.title}
                  </span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </nav>

      <WorkTogether variant="detail" />
      <SiteFooter />
    </main>
  );
}
