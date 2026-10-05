import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone, Mail, Clock } from "lucide-react";
import { site, offices, services, projects } from "@/lib/site";
import {
  LANDING_LIVE,
  projectsForCounty,
  type ServiceLanding,
  type CountyLanding,
  type Faq,
} from "@/lib/landing";
import { breadcrumbJsonLd, ORG_ID } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-6 divide-y divide-navy-100 border-y border-navy-100">
      {faqs.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-navy-900">
            {f.q}
            <span className="shrink-0 text-xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

function DraftNotice() {
  if (LANDING_LIVE) return null;
  return (
    <p className="bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-800">
      Review page. Not indexed and not linked from the site until approved.
    </p>
  );
}

export function ServiceLandingView({ l }: { l: ServiceLanding }) {
  const proof = (l.projectSlugs ?? [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const head = offices[0];
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${site.url}/expertise/${l.slug}#service`,
            name: l.title,
            serviceType: l.title,
            description: l.metaDescription,
            url: `${site.url}/expertise/${l.slug}`,
            provider: { "@id": ORG_ID },
            areaServed: l.counties,
          },
          faqJsonLd(l.faqs),
          breadcrumbJsonLd([
            { name: "Expertise", path: "/expertise" },
            { name: l.title, path: `/expertise/${l.slug}` },
          ]),
        ]}
      />
      <DraftNotice />
      <PageHero
        eyebrow={
          <>
            <Link href="/expertise" className="hover:text-brand-light">
              Expertise
            </Link>{" "}
            / {l.eyebrow.split("/").pop()?.trim()}
          </>
        }
        title={l.title}
        lead={l.lead}
        image={l.image}
        imageAlt={l.title}
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,340px]">
          <div className="min-w-0">
            <Reveal>
              {l.intro.map((p) => (
                <p key={p.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-navy-700">
                  {p}
                </p>
              ))}
            </Reveal>

            {l.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="mt-12 text-2xl font-semibold text-navy-900">{s.heading}</h2>
                <div className="rule" />
                <div className="mt-4 space-y-4">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 40)} className="leading-relaxed text-navy-700">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            {proof.length > 0 && (
              <Reveal>
                <h2 className="mt-14 text-2xl font-semibold text-navy-900">Projects</h2>
                <div className="rule" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {proof.map((p) => (
                    <ProjectCard key={p.slug} p={p} />
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Common questions</h2>
              <div className="rule" />
              <Faqs faqs={l.faqs} />
            </Reveal>

            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Where we provide this</h2>
              <div className="rule" />
              <ul className="mt-5 flex flex-wrap gap-2">
                {l.counties.map((c) => (
                  <li key={c} className="border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-800">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="border border-navy-100 bg-navy-50/50 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  {l.panel.title}
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-navy-700">
                  {l.panel.lines.map((line) => (
                    <li key={line} className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  Send an enquiry
                  <ArrowRight size={15} aria-hidden />
                </Link>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-navy-700">
                  <Phone size={15} className="text-brand" aria-hidden />
                  <a href={head.phoneHref} className="hover:text-brand">{head.phone}</a>
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="border border-navy-100 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Related expertise
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {l.related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/expertise/${r.slug}`} className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {l.articles && l.articles.length > 0 && (
                  <>
                    <h2 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                      Read more
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm">
                      {l.articles.map((a) => (
                        <li key={a.slug}>
                          <Link href={`/insights/${a.slug}`} className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function CountyLandingView({ l }: { l: CountyLanding }) {
  const near = projectsForCounty(l);
  const head = offices[0];
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${site.url}/areas/${l.slug}#service`,
            name: `Consulting engineers in ${l.county}`,
            serviceType: "Civil and structural engineering",
            areaServed: { "@type": "AdministrativeArea", name: `County ${l.county}, Ireland` },
            provider: { "@id": ORG_ID },
            url: `${site.url}/areas/${l.slug}`,
          },
          faqJsonLd(l.faqs),
          breadcrumbJsonLd([
            { name: "Areas", path: "/contact" },
            { name: l.county, path: `/areas/${l.slug}` },
          ]),
        ]}
      />
      <DraftNotice />
      <PageHero
        eyebrow={
          <>
            <Link href="/contact" className="hover:text-brand-light">
              Areas
            </Link>{" "}
            / {l.county}
          </>
        }
        title={`${l.title}.`}
        lead={l.lead}
        image={l.image}
        imageAlt={`AOCA engineers in ${l.county}`}
        compact
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr,340px]">
          <div className="min-w-0">
            <Reveal>
              {l.intro.map((p) => (
                <p key={p.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-navy-700">
                  {p}
                </p>
              ))}
            </Reveal>

            {near.length > 0 && (
              <Reveal>
                <h2 className="mt-10 text-2xl font-semibold text-navy-900">
                  Projects in and around {l.county}
                </h2>
                <div className="rule" />
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {near.map((p) => (
                    <ProjectCard key={p.slug} p={p} />
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">What we do in {l.county}</h2>
              <div className="rule" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/expertise/${s.slug}`}
                      className="group flex items-center justify-between gap-3 border border-navy-100 px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:border-navy-800"
                    >
                      {s.title}
                      <ArrowRight size={14} className="shrink-0 text-brand" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Towns we cover</h2>
              <div className="rule" />
              <ul className="mt-5 flex flex-wrap gap-2">
                {l.towns.map((t) => (
                  <li key={t} className="border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-800">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Common questions</h2>
              <div className="rule" />
              <Faqs faqs={l.faqs} />
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="border border-navy-100 bg-navy-50/50 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  {head.name}
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-navy-700">
                  <li className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>{head.address.map((a) => <span key={a} className="block">{a}</span>)}</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <a href={head.phoneHref} className="hover:text-brand">{head.phone}</a>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <a href={`mailto:${head.email}`} className="hover:text-brand">{head.email}</a>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>{site.hours}</span>
                  </li>
                </ul>
                <iframe
                  title={`Map, ${l.county}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`County ${l.county}, Ireland`)}&z=9&output=embed`}
                  className="mt-6 h-52 w-full border-0 grayscale transition-all duration-300 hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  Send an enquiry
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </Reveal>
            <Reveal>
              <div className="border border-navy-100 p-6">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Offices
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/offices/portlaoise" className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">Portlaoise, head office</Link></li>
                  <li><Link href="/offices/dublin" className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">Dublin</Link></li>
                  <li><Link href="/offices/manchester" className="font-medium text-navy-800 underline-offset-2 hover:text-brand hover:underline">Manchester</Link></li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
