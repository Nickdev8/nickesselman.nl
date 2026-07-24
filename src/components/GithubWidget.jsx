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
