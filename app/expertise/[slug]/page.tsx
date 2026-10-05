import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import SectionVideo from "@/components/SectionVideo";
import FscShowcase from "@/components/FscShowcase";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";
import { projectsForService, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/** search-led page titles: what people type, plus where we are */
const SEO_LABEL: Record<string, string> = {
  "structural-engineering": "Structural Engineers",
  "civil-engineering": "Civil Engineers",
  "insurance-forensic-engineering": "Insurance & Forensic Engineers",
  "fire-safety-disability-access": "Fire Safety Consultants",
  "building-surveying": "Building Surveyors",
  "assigned-certifier": "Assigned Certifier",
  "project-construction-management": "Project & Construction Management",
  "consulting-engineering": "Consulting Engineers",
  "building-envelope-engineering": "Building Envelope Engineers",
};

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
  const label = SEO_LABEL[service.slug] ?? service.title;
  const short = service.short.length > 105 ? service.short.slice(0, service.short.lastIndexOf(" ", 105)) + "." : service.short;
  return {
    title: `${label}, Portlaoise, Dublin & UK`,
    description: `${short} AOCA, Portlaoise, Dublin and Manchester.`,
    alternates: { canonical: `/expertise/${service.slug}` },
    openGraph: { images: [service.image] },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = projectsForService(service.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Expertise", path: "/expertise" },
            { name: service.title, path: `/expertise/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={
          <>
            <Link href="/expertise" className="hover:text-brand-light">
              Expertise
            </Link>{" "}
            / {service.title}
          </>
        }
        title={service.title}
        lead={service.short}
        image={service.image}
        imageAlt={service.title}
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,340px]">
          {/* min-w-0 guards the column against wide intrinsic children */}
          <div className="min-w-0">
            <Reveal>
              <p className="text-lg leading-relaxed text-navy-700">
                {service.intro}
              </p>
            </Reveal>

            {(() => {
              // On copy-heavy pages (7+ sections), runs of shorter sections
              // render as a two-column card grid so the page stays scannable;
              // longer narrative sections keep the full-width treatment.
              const useGrid = service.sections.length > 6;
              const runs: { grid: boolean; items: typeof service.sections }[] =
                [];
              for (const sec of service.sections) {
                const grid = useGrid && sec.body.length < 560;
                const last = runs[runs.length - 1];
                if (last && last.grid === grid) last.items.push(sec);
                else runs.push({ grid, items: [sec] });
              }
              // a lone short section (e.g. a closing invitation) reads as
              // narrative, not as a one-item numbered list
              for (const run of runs) {
                if (run.grid && run.items.length < 3) run.grid = false;
              }
              let splitCount = 0;
              let gridCount = 0;
              let itemNo = 0;
              return runs.map((run) =>
                run.grid ? (
                  <div key={run.items[0].heading}>
                    {gridCount++ === 0 && service.sectionsLabel && (
                      <Reveal>
                        <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                          {service.sectionsLabel}
                        </h2>
                        <div className="rule" />
                      </Reveal>
                    )}
                    {/* numbered, open two-column run — the client's list in
                        the client's order, read as a delivery sequence */}
                    <div className="mt-4 grid gap-x-10 sm:grid-cols-2">
                      {run.items.map((sec) => (
                        <Reveal key={sec.heading}>
                          <div className="border-t border-navy-100 py-6">
                            <div className="flex items-baseline gap-3">
                              <span
                                aria-hidden
                                className="font-heading text-sm font-bold tabular-nums text-brand"
                              >
                                {String(++itemNo).padStart(2, "0")}
                              </span>
                              <h3 className="font-heading text-base font-semibold text-navy-900">
                                {sec.heading}
                              </h3>
                            </div>
                            <p className="mt-2.5 pl-8 text-sm leading-relaxed text-navy-600">
                              {sec.body}
                            </p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : (
                  run.items.map((sec) => {
                    if (!sec.image) {
                      return (
                        <Reveal key={sec.heading}>
                          <h2 className="mt-12 text-2xl font-semibold text-navy-900">
                            {sec.heading}
                          </h2>
                          <div className="rule" />
                          <p className="mt-5 leading-relaxed text-navy-700">
                            {sec.body}
                          </p>
                        </Reveal>
                      );
                    }
                    // photo sections alternate sides for rhythm
                    const flip = splitCount++ % 2 === 1;
                    return (
                      <Reveal key={sec.heading}>
                        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
                          <div className={flip ? "lg:order-2" : ""}>
                            <h2 className="text-2xl font-semibold text-navy-900">
                              {sec.heading}
                            </h2>
                            <div className="rule" />
                            <p className="mt-5 leading-relaxed text-navy-700">
                              {sec.body}
                            </p>
                          </div>
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={sec.image}
                              alt={sec.heading}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="(min-width: 1024px) 24rem, 100vw"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </Reveal>
                    );
                  })
                )
              );
            })()}

            {/* optional in-page film */}
            {service.video && (
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                  On site with AOCA
                </h2>
                <div className="rule" />
                <div className="mb-2 mt-8">
                  <SectionVideo
                    src={service.video}
                    poster={service.videoPoster ?? service.image}
                  />
                </div>
              </Reveal>
            )}

            {service.gallery.length > 0 && (
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                  In pictures
                </h2>
                <div className="rule" />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {service.gallery.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={src}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(min-width: 1024px) 24rem, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {related.length > 0 && (
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                  Projects where we provided {service.title.toLowerCase()}
                </h2>
                <div className="rule" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {related.map((p) => (
                    <ProjectCard key={p.slug} p={p} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6">
            {/* Fire safety is delivered through the FSC joint venture */}
            {service.slug === "fire-safety-disability-access" && (
              <Reveal>
                <Link
                  href="/fire-safety-consultants"
                  className="group block bg-navy-950 p-7 transition-colors hover:bg-navy-900"
                >
                  <Image
                    src="/fsc-logo-white.png"
                    alt="Fire Safety Consultants"
                    width={1600}
                    height={1067}
                    className="h-16 w-auto"
                    sizes="12rem"
                  />
                  <p className="mt-4 text-sm leading-relaxed text-navy-200">
                    Delivered through Fire Safety Consultants — our specialist
                    joint venture with OCF.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5821F]">
                    Meet Fire Safety Consultants
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            )}
            <Reveal>
              <div className="border border-navy-100 bg-navy-50/50 p-7">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  What we deliver
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-3 text-sm text-navy-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="blueprint bg-navy-950 p-7">
                <h2 className="text-lg font-semibold text-white">
                  Other disciplines
                </h2>
                <ul className="mt-4 space-y-3">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/expertise/${s.slug}`}
                          className="inline-flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-white"
                        >
                          <ArrowRight size={13} className="text-brand" aria-hidden />
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

      {/* fire safety is delivered through the FSC joint venture — give
          the hand-off a stage of its own */}
      {service.slug === "fire-safety-disability-access" && <FscShowcase />}

      <CtaBand
        title={`Need ${service.title.toLowerCase()} support?`}
        body="To discuss how we can assist you on an upcoming project, contact us today."
      />
    </>
  );
}
