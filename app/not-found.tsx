import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="content-card max-w-xl rounded-[2rem] p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-sans text-4xl font-bold text-ink">
          Сторінку не знайдено
        </h1>
        <p className="mt-4 text-sm text-ink/70">
          Маршрут міг змінитися під час міграції. Спробуйте повернутися до каталогу
          уроків або відкрити збережену legacy-версію.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/uk/docs"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
          >
            До каталогу
          </Link>
          <Link
            href="/legacy/uk/"
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink"
          >
            Legacy fallback
          </Link>
        </div>
      </div>
    </div>
  );
}
