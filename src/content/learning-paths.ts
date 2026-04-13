import type { LessonManifestEntry } from "@/src/types/content";

const beginnerPathLessonIds = [
  "intro/intro-to-javascript",
  "intro/code-editors",
  "intro/devtools",
  "basics/hello-world",
  "basics/code-structure",
  "basics/use-strict",
  "basics/variables",
  "basics/data-types",
  "basics/interaction",
  "basics/type-conversions",
  "basics/operators",
  "basics/comparison",
  "basics/ifelse",
  "basics/logical-operators",
  "basics/nullish-coalescing",
  "basics/loops",
  "basics/switch",
  "basics/function-basics",
  "basics/function-expressions",
  "basics/arrow-functions",
] as const;

const beginnerPathIdSet = new Set<string>(beginnerPathLessonIds);

export function getBeginnerPathLessons(lessons: LessonManifestEntry[]) {
  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  return beginnerPathLessonIds
    .map((lessonId) => lessonMap.get(lessonId))
    .filter((lesson): lesson is LessonManifestEntry => Boolean(lesson));
}

export function getBeginnerPathLessonIds() {
  return [...beginnerPathLessonIds];
}

export function isBeginnerPathLesson(lessonId: string) {
  return beginnerPathIdSet.has(lessonId);
}

export function getBeginnerPathIndex(lessonId: string) {
  return beginnerPathLessonIds.findIndex((candidate) => candidate === lessonId);
}
