"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Full-bleed background video (client-supplied) with poster fallback.
 * Serves a dedicated portrait cut on mobile (<768px) and the main film on
 * larger screens. Respects prefers-reduced-motion by showing the poster only.
 */
export default function VideoHero({
  poster,
  children,
}: {
  poster: string;
  children: React.ReactNode;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const pick = () => {
      if (reduce.matches) setSrc(null);
      else setSrc(mobile.matches ? "/video/hero-mobile.mp4" : "/video/hero.mp4");
    };

    pick();
    mobile.addEventListener("change", pick);
    reduce.addEventListener("change", pick);
    return () => {
      mobile.removeEventListener("change", pick);
      reduce.removeEventListener("change", pick);
    };
  }, []);

  // iOS Safari only allows autoplay when the `muted` ATTRIBUTE is present
  // before the play attempt — React sets muted as a JS property only, so we
  // set everything imperatively and kick playback off ourselves.
  const attachVideo = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    const tryPlay = () => el.play().catch(() => {});
    tryPlay();
    el.addEventListener("loadedmetadata", tryPlay, { once: true });
    el.addEventListener("canplay", tryPlay, { once: true });
    // last resort: first user interaction unlocks playback
    const unlock = () => {
      tryPlay();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      {src && (
        <video
          key={src}
          ref={attachVideo}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
        />
      )}
      {/* legibility scrims */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30"
        aria-hidden
      />
      {/* top scrim keeps the floating menu legible; fades out well inside the
          hero so there is no visible edge at the header boundary */}
      <div
        className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-navy-950/80 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
        aria-hidden
      />
      <div className="relative flex min-h-svh items-center pt-24">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand to-transparent" />
    </section>
  );
}
