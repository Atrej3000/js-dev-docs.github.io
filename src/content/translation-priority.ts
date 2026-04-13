import priorityIds from "@/scripts/data/translation-priority.json";
import type { LessonManifestEntry } from "@/src/types/content";

export type TranslationPriority = "normal" | "high";

const highPriorityLessonIds = new Set(priorityIds);

export function getLessonTranslationPriority(lessonId: string): TranslationPriority {
  return highPriorityLessonIds.has(lessonId) ? "high" : "normal";
}

export function getPriorityLessons(
  lessons: LessonManifestEntry[],
): LessonManifestEntry[] {
  return lessons.filter((lesson) => highPriorityLessonIds.has(lesson.id));
}

export function getPriorityLessonIds(): string[] {
  return [...highPriorityLessonIds];
}
