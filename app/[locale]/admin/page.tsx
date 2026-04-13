import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminStatGrid } from "@/components/admin/admin-stat-grid";
import { getAdminOverview } from "@/src/modules/admin/overview.server";
import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteCopy(locale);
  const overview = getAdminOverview();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8">
        <p className="eyebrow">{copy.nav.admin}</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.admin.title}</h1>
        <p className="mt-4 text-lg text-ink/72">{copy.admin.description}</p>
      </section>

      <AdminStatGrid
        stats={[
          {
            label: "Lessons",
            value: overview.summary.counts.lessons,
            detail: "Migrated lesson entries in the canonical manifest.",
          },
          {
            label: "Tracks",
            value: overview.summary.counts.tracks,
            detail: "Canonical tracks after resolving legacy drift.",
          },
          {
            label: "Aliases",
            value: overview.aliases.length,
            detail: "Legacy paths currently mapped back to canonical docs routes.",
          },
          {
            label: "Canonical drift",
            value: overview.driftCount,
            detail: "Legacy file identities that differ from the new canonical slug.",
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href={`/${locale}/admin/lessons`}
          className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
        >
          <p className="font-sans text-xl font-semibold text-ink">{copy.admin.lessonsTitle}</p>
          <p className="mt-2 text-sm text-ink/65">
            Inspect canonical lesson identity, ordering, and source mapping.
          </p>
        </Link>
        <Link
          href={`/${locale}/admin/locales`}
          className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
        >
          <p className="font-sans text-xl font-semibold text-ink">{copy.admin.localesTitle}</p>
          <p className="mt-2 text-sm text-ink/65">
            View locale availability and fallback readiness.
          </p>
        </Link>
        <Link
          href={`/${locale}/admin/migration`}
          className="content-card rounded-[1.75rem] p-5 transition hover:border-ember/30"
        >
          <p className="font-sans text-xl font-semibold text-ink">{copy.admin.migrationTitle}</p>
          <p className="mt-2 text-sm text-ink/65">
            Review counts, overrides, and the known anomaly map.
          </p>
        </Link>
      </div>
    </div>
  );
}
