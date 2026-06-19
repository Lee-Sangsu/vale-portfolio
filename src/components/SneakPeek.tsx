"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { VisualDiaryCard } from "./VisualDiaryCard";

export type SneakPeekItem = {
  src: string;
  label: string;
  sublabel?: string;
  href?: string;
  variant?: "cream" | "lime" | "pink" | "ink";
};

/**
 * Horizontal scroll of VisualDiaryCards — curated, tilted, hover-grow.
 * Adriana's "Sneak peak of my works" pattern, in Val's brand.
 *
 * Also has a subtle parallax: the strip drifts a bit on page scroll so
 * the section feels alive even before you touch it.
 */
export function SneakPeek({
  title,
  items,
  decorEnd,
}: {
  title: string;
  items: SneakPeekItem[];
  decorEnd?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Tiny drift — adds life without seasickness.
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  // Rotation pattern — alternating to read as a pile in motion.
  const ROT = [-3, 2, -1.5, 4, -2.5, 1, -3.5, 2.5, -1, 3];
  const VARIANTS: SneakPeekItem["variant"][] = ["cream", "lime", "cream", "pink", "cream", "ink", "cream", "lime", "cream", "pink"];

  return (
    <section
      ref={sectionRef}
      className="border-t border-ink/15 py-20 sm:py-28 relative overflow-hidden"
      aria-label={title}
    >
      <div className="container-page mb-10 flex items-end justify-between gap-6 flex-wrap">
        <h2 className="display-xl font-display text-ink">{title}</h2>
        <span className="kicker-muted">scroll →</span>
      </div>

      <motion.div
        style={{ x }}
        className="flex gap-6 sm:gap-8 px-6 sm:px-10 overflow-x-auto snap-x snap-mandatory pb-6 -mx-0"
      >
        {items.map((item, i) => (
          <div key={item.src + i} className="snap-start">
            <VisualDiaryCard
              src={item.src}
              label={item.label}
              sublabel={item.sublabel}
              href={item.href}
              variant={item.variant ?? VARIANTS[i % VARIANTS.length]}
              rotate={ROT[i % ROT.length]}
            />
          </div>
        ))}
        {decorEnd && <div className="snap-start self-center">{decorEnd}</div>}
      </motion.div>
    </section>
  );
}
