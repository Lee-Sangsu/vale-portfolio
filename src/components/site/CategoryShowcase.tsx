"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";

const FEATURE_RATIO = "aspect-[385/413]";
const CARD_RATIO = "aspect-[326/403]";

export type ShowcaseProject = { title: string; href: string; img: string };
export type ShowcaseCategory = {
  key: string;
  title: string;
  desc: string;
  image: string;
  projects: ShowcaseProject[];
};

/**
 * Interactive "What I Can Do For You" + featured projects.
 * Selecting a category swaps the right-hand image AND the project row below.
 */
export function CategoryShowcase({
  categories,
  heading,
  projectsLabel,
  allLabel,
}: {
  categories: ShowcaseCategory[];
  heading: string;
  projectsLabel: string;
  allLabel: string;
}) {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1040px]">
        <h2 className="font-inter text-[34px] font-bold leading-[1.1] text-ink2 sm:text-[42px]">
          {heading}
        </h2>

        <div className="mt-10 grid items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Category list */}
          <ul className="border-t border-[#e2e2dc]">
            {categories.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.key} className="border-b border-[#e2e2dc]">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="w-full py-5 text-left"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="flex items-baseline gap-3">
                        <span className="font-inter text-[13px] font-semibold text-green-soft">
                          0{i + 1}
                        </span>
                        <span
                          className={clsx(
                            "font-inter text-[20px] font-bold transition-colors sm:text-[24px]",
                            on ? "text-ink2" : "text-muted",
                          )}
                        >
                          {on ? (
                            <span className="bg-hero-lime px-1 box-decoration-clone">{c.title}</span>
                          ) : (
                            c.title
                          )}
                        </span>
                      </span>
                      <span
                        className={clsx(
                          "shrink-0 text-[18px] text-[#555] transition-transform",
                          on ? "rotate-180" : "rotate-0",
                        )}
                      >
                        ⌄
                      </span>
                    </span>
                    <span
                      className={clsx(
                        "mt-2 block font-inter text-[15px] leading-[1.55] text-muted transition-all",
                        on ? "max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0",
                      )}
                    >
                      {c.desc}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Active feature image (Figma 385×413) */}
          <div className={`relative ${FEATURE_RATIO} w-full overflow-hidden rounded-[16px] bg-[#f3f2ee] shadow-[0_8px_22px_rgba(0,0,0,0.12)]`}>
            <Image
              key={cat.image}
              src={cat.image}
              alt={cat.title}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="animate-[fadeIn_0.4s_ease] object-cover"
            />
          </div>
        </div>

        {/* Featured projects for the active category — 3 cards (Figma 326×403) */}
        <div className="mt-16">
          <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.16em] text-green-soft">
            {projectsLabel}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {cat.projects.map((p, i) => (
              <Link
                key={p.img}
                href={p.href}
                aria-label={`${p.title} ${i + 1}`}
                className="group block"
              >
                <div className={`relative ${CARD_RATIO} w-full overflow-hidden rounded-[14px] bg-[#f3f2ee] shadow-[0_6px_16px_rgba(0,0,0,0.12)]`}>
                  <Image
                    key={p.img}
                    src={p.img}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="rounded-full bg-hero-lime px-7 py-3 font-inter text-[14px] font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {allLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
