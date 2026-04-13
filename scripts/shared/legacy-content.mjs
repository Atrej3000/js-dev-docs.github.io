import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildLessonLocaleIndex,
  discoverLocalizedContent,
} from "./localized-content.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const REPO_ROOT = path.resolve(__dirname, "../..");
export const LEGACY_CONTENT_ROOT = path.join(REPO_ROOT, "uk");
export const GENERATED_ROOT = path.join(REPO_ROOT, "content", "generated");
export const TRACKS_ROOT = path.join(REPO_ROOT, "content", "tracks");
export const DEFAULT_LOCALE = "uk";
export const SUPPORTED_LOCALES = ["uk", "en"];

const OVERRIDES_PATH = path.join(
  REPO_ROOT,
  "scripts",
  "data",
  "migration-overrides.json",
);

function walkFiles(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const absolutePath = path.join(rootDir, entry.name);
    return entry.isDirectory() ? walkFiles(absolutePath) : absolutePath;
  });
}

function toRepoPath(absolutePath) {
  return path.relative(REPO_ROOT, absolutePath).split(path.sep).join("/");
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function writeJsonFile(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeTextFile(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, data, "utf8");
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " "));
}

function extractFirst(input, expression) {
  const match = input.match(expression);
  return match?.[1] ?? null;
}

function parseCanonicalPath(canonicalHref) {
  if (!canonicalHref) {
    return null;
  }

  let pathname = canonicalHref;

  try {
    pathname = new URL(canonicalHref, "https://example.com").pathname;
  } catch {
    pathname = canonicalHref;
  }

  pathname = pathname.trim();

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    pathname = pathname.slice(DEFAULT_LOCALE.length + 1);
  }

  if (!pathname.endsWith(".html")) {
    return null;
  }

  const segments = pathname.replace(/^\/+/, "").replace(/\.html$/, "").split("/");

  if (segments.length !== 2) {
    return null;
  }

  return {
    routePath: pathname,
    track: segments[0],
    slug: segments[1],
  };
}

function parseArticleMeta(raw, navSections) {
  const stringMatch = raw.match(
    /ARTICLE_META = \{ secId: '([^']+)', artId: '([^']+)' \}/,
  );
  if (stringMatch) {
    return {
      type: "string",
      raw: {
        secId: stringMatch[1],
        artId: stringMatch[2],
      },
      resolved: {
        track: stringMatch[1],
        slug: stringMatch[2],
      },
    };
  }

  const numericMatch = raw.match(
    /ARTICLE_META = \{ secId: (\d+), artId: (\d+) \}/,
  );
  if (!numericMatch) {
    return null;
  }

  const sectionIndex = Number(numericMatch[1]) - 1;
  const articleIndex = Number(numericMatch[2]) - 1;
  const section = navSections[sectionIndex];
  const article = section?.articles?.[articleIndex];

  return {
    type: "numeric",
    raw: {
      secId: numericMatch[1],
      artId: numericMatch[2],
    },
    resolved: section && article
      ? {
          track: section.id,
          slug: article.id,
        }
      : null,
  };
}

function extractHeadings(articleHtml) {
  const matches = [...articleHtml.matchAll(/<h([2-4]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)];

  return matches.map((match) => ({
    level: Number(match[1]),
    id: match[2],
    text: normalizeWhitespace(stripTags(match[3])),
  }));
}

function extractBreadcrumbs(raw) {
  const block = extractFirst(raw, /<nav class="breadcrumbs"[^>]*>([\s\S]*?)<\/nav>/);
  if (!block) {
    return [];
  }

  const matches = [
    ...block.matchAll(
      /<(a|span)(?![^>]*class="sep")[^>]*>([\s\S]*?)<\/\1>/g,
    ),
  ];

  return matches
    .map((match) => normalizeWhitespace(stripTags(match[2])))
    .filter(Boolean);
}

function extractBadges(raw) {
  const matches = [...raw.matchAll(/<span class="badge[^"]*">([\s\S]*?)<\/span>/g)];
  return matches.map((match) => normalizeWhitespace(stripTags(match[1])));
}

function extractPrevNext(raw) {
  const navBlock = extractFirst(raw, /<nav class="art-nav"[^>]*>([\s\S]*?)<\/nav>/);
  if (!navBlock) {
    return [];
  }

  const matches = [
    ...navBlock.matchAll(
      /<a href="([^"]+)" class="art-nav-a(?: is-next)?">[\s\S]*?<span class="art-nav-title">([\s\S]*?)<\/span>/g,
    ),
  ];

  return matches.map((match) => ({
    href: match[1],
    title: normalizeWhitespace(stripTags(match[2])),
  }));
}

function extractDonationLinks(raw) {
  const matches = [...raw.matchAll(/href="(https:\/\/[^"]+)"/g)];

  return matches
    .map((match) => match[1])
    .filter((href) =>
      href.includes("monobank") ||
      href.includes("buymeacoffee") ||
      href.includes("github.com"),
    )
    .filter((href, index, collection) => collection.indexOf(href) === index);
}

function parseEstimatedMinutes(badges) {
  const timeBadge = badges.find((badge) => badge.includes("хв"));
  if (!timeBadge) {
    return null;
  }

  const numeric = timeBadge.match(/(\d+)/);
  return numeric ? Number(numeric[1]) : null;
}

function readOverrides() {
  if (!fs.existsSync(OVERRIDES_PATH)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"));
}

export function readLegacyNavigation() {
  const source = fs.readFileSync(
    path.join(REPO_ROOT, "assets", "js", "app.js"),
    "utf8",
  );
  const navMatch = source.match(/var NAV\s*=\s*(\[[\s\S]*?\n\];)/);

  if (!navMatch) {
    throw new Error("Unable to find NAV in assets/js/app.js");
  }

  return (0, eval)(navMatch[1]);
}

function buildNavLookup(navSections) {
  const ordered = [];
  const byIdentity = new Map();

  navSections.forEach((section, sectionIndex) => {
    section.articles.forEach((article, articleIndex) => {
      const identity = `${section.id}/${article.id}`;
      const entry = {
        sectionId: section.id,
        articleId: article.id,
        articleNumber: article.n,
        sectionOrder: sectionIndex + 1,
        articleOrder: articleIndex + 1,
        overallOrder: ordered.length + 1,
      };
      ordered.push(entry);
      byIdentity.set(identity, entry);
    });
  });

  return { ordered, byIdentity };
}

function resolveIdentity({
  sourcePath,
  fileIdentity,
  canonicalIdentity,
  articleMeta,
  overridesByPath,
}) {
  const override = overridesByPath.get(sourcePath);

  if (override) {
    return {
      source: "override",
      identity: override.forceIdentity,
      override,
    };
  }

  if (canonicalIdentity) {
    return {
      source: "canonical",
      identity: canonicalIdentity,
      override: null,
    };
  }

  if (articleMeta?.type === "string" && articleMeta.resolved) {
    return {
      source: "article-meta-string",
      identity: articleMeta.resolved,
      override: null,
    };
  }

  if (articleMeta?.type === "numeric" && articleMeta.resolved) {
    return {
      source: "article-meta-numeric",
      identity: articleMeta.resolved,
      override: null,
    };
  }

  return {
    source: "file-path",
    identity: fileIdentity,
    override: null,
  };
}

function sectionTitleFromBreadcrumbs(breadcrumbs) {
  return breadcrumbs.length >= 2 ? breadcrumbs[1] : null;
}

export function buildLegacyInventory() {
  const navSections = readLegacyNavigation();
  const navLookup = buildNavLookup(navSections);
  const overrides = readOverrides();
  const overridesByPath = new Map(
    overrides.map((override) => [override.sourcePath, override]),
  );

  const lessonFiles = walkFiles(LEGACY_CONTENT_ROOT)
    .filter((absolutePath) => absolutePath.endsWith(".html"))
    .filter((absolutePath) => path.basename(absolutePath) !== "index.html")
    .sort();

  const sectionTitles = new Map();
  const lessons = lessonFiles.map((absolutePath) => {
    const sourcePath = toRepoPath(absolutePath);
    const raw = fs.readFileSync(absolutePath, "utf8");
    const sourceTrack = path.basename(path.dirname(absolutePath));
    const sourceSlug = path.basename(absolutePath, ".html");
    const fileIdentity = { track: sourceTrack, slug: sourceSlug };
    const title =
      extractFirst(raw, /<h1 class="article-title">([\s\S]*?)<\/h1>/) ??
      sourceSlug;
    const description =
      extractFirst(raw, /<meta name="description" content="([^"]+)"/) ?? "";
    const canonicalHref =
      extractFirst(raw, /<link rel="canonical" href="([^"]+)"/) ?? "";
    const canonicalIdentity = parseCanonicalPath(canonicalHref);
    const articleMeta = parseArticleMeta(raw, navSections);
    const breadcrumbs = extractBreadcrumbs(raw);
    const badges = extractBadges(raw);
    const articleHtml =
      extractFirst(raw, /<article class="prose">([\s\S]*?)<\/article>/) ?? "";
    const headings = extractHeadings(articleHtml);
    const prevNext = extractPrevNext(raw);
    const donationLinks = extractDonationLinks(raw);
    const resolution = resolveIdentity({
      sourcePath,
      fileIdentity,
      canonicalIdentity: canonicalIdentity
        ? {
            track: canonicalIdentity.track,
            slug: canonicalIdentity.slug,
          }
        : null,
      articleMeta,
      overridesByPath,
    });

    const canonicalLessonId = `${resolution.identity.track}/${resolution.identity.slug}`;
    const navEntry =
      navLookup.byIdentity.get(`${sourceTrack}/${sourceSlug}`) ??
      navLookup.byIdentity.get(canonicalLessonId) ??
      null;
    const sectionTitle = sectionTitleFromBreadcrumbs(breadcrumbs);

    if (sectionTitle && !sectionTitles.has(resolution.identity.track)) {
      sectionTitles.set(resolution.identity.track, sectionTitle);
    }

    return {
      id: canonicalLessonId,
      title: normalizeWhitespace(stripTags(title)),
      description: normalizeWhitespace(stripTags(description)),
      locale: DEFAULT_LOCALE,
      sourcePath,
      sourceTrack,
      sourceSlug,
      sourceIdentity: fileIdentity,
      canonicalIdentity: resolution.identity,
      canonicalIdentitySource: resolution.source,
      canonicalRoutePath: canonicalIdentity?.routePath ?? null,
      originalCanonicalHref: canonicalHref || null,
      articleMeta,
      breadcrumbs,
      badges,
      headings,
      prevNext,
      donationLinks,
      estimatedMinutes: parseEstimatedMinutes(badges),
      sectionTitle,
      hasLegacyJsonLd: /application\/ld\+json/.test(raw),
      hasLegacyToc: /class="doc-toc"/.test(raw),
      hasLegacyPrevNext: /class="art-nav"/.test(raw),
      legacyArticleSupport:
        /class="article-support"/.test(raw) || /class="support-block"/.test(raw),
      bodyHtml: articleHtml.trim(),
      nav: navEntry,
      override: resolution.override ?? null,
      mismatches: {
        filePathVsCanonical:
          `${sourceTrack}/${sourceSlug}` !== canonicalLessonId,
        filePathVsStringMeta:
          articleMeta?.type === "string"
            ? `${sourceTrack}/${sourceSlug}` !==
              `${articleMeta.resolved.track}/${articleMeta.resolved.slug}`
            : false,
        filePathVsNumericMeta:
          articleMeta?.type === "numeric" && articleMeta.resolved
            ? `${sourceTrack}/${sourceSlug}` !==
              `${articleMeta.resolved.track}/${articleMeta.resolved.slug}`
            : false,
      },
    };
  });

  const trackRecords = [...new Set(lessons.map((lesson) => lesson.canonicalIdentity.track))]
    .map((track) => {
      const lessonGroup = lessons
        .filter((lesson) => lesson.canonicalIdentity.track === track)
        .sort((left, right) => (left.nav?.overallOrder ?? 999) - (right.nav?.overallOrder ?? 999));

      return {
        track,
        title:
          sectionTitles.get(track) ??
          lessonGroup[0]?.sectionTitle ??
          track,
        lessonCount: lessonGroup.length,
        sectionOrder: lessonGroup[0]?.nav?.sectionOrder ?? 999,
      };
    })
    .sort((left, right) => left.sectionOrder - right.sectionOrder);

  const aliases = lessons.flatMap((lesson) => {
    const docsPath = `/${DEFAULT_LOCALE}/docs/${lesson.canonicalIdentity.track}/${lesson.canonicalIdentity.slug}`;
    const sourcePathAlias = `/${DEFAULT_LOCALE}/${lesson.sourceTrack}/${lesson.sourceSlug}`;
    const sourceHtmlAlias = `${sourcePathAlias}.html`;
    const aliasesForLesson = [
      {
        alias: sourceHtmlAlias,
        destination: docsPath,
        type: "legacy-html",
        sourcePath: lesson.sourcePath,
      },
    ];

    if (sourcePathAlias !== docsPath) {
      aliasesForLesson.push({
        alias: sourcePathAlias,
        destination: docsPath,
        type: "legacy-docs-alias",
        sourcePath: lesson.sourcePath,
      });
    }

    if (lesson.canonicalRoutePath) {
      aliasesForLesson.push({
        alias: lesson.canonicalRoutePath,
        destination: docsPath,
        type: "legacy-canonical-path",
        sourcePath: lesson.sourcePath,
      });
    }

    return aliasesForLesson;
  });

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      lessons: lessons.length,
      tracks: trackRecords.length,
      canonicalDrift: lessons.filter(
        (lesson) => lesson.mismatches.filePathVsCanonical,
      ).length,
      stringMetaCount: lessons.filter(
        (lesson) => lesson.articleMeta?.type === "string",
      ).length,
      numericMetaCount: lessons.filter(
        (lesson) => lesson.articleMeta?.type === "numeric",
      ).length,
      knownOverrides: overrides.length,
    },
    tracks: trackRecords,
    lessons,
    aliases,
    overrides,
  };
}

export function buildLessonManifest(inventory) {
  return inventory.lessons
    .slice()
    .sort((left, right) => (left.nav?.overallOrder ?? 999) - (right.nav?.overallOrder ?? 999))
    .map((lesson) => {
      const canonicalTrack = lesson.canonicalIdentity.track;
      const canonicalSlug = lesson.canonicalIdentity.slug;
      const contentDirectory = `content/tracks/${canonicalTrack}/${canonicalSlug}`;
      const lessonDirectory = path.join(REPO_ROOT, contentDirectory);
      const localizedContent = discoverLocalizedContent({
        repoRoot: REPO_ROOT,
        lessonDirectory,
        canonicalTrack,
        canonicalSlug,
        sourceTitle: lesson.title,
        sourceDescription: lesson.description,
        sourceHeadings: lesson.headings,
        supportedLocales: SUPPORTED_LOCALES,
        defaultLocale: DEFAULT_LOCALE,
      });

      return {
        id: lesson.id,
        locale: lesson.locale,
        locales: localizedContent.locales,
        availableLocales: localizedContent.availableLocales,
        title: lesson.title,
        description: lesson.description,
        track: canonicalTrack,
        trackTitle: lesson.sectionTitle ?? canonicalTrack,
        slug: canonicalSlug,
        sourcePath: lesson.sourcePath,
        sourceIdentity: lesson.sourceIdentity,
        canonicalRoute: `/${DEFAULT_LOCALE}/docs/${canonicalTrack}/${canonicalSlug}`,
        canonicalLegacyPath: lesson.canonicalRoutePath,
        legacyHtmlPath: `/${DEFAULT_LOCALE}/${lesson.sourceTrack}/${lesson.sourceSlug}.html`,
        legacyAliases: inventory.aliases
          .filter((alias) => alias.sourcePath === lesson.sourcePath)
          .map((alias) => alias.alias),
        sectionOrder: lesson.nav?.sectionOrder ?? 999,
        lessonOrder: lesson.nav?.articleOrder ?? 999,
        overallOrder: lesson.nav?.overallOrder ?? 999,
        articleNumber: lesson.nav?.articleNumber ?? null,
        estimatedMinutes: lesson.estimatedMinutes,
        headings: lesson.headings,
        badges: lesson.badges,
        donationLinks: lesson.donationLinks,
        breadcrumbTrail: lesson.breadcrumbs,
        relatedSourceTrack: lesson.sourceTrack,
        contentFiles: localizedContent.contentFiles,
        metadataFile: `${contentDirectory}/meta.json`,
        translationStatus: localizedContent.translationStatus,
        translationCompleteness: localizedContent.translationCompleteness,
        migration: {
          migratedFromLegacy: true,
          canonicalIdentitySource: lesson.canonicalIdentitySource,
          override: lesson.override,
          articleMeta: lesson.articleMeta,
          mismatches: lesson.mismatches,
          hasLegacyJsonLd: lesson.hasLegacyJsonLd,
          hasLegacyToc: lesson.hasLegacyToc,
          hasLegacyPrevNext: lesson.hasLegacyPrevNext,
          legacyArticleSupport: lesson.legacyArticleSupport,
        },
      };
    });
}

export function buildSearchIndex(manifest) {
  return manifest.map((entry) => ({
    id: entry.id,
    locale: entry.locale,
    title: entry.title,
    track: entry.track,
    trackTitle: entry.trackTitle,
    slug: entry.slug,
    canonicalRoute: entry.canonicalRoute,
    legacyAliases: entry.legacyAliases,
    queryText: [
      entry.title,
      entry.track,
      entry.trackTitle,
      entry.slug,
      entry.sourceIdentity.track,
      entry.sourceIdentity.slug,
      ...entry.legacyAliases,
    ]
      .join(" ")
      .toLowerCase(),
  }));
}

export function persistGeneratedArtifacts({ inventory, manifest, searchIndex }) {
  ensureDir(GENERATED_ROOT);

  writeJsonFile(path.join(GENERATED_ROOT, "legacy-inventory.json"), inventory);
  writeJsonFile(path.join(GENERATED_ROOT, "lesson-manifest.json"), manifest);
  writeJsonFile(
    path.join(GENERATED_ROOT, "lesson-locale-index.json"),
    buildLessonLocaleIndex(manifest),
  );
  writeJsonFile(path.join(GENERATED_ROOT, "legacy-route-aliases.json"), inventory.aliases);
  writeJsonFile(path.join(GENERATED_ROOT, "search-index.json"), searchIndex);
  writeJsonFile(path.join(GENERATED_ROOT, "migration-summary.json"), {
    generatedAt: inventory.generatedAt,
    counts: inventory.counts,
    tracks: inventory.tracks,
    overrides: inventory.overrides,
  });
}

export function persistMigratedLessons(manifest, inventoryBySourcePath) {
  manifest.forEach((entry) => {
    const lesson = inventoryBySourcePath.get(entry.sourcePath);
    const lessonDirectory = path.join(
      REPO_ROOT,
      "content",
      "tracks",
      entry.track,
      entry.slug,
    );

    ensureDir(lessonDirectory);

    writeTextFile(
      path.join(lessonDirectory, "index.uk.html"),
      `${lesson.bodyHtml}\n`,
    );
    writeJsonFile(path.join(lessonDirectory, "meta.json"), {
      ...entry,
      bodySourcePath: entry.contentFiles.uk,
      sourceProvenance: {
        sourcePath: lesson.sourcePath,
        sourceTrack: lesson.sourceTrack,
        sourceSlug: lesson.sourceSlug,
      },
    });
  });
}

export function printInventorySummary(inventory) {
  const lines = [
    `Lessons: ${inventory.counts.lessons}`,
    `Tracks: ${inventory.counts.tracks}`,
    `Canonical drift: ${inventory.counts.canonicalDrift}`,
    `String ARTICLE_META: ${inventory.counts.stringMetaCount}`,
    `Numeric ARTICLE_META: ${inventory.counts.numericMetaCount}`,
    `Known overrides: ${inventory.counts.knownOverrides}`,
  ];

  lines.forEach((line) => console.log(line));
}

export { ensureDir, readOverrides, toRepoPath, walkFiles, writeJsonFile, writeTextFile };
