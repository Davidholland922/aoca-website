import type { Metadata } from "next";
import Image from "next/image";
import { services } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import ExpertiseRegister from "@/components/ExpertiseRegister";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Civil engineering, structural engineering, insurance engineering, pyrite remediation and consulting engineering services from AOCA.",
};

const REV = "A · 08.2026";

export default function ExpertisePage() {
  return (
    <>
      {/* ================= SHEET HEADER ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-900 pb-0 pt-28 sm:pt-36">
        <div className="container-site">
          <div className="grid items-end gap-10 pb-14 sm:pb-16 lg:grid-cols-[1fr,20rem]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Broad expertise.
                <br />
                <span className="text-brand-light">Singular focus.</span>
              </h1>
              <div className="rule" />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100">
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
                className="hidden border border-white/25 text-[13px] leading-snug lg:block"
                aria-label="Drawing register details"
              >
                <div className="flex items-center gap-3 bg-brand px-4 py-3">
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
                    className="flex justify-between gap-6 border-t border-white/15 px-4 py-2"
                  >
                    <dt className="uppercase tracking-wider text-navy-200">
                      {k}
                    </dt>
                    <dd className="text-right text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* ================= THE REGISTER ================= */}
        <div className="border-t border-white/15">
          <ExpertiseRegister services={services} />

          {/* sheet footer rule, like the bottom edge of a drawing */}
          <div className="border-t border-white/15 py-4">
            <div className="container-site flex items-center justify-between text-xs uppercase tracking-wider text-navy-300">
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
