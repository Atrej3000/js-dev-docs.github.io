import Link from "next/link";
import { notFound } from "next/navigation";

import { LearningHub } from "@/components/dashboard/learning-hub";
import { getLessonManifest, getTrackSummaries } from "@/src/modules/content/content.server";
import { donationProviders } from "@/src/modules/donations/config";
import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteCopy(locale);
  const manifest = getLessonManifest();
  const tracks = getTrackSummaries();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="content-card overflow-hidden rounded-[2rem] p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">{copy.home.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-sans text-4xl font-bold leading-tight text-ink lg:text-6xl">
              {copy.home.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/72">
              {copy.home.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/docs`}
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ember"
              >
                {copy.home.primaryCta}
              </Link>
              <Link
                href={`/${locale}/donate`}
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ember/30"
              >
                {copy.home.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] bg-white/75 p-5">
            <div className="rounded-[1.4rem] bg-paper px-4 py-5">
              <p className="text-4xl font-bold text-ink">{manifest.length}</p>
              <p className="mt-2 text-sm text-ink/65">{copy.home.statsLessons}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-paper px-4 py-5">
                <p className="text-3xl font-bold text-ink">{tracks.length}</p>
                <p className="mt-2 text-sm text-ink/65">{copy.home.statsTracks}</p>
              </div>
              <div className="rounded-[1.4rem] bg-paper px-4 py-5">
                <p className="text-3xl font-bold text-ink">2</p>
                <p className="mt-2 text-sm text-ink/65">{copy.home.statsLocales}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LearningHub locale={locale} manifest={manifest} />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="content-card rounded-[2rem] p-6 lg:p-8">
          <p className="eyebrow">{copy.home.tracksTitle}</p>
          <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
            {copy.home.platformTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-ink/70">
            {copy.home.platformDescription}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {tracks.map((track) => (
              <Link
                key={track.track}
                href={`/${locale}/docs/${track.track}`}
                className="rounded-[1.5rem] border border-black/6 bg-white/80 px-4 py-4 transition hover:border-ember/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{track.title}</p>
                    <p className="mt-1 text-sm text-ink/60">{track.lessonCount} lessons</p>
                  </div>
                  <span className="font-mono text-xs text-ink/45">
                    {String(track.sectionOrder).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section className="content-card rounded-[2rem] p-6 lg:p-8">
          <p className="eyebrow">{copy.home.supportTitle}</p>
          <h2 className="mt-3 font-sans text-3xl font-bold text-ink">
            {copy.home.supportTitle}
          </h2>
          <p className="mt-4 text-sm text-ink/70">{copy.home.supportDescription}</p>
          <div className="mt-6 grid gap-3">
            {donationProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.5rem] border border-black/6 bg-white/80 px-4 py-4 transition hover:border-ember/30"
              >
                <p className="font-semibold text-ink">{provider.label}</p>
                <p className="mt-1 text-sm text-ink/60">{provider.description}</p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
