import type { Metadata } from "next";
import { Suspense } from "react";
import { banners, projects, sectors } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
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
            {/* Suspense: ProjectsExplorer reads useSearchParams */}
            <Suspense>
              <ProjectsExplorer projects={projects} sectors={sectors} />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <CtaBand title={banners.projects.title} body={banners.projects.body} />
    </>
  );
}
