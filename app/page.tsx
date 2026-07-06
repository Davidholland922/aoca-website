import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  site,
  stats,
  mission,
  values,
  services,
  sectors,
  projects,
  testimonials,
  partnerLogos,
  logoWall,
  cultureImages,
  companyImages,
  accreditations,
} from "@/lib/site";
import ServiceIcon from "@/components/ServiceIcon";
import { insights } from "@/lib/insights";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoHero from "@/components/VideoHero";
import CtaBand from "@/components/CtaBand";
import StatCounter from "@/components/StatCounter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Swoosh from "@/components/Swoosh";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* VIDEO HERO */}
      <VideoHero poster={companyImages.videoPoster}>
        <div className="container-site py-24">
          <Reveal>
            <p className="eyebrow">
              Consulting Engineers · Ireland &amp; UK · Since {site.founded}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              A leader in multidisciplinary{" "}
              <span className="text-brand-light">engineering expertise.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              Civil &amp; structural engineering, project management and
              forensic expertise — delivered with practical thinking, honest
              effort and genuine pride since 1996.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/projects" className="btn-primary">
                Explore our work
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/contact" className="btn-outline-light">
                Talk to an engineer
              </Link>
            </div>
          </Reveal>
        </div>
      </VideoHero>

      {/* STATS */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l-2 border-brand pl-5">
                <p className="font-heading text-4xl font-semibold text-navy-900 sm:text-5xl">
                  <StatCounter value={s.value} />
                </p>
                <p className="mt-1 text-sm uppercase tracking-wider text-navy-500">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="section bg-white">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-4 text-3xl font-semibold leading-snug text-navy-900 sm:text-4xl">
              {mission}
            </h2>
            <Swoosh />
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Over 27 years. Over 7,000 projects. The same uncompromising
              standard every time — from one-off houses to award-winning
              national infrastructure.
            </p>
            <Link href="/company" className="btn-outline-dark mt-8">
              About AOCA
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <Image
                src={companyImages.brandedTeam}
                alt="AOCA engineers reviewing drawings on site"
                width={800}
                height={860}
                className="w-full object-cover"
                sizes="(min-width: 1024px) 40rem, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTORS — image tiles */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Sectors"
              title="Wherever Ireland builds, we engineer"
              lead="Three decades of consultancy across Ireland, the UK and Europe — six sectors, one standard."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/projects?sector=${s.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-navy-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {s.blurb}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-light">
                      View projects
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — large editorial cards */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                dark
                eyebrow="Featured projects"
                title="Some of the projects that have shaped who we are"
              />
              <Link href="/projects" className="btn-outline-light">
                All projects
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 space-y-8">
            {featured.map((p, i) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid overflow-hidden border border-white/10 bg-navy-900/60 transition-colors hover:border-brand lg:grid-cols-5"
                >
                  <div
                    className={`relative aspect-[16/9] lg:col-span-3 lg:aspect-auto lg:min-h-[24rem] ${
                      i % 2 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={p.hero ?? p.thumb}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 45rem, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-12">
                    <p className="eyebrow">
                      {sectors.find((s) => s.slug === p.sector)?.title}
                      {p.location ? ` · ${p.location}` : ""}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      {p.title}
                    </h3>
                    <Swoosh />
                    <p className="mt-5 leading-relaxed text-navy-100">
                      {p.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-light">
                      Read the case study
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Expertise"
              title="Broad expertise. Singular focus."
              lead="Working across multiple jurisdictions for thirty years has made us genuinely versatile. We spot things early, ask the right questions, and bring solutions that actually hold up."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 5) * 0.06}>
                <Link
                  href={`/expertise/${s.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 15rem, (min-width: 640px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/45 to-navy-950/10"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="flex h-9 w-9 items-center justify-center border border-white/20 bg-navy-950/60 text-brand-light backdrop-blur-sm">
                      <ServiceIcon name={s.icon} size={18} />
                    </span>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-white">
                      {s.title}
                    </h3>
                    <span className="mt-2 block h-[2px] w-8 bg-brand transition-all duration-300 group-hover:w-14" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      {/* bg-fixed is intentionally avoided — iOS Safari renders it broken */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${companyImages.homeStrip})` }}
      >
        <div className="absolute inset-0 bg-navy-950/85" aria-hidden />
        <div className="container-site section relative">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Our values"
              title="What it's like to work with us"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 5) * 0.06}>
                <div>
                  <p className="font-heading text-sm font-semibold text-brand-light">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGO WALL */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Our clients"
              title="Proudly partnered with industry leaders"
              lead="AOCA partners with clients across diverse sectors, offering customised engineering solutions which reinforce our reputation for excellence and reliability."
            />
          </Reveal>
          <Reveal>
            <div className="mt-12 grid grid-cols-3 items-center gap-px overflow-hidden border border-navy-100 bg-navy-100 sm:grid-cols-4 lg:grid-cols-6">
              {logoWall.map((src) => (
                <div
                  key={src}
                  className="flex aspect-[8/5] items-center justify-center bg-white p-6"
                >
                  {/* rendered no larger than source resolution to stay sharp */}
                  <Image
                    src={src}
                    alt="AOCA client logo"
                    width={160}
                    height={80}
                    className="max-h-10 w-auto max-w-[75%] object-contain opacity-80 transition-opacity hover:opacity-100 sm:max-h-12"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-[auto,1fr,auto]">
          <Reveal>
            <Image
              src="/images/2024-01-ibda-finalist-blue-1.png"
              alt="Irish Building and Design Awards — Finalist"
              width={180}
              height={180}
              className="mx-auto h-32 w-auto object-contain"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <div>
              <p className="eyebrow">Recognition</p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-900 sm:text-3xl">
                Award-recognised engineering
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-navy-600">
                Shortlisted at the Irish Building &amp; Design Awards —
                recognised as being &lsquo;Best in Class&rsquo; — and part of
                the team behind the multi-award-winning Arklow Wastewater
                Treatment Plant.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/insights/arklow-wastewater-treatment-plant-recognised-with-prestigious-awards"
              className="btn-outline-dark whitespace-nowrap"
            >
              The Arklow story
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
        {/* accreditations & memberships (client-confirmed list) */}
        <div className="border-t border-navy-100 bg-navy-50/60">
          <div className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6">
            {accreditations.map((a) => (
              <span
                key={a}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy-600"
              >
                <Image
                  src="/a-mark.png"
                  alt=""
                  width={151}
                  height={150}
                  className="h-3 w-auto"
                  aria-hidden
                />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="What clients say"
              title="Built on repeat business"
            />
          </Reveal>
          <Reveal>
            <div className="mt-12">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-8 border-t border-white/10 pt-10">
              {partnerLogos.map((l) => (
                <Image
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  width={140}
                  height={56}
                  className="h-9 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LATEST INSIGHTS */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Insights"
                title="From the drawing board"
                lead="News, awards and practical engineering insight from the team."
              />
              <Link href="/insights" className="btn-outline-dark">
                All insights
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {insights.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.07}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col border border-navy-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-wider text-navy-400">
                      {a.displayDate}
                    </p>
                    <h3 className="mt-2 flex-1 font-semibold leading-snug text-navy-900 group-hover:text-brand">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE TEASER */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our culture"
                title="The people behind the projects"
                lead="No corporate hierarchy, no distant boardrooms — just a team that genuinely cares about the outcome and each other."
              />
              <Link href="/culture" className="btn-outline-dark">
                Life at AOCA
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {cultureImages.slice(0, 8).map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <div
                  className={`relative overflow-hidden ${
                    i % 2 ? "aspect-[3/4]" : "aspect-square md:mt-10"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Life at AOCA"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
