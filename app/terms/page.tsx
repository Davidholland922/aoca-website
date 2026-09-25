import type { Metadata } from "next";
import { termsIntro, termsSections } from "@/lib/terms";
import Reveal from "@/components/Reveal";

/**
 * Hidden Terms of Business page (client request, Sept 2026).
 * Lives at /terms (Philip). Reachable only by direct link: not in the nav, footer, or sitemap,
 * and noindexed so search engines never list it.
 * Content is generated verbatim from the client's document — see lib/terms.ts.
 */
export const metadata: Metadata = {
  title: "General Terms of Business",
  robots: { index: false, follow: false },
};

export default function TermsOfBusinessPage() {
  return (
    <>
      <section className="blueprint bg-navy-950 pb-16 pt-40">
        <div className="container-site">
          <p className="eyebrow">AOCA Engineering Consultants Ltd</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
            General Terms of Business
          </h1>
          <div className="mt-6 h-1 w-24 bg-brand" />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-700">
              {termsIntro}
            </p>
          </Reveal>
          {termsSections.map((s, i) => (
            <Reveal key={s.title}>
              <h2 className="mt-12 flex items-baseline gap-3 text-xl font-semibold text-navy-900">
                <span
                  aria-hidden
                  className="font-heading text-sm font-bold tabular-nums text-brand"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title.replace(/^\d+\.\s*/, "")}
              </h2>
              <div className="rule" />
              <div className="mt-4 space-y-3">
                {s.clauses.map((c) => (
                  <p
                    key={c.slice(0, 40)}
                    className="text-sm leading-relaxed text-navy-700"
                  >
                    {c}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
          <p className="mt-14 border-t border-navy-100 pt-6 text-xs uppercase tracking-wider text-navy-400">
            AOCA Engineering Consultants Ltd — General Terms of Business, 25
            September 2026
          </p>
        </div>
      </section>
    </>
  );
}
