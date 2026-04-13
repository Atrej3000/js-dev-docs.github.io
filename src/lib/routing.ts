import type { LessonId, Locale } from "@/src/types/content";

import { defaultLocale } from "@/src/modules/i18n/config";

export function buildDocsHref(locale: Locale, lesson: LessonId): string {
  return `/${locale}/docs/${lesson.track}/${lesson.slug}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalized.split("/");

  if (segments[1] === "uk" || segments[1] === "en") {
    return `/${segments.slice(2).join("/")}`.replace(/\/+$/, "") || "/";
  }

  return normalized;
}

export function localizeLegacyPath(
  pathname: string,
  locale: Locale = defaultLocale,
): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized.startsWith(`/${locale}/`) ? normalized : `/${locale}${normalized}`;
}
