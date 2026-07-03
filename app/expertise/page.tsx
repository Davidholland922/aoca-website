import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { services, serviceLines, companyImages } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Civil engineering, structural engineering, insurance engineering, pyrite remediation and consulting engineering services from AOCA.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="Broad expertise. Singular focus."
        lead="Every project brings its own pressures — regulatory complexity, tight budgets, competing priorities and the constant need for clear, reliable advice. The last thing you need is a consultant who only sees part of the picture."
        image={companyImages.expertiseHero}
        imageAlt="Engineering drawings and models"
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-navy-700">
              Working across multiple jurisdictions for thirty years has made
              us genuinely versatile. We&apos;ve encountered challenges that
              most firms simply haven&apos;t — and that experience means we
              spot things early, ask the right questions, and bring solutions
              that actually hold up.
            </p>
          </Reveal>
          <div className="mt-14 space-y-8">
            {services.map((s, i) => (
              <Reveal key={s.slug}>
                <Link
                  href={`/expertise/${s.slug}`}
                  className="group grid overflow-hidden border border-navy-100 transition-all duration-200 hover:border-navy-800 hover:shadow-xl lg:grid-cols-5"
                >
                  <div
                    className={`relative aspect-[16/9] lg:col-span-2 lg:aspect-auto lg:min-h-[20rem] ${
                      i % 2 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 30rem, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                    <span className="flex items-baseline gap-3">
                      <span className="font-heading text-sm font-semibold text-brand">
                        0{i + 1}
                      </span>
                      <h2 className="text-2xl font-semibold text-navy-900 sm:text-3xl">
                        {s.title}
                      </h2>
                    </span>
                    <div className="rule" />
                    <p className="mt-5 max-w-2xl leading-relaxed text-navy-600">
                      {s.short}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.highlights.slice(0, 4).map((hl) => (
                        <li
                          key={hl}
                          className="flex items-start gap-2 text-sm text-navy-600"
                        >
                          <Check size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                          {hl}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                      Explore {s.title}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICE LINES */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Core service lines"
              title="And everything in between"
              lead="The service lines our clients call on most — this list should not be thought of as exhaustive in any way."
            />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLines.map((line, i) => (
              <Reveal key={line} delay={(i % 3) * 0.05}>
                <div className="flex items-center gap-3 border border-white/10 bg-navy-900/60 px-5 py-4">
                  <span className="h-[3px] w-6 shrink-0 bg-brand" aria-hidden />
                  <span className="text-sm font-medium text-navy-100">
                    {line}
                  </span>
                </div>
              </Reveal>
            ))}
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
