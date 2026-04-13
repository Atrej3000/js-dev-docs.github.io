import type { Locale } from "@/src/types/content";

export const locales = ["uk", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "uk";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  uk: "Українська",
  en: "English",
};
