import fs from "node:fs";
import path from "node:path";

import {
  GENERATED_ROOT,
  REPO_ROOT,
  SUPPORTED_LOCALES,
  ensureDir,
} from "./shared/legacy-content.mjs";

const localeFlagIndex = process.argv.indexOf("--locale");
const requestedLocale =
  localeFlagIndex >= 0
    ? process.argv[localeFlagIndex + 1]
    : process.argv.find((argument, index) => index > 1 && !argument.startsWith("--")) ??
      null;

if (!requestedLocale) {
  throw new Error(
    "Missing --locale. Example: npm run generate:translations -- --locale en",
  );
}

if (!SUPPORTED_LOCALES.includes(requestedLocale)) {
  throw new Error(
    `Unsupported locale "${requestedLocale}". Supported locales: ${SUPPORTED_LOCALES.join(", ")}`,
  );
}

if (requestedLocale === "uk") {
  throw new Error("The Ukrainian source locale is canonical and should not be stub-generated.");
}

const manifestPath = path.join(GENERATED_ROOT, "lesson-manifest.json");
if (!fs.existsSync(manifestPath)) {
  throw new Error(
    "lesson-manifest.json is missing. Run `npm run migrate:content` first.",
  );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

let created = 0;
let skippedExisting = 0;

manifest.forEach((entry) => {
  const targetDir = path.join(REPO_ROOT, "content", "tracks", entry.track, entry.slug);
  const mdxPath = path.join(targetDir, `index.${requestedLocale}.mdx`);
  const htmlPath = path.join(targetDir, `index.${requestedLocale}.html`);

  if (fs.existsSync(mdxPath) || fs.existsSync(htmlPath)) {
    skippedExisting += 1;
    return;
  }

  ensureDir(targetDir);

  const stub = [
    "---",
    'title: "TODO: Translate title"',
    'description: "TODO: Translate description"',
    `slug: "${entry.slug}"`,
    `track: "${entry.track}"`,
    `locale: "${requestedLocale}"`,
    'sourceLocale: "uk"',
    'translationStatus: "draft"',
    "translationCompleteness: 0",
    "---",
    "",
    "# Translation draft",
    "",
    `> TODO: Add the English lesson body for \`${entry.id}\`.`,
    "> The Ukrainian source lesson remains canonical and will continue to render as the public fallback until this file is marked as `published`.",
    "",
    "## Source lesson",
    "",
    `- Canonical source route: \`${entry.canonicalRoute}\``,
    `- Legacy source path: \`${entry.sourcePath}\``,
    "",
  ].join("\n");

  fs.writeFileSync(mdxPath, `${stub}\n`, "utf8");
  created += 1;
});

console.log(
  [
    `Locale: ${requestedLocale}`,
    `Lessons scanned: ${manifest.length}`,
    `Stubs created: ${created}`,
    `Skipped existing translations: ${skippedExisting}`,
  ].join("\n"),
);
