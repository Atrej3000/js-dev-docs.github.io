import type { Locale } from "@/src/types/content";

type TrackOverviewCopy = {
  title: string;
  introduction: string;
  whatYouWillStudy: string[];
  ctaLabel: string;
  partialNotice?: string;
};

const localizedTrackTitles: Partial<Record<string, Partial<Record<Locale, string>>>> = {
  intro: {
    en: "Introduction",
  },
  basics: {
    en: "JavaScript Fundamentals",
  },
};

const trackOverviewCopy: Partial<
  Record<string, Partial<Record<Locale, TrackOverviewCopy>>>
> = {
  intro: {
    en: {
      title: "Introduction",
      introduction:
        "Start here if you're new to the platform or to JavaScript itself. This short English track explains what JavaScript is, how to choose a code editor, and how to use browser developer tools confidently from the beginning.",
      whatYouWillStudy: [
        "What JavaScript is and where it runs",
        "How to choose an editor and set up a practical workflow",
        "How to inspect pages, test code, and debug with browser DevTools",
      ],
      ctaLabel: "Start with Introduction to JavaScript",
      partialNotice:
        "Only the published English lessons are listed here. Additional lessons will appear after editorial review and publication.",
    },
  },
  basics: {
    en: {
      title: "JavaScript Fundamentals",
      introduction:
        "This is the main beginner-friendly English track. It walks through the first concepts every JavaScript learner needs: writing code, understanding values and operators, controlling program flow, and working with functions.",
      whatYouWillStudy: [
        "How JavaScript code is structured and executed",
        "Variables, data types, type conversion, operators, and comparisons",
        "Control flow with conditions, loops, and switch",
        "Function declarations, expressions, and arrow functions",
      ],
      ctaLabel: "Start the fundamentals path",
      partialNotice:
        "This track is partially published in English. The lesson list below includes only the lessons that are ready for public indexing.",
    },
  },
};

export function getLocalizedTrackTitle(
  track: string,
  locale: Locale,
  fallbackTitle: string,
) {
  return localizedTrackTitles[track]?.[locale] ?? fallbackTitle;
}

export function getTrackOverviewCopy(track: string, locale: Locale) {
  return trackOverviewCopy[track]?.[locale] ?? null;
}
