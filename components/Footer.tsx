import Image from "next/image";
import { MapPin, Clock, Linkedin, Facebook, Instagram } from "lucide-react";
import { site, offices } from "@/lib/site";

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
      <div className="container-site py-16">
        {/* Brand row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/aoca-logo-nav.png"
              alt="AOCA"
              width={438}
              height={146}
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
          </div>
          <div className="flex gap-3">
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

        {/* Offices — horizontal, full width */}
        <div className="mt-14 border-t border-white/10 pt-12">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Offices
          </h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-3">
            {offices.map((o) => (
              <li key={o.name}>
                <p className="flex items-start gap-3 text-lg font-semibold text-white">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-brand"
                    aria-hidden
                  />
                  {o.name}
                </p>
                <p className="mt-2 pl-8 text-base leading-relaxed text-navy-300">
                  {o.address.join(", ")}
                </p>
                <p className="mt-2 pl-8 text-base">
                  <a
                    href={o.phoneHref}
                    className="transition-colors hover:text-white"
                  >
                    {o.phone}
                  </a>
                </p>
                <p className="mt-1 pl-8 text-base">
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
