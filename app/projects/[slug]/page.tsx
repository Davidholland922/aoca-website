import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  projects,
  getProject,
  getSector,
  getService,
  projectServices,
} from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import SectionVideo from "@/components/SectionVideo";

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

  const sector = getSector(project.sector);
  const servicesForProject =
    project.servicesProvided?.length
      ? project.servicesProvided
      : projectServices[project.slug] ?? [];
  const related = projects
    .filter((p) => p.sector === project.sector && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Link href="/projects" className="hover:text-brand-light">
              Projects
            </Link>{" "}
            / {sector?.title}
          </>
        }
        title={project.title}
        lead={project.summary}
        image={project.hero ?? project.thumb}
        imageAlt={project.title}
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[1fr,300px]">
            <div>
              {project.body.length > 0 && (
                <Reveal>
                  <h2 className="text-2xl font-semibold text-navy-900">
                    Project Overview
                  </h2>
                  <div className="rule" />
                  <div className="mt-5 space-y-5">
                    {project.body.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="text-lg leading-relaxed text-navy-700"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Services Provided — client-written description (from the
                  admin's description box); the ticked services list lives in
                  the side panel below Location */}
              {(project.servicesText ?? []).length > 0 && (
                <Reveal>
                  <h2
                    className={`text-2xl font-semibold text-navy-900 ${
                      project.body.length ? "mt-14" : ""
                    }`}
                  >
                    Services Provided
                  </h2>
                  <div className="rule" />
                  <div className="mt-5 space-y-5">
                    {(project.servicesText ?? []).map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="text-lg leading-relaxed text-navy-700"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* optional case-study film — its own space on any project */}
              {project.video && (
                <Reveal>
                  <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                    Watch the project
                  </h2>
                  <div className="rule" />
                  <div className="mb-2 mt-8">
                    <SectionVideo
                      src={project.video}
                      poster={project.videoPoster ?? project.hero ?? project.thumb}
                      withSound
                    />
                  </div>
                </Reveal>
              )}

              {project.gallery.length > 0 && (
                <Reveal>
                  <h2
                    className={`text-2xl font-semibold text-navy-900 ${
                      project.body.length ? "mt-14" : ""
                    }`}
                  >
                    In pictures
                  </h2>
                  <div className="rule" />
                  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                    {project.gallery.map((src, i) => (
                      <div
                        key={src}
                        className={`relative overflow-hidden ${
                          i % 5 === 0
                            ? "col-span-2 aspect-[16/9]"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} — photo ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(min-width: 1024px) 30rem, 50vw"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <aside>
              <Reveal>
                <div className="border border-navy-100 bg-navy-50/50 p-7">
                  <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                    Project facts
                  </h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex justify-between gap-4 border-b border-navy-100 pb-3">
                      <dt className="text-navy-500">Sector</dt>
                      <dd className="text-right font-medium text-navy-900">
                        {sector?.title}
                      </dd>
                    </div>
                    {project.location && (
                      <div className="flex justify-between gap-4 border-b border-navy-100 pb-3">
                        <dt className="text-navy-500">Location</dt>
                        <dd className="text-right font-medium text-navy-900">
                          {project.location}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {/* the services ticked for this project in the admin */}
                  {servicesForProject.length > 0 && (
                    <>
                      <h3 className="mt-7 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                        Services Provided
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {servicesForProject.map((slug) => {
                          const s = getService(slug);
                          if (!s) return null;
                          return (
                            <li key={slug}>
                              <Link
                                href={`/expertise/${slug}`}
                                className="inline-flex items-start gap-2 text-sm text-navy-800 transition-colors hover:text-brand"
                              >
                                <ArrowRight
                                  size={14}
                                  className="mt-0.5 shrink-0 text-brand"
                                  aria-hidden
                                />
                                {s.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  <Link href="/contact" className="btn-primary mt-7 w-full">
                    Discuss a similar project
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          {related.length > 0 && (
            <Reveal>
              <div className="mt-20 border-t border-navy-100 pt-12">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-navy-900">
                    Related projects
                  </h2>
                  <Link
                    href={`/projects?sector=${project.sector}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-dark"
                  >
                    All {sector?.title}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group block border border-navy-100 transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.thumb}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 640px) 33vw, 100vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-navy-900 group-hover:text-brand">
                          {p.title}
                        </h3>
                        {p.location && (
                          <p className="mt-1 text-xs uppercase tracking-wider text-navy-400">
                            {p.location}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand
        title="Planning something similar?"
        body="We'll walk you through how this project was delivered — and what we'd do on yours."
      />
    </>
  );
}
