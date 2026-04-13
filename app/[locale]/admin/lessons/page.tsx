import { notFound } from "next/navigation";

import { getLessonTranslationPriority } from "@/src/content/translation-priority";
import { getLessonManifest } from "@/src/modules/content/content.server";
import { isLocale } from "@/src/modules/i18n/config";

export default async function AdminLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const manifest = getLessonManifest();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8">
        <p className="eyebrow">Admin / Lessons</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">Lesson inventory</h1>
        <p className="mt-4 text-lg text-ink/72">
          Read-only inventory showing how each lesson moved from legacy source paths
          into canonical docs identities.
        </p>
      </section>

      <div className="content-card overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-ink/70">
            <thead className="bg-black/5 text-xs uppercase tracking-[0.12em] text-ink/55">
              <tr>
                <th className="px-4 py-3">Canonical</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Source path</th>
                <th className="px-4 py-3">Source identity</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">EN status</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {manifest.map((entry) => (
                <tr key={entry.id} className="border-t border-black/6">
                  <td className="px-4 py-3 font-mono text-xs">{entry.id}</td>
                  <td className="px-4 py-3">{entry.title}</td>
                  <td className="px-4 py-3 font-mono text-xs">{entry.sourcePath}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {entry.sourceIdentity.track}/{entry.sourceIdentity.slug}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{entry.articleNumber}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {entry.translationStatus.locales.en.status}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {getLessonTranslationPriority(entry.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
