import Link from "next/link";

import { LocaleSwitcher } from "@/components/common/locale-switcher";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import type { Locale } from "@/src/types/content";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getSiteCopy(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-bold uppercase tracking-[0.24em] text-paper">
              JS
            </span>
            <div>
              <p className="font-sans text-lg font-bold">Dev Docs</p>
              <p className="text-xs text-ink/60">{copy.common.freeAcademy}</p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-ink/70 lg:flex">
          <Link href={`/${locale}/docs`} className="hover:text-ink">
            {copy.nav.lessons}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-ink">
            {copy.nav.about}
          </Link>
          <Link href={`/${locale}/roadmap`} className="hover:text-ink">
            {copy.nav.roadmap}
          </Link>
          <Link href={`/${locale}/faq`} className="hover:text-ink">
            {copy.nav.faq}
          </Link>
          <Link href={`/${locale}/dashboard`} className="hover:text-ink">
            {copy.nav.dashboard}
          </Link>
          <Link href={`/${locale}/donate`} className="hover:text-ink">
            {copy.nav.donate}
          </Link>
          <Link href={`/${locale}/admin`} className="hover:text-ink">
            {copy.nav.admin}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <Link
            href={`/${locale}/donate`}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-ember"
          >
            {copy.nav.donate}
          </Link>
        </div>
      </div>
    </header>
  );
}
