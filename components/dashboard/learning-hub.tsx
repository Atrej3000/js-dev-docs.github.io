"use client";

import Link from "next/link";

import { getBookmarkedLessonIds } from "@/src/modules/bookmarks/storage";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import { clearLearningState } from "@/src/modules/progress/local-learning";
import { useLocalLearningState } from "@/src/modules/progress/use-local-learning";
import type { LessonManifestEntry, Locale } from "@/src/types/content";

type LearningHubProps = {
  locale: Locale;
  manifest: LessonManifestEntry[];
  variant?: "overview" | "saved" | "progress";
};

function buildManifestMap(manifest: LessonManifestEntry[]) {
  return new Map(manifest.map((entry) => [entry.id, entry]));
}

export function LearningHub({
  locale,
  manifest,
  variant = "overview",
}: LearningHubProps) {
  const state = useLocalLearningState();
  const manifestMap = buildManifestMap(manifest);
  const copy = getSiteCopy(locale);

  const recentEntries = state.recent
    .map((id) => manifestMap.get(id))
    .filter((entry): entry is LessonManifestEntry => Boolean(entry));

  const savedEntries = getBookmarkedLessonIds(state)
    .map((id) => manifestMap.get(id))
    .filter((entry): entry is LessonManifestEntry => Boolean(entry));

  const progressEntries = Object.values(state.lessons)
    .filter((lesson) => lesson.progress > 0)
    .sort((left, right) => right.updatedAt - left.updatedAt)
    .map((lesson) => ({
      snapshot: lesson,
      entry: manifestMap.get(lesson.id),
    }))
    .filter(
      (row): row is { snapshot: (typeof state.lessons)[string]; entry: LessonManifestEntry } =>
        Boolean(row.entry),
    );

  if (variant === "saved") {
    return (
      <section className="content-card rounded-[1.75rem] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{copy.dashboard.savedTitle}</p>
            <h2 className="mt-2 font-sans text-2xl font-bold text-ink">
              {copy.dashboard.savedTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => clearLearningState()}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink/70 transition hover:border-ember/30 hover:text-ink"
          >
            Reset
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          {savedEntries.length ? (
            savedEntries.map((entry) => (
              <Link
                key={entry.id}
                href={`/${locale}/docs/${entry.track}/${entry.slug}`}
                className="rounded-2xl border border-black/5 bg-white/80 px-4 py-4 transition hover:border-ember/30"
              >
                <p className="font-semibold text-ink">{entry.title}</p>
                <p className="mt-1 text-sm text-ink/60">{entry.trackTitle}</p>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl bg-white/70 px-4 py-5 text-sm text-ink/65">
              {copy.common.noItems}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (variant === "progress") {
    return (
      <section className="content-card rounded-[1.75rem] p-6">
        <p className="eyebrow">{copy.dashboard.progressTitle}</p>
        <h2 className="mt-2 font-sans text-2xl font-bold text-ink">
          {copy.dashboard.progressTitle}
        </h2>
        <div className="mt-6 grid gap-3">
          {progressEntries.length ? (
            progressEntries.map(({ entry, snapshot }) => (
              <Link
                key={entry.id}
                href={`/${locale}/docs/${entry.track}/${entry.slug}`}
                className="rounded-2xl border border-black/5 bg-white/80 px-4 py-4 transition hover:border-ember/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{entry.title}</p>
                    <p className="mt-1 text-sm text-ink/60">{entry.trackTitle}</p>
                  </div>
                  <span className="font-mono text-sm text-ink/55">
                    {Math.round(snapshot.progress)}%
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl bg-white/70 px-4 py-5 text-sm text-ink/65">
              {copy.common.noItems}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="content-card rounded-[1.75rem] p-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">{copy.common.recentLessons}</p>
          <h2 className="mt-2 font-sans text-2xl font-bold text-ink">
            {copy.dashboard.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink/70">
            {copy.dashboard.description}
          </p>
          <div className="mt-6 grid gap-3">
            {recentEntries.length ? (
              recentEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/${locale}/docs/${entry.track}/${entry.slug}`}
                  className="rounded-2xl border border-black/5 bg-white/80 px-4 py-4 transition hover:border-ember/30"
                >
                  <p className="font-semibold text-ink">{entry.title}</p>
                  <p className="mt-1 text-sm text-ink/60">{entry.trackTitle}</p>
                </Link>
              ))
            ) : (
              <p className="rounded-2xl bg-white/70 px-4 py-5 text-sm text-ink/65">
                {copy.common.noItems}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-black/8 bg-white/70 p-5">
          <p className="eyebrow">{copy.common.progress}</p>
          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl bg-paper px-4 py-4">
              <p className="text-3xl font-bold text-ink">
                {Object.values(state.lessons).filter((lesson) => lesson.completed).length}
              </p>
              <p className="text-sm text-ink/65">{copy.common.completed}</p>
            </div>
            <div className="rounded-2xl bg-paper px-4 py-4">
              <p className="text-3xl font-bold text-ink">{savedEntries.length}</p>
              <p className="text-sm text-ink/65">{copy.dashboard.savedTitle}</p>
            </div>
            <div className="rounded-2xl bg-paper px-4 py-4">
              <p className="text-3xl font-bold text-ink">
                {Math.round(
                  progressEntries.reduce((total, row) => total + row.snapshot.progress, 0) /
                    Math.max(progressEntries.length, 1),
                ) || 0}
                %
              </p>
              <p className="text-sm text-ink/65">{copy.dashboard.progressTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
