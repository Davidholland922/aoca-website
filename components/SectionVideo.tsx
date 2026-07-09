"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Branded in-page video: loops, only loads & plays when scrolled into view
 * (poster until then), offset red frame + A-mark stamp. Starts muted so
 * autoplay is never blocked; `withSound` adds an unmute toggle for films
 * that have an audio track (e.g. the Our Culture behind-the-scenes film).
 */
export default function SectionVideo({
  src,
  poster,
  withSound = false,
  className,
}: {
  src: string;
  poster: string;
  withSound?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapRef, { margin: "200px" });
  const reduce = useReducedMotion();
  const [activated, setActivated] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (inView && !reduce) setActivated(true);
  }, [inView, reduce]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.defaultMuted = true;
    if (muted) v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    if (inView) v.play().catch(() => {});
    else {
      v.pause();
      // never let sound continue off-screen
      if (!muted) setMuted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, activated, muted]);

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
            aria-hidden={!withSound}
          />
        ) : (
          // poster only until scrolled near — keeps page weight down
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="h-full w-full object-cover" aria-hidden />
        )}
        {withSound && activated && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="absolute bottom-3 right-3 flex h-11 w-11 cursor-pointer items-center justify-center border border-white/30 bg-navy-950/70 text-white backdrop-blur transition-colors hover:border-brand hover:bg-brand"
          >
            {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
          </button>
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
