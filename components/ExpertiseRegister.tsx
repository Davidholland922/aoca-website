"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/site";

/* Corner notch echoing the apex angle of the AOCA "A" (same as .btn) */
const apexClip = {
  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
};

/**
 * Interactive drawing register: the list of disciplines drives a large
 * live preview plate on desktop (hover/focus a row to swap it). On mobile
 * each discipline is a full-width illustrated card instead.
 */
export default function ExpertiseRegister({
  services,
}: {
  services: Service[];
}) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="container-site">
      <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr,26rem] xl:grid-cols-[1fr,30rem]">
        {/* ---------- the register ---------- */}
        <ol className="list-none">
          {services.map((s, i) => (
            <li
              key={s.slug}
              className={i > 0 ? "border-t border-white/10" : ""}
            >
              <Link
                href={`/expertise/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={active === i ? "true" : undefined}
                className="group block py-5 sm:py-6"
              >
                {/* mobile: illustrated card */}
                <span
                  className="relative mb-4 block aspect-[16/9] w-full overflow-hidden lg:hidden"
                  style={apexClip}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    aria-hidden
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" aria-hidden />
                  <span className="absolute bottom-3 left-4 font-heading text-2xl font-bold tabular-nums text-white/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="grid grid-cols-[1fr,auto] items-center gap-4 lg:grid-cols-[4.25rem,1fr,auto] lg:gap-6">
                  <span
                    aria-hidden
                    className={`hidden font-heading text-2xl font-semibold tabular-nums transition-colors duration-300 lg:block ${
                      active === i ? "text-brand-light" : "text-navy-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block font-heading text-2xl font-bold leading-tight transition-all duration-300 ease-out sm:text-3xl xl:text-4xl ${
                        active === i
                          ? "text-white lg:translate-x-1.5"
                          : "text-navy-100"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base lg:hidden">
                      {s.short}
                    </span>
                  </span>

                  <ArrowRight
                    size={24}
                    className={`shrink-0 transition-all duration-300 ${
                      active === i
                        ? "translate-x-1 text-brand-light"
                        : "text-navy-500"
                    }`}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* ---------- live preview plate (desktop) ---------- */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24">
            <div className="relative mr-4 mt-4">
              {/* offset red frame, same motif as SectionVideo */}
              <div className="absolute -right-4 -top-4 h-full w-full border-2 border-brand" />
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-navy-900"
                style={apexClip}
              >
                {services.map((s, i) => (
                  <Image
                    key={s.slug}
                    src={s.image}
                    alt=""
                    fill
                    sizes="30rem"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-6 pb-4 pt-16">
                  <p className="text-sm leading-relaxed text-navy-100">
                    {current.short}
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-2.5">
              {current.highlights.slice(0, 4).map((hl) => (
                <li
                  key={hl}
                  className="flex items-start gap-3 text-sm text-navy-100"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-light" />
                  {hl}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href={`/expertise/${current.slug}`} className="btn-primary">
                Explore {current.title}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
