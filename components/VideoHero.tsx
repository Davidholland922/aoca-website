"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

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
    const narrow = window.matchMedia("(max-width: 767px)");
    const pick = () =>
      setSrc(
        reduce.matches
          ? null
          : narrow.matches
            ? "/video/hero-mobile.mp4"
            : "/video/hero.mp4"
      );
    // let the poster and headline paint first; the film comes in behind
    const start = () => {
      pick();
      reduce.addEventListener("change", pick);
      narrow.addEventListener("change", pick);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      reduce.removeEventListener("change", pick);
      narrow.removeEventListener("change", pick);
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
    // last resort: first user interaction unlocks playback (battery-saver
    // and data-saver modes block autoplay until the user does anything)
    const events = ["touchstart", "scroll", "pointerdown", "mousemove", "keydown"];
    const unlock = () => {
      tryPlay();
      events.forEach((e) => window.removeEventListener(e, unlock));
    };
    events.forEach((e) =>
      window.addEventListener(e, unlock, { passive: true, once: true })
    );
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden bg-navy-950">
      {/* poster paints first (optimized + preloaded); the film fades in behind */}
      <Image
        src={poster}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover"
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
          preload="metadata"
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
