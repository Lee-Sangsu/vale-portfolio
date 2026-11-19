import Image from "next/image";
import type { Locale } from "@/content/types";
import { aboutHeroTagline } from "@/content/about";
import { SiteNav } from "@/components/site/SiteNav";

/**
 * About hero — full-bleed cloud sky with a scattered sticker collage around
 * a gradient-filled "About me" headline, a short subtitle and a black pill
 * that anchors down to the "My story" section.
 *
 * The 8 cutout stickers are absolutely positioned on md+ (rotations from the
 * Figma spec); on mobile only 3 are kept to avoid clutter.
 */
type Sticker = {
  src: string;
  alt: string;
  /** desktop absolute position + size */
  className: string;
  rotate: number;
  /** keep this sticker on mobile too */
  mobile?: boolean;
};

const STICKERS: Sticker[] = [
  {
    src: "/sobre-mi/figma/hero-paint-set-cutout.png",
    alt: "",
    className: "left-[4%] top-[25%] w-[78px] md:left-[3%] md:top-[14%] md:w-[120px] lg:w-[173px]",
    rotate: 12.4,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-screenshot-sticker.png",
    alt: "",
    className: "left-[36%] top-[19%] w-[74px] md:left-[24%] md:top-[10%] md:w-[150px] lg:w-[220px]",
    rotate: -20.61,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-sticker-black-graphic.png",
    alt: "",
    className: "right-[4%] top-[22%] w-[88px] md:right-[6%] md:top-[12%] md:w-[150px] lg:w-[210px]",
    rotate: 0,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-flowers-cutout.png",
    alt: "",
    className: "-left-[3%] top-[70%] w-[104px] md:-left-[2%] md:top-[64%] md:w-[150px] lg:w-[200px]",
    rotate: 6.26,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-green-worm.png",
    alt: "",
    className: "left-[15%] top-[52%] w-[120px] lg:w-[160px]",
    rotate: -8.94,
  },
  {
    src: "/sobre-mi/figma/hero-fruit-photo.png",
    alt: "",
    className: "left-[36%] top-[84%] w-[54px] md:left-[33%] md:top-[74%] md:w-[80px] lg:w-[110px]",
    rotate: 11.87,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-red-plane.png",
    alt: "",
    className: "right-[6%] top-[73%] w-[140px] md:right-[14%] md:top-[66%] md:w-[200px] lg:w-[280px]",
    rotate: 0,
    mobile: true,
  },
  {
    src: "/sobre-mi/figma/hero-phone.png",
    alt: "",
    className: "-right-[1%] top-[45%] w-[66px] md:-right-[2%] md:top-[44%] md:w-[130px] lg:w-[180px]",
    rotate: -13.64,
    mobile: true,
  },
];

export function AboutHero({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="relative isolate min-h-[640px] overflow-hidden sm:min-h-[820px] lg:min-h-[900px]">
      {/* Cloud-sky background (Figma node 207:563) — the About hero uses a
          fluffy-cloud sky, distinct from the home hero's flower/palace scene. */}
      <Image
        src="/sobre-mi/figma/sky-clouds.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Top white→transparent fade for nav legibility */}
      <div className="absolute inset-x-0 top-0 z-20 h-[160px] bg-gradient-to-b from-white/70 to-transparent" />

      <SiteNav tone="light" />

      {/* Sticker collage */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {STICKERS.map((s) => (
          <div
            key={s.src}
            className={`absolute ${s.className} ${s.mobile ? "" : "hidden md:block"}`}
            style={{ transform: `rotate(${s.rotate}deg)` }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={300}
              height={300}
              className="h-auto w-full drop-shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
            />
          </div>
        ))}
      </div>

      {/* Center stack */}
      <div className="relative z-20 mx-auto flex min-h-[640px] max-w-[900px] flex-col items-center justify-center px-5 pb-20 pt-[150px] text-center sm:min-h-[820px] lg:min-h-[900px]">
        <h1
          className="font-display font-bold leading-[0.7] tracking-[0.02em] text-[68px] sm:text-[110px] lg:text-[150px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #dbe3ed 0%, #ffffff 48%, #bdc9d9 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.18))",
            // Quinn ships a broken "me" ligature that renders as garbled glyphs;
            // the Figma headline disables ligatures (liga 0) for the same reason.
            fontFeatureSettings: '"liga" 0',
          }}
        >
          {es ? "Sobre mí" : "About me"}
        </h1>

        <p className="mt-7 max-w-[620px] px-3 font-inter text-[15px] font-bold leading-snug text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] sm:text-[20px]">
          {aboutHeroTagline[locale]}
        </p>
      </div>
    </section>
  );
}
