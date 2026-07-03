"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { site, services, sectors } from "@/lib/site";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

const links: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/projects",
    label: "Projects",
    children: sectors.map((s) => ({
      href: `/projects?sector=${s.slug}`,
      label: s.title,
    })),
  },
  {
    href: "/expertise",
    label: "Expertise",
    children: services.map((s) => ({
      href: `/expertise/${s.slug}`,
      label: s.title,
    })),
  },
  { href: "/insights", label: "Insights" },
  {
    href: "/company",
    label: "Company",
    children: [
      { href: "/company", label: "About AOCA" },
      { href: "/culture", label: "Our Culture" },
      { href: "/careers", label: "Careers" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

function DesktopItem({
  item,
  active,
  solid,
}: {
  item: NavItem;
  active: boolean;
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={clsx(
          "relative py-2 text-sm font-medium uppercase tracking-wider transition-colors",
          active ? "text-white" : "text-navy-100 hover:text-white"
        )}
        style={{ textShadow: solid ? undefined : "0 1px 8px rgba(0,0,0,.45)" }}
      >
        {item.label}
        {active && (
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) leave();
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        className={clsx(
          "relative flex items-center gap-1.5 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
          active ? "text-white" : "text-navy-100 hover:text-white"
        )}
        style={{ textShadow: solid ? undefined : "0 1px 8px rgba(0,0,0,.45)" }}
      >
        {item.label}
        <ChevronDown
          size={13}
          aria-hidden
          className={clsx("transition-transform duration-200", open && "rotate-180")}
        />
        {active && (
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />
        )}
      </Link>
      <div
        className={clsx(
          "absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="border border-white/10 bg-navy-950/98 shadow-xl shadow-navy-950/50 backdrop-blur">
          <span className="block h-0.5 bg-brand" aria-hidden />
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block border-b border-white/5 px-5 py-3 text-sm text-navy-100 transition-colors last:border-0 hover:bg-white/5 hover:text-white"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
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

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <DesktopItem
              key={l.href}
              item={l}
              solid={solid}
              active={
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
              }
            />
          ))}
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
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-navy-950 lg:hidden"
          aria-label="Mobile"
        >
          <div className="container-site flex flex-col py-4">
            {links.map((l) =>
              l.children ? (
                <div key={l.href} className="border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-base font-medium uppercase tracking-wider text-navy-100 hover:text-white"
                    >
                      {l.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={expanded === l.href}
                      aria-label={`Show ${l.label} sub-menu`}
                      onClick={() =>
                        setExpanded((e) => (e === l.href ? null : l.href))
                      }
                      className="flex h-11 w-11 cursor-pointer items-center justify-center text-navy-100"
                    >
                      <ChevronDown
                        size={18}
                        aria-hidden
                        className={clsx(
                          "transition-transform duration-200",
                          expanded === l.href && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  {expanded === l.href && (
                    <div className="pb-3 pl-4">
                      {l.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block py-2.5 text-sm text-navy-200 hover:text-white"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-4 text-base font-medium uppercase tracking-wider text-navy-100 hover:text-white"
                >
                  {l.label}
                </Link>
              )
            )}
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
