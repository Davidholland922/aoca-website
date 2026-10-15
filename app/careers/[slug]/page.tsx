import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, MapPin } from "lucide-react";
import { site, jobs, getJob, companyImages, contactKeys } from "@/lib/site";
import { jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ApplyForm from "@/components/ApplyForm";
import JsonLd from "@/components/JsonLd";

/** One page per vacancy: introduction, key responsibilities, requirements, apply. */
export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  const first = job.summary.split(/\n/)[0] ?? "";
  return {
    title: `${job.title} Job, ${job.location}`,
    description: (first.length > 155 ? first.slice(0, first.lastIndexOf(" ", 152)) + "…" : first) || `${job.title} at AOCA Engineering Consultants.`,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed text-navy-700">
          <Check size={18} className="mt-1 shrink-0 text-brand" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  const others = jobs.filter((j) => j.slug !== job.slug);

  return (
    <>
      <JsonLd
        data={[
          jobPostingJsonLd(job),
          breadcrumbJsonLd([
            { name: "Careers", path: "/careers" },
            { name: job.title, path: `/careers/${job.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={
          <>
            <Link href="/careers" className="hover:text-brand-light">Careers</Link> / Vacancy
          </>
        }
        title={job.title}
        lead={[job.location, job.type].filter(Boolean).join(" · ")}
        image={companyImages.careers}
        imageAlt="AOCA engineers on site"
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,22rem]">
          <div className="min-w-0 max-w-3xl">
            <Reveal>
              <div className="space-y-4">
                {job.summary
                  .split(/\n\s*\n|\n/)
                  .filter((p) => p.trim())
                  .map((p, i) => (
                    <p key={i} className={i === 0 ? "text-lg leading-relaxed text-navy-800" : "leading-relaxed text-navy-700"}>
                      {p}
                    </p>
                  ))}
              </div>
            </Reveal>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <Reveal>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">Key responsibilities</h2>
                <div className="rule" />
                <Bullets items={job.responsibilities} />
              </Reveal>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <Reveal>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">Requirements</h2>
                <div className="rule" />
                <Bullets items={job.requirements} />
              </Reveal>
            )}

            <div id="apply" className="mt-16 scroll-mt-28">
              <Reveal>
                <h2 className="text-2xl font-semibold text-navy-900">Apply for this role</h2>
                <div className="rule" />
                <p className="mt-4 text-navy-600">Attach your CV. It takes about a minute and we reply to every application.</p>
              </Reveal>
              <div className="mt-8">
                <ApplyForm
                  roles={jobs.map((j) => j.title)}
                  initialRole={job.title}
                  email={site.email}
                  accessKey={contactKeys.find((k) => k.inbox === "ie")?.accessKey}
                  ownSitekey={process.env.HCAPTCHA_SECRET ? process.env.HCAPTCHA_SITEKEY : undefined}
                />
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-navy-100 bg-navy-50/50 p-6">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">{job.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-navy-700">
                {job.location && (
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-brand" aria-hidden /> {job.location}
                  </li>
                )}
                {job.type && (
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-brand" aria-hidden /> {job.type}
                  </li>
                )}
              </ul>
              <a href="#apply" className="btn-primary mt-6 w-full">Apply now</a>
            </div>
            {others.length > 0 && (
              <div className="border border-navy-100 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">Other vacancies</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/careers/${o.slug}`} className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">
                        {o.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark">
              <ArrowLeft size={15} aria-hidden /> All vacancies
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
