import { notFound } from "next/navigation";

import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteCopy(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8 lg:p-10">
        <p className="eyebrow">{copy.nav.about}</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.about.title}</h1>
        <p className="mt-5 text-lg text-ink/72">{copy.about.description}</p>
        <div className="mt-8 grid gap-4 text-sm text-ink/70 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-white/70 p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Content-first</h2>
            <p className="mt-3">
              Lesson bodies stay in files, not in a database, so educational material remains portable and reviewable.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/70 p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Migration-safe</h2>
            <p className="mt-3">
              Legacy slugs, canonical drift, numeric metadata quirks, and redirect aliases are preserved as explicit migration data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
