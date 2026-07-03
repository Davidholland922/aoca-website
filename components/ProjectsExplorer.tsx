"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { Project, Sector } from "@/lib/site";

/** Filterable project grid; honours ?sector= in the URL on first load. */
export default function ProjectsExplorer({
  projects,
  sectors,
}: {
  projects: Project[];
  sectors: Sector[];
}) {
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("sector");
    if (param && sectors.some((s) => s.slug === param)) setActive(param);
  }, [sectors]);

  const shown =
    active === "all" ? projects : projects.filter((p) => p.sector === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by sector"
      >
        {[{ slug: "all", title: "All projects" }, ...sectors].map((s) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={active === s.slug}
            onClick={() => {
              setActive(s.slug);
              const url = new URL(window.location.href);
              if (s.slug === "all") url.searchParams.delete("sector");
              else url.searchParams.set("sector", s.slug);
              window.history.replaceState(null, "", url);
            }}
            className={clsx(
              "min-h-[44px] cursor-pointer border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              active === s.slug
                ? "border-brand bg-brand text-white"
                : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <motion.div
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
          >
            <Link
              href={`/projects/${p.slug}`}
              className="group block h-full border border-navy-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-navy-800 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.thumb}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/60 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {sectors.find((s) => s.slug === p.sector)?.title}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-navy-900 group-hover:text-brand">
                  {p.title}
                </h2>
                {p.location && (
                  <p className="mt-1 text-xs uppercase tracking-wider text-navy-400">
                    {p.location}
                  </p>
                )}
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy-600">
                  {p.summary}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
