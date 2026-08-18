import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* FSC's brand orange, sampled from the flame logo. Used only on
   Fire Safety Consultants surfaces — see DESIGN.md. */
const FSC_ORANGE = "#F5821F";

/**
 * Homepage band introducing Fire Safety Consultants, the AOCA × OCF
 * sister company. Dark sheet so the white-text flame logo reads; the
 * one-off orange accent marks the handover between the two brands.
 */
export default function FscBanner() {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-950">
      {/* warm glow rising behind the flame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{
          background: `radial-gradient(circle, ${FSC_ORANGE} 0%, transparent 65%)`,
        }}
      />
      <div className="container-site relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[auto,1fr,auto]">
        <Link
          href="/fire-safety-consultants"
          aria-label="Fire Safety Consultants"
          className="justify-self-center transition-transform duration-300 hover:scale-[1.03] lg:justify-self-start"
        >
          <Image
            src="/fsc-logo-white.png"
            alt="Fire Safety Consultants"
            width={1600}
            height={1067}
            className="h-28 w-auto sm:h-32"
            sizes="16rem"
          />
        </Link>

        <div className="max-w-2xl text-center lg:border-l lg:border-white/15 lg:pl-10 lg:text-left">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: FSC_ORANGE }}
          >
            Our sister company
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            Specialist fire safety, from the same family
          </h2>
          <p className="mt-4 leading-relaxed text-navy-200">
            AOCA and OCF have pooled their expertise to form Fire Safety
            Consultants — fire engineering, fire safety and disability
            access certificates, risk assessments and fire defect
            remediation across Ireland and the UK.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 lg:items-end">
          <Link
            href="/fire-safety-consultants"
            className="btn text-white transition-colors"
            style={{ backgroundColor: FSC_ORANGE }}
          >
            Discover Fire Safety Consultants
            <ArrowRight size={16} aria-hidden />
          </Link>
          <a
            href="https://firesafetyconsultants.ie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-navy-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            firesafetyconsultants.ie
          </a>
        </div>
      </div>
    </section>
  );
}
