import { Activity, Flame, Footprints } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { key: "steps", label: "Steps", icon: Footprints },
  { key: "heartRateBpm", label: "Heart Rate", suffix: " bpm", icon: Activity },
  { key: "caloriesOut", label: "Calories Out", icon: Flame },
];

function formatLastUpdated(timestampSeconds) {
  if (!timestampSeconds) return "";

  const date = new Date(timestampSeconds * 1000);

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function FitbitWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lastUpdatedText = formatLastUpdated(data?.lastUpdated);

  useEffect(() => {
    let cancelled = false;

    fetch("https://api.nickesselman.nl/fitbit")
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Unable to load Fitbit data right now.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-surface-cool)] px-5 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Activity size={18} aria-hidden="true" className="text-[var(--color-accent)]" />
            Live Fitbit check-in
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            A mildly unnecessary but funny Fitbit snapshot from today.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Fitbit</p>
      </div>
      {loading ? (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Loading Fitbit data...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.key} className="rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-surface-cool-strong)] px-4 py-3">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  <stat.icon size={14} aria-hidden="true" />
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {data?.[stat.key] ?? "--"}
                  {data?.[stat.key] != null ? stat.suffix ?? "" : ""}
                </p>
              </div>
            ))}
          </div>
          {lastUpdatedText ? (
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Last updated {lastUpdatedText}.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
