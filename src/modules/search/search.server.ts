import { getLessonSearchEntries as getLocalizedSearchEntries } from "@/src/modules/content/content.server";
import type { Locale } from "@/src/types/content";

export function getLessonSearchEntries(locale: Locale) {
  return getLocalizedSearchEntries(locale);
}
