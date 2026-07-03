import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  site,
  stats,
  services,
  projects,
  testimonials,
} from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="blueprint relative overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/70 to-brand/20"
          aria-hidden
        />
        <div className="container-site relative flex min-h-[82vh] flex-col justify-center py-24">
          <Reveal>
            <p className="eyebrow">Chartered Engineering Consultants · Ireland</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] text-white sm:text-6xl">
              Engineering certainty,{" "}
              <span className="text-brand-light">from the ground up.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              AOCA delivers civil &amp; structural design, project management
              and building-control compliance for clients who need more than a
              signature — they need judgment they can build on.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Discuss your project
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/projects" className="btn-outline-light">
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
        {/* red baseline echoing the logo underline */}
        <div className="relative h-1 w-full bg-gradient-to-r from-brand via-brand to-transparent" />
      </section>

      {/* STATS */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l-2 border-brand pl-5">
                <p className="font-heading text-4xl font-semibold text-navy-900 sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm uppercase tracking-wider text-navy-500">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Expertise that carries the load"
              lead="Six disciplines, one standard: advice you can act on and design you can build. Every engagement is led by a senior engineer from first call to final certificate."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col border border-navy-100 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-navy-950 text-brand-light">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                    {s.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AOCA */}
      <section className="section bg-white">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Why AOCA"
              title="We sell judgment, not paperwork"
              lead="Anyone can produce a drawing. What our clients pay for is the call we make when the ground conditions surprise everyone, the programme slips, or the budget tightens — and the confidence that the call is right."
            />
            <ul className="mt-8 space-y-5">
              {[
                "Senior engineers on every project — no hand-offs to the graduate desk",
                "Straight answers on feasibility and cost before you commit",
                "A compliance trail that stands up at sale, refinance and handover",
              ].map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span
                    className="mt-2 h-[3px] w-6 shrink-0 bg-brand"
                    aria-hidden
                  />
                  <span className="text-navy-700">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="btn-outline-dark mt-10"
            >
              About the practice
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <PlaceholderImage
              label="AOCA team / site photo"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                dark
                eyebrow="Selected projects"
                title="Proof, not promises"
                lead="A sample of the work — and more importantly, the problems solved along the way."
              />
              <Link href="/projects" className="btn-outline-light">
                All projects
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block border border-white/10 bg-navy-900/60 transition-colors hover:border-brand"
                >
                  <PlaceholderImage
                    label={p.title}
                    sector={p.sector}
                    className="aspect-[16/10]"
                  />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-navy-300">
                      {p.location} · {p.value}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-200">
                      {p.scope}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              center
              eyebrow="What clients say"
              title="Built on repeat business"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author + i} delay={i * 0.08}>
                <figure className="flex h-full flex-col border border-navy-100 bg-navy-50/50 p-7">
                  <span
                    className="font-heading text-5xl leading-none text-brand"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 text-navy-700">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy-100 pt-4">
                    <p className="font-semibold text-navy-900">{t.author}</p>
                    <p className="text-sm text-navy-500">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
