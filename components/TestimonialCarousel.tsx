"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = { quote: string; author: string; role: string };

/** Auto-advancing testimonial carousel with manual controls. */
export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + testimonials.length) % testimonials.length),
    [testimonials.length]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 6500);
    return () => clearInterval(id);
  }, [paused, reduce, go]);

  const t = testimonials[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="min-h-[16rem] border border-white/10 bg-navy-900/60 p-8 sm:min-h-[13rem] sm:p-12">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="max-w-3xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              <span className="font-heading text-4xl leading-none text-brand-light" aria-hidden>
                &ldquo;
              </span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-semibold text-white">{t.author}</p>
              <p className="text-sm text-navy-300">{t.role}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 -skew-x-12 cursor-pointer transition-all duration-300 ${
                i === index ? "w-8 bg-brand" : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
