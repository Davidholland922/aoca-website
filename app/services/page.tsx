import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Civil & structural engineering, project management, Assigned Certifier, site development, structural surveys and PSDP services from AOCA Engineering Consultants.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Expertise</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              Six disciplines. One accountable engineer.
            </h1>
            <div className="rule" />
            <p className="mt-6 max-w-2xl text-lg text-navy-100">
              We don&apos;t list services to look big — each of these is work
              we lead, certify and stand over. Pick the problem; we&apos;ll
              bring the discipline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.05, 0.2)}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid gap-6 border border-navy-100 p-8 transition-all duration-200 hover:border-navy-800 hover:shadow-lg sm:grid-cols-[auto,1fr,auto] sm:items-center"
              >
                <span className="flex h-14 w-14 items-center justify-center bg-navy-950 text-brand-light">
                  <ServiceIcon name={s.icon} size={28} />
                </span>
                <span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-heading text-sm font-semibold text-brand">
                      0{i + 1}
                    </span>
                    <h2 className="text-xl font-semibold text-navy-900 sm:text-2xl">
                      {s.title}
                    </h2>
                  </span>
                  <p className="mt-2 max-w-2xl leading-relaxed text-navy-600">
                    {s.short}
                  </p>
                </span>
                <ArrowRight
                  className="hidden text-navy-300 transition-all group-hover:translate-x-1 group-hover:text-brand sm:block"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which discipline you need?"
        body="Describe the project — we'll tell you exactly what's required, what isn't, and what it should cost."
      />
    </>
  );
}
