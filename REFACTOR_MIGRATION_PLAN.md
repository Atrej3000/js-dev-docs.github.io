# Refactor Migration Plan

## Mission

Transform the preserved static educational site into a multilingual Next.js platform while keeping the Ukrainian lesson corpus intact and traceable.

## Non-Negotiable Rules

- Do not delete or rewrite lesson bodies during the first migration wave.
- Preserve legacy source paths, file ordering, and canonical/file-path drift as auditable migration data.
- Keep legacy files in place until the new app, redirects, and migrated content are verified.
- Use donation/support flows only. No billing or paywalls.

## Phase Status

### Phase 1: Audit, Documentation, and App Foundation

Status: `implemented`

- Audited legacy structure: `94` lesson files across `14` sections.
- Confirmed identity drift between file-path slugs, canonical URLs, and `ARTICLE_META`.
- Added Next.js, TypeScript, Tailwind, PostCSS, and ESLint scaffolding.
- Added core migration documents and updated the root README.

### Phase 2: Legacy Inventory and Content Migration Pipeline

Status: `implemented`

- Build reproducible extraction scripts.
- Generate a content-first lesson tree under `content/tracks`.
- Emit typed manifest, alias, and migration anomaly data.

### Phase 3: Content Modules, Locale Routing, and Docs Experience

Status: `implemented`

- Add typed server loaders for manifest/content/search.
- Implement locale-aware docs routes, fallback logic, and redirects.
- Render docs UI with sidebar, breadcrumbs, TOC, and previous/next navigation.

### Phase 4: User Layer, Donation Layer, and Admin Visibility

Status: `implemented`

- Add local-first progress, bookmarks, and recent lessons.
- Build landing, donate, FAQ, roadmap, dashboard, and admin pages.
- Expose migration status and locale coverage in read-only admin views.

### Phase 5: Verification and Hardening

Status: `implemented`

- Installed dependencies and finalized the flat ESLint setup.
- Ran migration, search-index, and validation scripts successfully.
- Verified `next build` and `npm run lint` pass against the migrated platform.

## Route Strategy

- Canonical lesson routes: `/[locale]/docs/<track>/<lesson>`
- Legacy lesson routes: preserved as redirect aliases from `/<locale>/<section>/<lesson>.html`
- Legacy runtime fallback: exposed separately so preserved HTML remains accessible during verification

## Lesson Identity Strategy

Identity precedence during migration:

1. Embedded canonical URL path when valid
2. String `ARTICLE_META`
3. Numeric `ARTICLE_META` resolved through legacy NAV
4. File path fallback

Known bad numeric metadata is recorded explicitly instead of trusted silently.

## Implemented Runtime Notes

- Canonical docs pages live under `app/[locale]/docs/[track]/[lesson]`.
- Legacy `.html` lesson routes redirect through either Next redirects or the fallback redirect page at `app/[locale]/[track]/[legacyLesson]/page.tsx`.
- Preserved HTML and asset runtime access stays available through `/legacy/...` and `/assets/...`.
- Local-first progress and bookmarks live in typed browser storage modules under `src/modules/progress` and `src/modules/bookmarks`.

## Verification Snapshot

- `npm run build`: passing
- `npm run lint`: passing
- Migration validation: `94` lessons, `14` tracks, `282` aliases
