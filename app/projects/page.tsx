import type { Metadata } from "next";
import { projects, sectors } from "@/lib/site";
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
        image="/images/2026-04-group-27.jpg"
        imageAlt="AOCA project montage"
        compact
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <ProjectsExplorer projects={projects} sectors={sectors} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Your project could be next."
        body="Bring us the awkward site, the tight programme, the building nobody has drawings for. That's the work we like."
      />
    </>
  );
}
