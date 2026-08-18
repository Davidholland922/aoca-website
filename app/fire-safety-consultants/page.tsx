import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Flame, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectGallery from "@/components/ProjectGallery";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Fire Safety Consultants",
  description:
    "Fire Safety Consultants — AOCA and OCF's specialist fire safety and accessibility consultancy. Fire engineering, certificates, risk assessments and defect remediation across Ireland and the UK.",
};

/* FSC's brand orange, sampled from the flame logo (see DESIGN.md) */
const FSC_ORANGE = "#F5821F";

/** Services as supplied by AOCA (Expertise deck, August 2026). */
const services = [
  {
    title: "Fire Engineering Design",
    body: "Performance-based and prescriptive fire safety design for new and existing buildings.",
  },
  {
    title: "Fire Safety Review & Assessment",
    body: "Review of building designs and existing buildings to identify fire safety risks and compliance issues.",
  },
  {
    title: "Fire Safety Consultancy",
    body: "Practical fire safety advice from early design stage through to construction and occupation.",
  },
  {
    title: "Accessibility Consultancy",
    body: "Advice on accessibility, inclusive design and compliance with relevant accessibility requirements.",
  },
  {
    title: "Fire Risk Assessments",
    body: "Assessment of fire hazards, existing fire safety measures and practical risk-reduction recommendations.",
  },
  {
    title: "Inspection Services",
    body: "Fire safety inspections of buildings, fire doors, emergency lighting, alarm systems and passive fire protection.",
  },
  {
    title: "Due Diligence & Third-Party Checker",
    body: "Independent fire safety reviews for acquisitions, developments, design teams, contractors and building owners.",
  },
  {
    title: "Fire Detection & Alarm System Design",
    body: "Design and review of fire detection and alarm systems for compliance and life safety performance.",
  },
  {
    title: "Emergency Lighting Design",
    body: "Emergency lighting design and review to support safe escape in the event of fire or power failure.",
  },
  {
    title: "Structural Fire Engineering",
    body: "Specialist assessment of structural behaviour in fire, including steel, concrete, timber and composite structures.",
  },
  {
    title: "Passive Fire Protection",
    body: "Review and advice on fire stopping, compartmentation, cavity barriers, fire doors and structural fire protection.",
  },
];

const offices = [
  {
    name: "Dublin",
    address: "Unit E6 Centrepoint Business Park, Oak Drive, Clondalkin, Dublin 12",
    phone: "+353 (0)1 424 3035",
    phoneHref: "+35314243035",
  },
  {
    name: "Portlaoise",
    address: "Lismard House, Timahoe Road, Co. Laois",
    phone: "+353 (0)57 866 3244",
    phoneHref: "+353578663244",
  },
  {
    name: "Cork",
    address: "Unit 19 TC, Charleville, Co. Cork",
    phone: "+353 (0)63 30917",
    phoneHref: "+3536330917",
  },
];

export default function FireSafetyConsultantsPage() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="blueprint relative overflow-hidden bg-navy-950 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle, ${FSC_ORANGE} 0%, transparent 65%)`,
          }}
        />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1fr,auto]">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: FSC_ORANGE }}
            >
              An AOCA &amp; OCF company
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Ireland and the UK&apos;s trusted fire safety experts
            </h1>
            <div className="mt-4 h-[3px] w-14" style={{ backgroundColor: FSC_ORANGE }} />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
              AOCA, in conjunction with OCF, has established Fire Safety
              Consultants to pool our resources and expertise and provide
              specialist fire safety and accessibility consultancy services
              — bringing together internationally recognised expertise in
              fire engineering, fire safety compliance, accessibility,
              inspection, due diligence and structural fire engineering.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://firesafetyconsultants.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-white"
                style={{ backgroundColor: FSC_ORANGE }}
              >
                Visit firesafetyconsultants.ie
                <ArrowRight size={16} aria-hidden />
              </a>
              <Link href="/contact" className="btn-outline-light">
                Talk to AOCA first
              </Link>
            </div>
          </div>
          <Reveal delay={0.1}>
            <Image
              src="/fsc-logo-white.png"
              alt="Fire Safety Consultants"
              width={1600}
              height={1067}
              priority
              className="mx-auto h-40 w-auto sm:h-52 lg:h-64"
              sizes="(min-width: 1024px) 24rem, 16rem"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="What they do"
              title="Specialist services, end to end"
              lead="From performance-based fire engineering design to passive fire protection review — a complete fire safety and accessibility consultancy."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.03, 0.24)}>
                <div className="h-full border border-navy-100 bg-white p-6 transition-all duration-200 hover:border-navy-800 hover:shadow-lg">
                  <span
                    className="flex h-10 w-10 items-center justify-center bg-navy-950"
                    aria-hidden
                  >
                    <Flame size={19} style={{ color: FSC_ORANGE }} />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- their work, from firesafetyconsultants.ie ---------- */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Recent projects"
              title="Fire safety, on real buildings"
              lead="From cladding remediation on 11-storey apartment schemes in Poole and Sheffield to fire door and compartmentation inspections across Ireland — a look at Fire Safety Consultants' work on site."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12">
              <ProjectGallery
                accent="fsc"
                title="Fire Safety Consultants projects"
                images={[
                  "/images/2026-08-fsc-sheffield-uk1-min.jpg",
                  "/images/2026-08-fsc-poole-uk-images-fire-safety-final-png.jpg",
                  "/images/2026-08-fsc-poole-uk-images-fire-afety-final-png-1.jpg",
                  "/images/2026-08-fsc-sheffield-uk2-min.jpg",
                  "/images/2026-08-fsc-poole-uk-images-fire-afety-final-png.jpg",
                  "/images/2026-08-fsc-dublin-111.jpg",
                  "/images/2026-08-fsc-tralee-fire-safety1.jpg",
                  "/images/2026-08-fsc-tralee-fire-safety3.jpg",
                  "/images/2026-08-fsc-fire-safety-consuktants-team-120-x-60-cm.jpg",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- who's behind it ---------- */}
      <section className="section bg-white">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="The team"
                title="Led by people you already know"
              />
              <div className="mt-8 space-y-6">
                <div className="border border-navy-100 bg-white p-7">
                  <h3 className="font-semibold text-navy-900">
                    Aidan O&apos;Connell{" "}
                    <span className="text-sm font-normal text-navy-500">
                      FIEI, Chartered Engineer
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    Over 38 years of industry experience and an Expert
                    Contributor to the NSAI — the founder of AOCA brings the
                    same forensic engineering judgment to fire safety.
                  </p>
                </div>
                <div className="border border-navy-100 bg-white p-7">
                  <h3 className="font-semibold text-navy-900">
                    Philip O&apos;Connell{" "}
                    <span className="text-sm font-normal text-navy-500">
                      BEng (Hons), MSc
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    AOCA&apos;s Managing Director leads business development
                    at Fire Safety Consultants, specialising in fire safety
                    assessment and remediation of multi-unit residential
                    developments.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <SectionHeading eyebrow="Offices" title="Three offices, one team" />
              <ul className="mt-8 space-y-4">
                {offices.map((o) => (
                  <li
                    key={o.name}
                    className="flex items-start gap-4 border border-navy-100 bg-white p-6"
                  >
                    <MapPin
                      size={18}
                      className="mt-1 shrink-0"
                      style={{ color: FSC_ORANGE }}
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-semibold text-navy-900">{o.name}</h3>
                      <p className="mt-1 text-sm text-navy-600">{o.address}</p>
                      <a
                        href={`tel:${o.phoneHref}`}
                        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-brand"
                      >
                        <Phone size={14} aria-hidden />
                        {o.phone}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2 text-sm text-navy-600">
                <Check size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                Currently remediating apartment schemes throughout Ireland
                under the Apartment Remediation Defect Scheme.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="A project with a fire safety dimension?"
        body="Start with AOCA — we'll bring Fire Safety Consultants in exactly where their specialist expertise is needed."
      />
    </>
  );
}
