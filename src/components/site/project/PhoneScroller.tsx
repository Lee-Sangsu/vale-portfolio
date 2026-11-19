"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The screen of a phone mockup when the screenshot is a full page: it sits in a scrollable box.
 * With a mouse, hovering the phone scrolls the page down on its own and leaving glides it back to the top.
 * On touch devices the box is not scrollable (a finger must keep scrolling the page), so the tour simply plays
 * when the phone comes into view and rewinds when it leaves. With a mouse, a wheel or trackpad takes over at once.
 */
export function PhoneScroller({
  src,
  width,
  height,
  sizes,
  priority,
  seconds,
}: {
  src: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  seconds: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const userDrove = useRef(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stop = () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
    const autoScroll = () => {
      if (reduced) return;
      stop();
      userDrove.current = false;
      const start = performance.now();
      const from = box.scrollTop;
      const max = box.scrollHeight - box.clientHeight;
      if (max <= from) return;
      const total = Math.max(1, seconds * 1000 * ((max - from) / max));
      const step = (now: number) => {
        if (userDrove.current) return;
        const t = Math.min(1, (now - start) / total);
        box.scrollTop = from + (max - from) * t;
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };
    const takeOver = () => {
      userDrove.current = true;
      stop();
    };
    const back = () => {
      stop();
      // Only the automatic tour glides back; if she scrolled it herself, it stays where she left it.
      if (userDrove.current) return;
      box.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    };
    const frame = box.closest(".phone-frame") ?? box;
    const canHover = window.matchMedia("(hover: hover)").matches;
    let observer: IntersectionObserver | null = null;
    if (canHover) {
      frame.addEventListener("pointerenter", autoScroll);
      frame.addEventListener("pointerleave", back);
    } else {
      // No mouse to hover with (phones, tablets): the tour starts on its own once most of the
      // phone is on screen and rewinds when it scrolls away, so it plays again next time.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) autoScroll();
          else back();
        },
        { threshold: 0.6 },
      );
      observer.observe(frame);
    }
    box.addEventListener("wheel", takeOver, { passive: true });
    box.addEventListener("pointerdown", takeOver);
    return () => {
      stop();
      observer?.disconnect();
      frame.removeEventListener("pointerenter", autoScroll);
      frame.removeEventListener("pointerleave", back);
      box.removeEventListener("wheel", takeOver);
      box.removeEventListener("pointerdown", takeOver);
    };
  }, [seconds]);

  return (
    <div
      ref={boxRef}
      className="phone-screen-box absolute inset-0 overflow-y-auto overscroll-y-contain [scrollbar-width:none] [@media(hover:none)]:overflow-hidden [@media(hover:none)]:overscroll-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={92}
        className="block h-auto w-full"
        draggable={false}
      />
    </div>
  );
}
