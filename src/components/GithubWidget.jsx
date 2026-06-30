import { GitBranch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const GITHUB_CONTRIBUTIONS_URL = "https://api.nickesselman.nl/github/contributions";

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function weeksBetween(start, end) {
  return Math.floor((end.getTime() - start.getTime()) / 604800000);
}

function buildContributionCells(days) {
  if (!days.length) return [];

  const byDate = new Map(days.map((day) => [day.date, day]));
  const first = parseDate(days[0].date);
  const last = parseDate(days[days.length - 1].date);
  const firstColumnStart = addDays(first, -first.getUTCDay());
  const weeks = [];

  for (let cursor = new Date(first); cursor <= last; cursor = addDays(cursor, 1)) {
    const date = formatDate(cursor);
    const day = byDate.get(date) ?? { date, count: 0, color: "#ebedf0" };
    const weekIndex = weeksBetween(firstColumnStart, cursor);
    const dayIndex = cursor.getUTCDay();

    if (!weeks[weekIndex]) {
      weeks[weekIndex] = Array.from({ length: 7 }, () => null);
    }

    weeks[weekIndex][dayIndex] = day;
  }

  return weeks;
}

export default function GithubWidget() {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const weeks = useMemo(() => buildContributionCells(calendar?.days ?? []), [calendar]);

  useEffect(() => {
    let cancelled = false;

    fetch(GITHUB_CONTRIBUTIONS_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((result) => {
        if (cancelled) return;
        setCalendar(result.contributions);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Unable to load GitHub contributions right now.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-surface-cool)] px-5 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <GitBranch size={18} aria-hidden="true" className="text-[var(--color-accent)]" />
            GitHub activity
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Past year of contributions, ending today.
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-[var(--color-text-secondary)]">
          {calendar?.totalContributions ?? "--"} total
        </p>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Loading GitHub activity...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      ) : (
        <a
          href="https://github.com/nickdev8"
          target="_blank"
          rel="noreferrer"
          className="mt-4 block overflow-x-auto rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-surface-cool-strong)] p-3"
          aria-label="Open Nick Esselman's GitHub profile"
        >
          <div className="flex w-max gap-1" aria-label="GitHub contribution graph">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                      className="block size-2.5 rounded-[2px] border border-black/5"
                      style={{ backgroundColor: day.color }}
                    />
                  ) : (
                    <span key={`empty-${dayIndex}`} className="block size-2.5" aria-hidden="true" />
                  ),
                )}
              </div>
            ))}
          </div>
        </a>
      )}
    </section>
  );
}
