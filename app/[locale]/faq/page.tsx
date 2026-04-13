import { notFound } from "next/navigation";

import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

const faqEntries = [
  {
    question: "Are the original Ukrainian lessons still preserved?",
    answer:
      "Yes. The legacy HTML corpus stays in place, and the new platform reads migrated copies without deleting or rewriting the source lessons.",
  },
  {
    question: "Is English content fully translated already?",
    answer:
      "No. English routes exist first so the architecture is ready, and missing lessons safely fall back to Ukrainian source content until translations are added.",
  },
  {
    question: "Do I need an account to track progress?",
    answer:
      "No. Progress, recent lessons, and bookmarks are local-first right now and work without authentication.",
  },
  {
    question: "Will the site introduce subscriptions later?",
    answer:
      "The platform is designed around donations and external support providers, not subscriptions or paywalls.",
  },
];

export default async function FaqPage({
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
        <p className="eyebrow">{copy.nav.faq}</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.faq.title}</h1>
        <p className="mt-5 text-lg text-ink/72">{copy.faq.description}</p>
        <div className="mt-8 grid gap-4">
          {faqEntries.map((entry) => (
            <div key={entry.question} className="rounded-[1.5rem] bg-white/70 p-5">
              <h2 className="font-sans text-xl font-semibold text-ink">{entry.question}</h2>
              <p className="mt-3 text-sm text-ink/70">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
