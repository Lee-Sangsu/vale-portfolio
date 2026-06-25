"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Photos ride the Figma ribbon path (SVG viewBox 0 0 1253 503).
 * The path scales to fill the full container width at any viewport size.
 * No overflow-hidden — photos at the ribbon peak float above the container div.
 * Page scroll temporarily boosts the ribbon speed.
 * Mobile: simple wrapping grid.
 */

const RING = "/figma/contact/ring";

// Waypoints verbatim from the Figma SVG path
const WAYPOINTS: [number, number][] = [
  [0.138,    450.047],
  [118.138,  484.047],
  [275.138,  501.547],
  [443.138,  478.547],
  [633.138,  437.547],
  [715.638,  308.047],
  [753.138,  147.547],
  [666.138,    0.547],
  [490.638,   28.047],
  [443.138,  196.047],
  [508.138,  331.047],
  [607.138,  429.047],
  [797.138,  484.047],
  [965.138,  492.547],
  [1127.638, 464.047],
  [1252.138, 414.547],
];

const SVG_W = 1253; // original viewBox width

/** Build a scaled `path()` string — only x scales, y stays as-is. */
function buildPath(scaleX: number): string {
  return WAYPOINTS
    .map(([x, y], i) =>
      `${i === 0 ? "M" : "L"} ${(x * scaleX).toFixed(2)} ${y.toFixed(3)}`
    )
    .join(" ");
}

// Photos are staggered across 11 virtual slots → ~9.1 % gap between them
const STAGGER_SLOTS = 11;
const PHOTO_SCALE = 0.78;
const BASE_DURATION = 50; // seconds to traverse the full ribbon once
const SCROLLING_DURATION = 18;
const SCROLL_BOOST_DECAY = 3.2;
const MAX_FRAME_SECONDS = 0.05;

const TILES: { src: string; rot: number; size: number }[] = [
  { src: `${RING}/ring-01.jpg`, rot: -8,  size: 123 },
  { src: `${RING}/ring-02.jpg`, rot:  6,  size: 114 },
  { src: `${RING}/ring-03.jpg`, rot: -4,  size: 100 },
  { src: `${RING}/ring-04.jpg`, rot:  8,  size: 116 },
  { src: `${RING}/ring-05.jpg`, rot: -6,  size: 134 },
  { src: `${RING}/ring-06.jpg`, rot: 10,  size: 128 },
  { src: `${RING}/ring-07.jpg`, rot: -10, size: 135 },
  { src: `${RING}/ring-08.jpg`, rot: 12,  size: 112 },
  { src: `${RING}/ring-09.jpg`, rot: -7,  size: 109 },
  { src: `${RING}/ring-10.jpg`, rot: 14,  size: 116 },
  { src: `${RING}/ring-11.jpg`, rot:  5,  size: 108 },
  { src: `${RING}/ring-12.jpg`, rot: -5,  size: 138 },
  { src: `${RING}/ring-13.jpg`, rot:  7,  size: 135 },
  { src: `${RING}/ring-14.jpg`, rot: -9,  size: 132 },
];

export function PhotoRing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollBoostRef = useRef(0);
  // Start with the unscaled path; ResizeObserver updates it on mount + resize
  const [arcPath, setArcPath] = useState(() => buildPath(1));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setArcPath(buildPath(el.offsetWidth / SVG_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;
    let previous = performance.now();
    let progress = 0;

    const accelerate = () => {
      scrollBoostRef.current = 1;
    };

    const animate = (timestamp: number) => {
      const delta = Math.min((timestamp - previous) / 1000, MAX_FRAME_SECONDS);
      previous = timestamp;

      const boostedSpeed =
        1 + scrollBoostRef.current * (BASE_DURATION / SCROLLING_DURATION - 1);
      progress = (progress + (delta / BASE_DURATION) * boostedSpeed) % 1;
      scrollBoostRef.current = Math.max(
        0,
        scrollBoostRef.current - delta * SCROLL_BOOST_DECAY,
      );

      tileRefs.current.forEach((node, i) => {
        if (!node) return;
        const offset = ((progress + i / STAGGER_SLOTS) % 1) * 100;
        node.style.offsetDistance = `${offset.toFixed(3)}%`;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", accelerate, { passive: true });
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", accelerate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Desktop: photos ride the full-width ribbon */}
      <div
        ref={containerRef}
        className="relative hidden h-[520px] w-full md:block"
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .photo-ring-tile { offset-distance: var(--photo-ring-offset); }
          }
        `}</style>

        {TILES.map((t, i) => {
          const scaledSize = t.size * PHOTO_SCALE;
          const offset = `${((i / STAGGER_SLOTS) * 100).toFixed(3)}%`;

          return (
            <div
              key={i}
              ref={(node) => {
                tileRefs.current[i] = node;
              }}
              className="photo-ring-tile absolute z-10"
              style={{
                width: scaledSize,
                height: scaledSize,
                ["--photo-ring-offset" as string]: offset,
                offsetPath: `path("${arcPath}")`,
                offsetDistance: offset,
                offsetRotate: "0deg",
                transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
              } as React.CSSProperties}
            >
              <div className="relative h-full w-full overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes={`${Math.ceil(scaledSize)}px`}
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: simple wrapping grid */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {TILES.map((t, i) => (
          <div
            key={i}
            className="relative size-[88px] overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            style={{ transform: `rotate(${t.rot / 3}deg)` }}
          >
            <Image src={t.src} alt="" fill sizes="88px" className="object-cover" />
          </div>
        ))}
      </div>
    </>
  );
}
