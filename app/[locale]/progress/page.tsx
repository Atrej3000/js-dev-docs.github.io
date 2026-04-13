import { notFound } from "next/navigation";

import { LearningHub } from "@/components/dashboard/learning-hub";
import { getLessonManifest } from "@/src/modules/content/content.server";
import { isLocale } from "@/src/modules/i18n/config";

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <LearningHub
        locale={locale}
        manifest={getLessonManifest()}
        variant="progress"
      />
    </div>
  );
}
