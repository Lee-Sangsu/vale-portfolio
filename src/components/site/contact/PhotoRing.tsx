"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Photos ride the Figma ribbon path (SVG viewBox 0 0 1253 503, Figma node 523-2426).
 * The waypoints are joined with a Catmull-Rom spline (cubic Béziers) so the ribbon is one
 * smooth loop instead of straight segments, and x/y scale together so the shape never distorts.
 * Photos at the loop's peak float above the container; page scroll eases the speed up and back down.
 * Mobile: simple wrapping grid.
 */

const RING = "/contacto/anillo-de-fotos";

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
const SVG_H = 503; // original viewBox height
const Y_PAD = 80; // room above/below the ribbon so photos at the peak aren't clipped

/** Smooth path through the waypoints, uniformly scaled. */
function buildPath(scale: number): string {
  const pts = WAYPOINTS.map(([x, y]) => [x * scale, (y + Y_PAD) * scale] as const);
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    // Uniform Catmull-Rom → cubic Bézier control points
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

// Photos are staggered across 11 virtual slots → ~9.1 % gap between them
const STAGGER_SLOTS = 11;
const PHOTO_SCALE = 1.3; // photos at 1253px wide; they scale with the ribbon
const MIN_PHOTO_PX = 84;
const BASE_DURATION = 55; // seconds to traverse the full ribbon once
const SCROLL_SPEEDUP = 2.4; // extra speed while the page is scrolling
const SPEED_EASE = 3.2; // higher = speed follows the target faster
const SCROLL_HOLD_MS = 160; // how long the boost lasts after the last scroll event
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
  const lastScrollRef = useRef(0);
  // scale = rendered ribbon width / SVG_W; drives the path, the container height and the photo sizes
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / SVG_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const arcPath = useMemo(() => buildPath(scale), [scale]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;
    let previous = performance.now();
    let progress = 0;
    let speed = 1;

    const onScroll = () => {
      lastScrollRef.current = performance.now();
    };

    const animate = (timestamp: number) => {
      const delta = Math.min((timestamp - previous) / 1000, MAX_FRAME_SECONDS);
      previous = timestamp;

      // Ease toward the target speed instead of jumping, so scroll never makes the photos stutter
      const target = timestamp - lastScrollRef.current < SCROLL_HOLD_MS ? SCROLL_SPEEDUP : 1;
      speed += (target - speed) * (1 - Math.exp(-SPEED_EASE * delta));
      progress = (progress + (delta / BASE_DURATION) * speed) % 1;

      tileRefs.current.forEach((node, i) => {
        if (!node) return;
        const t = (progress + i / STAGGER_SLOTS) % 1;
        node.style.offsetDistance = `${(t * 100).toFixed(3)}%`;
        // Gentle sway around each photo's own tilt, so the ribbon feels alive
        const sway = Math.sin(t * Math.PI * 2 * 2 + i) * 4;
        node.style.transform = `translate(-50%, -50%) rotate(${(TILES[i].rot + sway).toFixed(2)}deg)`;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Desktop: photos ride the full-width ribbon. Height follows the ribbon's aspect ratio plus room for the photos. */}
      <div
        ref={containerRef}
        className="relative hidden w-full md:block"
        style={{ height: (SVG_H + Y_PAD * 2) * scale }}
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .photo-ring-tile { offset-distance: var(--photo-ring-offset); }
          }
        `}</style>

        {TILES.map((t, i) => {
          const size = Math.max(t.size * PHOTO_SCALE * scale, MIN_PHOTO_PX);
          const offset = `${((i / STAGGER_SLOTS) * 100).toFixed(3)}%`;

          return (
            <div
              key={i}
              ref={(node) => {
                tileRefs.current[i] = node;
              }}
              className="photo-ring-tile absolute z-10 will-change-transform"
              style={{
                width: size,
                height: size,
                ["--photo-ring-offset" as string]: offset,
                offsetPath: `path("${arcPath}")`,
                offsetDistance: offset,
                offsetRotate: "0deg",
                transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
              } as React.CSSProperties}
            >
              <div className="relative h-full w-full overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.14)]">
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes={`${Math.ceil(size)}px`}
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
            className="relative size-[104px] overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            style={{ transform: `rotate(${t.rot / 3}deg)` }}
          >
            <Image src={t.src} alt="" fill sizes="104px" className="object-cover" />
          </div>
        ))}
      </div>
    </>
  );
}
