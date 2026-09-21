"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/content/types";

/**
 * iPod card for the Skills section. The screen behaves like a tiny playlist,
 * controlled by the click wheel below it.
 */
type Star = {
  className: string;
  width: number;
  height: number;
  rotate: number;
};
type Track = { en: string; es: string; metaEn: string; metaEs: string };

const STARS: Star[] = [
  {
    className: "left-[159px] top-[-43px] xl:left-[317px] xl:top-[-86px]",
    width: 40,
    height: 37,
    rotate: 0,
  },
  {
    className: "left-[95px] top-[-16px] xl:left-[189px] xl:top-[-32px]",
    width: 65,
    height: 61,
    rotate: 0,
  },
  {
    className: "left-[-46px] top-[-67px] xl:left-[-91px] xl:top-[-134px]",
    width: 28,
    height: 26,
    rotate: 0,
  },
  {
    className: "left-[125px] top-[85px] xl:left-[250px] xl:top-[169px]",
    width: 36,
    height: 34,
    rotate: 0,
  },
  {
    className: "left-[-62px] top-[80px] xl:left-[-124px] xl:top-[160px]",
    width: 61,
    height: 58,
    rotate: 0,
  },
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
  const shouldReduceMotion = useReducedMotion();
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
    <div className="relative h-[365px] w-[160px] overflow-visible">
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
        >
          <Image
            src="/pages/about/figma/skills-red-star.png"
            alt=""
            width={s.width}
            height={s.height}
            draggable={false}
            className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)] select-none"
            style={{ width: s.width, height: s.height }}
          />
        </motion.div>
      ))}

      {/* iPod body */}
      <div className="relative h-[311px] w-[160px] rounded-[18px] border border-[#e0e0da] bg-[#fafaf8] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
        {/* Screen */}
        <div className="absolute top-[13px] left-[12px] flex h-[82px] w-[134px] flex-col rounded-[6px] bg-[#8e9590] px-[7px] py-[6px] text-white/90">
          <div className="flex items-center justify-between text-[7px] font-semibold tracking-[0.08em] text-white/70 uppercase">
            <span>{es ? "Música" : "Music"}</span>
            <span aria-hidden="true">▰</span>
          </div>
          <div
            aria-live="polite"
            className="flex min-h-0 flex-1 flex-col justify-center"
          >
            <p className="truncate text-[10px] leading-tight font-semibold text-white">
              {activeTrack[locale]}
            </p>
            <p className="mt-1 truncate text-[8px] leading-none text-white/70">
              {es ? activeTrack.metaEs : activeTrack.metaEn}
            </p>
          </div>
          <div className="h-[2px] overflow-hidden rounded-full bg-black/15">
            <div
              className="h-full bg-white/70 transition-[width]"
              style={{ width: `${((active + 1) / TRACKS.length) * 100}%` }}
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
            className="absolute top-[11px] left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wide text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
          >
            MENU
          </button>
          <button
            type="button"
            onClick={controls.previous}
            aria-label={es ? "Canción anterior" : "Previous track"}
            className="absolute top-[52px] left-[12px] text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
          >
            ◄◄
          </button>
          <button
            type="button"
            onClick={controls.next}
            aria-label={es ? "Siguiente canción" : "Next track"}
            className="absolute top-[52px] left-[85px] text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
          >
            ►►
          </button>
          <button
            type="button"
            onClick={controls.next}
            aria-label={es ? "Reproducir selección" : "Play selection"}
            className="absolute top-[90px] left-[53.5px] text-[11px] leading-none text-[#888] transition-colors hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#555]"
          >
            ►
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
  );
}
