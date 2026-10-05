import type { Metadata } from "next";
import { banners, projects, sectors } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import CtaBand from "@/components/CtaBand";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description:
    "Three decades of engineering consultancy across Ireland, the UK and Europe — explore AOCA projects by sector.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Some of the projects that have shaped who we are."
        lead="Three decades of engineering consultancy across Ireland, the UK and Europe."
        image="/images/2026-02-dji_0037.jpg"
        imageAlt="AOCA project montage"
        compact
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <ProjectsExplorer projects={projects} sectors={sectors} />
          </Reveal>
          <Reveal>
            <h2 className="mt-16 text-xl font-semibold text-navy-900">
              Browse projects by sector
            </h2>
            <div className="rule" />
            <ul className="mt-6 flex flex-wrap gap-3">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/projects/sector/${s.slug}`}
                    className="inline-block border border-navy-200 px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand title={banners.projects.title} body={banners.projects.body} />
    </>
  );
}
