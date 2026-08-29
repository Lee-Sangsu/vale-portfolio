"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { filterProjectCards } from "@/lib/project-categories.mjs";

export type ProjectChapterCard = {
  id: string;
  href: string;
  cover?: string;
  title: string;
  dateRange: string;
  location: string;
  description: string;
  projects: string[];
};

export type ProjectCategory = {
  id: string;
  label: string;
};

export function ProjectChapterGrid({
  cards,
  categories,
}: {
  cards: ProjectChapterCard[];
  categories: ProjectCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "chapters");
  const filteredCards = filterProjectCards(cards, activeCategory) as ProjectChapterCard[];

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
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

      <ul className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-2 lg:gap-8">
        {filteredCards.map((card) => (
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
                {card.location} · {card.dateRange}
              </p>
              <p className="mt-4 font-inter text-[15px] leading-[1.5] text-[#6e726e] sm:text-[17px]">
                {card.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {card.projects.map((project) => (
                  <span
                    key={project}
                    className="rounded-full bg-[#1c211e] px-4 py-2 font-inter text-[12px] font-medium text-white sm:text-[13px]"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
