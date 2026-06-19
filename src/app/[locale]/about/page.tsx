import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { subhead } from "@/content/about";
import { encodeAsset } from "@/content/photo-manifest";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AboutHero } from "@/components/site/about/AboutHero";
import { SkillsSection } from "@/components/site/about/SkillsSection";
import { JourneySection } from "@/components/site/about/JourneySection";
import { MyStory } from "@/components/site/about/MyStory";
import { SneakPeek } from "@/components/site/about/SneakPeek";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  return (
    <main>
      <AboutHero locale={locale} />

      <CommunityStrip>{subhead[locale]}</CommunityStrip>

      <SkillsSection locale={locale} />

      <JourneySection locale={locale} />

      <MyStory locale={locale} />

      <SneakPeek locale={locale} />

      <WorkTogether photo={encodeAsset("photos/about/Val.png")} />
      <SiteFooter />
    </main>
  );
}
