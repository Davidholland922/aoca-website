import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { values, cultureImages, companyImages } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionVideo from "@/components/SectionVideo";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Culture",
  description:
    "Life at AOCA — a people-first engineering consultancy where ideas are valued, collaboration is encouraged and careers are built.",
};

export default function CulturePage() {
  return (
    <>
      <PageHero
        eyebrow="Our culture"
        title="People first. Since 1996."
        lead="No corporate hierarchy, no distant boardrooms — just a team that genuinely cares about the outcome and each other."
        image={companyImages.cultureTeaser}
        imageAlt="The AOCA team"
      />

      {/* BEHIND THE SCENES FILM */}
      <section className="blueprint relative overflow-hidden bg-navy-950">
        <div className="container-site section grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Behind the scenes"
              title="A day with the AOCA team"
              lead="Cameras followed the team for a day — office, sites and everything in between."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionVideo
              src="/video/culture.mp4"
              poster="/images/culture-video-poster.jpg"
            />
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Beyond the desk"
              title="Life at AOCA"
              lead="Site days, team days, darts nights and everything in between."
            />
          </Reveal>
          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>div]:mb-4">
            {cultureImages.map((src, i) => (
              <div key={src} className="break-inside-avoid">
                <Reveal delay={(i % 4) * 0.05}>
                  <div
                    className={`relative w-full overflow-hidden ${
                      i % 3 === 0
                        ? "aspect-[3/4]"
                        : i % 3 === 1
                          ? "aspect-square"
                          : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt="Life at AOCA"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="blueprint section bg-navy-950">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="What holds it together"
              title="The values we hire for"
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
          <Reveal>
            <Link href="/careers" className="btn-primary mt-14">
              Join the team
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Sound like your kind of team?"
        body="We're always interested in talking to good engineers — see what's involved in joining AOCA."
      />
    </>
  );
}
