import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsSearch } from "@/components/docs/docs-search";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { getLessonSearchEntries } from "@/src/modules/search/search.server";
import { getSidebarTracks } from "@/src/modules/navigation/navigation.server";
import {
  getBeginnerPathLessonsForLocale,
  getTrackSummariesForLocale,
} from "@/src/modules/content/content.server";
import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import { absoluteUrl } from "@/src/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const title =
    locale === "en"
      ? "JavaScript lessons in English"
      : getSiteCopy(locale).docs.catalogTitle;
  const description =
    locale === "en"
      ? "Browse the published English JavaScript lessons, follow the beginner path, and explore the translated Intro and JavaScript Fundamentals tracks."
      : getSiteCopy(locale).docs.catalogDescription;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/docs`),
      languages: {
        uk: absoluteUrl("/uk/docs"),
        en: absoluteUrl("/en/docs"),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      url: absoluteUrl(`/${locale}/docs`),
    },
  };
}

export default async function DocsCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteCopy(locale);
  const tracks = getTrackSummariesForLocale(locale);
  const sidebarTracks = getSidebarTracks(locale);
  const beginnerPath = getBeginnerPathLessonsForLocale(locale);
  const searchEntries = getLessonSearchEntries(locale);
  const englishPublishedCount = tracks.reduce(
    (count, track) => count + track.discoverableLessonCount,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <DocsSidebar tracks={sidebarTracks} locale={locale} />

        <div className="space-y-6">
          <section className="content-card rounded-[2rem] p-8">
            <p className="eyebrow">{copy.nav.lessons}</p>
            <h1 className="mt-3 font-sans text-4xl font-bold text-ink">
              {copy.docs.catalogTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-ink/72">
              {locale === "en"
                ? "Browse only the published English lessons, track pages, and search results that are ready for public discovery."
                : copy.docs.catalogDescription}
            </p>
            {locale === "en" ? (
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/65">
                <span className="rounded-full bg-black/5 px-4 py-2">
                  {englishPublishedCount} published English lessons
                </span>
                <span className="rounded-full bg-black/5 px-4 py-2">
                  {tracks.length} English track pages live
                </span>
                <span className="rounded-full bg-black/5 px-4 py-2">
                  Draft-only lessons stay on protected fallback routes
                </span>
              </div>
            ) : null}
          </section>

          {locale === "en" && beginnerPath.length ? (
            <section className="content-card rounded-[2rem] p-6 lg:p-8">
              <p className="eyebrow">Start here</p>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-3xl">
                  <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
                    Follow the published beginner path
                  </h2>
                  <p className="mt-4 text-lg text-ink/72">
                    This path strings the published English onboarding lessons into a
                    clear beginner journey, from understanding what JavaScript is to
                    writing and comparing functions confidently.
                  </p>
                </div>
                <Link
                  href={`/${locale}/docs/${beginnerPath[0].track}/${beginnerPath[0].slug}`}
                  className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ember"
                >
                  Start with{" "}
                  {beginnerPath[0].translationStatus.locales.en.title ?? beginnerPath[0].title}
                </Link>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {beginnerPath.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/docs/${lesson.track}/${lesson.slug}`}
                    className="rounded-[1.5rem] border border-black/6 bg-white/80 px-4 py-4 transition hover:border-ember/30"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 font-sans text-xl font-semibold text-ink">
                      {lesson.translationStatus.locales.en.title ?? lesson.title}
                    </p>
                    <p className="mt-2 text-sm text-ink/60">
                      {lesson.track === "intro" ? "Introduction" : "JavaScript Fundamentals"}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <DocsSearch
            locale={locale}
            entries={searchEntries}
            placeholder={copy.docs.searchPlaceholder}
            emptyText={copy.docs.searchEmpty}
          />

          <section className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <Link
                key={track.track}
                href={`/${locale}/docs/${track.track}`}
                className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-xl font-semibold text-ink">{track.title}</p>
                    <p className="mt-2 text-sm text-ink/65">
                      {locale === "en"
                        ? `${track.discoverableLessonCount} published English lessons`
                        : `${track.lessonCount} lessons in this track`}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink/45">
                    {String(track.sectionOrder).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
