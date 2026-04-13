import type { MetadataRoute } from "next";

import {
  getLessonManifest,
  getTrackAvailability,
} from "@/src/modules/content/content.server";
import { locales } from "@/src/modules/i18n/config";
import { absoluteUrl } from "@/src/lib/seo/site";

const marketingRoutes = ["", "/about", "/roadmap", "/faq", "/donate", "/docs"];

export default function sitemap(): MetadataRoute.Sitemap {
  const manifest = getLessonManifest();
  const trackEntries = locales.flatMap((locale) =>
    getTrackAvailability(locale)
      .filter((track) => track.isIndexable)
      .map((track) => ({
        url: absoluteUrl(`/${locale}/docs/${track.track}`),
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales
              .filter((altLocale) =>
                getTrackAvailability(altLocale).some(
                  (candidate) =>
                    candidate.track === track.track && candidate.isIndexable,
                ),
              )
              .map((altLocale) => [
                altLocale,
                absoluteUrl(`/${altLocale}/docs/${track.track}`),
              ]),
          ),
        },
      })),
  );

  const marketingEntries = locales.flatMap((locale) =>
    marketingRoutes.map((route) => ({
      url: absoluteUrl(`/${locale}${route}`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((altLocale) => [altLocale, absoluteUrl(`/${altLocale}${route}`)]),
        ),
      },
    })),
  );

  const lessonEntries = manifest.flatMap((entry) =>
    entry.availableLocales.map((locale) => ({
      url: absoluteUrl(`/${locale}/docs/${entry.track}/${entry.slug}`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          entry.availableLocales.map((altLocale) => [
            altLocale,
            absoluteUrl(`/${altLocale}/docs/${entry.track}/${entry.slug}`),
          ]),
        ),
      },
    })),
  );

  return [...marketingEntries, ...trackEntries, ...lessonEntries];
}
