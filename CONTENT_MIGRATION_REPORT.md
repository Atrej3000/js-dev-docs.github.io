# Content Migration Report

## Baseline Audit

- Legacy lesson count: `94`
- Legacy section count: `14`
- Legacy content source: `uk/**/*.html`
- Shared runtime assets: `assets/css/main.css`, `assets/js/app.js`, `assets/js/i18n.js`

## Detected Legacy Identity Drift

- Pages with canonical-path drift from file paths: `22`
- Pages with string `ARTICLE_META`: `69`
- Pages with numeric `ARTICLE_META`: `25`
- Known bad numeric mappings: `3`

## Known Numeric Metadata Anomalies

- `uk/data-types/iterables.html`
- `uk/misc/bigint.html`
- `uk/misc/reference-type.html`

## Phase 1 Migration Report

### Files Added

- Next.js, TypeScript, Tailwind, PostCSS, and ESLint configuration files
- Root migration and architecture documentation
- Initial App Router foundation

### Files Modified

- `README.md`

### Files Intentionally Untouched

- `uk/`
- `assets/`
- `server.js`
- `gen-sitemap.js`
- `_ARTICLE_TEMPLATE.html`

### Risks / TODOs

- Migration scripts must resolve canonical/file-path/meta drift deterministically.
- Legacy fallback needs runtime serving for preserved HTML and shared assets.
- Validation should fail loudly if lesson counts or aliases drift unexpectedly.

## Phase 2 Migration Report

### Files Added

- `scripts/shared/legacy-content.mjs`
- `scripts/extract-legacy-navigation.mjs`
- `scripts/migrate-legacy-content.mjs`
- `scripts/build-search-index.mjs`
- `scripts/translation-stub-generator.mjs`
- `scripts/validate-migration.mjs`
- `scripts/data/migration-overrides.json`
- `content/generated/*.json`
- `content/tracks/**/index.uk.html`
- `content/tracks/**/meta.json`

### Files Modified

- none of the legacy lesson sources

### Files Intentionally Untouched

- `uk/`
- `assets/`
- `server.js`
- `gen-sitemap.js`
- `_ARTICLE_TEMPLATE.html`

### Risks / TODOs

- The new app must consume generated manifests rather than re-parsing legacy HTML at request time.
- English content files remain intentionally absent until verified translations exist.

## Phase 3 Migration Report

### Files Added

- `app/[locale]/docs/**`
- `src/modules/content/**`
- `src/modules/navigation/**`
- `src/modules/search/**`
- `components/docs/**`
- `app/sitemap.ts`
- `app/robots.ts`
- `middleware.ts`

### Files Modified

- `next.config.ts`
- `app/layout.tsx`
- `app/[locale]/layout.tsx`

### Files Intentionally Untouched

- legacy lesson bodies in `uk/`
- legacy JS/CSS in `assets/`

### Risks / TODOs

- Full build verification still depends on installing Next.js dependencies.
- Redirect coverage for embedded legacy canonical paths should be confirmed during runtime verification.

## Phase 4 Migration Report

### Files Added

- `app/[locale]/page.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/roadmap/page.tsx`
- `app/[locale]/faq/page.tsx`
- `app/[locale]/donate/page.tsx`
- `app/[locale]/dashboard/page.tsx`
- `app/[locale]/saved/page.tsx`
- `app/[locale]/progress/page.tsx`
- `app/[locale]/login/page.tsx`
- `app/[locale]/register/page.tsx`
- `app/[locale]/admin/**`
- `src/modules/progress/**`
- `src/modules/bookmarks/**`
- `src/modules/donations/**`
- `src/modules/auth/**`
- `src/modules/runner/**`
- `app/api/runner/route.ts`

### Files Modified

- none of the legacy lesson sources

### Files Intentionally Untouched

- `uk/`
- `assets/`
- `server.js`
- `gen-sitemap.js`

### Risks / TODOs

- Account persistence remains a future seam, not an active backend.
- `/api/runner` is intentionally reserved and returns a non-enabled response.

## Phase 5 Migration Report

### Files Added

- none

### Files Modified

- `eslint.config.mjs`
- `REFACTOR_MIGRATION_PLAN.md`
- `ARCHITECTURE_OVERVIEW.md`
- `README.md`

### Files Intentionally Untouched

- `uk/`
- `assets/`
- `server.js`
- `gen-sitemap.js`
- `_ARTICLE_TEMPLATE.html`

### Risks / TODOs

- English lesson bodies are still intentionally absent and rely on Ukrainian fallback.
- Admin tooling is read-only; translation workflow and persistent accounts remain future phases.

## Verification Results

- `npm run build`: passing
- `npm run lint`: passing
- `node scripts/validate-migration.mjs`: passing
- Current generated artifact totals: `94` lessons, `14` tracks, `282` aliases

## Phase 6 Migration Report

### Findings

- The multilingual loader previously only distinguished between `uk` and an optional `en` file.
- English routing existed, but translation state was not explicit beyond file presence.
- The locale switcher preserved path identity but did not know whether the current lesson had a published translation.
- Admin locale reporting counted availability only and did not expose draft work or priority gaps.

### Files Added

- `scripts/generate-translation-stubs.mjs`
- `scripts/shared/localized-content.mjs`
- `scripts/data/translation-priority.json`
- `src/content/translation-priority.ts`
- `src/content/glossary.ts`
- `src/modules/content/frontmatter.ts`
- `src/modules/content/translation-status.ts`
- `components/docs/lesson-body.tsx`
- `TRANSLATION_WORKFLOW.md`
- `content/tracks/**/index.en.mdx`
- `content/generated/lesson-locale-index.json`

### Files Modified

- `package.json`
- `package-lock.json`
- `scripts/translation-stub-generator.mjs`
- `scripts/shared/legacy-content.mjs`
- `scripts/validate-migration.mjs`
- `src/types/content.ts`
- `src/modules/content/content.server.ts`
- `src/modules/admin/overview.server.ts`
- `components/common/locale-switcher.tsx`
- `app/[locale]/docs/[track]/[lesson]/page.tsx`
- `app/[locale]/admin/locales/page.tsx`
- `app/[locale]/admin/lessons/page.tsx`
- `app/sitemap.ts`
- `README.md`
- `LOCALE_STRATEGY.md`

### Files Intentionally Untouched

- `uk/`
- `assets/`
- `server.js`
- `gen-sitemap.js`
- canonical lesson slugs and existing locale-prefixed routes

### Outcomes

- English draft files now exist for all `94` lessons.
- Translation state is now structured as `missing`, `draft`, or `published`.
- The content loader falls back safely to Ukrainian for missing or draft translations.
- Validation reports both total English coverage and priority-lesson coverage.
- Admin locale reporting now shows draft counts, missing counts, and priority translation gaps.
- Lesson-level SEO now avoids indexing fallback English pages as if they were completed translations.

### Risks / TODOs

- English lesson bodies are still draft-only until translations are promoted to `published`.
- Search remains source-content oriented until published English titles/descriptions become available at scale.
- Future locale rollout should follow the same MDX stub + validation workflow established for English.

## Phase 7 Migration Report

### Findings

- All 20 priority English lessons existed as valid draft MDX files, but none were yet publicly published.
- The underlying route, fallback, and SEO infrastructure already worked, so this phase focused on content production rather than architecture changes.
- The most important operational gap was ensuring that published files, manifest status, validation output, and admin coverage all moved together.

### Files Added

- none

### Files Modified

- `content/tracks/intro/intro-to-javascript/index.en.mdx`
- `content/tracks/intro/code-editors/index.en.mdx`
- `content/tracks/intro/devtools/index.en.mdx`
- `content/tracks/basics/hello-world/index.en.mdx`
- `content/tracks/basics/code-structure/index.en.mdx`
- `content/tracks/basics/use-strict/index.en.mdx`
- `content/tracks/basics/variables/index.en.mdx`
- `content/tracks/basics/data-types/index.en.mdx`
- `content/tracks/basics/interaction/index.en.mdx`
- `content/tracks/basics/type-conversions/index.en.mdx`
- `content/tracks/basics/operators/index.en.mdx`
- `content/tracks/basics/comparison/index.en.mdx`
- `content/tracks/basics/ifelse/index.en.mdx`
- `content/tracks/basics/logical-operators/index.en.mdx`
- `content/tracks/basics/nullish-coalescing/index.en.mdx`
- `content/tracks/basics/loops/index.en.mdx`
- `content/tracks/basics/switch/index.en.mdx`
- `content/tracks/basics/function-basics/index.en.mdx`
- `content/tracks/basics/function-expressions/index.en.mdx`
- `content/tracks/basics/arrow-functions/index.en.mdx`
- `src/content/glossary.ts`
- `scripts/validate-migration.mjs`
- `TRANSLATION_WORKFLOW.md`
- `CONTENT_MIGRATION_REPORT.md`
- `README.md`

### Files Intentionally Untouched

- all Ukrainian source lessons in `uk/`
- canonical lesson slugs and docs routes
- legacy assets and preserved runtime files

### Published Lessons

- `intro/intro-to-javascript`
- `intro/code-editors`
- `intro/devtools`
- `basics/hello-world`
- `basics/code-structure`
- `basics/use-strict`
- `basics/variables`
- `basics/data-types`
- `basics/interaction`
- `basics/type-conversions`
- `basics/operators`
- `basics/comparison`
- `basics/ifelse`
- `basics/logical-operators`
- `basics/nullish-coalescing`
- `basics/loops`
- `basics/switch`
- `basics/function-basics`
- `basics/function-expressions`
- `basics/arrow-functions`

### Glossary Additions

- `asynchronous`
- `parameter`
- `argument`
- `method`
- `property`
- `statement`
- `module`

### Outcomes

- Published English lessons: `20`
- Remaining English draft lessons: `74`
- English coverage: `21%` (`20/94`)
- Priority coverage: `100%` (`20/20`)
- Priority lesson routes are now eligible for locale-specific indexing, while remaining draft English routes continue to fall back safely and stay protected from duplicate indexing.

### Validation Results

- `npm run validate:migration`: passing
- `npm run build`: passing
- `npm run lint`: passing
- Coverage report: `20/94` English published, `74` draft, `0` missing

## Phase 8 Migration Report

### Findings

- The published English lesson set was strong enough to justify public discovery pages for `intro` and `basics`, but the catalog and track routes still exposed draft-only English content too loosely.
- English lesson metadata was already safe at the lesson level, yet the track pages, catalog search, sidebar navigation, and internal lesson graph still needed published-only filtering.
- Sitemap coverage did not yet include locale-safe track landing pages, and admin reporting did not clearly separate indexable English pages from draft fallback routes.

### Files Added

- `src/content/track-overviews.ts`
- `src/content/learning-paths.ts`

### Files Modified

- `src/types/content.ts`
- `src/modules/content/content.server.ts`
- `src/modules/search/search.server.ts`
- `src/modules/navigation/navigation.server.ts`
- `components/docs/docs-sidebar.tsx`
- `components/common/locale-switcher.tsx`
- `app/[locale]/docs/page.tsx`
- `app/[locale]/docs/[track]/page.tsx`
- `app/[locale]/docs/[track]/[lesson]/page.tsx`
- `app/[locale]/admin/locales/page.tsx`
- `app/sitemap.ts`
- `README.md`
- `LOCALE_STRATEGY.md`
- `TRANSLATION_WORKFLOW.md`
- `CONTENT_MIGRATION_REPORT.md`

### Files Intentionally Untouched

- all Ukrainian lesson source files in `uk/`
- all English lesson bodies and translation statuses
- canonical lesson slugs and locale route identity
- legacy assets and preserved fallback runtime files

### Outcomes

- Live English track landing pages now exist for:
  - `/en/docs/intro`
  - `/en/docs/basics`
- The English docs catalog now highlights a published beginner path built from the 20 published English lessons.
- English search, sidebar navigation, track pages, related lessons, and previous/next links now promote only published English lessons.
- The locale switcher now disables unready English track pages instead of inviting readers onto hidden discovery surfaces.
- The sitemap now includes indexable English track landing pages while continuing to exclude draft-only English lessons from translated discovery.
- Admin locale reporting now shows published English lessons by track, track readiness, and the current count of indexable English pages.

### Validation Results

- `npm run lint`: passing
- `npm run build`: passing
- `npm run validate:migration`: passing
- Current English discovery totals:
  - published English lessons: `20`
  - live English track pages: `2`
  - indexable English docs pages: `23` (`20` lessons + `2` track pages + `/en/docs`)

### Risks / TODOs

- Only `intro` and `basics` are currently ready for English track discovery; all other English tracks remain intentionally hidden until they have published lessons.
- Fallback English lesson routes remain available for readers and QA, but they should continue to stay off translated discovery surfaces until publication.
- Future English publication waves should extend the same published-only discovery rules to any newly ready tracks.
