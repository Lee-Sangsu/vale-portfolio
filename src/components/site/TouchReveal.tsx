"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * On devices without a mouse there is no hover, so the hover interaction of whatever sits inside
 * plays when the block scrolls into view instead. The wrapper exposes `data-reveal="on"` while it is
 * on screen; children react with `group-data-[reveal=on]/reveal:` classes. With a mouse nothing changes.
 */
export function TouchReveal({
  children,
  className,
  threshold = 0.45,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-reveal={on ? "on" : "off"} className={className} {...rest}>
      {children}
    </div>
  );
}
