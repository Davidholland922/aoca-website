"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* Corner notch echoing the apex angle of the AOCA "A" (same as .btn) */
const apexClip = {
  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
};

/**
 * Project photo slider: a large stage with crossfading slides, swipe on
 * touch, arrow keys on focus, prev/next controls, a plate-style counter
 * tab and a thumbnail rail. All images stay mounted (lazy-loaded) so
 * navigation is instant; reduced motion swaps without transition.
 */
/* Accent variants: AOCA red (default) or the FSC sister-brand orange.
   Class strings stay literal so Tailwind compiles them. */
const ACCENTS = {
  brand: {
    frame: "border-brand",
    counter: "bg-brand",
    control: "hover:border-brand hover:bg-brand",
    ring: "ring-brand",
  },
  fsc: {
    frame: "border-[#F5821F]",
    counter: "bg-[#F5821F]",
    control: "hover:border-[#F5821F] hover:bg-[#F5821F]",
    ring: "ring-[#F5821F]",
  },
} as const;

export default function ProjectGallery({
  images,
  title,
  accent = "brand",
}: {
  images: string[];
  title: string;
  accent?: keyof typeof ACCENTS;
}) {
  const a = ACCENTS[accent];
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  // functional updates so rapid clicks never read a stale index
  const go = useCallback(
    (delta: number) => setIndex((p) => (p + delta + total) % total),
    [total]
  );
  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total]
  );

  // keep the active thumbnail in view
  useEffect(() => {
    const thumb = railRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, reduce]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} photographs`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      {/* ---------- stage ---------- */}
      <div className="relative mr-4 mt-4">
        {/* offset red frame, the site's media motif */}
        <div
          className={`absolute -right-4 -top-4 h-full w-full border-2 ${a.frame}`}
          aria-hidden
        />
        {/* plate-style counter riding the frame */}
        <div
          className={`absolute -top-4 right-4 z-10 -translate-y-full ${a.counter} px-3 py-1 font-heading text-xs font-semibold tabular-nums tracking-wider text-white`}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
        </div>

        <div
          className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950"
          style={apexClip}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${title} — photo ${i + 1} of ${total}`}
              fill
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 44rem, 100vw"
              className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                index === i ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={index !== i}
            />
          ))}

          {/* swipe surface */}
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            aria-hidden
          />

          {/* controls */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className={`absolute bottom-3 left-3 flex h-11 w-11 cursor-pointer items-center justify-center border border-white/30 bg-navy-950/70 text-white backdrop-blur transition-colors ${a.control}`}
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className={`absolute bottom-3 left-[4.25rem] flex h-11 w-11 cursor-pointer items-center justify-center border border-white/30 bg-navy-950/70 text-white backdrop-blur transition-colors ${a.control}`}
          >
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      {/* ---------- thumbnail rail ---------- */}
      <div
        ref={railRef}
        className="mt-5 flex gap-3 overflow-x-auto pb-2"
        aria-hidden
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            tabIndex={-1}
            onClick={() => goTo(i)}
            className={`relative h-16 w-24 shrink-0 cursor-pointer overflow-hidden transition-all duration-300 sm:h-20 sm:w-32 ${
              index === i
                ? `opacity-100 ring-2 ${a.ring} ring-offset-2`
                : "opacity-55 hover:opacity-90"
            }`}
            style={apexClip}
          >
            <Image
              src={src}
              alt=""
              fill
              loading="lazy"
              sizes="8rem"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
