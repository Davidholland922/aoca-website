import type { Metadata } from "next";
import { services } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import SectionVideo from "@/components/SectionVideo";
import ExpertiseRegister from "@/components/ExpertiseRegister";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Civil engineering, structural engineering, insurance engineering, pyrite remediation and consulting engineering services from AOCA.",
};

export default function ExpertisePage() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-900 pb-0 pt-28 sm:pt-36">
        <div className="container-site">
          <div className="grid items-center gap-12 pb-14 sm:pb-16 lg:grid-cols-[1fr,28rem] xl:grid-cols-[1fr,32rem]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Broad expertise.
                <br />
                <span className="text-brand-light">Singular focus.</span>
              </h1>
              <div className="rule" />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100">
                Nine disciplines, one firm. Every project brings its own
                pressures — regulatory complexity, tight budgets and the
                constant need for clear, reliable advice. Thirty years across
                multiple jurisdictions means we&apos;ve met challenges most
                firms simply haven&apos;t: we spot things early, ask the
                right questions, and bring solutions that hold up.
              </p>
            </div>

            {/* Our head office from the air — the firm behind the register */}
            <Reveal delay={0.1}>
              <SectionVideo
                src="/video/expertise-loop.mp4"
                poster="/images/2026-08-dji-0194.jpg"
              />
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
              <span className="hidden sm:block">Nine disciplines</span>
              <span>Ireland · UK · Europe</span>
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
