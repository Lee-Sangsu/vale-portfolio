"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** A laptop on its own: dark bezel around the screenshot, with the base below. */
function LaptopFrame({ src, aspect, priority }: { src: string; aspect: number; priority?: boolean }) {
  return (
    <div className="w-full">
      <div className="rounded-[18px] bg-[#10110d] p-[1.6%] pb-[1.9%] shadow-[0_24px_50px_rgba(0,0,0,0.22)]">
        <div className="relative overflow-hidden rounded-[6px] bg-white" style={{ aspectRatio: String(aspect) }}>
          <Image
            src={src}
            alt=""
            fill
            priority={priority}
            quality={92}
            sizes="(min-width: 1080px) 1000px, 92vw"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mx-auto -mt-px h-[14px] w-[112%] max-w-none -translate-x-[5.4%] rounded-b-[18px] bg-gradient-to-b from-[#d9d9d6] to-[#bdbdb9] shadow-[0_6px_14px_rgba(0,0,0,0.12)] sm:h-[18px]"
      >
        <div className="mx-auto h-[5px] w-[14%] rounded-b-[8px] bg-[#a7a7a3]" />
      </div>
    </div>
  );
}

/**
 * A laptop mockup whose screen is a hole in the image: the page screenshot sits behind it in a scrollable box, so
 * scrolling (wheel, trackpad, swipe, arrow keys) with the pointer over the screen moves the site inside the laptop.
 * When the site reaches its top or bottom the scroll goes on to the page, so nobody gets trapped.
 */
function ScrollingLaptop({
  frame,
  aspect,
  scroll,
  priority,
  hint,
}: {
  frame: string;
  aspect: number;
  scroll: NonNullable<LaptopScreen["scroll"]>;
  priority?: boolean;
  hint: { pointer: string; touch: string; label: string };
}) {
  const { hole } = scroll;
  const wrapRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef(false);
  const [used, setUsed] = useState(false);

  const updateThumb = () => {
    const screen = screenRef.current;
    const thumb = thumbRef.current;
    if (!screen || !thumb) return;
    const max = screen.scrollHeight - screen.clientHeight;
    const size = Math.max(0.12, screen.clientHeight / screen.scrollHeight);
    thumb.style.height = `${size * 100}%`;
    thumb.style.transform = `translateY(${max > 0 ? (screen.scrollTop / max) * (1 / size - 1) * 100 : 0}%)`;
  };

  useEffect(() => {
    updateThumb();
  }, []);

  // Any real interaction means the hint did its job.
  const interacted = () => {
    demoRef.current = false;
    setUsed(true);
  };

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: String(aspect) }}>
      <div
        className="absolute"
        style={{
          left: `${hole.left * 100}%`,
          top: `${hole.top * 100}%`,
          width: `${hole.width * 100}%`,
          height: `${hole.height * 100}%`,
        }}
      >
        <div
          ref={screenRef}
          tabIndex={0}
          role="region"
          aria-label={hint.label}
          onScroll={updateThumb}
          onWheel={interacted}
          onTouchStart={interacted}
          onKeyDown={interacted}
          className="h-full w-full overflow-y-auto overscroll-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#7b173b] [&::-webkit-scrollbar]:hidden"
        >
          <Image
            src={scroll.src}
            alt=""
            width={scroll.width}
            height={scroll.height}
            quality={92}
            sizes="(min-width: 1080px) 760px, 100vw"
            className="block h-auto w-full"
          />
        </div>
        {/* A thin scrollbar of our own (the real one is hidden) so it is clear the site moves. */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[3%] right-[0.8%] bottom-[3%] w-[0.5%] min-w-[3px]">
          <div ref={thumbRef} className="w-full rounded-full bg-white/55 shadow-[0_0_4px_rgba(0,0,0,0.4)]" />
        </div>
        {/* Tells people they can scroll the site: it fades out as soon as they do. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-[5%] flex justify-center transition-opacity duration-500 ${
            used ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="font-inter flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-black shadow-[0_6px_20px_rgba(0,0,0,0.35)] sm:text-[14px]">
            <span className="motion-safe:animate-bounce">↓</span>
            <span className="pointer-coarse:hidden">{hint.pointer}</span>
            <span className="hidden pointer-coarse:inline">{hint.touch}</span>
          </span>
        </div>
      </div>
      <Image
        src={frame}
        alt=""
        fill
        priority={priority}
        quality={92}
        sizes="(min-width: 1080px) 1000px, 92vw"
        className="pointer-events-none object-contain"
      />
    </div>
  );
}

type LaptopScreen = Parameters<typeof LaptopCarousel>[0]["screens"][number];

/** Website screenshots, each inside its own laptop, in a swipeable slider with previous/next arrows. */
export function LaptopCarousel({
  screens,
  previousLabel,
  nextLabel,
  scrollHint = {
    pointer: "Desplázate aquí para recorrer el sitio",
    touch: "Desliza aquí para recorrer el sitio",
    label: "Sitio web: desplázate para recorrerlo",
  },
}: {
  /** Texts of the hint over a laptop whose page scrolls (pointer devices / touch screens). */
  scrollHint?: { pointer: string; touch: string; label: string };
  screens: {
    src: string;
    aspect: number;
    framed?: boolean;
    /** A tall page screenshot behind the (transparent) screen of the mockup; it scrolls a bit on hover. */
    scroll?: { src: string; width: number; height: number; hole: { left: number; top: number; width: number; height: number } };
  }[];
  previousLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByPanel = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Each laptop snaps to the center, so move by how far the next/previous one sits from the track's center.
    const box = track.getBoundingClientRect();
    const center = box.left + box.width / 2;
    const offsets = Array.from(track.children).map((item) => {
      const r = item.getBoundingClientRect();
      return (r.left + r.right) / 2 - center;
    });
    const delta = direction === 1 ? offsets.find((d) => d > 8) : [...offsets].reverse().find((d) => d < -8);
    if (delta === undefined) return;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };


  // Transparent mockups carry empty shadow space below the laptop: pull the arrows up into it.
  const anyFramed = screens.some((screen) => screen.framed);

  return (
    <div className="mt-16 sm:mt-24">
      <ul
        ref={trackRef}
        // Side padding centers the first and last laptop when the slider is at either end.
        style={{
          paddingInline: "calc((100% - min(1000px, 92vw)) / 2)",
          scrollPaddingInline: "calc((100% - min(1000px, 92vw)) / 2)",
        }}
        className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:gap-20 [&::-webkit-scrollbar]:hidden"
      >
        {screens.map(({ src, aspect, framed, scroll }, i) => (
          <li key={src} className="w-[min(1000px,86vw)] shrink-0 snap-center">
            {scroll ? (
              <ScrollingLaptop frame={src} aspect={aspect} scroll={scroll} priority={i === 0} hint={scrollHint} />
            ) : framed ? (
              // A transparent mockup that already includes the laptop and its shadow: show it as it is.
              <div className="relative w-full" style={{ aspectRatio: String(aspect) }}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  quality={92}
                  sizes="(min-width: 1080px) 1000px, 92vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <LaptopFrame src={src} aspect={aspect} priority={i === 0} />
            )}
          </li>
        ))}
      </ul>

      {screens.length > 1 ? (
        <div className={`relative z-10 flex justify-center gap-3 ${anyFramed ? "-mt-6 sm:-mt-14" : "mt-6"}`}>
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
