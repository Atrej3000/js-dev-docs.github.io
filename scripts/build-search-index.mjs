import fs from "node:fs";
import path from "node:path";

import {
  GENERATED_ROOT,
  buildSearchIndex,
  writeJsonFile,
} from "./shared/legacy-content.mjs";

const manifestPath = path.join(GENERATED_ROOT, "lesson-manifest.json");

if (!fs.existsSync(manifestPath)) {
  throw new Error(
    "lesson-manifest.json is missing. Run `npm run migrate:content` first.",
  );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const searchIndex = buildSearchIndex(manifest);

writeJsonFile(path.join(GENERATED_ROOT, "search-index.json"), searchIndex);
console.log(`Search entries: ${searchIndex.length}`);
