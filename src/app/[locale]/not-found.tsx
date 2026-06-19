import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <>
      <SiteNav tone="dark" />
      <main className="container-page grow py-40 sm:py-52">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="kicker text-muted">404</span>
          <h1 className="mt-4 mb-6 font-heebo text-[44px] font-bold leading-none text-ink2 sm:text-[64px]">
            {t("title")}
          </h1>
          <p className="mb-10 font-inter text-[17px] leading-[1.5] text-ink2 sm:text-[19px]">
            {t("body")}
          </p>
          <Link
            href="/"
            className="inline-flex items-baseline gap-2 font-inter text-[15px] font-semibold text-green underline-soft"
          >
            <span aria-hidden="true">←</span> {t("back")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
