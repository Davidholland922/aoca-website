import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to AOCA Engineering Consultants about your project — phone, email or the enquiry form. Straight answers within one working day.",
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    { icon: MapPin, label: "Office", value: site.address },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 9:00–17:30" },
  ];

  return (
    <>
      <section className="blueprint bg-navy-950">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              Start with a straight conversation.
            </h1>
            <div className="rule" />
            <p className="mt-6 max-w-2xl text-lg text-navy-100">
              Tell us what you&apos;re planning. You&apos;ll hear back from an
              engineer — not an inbox — within one working day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[380px,1fr]">
          <Reveal>
            <div className="space-y-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-950 text-brand-light">
                    <d.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block font-medium text-navy-900 hover:text-brand"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-navy-900">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
              <PlaceholderImage
                label="Map / office location"
                className="mt-8 aspect-[4/3]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-2xl font-semibold text-navy-900">
              Project enquiry
            </h2>
            <div className="rule" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
