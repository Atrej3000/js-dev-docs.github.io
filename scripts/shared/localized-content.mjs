import fs from "node:fs";
import path from "node:path";

export const TRANSLATION_STATUSES = ["missing", "draft", "published"];

export function parseFrontmatterBlock(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return {
      data: {},
      body: source,
    };
  }

  const data = {};

  match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      data[key] = parseFrontmatterScalar(rawValue);
    });

  return {
    data,
    body: source.slice(match[0].length),
  };
}

function parseFrontmatterScalar(rawValue) {
  if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    return rawValue.slice(1, -1);
  }

  if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
    return Number(rawValue);
  }

  if (rawValue === "true") {
    return true;
  }

  if (rawValue === "false") {
    return false;
  }

  return rawValue;
}

export function slugifyHeadingId(value) {
  const normalized = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[`*_~[\]()<>]/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "section";
}

export function extractMarkdownHeadings(source) {
  return source
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{2,4})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = match[2].replace(/\s+#*$/, "").trim();
      return {
        level: match[1].length,
        id: slugifyHeadingId(text),
        text,
      };
    });
}

function resolveTranslationStatus(rawStatus, hasBody) {
  if (typeof rawStatus === "string" && TRANSLATION_STATUSES.includes(rawStatus)) {
    return rawStatus;
  }

  return hasBody ? "published" : "draft";
}

export function readLocalizedFileInfo(filePath, fallbackMetadata) {
  const extension = path.extname(filePath);
  const format = extension === ".mdx" ? "mdx" : "html";
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = format === "mdx" ? parseFrontmatterBlock(raw) : { data: {}, body: raw };
  const normalizedBody = parsed.body.trim();
  const status = resolveTranslationStatus(parsed.data.translationStatus, normalizedBody.length > 0);
  const explicitCompleteness =
    typeof parsed.data.translationCompleteness === "number"
      ? Math.max(0, Math.min(100, parsed.data.translationCompleteness))
      : null;
  const completeness =
    explicitCompleteness ?? (status === "published" ? 100 : 0);

  return {
    filePath,
    format,
    status,
    completeness,
    title: typeof parsed.data.title === "string" ? parsed.data.title : null,
    description:
      typeof parsed.data.description === "string" ? parsed.data.description : null,
    slug: typeof parsed.data.slug === "string" ? parsed.data.slug : fallbackMetadata.slug,
    track: typeof parsed.data.track === "string" ? parsed.data.track : fallbackMetadata.track,
    locale:
      typeof parsed.data.locale === "string" ? parsed.data.locale : fallbackMetadata.locale,
    sourceLocale:
      typeof parsed.data.sourceLocale === "string"
        ? parsed.data.sourceLocale
        : fallbackMetadata.sourceLocale,
    headings:
      format === "mdx"
        ? extractMarkdownHeadings(parsed.body)
        : fallbackMetadata.headings,
    body: parsed.body,
    hasBody: normalizedBody.length > 0,
  };
}

function toRepoPath(repoRoot, absolutePath) {
  return path.relative(repoRoot, absolutePath).split(path.sep).join("/");
}

export function discoverLocalizedContent({
  repoRoot,
  lessonDirectory,
  canonicalTrack,
  canonicalSlug,
  sourceTitle,
  sourceDescription,
  sourceHeadings,
  supportedLocales,
  defaultLocale,
}) {
  const fallbackMetadata = {
    track: canonicalTrack,
    slug: canonicalSlug,
    locale: defaultLocale,
    sourceLocale: defaultLocale,
    headings: sourceHeadings,
  };

  const localeEntries = {};
  const contentFiles = {
    [defaultLocale]: toRepoPath(repoRoot, path.join(lessonDirectory, `index.${defaultLocale}.html`)),
  };

  localeEntries[defaultLocale] = {
    status: "published",
    filePath: contentFiles[defaultLocale],
    format: "html",
    title: sourceTitle,
    description: sourceDescription,
    completeness: 100,
    isFallback: false,
    headings: sourceHeadings,
  };

  supportedLocales
    .filter((locale) => locale !== defaultLocale)
    .forEach((locale) => {
      const candidates = [
        path.join(lessonDirectory, `index.${locale}.mdx`),
        path.join(lessonDirectory, `index.${locale}.html`),
      ];
      const existingFile = candidates.find((candidate) => fs.existsSync(candidate));

      if (!existingFile) {
        localeEntries[locale] = {
          status: "missing",
          filePath: null,
          format: null,
          title: null,
          description: null,
          completeness: 0,
          isFallback: true,
          headings: [],
        };
        return;
      }

      const info = readLocalizedFileInfo(existingFile, {
        ...fallbackMetadata,
        locale,
      });

      contentFiles[locale] = toRepoPath(repoRoot, existingFile);
      localeEntries[locale] = {
        status: info.status,
        filePath: contentFiles[locale],
        format: info.format,
        title: info.title,
        description: info.description,
        completeness: info.completeness,
        isFallback: info.status !== "published",
        headings: info.headings,
        slug: info.slug,
        track: info.track,
        locale: info.locale,
        sourceLocale: info.sourceLocale,
        hasBody: info.hasBody,
      };
    });

  const availableLocales = supportedLocales.filter(
    (locale) => localeEntries[locale]?.status === "published",
  );

  return {
    contentFiles,
    availableLocales,
    translationCompleteness: Object.fromEntries(
      supportedLocales.map((locale) => [locale, localeEntries[locale]?.completeness ?? 0]),
    ),
    translationStatus: {
      sourceLocale: defaultLocale,
      availableLocales,
      fallbackLocales: Object.fromEntries(
        supportedLocales
          .filter((locale) => locale !== defaultLocale)
          .filter((locale) => localeEntries[locale]?.status !== "published")
          .map((locale) => [locale, defaultLocale]),
      ),
      locales: localeEntries,
    },
    locales: Object.fromEntries(
      supportedLocales.map((locale) => [
        locale,
        localeEntries[locale]?.status === "published",
      ]),
    ),
  };
}

export function buildLessonLocaleIndex(manifest) {
  return manifest.map((entry) => ({
    id: entry.id,
    track: entry.track,
    slug: entry.slug,
    canonicalRoute: entry.canonicalRoute,
    availableLocales: entry.availableLocales,
    statuses: Object.fromEntries(
      Object.entries(entry.translationStatus.locales).map(([locale, details]) => [
        locale,
        details.status,
      ]),
    ),
  }));
}
