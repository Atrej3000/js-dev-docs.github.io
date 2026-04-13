type AdminStatGridProps = {
  stats: Array<{
    label: string;
    value: string | number;
    detail?: string;
  }>;
};

export function AdminStatGrid({ stats }: AdminStatGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="content-card rounded-[1.5rem] p-5">
          <p className="eyebrow">{stat.label}</p>
          <p className="mt-3 text-3xl font-bold text-ink">{stat.value}</p>
          {stat.detail ? (
            <p className="mt-2 text-sm text-ink/65">{stat.detail}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
