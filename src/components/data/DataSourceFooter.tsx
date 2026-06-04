/**
 * DataSourceFooter — tiny attribution footer for comparison rows.
 *
 * Renders: "Päivitetty 4.6.2026 · lähde: Suomen Pankki"
 *
 * Designed to slot beneath a card's primary content as a `text-xs` row.
 * Server component — no client state needed.
 */
export interface DataSourceFooterProps {
  /** ISO-8601 timestamp of the last data refresh. */
  updatedAt: string;
  /** Display name of the source, e.g. "Suomen Pankki". */
  sourceName: string;
  /** Optional public URL to the source. If present, name is linked. */
  sourceUrl?: string;
  /** Optional extra class names (composed last). */
  className?: string;
}

export default function DataSourceFooter({
  updatedAt,
  sourceName,
  sourceUrl,
  className,
}: DataSourceFooterProps) {
  const formatted = formatDateFi(updatedAt);

  return (
    <p
      className={[
        'flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-slate-500',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>
        Päivitetty <time dateTime={updatedAt}>{formatted}</time>
      </span>
      <span aria-hidden="true">·</span>
      <span>
        lähde:{' '}
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            {sourceName}
          </a>
        ) : (
          <span className="text-slate-600">{sourceName}</span>
        )}
      </span>
    </p>
  );
}

function formatDateFi(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(d);
}