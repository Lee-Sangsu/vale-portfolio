"use client";

import Image from "next/image";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { encodeAsset } from "@/content/photo-manifest";
import type { ChapterId, ChapterProject, Locale } from "@/content/types";

type ChapterProjectRailProps = {
  projects: ChapterProject[];
  locale: Locale;
  accent: string;
  chapterId: ChapterId;
};

export function ChapterProjectRail({
  projects,
  locale,
  accent,
  chapterId,
}: ChapterProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const isNomadHer = chapterId === "nomadher";

  const scrollBy = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(424, rail.clientWidth * 0.9),
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-white pb-20 pt-20 sm:pb-[120px] sm:pt-[110px]">
      <div className="mx-auto max-w-[1710px] px-5 sm:px-8 lg:px-[96px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-muted sm:text-[14px]">
              [ {locale === "es" ? "PROYECTOS" : "PROJECTS"} ]
            </p>
            <h2 className="mt-3 font-inter text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.03] text-black">
              {locale === "es"
                ? "Lo que salió de este capítulo"
                : "What came out of this chapter"}
            </h2>
          </div>

          <div className="hidden shrink-0 gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous projects"
              onClick={() => scrollBy(-1)}
              className="grid size-[52px] place-items-center rounded-full bg-[#111] font-inter text-[28px] leading-none text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next projects"
              onClick={() => scrollBy(1)}
              className="grid size-[52px] place-items-center rounded-full bg-[#111] font-inter text-[28px] leading-none text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mt-11 sm:gap-6 sm:px-8 lg:px-[96px] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => {
          const image = encodeAsset(project.image);
          const nomadHerCard = (
            <>
              <div
                className="flex min-h-[244px] flex-col gap-4 px-[22px] pb-6 pt-[22px]"
                style={{ backgroundColor: index === 0 ? "#d9f25a" : "#ecece7" }}
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-transparent bg-white px-[14px] py-[7px] font-inter text-[13px] font-medium leading-none text-[#212621]">
                    {project.label[locale]}
                  </span>
                  {project.date ? (
                    <span className="rounded-full border border-[#dadad5] bg-white px-[14px] py-[7px] font-inter text-[13px] font-medium leading-none text-[#212621]">
                      {project.date[locale]}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-inter text-[30px] font-bold leading-[0.98] tracking-[-0.02em] text-black sm:text-[36px]">
                  {project.title[locale]}
                </h3>
                <p className="font-inter text-[15px] leading-[1.45] text-[#293021]">
                  {project.description[locale]}
                </p>
              </div>
              <div className="relative min-h-[296px] flex-1 px-3 pb-3 pt-0">
                <div className="relative size-full overflow-hidden rounded-[12px]">
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 400px, 82vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div aria-hidden="true" className="size-full" style={{ backgroundColor: accent }} />
                  )}
                </div>
              </div>
              <span className="absolute bottom-[31px] left-[31px] inline-flex items-center gap-2.5 rounded-full bg-white py-[9px] pl-[18px] pr-[9px] font-inter text-[14px] font-medium text-black shadow-sm">
                {locale === "es" ? "Ver más" : "See more"}
                <span className="grid size-[26px] place-items-center rounded-full bg-[#111] text-[12px] text-white">
                  →
                </span>
              </span>
            </>
          );
          const card = (
            <>
              <div className="relative h-[58%] min-h-[280px] overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 400px, 82vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="size-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7 sm:pb-8 sm:pt-7">
                <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-[#555]">
                  {project.label[locale]}
                </p>
                <h3 className="mt-3 font-inter text-[26px] font-semibold leading-[1.02] text-black sm:text-[30px]">
                  {project.title[locale]}
                </h3>
                <p className="mt-4 font-inter text-[15px] leading-[1.45] text-muted sm:text-[16px]">
                  {project.description[locale]}
                </p>
                {project.href ? (
                  <span className="mt-auto pt-6 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-black">
                    {locale === "es" ? "Ver proyecto ↗" : "View project ↗"}
                  </span>
                ) : (
                  <span className="mt-auto pt-6 font-inter text-[13px] font-medium text-muted">
                    {locale === "es" ? "Próximamente" : "Coming soon"}
                  </span>
                )}
              </div>
            </>
          );

          const className =
            "group flex min-h-[540px] w-[min(82vw,400px)] shrink-0 snap-start flex-col overflow-hidden rounded-[18px] border border-[#e2e2dd] bg-[#fafaf5] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[620px]";

          return project.href ? (
            <Link key={project.title[locale]} href={project.href} className={className}>
              {isNomadHer ? nomadHerCard : card}
            </Link>
          ) : (
            <article key={project.title[locale]} className={className}>
              {isNomadHer ? nomadHerCard : card}
            </article>
          );
        })}
      </div>
    </section>
  );
}
