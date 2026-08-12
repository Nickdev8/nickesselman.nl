import { useEffect, useMemo, useState } from "react";

function buildWeeks(days = []) {
  const weeks = [];
  days.forEach((day, index) => {
    const week = Math.floor(index / 7);
    if (!weeks[week]) weeks[week] = [];
    weeks[week].push(day);
  });
  return weeks;
}

export function GithubSkeleton() {
  return (
    <div className="github-signal" aria-busy="true" aria-label="Loading GitHub activity">
      <div>
        <span>building</span>
        <i className="skeleton skeleton-contribution-total" />
      </div>
      <div className="contribution-grid contribution-skeleton" aria-hidden="true">
        {Array.from({ length: 38 }, (_, week) => <div key={week}>{Array.from({ length: 7 }, (_, day) => <i key={day} />)}</div>)}
      </div>
      <span>GitHub ↗</span>
    </div>
  );
}

export default function GithubWidget() {
  const [calendar, setCalendar] = useState(null);
  const weeks = useMemo(() => buildWeeks(calendar?.days), [calendar]);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.nickesselman.nl/github/contributions")
      .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((result) => { if (!cancelled) setCalendar(result.contributions); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <a className="github-signal" href="https://github.com/nickdev8" target="_blank" rel="noreferrer">
      <div>
        <span>building</span>
        <strong>{calendar?.totalContributions ?? "—"} contributions this year</strong>
      </div>
      {weeks.length ? (
        <div className="contribution-grid" aria-label="GitHub contribution graph">
          {weeks.slice(-38).map((week, weekIndex) => (
            <div key={weekIndex}>{week.map((day) => <i key={day.date} title={`${day.date}: ${day.count}`} style={{ opacity: day.count ? Math.min(0.35 + day.count * 0.16, 1) : 0.12 }} />)}</div>
          ))}
        </div>
      ) : <span>loading activity…</span>}
      <span>GitHub ↗</span>
    </a>
  );
}
