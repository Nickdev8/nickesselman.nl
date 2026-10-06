import { useEffect, useState } from "react";

function batteryPercentage(device) {
  return Number.isFinite(device?.batteryPercent)
    ? `${Math.round(device.batteryPercent)}%`
    : "—";
}

function screenTime(device) {
  const reportedMinutes = device?.screenTime?.todayMinutes;
  const hours = device?.screenTime?.today;
  const totalMinutes =
    Number.isFinite(reportedMinutes) && reportedMinutes >= 0
      ? reportedMinutes
      : Number.isFinite(hours) && hours >= 0
        ? hours * 60
        : null;
  if (totalMinutes === null) return "—";
  const minutes = Math.round(totalMinutes);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function FitbitSkeleton() {
  const labels = [
    "steps",
    "bpm",
    "laptop screen time today",
    "phone screen time today",
    "laptop battery",
    "phone battery",
  ];
  return (
    <section
      className="signal fitbit-signal"
      aria-busy="true"
      aria-label="Loading activity and device status"
    >
      <div className="fitbit-stats">
        {labels.map((label) => (
          <div key={label}>
            <i className="skeleton skeleton-stat" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FitbitWidget() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  const [devices, setDevices] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.nickesselman.nl/fitbit")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    function loadDevices() {
      function loadDevice(path, setDevice) {
        fetch(`https://api.nickesselman.nl/${path}`)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            if (!cancelled) setDevice(result);
          })
          .catch(() => {
            if (!cancelled) setDevice(null);
          });
      }

      loadDevice("device-state", setDevices);
      loadDevice("phone-state", setPhone);
    }

    loadDevices();
    const intervalId = window.setInterval(loadDevices, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  if (state === "loading" && !devices && !phone) return <FitbitSkeleton />;

  return (
    <section className="signal fitbit-signal">
      <div className="fitbit-stats" aria-live="polite">
        <div>
          <strong>{state === "ready" ? (data?.steps ?? "—") : "—"}</strong>
          <span>steps</span>
        </div>
        <div>
          <strong>
            {state === "ready" ? (data?.heartRateBpm ?? "—") : "—"}
          </strong>
          <span>bpm</span>
        </div>
        <div>
          <strong>{screenTime(devices?.laptop)}</strong>
          <span>laptop screen time today</span>
        </div>
        <div>
          <strong>{screenTime(phone ?? devices?.phone)}</strong>
          <span>phone screen time today</span>
        </div>
        <div>
          <strong>{batteryPercentage(devices?.laptop)}</strong>
          <span>laptop battery</span>
        </div>
        <div>
          <strong>{batteryPercentage(phone ?? devices?.phone)}</strong>
          <span>phone battery</span>
        </div>
      </div>
    </section>
  );
}
