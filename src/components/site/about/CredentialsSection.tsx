import type { Locale } from "@/content/types";
import { credentials, profileMetrics } from "@/content/about";

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-win-border grid grid-cols-[8px_1fr] gap-3 border-b pb-3 font-inter text-[14px] leading-[1.5] text-muted sm:text-[15px]"
        >
          <span className="mt-[7px] size-2 rounded-full bg-green" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border-win-border rounded-full border bg-white px-3 py-1.5 font-inter text-[12px] font-medium text-ink2 sm:text-[13px]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CredentialsSection({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const { education, recognitions, languages, methods, strengths } = credentials;

  return (
    <section id="credentials" className="bg-cream px-6 py-20 sm:px-12 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1080px]">
        <p className="font-inter text-[12px] font-bold uppercase tracking-[0.14em] text-green">
          {es ? "Experiencia, formación y herramientas" : "Experience, education & tools"}
        </p>
        <h2 className="mt-3 max-w-[760px] font-inter text-[36px] font-bold leading-[1.05] text-ink2 sm:text-[48px]">
          {es ? "El trabajo, en contexto." : "The work, in context."}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div>
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Educación" : "Education"}
              </h3>
              <div className="border-win-border mt-5 border-t pt-5">
                <p className="font-inter text-[17px] font-bold leading-snug text-ink2 sm:text-[19px]">
                  {education.title[locale]}
                </p>
                <p className="mt-2 font-inter text-[14px] leading-relaxed text-muted">
                  {education.institution} · {education.context[locale]} · {education.date}
                </p>
                <p className="mt-4 font-inter text-[14px] leading-relaxed text-ink2 sm:text-[15px]">
                  <span className="font-bold">{es ? "Tesis:" : "Thesis:"}</span>{" "}
                  {education.thesis[locale]}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Reconocimientos" : "Recognition"}
              </h3>
              <DetailList items={recognitions[locale]} />
            </div>
          </div>

          <div>
            <div>
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Impacto reciente" : "Recent impact"}
              </h3>
              <DetailList items={profileMetrics[locale]} />
            </div>

            <div className="border-win-border mt-12 border-t pt-6">
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Idiomas" : "Languages"}
              </h3>
              <TagList items={languages[locale]} />
            </div>

            <div className="border-win-border mt-10 border-t pt-6">
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Herramientas y métodos" : "Tools & methods"}
              </h3>
              <TagList items={methods} />
            </div>

            <div className="border-win-border mt-10 border-t pt-6">
              <h3 className="font-inter text-[22px] font-bold text-ink2 sm:text-[26px]">
                {es ? "Fortalezas" : "Strengths"}
              </h3>
              <TagList items={strengths[locale]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
