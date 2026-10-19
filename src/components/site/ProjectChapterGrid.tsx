"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";

export type ProjectChapterCard = {
  id: string;
  href: string;
  cover?: string;
  title: string;
  /** "Seúl · Global · Oct 2025 - presente" */
  meta: string;
  description: string;
  tags: string[];
};

export type ProjectGridCard = {
  key: string;
  href: string;
  image?: string;
  /** "1.1" style number, shown on image-less cards. */
  number: string;
  /** Chapter color, used when the project has no photo yet. */
  accent: string;
  /** "NomadHer · Seúl, 2026" */
  meta: string;
  title: string;
  description: string;
};

export type ProjectCategory = {
  id: string;
  label: string;
};

export function ProjectChapterGrid({
  cards,
  categories,
  projectsByCategory,
  locale,
}: {
  cards: ProjectChapterCard[];
  categories: ProjectCategory[];
  projectsByCategory: Record<string, ProjectGridCard[]>;
  locale: Locale;
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "chapters");
  const isChaptersTab = activeCategory === "chapters";
  const projects = projectsByCategory[activeCategory] ?? [];

  return (
    <div>
      <div className="-mx-5 mt-8 overflow-x-auto px-5 pb-2 sm:mt-10 sm:mx-0 sm:px-0">
        <div className="mx-auto flex w-max gap-2 sm:gap-2.5">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full border px-3.5 py-2 font-inter text-[12px] font-medium transition-colors sm:px-4 sm:py-2.5 sm:text-[13px] ${
                activeCategory === category.id
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-[#d1d1cc] bg-white text-[#474d47] hover:border-[#474d47]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {isChaptersTab ? (
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:mt-5 lg:grid-cols-2 lg:gap-8">
          {cards.map((card) => (
            <li key={card.id}>
              <Link
                href={card.href}
                className="group flex h-full min-h-[620px] flex-col rounded-[22px] bg-[#ecece7] p-5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b173b] sm:min-h-[700px] sm:p-6"
              >
                <div className="relative h-[240px] w-full overflow-hidden rounded-[14px] bg-[#c9d6cd] sm:h-[300px]">
                  {card.cover && (
                    <Image
                      src={card.cover}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <h3 className="mt-6 font-inter text-[30px] font-semibold leading-none text-[#1c211e] sm:text-[36px]">
                  {card.title}
                </h3>
                <p className="mt-4 font-inter text-[14px] font-semibold leading-snug text-[#111] sm:text-[16px]">
                  {card.meta}
                </p>
                <p className="mt-4 font-inter text-[15px] leading-[1.5] text-[#4a4f4a] sm:text-[17px]">
                  {card.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#1c211e] px-4 py-2 font-inter text-[12px] font-medium text-white sm:text-[13px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project) => (
            <li key={project.key}>
              <Link
                href={project.href}
                className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[18px] border border-[#e2e2dd] bg-[#fafaf5] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b173b]"
              >
                <div
                  className="relative h-[200px] w-full overflow-hidden"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 left-5 font-display text-[72px] leading-none text-white/85"
                    >
                      {project.number}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
                  <p className="font-inter text-[13px] font-medium tracking-[0.08em] text-[#555]">
                    {project.meta}
                  </p>
                  <h3 className="mt-3 font-inter text-[24px] font-semibold leading-[1.05] text-[#1c211e]">
                    {project.title}
                  </h3>
                  <p className="mt-4 font-inter text-[15px] leading-[1.5] text-[#4a4f4a]">
                    {project.description}
                  </p>
                  <span className="mt-auto pt-6 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1c211e]">
                    {locale === "es" ? "Ver proyecto ↗" : "View project ↗"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
