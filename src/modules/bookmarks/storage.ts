import type { LocalLearningState } from "@/src/types/content";

export function getBookmarkedLessonIds(state: LocalLearningState) {
  return Object.values(state.lessons)
    .filter((lesson) => lesson.bookmarked)
    .sort((left, right) => right.updatedAt - left.updatedAt)
    .map((lesson) => lesson.id);
}
