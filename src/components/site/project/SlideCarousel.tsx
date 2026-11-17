"use client";

import Image from "next/image";
import { useRef } from "react";

/** Horizontal slide viewer for decks: scroll-snap panels with previous/next arrows. */
export function SlideCarousel({
  slides,
  previousLabel,
  nextLabel,
  tall = false,
}: {
  /** Each slide with its width / height, so mixed horizontal and vertical pieces keep their proportions. */
  slides: { src: string; aspect: number }[];
  previousLabel: string;
  nextLabel: string;
  /** Decks and boards: a touch taller than the default strip. Nothing is cropped either way. */
  tall?: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByPanel = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Jump to the next / previous piece by its own position, so pieces of different widths all get reached.
    // Each piece snaps with the track's scroll padding in front of it, so that padding is part of its scroll position.
    const trackLeft = track.getBoundingClientRect().left;
    const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const lefts = Array.from(track.children).map(
      (item) =>
        item.getBoundingClientRect().left -
        trackLeft +
        track.scrollLeft -
        padding,
    );
    const current = track.scrollLeft;
    const target =
      direction === 1
        ? lefts.find((left) => left > current + 8)
        : [...lefts].reverse().find((left) => left < current - 8);
    track.scrollTo({
      left: target ?? (direction === 1 ? track.scrollWidth : 0),
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10">
      {/* The scroll box is a little wider than the text on both sides (and taller), so each slide's own shadow is never clipped at the start. */}
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory items-center [scroll-padding-inline:1.25rem] gap-4 overflow-x-auto scroll-smooth px-5 py-8 [scrollbar-width:none] sm:-mx-8 sm:[scroll-padding-inline:2rem] sm:gap-6 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ src, aspect }, i) => (
          <li
            key={src}
            className="relative shrink-0 snap-start overflow-hidden rounded-[10px] bg-[#ecece7] shadow-[0_10px_32px_rgba(0,0,0,0.16)]"
            // Every piece keeps its own proportions at a shared height; a wide one is capped by the viewport and gets
            // shorter instead of cropped, so nothing is ever cut and the next piece always peeks in.
            style={{
              aspectRatio: String(aspect),
              width: `min(${aspect > 1.4 ? 72 : 92}%, calc(clamp(240px, 40vw, ${tall ? 560 : 540}px) * ${aspect}))`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1280px) 1100px, 92vw"
              priority={i === 0}
              quality={92}
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {slides.length > 1 ? (
        <div className="mt-2 flex gap-3">
          {[
            { dir: -1 as const, label: previousLabel, glyph: "←" },
            { dir: 1 as const, label: nextLabel, glyph: "→" },
          ].map(({ dir, label, glyph }) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollByPanel(dir)}
              aria-label={label}
              className="font-inter text-ink2 flex size-11 items-center justify-center rounded-full border border-[#d1d1cc] bg-white text-[18px] transition-colors hover:bg-[#f4f4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b173b]"
            >
              <span aria-hidden="true">{glyph}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
