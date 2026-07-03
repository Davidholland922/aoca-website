"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background video (client-supplied) with poster fallback.
 * Respects prefers-reduced-motion by showing the poster only.
 */
export default function VideoHero({
  poster,
  children,
}: {
  poster: string;
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduce.matches) setShowVideo(true);
  }, []);

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* legibility scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
        aria-hidden
      />
      <div className="relative flex min-h-[92svh] items-center">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand to-transparent" />
    </section>
  );
}
