"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Photos ride the Figma ribbon path (SVG viewBox 0 0 1253 503, Figma node 523-2426).
 * The waypoints are joined with a Catmull-Rom spline (cubic Béziers) so the ribbon is one
 * smooth loop instead of straight segments, and x/y scale together so the shape never distorts.
 * Photos at the loop's peak float above the container; page scroll eases the speed up and back down.
 * Only a few photos ride at once; each one that completes a lap is replaced by the next in the queue.
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

// Only SLOT_COUNT photos ride the ribbon at once; the rest wait their turn. Every time a photo finishes
// a lap it hands its slot to the next photo in the queue, so all of them show up without crowding the ribbon.
const SLOT_COUNT = 10;
const STAGGER_SLOTS = SLOT_COUNT; // one virtual slot per visible photo → even spacing along the loop
const PHOTO_SCALE = 0.95; // photos at 1253px wide; they scale with the ribbon (medium size: ~105–125 px on a 1440 px screen)
const MAX_RIBBON_PX = 1200; // the ribbon no longer stretches to the full width, so the photos ride closer together
const MIN_PHOTO_PX = 84;
const BASE_DURATION = 55; // seconds to traverse the full ribbon once
const SCROLL_SPEEDUP = 2.4; // extra speed while the page is scrolling
const SPEED_EASE = 3.2; // higher = speed follows the target faster
const SCROLL_HOLD_MS = 160; // how long the boost lasts after the last scroll event
const MAX_FRAME_SECONDS = 0.05;

/** Every photo of the ring, in the order they enter. */
const PHOTOS = Array.from({ length: 17 }, (_, i) => `${RING}/val-${String(i + 1).padStart(2, "0")}.jpg`);

/** Tilt and size of each visible slot (the photo inside it changes every lap). */
const SLOTS: { rot: number; size: number }[] = [
  { rot: -8,  size: 123 },
  { rot:  6,  size: 114 },
  { rot: -4,  size: 100 },
  { rot:  8,  size: 116 },
  { rot: -6,  size: 134 },
  { rot: 10,  size: 128 },
  { rot: -10, size: 135 },
  { rot: 12,  size: 112 },
  { rot: -7,  size: 109 },
  { rot: 14,  size: 116 },
];

export function PhotoRing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollRef = useRef(0);
  // scale = rendered ribbon width / SVG_W; drives the path, the container height and the photo sizes
  const [scale, setScale] = useState(1);
  // Photo index per slot. The first SLOT_COUNT photos start on the ribbon; the queue continues from there.
  const [slotPhotos, setSlotPhotos] = useState<number[]>(() => SLOTS.map((_, i) => i));
  const nextPhotoRef = useRef(SLOT_COUNT);
  const lastTRef = useRef<number[]>(SLOTS.map((_, i) => i / STAGGER_SLOTS));

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

      SLOTS.forEach((slot, i) => {
        const node = tileRefs.current[i];
        if (!node) return;
        const t = (progress + i / STAGGER_SLOTS) % 1;
        // The slot just wrapped from the end of the ribbon back to the start: hand it to the next photo in line.
        if (t < lastTRef.current[i]) {
          const next = nextPhotoRef.current % PHOTOS.length;
          nextPhotoRef.current += 1;
          setSlotPhotos((prev) => (prev[i] === next ? prev : prev.map((p, j) => (j === i ? next : p))));
        }
        lastTRef.current[i] = t;
        node.style.offsetDistance = `${(t * 100).toFixed(3)}%`;
        // Gentle sway around each photo's own tilt, so the ribbon feels alive
        const sway = Math.sin(t * Math.PI * 2 * 2 + i) * 4;
        node.style.transform = `translate(-50%, -50%) rotate(${(slot.rot + sway).toFixed(2)}deg)`;
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
        className="relative mx-auto hidden w-full md:block"
        style={{ maxWidth: MAX_RIBBON_PX, height: (SVG_H + Y_PAD * 2) * scale }}
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .photo-ring-tile { offset-distance: var(--photo-ring-offset); }
          }
        `}</style>

        {SLOTS.map((t, i) => {
          const size = Math.max(t.size * PHOTO_SCALE * scale, MIN_PHOTO_PX);
          const src = PHOTOS[slotPhotos[i]];
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
                  key={src}
                  src={src}
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

      {/* Mobile: simple wrapping grid with the first photos of the queue */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {SLOTS.map((t, i) => (
          <div
            key={i}
            className="relative size-[104px] overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            style={{ transform: `rotate(${t.rot / 3}deg)` }}
          >
            <Image src={PHOTOS[i]} alt="" fill sizes="104px" className="object-cover" />
          </div>
        ))}
      </div>
    </>
  );
}
