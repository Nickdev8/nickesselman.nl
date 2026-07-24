import { useEffect, useState } from "react";

function batteryPercentage(device) {
  return Number.isFinite(device?.batteryPercent) ? `${Math.round(device.batteryPercent)}%` : "—";
}

export default function FitbitWidget() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  const [devices, setDevices] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.nickesselman.nl/fitbit")
      .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((result) => { if (!cancelled) { setData(result); setState("ready"); } })
      .catch(() => { if (!cancelled) setState("error"); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    function loadDevices() {
      fetch("https://api.nickesselman.nl/device-state")
        .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
        .then((result) => { if (!cancelled) setDevices(result); })
        .catch(() => { if (!cancelled) setDevices(null); });
    }

    loadDevices();
    const intervalId = window.setInterval(loadDevices, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="signal fitbit-signal">
      <div className="signal-label"><span>moving</span><span>today</span></div>
      <div className="fitbit-stats" aria-live="polite">
        <div><strong>{state === "ready" ? data?.steps ?? "—" : "—"}</strong><span>steps</span></div>
        <div><strong>{state === "ready" ? data?.heartRateBpm ?? "—" : "—"}</strong><span>bpm</span></div>
        <div><strong>{state === "ready" ? data?.caloriesOut ?? "—" : "—"}</strong><span>calories</span></div>
        <div><strong>{batteryPercentage(devices?.laptop)}</strong><span>laptop battery</span></div>
        <div><strong>{batteryPercentage(devices?.phone)}</strong><span>phone battery</span></div>
      </div>
    </section>
  );
}
