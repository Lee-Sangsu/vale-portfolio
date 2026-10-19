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

/** Overview row + Challenge / Approach / Result cards, shared by projects and Ironhack's chapter case. */
export function CaseSections({
  data,
  locale,
  heading = "Overview",
}: {
  data: Case;
  locale: Locale;
  heading?: string;
}) {
  const cards = [
    { n: "01", title: "Challenge", body: data.challenge },
    { n: "02", title: "Approach", body: data.approach },
    { n: "03", title: "Result", body: data.result },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <h2 className="font-inter text-ink2 text-[32px] leading-tight font-bold sm:text-[40px]">
          {heading}
        </h2>

        <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-[#e2e2dc] pt-8 sm:grid-cols-3">
          {data.overview.map((item) => (
            <div key={item.label}>
              <dt className="font-inter text-muted text-[14px]">
                {OVERVIEW_LABELS[locale][item.label] ?? item.label}
              </dt>
              <dd className="font-inter text-ink2 mt-1 text-[17px] leading-snug font-medium">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.n}
              className="flex flex-col gap-3 rounded-[14px] bg-[#f3f2ee] px-6 pt-6 pb-8 shadow-[0_8px_26px_rgba(0,0,0,0.06)]"
            >
              <span className="font-inter text-ink2 text-[32px] leading-none font-bold opacity-60">
                {card.n}
              </span>
              <h3 className="font-inter text-ink2 text-[21px] font-semibold">
                {card.title}
              </h3>
              {card.body.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="font-inter text-ink text-[16px] leading-[1.55]"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
