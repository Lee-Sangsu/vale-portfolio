/**
 * Hero folder art for /projects. The folder is split into a back panel and
 * two front panels (closed / open) so the photos can sit *between* them and
 * look like they are inside the folder. Shapes come from Vale's folder SVGs
 * (carpeta abierta / carpeta cerrada); both share one 603×409 frame.
 */

const BACK_D =
  "M556.78 0.0859426C596.606 0.109181 593.521 12.9746 593.521 72.2285L594 358.975C594 377.475 592.5 402.975 559.5 408.975H108.668C89.5165 408.975 73.7171 393.98 72.7171 374.854L56.9808 73.8545C55.9042 53.2621 72.3114 35.9747 92.9319 35.9746H376.582C372.839 17.897 386.598 -0.0110482 406.015 5.11416e-06L556.78 0.0859426Z";

const FRONT_OPEN_D =
  "M11.2833 157.805C5.55773 135.056 22.7704 112.996 46.2286 113.018L500.931 113.448C517.432 113.464 531.81 124.696 535.819 140.703L591.795 364.229C597.486 386.954 580.3 408.975 556.873 408.975H102.562C86.064 408.975 71.6775 397.76 67.6507 381.761L11.2833 157.805Z";

// The closed folder is drawn 16.73px to the left of the open one; it is
// translated back so both fronts line up with the same back panel.
const FRONT_CLOSED_D =
  "M0.953082 107.03C-4.30734 81.9348 12.8737 57.9483 36.0901 57.9746L484.565 58.4836C501.324 58.5026 515.859 71.3394 519.638 89.4583L576.056 359.963C581.284 385.03 564.132 408.975 540.947 408.975H92.8636C76.1064 408.975 61.5603 396.156 57.7635 378.043L0.953082 107.03Z";
const CLOSED_SHIFT = 16.73;

// Same translucent grey the folder had before, so the photos inside stay
// visible through the front panel; the outline keeps the SVG's black stroke.
const FILL = "#525252";
const OPACITY = 0.45;
const INK = "black";

export function FolderBack({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 603 409"
      fill="none"
      className={className}
      data-projects-folder="back"
    >
      <path d={BACK_D} fill={FILL} fillOpacity={OPACITY} />
    </svg>
  );
}

function FrontPanel({
  d,
  maskId,
  shift = 0,
  className,
  folder,
}: {
  d: string;
  maskId: string;
  shift?: number;
  className?: string;
  folder: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 603 409"
      fill="none"
      className={className}
      data-projects-folder={folder}
    >
      <g transform={`translate(${shift} 0)`}>
        <path d={d} fill={FILL} fillOpacity={OPACITY} />
        <mask id={maskId} fill="white">
          <path d={d} />
        </mask>
        <path d={d} stroke={INK} strokeWidth={2} mask={`url(#${maskId})`} />
      </g>
    </svg>
  );
}

/** Front of the folder: closed by default, open on `group-hover`. */
export function FolderFront({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FrontPanel
        d={FRONT_CLOSED_D}
        shift={CLOSED_SHIFT}
        maskId="projects-folder-closed-mask"
        folder="front-closed"
        className="absolute inset-0 size-full transition-opacity duration-200 ease-in group-hover:opacity-0 motion-reduce:transition-none"
      />
      <FrontPanel
        d={FRONT_OPEN_D}
        maskId="projects-folder-open-mask"
        folder="front-open"
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-200 ease-in group-hover:opacity-100 motion-reduce:transition-none"
      />
    </div>
  );
}

/** Wine-colored tab + body behind the trip/name/years card. */
export function WineCardBackground({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 245 131"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      data-projects-folder="meta-bg"
    >
      <path
        d="M182 0C176.477 0 172 4.47715 172 10V12H17C9.8203 12 4 17.8203 4 25V118C4 125.18 9.8203 131 17 131H230C237.18 131 243 125.18 243 118V10C243 4.47715 238.523 0 233 0H182Z"
        fill="#5D102C"
      />
      <path
        d="M0.501438 23.4831C0.227568 16.1191 6.1233 10 13.4925 10H218.018C224.577 10 230.108 14.8856 230.918 21.3941L242.686 115.925C243.65 123.671 237.618 130.514 229.812 130.531L17.0516 130.974C10.0494 130.988 4.29376 125.454 4.03353 118.457L0.501438 23.4831Z"
        fill="#7B173B"
      />
    </svg>
  );
}
