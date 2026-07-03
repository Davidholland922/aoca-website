import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering projects by AOCA Engineering Consultants across residential, commercial, industrial, education, healthcare and conservation sectors.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Projects</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              Every project here had a problem worth solving.
            </h1>
            <div className="rule" />
            <p className="mt-6 max-w-2xl text-lg text-navy-100">
              We don&apos;t publish a gallery of finished buildings — we
              publish the engineering decisions that got them finished.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full border border-navy-100 transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
              >
                <PlaceholderImage
                  label={p.title}
                  sector={p.sector}
                  className="aspect-[16/10]"
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-navy-400">
                    {p.location} · {p.value}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-navy-900 group-hover:text-brand">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {p.scope}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Your project could be the next case study."
        body="Bring us the awkward site, the tight programme, the building nobody has drawings for. That's the work we like."
      />
    </>
  );
}
