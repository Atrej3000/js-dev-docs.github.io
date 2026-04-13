import Link from "next/link";

import type { LessonHeading } from "@/src/types/content";

type DocsTocProps = {
  headings: LessonHeading[];
  title: string;
};

export function DocsToc({ headings, title }: DocsTocProps) {
  if (!headings.length) {
    return null;
  }

  return (
    <aside className="content-card rounded-[1.75rem] p-5">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink/55">
        {title}
      </p>
      <div className="mt-4 grid gap-1.5">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={`rounded-2xl px-3 py-2 text-sm text-ink/70 transition hover:bg-black/5 hover:text-ink ${
              heading.level > 2 ? "ml-4" : ""
            }`}
          >
            {heading.text}
          </Link>
        ))}
      </div>
    </aside>
  );
}
