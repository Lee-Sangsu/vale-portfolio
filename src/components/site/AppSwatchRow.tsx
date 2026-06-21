import Image from "next/image";
import clsx from "clsx";
import { tools } from "@/content/about";

/**
 * Row of tool chips: a field-grey tile holding the real app logo, with the
 * tool name underneath. Valeria's stack — Figma, Illustrator, Photoshop,
 * Framer, Canva, Notion, CapCut, ManyChat. Data lives in content/about.ts
 * (`tools`); drop a new logo in /public/tools and add an entry there.
 */
export function AppSwatchRow({ className }: { className?: string }) {
  return (
    <ul
      className={clsx(
        "flex flex-wrap items-start justify-center gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-6",
        className,
      )}
    >
      {tools.map((t) => (
        <li key={t.slug} className="flex w-[64px] flex-col items-center gap-2 sm:w-[76px]">
          <div className="flex size-[60px] items-center justify-center rounded-[16px] bg-[#edece7] transition-transform duration-200 hover:-translate-y-1 sm:size-[72px] sm:rounded-[18px]">
            <Image
              src={t.icon}
              alt={t.label}
              width={48}
              height={48}
              className="size-[40px] object-contain sm:size-[48px]"
            />
          </div>
          <span className="text-center font-inter text-[11px] font-medium leading-tight text-muted sm:text-[12px]">
            {t.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
