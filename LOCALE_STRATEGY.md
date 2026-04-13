# Locale Strategy

## Supported Locales

- Default source locale: `uk`
- First expansion locale: `en`

## Routing

- All user-facing routes are locale-prefixed: `/[locale]/...`
- Canonical lesson routes are locale-aware: `/[locale]/docs/<track>/<lesson>`

## Fallback Rules

- Ukrainian content is the source of truth.
- If `en` lesson content is missing or still marked as `draft`, the platform renders the Ukrainian lesson body while preserving the requested locale route.
- Translation availability is explicit in typed lesson metadata.
- The current UI surfaces fallback state on lesson pages so readers can see when the body comes from the Ukrainian source file.
- Public English discovery surfaces promote only `published` lessons. Draft-only English lessons remain reachable only through safe fallback routes and are not treated as translated catalog content.

## Translation Lifecycle

- `missing`: no localized file exists yet for the lesson.
- `draft`: a localized file exists, but the public lesson route still falls back to Ukrainian.
- `published`: the localized file is rendered directly and included in locale-aware discoverability.

Translation completeness is tracked per locale so admin tooling and validation can measure progress beyond a simple yes/no flag.

## Stable Lesson Identity

- Lesson identity is locale-independent and based on canonical lesson slugs.
- Translation switching preserves lesson identity by changing only the locale segment.
- Legacy file-path slugs remain aliases and redirect targets, not the new canonical identity.

## Safer Content Storage Choice

The source migration wave preserves Ukrainian lesson bodies as HTML files rather than converting them wholesale to MDX. This is intentional because:

- The legacy corpus is already authored and structured as HTML.
- Preserving body HTML minimizes the risk of damaging code blocks, anchors, or formatting.
- Metadata, ordering, aliases, and locale availability can still be strongly typed around preserved HTML bodies.

Secondary locales use `index.<locale>.mdx` so translators can work in a structured, metadata-aware format without touching the preserved Ukrainian source files.

## SEO Behavior

- Published localized lessons get locale-specific titles and descriptions.
- Fallback lesson routes remain reachable, but untranslated secondary-locale lesson pages are marked `noindex` to avoid duplicate-indexing issues.
- The sitemap includes canonical lesson URLs for published locales and track landing pages only when a locale has indexable content for that track.
- Locale alternates are advertised only for track pages that are actually ready in both locales.
- The English docs catalog, English track pages, and the 20 published English lessons are indexable. Draft-only English lesson routes remain excluded from translated discovery.

## Implemented Today

- Locale-prefixed App Router structure under `app/[locale]`
- Lesson-aware locale switcher that preserves the current route and disables unpublished translations gracefully
- Locale-aware sitemap and metadata alternates
- English-ready docs routes with Ukrainian fallback for missing or draft lesson bodies
- Verified canonical lesson generation for both `uk` and `en` routes during `next build`
- Published-only English discovery surfaces for track pages, search, sidebar navigation, and internal lesson links
