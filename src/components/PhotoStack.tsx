"use client";

import { useState } from "react";
import { PhotoCarousel } from "./PhotoCarousel";
import type { PhotoGroup } from "@/lib/photos";

/**
 * Grouped photo viewer — tabs at top, carousel below.
 * Used when a project has multiple sub-carousels (e.g. "Post 1", "Post 2").
 * If there's only one group, falls back to a plain PhotoCarousel.
 */
export function PhotoStack({
  groups,
  alt,
}: {
  groups: PhotoGroup[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  if (groups.length === 0) return null;
  if (groups.length === 1) {
    return (
      <PhotoCarousel
        photos={groups[0].photos}
        alt={alt}
        label={groups[0].label || undefined}
      />
    );
  }

  return (
    <div>
      {/* Tab bar — horizontal scrollable on mobile */}
      <div className="mb-5 -mx-1 px-1 overflow-x-auto">
        <div className="flex gap-2 min-w-min">
          {groups.map((g, i) => (
            <button
              key={g.label + i}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`shrink-0 kicker px-4 py-2 rounded-full border transition cursor-pointer ${
                i === active
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink border-ink/25 hover:border-ink/60"
              }`}
            >
              {g.label}
              <span className="ml-2 text-current/60 font-normal normal-case tracking-normal">
                {g.photos.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <PhotoCarousel
        key={active /* reset internal state when group changes */}
        photos={groups[active].photos}
        alt={`${alt} — ${groups[active].label}`}
        label={groups[active].label || undefined}
      />
    </div>
  );
}

