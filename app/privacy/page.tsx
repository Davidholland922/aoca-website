import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CookieReset from "@/components/CookieReset";

/**
 * Privacy notice. Factual description of what this site actually does with
 * personal data (contact-form enquiries, cookieless analytics). Linked from
 * the footer. The client should review before launch — see PLACEHOLDERS.md.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AOCA Engineering Consultants handles personal data submitted through this website.",
  alternates: { canonical: "/privacy" },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who we are",
    body: [
      `${site.legalName.replace(/\.$/, "")}, trading as AOCA Engineering Consultants ("AOCA", "we"), is the data controller for personal data collected through this website. Our registered office is Lismard House, Timahoe Road, Portlaoise, Co. Laois, Ireland. You can contact us about privacy at ${site.email}.`,
    ],
  },
  {
    title: "What we collect and why",
    body: [
      "Contact form: when you send an enquiry we collect the name, email address, phone number (optional) and message you provide. We use this solely to respond to your enquiry and, where you engage us, to deliver our services. The legal basis is our legitimate interest in responding to enquiries and, where applicable, taking steps at your request before entering into a contract.",
      "Enquiries are delivered to our inbox by Web3Forms, a form-delivery service, which processes the submission on our behalf and retains a copy for a limited period for delivery and spam-prevention purposes. A copy of each enquiry is also kept in the website's password-protected administration area so that it can be answered if the email goes astray.",
      "The contact form is protected by hCaptcha, a service of Intuition Machines, Inc., which checks that a submission comes from a person rather than an automated program. For that purpose it processes technical information such as your IP address and browser details, under its own privacy policy at hcaptcha.com/privacy. It is used only on the contact form and only when you send a message.",
      "Website analytics: we use Vercel Web Analytics, which does not use cookies and does not identify individual visitors, and, only if you accept it on the cookie notice, Google Analytics 4. Google Analytics tells us which pages are visited, roughly where visitors are and how they found the site. IP addresses are anonymised and we do not use the data for advertising. Google LLC processes this data on our behalf under its standard EU data-protection terms.",
      "Career applications: if you apply for a position by email, we process the information in your application to assess your suitability for the role.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "The site works without any tracking cookies. If you accept analytics on the cookie notice, Google Analytics sets cookies beginning with _ga (kept for up to 13 months) to tell returning visits apart. Your choice is remembered in your browser. We never set advertising cookies.",
    ],
  },
  {
    title: "How long we keep your data",
    body: [
      "Enquiry details are kept for as long as needed to deal with your enquiry and for a reasonable period afterwards, after which they are deleted unless they form part of an ongoing engagement, in which case they are retained in accordance with our professional record-keeping obligations.",
    ],
  },
  {
    title: "Sharing your data",
    body: [
      "We do not sell personal data. We share it only with service providers who help us run this website and deliver enquiries (named above), with professional advisers where necessary, and where required by law.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under the General Data Protection Regulation (GDPR) you have the right to access the personal data we hold about you, to have it corrected or erased, to restrict or object to its processing, and to data portability. To exercise any of these rights, email us at the address above. You also have the right to lodge a complaint with the Data Protection Commission (dataprotection.ie).",
    ],
  },
  {
    title: "Changes to this notice",
    body: [
      "We may update this notice from time to time. The latest version will always be available on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="blueprint bg-navy-950 pb-16 pt-40">
        <div className="container-site">
          <p className="eyebrow">{site.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-6 h-1 w-24 bg-brand" />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-700">
              This notice explains what personal data this website collects,
              why, and what rights you have over it. We keep it short because
              we collect very little.
            </p>
          </Reveal>
          {sections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="mt-12 text-xl font-semibold text-navy-900">
                {s.title}
              </h2>
              <div className="rule" />
              <div className="mt-4 space-y-3">
                {s.body.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-sm leading-relaxed text-navy-700"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
          <p className="mt-14 border-t border-navy-100 pt-6 text-sm text-navy-500">
            You can <CookieReset /> at any time. Questions about this notice? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              {site.email}
            </a>{" "}
            or use the{" "}
            <Link
              href="/contact"
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
