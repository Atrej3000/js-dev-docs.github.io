import {
  buildLegacyInventory,
  buildLessonManifest,
  buildSearchIndex,
  persistGeneratedArtifacts,
  persistMigratedLessons,
  printInventorySummary,
} from "./shared/legacy-content.mjs";

const inventory = buildLegacyInventory();
const manifest = buildLessonManifest(inventory);
const searchIndex = buildSearchIndex(manifest);
const inventoryBySourcePath = new Map(
  inventory.lessons.map((lesson) => [lesson.sourcePath, lesson]),
);

persistMigratedLessons(manifest, inventoryBySourcePath);
persistGeneratedArtifacts({ inventory, manifest, searchIndex });
printInventorySummary(inventory);
