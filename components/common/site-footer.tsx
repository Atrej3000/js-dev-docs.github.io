import Link from "next/link";

import { getSiteCopy } from "@/src/modules/i18n/copy";
import type { Locale } from "@/src/types/content";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = getSiteCopy(locale);

  return (
    <footer className="border-t border-black/10 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-ink/70 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-sans text-base font-semibold text-ink">JS Dev Docs</p>
          <p>{copy.footer.note}</p>
          <p>{copy.footer.source}</p>
        </div>

        <div className="grid gap-2 sm:justify-self-end">
          <Link href={`/${locale}/docs`} className="hover:text-ink">
            {copy.nav.lessons}
          </Link>
          <Link href={`/${locale}/donate`} className="hover:text-ink">
            {copy.nav.donate}
          </Link>
          <Link href="/legacy/uk/" className="hover:text-ink">
            {copy.common.legacyFallback}
          </Link>
        </div>
      </div>
    </footer>
  );
}
