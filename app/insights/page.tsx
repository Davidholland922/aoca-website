import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { insights } from "@/lib/insights";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "News, awards and engineering insight from AOCA — from national infrastructure recognition to practical guidance on defects, remediation and sustainability.",
};

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="What we're thinking, building and winning."
        lead="News, awards and practical engineering insight from the AOCA team."
        image={lead.image}
        imageAlt=""
        compact
      />

      <section className="section bg-white">
        <div className="container-site">
          {/* Lead article */}
          <Reveal>
            <Link
              href={`/insights/${lead.slug}`}
              className="group grid overflow-hidden border border-navy-100 transition-all duration-200 hover:border-navy-800 hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 40rem, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="eyebrow">Latest · {lead.displayDate}</p>
                <h2 className="mt-3 text-2xl font-semibold text-navy-900 group-hover:text-brand sm:text-3xl">
                  {lead.title}
                </h2>
                <div className="rule" />
                <p className="mt-5 leading-relaxed text-navy-600">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                  Read article
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
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
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-wider text-navy-400">
                      {a.displayDate}
                    </p>
                    <h2 className="mt-2 flex-1 text-lg font-semibold leading-snug text-navy-900 group-hover:text-brand">
                      {a.title}
                    </h2>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                      Read article
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

      <CtaBand
        title="Have a question one of these raised?"
        body="From cracked walls to cladding remediation — talk to an engineer who deals with it every week."
      />
    </>
  );
}
