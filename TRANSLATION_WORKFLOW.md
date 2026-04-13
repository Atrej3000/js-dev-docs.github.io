# Translation Workflow

## Purpose

This document describes the safe translation workflow for JS Dev Docs after the platform refactor.

- Ukrainian remains the canonical lesson source.
- English and future locales are additive.
- Canonical lesson slugs never change across locales.
- Draft translations must never overwrite or replace Ukrainian lesson files.

## File Model

Each lesson lives under:

`content/tracks/<track>/<lesson>/`

Current locale files:

- `index.uk.html`: preserved Ukrainian source body
- `index.en.mdx`: English translation draft or published lesson
- `meta.json`: generated canonical metadata and translation state

## Translation Status

Each localized lesson is tracked as one of:

- `missing`: there is no localized file yet
- `draft`: a localized file exists, but public rendering still falls back to Ukrainian
- `published`: the localized file is rendered directly on the lesson route

## Creating Drafts

To generate safe English draft files for every lesson:

```bash
npm run generate:translations -- --locale en
```

This command:

- creates `index.en.mdx` only when it does not already exist
- never overwrites an existing translation
- sets `translationStatus: "draft"`
- sets `sourceLocale: "uk"`
- preserves stable lesson identity via `track` and `slug`

## Publishing A Translation

1. Open the lesson directory.
2. Replace the draft body in `index.en.mdx` with the translated lesson content.
3. Update frontmatter:

```md
---
title: "English lesson title"
description: "English lesson description"
slug: "stable-lesson-slug"
track: "stable-track-slug"
locale: "en"
sourceLocale: "uk"
translationStatus: "published"
translationCompleteness: 100
---
```

4. Keep the slug and track identical to the canonical lesson identity.
5. Run:

```bash
npm run migrate:content
npm run build:search
npm run validate:migration
```

6. Confirm that:

- the lesson now reports `translationStatus: "published"`
- it no longer falls back to Ukrainian on the English route
- it appears in published locale coverage and SEO output
- it becomes eligible for the English discovery surface: `/en/docs`, English track pages, English sidebar navigation, and locale-safe related lesson links

## Validation Rules

The validation pipeline checks:

- missing English files
- empty English files
- broken frontmatter
- slug or track mismatch
- missing fallback configuration
- translation coverage
- priority coverage
- published/draft status alignment between the English file and generated manifest
- priority lesson publication status after the first wave

## Priority Lessons

The first English publication wave should focus on the lessons defined in:

[`src/content/translation-priority.ts`](./src/content/translation-priority.ts)

These are the beginner and core-JavaScript lessons that give the bilingual academy the highest user value earliest.

## Published Priority Wave

The first published English wave includes all 20 priority lessons:

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

## Glossary

Terminology guidance lives in:

[`src/content/glossary.ts`](./src/content/glossary.ts)

Use `getTerm(term, locale)` to keep translations consistent across lessons.

Recent glossary additions used in the first publication wave:

- `asynchronous`
- `parameter`
- `argument`
- `method`
- `property`
- `statement`
- `module`

## SEO Notes

- Published localized lessons can be indexed normally.
- Draft or fallback lesson routes remain usable for readers, but should not be indexed as translated content.
- Ukrainian remains the authoritative content baseline until another locale is explicitly marked `published`.
- Track landing pages should expose only published localized lessons. Partial-English tracks may still have indexable landing pages, but they must clearly list only the lessons that are truly published in that locale.
