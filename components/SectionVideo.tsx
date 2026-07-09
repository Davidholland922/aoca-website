"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Branded in-page video: muted, loops, only loads & plays when scrolled into
 * view (poster until then), offset red frame + A-mark stamp. Decorative —
 * hidden from screen readers.
 */
export default function SectionVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapRef, { margin: "200px" });
  const reduce = useReducedMotion();
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (inView && !reduce) setActivated(true);
  }, [inView, reduce]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, activated]);

  return (
    <div ref={wrapRef} className={`relative mr-4 mt-4 lg:mr-6 ${className ?? ""}`}>
      {/* offset red frame */}
      <div
        className="absolute -right-4 -top-4 h-full w-full border-2 border-brand lg:-right-6 lg:-top-6"
        aria-hidden
      />
      <div className="relative aspect-video w-full overflow-hidden bg-navy-950">
        {activated ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden
          />
        ) : (
          // poster only until scrolled near — keeps page weight down
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="h-full w-full object-cover" aria-hidden />
        )}
      </div>
      {/* A-mark stamp */}
      <div className="absolute -bottom-5 -left-5 border border-navy-100 bg-white p-3 shadow-lg">
        <Image
          src="/a-mark.png"
          alt=""
          width={151}
          height={150}
          className="h-9 w-auto"
          aria-hidden
        />
      </div>
    </div>
  );
}
