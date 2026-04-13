export type Locale = "uk" | "en";
export type TranslationPublicationStatus = "missing" | "draft" | "published";
export type ContentFileFormat = "html" | "mdx";
export type TrackReadiness = "hidden" | "partial" | "complete";

export type LessonId = {
  track: string;
  slug: string;
};

export type LessonHeading = {
  level: number;
  id: string;
  text: string;
};

export type LessonTranslationStatus = {
  sourceLocale: Locale;
  availableLocales: Locale[];
  fallbackLocales: Partial<Record<Locale, Locale>>;
  locales: Record<Locale, LessonLocaleState>;
};

export type LessonLocaleState = {
  status: TranslationPublicationStatus;
  filePath: string | null;
  format: ContentFileFormat | null;
  title: string | null;
  description: string | null;
  completeness: number;
  isFallback: boolean;
  headings: LessonHeading[];
  slug?: string;
  track?: string;
  locale?: string;
  sourceLocale?: string;
  hasBody?: boolean;
};

export type LessonManifestEntry = {
  id: string;
  locale: "uk";
  locales: Record<Locale, boolean>;
  availableLocales: Locale[];
  title: string;
  description: string;
  track: string;
  trackTitle: string;
  slug: string;
  sourcePath: string;
  sourceIdentity: LessonId;
  canonicalRoute: string;
  canonicalLegacyPath: string | null;
  legacyHtmlPath: string;
  legacyAliases: string[];
  sectionOrder: number;
  lessonOrder: number;
  overallOrder: number;
  articleNumber: string | null;
  estimatedMinutes: number | null;
  headings: LessonHeading[];
  badges: string[];
  donationLinks: string[];
  breadcrumbTrail: string[];
  relatedSourceTrack: string;
  contentFiles: Partial<Record<Locale, string>> & {
    uk: string;
  };
  metadataFile: string;
  translationStatus: LessonTranslationStatus;
  translationCompleteness: Partial<Record<Locale, number>>;
  migration: {
    migratedFromLegacy: boolean;
    canonicalIdentitySource: string;
    override: {
      sourcePath: string;
      forceIdentity: LessonId;
      reason: string;
    } | null;
    articleMeta: {
      type: "string" | "numeric";
      raw: {
        secId: string;
        artId: string;
      };
      resolved: LessonId | null;
    } | null;
    mismatches: {
      filePathVsCanonical: boolean;
      filePathVsStringMeta: boolean;
      filePathVsNumericMeta: boolean;
    };
    hasLegacyJsonLd: boolean;
    hasLegacyToc: boolean;
    hasLegacyPrevNext: boolean;
    legacyArticleSupport: boolean;
  };
};

export type TrackSummary = {
  track: string;
  title: string;
  lessonCount: number;
  sectionOrder: number;
};

export type LocaleTrackSummary = {
  track: string;
  title: string;
  sourceTitle: string;
  lessonCount: number;
  discoverableLessonCount: number;
  sectionOrder: number;
  isIndexable: boolean;
  readiness: TrackReadiness;
};

export type LegacyRouteAlias = {
  alias: string;
  destination: string;
  type: string;
  sourcePath: string;
};

export type SearchIndexEntry = {
  id: string;
  locale: Locale;
  title: string;
  track: string;
  trackTitle: string;
  slug: string;
  canonicalRoute: string;
  legacyAliases: string[];
  queryText: string;
};

export type LessonRenderPayload = {
  entry: LessonManifestEntry;
  requestedLocale: Locale;
  resolvedLocale: Locale;
  requestedLocaleStatus: TranslationPublicationStatus;
  resolvedLocaleStatus: TranslationPublicationStatus;
  isFallback: boolean;
  availableLocales: Locale[];
  translationCompleteness: Partial<Record<Locale, number>>;
} & (
  | {
      format: "html";
      html: string;
    }
  | {
      format: "mdx";
      source: string;
    }
);

export type InventorySummary = {
  generatedAt: string;
  counts: {
    lessons: number;
    tracks: number;
    canonicalDrift: number;
    stringMetaCount: number;
    numericMetaCount: number;
    knownOverrides: number;
  };
  tracks: TrackSummary[];
  overrides: Array<{
    sourcePath: string;
    forceIdentity: LessonId;
    reason: string;
  }>;
};

export type LessonLocaleIndexEntry = {
  id: string;
  track: string;
  slug: string;
  canonicalRoute: string;
  availableLocales: Locale[];
  statuses: Record<Locale, TranslationPublicationStatus>;
};

export type LocalLearningLessonState = {
  id: string;
  title: string;
  track: string;
  trackTitle: string;
  canonicalRoute: string;
  estimatedMinutes: number | null;
  progress: number;
  completed: boolean;
  bookmarked: boolean;
  updatedAt: number;
};

export type LocalLearningState = {
  version: 1;
  recent: string[];
  lessons: Record<string, LocalLearningLessonState>;
};
