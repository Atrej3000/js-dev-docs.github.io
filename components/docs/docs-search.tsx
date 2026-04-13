"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale, SearchIndexEntry } from "@/src/types/content";

type DocsSearchProps = {
  locale: Locale;
  entries: SearchIndexEntry[];
  placeholder: string;
  emptyText: string;
};

export function DocsSearch({
  locale,
  entries,
  placeholder,
  emptyText,
}: DocsSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return entries.slice(0, 18);
    }

    return entries
      .filter((entry) => entry.queryText.includes(trimmed))
      .slice(0, 24);
  }, [entries, query]);

  return (
    <div className="content-card rounded-[1.75rem] p-5">
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-ember"
        />

        {filtered.length ? (
          <div className="grid gap-2">
            {filtered.map((entry) => (
              <Link
                key={entry.id}
                href={`/${locale}/docs/${entry.track}/${entry.slug}`}
                className="rounded-2xl border border-black/5 bg-white/80 px-4 py-3 transition hover:border-ember/40 hover:bg-white"
              >
                <p className="font-semibold text-ink">{entry.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink/55">
                  {entry.trackTitle} / {entry.slug}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white/70 px-4 py-5 text-sm text-ink/65">
            {emptyText}
          </p>
        )}
      </div>
    </div>
  );
}
