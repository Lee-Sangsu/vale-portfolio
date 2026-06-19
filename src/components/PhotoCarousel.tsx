"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate, PanInfo } from "motion/react";

type Fit = "contain" | "cover";

export type PhotoCarouselProps = {
  photos: string[];
  alt: string;
  /** "contain" preserves the whole image; "cover" crops to fill. Default "contain". */
  fit?: Fit;
  /** Tailwind classes for the slide frame height. Default keeps a generous viewport-aware height. */
  frameClassName?: string;
  /** Cream/ink swatch behind the image when fit="contain". */
  bgClassName?: string;
  /** Optional kicker shown above the carousel (e.g. group label). */
  label?: string;
};

/**
 * Touch-first carousel — drag, arrows, dots, keyboard.
 * Defaults to `object-contain` so an image is never forced into the wrong crop.
 */
export function PhotoCarousel({
  photos,
  alt,
  fit = "contain",
  frameClassName = "h-[60vh] sm:h-[70vh] min-h-[360px]",
  bgClassName = "bg-cream-deep",
  label,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const labelId = useId();

  // Measure container width — needed so the drag offset maps to slide indices.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Animate the x motion value to match the active index when index or width change.
  useEffect(() => {
    const target = -index * width;
    const controls = animate(x, target, {
      type: "spring",
      stiffness: 280,
      damping: 34,
      mass: 0.9,
    });
    return controls.stop;
  }, [index, width, x]);

  const last = photos.length - 1;

  const go = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(i, last)));
    },
    [last],
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Keyboard navigation when the carousel is focused.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [prev, next],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!width) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    // Threshold: 18% of width or fast flick.
    const threshold = width * 0.18;
    if (offset < -threshold || velocity < -500) {
      next();
    } else if (offset > threshold || velocity > 500) {
      prev();
    } else {
      go(index);
    }
  };

  if (photos.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label ? `${label} — ${alt}` : alt}
      aria-describedby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none focus-visible:ring-2 focus-visible:ring-blue/40 rounded-2xl"
    >
      {/* Counter + label row */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span id={labelId} className="kicker-muted">
          {label ? `${label} · ` : ""}
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-ink-muted"> / {String(photos.length).padStart(2, "0")}</span>
        </span>
        <span className="kicker-muted hidden sm:inline">
          ← → · swipe
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className={`relative overflow-hidden rounded-2xl ${bgClassName}`}
      >
        <motion.div
          className="flex touch-pan-y"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -last * width, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={onDragEnd}
        >
          {photos.map((src, i) => (
            <div
              key={src}
              className={`shrink-0 ${frameClassName} relative w-full select-none`}
              style={{ width: width || "100%" }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}`}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className={fit === "cover" ? "object-cover" : "object-contain"}
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Arrow overlays — hidden on touch where drag is the primary affordance */}
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous photo"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 size-11 items-center justify-center rounded-full bg-ink/85 text-cream backdrop-blur-sm shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={index === last}
          aria-label="Next photo"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 size-11 items-center justify-center rounded-full bg-ink/85 text-cream backdrop-blur-sm shadow-lg transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dots — clickable thumbnails for short stacks, dots for long ones */}
      <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? "bg-ink w-6" : "bg-ink/25 hover:bg-ink/40 w-1.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
