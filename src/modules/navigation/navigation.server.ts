import type { LessonManifestEntry, Locale } from "@/src/types/content";

import {
  getLessonMetadataForLocale,
  getTrackLessonsForLocale,
  getTrackSummariesForLocale,
} from "@/src/modules/content/content.server";
import { getLocalizedTrackTitle } from "@/src/content/track-overviews";

export function getSidebarTracks(locale: Locale = "uk") {
  const trackSummaries = getTrackSummariesForLocale(locale);

  return trackSummaries.map((track) => ({
    ...track,
    lessons: getTrackLessonsForLocale(track.track, locale).map((entry) => ({
      id: entry.id,
      track: entry.track,
      slug: entry.slug,
      articleNumber: entry.articleNumber,
      title: getLessonMetadataForLocale(entry, locale).title,
    })),
  }));
}

export function buildBreadcrumbs(
  entry: LessonManifestEntry,
  locale: Locale = "uk",
) {
  const localizedMetadata = getLessonMetadataForLocale(entry, locale);
  const localizedTrackTitle = getLocalizedTrackTitle(
    entry.track,
    locale,
    entry.trackTitle,
  );

  return [
    { label: "JS Dev Docs", href: `/${locale}` },
    { label: localizedTrackTitle, href: `/${locale}/docs/${entry.track}` },
    { label: localizedMetadata.title, href: `/${locale}/docs/${entry.track}/${entry.slug}` },
  ];
}

export function getTrackOverview(track: string, locale: Locale = "uk") {
  const lessons = getTrackLessonsForLocale(track, locale);
  if (!lessons.length) {
    return null;
  }

  return {
    track,
    title: getLocalizedTrackTitle(track, locale, lessons[0].trackTitle),
    lessons,
  };
}
