import { notFound } from "next/navigation";

import { donationProviders } from "@/src/modules/donations/config";
import { isLocale } from "@/src/modules/i18n/config";
import { getSiteCopy } from "@/src/modules/i18n/copy";

export default async function DonatePage({
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
        <p className="eyebrow">{copy.nav.donate}</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">{copy.donate.title}</h1>
        <p className="mt-5 text-lg text-ink/72">{copy.donate.description}</p>
        <p className="mt-4 rounded-[1.4rem] bg-pine/10 px-4 py-4 text-sm font-medium text-ink/75">
          {copy.donate.promise}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {donationProviders.map((provider) => (
            <a
              key={provider.id}
              href={provider.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-black/8 bg-white/80 p-5 transition hover:border-ember/30"
            >
              <h2 className="font-sans text-xl font-semibold text-ink">{provider.label}</h2>
              <p className="mt-3 text-sm text-ink/70">{provider.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
