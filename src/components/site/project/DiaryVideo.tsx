"use client";

import { useEffect, useState } from "react";

/**
 * A silent looping clip for a collage tile. People who prefer reduced motion get a still first frame
 * with playback controls instead of autoplay.
 */
export function DiaryVideo({ src, label }: { src: string; label: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      /* keep autoplay */
    }
  }, []);

  return (
    <video
      src={`${src}#t=0.1`}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!reduced}
      controls={reduced}
      className="absolute inset-0 size-full object-cover"
    />
  );
}
