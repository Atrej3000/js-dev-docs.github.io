import fs from "node:fs";
import path from "node:path";

import {
  GENERATED_ROOT,
  REPO_ROOT,
} from "./shared/legacy-content.mjs";
import { parseFrontmatterBlock } from "./shared/localized-content.mjs";

function readJson(name) {
  const filePath = path.join(GENERATED_ROOT, name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated artifact: ${name}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const inventory = readJson("legacy-inventory.json");
const manifest = readJson("lesson-manifest.json");
const aliases = readJson("legacy-route-aliases.json");
const searchIndex = readJson("search-index.json");
const priorityIds = new Set(
  JSON.parse(
    fs.readFileSync(
      path.join(REPO_ROOT, "scripts", "data", "translation-priority.json"),
      "utf8",
    ),
  ),
);

if (inventory.counts.lessons !== 94) {
  throw new Error(`Expected 94 lessons, found ${inventory.counts.lessons}`);
}

if (inventory.counts.tracks !== 14) {
  throw new Error(`Expected 14 tracks, found ${inventory.counts.tracks}`);
}

if (manifest.length !== 94) {
  throw new Error(`Expected 94 manifest entries, found ${manifest.length}`);
}

if (searchIndex.length !== manifest.length) {
  throw new Error(
    `Expected search index count ${manifest.length}, found ${searchIndex.length}`,
  );
}

const anomalySources = new Set(
  inventory.overrides.map((override) => override.sourcePath),
);

[
  "uk/data-types/iterables.html",
  "uk/misc/bigint.html",
  "uk/misc/reference-type.html",
].forEach((sourcePath) => {
  if (!anomalySources.has(sourcePath)) {
    throw new Error(`Missing expected override for ${sourcePath}`);
  }
});

let missingEnglishFiles = 0;
let emptyEnglishFiles = 0;
let brokenFrontmatter = 0;
let slugMismatches = 0;
let missingFallbacks = 0;
let publishedStatusMismatches = 0;

manifest.forEach((entry) => {
  const contentPath = path.join(REPO_ROOT, entry.contentFiles.uk);
  const metaPath = path.join(REPO_ROOT, entry.metadataFile);

  if (!fs.existsSync(contentPath)) {
    throw new Error(`Missing migrated content file for ${entry.id}`);
  }

  if (!fs.existsSync(metaPath)) {
    throw new Error(`Missing metadata file for ${entry.id}`);
  }

  const englishPath = entry.contentFiles.en
    ? path.join(REPO_ROOT, entry.contentFiles.en)
    : null;

  if (!englishPath || !fs.existsSync(englishPath)) {
    missingEnglishFiles += 1;
  } else {
    const raw = fs.readFileSync(englishPath, "utf8");
    const { data, body } = parseFrontmatterBlock(raw);

    if (!body.trim()) {
      emptyEnglishFiles += 1;
    }

    const requiredFrontmatterKeys = [
      "title",
      "description",
      "slug",
      "track",
      "locale",
      "sourceLocale",
      "translationStatus",
    ];

    if (path.extname(englishPath) === ".mdx") {
      const isBroken = requiredFrontmatterKeys.some((key) => !(key in data));
      if (isBroken) {
        brokenFrontmatter += 1;
      }

      if (
        data.slug !== entry.slug ||
        data.track !== entry.track ||
        data.locale !== "en" ||
        data.sourceLocale !== "uk"
      ) {
        slugMismatches += 1;
      }

      if (data.translationStatus !== entry.translationStatus.locales.en.status) {
        publishedStatusMismatches += 1;
      }
    }
  }

  if (
    entry.translationStatus.locales.en.status !== "published" &&
    entry.translationStatus.fallbackLocales.en !== "uk"
  ) {
    missingFallbacks += 1;
  }
});

if (!aliases.some((alias) => alias.type === "legacy-html")) {
  throw new Error("Expected legacy HTML aliases to be present.");
}

if (missingEnglishFiles > 0) {
  throw new Error(`Missing English translation files: ${missingEnglishFiles}`);
}

if (emptyEnglishFiles > 0) {
  throw new Error(`Empty English translation files: ${emptyEnglishFiles}`);
}

if (brokenFrontmatter > 0) {
  throw new Error(`Broken English frontmatter blocks: ${brokenFrontmatter}`);
}

if (slugMismatches > 0) {
  throw new Error(`English translation slug mismatches: ${slugMismatches}`);
}

if (missingFallbacks > 0) {
  throw new Error(`Lessons with missing English fallback mapping: ${missingFallbacks}`);
}

if (publishedStatusMismatches > 0) {
  throw new Error(
    `English translation status mismatches between files and manifest: ${publishedStatusMismatches}`,
  );
}

const priorityDrafts = manifest.filter(
  (entry) =>
    priorityIds.has(entry.id) &&
    entry.translationStatus.locales.en.status !== "published",
);

if (priorityDrafts.length > 0) {
  throw new Error(
    `Priority lessons still not published in English: ${priorityDrafts.length}`,
  );
}

const publishedEnglish = manifest.filter(
  (entry) => entry.translationStatus.locales.en.status === "published",
).length;
const draftEnglish = manifest.filter(
  (entry) => entry.translationStatus.locales.en.status === "draft",
).length;
const priorityLessons = manifest.filter((entry) => priorityIds.has(entry.id));
const priorityPublished = priorityLessons.filter(
  (entry) => entry.translationStatus.locales.en.status === "published",
).length;

const translationCoverage = manifest.length
  ? Math.round((publishedEnglish / manifest.length) * 100)
  : 0;
const priorityCoverage = priorityLessons.length
  ? Math.round((priorityPublished / priorityLessons.length) * 100)
  : 0;

console.log(
  [
    `Validated migration artifacts: ${manifest.length} lessons, ${inventory.counts.tracks} tracks, ${aliases.length} aliases.`,
    `English coverage: ${translationCoverage}% (${publishedEnglish}/${manifest.length} published, ${draftEnglish} draft, ${missingEnglishFiles} missing).`,
    `Priority coverage: ${priorityCoverage}% (${priorityPublished}/${priorityLessons.length} published).`,
  ].join("\n"),
);
