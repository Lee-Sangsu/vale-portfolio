import type { Locale } from "@/content/types";
import type { Case } from "@/content/portfolio";

const OVERVIEW_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    Cliente: "Cliente",
    Clientes: "Clientes",
    "Mi rol": "Mi rol",
    "Tipo de proyecto": "Tipo de proyecto",
  },
  en: {
    Cliente: "Client",
    Clientes: "Clients",
    "Mi rol": "My role",
    "Tipo de proyecto": "Project type",
  },
};

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };

/** Splits a card body into paragraphs; consecutive "- " lines become one bullet list. */
function bodyBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const part of body.split("\n\n")) {
    if (part.startsWith("- ")) {
      const item = part.slice(2).trim();
      const last = blocks[blocks.length - 1];
      if (last?.type === "list") last.items.push(item);
      else blocks.push({ type: "list", items: [item] });
    } else {
      blocks.push({ type: "p", text: part });
    }
  }
  return blocks;
}

/** Overview row + Challenge / Approach / Result cards, shared by projects and Ironhack's chapter case. */
export function CaseSections({
  data,
  locale,
  heading = "Overview",
  intro,
}: {
  data: Case;
  locale: Locale;
  heading?: string;
  /** Short text under the heading (a part of a project that has its own title). */
  intro?: string;
}) {
  const cards = [
    { n: "01", title: "Challenge", body: data.challenge },
    { n: "02", title: "Approach", body: data.approach },
    { n: "03", title: "Result", body: data.result },
  ];

  return (
    <section className="bg-white py-24 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <h2 className="font-inter text-ink2 text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
          {heading}
        </h2>
        {intro ? <p className="font-inter text-ink mt-6 max-w-[760px] text-[17px] leading-[1.55] sm:text-[19px]">{intro}</p> : null}

        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-[#e2e2dc] pt-10 sm:grid-cols-3">
          {data.overview.map((item) => (
            <div key={item.label}>
              <dt className="font-inter text-[14px] text-[#9a9a9a]">
                {OVERVIEW_LABELS[locale][item.label] ?? item.label}
              </dt>
              <dd className="font-inter text-ink2 mt-1 text-[17px] leading-snug font-medium">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.n}
              className="flex flex-col gap-3 rounded-[14px] bg-[#f4f4f4] px-6 pt-6 pb-8 shadow-[0_8px_26px_rgba(0,0,0,0.06)]"
            >
              <span className="font-inter text-[32px] leading-none font-bold text-[#7b173b]">
                {card.n}
              </span>
              <h3 className="font-inter text-ink2 text-[21px] font-semibold">
                {card.title}
              </h3>
              {bodyBlocks(card.body).map((block, index) =>
                block.type === "list" ? (
                  <ul key={index} className="font-inter text-ink flex flex-col gap-3 text-[16px] leading-[1.55]">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-[#7b173b]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={index} className="font-inter text-ink text-[16px] leading-[1.55]">
                    {block.text}
                  </p>
                ),
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
