"use client";

import { useState } from "react";
import clsx from "clsx";

export type AccordionItem = { title: string; body: string; meta?: string };

/**
 * Generic numbered accordion (Figma "Habilidades" / skills list).
 * Rows show "N. Title" + chevron; expanding reveals the body.
 */
export function NumberedAccordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="border-t border-[#e2e2dc]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.title} className="border-b border-[#e2e2dc]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-inter text-[19px] font-medium text-ink2 sm:text-[23px]">
                {i + 1}. {it.title}
              </span>
              <span
                className={clsx(
                  "shrink-0 text-[18px] text-[#555] transition-transform",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              >
                ⌄
              </span>
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[460px] font-inter text-[15px] leading-[1.6] text-muted">
                  {it.body}
                </p>
                {it.meta && (
                  <p className="mt-2 font-inter text-[12px] font-medium uppercase tracking-wide text-green-soft">
                    {it.meta}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
