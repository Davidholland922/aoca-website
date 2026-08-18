import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

/* FSC's brand orange — sister-brand surfaces only, see DESIGN.md */
const FSC_ORANGE = "#F5821F";

const keyServices = [
  "Fire engineering design — performance-based & prescriptive",
  "Fire Safety Certificates & Disability Access Certificates",
  "Fire risk assessments & inspections",
  "Fire defect investigation & remediation",
];

/**
 * Full-width showcase for Fire Safety Consultants on the fire safety
 * expertise page: this discipline is delivered through the joint
 * venture, so the hand-off deserves a stage of its own.
 */
export default function FscShowcase() {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-950">
      {/* ember glow rising from the flame logo's corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[30rem] w-[34rem] rounded-full opacity-[0.15] blur-3xl"
        style={{
          background: `radial-gradient(circle, ${FSC_ORANGE} 0%, transparent 65%)`,
        }}
      />
      <div className="container-site relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <Image
            src="/fsc-logo-white.png"
            alt="Fire Safety Consultants"
            width={1600}
            height={1067}
            className="h-24 w-auto sm:h-28"
            sizes="14rem"
          />
          <h2 className="mt-8 max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            This discipline has its own dedicated practice
          </h2>
          <div
            className="mt-4 h-[3px] w-14"
            style={{ backgroundColor: FSC_ORANGE }}
          />
          <p className="mt-6 max-w-xl leading-relaxed text-navy-100">
            Fire Safety Consultants is the specialist consultancy AOCA and
            OCF built together — internationally recognised fire
            engineering and accessibility expertise, currently remediating
            apartment schemes throughout Ireland.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/fire-safety-consultants"
              className="btn text-white"
              style={{ backgroundColor: FSC_ORANGE }}
            >
              Meet Fire Safety Consultants
              <ArrowRight size={16} aria-hidden />
            </Link>
            <a
              href="https://firesafetyconsultants.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              firesafetyconsultants.ie
            </a>
          </div>
        </div>

        <div>
          <div className="relative mr-4 mt-4 lg:mr-6">
            {/* offset frame motif, in the sister brand's colour */}
            <div
              className="absolute -right-4 -top-4 h-full w-full border-2 lg:-right-6 lg:-top-6"
              style={{ borderColor: FSC_ORANGE }}
              aria-hidden
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/2026-08-near-finish.jpg"
                alt="Multi-unit residential scheme — the heart of Fire Safety Consultants' remediation work"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            </div>
          </div>
          <ul className="mt-10 grid gap-2.5 sm:grid-cols-2">
            {keyServices.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 text-sm text-navy-100"
              >
                <Check
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: FSC_ORANGE }}
                  aria-hidden
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
