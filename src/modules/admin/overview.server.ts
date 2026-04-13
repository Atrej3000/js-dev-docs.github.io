import {
  getInventorySummary,
  getLessonManifest,
  getLegacyRouteAliases,
  getLocaleCoverage,
  getTrackSummaries,
  getTranslationMetrics,
} from "@/src/modules/content/content.server";

export function getAdminOverview() {
  const summary = getInventorySummary();
  const manifest = getLessonManifest();
  const aliases = getLegacyRouteAliases();
  const localeCoverage = getLocaleCoverage();
  const translationMetrics = getTranslationMetrics("en");
  const tracks = getTrackSummaries();

  return {
    summary,
    manifest,
    aliases,
    localeCoverage,
    translationMetrics,
    tracks,
    driftCount: manifest.filter((entry) => entry.migration.mismatches.filePathVsCanonical)
      .length,
  };
}
