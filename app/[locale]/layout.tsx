import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import { absoluteUrl } from "@/src/lib/seo/site";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getSiteCopy(locale);

  return {
    title: {
      default: "JS Dev Docs",
      template: "%s | JS Dev Docs",
    },
    description: copy.home.description,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        uk: absoluteUrl("/uk"),
        en: absoluteUrl("/en"),
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="shell-grid">
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
