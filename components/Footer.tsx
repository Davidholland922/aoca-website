import Link from "next/link";
import { MapPin, Clock, Linkedin, Facebook, Instagram } from "lucide-react";
import { site, offices } from "@/lib/site";
import { officePlaces } from "@/lib/seo";
import { LANDING_LIVE, serviceLandings, countyLandings } from "@/lib/landing";

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
      {/* No logo/strapline block — it repeated the header (Ciara, Sept 2026) */}
      <div className="container-site py-14">
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Offices
          </h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-3">
            {offices.map((o, i) => (
              <li key={o.name}>
                <p className="flex items-start gap-3 text-lg font-semibold text-white">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-brand"
                    aria-hidden
                  />
                  {officePlaces[i] ? (
                    <Link
                      href={`/offices/${officePlaces[i].slug}`}
                      className="transition-colors hover:text-brand-light"
                    >
                      {o.name}
                    </Link>
                  ) : (
                    o.name
                  )}
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
          {LANDING_LIVE && (
            <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-2">
              <p className="leading-relaxed text-navy-300">
                <span className="font-semibold text-white">Areas: </span>
                <Link href="/offices/portlaoise" className="hover:text-white">Laois</Link>
                {countyLandings.map((c) => (
                  <span key={c.slug}>
                    {" · "}
                    <Link href={`/areas/${c.slug}`} className="hover:text-white">{c.county}</Link>
                  </span>
                ))}
                {" · "}<Link href="/offices/dublin" className="hover:text-white">Dublin</Link>
                {" · "}<Link href="/offices/manchester" className="hover:text-white">Manchester</Link>
              </p>
              <p className="leading-relaxed text-navy-300">
                <span className="font-semibold text-white">Specialist services: </span>
                {serviceLandings.map((l, i) => (
                  <span key={l.slug}>
                    {i > 0 && " · "}
                    <Link href={`/expertise/${l.slug}`} className="hover:text-white">{l.title}</Link>
                  </span>
                ))}
              </p>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <p className="flex items-center gap-3 text-sm">
              <Clock size={15} className="shrink-0 text-brand" aria-hidden />
              {site.hours}
            </p>
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
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
            {" · "}
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
          </p>
          <p className="uppercase tracking-wider">
            Consulting Engineers · Portlaoise · Dublin · Manchester
          </p>
        </div>
      </div>
    </footer>
  );
}
