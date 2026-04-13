# Architecture Overview

## Legacy System

- Static HTML lessons under `uk/`
- Shared CSS in `assets/css/main.css`
- Shared interactivity in `assets/js/app.js`
- Language registry and client-side locale switching in `assets/js/i18n.js`
- Custom static development server in `server.js`

## New Platform Shape

### App Router

- `app/[locale]/...` for all user-facing pages
- `app/[locale]/docs/[track]/[lesson]` for canonical lesson pages
- `app/[locale]/admin/...` for read-only migration and content visibility
- `app/legacy/...` and `app/assets/...` to preserve runtime access to legacy material during verification
- `app/api/runner` reserved for future safe execution support

### Domain Modules

- `src/modules/content` for manifest and lesson loading
- `src/modules/navigation` for typed sidebar, breadcrumbs, and prev/next sequencing
- `src/modules/search` for local search index access
- `src/modules/progress` for local-first learning state
- `src/modules/bookmarks` for saved lessons
- `src/modules/donations` for external support providers and CTA content
- `src/modules/i18n` for locale configuration and fallback behavior
- `src/modules/admin` for migration/admin summaries
- `src/modules/auth` and `src/modules/runner` as future seams only

### Content Layer

- `content/tracks/<track>/<lesson>/index.uk.html` preserves migrated lesson body HTML
- `content/tracks/<track>/<lesson>/meta.json` stores typed lesson metadata and provenance
- `content/generated/*.json` stores build artifacts such as inventory, manifest, aliases, and search index

### User Layer

- Local-first learning state in browser storage
- Recent lessons, completion, and bookmarks wired into docs pages and dashboard routes
- Auth kept as a future-ready contract rather than a required runtime dependency

## Key Decisions

- Ukrainian remains the source-of-truth locale.
- English is route-ready with graceful Ukrainian fallback.
- Lesson bodies stay file-based, not database-based.
- Legacy slug drift is preserved in metadata and redirects, not flattened away.
- Progress and bookmarks are local-first in the initial implementation.

## Verification State

- The migration pipeline regenerates the content tree, manifests, aliases, and search index during build.
- The App Router implementation builds successfully with static generation for canonical lesson routes.
- ESLint and Next type checks pass with the current root configuration.
