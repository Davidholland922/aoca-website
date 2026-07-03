"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat up from 0 when it scrolls into view.
 * Non-numeric parts of the value (e.g. "+", ",", "7,000+") are preserved.
 */
export default function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([^0-9]*)([\d,]+)(.*)$/);
    if (!match || reduce) {
      setDisplay(value);
      return;
    }
    const [, prefix, numRaw, suffix] = match;
    const target = parseInt(numRaw.replace(/,/g, ""), 10);
    // Years read as dates, not quantities — don't animate them
    if (target >= 1900 && target <= 2100 && !suffix) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(`${prefix}0${suffix}`);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current.toLocaleString("en-IE")}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return <span ref={ref}>{display}</span>;
}
