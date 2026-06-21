import Image from "next/image";
import { listPhotos } from "@/lib/photos";

/**
 * Auto-scrolling strip of client / partner logos.
 * Server-resolved from /photos/Brand I have work with/.
 * White-bg tiles with object-contain so logos read clean against the cream page.
 */
export function LogoMarquee({
  title,
  durationSeconds = 65,
}: {
  title: string;
  durationSeconds?: number;
}) {
  const logos = listPhotos("photos/Brand I have work with ");
  if (logos.length === 0) return null;

  // Duplicate for the seamless CSS marquee loop.
  const strip = [...logos, ...logos];

  return (
    <section
      className="border-t border-ink/15 py-16 sm:py-24"
      aria-label={title}
    >
      <div className="container-page mb-8">
        <span className="kicker-muted">{title}</span>
      </div>

      <div
        className="marquee-pause relative overflow-hidden"
        style={
          {
            ["--marquee-duration" as string]: `${durationSeconds}s`,
            maskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          } as React.CSSProperties
        }
      >
        <ul className="marquee-track flex items-center gap-5 w-max will-change-transform">
          {strip.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="shrink-0"
              aria-hidden={i >= logos.length}
            >
              <figure className="h-20 sm:h-24 w-40 sm:w-48 grid place-items-center bg-cream-deep rounded-2xl p-2 shadow-[0_10px_24px_-14px_rgba(40,49,50,0.18)]">
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={80}
                  className="max-h-full w-auto object-contain opacity-90"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
