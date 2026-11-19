"use client";

import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type AutoStripHandle = { nudge: (px: number) => void };

/**
 * A row of items in an endless loop. With `autoplay` it drifts on its own and pauses while the mouse is over it;
 * a horizontal wheel or trackpad swipe scrolls it like any strip, and a drag (mouse or finger) moves it by hand.
 * Children are doubled so the track can slide by exactly half its width and loop seamlessly.
 * With reduced motion the strip stays still and can be scrolled by hand.
 */
export const AutoStrip = forwardRef<
  AutoStripHandle,
  {
    children: ReactNode;
    /** Seconds for one full pass of the original set. */
    durationSeconds?: number;
    /** Drift on its own when nobody is touching it. Off: it only moves under the mouse or a finger. */
    autoplay?: boolean;
    reverse?: boolean;
    className?: string;
    /** Classes for the moving track (gap, alignment, padding). */
    trackClassName?: string;
    label?: string;
  }
>(function AutoStrip(
  {
    children,
    durationSeconds = 50,
    autoplay = true,
    reverse = false,
    className = "",
    trackClassName = "",
    label,
  },
  ref,
) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef(0);
  const hover = useRef(false); // mouse over the strip: the drift pauses
  const drag = useRef<{ id: number; lastX: number; moved: number } | null>(
    null,
  );
  const paintRef = useRef<() => void>(() => {});

  const items = Children.toArray(children);
  const looped = [...items, ...items];

  useImperativeHandle(ref, () => ({
    nudge: (px) => {
      offset.current += px;
      paintRef.current();
    },
  }));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const half = () => track.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h > 0) offset.current = ((offset.current % h) + h) % h;
    };
    const paint = () => {
      wrap();
      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
    };
    paintRef.current = paint;

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!drag.current) {
        // The strip drifts only while nobody is over it; under the mouse it follows the cursor instead.
        if (autoplay && !hover.current)
          offset.current +=
            (reverse ? -1 : 1) * (half() / durationSeconds) * dt;
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const el = track.parentElement!;
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover.current = true;
    };
    const onLeave = () => (hover.current = false);
    // A sideways wheel or trackpad swipe scrolls the strip; vertical scrolling keeps moving the page.
    const onWheel = (e: WheelEvent) => {
      const dx =
        e.shiftKey && Math.abs(e.deltaX) < Math.abs(e.deltaY)
          ? e.deltaY
          : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      offset.current += dx;
      paint();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag.current = { id: e.pointerId, lastX: e.clientX, moved: 0 };
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* synthetic pointer: dragging still works through the strip's own listeners */
      }
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      d.moved += Math.abs(dx);
      offset.current -= dx;
      paint();
    };
    const onUp = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      drag.current = null;
      setDragging(false);
      if (e.pointerType !== "mouse") hover.current = false;
      // A drag must not end as a click on whatever link sits under the pointer.
      if (d.moved > 6) {
        const swallow = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(
          () => el.removeEventListener("click", swallow, { capture: true }),
          0,
        );
      }
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [durationSeconds, reverse, autoplay]);

  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      data-dragging={dragging}
      className={`auto-strip [touch-action:pan-y] overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
    >
      <style>{`
        .auto-strip img { -webkit-user-drag: none; }
        @media (prefers-reduced-motion: reduce) {
          .auto-strip { overflow-x: auto; cursor: auto; }
          .auto-strip > ul { transform: none !important; }
        }
      `}</style>
      <ul
        ref={trackRef}
        className={`flex w-max will-change-transform ${trackClassName}`}
      >
        {looped.map((item, i) => (
          <li
            key={i}
            className="shrink-0"
            aria-hidden={i >= items.length ? true : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
