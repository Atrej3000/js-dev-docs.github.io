import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import type {
  InventorySummary,
  LegacyRouteAlias,
  LessonManifestEntry,
  LessonLocaleIndexEntry,
  LessonRenderPayload,
  LocaleTrackSummary,
  Locale,
  SearchIndexEntry,
  TrackSummary,
  TrackReadiness,
} from "@/src/types/content";

import { getBeginnerPathLessons } from "@/src/content/learning-paths";
import {
  getLocalizedTrackTitle,
  getTrackOverviewCopy,
} from "@/src/content/track-overviews";
import { getPriorityLessons } from "@/src/content/translation-priority";
import { defaultLocale, locales } from "@/src/modules/i18n/config";
import { parseFrontmatterBlock } from "@/src/modules/content/frontmatter";
import {
  getLessonLocaleState,
  getLocalizedLessonMetadata,
  isLessonLocalePublished,
} from "@/src/modules/content/translation-status";

const generatedRoot = path.join(process.cwd(), "content", "generated");

const readJson = cache(<T,>(fileName: string): T => {
  const filePath = path.join(generatedRoot, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
});

export const getLessonManifest = cache(() =>
  readJson<LessonManifestEntry[]>("lesson-manifest.json"),
);

export const getLessonLocaleIndex = cache(() =>
  readJson<LessonLocaleIndexEntry[]>("lesson-locale-index.json"),
);

export const getInventorySummary = cache(() =>
  readJson<InventorySummary>("migration-summary.json"),
);

export const getLegacyRouteAliases = cache(() =>
  readJson<LegacyRouteAlias[]>("legacy-route-aliases.json"),
);

export const getSearchIndex = cache(() =>
  readJson<SearchIndexEntry[]>("search-index.json"),
);

export const getTrackSummaries = cache(() =>
  readJson<{ tracks: TrackSummary[] }>("legacy-inventory.json").tracks,
);

function sortLessons(lessons: LessonManifestEntry[]) {
  return [...lessons].sort((left, right) => left.overallOrder - right.overallOrder);
}

function getTrackReadiness(
  lessonCount: number,
  discoverableLessonCount: number,
): TrackReadiness {
  if (discoverableLessonCount <= 0) {
    return "hidden";
  }

  if (discoverableLessonCount >= lessonCount) {
    return "complete";
  }

  return "partial";
}

export function getTrackLessons(track: string) {
  return sortLessons(getLessonManifest().filter((entry) => entry.track === track));
}

export function getDiscoverableLessons(locale: Locale = defaultLocale) {
  if (locale === defaultLocale) {
    return sortLessons(getLessonManifest());
  }

  return sortLessons(
    getLessonManifest().filter((entry) => isLessonLocalePublished(entry, locale)),
  );
}

export function getTrackLessonsForLocale(
  track: string,
  locale: Locale = defaultLocale,
) {
  const lessons = getTrackLessons(track);

  if (locale === defaultLocale) {
    return lessons;
  }

  return lessons.filter((entry) => isLessonLocalePublished(entry, locale));
}

export function getTrackSummariesForLocale(
  locale: Locale = defaultLocale,
): LocaleTrackSummary[] {
  return getTrackSummaries()
    .map((summary) => {
      const discoverableLessonCount = getTrackLessonsForLocale(
        summary.track,
        locale,
      ).length;

      return {
        track: summary.track,
        title: getLocalizedTrackTitle(summary.track, locale, summary.title),
        sourceTitle: summary.title,
        lessonCount: summary.lessonCount,
        discoverableLessonCount,
        sectionOrder: summary.sectionOrder,
        isIndexable:
          locale === defaultLocale || discoverableLessonCount > 0,
        readiness:
          locale === defaultLocale
            ? "complete"
            : getTrackReadiness(summary.lessonCount, discoverableLessonCount),
      };
    })
    .filter((summary) => locale === defaultLocale || summary.isIndexable);
}

export function getTrackAvailability(locale: Locale = defaultLocale) {
  return getTrackSummaries().map((summary) => {
    const discoverableLessonCount = getTrackLessonsForLocale(summary.track, locale).length;

    return {
      track: summary.track,
      title: getLocalizedTrackTitle(summary.track, locale, summary.title),
      sourceTitle: summary.title,
      lessonCount: summary.lessonCount,
      discoverableLessonCount,
      sectionOrder: summary.sectionOrder,
      isIndexable: locale === defaultLocale || discoverableLessonCount > 0,
      readiness:
        locale === defaultLocale
          ? "complete"
          : getTrackReadiness(summary.lessonCount, discoverableLessonCount),
    } satisfies LocaleTrackSummary;
  });
}

export function getLessonByCanonical(track: string, slug: string) {
  return getLessonManifest().find(
    (entry) => entry.track === track && entry.slug === slug,
  );
}

export function getLessonBySourceIdentity(track: string, slug: string) {
  return getLessonManifest().find(
    (entry) =>
      entry.sourceIdentity.track === track && entry.sourceIdentity.slug === slug,
  );
}

export function getTrackByAlias(track: string, locale?: Locale) {
  const trackLessons = getLessonManifest().filter(
    (entry) =>
      entry.track === track || entry.sourceIdentity.track === track,
  );

  if (!trackLessons.length) {
    return null;
  }

  const canonicalTrack = trackLessons[0].track;
  const allLessons = sortLessons(
    trackLessons.filter((entry) => entry.track === canonicalTrack),
  );
  const discoverableLessons = locale
    ? getTrackLessonsForLocale(canonicalTrack, locale)
    : allLessons;
  const fallbackTitle = allLessons[0]?.trackTitle ?? canonicalTrack;
  const overviewCopy = locale ? getTrackOverviewCopy(canonicalTrack, locale) : null;

  return {
    canonicalTrack,
    lessons: discoverableLessons,
    allLessons,
    title: overviewCopy?.title
      ?? (locale ? getLocalizedTrackTitle(canonicalTrack, locale, fallbackTitle) : fallbackTitle),
    lessonCount: allLessons.length,
    discoverableLessonCount: discoverableLessons.length,
    isIndexable:
      !locale || locale === defaultLocale || discoverableLessons.length > 0,
    readiness:
      !locale || locale === defaultLocale
        ? "complete"
        : getTrackReadiness(allLessons.length, discoverableLessons.length),
    indexableLocales: locales.filter(
      (candidateLocale) =>
        candidateLocale === defaultLocale ||
        getTrackLessonsForLocale(canonicalTrack, candidateLocale).length > 0,
    ),
  };
}

export function resolveLessonRoute(track: string, slug: string) {
  const direct = getLessonByCanonical(track, slug);
  if (direct) {
    return { entry: direct, redirectTo: null as string | null };
  }

  const aliased = getLessonBySourceIdentity(track, slug);
  if (aliased) {
    return {
      entry: aliased,
      redirectTo: aliased.canonicalRoute,
    };
  }

  return { entry: null, redirectTo: null as string | null };
}

export function getSiblingLessons(
  entry: LessonManifestEntry,
  locale: Locale = defaultLocale,
) {
  const manifest = getDiscoverableLessons(locale);
  const index = manifest.findIndex((candidate) => candidate.id === entry.id);

  return {
    previous: index > 0 ? manifest[index - 1] : null,
    next: index >= 0 && index < manifest.length - 1 ? manifest[index + 1] : null,
  };
}

export function getRelatedLessons(
  entry: LessonManifestEntry,
  locale: Locale = defaultLocale,
  limit = 3,
) {
  return getTrackLessonsForLocale(entry.track, locale)
    .filter((candidate) => candidate.id !== entry.id)
    .slice(0, limit);
}

export function getLocalizedLessonContent(
  entry: LessonManifestEntry,
  locale: Locale,
): LessonRenderPayload {
  const requestedLocale = locale;
  const requestedLocaleState = getLessonLocaleState(entry, requestedLocale);
  const canRenderRequested =
    requestedLocale === defaultLocale || isLessonLocalePublished(entry, requestedLocale);
  const resolvedLocale =
    canRenderRequested && entry.contentFiles[requestedLocale]
      ? requestedLocale
      : defaultLocale;
  const resolvedLocaleState = getLessonLocaleState(entry, resolvedLocale);
  const contentPath = entry.contentFiles[resolvedLocale] ?? entry.contentFiles.uk;
  const raw = fs.readFileSync(path.join(process.cwd(), contentPath), "utf8");

  if (path.extname(contentPath) === ".mdx") {
    const { body } = parseFrontmatterBlock(raw);

    return {
      entry,
      requestedLocale,
      resolvedLocale,
      requestedLocaleStatus: requestedLocaleState.status,
      resolvedLocaleStatus: resolvedLocaleState.status,
      isFallback: requestedLocale !== resolvedLocale,
      availableLocales: entry.availableLocales,
      translationCompleteness: entry.translationCompleteness,
      format: "mdx",
      source: body,
    };
  }

  return {
    entry,
    requestedLocale,
    resolvedLocale,
    requestedLocaleStatus: requestedLocaleState.status,
    resolvedLocaleStatus: resolvedLocaleState.status,
    isFallback: requestedLocale !== resolvedLocale,
    availableLocales: entry.availableLocales,
    translationCompleteness: entry.translationCompleteness,
    format: "html",
    html: raw,
  };
}

export function findLegacyAlias(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return getLegacyRouteAliases().find((alias) => alias.alias === normalized) ?? null;
}

export function getLessonMetadataForLocale(
  entry: LessonManifestEntry,
  locale: Locale,
) {
  return getLocalizedLessonMetadata(entry, locale);
}

export function getLessonSearchEntries(locale: Locale = defaultLocale) {
  return getDiscoverableLessons(locale).map((entry) => {
    const localizedMetadata = getLocalizedLessonMetadata(entry, locale);
    const localizedTrackTitle = getLocalizedTrackTitle(
      entry.track,
      locale,
      entry.trackTitle,
    );

    return {
      id: entry.id,
      locale,
      title: localizedMetadata.title,
      track: entry.track,
      trackTitle: localizedTrackTitle,
      slug: entry.slug,
      canonicalRoute: `/${locale}/docs/${entry.track}/${entry.slug}`,
      legacyAliases: entry.legacyAliases,
      queryText: [
        localizedMetadata.title,
        localizedTrackTitle,
        entry.slug,
        entry.id,
        ...entry.legacyAliases,
      ]
        .join(" ")
        .toLowerCase(),
    } satisfies SearchIndexEntry;
  });
}

export function getBeginnerPathLessonsForLocale(locale: Locale = defaultLocale) {
  return getBeginnerPathLessons(getDiscoverableLessons(locale));
}

export function getLocaleCoverage() {
  const manifest = getLessonManifest();
  const locales: Locale[] = ["uk", "en"];

  return {
    totalLessons: manifest.length,
    byLocale: Object.fromEntries(
      locales.map((locale) => {
        const states = manifest.map((entry) => getLessonLocaleState(entry, locale));
        const published = states.filter((state) => state.status === "published").length;
        const draft = states.filter((state) => state.status === "draft").length;
        const missing = states.filter((state) => state.status === "missing").length;

        return [
          locale,
          {
            published,
            draft,
            missing,
            coverage: manifest.length ? Math.round((published / manifest.length) * 100) : 0,
          },
        ];
      }),
    ) as Record<
      Locale,
      {
        published: number;
        draft: number;
        missing: number;
        coverage: number;
      }
    >,
  };
}

export function getTranslationMetrics(targetLocale: Locale = "en") {
  const manifest = getLessonManifest();
  const coverage = getLocaleCoverage();
  const tracks = getTrackAvailability(targetLocale);
  const priorityLessons = getPriorityLessons(manifest);
  const priorityStates = priorityLessons.map((entry) => ({
    entry,
    localeState: getLessonLocaleState(entry, targetLocale),
    completeness: entry.translationCompleteness[targetLocale] ?? 0,
  }));
  const publishedPriority = priorityStates.filter(
    ({ localeState }) => localeState.status === "published",
  ).length;

  return {
    totalLessons: manifest.length,
    byLocale: coverage.byLocale,
    targetLocale,
    translatedCount: coverage.byLocale[targetLocale].published,
    draftCount: coverage.byLocale[targetLocale].draft,
    missingCount: coverage.byLocale[targetLocale].missing,
    coverage: coverage.byLocale[targetLocale].coverage,
    tracks,
    indexablePages: {
      lessonPages: coverage.byLocale[targetLocale].published,
      trackPages: tracks.filter((track) => track.isIndexable).length,
      docsCatalog: 1,
      total:
        coverage.byLocale[targetLocale].published
        + tracks.filter((track) => track.isIndexable).length
        + 1,
    },
    priority: {
      total: priorityLessons.length,
      published: publishedPriority,
      draft: priorityStates.filter(({ localeState }) => localeState.status === "draft")
        .length,
      missing: priorityStates.filter(({ localeState }) => localeState.status === "missing")
        .length,
      coverage: priorityLessons.length
        ? Math.round((publishedPriority / priorityLessons.length) * 100)
        : 0,
    },
    priorityUntranslatedLessons: priorityStates
      .filter(({ localeState }) => localeState.status !== "published")
      .map(({ entry, localeState, completeness }) => ({
        entry,
        status: localeState.status,
        completeness,
      })),
  };
}
