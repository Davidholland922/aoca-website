import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, services } from "@/lib/site";
import {
  officePlaces,
  getOffice,
  projectsNear,
  localBusinessJsonLd,
  officeMapEmbed,
  breadcrumbJsonLd,
} from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { LANDING_LIVE, countyLandings, serviceLandings } from "@/lib/landing";

/**
 * One page per office. These exist so that "consulting engineers Dublin",
 * "structural engineer Manchester" and the like have a real, specific page
 * to rank, with the address, phone, hours and the projects done nearby.
 */
export function generateStaticParams() {
  return officePlaces.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const office = getOffice((await params).slug);
  if (!office) return {};
  return {
    title: `Consulting Engineers in ${office.city}`,
    description: `Civil, structural, insurance and forensic engineers in ${office.city}. ${office.address.filter((l) => !l.startsWith("(")).join(", ")}. ${office.phone}.`,
    alternates: { canonical: `/offices/${office.slug}` },
    openGraph: { images: [office.image] },
  };
}

const intro: Record<string, string[]> = {
  portlaoise: [
    "Lismard House on the Timahoe Road has been AOCA's head office since the practice was founded in Portlaoise in 1996. It is where the directors are based and where most of the Midlands work is run from.",
    "From here we cover Laois, Kildare, Carlow, Tipperary, Offaly, Kilkenny and the wider Midlands: schools, churches, fire stations, retail, housing and one-off homes, along with insurance and forensic inspections for insurers and loss adjusters across Ireland.",
  ],
  dublin: [
    "The Dublin office in Centrepoint Business Park, Clondalkin, serves clients across the capital and the commuter counties, from Ringsend to the Dodder Valley.",
    "Dublin work includes data centres, healthcare refurbishment, commercial buildings and residential schemes, with the same engineers and the same approach as the head office.",
  ],
  manchester: [
    "AOCA's UK office on Portland Street in Manchester city centre is the base for our work in England and Wales, including data centres, building envelope engineering and latent defect investigation for insurers.",
    "Through the Manchester office the practice has delivered over £200m of latent defect projects in the UK, and the Wales data centre on this page was audited from here.",
  ],
};

export default async function OfficePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const office = getOffice((await params).slug);
  if (!office) notFound();

  const near = projectsNear(office.slug).slice(0, 6);
  const others = officePlaces.filter((o) => o.slug !== office.slug);

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", ...localBusinessJsonLd(office.index) },
          breadcrumbJsonLd([
            { name: "Contact", path: "/contact" },
            { name: office.city, path: `/offices/${office.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={
          <>
            <Link href="/contact" className="hover:text-brand-light">
              Offices
            </Link>{" "}
            / {office.city}
          </>
        }
        title={`Consulting engineers in ${office.city}.`}
        lead={`${office.name}. ${office.address.join(", ")}.`}
        image={office.image}
        imageAlt={`AOCA ${office.city} office`}
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,360px]">
          <div className="min-w-0">
            <Reveal>
              {(intro[office.slug] ?? []).map((p) => (
                <p key={p.slice(0, 30)} className="mb-5 text-lg leading-relaxed text-navy-700">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <h2 className="mt-12 text-2xl font-semibold text-navy-900">
                What we do from {office.city}
              </h2>
              <div className="rule" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/expertise/${s.slug}`}
                      className="group flex items-center justify-between gap-3 border border-navy-100 px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800"
                    >
                      {s.title}
                      <ArrowRight size={14} className="shrink-0 text-brand" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            {LANDING_LIVE && office.slug === "dublin" && (
              <Reveal>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">Dublin services in detail</h2>
                <div className="rule" />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {serviceLandings
                    .filter((l) => ["structural-engineers-dublin", "fire-safety-consultants-dublin", "subsidence-engineering", "apartment-defects-remediation"].includes(l.slug))
                    .map((l) => (
                      <li key={l.slug}>
                        <Link href={`/expertise/${l.slug}`} className="group flex items-center justify-between gap-3 border border-navy-100 px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800">
                          {l.title}
                          <ArrowRight size={14} className="shrink-0 text-brand" aria-hidden />
                        </Link>
                      </li>
                    ))}
                </ul>
              </Reveal>
            )}

            {LANDING_LIVE && office.country === "IE" && (
              <Reveal>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">Counties we cover from {office.city}</h2>
                <div className="rule" />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {countyLandings.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/areas/${c.slug}`} className="block border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800 hover:text-brand">
                        {c.county}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {near.length > 0 && (
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">
                  Projects near {office.city}
                </h2>
                <div className="rule" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {near.map((p) => (
                    <ProjectCard key={p.slug} p={p} />
                  ))}
                </div>
                <p className="mt-6">
                  <Link
                    href="/projects"
                    className="font-medium text-brand underline-offset-2 hover:underline"
                  >
                    See all projects
                  </Link>
                </p>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="border border-navy-100 bg-navy-50/50 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  {office.name}
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-navy-700">
                  <li className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>
                      {office.address.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <a href={office.phoneHref} className="hover:text-brand">{office.phone}</a>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <a href={`mailto:${office.email}`} className="hover:text-brand">{office.email}</a>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>{site.hours}</span>
                  </li>
                </ul>
                <iframe
                  title={`Map, ${office.name}`}
                  src={
                    officeMapEmbed(office.slug) ??
                    `https://maps.google.com/maps?q=${encodeURIComponent(
                      office.address.filter((l) => !l.startsWith("(")).join(", ")
                    )}&z=14&output=embed`
                  }
                  className="mt-6 h-52 w-full border-0 grayscale transition-all duration-300 hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  Send an enquiry
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </Reveal>
            <Reveal>
              <div className="border border-navy-100 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Other offices
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/offices/${o.slug}`}
                        className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline"
                      >
                        {o.city}, {o.countryName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
