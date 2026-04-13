# JS Dev Docs Platform

JS Dev Docs is being migrated from a preserved static educational site into a multilingual Next.js platform without deleting or rewriting the existing Ukrainian lesson corpus.

## Current State

- Legacy source content remains in [`uk/`](./uk/) and shared assets remain in [`assets/`](./assets/).
- The new application lives in the Next.js App Router structure under [`app/`](./app/) and typed domain modules under [`src/`](./src/).
- Migrated lesson content is generated into [`content/`](./content/) by reproducible scripts in [`scripts/`](./scripts/).
- Ukrainian lesson bodies remain preserved in `index.uk.html`, while English translation files now live beside them as `index.en.mdx` drafts or published translations.
- The first English publication wave is complete for the `20` priority lessons.
- Current English coverage: `20/94` published lessons (`21%`), with `74` draft fallback lessons still safely protected.
- English discovery pages are now live for the `intro` and `basics` tracks, and the English lesson catalog promotes only published lessons.
- Legacy content is intentionally preserved as a read-only fallback while the new platform is verified.

## Platform Goals

- Preserve all existing Ukrainian lesson bodies and ordering.
- Serve canonical lesson routes at `/[locale]/docs/<track>/<lesson>`.
- Redirect legacy `.html` lesson URLs to the new docs routes.
- Support `uk` as the source language and `en` as the first expansion locale.
- Track translation status per lesson with `missing`, `draft`, and `published` states.
- Keep progress, bookmarks, and recent lessons local-first with no required auth.
- Replace billing concepts with donation/support flows.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate migrated content and search data:

   ```bash
   npm run migrate:content
   npm run build:search
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Validate the migration artifacts:

   ```bash
   npm run validate:migration
   ```

5. Run the verification checks:

   ```bash
   npm run build
   npm run lint
   ```

6. Regenerate English draft translation files if needed:

   ```bash
   npm run generate:translations -- --locale en
   ```

## Scripts

- `npm run migrate:content` regenerates the content-first lesson tree and manifest from legacy HTML.
- `npm run inventory:content` writes the raw legacy inventory and mismatch report.
- `npm run build:search` regenerates the local lesson search index.
- `npm run generate:translations -- --locale en` creates safe draft `index.en.mdx` files without overwriting existing translations.
- `npm run validate:migration` validates counts, aliases, translation file integrity, fallback safety, and coverage metrics.

## Published English Lessons

The current published English wave covers the priority onboarding lessons in `intro` and `basics`, including:

- introduction to JavaScript, code editors, developer tools
- hello world, code structure, strict mode
- variables, data types, interaction, type conversions
- operators, comparison, `if`, logical operators, `??`
- loops, `switch`, functions, function expressions, arrow functions

## English Discovery Surface

- Live English track landing pages:
  - `/en/docs/intro`
  - `/en/docs/basics`
- The English lesson catalog at `/en/docs` now highlights the published beginner path instead of listing draft-only translations.
- English search, sidebar navigation, related lessons, and next/previous links now promote only published English lessons.
- Fallback-only English lesson routes remain available to readers, but they continue to stay protected from indexing.

## Important Paths

- [`REFACTOR_MIGRATION_PLAN.md`](./REFACTOR_MIGRATION_PLAN.md)
- [`ARCHITECTURE_OVERVIEW.md`](./ARCHITECTURE_OVERVIEW.md)
- [`CONTENT_MIGRATION_REPORT.md`](./CONTENT_MIGRATION_REPORT.md)
- [`LOCALE_STRATEGY.md`](./LOCALE_STRATEGY.md)
- [`TRANSLATION_WORKFLOW.md`](./TRANSLATION_WORKFLOW.md)

## Legacy Preservation

The following paths remain intentionally untouched as source-of-truth legacy assets during this refactor:

- [`uk/`](./uk/)
- [`assets/`](./assets/)
- [`server.js`](./server.js)
- [`gen-sitemap.js`](./gen-sitemap.js)
- [`_ARTICLE_TEMPLATE.html`](./_ARTICLE_TEMPLATE.html)
