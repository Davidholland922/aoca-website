import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Link href="/expertise" className="hover:text-brand-light">
              Expertise
            </Link>{" "}
            / {service.title}
          </>
        }
        title={service.title}
        lead={service.short}
        image={service.image}
        imageAlt={service.title}
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,340px]">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-navy-700">
                {service.intro}
              </p>
            </Reveal>

            {service.sections.map((sec) => (
              <Reveal key={sec.heading}>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">
                  {sec.heading}
                </h2>
                <div className="rule" />
                <p className="mt-5 leading-relaxed text-navy-700">{sec.body}</p>
              </Reveal>
            ))}

            {service.gallery.length > 0 && (
              <Reveal>
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {service.gallery.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={src}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(min-width: 1024px) 24rem, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="border border-navy-100 bg-navy-50/50 p-7">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  What we deliver
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-3 text-sm text-navy-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="blueprint bg-navy-950 p-7">
                <h2 className="text-lg font-semibold text-white">
                  Other disciplines
                </h2>
                <ul className="mt-4 space-y-3">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/expertise/${s.slug}`}
                          className="inline-flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-white"
                        >
                          <ArrowRight size={13} className="text-brand" aria-hidden />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.title.toLowerCase()} support?`}
        body="To discuss how we can assist you on an upcoming project, contact us today."
      />
    </>
  );
}
