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
 * Clicking a category opens its toggle and swaps the three-project image fan
 * on the right. Hovering the photos only brings one to the front; it never
 * changes the selected category.
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
  // `active` picks which photo fan is shown; `open` is the toggle that reveals
  // a category's text. Everything starts closed; clicking a title opens it
  // (and swaps the photos), clicking it again closes it.
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const cat = categories[active];

  return (
    <section className="overflow-hidden bg-white px-6 py-12 sm:px-8 sm:py-16 lg:py-[90px]">
      <div className="mx-auto grid max-w-[1250px] items-center gap-24 lg:grid-cols-[600px_minmax(0,1fr)] lg:gap-36">
        <div>
          <h2 className="font-inter text-[44px] leading-[1.04] font-bold text-[#2a2a2a] sm:text-[56px] lg:text-[64px]">
            {heading}
          </h2>
          <p className="font-inter mt-6 max-w-[634px] text-[16px] leading-[1.5] text-[#6e726e] sm:text-[18px]">
            {intro}
          </p>

          <ul className="mt-10">
            {categories.map((c, i) => {
              const on = i === open;
              const panelId = `showcase-panel-${c.key}`;
              return (
                <li
                  key={c.key}
                  className="border-b border-[#e2e2dc] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setOpen((current) => (current === i ? null : i));
                      setHovered(null);
                    }}
                    aria-expanded={on}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a2a2a]"
                  >
                    <span
                      className={clsx(
                        "font-inter block text-[20px] leading-[1.2] font-medium transition-colors sm:text-[24px]",
                        on ? "text-[#2a2a2a]" : "text-[#6e726e] group-hover:text-[#2a2a2a]",
                      )}
                    >
                      {i + 1}. {c.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "font-inter mt-[2px] flex size-7 shrink-0 items-center justify-center rounded-full border text-[18px] leading-none transition-all duration-300",
                        on
                          ? "rotate-45 border-[#2a2a2a] bg-[#2a2a2a] text-white"
                          : "border-[#c8c8c2] text-[#6e726e] group-hover:border-[#2a2a2a]",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-label={c.title}
                    className={clsx(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="font-inter max-w-[560px] pb-6 text-[15px] leading-[1.55] text-[#4a4f4a] sm:text-[16px]">
                        {c.desc}
                      </p>
                    </div>
                  </div>
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
          onMouseLeave={() => setHovered(null)}
        >
          {cat.projects.slice(0, 3).map((project, i) => (
            <div
              key={`${cat.key}-${project.img}`}
              onMouseEnter={() => setHovered(i)}
              className={clsx(
                "relative aspect-[372/565] w-[54%] shrink-0 overflow-hidden rounded-[16px] bg-[#f3f2ee] shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition-transform duration-300",
                hovered === i ? "z-[4] -translate-y-2 scale-[1.03]" : [
                  i === 0 && "z-[1]",
                  i === 1 && "z-[2]",
                  i === 2 && "z-[3]",
                ],
                i > 0 && "-ml-[28%]",
              )}
            >
              <Image
                src={project.img}
                alt=""
                fill
                sizes="(max-width: 1023px) 50vw, 372px"
                className="animate-[fadeIn_0.4s_ease] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
