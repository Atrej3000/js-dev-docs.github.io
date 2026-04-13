import type {
  LessonLocaleState,
  LessonManifestEntry,
  Locale,
  TranslationPublicationStatus,
} from "@/src/types/content";

export function getLessonLocaleState(
  entry: LessonManifestEntry,
  locale: Locale,
): LessonLocaleState {
  return entry.translationStatus.locales[locale];
}

export function isLessonLocalePublished(
  entry: LessonManifestEntry,
  locale: Locale,
): boolean {
  return entry.availableLocales.includes(locale);
}

export function getLocalizedLessonMetadata(
  entry: LessonManifestEntry,
  locale: Locale,
): {
  title: string;
  description: string;
  status: TranslationPublicationStatus;
  isFallback: boolean;
} {
  const localeState = getLessonLocaleState(entry, locale);
  const isPublished = localeState.status === "published";

  return {
    title: isPublished && localeState.title ? localeState.title : entry.title,
    description:
      isPublished && localeState.description
        ? localeState.description
        : entry.description,
    status: localeState.status,
    isFallback: localeState.isFallback,
  };
}

export function getLessonTranslationCompleteness(
  entry: LessonManifestEntry,
  locale: Locale,
): number {
  return entry.translationCompleteness[locale] ?? 0;
}
