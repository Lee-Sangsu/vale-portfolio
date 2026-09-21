import Image from "next/image";
import { tools } from "@/content/about";

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

export function SkillsLogoMarquee() {
  return (
    <div className="skills-logo-viewport lg:overflow-visible">
      <div className="skills-logo-track flex w-max lg:w-full lg:justify-center">
        <ul aria-label="Design tools" className={groupClassName}>
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
  );
}
