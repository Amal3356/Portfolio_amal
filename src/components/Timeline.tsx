interface Entry {
  period: string;
  title: string;
  org: string;
  points?: string[];
}

export function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <div>
      {entries.map((e) => (
        <article
          key={e.title + e.period}
          className="grid gap-2 border-t border-line py-[22px] last:border-b sm:grid-cols-[150px_1fr] sm:gap-x-6"
        >
          <time className="text-[15px] text-muted">{e.period}</time>
          <div>
            <h3 className="text-[22px] font-extrabold">
              {e.title}
              {e.points ? ", " + e.org : ""}
            </h3>
            {!e.points && <p>{e.org}</p>}
            {e.points && (
              <ul className="mt-2 list-disc pl-5">
                {e.points.map((p) => (
                  <li key={p} className="mb-1.5">
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
