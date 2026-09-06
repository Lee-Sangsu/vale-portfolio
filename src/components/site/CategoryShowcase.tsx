"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";

export type ShowcaseProject = { title: string; href: string; img: string };
export type ShowcaseCategory = {
  key: string;
  title: string;
  desc: string;
  image: string;
  projects: ShowcaseProject[];
};

/**
 * Interactive "What I Can Do For You" section based on Figma node 489:847.
 * Selecting a category swaps the three-project image fan on the right.
 */
export function CategoryShowcase({
  categories,
  heading,
  intro,
  allLabel,
}: {
  categories: ShowcaseCategory[];
  heading: string;
  intro: string;
  allLabel: string;
}) {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <section className="overflow-hidden bg-white px-6 py-12 sm:px-8 sm:py-16 lg:py-[90px]">
      <div className="mx-auto grid max-w-[1250px] items-center gap-16 lg:grid-cols-[642px_minmax(0,1fr)] lg:gap-14">
        <div>
          <h2 className="font-inter text-[44px] leading-[1.04] font-bold text-[#2a2a2a] sm:text-[56px] lg:text-[64px]">
            {heading}
          </h2>
          <p className="font-inter mt-6 max-w-[634px] text-[16px] leading-[1.5] text-[#6e726e] sm:text-[18px]">
            {intro}
          </p>

          <ul className="mt-10">
            {categories.map((c, i) => {
              const on = i === active;
              return (
                <li
                  key={c.key}
                  className="border-b border-[#e2e2dc] last:border-b-0"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group w-full py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a2a2a]"
                  >
                    <span
                      className={clsx(
                        "font-inter block text-[20px] leading-[1.2] font-medium text-[#2a2a2a] transition-transform sm:text-[24px]",
                        on && "translate-x-1",
                      )}
                    >
                      {i + 1}. {c.title}
                    </span>
                    <span className="font-inter mt-1.5 block text-[14px] leading-[1.4] text-[#6e736e]">
                      {c.desc}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Link
            href="/projects"
            className="font-inter mt-14 inline-flex rounded-full bg-[#c9f24d] px-6 py-3 text-[14px] font-semibold text-[#3e4722] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3e4722]"
          >
            {allLabel}
          </Link>
        </div>

        <div
          className="flex w-full max-w-[693px] items-center justify-center py-4 lg:justify-start"
          aria-live="polite"
        >
          {cat.projects.slice(0, 3).map((project, i) => (
            <Link
              key={`${cat.key}-${project.img}`}
              href={project.href}
              aria-label={`${project.title} ${i + 1}`}
              className={clsx(
                "group relative aspect-[372/565] w-[54%] shrink-0 overflow-hidden rounded-[16px] bg-[#f3f2ee] shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:z-10 hover:-translate-y-2 focus-visible:z-10 focus-visible:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a2a2a]",
                i === 0 && "z-[1]",
                i === 1 && "z-[2]",
                i === 2 && "z-[3]",
                i > 0 && "-ml-[28%]",
              )}
            >
              <Image
                src={project.img}
                alt=""
                fill
                sizes="(max-width: 1023px) 50vw, 372px"
                className="animate-[fadeIn_0.4s_ease] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
