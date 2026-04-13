"use client";

import { useEffect, useMemo } from "react";

import {
  recordLessonVisit,
  toggleLessonBookmark,
  toggleLessonCompleted,
  updateLessonProgress,
} from "@/src/modules/progress/local-learning";
import { useLocalLearningState } from "@/src/modules/progress/use-local-learning";
import { getSiteCopy } from "@/src/modules/i18n/copy";
import type { LessonManifestEntry, Locale } from "@/src/types/content";

type LessonClientToolsProps = {
  entry: LessonManifestEntry;
  locale: Locale;
  requestedLocale: Locale;
  resolvedLocale: Locale;
};

function readProgressPercentage() {
  const article = document.querySelector("[data-lesson-article]");
  if (!article) {
    return 0;
  }

  const rect = article.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const height = Math.max(rect.height, 1);
  const viewportLine = window.scrollY + window.innerHeight * 0.45;
  return Math.max(0, Math.min(100, ((viewportLine - top) / height) * 100));
}

export function LessonClientTools({
  entry,
  locale,
  requestedLocale,
  resolvedLocale,
}: LessonClientToolsProps) {
  const state = useLocalLearningState();
  const snapshot = state.lessons[entry.id];
  const copy = getSiteCopy(locale);

  useEffect(() => {
    recordLessonVisit(entry);
  }, [entry]);

  useEffect(() => {
    let ticking = false;

    const sync = () => {
      ticking = false;
      updateLessonProgress(entry, readProgressPercentage());
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entry]);

  const progress = snapshot?.progress ?? 0;
  const isCompleted = snapshot?.completed ?? false;
  const isBookmarked = snapshot?.bookmarked ?? false;

  const completionLabel = useMemo(
    () => (isCompleted ? copy.common.completed : copy.common.complete),
    [copy.common.complete, copy.common.completed, isCompleted],
  );

  return (
    <div className="space-y-4">
      {requestedLocale !== resolvedLocale ? (
        <div className="rounded-3xl border border-ember/20 bg-ember/10 px-4 py-4 text-sm text-ink/75">
          <p className="font-semibold text-ink">{copy.common.fallbackBadge}</p>
          <p className="mt-1">{copy.common.fallbackDescription}</p>
        </div>
      ) : null}

      <div className="content-card rounded-[1.75rem] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => toggleLessonCompleted(entry)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isCompleted
                ? "bg-pine text-white"
                : "bg-ink text-paper hover:bg-ember"
            }`}
          >
            {completionLabel}
          </button>
          <button
            type="button"
            onClick={() => toggleLessonBookmark(entry)}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ember/30"
          >
            {isBookmarked ? copy.common.unsave : copy.common.save}
          </button>
          <div className="ml-auto min-w-[12rem] flex-1">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-ink/55">
              <span>{copy.common.progress}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-black/8">
              <div
                className="h-2 rounded-full bg-pine transition-all"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
