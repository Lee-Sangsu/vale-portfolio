"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "motion/react";
import clsx from "clsx";

export type ChapterEntry = {
  id: string;
  title: string;
  meta: string;
  intro: string;
  image: string;
  href: string;
  starred?: boolean;
};

/**
 * Interactive "Work chapters": numbered accordion on the left, an image on
 * the right that swaps to the open chapter, plus a "view chapter" button.
 */
export function WorkChapters({
  chapters,
  heading,
  intro,
  viewLabel,
}: {
  chapters: ChapterEntry[];
  heading: string;
  intro: string;
  viewLabel: string;
}) {
  const [open, setOpen] = useState(0);
  const active = chapters[open];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={ref} className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-[1040px] items-start gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            className="font-inter text-[34px] font-bold leading-[1.1] text-ink2 sm:text-[42px]"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="mt-4 max-w-[440px] font-inter text-[16px] leading-[1.6] text-muted sm:text-[17px]"
          >
            {intro}
          </motion.p>

          <ul className="mt-8 border-t border-[#e2e2dc]">
            {chapters.map((c, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease }}
                  className="border-b border-[#e2e2dc]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    aria-controls={`chapter-panel-${c.id}`}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-inter text-[18px] font-semibold text-ink2 sm:text-[20px]">
                      {i + 1}. {c.title}
                      {c.starred && <span className="ml-2 text-green">★</span>}
                    </span>
                    <span
                      className={clsx(
                        "shrink-0 text-[18px] text-[#555] transition-transform",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    >
                      ⌄
                    </span>
                  </button>
                  <div
                    id={`chapter-panel-${c.id}`}
                    inert={!isOpen}
                    className={clsx(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[460px] font-inter text-[15px] leading-[1.6] text-muted">
                        {c.intro}
                      </p>
                      <p className="mt-2 font-inter text-[12px] font-medium uppercase tracking-wide text-green-soft">
                        {c.meta}
                      </p>
                      <Link
                        href={c.href}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink2 px-5 py-2 font-inter text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                      >
                        {viewLabel} <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Changing chapter image */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-[#f3f2ee] shadow-[0_8px_22px_rgba(0,0,0,0.12)] md:sticky md:top-24"
        >
          <Image
            key={active.image}
            src={active.image}
            alt={active.title}
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="animate-[fadeIn_0.4s_ease] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
