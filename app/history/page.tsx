import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { timeline, companyImages } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Swoosh from "@/components/Swoosh";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "Three decades of AOCA — from a one-engineer practice in Portlaoise to a multidisciplinary consultancy across Ireland, the UK and Europe.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our history"
        title="Reeling in the years."
        lead="From a drawing board in Portlaoise in 1996 to 7,000 projects across Ireland, the UK and Europe — the milestones that made AOCA."
        image={companyImages.hero}
        imageAlt="The AOCA team"
        compact
      />

      <section className="section bg-white">
        <div className="container-site">
          <div className="relative mx-auto max-w-5xl">
            {/* spine */}
            <span
              className="absolute left-5 top-0 hidden h-full w-px bg-navy-100 md:left-1/2 md:block"
              aria-hidden
            />
            <div className="space-y-16 md:space-y-24">
              {timeline.map((t, i) => (
                <Reveal key={t.year}>
                  <div
                    className={`relative grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                      i % 2 ? "md:text-left" : ""
                    }`}
                  >
                    {/* year node on the spine — the A mark itself */}
                    <span
                      className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 border border-navy-100 bg-white p-1.5 md:block"
                      aria-hidden
                    >
                      <Image
                        src="/a-mark.png"
                        alt=""
                        width={151}
                        height={150}
                        className="h-4 w-auto"
                      />
                    </span>
                    <div
                      className={`relative aspect-[16/10] overflow-hidden bg-navy-50 ${
                        i % 2 ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className={
                          t.image.endsWith(".png")
                            ? "object-contain p-10"
                            : "object-cover"
                        }
                        sizes="(min-width: 768px) 32rem, 100vw"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className={i % 2 ? "md:order-1 md:pr-16" : "md:pl-16"}>
                      <p className="font-heading text-5xl font-semibold text-brand">
                        {t.year}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-navy-900">
                        {t.title}
                      </h2>
                      <Swoosh />
                      <p className="mt-4 leading-relaxed text-navy-600">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-20 flex flex-wrap justify-center gap-4 border-t border-navy-100 pt-12">
              <Link href="/company" className="btn-outline-dark">
                About the company
              </Link>
              <Link href="/culture" className="btn-outline-dark">
                Our culture
              </Link>
              <Link href="/projects" className="btn-primary">
                The work itself
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Be part of the next chapter."
        body="Whether as a client or a colleague — the story is still being written."
      />
    </>
  );
}
