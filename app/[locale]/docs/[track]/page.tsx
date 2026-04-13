import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { getSidebarTracks } from "@/src/modules/navigation/navigation.server";
import {
  getLessonMetadataForLocale,
  getTrackByAlias,
  getTrackSummariesForLocale,
} from "@/src/modules/content/content.server";
import { getTrackOverviewCopy } from "@/src/content/track-overviews";
import { isLocale, locales } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import { absoluteUrl } from "@/src/lib/seo/site";

type TrackPageProps = {
  params: Promise<{
    locale: string;
    track: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTrackSummariesForLocale(locale).map((track) => ({
      locale,
      track: track.track,
    })),
  );
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { locale, track } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const trackGroup = getTrackByAlias(track, locale);
  if (!trackGroup) {
    return {};
  }

  if (!trackGroup.isIndexable) {
    return {};
  }

  const overviewCopy = getTrackOverviewCopy(trackGroup.canonicalTrack, locale);
  const title = overviewCopy?.title ?? trackGroup.title;
  const description =
    overviewCopy?.introduction
    ?? (locale === "en"
      ? `Browse the published English lessons in the ${title} track.`
      : `Track overview for ${title}`);
  const canonicalPath = `/${locale}/docs/${trackGroup.canonicalTrack}`;
  const languages = Object.fromEntries(
    trackGroup.indexableLocales.map((availableLocale) => [
      availableLocale,
      absoluteUrl(`/${availableLocale}/docs/${trackGroup.canonicalTrack}`),
    ]),
  );

  return {
    title,
    description,
    keywords: [
      title,
      trackGroup.canonicalTrack,
      locale === "en" ? "javascript lessons in english" : "уроки javascript",
    ],
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      url: absoluteUrl(canonicalPath),
    },
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { locale, track } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const trackGroup = getTrackByAlias(track, locale);
  if (!trackGroup) {
    notFound();
  }

  if (trackGroup.canonicalTrack !== track) {
    permanentRedirect(`/${locale}/docs/${trackGroup.canonicalTrack}` as Route);
  }

  if (!trackGroup.isIndexable) {
    notFound();
  }

  const copy = getSiteCopy(locale);
  const sidebarTracks = getSidebarTracks(locale);
  const firstLesson = trackGroup.lessons[0];
  const overviewCopy = getTrackOverviewCopy(trackGroup.canonicalTrack, locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <DocsSidebar tracks={sidebarTracks} locale={locale} />

        <div className="space-y-6">
          <section className="content-card rounded-[2rem] p-8">
            <p className="eyebrow">{copy.docs.trackOverview}</p>
            <h1 className="mt-3 font-sans text-4xl font-bold text-ink">
              {trackGroup.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-ink/72">
              {overviewCopy?.introduction
                ?? "Canonical track routes remain locale-aware while the preserved lesson order stays anchored to the original Ukrainian source corpus."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink/65">
              <span className="rounded-full bg-black/5 px-4 py-2">
                {locale === "en"
                  ? `${trackGroup.discoverableLessonCount} published in English`
                  : `${trackGroup.lessonCount} lessons in this track`}
              </span>
              {locale === "en" && trackGroup.discoverableLessonCount < trackGroup.lessonCount ? (
                <span className="rounded-full bg-black/5 px-4 py-2">
                  {trackGroup.lessonCount - trackGroup.discoverableLessonCount} more lessons still in translation
                </span>
              ) : null}
            </div>

            {overviewCopy?.whatYouWillStudy.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {overviewCopy.whatYouWillStudy.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-black/6 bg-white/80 px-4 py-4 text-sm text-ink/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/docs/${firstLesson.track}/${firstLesson.slug}`}
                className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ember"
              >
                {overviewCopy?.ctaLabel ?? copy.common.startReading}
              </Link>
              <Link
                href={`/${locale}/docs`}
                className="inline-flex rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ember/30"
              >
                {copy.common.browseTracks}
              </Link>
            </div>

            {overviewCopy?.partialNotice ? (
              <p className="mt-4 max-w-3xl text-sm text-ink/60">
                {overviewCopy.partialNotice}
              </p>
            ) : null}
          </section>

          <section className="grid gap-4">
            {trackGroup.lessons.map((lesson) => {
              const localizedMetadata = getLessonMetadataForLocale(lesson, locale);

              return (
                <Link
                  key={lesson.id}
                  href={`/${locale}/docs/${lesson.track}/${lesson.slug}`}
                  className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-sans text-xl font-semibold text-ink">
                        {localizedMetadata.title}
                      </p>
                      <p className="mt-2 text-sm text-ink/65">
                        {localizedMetadata.description}
                      </p>
                    </div>
                    <div className="text-right text-sm text-ink/55">
                      <p className="font-mono">{lesson.articleNumber}</p>
                      <p>{lesson.estimatedMinutes ? `${lesson.estimatedMinutes} min` : "Open"}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
