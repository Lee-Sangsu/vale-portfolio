"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DiaryVideo } from "./DiaryVideo";

export type DiaryItem = { src: string; kind: "image" | "video"; aspect: number };

/** Splits the items between `count` rows keeping them all about as long, in order. */
function splitRows(items: DiaryItem[], count: number) {
  const rows: DiaryItem[][] = Array.from({ length: count }, () => []);
  const lengths = new Array(count).fill(0);
  for (const item of items) {
    const target = lengths.indexOf(Math.min(...lengths));
    rows[target].push(item);
    lengths[target] += item.aspect;
  }
  return rows.filter((row) => row.length > 0);
}

const SECONDS_PER_ASPECT = 9; // how long one unit of tile width takes to cross; keeps the pace the same in any row
const HOVER_MAX_SPEED = 1400; // px per second with the cursor at the very edge of a row
const HOVER_DEAD_ZONE = 0.12; // fraction of the half-width around the centre where hovering only holds the row still

/**
 * Linear rows of photos and clips, all the same height, each keeping its own proportions.
 * Every row drifts sideways in a loop (odd rows the opposite way). Hovering steers a row: the photos run
 * toward the side the cursor is on, faster near the edges, so the whole row can be skimmed quickly.
 * Dragging it (mouse or finger) moves it by hand; on release it keeps drifting from there.
 * With reduced motion the rows stay still and can be scrolled by hand.
 */
export function DiaryMarquee({ items, label, rows = 2 }: { items: DiaryItem[]; label: string; rows?: number }) {
  const split = splitRows(items, Math.max(1, rows));

  return (
    <div className="diary-marquee" role="group" aria-label={label}>
      <style>{`
        .diary-marquee { --tile-h: clamp(210px, 20vw, 340px); --gap: clamp(14px, 1.4vw, 24px); }
        .diary-marquee[data-rows="3"], .diary-marquee[data-rows="4"] { --tile-h: clamp(170px, 15vw, 260px); }
        .diary-row { overflow: hidden; padding-block: 12px; cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
        .diary-row[data-dragging="true"] { cursor: grabbing; }
        .diary-track { display: flex; width: max-content; gap: var(--gap); padding-right: var(--gap); will-change: transform; }
        .diary-track img { -webkit-user-drag: none; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) {
          .diary-row { overflow-x: auto; cursor: auto; }
          .diary-track { transform: none !important; }
        }
      `}</style>
      <div className="flex flex-col" data-rows={split.length} style={{ gap: "clamp(8px, 1vw, 14px)" }}>
        {split.map((row, r) => (
          <MarqueeRow key={r} row={row} label={label} reverse={r % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({ row, label, reverse }: { row: DiaryItem[]; label: string; reverse: boolean }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = useState(false);
  // Everything that moves lives in refs: the loop runs outside React.
  const offset = useRef(0); // px scrolled into the loop, always in [0, half)
  const hover = useRef<number | null>(null); // cursor position across the row, -1 (left edge) … 1 (right edge); null = not hovering
  const drag = useRef<{ id: number; lastX: number; moved: number } | null>(null);
  const duration = Math.max(30, row.reduce((n, i) => n + i.aspect, 0) * SECONDS_PER_ASPECT);
  // The set is doubled so the track can slide by exactly half of its width and loop seamlessly.
  const looped = [...row, ...row];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const half = () => track.scrollWidth / 2;
    const paint = () => {
      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
    };
    const wrap = () => {
      const h = half();
      if (h > 0) offset.current = ((offset.current % h) + h) % h;
    };

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!drag.current) {
        if (hover.current === null) {
          const speed = half() / duration; // px per second, so every row crosses at the same pace
          offset.current += (reverse ? -1 : 1) * speed * dt;
        } else {
          // Steer with the cursor: photos move toward the side it is on, easing in from the centre.
          const x = hover.current;
          const beyond = Math.max(0, Math.abs(x) - HOVER_DEAD_ZONE) / (1 - HOVER_DEAD_ZONE);
          const steer = Math.sign(x) * beyond * beyond;
          offset.current -= steer * HOVER_MAX_SPEED * dt;
        }
        wrap();
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const el = track.parentElement!;
    const place = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      hover.current = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") place(e);
    };
    const onLeave = () => (hover.current = null);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag.current = { id: e.pointerId, lastX: e.clientX, moved: 0 };
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* synthetic or already-released pointer: dragging still works through the row's own listeners */
      }
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !drag.current) place(e);
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      d.moved += Math.abs(dx);
      offset.current -= dx;
      wrap();
      paint();
    };
    const onUp = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      drag.current = null;
      setDragging(false);
      if (e.pointerType !== "mouse") hover.current = null; // a finger lifting is not a hover
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [duration, reverse]);

  return (
    <div className="diary-row" data-dragging={dragging}>
      <ul ref={trackRef} className="diary-track">
        {looped.map((item, i) => (
          <li
            key={`${item.src}-${i}`}
            aria-hidden={i >= row.length ? true : undefined}
            className="relative shrink-0 overflow-hidden rounded-[16px] bg-[#ecece7] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            style={{ height: "var(--tile-h)", aspectRatio: String(item.aspect) }}
          >
            {item.kind === "video" ? (
              <DiaryVideo src={item.src} label={label} />
            ) : (
              <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 400px, 60vw" className="object-cover" draggable={false} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
