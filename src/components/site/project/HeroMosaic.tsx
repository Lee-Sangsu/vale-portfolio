import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type MosaicItem = { src: string; aspect: number; href?: string; label?: string };

/** Spreads the pieces over `rows` justified rows, balancing their total width so the rows end up about the same height. */
export function layoutMosaic(items: MosaicItem[], rows = 3): MosaicItem[][] {
  const out: MosaicItem[][] = Array.from({ length: rows }, () => []);
  const sums = new Array(rows).fill(0);
  items.forEach((item) => {
    let r = 0;
    for (let i = 1; i < rows; i++) if (sums[i] < sums[r]) r = i;
    out[r].push(item);
    sums[r] += item.aspect;
  });
  return out.filter((row) => row.length);
}

/**
 * A wall of work, Pinterest-style, as the hero of a parent project: three justified rows where every piece keeps
 * its own proportion (no crops). Phones show the first two pieces of each row, tablets four, desktops all.
 * Pieces with an `href` (the covers of the projects inside) open that project.
 */
export function HeroMosaic({ items, title }: { items: MosaicItem[]; title: string }) {
  const rows = layoutMosaic(items);
  return (
    <div role="img" aria-label={title} className="flex w-full flex-col gap-2 sm:gap-3">
      {rows.map((row, r) => (
        <div key={r} className="flex gap-2 sm:gap-3">
          {row.map((item, i) => {
            const hide = i >= 4 ? "max-lg:hidden" : i >= 2 ? "max-sm:hidden" : "";
            const cls = `group relative block overflow-hidden rounded-[10px] bg-[#ecece7] shadow-[0_6px_18px_rgba(0,0,0,0.10)] ${hide}`;
            const style = { flex: `${item.aspect} 1 0%`, aspectRatio: String(item.aspect) };
            const img = (
              <Image
                src={item.src}
                alt={item.label ?? ""}
                fill
                priority={r === 0}
                quality={92}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 22vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            );
            return item.href ? (
              <Link key={item.src} href={item.href} className={cls} style={style} aria-label={item.label}>
                {img}
              </Link>
            ) : (
              <div key={item.src} className={cls} style={style}>
                {img}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
