import { notFound } from "next/navigation";

import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

export default async function RegisterPage({
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="content-card rounded-[2rem] p-8 text-center lg:p-10">
        <p className="eyebrow">Auth</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.auth.registerTitle}</h1>
        <p className="mt-5 text-lg text-ink/72">{copy.auth.registerDescription}</p>
      </section>
    </div>
  );
}
