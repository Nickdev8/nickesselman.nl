import { useEffect, useMemo, useState } from "react";
import vinylRecord from "../assets/Vinyl_record.svg";

const SPOTIFY_URL = "https://api.nickesselman.nl/spotify/currently-playing";

function formatDuration(ms = 0) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function SpotifyWidget() {
  const [spotify, setSpotify] = useState(null);
  const [lastFetchedAt, setLastFetchedAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [state, setState] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(SPOTIFY_URL);
        if (!response.ok) throw new Error();
        const result = await response.json();
        if (!cancelled) {
          setSpotify(result?.data ?? null);
          setLastFetchedAt(Date.now());
          setState("ready");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }
    load();
    const refresh = window.setInterval(load, 30000);
    return () => { cancelled = true; window.clearInterval(refresh); };
  }, []);

  useEffect(() => {
    const ticker = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(ticker);
  }, []);

  const track = spotify?.item;
  const duration = track?.duration_ms ?? 0;
  const progress = useMemo(() => {
    const elapsed = spotify?.is_playing && lastFetchedAt ? now - lastFetchedAt : 0;
    return Math.min((spotify?.progress_ms ?? 0) + elapsed, duration);
  }, [duration, lastFetchedAt, now, spotify?.is_playing, spotify?.progress_ms]);
  const art = track?.album?.images?.[0]?.url || vinylRecord;

  return (
    <section className="signal spotify-signal">
      <div className="signal-label"><span>listening</span><span>{spotify?.is_playing ? "live" : "paused"}</span></div>
      {state === "ready" && track ? (
        <>
          <img src={art} alt={`Album art for ${track.name}`} />
          <div className="signal-body">
            <p>{track.artists?.map((artist) => artist.name).join(", ")}</p>
            <h3>{track.name}</h3>
            <div className="track-line"><i style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} /></div>
            <p className="track-time">{formatDuration(progress)} / {formatDuration(duration)}</p>
          </div>
        </>
      ) : (
        <p className="signal-message">{state === "error" ? "Spotify is being quiet right now." : "Tuning in…"}</p>
      )}
    </section>
  );
}
