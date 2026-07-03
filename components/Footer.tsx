import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, services } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="blueprint bg-navy-950 text-navy-200">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/aoca-logo-white.png"
            alt="AOCA Engineering Consultants"
            width={190}
            height={95}
            unoptimized
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {site.tagline} Chartered engineering expertise across residential,
            commercial, industrial and public projects.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Expertise
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/about" className="transition-colors hover:text-white">
                About AOCA
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="transition-colors hover:text-white"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
              {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-wider">
            Draft for review — not for public circulation
          </p>
        </div>
      </div>
    </footer>
  );
}
