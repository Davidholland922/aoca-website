"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/expertise", label: "Expertise" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu floats transparently over the hero video/imagery at the top of the
  // page, then condenses into a solid bar once the user scrolls.
  const solid = scrolled || open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-white/10 bg-navy-950/95 shadow-lg shadow-navy-950/30 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className={clsx(
          "container-site flex items-center justify-between gap-4 transition-all duration-300",
          solid ? "h-16" : "h-24"
        )}
      >
        <Link
          href="/"
          className="flex items-center"
          aria-label="AOCA Engineering Consultants — home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/aoca-logo-white.png"
            alt="AOCA Engineering Consultants"
            width={190}
            height={95}
            priority
            unoptimized
            className={clsx(
              "w-auto transition-all duration-300",
              solid ? "h-10" : "h-14"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                  active
                    ? "text-white"
                    : "text-navy-100 hover:text-white"
                )}
                style={{ textShadow: solid ? undefined : "0 1px 8px rgba(0,0,0,.45)" }}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />
                )}
              </Link>
            );
          })}
          <a href={site.phoneHref} className="btn-primary !min-h-0 !py-2.5">
            <Phone size={15} aria-hidden />
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-navy-950 lg:hidden"
          aria-label="Mobile"
        >
          <div className="container-site flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 text-base font-medium uppercase tracking-wider text-navy-100 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-primary mt-4">
              <Phone size={16} aria-hidden />
              Call us — {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
