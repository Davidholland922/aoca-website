import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Linkedin, Facebook, Instagram } from "lucide-react";
import { site, services, offices } from "@/lib/site";

const socials = [
  {
    href: "https://www.linkedin.com/company/aidan-o'connell-&-associates",
    label: "AOCA on LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.facebook.com/aoca.ie",
    label: "AOCA on Facebook",
    Icon: Facebook,
  },
  {
    href: "https://instagram.com/aocaengineering",
    label: "AOCA on Instagram",
    Icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer className="blueprint bg-navy-950 text-navy-200">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image
            src="/aoca-logo-white.png"
            alt="AOCA Engineering Consultants"
            width={190}
            height={95}
            unoptimized
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A leader in multidisciplinary engineering expertise.
          </p>
          <p className="mt-5 flex items-center gap-3 text-sm">
            <Clock size={15} className="shrink-0 text-brand" aria-hidden />
            {site.hours}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-navy-200 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Expertise
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/expertise/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/company" className="transition-colors hover:text-white">
                About AOCA
              </Link>
            </li>
            <li>
              <Link href="/history" className="transition-colors hover:text-white">
                Our History
              </Link>
            </li>
            <li>
              <Link href="/culture" className="transition-colors hover:text-white">
                Our Culture
              </Link>
            </li>
            <li>
              <Link href="/careers" className="transition-colors hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/projects" className="transition-colors hover:text-white">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/insights" className="transition-colors hover:text-white">
                Insights
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Offices
          </h2>
          <ul className="mt-5 space-y-6 text-sm">
            {offices.map((o) => (
              <li key={o.name}>
                <p className="flex items-start gap-3 font-medium text-white">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  {o.name}
                </p>
                <p className="mt-1 pl-7 text-navy-300">{o.address.join(", ")}</p>
                <p className="mt-1 pl-7">
                  <a href={o.phoneHref} className="transition-colors hover:text-white">
                    {o.phone}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${o.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {o.email}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p className="uppercase tracking-wider">
            Draft for review — not for public circulation
          </p>
        </div>
      </div>
    </footer>
  );
}
