import type { Metadata } from "next";
import { site, values, team, sectors } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "AOCA Engineering Consultants — a chartered engineering practice built on judgment, rigour and long-term client relationships.",
};

export default function AboutPage() {
  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">About AOCA</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              A practice built the way we build projects — carefully, and to
              last.
            </h1>
            <div className="rule" />
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="section bg-white">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Engineering first, always"
            />
            {/* [PLACEHOLDER] — replace with AOCA's real history */}
            <div className="mt-6 space-y-5 leading-relaxed text-navy-700">
              <p>
                AOCA Engineering Consultants was founded in {site.founded} on a
                simple conviction: clients deserve engineers who take
                responsibility, not consultants who take minutes.
              </p>
              <p>
                Since then the practice has grown project by project — from
                one-off houses to multi-unit schemes, from farm buildings to
                protected structures — almost entirely on referral and repeat
                work. The disciplines have broadened; the standard hasn&apos;t
                moved.
              </p>
              <p>
                Today we act as designers, certifiers, project managers and
                expert advisers across Ireland, with one senior engineer
                accountable to you on every engagement.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PlaceholderImage
              label="AOCA office / founding team photo"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Three things we won't compromise"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full border border-navy-100 bg-white p-8">
                  <p className="font-heading text-sm font-semibold text-brand">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-navy-900">
                    {v.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-navy-600">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Our people"
              title="The engineers behind the certificates"
              lead="Small enough that you'll know everyone on your project. Senior enough that it matters."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name + i} delay={i * 0.08}>
                <div className="border border-navy-100">
                  <PlaceholderImage
                    label="Team member photo"
                    className="aspect-square"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-navy-900">{m.name}</h3>
                    <p className="mt-1 text-sm text-brand">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Sectors we serve"
              lead={site.serviceArea + "."}
            />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {sectors.map((s) => (
              <span
                key={s}
                className="border border-navy-200 bg-white px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-navy-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Get to know us on a real project."
        body="The best introduction to AOCA is a straight conversation about something you're planning. No obligation, no jargon."
      />
    </>
  );
}
