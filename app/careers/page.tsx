import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Clock, FileText, MapPin, MessageSquare, GraduationCap, Users } from "lucide-react";
import { site, companyImages, careersImages, jobs, contactKeys } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import ApplyButton from "@/components/ApplyButton";
import ApplyForm from "@/components/ApplyForm";
import JsonLd from "@/components/JsonLd";
import { jobPostingJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Engineering Careers in Portlaoise, Dublin & Manchester",
  description:
    "Careers at AOCA Engineering Consultants — join a team where ideas are valued, collaboration is encouraged and professional growth is supported.",
};

const perks = [
  {
    icon: Users,
    title: "Ideas are valued",
    body: "An environment where collaboration is encouraged and professional growth is supported — whatever stage of your career you're at.",
  },
  {
    icon: MapPin,
    title: "Flexible locations",
    body: "With offices in Dublin and Portlaoise, our team benefits from flexible location options that make commuting and travel more convenient.",
  },
  {
    icon: GraduationCap,
    title: "Grow your expertise",
    body: "We deliver a wide variety of projects, providing real opportunities to broaden your experience as part of a passionate, dedicated team.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the built environment with us."
        lead="At AOCA Engineering, we are always looking for talented, motivated people who share our vision for delivering thoughtful, high-quality engineering solutions."
        image={companyImages.careers}
        imageAlt="AOCA engineers on site"
        compact
      />

      {/* OPEN POSITIONS — posted by AOCA via /admin */}
      <section className="section bg-navy-50/60" id="open-positions">
        <div className="container-site">
          {jobs.length > 0 && <JsonLd data={jobs.filter((j) => j.summary).map(jobPostingJsonLd)} />}
          <Reveal>
            <SectionHeading
              eyebrow="Open positions"
              title={jobs.length ? "We're hiring" : "Current openings"}
              lead={
                jobs.length
                  ? "Choose a role to apply. We reply to every application."
                  : "There are no advertised openings right now, but we're always interested in talented engineers. Send us your CV and we'll keep it on file."
              }
            />
          </Reveal>

          {jobs.length > 0 && (
            <Reveal>
              <div className="relative mt-10 overflow-hidden bg-navy-950">
                <Image
                  src="/images/2026-08-team-meeting-1.jpg"
                  alt="The AOCA team in a project meeting"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 80rem, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/65 to-navy-950/15" aria-hidden />
                <div className="relative flex min-h-[16rem] flex-col justify-center p-6 sm:min-h-[18rem] sm:p-10 lg:min-h-[20rem]">
                  <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                    {jobs.length} open position{jobs.length === 1 ? "" : "s"}
                  </p>
                  <p className="mt-3 max-w-xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Join the AOCA team.
                  </p>
                  <ul className="mt-5 flex max-w-2xl flex-wrap gap-2">
                    {jobs.map((j) => (
                      <li key={j.title}>
                        <ApplyButton
                          role={j.title}
                          label={j.title}
                          className="group inline-flex min-h-[44px] items-center gap-2 border border-white/45 bg-navy-950/45 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-6 grid gap-4">
            {jobs.map((j) => {
              const [first, ...rest] = j.summary.split(/\n\s*\n/).filter((x) => x.trim());
              return (
                <Reveal key={j.title}>
                  <article className="border border-navy-100 bg-white p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-navy-900">{j.title}</h3>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-600">
                          {j.location && (
                            <li className="flex items-center gap-1.5">
                              <MapPin size={15} className="text-brand" aria-hidden />
                              {j.location}
                            </li>
                          )}
                          {j.type && (
                            <li className="flex items-center gap-1.5">
                              <Clock size={15} className="text-brand" aria-hidden />
                              {j.type}
                            </li>
                          )}
                        </ul>
                      </div>
                      <ApplyButton role={j.title} label="Apply for this role" className="btn-primary shrink-0" />
                    </div>
                    {first && <p className="mt-5 max-w-3xl leading-relaxed text-navy-700">{first}</p>}
                    {rest.length > 0 && (
                      <details className="group mt-3 max-w-3xl">
                        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark [&::-webkit-details-marker]:hidden">
                          <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden />
                          <span className="group-open:hidden">Read the full description</span>
                          <span className="hidden group-open:inline">Show less</span>
                        </summary>
                        <div className="mt-3 space-y-3 leading-relaxed text-navy-700">
                          {rest.map((para) => (
                            <p key={para.slice(0, 40)}>{para}</p>
                          ))}
                        </div>
                      </details>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* APPLICATION FORM — CV goes to private, encrypted storage */}
          <div id="apply" className="mt-16 grid scroll-mt-28 gap-10 lg:grid-cols-[1fr,1.6fr] lg:gap-14">
            <Reveal>
              <h3 className="text-2xl font-semibold text-navy-900 sm:text-3xl">
                {jobs.length ? "Apply" : "Send us your CV"}
              </h3>
              <div className="rule" />
              <p className="mt-4 text-navy-600">
                {jobs.length
                  ? "Applying for one of the roles above, or just want us to have your CV on file? Use this form either way."
                  : "Attach your CV and send it to us."}
              </p>
              <ul className="mt-6 space-y-4 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  <span><span className="font-semibold text-navy-900">About a minute.</span> Your details and one file.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  <span><span className="font-semibold text-navy-900">PDF or Word.</span> Up to 4 MB.</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  <span><span className="font-semibold text-navy-900">A reply, every time.</span> We answer every application.</span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <ApplyForm
                roles={jobs.map((j) => j.title)}
                email={site.email}
                accessKey={contactKeys.find((k) => k.inbox === "ie")?.accessKey}
                ownSitekey={process.env.HCAPTCHA_SECRET ? process.env.HCAPTCHA_SITEKEY : undefined}
              />
            </Reveal>
          </div>
        </div>
      </section>


      <section className="section bg-white">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Who we're looking for"
              title="Students to senior engineers"
              lead="Whether you're a student eager to gain hands-on experience or an experienced engineer ready to take the next step, we offer an environment where your work matters from day one."
            />
            <div className="mt-8 space-y-6">
              {perks.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-950 text-brand-light">
                    <p.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ApplyButton role="Speculative application" label="Send us your CV" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {careersImages.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden ${
                    i % 2 ? "aspect-[3/4] md:mt-8" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Working at AOCA"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 20rem, 50vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="blueprint bg-navy-950">
        <div className="container-site section">
          <Reveal>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Curious what the team is really like?
                </h2>
                <div className="rule" />
              </div>
              <Link href="/culture" className="btn-outline-light">
                See our culture
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
