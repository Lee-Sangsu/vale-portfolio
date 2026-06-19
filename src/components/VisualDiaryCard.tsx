"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type StickerVariant = "cream" | "lime" | "pink" | "ink";

const STICKER_BG: Record<StickerVariant, string> = {
  cream: "bg-cream-deep text-ink",
  lime: "bg-lime text-ink",
  pink: "bg-pink text-cream",
  ink: "bg-ink text-cream",
};

/**
 * Photo card with a sticker label overlay — Adriana's "Visual Diary" pattern,
 * remixed in Val's editorial brand (Instrument-Serif label on cream/lime).
 * Click cycles through hover-grow + slight rotate, like a real polaroid.
 *
 * Width is fixed; height adapts to image aspect so nothing is cropped along
 * the long edge — only the visible window has a fixed aspect for layout
 * stability inside horizontal scrolls.
 */
export function VisualDiaryCard({
  src,
  label,
  sublabel,
  href,
  variant = "cream",
  rotate = 0,
  className = "",
  width = 260,
  height = 340,
}: {
  src: string;
  label: string;
  sublabel?: string;
  href?: string;
  variant?: StickerVariant;
  rotate?: number;
  className?: string;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();

  const Wrapper: React.ElementType = href ? "a" : "div";

  return (
    <motion.div
      initial={{ rotate, y: 0 }}
      whileHover={
        reduce ? undefined : { rotate: 0, y: -6, scale: 1.03 }
      }
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ width }}
      className={`shrink-0 ${className}`}
    >
      <Wrapper
        {...(href ? { href } : {})}
        className="block group"
        style={{ width }}
      >
        <figure
          className="relative overflow-hidden rounded-2xl bg-cream-deep shadow-[0_18px_40px_-18px_rgba(0,0,0,0.30),0_6px_14px_-6px_rgba(0,0,0,0.18)]"
          style={{ width, height }}
        >
          <Image
            src={src}
            alt={label}
            fill
            sizes={`${width}px`}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          {/* Sticker label — overlapping the photo, Adriana-style */}
          <figcaption
            className={`absolute left-3 right-3 bottom-3 px-3.5 py-2.5 rounded-xl border border-ink/15 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.25)] ${STICKER_BG[variant]}`}
            style={{ transform: `rotate(${rotate < 0 ? 1.5 : -1.5}deg)` }}
          >
            <span
              className="block text-[15px] leading-tight font-display italic"
              style={{ fontStyle: "italic" }}
            >
              {label}
            </span>
            {sublabel && (
              <span className="block kicker-muted mt-0.5 text-[10px]">
                {sublabel}
              </span>
            )}
          </figcaption>
        </figure>
      </Wrapper>
    </motion.div>
  );
}
