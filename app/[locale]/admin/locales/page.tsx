import Link from "next/link";
import { notFound } from "next/navigation";

import { getTranslationMetrics } from "@/src/modules/content/content.server";
import { isLocale } from "@/src/modules/i18n/config";

export default async function AdminLocalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const metrics = getTranslationMetrics("en");

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8">
        <p className="eyebrow">Admin / Locales</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">Translation coverage</h1>
        <p className="mt-4 text-lg text-ink/72">
          Ukrainian remains canonical. English now has explicit missing, draft, and
          published states so the fallback behavior is measurable instead of implicit.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="content-card rounded-[1.75rem] p-6">
          <p className="eyebrow">Lessons total</p>
          <p className="mt-3 text-4xl font-bold text-ink">{metrics.totalLessons}</p>
          <p className="mt-2 text-sm text-ink/65">Canonical lesson identities across all tracks.</p>
        </div>
        <div className="content-card rounded-[1.75rem] p-6">
          <p className="eyebrow">English published</p>
          <p className="mt-3 text-4xl font-bold text-ink">{metrics.translatedCount}</p>
          <p className="mt-2 text-sm text-ink/65">{metrics.coverage}% of the lesson catalog.</p>
        </div>
        <div className="content-card rounded-[1.75rem] p-6">
          <p className="eyebrow">English drafts</p>
          <p className="mt-3 text-4xl font-bold text-ink">{metrics.draftCount}</p>
          <p className="mt-2 text-sm text-ink/65">
            Translation files that exist but still fall back to Ukrainian.
          </p>
        </div>
        <div className="content-card rounded-[1.75rem] p-6">
          <p className="eyebrow">English missing</p>
          <p className="mt-3 text-4xl font-bold text-ink">{metrics.missingCount}</p>
          <p className="mt-2 text-sm text-ink/65">
            Lessons without any locale file for English yet.
          </p>
        </div>
        <div className="content-card rounded-[1.75rem] p-6">
          <p className="eyebrow">Indexable EN pages</p>
          <p className="mt-3 text-4xl font-bold text-ink">{metrics.indexablePages.total}</p>
          <p className="mt-2 text-sm text-ink/65">
            {metrics.indexablePages.lessonPages} lessons, {metrics.indexablePages.trackPages} track
            pages, and {metrics.indexablePages.docsCatalog} catalog page.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="content-card rounded-[2rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Priority translation queue</p>
              <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
                High-priority English gaps
              </h2>
            </div>
            <div className="rounded-full bg-black/5 px-4 py-2 text-sm text-ink/65">
              {metrics.priority.coverage}% priority coverage
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {metrics.priorityUntranslatedLessons.map(({ entry, status, completeness }) => (
              <div
                key={entry.id}
                className="rounded-[1.5rem] border border-black/6 bg-white/75 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{entry.title}</p>
                    <p className="mt-1 font-mono text-xs text-ink/50">{entry.id}</p>
                  </div>
                  <div className="text-right text-sm text-ink/60">
                    <p>Status: {status}</p>
                    <p>Completeness: {completeness}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/${locale}/docs/${entry.track}/${entry.slug}`}
                    className="text-sm font-semibold text-ink underline decoration-ember/40 underline-offset-4"
                  >
                    Open canonical lesson
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="content-card rounded-[1.75rem] p-6">
            <p className="eyebrow">Locale totals</p>
            <div className="mt-4 space-y-4 text-sm text-ink/72">
              <div className="rounded-[1.5rem] bg-white/75 p-4">
                <p className="font-semibold text-ink">Ukrainian</p>
                <p className="mt-2">Published: {metrics.byLocale.uk.published}</p>
                <p>Draft: {metrics.byLocale.uk.draft}</p>
                <p>Missing: {metrics.byLocale.uk.missing}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/75 p-4">
                <p className="font-semibold text-ink">English</p>
                <p className="mt-2">Published: {metrics.byLocale.en.published}</p>
                <p>Draft: {metrics.byLocale.en.draft}</p>
                <p>Missing: {metrics.byLocale.en.missing}</p>
              </div>
            </div>
          </div>

          <div className="content-card rounded-[1.75rem] p-6">
            <p className="eyebrow">Priority totals</p>
            <div className="mt-4 space-y-2 text-sm text-ink/72">
              <p>Total high priority lessons: {metrics.priority.total}</p>
              <p>Published in English: {metrics.priority.published}</p>
              <p>Draft in English: {metrics.priority.draft}</p>
              <p>Missing in English: {metrics.priority.missing}</p>
            </div>
          </div>

          <div className="content-card rounded-[1.75rem] p-6">
            <p className="eyebrow">Track readiness</p>
            <div className="mt-4 space-y-3">
              {metrics.tracks.map((track) => (
                <div
                  key={track.track}
                  className="rounded-[1.5rem] border border-black/6 bg-white/75 p-4 text-sm text-ink/72"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{track.title}</p>
                      <p className="mt-1 font-mono text-xs text-ink/45">{track.track}</p>
                    </div>
                    <div className="rounded-full bg-black/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-ink/60">
                      {track.readiness}
                    </div>
                  </div>
                  <p className="mt-3">
                    Published English lessons: {track.discoverableLessonCount}/{track.lessonCount}
                  </p>
                  <p>Indexable track page: {track.isIndexable ? "yes" : "no"}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="content-card rounded-[2rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Published English lessons by track</p>
            <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
              Discoverability snapshot
            </h2>
          </div>
          <div className="rounded-full bg-black/5 px-4 py-2 text-sm text-ink/65">
            Draft-only English tracks stay off the public discovery surface
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {metrics.tracks
            .filter((track) => track.discoverableLessonCount > 0)
            .map((track) => (
              <div
                key={track.track}
                className="rounded-[1.5rem] border border-black/6 bg-white/80 p-4 text-sm text-ink/72"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{track.title}</p>
                    <p className="mt-1 font-mono text-xs text-ink/45">{track.track}</p>
                  </div>
                  <Link
                    href={`/${locale}/docs/${track.track}`}
                    className="text-sm font-semibold text-ink underline decoration-ember/40 underline-offset-4"
                  >
                    Open track page
                  </Link>
                </div>
                <p className="mt-3">
                  {track.discoverableLessonCount} published English lessons available for
                  indexing.
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
