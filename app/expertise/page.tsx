import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Civil engineering, structural engineering, insurance engineering, pyrite remediation and consulting engineering services from AOCA.",
};

/* Corner notch echoing the apex angle of the AOCA "A" (same as .btn) */
const apexClip = {
  clipPath:
    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
};

const REV = "A · 08.2026";

export default function ExpertisePage() {
  return (
    <>
      {/* ================= SHEET HEADER ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-950 pb-0 pt-28 sm:pt-36">
        <div className="container-site">
          <div className="grid items-end gap-10 pb-14 sm:pb-20 lg:grid-cols-[1fr,20rem]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Broad expertise.
                <br />
                <span className="text-brand-light">Singular focus.</span>
              </h1>
              <div className="rule" />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-200">
                Every project brings its own pressures — regulatory
                complexity, tight budgets and the constant need for clear,
                reliable advice. Thirty years across multiple jurisdictions
                means we&apos;ve met challenges most firms simply
                haven&apos;t: we spot things early, ask the right questions,
                and bring solutions that hold up.
              </p>
            </div>

            {/* Drawing title block — the corner table on every AOCA drawing */}
            <Reveal delay={0.1}>
              <dl
                className="hidden border border-white/20 text-[13px] leading-snug lg:block"
                aria-label="Drawing register details"
              >
                <div className="flex items-center gap-3 border-b border-white/20 px-4 py-3">
                  <Image
                    src="/a-mark.png"
                    alt=""
                    width={151}
                    height={150}
                    className="h-7 w-auto brightness-0 invert"
                    aria-hidden
                  />
                  <span className="font-heading font-semibold uppercase tracking-wider text-white">
                    Drawing register
                  </span>
                </div>
                {[
                  ["Series", "Expertise"],
                  ["Sheets", "01 — 09"],
                  ["Rev", REV],
                  ["Issued by", "Portlaoise · Dublin · Manchester"],
                  ["Scope", "Ireland · UK · Europe"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-6 border-b border-white/10 px-4 py-2 last:border-b-0"
                  >
                    <dt className="uppercase tracking-wider text-navy-300">
                      {k}
                    </dt>
                    <dd className="text-right text-navy-100">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* ================= THE REGISTER ================= */}
        <div className="border-t border-white/15">
          <div className="container-site">
            <ol className="list-none">
              {services.map((s, i) => (
                <li
                  key={s.slug}
                  className={i > 0 ? "border-t border-white/10" : ""}
                >
                  <Reveal delay={Math.min(i * 0.04, 0.24)}>
                    <Link
                      href={`/expertise/${s.slug}`}
                      className="group grid grid-cols-[3.25rem,1fr,auto] items-start gap-4 py-6 sm:grid-cols-[4.5rem,1fr,auto] sm:items-center sm:gap-8 sm:py-8"
                    >
                      {/* sheet number */}
                      <span
                        aria-hidden
                        className="pt-1 font-heading text-xl font-semibold tabular-nums text-navy-500 transition-colors duration-300 group-hover:text-brand-light sm:pt-0 sm:text-2xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* title + one-liner */}
                      <span className="min-w-0">
                        <span className="block font-heading text-2xl font-bold leading-tight text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:text-4xl lg:text-[2.75rem]">
                          {s.title}
                        </span>
                        <span className="mt-2 block max-w-xl text-sm leading-relaxed text-navy-300 transition-colors duration-300 group-hover:text-navy-100 sm:text-base">
                          {s.short}
                        </span>
                      </span>

                      {/* plate photo + arrow */}
                      <span className="flex items-center gap-4 self-center sm:gap-6">
                        <span
                          className="relative hidden h-20 w-32 shrink-0 overflow-hidden sm:block lg:h-28 lg:w-48"
                          style={apexClip}
                        >
                          <Image
                            src={s.image}
                            alt=""
                            fill
                            sizes="12rem"
                            className="object-cover opacity-50 saturate-0 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100 motion-reduce:transition-none"
                            aria-hidden
                          />
                        </span>
                        <ArrowRight
                          size={22}
                          className="shrink-0 text-navy-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-light"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* sheet footer rule, like the bottom edge of a drawing */}
          <div className="border-t border-white/15 py-4">
            <div className="container-site flex items-center justify-between text-xs uppercase tracking-wider text-navy-400">
              <span>AOCA Engineering Consultants</span>
              <span className="hidden sm:block">Expertise · Sheets 01—09</span>
              <span>Rev {REV}</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which discipline you need?"
        body="Describe the project — we'll tell you exactly what's required, what isn't, and what it should cost."
      />
    </>
  );
}
