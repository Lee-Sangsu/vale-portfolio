"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/content/types";
import { SONGS, songKey, type Song } from "@/content/songs";

/**
 * iPod card for the Skills section. The screen behaves like a tiny playlist of
 * the skills listed beside it, controlled by the click wheel below it.
 */
type Star = {
  className: string;
  width: number;
  height: number;
  rotate: number;
};

const STARS: Star[] = [
  {
    className: "left-[159px] top-[-43px] 2xl:left-[317px] 2xl:top-[-86px]",
    width: 40,
    height: 37,
    rotate: 0,
  },
  {
    className: "left-[95px] top-[-16px] 2xl:left-[189px] 2xl:top-[-32px]",
    width: 65,
    height: 61,
    rotate: 0,
  },
  {
    className: "left-[-46px] top-[-67px] 2xl:left-[-91px] 2xl:top-[-134px]",
    width: 28,
    height: 26,
    rotate: 0,
  },
  {
    className: "left-[125px] top-[85px] 2xl:left-[250px] 2xl:top-[169px]",
    width: 36,
    height: 34,
    rotate: 0,
  },
  {
    className: "left-[-62px] top-[80px] 2xl:left-[-124px] 2xl:top-[160px]",
    width: 61,
    height: 58,
    rotate: 0,
  },
];

let shuffledSongs: Song[] | null = null;

// Shuffled once per page load on the client; the server renders the list as-is.
function getShuffledSongs() {
  if (!shuffledSongs) {
    shuffledSongs = [...SONGS];
    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSongs[i], shuffledSongs[j]] = [
        shuffledSongs[j],
        shuffledSongs[i],
      ];
    }
  }
  return shuffledSongs;
}

const subscribeToSongs = () => () => {};
const getServerSongs = () => SONGS;

export function IpodCard({
  locale,
  tracks,
  scale = 1,
  previews = {},
}: {
  locale: Locale;
  tracks: string[];
  /** 30s preview URL per song (see songKey); missing or null means no audio. */
  previews?: Record<string, string | null>;
  /** Visual size multiplier; the card is drawn on a fixed 160px grid. */
  scale?: number;
}) {
  const es = locale === "es";
  const [active, setActive] = useState(0);
  // Advances with every click so songs keep rotating past the 4 skills.
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songs = useSyncExternalStore(
    subscribeToSongs,
    getShuffledSongs,
    getServerSongs,
  );
  const song = songs[((songIndex % songs.length) + songs.length) % songs.length];
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  // Stars can be dragged anywhere inside the surrounding section.
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    sectionRef.current = rootRef.current?.closest("section") ?? null;
  }, []);

  // The playlist keeps rotating on its own while nothing is playing; the wheel
  // just skips ahead.
  useEffect(() => {
    if (shouldReduceMotion || playing) return;
    const id = window.setInterval(() => setSongIndex((c) => c + 1), 4500);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, playing]);

  const previewUrl = previews[songKey(song)] ?? null;

  // Drive the <audio> element from `playing` + the current song. Playback only
  // ever starts from a click on the wheel, so autoplay rules are respected.
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.volume = 0.7;
      audioRef.current = audio;
    }
    const audio = audioRef.current;

    if (!playing) {
      audio.pause();
      return;
    }
    if (!previewUrl) {
      // No clip for this song: skip to the next one while the player is on.
      const id = window.setTimeout(() => setSongIndex((c) => c + 1), 0);
      return () => window.clearTimeout(id);
    }
    if (audio.src !== previewUrl) audio.src = previewUrl;
    audio.currentTime = 0;
    audio.play().catch(() => setPlaying(false));
  }, [playing, previewUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setSongIndex((c) => c + 1);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  });

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  const controls = useMemo(
    () => ({
      previous: () => {
        setActive((current) => (current - 1 + tracks.length) % tracks.length);
        setSongIndex((current) => current - 1);
      },
      next: () => {
        setActive((current) => (current + 1) % tracks.length);
        setSongIndex((current) => current + 1);
      },
      menu: () => setActive(0),
    }),
    [tracks.length],
  );

  return (
    // Scaling with a transform keeps every offset (stars, caption) in
    // proportion; the bottom margin reserves the extra height, and
    // transformPagePoint stops dragged stars from outrunning the cursor.
    <MotionConfig
      transformPagePoint={(point) => ({ x: point.x / scale, y: point.y / scale })}
    >
      <div
        className="origin-top"
        style={{
          transform: scale === 1 ? undefined : `scale(${scale})`,
          marginBottom: 365 * (scale - 1),
        }}
      >
        <div
          ref={rootRef}
          className="relative h-[365px] w-[160px] overflow-visible"
        >
          {/* Chrome stars */}
          {STARS.map((s, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 cursor-grab touch-none active:cursor-grabbing ${s.className}`}
              drag
              dragConstraints={sectionRef}
              dragElastic={0.14}
              dragMomentum={false}
              initial={{ rotate: s.rotate }}
              animate={{
                rotate: shouldReduceMotion ? s.rotate : s.rotate + 360,
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{
                rotate: {
                  duration: 9 + i * 1.4,
                  ease: "linear",
                  repeat: shouldReduceMotion ? 0 : Infinity,
                },
              }}
              style={{ width: s.width, height: s.height }}
            >
              <Image
                src="/pages/about/figma/skills-red-star.png"
                alt=""
                fill
                sizes="65px"
                draggable={false}
                className="object-fill drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)] select-none"
              />
            </motion.div>
          ))}

          {/* iPod body */}
          <div className="relative h-[311px] w-[160px] rounded-[18px] border border-[#e0e0da] bg-[#fafaf8] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            {/* Screen */}
            <div className="absolute top-[13px] left-[12px] flex h-[98px] w-[134px] flex-col rounded-[6px] bg-[#8e9590] px-[7px] py-[6px] text-white/90">
              <div className="flex items-center justify-between text-[7px] font-semibold tracking-[0.08em] text-white/70 uppercase">
                <span>{es ? "Música" : "Music"}</span>
                <span aria-hidden="true">{playing ? "▶" : "▰"}</span>
              </div>
              <div
                aria-live="polite"
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                <p className="line-clamp-2 text-[10px] leading-tight font-semibold text-white">
                  {active + 1}. {tracks[active]}
                </p>
                <div className="mt-3 min-w-0">
                  <p className="truncate text-[8.5px] leading-tight font-semibold text-white/90">
                    ♪ {song.title}
                  </p>
                  <p className="mt-[3px] truncate text-[7.5px] leading-none text-white/65">
                    {song.artist}
                  </p>
                </div>
              </div>
              <div className="h-[2px] overflow-hidden rounded-full bg-black/15">
                <div
                  className="h-full bg-white/70 transition-[width]"
                  style={{ width: `${((active + 1) / tracks.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Click wheel */}
            <div className="absolute top-[139px] left-[20px] size-[118px]">
              <Image
                src="/pages/about/figma/ipod-clickwheel-outer.svg"
                alt=""
                fill
                sizes="118px"
                className="object-contain"
              />
              <button
                type="button"
                onClick={controls.menu}
                aria-label={es ? "Volver al inicio" : "Back to menu"}
                className="absolute top-0 left-[44px] size-[28px] rounded-full text-[9px] font-semibold tracking-wide text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                <span aria-hidden="true" className="absolute top-[11px] left-px">
                  MENU
                </span>
              </button>
              <button
                type="button"
                onClick={controls.previous}
                aria-label={es ? "Canción anterior" : "Previous track"}
                className="absolute top-[40px] left-0 size-[28px] rounded-full text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[12px] left-[12px]"
                >
                  ◄◄
                </span>
              </button>
              <button
                type="button"
                onClick={controls.next}
                aria-label={es ? "Siguiente canción" : "Next track"}
                className="absolute top-[40px] left-[82px] size-[28px] rounded-full text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                <span aria-hidden="true" className="absolute top-[12px] left-[3px]">
                  ►►
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPlaying((current) => !current)}
                aria-label={
                  playing
                    ? es
                      ? "Pausar"
                      : "Pause"
                    : es
                      ? "Reproducir fragmento"
                      : "Play preview"
                }
                aria-pressed={playing}
                className="absolute top-[82px] left-[46px] size-[28px] rounded-full text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[8px] left-[7.5px]"
                >
                  {playing ? "❚❚" : "►"}
                </span>
              </button>
              <button
                type="button"
                onClick={controls.next}
                aria-label={es ? "Cambiar selección" : "Change selection"}
                className="absolute top-[36px] left-[36px] size-[46px] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
              >
                <Image
                  src="/pages/about/figma/ipod-clickwheel-inner.svg"
                  alt=""
                  fill
                  sizes="46px"
                  className="object-contain"
                />
              </button>
            </div>
          </div>

          <p className="font-inter text-muted absolute top-[325px] left-1/2 w-[240px] -translate-x-1/2 text-center text-[14px] leading-[1.3]">
            {es ? (
              <>
                Empecemos con música,
                <br />
                dale click a una canción ·.°☆
              </>
            ) : (
              <>
                Let&apos;s start with music,
                <br />
                click a song ·.°☆
              </>
            )}
          </p>
        </div>
      </div>
    </MotionConfig>
  );
}
