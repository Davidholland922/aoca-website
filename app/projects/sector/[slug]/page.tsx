import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { sectors, projects, services, getSector } from "@/lib/site";
import { breadcrumbJsonLd, servicesForProject } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

/**
 * One static page per sector. The projects explorer filters with a query
 * string, which search engines treat as one page; these give each sector
 * its own address, title and text to rank for.
 */
export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const sector = getSector((await params).slug);
  if (!sector) return {};
  const count = projects.filter((p) => p.sector === sector.slug).length;
  return {
    title: `${sector.title} Engineering Projects`,
    description: `${count} ${sector.title.toLowerCase()} project${count === 1 ? "" : "s"} by AOCA, consulting engineers in Ireland and the UK. ${sector.blurb}`.slice(0, 158),
    alternates: { canonical: `/projects/sector/${sector.slug}` },
    openGraph: { images: [sector.image] },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const sector = getSector((await params).slug);
  if (!sector) notFound();

  const list = projects.filter((p) => p.sector === sector.slug);
  const locations = Array.from(
    new Set(list.map((p) => p.location).filter((l): l is string => !!l))
  );
  // the expertise most often provided on this sector's projects, most common first
  const tally = new Map<string, number>();
  list.forEach((p) => servicesForProject(p).forEach((s) => tally.set(s, (tally.get(s) ?? 0) + 1)));
  const related = Array.from(tally.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .slice(0, 4);
  const others = sectors.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Projects", path: "/projects" },
            { name: sector.title, path: `/projects/sector/${sector.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${sector.title} engineering projects`,
            url: `https://www.aoca.ie/projects/sector/${sector.slug}`,
            hasPart: list.map((p) => ({
              "@type": "CreativeWork",
              name: p.title,
              url: `https://www.aoca.ie/projects/${p.slug}`,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow={
          <>
            <Link href="/projects" className="hover:text-brand-light">
              Projects
            </Link>{" "}
            / {sector.title}
          </>
        }
        title={`${sector.title} projects.`}
        lead={sector.blurb}
        image={sector.image}
        imageAlt={`${sector.title} engineering by AOCA`}
        compact
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-navy-700">
              {list.length} {sector.title.toLowerCase()} project{list.length === 1 ? "" : "s"} from the
              AOCA portfolio
              {locations.length > 0 && (
                <>
                  , including work in {locations.slice(0, 4).join(", ")}
                  {locations.length > 4 ? " and elsewhere" : ""}
                </>
              )}
              .{" "}
              {related.length > 0 && (
                <>
                  On these projects AOCA most often provides{" "}
                  {related.map((s, i) => (
                    <span key={s.slug}>
                      {i > 0 && (i === related.length - 1 ? " and " : ", ")}
                      <Link
                        href={`/expertise/${s.slug}`}
                        className="font-medium text-brand underline-offset-2 hover:underline"
                      >
                        {s.title.toLowerCase()}
                      </Link>
                    </span>
                  ))}
                  .
                </>
              )}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProjectCard key={p.slug} p={p} headingLevel="h2" />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-16 text-2xl font-semibold text-navy-900">Other sectors</h2>
            <div className="rule" />
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/projects/sector/${s.slug}`}
                    className="group inline-flex items-center gap-2 border border-navy-200 px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800"
                  >
                    {s.title}
                    <ArrowRight size={13} className="text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
