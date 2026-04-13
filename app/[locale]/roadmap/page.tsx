import { notFound } from "next/navigation";

import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

const roadmapItems = [
  "English lesson files with explicit locale coverage tracking",
  "Safe quiz blocks built on top of preserved lesson metadata",
  "Supporter badges and contributor visibility, not billing or gated content",
  "Optional account sync for progress once local-first behavior is stable",
  "Translation workflow tooling and editorial review visibility",
];

export default async function RoadmapPage({
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
        <p className="eyebrow">{copy.nav.roadmap}</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.roadmap.title}</h1>
        <p className="mt-5 text-lg text-ink/72">{copy.roadmap.description}</p>
        <div className="mt-8 grid gap-3">
          {roadmapItems.map((item, index) => (
            <div key={item} className="rounded-[1.5rem] bg-white/70 px-5 py-4 text-sm text-ink/70">
              <span className="mr-3 font-mono text-xs text-ink/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
