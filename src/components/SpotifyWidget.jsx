import { Music2, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import vinylRecord from "../assets/Vinyl_record.svg";

const SPOTIFY_URL = "https://api.nickesselman.nl/spotify/currently-playing";

function formatDuration(ms = 0) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function getArtwork(album) {
  return album?.images?.[0]?.url ?? album?.images?.[1]?.url ?? album?.images?.[2]?.url ?? "";
}

export default function SpotifyWidget() {
  const textContentRef = useRef(null);
  const [spotify, setSpotify] = useState(null);
  const [lastFetchedAt, setLastFetchedAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [artSize, setArtSize] = useState(192);

  useEffect(() => {
    let cancelled = false;

    async function loadSpotify() {
      try {
        const response = await fetch(SPOTIFY_URL);
        if (!response.ok) throw new Error("Request failed");

        const result = await response.json();
        if (cancelled) return;

        setSpotify(result?.data ?? null);
        setLastFetchedAt(Date.now());
        setError("");
        setLoading(false);
      } catch {
        if (cancelled) return;
        setError("Unable to load Spotify data right now.");
        setLoading(false);
      }
    }

    loadSpotify();
    const refreshId = window.setInterval(loadSpotify, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(() => {
    const progressId = window.setInterval(() => setNow(Date.now()), 500);

    return () => window.clearInterval(progressId);
  }, []);

  useEffect(() => {
    const content = textContentRef.current;
    const container = content?.parentElement;
    if (!content || !container) return undefined;

    const updateArtSize = () => {
      const styles = window.getComputedStyle(container);
      const verticalPadding =
        parseFloat(styles.paddingTop || "0") + parseFloat(styles.paddingBottom || "0");
      setArtSize(Math.ceil(content.getBoundingClientRect().height + verticalPadding));
    };

    updateArtSize();

    const observer = new ResizeObserver(updateArtSize);
    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  const track = spotify?.item;
  const artists = track?.artists?.map((artist) => artist.name).join(", ") ?? "";
  const artwork = getArtwork(track?.album);
  const artworkSrc = artwork || vinylRecord;
  const artworkAlt = artwork
    ? `Album art for ${track.album?.name ?? track.name}`
    : "Vinyl record placeholder";
  const isPlaying = Boolean(spotify?.is_playing);
  const durationMs = track?.duration_ms ?? 0;

  const progressMs = useMemo(() => {
    if (!track) return 0;

    const elapsed = isPlaying && lastFetchedAt ? now - lastFetchedAt : 0;
    return Math.min((spotify?.progress_ms ?? 0) + elapsed, durationMs);
  }, [durationMs, isPlaying, lastFetchedAt, now, spotify?.progress_ms, track]);

  const progressPercent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0;

  return (
    <section className="overflow-hidden rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm backdrop-blur-sm">
      <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0 px-5 py-4">
          <div ref={textContentRef}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <Music2 size={18} aria-hidden="true" className="text-[var(--color-accent)]" />
                  Spotify now playing
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Live from api.nickesselman.nl.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-cool)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {isPlaying ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
                {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>

            {loading ? (
              <p className="mt-5 text-sm text-[var(--color-text-muted)]">Loading Spotify data...</p>
            ) : error ? (
              <p className="mt-5 text-sm text-red-700">{error}</p>
            ) : track ? (
              <div className="mt-5 min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {track.album?.name ?? "Unknown album"}
                </p>
                <h3 className="mt-2 truncate text-2xl font-semibold tracking-tight">{track.name}</h3>
                <p className="mt-1 truncate text-sm text-[var(--color-text-secondary)]">{artists}</p>

                <div className="mt-5">
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-cool-deep)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">
                    <span>{formatDuration(progressMs)}</span>
                    <span>{formatDuration(durationMs)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-surface-cool)] px-4 py-3">
                <p className="font-semibold">Nothing playing</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Spotify data will show up here when there is an active track.
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className="order-first mx-auto mt-4 aspect-square w-52 max-w-[calc(100%-2rem)] rounded-[1rem] bg-[var(--color-surface-cool-strong)] p-3 sm:order-none sm:m-0 sm:aspect-auto sm:h-[var(--spotify-art-size)] sm:w-[var(--spotify-art-size)] sm:max-w-none"
          style={{ "--spotify-art-size": `${artSize}px` }}
        >
          <img
            src={artworkSrc}
            alt={artworkAlt}
            className="h-full w-full rounded-[0.8rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
