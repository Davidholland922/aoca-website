import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site, offices, companyImages } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AOCA Engineering Consultants — offices in Portlaoise, Dublin and Manchester. Email us or call and one of the team will get back to you shortly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        lead="Email us or call us on the details provided and one of the team will get back to you shortly."
        image={companyImages.contact}
        imageAlt="The AOCA team in a meeting"
        compact
      />

      {/* OFFICES */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid gap-6 py-14 md:grid-cols-3">
          {offices.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.06}>
              <div className="h-full border border-navy-100 bg-navy-50/40 p-7">
                <h2 className="font-semibold text-navy-900">{o.name}</h2>
                <div className="rule" />
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3 text-navy-700">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                    <span>
                      {o.address.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                  </li>
                  <li>
                    <a
                      href={o.phoneHref}
                      className="flex items-start gap-3 font-medium text-navy-900 hover:text-brand"
                    >
                      <Phone size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {o.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${o.email}`}
                      className="flex items-start gap-3 font-medium text-navy-900 hover:text-brand"
                    >
                      <Mail size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {o.email}
                    </a>
                  </li>
                </ul>
                <iframe
                  title={`Map — ${o.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    o.address.join(", ")
                  )}&z=14&output=embed`}
                  className="mt-6 h-44 w-full border-0 grayscale transition-all duration-300 hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold text-navy-900">
              Project enquiry
            </h2>
            <div className="rule" />
            <p className="mt-5 flex items-center gap-3 text-sm text-navy-600">
              <Clock size={15} className="shrink-0 text-brand" aria-hidden />
              {site.hours}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative h-full min-h-[24rem] overflow-hidden">
              <Image
                src={companyImages.brandedTeam2}
                alt="AOCA engineers"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
