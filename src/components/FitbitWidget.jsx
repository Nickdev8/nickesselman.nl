import { useEffect, useState } from "react";

const stats = [
  { key: "steps", label: "Steps" },
  { key: "heartRateBpm", label: "Heart Rate", suffix: " bpm" },
  { key: "caloriesOut", label: "Calories Out" },
];

export default function FitbitWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <section className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Small live detail</h2>
          <p className="mt-1 text-sm text-stone-500">A fun Fitbit snapshot from today.</p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Fitbit</p>
      </div>
      {loading ? (
        <p className="mt-4 text-sm text-stone-500">Loading Fitbit data...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.key} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-400">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold">
                {data?.[stat.key] ?? "--"}
                {data?.[stat.key] != null ? stat.suffix ?? "" : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
