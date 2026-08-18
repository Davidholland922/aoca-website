"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionVideo from "@/components/SectionVideo";

const EASE = [0.16, 1, 0.3, 1] as const; // ease-out-expo

// Founded 1996 — always current, never reads 0
const YEARS = new Date().getFullYear() - 1996;

const stats = [
  { value: `${YEARS}`, label: "Years in practice" },
  { value: "7,000+", label: "Projects delivered" },
  { value: "3", label: "Offices" },
];

/**
 * Expertise page opening: one rehearsed entrance. Each headline line
 * wipes up inside a mask, the red rule draws itself, the supporting
 * copy and stats settle in, and the office film arrives last.
 * Reduced motion: everything renders in place instantly.
 */
export default function ExpertiseHero() {
  const reduce = useReducedMotion();

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: "0%" },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  const settle = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <div className="grid items-center gap-12 pb-14 sm:pb-16 lg:grid-cols-[1fr,28rem] xl:grid-cols-[1fr,32rem]">
      <div>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.06] text-white sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden pb-1">
            <motion.span className="block" {...line(0.05)}>
              Broad expertise.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block text-brand-light"
              {...line(0.17)}
            >
              Singular focus.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="rule origin-left"
          {...(reduce
            ? {}
            : {
                initial: { scaleX: 0 },
                animate: { scaleX: 1 },
                transition: { duration: 0.6, delay: 0.75, ease: EASE },
              })}
        />

        <motion.p
          className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100"
          {...settle(0.55)}
        >
          Nine disciplines, one firm. Every project brings its own pressures
          — regulatory complexity, tight budgets and the constant need for
          clear, reliable advice. Thirty years across multiple jurisdictions
          means we&apos;ve met challenges most firms simply haven&apos;t: we
          spot things early, ask the right questions, and bring solutions
          that hold up.
        </motion.p>

        <motion.dl
          className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7"
          {...settle(0.7)}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-heading text-3xl font-bold text-white sm:text-4xl">
                {s.value}
              </dd>
              <dt className="mt-1 text-xs uppercase tracking-wider text-navy-300">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Our head office from the air — the firm behind the register */}
      <motion.div {...settle(0.35)}>
        <SectionVideo
          src="/video/expertise-loop.mp4"
          poster="/images/2026-08-dji-0194.jpg"
        />
      </motion.div>
    </div>
  );
}
