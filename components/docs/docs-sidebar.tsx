import Link from "next/link";

type DocsSidebarProps = {
  activeLessonId?: string;
  tracks: Array<{
    track: string;
    title: string;
    lessons: Array<{
      id: string;
      track: string;
      slug: string;
      articleNumber: string | null;
      title: string;
    }>;
  }>;
  locale: "uk" | "en";
};

export function DocsSidebar({ activeLessonId, tracks, locale }: DocsSidebarProps) {
  return (
    <aside className="content-card rounded-[1.75rem] p-5">
      <div className="space-y-6">
        {tracks.map((track) => (
          <section key={track.track} className="space-y-3">
            <Link
              href={`/${locale}/docs/${track.track}`}
              className="block font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink/60 transition hover:text-ink"
            >
              {track.title}
            </Link>
            <div className="grid gap-1.5">
              {track.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/${locale}/docs/${lesson.track}/${lesson.slug}`}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    lesson.id === activeLessonId
                      ? "bg-ink text-paper"
                      : "text-ink/75 hover:bg-black/5 hover:text-ink"
                  }`}
                >
                  <span className="mr-2 font-mono text-xs opacity-75">
                    {lesson.articleNumber}
                  </span>
                  {lesson.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
