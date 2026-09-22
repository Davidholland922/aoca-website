import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

/**
 * Hidden Terms of Business page (client request, Sept 2026).
 * Reachable only by direct link: not in the nav, footer, or sitemap,
 * and noindexed so search engines never list it.
 *
 * [PLACEHOLDER] Awaiting the Terms of Business document from AOCA —
 * replace the sections below with the real terms when Ciara sends them.
 */
export const metadata: Metadata = {
  title: "Terms of Business",
  robots: { index: false, follow: false },
};

export default function TermsOfBusinessPage() {
  return (
    <>
      <section className="blueprint bg-navy-950 pb-16 pt-40">
        <div className="container-site">
          <p className="eyebrow">{site.legalName}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
            Terms of Business
          </h1>
          <div className="mt-6 h-1 w-24 bg-brand" />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-700">
              These terms of business set out the basis on which{" "}
              {site.legalName.replace(/\.$/, "")} (&ldquo;AOCA&rdquo;) provides
              professional engineering services to its clients.
            </p>
            <div className="mt-10 border border-dashed border-navy-200 bg-navy-50/50 p-8 text-navy-600">
              <p className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                Content pending
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                The full Terms of Business will appear here once supplied by
                AOCA. This page is unlisted: it does not appear in the site
                navigation or search engines, and is reachable only by this
                direct link.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
