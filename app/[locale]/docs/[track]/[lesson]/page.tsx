import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { LessonBody } from "@/components/docs/lesson-body";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";
import { LessonClientTools } from "@/components/docs/lesson-client-tools";
import {
  getBeginnerPathLessonsForLocale,
  getLocalizedLessonContent,
  getLessonMetadataForLocale,
  getLessonManifest,
  getRelatedLessons,
  getSiblingLessons,
  resolveLessonRoute,
} from "@/src/modules/content/content.server";
import { getSidebarTracks } from "@/src/modules/navigation/navigation.server";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import { isLocale, locales } from "@/src/modules/i18n/config";
import { absoluteUrl } from "@/src/lib/seo/site";
import { getLocalizedTrackTitle } from "@/src/content/track-overviews";

type LessonPageProps = {
  params: Promise<{
    locale: string;
    track: string;
    lesson: string;
  }>;
};

function localizeCanonicalRoute(route: string, locale: string) {
  return route.replace(/^\/uk\b/, `/${locale}`);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getLessonManifest().map((entry) => ({
      locale,
      track: entry.track,
      lesson: entry.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { locale, track, lesson } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const resolved = resolveLessonRoute(track, lesson);
  if (!resolved.entry) {
    return {};
  }

  const localizedMetadata = getLessonMetadataForLocale(resolved.entry, locale);
  const path = `/${locale}/docs/${resolved.entry.track}/${resolved.entry.slug}`;
  const localizedTrackTitle = getLocalizedTrackTitle(
    resolved.entry.track,
    locale,
    resolved.entry.trackTitle,
  );

  return {
    title: localizedMetadata.title,
    description: localizedMetadata.description,
    category: localizedTrackTitle,
    keywords: [
      localizedMetadata.title,
      localizedTrackTitle,
      resolved.entry.slug,
      ...resolved.entry.badges,
    ],
    robots:
      locale !== "uk" && localizedMetadata.isFallback
        ? {
            index: false,
            follow: true,
          }
        : undefined,
    alternates: {
      canonical: absoluteUrl(path),
      languages: Object.fromEntries(
        resolved.entry.availableLocales.map((availableLocale) => [
          availableLocale,
          absoluteUrl(`/${availableLocale}/docs/${resolved.entry.track}/${resolved.entry.slug}`),
        ]),
      ),
    },
    openGraph: {
      title: localizedMetadata.title,
      description: localizedMetadata.description,
      type: "article",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      section: localizedTrackTitle,
      url: absoluteUrl(path),
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, track, lesson } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const resolved = resolveLessonRoute(track, lesson);
  if (!resolved.entry) {
    notFound();
  }

  if (resolved.redirectTo) {
    permanentRedirect(localizeCanonicalRoute(resolved.redirectTo, locale) as Route);
  }

  const copy = getSiteCopy(locale);
  const lessonContent = getLocalizedLessonContent(resolved.entry, locale);
  const localizedMetadata = getLessonMetadataForLocale(resolved.entry, locale);
  const requestedLocaleState = resolved.entry.translationStatus.locales[locale];
  const siblings = getSiblingLessons(resolved.entry, locale);
  const relatedLessons = getRelatedLessons(resolved.entry, locale);
  const sidebarTracks = getSidebarTracks(locale);
  const beginnerPath = getBeginnerPathLessonsForLocale(locale);
  const beginnerPathIndex = beginnerPath.findIndex(
    (candidate) => candidate.id === resolved.entry.id,
  );
  const nextRecommended =
    beginnerPathIndex >= 0 && beginnerPathIndex < beginnerPath.length - 1
      ? beginnerPath[beginnerPathIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[19rem_minmax(0,1fr)_18rem]">
          <DocsSidebar
            tracks={sidebarTracks}
            locale={locale}
            activeLessonId={resolved.entry.id}
          />

        <div className="space-y-6">
          <section className="content-card rounded-[2rem] p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-black/5 px-3 py-1 font-mono text-xs text-ink/60">
                {resolved.entry.articleNumber}
              </span>
              {resolved.entry.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-black/8 px-3 py-1 text-xs font-medium text-ink/70"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="mt-5 font-sans text-4xl font-bold text-ink lg:text-5xl">
              {localizedMetadata.title}
            </h1>
            <p className="mt-4 text-lg text-ink/72">{localizedMetadata.description}</p>
            <div className="mt-6">
              <LessonClientTools
                entry={resolved.entry}
                locale={locale}
                requestedLocale={lessonContent.requestedLocale}
                resolvedLocale={lessonContent.resolvedLocale}
              />
            </div>
          </section>

          <LessonBody payload={lessonContent} />

          {siblings.previous || siblings.next ? (
            <section className="grid gap-4 md:grid-cols-2">
              {siblings.previous ? (
                <Link
                  href={`/${locale}/docs/${siblings.previous.track}/${siblings.previous.slug}`}
                  className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
                >
                  <p className="eyebrow">{copy.docs.previousLesson}</p>
                  <p className="mt-3 font-sans text-xl font-semibold text-ink">
                    {getLessonMetadataForLocale(siblings.previous, locale).title}
                  </p>
                </Link>
              ) : null}

              {siblings.next ? (
                <Link
                  href={`/${locale}/docs/${siblings.next.track}/${siblings.next.slug}`}
                  className="content-card rounded-[1.75rem] p-5 text-right transition hover:border-ember/30"
                >
                  <p className="eyebrow">{copy.docs.nextLesson}</p>
                  <p className="mt-3 font-sans text-xl font-semibold text-ink">
                    {getLessonMetadataForLocale(siblings.next, locale).title}
                  </p>
                </Link>
              ) : null}
            </section>
          ) : null}

          {locale === "en" && beginnerPathIndex >= 0 ? (
            <section className="content-card rounded-[2rem] p-6 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Beginner path</p>
                  <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
                    Stay on the published English path
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg text-ink/72">
                    You are on step {beginnerPathIndex + 1} of {beginnerPath.length} in
                    the current English onboarding journey.
                  </p>
                </div>
                <Link
                  href="/en/docs"
                  className="inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ember/30"
                >
                  Browse the full path
                </Link>
              </div>

              {nextRecommended ? (
                <div className="mt-6 rounded-[1.5rem] border border-black/6 bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                    Next recommended lesson
                  </p>
                  <Link
                    href={`/${locale}/docs/${nextRecommended.track}/${nextRecommended.slug}`}
                    className="mt-3 block font-sans text-2xl font-semibold text-ink transition hover:text-ember"
                  >
                    {getLessonMetadataForLocale(nextRecommended, locale).title}
                  </Link>
                  <p className="mt-2 text-sm text-ink/60">
                    Continue the published beginner sequence without jumping into
                    untranslated material.
                  </p>
                </div>
              ) : null}
            </section>
          ) : null}

          {relatedLessons.length ? (
            <section className="content-card rounded-[2rem] p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{copy.docs.relatedLessons}</p>
                  <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
                    {copy.docs.relatedLessons}
                  </h2>
                </div>
                <a
                  href={`/legacy/${resolved.entry.sourcePath}`}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ember/30"
                >
                  {copy.common.legacyFallback}
                </a>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {relatedLessons.map((related) => (
                  <Link
                    key={related.id}
                    href={`/${locale}/docs/${related.track}/${related.slug}`}
                    className="rounded-[1.5rem] border border-black/5 bg-white/80 px-4 py-4 transition hover:border-ember/30"
                  >
                    <p className="font-semibold text-ink">
                      {getLessonMetadataForLocale(related, locale).title}
                    </p>
                    <p className="mt-2 text-sm text-ink/60">
                      {getLocalizedTrackTitle(related.track, locale, related.trackTitle)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="space-y-6">
          <DocsToc headings={resolved.entry.headings} title={copy.docs.tocTitle} />

          <section className="content-card rounded-[1.75rem] p-5">
            <p className="eyebrow">{copy.common.translationStatus}</p>
            <div className="mt-4 space-y-3 text-sm text-ink/70">
              <p>
                <span className="font-semibold text-ink">{copy.common.sourceLanguage}: </span>
                {resolved.entry.translationStatus.sourceLocale.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold text-ink">Requested locale: </span>
                {locale.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold text-ink">Status: </span>
                {requestedLocaleState.status.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold text-ink">Rendered locale: </span>
                {lessonContent.resolvedLocale.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold text-ink">{copy.common.localeCoverage}: </span>
                {resolved.entry.availableLocales
                  .map((availableLocale) => availableLocale.toUpperCase())
                  .join(", ")}
              </p>
              <p>
                <span className="font-semibold text-ink">Translation completeness: </span>
                {resolved.entry.translationCompleteness[locale] ?? 0}%
              </p>
              <div className="pt-2">
                <Link
                  href={`/${locale}/donate`}
                  className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-ember"
                >
                  {copy.common.supportProject}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
