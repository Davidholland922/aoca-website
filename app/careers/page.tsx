import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, GraduationCap, Users } from "lucide-react";
import { site, companyImages, cultureImages } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import Swoosh from "@/components/Swoosh";

export const metadata: Metadata = {
  title: "Careers",
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
            <a
              href={`mailto:${site.email}?subject=Careers at AOCA`}
              className="btn-primary mt-10"
            >
              Send us your CV
              <ArrowRight size={16} aria-hidden />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {cultureImages.slice(4, 8).map((src, i) => (
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
                <Swoosh />
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
