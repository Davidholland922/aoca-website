import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { projects, getProject, getService } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaBand from "@/components/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const facts = [
    { label: "Sector", value: project.sector },
    { label: "Location", value: project.location },
    { label: "Value", value: project.value },
  ];

  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">
              <Link href="/projects" className="hover:text-brand-light">
                Projects
              </Link>{" "}
              / {project.sector}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              {project.title}
            </h1>
            <div className="rule" />
            <p className="mt-6 max-w-2xl text-lg text-navy-100">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <PlaceholderImage
              label={`${project.title} — hero photo`}
              sector={project.sector}
              className="aspect-[21/9] w-full"
            />
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr,320px]">
            <div>
              <Reveal>
                <h2 className="text-2xl font-semibold text-navy-900">
                  The challenge
                </h2>
                <div className="rule" />
                <p className="mt-5 text-lg leading-relaxed text-navy-700">
                  {project.challenge}
                </p>
              </Reveal>
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                  The outcome
                </h2>
                <div className="rule" />
                <p className="mt-5 text-lg leading-relaxed text-navy-700">
                  {project.outcome}
                </p>
              </Reveal>
            </div>

            <aside>
              <Reveal>
                <div className="border border-navy-100 bg-navy-50/50 p-7">
                  <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                    Project facts
                  </h2>
                  <dl className="mt-5 space-y-4">
                    {facts.map((f) => (
                      <div
                        key={f.label}
                        className="flex justify-between gap-4 border-b border-navy-100 pb-3 text-sm"
                      >
                        <dt className="text-navy-500">{f.label}</dt>
                        <dd className="font-medium text-navy-900">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <h3 className="mt-7 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                    AOCA services
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {project.servicesProvided.map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-dark"
                          >
                            <ArrowRight size={14} aria-hidden />
                            {s.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        title="Planning something similar?"
        body="We'll walk you through how this project was delivered — and what we'd do on yours."
      />
    </>
  );
}
