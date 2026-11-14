"use client";

import Image from "next/image";
import { DiaryVideo } from "./DiaryVideo";

export type DiaryItem = { src: string; kind: "image" | "video"; aspect: number };

/** Splits the items between two rows keeping both about as long, in order. */
function splitRows(items: DiaryItem[]) {
  const rows: DiaryItem[][] = [[], []];
  const lengths = [0, 0];
  for (const item of items) {
    const target = lengths[0] <= lengths[1] ? 0 : 1;
    rows[target].push(item);
    lengths[target] += item.aspect;
  }
  return rows.filter((row) => row.length > 0);
}

const SECONDS_PER_ASPECT = 9; // how long one unit of tile width takes to cross; keeps the pace the same in any row

/**
 * Two linear rows of photos and clips, all the same height, each keeping its own proportions.
 * Every row drifts sideways in a loop (the second one the opposite way); hovering pauses them.
 * With reduced motion the rows stay still and can be scrolled by hand.
 */
export function DiaryMarquee({ items, label }: { items: DiaryItem[]; label: string }) {
  const rows = splitRows(items);

  return (
    <div className="diary-marquee" role="group" aria-label={label}>
      <style>{`
        .diary-marquee { --tile-h: clamp(210px, 20vw, 340px); --gap: clamp(14px, 1.4vw, 24px); }
        .diary-row { overflow: hidden; padding-block: 12px; }
        .diary-track { display: flex; width: max-content; gap: var(--gap); padding-right: var(--gap); }
        @media (prefers-reduced-motion: no-preference) {
          .diary-track { animation: diary-slide var(--dur) linear infinite; }
          .diary-row[data-dir="right"] .diary-track { animation-direction: reverse; }
          .diary-row:hover .diary-track { animation-play-state: paused; }
        }
        @media (prefers-reduced-motion: reduce) {
          .diary-row { overflow-x: auto; }
        }
        @keyframes diary-slide { to { transform: translateX(-50%); } }
      `}</style>
      <div className="flex flex-col" style={{ gap: "clamp(8px, 1vw, 14px)" }}>
        {rows.map((row, r) => {
          const duration = Math.max(30, row.reduce((n, i) => n + i.aspect, 0) * SECONDS_PER_ASPECT);
          // The set is doubled so the track can slide by exactly half of its width and loop seamlessly.
          const looped = [...row, ...row];
          return (
            <div key={r} className="diary-row" data-dir={r % 2 === 0 ? "left" : "right"}>
              <ul className="diary-track" style={{ ["--dur" as string]: `${duration}s` }}>
                {looped.map((item, i) => (
                  <li
                    key={`${item.src}-${i}`}
                    aria-hidden={i >= row.length ? true : undefined}
                    className="relative shrink-0 overflow-hidden rounded-[16px] bg-[#ecece7] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                    style={{ height: "var(--tile-h)", aspectRatio: String(item.aspect) }}
                  >
                    {item.kind === "video" ? (
                      <DiaryVideo src={item.src} label={label} />
                    ) : (
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 400px, 60vw"
                        className="object-cover"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
