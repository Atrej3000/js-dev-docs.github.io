import type { Route } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { findLegacyAlias } from "@/src/modules/content/content.server";
import { isLocale } from "@/src/modules/i18n/config";

type LegacyRedirectPageProps = {
  params: Promise<{
    locale: string;
    track: string;
    legacyLesson: string;
  }>;
};

export default async function LegacyRedirectPage({
  params,
}: LegacyRedirectPageProps) {
  const { locale, track, legacyLesson } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const aliasPath = `/${locale}/${track}/${legacyLesson}`;
  const alias = findLegacyAlias(aliasPath);

  if (!alias) {
    notFound();
  }

  permanentRedirect(alias.destination.replace(/^\/uk\b/, `/${locale}`) as Route);
}
