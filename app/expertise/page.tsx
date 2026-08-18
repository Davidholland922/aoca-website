import type { Metadata } from "next";
import { services } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import AWatermark from "@/components/AWatermark";
import ExpertiseHero from "@/components/ExpertiseHero";
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
        <AWatermark className="-right-32 top-8 h-[85%] w-auto opacity-[0.05]" />
        <div className="container-site relative">
          <ExpertiseHero />
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
