import { notFound } from "next/navigation";

import { getAdminOverview } from "@/src/modules/admin/overview.server";
import { isLocale } from "@/src/modules/i18n/config";

export default async function AdminMigrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const overview = getAdminOverview();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8">
        <p className="eyebrow">Admin / Migration</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">Migration status</h1>
        <p className="mt-4 text-lg text-ink/72">
          The migration summary below is generated from the reproducible pipeline rather
          than hand-maintained content lists.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="content-card rounded-[1.75rem] p-5">
          <p className="eyebrow">Lessons</p>
          <p className="mt-3 text-4xl font-bold text-ink">{overview.summary.counts.lessons}</p>
        </div>
        <div className="content-card rounded-[1.75rem] p-5">
          <p className="eyebrow">Tracks</p>
          <p className="mt-3 text-4xl font-bold text-ink">{overview.summary.counts.tracks}</p>
        </div>
        <div className="content-card rounded-[1.75rem] p-5">
          <p className="eyebrow">Canonical drift</p>
          <p className="mt-3 text-4xl font-bold text-ink">
            {overview.summary.counts.canonicalDrift}
          </p>
        </div>
        <div className="content-card rounded-[1.75rem] p-5">
          <p className="eyebrow">Known overrides</p>
          <p className="mt-3 text-4xl font-bold text-ink">
            {overview.summary.counts.knownOverrides}
          </p>
        </div>
      </div>

      <div className="content-card rounded-[2rem] p-6">
        <h2 className="font-sans text-2xl font-bold text-ink">Known anomaly overrides</h2>
        <div className="mt-6 grid gap-3">
          {overview.summary.overrides.map((override) => (
            <div key={override.sourcePath} className="rounded-[1.5rem] bg-white/70 p-4 text-sm text-ink/70">
              <p className="font-mono text-xs text-ink/50">{override.sourcePath}</p>
              <p className="mt-2">
                <span className="font-semibold text-ink">
                  {override.forceIdentity.track}/{override.forceIdentity.slug}
                </span>
              </p>
              <p className="mt-2">{override.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
