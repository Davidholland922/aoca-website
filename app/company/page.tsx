import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  site,
  mission,
  values,
  timeline,
  team,
  offices,
  companyImages,
  cultureImages,
} from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Aidan O'Connell & Associates — one of Ireland's leading engineering consultancies since 1996, with offices in Portlaoise, Dublin and Manchester.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Independently Irish since 1996."
        lead="AOCA have been in business since 1996, and in that time we have established ourselves firmly as one of Ireland's leading engineering consultancy firms."
        image={companyImages.hero}
        imageAlt="The AOCA team"
      />

      {/* STORY */}
      <section className="section bg-white">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="From Portlaoise to projects across Europe"
            />
            <div className="mt-6 space-y-5 leading-relaxed text-navy-700">
              <p>
                With our head office located in Portlaoise, where the company
                was established by Aidan O&apos;Connell, we opened a second
                office in Dublin in May 2014. The Dublin office has expanded
                considerably in the intervening period and offers the full
                range of engineering services along with pyrite investigation.
                Our offices share resources to ensure we provide the best
                possible service to every client.
              </p>
              <p>
                Since our initial steps on the ladder of engineering
                consultancy, we have expanded and evolved to service all
                sectors of the construction industry. This continuous growth is
                testament to our commitment to the quality of service we
                provide to all our clients.
              </p>
              <p>
                Our business philosophy is, always, to provide the most
                professional attention, together with the most practical
                solution at a reasonable cost. Our professional staff are on
                hand to discuss projects of any magnitude — simple or complex —
                and will deliver the highest standard possible to help you
                achieve your stated goal.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {companyImages.office.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden ${
                    i % 2 ? "aspect-[3/4] md:mt-8" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Inside the AOCA offices"
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

      {/* TIMELINE */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <SectionHeading dark eyebrow="Milestones" title="Three decades of building trust" />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.slice(0, 4).map((t, i) => (
              <Reveal key={t.year} delay={i * 0.07}>
                <div className="border-l-2 border-brand pl-5">
                  <p className="font-heading text-4xl font-semibold text-white">
                    {t.year}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/history" className="btn-outline-light mt-12">
              The full story — reeling in the years
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-snug text-navy-900 sm:text-4xl">
              {mission}
            </h2>
            <div className="rule" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 5) * 0.06}>
                <div className="h-full border border-navy-100 bg-navy-50/50 p-6">
                  <p className="font-heading text-sm font-semibold text-brand">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MANAGEMENT TEAM */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Our management team"
              lead="Chartered engineers who are still engineers first — every project has a director's eyes on it."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="border border-navy-100 bg-white p-7">
                  <span className="flex h-12 w-12 items-center justify-center bg-navy-950 font-heading text-lg font-semibold text-brand-light">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <h3 className="mt-5 font-semibold text-navy-900">{m.name}</h3>
                  <p className="mt-1 text-sm text-brand">{m.role}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-navy-400">
                    {m.cred}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE TEASER */}
      <section className="section bg-white">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={companyImages.cultureTeaser}
                alt="The AOCA team together"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow="Beyond the desk"
              title="A team that actually likes each other"
              lead="From site visits to darts nights — the culture at AOCA is the reason clients stay and engineers build careers here."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/culture" className="btn-primary">
                Our culture
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/careers" className="btn-outline-dark">
                Join the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFFICES */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Where we are"
              title="Three offices, one team"
              lead={`${site.hours}.`}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offices.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.07}>
                <div className="h-full border border-white/10 bg-navy-900/60 p-7">
                  <h3 className="font-semibold text-white">{o.name}</h3>
                  <div className="rule" />
                  <p className="mt-4 text-sm leading-relaxed text-navy-100">
                    {o.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                  <p className="mt-4 text-sm">
                    <a href={o.phoneHref} className="text-navy-100 hover:text-white">
                      {o.phone}
                    </a>
                  </p>
                  <p className="mt-1 text-sm">
                    <a
                      href={`mailto:${o.email}`}
                      className="text-brand-light hover:text-white"
                    >
                      {o.email}
                    </a>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Get to know us on a real project."
        body="The best introduction to AOCA is a straight conversation about something you're planning."
      />
    </>
  );
}
