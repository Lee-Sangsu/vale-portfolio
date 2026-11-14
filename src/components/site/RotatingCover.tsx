"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero photo of a chapter. With several photos in its `portada/` folder, a random one is picked every time the
 * page opens. The pick happens after load (the page is generated ahead of time, so the server cannot choose),
 * and the chosen photo fades in over the dark background.
 */
export function RotatingCover({ srcs }: { srcs: string[] }) {
  const [src, setSrc] = useState<string | null>(srcs.length === 1 ? srcs[0] : null);

  useEffect(() => {
    if (srcs.length > 1) setSrc(srcs[Math.floor(Math.random() * srcs.length)]);
  }, [srcs]);

  if (!src) return null;
  return (
    <Image
      key={src}
      src={src}
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-20 animate-[fadeIn_700ms_ease-out_both] object-cover motion-reduce:animate-none"
    />
  );
}
