import type { Stat as StatType, Locale } from "@/content/types";

export function Stat({
  stat,
  locale,
}: {
  stat: StatType;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-rule pt-3">
      <span className="num text-3xl sm:text-4xl leading-none text-ink">
        {typeof stat.value === "string" ? stat.value : stat.value[locale]}
      </span>
      <span className="text-sm text-ink-soft leading-snug">
        {stat.label[locale]}
      </span>
    </div>
  );
}

export function StatGrid({
  stats,
  locale,
}: {
  stats: StatType[];
  locale: Locale;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {stats.map((s, i) => (
        <Stat key={i} stat={s} locale={locale} />
      ))}
    </div>
  );
}
