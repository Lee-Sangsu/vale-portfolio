"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * An Instagram post, as it reads in the feed: the account on top, the pieces of the carousel swiping inside the
 * frame, the action row and the dots below. Arrows and the counter are ours, so every piece can be reached.
 */
export function PostCarousel({
  slides,
  previousLabel,
  nextLabel,
  slideLabel,
  aspect = 0.8,
  account = "",
  caption,
}: {
  slides: string[];
  previousLabel: string;
  nextLabel: string;
  /** "Ver pieza" / "Show slide": the slide number is appended. */
  slideLabel: string;
  /** width / height of the pieces (all the pieces of a post share it): 0.8 for 4:5, 1 for squares... */
  aspect?: number;
  /** Account name shown in the post header. */
  account?: string;
  /** One line under the post (the number of pieces, a title...). */
  caption?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = slides.length;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(count - 1, index));
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const initial = account.replace(/^@/, "").charAt(0).toUpperCase();

  return (
    <article className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[18px] border border-[#e6e6e1] bg-white shadow-[0_14px_44px_rgba(0,0,0,0.10)]">
      {/* Header: avatar, account, menu */}
      <header className="flex items-center gap-3 px-4 py-3">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7b173b,#ff7ab6)] text-[13px] font-bold text-white"
        >
          {initial}
        </span>
        <span className="font-inter text-ink2 text-[14px] font-semibold">{account}</span>
        <span aria-hidden="true" className="font-inter ml-auto text-[18px] leading-none text-[#555]">
          ···
        </span>
      </header>

      {/* The pieces, one at a time, swiping inside the frame */}
      <div className="group relative bg-[#ecece7]" style={{ aspectRatio: String(aspect) }}>
        <ul
          ref={trackRef}
          onScroll={onScroll}
          aria-label={slideLabel}
          className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((src, index) => (
            <li key={src} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={`${slideLabel} ${index + 1}`}
                fill
                sizes="(min-width: 640px) 520px, 100vw"
                priority={index === 0}
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        {count > 1 ? (
          <>
            <span className="font-inter absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white">
              {active + 1}/{count}
            </span>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label={previousLabel}
              disabled={active === 0}
              className="absolute top-1/2 left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[15px] text-black shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-opacity hover:bg-white disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b173b]"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label={nextLabel}
              disabled={active === count - 1}
              className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[15px] text-black shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-opacity hover:bg-white disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b173b]"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        ) : null}
      </div>

      {/* Action row + dots */}
      <footer className="px-4 pt-3 pb-4">
        <div className="relative flex items-center gap-4 text-[#111]">
          <Heart />
          <Comment />
          <Send />
          {count > 1 ? (
            <span className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5" aria-hidden="true">
              {slides.map((src, index) => (
                <span
                  key={src}
                  className={`size-1.5 rounded-full transition-colors ${index === active ? "bg-[#0095f6]" : "bg-[#c8c8c3]"}`}
                />
              ))}
            </span>
          ) : null}
          <Bookmark className="ml-auto" />
        </div>
        {caption ? (
          <p className="font-inter mt-3 text-[13px] leading-snug text-[#333]">
            <span className="font-semibold">{account}</span> {caption}
          </p>
        ) : null}
      </footer>
    </article>
  );
}

function Heart() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function Comment() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

function Send() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

function Bookmark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
