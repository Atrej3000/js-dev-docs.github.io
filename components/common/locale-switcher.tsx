"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import lessonLocaleIndex from "@/content/generated/lesson-locale-index.json";
import { localeLabels, locales } from "@/src/modules/i18n/config";
import { stripLocaleFromPath } from "@/src/lib/routing";
import type { LessonLocaleIndexEntry, Locale } from "@/src/types/content";

type LocaleSwitcherProps = {
  currentLocale: Locale;
};

const lessonLocaleMap = new Map(
  (lessonLocaleIndex as LessonLocaleIndexEntry[]).map((entry) => [
    `${entry.track}/${entry.slug}`,
    entry,
  ]),
);

const trackLocaleMap = (lessonLocaleIndex as LessonLocaleIndexEntry[]).reduce<
  Map<string, Record<Locale, boolean>>
>((map, entry) => {
  const existing = map.get(entry.track) ?? { uk: false, en: false };

  locales.forEach((locale) => {
    if (entry.statuses[locale] === "published") {
      existing[locale] = true;
    }
  });

  map.set(entry.track, existing);
  return map;
}, new Map<string, Record<Locale, boolean>>());

function getLessonKeyFromPath(pathname: string): string | null {
  const segments = stripLocaleFromPath(pathname).split("/").filter(Boolean);

  if (segments.length < 3 || segments[0] !== "docs") {
    return null;
  }

  return `${segments[1]}/${segments[2]}`;
}

function getTrackKeyFromPath(pathname: string): string | null {
  const segments = stripLocaleFromPath(pathname).split("/").filter(Boolean);

  if (segments.length !== 2 || segments[0] !== "docs") {
    return null;
  }

  return segments[1];
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const pathWithoutLocale = stripLocaleFromPath(pathname);
  const lessonKey = getLessonKeyFromPath(pathname);
  const trackKey = getTrackKeyFromPath(pathname);
  const lessonEntry = lessonKey ? lessonLocaleMap.get(lessonKey) : null;
  const trackEntry = trackKey ? trackLocaleMap.get(trackKey) : null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-2 py-1 text-sm shadow-sm">
      {locales.map((locale) => {
        const isUnavailable =
          locale !== currentLocale &&
          ((lessonEntry?.statuses[locale] !== undefined &&
            lessonEntry.statuses[locale] !== "published") ||
            (trackEntry !== undefined && trackEntry !== null && !trackEntry[locale]));
        const className = `rounded-full px-3 py-1 transition ${
          locale === currentLocale
            ? "bg-ink text-paper"
            : isUnavailable
              ? "cursor-not-allowed bg-black/5 text-ink/35"
              : "text-ink/70 hover:bg-black/5 hover:text-ink"
        }`;

        if (isUnavailable) {
          return (
            <span
              key={locale}
              className={className}
              aria-disabled="true"
              title="Translation not published yet"
            >
              {localeLabels[locale]}
            </span>
          );
        }

        return (
          <Link
            key={locale}
            href={`/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
            className={className}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
