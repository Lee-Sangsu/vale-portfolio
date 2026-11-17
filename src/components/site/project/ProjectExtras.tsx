import type { Block, Extra, Stat } from "@/content/portfolio";
import { PhoneFrame } from "@/components/site/project/ProjectTemplates";

/** Phone screens shown next to the text section with the same title. */
export type SectionScreens = { title: string; items: { src: string; aspect: number }[] };

function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={`${stat.value}-${stat.label}`}
          className="rounded-[14px] bg-[#f3f2ee] px-5 py-6"
        >
          <dd className="font-inter text-ink2 text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-bold">
            {stat.value}
          </dd>
          <dt className="font-inter text-ink mt-3 text-[14px] leading-[1.4]">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="font-inter text-ink max-w-[680px] text-[17px] leading-[1.6]">
          {block.text}
        </p>
      );
    case "chips":
      return (
        <ul className="flex flex-wrap gap-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="font-inter text-ink2 rounded-full border border-[#d1d1cc] bg-white px-4 py-2 text-[14px] leading-snug"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => {
            const [, number, text] = item.match(/^(\d{2})\s+(.*)$/) ?? [];
            return (
              <li
                key={item}
                className="flex gap-4 rounded-[12px] bg-[#f3f2ee] px-5 py-4"
              >
                <span className="font-inter text-ink2 text-[22px] leading-none font-bold opacity-40">
                  {number}
                </span>
                <span className="font-inter text-ink text-[16px] leading-snug">
                  {text}
                </span>
              </li>
            );
          })}
        </ol>
      );
    case "rows":
      return (
        <ul className="divide-y divide-[#e2e2dc] border-y border-[#e2e2dc]">
          {block.rows.map((row, index) => (
            <li
              key={index}
              className="font-inter grid gap-x-6 gap-y-1 py-3 text-[16px] leading-snug sm:grid-cols-[96px_minmax(0,1fr)]"
            >
              <span className="text-ink2 font-semibold">{row[0]}</span>
              <span className="text-ink">{row.slice(1).join(" · ")}</span>
            </li>
          ))}
        </ul>
      );
    case "items":
      return (
        <dl className="grid gap-5">
          {block.items.map((item) => (
            <div key={item.lead}>
              <dt className="font-inter text-ink2 text-[17px] font-semibold">
                {item.lead}
              </dt>
              {item.text ? (
                <dd className="font-inter text-ink mt-1 max-w-[680px] text-[16px] leading-[1.55]">
                  {item.text}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="font-inter w-full max-w-[560px] border-collapse text-left text-[16px]">
            <thead>
              <tr className="border-b border-[#c8c8c2] text-ink2">
                {block.head.map((cell) => (
                  <th key={cell} className="py-2 pr-6 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index} className="border-b border-[#e2e2dc] text-ink">
                  {row.map((cell, i) => (
                    <td key={i} className="py-2.5 pr-6">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** The "Secciones extra" of a project: stat cards first, then one editorial row per section. */
export function ProjectExtras({ extras, screens }: { extras: Extra[]; screens?: SectionScreens[] }) {
  if (!extras.length) return null;
  const screensFor = (title: string) => screens?.find((g) => g.title === title)?.items ?? [];

  const statSections = extras.filter((e) => Array.isArray(e.stats));
  const textSections = extras.filter((e) => !Array.isArray(e.stats));

  return (
    <section className="bg-white pb-24 sm:pb-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {statSections.map((extra) => (
          <div key={extra.title} className="mb-14">
            <h3 className="font-inter text-ink2 mb-6 text-[24px] font-semibold">
              {extra.title}
            </h3>
            <StatCards stats={extra.stats as Stat[]} />
          </div>
        ))}

        <div className="divide-y divide-[#e2e2dc] border-t border-[#e2e2dc]">
          {textSections.map((extra, index) => {
            const shots = screensFor(extra.title);
            if (shots.length) {
              // Text on the left, its screens on the right: the reader sees the decision and the result together.
              return (
                <article
                  key={`${extra.title}-${index}`}
                  className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
                >
                  <div>
                    <h3 className="font-inter text-ink2 text-[24px] leading-[1.15] font-semibold sm:text-[28px]">
                      {extra.title}
                    </h3>
                    <div className="mt-6 flex flex-col gap-5">
                      {extra.blocks.map((block, i) => (
                        <BlockView key={i} block={block} />
                      ))}
                    </div>
                  </div>
                  <ul
                    className={`grid items-start gap-4 sm:gap-6 ${shots.length === 1 ? "mx-auto w-full max-w-[280px] grid-cols-1" : shots.length === 2 ? "mx-auto w-full max-w-[560px] grid-cols-2" : "grid-cols-3"}`}
                  >
                    {shots.map(({ src, aspect }) => (
                      <li key={src}>
                        <PhoneFrame
                          src={src}
                          sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                          aspect={aspect}
                        />
                      </li>
                    ))}
                  </ul>
                </article>
              );
            }
            return (
              <article
                key={`${extra.title}-${index}`}
                className="grid gap-5 py-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-16"
              >
                <h3 className="font-inter text-ink2 text-[24px] leading-[1.15] font-semibold sm:text-[28px]">
                  {extra.title}
                </h3>
                <div className="flex flex-col gap-5">
                  {extra.blocks.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
