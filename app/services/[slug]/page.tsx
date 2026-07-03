import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService, getProject } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaBand from "@/components/CtaBand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const related = getProject(service.relatedProject);

  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">
              <Link href="/services" className="hover:text-brand-light">
                Expertise
              </Link>{" "}
              / {service.title}
            </p>
            <div className="mt-6 flex items-start gap-5">
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center border border-white/15 text-brand-light sm:flex">
                <ServiceIcon name={service.icon} size={30} />
              </span>
              <div>
                <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
                  {service.title}
                </h1>
                <div className="rule" />
                <p className="mt-6 max-w-2xl text-lg text-navy-100">
                  {service.short}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,380px]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold text-navy-900">
                The problem we solve
              </h2>
              <div className="rule" />
              <p className="mt-5 text-lg leading-relaxed text-navy-700">
                {service.problem}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                How AOCA approaches it
              </h2>
              <div className="rule" />
              <p className="mt-5 text-lg leading-relaxed text-navy-700">
                {service.approach}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                What you get
              </h2>
              <div className="rule" />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 border border-navy-100 bg-navy-50/50 p-4"
                  >
                    <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span className="text-sm leading-relaxed text-navy-700">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="space-y-6">
            {related && (
              <Reveal>
                <div className="border border-navy-100">
                  <PlaceholderImage
                    label={related.title}
                    sector={related.sector}
                    className="aspect-[16/10]"
                  />
                  <div className="p-6">
                    <p className="eyebrow">Related project</p>
                    <h3 className="mt-2 text-lg font-semibold text-navy-900">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {related.summary}
                    </p>
                    <Link
                      href={`/projects/${related.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-dark"
                    >
                      Read the case study
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <div className="blueprint bg-navy-950 p-7">
                <h3 className="text-lg font-semibold text-white">
                  Other disciplines
                </h3>
                <ul className="mt-4 space-y-3">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="text-sm text-navy-200 transition-colors hover:text-white"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.title.toLowerCase()} on your project?`}
        body="Tell us where the project stands and we'll set out scope, fee and programme in plain language."
      />
    </>
  );
}
