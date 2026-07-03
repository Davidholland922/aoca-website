"use client";

import { useEffect, useState } from "react";

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

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      {src && (
        <video
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
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
