"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Locale } from "@/content/types";

/**
 * iPod card for the Skills section. The screen behaves like a tiny playlist,
 * controlled by the click wheel below it.
 */
type Star = { className: string; size: number; rotate: number };
type Track = { en: string; es: string; metaEn: string; metaEs: string };

const STARS: Star[] = [
  { className: "-left-7 top-2", size: 58, rotate: -12 },
  { className: "-right-8 top-10", size: 65, rotate: 14 },
  { className: "-left-4 bottom-8", size: 36, rotate: 8 },
  { className: "-right-5 bottom-2", size: 48, rotate: -18 },
  { className: "left-[87px] -top-7", size: 26, rotate: 6 },
];

const TRACKS: Track[] = [
  {
    en: "Strategy & Brand",
    es: "Estrategia & Marca",
    metaEn: "Visual systems",
    metaEs: "Sistemas visuales",
  },
  {
    en: "Product · UX",
    es: "Producto · UX",
    metaEn: "Apps and web",
    metaEs: "Apps y web",
  },
  {
    en: "Content & Social",
    es: "Contenido & Redes",
    metaEn: "Campaign rhythm",
    metaEs: "Ritmo de campaña",
  },
  {
    en: "Events",
    es: "Eventos",
    metaEn: "Community moments",
    metaEs: "Momentos comunidad",
  },
];

export function IpodCard({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const [active, setActive] = useState(0);
  const activeTrack = TRACKS[active];

  const controls = useMemo(
    () => ({
      previous: () =>
        setActive((current) => (current - 1 + TRACKS.length) % TRACKS.length),
      next: () => setActive((current) => (current + 1) % TRACKS.length),
      menu: () => setActive(0),
    }),
    [],
  );

  return (
    <div className="relative w-[200px]">
      {/* Chrome stars */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute z-20 cursor-grab touch-none active:cursor-grabbing ${s.className}`}
          drag
          dragConstraints={{ top: -24, right: 24, bottom: 24, left: -24 }}
          dragElastic={0.14}
          dragMomentum={false}
          initial={{ rotate: s.rotate }}
          animate={{ rotate: s.rotate + 360 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{
            rotate: {
              duration: 9 + i * 1.4,
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          <Image
            src="/figma/about/skills-red-star.png"
            alt=""
            width={s.size}
            height={s.size}
            draggable={false}
            className="h-auto select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
            style={{ width: s.size }}
          />
        </motion.div>
      ))}

      {/* iPod body */}
      <div className="relative flex flex-col items-center gap-5 rounded-[18px] border border-[#e0e0da] bg-[#fafaf8] px-5 pb-6 pt-5 shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
        {/* Screen */}
        <div className="flex h-[150px] w-full flex-col rounded-[6px] bg-[#8e9590] p-2 text-white/90">
          <div className="flex items-center justify-between text-[9px] font-semibold tracking-wide text-white/70">
            <span>{es ? "Música" : "MENU"}</span>
            <span aria-hidden="true">▶</span>
          </div>
          <div className="mt-2 flex flex-1 flex-col justify-center gap-[6px] px-1">
            {TRACKS.map((track, i) => (
              <button
                key={track.en}
                type="button"
                onClick={() => setActive(i)}
                className={
                  "truncate rounded-[3px] px-1 text-left text-[10px] transition-colors " +
                  (i === active
                    ? "bg-white/85 font-semibold text-[#3c423e]"
                    : "text-white/85 hover:bg-white/15")
                }
              >
                {track[locale]}
              </button>
            ))}
          </div>
          <div className="mt-1 min-h-[18px] rounded-[4px] bg-black/10 px-1.5 py-1 text-[9px] font-medium leading-none text-white/80">
            {es ? activeTrack.metaEs : activeTrack.metaEn}
          </div>
        </div>

        {/* Click wheel */}
        <div className="relative size-[118px]">
          <Image
            src="/figma/about/ipod-clickwheel-outer.svg"
            alt=""
            fill
            sizes="118px"
            className="object-contain"
          />
          <button
            type="button"
            onClick={controls.menu}
            aria-label={es ? "Volver al inicio" : "Back to menu"}
            className="absolute left-1/2 top-2 -translate-x-1/2 text-[9px] font-semibold tracking-wide text-[#888] transition-colors hover:text-[#333]"
          >
            MENU
          </button>
          <button
            type="button"
            onClick={controls.previous}
            aria-label={es ? "Canción anterior" : "Previous track"}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#888] transition-colors hover:text-[#333]"
          >
            ◄◄
          </button>
          <button
            type="button"
            onClick={controls.next}
            aria-label={es ? "Siguiente canción" : "Next track"}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#888] transition-colors hover:text-[#333]"
          >
            ►►
          </button>
          <button
            type="button"
            onClick={controls.next}
            aria-label={es ? "Reproducir selección" : "Play selection"}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-[#888] transition-colors hover:text-[#333]"
          >
            ►
          </button>
          <button
            type="button"
            onClick={controls.next}
            aria-label={es ? "Cambiar selección" : "Change selection"}
            className="absolute left-1/2 top-1/2 size-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <Image
              src="/figma/about/ipod-clickwheel-inner.svg"
              alt=""
              fill
              sizes="46px"
              className="object-contain"
            />
          </button>
        </div>
      </div>

      <p className="mt-3 text-center font-inter text-[13px] text-muted">
        {es ? "El iPod de Val · portfolio mix" : "Val's iPod · portfolio mix"}
      </p>
    </div>
  );
}
