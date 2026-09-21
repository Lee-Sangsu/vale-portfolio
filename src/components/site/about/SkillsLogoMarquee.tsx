"use client";

import Image from "next/image";
import { useState } from "react";
import { tools } from "@/content/about";
import type { Locale } from "@/content/types";

const TOOL_ORDER = [
  "figma",
  "manychat",
  "photoshop",
  "capcut",
  "framer",
  "illustrator",
  "canva",
  "notion",
] as const;

const orderedTools = TOOL_ORDER.map((slug) => {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    throw new Error(`Missing tool logo: ${slug}`);
  }

  return tool;
});

const groupClassName =
  "flex shrink-0 gap-6 pr-6 lg:w-[954px] lg:gap-[54px] lg:pr-0";

const LABELS: Record<Locale, { list: string; pause: string; resume: string }> =
  {
    en: {
      list: "Design tools",
      pause: "Pause logo animation",
      resume: "Resume logo animation",
    },
    es: {
      list: "Herramientas de diseño",
      pause: "Pausar animación de logos",
      resume: "Reanudar animación de logos",
    },
  };

function LogoChip({
  icon,
  label,
  decorative = false,
}: {
  icon: string;
  label: string;
  decorative?: boolean;
}) {
  return (
    <li className="flex size-[72px] shrink-0 items-center justify-center rounded-[18px] bg-[#edece7]">
      <Image
        src={icon}
        alt={decorative ? "" : label}
        width={48}
        height={48}
        className="size-[48px] object-contain"
      />
    </li>
  );
}

export function SkillsLogoMarquee({ locale }: { locale: Locale }) {
  const [isPaused, setIsPaused] = useState(false);
  const controlLabel = isPaused ? LABELS[locale].resume : LABELS[locale].pause;

  return (
    <div>
      <div
        className="skills-logo-viewport lg:overflow-visible"
        data-paused={isPaused}
      >
        <div className="skills-logo-track flex w-max lg:w-full lg:justify-center">
          <ul aria-label={LABELS[locale].list} className={groupClassName}>
            {orderedTools.map((tool) => (
              <LogoChip key={tool.slug} {...tool} />
            ))}
          </ul>

          <ul aria-hidden="true" className={`${groupClassName} lg:hidden`}>
            {orderedTools.map((tool) => (
              <LogoChip key={tool.slug} {...tool} decorative />
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label={controlLabel}
        aria-pressed={isPaused}
        title={controlLabel}
        onClick={() => setIsPaused((paused) => !paused)}
        className="skills-logo-toggle text-ink2 mt-2 ml-auto flex size-9 items-center justify-center rounded-full border border-[#d6d6d0] bg-white text-[14px] shadow-sm lg:hidden"
      >
        <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
