"use client";

import type {
  LessonManifestEntry,
  LocalLearningLessonState,
  LocalLearningState,
} from "@/src/types/content";

const STORAGE_KEY = "js-dev-docs-learning:v1";
const CHANGE_EVENT = "js-dev-docs-learning:change";

const emptyState: LocalLearningState = {
  version: 1,
  recent: [],
  lessons: {},
};

function safeWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

export function readLearningState(): LocalLearningState {
  const currentWindow = safeWindow();
  if (!currentWindow) {
    return emptyState;
  }

  try {
    const raw = currentWindow.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState;
    }

    const parsed = JSON.parse(raw) as LocalLearningState;
    if (parsed.version !== 1) {
      return emptyState;
    }

    return parsed;
  } catch {
    return emptyState;
  }
}

function writeLearningState(state: LocalLearningState) {
  const currentWindow = safeWindow();
  if (!currentWindow) {
    return;
  }

  currentWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  currentWindow.dispatchEvent(new Event(CHANGE_EVENT));
}

function lessonSnapshot(
  entry: LessonManifestEntry,
  previous?: LocalLearningLessonState,
): LocalLearningLessonState {
  return {
    id: entry.id,
    title: entry.title,
    track: entry.track,
    trackTitle: entry.trackTitle,
    canonicalRoute: entry.canonicalRoute,
    estimatedMinutes: entry.estimatedMinutes,
    progress: previous?.progress ?? 0,
    completed: previous?.completed ?? false,
    bookmarked: previous?.bookmarked ?? false,
    updatedAt: Date.now(),
  };
}

function persistLesson(state: LocalLearningState, next: LocalLearningLessonState) {
  const recentWithoutCurrent = state.recent.filter((id) => id !== next.id);
  return {
    ...state,
    recent: [next.id, ...recentWithoutCurrent].slice(0, 8),
    lessons: {
      ...state.lessons,
      [next.id]: next,
    },
  };
}

export function recordLessonVisit(entry: LessonManifestEntry) {
  const state = readLearningState();
  const next = lessonSnapshot(entry, state.lessons[entry.id]);
  writeLearningState(persistLesson(state, next));
}

export function updateLessonProgress(entry: LessonManifestEntry, progress: number) {
  const state = readLearningState();
  const previous = state.lessons[entry.id];
  const next = lessonSnapshot(entry, previous);
  const normalized = Math.max(previous?.progress ?? 0, Math.round(progress));

  next.progress = Math.max(0, Math.min(100, normalized));
  next.completed = previous?.completed ?? next.progress >= 85;
  next.updatedAt = Date.now();

  writeLearningState(persistLesson(state, next));
}

export function toggleLessonCompleted(entry: LessonManifestEntry) {
  const state = readLearningState();
  const previous = state.lessons[entry.id];
  const next = lessonSnapshot(entry, previous);

  next.completed = !(previous?.completed ?? false);
  next.progress = next.completed ? 100 : Math.min(previous?.progress ?? 0, 84);
  next.updatedAt = Date.now();

  writeLearningState(persistLesson(state, next));
}

export function toggleLessonBookmark(entry: LessonManifestEntry) {
  const state = readLearningState();
  const previous = state.lessons[entry.id];
  const next = lessonSnapshot(entry, previous);

  next.bookmarked = !(previous?.bookmarked ?? false);
  next.updatedAt = Date.now();

  writeLearningState(persistLesson(state, next));
}

export function clearLearningState() {
  writeLearningState(emptyState);
}

export function subscribeLearningState(listener: () => void): () => void {
  const currentWindow = safeWindow();
  if (!currentWindow) {
    return () => {};
  }

  const handler = () => listener();
  currentWindow.addEventListener(CHANGE_EVENT, handler);
  currentWindow.addEventListener("storage", handler);

  return () => {
    currentWindow.removeEventListener(CHANGE_EVENT, handler);
    currentWindow.removeEventListener("storage", handler);
  };
}
